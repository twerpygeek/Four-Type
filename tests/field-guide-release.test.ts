import assert from 'node:assert/strict'
import test from 'node:test'
import { FIELD_GUIDE_RELEASE, assetsForTier } from '../lib/field-guide/release'

test('locks the approved source hashes and private pathnames', () => {
  assert.equal(FIELD_GUIDE_RELEASE.id, 'field-guide-edition-1-20260721')
  assert.equal(FIELD_GUIDE_RELEASE.assets.pdf.sha256, '18aa32b98edd6c2e53d510d3aa660811177f0a63b62a0d7c370340649e974617')
  assert.equal(FIELD_GUIDE_RELEASE.assets.epub.sha256, 'f1b3ecdf1ba442f02c6ba37018de4748205584ec3d3659cc60dcf534d924b850')
  assert.match(FIELD_GUIDE_RELEASE.assets.pdf.pathname, /^field-guide\/edition-1\//)
})

test('limits worksheets to Founding Supporters', () => {
  assert.deepEqual(assetsForTier('field-guide'), ['pdf', 'epub'])
  assert.deepEqual(assetsForTier('founding'), ['pdf', 'epub', 'worksheets'])
})
