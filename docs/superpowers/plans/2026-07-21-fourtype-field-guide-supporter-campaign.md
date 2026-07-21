# FourType Field Guide Supporter Campaign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a cinematic, accessible supporter campaign for the FourType Field Guide with Stripe test-mode Checkout, private Vercel Blob rewards, secure re-access, an interactive book preview, and a Founding Supporter worksheet pack.

**Architecture:** A server-rendered Next.js App Router page owns metadata and campaign content while small client components own book tilt, preview navigation, currency/tier selection, and analytics. Server-only modules map allowlisted tier/currency keys to Stripe Price IDs, verify Checkout and webhooks, persist idempotent entitlements in private Vercel Blob, sign accountless access tokens, and mint short-lived Blob URLs after authorization.

**Tech Stack:** Next.js 16, React 19, TypeScript 5.7, Tailwind CSS 4, Stripe-hosted Checkout, `stripe` 22.3.2, `@vercel/blob` 2.6.1, Resend REST API through the existing email helper, Vercel Analytics, Node test runner through `tsx`, Playwright, Python `pypdf`, Poppler.

## Global Constraints

- Do not deploy, publish, create live-mode Stripe objects, or charge anyone.
- The campaign is ongoing; do not add a funding target, deadline, countdown, fake supporter count, fake testimonial, rating, scarcity claim, or charitable framing.
- Use supporter language. Do not call payments donations or imply tax deductibility.
- Keep the quiz free and visible as an alternate action.
- Use the approved 144-page PDF and final EPUB only after hash verification.
- Never place complete reward files in `public/`, client bundles, static exports, source maps, or preview endpoints.
- Field Guide Supporter is US$12 or RM39. Founding Supporter is US$25 or RM79.
- Founding Supporter includes revisions within Edition 1, not every future book or Edition 2.
- Use explicit USD/MYR selection; do not silently geolocate currency.
- Preserve the canonical Commander/Choleric, Bard/Sanguine, Strategist/Melancholic, and Guardian/Phlegmatic mappings.
- Treat FourType as a reflective framework, not diagnosis, ranking, hiring, exclusion, or fixed identity.
- Respect `prefers-reduced-motion`, keyboard navigation, touch input, semantic HTML, descriptive alt text, 320-pixel layouts, and visible focus.
- Reuse Cinzel, DM Sans, Lucide, current analytics, Navigation, Footer, and existing dependencies where suitable.
- Private Blob must use a private store. Private sale files are immutable and release-versioned.
- Stripe secrets, Blob credentials, tokens, customer data, and payment payloads remain server-only and must not be logged.
- Fulfillment must be idempotent and require a paid Checkout Session.
- Webhook signature verification must use the raw request body.
- No unrelated website rewrites.

---

## Planned File Structure

### Release preparation

- `scripts/field-guide/prepare_release.py` — verify source hashes, extract worksheet pages, render web previews, and write a generated asset report.
- `scripts/field-guide/upload_release.mjs` — verify local hashes again and upload immutable reward files to private Blob.
- `scripts/field-guide/create_stripe_test_catalog.mjs` — create or reuse test-mode Stripe products and prices, refusing live keys.
- `data/field-guide-release.json` — committed release ID, source hashes, private Blob pathnames, MIME types, sizes, customer filenames, and tier eligibility.
- `private/field-guide/edition-1/` — ignored local staging for the three complete reward files.
- `public/images/field-guide/` — cover derivative, Open Graph artwork, and eight optimized preview images only.

### Domain and server modules

- `lib/field-guide/catalog.ts` — public campaign configuration and strict tier/currency validation.
- `lib/field-guide/release.ts` — server release-manifest loader and asset authorization.
- `lib/field-guide/stripe.ts` — server-only Stripe client and Checkout Session helpers.
- `lib/field-guide/tokens.ts` — HMAC access/download token signing and verification.
- `lib/field-guide/blob.ts` — private Blob JSON operations and signed download URL creation.
- `lib/field-guide/entitlements.ts` — entitlement types, deterministic paths, reads, and idempotent writes.
- `lib/field-guide/fulfillment.ts` — paid-session verification and tier-specific fulfillment.
- `lib/field-guide/email.ts` — supporter receipt/access email using existing Resend configuration.

### Routes and UI

- `app/field-guide/page.tsx` — metadata, structured data, server campaign shell.
- `app/field-guide/FieldGuideCampaign.tsx` — campaign narrative and composition.
- `app/field-guide/success/page.tsx` — server-verified immediate fulfillment/access.
- `app/field-guide/cancelled/page.tsx` — calm cancellation state.
- `app/field-guide/access/page.tsx` — signed supporter-access page.
- `app/api/field-guide/checkout/route.ts` — allowlisted Checkout creation.
- `app/api/field-guide/webhook/route.ts` — verified Stripe webhook.
- `app/api/field-guide/request-access/route.ts` — non-disclosing email re-access.
- `app/api/field-guide/download/[asset]/route.ts` — entitlement check and short-lived private Blob URL.
- `components/field-guide/InteractiveBook.tsx` — CSS 3D book interaction.
- `components/field-guide/FourTypeCompass.tsx` — accessible model interaction.
- `components/field-guide/BookPreview.tsx` — accessible page preview and lightbox.
- `components/field-guide/SupporterTiers.tsx` — explicit currency and tier selection.
- `components/field-guide/CheckoutButton.tsx` — checkout request and redirect.
- `components/field-guide/CampaignAnalytics.tsx` — typed campaign event bridge.
- `components/field-guide/SupporterDownloads.tsx` — entitlement-aware reward list.

### Tests and documentation

- `tests/field-guide-catalog.test.ts`
- `tests/field-guide-release.test.ts`
- `tests/field-guide-tokens.test.ts`
- `tests/field-guide-entitlements.test.ts`
- `tests/field-guide-checkout.test.ts`
- `tests/field-guide-fulfillment.test.ts`
- `tests/field-guide-webhook.test.ts`
- `tests/field-guide-download.test.ts`
- `tests/field-guide-content.test.ts`
- `tests/field-guide-assets.test.ts`
- `tests/field-guide-accessibility.spec.ts`
- `tests/field-guide-responsive.spec.ts`
- `docs/field-guide-sales-page-handoff.md`

