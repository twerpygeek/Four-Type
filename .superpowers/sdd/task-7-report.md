# Task 7 Report: Secure Field Guide Fulfillment

## Status

Implemented and verified in-process. No Stripe, Resend, or Vercel Blob network call was made, and no live Stripe secret was requested or used.

## RED / GREEN

- RED: the focused test command initially could not resolve `node` from the `tsx` shim because the Codex runtime Node bin directory was absent from `PATH`.
- RED: after adding only the existing Codex runtime Node bin directory to the command environment, the focused suites failed because `lib/field-guide/fulfillment` and `lib/field-guide/webhook` did not exist.
- GREEN: focused fulfillment and webhook tests passed with 9 tests after implementing the injected domain handlers, server-only production adapter, email message, and route composition.
- RED: review regression tests showed failed or skipped email delivery could leave fulfillment reported as complete, duplicate entitlement reads skipped email-index repair, and webhook configuration failures could be classified as bad signatures.
- GREEN: focused transport, delivery, fulfillment, and webhook tests passed with 27 tests after durable delivery claims, receipt persistence, server-only email wrappers, explicit configuration handling, bounded recoverable token delivery attempts, and provider-attempt ambiguity protection were added.

## Implementation

- `fulfillFieldGuideCheckout` retrieves the Checkout Session with line items through injected dependencies, requires `payment_status === 'paid'`, and validates the exact product, tier, currency, release ID, currency field, quantity, and configured Price ID before writing an entitlement.
- Existing entitlements always flow through `writeEntitlement`, including retries, so its duplicate path repairs a partial email index before fulfillment continues.
- Fulfillment returns only a bounded status object. It does not log or return customer, payment, Price, session, token, or Blob data.
- The private delivery record uses a hashed session pathname and `pending`, `sending`, and `sent` states. ETag-protected claims permit one current sender, release failed or skipped delivery for retry, and reclaim stale in-progress claims after five minutes.
- The access-token verifier and delivery claims share one exported 30-day maximum age. A delivery attempt stores only its non-secret expiry and a session-hash plus attempt-number Resend `Idempotency-Key`; it never stores a raw access token. Every fresh attempt starts at claim time, so an entitlement older than 30 days can receive a fresh valid link.
- A failed unsent attempt with no provider request is reused only while its remaining token lifetime is in the inclusive 29-to-30-day band. One millisecond below 29 days, one millisecond remaining, or an expiry beyond the verifier maximum rotates atomically to a new attempt, key, and 30-day token window, preventing both unusable email and idempotency-key/payload mismatch.
- Immediately before transport, fulfillment ETag-safely records a non-secret first-provider-attempt timestamp. If a provider call may have happened, the same attempt, key, and deterministic payload are retained for 24 hours from that timestamp, even below the ordinary 29-day reuse threshold. The marker and every send require at least one day of remaining token lifetime; otherwise delivery rotates rather than sending a near-expired link. No raw token or provider payload is persisted.
- Token signing, URL construction, transport delivery, and receipt persistence are all inside the post-claim release path. Any failure leaves no permanent claim lock; the claim is released immediately when possible and otherwise becomes recoverable after the five-minute claim TTL.
- The webhook reads the raw request body, requires `stripe-signature`, verifies it through `stripe.webhooks.constructEvent`, handles only completed and async-payment-succeeded Checkout events, returns bodyless `400` for invalid signatures, `200` for unrelated verified events, and bodyless retryable `500` for missing configuration or fulfillment failures.
- Production Stripe, Blob, token-secret, and email delivery composition is isolated in `lib/field-guide/fulfillment-server.ts`, `lib/field-guide/email-server.ts`, and `lib/email-delivery-server.ts`; each secret-reading module begins with `import 'server-only'`. The webhook route uses the Node.js runtime.
- The existing Resend helper is split into a pure transport contract and a server-only configuration wrapper. `sendProfileEmail` preserves its recipient, payload, skipped-config result, and successful no-receipt behavior.
- Supporter emails state the supporter tier and eligible rewards, use only `/field-guide/access?token=...`, include personal-use terms, and reject direct Blob URLs.

## Delivery Semantics

- Application-visible fulfillment is exactly-once after a persisted `sent` receipt: concurrent calls cannot claim a second active send. Sequential retries reuse the same provider idempotency key and payload during either the 29-to-30-day ordinary reuse window or the 24-hour post-provider-attempt ambiguity window.
- Resend documents idempotency for matching `POST /emails` requests for 24 hours. A process failure after provider success but before the receipt write is therefore at-least-once at transport level, with retries deduplicated during that provider window. After the provider key expires, absolute forever-exactly-once transport semantics are not available without a provider-side lookup; this implementation does not claim them.
- If no provider request is recorded, an unsent delivery attempt below the 29-day freshness threshold rotates normally. Once a provider request may have occurred, rotation waits until 24 hours after its durable pre-send timestamp, provided the retained link remains useful. This deliberately favors a usable, verifier-valid access link and valid provider request over attempting to reuse an unsafe payload; transport behavior beyond Resend's idempotency window remains at-least-once.

## Verification

- Focused review regression tests: `PATH=/Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH pnpm exec tsx --test tests/email-transport.test.ts tests/field-guide-delivery.test.ts tests/field-guide-fulfillment.test.ts tests/field-guide-webhook.test.ts` - 27 passed.
- TypeScript: `PATH=/Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH pnpm exec tsc --noEmit` - passed with no diagnostics.
- Full suite: `PATH=/Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH pnpm test` - 81 passed.
- Production build: `PATH=/Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH pnpm build` - passed. The existing multi-lockfile workspace-root warning and edge-runtime static-generation warning were emitted.
- Diff check: `git diff --check` passed with no whitespace errors.

## External Services

- No `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, Resend configuration, or Blob credential was supplied or read for a network operation.
- No Stripe customer, Checkout Session, charge, webhook forwarding, Resend message, Blob read/write, deployment, or publication occurred.
