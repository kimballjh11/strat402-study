import { useEffect, useMemo, useRef, useState } from 'react'
import type { Mcq } from '../content/types'
import { Rng } from '../lib/rng'
import { recordAnswer } from '../lib/store'
import { Cite } from './Cite'
import { Rich, RichInline } from './Rich'

export function OriginChip({ origin }: { origin: Mcq['origin'] }) {
  if (origin === 'cq') return <span className="chip" style={{ color: 'var(--accent)' }}>★ From your quizzes</span>
  if (origin === 'cq-variant') return <span className="chip">Variant of a quiz question</span>
  if (origin === 'course') return <span className="chip">From course materials</span>
  return <span className="chip">Practice</span>
}

interface Props {
  q: Mcq
  /** learn: instant feedback + recorded; exam: no feedback, reports choice. */
  mode?: 'learn' | 'exam'
  shuffleSeed?: number
  onResult?: (correct: boolean, choice: number) => void
  onChoose?: (choice: number) => void
  initialChoice?: number | null
  autoFocus?: boolean
  record?: boolean
  index?: number
  /** Show graded state immediately (results review). */
  reveal?: boolean
}

export function McqCard({ q, mode = 'learn', shuffleSeed, onResult, onChoose, initialChoice = null, autoFocus, record = true, index, reveal = false }: Props) {
  // Keep the professor's order for verbatim quiz questions; shuffle everything else.
  const order = useMemo(() => {
    const idx = q.options.map((_, i) => i)
    return q.origin === 'cq' ? idx : new Rng(shuffleSeed ?? hash(q.id)).shuffle(idx)
  }, [q, shuffleSeed])
  const [sel, setSel] = useState<number | null>(initialChoice)
  const [checked, setChecked] = useState(reveal)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSel(initialChoice)
    setChecked(reveal)
  }, [q.id, initialChoice, reveal])
  useEffect(() => {
    if (autoFocus) ref.current?.focus()
  }, [autoFocus, q.id])

  const choose = (orig: number) => {
    if (checked) return
    setSel(orig)
    onChoose?.(orig)
  }
  const check = () => {
    if (sel === null || checked || mode === 'exam') return
    setChecked(true)
    const ok = sel === q.correct
    if (record)
      recordAnswer({
        id: q.id,
        correct: ok,
        los: q.los,
        session: q.session,
        mistake: { key: q.id, qid: q.id, kind: 'mcq', summary: plain(q.stem).slice(0, 140) },
      })
    onResult?.(ok, sel)
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
    const n = Number(e.key)
    if (n >= 1 && n <= order.length) {
      e.preventDefault()
      choose(order[n - 1])
    } else if (e.key === 'Enter' && mode === 'learn' && !checked) {
      e.preventDefault()
      check()
    }
  }

  const ok = checked && sel === q.correct
  return (
    <div ref={ref} tabIndex={-1} onKeyDown={onKey} className="card p-4 md:p-5 outline-none" data-testid="mcq" data-qid={q.id}>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {index !== undefined && <span className="chip">Q{index + 1}</span>}
        <OriginChip origin={q.origin} />
        <Cite tag={q.src} />
      </div>
      <Rich className="font-medium">{q.stem}</Rich>
      <div className="grid gap-2 mt-3" role="group" aria-label="Answer choices">
        {order.map((orig, i) => {
          const isSel = sel === orig
          const cls = checked ? (orig === q.correct ? 'ok' : isSel ? 'bad' : '') : ''
          return (
            <button key={orig} type="button" className={`opt ${cls}`} aria-pressed={isSel} onClick={() => choose(orig)}>
              <span className="opt-key" aria-hidden>{i + 1}</span>
              <span className="flex-1">
                <RichInline>{q.options[orig].text}</RichInline>
                {checked && orig === q.correct && <span className="sr-only"> (correct answer)</span>}
                {checked && isSel && orig !== q.correct && <span className="sr-only"> (your answer, incorrect)</span>}
              </span>
              {checked && orig === q.correct && <span aria-hidden className="verdict-ok">✓</span>}
              {checked && isSel && orig !== q.correct && <span aria-hidden className="verdict-bad">✗</span>}
            </button>
          )
        })}
      </div>
      {mode === 'learn' && !checked && (
        <div className="mt-3 flex items-center gap-3">
          <button type="button" className="btn btn-primary" onClick={check} disabled={sel === null}>
            Check
          </button>
          <span className="text-xs muted hidden sm:inline">Keys 1–{order.length} to choose, Enter to check</span>
        </div>
      )}
      {checked && (
        <div className="mt-4" aria-live="polite">
          <p className={ok ? 'verdict-ok' : 'verdict-bad'}>{ok ? 'Correct.' : sel === null ? 'Not answered.' : 'Not quite.'}</p>
          <ul className="mt-2 space-y-2">
            {order.map((orig, i) => (
              <li key={orig} className={`text-sm rounded-lg p-2 ${orig === q.correct ? 'surface-2' : ''}`}>
                <span className="font-semibold">
                  {i + 1}. {orig === q.correct ? '' : 'Why not: '}
                </span>
                <RichInline>{q.options[orig].why}</RichInline>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export function hash(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}

export function plain(rich: string) {
  return rich
    .replace(/\[\[.*?\]\]/g, '')
    .replace(/\\\(|\\\)|\\\[|\\\]/g, '')
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}
