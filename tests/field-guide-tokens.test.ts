import assert from 'node:assert/strict'
import { createHmac } from 'node:crypto'
import test from 'node:test'
import {
  signAccessToken,
  signDownloadToken,
  verifyAccessToken,
  verifyDownloadToken,
} from '../lib/field-guide/tokens'

const secret = 'test-token-secret'

function signedToken(payload: unknown, signingSecret = secret) {
  const payloadPart = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = createHmac('sha256', signingSecret).update(payloadPart).digest('base64url')
  return `${payloadPart}.${signature}`
}

test('round-trips an access token and rejects tampering at the expiry boundary', () => {
  const token = signAccessToken({ sessionId: 'cs_test_123', expiresAt: 2_000 }, secret, 1_000)

  assert.equal(verifyAccessToken(token, secret, 1_500)?.sessionId, 'cs_test_123')
  assert.equal(verifyAccessToken(`${token}x`, secret, 1_500), null)
  assert.equal(verifyAccessToken(token, secret, 2_000), null)
})

test('scopes a download token to one exact approved asset', () => {
  const token = signDownloadToken({ sessionId: 'cs_test_123', asset: 'pdf', expiresAt: 2_000 }, secret, 1_000)

  assert.deepEqual(verifyDownloadToken(token, secret, 1_500), {
    sessionId: 'cs_test_123',
    asset: 'pdf',
    expiresAt: 2_000,
  })
})

test('rejects a token of the wrong kind', () => {
  const token = signAccessToken({ sessionId: 'cs_test_123', expiresAt: 2_000 }, secret, 1_000)

  assert.equal(verifyDownloadToken(token, secret, 1_500), null)
})

test('rejects malformed base64url and JSON payloads', () => {
  assert.equal(verifyAccessToken('%%%.' + 'a'.repeat(43), secret, 1_500), null)

  const payloadPart = Buffer.from('{').toString('base64url')
  const signature = createHmac('sha256', secret).update(payloadPart).digest('base64url')
  assert.equal(verifyAccessToken(`${payloadPart}.${signature}`, secret, 1_500), null)
})

test('rejects unequal signature lengths without attempting comparison', () => {
  const token = signAccessToken({ sessionId: 'cs_test_123', expiresAt: 2_000 }, secret, 1_000)
  const [payload] = token.split('.')

  assert.equal(verifyAccessToken(`${payload}.a`, secret, 1_500), null)
})

test('rejects unsupported assets even when the payload has a valid HMAC', () => {
  const token = signedToken({
    version: 1,
    kind: 'field-guide-download',
    sessionId: 'cs_test_123',
    asset: 'archive',
    expiresAt: 2_000,
  })

  assert.equal(verifyDownloadToken(token, secret, 1_500), null)
  assert.throws(
    () => signDownloadToken({ sessionId: 'cs_test_123', asset: 'archive' as never, expiresAt: 2_000 }, secret, 1_000),
    /asset/,
  )
})

test('rejects claims outside their bounded session and expiry limits', () => {
  assert.throws(
    () => signAccessToken({ sessionId: 'a'.repeat(257), expiresAt: 2_000 }, secret, 1_000),
    /session/i,
  )
  assert.throws(
    () => signAccessToken({ sessionId: 'cs_test_123', expiresAt: 31 * 24 * 60 * 60 * 1_000 }, secret, 1_000),
    /expiry/i,
  )
})

test('fails closed when the verification secret is missing', () => {
  const token = signedToken({
    version: 1,
    kind: 'field-guide-access',
    sessionId: 'cs_test_123',
    expiresAt: 2_000,
  }, '')

  assert.equal(verifyAccessToken(token, '', 1_500), null)
})
