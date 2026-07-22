# FourType Relationship Cluster Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a coherent English-first relationship learning cluster that routes visitors from compatibility questions to practical couple, conflict, communication, and parenting guidance.

**Architecture:** Extend the existing data-driven publishing system in `lib/seo-content.ts`. A new `SeoPage` provides the `/relationships` pillar while two new `BlogArticle` entries provide the practical guides; existing pages are strengthened through their blocks and `related` links. The current dynamic SEO and blog route renderers continue to supply metadata, schema, sitemap entries, Markdown mirrors, and layouts.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, Lucide icons, Node test runner via `tsx`.

## Global Constraints

- Publish English only; do not add localized variants in this release.
- Use the current `SeoPage`, `BlogArticle`, `ContentBlock`, and `LinkCard` shapes from `lib/seo-content.ts`.
- Keep the four temperaments as self-reflection language, never diagnosis, prediction, a compatibility score, or an excuse for harm.
- Use FourType plus the classical terms at the first useful mention: Commander (Choleric), Bard (Sanguine), Strategist (Melancholic), Guardian (Phlegmatic).
- Preserve existing route URLs, published Field Guide files, checkout behavior, and unrelated website pages.
- Use short natural prose, specific situations, repair scripts, and unique exercises. Avoid keyword stuffing and generic compatibility claims.
- Do not introduce decorative character cutouts. Reuse existing responsive article imagery only when it supports the page content.

---

## File Structure

- Modify: `lib/seo-content.ts`
  - Source of truth for the new relationship pillar, new blog articles, existing article revisions, related-guide data, and route discovery.
- Create: `tests/relationship-cluster.test.ts`
  - Contract tests for route availability, cluster linking, distinct guide content, responsible framing, and FourType/classical-term mapping.
- Modify: `docs/superpowers/specs/2026-07-22-fourtype-relationship-cluster-design.md`
  - Only if implementation discovers a necessary, approved discrepancy; otherwise leave unchanged.

### Task 1: Establish the relationship-cluster contract

**Files:**
- Create: `tests/relationship-cluster.test.ts`
- Modify: `lib/seo-content.ts` (no implementation in this task)

**Interfaces:**
- Consumes: `seoPages`, `blogArticles`, `relationshipGuideLinks`, `getSeoPage`, and `getBlogArticle` from `../lib/seo-content`.
- Produces: executable coverage for the content routes and cluster links that later tasks must satisfy.

- [ ] **Step 1: Write the failing test**

```ts
import assert from 'node:assert/strict'
import test from 'node:test'
import { blogArticles, getBlogArticle, getSeoPage, relationshipGuideLinks, seoPages } from '../lib/seo-content'

const requiredArticleSlugs = [
  'four-temperaments-compatibility',
  'choleric-phlegmatic-relationship',
  'sanguine-melancholic-compatibility',
  'temperament-conflict-style',
  'temperament-communication-style',
  'couples-discussion-guide-by-temperament',
  'parenting-by-temperament',
]

test('relationship cluster has a pillar and every required guide', () => {
  assert.equal(getSeoPage('relationships')?.title, 'Temperament Relationships: Compatibility, Communication, and Repair')
  requiredArticleSlugs.forEach((slug) => assert.ok(getBlogArticle(slug), `missing ${slug}`))
  assert.ok(getSeoPage('temperament-test-for-couples'))
})

test('relationship cluster routes readers to the quiz and couples action page', () => {
  const hub = getSeoPage('relationships')!
  const hubLinks = hub.blocks.flatMap((block) => block.type === 'grid' ? block.items.map((item) => `${item.title} ${item.body}`) : [])
  assert.ok(hubLinks.some((copy) => /couple|discussion/i.test(copy)))
  assert.ok(relationshipGuideLinks.some((link) => link.href === '/temperament-test-for-couples'))
  assert.ok(relationshipGuideLinks.some((link) => link.href === '/blog/couples-discussion-guide-by-temperament'))
  assert.ok(relationshipGuideLinks.some((link) => link.href === '/blog/parenting-by-temperament'))
})

test('new relationship guides use practical and responsible framing', () => {
  const couples = getBlogArticle('couples-discussion-guide-by-temperament')!
  const parenting = getBlogArticle('parenting-by-temperament')!
  const couplesCopy = JSON.stringify(couples)
  const parentingCopy = JSON.stringify(parenting)

  assert.match(couplesCopy, /30-minute|30 minute/i)
  assert.match(couplesCopy, /Choleric.*Sanguine.*Melancholic.*Phlegmatic/s)
  assert.match(parentingCopy, /not a diagnosis/i)
  assert.match(parentingCopy, /do not.*label|never.*label/i)
  assert.match(parentingCopy, /Commander \(Choleric\)|Choleric.*Commander/i)
})

test('relationship articles have distinct titles and do not make match-score claims', () => {
  const articles = requiredArticleSlugs.map((slug) => getBlogArticle(slug)!)
  assert.equal(new Set(articles.map((article) => article.title)).size, articles.length)
  articles.forEach((article) => assert.doesNotMatch(JSON.stringify(article), /match score|perfect match|guaranteed compatibility/i))
  assert.equal(blogArticles.some((article) => article.slug === 'parenting-by-temperament'), true)
  assert.equal(seoPages.some((page) => page.slug === 'relationships'), true)
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx tsx --test tests/relationship-cluster.test.ts`

