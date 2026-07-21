import assert from 'node:assert/strict'
import test from 'node:test'
import { getFieldGuidePolicies } from '../lib/field-guide/policies'

test('never invents a refund promise when policy is missing', () => {
  const policy = getFieldGuidePolicies({})

  assert.equal(policy.refund.href, null)
  assert.match(policy.refund.copy, /policy is being finalized/i)
  assert.match(policy.refund.copy, /does not make a refund promise/i)
  assert(policy.missing.includes('refund'))
})

test('accepts root-relative and first-party HTTPS policy URLs', () => {
  const policy = getFieldGuidePolicies({
    FOURTYPE_REFUND_POLICY_URL: '/refunds',
    FOURTYPE_PRIVACY_URL: 'https://fourtype.com/privacy',
    FOURTYPE_TERMS_URL: 'https://www.fourtype.com/terms#section',
    FOURTYPE_CONTACT_URL: 'https://www.fourtype.com/contact?topic=field-guide',
  })

  assert.equal(policy.refund.href, '/refunds')
  assert.equal(policy.privacy.href, 'https://fourtype.com/privacy')
  assert.equal(policy.terms.href, 'https://www.fourtype.com/terms#section')
  assert.equal(policy.contact.href, 'https://www.fourtype.com/contact?topic=field-guide')
  assert.deepEqual(policy.missing, [])
})

test('rejects unsafe or non-first-party policy URL values', () => {
  const invalidUrls = [
    '//evil.example/refunds',
    'http://www.fourtype.com/refunds',
    'https://evil.example/refunds',
    'https://www.fourtype.com.evil.example/refunds',
    'https://www.fourtype.com@evil.example/refunds',
    'https://www.fourtype.com:443/refunds',
    '/refunds\\next',
    '/refunds\u0000',
    'https://www.fourtype.com/refunds#javascript:alert(1)',
    'https://www.fourtype.com/refunds#section%0A',
  ]

  for (const value of invalidUrls) {
    const policy = getFieldGuidePolicies({ FOURTYPE_REFUND_POLICY_URL: value })
    assert.equal(policy.refund.href, null, value)
    assert(policy.missing.includes('refund'), value)
  }
})

test('reports every missing or rejected policy decision', () => {
  const policy = getFieldGuidePolicies({
    FOURTYPE_REFUND_POLICY_URL: 'https://outside.example/refunds',
    FOURTYPE_PRIVACY_URL: '/privacy',
  })

  assert.deepEqual(policy.missing, ['refund', 'terms', 'contact'])
  assert.match(policy.terms.copy, /terms.*being finalized/i)
  assert.match(policy.contact.copy, /contact.*being finalized/i)
})