---

### Task 1: Lock the supporter catalog and release contract

**Files:**
- Create: `lib/field-guide/catalog.ts`
- Create: `lib/field-guide/release.ts`
- Create: `data/field-guide-release.json`
- Create: `tests/field-guide-catalog.test.ts`
- Create: `tests/field-guide-release.test.ts`
- Modify: `.gitignore`

**Interfaces:**
- Produces: `SupporterTierKey`, `CurrencyKey`, `getSupporterOffer(tier, currency)`, `parseSupporterSelection(value)`, `FIELD_GUIDE_RELEASE`, and `assetsForTier(tier)`.
- Consumes: no new application interfaces.

- [ ] **Step 1: Write failing catalog tests**

```ts
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
```

- [ ] **Step 2: Run the catalog tests and confirm failure**

Run: `pnpm exec tsx --test tests/field-guide-catalog.test.ts`

Expected: FAIL because `lib/field-guide/catalog.ts` does not exist.

- [ ] **Step 3: Implement the public catalog**

```ts
export const SUPPORTER_TIERS = ['field-guide', 'founding'] as const
export const SUPPORTER_CURRENCIES = ['usd', 'myr'] as const
export type SupporterTierKey = (typeof SUPPORTER_TIERS)[number]
export type CurrencyKey = (typeof SUPPORTER_CURRENCIES)[number]

const offers = {
  'field-guide:usd': { amount: 1200, label: 'US$12', priceEnv: 'STRIPE_FIELD_GUIDE_USD_PRICE_ID' },
  'field-guide:myr': { amount: 3900, label: 'RM39', priceEnv: 'STRIPE_FIELD_GUIDE_MYR_PRICE_ID' },
  'founding:usd': { amount: 2500, label: 'US$25', priceEnv: 'STRIPE_FOUNDING_SUPPORTER_USD_PRICE_ID' },
  'founding:myr': { amount: 7900, label: 'RM79', priceEnv: 'STRIPE_FOUNDING_SUPPORTER_MYR_PRICE_ID' },
} as const

export function getSupporterOffer(tier: SupporterTierKey, currency: CurrencyKey) {
  return offers[`${tier}:${currency}`]
}

export function parseSupporterSelection(value: unknown) {
  if (!value || typeof value !== 'object') return null
  const input = value as Record<string, unknown>
  if (!SUPPORTER_TIERS.includes(input.tier as SupporterTierKey)) return null
  if (!SUPPORTER_CURRENCIES.includes(input.currency as CurrencyKey)) return null
  return { tier: input.tier as SupporterTierKey, currency: input.currency as CurrencyKey }
}
```

- [ ] **Step 4: Write failing release-manifest tests**

```ts
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
```

- [ ] **Step 5: Implement the release JSON and typed loader**

Use `data/field-guide-release.json` with exact keys:

```json
{
  "id": "field-guide-edition-1-20260721",
  "edition": "Edition 1",
  "assets": {
    "pdf": {
      "pathname": "field-guide/edition-1/FourType-Field-Guide.pdf",
      "customerFilename": "FourType-Field-Guide.pdf",
      "mimeType": "application/pdf",
      "sha256": "18aa32b98edd6c2e53d510d3aa660811177f0a63b62a0d7c370340649e974617",
      "tiers": ["field-guide", "founding"]
    },
    "epub": {
      "pathname": "field-guide/edition-1/FourType-Field-Guide.epub",
      "customerFilename": "FourType-Field-Guide.epub",
      "mimeType": "application/epub+zip",
      "sha256": "f1b3ecdf1ba442f02c6ba37018de4748205584ec3d3659cc60dcf534d924b850",
      "tiers": ["field-guide", "founding"]
    },
    "worksheets": {
      "pathname": "field-guide/edition-1/FourType-Field-Guide-Worksheets.pdf",
      "customerFilename": "FourType-Field-Guide-Worksheets.pdf",
      "mimeType": "application/pdf",
      "sha256": "153a9683e15687ba53c97ba59e2c5446d5e7a18dfe2666f94c382db64e1b3d6f",
      "tiers": ["founding"]
    }
  }
}
```

`lib/field-guide/release.ts` imports the JSON, validates its shape at module initialization, and exports asset keys as `FieldGuideAssetKey`. The worksheet hash is the deterministic result of extracting pages 131–140 with the bundled `pypdf` runtime and fixed metadata; Task 2 must reproduce it exactly.

- [ ] **Step 6: Ignore private staging and run tests**

Add:

```gitignore
private/field-guide/
```

Run: `pnpm exec tsx --test tests/field-guide-catalog.test.ts tests/field-guide-release.test.ts`

Expected: PASS.

- [ ] **Step 7: Commit the catalog contract**

```bash
git add .gitignore data/field-guide-release.json lib/field-guide tests/field-guide-catalog.test.ts tests/field-guide-release.test.ts
git commit -m "Add Field Guide supporter catalog"
```

---

### Task 2: Prepare verified reward and preview assets

**Files:**
- Create: `scripts/field-guide/prepare_release.py`
- Create: `scripts/field-guide/upload_release.mjs`
- Create: `tests/field-guide-assets.test.ts`
- Create: `public/images/field-guide/cover.webp`
- Create: `public/images/field-guide/preview-01.webp`
- Create: `public/images/field-guide/preview-09.webp`
- Create: `public/images/field-guide/preview-10.webp`
- Create: `public/images/field-guide/preview-25.webp`
- Create: `public/images/field-guide/preview-77.webp`
- Create: `public/images/field-guide/preview-109.webp`
- Create: `public/images/field-guide/preview-131.webp`
- Create: `public/images/field-guide/preview-142.webp`
- Create: `public/images/field-guide/field-guide-social.jpg`
- Create: `data/field-guide-asset-report.json`
- Modify: `data/field-guide-release.json`

**Interfaces:**
- Produces: verified private reward staging, worksheet PDF, eight preview images, social artwork, asset report, upload script.
- Consumes: `FIELD_GUIDE_RELEASE` pathnames and hashes from Task 1.

