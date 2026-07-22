# FourType Relationship Cluster Design

## Goal

Turn FourType's existing relationship content into a clear English-first learning path for people searching for compatibility, communication, conflict, couple conversations, and parenting guidance.

The cluster should help a visitor move from a broad question such as "Are we compatible?" to one useful conversation or behavior they can try. It must use the four temperaments as self-reflection language, not as a diagnosis, prediction, or excuse for poor behavior.

## Current Context

FourType already has several strong relationship pages in the shared content model:

- `/temperament-test-for-couples`
- `/blog/four-temperaments-compatibility`
- `/blog/temperament-compatibility-chart`
- `/blog/choleric-phlegmatic-relationship`
- `/blog/sanguine-melancholic-compatibility`
- `/blog/temperament-conflict-style`
- `/blog/temperament-communication-style`
- `/blog/personality-test-for-relationships`

The pages are indexable and receive standard metadata, `BlogPosting` or `Article` schema, FAQ schema, sitemap entries, Markdown mirrors, and internal-link modules through `lib/seo-content.ts`. Their gap is not discoverability by the technical system. Their gap is editorial structure: they read as useful individual articles rather than one relationship destination with a clear next step.

## Scope

### New pillar page: `/relationships`

Add a static SEO page titled **Temperament Relationships: Compatibility, Communication, and Repair**.

It should:

- Explain what temperament can and cannot help with in relationships.
- Introduce the four recurring needs under pressure: direction, connection, clarity, and steadiness.
- Route readers to compatibility, pair dynamics, conflict, communication, couple conversations, and parenting.
- Include an explicit invitation to take the quiz separately before comparing results.
- Link to `/temperament-test-for-couples` as the practical starting point.
- Use clear, adult language. It should avoid match-score claims and fixed-identity language.

### Strengthen the existing relationship pages

Keep the existing URLs and improve their roles in the cluster:

| Route | Cluster role | Editorial update |
| --- | --- | --- |
| `/temperament-test-for-couples` | Action page | Add a short three-step couple flow: take the quiz separately, compare score patterns, choose one conversation prompt. |
| `/blog/four-temperaments-compatibility` | Compatibility pillar | Add a clear route to the discussion guide, conflict styles, and the two deep-dive pair guides. |
| `/blog/choleric-phlegmatic-relationship` | Pair deep dive | Keep the drive-and-steadiness explanation, then add a practical repair moment and route to the couples guide. |
| `/blog/sanguine-melancholic-compatibility` | Pair deep dive | Reframe the central practical section as communication: warmth, detail, hurt, humor, and follow-through. |
| `/blog/temperament-conflict-style` | Problem page | Make the repair sequence more explicit: what each pattern does first, what it misses, and one better next move. |
| `/blog/temperament-communication-style` | Skill page | Clarify how each pattern gives feedback, listens, asks for care, and repairs after a missed signal. |

No route should present a pairing as inherently good, bad, destined, or doomed.

### Add two practical guides

#### `/blog/couples-discussion-guide-by-temperament`

Target intent: couples who want a practical activity after taking a test.

Required content:

- A brief setup: take the quiz separately and do not argue about each other's result.
- A 30-minute discussion structure with simple prompts.
- Questions about pressure, affection, conflict, pace, and repair.
- Four pattern-specific reminders for Choleric, Sanguine, Melancholic, and Phlegmatic responses.
- A close that asks the couple to pick one small agreement for the week.
- Links to the couples test, compatibility pillar, conflict styles, and communication styles.

#### `/blog/parenting-by-temperament`

Target intent: parents looking for gentler language around temperament differences at home.

Required content:

- State plainly that temperament is not a diagnosis and should never be used to label a child as difficult, lazy, dramatic, or broken.
- Explain how a parent can notice a child's pace, need for structure, social energy, and response to pressure.
- Give one supportive parenting move and one common overreach to avoid for each temperament pattern.
- Include a family repair example that focuses on the adult's response, not controlling the child.
- Link to the four individual temperament guides, the couples discussion guide, and the quiz as an adult self-reflection tool.