Expected: FAIL because `relationships`, `couples-discussion-guide-by-temperament`, and `parenting-by-temperament` do not yet exist.

- [ ] **Step 3: Keep this test as the cluster contract**

Do not weaken the route, action-page, or responsible-framing assertions during implementation. Add a focused assertion only when a new requirement is introduced by the approved spec.

- [ ] **Step 4: Commit the test scaffold**

```bash
git add tests/relationship-cluster.test.ts
git commit -m "test: define relationship cluster contract"
```

### Task 2: Add the `/relationships` pillar and reinforce the couples action page

**Files:**
- Modify: `lib/seo-content.ts: seoPages`
- Test: `tests/relationship-cluster.test.ts`

**Interfaces:**
- Consumes: the existing `SeoPage` model and generic route renderer at `app/(seo)/[slug]/page.tsx`.
- Produces: `getSeoPage('relationships')` and a strengthened `getSeoPage('temperament-test-for-couples')` with no renderer changes.

- [ ] **Step 1: Extend the failing test with explicit action-page content**

```ts
test('couples action page gives partners a shared three-step flow', () => {
  const page = getSeoPage('temperament-test-for-couples')!
  const copy = JSON.stringify(page.blocks)

  assert.match(copy, /Take the quiz separately/i)
  assert.match(copy, /Compare.*score/i)
  assert.match(copy, /one conversation prompt|one small agreement/i)
  assert.equal(page.ctaLabel, 'Take the Quiz Together')
})
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npx tsx --test tests/relationship-cluster.test.ts`

Expected: FAIL because the current couples page lacks the required three-step wording and the `relationships` pillar is absent.

- [ ] **Step 3: Add the `relationships` SEO page in `seoPages`**

Add this page adjacent to `temperament-test-for-couples` so future editors can find the cluster together:

