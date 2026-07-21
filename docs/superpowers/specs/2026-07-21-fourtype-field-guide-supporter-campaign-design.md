# FourType Field Guide Supporter Campaign Design

Date: 2026-07-21
Status: Ready for user review

## Summary

Build a production-quality supporter campaign at `/field-guide` for the complete FourType Field Guide. The experience should feel like an independent publishing campaign rather than a conventional product listing. People support the continued development of FourType and receive digital resources as clearly described supporter rewards.

The campaign is ongoing. It has no invented funding target, countdown, supporter count, deadline, scarcity claim, testimonial or charitable framing.

The approved visual direction is book-first editorial: a near-black cinematic hero, warm ivory typography, restrained gold accents, an interactive 3D book, an interactive FourType map, real approved page previews, practical scenes, calm supporter tiers and secure Stripe Checkout.

## Goals

- Give visitors a compelling reason to support FourType's educational work.
- Make the complete Field Guide feel valuable, practical and trustworthy.
- Keep the free quiz visibly free and useful.
- Explain FourType as a contextual reflective framework, not a fixed identity system.
- Accept test-mode support payments through secure Stripe-hosted Checkout.
- Fulfil supporter rewards through private Vercel Blob files and verified entitlements.
- Give legitimate supporters a safe way to regain access.
- Preserve the current FourType visual identity, terminology and responsible-use boundaries.
- Ship a fast, accessible, mobile-first experience without exposing book files or secrets.

## Non-goals

- No deployment or publication in this implementation phase.
- No Stripe live-mode objects or charges.
- No physical book or shipping workflow.
- No charitable, donation or tax-deductible claim.
- No crowdfunding escrow, all-or-nothing goal or campaign deadline.
- No account system, community platform or public supporter wall.
- No invented reviews, ratings, research claims, credentials or audience statistics.
- No rewrite of unrelated website pages.

## Verified source artifacts

The attached sale files are the approved content candidates and must be copied into private sale-file staging rather than `public/`.

### PDF

- Source name: `FourType Field Guide Temperatement Quest.pdf`
- Pages: 144
- Geometry: 504 x 720 points, equivalent to 7 x 10 inches
- Size at discovery: 1,032,963 bytes
- Modified: 2026-07-21 15:39:52 +0800
- SHA-256: `18aa32b98edd6c2e53d510d3aa660811177f0a63b62a0d7c370340649e974617`

### EPUB

- Source name: `FourType Field Guide Temperatement Quest.epub`
- Size at discovery: 12,397,208 bytes
- Modified: 2026-07-21 13:42:46 +0800
- ZIP integrity: passed
- SHA-256: `f1b3ecdf1ba442f02c6ba37018de4748205584ec3d3659cc60dcf534d924b850`

Before upload, the implementation must repeat the integrity checks and refuse files whose hashes do not match the release manifest.

Customer-facing filenames:

- `FourType-Field-Guide.pdf`
- `FourType-Field-Guide.epub`
- `FourType-Field-Guide-Worksheets.pdf`

## Campaign positioning

Primary campaign message:

> Help more people read the room.

Supporting message:

> FourType turns recurring patterns of direction, energy, clarity and steadiness into practical language people can use at work, at home and in moments of tension.

Reward bridge:

> Support the project and receive the complete illustrated Field Guide as your digital reward.

The campaign should repeatedly clarify:

- FourType describes recurring attention patterns, not permanent kinds of people.
- Context, timing, capacity and consent determine whether a contribution helps.
- The framework is for reflection and conversation.
- It must not be used to diagnose, rank, hire, exclude or permanently label people.

## Supporter levels

Pricing is configuration-driven. USD and MYR are explicit selectable currencies; no hidden geolocation or automatic currency switching is required.

### Field Guide Supporter

- US$12 or RM39
- Complete 144-page PDF
- Reflowable EPUB
- Immediate secure access after verified payment
- Personal-use license

### Founding Supporter

