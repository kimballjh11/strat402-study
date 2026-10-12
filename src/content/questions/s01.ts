import type { Mcq } from '../types'

const L1 = 'S01-LO1'
const L2 = 'S01-LO2'
const L3 = 'S01-LO3'
const S = 'S01' as const
const TF = (_answer: boolean, whyT: string, whyF: string) => [
  { text: 'True', why: whyT },
  { text: 'False', why: whyF },
]

export const s01Mcqs: Mcq[] = [
  // ───────── CQ1 verbatim (true/false) ─────────
  { id: 's01-cq1-q1', session: S, los: [L3], origin: 'cq', src: 'CQ1 Q1', screen: 'why', stem: 'You can find a checklist of items needed to prepare for class in each session’s module in Canvas.', options: TF(true, 'Correct — syllabus, Course Logistics. [[CQ1 Q1]]', 'Each module has a prep checklist.'), correct: 0 },
  { id: 's01-cq1-q2', session: S, los: [L3], origin: 'cq', src: 'CQ1 Q2', screen: 'why', stem: 'You are permitted to use AI on your exams.', options: TF(false, 'Exams are AIAS Level 1: no AI of any kind.', 'Correct — “All assessments are closed-book, closed-note, closed-neighbor and must be taken without access to generative AI tools.” [[CQ1 Q2]]'), correct: 1 },
  { id: 's01-cq1-q3', session: S, los: [L3], origin: 'cq', src: 'CQ1 Q3', screen: 'why', stem: 'The professor evaluates your attendance and participation in class as part of your final grade.', options: TF(true, 'Correct — Participation & Professionalism is holistic: preparation, participation (including attendance and punctuality) and attitude. [[CQ1 Q3]]', 'It is graded.'), correct: 0 },
  { id: 's01-cq1-q4', session: S, los: [L3], origin: 'cq', src: 'CQ1 Q4', screen: 'why', stem: 'According to BYU’s Credit Hour Policy, for a 3-credit course like STRAT 402 you can expect to put in up to 9 hours of work a week, including time in class.', options: TF(true, 'Correct. [[CQ1 Q4]] [[Succeeding in STRAT 402 page]]', 'Up to 9 hours/week including class is right.'), correct: 0 },
  { id: 's01-cq1-q5', session: S, los: [L3], origin: 'cq', src: 'CQ1 Q5', screen: 'why', stem: 'If you miss a pre-class assignment, you can still submit it late for partial credit.', options: TF(false, 'Pre-class assignments close at the deadline; instead, the two lowest are dropped.', 'Correct — they must be in before the close deadline; the two lowest pre-class assignments are dropped. [[CQ1 Q5]]'), correct: 1 },
  { id: 's01-cq1-q6', session: S, los: [L3], origin: 'cq', src: 'CQ1 Q6', screen: 'why', stem: 'Although a calculus course is not required for STRAT 402, the course uses calculus concepts such as derivatives and optimization.', options: TF(true, 'Correct — LO 2: “analyze and optimize pricing, production, and cost decisions using calculus and data.” MATH 116 is helpful but not required. [[CQ1 Q6]]', 'Calculus concepts are used (S05).'), correct: 0 },
  { id: 's01-cq1-q7', session: S, los: [L3], origin: 'cq', src: 'CQ1 Q7', screen: 'why', stem: 'STRAT 402 has a grade curve of 3.6, which means only a certain number of students can earn A’s.', options: TF(false, '3.6 is a target GPA, not a quota.', 'Correct — the junior-core target GPA of 3.6 is “not a quota.” [[CQ1 Q7]]'), correct: 1 },
  { id: 's01-cq1-q8', session: S, los: [L3], origin: 'cq', src: 'CQ1 Q8', screen: 'why', stem: 'If your average exam score is below 80%, you will have an opportunity to retake a comprehensive exam during finals week.', options: TF(true, 'Correct — the retake is capped at 80%. [[CQ1 Q8]] [[S01 slides p.53]]', 'The retake exists.'), correct: 0 },
  { id: 's01-cq1-q9', session: S, los: [L3], origin: 'cq', src: 'CQ1 Q9', screen: 'why', stem: 'Your group members’ evaluations of your contribution factor into your participation and professionalism grade.', options: TF(true, 'Correct. [[CQ1 Q9]]', 'They do (and the participation score also scales the group project grade).'), correct: 0 },
  { id: 's01-cq1-q10', session: S, los: [L3], origin: 'cq', src: 'CQ1 Q10', screen: 'why', stem: 'STRAT 402 covers the same material as ECON 110.', options: TF(false, 'It builds on ECON 110 as an intermediate course.', 'Correct — “As an intermediate economics course, STRAT 402 builds on ECON 110.” [[CQ1 Q10]]'), correct: 1 },
  // ───────── Variants ─────────
  { id: 's01-v-retake', session: S, los: [L3], origin: 'cq-variant', src: 'Variant of CQ1 Q8; S01 slides p.53', screen: 'why', stem: 'If you take the comprehensive retake exam in finals week, the highest score it can give you is 100%.', options: TF(false, 'The retake is capped at 80%.', 'Correct — capped at 80%. [[S01 slides p.53]]'), correct: 1 },
  { id: 's01-v-drops', session: S, los: [L3], origin: 'cq-variant', src: 'Variant of CQ1 Q5; Succeeding in STRAT 402 page', screen: 'why', stem: 'The professor drops your two lowest pre-class assignments and your lowest quiz score.', options: TF(true, 'Correct. [[Succeeding in STRAT 402 page]]', 'Both drops are stated on the Succeeding page.'), correct: 0 },
  { id: 's01-v-ai-quiz', session: S, los: [L3], origin: 'cq-variant', src: 'Variant of CQ1 Q2; Using AI in STRAT 402 page', screen: 'why', stem: 'On pre-class quizzes, the AI policy is “clarify, don’t answer”: you may ask AI to explain what a question is asking, but not to answer it.', options: TF(true, 'Correct. [[Using AI in STRAT 402 page]]', 'That is the stated policy.'), correct: 0 },
  // ───────── Course concepts ─────────
  {
    id: 's01-c-econ', session: S, los: [L1], origin: 'course', src: 'S01 slides p.29', screen: 'terms',
    stem: 'How does the professor define economics?',
    options: [
      { text: 'The science of making decisions in the presence of scarce resources; how to direct resources to most efficiently achieve a goal', why: 'Correct. [[S01 slides p.29]]' },
      { text: 'The study of money and banking', why: 'Too narrow.' },
      { text: 'A company’s plan to create value', why: 'That’s strategy.' },
      { text: 'The study of stock prices', why: 'No.' },
    ],
    correct: 0,
  },
  {
    id: 's01-c-strategy', session: S, los: [L1], origin: 'course', src: 'S01 slides p.29', screen: 'terms',
    stem: 'How does the professor define strategy?',
    options: [
      { text: 'A company’s plan to create value in a marketplace; a plan to create and sustain a competitive advantage', why: 'Correct. [[S01 slides p.29]]' },
      { text: 'Making decisions with scarce resources', why: 'That’s economics.' },
      { text: 'A list of company values', why: 'No.' },
      { text: 'Beating competitors on price only', why: 'Too narrow (cost or differentiation).' },
    ],
    correct: 0,
  },
  {
    id: 's01-c-objective', session: S, los: [L1, L2], origin: 'course', src: 'S01 slides p.33', screen: 'why',
    stem: 'What is the primary objective of STRAT 402?',
    options: [
      { text: 'To learn how to apply economic concepts and principles to achieve superior profit performance for firms', why: 'Correct. STRAT 401 gives conceptual foundations; 402 adds analytical underpinnings and quantitative rigor. [[S01 slides p.33]]' },
      { text: 'To memorize economic theories', why: 'Application is the point.' },
      { text: 'To learn Python', why: 'That’s closer to STRAT 412’s tools focus.' },
      { text: 'To prepare for the CPA exam', why: 'No.' },
    ],
    correct: 0,
  },
  {
    id: 's01-c-spine', session: S, los: [L1], origin: 'course', src: 'S01 slides p.36', screen: 'intuition',
    stem: 'The course is organized around four strategy questions. Which list is right?',
    options: [
      { text: 'Markets to Pursue; Unique Value to Offer; Resources and Capabilities to Develop; Sustaining Advantage', why: 'Correct. Midterm 1 covers the first two. [[S01 slides p.36]]' },
      { text: 'Price, Product, Place, Promotion', why: 'Marketing 4 Ps.' },
      { text: 'Rivalry, Buyers, Suppliers, Entrants', why: 'Four of the Five Forces.' },
      { text: 'Plan, Do, Check, Act', why: 'Quality management.' },
    ],
    correct: 0,
  },
  {
    id: 's01-c-audit', session: S, los: [L1], origin: 'course', src: 'S01 slides p.32', screen: 'intuition',
    stem: 'Why economics? Besanko et al. argue that economic reasoning…',
    options: [
      { text: 'is explicit about its assumptions, leaving an “audit trail” that separates derived propositions from unsupported conjectures', why: 'Correct — instead of uncritically imitating successful firms. [[S01 slides p.32]]' },
      { text: 'always predicts the future', why: 'Not the claim.' },
      { text: 'is mostly about imitating successful firms', why: 'It warns against that.' },
      { text: 'needs no data', why: 'The course is built on data.' },
    ],
    correct: 0,
  },
  {
    id: 's01-c-manager', session: S, los: [L2], origin: 'course', src: 'S01 slides p.37', screen: 'intuition',
    stem: '“How would you feel about Netflix raising their price?” What perspective does the professor want you to take?',
    options: [
      { text: 'A manager’s, not a consumer’s', why: 'Correct — “In this class, we are managers, not consumers.” [[S01 slides p.37]]' },
      { text: 'A consumer’s', why: 'The opposite.' },
      { text: 'A regulator’s', why: 'Not the framing.' },
      { text: 'An investor’s only', why: 'Not the framing.' },
    ],
    correct: 0,
  },
  {
    id: 's01-c-grades', session: S, los: [L3], origin: 'course', src: 'S01 slides pp.39, 41', screen: 'why',
    stem: 'How much of your grade are the midterm exams worth, per the course introduction?',
    options: [
      { text: '50% (two midterms together)', why: 'Correct. Pre-class quizzes 5%, participation 5%, weekly quizzes 10%, spreadsheets 15%, group project 15%. [[S01 slides pp.39, 41]]' },
      { text: '25%', why: 'Too low.' },
      { text: '15%', why: 'That’s the spreadsheets or the group project.' },
      { text: '80%', why: 'Too high.' },
    ],
    correct: 0,
  },
  {
    id: 's01-c-lo2', session: S, los: [L1, L2], origin: 'course', src: 'S01 slides pp.38-41', screen: 'why',
    stem: 'The course’s two learning objectives are “book smarts” and “street smarts.” Which activities build street smarts?',
    options: [
      { text: 'Spreadsheet exercises (practice) and the group project (apply)', why: 'Correct. Book smarts: pre-class quizzes, participation, in-class exercises, practice problems; evaluated by weekly quizzes and midterms. [[S01 slides pp.39-41]]' },
      { text: 'Only the midterms', why: 'Midterms evaluate book smarts.' },
      { text: 'Only reading quizzes', why: 'Those are for learning book smarts.' },
      { text: 'Attendance only', why: 'No.' },
    ],
    correct: 0,
  },
  {
    id: 's01-c-aias', session: S, los: [L3], origin: 'course', src: 'Using AI in STRAT 402 page', screen: 'deeper',
    stem: 'Which AI Assessment Scale level applies to the final group project?',
    options: [
      { text: 'Level 4 — Full AI: use AI extensively, then defend the analysis out loud and document your adjustments', why: 'Correct. Midterms Level 1; spreadsheets/in-class Levels 2–3. [[Using AI in STRAT 402 page]]' },
      { text: 'Level 1 — No AI', why: 'That’s the midterms.' },
      { text: 'Level 2 — AI Planning', why: 'Spreadsheets are 2–3.' },
      { text: 'Level 5 — AI Exploration', why: 'Not the stated level.' },
    ],
    correct: 0,
  },
  {
    id: 's01-c-airline', session: S, los: [L2], origin: 'course', src: 'S01 slides pp.60-67', screen: 'examples',
    stem: 'In the Session 1 airline case, which of these five airports was the MOST expensive to fly to (cost per mile)?',
    options: [
      { text: 'Cincinnati ($0.22/mile)', why: 'Correct. Then Atlanta 0.20, Salt Lake City 0.17, Boston 0.14, Los Angeles 0.12. [[S01 slides p.67]]' },
      { text: 'Los Angeles', why: 'LA was the cheapest ($0.12).' },
      { text: 'Atlanta', why: 'Second ($0.20).' },
      { text: 'Boston', why: 'Fourth ($0.14).' },
    ],
    correct: 0,
  },
  {
    id: 's01-c-edge', session: S, los: [L1], origin: 'course', src: 'S01 slides p.44', screen: 'deeper',
    stem: 'The professor’s EDGE teaching method stands for…',
    options: [
      { text: 'Explain, Demonstrate, Guide, Enable', why: 'Correct. Explain (readings, videos); Demonstrate (quizzes, in-class exercises); Guide (assignments, posted solutions); Enable (group project, midterms). [[S01 slides p.44]]' },
      { text: 'Evaluate, Decide, Grow, Execute', why: 'No.' },
      { text: 'Economics, Data, Graphs, Excel', why: 'No.' },
      { text: 'Engage, Discuss, Give, Earn', why: 'No.' },
    ],
    correct: 0,
  },
]
