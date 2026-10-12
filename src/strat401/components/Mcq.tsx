import { useEffect, useMemo, useState } from 'react'
import type { Mcq } from '../content/types'
import { hash, shuffled } from '../lib/format'
import { recordAnswer } from '../lib/store'
import { Cite } from './Cite'
import { R } from './Rich'

const KIND: Record<Mcq['kind'], string> = { concept: 'Concept', apply: 'Apply to a new case', case: 'Case', quant: 'Quick calc' }

/** One multiple-choice question; after checking, EVERY option shows why it is right or wrong. */
export function McqCard({ q, index, onResult, mode = 'learn', initial = null, reveal = false, record = true }: {
  q: Mcq
  index?: number
  onResult?: (ok: boolean, choice: number) => void
  mode?: 'learn' | 'exam'
  initial?: number | null
  reveal?: boolean
  record?: boolean
}) {
  const order = useMemo(() => shuffled(q.options.map((_, i) => i), hash(q.id)), [q])
  const [sel, setSel] = useState<number | null>(initial)
  const [checked, setChecked] = useState(reveal)
  useEffect(() => {
    setSel(initial)
    setChecked(reveal)
  }, [q.id, initial, reveal])

  const choose = (i: number) => {
    if (checked) return
    setSel(i)
    if (mode === 'exam') onResult?.(i === q.correct, i)
  }
  const check = () => {
    if (sel === null || checked) return
    setChecked(true)
    if (record) recordAnswer(q.id, sel === q.correct)
    onResult?.(sel === q.correct, sel)
  }
  return (
    <div className="card p-4 space-y-3" data-testid="mcq">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {index !== undefined && <span className="chip">Q{index + 1}</span>}
        <span className="chip">{KIND[q.kind]}</span>
        <Cite tag={q.src} />
      </div>
      <div className="font-medium">
        <R t={q.stem} />
      </div>
      <div className="space-y-2" role="group" aria-label="Answer options">
        {order.map((oi, k) => {
          const isSel = sel === oi
          const cls = checked ? (oi === q.correct ? 'ok' : isSel ? 'bad' : '') : ''
          return (
            <div key={oi}>
              <button type="button" className={`opt ${cls}`} aria-pressed={isSel} onClick={() => choose(oi)}>
                <span className="opt-key" aria-hidden>
                  {String.fromCharCode(65 + k)}
                </span>
                <span>
                  <R t={q.options[oi].text} />
                </span>
              </button>
              {checked && (
                <p className="text-sm muted mt-1 ml-9">
                  <strong>{oi === q.correct ? 'Why it’s right: ' : 'Why not: '}</strong>
                  <R t={q.options[oi].why} />
                </p>
              )}
            </div>
          )
        })}
      </div>
      {mode === 'learn' && !checked && (
        <button type="button" className="btn btn-primary" disabled={sel === null} onClick={check}>
          Check answer
        </button>
      )}
      {checked && (
        <p className={sel === q.correct ? 'verdict-ok' : 'verdict-bad'} role="status">
          {sel === q.correct ? '✓ Correct' : sel === null ? 'Answer shown' : '✗ Not quite — read why each option is right or wrong above.'}
        </p>
      )}
    </div>
  )
}

/** A run of MCQs with a score at the end (concept checks, practice sets). */
export function QuizRun({ qs, onDone, title }: { qs: Mcq[]; onDone?: (score: number) => void; title?: string }) {
  const [res, setRes] = useState<Record<string, boolean>>({})
  const done = Object.keys(res).length
  const right = Object.values(res).filter(Boolean).length
  useEffect(() => {
    if (done === qs.length && qs.length) onDone?.(right / qs.length)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done])
  return (
    <div className="space-y-4">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      {qs.map((q, i) => (
        <McqCard key={q.id} q={q} index={i} onResult={(ok) => setRes((r) => ({ ...r, [q.id]: ok }))} />
      ))}
      <div className="card p-4" role="status" data-testid="quiz-score">
        {done < qs.length ? (
          <span className="muted">
            Answered {done} of {qs.length}
          </span>
        ) : (
          <span className={right / qs.length >= 0.8 ? 'verdict-ok' : 'verdict-bad'}>
            Score: {right}/{qs.length} ({Math.round((100 * right) / qs.length)}%) {right / qs.length >= 0.8 ? '— mastered ✓' : '— below 80%; review the explanations and retry.'}
          </span>
        )}
      </div>
    </div>
  )
}
