# STRAT 402 Midterm 1 Learning Site: Master Prompt for Claude Code

## Before you paste (setup for Kimball, about 10 minutes)

Create one project folder and drop your files in exactly like this, then open Claude Code in that folder and paste everything under "THE PROMPT" below.

```
strat402-study/
  inputs/
    course.zip                  <- the Canvas export (STRAT-402-Economics-of-Strategy-...zip)
    textbook/                   <- Baye & Prince PDFs (Ch 1, 2, 3, 5, 7, 8, 11 at minimum)
    my-assignments/             <- your Cost Advantage, Differentiation Advantage, Regression,
                                   and Advanced Pricing spreadsheets (+ any feedback or posted solutions)
    quizzes/                    <- screenshots or copy/paste of reading quizzes and comprehension quizzes
                                   (include your answers and the correct answers when Canvas shows them)
    later/                      <- add these when they post: Session 11 slides (Mon 2:30 PM),
                                   the Midterm 1 study guide spreadsheet, the Midterm 1 practice exam
    optional/                   <- Dyer Ch 2 pre-print (BYU Course Reserve), any LearnStrategy video
                                   transcripts you copy (especially "Differentiation Advantage",
                                   "Generic Strategies", "Cost Advantage")
```

Name quiz screenshots like `S07-reading-quiz-1.png` or `CQ4-q3.png` so the agent can map them to sessions. When the Session 11 slides, study guide, or practice exam post, drop them in `inputs/later/` and tell Claude Code: "New materials are in inputs/later. Run the ingest step again and update the site."

## THE PROMPT

You are building a personal, interactive learning website that teaches one student the full content of BYU STRAT 402: Economics of Strategy (Prof. Ben Lewis, Fall 2026), Sessions 1 through 12, so he can walk into Midterm Exam 1 and earn an A. He has not attended class and has not learned the material. Treat this like you are the best TA in the course building a private tutor. Accuracy to *this professor's* materials matters more than anything else. Polish matters second.

Work autonomously through the phases below, but stop at the two checkpoints marked **CHECKPOINT** and wait for my reply.

### 1. Who you are teaching

* Kimball, a junior strategy major in the BYU Marriott School. He's comfortable with business vocabulary and frameworks but missed every lecture. He did take the reading and comprehension quizzes, mostly cold.
* Don't assume calculus fluency. The professor says derivatives, optimization, and marginal thinking are the only math used, and that "you do not need to have taken calculus." Teach that math from zero, fast.
* He learns best by building intuition first, then the formula, then a worked example from the course's own cases, then doing problems himself with immediate feedback.
* He is targeting McKinsey and BCG. Inside optional "Go deeper" sections only, you may add short "In a case interview" callouts where a concept naturally shows up (Five Forces, unit economics, scale curves, pricing). Never let this crowd out exam content.

### 2. The exam (facts from the Session 10 slides and Canvas; do not contradict these)

* Midterm 1 covers Sessions 1 through 12. It's taken in the BYU Testing Center through Canvas. Closed book, closed notes, **no AI of any kind** (AIAS Level 1).
* The window opens Monday, Oct 19 at 8:00 AM and closes Friday, Oct 23 at 9:00 PM. A late fee starts Friday.
* Format, in the professor's words: "Most likely a series of multiple-choice questions and short-answer questions. Multiple choice will focus on conceptual understanding (quizzes). Short-answer will be based on application (spreadsheets, calculations, analysis)."
* "I use the Learning Objectives when deciding what questions to ask." He will post a study guide spreadsheet that maps each learning objective to its readings, quiz questions, in-class exercises, and spreadsheet questions. If that file shows up in `inputs/later/`, it becomes the master index for the whole site.
* The "Succeeding in STRAT 402" page says the spreadsheet assignments are "the practice that shows up on the midterm."
* Both midterms together are 50% of the grade. If his exam average is under 80%, he gets a comprehensive retake in finals week, capped at 80%.
* We don't know whether Excel is available during the exam. Train him two ways: (a) solve by hand with a basic calculator, and (b) read and interpret Excel output that is handed to him, like a regression table or a Solver result. Teach the Excel mechanics as a separate, optional "Excel Lab."

### 3. Source materials

Everything is under `inputs/`. Unzip `inputs/course.zip` into `work/course/` (never modify `inputs/`). The export contains:

