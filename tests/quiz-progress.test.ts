import assert from 'node:assert/strict'
import test from 'node:test'
import { getCompletedChapter } from '../lib/quiz-progress'

test('reports only the three completed chapter boundaries', () => {
  assert.equal(getCompletedChapter(11), undefined)
  assert.equal(getCompletedChapter(12), 1)
  assert.equal(getCompletedChapter(19), 2)
  assert.equal(getCompletedChapter(24), 3)
  assert.equal(getCompletedChapter(40), undefined)
})