```ts
{
  slug: 'relationships',
  shortTitle: 'Temperament Relationships',
  title: 'Temperament Relationships: Compatibility, Communication, and Repair',
  description: 'Use Choleric, Sanguine, Melancholic, and Phlegmatic patterns to understand compatibility, conflict, communication, repair, couples, and parenting.',
  keywords: ['temperament relationships', 'temperament compatibility', 'temperament communication', 'temperament conflict styles', 'parenting by temperament'],
  eyebrow: 'Relationships and Family',
  icon: Heart,
  accent: 'pink',
  priority: 0.86,
  changeFrequency: 'monthly',
  ctaLabel: 'Take the Quiz Separately',
  blocks: [
    { type: 'section', title: 'A pattern is useful when it makes a person easier to understand', body: ['Temperament can give people shared language for pace, pressure, affection, and repair. It cannot predict whether a relationship will work or excuse harmful behavior.'] },
    { type: 'grid', title: 'Four pressures, four first moves', items: [
      { title: 'Commander (Choleric)', body: 'Looks for direction when pressure rises.', accent: 'red' },
      { title: 'Bard (Sanguine)', body: 'Looks for connection and emotional movement.', accent: 'gold' },
      { title: 'Strategist (Melancholic)', body: 'Looks for clarity, meaning, and what may be missed.', accent: 'blue' },
      { title: 'Guardian (Phlegmatic)', body: 'Looks for steadiness and emotional safety.', accent: 'green' },
    ] },
    { type: 'grid', title: 'Start with the question you are actually asking', items: [
      { title: 'Compatibility', body: 'Compare patterns without looking for a perfect match.', accent: 'pink' },
      { title: 'Conflict and repair', body: 'Notice the default move, the missing move, and a better next step.', accent: 'red' },
      { title: 'Couples and parenting', body: 'Use practical questions at home instead of labels.', accent: 'green' },
    ] },
    { type: 'callout', title: 'Take the quiz separately, then compare gently', body: 'Each person should answer from repeated behavior. Then choose one recent moment and ask what each of you was trying to protect.', bullets: ['What do I do under pressure?', 'What helps me stay present?', 'What is one small agreement we can try this week?'] },
  ],
  faq: [
    { question: 'Can temperament predict relationship compatibility?', answer: 'No. It can help people understand recurring patterns in pace, communication, conflict, and repair.' },
    { question: 'Should couples take the temperament test together?', answer: 'Take it separately first, then compare results as conversation starters rather than verdicts.' },
    { question: 'Can temperament help families?', answer: 'It can help adults notice different needs for pace, clarity, connection, and steadiness without turning anyone into a fixed label.' },
  ],
}
```

Populate its blocks with four distinct sections:

1. **A pattern is useful when it makes a person easier to understand**: explain limits and no relationship verdicts.
2. **Four pressures, four first moves**: Commander (Choleric) seeks direction, Bard (Sanguine) seeks connection, Strategist (Melancholic) seeks clarity, Guardian (Phlegmatic) seeks steadiness.
3. **Start with the question you are actually asking**: grid entries for compatibility, pair dynamics, conflict, communication, couple conversations, and parenting.
4. **Take the quiz separately, then compare gently**: three practical prompts and a link-oriented next step.

- [ ] **Step 4: Strengthen the existing couples page**

Insert a `callout` after the opening section in the existing `temperament-test-for-couples` entry:

```ts
{
  type: 'callout',
  title: 'Take the quiz separately, then compare gently',
  body: 'The useful part is not agreeing on a label. It is noticing where your score patterns make a hard moment easier or harder to read.',
  bullets: [
    'Take the quiz separately and answer from repeated behavior.',
    'Compare your score spread before debating a single top result.',
    'Choose one conversation prompt: What do I do under pressure, and what helps me stay present?',
  ],
},
```

Add `/relationships`, `/blog/couples-discussion-guide-by-temperament`, and `/blog/temperament-conflict-style` to its related guide list through the existing `relationshipGuideLinks` resolver.

- [ ] **Step 5: Run the focused test to verify it passes**

Run: `npx tsx --test tests/relationship-cluster.test.ts`

Expected: PASS for the pillar and couples action-page assertions; the two new article assertions should still fail until Task 3.

- [ ] **Step 6: Commit the pillar and couples flow**

```bash
git add lib/seo-content.ts tests/relationship-cluster.test.ts
git commit -m "feat: add temperament relationships hub"
```

### Task 3: Publish the couples discussion guide and parenting guide

**Files:**
- Modify: `lib/seo-content.ts: blogArticles and relationshipGuideLinks`
- Test: `tests/relationship-cluster.test.ts`

