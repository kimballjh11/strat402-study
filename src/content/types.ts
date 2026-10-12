/**
 * Content contract. Every session is plain data that follows these types, so adding
 * Sessions 14–22 for Midterm 2 means adding files, not rewriting UI.
 *
 * "Rich" strings use a tiny markup (see components/Rich.tsx):
 *   \( inline math \)   \[ display math \]   **bold**   *italic*
 *   [[S08 slides p.16]]  → citation chip      [[GEN]] → "General econ" badge
 *   blank line → paragraph,  "- " → bullet,  "> " → callout
 * Write them with String.raw (aliased `r`) so LaTeX backslashes survive.
 */
export type Rich = string
export type SessionId = 'S01' | 'S12' | 'S03' | 'S04' | 'S05' | 'S06' | 'S07' | 'S08' | 'S09' | 'S10' | 'S11'

export interface LearningObjective {
  id: string
  text: string
  src: string
  derived?: boolean
}

export interface Term {
  id: string
  term: string
  def: Rich
  src: string
  general?: boolean
}

export interface Formula {
  id: string
  name: string
  latex: string
  vars: [string, string][] // [latex symbol, meaning]
  words: Rich
  src: string
  general?: boolean
}

export interface WorkedStep {
  /** What Kimball should try. */
  ask: Rich
  /** The solution for this step (numbers produced by code where they are computed). */
  show: Rich
}

export interface WorkedExample {
  id: string
  title: string
  setup: Rich
  steps: WorkedStep[]
  takeaway: Rich
  src: string
}

export interface McqOption {
  text: Rich
  why: Rich
}

export interface Mcq {
  id: string
  session: SessionId
  los: string[]
  stem: Rich
  options: McqOption[]
  correct: number
  src: string
  origin: 'cq' | 'cq-variant' | 'course' | 'site'
  /** Lesson screen key to review on a miss. */
  screen?: ScreenKey
  difficulty?: 1 | 2 | 3
}

export interface NumericPart {
  type: 'num'
  label: Rich
  answer: number
  kind?: 'number' | 'percent' | 'money'
  tol?: number
  abs?: number
  unitHint?: string
}

export interface ChoicePart {
  type: 'choice'
  label: Rich
  options: string[]
  correct: number
}

export type ProblemPart = NumericPart | ChoicePart

export interface Problem {
  title: string
  prompt: Rich
  parts: ProblemPart[]
  steps: Rich[]
  src: string
}

export interface Generator {
  id: string
  session: SessionId
  los: string[]
  title: string
  /** Short description of the skill (spreadsheet/assignment it mirrors). */
  skill: string
  make: (seed: number) => Problem
  /** Checks the defining condition for the generator tests (returns null if OK, else a message). */
  verify?: (seed: number) => string | null
  screen?: ScreenKey
}

export interface Trap {
  title: string
  body: Rich
  src: string
}

export interface Feynman {
  id: string
  prompt: Rich
  model: Rich
  rubric: string[]
}

export interface WidgetSlot {
  id: string // key into widget registry
  title: string
  intro: Rich
  /** Questions that force use of the widget. */
  questions: Mcq[]
  numeric?: { id: string; label: Rich; part: NumericPart; hint: Rich; src: string }[]
}

export type ScreenKey =
  | 'why'
  | 'intuition'
  | 'terms'
  | 'math'
  | 'examples'
  | 'widgets'
  | 'check'
  | 'apply'
  | 'traps'
  | 'explain'
  | 'deeper'
  | 'mastery'
  | 'summary'

export interface DeeperSection {
  title: string
  body: Rich
  kind?: 'textbook' | 'derivation' | 'case-interview'
}

export interface SessionModule {
  id: SessionId
  num: string // display number, e.g. "8" or "2 & 12"
  title: string
  spine: 'markets' | 'value' | 'frame'
  minutes: number
  takeaway: Rich
  why: Rich
  intuition: Rich
  los: LearningObjective[]
  terms: Term[]
  formulas: Formula[]
  mathIntro?: Rich
  examples: WorkedExample[]
  widgets: WidgetSlot[]
  checkIds: string[]
  applyGenerators: string[]
  traps: Trap[]
  feynman: Feynman[]
  deeper: DeeperSection[]
  summary: Rich
  /** If false, module is a stub (not yet built). */
  ready: boolean
}
