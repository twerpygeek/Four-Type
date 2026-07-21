import assert from 'node:assert/strict'
import test from 'node:test'
import {
  claimEmailDelivery,
  completeEmailDelivery,
  EMAIL_DELIVERY_REUSE_MIN_REMAINING_MS,
  releaseEmailDeliveryClaim,
} from '../lib/field-guide/delivery'
import type { PrivateBlobStore } from '../lib/field-guide/blob'
import { FIELD_GUIDE_ACCESS_TOKEN_MAX_AGE_MS } from '../lib/field-guide/tokens'

class MemoryBlobStore implements PrivateBlobStore {
  private readonly records = new Map<string, { body: string; etag: string }>()
  private sequence = 0

  async get(pathname: string) {
    return this.records.get(pathname) ?? null
  }

  async put(pathname: string, body: string, options: Parameters<PrivateBlobStore['put']>[2]) {
    if (!options.allowOverwrite && this.records.has(pathname)) {
      throw Object.assign(new Error('Blob already exists'), { code: 'already-exists' })
    }
    if (options.ifMatch && this.records.get(pathname)?.etag !== options.ifMatch) {
      throw Object.assign(new Error('Blob precondition failed'), { code: 'precondition-failed' })
    }

    const etag = `etag-${++this.sequence}`
    this.records.set(pathname, { body, etag })
    return { etag }
  }
}

test('durably claims, retries, and records one supporter email receipt', async () => {
  const store = new MemoryBlobStore()
  const first = await claimEmailDelivery('cs_test_paid', store, 1_000)
  assert.equal(first.status, 'claimed')
  if (first.status !== 'claimed') throw new Error('Expected an email delivery claim')
  assert.equal(first.accessTokenExpiresAt - 1_000, FIELD_GUIDE_ACCESS_TOKEN_MAX_AGE_MS)
  assert.ok(first.accessTokenExpiresAt - 1_000 >= EMAIL_DELIVERY_REUSE_MIN_REMAINING_MS)

  const concurrent = await claimEmailDelivery('cs_test_paid', store, 1_001)
  assert.deepEqual(concurrent, { status: 'in-progress' })

  await releaseEmailDeliveryClaim('cs_test_paid', first.claimId, store)
  const retry = await claimEmailDelivery('cs_test_paid', store, 1_002)
  assert.equal(retry.status, 'claimed')
  if (retry.status !== 'claimed') throw new Error('Expected a retry claim')
  assert.equal(retry.idempotencyKey, first.idempotencyKey)
  assert.equal(retry.accessTokenExpiresAt, first.accessTokenExpiresAt)

  await completeEmailDelivery('cs_test_paid', retry.claimId, 'email_test_123', store, 1_003)
  assert.deepEqual(await claimEmailDelivery('cs_test_paid', store, 1_004), { status: 'sent' })
})

test('reclaims a stale in-progress delivery without changing its idempotency key', async () => {
  const store = new MemoryBlobStore()
  const first = await claimEmailDelivery('cs_test_paid', store, 1_000)
  if (first.status !== 'claimed') throw new Error('Expected an email delivery claim')

  const retry = await claimEmailDelivery('cs_test_paid', store, 301_000)
  assert.equal(retry.status, 'claimed')
  if (retry.status !== 'claimed') throw new Error('Expected a stale-claim retry')
  assert.equal(retry.idempotencyKey, first.idempotencyKey)
  assert.equal(retry.accessTokenExpiresAt, first.accessTokenExpiresAt)
})

