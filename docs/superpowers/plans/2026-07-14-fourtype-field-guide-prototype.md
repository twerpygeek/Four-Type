# FourType Field Guide Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce the approved research foundation and a reviewable 14-page FourType Field Guide prototype in designed PDF and responsive EPUB formats.

**Architecture:** Keep book production isolated under `book/`, with structured JSON for research and page content, focused Python modules for validation and rendering, and the existing FourType character assets as canonical brand references. ReportLab creates the fixed 7 x 10 inch PDF; a small standards-based EPUB writer creates the reflowable EPUB from the same validated page model so both formats remain editorially equivalent.

**Tech Stack:** Python 3, ReportLab, Pillow, pypdf, standard-library `zipfile`, JSON, XHTML/CSS, `unittest`, `pdftoppm`, existing FourType PNG assets, and OpenAI image generation for one new interaction scene.

## Global Constraints

- The PDF target is 7 x 10 inches in portrait orientation.
- The final book target is approximately 150 designed PDF pages; this plan produces the 14-page visual checkpoint only.
- The reader takes the FourType test before using the book.
- The book is universal and secular.
- All 16 final profiles receive four pages; this prototype implements the Choleric-Phlegmatic profile as the approved template.
- Existing FourType character assets establish appearance, clothing, colors, and personality.
- Every PDF page must contain a meaningful visual anchor without compromising readability.
- Long reading sections use light backgrounds and strong contrast.
- The EPUB is reflowable, semantic, responsive, and accessible; it is not a fixed-layout copy of the PDF.
- No copied source wording, distinctive source diagrams, anecdotes, or source-specific quizzes may appear.
- No direct temperament-to-neurotransmitter mappings, unsupported accuracy figures, clinical claims, hiring claims, or public-figure typings presented as fact.
- Use plain, warm, specific language and qualify behavioral patterns with words such as `may`, `often`, and `tend`.
- Do not modify or replace `public/four-temperaments-guidebook.pdf` during the prototype milestone.

---

## File Structure

Create the following focused production tree:

```text
book/
  README.md                         Build and editorial workflow
  __init__.py
  build.py                          Single CLI entry point
  assets/
    scenes/
      commander-guardian-feedback.png
  content/
    prototype.json                 Fourteen ordered page records
  dist/
    fourtype-field-guide-prototype.pdf
    fourtype-field-guide-prototype.epub
  lib/
    __init__.py
    content.py                     JSON model and content validation
    epub.py                        EPUB package renderer
    pdf.py                         ReportLab page renderer
    research.py                    Source and claim validation
    theme.py                       Shared dimensions, colors, and typography
  qa/
    prototype-contact-sheet.png
    prototype-report.md
    rendered/                      PDF page PNGs, ignored by git
  research/
    claims.json                    Prototype claims and support level
    sources.json                   Source ledger
  tests/
    test_build.py
    test_content.py
    test_epub.py
    test_pdf.py
    test_research.py
```

Modify `.gitignore` only to ignore `book/qa/rendered/` and Python cache directories. Keep the reviewable PDF, EPUB, contact sheet, and QA report tracked.

---

### Task 1: Establish the Book Package and Build Contract

**Files:**
- Create: `book/__init__.py`
- Create: `book/lib/__init__.py`
- Create: `book/README.md`
- Create: `book/build.py`
- Create: `book/tests/test_build.py`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: Existing repository root and Python runtime.
- Produces: `book.build.main(argv: list[str] | None = None) -> int`, the stable entry point used by all later tasks.

- [ ] **Step 1: Write the failing build-contract test**

```python
# book/tests/test_build.py
import unittest
from pathlib import Path
from tempfile import TemporaryDirectory

from book.build import main


class BuildContractTests(unittest.TestCase):
    def test_validate_command_accepts_repository_skeleton(self) -> None:
        with TemporaryDirectory() as temp_dir:
            output_dir = Path(temp_dir)
            exit_code = main(["validate", "--output-dir", str(output_dir)])
            self.assertEqual(exit_code, 0)


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run the test and verify the package does not exist yet**

Run:

```bash
PYTHONPATH=. /Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 -m unittest book.tests.test_build -v
```

Expected: `ModuleNotFoundError: No module named 'book.build'`.

- [ ] **Step 3: Implement the minimal CLI contract**

```python
# book/build.py
from __future__ import annotations

import argparse
from pathlib import Path


def parser() -> argparse.ArgumentParser:
    command_parser = argparse.ArgumentParser(description="Build the FourType Field Guide")
    subcommands = command_parser.add_subparsers(dest="command", required=True)
    for name in ("validate", "pdf", "epub", "all"):
        subcommand = subcommands.add_parser(name)
        subcommand.add_argument("--output-dir", type=Path, default=Path("book/dist"))
    return command_parser