- [ ] **Step 1: Write the failing public-asset boundary test**

```ts
import assert from 'node:assert/strict'
import test from 'node:test'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

test('public contains previews but no complete reward files', () => {
  const files = readdirSync(join(process.cwd(), 'public'), { recursive: true }).map(String)
  assert(files.some((name) => name.endsWith('preview-109.webp')))
  assert.equal(files.some((name) => /FourType-Field-Guide\.(pdf|epub)$/i.test(name)), false)
  assert.equal(files.some((name) => /Worksheets\.pdf$/i.test(name)), false)
})
```

- [ ] **Step 2: Run the asset test and confirm failure**

Run: `pnpm exec tsx --test tests/field-guide-assets.test.ts`

Expected: FAIL because preview assets do not exist.

- [ ] **Step 3: Implement deterministic release preparation**

The Python script must:

```python
PREVIEW_PAGES = [1, 9, 10, 25, 77, 109, 131, 142]
WORKSHEET_PAGES = list(range(131, 141))
EXPECTED_PDF_SHA256 = "18aa32b98edd6c2e53d510d3aa660811177f0a63b62a0d7c370340649e974617"
EXPECTED_EPUB_SHA256 = "f1b3ecdf1ba442f02c6ba37018de4748205584ec3d3659cc60dcf534d924b850"
```

It accepts `--pdf`, `--epub`, and `--project-root`; rejects a mismatched hash; verifies 144 pages at 504 x 720 points; runs `unzip -t`; parses all EPUB XML; copies the complete files to ignored staging with sanitized names; extracts PDF pages 131–140 into the worksheet pack; renders preview pages through `pdftoppm`; converts them to WebP at a maximum 1,400 pixels on the long edge; creates a 1,200 x 630 social image from the cover without altering the approved cover artwork; and writes exact sizes and hashes to `data/field-guide-asset-report.json`.

- [ ] **Step 4: Run preparation against the attached approved files**

Run:

```bash
python3 scripts/field-guide/prepare_release.py \
  --pdf "/Users/iangoh/Downloads/FourType Field Guide Temperatement Quest.pdf" \
  --epub "/Users/iangoh/Downloads/FourType Field Guide Temperatement Quest.epub" \
  --project-root "$PWD"
```

Expected: exit 0, three private staged rewards, eight WebP previews, one social image, and an asset report containing no failure entries.

- [ ] **Step 5: Implement a private-only upload script**

```js
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { put } from '@vercel/blob'

function digest(bytes) {
  return createHash('sha256').update(bytes).digest('hex')
}

if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error('BLOB_READ_WRITE_TOKEN is required')

for (const asset of releaseAssets) {
  const bytes = await readFile(asset.localPath)
  if (digest(bytes) !== asset.sha256) throw new Error(`Hash mismatch: ${asset.key}`)
  await put(asset.pathname, bytes, {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: false,
    contentType: asset.mimeType,
  })
}
```

The script supports `--dry-run`; dry-run performs every local verification and no network write.

- [ ] **Step 6: Verify previews and reward boundaries**

Run:

```bash
pnpm exec tsx --test tests/field-guide-assets.test.ts
node scripts/field-guide/upload_release.mjs --dry-run
```

Expected: PASS and a dry-run report listing exactly three private assets.

- [ ] **Step 7: Visually inspect all preview images and worksheet pages**

Render the worksheet pack to temporary PNGs and confirm no clipping, wrong pages, blank pages, broken glyphs, or unreadable text. Inspect all eight WebP previews and the social image.

- [ ] **Step 8: Commit release preparation and public derivatives**

```bash
git add scripts/field-guide data/field-guide-release.json data/field-guide-asset-report.json public/images/field-guide tests/field-guide-assets.test.ts
git commit -m "Prepare verified Field Guide rewards"
```

---

### Task 3: Build the supporter campaign page and metadata

**Files:**
- Create: `app/field-guide/page.tsx`
- Create: `app/field-guide/FieldGuideCampaign.tsx`
- Create: `app/field-guide/field-guide.css`
- Create: `tests/field-guide-content.test.ts`
- Modify: `components/Navigation.tsx`
- Modify: `components/Footer.tsx`
- Modify: `app/sitemap.ts`

**Interfaces:**
- Produces: `/field-guide`, campaign content, Product JSON-LD, navigation and sitemap entry.
- Consumes: `SUPPORTER_TIERS`, `getSupporterOffer`, preview assets, existing `Navigation` and `Footer`.

- [ ] **Step 1: Write failing content-boundary tests**

```ts
import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'

const page = readFileSync('app/field-guide/page.tsx', 'utf8')
const campaign = readFileSync('app/field-guide/FieldGuideCampaign.tsx', 'utf8')

test('uses supporter framing and responsible-use language', () => {
  assert.match(campaign, /Help more people read the room/)
  assert.match(campaign, /reflective framework/i)
  assert.match(campaign, /diagnose, rank, hire, exclude/i)
  assert.doesNotMatch(campaign, /donat(e|ion)|tax-deductible contribution/i)
})

test('publishes truthful metadata without ratings', () => {
  assert.match(page, /https:\/\/www\.fourtype\.com\/field-guide/)
  assert.match(page, /Product/)
  assert.doesNotMatch(page, /aggregateRating|reviewRating/)
})
```

- [ ] **Step 2: Run the content test and confirm failure**

Run: `pnpm exec tsx --test tests/field-guide-content.test.ts`

Expected: FAIL because the route does not exist.

- [ ] **Step 3: Implement server metadata and structured data**

`app/field-guide/page.tsx` exports metadata with:

```ts
export const metadata: Metadata = {
  title: 'Support FourType · Receive The FourType Field Guide',
  description: 'Support FourType and receive the complete 144-page illustrated Field Guide in PDF and EPUB, with practical tools for work, relationships, tension and repair.',
  alternates: { canonical: 'https://www.fourtype.com/field-guide' },
  openGraph: {
    type: 'website',
    url: 'https://www.fourtype.com/field-guide',
    title: 'Help more people read the room · FourType',
    description: 'Support the next chapter of FourType and receive the complete illustrated Field Guide.',
    images: [{ url: '/images/field-guide/field-guide-social.jpg', width: 1200, height: 630, alt: 'The FourType Field Guide supporter campaign' }],
  },
}
```