- US$25 or RM79
- Complete 144-page PDF
- Reflowable EPUB
- Separate printable worksheet pack
- Access to future revisions of Edition 1
- Personal-use license

The higher level is voluntary extra support. It must not imply charitable status, tax deductibility, ownership, investment, governance rights or preferential influence over the framework.

“Future revisions” means revised files released within Edition 1. It does not promise every future book, a future Edition 2, lifetime support or a publication schedule.

## Worksheet pack

Create a separate printable PDF from the approved Field Practice material in the finished book. Prefer lossless extraction of approved worksheet pages over recreation. The pack should include only pages that function independently as exercises or reference sheets. It should preserve the book's typography, page geometry and print quality.

The implementation must document the selected source pages and verify the extracted PDF page count, dimensions, text and rendering. Do not expose this file in `public/`.

## Page narrative

### 1. Campaign hero

- Campaign eyebrow: “Support the next chapter of FourType”
- Headline: “Help more people read the room.”
- One concise campaign explanation
- Interactive 3D book using the actual approved cover
- Primary action: “Become a supporter”
- Secondary action: “Preview the Field Guide”
- Reward note: “From US$12 / RM39 · 144-page PDF + reflowable EPUB · Secure digital access”

The book interaction uses CSS perspective and pointer position rather than a heavy 3D dependency. It reveals cover depth, page edges and restrained lighting. Mouse movement may tilt the object within a small range. Touch users receive a stable press response. Keyboard users can focus the book and open the preview. `prefers-reduced-motion` disables tilt and parallax.

### 2. Why support FourType

Explain that support helps FourType continue producing accessible guides, visual lessons, videos and practical tools while keeping the core quiz free. Do not describe how money is allocated with percentages unless verified records exist.

### 3. The central FourType idea

Use an interactive compass based on the book's canonical four attentions:

- Commander / Choleric: direction and ownership
- Bard / Sanguine: energy and invitation
- Strategist / Melancholic: evidence and clarity
- Guardian / Phlegmatic: steadiness and care

Hover, focus and tap reveal the useful contribution, what it may crowd out and one widening question. The interaction must not imply rank, diagnosis or fixed identity.

### 4. Why the Field Guide exists

Use the book's practical argument: the same contribution can be useful or costly depending on timing, condition, capacity and consent. Connect this to stalled meetings, repeated conflict, crowding out and repair without promising psychological outcomes.

### 5. Inside the Field Guide

Present accurate content groups derived from the book:

- The FourType Map and core method
- The four attention patterns
- Directional blends
- Stress and repair
- FourType in real life
- Field practice and worksheets
- Responsible use and historical lineage

Use varied editorial composition rather than repeated cards.

### 6. Interactive preview

Render eight representative approved pages at web resolution:

- Cover
- FourType map/table
- Two-axis diagram
- One house opener
- One directional blend
- One real-life scenario
- One practical method or repair page
- One worksheet

The full-resolution source PDF is never placed in a public directory. Preview images are optimized derivatives with fixed dimensions, meaningful alt text and no access to the source document.

The viewer supports:

- Previous and next controls
- Position indicator
- Thumbnail selection
- Arrow-key navigation
- Escape to close the enlarged preview
- Focus management
- Touch swipe when it does not interfere with page scrolling
- A non-modal inline preview on small screens
- Reduced-motion transitions

### 7. Use it when

Show a sequence of concrete human moments:

- A meeting has stalled.
- One contribution is crowding out the others.
- A conflict keeps repeating.
- A team needs to widen its response.
- You want to replay an interaction more fairly.

Use contemporary scenes and existing FourType imagery. Do not put medieval-costumed characters into modern office or household contexts unless the approved illustration already does so intentionally.

### 8. Practical tools

Explain only tools present in the approved book:

- Notice / Read / Widen
- Gift / Cost / Repair
- Crowding out
- Volume modulation
- Five-minute replay

The section should teach a small useful idea on the page rather than listing names alone.

### 9. Supporter levels

Present both tiers with the Field Guide Supporter level visually primary. Currency selection is explicit and persists for the session. No add-on is preselected.

