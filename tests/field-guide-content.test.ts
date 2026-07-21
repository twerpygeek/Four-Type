import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const page = readFileSync('app/field-guide/page.tsx', 'utf8')
const campaign = readFileSync('app/field-guide/FieldGuideCampaign.tsx', 'utf8')
const supporterTiers = 'components/field-guide/SupporterTiers.tsx'

test('uses supporter framing and responsible-use language', () => {
  assert.match(campaign, /Help more people read the room/)
  assert.match(campaign, /reflective framework/i)
  assert.match(campaign, /diagnose, rank, hire, exclude/i)
  assert.doesNotMatch(campaign, /donat(e|ion)|tax-deductible contribution/i)
})

test('uses exact honest digital reward and access wording', () => {
  assert.match(campaign, /digital rewards\. Nothing is shipped\./)
  assert.match(campaign, /PDF preserves the designed 7 x 10 page experience/i)
  assert.match(campaign, /EPUB reflows for adjustable text and compatible reading apps/i)
  assert.match(campaign, /personal use does not permit reposting or redistributing the files/i)
  assert.match(campaign, /not charitable or tax-deductible support/i)
  assert.match(campaign, /revisions released within Edition 1/i)
  assert.match(campaign, /does not include every future publication/i)
  assert.match(campaign, /secure access links can expire/i)
  assert.match(campaign, /request fresh access/i)
})

test('renders configured policy links without inventing unavailable routes', () => {
  assert.match(campaign, /getFieldGuidePolicies/)
  assert.match(campaign, /FieldGuidePolicyLinks/)
})

test('exposes policy and contact routes on supporter status pages', () => {
  for (const page of [
    readFileSync('app/field-guide/success/page.tsx', 'utf8'),
    readFileSync('app/field-guide/access/page.tsx', 'utf8'),
  ]) {
    assert.match(page, /getFieldGuidePolicies/)
    assert.match(page, /FieldGuidePolicyLinks/)
  }
})

test('publishes truthful metadata without ratings', () => {
  assert.match(page, /https:\/\/www\.fourtype\.com\/field-guide/)
  assert.match(page, /Product/)
  assert.doesNotMatch(page, /aggregateRating|reviewRating/)
  assert.doesNotMatch(page, /InStock/)
})

test('renders active supporter controls with explicit session-persisted currency selection', () => {
  assert.match(campaign, /<SupporterTiers \/>/)

  const component = readFileSync(supporterTiers, 'utf8')
  assert.match(component, /sessionStorage/)
  assert.match(component, /USD/)
  assert.match(component, /MYR/)
  assert.match(component, /role="group"/)
  assert.match(component, /aria-label="Choose checkout currency"/)
  assert.match(component, /Support and receive the guide/)
  assert.match(component, /Become a Founding Supporter/)
  assert.doesNotMatch(component, /disabled aria-disabled="true"/)
})
