# FourType Referral Loop Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn each completed FourType result into a measurable no-account friend invitation, referred quiz completion, side-by-side comparison, and pair-sharing loop.

**Architecture:** Keep the existing encoded share ID as the referral identity and normalize it through a dedicated referral-context module. Extend the existing fire-and-forget Google Sheets event pipeline with typed funnel events, then render referred entry and pair comparison as focused components consumed by the current quiz and result screens.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5.7, Node test runner through `tsx`, Tailwind CSS, Lucide icons, existing Google Sheets event sink, existing share ID encoding.

## Global Constraints

- The flow remains free and requires no account.
- Do not add email capture, email delivery, points, prizes, leaderboards, or a new database.
- Tracking failures must never interrupt quiz, result, sharing, or comparison behavior.
- Existing share URLs and historical `quiz-result`, `compare-result`, `share-click`, and `copy-link` events remain valid.
- Comparison language is reflective guidance, not diagnosis or a prediction of relationship success.
- Preserve the existing 40 questions and scoring model.

---

## File Structure

- Create `tests/analytics.test.ts`: verifies the event allowlist and payload normalization.
- Create `tests/referral-context.test.ts`: verifies missing, valid, malformed, and unsupported share IDs.
- Create `tests/comparison.test.ts`: verifies symmetric pair insight and directional advice.
- Create `lib/referral-context.ts`: sole owner of comparison query decoding and validation.
- Modify `lib/analytics.ts`: typed event contract and non-blocking tracker.
- Modify `app/api/events/route.ts`: shared allowlist and normalized event fields.
- Modify `lib/google-sheets-leads.ts`: append chapter and inviter blend fields to event rows.
- Create `components/ReferralInviteBanner.tsx`: referred entry motivation before the quiz.
- Modify `app/quiz/QuizClient.tsx`: retain referral context and emit funnel events.
- Modify `app/es/quiz/page.tsx`: preserve Spanish comparison query parameters.
- Modify `app/zh-CN/quiz/page.tsx`: preserve Chinese comparison query parameters.
- Modify `components/QuestionScreen.tsx`: report chapter milestones without owning analytics.
- Modify `lib/comparison.ts`: normalized, symmetric pair insight model.
- Create `components/PairComparison.tsx`: side-by-side comparison presentation and pair actions.
- Create `components/PairShareCard.tsx`: vertical two-character social card.
- Modify `components/ResultsScreen.tsx`: prioritize referral CTA, remove email form, and integrate pair comparison.
- Modify `app/share/[id]/SharePageClient.tsx`: use specific invite events while preserving fallback behavior.

---

### Task 1: Add the Test Harness and Typed Funnel Event Contract

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Create: `tests/analytics.test.ts`
- Modify: `lib/analytics.ts`
- Modify: `app/api/events/route.ts`
- Modify: `lib/google-sheets-leads.ts`

**Interfaces:**
- Produces: `FOURTYPE_EVENT_NAMES`, `FourTypeEventName`, `FourTypeEventPayload`, `isFourTypeEventName(value)`.
- Produces event fields: `chapter?: number`, `question?: number`, `inviterBlendKey?: string`.

- [ ] **Step 1: Add the Node TypeScript test command**

Add `tsx` to dev dependencies and add this script:

```json
{
  "scripts": {
    "test": "tsx --test tests/**/*.test.ts"
  },
  "devDependencies": {
    "tsx": "^4.20.3"
  }
}
```

Run: `pnpm install`

Expected: `pnpm-lock.yaml` updates and install exits 0.

- [ ] **Step 2: Write the failing event-contract test**

Create `tests/analytics.test.ts`:

