# FourType SEO Blog Cluster Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a relationship/work/rarity SEO cluster that ranks for high-intent four temperament searches and links users back to the quiz.

**Architecture:** Use the existing `blogArticles` dynamic content system in `lib/seo-content.ts`. Each article object automatically feeds `/blog/[slug]`, metadata, FAQ schema, blog index listings, sitemap entries, AI SEO manifest, and Markdown discoverability.

**Tech Stack:** Next.js App Router, TypeScript content objects, existing `ContentBlocks`, existing `BlogArticle` schema.

## Global Constraints

- Do not add new dependencies.
- Keep claims educational and non-clinical.
- Avoid duplicate URLs competing with existing static posts.
- Use existing image assets and article rendering components.
- Every new cluster page must link internally to the quiz and at least two related cluster pages.

---

### Task 1: Add New Dynamic Blog Articles

**Files:**
- Modify: `lib/seo-content.ts`

**Interfaces:**
- Consumes: `BlogArticle`, `ContentBlock`, existing icons and accents.
- Produces: four new `blogArticles` entries.

- [ ] Add `/blog/four-temperaments-compatibility`.
- [ ] Add `/blog/choleric-phlegmatic-relationship`.
- [ ] Add `/blog/sanguine-melancholic-compatibility`.
- [ ] Add `/blog/which-temperament-is-rarest`.

### Task 2: Strengthen Existing Cluster Links

**Files:**
- Modify: `lib/seo-content.ts`

**Interfaces:**
- Consumes: `relationshipGuideLinks` and article `related` arrays.
- Produces: improved internal linking among relationship, work, couples, and rarity content.

- [ ] Add the new compatibility pillar to `relationshipGuideLinks`.
- [ ] Add rarity and work article links where relevant.

### Task 3: Verification

**Files:**
- No additional files.

- [ ] Run `pnpm exec tsc --noEmit`.
- [ ] Run `node node_modules/next/dist/bin/next build`.
- [ ] Smoke check one generated URL locally.
- [ ] Commit and push.