**Interfaces:**
- Consumes: existing `BlogArticle` model and dynamic blog renderer at `app/blog/[slug]/page.tsx`.
- Produces: `getBlogArticle('couples-discussion-guide-by-temperament')` and `getBlogArticle('parenting-by-temperament')`.

- [ ] **Step 1: Add a failing internal-link assertion**

```ts
test('new practical guides point to the right next relationship actions', () => {
  const couples = getBlogArticle('couples-discussion-guide-by-temperament')!
  const parenting = getBlogArticle('parenting-by-temperament')!

  assert.ok(couples.related.some((link) => link.href === '/temperament-test-for-couples'))
  assert.ok(couples.related.some((link) => link.href === '/blog/temperament-conflict-style'))
  assert.ok(couples.related.some((link) => link.href === '/blog/temperament-communication-style'))
  assert.ok(parenting.related.some((link) => link.href === '/temperament/choleric'))
  assert.ok(parenting.related.some((link) => link.href === '/temperament/phlegmatic'))
  assert.ok(parenting.related.some((link) => link.href === '/blog/couples-discussion-guide-by-temperament'))
})
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npx tsx --test tests/relationship-cluster.test.ts`

Expected: FAIL because both practical guides are absent.

- [ ] **Step 3: Add the couples discussion guide as a `BlogArticle`**

Use these fixed metadata fields:

```ts
{
  slug: 'couples-discussion-guide-by-temperament',
  title: 'Couples Discussion Guide by Temperament: A Better Conversation After the Quiz',
  shortTitle: 'Couples Discussion Guide',
  description: 'Use this couples discussion guide after a temperament test to talk about pressure, affection, conflict, pace, and repair without turning results into blame.',
  keywords: ['couples discussion guide', 'temperament couples discussion', 'temperament relationship questions', 'couples communication guide'],
  category: 'Relationships',
  readTime: '10 min',
  accent: 'pink',
  icon: Heart,
  image: '/images/blog/temperament-compatibility-chart.jpg',
  imageAlt: 'A couple using a temperament discussion guide to talk through communication and repair',
  published: '2026-07-22',
  blocks: [
    { type: 'section', title: 'Start with curiosity, not a verdict', body: ['Take the quiz separately. A result is a hypothesis about repeated behavior, not a way to diagnose your partner.'] },
    { type: 'table', title: 'A 30-minute conversation', columns: ['Time', 'Question', 'What to listen for'], rows: [['5 minutes', 'What do I do under pressure?', 'The first move, not the best answer.'], ['10 minutes', 'What helps me feel cared for?', 'Different needs for pace and reassurance.'], ['10 minutes', 'How do we repair after a miss?', 'One practical return to the conversation.'], ['5 minutes', 'What will we try this week?', 'A small agreement that both people can keep.']] },
    { type: 'grid', title: 'What helps each pattern stay in the room', items: [
      { title: 'Commander (Choleric)', body: 'A clear point, a real answer, and a request to slow down without disappearing.', accent: 'red' },
      { title: 'Bard (Sanguine)', body: 'Warmth, responsiveness, and a reason to stay with the hard part.', accent: 'gold' },
      { title: 'Strategist (Melancholic)', body: 'Specificity, sincerity, and enough time to explain what matters.', accent: 'blue' },
      { title: 'Guardian (Phlegmatic)', body: 'Calm pressure, time to answer, and safety to state a real preference.', accent: 'green' },
    ] },
    { type: 'callout', title: 'End with one small agreement', body: 'Choose a behavior, not a personality promise.', bullets: ['Name the agreement in one sentence.', 'Choose a time to check in.', 'Repair the miss instead of scoring it.'] },
    { type: 'section', title: 'When the conversation needs more than a guide', body: ['Temperament does not excuse coercion, intimidation, contempt, or harm. If a conversation is unsafe, prioritize support and safety over a better script.'] },
  ],
  related: [
    { href: '/temperament-test-for-couples', title: 'Temperament Test for Couples', description: 'Take the test separately before comparing patterns.' },
    { href: '/blog/four-temperaments-compatibility', title: 'Four Temperaments Compatibility', description: 'Understand compatibility without a perfect-match story.' },
    { href: '/blog/temperament-conflict-style', title: 'Temperament Conflict Style', description: 'Learn first moves and repair moves under pressure.' },
    { href: '/blog/temperament-communication-style', title: 'Temperament Communication Style', description: 'Learn how each pattern gives and receives feedback.' },
    { href: '/quiz', title: 'Take the Free Quiz', description: 'Find your own score pattern first.' },
  ],
  faq: [
    { question: 'Can different temperaments communicate well?', answer: 'Yes. Different patterns can communicate well when both people learn how the other handles pace, pressure, and repair.' },
    { question: 'Do both people need the same result?', answer: 'No. The discussion works best when each person brings their own repeated patterns to the conversation.' },
    { question: 'How often should we use this exercise?', answer: 'Use it after a result, after a recurring misunderstanding, or when you need a calmer way to begin a hard conversation.' },
  ],
}
```

