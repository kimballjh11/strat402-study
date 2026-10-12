import { useState } from 'react'
import type { WorkedExample as WE } from '../content/types'
import { Cite } from './Cite'
import { Rich } from './Rich'

/** Steps revealed one at a time. "Try this step first" is the default; "Show step" comes second. */
export function WorkedExample({ ex }: { ex: WE }) {
  const [shown, setShown] = useState(0)
  const done = shown >= ex.steps.length
  return (
    <section className="card p-4 md:p-5" aria-labelledby={`we-${ex.id}`}>
      <div className="flex flex-wrap items-baseline gap-2">
        <h3 id={`we-${ex.id}`} className="text-lg font-semibold">
          {ex.title}
        </h3>
        <Cite tag={ex.src} />
      </div>
      <Rich className="mt-1">{ex.setup}</Rich>
      <ol className="mt-3 space-y-3">
        {ex.steps.map((s, i) => (
          <li key={i} className={`rounded-xl border line p-3 ${i > shown ? 'hidden' : ''}`}>
            <div className="text-xs font-bold uppercase tracking-wide muted">Step {i + 1} · Try this first</div>
            <Rich>{s.ask}</Rich>
            {i < shown ? (
              <div className="mt-2 pt-2 border-t line">
                <Rich>{s.show}</Rich>
              </div>
            ) : (
              <button type="button" className="btn btn-sm mt-2" onClick={() => setShown(i + 1)}>
                Show step
              </button>
            )}
          </li>
        ))}
      </ol>
      {done && (
        <div className="callout mt-3">
          <Rich>{ex.takeaway}</Rich>
        </div>
      )}
      {!done && shown > 0 && (
        <button type="button" className="btn btn-ghost btn-sm mt-2" onClick={() => setShown(ex.steps.length)}>
          Reveal all steps
        </button>
      )}
    </section>
  )
}