```ts
import assert from 'node:assert/strict'
import test from 'node:test'
import { FOURTYPE_EVENT_NAMES, isFourTypeEventName } from '../lib/analytics'

test('accepts every referral funnel event and historical event', () => {
  const required = [
    'quiz-start', 'chapter-complete', 'quiz-complete', 'quiz-result',
    'invite-share', 'invite-copy', 'invite-open',
    'referred-quiz-start', 'referred-quiz-complete', 'compare-result',
    'pair-share', 'pair-copy', 'invalid-share-id',
    'share-click', 'copy-link',
  ]

  assert.deepEqual([...FOURTYPE_EVENT_NAMES].sort(), required.sort())
  required.forEach((event) => assert.equal(isFourTypeEventName(event), true))
  assert.equal(isFourTypeEventName('arbitrary-event'), false)
})
```

- [ ] **Step 3: Run the test and confirm it fails**

Run: `pnpm exec tsx --test tests/analytics.test.ts`

Expected: FAIL because `FOURTYPE_EVENT_NAMES` and `isFourTypeEventName` are not exported.

- [ ] **Step 4: Implement the typed analytics contract**

Replace the private event union in `lib/analytics.ts` with:

```ts
export const FOURTYPE_EVENT_NAMES = [
  'quiz-start',
  'chapter-complete',
  'quiz-complete',
  'quiz-result',
  'invite-share',
  'invite-copy',
  'invite-open',
  'referred-quiz-start',
  'referred-quiz-complete',
  'compare-result',
  'pair-share',
  'pair-copy',
  'invalid-share-id',
  'share-click',
  'copy-link',
] as const

export type FourTypeEventName = (typeof FOURTYPE_EVENT_NAMES)[number]

export type FourTypeEventPayload = {
  event: FourTypeEventName
  locale?: string
  blendKey?: string
  inviterBlendKey?: string
  resultName?: string
  shareId?: string
  compareWith?: string
  source?: string
  chapter?: number
  question?: number
}

export function isFourTypeEventName(value: string): value is FourTypeEventName {
  return (FOURTYPE_EVENT_NAMES as readonly string[]).includes(value)
}
```

Keep `trackFourTypeEvent(payload: FourTypeEventPayload)` and its beacon/fetch fallback unchanged.

- [ ] **Step 5: Share validation with the API route and append fields**

In `app/api/events/route.ts`, import `isFourTypeEventName`, reject unsupported names, and normalize `chapter`, `question`, and `inviterBlendKey`. In `lib/google-sheets-leads.ts`, extend `AnalyticsEventPayload` and append rows as `A:M` in this exact order:

```ts
const row = [
  new Date().toISOString(),
  payload.event,
  payload.locale,
  payload.blendKey,
  payload.inviterBlendKey,
  payload.resultName,
  payload.shareId,
  payload.compareWith,
  payload.source,
  payload.chapter ?? '',
  payload.question ?? '',
  payload.path,
  payload.userAgent || '',
]
```

Clamp chapter to `1..4` and question to `1..40`; invalid numeric values become `undefined`.

- [ ] **Step 6: Run tests and type checking**

Run: `pnpm test && pnpm exec tsc --noEmit`

Expected: all tests pass and TypeScript exits 0.

- [ ] **Step 7: Commit the event contract**

```bash
git add package.json pnpm-lock.yaml tests/analytics.test.ts lib/analytics.ts app/api/events/route.ts lib/google-sheets-leads.ts
git commit -m "Add typed referral funnel analytics"
```

---

### Task 2: Normalize Referral Context and Instrument Quiz Milestones

**Files:**
- Create: `tests/referral-context.test.ts`
- Create: `lib/referral-context.ts`
- Create: `components/ReferralInviteBanner.tsx`
- Modify: `app/quiz/QuizClient.tsx`
- Modify: `app/es/quiz/page.tsx`
- Modify: `app/zh-CN/quiz/page.tsx`
- Modify: `components/QuestionScreen.tsx`

**Interfaces:**
- Consumes: `DecodedShareResult`, `decodeShareId`, `trackFourTypeEvent`.
- Produces: `ReferralContext`, `parseReferralContext(rawId)`.
- Produces: `QuestionScreenProps.onProgress(answeredCount, chapterComplete)`.

