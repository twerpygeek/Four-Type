# FourType Bahasa Indonesia Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a complete Bahasa Indonesia path for the FourType homepage, quiz, results, friend referral, pair comparison, share metadata, and core SEO pages.

**Architecture:** Extend the existing centralized locale unions and dictionaries with `id`, then add thin App Router wrappers matching the Chinese and Spanish route structure. Enforce dictionary completeness through tests so no core screen silently falls back to English.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5.7, Node test runner through `tsx`, existing `home-i18n`, `quiz-i18n`, `localized-content`, sitemap, and share metadata modules.

## Global Constraints

- Translate the core product funnel, not the full English blog archive.
- Keep the branded English character names with Indonesian temperament names: Koleris, Sanguinis, Melankolis, and Plegmatis.
- Use natural Bahasa Indonesia and preserve responsible self-reflection language.
- Add reciprocal `hreflang` for `en`, `zh-CN`, `es`, and `id`.
- Missing Indonesian core strings must fail automated verification.
- Preserve all question IDs, answer letters, scoring keys, blend keys, and route behavior.

---

## File Structure

- Create `tests/localization.test.ts`: locale parity and Indonesian completeness checks.
- Modify `lib/localized-content.ts`: locale registry and Indonesian SEO content.
- Modify `lib/home-i18n.ts`: Indonesian homepage dictionary.
- Modify `lib/quiz-i18n.ts`: Indonesian quiz, result, referral, and 16 blend summaries.
- Modify `components/LanguageSwitcher.tsx`: `ID` language option and route mapping.
- Modify `components/LocalizedPage.tsx`: Indonesian FAQ labels, locale metadata, and alternates.
- Create `app/id/page.tsx`: localized homepage wrapper.
- Create `app/id/quiz/page.tsx`: localized quiz wrapper with search-param support.
- Create `app/id/temperament-test/page.tsx`: Indonesian SEO page wrapper.
- Create `app/id/four-temperaments-test/page.tsx`: Indonesian four-temperaments page wrapper.
- Modify `lib/share-copy.ts`: locale-aware result and pair share copy.
- Create `lib/comparison-i18n.ts`: localized pair insight templates keyed by unordered primary pair.
- Modify `app/share/[id]/page.tsx`: locale-aware metadata from `lang=id`.
- Modify `app/share/[id]/SharePageClient.tsx`: Indonesian shared result labels.
- Modify `components/ResultsScreen.tsx`: locale-bearing share and comparison URLs.
- Modify `app/sitemap.ts`: Indonesian routes and reciprocal alternates.
- Modify `app/robots.ts` or `app/manifest.ts` only if their locale declarations are currently explicit.

---

### Task 1: Extend the Locale Registry and Add Completeness Tests

**Files:**
- Create: `tests/localization.test.ts`
- Modify: `lib/localized-content.ts`
- Modify: `components/LanguageSwitcher.tsx`
- Modify: `components/LocalizedPage.tsx`

**Interfaces:**
- Produces: `LocaleCode = 'zh-CN' | 'es' | 'id'`.
- Produces locale path mapping for `/id`, `/id/quiz`, `/id/temperament-test`, `/id/four-temperaments-test`.

- [ ] **Step 1: Write failing locale registry tests**

Create `tests/localization.test.ts`:

