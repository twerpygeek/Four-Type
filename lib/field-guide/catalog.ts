export const SUPPORTER_TIERS = ['field-guide', 'founding'] as const
// Preserve these keys for customers who bought earlier editions. Only the active
// list is accepted at checkout, so retired prices cannot be selected by a client.
export const ACTIVE_SUPPORTER_TIERS = ['founding'] as const
export const SUPPORTER_CURRENCIES = ['usd'] as const
export type SupporterTierKey = (typeof SUPPORTER_TIERS)[number]
export type ActiveSupporterTierKey = (typeof ACTIVE_SUPPORTER_TIERS)[number]
export type CurrencyKey = (typeof SUPPORTER_CURRENCIES)[number]

const offers = {
  'field-guide:usd': { amount: 1200, label: 'US$12', priceEnv: 'STRIPE_FIELD_GUIDE_USD_PRICE_ID' },
  'founding:usd': { amount: 1200, label: 'US$12', priceEnv: 'STRIPE_FOUNDING_DIGITAL_USD_PRICE_ID' },
} as const

export function getSupporterOffer(tier: SupporterTierKey, currency: CurrencyKey) {
  return offers[`${tier}:${currency}` as keyof typeof offers]
}

function parseSelection(value: unknown, tiers: readonly SupporterTierKey[]) {
  if (!value || typeof value !== 'object') return null
  const input = value as Record<string, unknown>
  if (!tiers.includes(input.tier as SupporterTierKey)) return null
  if (!SUPPORTER_CURRENCIES.includes(input.currency as CurrencyKey)) return null
  return { tier: input.tier as SupporterTierKey, currency: input.currency as CurrencyKey }
}

export function parseSupporterSelection(value: unknown) {
  const selection = parseSelection(value, ACTIVE_SUPPORTER_TIERS)
  if (!selection) return null
  return { tier: selection.tier as ActiveSupporterTierKey, currency: selection.currency }
}

export function parseHistoricSupporterSelection(value: unknown) {
  return parseSelection(value, SUPPORTER_TIERS)
}
