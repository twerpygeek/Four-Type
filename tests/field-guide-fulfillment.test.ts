import assert from 'node:assert/strict'
import test from 'node:test'
import { fulfillFieldGuideCheckout, type FieldGuideFulfillmentDependencies } from '../lib/field-guide/fulfillment'
import { createSupporterAccessEmail } from '../lib/field-guide/email'
import { FIELD_GUIDE_RELEASE } from '../lib/field-guide/release'
import type { FieldGuideEntitlement } from '../lib/field-guide/entitlements'

const configuredPriceIds = {
  'field-guide:usd': 'price_test_field_guide_usd',
  'field-guide:myr': 'price_test_field_guide_myr',
  'founding:usd': 'price_test_founding_usd',
  'founding:myr': 'price_test_founding_myr',
} as const

type SessionOverrides = Partial<{
  id: string
  payment_status: 'paid' | 'unpaid'
  metadata: Record<string, string> | null
  currency: string
  customer_email: string | null
  customer_details: { email: string | null } | null
  payment_intent: string | null
  line_items: { data: Array<{ price: { id: string } | null; quantity: number | null }> }
}>

function fakeDependencies(overrides: SessionOverrides = {}) {
  const entitlements = new Map<string, FieldGuideEntitlement>()
  const emailCalls: Array<{ entitlement: FieldGuideEntitlement; accessUrl: string }> = []
  const writeCalls: FieldGuideEntitlement[] = []
  const session = {
    id: 'cs_test_paid',
    payment_status: 'paid' as const,
    metadata: {
      product: 'fourtype-field-guide',
      tier: 'founding',
      currency: 'usd',
      releaseId: FIELD_GUIDE_RELEASE.id,
    },
    currency: 'usd',
    customer_email: 'supporter@example.com',
    customer_details: { email: 'supporter@example.com' },
    payment_intent: 'pi_test_paid',
    created: 1_784_673_600,
    line_items: { data: [{ price: { id: configuredPriceIds['founding:usd'] }, quantity: 1 }] },
    ...overrides,
  }

  const dependencies: FieldGuideFulfillmentDependencies = {
    retrieveSession: async () => session,
    getConfiguredPriceId: (tier, currency) => configuredPriceIds[`${tier}:${currency}`],
    readEntitlement: async (sessionId) => entitlements.get(sessionId) ?? null,
    writeEntitlement: async (entitlement) => {
      writeCalls.push(entitlement)
      if (entitlements.has(entitlement.sessionId)) return 'already-fulfilled'
      entitlements.set(entitlement.sessionId, entitlement)
      return 'fulfilled'
    },
    signAccessToken: ({ sessionId, expiresAt }) => `access-${sessionId}-${expiresAt}`,
    createAccessUrl: (token) => `https://www.fourtype.com/field-guide/access?token=${encodeURIComponent(token)}`,
    sendSupporterAccessEmail: async (entitlement, accessUrl) => {
      emailCalls.push({ entitlement, accessUrl })
    },
    now: () => 1_784_673_600_000,
  }

  return { dependencies, emailCalls, writeCalls, session }
}

test('fulfills one paid supported Session idempotently and sends one access email', async () => {
  const fake = fakeDependencies()

  const first = await fulfillFieldGuideCheckout('cs_test_paid', fake.dependencies)
  const second = await fulfillFieldGuideCheckout('cs_test_paid', fake.dependencies)

  assert.deepEqual(first, { status: 'fulfilled' })
  assert.deepEqual(second, { status: 'already-fulfilled' })
  assert.equal(fake.writeCalls.length, 1)
  assert.equal(fake.emailCalls.length, 1)
  assert.equal(fake.emailCalls[0].entitlement.tier, 'founding')
  assert.match(fake.emailCalls[0].accessUrl, /^https:\/\/www\.fourtype\.com\/field-guide\/access\?token=/)
})

test('never fulfills an unpaid Session', async () => {
  const fake = fakeDependencies({ payment_status: 'unpaid' })

  await assert.rejects(() => fulfillFieldGuideCheckout('cs_test_paid', fake.dependencies), /not paid/)
  assert.equal(fake.writeCalls.length, 0)
  assert.equal(fake.emailCalls.length, 0)
})

test('rejects a Session whose metadata, currency, release, or Price does not exactly match the configured offer', async () => {
  const invalidSessions: SessionOverrides[] = [
    { metadata: { product: 'other-product', tier: 'founding', currency: 'usd', releaseId: FIELD_GUIDE_RELEASE.id } },
    { metadata: { product: 'fourtype-field-guide', tier: 'field-guide', currency: 'usd', releaseId: FIELD_GUIDE_RELEASE.id } },
    { metadata: { product: 'fourtype-field-guide', tier: 'founding', currency: 'myr', releaseId: FIELD_GUIDE_RELEASE.id } },
    { metadata: { product: 'fourtype-field-guide', tier: 'founding', currency: 'usd', releaseId: 'other-release' } },
    { currency: 'myr' },
    { line_items: { data: [{ price: { id: 'price_test_other' }, quantity: 1 }] } },
  ]

  for (const overrides of invalidSessions) {
    const fake = fakeDependencies(overrides)
    await assert.rejects(() => fulfillFieldGuideCheckout('cs_test_paid', fake.dependencies), /does not match/)
    assert.equal(fake.writeCalls.length, 0)
    assert.equal(fake.emailCalls.length, 0)
  }
})

test('returns no customer or payment data to the caller', async () => {
  const fake = fakeDependencies()

  const result = await fulfillFieldGuideCheckout('cs_test_paid', fake.dependencies)

  assert.deepEqual(Object.keys(result), ['status'])
  assert.doesNotMatch(JSON.stringify(result), /supporter@example\.com|pi_test_paid|price_test/)
})

test('builds a supporter email with tier rewards and only the private access route', () => {
  const entitlement: FieldGuideEntitlement = {
    version: 1,
    sessionId: 'cs_test_paid',
    tier: 'founding',
    currency: 'usd',
    releaseId: FIELD_GUIDE_RELEASE.id,
    customerEmail: 'supporter@example.com',
    paidAt: '2026-07-21T10:00:00.000Z',
    fulfilledAt: '2026-07-21T10:01:00.000Z',
  }
  const email = createSupporterAccessEmail(
    entitlement,
    'https://www.fourtype.com/field-guide/access?token=signed-access-token',
  )

  assert.match(email.text, /Founding Supporter/)
  assert.match(email.text, /worksheet pack/i)
  assert.match(email.text, /personal use/i)
  assert.match(email.html, /\/field-guide\/access\?token=/)
  assert.doesNotMatch(`${email.text}\n${email.html}`, /blob\.vercel-storage\.com|presignedUrl|field-guide\/edition-1\//i)
})
