import { useState } from 'react'
import { Cite, SiteBadge } from '../components/Cite'
import { R } from '../components/Rich'
import { NONE_OBJ, setTool, useP } from '../lib/store'

type Pick = 'Product' | 'Beyond-product' | 'Tie'
const ROWS: { id: string; q: string; model: Pick; why: string }[] = [
  { id: 'durable', q: 'Which is harder for a rival to copy?', model: 'Beyond-product', why: 'Culture, trust and a permanent ownership structure rest on social complexity, causal ambiguity, path dependence and credible commitment — the four mechanisms that make premiums last. Product features get copied (Casper) or normalized (Peloton) [[Diff §6-7]].' },
  { id: 'verify', q: 'Which can the buyer verify at the moment of purchase?', model: 'Product', why: 'A product attribute can be seen or tested; trust in a repair shop is a credence attribute — it can only be signaled. That makes beyond-product differentiation slower to register [[Diff §2]].' },
  { id: 'measure', q: 'Which is easier to prove in the accounts?', model: 'Product', why: 'A product premium shows up as price or mix. The case’s evidence for the MORE model is mostly cost and volume ($40k → $400k distributions without raising prices; best revenue month) — and “a gain that shows up entirely in cost is an operating improvement” [[More Co]] [[Diff §3]].' },
  { id: 'fit', q: 'Which fits a credence business like auto repair better?', model: 'Beyond-product', why: '“Repair is a trust business. Customers cannot verify the work and must believe the person recommending it.” Engaged technicians → fewer comebacks, honest tickets, reputation that fills bays [[More Co]]. Reviews pay most for independents [[Diff Ex.3]].' },
  { id: 'scale', q: 'Which scales faster?', model: 'Product', why: 'The practice spreads “one person, one conversation at a time”; about a quarter of the workforce is consistently in it; it depends on managers’ skill and the founder’s attention [[More Co]].' },
  { id: 'capital', q: 'Which is easier to fund?', model: 'Product', why: 'The trust “cannot raise equity” — growth from cash flow and debt only; failure modes include capital starvation and founder dependence [[More Ex.3]].' },
  { id: 'cost', q: 'Which also lowers cost?', model: 'Beyond-product', why: 'Engagement reduces turnover, rework and service failures — Clegg’s claim that you solve the employee problem up front or pay for it later [[More Co]]. (This is also why it can look like cost, not differentiation.)' },
]

export function DiffCompare() {
  const ans = useP((p) => (p.tools['S10-compare'] as Record<string, Pick> | undefined) ?? NONE_OBJ)
  const [shown, setShown] = useState(false)
  const matches = ROWS.filter((r) => ans[r.id] === r.model).length
  return (
    <div className="space-y-3" data-testid="diff-compare">
      <p className="text-sm">
        Compare <strong>product differentiation</strong> (a better offering) with <strong>beyond-product differentiation</strong> (people, trust, ownership and purpose around the offering — the MORE model) on each criterion. Pick the stronger one, then reveal.
      </p>
      {ROWS.map((r) => (
        <div key={r.id} className="card p-3 space-y-2">
          <div className="font-semibold text-sm">{r.q}</div>
          <div className="flex flex-wrap gap-2" role="group" aria-label={r.q}>
            {(['Product', 'Beyond-product', 'Tie'] as const).map((p) => (
              <button key={p} type="button" className="btn btn-sm" aria-pressed={ans[r.id] === p} onClick={() => setTool('S10-compare', { ...ans, [r.id]: p })} style={ans[r.id] === p ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : undefined}>
                {p}
              </button>
            ))}
          </div>
          {shown && (
            <p className="text-sm">
              <strong>
                {r.model} {ans[r.id] ? (ans[r.id] === r.model ? '✓' : `(you: ${ans[r.id]})`) : ''}:
              </strong>{' '}
              <R t={r.why} />
            </p>
          )}
        </div>
      ))}
      <button type="button" className="btn btn-primary" onClick={() => setShown(true)}>
        Reveal the model comparison
      </button>
      {shown && (
        <div className="callout text-sm" role="status">
          You matched {matches}/{ROWS.length}. <strong>The pattern:</strong> beyond-product differentiation tends to be <em>more durable and a better fit for trust businesses</em>, but <em>slower, harder to measure, harder to scale and harder to fund</em>. “Better or worse” depends on whether the firm can show the premium (price, retention, volume at parity) and sustain the practice beyond the founder <Cite tag="Diff §7-8" /> <SiteBadge>Comparison is the site’s application of the Differentiation Brief</SiteBadge>
        </div>
      )}
    </div>
  )
}
