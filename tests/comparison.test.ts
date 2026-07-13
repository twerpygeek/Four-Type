import assert from 'node:assert/strict'
import test from 'node:test'
import { BLENDS } from '../lib/blends'
import { getComparisonInsight } from '../lib/comparison'

test('keeps shared pair insights symmetric and person advice directional', () => {
  const commander = BLENDS.Commander
  const guardian = BLENDS.Guardian
  const forward = getComparisonInsight(commander, guardian)
  const reverse = getComparisonInsight(guardian, commander)

  assert.equal(typeof forward.sharedQuality, 'string')
  assert.equal(typeof forward.complement, 'string')
  assert.equal(typeof forward.challenge, 'string')
  assert.equal(typeof forward.selfAdvice, 'string')
  assert.equal(typeof forward.friendAdvice, 'string')
  assert.equal(forward.sharedQuality.length > 20, true)
  assert.equal(forward.sharedQuality, reverse.sharedQuality)
  assert.equal(forward.complement, reverse.complement)
  assert.equal(forward.challenge, reverse.challenge)
  assert.equal(forward.selfAdvice, reverse.friendAdvice)
  assert.equal(forward.friendAdvice, reverse.selfAdvice)
})

test('gives same-primary pairs a specific shared instinct', () => {
  const pair = getComparisonInsight(BLENDS.Motivator, BLENDS.Director)

  assert.match(pair.sharedQuality, /direction|progress|decision/i)
})