Buttons use supporter language:

- “Support and receive the guide”
- “Become a Founding Supporter”

The page states that both are digital supporter rewards and no physical product is shipped.

### 10. Fulfillment explanation

Explain the four-step flow in plain language:

1. Choose a supporter level.
2. Complete secure Stripe Checkout.
3. Payment is verified on the server.
4. Open the private supporter-access page and download the included files.

### 11. Responsible use

Include the book's concise boundary: FourType is a reflective framework and should not be used to diagnose, rank, hire, exclude or permanently label people.

### 12. FAQ

Cover:

- What each supporter level includes
- Whether this is a physical book
- PDF versus EPUB
- EPUB compatibility, using careful device-specific language
- How secure downloads and re-access work
- Personal-use sharing restrictions
- What “future revisions of Edition 1” means
- Whether support is tax-deductible
- Refund policy
- Contact route

Refund wording remains configuration-controlled until the business policy is supplied. The UI must not invent a guarantee. Missing privacy, terms, refund or contact routes must be surfaced in the handoff and must not point to dead links.

### 13. Final campaign action

Close with:

> Keep your nature. Widen your choices.

Then provide one supporter action and a secondary link back to the free quiz.

## Visual system

- Near-black cinematic background
- Warm ivory body text
- Amber/gold emphasis
- Existing Choleric red, Sanguine gold, Melancholic blue and Phlegmatic green where the model requires them
- Cinzel for display roles and DM Sans for interface/body roles, following the existing app
- Fine borders and editorial rules rather than a wall of rounded cards
- Paper-light sections to echo the book's dark/light rhythm
- Subtle texture created with CSS, not large decorative blobs
- Real approved artwork and preview pages
- Controlled section spacing with visible content in every viewport

## Application architecture

The existing application is Next.js 16 App Router with React 19, TypeScript, Tailwind CSS 4, Vercel Analytics and server route handlers. The implementation should reuse this stack.

### Routes

- `GET /field-guide` — campaign page
- `POST /api/field-guide/checkout` — validate tier/currency and create a Stripe Checkout Session
- `POST /api/field-guide/webhook` — verify Stripe signature and fulfil completed paid sessions idempotently
- `GET /field-guide/success` — verify the supplied Checkout Session server-side and show available rewards
- `GET /field-guide/cancelled` — calm cancellation state with a return path
- `GET /field-guide/access` — supporter access page for a signed access token
- `POST /api/field-guide/request-access` — send an access link to a verified purchase email without revealing whether an address exists
- `GET /api/field-guide/download/[asset]` — verify entitlement, then issue a short-lived private Blob download response

### Component boundaries

- `FieldGuideCampaignPage` — server-rendered page shell, metadata and structured data
- `InteractiveBook` — isolated client interaction with reduced-motion behavior
- `FourTypeCompass` — accessible roving-focus model interaction
- `BookPreview` — accessible preview state, dialog and keyboard behavior
- `SupporterTierSelector` — tier and currency state, no payment secrets
- `CheckoutButton` — starts the server checkout request and handles recoverable errors
- `SupporterAccess` — server-verified entitlement view
- `DownloadList` — reward-specific downloads and expiration messaging
- `CampaignAnalytics` — typed, privacy-conscious event adapter

Each component receives plain configuration and content. Stripe, Blob and entitlement logic remain in server-only modules.

## Stripe design

Use Stripe-hosted Checkout in test mode.

- Create or reuse test-mode products and prices only after test credentials are available.
- Use separate configured price IDs for each tier and currency.
- Never accept an arbitrary price ID or amount from the browser.
- Browser requests send only the approved tier and currency keys.
- The server maps those keys to configured price IDs.
- Checkout requests only the information required for payment and delivery.
- The Checkout Session includes stable metadata: product key, tier key, currency key and release ID.
- Success URLs include Stripe's Checkout Session placeholder.
- Payment status is verified through Stripe on the server.
- `checkout.session.completed` is accepted only after signature verification.
- Fulfillment requires `payment_status === "paid"` for this one-time digital support flow.
- Duplicate webhook deliveries overwrite or no-op against the same entitlement key.
- Test and live IDs are separated through environment configuration.
- No secrets or complete Stripe objects are logged.

