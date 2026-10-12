import contentMap from '../../content/content-map.json'
import cqRaw from './questions/cq.json'
import { s08 } from './sessions/s08'
import { s08Mcqs } from './questions/s08'
import { s08Generators } from './generators/s08'
import { s10 } from './sessions/s10'
import { s10Mcqs } from './questions/s10'
import { s10Generators } from './generators/s10'
import { s09 } from './sessions/s09'
import { s09Mcqs } from './questions/s09'
import { s09Generators } from './generators/s09'
import { s07 } from './sessions/s07'
import { s07Mcqs } from './questions/s07'
import { s07Generators } from './generators/s07'
import { s06 } from './sessions/s06'
import { s06Mcqs } from './questions/s06'
import { s06Generators } from './generators/s06'
import { s11 } from './sessions/s11'
import { s11Mcqs } from './questions/s11'
import { s11Generators } from './generators/s11'
import type { Generator, LearningObjective, Mcq, SessionId, SessionModule } from './types'

export interface CqQuestion {
  id: string
  quiz: number
  number: number
  type: 'tf' | 'mc'
  stemHtml: string
  optionsHtml: string[]
  correct: number
  feedbackHtml: string
}

/** Professor's Comprehension Quiz questions, verbatim (parsed from Canvas results pages). */
export const cqQuestions = cqRaw as CqQuestion[]

/** Which session each CQ question belongs to (for LO tracking). */
export const cqSession: Record<string, SessionId> = {}
for (const q of cqQuestions) {
  cqSession[q.id] =
    q.quiz === 1 ? 'S01' : q.quiz === 3 ? 'S06' : q.quiz === 4 ? (q.number <= 4 || q.number === 7 ? 'S07' : 'S08') : q.number <= 5 ? 'S09' : 'S10'
}

/** Learning objectives each CQ question tests (used by the LO tracker). */
export const cqLos: Record<string, string[]> = {}
for (const q of cqQuestions) {
  const k = `${q.quiz}-${q.number}`
  const m: Record<string, string[]> = {
    '3-8': ['S06-LO3'], '3-9': ['S06-LO1'], '3-10': ['S06-LO1', 'S06-LO3'],
    '4-1': ['S07-LO1'], '4-2': ['S07-LO1'], '4-3': ['S07-LO1'], '4-4': ['S07-LO4'], '4-5': ['S08-LO2'], '4-6': ['S08-LO1'],
    '4-7': ['S07-LO3'], '4-8': ['S08-LO2'], '4-9': ['S08-LO1'], '4-10': ['S08-LO2'],
    '5-2': ['S09-LO1', 'S09-LO3'], '5-3': ['S09-LO1', 'S09-LO3'], '5-6': ['S10-LO4'], '5-7': ['S10-LO4'], '5-8': ['S10-LO4'],
    '5-9': ['S10-LO2'], '5-10': ['S10-LO1'],
  }
  cqLos[q.id] = m[k] ?? (q.quiz === 1 ? ['S01-LO3'] : q.quiz === 3 ? ['S06-LO2'] : ['S09-LO3'])
}

type MapEntry = { session: string; title: string; spine: string; learningObjectives: LearningObjective[] }

function stub(e: MapEntry): SessionModule {
  const spine = e.spine.startsWith('Markets') ? 'markets' : e.spine.startsWith('Unique') ? 'value' : 'frame'
  return {
    id: e.session as SessionId,
    num: e.session === 'S12' ? '2 & 12' : String(Number(e.session.slice(1))),
    title: e.title,
    spine,
    minutes: 40,
    ready: false,
    takeaway: '',
    why: '',
    intuition: '',
    los: e.learningObjectives,
    terms: [],
    formulas: [],
    examples: [],
    widgets: [],
    checkIds: [],
    applyGenerators: [],
    traps: [],
    feynman: [],
    deeper: [],
    summary: '',
  }
}

const built: Partial<Record<SessionId, SessionModule>> = { S06: s06, S07: s07, S08: s08, S09: s09, S10: s10, S11: s11 }

/** Site order follows the course, grouped by the four strategy questions. */
export const SESSION_ORDER: SessionId[] = ['S01', 'S03', 'S04', 'S05', 'S06', 'S07', 'S08', 'S09', 'S10', 'S11', 'S12']

export const sessions: SessionModule[] = SESSION_ORDER.map((id) => {
  const entry = (contentMap as MapEntry[]).find((m) => m.session === id)!
  return built[id] ?? stub(entry)
})

export const sessionById = Object.fromEntries(sessions.map((s) => [s.id, s])) as Record<SessionId, SessionModule>

export const allLos = sessions.flatMap((s) => s.los.map((lo) => ({ ...lo, session: s.id })))

export const mcqs: Mcq[] = [...s06Mcqs, ...s07Mcqs, ...s08Mcqs, ...s09Mcqs, ...s10Mcqs, ...s11Mcqs]
export const mcqById = Object.fromEntries(mcqs.map((q) => [q.id, q]))

export const generators: Generator[] = [...s06Generators, ...s07Generators, ...s08Generators, ...s09Generators, ...s10Generators, ...s11Generators]
export const generatorById = Object.fromEntries(generators.map((g) => [g.id, g]))

export const SPINES = [
  { key: 'frame', title: 'Course framing', q: 'How STRAT 402 works and why economics leaves an audit trail', locked: false },
  { key: 'markets', title: '1 · Markets to Pursue', q: 'What industry, customer segment, and geographic markets are most attractive?', locked: false },
  { key: 'value', title: '2 · Unique Value to Offer', q: 'What value proposition beats competitors on cost, differentiation, or both?', locked: false },
  { key: 'resources', title: '3 · Resources & Capabilities to Develop', q: 'Sessions 15+ — after Midterm 1', locked: true },
  { key: 'sustain', title: '4 · Sustaining Advantage', q: 'Sessions 18+ — after Midterm 1', locked: true },
] as const
