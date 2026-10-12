import { useState } from 'react'
import { Waterfall } from '../components/Charts'
import { Cite, SiteBadge } from '../components/Cite'
import { BREADTH_MOVES, BUCKETS, OBSERVED_GAP, remainingGap, sumPoints, type Breadth, type Nature } from '../lib/aldi'
import { num } from '../lib/format'
import { setTool, useP } from '../lib/store'

interface Est { points: Record<string, number>; nature: Record<string, Nature | ''>; breadth: Record<string, Breadth | ''> }
const BLANK: Est = { points: Object.fromEntries(BUCKETS.map((b) => [b.id, 0])), nature: {}, breadth: {} }
const NATURES: Nature[] = ['Scale / process', 'Structure (assortment & format)', 'Refusal']
const BREADTHS: Breadth[] = ['Travels with breadth', 'Depends on staying narrow', 'At risk from breadth']

/** Run the value chain on Aldi: estimate where the ~20-point gap comes from, classify each source, then compare with the professor. */
export function AldiGapTool() {
  const est = useP((p) => (p.tools['aldi-est'] as Est | undefined) ?? BLANK)
  const [revealed, setRevealed] = useState(false)
  const [moves, setMoves] = useState<Record<string, boolean>>({})
  const [severity, setSeverity] = useState(1)
  const put = (e: Est) => setTool('aldi-est', e)
  const yours = BUCKETS.map((b) => ({ label: b.label, points: est.points[b.id] ?? 0 }))
  const yourTotal = sumPoints(yours)
  const after = remainingGap(moves, severity)
  const matches = BUCKETS.filter((b) => est.nature[b.id] === b.nature).length

  return (
    <div className="space-y-4" data-testid="aldi-tool">
      <ol className="list-decimal pl-5 text-sm space-y-1">
        <li>A conventional grocer’s basket = 100. Aldi’s is about 80 — a gap of {OBSERVED_GAP} points <Cite tag="S8 slides 3" />.</li>
        <li>Split that gap across the cost buckets: how many points does each one explain? Aim for your total to land near {OBSERVED_GAP}.</li>
        <li>Classify each bucket (scale/process vs. structure vs. refusal) and say whether it survives a move to broad scope <Cite tag="Aldi Ex.3" />.</li>
        <li>Reveal the professor’s estimate, then stress-test what breadth does to the gap.</li>
      </ol>
      <div className="space-y-2">
        {BUCKETS.map((b) => (
          <div key={b.id} className="card p-3 grid gap-2 md:grid-cols-[9rem_1fr_11rem_11rem] md:items-center">
            <div className="font-semibold text-sm">
              {b.label}
              <div className="text-xs muted font-normal">{b.link}</div>
            </div>
            <label className="text-sm">
              <span className="sr-only">{b.label} points</span>
              <input type="range" min={0} max={8} step={0.25} value={est.points[b.id] ?? 0} aria-valuetext={`${est.points[b.id] ?? 0} points`} onChange={(e) => put({ ...est, points: { ...est.points, [b.id]: Number(e.target.value) } })} className="w-full" />
              <span className="tabular-nums">
                you: {num(est.points[b.id] ?? 0, 2)}
                {revealed && <strong style={{ color: '#2563eb' }}> · prof: {num(b.points, 2)}</strong>}
              </span>
            </label>
            <label className="text-sm">
              <span className="sr-only">{b.label} nature of advantage</span>
              <select value={est.nature[b.id] ?? ''} onChange={(e) => put({ ...est, nature: { ...est.nature, [b.id]: e.target.value as Nature } })}>
                <option value="">Nature of advantage…</option>
                {NATURES.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="sr-only">{b.label} survives breadth?</span>
              <select value={est.breadth[b.id] ?? ''} onChange={(e) => put({ ...est, breadth: { ...est.breadth, [b.id]: e.target.value as Breadth } })}>
                <option value="">Survives breadth?…</option>
                {BREADTHS.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </label>
            {revealed && (
              <p className="text-xs md:col-span-4">
                <strong>Model:</strong> {b.nature} · {b.breadth}. {b.why} {est.nature[b.id] && (est.nature[b.id] === b.nature ? '✓ your classification matches' : `✗ you said “${est.nature[b.id]}”`)}
              </p>
            )}
          </div>
        ))}
      </div>
      <p className="text-sm" role="status">
        Your total: <strong>{num(yourTotal, 2)}</strong> points vs. observed gap {OBSERVED_GAP}. {Math.abs(yourTotal - OBSERVED_GAP) <= 1 ? '✓ Close enough — now check the composition.' : yourTotal < OBSERVED_GAP ? 'Under — some of the gap is unexplained.' : 'Over — you’re explaining more gap than exists.'}
      </p>
      {!revealed ? (
        <button type="button" className="btn btn-primary" onClick={() => setRevealed(true)} data-testid="reveal-aldi">
          Reveal the professor’s estimate
        </button>
      ) : (
        <p className="text-sm">
          Classification matches: <strong>{matches}/{BUCKETS.length}</strong>. The professor’s buckets sum to <strong>{sumPoints(BUCKETS)}</strong> against the observed {OBSERVED_GAP}; the slide calls that agreement “a plausibility check, not an independent validation” <Cite tag="S8 slides 3" />. Natures and breadth calls are the site’s model analysis <SiteBadge />.
        </p>
      )}
      <Waterfall
        title="Where Aldi’s price gap comes from (conventional grocer = 100)"
        start={100}
        floor={70}
        startLabel="Conventional"
        endLabel="Aldi"
        observed={100 - OBSERVED_GAP}
        steps={BUCKETS.map((b) => ({ label: b.label, value: revealed ? b.points : est.points[b.id] ?? 0, compare: est.points[b.id] ?? 0 }))}
        seriesA={revealed ? 'Professor (S8 slide 3)' : 'Your estimate'}
        seriesB={revealed ? 'Your estimate' : undefined}
      />
      {revealed && (
        <section className="card p-4 space-y-3">
          <h3 className="font-semibold">Stress test: what does going broad do to the gap?</h3>
          <p className="text-sm muted">
            Toggle the broad-scope moves the case describes <Cite tag="Aldi" />. How much each one erodes a bucket is an <strong>illustrative assumption</strong>, not a case number — use the severity slider to make your own call <SiteBadge />.
          </p>
          <div className="grid gap-2 md:grid-cols-2">
            {BREADTH_MOVES.map((m) => (
              <label key={m.id} className="flex gap-2 items-start text-sm">
                <input type="checkbox" checked={!!moves[m.id]} onChange={(e) => setMoves({ ...moves, [m.id]: e.target.checked })} />
                <span>
                  {m.label}
                  <span className="block text-xs muted">
                    erodes {Object.entries(m.hits).map(([k, f]) => `${BUCKETS.find((b) => b.id === k)!.label} ${Math.round(f * 100)}%`).join(', ')}
                  </span>
                </span>
              </label>
            ))}
          </div>
          <label className="block text-sm">
            Severity of erosion: ×{severity.toFixed(1)}
            <input type="range" min={0} max={2} step={0.1} value={severity} onChange={(e) => setSeverity(Number(e.target.value))} className="w-full" />
          </label>
          <p role="status">
            Gap after these moves: <strong>{num(sumPoints(after), 2)}</strong> points (from {sumPoints(BUCKETS)}). Refusal-type buckets total {num(sumPoints(BUCKETS.filter((b) => b.nature === 'Refusal')), 2)} points; buckets that depend on staying narrow total {num(sumPoints(BUCKETS.filter((b) => b.breadth === 'Depends on staying narrow')), 2)}.
          </p>
          <p className="text-sm">
            <strong>What this shows:</strong> on the professor’s numbers, pure refusals are a small share of the gap, so footprint breadth is affordable — but assortment, store labor and front end (8.25 points) all depend on the narrow range. Aldi can be <em>broad in footprint and narrow in assortment</em>; widening the range is what would dismantle the machine.
          </p>
        </section>
      )}
    </div>
  )
}