Product JSON-LD contains only accurate digital format, availability, USD/MYR offer data, brand and URL fields.

- [ ] **Step 4: Implement the editorial campaign composition**

Use semantic sections in this order:

```tsx
<Navigation />
<main id="main-content" className="fieldGuideCampaign">
  <CampaignHero />
  <MissionSection />
  <FourTypeModelSection />
  <WhyTheGuideExists />
  <InsideTheGuide />
  <BookPreview />
  <UseItWhen />
  <PracticalTools />
  <FormatsSection />
  <SupporterTiers />
  <FulfillmentSteps />
  <ResponsibleUse />
  <CampaignFaq />
  <FinalSupportCta />
</main>
<Footer />
```

Use the approved campaign copy from the design specification. Keep section layouts varied: editorial split, full-width paper band, scene sequence, compass, preview rail, two tier panels, and text-led FAQ.

- [ ] **Step 5: Add discoverability without disturbing existing navigation**

Add `{ href: '/field-guide', label: 'Field Guide' }` to desktop/mobile navigation and Footer resources. Add a sitemap entry at priority `0.9`, change frequency `monthly`.

- [ ] **Step 6: Run content, lint and type checks**

Run:

```bash
pnpm exec tsx --test tests/field-guide-content.test.ts
pnpm lint
pnpm exec tsc --noEmit
```

Expected: all commands exit 0.

- [ ] **Step 7: Commit the campaign page**

```bash
git add app/field-guide components/Navigation.tsx components/Footer.tsx app/sitemap.ts tests/field-guide-content.test.ts
git commit -m "Build Field Guide supporter campaign"
```

---

### Task 4: Add professional book, compass and preview interactions

**Files:**
- Create: `components/field-guide/InteractiveBook.tsx`
- Create: `components/field-guide/FourTypeCompass.tsx`
- Create: `components/field-guide/BookPreview.tsx`
- Create: `components/field-guide/CampaignAnalytics.tsx`
- Modify: `app/field-guide/FieldGuideCampaign.tsx`
- Modify: `app/field-guide/field-guide.css`
- Modify: `lib/analytics.ts`
- Modify: `tests/analytics.test.ts`

**Interfaces:**
- Produces: keyboard/touch/mouse interactions and campaign analytics events.
- Consumes: existing `trackFourTypeEvent`, preview image metadata, and catalog content.

- [ ] **Step 1: Extend the failing analytics allowlist test**

```ts
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

for (const event of expectedCampaignEvents) assert.equal(isFourTypeEventName(event), true)
```

- [ ] **Step 2: Run analytics tests and confirm failure**

Run: `pnpm exec tsx --test tests/analytics.test.ts`

Expected: FAIL on the first campaign event.

- [ ] **Step 3: Add typed campaign events without personal data fields**

Append the ten names to `FOURTYPE_EVENT_NAMES`. Extend the payload only with:

```ts
tier?: 'field-guide' | 'founding'
currency?: 'usd' | 'myr'
asset?: 'pdf' | 'epub' | 'worksheets'
previewPage?: number
```

Do not add email, session ID, payment intent, access token, amount, card details, or Stripe response objects.

- [ ] **Step 4: Implement CSS-based 3D book interaction**

`InteractiveBook` uses pointer coordinates clamped to ±7 degrees, resets on pointer leave, opens preview on click/Enter/Space, and renders a stable object when reduced motion is active.

```ts
const rotateY = Math.max(-7, Math.min(7, ((clientX - left) / width - 0.5) * 14))
const rotateX = Math.max(-5, Math.min(5, -((clientY - top) / height - 0.5) * 10))
```

No Three.js, canvas, requestAnimationFrame loop, or decorative continuous animation is added.

- [ ] **Step 5: Implement the accessible FourType compass**

Use four buttons in a radiogroup-like roving-focus model. Arrow keys move focus. Enter/Space selects. Each selection reveals:

```ts
{
  commander: { classical: 'Choleric', contribution: 'Direction and ownership', crowdsOut: 'Context and consent', question: 'What needs to move?' },
  bard: { classical: 'Sanguine', contribution: 'Energy and invitation', crowdsOut: 'Continuity and limits', question: 'Why could this matter?' },
  strategist: { classical: 'Melancholic', contribution: 'Evidence and clarity', crowdsOut: 'Momentum and accessibility', question: 'What can I actually see?' },
  guardian: { classical: 'Phlegmatic', contribution: 'Steadiness and care', crowdsOut: 'Directness and change', question: 'What can I genuinely carry?' },
}
```

- [ ] **Step 6: Implement the preview viewer**

The viewer owns an eight-item array with page number, image path, title and alt text. It supports previous/next wrapping, thumbnails, ArrowLeft/ArrowRight, Escape, focus restoration, touch swipe over 50 pixels, and no swipe interception during vertical scrolling.

- [ ] **Step 7: Add reduced-motion and responsive CSS**

```css
@media (prefers-reduced-motion: reduce) {
  .fieldGuideCampaign *,
  .fieldGuideCampaign *::before,
  .fieldGuideCampaign *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .interactiveBook { transform: none !important; }
}
```

- [ ] **Step 8: Run unit tests and browser smoke test**

Run:

```bash
pnpm exec tsx --test tests/analytics.test.ts tests/field-guide-content.test.ts
pnpm exec tsc --noEmit
```

Expected: PASS with no TypeScript errors.

- [ ] **Step 9: Commit interactions**

```bash
git add components/field-guide app/field-guide lib/analytics.ts tests/analytics.test.ts
git commit -m "Add interactive Field Guide experience"
```

---

### Task 5: Add Stripe test catalog and secure Checkout creation

