import { useSyncExternalStore } from 'react'
import { isoDay } from './format'

/** Everything Kimball does is saved under ONE versioned localStorage key. */
export const STORAGE_KEY = 'strat402-progress-v1'
export const STATE_VERSION = 1

export interface AnswerRecord {
  attempts: number
  correct: number
  last: boolean
  lastAt: number
}

export interface MistakeRecord {
  key: string // unique: question id or generator id + seed
  qid: string // MCQ id or generator id
  kind: 'mcq' | 'gen' | 'cq'
  seed?: number
  session: string
  los: string[]
  summary: string
  at: number
  resolved?: boolean
}

export interface CardState {
  box: number // Leitner box 1..5
  due: string // ISO day
}

export interface ExamRecord {
  id: string
  at: number
  score: number
  total: number
  bySession: Record<string, [number, number]>
  minutes: number
}

export interface Progress {
  version: number
  examDate: string
  answers: Record<string, AnswerRecord>
  loAccuracy: Record<string, [number, number]> // [correct, attempts]
  loConfidence: Record<string, number>
  visited: Record<string, number[]> // session -> screen indexes viewed
  lastScreen: Record<string, number>
  mastery: Record<string, { best: number; passed: boolean }>
  cards: Record<string, CardState>
  starred: string[]
  mistakes: MistakeRecord[]
  exams: ExamRecord[]
  diagnostic?: { at: number; score: number; total: number }
  studyDays: string[]
  feynman: Record<string, { text: string; checks: boolean[] }>
  formulaDrill: Record<string, string>
  lastPath?: string
}

export function defaultProgress(): Progress {
  return {
    version: STATE_VERSION,
    examDate: '2026-10-22',
    answers: {},
    loAccuracy: {},
    loConfidence: {},
    visited: {},
    lastScreen: {},
    mastery: {},
    cards: {},
    starred: [],
    mistakes: [],
    exams: [],
    studyDays: [],
    feynman: {},
    formulaDrill: {},
  }
}

function migrate(raw: unknown): Progress {
  const base = defaultProgress()
  if (!raw || typeof raw !== 'object') return base
  const r = raw as Partial<Progress>
  // Unknown future versions: keep what we recognize.
  return { ...base, ...r, version: STATE_VERSION }
}

function load(): Progress {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    return s ? migrate(JSON.parse(s)) : defaultProgress()
  } catch {
    return defaultProgress()
  }
}

let state: Progress = load()
const listeners = new Set<() => void>()

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* storage unavailable (private mode / quota) — progress lives in memory this session */
  }
}

export function getProgress() {
  return state
}

export function setProgress(fn: (p: Progress) => Progress) {
  state = fn(state)
  persist()
  listeners.forEach((l) => l())
}

export function subscribe(l: () => void) {
  listeners.add(l)
  return () => listeners.delete(l)
}

export function useProgress<T>(select: (p: Progress) => T): T {
  return useSyncExternalStore(subscribe, () => select(state), () => select(state))
}

export function markStudyToday() {
  const d = isoDay()
  if (!state.studyDays.includes(d)) setProgress((p) => ({ ...p, studyDays: [...p.studyDays, d] }))
}

/** Record any graded attempt (MCQ, generator part, CQ retake). */
export function recordAnswer(opts: {
  id: string
  correct: boolean
  los: string[]
  session: string
  mistake?: Omit<MistakeRecord, 'at' | 'session' | 'los'>
}) {
  setProgress((p) => {
    const prev = p.answers[opts.id] ?? { attempts: 0, correct: 0, last: false, lastAt: 0 }
    const answers = {
      ...p.answers,
      [opts.id]: {
        attempts: prev.attempts + 1,
        correct: prev.correct + (opts.correct ? 1 : 0),
        last: opts.correct,
        lastAt: Date.now(),
      },
    }
    const loAccuracy = { ...p.loAccuracy }
    for (const lo of opts.los) {
      const [c, a] = loAccuracy[lo] ?? [0, 0]
      loAccuracy[lo] = [c + (opts.correct ? 1 : 0), a + 1]
    }
    let mistakes = p.mistakes
    if (!opts.correct && opts.mistake) {
      mistakes = [
        { ...opts.mistake, session: opts.session, los: opts.los, at: Date.now() },
        ...p.mistakes.filter((m) => m.key !== opts.mistake!.key),
      ].slice(0, 400)
    } else if (opts.correct && opts.mistake) {
      mistakes = p.mistakes.map((m) => (m.key === opts.mistake!.key ? { ...m, resolved: true } : m))
    }
    const d = isoDay()
    const studyDays = p.studyDays.includes(d) ? p.studyDays : [...p.studyDays, d]
    return { ...p, answers, loAccuracy, mistakes, studyDays }
  })
}

export function exportProgress(): string {
  return JSON.stringify({ app: 'strat402', exportedAt: new Date().toISOString(), progress: state }, null, 1)
}

export function importProgress(json: string): { ok: boolean; error?: string } {
  try {
    const parsed = JSON.parse(json)
    const prog = parsed?.progress ?? parsed
    if (!prog || typeof prog !== 'object' || !('answers' in prog)) return { ok: false, error: 'Not a STRAT 402 progress file.' }
    setProgress(() => migrate(prog))
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Could not read file.' }
  }
}

export function resetProgress() {
  setProgress(() => defaultProgress())
}

/** Current streak of consecutive study days ending today or yesterday. */
export function streak(days: string[]): number {
  const set = new Set(days)
  let n = 0
  const d = new Date()
  if (!set.has(isoDay(d))) d.setDate(d.getDate() - 1)
  while (set.has(isoDay(d))) {
    n++
    d.setDate(d.getDate() - 1)
  }
  return n
}