- [ ] **Step 1: Write failing referral-context tests**

Create `tests/referral-context.test.ts`:

```ts
import assert from 'node:assert/strict'
import test from 'node:test'
import { generateShareId } from '../lib/share-id'
import { parseReferralContext } from '../lib/referral-context'

const scores = { Yellow: 12, Red: 19, Blue: 5, Green: 4 }

test('distinguishes missing, malformed, and valid referral IDs', () => {
  assert.deepEqual(parseReferralContext(''), { status: 'none' })
  assert.equal(parseReferralContext('not-a-share-id').status, 'invalid')

  const id = generateShareId('Ian', 'Motivator', scores)
  const parsed = parseReferralContext(id)
  assert.equal(parsed.status, 'valid')
  if (parsed.status === 'valid') {
    assert.equal(parsed.shareId, id)
    assert.equal(parsed.inviter.heroName, 'Ian')
    assert.equal(parsed.inviter.blendKey, 'Motivator')
  }
})
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `pnpm exec tsx --test tests/referral-context.test.ts`

Expected: FAIL because `lib/referral-context.ts` does not exist.

- [ ] **Step 3: Implement referral normalization**

Create `lib/referral-context.ts`:

```ts
import { BLENDS } from './blends'
import { decodeShareId, type DecodedShareResult } from './share-id'

export type ReferralContext =
  | { status: 'none' }
  | { status: 'invalid'; shareId: string }
  | { status: 'valid'; shareId: string; inviter: DecodedShareResult }

export function parseReferralContext(rawId: string): ReferralContext {
  const shareId = rawId.trim().slice(0, 500)
  if (!shareId) return { status: 'none' }

  const inviter = decodeShareId(shareId)
  if (!inviter || !BLENDS[inviter.blendKey]) return { status: 'invalid', shareId }

  return { status: 'valid', shareId, inviter }
}
```

- [ ] **Step 4: Add the referred entry banner**

Create `components/ReferralInviteBanner.tsx` accepting `{ inviter, locale }`. Render the inviter character from `TEMPERAMENTS[BLENDS[inviter.blendKey].primary]`, escaped React text, and the promise: complete the test to reveal shared strengths, friction, and communication advice. Keep the component unframed within the name-stage layout and use a stable 72px portrait size.

- [ ] **Step 5: Report chapter completion from QuestionScreen**

Add this optional prop:

```ts
onProgress?: (answeredCount: number, completedChapter?: 1 | 2 | 3) => void
```

After accepting an answer, calculate `answeredCount = currentQIndex + 1` and map exact gates `{ 12: 1, 19: 2, 24: 3 }`. Call `onProgress(answeredCount, gate)` once before advancing. Do not send analytics from `QuestionScreen`.

- [ ] **Step 6: Instrument the quiz controller**

In `app/quiz/QuizClient.tsx`:

- replace direct `decodeShareId` with `parseReferralContext`;
- emit `invite-open` once for valid context and `invalid-share-id` once for invalid context;
- show `ReferralInviteBanner` above `NameInputScreen` only for valid context;
- emit `quiz-start` or `referred-quiz-start` from `handleNameSubmit`;
- emit `chapter-complete` from the progress callback;
- emit `quiz-complete` or `referred-quiz-complete` before entering loading;
- pass `comparison={context.status === 'valid' ? context.inviter : null}` to results.

Use a `useRef<Set<string>>` guard so React development effects and rerenders do not duplicate milestone events.

Update `app/es/quiz/page.tsx` and `app/zh-CN/quiz/page.tsx` to render `QuizExperienceWithSearch` inside `Suspense`, matching the unprefixed quiz route, so existing comparison query parameters are no longer discarded.

- [ ] **Step 7: Run focused and full verification**

Run: `pnpm test && pnpm exec tsc --noEmit`

Expected: referral tests pass and TypeScript exits 0.

- [ ] **Step 8: Commit referral attribution**

```bash
git add tests/referral-context.test.ts lib/referral-context.ts components/ReferralInviteBanner.tsx app/quiz/QuizClient.tsx app/es/quiz/page.tsx app/zh-CN/quiz/page.tsx components/QuestionScreen.tsx
git commit -m "Track referred quiz completion funnel"
```

---

### Task 3: Expand Pair Insight Logic

**Files:**
- Create: `tests/comparison.test.ts`
- Modify: `lib/comparison.ts`

**Interfaces:**
- Produces: `PairInsight` with `headline`, `sharedQuality`, `complement`, `friction`, `selfAdvice`, `friendAdvice`, `challenge`.
- Produces: `getComparisonInsight(self, friend): PairInsight`.

- [ ] **Step 1: Write failing symmetry and direction tests**

Create `tests/comparison.test.ts`:

```ts
import assert from 'node:assert/strict'
import test from 'node:test'
import { BLENDS } from '../lib/blends'
import { getComparisonInsight } from '../lib/comparison'

