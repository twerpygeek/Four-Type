# FourType Field Guide Book Object Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the guide look like a tangible 3D book, sell one US$12 Founding Digital Supporter edition, add character companions, and enable a free-copy Stripe code.

**Architecture:** Reduce the catalog to the existing `founding` entitlement, price it at US$12 and include all private assets. Enhance the existing CSS book with semantic spine, page-stack and fore-edge layers. Add a small presentational character component that uses the existing FourType artwork. Stripe Checkout remains server-owned and adds promotion-code support.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS transforms, Next Image, Stripe Checkout, Vercel Blob, Node test runner, Playwright.

## Global Constraints

- Preserve private asset storage, webhooks, access tokens, approved book files and accessible preview behavior.
- Offer only `Founding Digital Supporter — US$12`, including PDF, EPUB, worksheet pack and Edition 1 revisions.
- Use existing Commander, Bard, Strategist and Guardian assets only.
- Configure `FOURTYPEGIFT` as 100% off, 100 redemptions, no expiry, for the Founding Digital Supporter product only.
- Do not submit a payment during verification.

---

### Task 1: Reduce the catalog and entitlement to one US$12 edition

**Files:**
- Modify: `lib/field-guide/catalog.ts`
- Modify: `data/field-guide-release.json`
- Modify: `tests/field-guide-catalog.test.ts`
- Modify: `tests/field-guide-entitlements.test.ts`

**Interfaces:** `SupporterTierKey` becomes `'founding'`. `getSupporterOffer('founding', 'usd')` returns `{ amount: 1200, label: 'US$12', priceEnv: 'STRIPE_FOUNDING_DIGITAL_USD_PRICE_ID' }`. `assetsForTier('founding')` returns `['pdf', 'epub', 'worksheets']`.

- [ ] **Step 1: Write failing tests**

```ts
assert.deepEqual(SUPPORTER_TIERS, ['founding'])
assert.equal(getSupporterOffer('founding', 'usd').amount, 1200)
assert.equal(parseSupporterSelection({ tier: 'field-guide', currency: 'usd' }), null)
assert.deepEqual(assetsForTier('founding'), ['pdf', 'epub', 'worksheets'])
```

- [ ] **Step 2: Verify they fail**

Run: `pnpm exec tsx --test tests/field-guide-catalog.test.ts tests/field-guide-entitlements.test.ts`

Expected: failure because two tiers and the US$25 founding offer remain.

- [ ] **Step 3: Implement minimal catalog and manifest updates**

```ts
export const SUPPORTER_TIERS = ['founding'] as const
const offers = {
  'founding:usd': { amount: 1200, label: 'US$12', priceEnv: 'STRIPE_FOUNDING_DIGITAL_USD_PRICE_ID' },
} as const
```

Set all three asset `tiers` values in `data/field-guide-release.json` to `['founding']`.

- [ ] **Step 4: Verify they pass**

Run: `pnpm exec tsx --test tests/field-guide-catalog.test.ts tests/field-guide-entitlements.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

Run: `git add lib/field-guide/catalog.ts data/field-guide-release.json tests/field-guide-catalog.test.ts tests/field-guide-entitlements.test.ts && git commit -m "Simplify Field Guide to one founding edition"`

### Task 2: Enable promotion-code entry in Checkout

**Files:**
- Modify: `lib/field-guide/checkout.ts`
- Modify: `tests/field-guide-checkout.test.ts`

**Interfaces:** Checkout input gains `allow_promotion_codes: true` while price, metadata and access URLs remain server-owned.

- [ ] **Step 1: Write a failing session-contract test**

```ts
assert.equal(capturedSession.allow_promotion_codes, true)
assert.deepEqual(capturedSession.line_items, [{ price: 'price_founding_digital', quantity: 1 }])
```

- [ ] **Step 2: Verify it fails**

Run: `pnpm exec tsx --test tests/field-guide-checkout.test.ts`

Expected: failure because `allow_promotion_codes` is absent.

- [ ] **Step 3: Add the typed Checkout option**

```ts
type CheckoutSessionInput = {
  mode: 'payment'
  customer_creation: 'always'
  allow_promotion_codes: true
  // existing line_items, metadata and URLs
}

// in stripe.checkout.sessions.create input
allow_promotion_codes: true,
```

- [ ] **Step 4: Verify it passes**

Run: `pnpm exec tsx --test tests/field-guide-checkout.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