Use these unique blocks in this order:

1. `section`: **Start with curiosity, not a verdict**. Partners take the quiz separately, do not diagnose each other, and use results as hypotheses.
2. `table`: **A 30-minute conversation** with columns `Time`, `Question`, `What to listen for` and rows for pressure, affection, conflict, pace, and repair.
3. `grid`: **What helps each pattern stay in the room** with four cards for Commander (Choleric), Bard (Sanguine), Strategist (Melancholic), and Guardian (Phlegmatic).
4. `callout`: **End with one small agreement** with a single weekly agreement, a check-in time, and a reminder to repair rather than score points.
5. `section`: **When the conversation needs more than a guide**. Temperament does not excuse coercion, intimidation, contempt, or harm.

Link it to `/temperament-test-for-couples`, `/blog/four-temperaments-compatibility`, `/blog/temperament-conflict-style`, `/blog/temperament-communication-style`, and `/quiz`.

- [ ] **Step 4: Add the parenting guide as a `BlogArticle`**

Use these fixed metadata fields:

```ts
{
  slug: 'parenting-by-temperament',
  title: 'Parenting by Temperament: Notice the Pattern, Support the Child',
  shortTitle: 'Parenting by Temperament',
  description: 'Use temperament patterns to understand a child’s pace, pressure response, social energy, and need for support without turning personality into a label.',
  keywords: ['parenting by temperament', 'temperament parenting styles', 'child temperament guide', 'four temperaments parenting'],
  category: 'Parenting',
  readTime: '11 min',
  accent: 'green',
  icon: Users,
  image: '/images/temperament-wheel.jpg',
  imageAlt: 'Four temperament patterns used as a gentle parenting reflection guide',
  published: '2026-07-22',
  blocks: [
    { type: 'section', title: 'A child is more than a pattern', body: ['Temperament is not a diagnosis. It should never be used to call a child difficult, lazy, dramatic, or broken.'] },
    { type: 'grid', title: 'What to notice before you label', items: [
      { title: 'Pace', body: 'Does the child move quickly, slowly, or need transition time?', accent: 'red' },
      { title: 'Structure', body: 'Do clear expectations reduce pressure or feel crowding?', accent: 'blue' },
      { title: 'Social energy', body: 'Does connection restore energy or does quiet time matter first?', accent: 'gold' },
      { title: 'Pressure response', body: 'What happens when the child is rushed, corrected, or disappointed?', accent: 'green' },
    ] },
    { type: 'table', title: 'Support without overreach', columns: ['Pattern', 'What may help', 'What to avoid'], rows: [['Commander (Choleric)', 'Clear choices and a useful responsibility.', 'Turning every strong reaction into defiance.'], ['Bard (Sanguine)', 'Warm attention and gentle structure.', 'Calling ordinary emotion manipulation.'], ['Strategist (Melancholic)', 'Preparation and room to ask questions.', 'Treating care or sensitivity as a problem.'], ['Guardian (Phlegmatic)', 'Low-pressure invitations and time to answer.', 'Mistaking quietness for agreement.']] },
    { type: 'section', title: 'A family repair after a hard afternoon', body: ['The adult first lowers their own pressure, names what happened without blame, and offers one workable next step. The goal is not to control a child’s temperament. It is to help the child feel understood while learning responsibility.'] },
    { type: 'callout', title: 'Use the quiz on yourself first', body: 'The quiz is an adult self-reflection tool. Start with your own pressure pattern before deciding what a child needs.', bullets: ['Notice your own first move.', 'Lower the pressure before teaching.', 'Ask what support would make the next step possible.'] },
  ],
  related: [
    { href: '/temperament/choleric', title: 'Choleric Temperament', description: 'Understand the drive-first pattern.' },
    { href: '/temperament/sanguine', title: 'Sanguine Temperament', description: 'Understand the connection-first pattern.' },
    { href: '/temperament/melancholic', title: 'Melancholic Temperament', description: 'Understand the clarity-first pattern.' },
    { href: '/temperament/phlegmatic', title: 'Phlegmatic Temperament', description: 'Understand the steadiness-first pattern.' },
    { href: '/blog/couples-discussion-guide-by-temperament', title: 'Couples Discussion Guide', description: 'Use the same pattern language in adult relationships.' },
    { href: '/relationships', title: 'Temperament Relationships', description: 'Explore compatibility, communication, conflict, and repair.' },
    { href: '/quiz', title: 'Take the Free Quiz', description: 'Reflect on your own temperament pattern.' },
  ],
  faq: [
    { question: 'Can temperament diagnose a child?', answer: 'No. Temperament is a loose self-reflection framework, not a clinical diagnosis or assessment of a child.' },
    { question: 'How can parents avoid labels?', answer: 'Describe the situation and the support that helps instead of treating a behavior as a permanent character flaw.' },
    { question: 'Can siblings need different approaches?', answer: 'Yes. Children can differ in pace, social energy, structure needs, and pressure response, even in the same family.' },
  ],
}
```

