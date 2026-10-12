import type { SessionModule } from '../types'

const r = String.raw

export const s01: SessionModule = {
  id: 'S01',
  num: '1',
  title: 'Course Introduction',
  spine: 'frame',
  minutes: 20,
  ready: true,
  takeaway: r`STRAT 402 applies **economic concepts and principles to achieve superior profit performance**. Every tool answers one of four strategy questions, and Midterm 1 covers the first two: **Markets to Pursue** and **Unique Value to Offer**.`,
  why: r`This module is the map for everything else, plus the course policies CQ1 tested (ten true/false questions straight from the syllabus). [[CQ1 Q1]]

> Exam facts: two midterms in Canvas, **50% of your grade**, closed book and closed note in the Testing Center, **no AI of any kind** (AIAS Level 1). If your exam average is below 80%, you can take a comprehensive retake in finals week, **capped at 80%**. Midterm 1 window: **Mon Oct 19, 8:00 AM – Fri Oct 23, 9:00 PM**, with a late fee ($5) starting Friday. [[S01 slides p.53]] [[S10 slides p.7]] [[Using AI in STRAT 402 page]]`,
  intuition: r`**Economics** is the science of deciding with scarce resources. **Strategy** is a company's plan to create value in a marketplace, and to create and sustain a competitive advantage. Put them together and you get the course: use economic reasoning to make strategy choices that lead to superior profits. [[S01 slides pp.29, 33]]

Why economics instead of “study what winners did”? Choices of successful firms always look right in hindsight. Economics forces you to state your assumptions, which leaves an **audit trail** separating conclusions you derived from guesses. [[S01 slides p.32]]

And in this class, **you are the manager, not the consumer**. A Netflix price increase is a pricing decision to analyze, not a bill to complain about. [[S01 slides p.37]]`,
  los: [
    { id: 'S01-LO1', text: 'Develop competent understanding of basic economic concepts and principles (i.e., “book smarts”)', src: 'S01 slides p.38' },
    { id: 'S01-LO2', text: 'Acquire skill in applying the tools of economic analysis to management problems (i.e., “street smarts”)', src: 'S01 slides p.40' },
    { id: 'S01-LO3', text: 'Know the course policies tested in Comprehension Quiz 1 (exams, AI use, late work, grading, prerequisites)', src: 'Comprehension Quiz 1 (derived — not stated as an LO by the professor)', derived: true },
  ],
  terms: [
    { id: 's01-t-econ', term: 'Economics', def: 'The science of making decisions in the presence of scarce resources; the study of how to direct resources in a way that most efficiently achieves a given goal.', src: 'S01 slides p.29' },
    { id: 's01-t-strategy', term: 'Strategy', def: 'A company’s plan to create value in a marketplace; a plan to create and sustain a competitive advantage.', src: 'S01 slides p.29' },
    { id: 's01-t-objective', term: 'Course objective', def: 'Learn how to apply economic concepts and principles to achieve superior profit performance for firms. STRAT 401 = conceptual foundations; STRAT 402 = analytical underpinnings and quantitative rigor.', src: 'S01 slides p.33' },
    { id: 's01-t-spine', term: 'Four strategy questions', def: 'Markets to Pursue (most attractive industry, product and geographic markets); Unique Value to Offer (cost or differentiation); Resources and Capabilities to Develop; Sustaining Advantage (barriers to imitation).', src: 'S01 slides p.36' },
    { id: 's01-t-audit', term: 'Audit trail', def: 'Economic reasoning is explicit about its assumptions, so there is a clear link between conclusions and assumptions that “allows one to distinguish between derived propositions and unsupported conjectures” (Besanko et al. 2016).', src: 'S01 slides p.32' },
    { id: 's01-t-aias', term: 'AI Assessment Scale (AIAS v2.1)', def: 'Level 1 No AI; 2 AI Planning; 3 AI Collaboration; 4 Full AI; 5 AI Exploration. Midterms = Level 1; pre-class assignments and weekly quizzes = “clarify, don’t answer”; spreadsheets and in-class exercises = Levels 2–3; group project = Level 4.', src: 'Using AI in STRAT 402 page' },
    { id: 's01-t-grading', term: 'Grade weights', def: 'Pre-class quizzes 5%, participation 5%, weekly quizzes 10%, midterm exams 50%, spreadsheet exercises 15%, group project 15%.', src: 'S01 slides pp.39, 41' },
  ],
  formulas: [],
  examples: [
    {
      id: 's01-ex-airline',
      title: 'Case study: which airport is most expensive to fly to?',
      setup: 'Rank Atlanta, Boston, Cincinnati, Los Angeles and Salt Lake City by cost per flight mile. What do you know about the industry, the consumers and the cities? [[S01 slides pp.60-62]]',
      steps: [
        { ask: 'What factors might matter?', show: 'Affluence of the community, proportion of business travelers, number of flights (traffic), type of plane (regional vs. jumbo), number and concentration of airlines, geography. [[S01 slides p.64]]' },
        { ask: 'The answer?', show: 'Cincinnati $0.22 (1), Atlanta $0.20 (2), Salt Lake City $0.17 (3), Boston $0.14 (4), Los Angeles $0.12 (5). [[S01 slides p.67]]' },
        { ask: 'How do you know which factor matters most?', show: 'You can’t tell from five cities. That’s why Session 9 uses multiple regression on 75 airports to isolate each factor (CQ5). [[S09 slides p.9]]' },
      ],
      takeaway: 'Intuition gives hypotheses; economic analysis of data tests them.',
      src: 'S01 slides pp.60-67',
    },
  ],
  widgets: [{ id: 'spine-sorter', title: 'Which strategy question does this tool answer?', intro: 'Sort course tools into the four strategy questions that organize the whole course.', questions: [] }],
  checkIds: ['s01-cq1-q2', 's01-cq1-q8', 's01-c-econ', 's01-c-strategy', 's01-c-spine', 's01-c-audit'],
  applyGenerators: [],
  traps: [
    { title: 'Target GPA ≠ quota', body: 'The 3.6 junior-core target GPA is not a curve; it could end up higher or lower. [[CQ1 Q7]]', src: 'CQ1 Q7' },
    { title: 'Late pre-class work', body: 'Pre-class assignments close at the deadline. Instead, the two lowest are dropped (and your lowest weekly quiz). [[CQ1 Q5]]', src: 'CQ1 Q5' },
    { title: 'The retake is capped', body: 'Exam average below 80% → comprehensive retake in finals week, capped at 80%. [[S01 slides p.53]]', src: 'S01 slides p.53' },
    { title: 'No AI on exams', body: 'Midterms are AIAS Level 1: closed book, closed note, no AI of any kind.', src: 'Using AI in STRAT 402 page' },
  ],
  feynman: [
    {
      id: 's01-fey-1',
      prompt: 'Explain how the four strategy questions organize the tools you’ve learned so far.',
      model: 'The first question, which markets to pursue, uses concentration (C4, HHI) and the Five Forces to judge whether an industry and geography are attractive. The second, what unique value to offer, splits into cost (cost curves, scale curves) and differentiation (demand, willingness to pay, elasticity), and then capturing that value through pricing (profit maximization, advanced pricing). Questions three and four, resources and capabilities and sustaining advantage, come after Midterm 1.',
      rubric: ['Named all four questions', 'Placed S03–S04 under Markets to Pursue', 'Placed S05–S11 under Unique Value', 'Noted 3–4 come later'],
    },
  ],
  deeper: [
    { title: 'Succeeding in STRAT 402', kind: 'textbook', body: 'Up to 9 hours/week including class. Stay on schedule; seek to understand; work in groups and ask for help (try 15–30 minutes alone first); show grit. If you fall behind, catch up on the content, not the credit, and **prioritize the spreadsheet assignment: “it is the practice that shows up on the midterm.”** [[Succeeding in STRAT 402 page]]' },
    { title: 'Insight = theory × data × tools', kind: 'textbook', body: 'STRAT 402 builds judgement by applying theory to data (mostly in Excel); STRAT 412 focuses on tools and techniques. [[S01 slides p.35]]' },
    { title: 'In a case interview', kind: 'case-interview', body: 'The four strategy questions are a clean opening structure: “Where should we play (markets)? How do we win (cost vs. differentiation)? What capabilities do we need? How do we defend it?” It’s the same “where to play / how to win” logic consulting firms use.' },
  ],
  summary: r`**Economics:** deciding with scarce resources. **Strategy:** a plan to create and sustain competitive advantage. **Objective:** apply economics to achieve superior profit performance. [[S01 slides pp.29, 33]]

- **Four questions:** Markets to Pursue (S2–4) → Unique Value to Offer (S5–12) → Resources & Capabilities → Sustaining Advantage. [[S01 slides p.36]]
- **Audit trail:** economics makes assumptions explicit. **Managers, not consumers.** [[S01 slides pp.32, 37]]
- **Grades:** midterms 50%, spreadsheets 15%, group project 15%, weekly quizzes 10%, pre-class 5%, participation 5%. [[S01 slides pp.39, 41]]
- **Exams:** closed book, no AI (Level 1), Testing Center; <80% average → retake capped at 80%. [[S01 slides p.53]]
- **CQ1:** checklist in each module ✓; AI on exams ✗; participation graded ✓; up to 9 hrs/week ✓; late pre-class ✗; calculus used but not required ✓; 3.6 is a target not a quota ✗; retake ✓; peer evaluations count ✓; same as ECON 110 ✗.`,
}