The repository currently has no Stripe SDK or Stripe environment variables. Implementation may add the official Stripe server SDK after specification approval. No callable Stripe account connector is exposed in this workspace, so test products/prices may require credentials supplied through local environment configuration before end-to-end API verification.

## Private storage and entitlement design

Use private Vercel Blob storage.

### Sale-file release manifest

A server-only release manifest records:

- Release ID
- Edition name
- Blob pathname for each reward file
- SHA-256 checksum
- Byte size
- MIME type
- Customer-facing filename
- Eligible supporter tiers

The app refuses to expose an asset whose configured checksum or release ID does not match the approved manifest.

### Entitlement records

The webhook writes one private entitlement record per Stripe Checkout Session, keyed by a non-guessable or hashed session identifier. It stores only the minimum required fields:

- Stripe Checkout Session ID
- Stripe Payment Intent ID when present
- Tier
- Currency
- Release ID
- Customer email needed for access delivery
- Payment verification timestamp
- Fulfillment version

An email index uses an HMAC of the normalized address rather than the raw address in its pathname. This supports re-access without publicly revealing purchasers.

### Access links

- The success page verifies the Checkout Session directly with Stripe.
- Email links carry a signed, time-limited supporter-access token.
- The access page revalidates the entitlement before showing files.
- Asset links are short-lived and scoped to one asset.
- Download URL lifetime is configurable, with 15 minutes as the initial default.
- Access-token lifetime is configurable, with 30 days as the initial default.
- Supporters can request a fresh access email after expiry.
- The request-access endpoint always returns the same generic response.

If Resend is not configured, the verified success page still provides immediate access. The handoff must state that email-based re-access requires the existing Resend variables.

## Email

Reuse the existing Resend REST integration. Do not add another email provider.

The supporter email contains:

- Thank-you message using supporter language
- Supporter level
- Private access link
- Included reward list
- Link to contact support
- Reminder that files are for personal use

Do not place expiring Blob URLs directly in email.

## Analytics

Extend the existing typed analytics allowlist with:

- `field-guide-hero-cta`
- `field-guide-preview-open`
- `field-guide-preview-navigate`
- `field-guide-tier-select`
- `field-guide-currency-select`
- `field-guide-checkout-start`
- `field-guide-checkout-cancel`
- `field-guide-purchase-complete`
- `field-guide-download`
- `field-guide-access-request`

Do not include customer email, Stripe IDs, payment data or access tokens in analytics events.

## SEO and sharing

- Canonical URL: `https://www.fourtype.com/field-guide`
- Page title and description centered on the supporter campaign and practical illustrated guide
- Product structured data for the digital supporter reward, with accurate offers for configured currencies
- No ratings or reviews
- Open Graph image built from the approved cover and FourType artwork
- Add `/field-guide` to the sitemap and primary navigation with the label “Field Guide” or “Support FourType”
- Preserve the free quiz as a prominent alternate action

## Accessibility

- Semantic landmark and heading structure
- Minimum comfortable body text size
- WCAG-conscious contrast
- Visible focus treatment
- All interactive book, compass and preview behavior available by keyboard
- Correct button and dialog semantics
- Focus trapping and restoration for modal preview on larger screens
- Meaningful preview and artwork alt text
- No information conveyed by color alone
- `prefers-reduced-motion` disables tilt, parallax and nonessential reveals
- Touch targets at least 44 CSS pixels where practical
- No horizontal overflow at 320 pixels

## Failure handling

