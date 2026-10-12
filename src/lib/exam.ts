import { allLos, generators, mcqs } from '../content'
import type { QuizItem } from '../components/QuizRunner'
import { Rng } from './rng'

/**
 * Practice exam: conceptual MC weighted toward the quiz-style questions, short answers from the
 * spreadsheet-style generators, spread across sessions. Every regeneration uses new numbers.
 */
export function buildExam(seed: number, nMc = 30, nSa = 6): QuizItem[] {
  const g = new Rng(seed)
  const quizLike = g.shuffle(mcqs.filter((q) => q.origin === 'cq' || q.origin === 'cq-variant'))
  const other = g.shuffle(mcqs.filter((q) => q.origin !== 'cq' && q.origin !== 'cq-variant'))
  // ~60% quiz-style when available; round-robin across sessions for coverage
  const pickSpread = <T extends { session: string }>(xs: T[], n: number) => {
    const bySession = new Map<string, T[]>()
    xs.forEach((x) => bySession.set(x.session, [...(bySession.get(x.session) ?? []), x]))
    const lanes = g.shuffle([...bySession.values()])
    const out: T[] = []
    for (let r = 0; out.length < n && lanes.some((l) => l.length > r); r++) for (const l of lanes) if (l[r] && out.length < n) out.push(l[r])
    return out
  }
  const nQuiz = Math.min(quizLike.length, Math.round(nMc * 0.6))
  const mc = [...pickSpread(quizLike, nQuiz), ...pickSpread(other, nMc - nQuiz)]
  if (mc.length < nMc) mc.push(...pickSpread(quizLike.filter((q) => !mc.includes(q)), nMc - mc.length))
  const gens = pickSpread(g.shuffle(generators), Math.min(nSa, generators.length))
  while (gens.length < nSa && generators.length) gens.push(g.pick(generators))
  return [
    ...mc.map((q) => ({ kind: 'mcq' as const, id: q.id })),
    ...gens.map((x) => ({ kind: 'gen' as const, id: x.id, seed: g.int(1, 2 ** 30) })),
  ]
}

/** 15-minute diagnostic: one question per learning objective that has content. */
export function buildDiagnostic(seed: number): QuizItem[] {
  const g = new Rng(seed)
  const items: QuizItem[] = []
  for (const lo of allLos) {
    const qs = mcqs.filter((q) => q.los.includes(lo.id))
    const gs = generators.filter((x) => x.los.includes(lo.id))
    if (qs.length && (g.bool(0.75) || !gs.length)) items.push({ kind: 'mcq', id: g.pick(qs).id })
    else if (gs.length) items.push({ kind: 'gen', id: g.pick(gs).id, seed: g.int(1, 2 ** 30) })
  }
  // de-duplicate and cap at 15 questions
  const seen = new Set<string>()
  return items.filter((it) => (seen.has(it.id) ? false : (seen.add(it.id), true))).slice(0, 15)
}