Use these unique blocks in this order:

1. `section`: **A child is more than a pattern**. State that this is not a diagnosis and never a reason to call a child difficult, lazy, dramatic, or broken.
2. `grid`: **What to notice before you label**: pace, structure, social energy, and pressure response.
3. `table`: **Support without overreach** with columns `Pattern`, `What may help`, `What to avoid`; include all four classical temperaments and the FourType name in the pattern cell.
4. `section`: **A family repair after a hard afternoon**. Show an adult lowering pressure, naming their own reaction, and offering the child a workable next step.
5. `callout`: **Use the quiz on yourself first**. Parents should use `/quiz` for their own reflection, not to grade a child.

Link it to all four individual temperament pages, the couples discussion guide, `/relationships`, and `/quiz`.

- [ ] **Step 5: Add focused FAQ copy**

Add three FAQs to each new guide. The couples guide must answer whether different temperaments can communicate well, whether both people need the same result, and how often to use the exercise. The parenting guide must answer whether temperament can diagnose a child, how to avoid labels, and whether siblings can need different approaches.

- [ ] **Step 6: Add both new articles to `relationshipGuideLinks`**

```ts
{ href: '/relationships', title: 'Temperament Relationships', description: 'Start with compatibility, communication, conflict, and repair.' },
{ href: '/blog/couples-discussion-guide-by-temperament', title: 'Couples Discussion Guide', description: 'Use a 30-minute conversation after taking the quiz separately.' },
{ href: '/blog/parenting-by-temperament', title: 'Parenting by Temperament', description: 'Notice a child’s patterns without turning them into labels.' },
```

Place the hub first, the couples action page second, then compatibility and practical guides. Preserve the existing individual pages in the list.

