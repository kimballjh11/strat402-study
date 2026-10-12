# STRAT 402 · Midterm 1 Study Site

An interactive study site for Prof. Ben Lewis's STRAT 402 (Economics of Strategy), Fall 2026, Midterm 1 (Sessions 1–12). It covers 11 modules, each with 13 screens (why → intuition → terms → math → worked examples → interactives → check → apply → traps → explain-it-back → deeper → mastery check → summary). It also has:

- 300+ sourced multiple-choice questions
- 41 randomized calculation generators with step-by-step solutions
- Retakes of Comprehension Quizzes 1, 3, 4 and 5, verbatim and with the professor's explanations
- Spaced-repetition flashcards
- A timed 30 MC + 6 short-answer practice exam and a diagnostic
- A formula sheet with drills, an Excel Lab, a mistakes notebook, a study plan, and a per-learning-objective tracker

**Source rules.** Each fact carries a source tag (for example `S08 slides p.12` or `CQ4 Q3`). Anything that isn't from the course files is labeled **General econ (not from course materials)**. Every number is reproduced by code and checked by tests.

Course materials are shared here only with classmates who already have access to them, with the professor's permission.

## Run it

```bash
npm install
npm run dev          # http://localhost:5173
```

**No server needed:** open `dist-single/strat402.html` directly in a browser. It's one self-contained file (about 2.7 MB) that works offline.

## Build and test

```bash
npm run build        # type-check, then dist/ (multi-file site) and dist-single/strat402.html
npm test             # 237 unit tests: golden numbers, generators, content integrity, KaTeX, coverage gate, fidelity audit
npm run e2e          # build + Playwright: every module/screen/widget, practice exam, flashcards,
                     # quiz retakes, export/import, axe accessibility (light + dark) at 1280px and 375px
```

What the unit tests check:

- **Golden tests** reproduce the posted workbook answers to 6 decimals, including the TV/Redstone regressions, the Allegiant HHIs and the S06 DuPont/Guest-Tek costs.
- **Coverage gate.** `npm test` fails if any learning objective drops below 3 MCQs, or if a quantitative LO has no generator. It also regenerates `content/coverage-report.md`.
- **Fidelity audit.** The audit test samples 40 cited claims (seed 402) and checks their numbers against the extracted source text. It is skipped when `work/` is absent.

## Deploy to GitHub Pages

The site is fully static. It uses hash routing (`#/learn/S08`) and `base: './'`, so it works from any subpath.

**Option A: GitHub Actions** (already set up in `.github/workflows/pages.yml`)

1. Push the repo to GitHub.
2. In the repo, go to **Settings → Pages → Source** and choose **GitHub Actions**.
3. Every push to `main` builds and publishes `dist/`.

**Option B: by hand**

```bash
npm run build
npx gh-pages -d dist   # publishes dist/ to the gh-pages branch
```

Then set **Settings → Pages → Branch** to `gh-pages`.

`.gitignore` keeps the raw course files local: `inputs/`, `work/`, `Canvas Course/`, `*.pdf`, `*.xlsx`, `*.docx` and `*.mhtml`. The published site contains only the content in `src/` and `content/`.

## Add new materials (S11 slides, study guide, practice exam…)

1. Put the files in `inputs/later/`. Use `inputs/optional/` for video transcripts and `inputs/textbook/` for book chapters.
2. Run `npm run ingest`. This requires Python 3 with `pymupdf openpyxl beautifulsoup4 pillow`, plus LibreOffice for .pptx files. It extracts text, page images, workbook values and formulas, and quiz pages into `work/`. It then rebuilds `content/content-map.*` and the coverage report.
3. Update the matching module:
   - The lesson is in `src/content/sessions/sNN.ts`.
   - Its questions are in `src/content/questions/sNN.ts`.
   - Its calculation generators are in `src/content/generators/sNN.ts`.
   - Swap any **General econ** labels for real source tags where the new material covers them.
   - Add a golden test for any new worked numbers.
4. Run `npm test && npm run e2e`.

## Your progress

Progress is saved in your browser's localStorage (key `strat402-progress-v1`). It covers answers, mastery checks, flashcard boxes, mistakes, your streak and your exam date. Nothing is sent anywhere.

- **Back up or move to another device:** go to **Settings → Export progress**. This downloads a `.json` file. On the other device, use **Settings → Import progress**.
- **Start over:** go to **Settings → Reset** and type `RESET`.
- **Change the exam date:** this is also in **Settings**. It drives the countdown and the study plan.

## Reports

- `content/gap-report.md`: missing sources, discrepancies (the professor's version wins) and thin LOs
- `content/coverage-report.md`: questions and generators per learning objective
- `content/audit.md`: the 40-claim fidelity audit and the fixes it led to
- `content/content-map.md`: every LO mapped to its sources

## Layout

```
src/lib/          math (econ.ts mirrors the Excel ToolPak), answer checking, storage, spaced repetition, exam builder
src/components/   question cards, quiz runner, plots, rich text with citations
src/widgets/      21 interactive widgets (elasticity explorer, HHI calc, five forces, regression output…)
src/content/      sessions, questions, generators, flashcards, CQ data
scripts/          ingest + extraction (Python), screenshot checks (Node)
tests/unit, tests/e2e
```
