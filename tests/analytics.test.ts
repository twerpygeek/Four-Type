import assert from 'node:assert/strict'
import test from 'node:test'
import { FOURTYPE_EVENT_NAMES, isFourTypeEventName } from '../lib/analytics'

test('accepts every referral funnel event and historical event', () => {
  const required = [
    'quiz-start',
    'chapter-complete',
    'quiz-complete',
    'quiz-result',
    'invite-share',
    'invite-copy',
    'invite-open',
    'referred-quiz-start',
    'referred-quiz-complete',
    'compare-result',
    'pair-share',
    'pair-copy',
    'invalid-share-id',
    'share-click',
    'copy-link',
    'field-guide-hero-cta',
    'field-guide-preview-open',
    'field-guide-preview-navigate',
    'field-guide-tier-select',
    'field-guide-currency-select',
    'field-guide-checkout-start',
    'field-guide-checkout-cancel',
    'field-guide-purchase-complete',
    'field-guide-download',
    'field-guide-access-request',
  ]

  assert.deepEqual([...FOURTYPE_EVENT_NAMES].sort(), required.sort())
  required.forEach((event) => assert.equal(isFourTypeEventName(event), true))
  assert.equal(isFourTypeEventName('arbitrary-event'), false)
})

test('accepts privacy-safe Field Guide campaign events', () => {
  const expectedCampaignEvents = [
    'field-guide-hero-cta',
    'field-guide-preview-open',
    'field-guide-preview-navigate',
    'field-guide-tier-select',
    'field-guide-currency-select',
    'field-guide-checkout-start',
    'field-guide-checkout-cancel',
    'field-guide-purchase-complete',
    'field-guide-download',
    'field-guide-access-request',
  ]

  for (const event of expectedCampaignEvents) {
    assert.equal(isFourTypeEventName(event), true)
  }
})
