import { createHmac, timingSafeEqual } from 'node:crypto'
import { FIELD_GUIDE_ASSET_KEYS, type FieldGuideAssetKey } from './release'

const ACCESS_TOKEN_KIND = 'field-guide-access'
const DOWNLOAD_TOKEN_KIND = 'field-guide-download'
const TOKEN_VERSION = 1
const MAX_SESSION_ID_LENGTH = 256
export const FIELD_GUIDE_ACCESS_TOKEN_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1_000
const MAX_DOWNLOAD_TOKEN_TTL_MS = 15 * 60 * 1_000
const BASE64URL = /^[A-Za-z0-9_-]+$/

type AccessTokenInput = {
  sessionId: string
  expiresAt: number
}

type DownloadTokenInput = AccessTokenInput & {
  asset: FieldGuideAssetKey
}

type AccessTokenPayload = AccessTokenInput & {
  version: typeof TOKEN_VERSION
  kind: typeof ACCESS_TOKEN_KIND
}

type DownloadTokenPayload = DownloadTokenInput & {
  version: typeof TOKEN_VERSION
  kind: typeof DOWNLOAD_TOKEN_KIND
}

function isBoundedSessionId(value: unknown): value is string {
  return typeof value === 'string'
    && value.length > 0
    && value.length <= MAX_SESSION_ID_LENGTH
    && /^[A-Za-z0-9_:-]+$/.test(value)
}

function isSupportedAsset(value: unknown): value is FieldGuideAssetKey {
  return FIELD_GUIDE_ASSET_KEYS.includes(value as FieldGuideAssetKey)
}

function isSafeInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value)
}

function assertSecret(secret: string) {
  if (typeof secret !== 'string' || secret.length === 0) {
    throw new Error('Token secret is required')
  }
}

function assertExpiry(expiresAt: number, now: number, maximumTtlMs: number) {
  if (!Number.isSafeInteger(expiresAt) || !Number.isSafeInteger(now) || expiresAt <= now || expiresAt - now > maximumTtlMs) {
    throw new Error('Token expiry is invalid')
  }
}

function encodePayload(payload: AccessTokenPayload | DownloadTokenPayload) {
  return Buffer.from(JSON.stringify(payload)).toString('base64url')
}

function signPayload(payloadPart: string, secret: string) {
  return createHmac('sha256', secret).update(payloadPart).digest()
}

function createToken(payload: AccessTokenPayload | DownloadTokenPayload, secret: string) {
  assertSecret(secret)
  const payloadPart = encodePayload(payload)
  return `${payloadPart}.${signPayload(payloadPart, secret).toString('base64url')}`
}

function decodeCanonicalBase64url(segment: string): Buffer | null {
  try {
    const decoded = Buffer.from(segment, 'base64url')
    return decoded.toString('base64url') === segment ? decoded : null
  } catch {
    return null
  }
}

function parseVerifiedPayload(token: string, secret: string): unknown | null {
  if (typeof secret !== 'string' || secret.length === 0) return null
  if (typeof token !== 'string' || token.length === 0 || token.length > 4_096) return null
  const parts = token.split('.')
  if (parts.length !== 2) return null

  const [payloadPart, signaturePart] = parts
  if (!BASE64URL.test(payloadPart) || !BASE64URL.test(signaturePart)) return null

  const payloadBytes = decodeCanonicalBase64url(payloadPart)
  const signature = decodeCanonicalBase64url(signaturePart)
  if (!payloadBytes || !signature) return null

  const expectedSignature = signPayload(payloadPart, secret)
  if (signature.length !== expectedSignature.length) return null
  if (!timingSafeEqual(signature, expectedSignature)) return null

  try {
    return JSON.parse(payloadBytes.toString('utf8'))
  } catch {
    return null
  }
}

function isTokenRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function hasValidCommonClaims(
  payload: Record<string, unknown>,
  expectedKind: typeof ACCESS_TOKEN_KIND | typeof DOWNLOAD_TOKEN_KIND,
  now: number,
  maximumTtlMs: number,
): payload is Record<string, unknown> & { sessionId: string; expiresAt: number } {
  return payload.version === TOKEN_VERSION
    && payload.kind === expectedKind
    && isBoundedSessionId(payload.sessionId)
    && isSafeInteger(payload.expiresAt)
    && payload.expiresAt > now
    && payload.expiresAt - now <= maximumTtlMs
}

export function signAccessToken(input: AccessTokenInput, secret: string, now = Date.now()) {
  if (!isBoundedSessionId(input.sessionId)) throw new Error('Token session ID is invalid')
  assertExpiry(input.expiresAt, now, FIELD_GUIDE_ACCESS_TOKEN_MAX_AGE_MS)

  return createToken({
    version: TOKEN_VERSION,
    kind: ACCESS_TOKEN_KIND,
    sessionId: input.sessionId,
    expiresAt: input.expiresAt,
  }, secret)
}

export function verifyAccessToken(token: string, secret: string, now = Date.now()): AccessTokenInput | null {
  if (!Number.isSafeInteger(now)) return null
  const payload = parseVerifiedPayload(token, secret)
  if (!isTokenRecord(payload) || !hasValidCommonClaims(payload, ACCESS_TOKEN_KIND, now, FIELD_GUIDE_ACCESS_TOKEN_MAX_AGE_MS)) return null

  return { sessionId: payload.sessionId, expiresAt: payload.expiresAt }
}

export function signDownloadToken(input: DownloadTokenInput, secret: string, now = Date.now()) {
  if (!isBoundedSessionId(input.sessionId)) throw new Error('Token session ID is invalid')
  if (!isSupportedAsset(input.asset)) throw new Error('Token asset is unsupported')
  assertExpiry(input.expiresAt, now, MAX_DOWNLOAD_TOKEN_TTL_MS)

  return createToken({
    version: TOKEN_VERSION,
    kind: DOWNLOAD_TOKEN_KIND,
    sessionId: input.sessionId,
    asset: input.asset,
    expiresAt: input.expiresAt,
  }, secret)
}

export function verifyDownloadToken(token: string, secret: string, now = Date.now()): DownloadTokenInput | null {
  if (!Number.isSafeInteger(now)) return null
  const payload = parseVerifiedPayload(token, secret)
  if (
    !isTokenRecord(payload)
    || !hasValidCommonClaims(payload, DOWNLOAD_TOKEN_KIND, now, MAX_DOWNLOAD_TOKEN_TTL_MS)
    || !isSupportedAsset(payload.asset)
  ) {
    return null
  }

  return {
    sessionId: payload.sessionId,
    asset: payload.asset,
    expiresAt: payload.expiresAt,
  }
}