test('shared pair insights are symmetric while advice follows each person', () => {
  const commander = BLENDS.Commander
  const guardian = BLENDS.Guardian
  const forward = getComparisonInsight(commander, guardian)
  const reverse = getComparisonInsight(guardian, commander)

  assert.equal(forward.sharedQuality, reverse.sharedQuality)
  assert.equal(forward.complement, reverse.complement)
  assert.equal(forward.challenge, reverse.challenge)
  assert.equal(forward.selfAdvice, reverse.friendAdvice)
  assert.equal(forward.friendAdvice, reverse.selfAdvice)
})

test('same-primary pairs receive a specific shared instinct', () => {
  const pair = getComparisonInsight(BLENDS.Motivator, BLENDS.Director)
  assert.match(pair.sharedQuality, /direction|progress|decision/i)
})
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `pnpm exec tsx --test tests/comparison.test.ts`

Expected: FAIL because the new fields do not exist and current prose is order-dependent.

- [ ] **Step 3: Implement a normalized pair key and PairInsight**

Create an unordered primary pair key:

```ts
type Primary = Blend['primary']

function pairKey(a: Primary, b: Primary) {
  return [a, b].sort().join(':') as `${Primary}:${Primary}`
}
```

Define shared-quality, complement, and challenge copy by unordered key, including all ten unique primary combinations. Keep person-specific advice in `practiceByPrimary`. Return:

```ts
export type PairInsight = {
  headline: string
  sharedQuality: string
  complement: string
  friction: string
  selfAdvice: string
  friendAdvice: string
  challenge: string
}
```

Use both blend names only in `friction`; unordered fields must be byte-identical when arguments are reversed.

- [ ] **Step 4: Run tests**

Run: `pnpm exec tsx --test tests/comparison.test.ts && pnpm exec tsc --noEmit`

Expected: comparison tests pass and TypeScript exits 0.

- [ ] **Step 5: Commit comparison logic**

```bash
git add tests/comparison.test.ts lib/comparison.ts
git commit -m "Deepen symmetric FourType pair insights"
```

---

### Task 4: Build Pair Comparison and Pair Sharing Components

**Files:**
- Create: `components/PairComparison.tsx`
- Create: `components/PairShareCard.tsx`
- Modify: `components/ResultsScreen.tsx`

**Interfaces:**
- Consumes: `PairInsight`, current `Blend`, inviter `Blend`, both names and score maps.
- Produces: `PairComparison` callbacks `onShare`, `onCopy`, and `onChallengeNextFriend`.

- [ ] **Step 1: Build the stable pair comparison layout**

Create `PairComparison.tsx` with:

- a two-column portrait header that collapses to two equal mobile columns;
- both display names, blend names, and primary temperament labels;
- four un-nested insight bands for shared quality, complement, friction, and communication;
- one practical challenge callout;
- the sentence “Use this as a conversation starter, not a prediction or diagnosis.”;
- icon buttons with tooltips for share and copy.

Keep portraits at a stable `aspect-square` size with `minmax(0,1fr)` grid tracks so long names wrap without changing the layout.

