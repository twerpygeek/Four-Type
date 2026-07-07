# Personality Test Bridge Cluster Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add SEO blog content that captures personality-test search intent and positions FourType temperament testing as the practical first step for self-understanding.

**Architecture:** Extend the existing dynamic `blogArticles` data in `lib/seo-content.ts`, then add the new pages to internal guide link clusters. The current Next.js app automatically renders blog routes, metadata, sitemap entries, markdown exports, and blog index cards from this source.

**Tech Stack:** Next.js App Router, TypeScript, static content data, existing BlogPostTemplate renderer.

## Global Constraints

- Use the existing `BlogArticle` schema only.
- No new dependencies.
- Do not attack MBTI, Big Five, or other personality tests.
- Position temperament as a practical first step for stress, communication, relationships, work, and growth.
- Keep medical, clinical, and hiring-screening claims out of the copy.

---

### Task 1: Add Personality-Test Bridge Articles

**Files:**
- Modify: `lib/seo-content.ts`

- [ ] Add five blog articles:
  - `personality-test-vs-temperament-test`
  - `free-personality-test-alternative`
  - `what-personality-test-should-i-take`
  - `personality-test-for-self-understanding`
  - `personality-test-for-relationships`
- [ ] Include SEO titles, descriptions, keywords, FAQ, and related links.
- [ ] Use existing image assets.

### Task 2: Add Internal Links

**Files:**
- Modify: `lib/seo-content.ts`

- [ ] Add new personality bridge pages to `coreGuideLinks`.
- [ ] Add relationship personality page to `relationshipGuideLinks`.
- [ ] Add comparison page to `methodologyGuideLinks`.

### Task 3: Verify And Ship

- [ ] Run `pnpm exec tsc --noEmit`.
- [ ] Run `node node_modules/next/dist/bin/next build`.
- [ ] Start `next start` locally.
- [ ] Curl all five new blog routes and confirm `200 text/html`.
- [ ] Confirm sitemap contains all five routes.
- [ ] Commit and push.
- [ ] Poll production for one route and sitemap inclusion.
