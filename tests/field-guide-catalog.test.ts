import assert from 'node:assert/strict'
import test from 'node:test'
import {
  getSupporterOffer,
  parseSupporterSelection,
} from '../lib/field-guide/catalog'

test('maps each approved tier and currency to the exact display amount', () => {
  assert.equal(getSupporterOffer('field-guide', 'usd').amount, 1200)
  assert.equal(getSupporterOffer('field-guide', 'myr').amount, 3900)
  assert.equal(getSupporterOffer('founding', 'usd').amount, 2500)
  assert.equal(getSupporterOffer('founding', 'myr').amount, 7900)
})

test('rejects client-controlled prices and unsupported keys', () => {
  assert.deepEqual(parseSupporterSelection({ tier: 'founding', currency: 'myr' }), {
    tier: 'founding',
    currency: 'myr',
  })
  assert.equal(parseSupporterSelection({ tier: 'founding', currency: 'eur', amount: 1 }), null)
})
