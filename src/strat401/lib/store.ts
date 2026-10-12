import { useSyncExternalStore } from 'react'
import { isoDay } from './format'

/** All STRAT 401 progress lives under ONE versioned key, separate from STRAT 402. */
export const STORAGE_KEY = 'strat401-progress-v1'
export const STATE_VERSION = 1

export interface Answer { attempts: number; correct: number; last: boolean; at: number }
export interface Card { box: number; due: string }
export type Rating = 'nailed' | 'partial' | 'missed'

export interface Progress401 {
  version: number
  examDate: string
  answers: Record<string, Answer> // MCQ id -> record
  gut: Record<string, string> // session -> gut answer to the Key Question
  visited: Record<string, string[]> // session -> screen ids seen
  mastery: Record<string, { best: number; passed: boolean }>
  confidence: Record<string, number> // session -> 1..5
  cards: Record<string, Card>
  recall: Record<string, Record<string, boolean>> // drill id -> item -> recalled
  ratings: Record<string, Rating> // cold call / oral / written id -> self rating
  notes: Record<string, string> // free text the student wrote (pyramids, tools, cold calls)
  tools: Record<string, unknown> // widget state
  exams: { at: number; score: number; total: number; minutes: number }[]
  studyDays: string[]
}

export function defaultProgress(): Progress401 {
  return {
    version: STATE_VERSION,
    examDate: '',
    answers: {},
    gut: {},
    visited: {},
    mastery: {},
    confidence: {},
    cards: {},
    recall: {},
    ratings: {},
    notes: {},
    tools: {},
    exams: [],
    studyDays: [],
  }
}

function migrate(raw: unknown): Progress401 {
  const base = defaultProgress()
  if (!raw || typeof raw !== 'object') return base
  return { ...base, ...(raw as Partial<Progress401>), version: STATE_VERSION }
}

function load(): Progress401 {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    return s ? migrate(JSON.parse(s)) : defaultProgress()
  } catch {
    return defaultProgress()
  }
}

let state = load()
const listeners = new Set<() => void>()

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* storage blocked: progress lives in memory for this visit */
  }
}

export function getProgress() {
  return state
}
export function setProgress(fn: (p: Progress401) => Progress401) {
  state = fn(state)
  persist()
  listeners.forEach((l) => l())
}
export function useP<T>(select: (p: Progress401) => T): T {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => select(state),
  )
}

function touchDay(p: Progress401): Progress401 {
  const d = isoDay()
  return p.studyDays.includes(d) ? p : { ...p, studyDays: [...p.studyDays, d] }
}

export function recordAnswer(id: string, correct: boolean) {
  setProgress((p) => {
    const prev = p.answers[id] ?? { attempts: 0, correct: 0, last: false, at: 0 }
    return touchDay({
      ...p,
      answers: { ...p.answers, [id]: { attempts: prev.attempts + 1, correct: prev.correct + (correct ? 1 : 0), last: correct, at: Date.now() } },
    })
  })
}
export const setNote = (id: string, text: string) => setProgress((p) => ({ ...p, notes: { ...p.notes, [id]: text } }))
export const setRating = (id: string, r: Rating) => setProgress((p) => touchDay({ ...p, ratings: { ...p.ratings, [id]: r } }))
export const setTool = (id: string, v: unknown) => setProgress((p) => ({ ...p, tools: { ...p.tools, [id]: v } }))
export function markVisited(session: string, screen: string) {
  const seen = state.visited[session] ?? []
  if (seen.includes(screen)) return
  setProgress((p) => touchDay({ ...p, visited: { ...p.visited, [session]: [...(p.visited[session] ?? []), screen] } }))
}
export function setRecall(drill: string, item: string, ok: boolean) {
  setProgress((p) => touchDay({ ...p, recall: { ...p.recall, [drill]: { ...(p.recall[drill] ?? {}), [item]: ok } } }))
}
export function recordMastery(session: string, score: number) {
  setProgress((p) => {
    const prev = p.mastery[session]
    const best = Math.max(prev?.best ?? 0, score)
    return touchDay({ ...p, mastery: { ...p.mastery, [session]: { best, passed: best >= 0.8 } } })
  })
}

export function exportProgress() {
  return JSON.stringify({ app: 'strat401', exportedAt: new Date().toISOString(), progress: state }, null, 1)
}
export function importProgress(json: string): { ok: boolean; error?: string } {
  try {
    const parsed = JSON.parse(json)
    if (parsed?.app && parsed.app !== 'strat401') return { ok: false, error: 'That file is from a different course (not STRAT 401).' }
    const prog = parsed?.progress ?? parsed
    if (!prog || typeof prog !== 'object' || !('answers' in prog) || !('gut' in prog)) return { ok: false, error: 'Not a STRAT 401 progress file.' }
    setProgress(() => migrate(prog))
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Could not read file.' }
  }
}
export const resetProgress = () => setProgress(() => defaultProgress())

/** Leitner boxes 1..5 with intervals in days. */
export const INTERVALS = [0, 1, 2, 4, 8]
export function reviewCard(id: string, knewIt: boolean) {
  setProgress((p) => {
    const prev = p.cards[id]
    const box = knewIt ? Math.min(5, (prev?.box ?? 1) + 1) : 1
    const due = new Date()
    due.setDate(due.getDate() + INTERVALS[box - 1])
    return touchDay({ ...p, cards: { ...p.cards, [id]: { box, due: isoDay(due) } } })
  })
}
/** Stable empty fallbacks so useP selectors don't return a fresh object every render. */
export const NONE_OBJ: Record<string, never> = Object.freeze({}) as Record<string, never>
export const NONE_ARR: never[] = Object.freeze([]) as unknown as never[]

export const isDue = (c: Card | undefined, today = isoDay()) => !c || c.due <= today