Run: `git add lib/field-guide/checkout.ts tests/field-guide-checkout.test.ts && git commit -m "Enable Field Guide promotion codes"`

### Task 3: Render a real book object in the hero

**Files:**
- Modify: `components/field-guide/InteractiveBook.tsx`
- Modify: `app/field-guide/field-guide.css`
- Modify: `tests/field-guide-accessibility.spec.ts`
- Modify: `tests/field-guide-responsive.spec.ts`

**Interfaces:** The preview button keeps `aria-label="Open the Field Guide page preview"`. New decorative layers are `.field-guide-book-spine`, `.field-guide-book-page-stack` and `.field-guide-book-fore-edge`.

- [ ] **Step 1: Write failing browser assertions**

```ts
await expect(page.locator('.field-guide-book-spine')).toHaveCount(1)
await expect(page.locator('.field-guide-book-page-stack')).toHaveCount(1)
await expect(page.locator('.field-guide-book-fore-edge')).toHaveCount(1)
```

- [ ] **Step 2: Verify browser tests fail**

Run: `pnpm exec playwright test tests/field-guide-accessibility.spec.ts tests/field-guide-responsive.spec.ts`

Expected: failure because the structural layers do not exist.

- [ ] **Step 3: Implement dimensional layers**

```tsx
<span className="field-guide-book-spine" aria-hidden="true" />
<span className="field-guide-book-page-stack" aria-hidden="true" />
<span className="field-guide-book-fore-edge" aria-hidden="true" />
<Image className="field-guide-book-cover" src="/images/field-guide/cover.webp" alt="FourType Field Guide cover" ... />
```

Use `transform-style: preserve-3d`, a left spine, lined right fore-edge, small page-stack offset and one elliptical floor shadow. Retain pointer tilt. At the mobile breakpoint reduce depth, but keep the page block. Reduced-motion uses a stable transform.

- [ ] **Step 4: Verify responsive behavior**

Run: `pnpm exec playwright test tests/field-guide-accessibility.spec.ts tests/field-guide-responsive.spec.ts`

Expected: PASS at 320px, 768px and desktop.

- [ ] **Step 5: Commit**

Run: `git add components/field-guide/InteractiveBook.tsx app/field-guide/field-guide.css tests/field-guide-accessibility.spec.ts tests/field-guide-responsive.spec.ts && git commit -m "Render Field Guide as a dimensional book object"`

### Task 4: Add FourType character companions

**Files:**
- Create: `components/field-guide/CharacterCompanion.tsx`
- Modify: `app/field-guide/FieldGuideCampaign.tsx`
- Modify: `app/field-guide/field-guide.css`
- Modify: `tests/field-guide-content.test.ts`
- Modify: `tests/field-guide-accessibility.spec.ts`

**Interfaces:** `CharacterCompanion({ character, alt, className? })` accepts `commander | bard | strategist | guardian` and resolves to `/images/characters/<character>.png`.

- [ ] **Step 1: Write failing content checks**

```ts
assert.match(campaign, /CharacterCompanion character="commander"/)
assert.match(campaign, /CharacterCompanion character="bard"/)
assert.match(campaign, /CharacterCompanion character="strategist"/)
assert.match(campaign, /CharacterCompanion character="guardian"/)
```

- [ ] **Step 2: Verify they fail**

Run: `pnpm exec tsx --test tests/field-guide-content.test.ts`

Expected: failure because no companion component exists.

- [ ] **Step 3: Implement character component and editorial placements**

```ts
const characterAssets = {
  commander: '/images/characters/commander.png',
  bard: '/images/characters/bard.png',
  strategist: '/images/characters/strategist.png',
  guardian: '/images/characters/guardian.png',
} as const
```

Place Commander and Bard in the real-life and why-the-guide sections, then Strategist and Guardian in practical theory and delivery. Use varying editorial compositions rather than repeated cards. Images have descriptive alt text and move beneath copy on mobile.

- [ ] **Step 4: Verify content and accessibility**