```ts
import assert from 'node:assert/strict'
import test from 'node:test'
import { localizedLocales, localizedPages, localizedPath } from '../lib/localized-content'
import { getHomeCopy } from '../lib/home-i18n'
import { getQuizCopy, getQuizQuestions, getLocalizedBlendSummary } from '../lib/quiz-i18n'
import { BLENDS } from '../lib/blends'

test('Bahasa Indonesia covers every core locale surface', () => {
  assert.equal(localizedLocales.id.nativeLabel, 'Bahasa Indonesia')
  assert.equal(localizedPath('id', 'quiz'), '/id/quiz')
  assert.equal(localizedPages.id['temperament-test'].faq.length > 0, true)
  assert.equal(getHomeCopy('id').heroCta.length > 0, true)
  assert.equal(getQuizQuestions('id').length, 40)
  assert.equal(Object.keys(BLENDS).every((key) => getLocalizedBlendSummary('id', key as keyof typeof BLENDS)), true)
  assert.equal(getQuizCopy('id').results.compareButton.length > 0, true)
})
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `pnpm exec tsx --test tests/localization.test.ts`

Expected: TypeScript compilation fails because `id` is not a supported locale.

- [ ] **Step 3: Add Indonesian locale metadata and route mapping**

In `lib/localized-content.ts`, add:

```ts
id: {
  code: 'id',
  nativeLabel: 'Bahasa Indonesia',
  englishLabel: 'Indonesian',
}
```

Add Indonesian entries for all four localized page keys. Use these titles:

- home: `Tes Temperamen Gratis FourType`
- quiz: `Tes Temperamen FourType Gratis`
- temperament-test: `Apa Itu Tes Temperamen?`
- four-temperaments-test: `Tes Empat Temperamen: Koleris, Sanguinis, Melankolis, dan Plegmatis`

Each SEO page must contain four explanatory cards, at least three substantive sections, and at least four FAQs. Copy must state that FourType is for reflection and education, not diagnosis or hiring.

- [ ] **Step 4: Add `ID` to the language switcher**

Extend `localizedBases`, the locale parameter union, current-locale detection, and languages array:

```ts
{ code: 'id' as const, label: 'ID' }
```

Keep unsupported deep paths falling back to `/id` exactly as Chinese and Spanish do.

- [ ] **Step 5: Add Indonesian metadata and page labels**

In `LocalizedPage.tsx`, add `id` to reciprocal alternates, use Open Graph locale `id_ID`, render FAQ heading `Pertanyaan umum`, and replace locale conditionals with dictionary fields for FAQ and phase-note labels.

- [ ] **Step 6: Run focused verification**

Run: `pnpm exec tsx --test tests/localization.test.ts`

Expected: still fails only because home and quiz Indonesian dictionaries are not yet present.

- [ ] **Step 7: Commit the locale registry**

```bash
git add tests/localization.test.ts lib/localized-content.ts components/LanguageSwitcher.tsx components/LocalizedPage.tsx
git commit -m "Add Bahasa Indonesia locale registry"
```

---

### Task 2: Translate the Homepage and Add the Indonesian Home Route

**Files:**
- Modify: `lib/home-i18n.ts`
- Create: `app/id/page.tsx`

**Interfaces:**
- Produces: `HomeLocale = 'en' | 'zh-CN' | 'es' | 'id'` and complete Indonesian home copy.

- [ ] **Step 1: Extend the homepage locale union**

Add `id` to the exported home locale type and use the existing dictionary lookup path without locale-specific JSX.

- [ ] **Step 2: Add complete Indonesian homepage copy**

Add the `id` dictionary with these fixed hero strings:

```ts
heroAlt: 'FourType — Kenali sifat sejati Anda — Perjalanan temperamen',
heroTitle: 'Tes Temperamen Gratis',
heroStatement: 'Jawab 40 pertanyaan untuk menemukan temperamen utama, perpaduan kedua, pola saat tertekan, gaya komunikasi, dan arah pertumbuhan Anda.',
heroCta: 'Mulai tes',
heroMeta: '40 pertanyaan • Hasil langsung • Tanpa email • 16 pola',
choosePath: 'Pilih jalan Anda',
```

Translate all intro paragraphs, guide labels, stats, four temperament descriptions and traits, four feature blocks, and four guide cards. Use `Koleris`, `Sanguinis`, `Melankolis`, and `Plegmatis`; retain the branded class names in English.

- [ ] **Step 3: Add the route wrapper**

Create `app/id/page.tsx`:

```tsx
import { localizedMetadata } from '@/components/LocalizedPage'
import { HomeExperience } from '@/app/page'

export const metadata = localizedMetadata('id', 'home')

