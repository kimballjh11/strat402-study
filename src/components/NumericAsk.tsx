import { useState } from 'react'
import type { NumericPart } from '../content/types'
import { checkNumeric } from '../lib/answer'
import { recordAnswer } from '../lib/store'
import { Cite } from './Cite'
import { RichInline } from './Rich'
import { fmtAnswer } from './ProblemCard'

/** A single numeric question attached to a widget. */
export function NumericAsk({ id, label, part, hint, src, session, los }: { id: string; label: string; part: NumericPart; hint: string; src: string; session: string; los: string[] }) {
  const [v, setV] = useState('')
  const [res, setRes] = useState<null | boolean>(null)
  const [showHint, setShowHint] = useState(false)
  const check = () => {
    const ok = checkNumeric(v, { answer: part.answer, kind: part.kind, tol: part.tol, abs: part.abs })
    setRes(ok)
    recordAnswer({ id, correct: ok, los, session, mistake: { key: id, qid: id, kind: 'mcq', summary: label.slice(0, 120) } })
  }
  return (
    <div className="rounded-xl border line p-3" data-testid="numeric-ask">
      <p className="font-medium">
        <RichInline>{label}</RichInline> <Cite tag={src} />
      </p>
      <div className="flex flex-wrap gap-2 items-center mt-2">
        <label className="sr-only" htmlFor={`na-${id}`}>
          {part.label}
        </label>
        <input
          id={`na-${id}`}
          type="text"
          inputMode="decimal"
          className={`w-40 ${res === null ? '' : res ? 'ok' : 'bad'}`}
          value={v}
          onChange={(e) => {
            setV(e.target.value)
            setRes(null)
          }}
          onKeyDown={(e) => e.key === 'Enter' && check()}
          placeholder={part.label}
        />
        <button type="button" className="btn btn-primary btn-sm" onClick={check} disabled={!v.trim()}>
          Check
        </button>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setShowHint((h) => !h)}>
          Hint
        </button>
        {res !== null && <span className={res ? 'verdict-ok' : 'verdict-bad'}>{res ? '✓ Correct' : `✗ Answer: ${fmtAnswer(part)}`}</span>}
      </div>
      {showHint && (
        <p className="text-sm muted mt-2">
          <RichInline>{hint}</RichInline>
        </p>
      )}
    </div>
  )
}
