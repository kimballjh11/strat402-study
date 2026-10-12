# STRAT 401 gap report (Phase 1)

What the course materials do not cover, where sources conflict, and how the site handles each item. Everything here is also flagged in the site, either with a "General strategy (not from course materials)" label or with a citation note.

## Exam format: unconfirmed
- There is no syllabus, rubric, or practice exam in the export. Kimball confirmed there are none.
- His own study guide (`inputs/strat401/syllabus/`, dated Oct 7) quotes the syllabus:
  - The midterm covers Sessions 1–11, is taken in the Testing Center, and is worth 20%.
  - The final is described as multiple choice, free response, and case-based.
- Kimball's description of the format: multiple choice, short free response, and one long response with a little quantitative analysis. It is mostly application to new scenarios, not recall.
- **Handling:** Exam Mode mirrors that mix and is labeled as a practice format. It does not imitate the professor's format.

## Missing materials
| Item | Status | Handling |
|---|---|---|
| Session 4, 5, 10 slides | Never posted (Canvas says "No slides") | Built from the briefs and cases |
| Session 11 slides | Listed on Canvas, missing from the export | Built from the Costco case, Porter §7, and the cost/differentiation briefs. Drop the slides in `inputs/strat401/later/` and run `npm run ingest:401` |
| PROVA questions and feedback | None saved | Oral drills are written from the PROVA prompts and labeled "practice, not PROVA's questions" |
| Grades and feedback on Minto and VRIO | None | Kimball's work is used only to find weak spots |
| Benchmark slides behind the Aldi waterfall | Cited on S8 slide 3, not in the deck (slide 4 is a devotional) | Waterfall values shown as the professor's estimates |
| Netflix cost-of-revenue series (case Assignment 1) | Not in the case | The professor's fitted curves (S8 slides 39–40) serve as the model answer. Recomputing them from raw data is not possible |
| Share data for WB / Netflix / Paramount | Not provided | The HHI simulator takes the student's assumed shares, labeled as assumptions |
| Video content (S3, S6, S8 slides) | Video frames only | Ignored |

## Conflicts inside the materials
1. **VRIO verdict table.** The brief and the Canvas graphic say Y/Y/N is a temporary advantage and Y/Y/Y/N is an unexploited advantage. S6 slides 24 and 28 call Y/Y/N "competitive advantage" and Y/Y/Y/N "durable competitive advantage," with O = No on the lower rows. **Handling:** teach the brief's version and show the slide version labeled.
2. **Capital One + Discover HHI (S7 slide 2).** The slide shows Δ 233.99, using a 22.1 combined share. By formula, 2 × 13.1 × 9.1 = 238.42 (13.1 + 9.1 = 22.2). **Handling:** the calculator uses the formula. The slide value is shown with a note, and a golden test pins both numbers.
3. **Cola Wars volume.** The text says 12.5B cases at the 2004 peak and declining. Exhibit 1 shows 10,300M in 2000 and volume rising from 2020 to 2026E. The ad share is 22% in the text and 21.5% in Exhibit 2. **Handling:** both are cited and the inconsistency is noted. Nothing is "corrected."
4. **Botswana 1966.** The case says under 20 km of paved road and fewer than a dozen graduates. The slides say 12 km and 22 graduates. Both are shown with tags.
5. **Aldi item count.** The Porter paper says about 1,400. The Aldi case says 1,400–2,000. Both are tagged.
6. **"Five diagnoses."** The VRIO Brief's Exhibit 1 is titled "Five Diagnoses" but lists four cases, and the text skips Case D. **Handling:** "the five diagnoses" means the five verdicts in §5.
7. **Scale Brief Exhibit A2 rounding.** The exhibit prints 1.63× for k = 0.70. The exact value is 2^0.7 = 1.6245, which rounds to 1.62. Its 0.812× per-unit figure is correct. The golden test allows ±0.006.
8. **Notation vs. STRAT 402.**
   - HHI: 401 uses percentage points (30² + 30² + …). 402 multiplies decimal shares by 10,000.
   - Learning curves: 401 writes Y = aX^−b with b > 0. 402 fits ATC = aQ^b with b < 0.
   - Both courses' conventions are labeled wherever they meet.

## Topics in the prompt or exam scope with no course source
- **"Does AI offer a sustainable advantage?"** No document answers it. The site answers by applying the VRIO Brief and labels the answer as an application.
- **"Beyond-product differentiation"** is never defined in a document. The definition is a synthesis from the S10 Key Question, the Differentiation Brief, and the Porter paper's "people" engine. Labeled.
- **Cost vs. differentiation share for Costco.** No source computes it. The decomposition tool is a labeled construction with adjustable assumptions.
- **Cracking internet search, and who should pay for Warner Bros.** These are in-class questions with no case document. The answers apply the Cracking Markets framework and the HHI brief.
- **General strategy content.** None was needed beyond the items above. Any future additions will carry the "General strategy (not from course materials)" label.

## Session 3 deck scope
The S3 deck is 117 slides. Most of it is international-business material: political risk, FCPA, corruption, GDP, PPP, and the Culture Map. Kimball asked that it be included where relevant. It appears as "From the S3 slides" screens and in concept questions at lower weight than the PEST Brief.