test('reuses an unsent attempt exactly 24 hours after its claim and rotates one millisecond later', async () => {
  const store = new MemoryBlobStore()
  const first = await claimEmailDelivery('cs_test_paid', store, 1_000)
  if (first.status !== 'claimed') throw new Error('Expected an email delivery claim')

  await releaseEmailDeliveryClaim('cs_test_paid', first.claimId, store)
  const atMinimum = await claimEmailDelivery(
    'cs_test_paid',
    store,
    first.accessTokenExpiresAt - EMAIL_DELIVERY_REUSE_MIN_REMAINING_MS,
  )
  assert.equal(atMinimum.status, 'claimed')
  if (atMinimum.status !== 'claimed') throw new Error('Expected a reused email delivery claim')
  assert.equal(atMinimum.idempotencyKey, first.idempotencyKey)
  assert.equal(atMinimum.accessTokenExpiresAt, first.accessTokenExpiresAt)

  await releaseEmailDeliveryClaim('cs_test_paid', atMinimum.claimId, store)
  const belowMinimumNow = first.accessTokenExpiresAt - EMAIL_DELIVERY_REUSE_MIN_REMAINING_MS + 1
  const belowMinimum = await claimEmailDelivery('cs_test_paid', store, belowMinimumNow)
  assert.equal(belowMinimum.status, 'claimed')
  if (belowMinimum.status !== 'claimed') throw new Error('Expected a fresh email delivery claim')
  assert.notEqual(belowMinimum.idempotencyKey, first.idempotencyKey)
  assert.equal(belowMinimum.accessTokenExpiresAt, belowMinimumNow + FIELD_GUIDE_ACCESS_TOKEN_MAX_AGE_MS)
})

test('rotates an unsent attempt with one millisecond of token lifetime remaining', async () => {
  const store = new MemoryBlobStore()
  const first = await claimEmailDelivery('cs_test_paid', store, 1_000)
  if (first.status !== 'claimed') throw new Error('Expected an email delivery claim')

  await releaseEmailDeliveryClaim('cs_test_paid', first.claimId, store)
  const retryNow = first.accessTokenExpiresAt - 1
  const retry = await claimEmailDelivery('cs_test_paid', store, retryNow)
  assert.equal(retry.status, 'claimed')
  if (retry.status !== 'claimed') throw new Error('Expected a fresh email delivery claim')
  assert.notEqual(retry.idempotencyKey, first.idempotencyKey)
  assert.equal(retry.accessTokenExpiresAt, retryNow + FIELD_GUIDE_ACCESS_TOKEN_MAX_AGE_MS)
})

test('rotates an unsent attempt whose expiry exceeds the verifier maximum', async () => {
  const store = new MemoryBlobStore()
  const first = await claimEmailDelivery('cs_test_paid', store, 1_000)
  if (first.status !== 'claimed') throw new Error('Expected an email delivery claim')

  await releaseEmailDeliveryClaim('cs_test_paid', first.claimId, store)
  const skewedNow = first.accessTokenExpiresAt - FIELD_GUIDE_ACCESS_TOKEN_MAX_AGE_MS - 1
  const retry = await claimEmailDelivery('cs_test_paid', store, skewedNow)
  assert.equal(retry.status, 'claimed')
  if (retry.status !== 'claimed') throw new Error('Expected a fresh email delivery claim')
  assert.notEqual(retry.idempotencyKey, first.idempotencyKey)
  assert.equal(retry.accessTokenExpiresAt, skewedNow + FIELD_GUIDE_ACCESS_TOKEN_MAX_AGE_MS)
})

test('starts a fresh delivery attempt after an earlier access token expires', async () => {
  const store = new MemoryBlobStore()
  const first = await claimEmailDelivery('cs_test_paid', store, 1_000)
  if (first.status !== 'claimed') throw new Error('Expected an email delivery claim')

  await releaseEmailDeliveryClaim('cs_test_paid', first.claimId, store)
  const retry = await claimEmailDelivery('cs_test_paid', store, first.accessTokenExpiresAt + 1)
  assert.equal(retry.status, 'claimed')
  if (retry.status !== 'claimed') throw new Error('Expected a fresh delivery attempt')
  assert.notEqual(retry.idempotencyKey, first.idempotencyKey)
  assert.equal(retry.accessTokenExpiresAt, first.accessTokenExpiresAt + 1 + FIELD_GUIDE_ACCESS_TOKEN_MAX_AGE_MS)
})