**Files:**
- Create: `lib/field-guide/stripe.ts`
- Create: `app/api/field-guide/checkout/route.ts`
- Create: `components/field-guide/CheckoutButton.tsx`
- Create: `components/field-guide/SupporterTiers.tsx`
- Create: `scripts/field-guide/create_stripe_test_catalog.mjs`
- Create: `tests/field-guide-checkout.test.ts`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`

**Interfaces:**
- Produces: `getStripe()`, `getConfiguredPriceId(tier, currency)`, `createFieldGuideCheckout(selection, origin)`, checkout API response `{ url: string }`.
- Consumes: `parseSupporterSelection`, offer configuration, `NEXT_PUBLIC_SITE_URL`.

- [ ] **Step 1: Install the official server dependencies**

Run: `pnpm add stripe@22.3.2 @vercel/blob@2.6.1`

Expected: package and lockfile include both dependencies.

- [ ] **Step 2: Write failing Checkout tests with an injected Stripe dependency**

```ts
test('maps an approved selection to a configured Price ID', async () => {
  const created: unknown[] = []
  const stripe = { checkout: { sessions: { create: async (input: unknown) => { created.push(input); return { url: 'https://checkout.stripe.test/session' } } } } }
  const result = await createFieldGuideCheckout({ tier: 'founding', currency: 'myr' }, 'http://localhost:3000', stripe as never)
  assert.equal(result.url, 'https://checkout.stripe.test/session')
  assert.deepEqual((created[0] as { line_items: unknown }).line_items, [{ price: 'price_test_founding_myr', quantity: 1 }])
})

test('rejects a live secret in non-live implementation', () => {
  assert.throws(() => assertTestStripeKey('sk_live_secret'), /test-mode/)
})
```

- [ ] **Step 3: Run Checkout tests and confirm failure**

Run: `pnpm exec tsx --test tests/field-guide-checkout.test.ts`

Expected: FAIL because the Stripe helper does not exist.

- [ ] **Step 4: Implement the server-only Stripe module**

```ts
import 'server-only'
import Stripe from 'stripe'

export function assertTestStripeKey(key: string) {
  if (!key.startsWith('sk_test_')) throw new Error('Only a Stripe test-mode secret is allowed')
}

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('Stripe Checkout is not configured')
  assertTestStripeKey(key)
  return new Stripe(key)
}
```

`createFieldGuideCheckout` maps the approved selection to one server environment variable and creates a one-time hosted Session with quantity 1, `customer_creation: 'always'`, metadata `{ product: 'fourtype-field-guide', tier, currency, releaseId }`, cancellation URL `/field-guide/cancelled`, and success URL `/field-guide/success?session_id={CHECKOUT_SESSION_ID}`.

- [ ] **Step 5: Implement the allowlisted checkout route and button**

The route parses JSON, calls `parseSupporterSelection`, rejects unsupported input with 400, creates the Session server-side, and returns only `{ url }`. The client button tracks checkout start, disables during submission, displays a recoverable error, and navigates with `window.location.assign(url)`.

- [ ] **Step 6: Implement the test-catalog script**

The script refuses any key not beginning `sk_test_`. It creates or reuses products by metadata key and prices by lookup keys:

```js
const prices = [
  ['fourtype_field_guide_usd', 'usd', 1200, 'field-guide'],
  ['fourtype_field_guide_myr', 'myr', 3900, 'field-guide'],
  ['fourtype_founding_usd', 'usd', 2500, 'founding'],
  ['fourtype_founding_myr', 'myr', 7900, 'founding'],
]
```

It prints the four environment-variable assignments and never writes secrets or modifies `.env` files.

- [ ] **Step 7: Run Checkout tests and dry configuration checks**

Run:

```bash
pnpm exec tsx --test tests/field-guide-checkout.test.ts
pnpm exec tsc --noEmit
```

Expected: PASS. If `STRIPE_SECRET_KEY` is unavailable, record account-object creation as blocked without weakening the code tests.

- [ ] **Step 8: Commit Checkout**

```bash
git add package.json pnpm-lock.yaml lib/field-guide/stripe.ts app/api/field-guide/checkout components/field-guide scripts/field-guide/create_stripe_test_catalog.mjs tests/field-guide-checkout.test.ts
git commit -m "Add Stripe supporter checkout"
```

---

### Task 6: Implement signed access tokens and private entitlements

**Files:**
- Create: `lib/field-guide/tokens.ts`
- Create: `lib/field-guide/blob.ts`
- Create: `lib/field-guide/entitlements.ts`
- Create: `tests/field-guide-tokens.test.ts`
- Create: `tests/field-guide-entitlements.test.ts`

**Interfaces:**
- Produces: `signAccessToken`, `verifyAccessToken`, `signDownloadToken`, `verifyDownloadToken`, `readEntitlement`, `writeEntitlement`, `findEntitlementsByEmail`, `createPrivateAssetUrl`.
- Consumes: release ID, tier and asset types from Tasks 1 and 2.

- [ ] **Step 1: Write failing token tests**

```ts
test('round-trips an access token and rejects tampering', () => {
  const token = signAccessToken({ sessionId: 'cs_test_123', expiresAt: 2_000 }, 'secret', 1_000)
  assert.equal(verifyAccessToken(token, 'secret', 1_500)?.sessionId, 'cs_test_123')
  assert.equal(verifyAccessToken(`${token}x`, 'secret', 1_500), null)
  assert.equal(verifyAccessToken(token, 'secret', 2_001), null)
})