export default function IdHomePage() {
  return <HomeExperience locale="id" />
}
```

- [ ] **Step 4: Verify homepage dictionary and build**

Run: `pnpm exec tsx --test tests/localization.test.ts && pnpm exec tsc --noEmit`

Expected: locale test still fails only on quiz copy; TypeScript exits after all referenced home types are complete.

- [ ] **Step 5: Commit Indonesian homepage**

```bash
git add lib/home-i18n.ts app/id/page.tsx
git commit -m "Add Bahasa Indonesia FourType homepage"
```

---

### Task 3: Translate All Quiz and Result Content

**Files:**
- Modify: `lib/quiz-i18n.ts`
- Create: `app/id/quiz/page.tsx`

**Interfaces:**
- Produces: `QuizLocale = 'en' | 'zh-CN' | 'es' | 'id'`.
- Produces exactly 40 Indonesian `Question` objects and exactly one summary for every `BlendKey`.

- [ ] **Step 1: Add `id` to QuizLocale and create the Indonesian QuizCopy**

Translate every `QuizCopy` field. Use these fixed primary labels:

```ts
temperamentNames: {
  Yellow: 'Sanguinis',
  Red: 'Koleris',
  Blue: 'Melankolis',
  Green: 'Plegmatis',
},
classTitles: {
  Yellow: 'The Bard',
  Red: 'The Commander',
  Blue: 'The Strategist',
  Green: 'The Guardian',
},
```

Friend CTA copy must promise shared strengths, likely friction, and better communication. Safety copy must use `alat refleksi diri, bukan diagnosis klinis`.

- [ ] **Step 2: Translate all 40 questions without changing scoring identity**

Create `idQuestionText: Record<number, LocalizedQuestionText>` with entries 1 through 40. For every entry:

- preserve the source question ID and section;
- preserve answer letters A, B, C, and D in their original order;
- translate `instruction`, optional `text`, `sectionLabel`, and all four answer strings;
- use `Sifat`, `Pernyataan`, `Ungkapan`, and `Skenario` for sections 1–4;
- use ordinary conversational Indonesian and avoid translating temperament labels into medical language.

Add `idQuestions = localizeQuestions(idQuestionText)` through the same helper used by Chinese and Spanish, and return it from `getQuizQuestions('id')`.

- [ ] **Step 3: Translate all 16 blend summaries**

Create `idBlendSummaries: Record<BlendKey, LocalizedBlendSummary>`. Preserve every blend key and translate `name`, `blend`, `rpgClass`, `tagline`, `drive`, `lore`, strengths, shadows, pressure behavior, communication advice, and “never do” guidance. Mixed labels use primary-secondary order, such as `Koleris-Sanguinis`; pure labels use `Koleris murni`.

Return `idBlendSummaries[blendKey]` from `getLocalizedBlendSummary` when locale is `id`.

- [ ] **Step 4: Add the locale-aware quiz wrapper**

Create `app/id/quiz/page.tsx` with `QuizExperienceWithSearch`, not `QuizExperience`, so Indonesian referral query parameters are preserved:

```tsx
import { Suspense } from 'react'
import { localizedMetadata } from '@/components/LocalizedPage'
import { QuizExperienceWithSearch } from '@/app/quiz/QuizClient'

export const metadata = localizedMetadata('id', 'quiz')

export default function IdQuizPage() {
  return <Suspense fallback={null}><QuizExperienceWithSearch locale="id" /></Suspense>
}
```

- [ ] **Step 5: Run completeness and build checks**

Run: `pnpm exec tsx --test tests/localization.test.ts && pnpm exec tsc --noEmit && pnpm build`

Expected: localization test passes, TypeScript exits 0, and all 40-question routes build.

- [ ] **Step 6: Commit Indonesian quiz and results**

```bash
git add lib/quiz-i18n.ts app/id/quiz/page.tsx tests/localization.test.ts
git commit -m "Translate FourType quiz into Bahasa Indonesia"
```

---

### Task 4: Add Indonesian Core SEO Routes and Sitemap Alternates

**Files:**
- Create: `app/id/temperament-test/page.tsx`
- Create: `app/id/four-temperaments-test/page.tsx`
- Modify: `app/sitemap.ts`

**Interfaces:**
- Consumes: `localizedMetadata`, `LocalizedPage`, and localized content keys.

- [ ] **Step 1: Add both SEO route wrappers**

Create each route using the same pattern:

```tsx
import { localizedMetadata, LocalizedPage } from '@/components/LocalizedPage'

export const metadata = localizedMetadata('id', 'temperament-test')

export default function IndonesianTemperamentTestPage() {
  return <LocalizedPage locale="id" pageKey="temperament-test" />
}
```

Use page key `four-temperaments-test` in the second file.

- [ ] **Step 2: Add reciprocal Indonesian sitemap entries**

Add `id` to the localized route list. Every localized core URL must expose language alternates for English, Simplified Chinese, Spanish, and Indonesian. Use the exact public origin `https://www.fourtype.com`.

- [ ] **Step 3: Verify routes and metadata in a production build**

Run: `pnpm build`

Then start on port 3030 and run:

```bash
curl -s http://localhost:3030/id | rg -q 'Tes Temperamen Gratis'
curl -s http://localhost:3030/id/quiz | rg -q 'Tes Temperamen FourType Gratis'
curl -s http://localhost:3030/id/temperament-test | rg -q 'Apa Itu Tes Temperamen'
curl -s http://localhost:3030/id/four-temperaments-test | rg -q 'Koleris.*Sanguinis.*Melankolis.*Plegmatis'
curl -s http://localhost:3030/sitemap.xml | rg -q 'https://www.fourtype.com/id/quiz'
```

Expected: every command exits 0.

- [ ] **Step 4: Commit Indonesian SEO routes**

```bash
git add app/id/temperament-test/page.tsx app/id/four-temperaments-test/page.tsx app/sitemap.ts
git commit -m "Add Indonesian temperament SEO routes"
```

---

### Task 5: Localize Result Sharing and Referral Metadata

