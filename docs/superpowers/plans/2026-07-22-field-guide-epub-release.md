# Field Guide EPUB Release Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild a valid, semantic, reader-friendly EPUB release while leaving the approved PDF unchanged.

**Architecture:** Modify the Field Guide EPUB generator in the `field-guide-prototype` publication worktree, not the already-built archive. The generator will emit namespaced SVG XHTML, OPF SVG properties, semantic chapters and nested navigation, then create a separately validated delivery file in the private release location and Downloads.

**Tech Stack:** Python EPUB generator, XHTML/XML, CSS media queries, ZIP, EPUBCheck 5.3, Python XML/ZIP validation.

## Global Constraints

- Do not modify or regenerate the approved PDF.
- The final delivery filename is `FourType Field Guide Temperament Quest.epub`.
- EPUBCheck must report zero errors and zero warnings.
- Use semantic EPUB chapters instead of 144 print-page spine documents.
- Preserve reading order, content meaning, image alt text, links, and cover image.
- Use `cover.png` as the internal cover; hide printed folios in EPUB.

---

### Task 1: Trace and test the EPUB generator defect

**Files:**
- Modify: `.worktrees/field-guide-prototype/book/brand-publication/scripts/build_epub.py`
- Modify: `.worktrees/field-guide-prototype/book/brand-publication/tests/test_full_book.py`

- [ ] Add a failing validation test that builds the EPUB and asserts each inline SVG has `xmlns="http://www.w3.org/2000/svg"` and that manifest items for pages 10, 18, and 22 have `properties="svg"`.
- [ ] Run the focused test and confirm it fails against the current generated EPUB.
- [ ] Trace SVG emission and OPF manifest construction to the generator methods that assemble XHTML and `<item>` records.
- [ ] Commit the red test: `git commit -m "test: cover EPUB SVG packaging"`.

### Task 2: Repair SVG packaging and build semantic chapters

**Files:**
- Modify: `.worktrees/field-guide-prototype/book/brand-publication/scripts/build_epub.py`
- Modify: `.worktrees/field-guide-prototype/book/brand-publication/styles/epub.css` or the generator’s EPUB CSS output
- Test: `.worktrees/field-guide-prototype/book/brand-publication/tests/test_full_book.py`

- [ ] Emit all inline SVG roots as `<svg xmlns="http://www.w3.org/2000/svg" ...>`.
- [ ] Add `properties="svg"` for every generated XHTML resource containing SVG, including pages 10, 18, and 22.
- [ ] Group pages into the ten approved semantic chapters and make each group one spine document, retaining all content in order.
- [ ] Generate nested reader-facing navigation headings without duplicated category/first-child destinations.
- [ ] Use the existing packaged `cover.png` in a simple cover XHTML document and remove positioned cover reconstruction.
- [ ] Hide print folios with EPUB-specific CSS; stack wide tables as labelled cards under a narrow media query; add a printable-worksheet link beside reflection prompts.
- [ ] Run focused tests and commit: `git commit -m "feat: rebuild semantic Field Guide EPUB"`.

### Task 3: Validate and deliver the exact EPUB artifact

**Files:**
- Create: `.worktrees/field-guide-prototype/book/brand-publication/qa/epub-release-report.md`
- Create: `private/field-guide/edition-1/FourType Field Guide Temperament Quest.epub`
- Create: `/Users/iangoh/Downloads/FourType Field Guide Temperament Quest.epub`

- [ ] Rebuild to a temporary path and run ZIP integrity, XML parsing, manifest/resource resolution, duplicate-ID, alt-text, navigation, and mimetype checks.
- [ ] Run EPUBCheck 5.3; require zero errors and zero warnings before moving the temporary file to each final path.
- [ ] Verify the PDF checksum is unchanged.
- [ ] Open the exact copied EPUB in two independent readers where available and inspect the cover, SVG pages, a table, a worksheet prompt, and navigation.
- [ ] Record file size, SHA-256, parser results, EPUBCheck output, reader checks, and known limitations in the release report.
- [ ] Commit source/tests/report only: `git commit -m "docs: record validated Field Guide EPUB release"`.

## Self-Review

- Task 1 addresses the source of the EPUBCheck errors.
- Task 2 addresses semantic reading, responsive content, cover robustness, folios, worksheets, and navigation.
- Task 3 validates the exact delivery artifact and protects the approved PDF.
