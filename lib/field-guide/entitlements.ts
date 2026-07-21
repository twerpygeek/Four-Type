import { createHash, createHmac } from 'node:crypto'
import { SUPPORTER_CURRENCIES, SUPPORTER_TIERS, type CurrencyKey, type SupporterTierKey } from './catalog'
import type { PrivateBlobStore } from './blob'

const MAX_SESSION_ID_LENGTH = 256
const MAX_RELEASE_ID_LENGTH = 128
const MAX_EMAIL_LENGTH = 320
const EMAIL_INDEX_WRITE_ATTEMPTS = 3

export type FieldGuideEntitlement = {
  version: 1
  sessionId: string
  paymentIntentId?: string
  tier: SupporterTierKey
  currency: CurrencyKey
  releaseId: string
  customerEmail: string
  paidAt: string
  fulfilledAt: string
}

type EmailIndex = {
  version: 1
  sessionIds: string[]
}

function isBoundedIdentifier(value: unknown, maximumLength: number): value is string {
  return typeof value === 'string'
    && value.length > 0
    && value.length <= maximumLength
    && /^[A-Za-z0-9_:-]+$/.test(value)
}

function isIsoDate(value: unknown): value is string {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value))
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isSupporterTier(value: unknown): value is SupporterTierKey {
  return SUPPORTER_TIERS.includes(value as SupporterTierKey)
}

function isCurrency(value: unknown): value is CurrencyKey {
  return SUPPORTER_CURRENCIES.includes(value as CurrencyKey)
}

function isEntitlement(value: unknown): value is FieldGuideEntitlement {
  if (!isRecord(value)) return false

  return value.version === 1
    && isBoundedIdentifier(value.sessionId, MAX_SESSION_ID_LENGTH)
    && (value.paymentIntentId === undefined || isBoundedIdentifier(value.paymentIntentId, MAX_SESSION_ID_LENGTH))
    && isSupporterTier(value.tier)
    && isCurrency(value.currency)
    && isBoundedIdentifier(value.releaseId, MAX_RELEASE_ID_LENGTH)
    && typeof value.customerEmail === 'string'
    && value.customerEmail.length > 0
    && value.customerEmail.length <= MAX_EMAIL_LENGTH
    && isIsoDate(value.paidAt)
    && isIsoDate(value.fulfilledAt)
}

function isEmailIndex(value: unknown): value is EmailIndex {
  return isRecord(value)
    && value.version === 1
    && Array.isArray(value.sessionIds)
    && value.sessionIds.length <= 100
    && value.sessionIds.every((sessionId) => isBoundedIdentifier(sessionId, MAX_SESSION_ID_LENGTH))
}

function parseJson(value: string): unknown | null {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

function sessionPath(sessionId: string) {
  const digest = createHash('sha256').update(sessionId).digest('hex')
  return `field-guide/entitlements/by-session/${digest}.json`
}

function normalizeEmail(email: string) {
  const normalized = email.trim().toLowerCase()
  if (normalized.length === 0 || normalized.length > MAX_EMAIL_LENGTH || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    throw new Error('Entitlement email is invalid')
  }
  return normalized
}

function emailIndexPath(email: string, secret: string) {
  if (typeof secret !== 'string' || secret.length === 0) throw new Error('Email index secret is required')
  const digest = createHmac('sha256', secret).update(normalizeEmail(email)).digest('hex')
  return `field-guide/entitlements/by-email/${digest}.json`
}

function isAlreadyExists(error: unknown) {
  return isRecord(error) && error.code === 'already-exists'
}

function isPreconditionFailed(error: unknown) {
  return isRecord(error) && error.code === 'precondition-failed'
}

function assertEntitlement(entitlement: FieldGuideEntitlement) {
  if (!isEntitlement(entitlement)) throw new Error('Entitlement is invalid')
  normalizeEmail(entitlement.customerEmail)
}

async function updateEmailIndex(
  entitlement: FieldGuideEntitlement,
  store: PrivateBlobStore,
  emailIndexSecret: string,
) {
  const pathname = emailIndexPath(entitlement.customerEmail, emailIndexSecret)

  for (let attempt = 0; attempt < EMAIL_INDEX_WRITE_ATTEMPTS; attempt += 1) {
    const current = await store.get(pathname, { access: 'private', useCache: false })
    const parsed = current ? parseJson(current.body) : { version: 1, sessionIds: [] }
    if (!isEmailIndex(parsed)) throw new Error('Entitlement email index is invalid')

    const sessionIds = [...new Set([...parsed.sessionIds, entitlement.sessionId])]
    if (sessionIds.length > 100) throw new Error('Entitlement email index is full')
    if (current && sessionIds.length === parsed.sessionIds.length) return

    try {
      await store.put(pathname, JSON.stringify({ version: 1, sessionIds }), {
        access: 'private',
        addRandomSuffix: false,
        allowOverwrite: Boolean(current),
        contentType: 'application/json',
        ...(current ? { ifMatch: current.etag } : {}),
      })
      return
    } catch (error) {
      if (!isPreconditionFailed(error) && !(isAlreadyExists(error) && !current)) throw error
    }
  }

  throw Object.assign(new Error('Blob precondition failed'), { code: 'precondition-failed' })
}

export async function readEntitlement(sessionId: string, store: PrivateBlobStore): Promise<FieldGuideEntitlement | null> {
  if (!isBoundedIdentifier(sessionId, MAX_SESSION_ID_LENGTH)) return null
  const record = await store.get(sessionPath(sessionId), { access: 'private', useCache: false })
  if (!record) return null

  const entitlement = parseJson(record.body)
  if (!isEntitlement(entitlement) || entitlement.sessionId !== sessionId) return null
  return entitlement
}

export async function writeEntitlement(
  entitlement: FieldGuideEntitlement,
  store: PrivateBlobStore,
  emailIndexSecret: string,
): Promise<'fulfilled' | 'already-fulfilled'> {
  assertEntitlement(entitlement)

  try {
    await store.put(sessionPath(entitlement.sessionId), JSON.stringify(entitlement), {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: false,
      contentType: 'application/json',
    })
  } catch (error) {
    if (isAlreadyExists(error) || isPreconditionFailed(error)) {
      const winningEntitlement = await readEntitlement(entitlement.sessionId, store)
      if (!winningEntitlement) throw new Error('Existing entitlement is invalid')
      await updateEmailIndex(winningEntitlement, store, emailIndexSecret)
      return 'already-fulfilled'
    }
    throw error
  }

  await updateEmailIndex(entitlement, store, emailIndexSecret)
  return 'fulfilled'
}

export async function findEntitlementsByEmail(
  email: string,
  store: PrivateBlobStore,
  emailIndexSecret: string,
): Promise<FieldGuideEntitlement[]> {
  const record = await store.get(emailIndexPath(email, emailIndexSecret), { access: 'private', useCache: false })
  if (!record) return []

  const index = parseJson(record.body)
  if (!isEmailIndex(index)) return []

  const entitlements = await Promise.all(index.sessionIds.map((sessionId) => readEntitlement(sessionId, store)))
  return entitlements.filter((entitlement): entitlement is FieldGuideEntitlement => entitlement !== null)
}
