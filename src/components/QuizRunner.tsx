import { useEffect, useMemo, useState } from 'react'
import { generatorById, mcqById, sessionById } from '../content'
import type { Generator, Mcq, ScreenKey, SessionId } from '../content/types'
import { recordAnswer } from '../lib/store'
import { McqCard, plain } from './McqCard'
import { ProblemCard, partCorrect } from './ProblemCard'

export type QuizItem = { kind: 'mcq'; id: string } | { kind: 'gen'; id: string; seed: number }

export interface QuizResult {
  score: number
  total: number
  bySession: Record<string, [number, number]>
  byLo: Record<string, [number, number]>
  correct: boolean[]
  minutes: number
}

const SCREEN_LABEL: Record<ScreenKey, string> = {
  why: 'Why this matters',
  intuition: 'Intuition',
  terms: 'Key terms',
  math: 'The math',
  examples: 'Worked examples',
  widgets: 'Interactives',
  check: 'Check yourself',
  apply: 'Apply it',
  traps: 'Common traps',
  explain: 'Explain it back',
  deeper: 'Go deeper',
  mastery: 'Mastery check',
  summary: 'Summary',
}
export const screenLabel = (k: ScreenKey) => SCREEN_LABEL[k]

interface Props {
  items: QuizItem[]
  title: string
  /** Minutes; omit for untimed. */
  timeLimit?: number
  onFinish?: (r: QuizResult) => void
  /** Show "review this screen" links for misses. */
  reviewLinks?: boolean
  passMark?: number
}

function itemMeta(it: QuizItem): { session: SessionId; los: string[]; screen?: ScreenKey; mcq?: Mcq; gen?: Generator } {
  if (it.kind === 'mcq') {
    const q = mcqById[it.id]
    return { session: q.session, los: q.los, screen: q.screen, mcq: q }
  }
  const g = generatorById[it.id]
  return { session: g.session, los: g.los, screen: g.screen ?? 'apply', gen: g }
}

