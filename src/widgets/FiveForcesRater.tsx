import { useState } from 'react'
import { Cite } from '../components/Cite'
import { band, caseFacts, forceScore, itemKey, professorRatings, solution } from '../content/data/fiveforces'
import { num } from '../lib/format'
import { recordAnswer } from '../lib/store'

const prof = professorRatings()

/** Rate each sub-factor for the self-storage case, see force and overall scores, then compare with the professor's solution. */
export default function FiveForcesRater() {
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [open, setOpen] = useState(0)
  const [reveal, setReveal] = useState(false)
  const scores = solution.forces.map((f, fi) => forceScore(f, fi, ratings))
  const rated = scores.filter((s): s is number => s !== null)
  const overall = rated.length === 5 ? rated.reduce((a, b) => a + b, 0) / 5 : null
  const total = Object.keys(prof).length
  const done = Object.keys(ratings).length
  const close = Object.entries(ratings).filter(([k, v]) => Math.abs(v - prof[k]) <= 1).length

  const scaleBtns = (key: string, scale: (string | number | null)[]) => (
    <div className="flex flex-wrap gap-1 mt-1" role="radiogroup" aria-label="Rating 1 to 5">
      {[1, 2, 3, 4, 5].map((v) => {
        const lab = scale[v - 1]
        const isProf = reveal && prof[key] === v
        const isMine = ratings[key] === v
        return (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={isMine}
            className={`btn btn-sm min-w-12 ${isMine ? 'btn-primary' : ''}`}
            style={isProf ? { outline: '3px solid var(--ok)', outlineOffset: 1 } : undefined}
            onClick={() => setRatings((r) => ({ ...r, [key]: v }))}
            title={isProf ? 'Professor’s rating' : undefined}
          >
            {v}
            {lab !== null && lab !== undefined && <span className="text-[10px] ml-1 opacity-80">{typeof lab === 'number' ? `${Math.round(lab * 100)}%` : lab}</span>}
            {isProf && <span className="sr-only"> (professor’s rating)</span>}
          </button>
        )
      })}
    </div>
  )

  return (
    <div className="space-y-3" data-testid="five-forces">
      <p className="text-sm">
        <strong>Case: {solution.industry}.</strong> Rate every factor from 1 (least attractive for incumbents) to 5 (most attractive), using the evidence. Scores use the same weighted averages as the Five Forces Strategy Excel Tool. <Cite tag="S04 Solution, Five Forces; Calculations Hub" />
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-xs" aria-live="polite">
        {solution.forces.map((f, fi) => (
          <button key={f.name} type="button" className={`rounded-xl border line px-2 py-2 text-left ${open === fi ? 'surface-2' : ''}`} onClick={() => setOpen(fi)} aria-pressed={open === fi}>
            <div className="muted">{f.name}</div>
            <div className="text-base font-bold tabular-nums">{scores[fi] === null ? '—' : num(scores[fi]!, 2)}</div>
            {reveal && <div className="verdict-ok">prof {num(f.score, 2)}</div>}
          </button>
        ))}
        <div className="rounded-xl border line px-2 py-2">
          <div className="muted">Overall</div>
          <div className="text-base font-bold tabular-nums">{overall === null ? '—' : num(overall, 2)}</div>
          {reveal && <div className="verdict-ok">prof {num(solution.overall, 2)}</div>}
        </div>
      </div>
      {(() => {
        const f = solution.forces[open]
        return (
          <section className="card p-4 space-y-3" aria-label={f.name}>
            <h4 className="font-semibold text-lg">
              {f.name} {scores[open] !== null && <span className="text-sm muted">→ your score {num(scores[open]!, 2)} ({band(scores[open]!)})</span>}
            </h4>
            <details className="text-sm" open>
              <summary className="cursor-pointer font-medium">Evidence (IBISWorld figures via the professor’s solution)</summary>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                {caseFacts[f.name]?.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </details>
            <ol className="space-y-3">
              {f.components.map((c, ci) => (
                <li key={ci}>
                  <div className="font-medium text-sm">
                    {ci + 1}. {c.label} <span className="muted text-xs">(weight {c.weight})</span>
                  </div>
                  {c.subs.length === 0 ? (
                    <>
                      {scaleBtns(itemKey(open, ci), c.scale)}
                      {reveal && c.note && <p className="text-xs muted mt-1 whitespace-pre-line">Professor: {c.note}</p>}
                    </>
                  ) : (
                    <ol className="pl-4 mt-1 space-y-2">
                      {c.subs.map((s, si) => (
                        <li key={si}>
                          <div className="text-sm">
                            {ci + 1}.{si + 1} {s.label} <span className="muted text-xs">(sub-weight {s.weight})</span>
                          </div>
                          {scaleBtns(itemKey(open, ci, si), s.scale)}
                          {reveal && s.note && <p className="text-xs muted mt-1 whitespace-pre-line">Professor: {s.note}</p>}
                        </li>
                      ))}
                    </ol>
                  )}
                </li>
              ))}
            </ol>
          </section>
        )
      })()}
      <div className="flex flex-wrap gap-2 items-center">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setReveal(true)
            if (done) recordAnswer({ id: 's04-w-fiveforces', correct: close / done >= 0.7, los: ['S04-LO3'], session: 'S04' })
          }}
        >
          Compare with the professor’s solution
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => (setRatings({}), setReveal(false))}>
          Reset
        </button>
        <span className="text-sm muted">
          {done}/{total} rated{reveal && done ? ` · ${close} within ±1 of the professor` : ''}
        </span>
      </div>
      {reveal && (
        <p className="callout text-sm">
          Professor: rivalry {num(solution.forces[0].score, 2)}, buyer power {num(solution.forces[1].score, 2)}, supplier power {num(solution.forces[2].score, 2)}, new entrants {num(solution.forces[3].score, 2)}, substitutes {num(solution.forces[4].score, 2)} → overall <strong>{num(solution.overall, 2)}</strong> ({band(solution.overall)}). Green outlines mark the professor’s rating for each factor. Debrief lessons: rate growth on the <em>forward</em> rate (−0.1%); market segments are not buyers (buyer concentration = 5); households have no “profit” (0–5%). <Cite tag="S05 slides pp.7-9" />
        </p>
      )}
    </div>
  )
}
