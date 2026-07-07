# FourType Growth Loops Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve FourType's viral sharing, self-learning value, and lead capture by making results feel more personal, share cards more compelling, emails more useful, and data content more discoverable.

**Architecture:** Add shared copy helpers for result insight, share prompts, and weekly growth challenges. Use those helpers in the result screen, share metadata, OG image, and optional lead email. Add data-oriented SEO blog posts through the existing `blogArticles` system.

**Tech Stack:** Next.js App Router, React, TypeScript, existing dynamic blog renderer, Resend REST API if configured through environment variables.

## Global Constraints

- No new dependencies.
- Do not change quiz scoring.
- Do not fabricate aggregate statistics.
- Email delivery must be optional and must not break lead capture when email credentials are missing.
- Keep language practical, non-clinical, and shareable.

---

### Task 1: Shared Result And Virality Copy

**Files:**
- Create: `lib/result-virality.ts`
- Modify: `lib/share-copy.ts`

- [ ] Add functions for one-sentence insight, misunderstood line, weekly challenge, share prompts, and OG hooks.
- [ ] Use the shared copy in share metadata.

### Task 2: Result Screen Learning And Sharing

**Files:**
- Modify: `components/ResultsScreen.tsx`

- [ ] Add "Your Pattern in One Sentence" and "What People Misread" cards.
- [ ] Add a weekly growth challenge card.
- [ ] Add "send this to someone who..." prompt buttons.

### Task 3: Optional Profile Email

**Files:**
- Create: `lib/email-delivery.ts`
- Modify: `app/api/leads/route.ts`
- Modify: `lib/quiz-i18n.ts`

- [ ] Send a useful profile email through Resend when `RESEND_API_KEY` and `FOURTYPE_EMAIL_FROM` are configured.
- [ ] Do not fail lead capture if email delivery is skipped or fails.
- [ ] Update success copy so users know to check email when configured.

### Task 4: Data-Oriented SEO Posts

**Files:**
- Modify: `lib/seo-content.ts`

- [ ] Add early data and rarity posts without fabricated statistics.
- [ ] Link posts to methodology, result-reading, subtype, and quiz pages.

### Task 5: Verify And Ship

- [ ] Run TypeScript.
- [ ] Run production build.
- [ ] Smoke-check changed routes and OG route.
- [ ] Commit, push, and poll production.