- [ ] **Step 7: Run the focused test to verify it passes**

Run: `npx tsx --test tests/relationship-cluster.test.ts`

Expected: PASS.

- [ ] **Step 8: Commit the practical guides**

```bash
git add lib/seo-content.ts tests/relationship-cluster.test.ts
git commit -m "feat: add practical relationship guides"
```

### Task 4: Make existing pages behave as one cluster

**Files:**
- Modify: `lib/seo-content.ts: existing relationship article entries and guide link resolver`
- Test: `tests/relationship-cluster.test.ts`

**Interfaces:**
- Consumes: the relationship hub and practical guide URLs created by Tasks 2 and 3.
- Produces: distinct, contextual next links from compatibility, pair, conflict, and communication articles.

- [ ] **Step 1: Add a failing relationship-link matrix test**

```ts
test('existing relationship guides expose the right next practical step', () => {
  const requiredLinks: Record<string, string[]> = {
    'four-temperaments-compatibility': [
      '/blog/couples-discussion-guide-by-temperament',
      '/blog/temperament-conflict-style',
      '/blog/choleric-phlegmatic-relationship',
      '/blog/sanguine-melancholic-compatibility',
    ],
    'choleric-phlegmatic-relationship': ['/blog/couples-discussion-guide-by-temperament', '/blog/temperament-conflict-style'],
    'sanguine-melancholic-compatibility': ['/blog/couples-discussion-guide-by-temperament', '/blog/temperament-communication-style'],
    'temperament-conflict-style': ['/blog/couples-discussion-guide-by-temperament', '/blog/temperament-communication-style'],
    'temperament-communication-style': ['/blog/couples-discussion-guide-by-temperament', '/blog/temperament-conflict-style'],
  }

  Object.entries(requiredLinks).forEach(([slug, hrefs]) => {
    const article = getBlogArticle(slug)!
    hrefs.forEach((href) => assert.ok(article.related.some((link) => link.href === href), `${slug} missing ${href}`))
  })
})
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npx tsx --test tests/relationship-cluster.test.ts`

Expected: FAIL because current article `related` arrays do not consistently route to the two new practical guides.

- [ ] **Step 3: Update the compatibility and pair articles**

Make these targeted content edits in `lib/seo-content.ts`:

- Add a practical `callout` to `four-temperaments-compatibility`: a couple compares one conflict moment and asks what each person was protecting.
- Add a **Repair at the turning point** `section` to `choleric-phlegmatic-relationship`: the Choleric asks for a time-bound answer; the Phlegmatic agrees to return at that time with a real preference.
- Replace the generic central practical framing in `sanguine-melancholic-compatibility` with **How Sanguine and Melancholic communicate when one is hurt**: one person stays with the feeling, the other names the concern plainly, and both agree on a next step.
- Add the exact contextual guide links required by the matrix test. Keep existing type-page links that are relevant.

- [ ] **Step 4: Update conflict and communication articles**

Make these targeted content edits:

- In `temperament-conflict-style`, add a compact grid called **First move, missing move, repair move**. Each card names one stress behavior, what gets crowded out, and the next behavior to practice.
- In `temperament-communication-style`, add a section called **Feedback that can be received**. Give one short sentence stem for each temperament and explain that adaptation is translation, not manipulation.
- Add the exact contextual guide links required by the matrix test.

- [ ] **Step 5: Run the focused test to verify it passes**

Run: `npx tsx --test tests/relationship-cluster.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit the cluster routing and editorial refinements**

```bash
git add lib/seo-content.ts tests/relationship-cluster.test.ts
git commit -m "feat: connect relationship learning paths"
```

### Task 5: Validate content discovery, rendering, and publishing quality

**Files:**
- Modify: `tests/relationship-cluster.test.ts` only if a verification assertion is missing.
- Verify: `lib/seo-content.ts`, `app/(seo)/[slug]/page.tsx`, `app/blog/[slug]/page.tsx`, `app/sitemap.ts`, and `app/md/[...path]/route.ts`.

**Interfaces:**
- Consumes: completed page entries and existing renderers.
- Produces: verified static content that is ready for deployment review.

- [ ] **Step 1: Add sitemap/discoverability assertions if absent**

```ts
import { allContentPages } from '../lib/seo-content'

