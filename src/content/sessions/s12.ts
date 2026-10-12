import type { SessionModule } from '../types'

const r = String.raw
const SRC = 'Group Project Instructions page'

export const s12: SessionModule = {
  id: 'S12',
  num: '2 & 12',
  title: 'Group Project',
  spine: 'frame',
  minutes: 20,
  ready: true,
  takeaway: r`Four checkpoints → present to **Prova** → 100 points (Prova 50, analysis 40, checkpoints 8, showcase 2) **× your participation score**. Keep the scope narrow, focus on the problem, and get data from people you already know.`,
  why: r`Sessions 2 and 12 are group work days. The Session 12 reading quiz is **ten true/false questions** on the Group Project Instructions, so this module drills that format. [[Session 12: Reading Quiz]] The group project is the course's “street smarts” piece, worth 15% of your grade. [[S01 slides p.41]]

> Two dates to remember now: **Checkpoint 2 is due Sat Oct 17**, and that is also the **deadline to report a showcase conflict**. [[${SRC}]]`,
  intuition: r`Think of it as a consulting engagement. Find a real manager with a real decision (Checkpoint 2: ten possible organizations and your top three ideas). Pitch the ideas and commit to one (Checkpoint 3, with Prova's feedback). Get the data and do the analysis with course tools: pricing, elasticity, regression, cost curves, competition. Defend it to Prova, an AI evaluator that has read every file you submitted and can question any group member about any number. [[${SRC}]]`,
  los: [
    { id: 'S12-LO1', text: 'Know the four group project checkpoints and what each one requires', src: 'Canvas Session 12 Reading Quiz' },
    { id: 'S12-LO2', text: 'Understand how Prova is used to give feedback on project ideas and to evaluate your final presentation', src: 'Canvas Session 12 Reading Quiz' },
    { id: 'S12-LO3', text: 'Know how the 100 project points are earned and how the participation score scales them', src: 'Canvas Session 12 Reading Quiz' },
    { id: 'S12-LO4', text: 'Know the showcase attendance expectation and the deadline for reporting a conflict', src: 'Canvas Session 12 Reading Quiz' },
    { id: 'S12-LO5', text: 'Be able to choose a project scope and data source that can be completed within the semester', src: 'Canvas Session 12 Reading Quiz' },
  ],
  terms: [
    { id: 's12-t-cp1', term: 'Checkpoint 1: Breaking Bread', def: 'Group meets Wed Sep 9; due Sat Sep 12. Eat together, ≥60 minutes, five-minute transformative-experience story each; each member submits where you met, what you ate, your story, the connections you made.', src: SRC },
    { id: 's12-t-cp2', term: 'Checkpoint 2: Brainstorming and Narrowing', def: 'Meets Wed Oct 14; due Sat Oct 17. A 2–3 page document: projects that stood out; ≥10 possible businesses (contact, position, relationship); top three ideas (managerial problem, type of analysis, data source). One member uploads.', src: SRC },
    { id: 's12-t-cp3', term: 'Checkpoint 3: Committing to Your Idea', def: 'Meets Mon Nov 2; due Tue Nov 3. Pitch top three ideas to Prova; submit the Prova output plus a one-page proposal (managerial question, type of analysis, data needed).', src: SRC },
    { id: 's12-t-cp4', term: 'Checkpoint 4: Final Submission', def: 'Meets Wed Dec 2; due Sat Dec 5. Slide deck, data, analysis (spreadsheets, code) and supporting files; every number must trace to a submitted file.', src: SRC },
    { id: 's12-t-prova', term: 'Prova', def: 'An AI evaluator: gives feedback on project ideas (Checkpoint 3) and evaluates the final presentation with follow-up questions (Dec 7 and 9, recorded, reserved room). Any member may be asked about any part.', src: SRC },
    { id: 's12-t-points', term: '100 project points', def: 'Prova assessment 50 + analysis (evaluated by Prof. Lewis with input from Prova) 40 + Checkpoints 1–4 on time (2 each) 8 + showcase attendance 2. Project = 15% of the final grade.', src: SRC },
    { id: 's12-t-part', term: 'Participation score', def: 'Actual % of workload shared (average of teammates’ allocations) ÷ ideal % (100% ÷ group size). Group project grade = participation score × project score.', src: SRC },
    { id: 's12-t-showcase', term: 'Final Project Showcase', def: 'Mon Dec 14, 11:00 a.m.–2:00 p.m.; top groups by Prova score invited (an honor, no extra credit). All students are expected to attend. Report conflicts by the Checkpoint 2 due date, or forfeit the 2 attendance points.', src: SRC },
  ],
  formulas: [
    { id: 's12-f-part', name: 'Participation and project grade', latex: r`\text{Participation} = \frac{\text{actual \% of work}}{100\% / n},\qquad \text{Grade} = \text{Participation}\times\text{Project score}`, vars: [[r`n`, 'number of group members']], words: 'Do your share: it multiplies the whole project score.', src: SRC },
  ],
  examples: [
    {
      id: 's12-ex-points',
      title: 'How a project score becomes your grade',
      setup: r`Group of 5. The group earns Prova 44, analysis 34, all 4 checkpoints on time, and you attend the showcase. Your teammates say you did 15% of the work. [[${SRC}]]`,
      steps: [
        { ask: 'Project score?', show: '44 + 34 + 8 + 2 = 88.' },
        { ask: 'Participation score?', show: '15% ÷ (100%/5 = 20%) = 75%.' },
        { ask: 'Your grade?', show: '0.75 × 88 = 66 points. If you had done 20%, you’d get all 88.' },
      ],
      takeaway: 'Free-riding is expensive by design.',
      src: SRC,
    },
    {
      id: 's12-ex-scope',
      title: 'Scoping a feasible project',
      setup: 'Prior projects to model: Chick-fil-A (stay open an extra hour? marginal benefit vs. marginal cost), Leland Bootcamps (revenue-maximizing price per bootcamp), BYU Testing Center (peak-load fee), Maverik (store-level elasticities). [[Skim: Group Projects from Prior Years page]]',
      steps: [
        { ask: 'What makes a good question?', show: 'A real decision a manager faces; narrow scope (one product, one price, one staffing decision); focus on the problem, not the tool.' },
        { ask: 'Where will the data come from?', show: 'Company records, a survey, or a small experiment. “Most groups relied on someone they already knew.” Start early; businesses are slow to share.' },
        { ask: 'How should the deck flow?', show: 'Background → managerial problem → method, analysis, results (bulk) → recommendations. Acknowledge limitations; make every number traceable.' },
      ],
      takeaway: 'Narrow question + data you can actually get + a course tool that answers it.',
      src: 'Skim: Group Projects from Prior Years page; Group Project Instructions page',
    },
  ],
  widgets: [{ id: 'points-calc', title: 'Project points calculator', intro: 'See how the four components and your participation score combine.', questions: [] }],
  checkIds: ['s12-tf-points', 's12-tf-part', 's12-tf-conflict', 's12-tf-invite', 's12-tf-cp3', 's12-tf-scope'],
  applyGenerators: ['s12-points'],
  traps: [
    { title: 'Showcase invite ≠ extra credit', body: 'It’s an honor based on Prova scores, not additional points.', src: SRC },
    { title: 'The conflict deadline is early', body: 'Report showcase conflicts by the Checkpoint 2 due date (Oct 17), not in December.', src: SRC },
    { title: 'Checkpoints aren’t graded separately', body: 'They fold into the single project score (2 points each, on time).', src: SRC },
    { title: 'Participation multiplies everything', body: 'A 50% participation score halves your whole project grade.', src: SRC },
  ],
  feynman: [
    {
      id: 's12-fey-1',
      prompt: 'Explain the group project grading to a new teammate in under a minute.',
      model: 'Out of 100: Prova scores our presentation and answers (50), the professor grades our analysis files with Prova’s input (40), each of the four checkpoints on time is 2 (8), and showcase attendance is 2. Then each of us gets multiplied by a participation score: the share of work teammates say we did divided by an equal share (20% in a group of five). Do your share or your grade shrinks. Report any showcase conflict by Oct 17.',
      rubric: ['50/40/8/2 breakdown', 'Participation = actual ÷ ideal', 'Grade = participation × project', 'Mentioned the conflict deadline'],
    },
  ],
  deeper: [
    { title: 'Prior projects by analysis type', kind: 'textbook', body: 'Elasticity & price discrimination (Done Right Roofing, BYU Campus Printing, Maverik, General Outdoor Advertising); pricing for revenue/profit (BYU ROC Pass, Leland Bootcamps, Mnmlst, Supersonic Car Wash, Redbox, Dazi, BYU Testing Center); production & cost (Chick-fil-A, Netflix, Diamond Rental, dōTERRA, Qualtrics, Katsiroubas); competition & game theory (BYU Arts). [[Skim: Group Projects from Prior Years page]]' },
    { title: 'In a case interview', kind: 'case-interview', body: 'The project is a mini consulting engagement: situation → complication → question → analysis → recommendation. Practicing that storyline (and defending numbers live to Prova) is great prep for case interviews.' },
  ],
  summary: r`**Checkpoints:** 1 Breaking Bread (Sep 12) · 2 Brainstorming & Narrowing (Oct 17: 10 orgs + top 3 ideas; also the showcase-conflict deadline) · 3 Committing (Nov 3: Prova pitch + 1-page proposal) · 4 Final Submission (Dec 5: deck, data, analysis). [[${SRC}]]

- **Prova:** AI evaluator for idea feedback (CP3) and final presentations (Dec 7/9, recorded; anyone can be asked anything).
- **Points:** Prova 50 + analysis 40 + checkpoints 8 + showcase 2 = 100 (15% of the grade).
- **Participation:** actual % ÷ (100%/n); grade = participation × project score.
- **Showcase:** Dec 14, 11–2; everyone attends; invitations are an honor (no extra credit).
- **Scope:** narrow question, problem not tool, data from people you know, start early.`,
}
