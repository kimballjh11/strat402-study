import { useState } from 'react'
import type { ColdCall } from '../content/types'
import { NoteBox } from './Note'
import { R } from './Rich'
import { SelfRate } from './SelfRate'

const LEVELS: ColdCall['level'][] = ['Facts', 'Analysis', 'Judgment', 'Action']

/** The professor turns to you. Answer first (out loud or in the box), then compare. */
export function ColdCallSim({ session, calls }: { session: string; calls: ColdCall[] }) {
  const [i, setI] = useState(0)
  const [shown, setShown] = useState(false)
  const c = calls[i]
  const go = (n: number) => (setI(n), setShown(false))
  return (
    <div className="space-y-3" data-testid="coldcalls">
      <div className="flex flex-wrap gap-1" role="tablist" aria-label="Cold-call questions">
        {calls.map((x, k) => (
          <button key={x.id} type="button" role="tab" aria-selected={k === i} className="btn btn-sm" onClick={() => go(k)} style={k === i ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : undefined}>
            {k + 1}
          </button>
        ))}
      </div>
      <div className="card p-4 space-y-3" role="tabpanel">
        <div className="flex gap-2 items-center flex-wrap">
          <span className="chip">
            Cold call {i + 1}/{calls.length}
          </span>
          <span className="chip">
            Level {LEVELS.indexOf(c.level) + 1}: {c.level}
          </span>
        </div>
        <p className="text-lg font-serif">
          “<R t={c.q} />”
        </p>
        <NoteBox id={`cc-${session}-${c.id}`} label="Your answer (say it out loud first, then jot the skeleton)" rows={3} />
        {!shown ? (
          <button type="button" className="btn btn-primary" onClick={() => setShown(true)}>
            Show the model answer
          </button>
        ) : (
          <div className="space-y-3">
            <div className="callout">
              <div className="font-semibold">Strong answer</div>
              <R t={c.model} />
            </div>
            <div className="callout" style={{ borderLeftColor: 'var(--bad)' }}>
              <div className="font-semibold">Common weak answer</div>
              <p>
                “<R t={c.weak} />”
              </p>
              <p className="text-sm mt-1">
                <strong>Why it falls short: </strong>
                <R t={c.whyWeak} />
              </p>
            </div>
            <SelfRate id={`cc-${session}-${c.id}`} />
          </div>
        )}
        <div className="flex justify-between">
          <button type="button" className="btn btn-sm" disabled={i === 0} onClick={() => go(i - 1)}>
            ← Previous
          </button>
          <button type="button" className="btn btn-sm" disabled={i === calls.length - 1} onClick={() => go(i + 1)}>
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