test('scopes a download token to one asset', () => {
  const token = signDownloadToken({ sessionId: 'cs_test_123', asset: 'pdf', expiresAt: 2_000 }, 'secret', 1_000)
  assert.equal(verifyDownloadToken(token, 'secret', 1_500)?.asset, 'pdf')
})
```

- [ ] **Step 2: Implement HMAC tokens with constant-time verification**

Use base64url JSON payloads and `createHmac('sha256', secret)`. Compare signatures with `timingSafeEqual`. Reject malformed JSON, wrong token kind, missing bounded strings, invalid expiry, expired tokens, unsupported assets, and signatures of unequal length.

- [ ] **Step 3: Write failing entitlement tests against an in-memory Blob adapter**

```ts
test('uses one deterministic record per Checkout Session', async () => {
  const store = memoryBlobStore()
  const entitlement = paidEntitlement({ sessionId: 'cs_test_123', tier: 'founding' })
  await writeEntitlement(entitlement, store)
  await writeEntitlement(entitlement, store)
  assert.equal(store.putCalls.length, 2)
  assert.equal(store.keys().filter((key) => key.includes('cs_test_123')).length, 1)
})
```

- [ ] **Step 4: Implement entitlement paths and minimal records**

```ts
export type FieldGuideEntitlement = {
  version: 1
  sessionId: string
  paymentIntentId?: string
  tier: SupporterTierKey
  currency: CurrencyKey
  releaseId: string
  customerEmail: string
  paidAt: string
  fulfilledAt: string
}
```

Session records use `field-guide/entitlements/by-session/<sha256-session>.json`. Create them with `addRandomSuffix: false` and `allowOverwrite: false`; the first concurrent fulfillment wins, and a Blob-already-exists response becomes `already-fulfilled` without sending a second email. Email indexes use `field-guide/entitlements/by-email/<hmac-normalized-email>.json`. ETag conditional writes merge the session ID into the email index without duplication and retry a bounded three times on a precondition conflict.

- [ ] **Step 5: Implement private Blob reads and signed asset URLs**

Use non-overwriting `put()` for session entitlement records, ETag-protected overwrites for email indexes, and `get(..., { access: 'private', useCache: false })` for freshly written entitlement state. For each reward download, call `issueSignedToken({ pathname, operations: ['get'], validUntil })`, then `presignUrl(token, { pathname, operation: 'get', validUntil })`. Both expiries are limited to the configured 15-minute window and the returned URL is scoped to exactly one pathname.

- [ ] **Step 6: Run token and entitlement tests**

Run:

```bash
pnpm exec tsx --test tests/field-guide-tokens.test.ts tests/field-guide-entitlements.test.ts
pnpm exec tsc --noEmit
```

Expected: PASS.

- [ ] **Step 7: Commit entitlement infrastructure**

```bash
git add lib/field-guide tests/field-guide-tokens.test.ts tests/field-guide-entitlements.test.ts
git commit -m "Add private supporter entitlements"
```

---

### Task 7: Implement idempotent fulfillment, webhook verification and email

**Files:**
- Create: `lib/field-guide/fulfillment.ts`
- Create: `lib/field-guide/email.ts`
- Create: `app/api/field-guide/webhook/route.ts`
- Create: `tests/field-guide-fulfillment.test.ts`
- Create: `tests/field-guide-webhook.test.ts`
- Modify: `lib/email-delivery.ts`

**Interfaces:**
- Produces: `fulfillFieldGuideCheckout(sessionId, dependencies)`, verified webhook POST handler, `sendSupporterAccessEmail(entitlement, accessUrl)`.
- Consumes: Stripe session retrieval, catalog metadata, entitlement writes, access tokens, current Resend configuration.

- [ ] **Step 1: Write failing fulfillment tests**

```ts
test('fulfills one paid supported Session idempotently', async () => {
  const deps = fakeDependencies({ payment_status: 'paid', metadata: { product: 'fourtype-field-guide', tier: 'founding', currency: 'usd', releaseId: RELEASE_ID } })
  const first = await fulfillFieldGuideCheckout('cs_test_paid', deps)
  const second = await fulfillFieldGuideCheckout('cs_test_paid', deps)
  assert.equal(first.status, 'fulfilled')
  assert.equal(second.status, 'already-fulfilled')
  assert.equal(deps.emailCalls.length, 1)
})

test('never fulfills an unpaid Session', async () => {
  const deps = fakeDependencies({ payment_status: 'unpaid' })
  await assert.rejects(() => fulfillFieldGuideCheckout('cs_test_unpaid', deps), /not paid/)
  assert.equal(deps.writeCalls.length, 0)
})
```

- [ ] **Step 2: Implement fulfillment as a reusable server function**

The function retrieves the Session with line items, checks `payment_status === 'paid'`, verifies metadata product/tier/currency/release ID, confirms the configured Price ID matches the Session line item, checks existing entitlement, writes a new entitlement, signs a 30-day access token, and sends email once. It returns a bounded status object and never returns customer payment data.

- [ ] **Step 3: Write failing webhook tests**

```ts
test('rejects a missing or invalid Stripe signature', async () => {
  const response = await POST(new Request('http://localhost/api/field-guide/webhook', { method: 'POST', body: '{}' }))
  assert.equal(response.status, 400)
})

test('accepts completed and asynchronous paid events', async () => {
  for (const type of ['checkout.session.completed', 'checkout.session.async_payment_succeeded']) {
    const result = await handleVerifiedEvent({ type, data: { object: { id: 'cs_test_paid' } } } as never, fakeFulfill)
    assert.equal(result.handled, true)
  }
})
```

- [ ] **Step 4: Implement raw-body webhook verification**

Use `await request.text()`, require `stripe-signature`, call `stripe.webhooks.constructEvent(rawBody, signature, STRIPE_WEBHOOK_SECRET)`, and handle only completed/async-succeeded events. Return 400 for signature errors, 200 for unrelated events, and a retryable 500 if fulfillment storage fails.

- [ ] **Step 5: Extend the existing Resend helper safely**

Add a generic internal send function that keeps the existing profile email behavior unchanged. The supporter message lists the tier and rewards, links to `/field-guide/access?token=...`, states personal-use terms, and does not contain direct Blob URLs.

- [ ] **Step 6: Run fulfillment and webhook tests**

Run:

```bash
pnpm exec tsx --test tests/field-guide-fulfillment.test.ts tests/field-guide-webhook.test.ts
pnpm exec tsc --noEmit
```

Expected: PASS.

- [ ] **Step 7: Commit fulfillment**

```bash
git add lib/field-guide app/api/field-guide/webhook lib/email-delivery.ts tests/field-guide-fulfillment.test.ts tests/field-guide-webhook.test.ts
git commit -m "Fulfill Field Guide supporters securely"
```

---

### Task 8: Build success, access, re-access and download routes

**Files:**
- Create: `app/field-guide/success/page.tsx`
- Create: `app/field-guide/cancelled/page.tsx`
- Create: `app/field-guide/access/page.tsx`
- Create: `app/api/field-guide/request-access/route.ts`
- Create: `app/api/field-guide/download/[asset]/route.ts`
- Create: `components/field-guide/SupporterDownloads.tsx`
- Create: `tests/field-guide-download.test.ts`

**Interfaces:**
- Produces: verified immediate access, signed-token access, non-disclosing access renewal, asset-scoped download redirect.
- Consumes: fulfillment, token, entitlement, release and Blob interfaces.

- [ ] **Step 1: Write failing download authorization tests**

```ts
test('allows included assets and blocks the wrong tier', async () => {
  assert.equal(authorizeAsset(fieldGuideEntitlement, 'pdf').allowed, true)
  assert.equal(authorizeAsset(fieldGuideEntitlement, 'worksheets').allowed, false)
  assert.equal(authorizeAsset(foundingEntitlement, 'worksheets').allowed, true)
})