- Missing Stripe configuration: disable checkout safely and show a non-technical unavailable message in non-production preview builds.
- Unsupported tier or currency: reject server-side with 400.
- Stripe API failure: preserve the chosen tier and offer retry.
- Cancelled Checkout: return to the campaign without implying failure.
- Unpaid or invalid session: do not reveal customer data or reward links.
- Duplicate webhook: return success after confirming the existing entitlement.
- Blob upload or write failure: webhook returns a retryable failure before claiming fulfillment.
- Missing reward asset: block that download and log only the release/asset key.
- Expired access token: offer access-link renewal.
- Resend unavailable: preserve success-page access and report email as unavailable.
- Preview image failure: retain readable surrounding copy and no layout shift.

## Security boundaries

- Stripe and Blob secrets are imported only from server-only modules.
- Private sale files never enter `public/`, client bundles, static export paths or source maps.
- API inputs use strict allowlists and bounded strings.
- Webhook bodies are verified in raw form as required by Stripe.
- Download responses set safe content disposition and MIME types.
- Access endpoints do not disclose whether an email has purchased.
- Logs exclude secrets, tokens, full payment payloads and customer details.
- Security headers and rate-limit strategy are documented in handoff.

## Environment configuration

Required for test-mode checkout and delivery:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_FIELD_GUIDE_USD_PRICE_ID`
- `STRIPE_FIELD_GUIDE_MYR_PRICE_ID`
- `STRIPE_FOUNDING_SUPPORTER_USD_PRICE_ID`
- `STRIPE_FOUNDING_SUPPORTER_MYR_PRICE_ID`
- `BLOB_READ_WRITE_TOKEN`
- `FOURTYPE_ACCESS_TOKEN_SECRET`
- `NEXT_PUBLIC_SITE_URL`

Existing optional email variables:

- `RESEND_API_KEY`
- `FOURTYPE_EMAIL_FROM`
- `FOURTYPE_EMAIL_REPLY_TO`

Configurable policy values:

- `FOURTYPE_DOWNLOAD_URL_TTL_SECONDS`
- `FOURTYPE_ACCESS_TOKEN_TTL_SECONDS`
- `FOURTYPE_REFUND_POLICY_URL`
- `FOURTYPE_PRIVACY_URL`
- `FOURTYPE_TERMS_URL`
- `FOURTYPE_CONTACT_URL`

## Verification plan

### Content and assets

- Reverify PDF page count, dimensions, modified date and SHA-256.
- Reverify EPUB ZIP integrity, XML parsing, spine and SHA-256.
- Verify worksheet extraction visually and structurally.
- Confirm preview pages come from the approved PDF.
- Scan `public/`, build output and client bundles for sale filenames, signatures and secret names.

### Application

- Lint, typecheck, unit tests and production build.
- Route tests for checkout allowlists and configuration failures.
- Webhook tests for valid signature, invalid signature, paid, unpaid and duplicate events.
- Entitlement tests for tier-specific assets and release IDs.
- Download tests for valid, expired, tampered and wrong-tier tokens.
- Access-request tests that never disclose purchaser existence.

### Browser

- Desktop, tablet, 320-pixel mobile and wide desktop screenshots.
- Keyboard-only campaign, compass, preview, tier selection and checkout start.
- Reduced-motion verification.
- Touch behavior verification.
- No console errors, hydration warnings, broken links or horizontal overflow.
- Image dimensions prevent layout shift.
- Preview and below-the-fold media lazy-load.

### Stripe test mode

- Successful Field Guide Supporter checkout in USD and MYR.
- Successful Founding Supporter checkout in USD and MYR.
- Cancelled checkout.
- Invalid Checkout Session ID.
- Unpaid session.
- Duplicate webhook delivery.
- Webhook retry after temporary Blob failure.
- Correct reward visibility by tier.

## Handoff

Create `docs/field-guide-sales-page-handoff.md` containing:

- What was built
- Routes and components
- Sale-file hashes and release manifest
- Test-mode Stripe products and prices used
- Required environment variables
- Private fulfillment model
- Test, accessibility and responsive results
- Desktop and mobile screenshots
- Missing policy decisions
- Safe test-to-live checklist

No deployment, publication, live Stripe object creation or live payment occurs without explicit approval.
