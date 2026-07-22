# FourType Field Guide Book Object and Single Edition

## Purpose

Make the Field Guide sales page feel like a finished, tangible book while reducing checkout choice to one clear digital edition.

## Approved experience

### Hero book object

The hero uses the existing FourType cover as a true book object rather than a flat cover with decorative page stripes. It has a visible front cover, spine, fore-edge page block, layered page depth and a ground shadow. The object rests at an editorial three-quarter angle and gently follows desktop pointer movement. Clicking it still opens the existing accessible page-preview dialog. Reduced-motion users receive a stable, non-animated presentation.

### Purchase offer

There is one purchase tier only:

- Founding Digital Supporter, US$12

It includes the complete PDF, reflowable EPUB, printable worksheet pack and revisions released within Edition 1. The previous US$25 tier and the separate Digital Edition are removed from the customer-facing catalog and checkout path.

### Character-led sections

Existing FourType characters appear as purposeful visual companions in the sparse editorial sections. The illustration and copy pair by attention pattern:

- Commander / Choleric: direction and decisive movement
- Bard / Sanguine: possibility and invitation
- Strategist / Melancholic: evidence and careful reading
- Guardian / Phlegmatic: steadiness and repair

Images remain supporting elements, use the existing character assets, preserve meaningful alt text and do not crowd the copy. No unrelated generated art is introduced.

### Giveaway promotion

Create a live Stripe promotion code named `FOURTYPEGIFT` for a 100% discount on the one US$12 price. It is limited to 100 redemptions with no expiry. Stripe Checkout enables promotion-code entry. A successfully redeemed checkout grants the same Founding Digital Supporter assets and private access as a paid purchase.

## Implementation boundaries

- Keep the 144-page book files, delivery system, private Blob storage, webhook and purchase-access flow.
- Keep the current visual identity, responsive design and accessibility behavior.
- Update catalog validation so only the one approved tier can create Checkout Sessions.
- Archive the prior Stripe price rather than deleting it, preserving purchase history.
- Verify with unit tests, typecheck, production build, asset audit, browser screenshots and a hosted Stripe checkout smoke test without submitting a payment.

## Success criteria

- The hero reads as a physical book at desktop and mobile sizes.
- Each major sales-page section includes intentional FourType visual storytelling where space permits.
- Buyers see one US$12 offer and one checkout path.
- `FOURTYPEGIFT` appears in Stripe Checkout and applies a full discount up to 100 times.
- The live page, checkout creation, asset access and webhook guard remain functional.