test('rejects expired, tampered and mismatched release tokens', async () => {
  assert.equal(await resolveDownload(expiredToken, dependencies), null)
  assert.equal(await resolveDownload(tamperedToken, dependencies), null)
  assert.equal(await resolveDownload(oldReleaseToken, dependencies), null)
})
```

- [ ] **Step 2: Implement server-verified success access**

The success page reads only a bounded `session_id`, calls `fulfillFieldGuideCheckout`, then renders `SupporterDownloads` from the resulting entitlement. Invalid or unpaid sessions show no customer information and no files.

- [ ] **Step 3: Implement signed access page**

The access page verifies the HMAC token, loads the matching entitlement, checks release ID, and renders exactly the tier's assets. Expired links show the access-renewal form.

- [ ] **Step 4: Implement non-disclosing access renewal**

Normalize and validate email length and syntax. HMAC the normalized address, load its private entitlement index, and send fresh access links to paid entitlements. Return the same 200 response and timing envelope whether records exist or not:

> If that email has a FourType supporter record, a fresh access link is on its way.

- [ ] **Step 5: Implement scoped download redirects**

The route validates the asset path parameter, verifies the download token, loads entitlement, checks tier and release, mints a signed GET URL for the exact private Blob pathname with a 15-minute expiry, and returns a 303 redirect. It records only tier/currency/asset in analytics.

- [ ] **Step 6: Implement calm cancelled and error states**

The cancelled page says no payment was completed, retains links to supporter levels and preview, tracks `field-guide-checkout-cancel`, and does not use alarm language.

- [ ] **Step 7: Run access/download tests**

Run:

```bash
pnpm exec tsx --test tests/field-guide-download.test.ts tests/field-guide-fulfillment.test.ts
pnpm exec tsc --noEmit
```

Expected: PASS.

- [ ] **Step 8: Commit secure access**

```bash
git add app/field-guide app/api/field-guide components/field-guide tests/field-guide-download.test.ts
git commit -m "Add secure supporter reward access"
```

---

### Task 9: Add policy-safe FAQ and configuration audit

**Files:**
- Create: `lib/field-guide/policies.ts`
- Create: `tests/field-guide-policies.test.ts`
- Modify: `app/field-guide/FieldGuideCampaign.tsx`
- Modify: `app/field-guide/success/page.tsx`
- Modify: `app/field-guide/access/page.tsx`

**Interfaces:**
- Produces: `getFieldGuidePolicies()` and `missingPolicyDecisions`.
- Consumes: policy URL environment variables.

- [ ] **Step 1: Write failing policy tests**

```ts
test('never invents a refund promise when policy is missing', () => {
  const policy = getFieldGuidePolicies({})
  assert.equal(policy.refund.href, null)
  assert.match(policy.refund.copy, /policy is being finalized/i)
  assert(policy.missing.includes('refund'))
})

test('uses configured first-party policy links only', () => {
  const policy = getFieldGuidePolicies({ FOURTYPE_REFUND_POLICY_URL: 'https://www.fourtype.com/refunds' })
  assert.equal(policy.refund.href, 'https://www.fourtype.com/refunds')
})
```

- [ ] **Step 2: Implement policy normalization**

Accept only `https://www.fourtype.com/` URLs or root-relative paths for refund, privacy, terms and contact. Missing links render plain text and are listed in the handoff rather than becoming dead anchors.

- [ ] **Step 3: Complete the FAQ copy**

State accurately:

- Digital only; no physical shipment.
- PDF preserves the designed 7 x 10 page experience.
- EPUB reflows for adjustable text and compatible reading apps.
- Personal use does not permit reposting or redistributing the files.
- Support is not a charitable or tax-deductible donation.
- Edition 1 revisions do not include every future publication.
- Secure links can expire; supporters can request fresh access.

- [ ] **Step 4: Run policy and content tests**

Run:

```bash
pnpm exec tsx --test tests/field-guide-policies.test.ts tests/field-guide-content.test.ts
pnpm exec tsc --noEmit
```

Expected: PASS.

- [ ] **Step 5: Commit policy-safe content**

```bash
git add lib/field-guide/policies.ts app/field-guide tests/field-guide-policies.test.ts tests/field-guide-content.test.ts
git commit -m "Add Field Guide policy safeguards"
```

---

### Task 10: Add browser accessibility, responsive and security verification

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/field-guide-accessibility.spec.ts`
- Create: `tests/field-guide-responsive.spec.ts`
- Create: `scripts/field-guide/audit_public_assets.mjs`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`

**Interfaces:**
- Produces: repeatable browser and bundle audits.
- Consumes: running Next.js app and completed campaign routes.

- [ ] **Step 1: Install Playwright test tooling**

Run:

```bash
pnpm add -D @playwright/test
pnpm exec playwright install chromium
```

Expected: Chromium installs successfully and lockfile changes are limited to Playwright dependencies.

- [ ] **Step 2: Write accessibility interaction tests**

```ts
test('book, compass, preview and tiers work by keyboard', async ({ page }) => {
  await page.goto('/field-guide')
  await page.getByRole('button', { name: /preview the field guide/i }).focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('dialog', { name: /field guide preview/i })).toBeVisible()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByText(/2 of 8/i)).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toBeHidden()
})
```

