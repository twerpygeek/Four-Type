# Task 9 Report: Policy-Safe FAQ and Configuration Audit

## Implemented

- Added `lib/field-guide/policies.ts` with `getFieldGuidePolicies()` and `missingPolicyDecisions`.
- Policy values accept root-relative paths or HTTPS URLs whose host is exactly `www.fourtype.com`; HTTPS uses the implicit or explicit default port `443`.
- Rejected protocol-relative URLs, HTTP URLs, credentials, non-default ports, the apex `fourtype.com`, deceptive subdomains, backslashes, control characters, unsafe percent encodings, and unsafe fragments.
- Missing or rejected values return `href: null`, honest plain-text fallback copy, and a stable missing-policy list.
- Added shared policy/contact rendering for the campaign, success page and access page. Valid values become links; missing values never become dead anchors.
- Updated the FAQ to state digital-only delivery, no physical shipment, the designed 7 x 10 PDF experience, reflowable EPUB behavior, personal-use redistribution limits, non-charitable/non-tax-deductible support, Edition 1 revision scope, and expiring access with fresh-access recovery.

## Missing Policy Decisions

The following environment variables are unset in this worktree and remain plain text in the UI:

- `FOURTYPE_REFUND_POLICY_URL`
- `FOURTYPE_PRIVACY_URL`
- `FOURTYPE_TERMS_URL`
- `FOURTYPE_CONTACT_URL`

The refund fallback explicitly makes no refund promise. Configure only approved first-party routes before treating those items as links.

## Review Follow-up

- Policy links now reject every query, fragment and percent encoding, so encoded controls, backslashes and arbitrarily nested encodings cannot bypass validation.
- Both root-relative and approved absolute URLs use the same conservative ASCII pathname allowlist: letter/digit/hyphen/underscore segments with an optional trailing slash.
- Absolute-host validation excludes the apex domain and non-default ports while retaining the exact `www.fourtype.com` origin.

## Verification

- `pnpm exec tsx --test tests/field-guide-policies.test.ts` — PASS, 5 tests.
- `pnpm test` — PASS, 116 tests.
- `pnpm exec tsc --noEmit` — PASS.
- `pnpm build` — PASS. Next.js reported the existing multiple-lockfile workspace-root warning; all 241 static pages generated and the Field Guide routes compiled.
- `git diff --check` — PASS.

No deployment, publish, live-mode Stripe setup, or production policy configuration was performed.