## Internal Linking Model

The cluster should have deliberate, non-repetitive paths:

```text
/relationships
  -> /temperament-test-for-couples
  -> compatibility pillar
  -> pair deep dives
  -> conflict and communication guides
  -> couples discussion guide
  -> parenting guide
  -> relevant individual temperament guide
  -> /quiz
```

Rules:

- Use only relevant contextual links and the existing related-guide area. Do not make every article link to every other article.
- Link to `/quiz` when the reader needs their own pattern. Link to `/temperament-test-for-couples` when the reader needs a shared activity.
- Reference the classical term alongside the FourType name at first useful mention: Commander (Choleric), Bard (Sanguine), Strategist (Melancholic), and Guardian (Phlegmatic). Subsequent prose can use the classical temperament names where the search intent calls for them.
- Preserve the live URL `/temperament-test-for-couples`; if `/test-for-couples` exists as a redirect, it should resolve to this canonical route rather than create duplicate content.

## Content Standards

- Write in short, natural paragraphs with specific situations and scripts.
- Keep advice within general self-reflection and communication education. Do not give therapy, safety, abuse, clinical, diagnostic, or relationship-outcome claims.
- Include a gentle safety line where useful: temperament is not a reason to tolerate coercion, intimidation, or harm.
- Use the modern FourType language and the classical names together without treating people as fixed types.
- Do not recycle generic compatibility claims. Each page must answer a distinct question and contain a distinct practical exercise, scenario, or repair script.

## Technical Design

Use the existing `lib/seo-content.ts` data model and current dynamic renderers:

- Add `/relationships` as a `SeoPage` entry so it receives the existing metadata, Article schema, FAQ schema, sitemap entry, Markdown mirror, AI manifest listing, and SEO layout.
- Add the two new guides as `BlogArticle` entries so they receive the existing blog metadata, `BlogPosting` schema, sitemap entry, Markdown mirror, related-guide components, and article layout.
- Update only the relevant existing `BlogArticle` and `SeoPage` entries plus `relationshipGuideLinks` and the cluster-specific related arrays.
- Add a dedicated relationship-link resolver only if the generic relation list cannot express the correct page-specific links without duplication. Prefer data changes over rendering changes.
- Reuse existing relationship imagery where it is appropriate. Do not add decorative character cutouts. Any visual should explain a situation, contrast, or exercise.

## SEO and Information Architecture

Primary search intents:

- temperament compatibility
- Choleric and Phlegmatic relationship
- Sanguine and Melancholic communication
- temperament conflict styles
- couples discussion guide
- parenting by temperament

The relationship pillar owns the broad topic. Existing compatibility pages retain their current query-focused URLs. The two new guides own the practical action queries. This avoids competing with existing pages for the same exact intent.

Each page should contain a focused title, unique description, unique FAQ set, unique introduction, and a useful next action. The cluster must not make claims that compatibility or a quiz result can predict relationship success.

## Verification

Before deployment:

- Run TypeScript, lint, unit tests, and a production build.
- Verify every new and changed route renders with a 200 response.
- Confirm metadata canonical URLs, Open Graph image fallbacks, Article or BlogPosting schema, FAQ schema, sitemap inclusion, Markdown mirrors, and internal links.
- Check every relationship page for clear FourType/classical-term mapping and responsible-use wording.
- Confirm the new content is English only; do not expose unfinished Chinese, Spanish, or Indonesian variants.
- Review the new copy with the humanizer standard: no inflated promises, no repetitive templates, no vague advice, and no mechanical keyword repetition.
- Visually inspect the hub and both new articles on desktop and mobile to ensure text, related links, and calls to action remain readable.

## Out of Scope

- Programmatic pages for all temperament-pair combinations.
- Relationship scoring, match percentages, or compatibility calculators.
- New quiz logic or data collection.
- Translation work in this release.
- Changes to public pricing, the Field Guide sales page, or existing published files unrelated to this cluster.