Also assert one H1, logical headings, alt text, visible focus, button names, no focus loss, and reduced-motion computed styles.

- [ ] **Step 3: Write responsive tests**

For widths 320, 768, 1280 and 1536, assert `document.documentElement.scrollWidth === document.documentElement.clientWidth`, campaign CTA visibility, book framing, preview controls, tier copy containment and no overlap. Capture full-page screenshots for 320, 768 and 1440 widths.

- [ ] **Step 4: Implement public/bundle asset audit**

The audit recursively scans `public/` and `.next/` for:

```js
const forbidden = [
  /FourType-Field-Guide\.pdf/i,
  /FourType-Field-Guide\.epub/i,
  /FourType-Field-Guide-Worksheets\.pdf/i,
  /sk_(test|live)_[A-Za-z0-9]+/,
  /whsec_[A-Za-z0-9]+/,
  /BLOB_READ_WRITE_TOKEN=/,
]
```

Allow only the public preview image filenames and non-secret environment variable names in server source maps.

- [ ] **Step 5: Run all browser and build checks**

Run:

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm test
pnpm build
pnpm exec playwright test tests/field-guide-accessibility.spec.ts tests/field-guide-responsive.spec.ts
node scripts/field-guide/audit_public_assets.mjs
```

Expected: all commands exit 0; no console errors, hydration warnings, failed requests, horizontal overflow, secret match or complete reward file.

- [ ] **Step 6: Inspect screenshots and network behavior**

Visually inspect desktop, tablet and mobile screenshots. Confirm the 3D book is fully visible, hero copy remains readable, real previews are sharp, tier differences are honest, focus rings are visible, and reduced motion removes tilt. Confirm below-the-fold preview images lazy-load and dimensions prevent layout shift.

- [ ] **Step 7: Commit QA tooling**

```bash
git add package.json pnpm-lock.yaml playwright.config.ts tests/field-guide-accessibility.spec.ts tests/field-guide-responsive.spec.ts scripts/field-guide/audit_public_assets.mjs
git commit -m "Verify Field Guide campaign experience"
```

---

### Task 11: Run Stripe/Blob integration checks and write the handoff

**Files:**
- Create: `docs/field-guide-sales-page-handoff.md`
- Create: `docs/field-guide-sales-page-validation.json`

**Interfaces:**
- Produces: complete evidence-backed handoff and safe live-mode checklist.
- Consumes: all routes, test catalog, private reward upload, browser screenshots and automated reports.

- [ ] **Step 1: Create or reuse test-mode Stripe objects when credentials exist**

Run: `node scripts/field-guide/create_stripe_test_catalog.mjs`

Expected: four test Price IDs are printed. The script must abort for any `sk_live_` key. Record product/price IDs in local environment configuration, never in client code or the committed handoff.

- [ ] **Step 2: Upload immutable private rewards when Blob credentials exist**

Run:

```bash
node scripts/field-guide/upload_release.mjs --dry-run
node scripts/field-guide/upload_release.mjs
```

Expected: both runs reverify all hashes; the second uploads exactly three private objects. Direct unauthenticated requests to their Blob URLs return unauthorized.

- [ ] **Step 3: Exercise Stripe test scenarios**

Using Stripe test mode and local webhook forwarding, verify:

- Field Guide Supporter in USD and MYR.
- Founding Supporter in USD and MYR.
- Checkout cancellation.
- Invalid Session ID.
- Unpaid Session.
- Duplicate completed webhook.
- Asynchronous success event.
- Temporary Blob write failure followed by successful webhook retry.
- Field Guide tier sees PDF and EPUB only.
- Founding tier sees PDF, EPUB and worksheets.
- Expired and tampered access links reveal no files.
- Re-access request sends a fresh link without disclosing whether other addresses exist.

- [ ] **Step 4: Write machine-readable validation results**

`docs/field-guide-sales-page-validation.json` records each command, exit code, screenshot path, release hash, test-mode scenario result, public-asset audit result, and any external check blocked by unavailable credentials. It contains no secret values, customer emails or Stripe payloads.

- [ ] **Step 5: Write the handoff report**

Include:

- Campaign narrative and supporter tiers.
- Routes, components and assets.
- Approved PDF/EPUB/worksheet hashes.
- Test-mode Stripe product and Price names used.
- Required and optional environment-variable names.
- Private Blob and entitlement model.
- Email/re-access behavior.
- Test, build, browser, accessibility and responsive results.
- Links to desktop, tablet and mobile screenshots.
- Missing refund/privacy/terms/contact decisions.
- Exact safe transition: create live products/prices, create live webhook secret, configure production private Blob/OIDC, upload verified release, set production policy URLs, run a real low-value controlled checkout only after explicit approval, then deploy.

- [ ] **Step 6: Run the final verification suite**

Run:

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm test
pnpm build
pnpm exec playwright test
node scripts/field-guide/audit_public_assets.mjs
git diff --check
```

Expected: all available checks pass. Any Stripe/Blob integration check blocked by unavailable credentials is reported as blocked, never silently marked passed.

- [ ] **Step 7: Commit documentation and validation evidence**

```bash
git add docs/field-guide-sales-page-handoff.md docs/field-guide-sales-page-validation.json
git commit -m "Document Field Guide campaign handoff"
```

---

## Completion Gate

The implementation is complete only when:

- `/field-guide` is visually polished from 320 pixels through wide desktop.
- The 3D book, compass and preview are keyboard-, touch-, mouse- and reduced-motion-safe.
- The campaign uses only grounded book claims and supporter language.
- The two tiers and USD/MYR amounts are exact.
- The complete PDF, EPUB and worksheet PDF are absent from every public/client artifact.
- Checkout creation is server-only and accepts no browser-controlled amount or Price ID.
- Paid status and metadata are verified before entitlement.
- Duplicate webhooks do not duplicate fulfillment or email.
- Downloads require valid entitlement and asset scope.
- Private Blob URLs expire and expose one object only.
- All unit, build, browser, accessibility, responsive and security checks pass.
- Test-mode Stripe and Blob scenarios are either verified or explicitly reported as blocked by missing credentials.
- The public website remains undeployed and unchanged until explicit approval.
