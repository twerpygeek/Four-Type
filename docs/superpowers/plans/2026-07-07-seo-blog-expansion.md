# SEO Blog Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add eight FourType SEO blog posts targeting comparison, communication, conflict, strengths, weaknesses, and result-reading keywords.

**Architecture:** Extend the existing dynamic blog article array in `lib/seo-content.ts`. The current app already generates `/blog/[slug]`, blog index entries, metadata, sitemap entries, markdown export, and related cards from this data source.

**Tech Stack:** Next.js App Router, TypeScript, static data-driven blog rendering.

## Global Constraints

- Use the existing `BlogArticle` shape.
- No new dependencies.
- Keep language educational, practical, and non-clinical.
- Link each new post to quiz, temperament, subtype, relationship, or methodology pages.
- Verify TypeScript, production build, and local page responses.

---

### Task 1: Add Blog Articles

**Files:**
- Modify: `lib/seo-content.ts`

- [ ] Add articles for `choleric-vs-sanguine`, `melancholic-vs-phlegmatic`, `choleric-vs-melancholic`, `sanguine-vs-phlegmatic`, `temperament-conflict-style`, `temperament-communication-style`, `temperament-strengths-and-weaknesses`, and `how-to-read-temperament-test-results`.
- [ ] Use existing image assets.
- [ ] Add FAQs and related links for each.

### Task 2: Strengthen Internal Links

**Files:**
- Modify: `lib/seo-content.ts`

- [ ] Add comparison posts to `coreGuideLinks`.
- [ ] Add conflict and communication posts to `relationshipGuideLinks`.
- [ ] Add result-reading post to `methodologyGuideLinks`.

### Task 3: Verify

- [ ] Run `pnpm exec tsc --noEmit`.
- [ ] Run `node node_modules/next/dist/bin/next build`.
- [ ] Start `next start` locally.
- [ ] Curl all eight new blog routes and confirm `200 text/html`.
- [ ] Confirm sitemap contains all eight routes.
- [ ] Commit and push.
