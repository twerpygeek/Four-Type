# Know Thyself Subtype Insights Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add deeper self-knowledge insights to all 16 FourType subtype pages so users feel the result explains their hidden pattern, blind spot, relationships, work style, and growth move.

**Architecture:** Extend the subtype data model with a generated `knowThyself` insight object. Render the object on subtype pages as a distinct section with cards for core fear, misunderstanding, stress spiral, relationships, work, blind spot, growth move, love language, self-sabotage, and screenshot-friendly “this is you if” bullets.

**Tech Stack:** TypeScript data helpers, Next.js subtype route, existing Tailwind/lucide UI.

## Global Constraints

- Do not add dependencies.
- Keep insights educational and non-clinical.
- Cover all 16 subtype slugs.
- Avoid duplicating large copy in every subtype object when a generator can use existing subtype data.
- Preserve existing subtype routes and metadata.

---

### Task 1: Add Know Thyself Data Model and Generator

**Files:**
- Modify: `lib/subtypes.ts`

**Interfaces:**
- Produces: `KnowThyselfInsight` type and `getKnowThyselfInsight(subtype: Subtype): KnowThyselfInsight`.

- [ ] Add the type.
- [ ] Add temperament-specific insight libraries.
- [ ] Generate insight copy from subtype primary/secondary patterns.

### Task 2: Render Know Thyself Section

**Files:**
- Modify: `app/subtype/[slug]/SubtypePageClient.tsx`

**Interfaces:**
- Consumes: `getKnowThyselfInsight(subtype)`.
- Produces: a new premium section on every subtype page.

- [ ] Add import and compute insight.
- [ ] Render core fear, misunderstanding, stress spiral, relationship pattern, work pattern, blind spot, growth move, how to love them, self-sabotage, and this-is-you-if cards.

### Task 3: Verification

- [ ] Run `pnpm exec tsc --noEmit`.
- [ ] Run `node node_modules/next/dist/bin/next build`.
- [ ] Smoke-check one subtype page locally.
- [ ] Commit and push.
