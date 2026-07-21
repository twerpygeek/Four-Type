import assert from 'node:assert/strict'
import test from 'node:test'
import {
  createPrivateAssetUrl,
  type BlobSigningAdapter,
  type PrivateBlobStore,
} from '../lib/field-guide/blob'
import {
  findEntitlementsByEmail,
  readEntitlement,
  writeEntitlement,
  type FieldGuideEntitlement,
} from '../lib/field-guide/entitlements'

type PutCall = {
  pathname: string
  body: string
  options: {
    access: 'private'
    addRandomSuffix: false
    allowOverwrite: boolean
    contentType: 'application/json'
    ifMatch?: string
  }
}

class MemoryBlobStore implements PrivateBlobStore {
  readonly putCalls: PutCall[] = []
  private readonly records = new Map<string, { body: string; etag: string }>()
  private etag = 0
  preconditionFailures = 0

  keys() {
    return [...this.records.keys()]
  }

  async get(pathname: string, options: { access: 'private'; useCache: false }) {
    assert.deepEqual(options, { access: 'private', useCache: false })
    return this.records.get(pathname) ?? null
  }

  async put(pathname: string, body: string, options: PutCall['options']) {
    this.putCalls.push({ pathname, body, options })

    if (!options.allowOverwrite && this.records.has(pathname)) {
      throw Object.assign(new Error('Blob already exists'), { code: 'already-exists' })
    }

    if (options.ifMatch && this.preconditionFailures > 0) {
      this.preconditionFailures -= 1
      throw Object.assign(new Error('Blob precondition failed'), { code: 'precondition-failed' })
    }

    if (options.ifMatch && this.records.get(pathname)?.etag !== options.ifMatch) {
      throw Object.assign(new Error('Blob precondition failed'), { code: 'precondition-failed' })
    }

    const etag = `etag-${++this.etag}`
    this.records.set(pathname, { body, etag })
    return { etag }
  }
}

function paidEntitlement(overrides: Partial<FieldGuideEntitlement> = {}): FieldGuideEntitlement {
  return {
    version: 1,
    sessionId: 'cs_test_123',
    paymentIntentId: 'pi_test_123',
    tier: 'founding',
    currency: 'usd',
    releaseId: 'field-guide-edition-1-20260721',
    customerEmail: 'Supporter@Example.com ',
    paidAt: '2026-07-21T10:00:00.000Z',
    fulfilledAt: '2026-07-21T10:01:00.000Z',
    ...overrides,
  }
}

test('uses one deterministic private record per Checkout Session', async () => {
  const store = new MemoryBlobStore()
  const entitlement = paidEntitlement()

  assert.equal(await writeEntitlement(entitlement, store, 'email-index-secret'), 'fulfilled')
  assert.equal(await writeEntitlement(entitlement, store, 'email-index-secret'), 'already-fulfilled')
  assert.equal(store.putCalls.length, 3)
  assert.equal(store.keys().filter((key) => key.includes('cs_test_123')).length, 0)
  assert.equal(store.keys().filter((key) => key.includes('Supporter@Example.com')).length, 0)
  assert.equal(store.keys().filter((key) => key.includes('supporter@example.com')).length, 0)

  const sessionWrite = store.putCalls[0]
  assert.match(sessionWrite.pathname, /^field-guide\/entitlements\/by-session\/[a-f0-9]{64}\.json$/)
  assert.deepEqual(sessionWrite.options, {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: false,
    contentType: 'application/json',
  })
})

test('reads private entitlement state without a cache', async () => {
  const store = new MemoryBlobStore()
  const entitlement = paidEntitlement()
  await writeEntitlement(entitlement, store, 'email-index-secret')

  assert.deepEqual(await readEntitlement(entitlement.sessionId, store), entitlement)
})

test('normalizes email indexes and deduplicates session IDs', async () => {
  const store = new MemoryBlobStore()
  const first = paidEntitlement({ sessionId: 'cs_test_first' })
  const second = paidEntitlement({ sessionId: 'cs_test_second', customerEmail: 'supporter@example.com' })

  await writeEntitlement(first, store, 'email-index-secret')
  await writeEntitlement(second, store, 'email-index-secret')
  await writeEntitlement(first, store, 'email-index-secret')

  assert.deepEqual(
    (await findEntitlementsByEmail('  SUPPORTER@example.com ', store, 'email-index-secret')).map((entry) => entry.sessionId),
    ['cs_test_first', 'cs_test_second'],
  )

  const indexWrites = store.putCalls.filter((call) => call.pathname.includes('/by-email/'))
  assert.equal(new Set(indexWrites.map((call) => call.pathname)).size, 1)
  assert.equal(indexWrites[1].options.allowOverwrite, true)
  assert.match(indexWrites[1].options.ifMatch ?? '', /^etag-/)
})

test('retries email-index precondition conflicts at most three times', async () => {
  const store = new MemoryBlobStore()
  const first = paidEntitlement({ sessionId: 'cs_test_first' })
  await writeEntitlement(first, store, 'email-index-secret')

  store.preconditionFailures = 2
  assert.equal(
    await writeEntitlement(paidEntitlement({ sessionId: 'cs_test_second' }), store, 'email-index-secret'),
    'fulfilled',
  )

  const attemptsAfterFirst = store.putCalls.filter((call) => call.pathname.includes('/by-email/')).length
  assert.equal(attemptsAfterFirst, 4)
})

test('stops after three email-index precondition conflicts', async () => {
  const store = new MemoryBlobStore()
  const first = paidEntitlement({ sessionId: 'cs_test_first' })
  await writeEntitlement(first, store, 'email-index-secret')
  store.preconditionFailures = 3

  await assert.rejects(
    () => writeEntitlement(paidEntitlement({ sessionId: 'cs_test_second' }), store, 'email-index-secret'),
    /precondition/i,
  )

  const indexWrites = store.putCalls.filter((call) => call.pathname.includes('/by-email/'))
  assert.equal(indexWrites.length, 4)
})

test('creates a private signed URL for one pathname with a maximum 15-minute lifetime', async () => {
  const calls: Array<{ method: string; value: unknown }> = []
  const signer: BlobSigningAdapter = {
    issueSignedToken: async (options) => {
      calls.push({ method: 'issueSignedToken', value: options })
      return { delegationToken: 'delegation', clientSigningToken: 'client', validUntil: options.validUntil }
    },
    presignUrl: async (token, options) => {
      calls.push({ method: 'presignUrl', value: { token, options } })
      return { presignedUrl: 'https://private.blob.test/field-guide.pdf?signature=redacted' }
    },
  }

  const url = await createPrivateAssetUrl(
    'field-guide/edition-1/FourType-Field-Guide.pdf',
    signer,
    1_000,
    60 * 60 * 1_000,
  )

  assert.equal(url, 'https://private.blob.test/field-guide.pdf?signature=redacted')
  assert.deepEqual(calls, [
    {
      method: 'issueSignedToken',
      value: {
        pathname: 'field-guide/edition-1/FourType-Field-Guide.pdf',
        operations: ['get'],
        validUntil: 901_000,
      },
    },
    {
      method: 'presignUrl',
      value: {
        token: { delegationToken: 'delegation', clientSigningToken: 'client', validUntil: 901_000 },
        options: {
          pathname: 'field-guide/edition-1/FourType-Field-Guide.pdf',
          operation: 'get',
          validUntil: 901_000,
          access: 'private',
        },
      },
    },
  ])
})