def main(argv: list[str] | None = None) -> int:
    arguments = parser().parse_args(argv)
    arguments.output_dir.mkdir(parents=True, exist_ok=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
```

Create empty `book/__init__.py` and `book/lib/__init__.py`. Add this exact section to `.gitignore`:

```gitignore
# FourType book build intermediates
book/qa/rendered/
**/__pycache__/
*.pyc
```

- [ ] **Step 4: Document the reproducible commands**

`book/README.md` must name the approved spec, state that `public/four-temperaments-guidebook.pdf` remains untouched, identify the local source PDFs, and include these commands:

```bash
PYTHONPATH=. /Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 -m unittest discover -s book/tests -v
PYTHONPATH=. /Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 -m book.build validate
PYTHONPATH=. /Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 -m book.build all
```

- [ ] **Step 5: Run the test and commit**

Expected: one passing test.

```bash
git add .gitignore book/__init__.py book/lib/__init__.py book/build.py book/README.md book/tests/test_build.py
git commit -m "Add FourType book build contract"
```

---

### Task 2: Build the Research Ledger and Claim Gate

**Files:**
- Create: `book/research/sources.json`
- Create: `book/research/claims.json`
- Create: `book/lib/research.py`
- Create: `book/tests/test_research.py`

**Interfaces:**
- Consumes: JSON arrays from `book/research/sources.json` and `book/research/claims.json`.
- Produces: `load_research(root: Path) -> tuple[list[Source], list[Claim]]` and `validate_research(sources: list[Source], claims: list[Claim]) -> list[str]`.

- [ ] **Step 1: Write failing tests for source traceability and prohibited claims**

```python
# book/tests/test_research.py
import unittest
from pathlib import Path

from book.lib.research import load_research, validate_research


class ResearchTests(unittest.TestCase):
    def test_every_claim_has_a_known_source(self) -> None:
        sources, claims = load_research(Path("book/research"))
        self.assertEqual(validate_research(sources, claims), [])

    def test_ledger_includes_uploaded_books_and_current_research(self) -> None:
        sources, _ = load_research(Path("book/research"))
        source_ids = {source.id for source in sources}
        self.assertTrue({"erikson-2019", "cain-2012", "gunderson-2021"}.issubset(source_ids))
        self.assertTrue({"apa-temperament", "roberts-mroczek-2008", "deyoung-2013"}.issubset(source_ids))


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run the tests and verify the research module is missing**

Expected: import failure for `book.lib.research`.

- [ ] **Step 3: Implement typed source and claim loading**

```python
# book/lib/research.py
from __future__ import annotations

from dataclasses import dataclass
import json
from pathlib import Path


@dataclass(frozen=True)
class Source:
    id: str
    title: str
    creator: str
    year: int
    kind: str
    locator: str
    use: str


@dataclass(frozen=True)
class Claim:
    id: str
    text: str
    support: str
    source_ids: tuple[str, ...]
    allowed: bool


def load_research(root: Path) -> tuple[list[Source], list[Claim]]:
    sources_data = json.loads((root / "sources.json").read_text(encoding="utf-8"))
    claims_data = json.loads((root / "claims.json").read_text(encoding="utf-8"))
    sources = [Source(**item) for item in sources_data]
    claims = [Claim(source_ids=tuple(item["source_ids"]), **{key: value for key, value in item.items() if key != "source_ids"}) for item in claims_data]
    return sources, claims


def validate_research(sources: list[Source], claims: list[Claim]) -> list[str]:
    errors: list[str] = []
    source_ids = {source.id for source in sources}
    if len(source_ids) != len(sources):
        errors.append("source ids must be unique")
    for claim in claims:
        missing = sorted(set(claim.source_ids) - source_ids)
        if missing:
            errors.append(f"{claim.id}: unknown sources {', '.join(missing)}")
        if claim.allowed and not claim.source_ids:
            errors.append(f"{claim.id}: allowed claim lacks a source")
        if claim.support not in {"historical", "observational", "research", "limitation"}:
            errors.append(f"{claim.id}: invalid support level {claim.support}")
    return errors
```

- [ ] **Step 4: Populate the initial source ledger**

`sources.json` must contain exact records for:

- Thomas Erikson, *Surrounded by Idiots*, local PDF, used only to identify communication topics and practical scenarios.
- Susan Cain, *Quiet*, local PDF, used for themes around introversion, cultural expectations, work, and communication.
- Glenn Gunderson, *I Said This, You Heard That* study guide, local PDF, used only as an example of type-aware phrasing and exercises; exclude its religious framing from this secular book.
- The current 12-page FourType guide, used as an internal baseline to audit rather than an authority.
- APA Dictionary of Psychology temperament entry: `https://dictionary.apa.org/temperament`.
- Roberts and Mroczek, “Personality Trait Change in Adulthood”: `https://pmc.ncbi.nlm.nih.gov/articles/PMC2743415/`.
- DeYoung, “The neuromodulator of exploration”: `https://pmc.ncbi.nlm.nih.gov/articles/PMC3827581/`.
- Graham et al., “Trajectories of Big Five Personality Traits”: `https://pmc.ncbi.nlm.nih.gov/articles/PMC7869960/`.

Every record must use a stable ID, full title, creator, year, `kind` from `book`, `study-guide`, `internal`, `reference`, or `paper`, exact local path or URL, and a one-sentence permitted use.

`claims.json` must include at least these prototype claims and classifications:

```json
[
  {
    "id": "temperament-foundation",
    "text": "Temperament describes relatively early-appearing patterns such as energy, emotional responsiveness, response tempo, and willingness to explore.",
    "support": "research",
    "source_ids": ["apa-temperament"],
    "allowed": true
  },
  {
    "id": "personality-can-change",
    "text": "Personality patterns can remain recognizable while still changing across adulthood.",
    "support": "research",
    "source_ids": ["roberts-mroczek-2008", "graham-2020"],
    "allowed": true
  },
  {
    "id": "no-single-neurochemical-type",
    "text": "No temperament should be presented as the product of one neurotransmitter or hormone.",
    "support": "limitation",
    "source_ids": ["deyoung-2013"],
    "allowed": true
  },
  {
    "id": "fourtype-is-clinical",
    "text": "FourType results diagnose mental health or predict job suitability.",
    "support": "limitation",
    "source_ids": [],
    "allowed": false
  }
]
```

- [ ] **Step 5: Run research tests and commit**

Expected: all research tests pass and no source validation errors are printed.

```bash
git add book/research book/lib/research.py book/tests/test_research.py
git commit -m "Add FourType book research ledger"
```

---

### Task 3: Define and Write the Fourteen-Page Prototype

**Files:**
- Create: `book/content/prototype.json`
- Create: `book/lib/content.py`
- Create: `book/tests/test_content.py`

**Interfaces:**
- Consumes: Ordered page records in `book/content/prototype.json`.
- Produces: `load_pages(path: Path) -> list[Page]` and `validate_pages(pages: list[Page]) -> list[str]` for both renderers.

- [ ] **Step 1: Write failing tests for the approved checkpoint structure**

```python
# book/tests/test_content.py
import unittest
from pathlib import Path

from book.lib.content import load_pages, validate_pages


class PrototypeContentTests(unittest.TestCase):
    def setUp(self) -> None:
        self.pages = load_pages(Path("book/content/prototype.json"))

    def test_prototype_has_fourteen_ordered_pages(self) -> None:
        self.assertEqual(len(self.pages), 14)
        self.assertEqual([page.number for page in self.pages], list(range(1, 15)))

    def test_required_checkpoint_pages_are_present(self) -> None:
        page_ids = {page.id for page in self.pages}
        self.assertTrue({
            "cover", "take-the-test", "commander-opening",
            "executive-inner-pattern", "executive-work",
            "executive-relationships", "executive-growth",
            "feedback-lesson", "feedback-scripts", "sources"
        }.issubset(page_ids))

    def test_copy_passes_safety_and_length_rules(self) -> None:
        self.assertEqual(validate_pages(self.pages), [])


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Implement the shared page model and copy audit**

```python
# book/lib/content.py
from __future__ import annotations

from dataclasses import dataclass
import json
from pathlib import Path


PROHIBITED_PHRASES = (
    "98% accurate",
    "dopamine type",
    "testosterone type",
    "estrogen type",
    "serotonin type",
    "predicts job performance",
    "diagnoses",
)


@dataclass(frozen=True)
class Block:
    kind: str
    label: str
    text: str


@dataclass(frozen=True)
class Page:
    number: int
    id: str
    kind: str
    kicker: str
    title: str
    standfirst: str
    character: str | None
    accent: str
    blocks: tuple[Block, ...]
    source_claim_ids: tuple[str, ...]


def load_pages(path: Path) -> list[Page]:
    data = json.loads(path.read_text(encoding="utf-8"))
    return [Page(
        blocks=tuple(Block(**block) for block in item["blocks"]),
        source_claim_ids=tuple(item.get("source_claim_ids", [])),
        **{key: value for key, value in item.items() if key not in {"blocks", "source_claim_ids"}},
    ) for item in data]


def validate_pages(pages: list[Page]) -> list[str]:
    errors: list[str] = []
    if len({page.id for page in pages}) != len(pages):
        errors.append("page ids must be unique")
    for page in pages:
        text = " ".join([page.kicker, page.title, page.standfirst, *(block.text for block in page.blocks)])
        lowered = text.lower()
        if len(text.split()) > 360:
            errors.append(f"{page.id}: exceeds 360 words")
        for phrase in PROHIBITED_PHRASES:
            if phrase in lowered:
                errors.append(f"{page.id}: prohibited phrase {phrase}")
        if page.kind not in {"cover", "front", "core", "profile", "lesson", "reference"}:
            errors.append(f"{page.id}: unsupported page kind {page.kind}")
        if page.accent not in {"gold", "red", "amber", "blue", "green", "neutral"}:
            errors.append(f"{page.id}: unsupported accent {page.accent}")
    return errors
```

- [ ] **Step 3: Write the original prototype manuscript**

Create fourteen page records in this exact order:

1. `cover`: *Know Your True Nature: The FourType Field Guide*.
2. `title-and-promise`: copyright, educational-use note, and the promise “Keep your nature. Widen your choices.”
3. `take-the-test`: direct the reader to `fourtype.com/quiz` and explain primary and secondary scores.
4. `how-to-read`: explain pattern, context, maturity, and choice without presenting type as destiny.
5. `commander-opening`: character-led Commander opening with the tension between useful decisiveness and costly control.
6. `commander-attention`: what Commanders tend to notice, miss, and protect.
7. `commander-gift-cost`: a paired diagram showing how speed, ownership, candor, and standards can help or hurt.
8. `executive-inner-pattern`: Choleric-Phlegmatic inner pattern.
9. `executive-work`: contribution, pace, delegation, meetings, and one script for requesting autonomy.
10. `executive-relationships`: care, emotional reserve, conflict, and a repair prompt.
11. `executive-growth`: early stress signs, withdrawal/control loop, recovery, and a seven-day praise practice.
12. `feedback-lesson`: Commander and Guardian scene showing why intent and impact can differ.
13. `feedback-scripts`: four versions of one feedback message, adapted for each core temperament without manipulation.
14. `sources`: prototype source note, model limitations, and link to the full online research note.

Use the existing `lib/subtypes.ts` only to preserve names and primary-secondary ordering. Do not copy its MBTI mappings, famous examples, rarity claims, harsh labels, or unsupported psychological assertions. Each page must stay below 360 words, include at least two concrete behavioral details, and contain one useful reflection, script, or action unless it is the cover.

The Commander opening should begin with this approved tonal reference, then continue in original prose:

```text
You often see the decision before other people have finished describing the problem. That can make you invaluable in a crisis. It can also make a normal conversation feel like a crisis when what the other person needed was time, not command.
```

- [ ] **Step 4: Run content and full research tests**

Expected: fourteen pages load, all required IDs exist, and the copy audit returns no errors.

```bash
PYTHONPATH=. /Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 -m unittest book.tests.test_content book.tests.test_research -v
```

- [ ] **Step 5: Perform a humanization and originality pass**

Read all fourteen records aloud. Revise repeated sentence shapes, abstract praise, rule-of-three habits, promotional claims, and passages that sound like deterministic test output. Search the uploaded PDFs only to compare topic coverage; do not paste source prose into the manuscript.

Run:

```bash
rg -n -i "superpower|kryptonite|always|never|destined|scientifically proven|famous|MBTI|enneagram" book/content/prototype.json
```

Expected: no unqualified personality claims; any `always` or `never` occurs only inside ordinary instructions where it is literally intended.

- [ ] **Step 6: Commit the manuscript prototype**

```bash
git add book/content/prototype.json book/lib/content.py book/tests/test_content.py
git commit -m "Write FourType field guide prototype"
```

---

### Task 4: Establish the Visual System and New Interaction Scene

**Files:**
- Create: `book/lib/theme.py`
- Create: `book/assets/scenes/commander-guardian-feedback.png`
- Create: `book/tests/test_pdf.py`

**Interfaces:**
- Consumes: Canonical character PNGs from `public/images/characters/` and system Georgia fonts.
- Produces: Shared `BookTheme`, page dimensions, asset paths, and one original scene for the PDF and EPUB renderers.

- [ ] **Step 1: Write a failing visual-token test**

```python
# book/tests/test_pdf.py
import unittest
from pathlib import Path

from book.lib.theme import THEME


class ThemeTests(unittest.TestCase):
    def test_book_uses_approved_dimensions_and_assets(self) -> None:
        self.assertEqual((THEME.page_width, THEME.page_height), (504.0, 720.0))
        self.assertEqual(THEME.margin, 43.2)
        for path in THEME.character_paths.values():
            self.assertTrue(Path(path).is_file(), path)

    def test_body_contrast_is_readable(self) -> None:
        self.assertGreaterEqual(THEME.body_contrast_ratio, 7.0)


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Implement immutable theme tokens**

Create `book/lib/theme.py` with this complete implementation:

```python
from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from types import MappingProxyType
from typing import Mapping


def _rgb(hex_color: str) -> tuple[float, float, float]:
    value = hex_color.removeprefix("#")
    return tuple(int(value[index:index + 2], 16) / 255 for index in (0, 2, 4))


def _linear(channel: float) -> float:
    return channel / 12.92 if channel <= 0.04045 else ((channel + 0.055) / 1.055) ** 2.4


def contrast_ratio(first: str, second: str) -> float:
    luminances = []
    for color in (first, second):
        red, green, blue = (_linear(channel) for channel in _rgb(color))
        luminances.append(0.2126 * red + 0.7152 * green + 0.0722 * blue)
    lighter, darker = sorted(luminances, reverse=True)
    return (lighter + 0.05) / (darker + 0.05)


@dataclass(frozen=True)
class BookTheme:
    page_width: float
    page_height: float
    margin: float
    colors: Mapping[str, str]
    character_paths: Mapping[str, str]
    font_paths: Mapping[str, str]
    logo_path: str
    body_contrast_ratio: float


ROOT = Path(__file__).resolve().parents[2]
PUBLIC = ROOT / "public"
COLORS = MappingProxyType({
    "obsidian": "#111116",
    "parchment": "#F4EBDD",
    "ink": "#252329",
    "gold": "#C89B2C",
    "red": "#B83A36",
    "amber": "#D88A1D",
    "blue": "#356A9A",
    "green": "#4F7C58",
    "neutral": "#625D63",
})
CHARACTERS = MappingProxyType({
    "commander": str(PUBLIC / "images/characters/commander.png"),
    "bard": str(PUBLIC / "images/characters/bard.png"),
    "strategist": str(PUBLIC / "images/characters/strategist.png"),
    "guardian": str(PUBLIC / "images/characters/guardian.png"),
})
FONTS = MappingProxyType({
    "regular": "/System/Library/Fonts/Supplemental/Georgia.ttf",
    "bold": "/System/Library/Fonts/Supplemental/Georgia Bold.ttf",
    "italic": "/System/Library/Fonts/Supplemental/Georgia Italic.ttf",
})

THEME = BookTheme(
    page_width=504.0,
    page_height=720.0,
    margin=43.2,
    colors=COLORS,
    character_paths=CHARACTERS,
    font_paths=FONTS,
    logo_path=str(PUBLIC / "fourtype-logo.png"),
    body_contrast_ratio=contrast_ratio(COLORS["ink"], COLORS["parchment"]),
)
```

This implementation defines:

- `page_width=504.0`, `page_height=720.0`, and `margin=43.2` points.
- Foundation colors: obsidian `#111116`, parchment `#F4EBDD`, ink `#252329`, gold `#C89B2C`.
- Type colors: Commander `#B83A36`, Bard `#D88A1D`, Strategist `#356A9A`, Guardian `#4F7C58`.
- A `colors` mapping keyed by `obsidian`, `parchment`, `ink`, `gold`, `red`, `amber`, `blue`, `green`, and `neutral`.
- Character paths to the four canonical PNGs in `public/images/characters/`.
- Logo path `public/fourtype-logo.png`.
- Georgia regular, bold, and italic paths under `/System/Library/Fonts/Supplemental/`.
- A WCAG contrast helper and calculated `body_contrast_ratio` for ink on parchment.

- [ ] **Step 3: Generate the feedback interaction scene**

Use the Commander and Guardian canonical PNGs as image references and this exact art direction:

```text
Create an original editorial illustration for the FourType Field Guide using the supplied Commander and Guardian as strict character references. Preserve their faces, hair, clothing, proportions, clean black outlines, and muted red/green palettes. Scene: at a simple workplace table, the Commander in red has paused and is listening instead of pointing; the Guardian in green is calmly explaining a concern with one open hand. Both are respectful, neither is submissive. Warm parchment background, restrained gold details, clear 2D storybook line art, soft cel shading, generous negative space above and to the right for book typography. No text, no speech bubbles, no logo, no extra people, no photorealism. Landscape 3:2 composition, high resolution.
```

Save the returned bitmap as `book/assets/scenes/commander-guardian-feedback.png`. Inspect it at original resolution and reject it if either character has changed costume, duplicated limbs, illegible hands, embedded text, or a dark background that prevents print use.

- [ ] **Step 4: Run theme tests and commit**

Expected: dimensions, asset existence, and contrast tests pass.

```bash
git add book/lib/theme.py book/assets/scenes/commander-guardian-feedback.png book/tests/test_pdf.py
git commit -m "Define FourType book visual system"
```

---

### Task 5: Render the Fourteen-Page Designed PDF

**Files:**
- Create: `book/lib/pdf.py`
- Modify: `book/build.py`
- Modify: `book/tests/test_pdf.py`
- Create: `book/dist/fourtype-field-guide-prototype.pdf`

**Interfaces:**
- Consumes: `list[Page]`, `BookTheme`, character assets, and the feedback scene.
- Produces: `render_pdf(pages: list[Page], output_path: Path) -> Path`.

- [ ] **Step 1: Extend the PDF test before implementation**

```python
from tempfile import TemporaryDirectory
from pypdf import PdfReader

from book.lib.content import load_pages
from book.lib.pdf import render_pdf


class PdfRenderTests(unittest.TestCase):
    def test_rendered_pdf_has_fourteen_seven_by_ten_pages(self) -> None:
        pages = load_pages(Path("book/content/prototype.json"))
        with TemporaryDirectory() as temp_dir:
            path = render_pdf(pages, Path(temp_dir) / "prototype.pdf")
            reader = PdfReader(path)
            self.assertEqual(len(reader.pages), 14)
            for page in reader.pages:
                self.assertAlmostEqual(float(page.mediabox.width), 504.0, places=1)
                self.assertAlmostEqual(float(page.mediabox.height), 720.0, places=1)
```

- [ ] **Step 2: Run the PDF test and verify `book.lib.pdf` is missing**

Expected: import failure for `book.lib.pdf`.

- [ ] **Step 3: Implement reusable ReportLab components**

Implement `book/lib/pdf.py` with these complete focused functions:

```python
from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen.canvas import Canvas
from reportlab.platypus import Frame, KeepTogether, Paragraph, Spacer

from book.lib.content import Page
from book.lib.theme import THEME


@dataclass(frozen=True)
class Rect:
    x: float
    y: float
    width: float
    height: float


def register_fonts() -> None:
    pdfmetrics.registerFont(TTFont("FourTypeBody", THEME.font_paths["regular"]))
    pdfmetrics.registerFont(TTFont("FourTypeBodyBold", THEME.font_paths["bold"]))
    pdfmetrics.registerFont(TTFont("FourTypeBodyItalic", THEME.font_paths["italic"]))


def draw_image_contained(canvas: Canvas, path: str, box: Rect) -> None:
    image = ImageReader(path)
    source_width, source_height = image.getSize()
    scale = min(box.width / source_width, box.height / source_height)
    width = source_width * scale
    height = source_height * scale
    canvas.drawImage(
        image,
        box.x + (box.width - width) / 2,
        box.y + (box.height - height) / 2,
        width=width,
        height=height,
        mask="auto",
        preserveAspectRatio=True,
    )


def draw_cover(canvas: Canvas, page: Page) -> None:
    canvas.setFillColor(HexColor(THEME.colors["obsidian"]))
    canvas.rect(0, 0, THEME.page_width, THEME.page_height, stroke=0, fill=1)
    draw_image_contained(canvas, THEME.logo_path, Rect(58, 553, 388, 112))
    title_style = ParagraphStyle(
        "cover-title",
        fontName="FourTypeBodyBold",
        fontSize=24,
        leading=29,
        alignment=TA_CENTER,
        textColor=HexColor(THEME.colors["parchment"]),
    )
    title = Paragraph(page.title, title_style)
    title.wrapOn(canvas, 400, 80)
    title.drawOn(canvas, 52, 477)
    character_width = 105
    for index, character in enumerate(("commander", "bard", "strategist", "guardian")):
        draw_character(canvas, character, Rect(42 + index * 106, 110, character_width, 320))
    canvas.setStrokeColor(HexColor(THEME.colors["gold"]))
    canvas.setLineWidth(1.2)
    canvas.line(72, 82, 432, 82)
    canvas.setFillColor(HexColor(THEME.colors["gold"]))
    canvas.setFont("FourTypeBodyBold", 11)
    canvas.drawCentredString(252, 58, "A PRACTICAL GUIDE TO LIVING WITH YOUR TEMPERAMENT")


def draw_standard_header(canvas: Canvas, page: Page) -> float:
    accent = HexColor(THEME.colors[page.accent])
    canvas.setFillColor(accent)
    canvas.rect(0, THEME.page_height - 9, THEME.page_width, 9, stroke=0, fill=1)
    canvas.setFillColor(accent)
    canvas.setFont("FourTypeBodyBold", 8.5)
    canvas.drawString(THEME.margin, 672, page.kicker.upper())
    title_style = ParagraphStyle(
        "page-title",
        fontName="FourTypeBodyBold",
        fontSize=23,
        leading=27,
        textColor=HexColor(THEME.colors["ink"]),
        spaceAfter=7,
    )
    standfirst_style = ParagraphStyle(
        "standfirst",
        fontName="FourTypeBodyItalic",
        fontSize=11,
        leading=15,
        textColor=HexColor(THEME.colors["neutral"]),
    )
    title = Paragraph(page.title, title_style)
    _, title_height = title.wrap(416, 100)
    title.drawOn(canvas, THEME.margin, 650 - title_height)
    standfirst = Paragraph(page.standfirst, standfirst_style)
    _, standfirst_height = standfirst.wrap(416, 110)
    standfirst_y = 636 - title_height - standfirst_height
    standfirst.drawOn(canvas, THEME.margin, standfirst_y)
    return standfirst_y - 20


def draw_character(canvas: Canvas, character: str, box: Rect) -> None:
    draw_image_contained(canvas, THEME.character_paths[character], box)


def draw_blocks(canvas: Canvas, page: Page, frame: Rect) -> None:
    label_style = ParagraphStyle(
        "block-label",
        fontName="FourTypeBodyBold",
        fontSize=8.5,
        leading=11,
        textColor=HexColor(THEME.colors[page.accent]),
        spaceAfter=3,
    )
    body_style = ParagraphStyle(
        "body",
        fontName="FourTypeBody",
        fontSize=10.5,
        leading=14.5,
        textColor=HexColor(THEME.colors["ink"]),
        spaceAfter=10,
        alignment=TA_LEFT,
    )
    story = []
    for block in page.blocks:
        story.append(KeepTogether([
            Paragraph(block.label.upper(), label_style),
            Paragraph(block.text, body_style),
        ]))
        story.append(Spacer(1, 3))
    text_frame = Frame(frame.x, frame.y, frame.width, frame.height, showBoundary=0, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    text_frame.addFromList(story, canvas)
    if story:
        raise ValueError(f"{page.id}: content overflowed the PDF frame")


def draw_footer(canvas: Canvas, page_number: int) -> None:
    canvas.setStrokeColor(HexColor("#D8CCBA"))
    canvas.setLineWidth(0.5)
    canvas.line(THEME.margin, 34, THEME.page_width - THEME.margin, 34)
    canvas.setFillColor(HexColor(THEME.colors["neutral"]))
    canvas.setFont("FourTypeBody", 8)
    canvas.drawString(THEME.margin, 20, "FOURTYPE FIELD GUIDE")
    canvas.drawRightString(THEME.page_width - THEME.margin, 20, str(page_number))


def render_page(canvas: Canvas, page: Page) -> None:
    if page.kind == "cover":
        draw_cover(canvas, page)
        return
    canvas.setFillColor(HexColor(THEME.colors["parchment"]))
    canvas.rect(0, 0, THEME.page_width, THEME.page_height, stroke=0, fill=1)
    content_top = draw_standard_header(canvas, page)
    if page.id == "feedback-lesson":
        draw_image_contained(canvas, "book/assets/scenes/commander-guardian-feedback.png", Rect(238, 118, 230, 430))
        frame = Rect(THEME.margin, 62, 177, content_top - 62)
    elif page.character:
        draw_character(canvas, page.character, Rect(332, 82, 132, 468))
        frame = Rect(THEME.margin, 62, 264, content_top - 62)
    else:
        frame = Rect(THEME.margin, 62, THEME.page_width - 2 * THEME.margin, content_top - 62)
    draw_blocks(canvas, page, frame)
    draw_footer(canvas, page.number)


def render_pdf(pages: list[Page], output_path: Path) -> Path:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    register_fonts()
    canvas = Canvas(str(output_path), pagesize=(THEME.page_width, THEME.page_height), pageCompression=1)
    canvas.setTitle("Know Your True Nature: The FourType Field Guide Prototype")
    canvas.setAuthor("FourType")
    canvas.setSubject("A practical field guide to the four temperaments")
    for page in pages:
        render_page(canvas, page)
        canvas.showPage()
    canvas.save()
    return output_path
```

Extend this baseline with vector lines and rounded rectangles for diagrams, using theme colors rather than rasterized text. Add page numbers except on the cover.

Use these layout rules:

- Cover: obsidian background, FourType logo in the upper third, four characters along the lower half, gold title and subtitle, no body copy.
- Front pages: parchment background with a narrow gold navigation rule.
- Commander pages: red accent band occupying no more than 12% of the page area.
- Profile pages: paired red and green signals, with one dominant color per page to avoid visual noise.
- Feedback page: the generated scene occupies 42-48% of the page and text remains outside the artwork.
- Body type: 10.5-11.5 points with at least 14 points leading.
- Minimum text inset from trim: 43.2 points.

- [ ] **Step 4: Connect `book.build pdf` and `book.build all`**

Replace `book/build.py` with this implementation. It validates content and research before rendering, returns exit code `1` with explicit errors on failure, and uses lazy renderer imports so the PDF milestone can pass before the EPUB module exists.

```python
from __future__ import annotations

import argparse
from pathlib import Path

from book.lib.content import Page, load_pages, validate_pages
from book.lib.research import load_research, validate_research


ROOT = Path(__file__).resolve().parent
PDF_NAME = "fourtype-field-guide-prototype.pdf"
EPUB_NAME = "fourtype-field-guide-prototype.epub"


def parser() -> argparse.ArgumentParser:
    command_parser = argparse.ArgumentParser(description="Build the FourType Field Guide")
    subcommands = command_parser.add_subparsers(dest="command", required=True)
    for name in ("validate", "pdf", "epub", "all"):
        subcommand = subcommands.add_parser(name)
        subcommand.add_argument("--output-dir", type=Path, default=ROOT / "dist")
    return command_parser


def validated_inputs() -> tuple[list[Page], list[str]]:
    pages = load_pages(ROOT / "content/prototype.json")
    sources, claims = load_research(ROOT / "research")
    errors = validate_pages(pages) + validate_research(sources, claims)
    return pages, errors


def main(argv: list[str] | None = None) -> int:
    arguments = parser().parse_args(argv)
    pages, errors = validated_inputs()
    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1
    arguments.output_dir.mkdir(parents=True, exist_ok=True)
    if arguments.command in {"pdf", "all"}:
        from book.lib.pdf import render_pdf
        render_pdf(pages, arguments.output_dir / PDF_NAME)
    if arguments.command in {"epub", "all"}:
        from book.lib.epub import render_epub
        render_epub(pages, arguments.output_dir / EPUB_NAME)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
```

- [ ] **Step 5: Run tests and render the PDF**

Run:

```bash
PYTHONPATH=. /Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 -m unittest book.tests.test_pdf -v
PYTHONPATH=. /Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 -m book.build pdf
pdfinfo book/dist/fourtype-field-guide-prototype.pdf
```

Expected: tests pass; PDF metadata reports 14 pages sized 504 x 720 points.

- [ ] **Step 6: Commit the PDF renderer and artifact**

```bash
git add book/lib/pdf.py book/build.py book/tests/test_pdf.py book/dist/fourtype-field-guide-prototype.pdf
git commit -m "Render FourType book PDF prototype"
```

---

### Task 6: Render the Responsive EPUB Prototype

**Files:**
- Create: `book/lib/epub.py`
- Create: `book/tests/test_epub.py`
- Modify: `book/build.py`
- Create: `book/dist/fourtype-field-guide-prototype.epub`

**Interfaces:**
- Consumes: The same validated `list[Page]`, canonical images, and feedback scene used by the PDF.
- Produces: `render_epub(pages: list[Page], output_path: Path) -> Path`.

- [ ] **Step 1: Write failing EPUB package tests**

```python
# book/tests/test_epub.py
import unittest
from pathlib import Path
from tempfile import TemporaryDirectory
from zipfile import ZipFile

from book.lib.content import load_pages
from book.lib.epub import render_epub


class EpubRenderTests(unittest.TestCase):
    def test_epub_has_required_package_files_and_chapters(self) -> None:
        pages = load_pages(Path("book/content/prototype.json"))
        with TemporaryDirectory() as temp_dir:
            path = render_epub(pages, Path(temp_dir) / "prototype.epub")
            with ZipFile(path) as archive:
                names = set(archive.namelist())
                self.assertIn("mimetype", names)
                self.assertIn("META-INF/container.xml", names)
                self.assertIn("EPUB/package.opf", names)
                self.assertIn("EPUB/nav.xhtml", names)
                self.assertEqual(archive.read("mimetype"), b"application/epub+zip")
                chapters = [name for name in names if name.startswith("EPUB/text/")]
                self.assertEqual(len(chapters), 14)


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Implement the dependency-free EPUB writer**

Create `book/lib/epub.py` with this complete dependency-free implementation:

```python
from __future__ import annotations

from datetime import date
from html import escape
from pathlib import Path
from uuid import NAMESPACE_URL, uuid5
from zipfile import ZIP_DEFLATED, ZIP_STORED, ZipFile, ZipInfo

from book.lib.content import Page
from book.lib.theme import ROOT, THEME


BOOK_ID = str(uuid5(NAMESPACE_URL, "https://www.fourtype.com/books/field-guide"))
TITLE = "Know Your True Nature: The FourType Field Guide Prototype"
FEEDBACK_SCENE = ROOT / "book/assets/scenes/commander-guardian-feedback.png"
ALL_CHARACTERS = ROOT / "public/images/characters/all-characters.png"
ALT_TEXT = {
    "all-characters.png": "The Commander, Bard, Strategist, and Guardian, the four FourType archetypes.",
    "commander.png": "The Commander, FourType's red-clad Choleric character.",
    "bard.png": "The Bard, FourType's amber-clad Sanguine character.",
    "strategist.png": "The Strategist, FourType's blue-clad Melancholic character.",
    "guardian.png": "The Guardian, FourType's green-clad Phlegmatic character.",
    "commander-guardian-feedback.png": "The Commander pauses to listen while the Guardian calmly explains a concern.",
}


CONTAINER_XML = """<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles><rootfile full-path="EPUB/package.opf" media-type="application/oebps-package+xml"/></rootfiles>
</container>
"""

BOOK_CSS = """
:root {
  --obsidian: #111116;
  --parchment: #f4ebdd;
  --ink: #252329;
  --gold: #9d7418;
  --red: #9f302d;
  --amber: #a9620e;
  --blue: #356a9a;
  --green: #426c4b;
}
html { color: var(--ink); background: #fff; }
body { margin: 0 auto; padding: 1.25rem; max-width: 42rem; font: 1rem/1.62 Georgia, "Times New Roman", serif; }
article { break-before: page; }
header { border-top: .35rem solid var(--accent, var(--gold)); padding-top: 1rem; margin-bottom: 1.25rem; }
.kicker, .label { font: 700 .78rem/1.3 system-ui, sans-serif; text-transform: uppercase; color: var(--accent, var(--gold)); }
h1 { margin: .35rem 0 .75rem; font-size: 2rem; line-height: 1.12; }
.standfirst { font-style: italic; color: #5d5960; }
section, aside { margin: 1.25rem 0; }
aside { padding: .9rem 1rem; border-left: .3rem solid var(--accent, var(--gold)); background: var(--parchment); }
img { display: block; width: auto; max-width: 100%; max-height: 32rem; margin: 1.25rem auto; object-fit: contain; }
ul { padding-left: 1.25rem; }
a { color: #714f00; text-decoration-thickness: .1em; text-underline-offset: .15em; }
a:focus-visible { outline: .2rem solid var(--blue); outline-offset: .2rem; }
.red { --accent: var(--red); } .amber { --accent: var(--amber); }
.blue { --accent: var(--blue); } .green { --accent: var(--green); }
.gold, .neutral { --accent: var(--gold); }
"""


def image_for_page(page: Page) -> Path | None:
    if page.kind == "cover":
        return ALL_CHARACTERS
    if page.id == "feedback-lesson":
        return FEEDBACK_SCENE
    if page.character:
        return Path(THEME.character_paths[page.character])
    return None


def render_block(kind: str, label: str, text: str) -> str:
    tag = "aside" if kind in {"prompt", "script", "action"} else "section"
    if kind == "checklist":
        items = "".join(f"<li>{escape(item.strip())}</li>" for item in text.split("|") if item.strip())
        body = f"<ul>{items}</ul>"
    else:
        body = f"<p>{escape(text)}</p>"
    return f'<{tag} class="{escape(kind)}"><p class="label">{escape(label)}</p>{body}</{tag}>'


def chapter_xhtml(page: Page, image_name: str | None) -> str:
    image_markup = ""
    if image_name:
        image_markup = f'<img src="../images/{escape(image_name)}" alt="{escape(ALT_TEXT[image_name])}"/>'
    blocks = "".join(render_block(block.kind, block.label, block.text) for block in page.blocks)
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head><meta charset="utf-8"/><title>{escape(page.title)}</title><link rel="stylesheet" href="../styles/book.css"/></head>
<body><article class="{escape(page.accent)}"><header><p class="kicker">{escape(page.kicker)}</p><h1>{escape(page.title)}</h1><p class="standfirst">{escape(page.standfirst)}</p></header>{image_markup}{blocks}</article></body>
</html>'''


def nav_xhtml(pages: list[Page], chapter_names: list[str]) -> str:
    links = "".join(
        f'<li><a href="text/{name}">{escape(page.title)}</a></li>'
        for page, name in zip(pages, chapter_names, strict=True)
    )
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="en">
<head><meta charset="utf-8"/><title>Contents</title><link rel="stylesheet" href="styles/book.css"/></head>
<body><nav epub:type="toc" id="toc"><h1>Contents</h1><ol>{links}</ol></nav></body>
</html>'''


def package_opf(chapter_names: list[str], image_names: list[str]) -> str:
    chapter_items = "".join(
        f'<item id="chapter-{index:03d}" href="text/{name}" media-type="application/xhtml+xml"/>'
        for index, name in enumerate(chapter_names, start=1)
    )
    spine_items = "".join(f'<itemref idref="chapter-{index:03d}"/>' for index in range(1, len(chapter_names) + 1))
    image_parts = []
    for index, name in enumerate(image_names, start=1):
        properties = ' properties="cover-image"' if name == "all-characters.png" else ""
        image_parts.append(f'<item id="image-{index:03d}" href="images/{name}" media-type="image/png"{properties}/>')
    image_items = "".join(image_parts)
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="book-id" xml:lang="en">
<metadata xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:identifier id="book-id">urn:uuid:{BOOK_ID}</dc:identifier><dc:title>{escape(TITLE)}</dc:title><dc:creator>FourType</dc:creator><dc:language>en</dc:language><dc:date>{date.today().isoformat()}</dc:date><meta property="dcterms:modified">{date.today().isoformat()}T00:00:00Z</meta></metadata>
<manifest><item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/><item id="css" href="styles/book.css" media-type="text/css"/>{chapter_items}{image_items}</manifest>
<spine>{spine_items}</spine>
</package>'''


def render_epub(pages: list[Page], output_path: Path) -> Path:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    chapter_names = [f"{page.number:03d}-{page.id}.xhtml" for page in pages]
    page_images = [image_for_page(page) for page in pages]
    unique_images = {path.name: path for path in page_images if path is not None}
    mimetype = ZipInfo("mimetype")
    mimetype.compress_type = ZIP_STORED
    with ZipFile(output_path, "w") as archive:
        archive.writestr(mimetype, "application/epub+zip")
        archive.writestr("META-INF/container.xml", CONTAINER_XML, compress_type=ZIP_DEFLATED)
        archive.writestr("EPUB/styles/book.css", BOOK_CSS, compress_type=ZIP_DEFLATED)
        archive.writestr("EPUB/nav.xhtml", nav_xhtml(pages, chapter_names), compress_type=ZIP_DEFLATED)
        archive.writestr("EPUB/package.opf", package_opf(chapter_names, sorted(unique_images)), compress_type=ZIP_DEFLATED)
        for page, chapter_name, image_path in zip(pages, chapter_names, page_images, strict=True):
            archive.writestr(
                f"EPUB/text/{chapter_name}",
                chapter_xhtml(page, image_path.name if image_path else None),
                compress_type=ZIP_DEFLATED,
            )
        for image_name, image_path in sorted(unique_images.items()):
            archive.writestr(f"EPUB/images/{image_name}", image_path.read_bytes(), compress_type=ZIP_DEFLATED)
    return output_path
```

The result uses semantic XHTML, a navigable table of contents, specific image alt text, responsive dimensions, visible focus styles, and no rasterized body copy.

- [ ] **Step 3: Connect EPUB commands and run the tests**

Run:

```bash
PYTHONPATH=. /Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 -m unittest book.tests.test_epub -v
PYTHONPATH=. /Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 -m book.build epub
unzip -t book/dist/fourtype-field-guide-prototype.epub
```

Expected: all tests pass and `unzip` reports no errors.

- [ ] **Step 4: Commit the EPUB renderer and artifact**

```bash
git add book/lib/epub.py book/build.py book/tests/test_epub.py book/dist/fourtype-field-guide-prototype.epub
git commit -m "Render FourType book EPUB prototype"
```

---

### Task 7: Render, Inspect, and Document the Visual Checkpoint

**Files:**
- Create: `book/qa/prototype-contact-sheet.png`
- Create: `book/qa/prototype-report.md`
- Modify: `book/tests/test_build.py`

**Interfaces:**
- Consumes: Final prototype PDF and EPUB.
- Produces: A visual contact sheet, verification report, and an approval-ready checkpoint package.

- [ ] **Step 1: Add an end-to-end build test**

Extend `book/tests/test_build.py`:

```python
def test_all_command_writes_both_formats(self) -> None:
    with TemporaryDirectory() as temp_dir:
        output_dir = Path(temp_dir)
        self.assertEqual(main(["all", "--output-dir", str(output_dir)]), 0)
        self.assertTrue((output_dir / "fourtype-field-guide-prototype.pdf").is_file())
        self.assertTrue((output_dir / "fourtype-field-guide-prototype.epub").is_file())
```

- [ ] **Step 2: Run the complete automated suite**

```bash
PYTHONPATH=. /Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 -m unittest discover -s book/tests -v
pnpm test
pnpm lint
```

Expected: all book tests and existing site tests pass; lint exits successfully.

- [ ] **Step 3: Build both formats from a clean output directory**

Remove only the two generated prototype files, then rebuild:

```bash
rm -f book/dist/fourtype-field-guide-prototype.pdf book/dist/fourtype-field-guide-prototype.epub
PYTHONPATH=. /Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 -m book.build all
```

Expected: both files are recreated and non-empty.

- [ ] **Step 4: Render every PDF page to PNG**

```bash
mkdir -p book/qa/rendered
/Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/override/pdftoppm -png -r 150 book/dist/fourtype-field-guide-prototype.pdf book/qa/rendered/page
```

Expected: fourteen page PNGs.

- [ ] **Step 5: Create and inspect the contact sheet**

Use Pillow to arrange all fourteen rendered pages in a 4-column contact sheet with 24-pixel gutters and a neutral gray background. Save it as `book/qa/prototype-contact-sheet.png`. Inspect the contact sheet and pages 1, 5, 8-13 individually at original resolution.

Reject and revise the prototype if any of these are present:

- Clipped or overlapping text
- Body type too small to read at 100% PDF size
- Character distortion or incorrect aspect ratio
- A dark, gold-only visual monotony across successive pages
- A spread with no visual anchor
- Inconsistent margins or page numbers
- Rasterized body text
- Commander and Guardian scene defects
- EPUB chapter images without useful alt text

- [ ] **Step 6: Write the QA report**

`book/qa/prototype-report.md` must record:

- Build date and commit
- PDF page count and dimensions
- EPUB archive verification result
- Automated test results
- Pages inspected individually
- Accessibility checks
- Source-ledger validation result
- Any deliberate differences between PDF and EPUB
- A final checkpoint status of `READY FOR DESIGN REVIEW` or `REVISION REQUIRED`

- [ ] **Step 7: Commit the verified checkpoint**

```bash
git add book/qa/prototype-contact-sheet.png book/qa/prototype-report.md book/tests/test_build.py book/dist
git commit -m "Verify FourType book visual prototype"
```

---

## Phase-One Completion Gate

Do not begin the remaining 136 designed pages until the user has reviewed:

- `book/dist/fourtype-field-guide-prototype.pdf`
- `book/dist/fourtype-field-guide-prototype.epub`
- `book/qa/prototype-contact-sheet.png`
- `book/qa/prototype-report.md`

After approval, create separate implementation plans for:

1. Full research and manuscript production.
2. Complete illustration and diagram asset production.
3. Final 150-page PDF and EPUB assembly and validation.
4. FourType direct-sale, delivery, and post-quiz conversion flow.
