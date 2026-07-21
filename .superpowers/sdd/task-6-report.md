# Task 6 Report: Signed Access and Private Entitlements

## Status

Implemented and verified in-process. External Vercel Blob integration is blocked, not passed: no Blob credential was available and no network operations were performed.

Independent review follow-up completed: verifier-time TTL bounds, duplicate-session email-index repair, and canonical base64url segment validation are now covered by regression tests.

## RED / GREEN

- RED: the new token and entitlement suites failed because the Task 6 modules did not exist.
- GREEN: focused tests passed after implementing the token, Blob-contract, server adapter, and entitlement modules.
- RED: the self-review test for an empty verification secret failed because an empty-key HMAC could validate.
- GREEN: verification now fails closed when its secret is empty; the focused suite passed with 14 tests.
- RED: review regressions showed that correctly signed overlong claims verified, duplicate session retries did not repair a failed email index, and noncanonical base64url segments verified.
- GREEN: each verifier now limits remaining lifetime, duplicate creation reads the winning entitlement and repairs its index, and both token segments must round-trip as canonical base64url; the focused suite passed with 17 tests.

## Interfaces

- `signAccessToken` / `verifyAccessToken`: versioned HMAC-SHA256 base64url access claims with 30-day maximum signing TTL.
- `signDownloadToken` / `verifyDownloadToken`: versioned, asset-enum-scoped HMAC claims with a 15-minute maximum signing TTL.
- `PrivateBlobStore` and `BlobSigningAdapter`: pure, injectable contracts for private JSON records and signed URLs.
- `readEntitlement`, `writeEntitlement`, and `findEntitlementsByEmail`: idempotent session records, HMAC-normalized email indexes, and private no-cache reads.
- `createPrivateAssetUrl`: one-path private GET signing flow, capped at 15 minutes.
- `vercelPrivateBlobStore` / `createVercelPrivateAssetUrl`: `server-only` production adapter typed against `@vercel/blob` 2.6.1.

## Security and Integration Evidence

- Tokens include explicit `version` and `kind`, validate bounded session IDs and expiry, enforce the maximum remaining access/download TTL during verification, require canonical base64url segments, accept only the exact release asset enum, and use equal-length `timingSafeEqual` comparison after HMAC-SHA256.
- Token tests cover tampering, expiry boundary, wrong kind, malformed and noncanonical base64url and JSON, unequal signatures, unsupported assets, signing and verification TTL bounds, and missing-secret fail-closed behavior.
- Entitlement paths SHA-256 the session ID and HMAC the normalized email; tests assert no raw session ID or email appears in pathnames.
- Session records use private non-overwriting writes. Duplicate session creation re-reads the winning record and idempotently repairs its email index. Email index writes use ETags, deduplicate session IDs, and stop after three precondition-conflict attempts.
- Private reads use `{ access: 'private', useCache: false }`; signed URLs call `issueSignedToken` then `presignUrl` for the exact pathname with `operations: ['get']`, `operation: 'get'`, private access, and the same capped expiry.
- No code logs secrets, tokens, emails, or session IDs.
- The Vercel adapter typechecks and the complete behavior is exercised through the injected in-memory adapter. Live Blob signing/read/write behavior remains blocked pending a credential; it was not attempted.

## Files and Tests

- Added `lib/field-guide/tokens.ts`, `lib/field-guide/blob.ts`, `lib/field-guide/blob-server.ts`, and `lib/field-guide/entitlements.ts`.
- Added `tests/field-guide-tokens.test.ts` and `tests/field-guide-entitlements.test.ts`.
- Focused: `pnpm exec tsx --test tests/field-guide-tokens.test.ts tests/field-guide-entitlements.test.ts` — 17 passed.
- TypeScript: `pnpm exec tsc --noEmit` — passed.
- Full suite: `pnpm test` — 54 passed.
- Production build: `pnpm build` — passed.
- Diff check: `git diff --check` — passed.

## Concerns

- Production Blob credentials are still required to validate the SDK's live duplicate-write error shape and signed URL behavior against Vercel. This is intentionally reported as blocked rather than passed.
- The production build reports the repository's existing multiple-lockfile workspace-root warning and existing edge-runtime static-generation warning; neither is caused by Task 6.