/** Exam-style runner: no hints or feedback until submit; flag-for-review; optional timer. */
export function QuizRunner({ items, title, timeLimit, onFinish, reviewLinks, passMark }: Props) {
  const [i, setI] = useState(0)
  const [mcqAns, setMcqAns] = useState<Record<number, number>>({})
  const [genAns, setGenAns] = useState<Record<number, string[]>>({})
  const [flags, setFlags] = useState<Record<number, boolean>>({})
  const [result, setResult] = useState<QuizResult | null>(null)
  const [start] = useState(() => Date.now())
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (!timeLimit || result) return
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [timeLimit, result])
  const remaining = timeLimit ? Math.max(0, timeLimit * 60 - Math.floor((now - start) / 1000)) : null

  const answered = (k: number) => (items[k].kind === 'mcq' ? mcqAns[k] !== undefined : (genAns[k] ?? []).some((x) => x !== ''))

  const submit = () => {
    const correct = items.map((it, k) => {
      const m = itemMeta(it)
      if (it.kind === 'mcq') return mcqAns[k] === m.mcq!.correct
      const p = m.gen!.make(it.seed)
      const ans = genAns[k] ?? []
      return p.parts.every((part, pi) => partCorrect(part, ans[pi] ?? ''))
    })
    const bySession: Record<string, [number, number]> = {}
    const byLo: Record<string, [number, number]> = {}
    items.forEach((it, k) => {
      const m = itemMeta(it)
      const s = (bySession[m.session] ??= [0, 0])
      s[0] += correct[k] ? 1 : 0
      s[1]++
      for (const lo of m.los) {
        const l = (byLo[lo] ??= [0, 0])
        l[0] += correct[k] ? 1 : 0
        l[1]++
      }
      recordAnswer({
        id: it.kind === 'mcq' ? it.id : it.id,
        correct: correct[k],
        los: m.los,
        session: m.session,
        mistake:
          it.kind === 'mcq'
            ? { key: it.id, qid: it.id, kind: 'mcq', summary: plain(m.mcq!.stem).slice(0, 140) }
            : { key: `${it.id}:${it.seed}`, qid: it.id, kind: 'gen', seed: it.seed, summary: m.gen!.title },
      })
    })
    const r: QuizResult = {
      score: correct.filter(Boolean).length,
      total: items.length,
      bySession,
      byLo,
      correct,
      minutes: Math.round((Date.now() - start) / 60000),
    }
    setResult(r)
    onFinish?.(r)
    window.scrollTo({ top: 0 })
  }

  useEffect(() => {
    if (remaining === 0 && !result) submit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining])

  const it = items[i]
  const meta = useMemo(() => (it ? itemMeta(it) : null), [it])

  if (result) {
    const pctScore = result.score / Math.max(1, result.total)
    const passed = passMark !== undefined ? pctScore >= passMark : undefined
    return (
      <div className="space-y-4" data-testid="quiz-results">
        <div className="card p-5">
          <h2 className="text-2xl font-semibold">{title}: results</h2>
          <p className="text-3xl font-bold mt-2 tabular-nums">
            {result.score}/{result.total} · {Math.round(pctScore * 100)}%
          </p>
          {passed !== undefined && (
            <p className={passed ? 'verdict-ok' : 'verdict-bad'}>
              {passed ? 'Mastered — 80% or better.' : `Not yet — mastery needs ${Math.round(passMark! * 100)}%. Review the screens linked below, then retake.`}
            </p>
          )}
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="font-semibold mb-1">By session</h3>
              <ul className="text-sm space-y-1">
                {Object.entries(result.bySession).map(([s, [c, t]]) => (
                  <li key={s}>
                    <span className="font-medium">{sessionById[s as SessionId]?.title ?? s}</span>: {c}/{t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-1">By learning objective</h3>
              <ul className="text-sm space-y-1">
                {Object.entries(result.byLo).map(([lo, [c, t]]) => (
                  <li key={lo}>
                    <span className="font-medium">{lo}</span>: {c}/{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-sm muted mt-3">Every miss was added to your Mistake Log.</p>
        </div>
        {items.map((it2, k) => {
          const m = itemMeta(it2)
          return (
            <div key={k}>
              <div className="flex items-center gap-2 mb-1 text-sm">
                <span className={result.correct[k] ? 'verdict-ok' : 'verdict-bad'}>{result.correct[k] ? '✓' : '✗'}</span>
                <span>Question {k + 1}</span>
                {flags[k] && <span className="chip">flagged</span>}
                {reviewLinks && !result.correct[k] && m.screen && (
                  <a className="underline text-sm" href={`#/learn/${m.session}?screen=${m.screen}`}>
                    Review: {SCREEN_LABEL[m.screen]} ({m.session})
                  </a>
                )}
              </div>
              {it2.kind === 'mcq' ? (
                <McqCard q={m.mcq!} reveal record={false} initialChoice={mcqAns[k] ?? null} index={k} />
              ) : (
                <ProblemCard gen={m.gen!} seed={it2.seed} reveal record={false} allowNew={false} initialAnswers={genAns[k] ?? m.gen!.make(it2.seed).parts.map(() => '')} index={k} />
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-4" data-testid="quiz-runner">
      <div className="card p-3 flex flex-wrap items-center gap-3 sticky top-14 z-10">
        <strong className="mr-auto">{title}</strong>
        {remaining !== null && (
          <span className={`chip tabular-nums ${remaining < 300 ? 'verdict-bad' : ''}`} aria-live="off" data-testid="timer">
            ⏱ {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, '0')}
          </span>
        )}
        <span className="chip">
          {items.filter((_, k) => answered(k)).length}/{items.length} answered
        </span>
        <button type="button" className="btn btn-primary btn-sm" onClick={submit} data-testid="submit-quiz">
          Submit
        </button>
      </div>
      <nav aria-label="Questions" className="flex flex-wrap gap-1.5">
        {items.map((_, k) => (
          <button
            key={k}
            type="button"
            onClick={() => setI(k)}
            className={`btn btn-sm min-w-10 ${k === i ? 'btn-primary' : ''}`}
            aria-current={k === i}
            aria-label={`Question ${k + 1}${answered(k) ? ', answered' : ''}${flags[k] ? ', flagged' : ''}`}
          >
            {k + 1}
            {flags[k] ? '⚑' : answered(k) ? '•' : ''}
          </button>
        ))}
      </nav>
      {meta && it.kind === 'mcq' && (
        <McqCard key={`m${i}`} q={meta.mcq!} mode="exam" record={false} index={i} initialChoice={mcqAns[i] ?? null} onChoose={(c) => setMcqAns((a) => ({ ...a, [i]: c }))} autoFocus />
      )}
      {meta && it.kind === 'gen' && (
        <ProblemCard
          key={`g${i}`}
          gen={meta.gen!}
          seed={it.seed}
          mode="exam"
          record={false}
          allowNew={false}
          index={i}
          initialAnswers={genAns[i]}
          onAnswers={(a) => setGenAns((g) => ({ ...g, [i]: a }))}
        />
      )}
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn" onClick={() => setI((k) => Math.max(0, k - 1))} disabled={i === 0}>
          ← Previous
        </button>
        <button type="button" className="btn" onClick={() => setFlags((f) => ({ ...f, [i]: !f[i] }))} aria-pressed={!!flags[i]}>
          {flags[i] ? '⚑ Flagged' : '⚐ Flag for review'}
        </button>
        <button type="button" className="btn btn-primary" onClick={() => setI((k) => Math.min(items.length - 1, k + 1))} disabled={i === items.length - 1}>
          Next →
        </button>
      </div>
    </div>
  )
}