Run: `pnpm exec tsx --test tests/field-guide-content.test.ts && pnpm exec playwright test tests/field-guide-accessibility.spec.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

Run: `git add components/field-guide/CharacterCompanion.tsx app/field-guide/FieldGuideCampaign.tsx app/field-guide/field-guide.css tests/field-guide-content.test.ts tests/field-guide-accessibility.spec.ts && git commit -m "Add FourType character companions"`

### Task 5: Make the sales UI one-edition only

**Files:**
- Modify: `components/field-guide/SupporterTiers.tsx`
- Modify: `app/field-guide/FieldGuideCampaign.tsx`
- Modify: `app/field-guide/terms/page.tsx`
- Modify: `tests/field-guide-content.test.ts`
- Modify: `tests/field-guide-responsive.spec.ts`

**Interfaces:** One `.field-guide-tier` displays `Founding Digital Supporter`, calls `CheckoutButton` with `{ tier: 'founding', currency: 'usd' }`, and lists PDF, EPUB, worksheets and Edition 1 revisions.

- [ ] **Step 1: Write failing one-tier assertions**

```ts
assert.match(component, /Founding Digital Supporter/)
assert.doesNotMatch(component, /Digital Edition|US\$25/)
await expect(page.locator('.field-guide-tier')).toHaveCount(1)
```

- [ ] **Step 2: Verify they fail**

Run: `pnpm exec tsx --test tests/field-guide-content.test.ts && pnpm exec playwright test tests/field-guide-responsive.spec.ts`

Expected: failure because two cards remain.

- [ ] **Step 3: Implement one-card purchase UI**

```tsx
<p className="field-guide-tier-kicker">Founding Digital Supporter</p>
<p className="field-guide-tier-price">{getSupporterOffer('founding', 'usd').label}</p>
<CheckoutButton tier="founding" currency="usd" ...>Get the Field Guide</CheckoutButton>
```

Update FAQ, delivery and terms to describe one edition with all three downloads.

- [ ] **Step 4: Verify it passes**

Run: `pnpm exec tsx --test tests/field-guide-content.test.ts && pnpm exec playwright test tests/field-guide-responsive.spec.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

Run: `git add components/field-guide/SupporterTiers.tsx app/field-guide/FieldGuideCampaign.tsx app/field-guide/terms/page.tsx tests/field-guide-content.test.ts tests/field-guide-responsive.spec.ts && git commit -m "Present one Founding Digital Supporter edition"`

### Task 6: Configure the live Stripe price and giveaway promotion

**Systems:** Stripe live catalog and Vercel production project `iango/four-type`.

- [ ] **Step 1: Inspect the existing Founding Supporter price**

List Stripe prices and verify the legacy US$25 price ID, amount and active status before changing it.

- [ ] **Step 2: Create the idempotent US$12 price**

Create an active price for `FourType Field Guide: Founding Digital Supporter` with `currency=usd`, `unit_amount=1200`, lookup key `fourtype_founding_digital_usd`, and metadata `product=fourtype-field-guide`, `tier=founding`.

- [ ] **Step 3: Create the promotion**

Create a once-duration 100%-off coupon, then an active promotion code with `code=FOURTYPEGIFT`, `max_redemptions=100`, no expiry and product restriction to the new Founding Digital Supporter product.

- [ ] **Step 4: Update production configuration and archive legacy price**

Set Vercel `STRIPE_FOUNDING_DIGITAL_USD_PRICE_ID` to the new price. Keep secrets unchanged. After checkout verification, archive the old US$25 price with `active=false`; do not delete it.

- [ ] **Step 5: Verify hosted Checkout without payment**

Confirm the hosted page shows `FourType Field Guide: Founding Digital Supporter`, `$12.00`, a promotion-code entry, and that `FOURTYPEGIFT` reduces the total to `$0.00`. Do not enter card details or submit checkout.

### Task 7: Full validation and deployment

**Files:**
- Modify: `docs/field-guide-sales-page-validation.json` only when its assertions need the one-tier result.

- [ ] **Step 1: Run checks**

```bash
pnpm test
./node_modules/.bin/tsc --noEmit
pnpm build
pnpm audit:field-guide-assets
pnpm exec playwright test tests/field-guide-accessibility.spec.ts tests/field-guide-responsive.spec.ts
```

Expected: every command exits 0.

- [ ] **Step 2: Inspect screenshots**

Capture 1440px and 320px. Confirm book cover, spine, fore-edge and shadow are visible; characters do not overlap copy; and one US$12 tier fits the viewport.

- [ ] **Step 3: Commit and deploy**

Run: `git add . && git commit -m "Polish Field Guide book object and single edition" && git push origin main`

- [ ] **Step 4: Verify production**

Confirm the live page returns 200, contains `Founding Digital Supporter` and `US$12`, contains no `US$25` or `Digital Edition`, opens the preview and creates Stripe Checkout with promotion entry.