**Files:**
- Modify: `lib/share-copy.ts`
- Create: `lib/comparison-i18n.ts`
- Modify: `app/share/[id]/page.tsx`
- Modify: `app/share/[id]/SharePageClient.tsx`
- Modify: `components/ResultsScreen.tsx`
- Modify: `components/ReferralInviteBanner.tsx`
- Modify: `components/PairComparison.tsx`
- Modify: `components/PairShareCard.tsx`

**Interfaces:**
- Produces: `ShareLocale = 'en' | 'zh-CN' | 'es' | 'id'`.
- Produces: locale-aware `getShareText`, `getShareMetadata`, and pair labels.

- [ ] **Step 1: Make share copy locale-aware**

Add an optional locale parameter defaulting to `en`. Indonesian result copy uses:

- title: `Saya mendapatkan {resultName} di FourType`
- hook: `Hasil ini terasa sangat mengenal saya.`
- challenge: `Tes temperamen Anda dan lihat bagaimana kita saling melengkapi.`
- pair label: `Pasangan FourType kami`
- CTA: `Anda tipe yang mana? fourtype.com`

Preserve current English callers through the default parameter.

- [ ] **Step 2: Carry locale in share and compare URLs**

For `locale === 'id'`, build:

```ts
const shareUrl = `https://www.fourtype.com/share/${shareId}?lang=id`
const compareUrl = `https://www.fourtype.com/id/quiz?compare=${shareId}`
```

Use equivalent existing prefixes for Chinese and Spanish. English keeps canonical unprefixed URLs.

- [ ] **Step 3: Localize share-page metadata**

In `app/share/[id]/page.tsx`, read `searchParams.lang`, normalize it through the locale registry, and pass it to `getShareMetadata` and `SharePageClient`. Add canonical metadata without the query string and an Indonesian Open Graph locale of `id_ID`.

- [ ] **Step 4: Localize referred and pair UI labels**

Move referral banner, pair comparison, and pair card labels into the quiz result dictionary. Add all required keys to every locale so TypeScript enforces parity. Indonesian copy must fit 390px mobile screens without reducing font size by viewport width.

Create `lib/comparison-i18n.ts` with `getLocalizedComparisonInsight(locale, self, friend)`. English returns `getComparisonInsight(self, friend)`. Indonesian uses the same unordered primary-pair keys and directional primary advice as `lib/comparison.ts`, with all ten unique pair combinations translated. Extend `tests/localization.test.ts` with:

```ts
const pair = getLocalizedComparisonInsight('id', BLENDS.Commander, BLENDS.Guardian)
assert.match(pair.sharedQuality, /arah|ketenangan|keputusan|kepercayaan/i)
assert.equal(/[A-Z][a-z]+\s+(brings|protects|may)/.test(pair.complement), false)
```

Pass the localized `PairInsight` from `ResultsScreen` into `PairComparison` and `PairShareCard`; do not translate already-rendered English prose at runtime.

- [ ] **Step 5: Run final functional verification**

Run: `pnpm test && pnpm exec tsc --noEmit && pnpm build && git diff --check`

Expected: all commands exit 0.

Use a local production browser to verify `/id/quiz?compare=<validId>` from name entry through pair sharing on desktop and 390px mobile. Confirm no English controls remain in the core journey except branded character names.

- [ ] **Step 6: Commit localized sharing**

```bash
git add lib/share-copy.ts lib/comparison-i18n.ts app/share/[id]/page.tsx app/share/[id]/SharePageClient.tsx components/ResultsScreen.tsx components/ReferralInviteBanner.tsx components/PairComparison.tsx components/PairShareCard.tsx tests/localization.test.ts
git commit -m "Localize FourType referral sharing in Indonesian"
```

---

### Task 6: Production Verification

**Files:**
- No planned source changes.

- [ ] **Step 1: Run the complete local verification suite**

Run: `pnpm test && pnpm exec tsc --noEmit && pnpm build && git diff --check`

Expected: all commands exit 0.

- [ ] **Step 2: Push and wait for deployment**

Run: `git push origin main`

Expected: push succeeds and the Vercel deployment becomes ready.

- [ ] **Step 3: Probe production**

Run:

```bash
curl -s https://www.fourtype.com/id | rg -q 'Tes Temperamen Gratis'
curl -s https://www.fourtype.com/id/quiz | rg -q 'Tes Temperamen FourType Gratis'
curl -s https://www.fourtype.com/id/temperament-test | rg -q 'Apa Itu Tes Temperamen'
curl -s https://www.fourtype.com/sitemap.xml | rg -q 'https://www.fourtype.com/id/quiz'
```

Expected: every command exits 0.

- [ ] **Step 4: Confirm a live referred completion**

Open a valid Indonesian comparison link on mobile, complete enough of the journey to verify referred entry and question localization, and confirm the production Events sheet receives `invite-open` with locale `id` without exposing an email address.