test('relationship cluster routes are discoverable through the shared content index', () => {
  const hrefs = new Set(allContentPages.map((page) => page.href))
  ;[
    '/relationships',
    '/temperament-test-for-couples',
    '/blog/couples-discussion-guide-by-temperament',
    '/blog/parenting-by-temperament',
  ].forEach((href) => assert.ok(hrefs.has(href), `missing discoverable route ${href}`))
})
```

- [ ] **Step 2: Run all Node tests**

Run: `npm test`

Expected: PASS with the new relationship-cluster tests included.

- [ ] **Step 3: Run static checks and production build**

Run: `npm run lint && npx tsc --noEmit && npm run build`

Expected: all commands exit 0. The build should statically generate `/relationships` and both new blog routes because `generateStaticParams` reads `seoPages` and `blogArticles`.

- [ ] **Step 4: Verify rendered routes and Markdown mirrors locally**

Run in one terminal: `npm run start`

Run in another terminal:

```bash
for path in \
  /relationships \
  /temperament-test-for-couples \
  /blog/couples-discussion-guide-by-temperament \
  /blog/parenting-by-temperament \
  /relationships.md \
  /blog/couples-discussion-guide-by-temperament.md \
  /blog/parenting-by-temperament.md; do
  curl -fsS -o /dev/null -w "%{http_code} %{url_effective}\\n" "http://localhost:3000${path}"
done
```

Expected: every request returns `200` and the canonical HTML pages include the expected title, JSON-LD scripts, and internal links.

- [ ] **Step 5: Inspect desktop and mobile rendering**

Run: `npx playwright test tests/relationship-cluster.spec.ts --project=chromium`

Create `tests/relationship-cluster.spec.ts` only if no existing Playwright coverage can inspect the new routes. The test should visit `/relationships`, `/blog/couples-discussion-guide-by-temperament`, and `/blog/parenting-by-temperament` at 1440px and 390px widths; assert the H1 is visible, the quiz CTA is visible, no page-level horizontal overflow exists, and related-guide links are reachable.

- [ ] **Step 6: Human copy audit**

Read the final content entries in `lib/seo-content.ts` and check each new or revised block for:

- a specific situation, question, script, or exercise;
- no inflated outcome promise;
- no repetitive keyword phrase used as filler;
- no claim that a temperament result predicts relationship success;
- FourType/classical-term mapping at the first useful mention;
- a calm, readable tone suitable for couples and parents.

Make the smallest wording fixes needed, then rerun `npx tsx --test tests/relationship-cluster.test.ts`.

- [ ] **Step 7: Commit validation adjustments**

```bash
git add lib/seo-content.ts tests/relationship-cluster.test.ts tests/relationship-cluster.spec.ts
git commit -m "test: verify relationship content cluster"
```

Only include `tests/relationship-cluster.spec.ts` if it was created in Step 5.

## Plan Self-Review

- Spec coverage: Task 2 implements the pillar and couples action page; Task 3 implements both practical guides; Task 4 makes the pre-existing compatibility, pair, conflict, and communication articles act as one cluster; Task 5 validates discoverability, rendering, metadata inheritance, and voice.
- Placeholder scan: all URLs, content-model fields, test commands, and required copy structures are explicit. Inline array comments describe a following prescribed block list rather than a deferred design decision.
- Type consistency: the plan uses the exported `SeoPage`, `BlogArticle`, `ContentBlock`, `LinkCard`, `getSeoPage`, `getBlogArticle`, `seoPages`, `blogArticles`, `relationshipGuideLinks`, and `allContentPages` interfaces exactly as currently defined in `lib/seo-content.ts`.
