import { useEffect, useMemo, useState } from 'react'
import type { Generator, ProblemPart } from '../content/types'
import { checkNumeric } from '../lib/answer'
import { newSeed } from '../lib/rng'
import { recordAnswer } from '../lib/store'
import { Cite } from './Cite'
import { Rich, RichInline } from './Rich'
import { plain } from './McqCard'

interface Props {
  gen: Generator
  seed?: number
  /** learn: check + steps; exam: inputs only, report answers. */
  mode?: 'learn' | 'exam'
  onResult?: (allCorrect: boolean) => void
  onAnswers?: (answers: string[]) => void
  allowNew?: boolean
  record?: boolean
  index?: number
  initialAnswers?: string[]
  /** Show graded state + steps immediately (results review). */
  reveal?: boolean
}

export function partCorrect(part: ProblemPart, input: string) {
  if (part.type === 'choice') return input !== '' && Number(input) === part.correct
  return checkNumeric(input, { answer: part.answer, kind: part.kind, tol: part.tol, abs: part.abs })
}

export function ProblemCard({ gen, seed: seedProp, mode = 'learn', onResult, onAnswers, allowNew = true, record = true, index, initialAnswers, reveal = false }: Props) {
  const [seed, setSeed] = useState(seedProp ?? newSeed())
  useEffect(() => {
    if (seedProp !== undefined) setSeed(seedProp)
  }, [seedProp])
  const p = useMemo(() => gen.make(seed), [gen, seed])
  const [inputs, setInputs] = useState<string[]>(() => initialAnswers ?? p.parts.map(() => ''))
  const [checked, setChecked] = useState(reveal)
  const [showSteps, setShowSteps] = useState(reveal)

  useEffect(() => {
    setInputs(initialAnswers ?? p.parts.map(() => ''))
    setChecked(reveal)
    setShowSteps(reveal)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p])

  const results = p.parts.map((part, i) => partCorrect(part, inputs[i]))
  const allOk = results.every(Boolean)

  const set = (i: number, v: string) => {
    const next = inputs.map((x, j) => (j === i ? v : x))
    setInputs(next)
    onAnswers?.(next)
  }
  const check = () => {
    setChecked(true)
    if (record)
      recordAnswer({
        id: `${gen.id}`,
        correct: allOk,
        los: gen.los,
        session: gen.session,
        mistake: { key: `${gen.id}:${seed}`, qid: gen.id, kind: 'gen', seed, summary: `${gen.title} — ${plain(p.prompt).slice(0, 110)}` },
      })
    onResult?.(allOk)
  }

  return (
    <div className="card p-4 md:p-5" data-testid="problem" data-gen={gen.id} data-seed={seed}>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {index !== undefined && <span className="chip">Q{index + 1}</span>}
        <span className="chip">Short answer</span>
        <span className="text-sm font-semibold">{p.title}</span>
        <Cite tag={p.src} />
      </div>
      <Rich>{p.prompt}</Rich>
      <ol className="mt-3 space-y-3">
        {p.parts.map((part, i) => (
          <li key={i} className="flex flex-col gap-1">
            <label className="text-sm font-medium" htmlFor={`p-${gen.id}-${seed}-${i}`}>
              ({String.fromCharCode(97 + i)}) <RichInline>{part.label}</RichInline>
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {part.type === 'num' ? (
                <input
                  id={`p-${gen.id}-${seed}-${i}`}
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  className={`w-44 ${checked ? (results[i] ? 'ok' : 'bad') : ''}`}
                  value={inputs[i]}
                  onChange={(e) => set(i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && mode === 'learn') check()
                  }}
                  placeholder={part.kind === 'percent' ? 'e.g. -12.5%' : part.kind === 'money' ? 'e.g. $1.19' : 'number'}
                  aria-invalid={checked && !results[i]}
                />
              ) : (
                <select
                  id={`p-${gen.id}-${seed}-${i}`}
                  className={checked ? (results[i] ? 'ok' : 'bad') : ''}
                  value={inputs[i]}
                  onChange={(e) => set(i, e.target.value)}
                >
                  <option value="">Choose…</option>
                  {part.options.map((o, oi) => (
                    <option key={oi} value={oi}>
                      {o}
                    </option>
                  ))}
                </select>
              )}
              {checked && mode === 'learn' && (
                <span className={results[i] ? 'verdict-ok text-sm' : 'verdict-bad text-sm'}>
                  {results[i] ? '✓ Correct' : `✗ Answer: ${part.type === 'num' ? fmtAnswer(part) : part.options[part.correct]}`}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
      {mode === 'learn' && (
        <div className="mt-4 flex flex-wrap gap-2">
          {!checked && (
            <button type="button" className="btn btn-primary" onClick={check}>
              Check
            </button>
          )}
          <button type="button" className="btn" onClick={() => setShowSteps((s) => !s)} aria-expanded={showSteps}>
            {showSteps ? 'Hide' : 'Show'} step-by-step
          </button>
          {allowNew && (
            <button type="button" className="btn btn-ghost" onClick={() => setSeed(newSeed())}>
              New numbers ↻
            </button>
          )}
        </div>
      )}
      {mode === 'learn' && showSteps && (
        <ol className="mt-3 space-y-2 list-decimal pl-6">
          {p.steps.map((s, i) => (
            <li key={i}>
              <Rich>{s}</Rich>
            </li>
          ))}
        </ol>
      )}
      <p className="text-xs muted mt-3">Accepts 0.25, 25%, $25, 1,631.47 and negatives. Tolerance ±1% unless noted.</p>
    </div>
  )
}

export function fmtAnswer(part: Extract<ProblemPart, { type: 'num' }>) {
  const v = part.answer
  if (part.kind === 'percent') return `${(v * 100).toLocaleString('en-US', { maximumFractionDigits: 2 })}%`
  if (part.kind === 'money') return `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  const abs = Math.abs(v)
  const digits = abs >= 1000 ? 0 : abs >= 10 ? 2 : abs >= 1 ? 3 : 4
  return v.toLocaleString('en-US', { maximumFractionDigits: digits }).replace('-', '−')
}