* `viewer/course-data.js`: `window.COURSE_DATA` holding modules, pages, assignments, discussions, and quizzes. **The learning objectives for every session are in the module page HTML here.** Parse them programmatically. They are the backbone of the site.
* `viewer/files/Slides/`: S01, S03, S04, S05, S06, S07, S08, S09, S10 slide PDFs, plus `S06 Video Slides - Economic Costs.pptx`. Session 11 slides are missing until he adds them.
* `viewer/files/In-Class Exercises/`: the Excel workbooks for S03 (Allegiant airport concentration), S06 (Guest-Tek economies of scale), S07 (Dr Pepper vs. Mr. Pibb demand), S08 (elasticity: OPE and CPE), S09 (Redstone Residential regression), the Five Forces Strategy Excel Tool 3.1, and the IBISWorld 44411 Home Improvement Stores report (PDF). Most workbooks have **Solution** tabs. Read cell values *and* formulas (openpyxl twice: `data_only=True` and `data_only=False`).
* `viewer/files/Solutions/S04 Solution - Industry Analysis.xlsx`: the completed Five Forces evaluation.
* `viewer/files/Readings/`: `STRAT 402 Math Review.pdf` (the professor's own 10-page calculus guide), `HSIA Wars - iBahn and Guest-Tek.pdf` (case), `Essential Excel Skills.xlsx`.
* `viewer/files/Practice Problems/S05 Optional Practice - Math Review Problems.pdf`.
* `viewer/files/Spreadsheets/NAICS Classification for Public Companies FY 2025.xlsx`.
* `viewer/files/Group Projects/`: prior-year group project PDFs. Low exam value. Use them only for the Session 12 module and as optional real-world examples.
* `inputs/textbook/`: Baye & Prince, *Managerial Economics and Business Strategy*. Assigned pages are Ch 7 pp. 206 to 215 (S3), Ch 5 pp. 157 to 170 (S6), Ch 2 pp. 40 to 49 (S7), Ch 3 pp. 74 to 89 (S8), Ch 1 pp. 21 to 29 and 38 to 39 plus Ch 3 pp. 89 to 96 (S9), Ch 1 pp. 17 to 22 and 37 to 38, Ch 7 pp. 223 to 225, Ch 8 pp. 231 to 265 (S10), and Ch 11 pp. 352 to 370 (S11). Ignore chapters outside these ranges.
* `inputs/my-assignments/`, `inputs/quizzes/`, `inputs/later/`, `inputs/optional/`: as described in the setup. Some of these folders may be empty. Handle that gracefully and report what's missing.

How to read things:
* Slides are image heavy, with charts, WSJ clippings in "Theory Meets Practice," and tables. Extract the text *and* rasterize every slide page to PNG, then look at the images. Many numbers live only in images.
* Quiz screenshots are images too, so transcribe them.
* Skip the "Spiritual Thought" and personal bio slides. They aren't tested.

### 4. Source of truth rules (non-negotiable)

1. **The professor's materials win.** If the slides, workbooks, Math Review, or course pages define something a certain way, use that exact definition, notation, sign convention, and rounding. Examples: OPE is reported as negative, and demand is elastic when OPE < -1. HHI uses shares as decimals times 10,000. In his telecom example, any remaining market share is treated as one firm. Where Baye & Prince and the slides differ, follow the slides and note the difference.
2. **Every fact, definition, formula, and number on the site carries a source tag**, like `[S08 slides p.14]`, `[B&P Ch 3 p.79]`, `[S06 workbook, Solution!C12]`, or `[Reading Quiz S07, screenshot 2]`. Show these as small, unobtrusive citations the student can expand.
3. If you need content the materials don't cover (because a file is missing), you may use standard managerial economics. Label it visibly as **"General econ (not from course materials)"** and list it in the gap report so it can be swapped out later.
4. **Never invent professor specifics.** That includes exam weights, question counts, thresholds he didn't state, or case numbers. Course content is dated 2026. Do not "correct" it with your training data. If a slide says something happened in 2026, it happened.
5. **Every number in every worked example must be reproduced by code**, not typed by hand. See the golden tests in section 11.

### 5. Phases

**Phase 0: Ingest.** Unzip, inventory every file, extract text, rasterize slides, dump every workbook (values + formulas), and transcribe quiz screenshots. Write `work/inventory.md` listing each file, page or sheet counts, and what it contains.

**Phase 1: Content map.** Build `content/content-map.json` plus a readable `content/content-map.md`. For each session, include:
* the learning objectives (verbatim from course-data.js)
* the key terms, with the professor's definitions
* the formulas, in LaTeX, with every variable explained
* the worked examples, with their givens, steps, and answer
* the course cases and real-world examples used
* common traps
* the quiz questions that map to it
* the spreadsheet tasks that map to it
* the source tags

Then build `content/gap-report.md`: what's missing, what's labeled "General econ," and which learning objectives are thinly covered.

**CHECKPOINT 1:** Show me the content map summary and the gap report in under 400 words. Wait for my go-ahead. I may add files.

**Phase 2: Vertical slice.** Build the app shell plus **one complete module, Session 8 (Elasticity)**, at full quality: lesson, widgets, practice, mastery check, flashcards, and citations. Run it, screenshot it at desktop and phone widths, and fix whatever's broken.

**CHECKPOINT 2:** Give me the command to run it and 3 to 5 screenshots. Wait for feedback before building the rest.

**Phase 3: Build all modules** to the same standard as the slice. Build order: S10 Profit Max, S8 Elasticity (done), S9 Regression, S7 Demand, S6 Costs, S11 Pricing, S5 Math, S3 Industry Structure, S4 Industry Analysis, S1, then S2 and S12. Site order follows the course, not the build order.

**Phase 4: Exam layer.** This is the diagnostic, the learning objective tracker, practice exams, the formula drill, the mistake log, and the study plan (sections 8 to 9).

**Phase 5: Verify.** Run every quality gate in section 11. Fix everything. Then deliver.

### 6. Site structure and the course spine

The professor organizes the course around four strategy questions. Use them as the site's top-level spine so he sees how every tool fits strategy:

1. **Markets to Pursue:** What industry, customer segment, and geographic markets are most attractive? (Sessions 2 to 4)
2. **Unique Value to Offer:** What value proposition beats competitors on cost, differentiation, or both? (Sessions 5 to 12)
3. Resources and Capabilities to Develop (Sessions 15+, after Midterm 1: show as "coming later," locked)
4. Sustaining Advantage (Sessions 18+, after Midterm 1: show as "coming later," locked)

Pages:
* **Home / Dashboard:** days until his chosen exam date, overall mastery, the next recommended lesson, today's study block, weakest learning objectives, and a "Continue" button.
* **Learn:** one module per session (below).
* **Practice:** an unlimited problem generator, filterable by session and learning objective.
* **Flashcards:** every key term and formula, with spaced repetition.
* **LO Tracker:** a matrix of every learning objective. For each one it shows the linked lessons, linked practice, his accuracy, and his self-rated confidence (1 to 5). It mirrors the professor's study guide, and if the real study guide is provided, use its rows and links.
* **Exam Mode:** practice exams.
* **Formula Sheet:** one page, printable, for memorization (the exam is closed book).
* **Mistake Log:** every question he missed, with the concept and a "retry similar" button.
* **Excel Lab:** step-by-step Excel skills, with notes for both Windows and Mac. Covers scatterplot, axes, trendline, Solver, Analysis ToolPak regression, and reading regression output.

### 7. Curriculum spec (module by module)

For every module, the learning objectives in course-data.js are the contract. Every LO must be taught, practiced, and checked. Below is what I already know is in the materials. Verify each item against the sources and expand it from the slides, workbooks, and textbook.

**S1: Course Introduction.** What economics is, what strategy is, and the course objective ("apply economic concepts and principles to achieve superior profit performance"). Cover the four strategy questions spine, why economic reasoning leaves an "audit trail" (the Besanko quote), and the AI policy levels in one short card. Keep it short. Mostly framing.

**S2 and S12: Group Project.** One compact module. The S12 reading quiz tests the Group Project Instructions: the four checkpoints and their dates, what each one requires, how Prova is used, the 100 project points (Prova 50, analysis 40, checkpoints 8, showcase 2, all multiplied by the participation score), the showcase attendance expectation and the conflict deadline, and scoping a feasible project. Drill this with true/false questions, because that's the S12 quiz format.

**S3: Industry Structure.** Cover:
* concentration and its inverse relationship to competitiveness
* C4 = sum of the top four shares
* HHI = 10,000 × Σ(wᵢ²), ranging from 0 to 10,000
* why HHI weights big firms more
* when C4 and HHI disagree
* limitations: geographic market definition (national airline HHI 1,162 vs. route-level HHIs like ATL to MCO at 5,324), imports and foreign firms (the US auto market with all firms vs. domestic firms only), and product segments
* why the Justice Department uses these measures for mergers
* the Allegiant airport exercise

**Widget:** an HHI and C4 calculator. He types or drags market shares, sees both measures update live with a stacked bar, and gets a toggle for "treat remaining share as one firm."

**S4: Industry Analysis.** Cover:
* defining an industry three ways: the job-to-be-done test, NAICS codes (Netflix's code history, digits meaning narrower definitions), and organizational self-descriptions (About page, 10-K Item 1)
* Porter's Five Forces, using the professor's diagnostic questions for rivalry, buyer power, supplier power, threat of entry, and substitutes
* key terms: switching costs, forward and backward integration, network effects, barriers to entry, industry attractiveness
* PEST analysis and using 10-K Item 1A Risk Factors (the Meta example and how reputation loss shifts rivalry, buyer power, and substitutes)
* where to find data (IBISWorld)
* the Home Depot and Lowe's exercise, using the S04 Solution workbook ratings
* the S05 debrief lessons, such as which industry growth rate to use (forward vs. trailing) and how to handle buyer concentration and buyer profitability
* industry ROIC rankings
* the Neighbor (self-storage) example

**Widget:** a Five Forces rater. He rates each sub-factor for a mini case, sees force-level and overall attractiveness scores, then compares against the professor's solution.

**S5: Math & Excel Review.** Cover these from the professor's Math Review PDF:
* functions, slope, and intercept
* derivatives as instantaneous slope
* the power rule
* revenue-maximizing price, e.g. R = 100P − 2P², so P* = 25
* cost-minimizing quantity
* partial derivatives as "isolating the effect of one variable"

Also cover two reasons calculus matters in business: optimizing decisions and isolating effects. Excel skills go in the Excel Lab.

**Widgets:**
* a tangent-line slider on a curve that shows the derivative's value
* an endless power-rule drill with randomized polynomials
* "find the max," where he sets the derivative to zero, solves, and the graph confirms

Include the S05 optional practice problems with the answer key.

**S6: Cost & Economies of Scale.** Cover:
* generic strategies (cost vs. differentiation)
* the income-statement comparison of Whole Foods, Kroger, and Safeway (FY2014): gross margin, SG&A %, return on sales, asset turnover, leverage, ROA, ROE (the DuPont logic), and what each says about strategy, including "stuck in the middle"
* the five sources of cost advantage: economies of scale and scope, learning and experience, proprietary knowledge, input costs, and different business model
* the cost concepts FC, VC, TC, AFC, AVC, ATC, and MC, and how they relate (MC crosses ATC at its minimum)
* economies of scale and when growth makes sense
* scale and experience curves as power functions, like Redbox ATC = 656.06·R^(-0.476), and "scale economies work in reverse"
* the HSIA Wars case: Guest-Tek's $0.10 per room per day price, estimating its cost curves from eleven quarters of financials, and whether the price can last
* the Cost Advantage assignment
* the Netflix vs. Redbox "same job, different cost" example

**Widgets:**
* a cost curve explorer. He sets FC and the VC function and watches AFC, AVC, ATC, and MC move.
* a scale curve fitter. Points go in, the power-law fit comes out, and it reads the exponent as "% cost drop when volume doubles."

**S7: Demand & Consumer Surplus.** Cover:
* market demand, the law of demand
* change in quantity demanded vs. a shift in demand
* demand shifters: income (normal vs. inferior goods), prices of related goods (substitutes vs. complements), advertising, population, expectations
* the demand function vs. the inverse demand function, and converting between them
* constructing and plotting a demand curve from survey willingness-to-pay data (the Dr Pepper vs. Mr. Pibb exercise, scaled from sample to market)
* the revenue-maximizing price with calculus
* consumer surplus as the area under demand and above price: what it means and how to compute it, both for a linear triangle and from a WTP schedule
* the three ways to estimate demand: A/B tests, surveys, and historical data (Redbox)
* the four major categories or sources of differentiation (from the Differentiation Advantage video, if a transcript is provided; otherwise flag the gap)
* the Differentiation Advantage assignment

**Widgets:**
* a WTP-to-demand-curve builder
* a price slider that shades consumer surplus and revenue on the demand curve
* a shift vs. movement simulator: pick a shifter and see what moves

**S8: Elasticity & Price Discrimination.** Cover:
* elasticity as responsiveness (% change over % change)
* own-price elasticity (always negative), with elastic, inelastic, and unitary demand defined as the professor does
* the total revenue test, and why revenue peaks at unitary elasticity
* cross-price elasticity (sign tells substitutes vs. complements)
* income elasticity (normal vs. inferior)
* advertising elasticity
* point elasticity on linear demand and from log-linear regression coefficients, following Baye & Prince and the S08 workbook
* the Netflix 2011 price increase and subscriber loss
* the "Should we raise our price?" example
* the S08 workbook's OPE and CPE tabs (Dr Pepper vs. Mr. Pibb)
* any price discrimination content in the S08 slides

**Widgets:**
* a linear demand curve with a draggable point that shows elasticity, the elastic/inelastic region, TR, and MR together, with the TR curve peaking exactly at |E| = 1
* a "what happens to revenue if price rises 10%?" quick-fire drill
* a CPE sign classifier

**S9: Forecasting Demand Using Linear Regression.** Cover:
* why we need multiple regression (isolating effects, as in the airline fare example)
* OLS as minimizing the sum of squared errors
* Y = a + bX
* reading regression output: coefficients, standard errors, t-statistics, p-values, R², adjusted R², and F, using the professor's interpretation phrasing ("a one-unit increase in x leads to a [magnitude] [increase/decrease] in y") and his significance rules of thumb, whatever they are in the slides
* writing the estimated demand function from output, like Q = 1,631.47 − 2.60P for the Pittsburgh TVs
* plugging in values to forecast
* computing elasticity from a regression
* the Redstone Residential exercise: units rented on rent, advertising, and distance, which variables matter, and what a rent increase does to occupancy and revenue
* the Provo Peaks Root Beer midterm practice question (seven states, price and income)
* the Netflix subscription value regression in the Differentiation Advantage exercise
* "demand curves are dynamic" (Redbox 2011 vs. 2014)

**Widgets:**
* an annotated Excel regression output table where clicking any number explains it and asks a question about it
* a scatter plot where he drags a line to minimize SSE and then sees the OLS answer
* a randomized "interpret this output" generator: new fake datasets, real computed output, and questions on signs, significance, forecasts, and elasticities

**S10: Profit Maximization Across Market Structures.** Cover:
* marginal analysis: stop when MB = MC (studying, scoops of Creamery ice cream, scrolling)
* marginal revenue as dR/dQ, e.g. P = 10 − Q, so R = 10Q − Q² and MR = 10 − 2Q
* the comparison table across perfect competition, monopolistic competition, and monopoly: number of firms, type of goods, information, transaction costs, entry and exit, price taker vs. price maker, the firm's demand curve, and the profit-max rules (P = MC vs. MR = MC, then P* from demand)
* the in-class exercise with C(Q) = 125 + 4Q² across all three structures, including the short-run vs. long-run implications (operate but exit, entry barriers, imitation erodes profits)
* sources of monopoly power and strategies for obtaining it (B&P Ch 8)
* the "Heartless monopolists or innovative leaders?" framing ("Creating value isn't enough. You have to capture it." "The strategist's job: avoid competition and move toward monopoly.")
* the Big Tech Digital Dialog context (Google lost, Meta won, Amazon and Apple pending)

**Widget:** a profit-max lab. He picks a structure, enters or randomizes the demand and cost functions, sees the MR, MC, demand, and ATC graph, and solves step by step for Q*, P*, and profit with the profit rectangle shaded.

**S11: Advanced Pricing Strategies.** Session 11 slides arrive later; build from B&P Ch 11 now and refresh when they're added. Cover:
* the three forms of price discrimination (1st, 2nd, 3rd degree)
* the markup rule (P = [E/(1+E)]·MC, if it's in the readings)
* third-degree pricing across two groups
* two-part pricing: fixed fee and per-unit fee
* block pricing
* commodity bundling with reservation prices
* peak-load pricing
* cross-subsidies
* transfer pricing
* how to calculate the profit-maximizing price under each
* the benefits and risks of charging different prices to different customers
* the Dynamic and Surveillance Pricing dialog (Uber surge, Delta AI fares, Target "how companies learn your secrets," AI pricing)

**Widgets:**
* a two-part tariff builder that shades consumer surplus as the fixed fee
* a bundling table where he picks prices and sees which customers buy

### 8. Lesson template (every module)

Each module is a sequence of short screens, each 2 to 5 minutes. Show an estimated total time per module.

1. **Why this matters:** which of the four strategy questions it answers and the one-sentence takeaway.
2. **Intuition first:** plain language plus one concrete analogy, before any formula.
3. **Key terms:** professor's definitions, each with an "add to flashcards" control (all terms are added automatically, the control is for starring).
4. **The math:** formulas rendered in KaTeX, every symbol explained, then a "say it in words" line.
5. **Worked example from the course:** the actual case and numbers, revealed one step at a time. "Try this step first" is the default and "Show step" comes second.
6. **Interactive widget(s):** each one ends with 1 or 2 questions that force him to use it.
7. **Check yourself:** 3 to 6 conceptual multiple-choice questions in the style of the quizzes, each with an explanation for every option, including why each wrong answer is wrong.
8. **Apply it:** 2 to 4 short-answer calculation or interpretation problems in the style of the spreadsheets, with numeric input and step-by-step solutions.
9. **Common traps:** sign errors, % vs. decimal, P vs. Q in inverse demand, confusing a shift with a movement, and so on.
10. **Explain it back:** a Feynman prompt ("Explain to a friend why revenue peaks at unitary elasticity"). He types an answer, then compares it to a model answer and checks off a self-grading rubric.
11. **Go deeper (optional, collapsed):** extra textbook depth, derivations, and case interview callouts.
12. **Mastery check:** 8 to 10 mixed questions. Scoring 80% or more marks the module mastered. Below that, it points him to the exact screens for the questions he missed.
13. **One-page summary:** a printable recap of the module.

### 9. Practice engine, exam mode, and study system

**Question bank.**
* Aim for at least 25 conceptual multiple-choice questions per major session, plus *parameterized* calculation generators. Seeded random numbers give unlimited fresh versions, and each generator carries its own solver and step-by-step explanation.
* Every LO needs at least 3 MCQs and, where it's quantitative, at least 1 generator.
* Questions he gave you from `inputs/quizzes/` are gold. Include them (tagged "From your quizzes") and write 2 to 3 isomorphic variants of each, so he learns the concept instead of memorizing the answer.
* Turn the spreadsheet assignments in `inputs/my-assignments/` into short-answer problem families that test the same skills.

**Answer checking.**
* Accept `0.25`, `25%`, `$25`, `1,631.47`, and negatives.
* Use a tolerance of ±1% unless the problem states a rounding rule.
* For written short answers, show a model answer plus a 3 to 5 item rubric he self-scores.
* No AI grading or AI calls anywhere in the site.

**Exam Mode.**
* Generate full practice exams that mix conceptual MC (weighted toward the quizzes) with short-answer application problems (weighted toward the spreadsheets and calculations), covering all LOs from Sessions 1 to 12.
* Length and timer are configurable. Default to 30 MC + 6 short answer, 90 minutes, and label this clearly as a practice format, not the official one.
* While the exam runs: no hints, no feedback, and a flag-for-review button.
* Afterward, show the score by session and by LO, an explanation for every question, and push every miss to the Mistake Log.
* Every exam can be regenerated with new numbers.
* If the real practice exam appears in `inputs/later/`, add it as "Official Practice Exam" exactly as written, then generate variants of it.

**Diagnostic.** A 15-minute pre-test on Day 1 across all LOs. Its results set the starting confidence in the LO Tracker and reorder the study plan toward the weakest areas.

**Study plan.**
* He picks his exam date. Default to Thursday, Oct 22, leaving a Friday buffer.
* The site lays out daily blocks from today to the exam: new modules early, then mixed practice, then two full practice exams, then a final day of review focused on the Mistake Log and flashcards.
* Each day shows its targets and estimated minutes.

**Flashcards.** Leitner-style spaced repetition over all terms and formulas. Include "formula recall" cards where he writes the formula from memory, then reveals it.

**Formula drill.** A blank-page recall mode. He lists every formula he can remember for a session, then compares against the full list.

**Progress.**
* Save everything in localStorage under one versioned key, with try/catch around every read and write.
* Add **Export progress** and **Import progress** buttons (a JSON file) so he can move between laptop and phone.

### 10. Tech spec

* Use **Vite + React + TypeScript + Tailwind**, KaTeX for math, and lightweight charts (Recharts, or hand-built SVG for the interactive economics graphs where precise control matters).
* Use hash routing so it works on any static host.
* No backend, no accounts, no external API calls, no analytics.
* Keep all course content in typed data files under `src/content/` (one file per session, plus `questions/`, `generators/`, `flashcards/`), separate from UI components. Adding Sessions 14 to 22 for Midterm 2 later should mean adding content files, not rewriting the app.
* `npm run dev` for local use. `npm run build` outputs a static `dist/`. Also produce a **single self-contained HTML build** (`dist-single/strat402.html`, via vite-plugin-singlefile) that he can open offline or send to himself.
* Write an `npm run ingest` script that reruns Phases 0 and 1 against `inputs/`, so new materials can be absorbed later.
* Embedded slide images (cropped from the rasterized PDFs) are fine where a chart or table is essential, and they carry their source tag.
* Mobile-first responsive design, so he can study on his phone. Every widget must be usable by touch. No horizontal scrolling at 375px width.

### 11. Quality gates (definition of done)

1. **Golden tests (Vitest).** The site's own math must reproduce these course numbers exactly:
   * S3 telecom 2013: shares 42/33/16/3 with the remaining 6% as one firm gives C4 = 94% and HHI = 3,154. For 2014 (37/31/14/12 + 6): C4 = 94% and HHI = 2,706.
   * S5: R = 100P − 2P² gives P* = 25.
   * S10: C(Q) = 125 + 4Q².
     * Price taker at $40: Q* = 5, cost 225, revenue 200, profit −25.
     * Monopoly with P = 100 − Q: Q* = 10, P* = 90, cost 525, revenue 900, profit 375.
   * S10: P = 10 − Q gives MR = 10 − 2Q.
   * S6: Whole Foods FY2014 gives ROS ≈ 4.1%, asset turnover ≈ 2.5, leverage ≈ 1.5, ROA ≈ 10.1%, ROE ≈ 15.2%. Do the same for Kroger and Safeway from the slide table.
   * Every Solution tab in the S03, S06, S08, and S09 workbooks: your calculations must match the solution cells.
2. **Generator tests.** For every problem generator, run 500 random seeds. The solver's answer must satisfy the defining condition (for example, MR(Q*) = MC(Q*) within tolerance), with no NaN, no negative quantities unless they're intended, and "nice" numbers where the course uses nice numbers.
3. **Coverage report** (`content/coverage-report.md`): a table of every LO against its lessons, its MCQ count, its generator count, and its source tags. Zero LOs may be uncovered.
4. **Fidelity audit.** Spawn a fresh subagent that has not seen your build. Act as a skeptical STRAT 402 TA and compare 40 random claims, definitions, and numbers on the site against the source files. Fix every discrepancy. Record the audit in `content/audit.md`.
5. **End-to-end test (Playwright).** Click through every module, every widget, a full practice exam, flashcards, and export and import of progress, at 1280px and 375px widths. Zero console errors. Save screenshots to `work/screenshots/`.
6. **Accessibility.** Keyboard navigable, visible focus states, color is never the only signal, and light and dark modes both readable.

### 12. Design

* Calm, focused, and premium, like a well-made study app. Not a corporate LMS.
* BYU navy as the accent color, with lots of whitespace and a readable serif or humanist sans for body text at 17 to 18px. Math gets real typesetting.
* Graphs use consistent colors throughout: demand blue, MR dashed blue, MC red, ATC orange, consumer surplus shaded green, profit shaded gold.
* Progress should feel motivating: streaks, mastery rings per module, and a countdown. Skip cheesy confetti.
* Keyboard shortcuts in practice and flashcards: 1 to 4 to answer, Enter to check, Space to flip.

### 13. Deliverables

When you're done, give me:
1. the run command and the path to the single-file HTML
2. `README.md`, covering how to run it, how to add new materials (`inputs/later/` then `npm run ingest`), and how to back up progress
3. the gap report, the coverage report, and the audit
4. a 5-line summary of anything you could not source from the materials and what I should grab to fill it

### 14. Do not

* Do not pad lessons with fluff or generic textbook filler when the course's own example exists.
* Do not invent quiz questions and present them as the professor's.
* Do not add an AI chatbot or tutor to the site.
* Do not rely on the zip's `index.html` viewer. Read the raw files.
* Do not stop to ask me questions outside the two checkpoints. Make reasonable calls, log them in `work/decisions.md`, and keep going.
