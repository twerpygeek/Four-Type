import assert from 'node:assert/strict'
import test from 'node:test'
import {
  ACTIVE_SUPPORTER_TIERS,
  getSupporterOffer,
  parseHistoricSupporterSelection,
  parseSupporterSelection,
} from '../lib/field-guide/catalog'

test('keeps historic offers readable while exposing one active checkout edition', () => {
  assert.deepEqual(ACTIVE_SUPPORTER_TIERS, ['founding'])
  assert.equal(getSupporterOffer('field-guide', 'usd').amount, 1200)
  assert.equal(getSupporterOffer('founding', 'usd').amount, 1200)
  assert.equal(getSupporterOffer('founding', 'usd').label, 'US$12')
  assert.equal(getSupporterOffer('founding', 'usd').priceEnv, 'STRIPE_FOUNDING_DIGITAL_USD_PRICE_ID')
})

test('continues to recognize historical completed checkout metadata', () => {
  assert.deepEqual(parseHistoricSupporterSelection({ tier: 'field-guide', currency: 'usd' }), {
    tier: 'field-guide',
    currency: 'usd',
  })
})

test('accepts only the active edition and rejects client-controlled prices', () => {
  assert.deepEqual(parseSupporterSelection({ tier: 'founding', currency: 'usd' }), {
    tier: 'founding',
    currency: 'usd',
  })
  assert.equal(parseSupporterSelection({ tier: 'field-guide', currency: 'usd' }), null)
  assert.equal(parseSupporterSelection({ tier: 'founding', currency: 'myr' }), null)
  assert.equal(parseSupporterSelection({ tier: 'founding', currency: 'eur', amount: 1 }), null)
})
