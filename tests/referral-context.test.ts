import assert from 'node:assert/strict'
import test from 'node:test'
import { generateShareId } from '../lib/share-id'
import { parseReferralContext } from '../lib/referral-context'

const scores = { Yellow: 12, Red: 19, Blue: 5, Green: 4 }

test('returns no referral context when the query value is missing', () => {
  assert.deepEqual(parseReferralContext(''), { status: 'none' })
})

test('rejects a malformed referral ID without throwing', () => {
  assert.deepEqual(parseReferralContext('not-a-share-id'), {
    status: 'invalid',
    shareId: 'not-a-share-id',
  })
})

test('normalizes a valid referral ID and inviter result', () => {
  const id = generateShareId('Ian', 'Motivator', scores)
  const parsed = parseReferralContext(id)

  assert.equal(parsed.status, 'valid')
  if (parsed.status === 'valid') {
    assert.equal(parsed.shareId, id)
    assert.equal(parsed.inviter.heroName, 'Ian')
    assert.equal(parsed.inviter.blendKey, 'Motivator')
  }
})