- [ ] **Step 2: Build the vertical pair card**

Create `PairShareCard.tsx` using the export pattern already established in `ShareableCard.tsx`. Render a fixed 1080:1920 canvas-scaled DOM card with both character images, “Our FourType Pair,” both result names, one `sharedQuality` line, and `fourtype.com`. Use `html2canvas` for PNG export and keep ordinary link sharing available if export fails.

- [ ] **Step 3: Remove the result-page email capture**

In `ResultsScreen.tsx`, remove `FormEvent`, lead state, `handleLeadSubmit`, and the full lead form. Do not remove the server routes in this task.

- [ ] **Step 4: Integrate comparison and specific referral events**

Replace the current compact comparison block with `PairComparison` when comparison context is present. Track:

- `compare-result` once when the pair renders;
- `pair-share` after successful native share;
- `pair-copy` after clipboard fallback;
- `invite-share` for the primary result friend challenge;
- `invite-copy` for its copied comparison URL.

The next-friend CTA uses the current user's `compareUrl`, ensuring the loop continues from the newly completed result.

- [ ] **Step 5: Prioritize one result-page referral action**

Keep the first action panel directly after the result identity. Copy must promise the comparison reward, with one primary “Challenge a Friend” button and one secondary copy-link icon button. Move ordinary result sharing and the single-person story card below the core insights.

- [ ] **Step 6: Verify build and rendered routes**

Run:

```bash
pnpm test
pnpm exec tsc --noEmit
pnpm build
```

Expected: tests pass, TypeScript exits 0, and Next build completes.

- [ ] **Step 7: Commit pair UI**

```bash
git add components/PairComparison.tsx components/PairShareCard.tsx components/ResultsScreen.tsx
git commit -m "Add friend pair comparison and sharing"
```

---

### Task 5: Align Shared Result Pages and Complete Browser Verification

**Files:**
- Modify: `app/share/[id]/SharePageClient.tsx`
- Modify: `docs/superpowers/specs/2026-07-13-fourtype-referral-loop-id-design.md` only if implementation reveals a factual correction.

**Interfaces:**
- Consumes: typed event contract and existing comparison URL.

- [ ] **Step 1: Update shared-page event names and CTA hierarchy**

Track native challenge sharing as `invite-share` and copied challenge links as `invite-copy`. Keep legacy ordinary result actions using `share-click` and `copy-link`. Make “Take the Test and Compare” the primary command and keep story-card download secondary.

- [ ] **Step 2: Start the production server**

Run:

```bash
pnpm build
pnpm start -- -p 3030
```

Expected: server listens on `http://localhost:3030`.

- [ ] **Step 3: Verify the ordinary and referred funnels**

In desktop and 390px mobile browser viewports, verify:

- `/quiz` starts normally and produces one `quiz-start`;
- a generated `/quiz?compare=<validId>` shows the inviter banner;
- chapters 1–3 emit once at questions 12, 19, and 24;
- the referred completion shows both characters and all pair insights;
- invalid compare IDs fall back to the normal quiz;
- share/copy actions display success feedback;
- the longest names wrap without overlap;
- no email form appears on results.

- [ ] **Step 4: Probe API validation**

Run:

```bash
curl -s -X POST http://localhost:3030/api/events -H 'content-type: application/json' -d '{"event":"invite-open","locale":"en","chapter":1}'
curl -s -o /dev/null -w '%{http_code}' -X POST http://localhost:3030/api/events -H 'content-type: application/json' -d '{"event":"unknown"}'
```

Expected: first response has `"ok":true`; second command prints `400`.

- [ ] **Step 5: Run final verification**

Run: `pnpm test && pnpm exec tsc --noEmit && pnpm build && git diff --check`

Expected: all commands exit 0.

- [ ] **Step 6: Commit final alignment**

```bash
git add app/share/[id]/SharePageClient.tsx
git commit -m "Complete FourType referral loop"
```
