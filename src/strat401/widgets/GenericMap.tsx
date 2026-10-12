import { useState } from 'react'
import { Cite, SiteBadge } from '../components/Cite'
import { NoteBox } from '../components/Note'
import { R } from '../components/Rich'
import { NONE_OBJ, setTool, useP } from '../lib/store'

export type Cell = 'cost' | 'diff' | 'costfocus' | 'difffocus'
export const CELLS: { id: Cell; label: string; sub: string }[] = [
  { id: 'cost', label: 'Cost leadership', sub: 'lower cost · broad' },
  { id: 'diff', label: 'Differentiation', sub: 'higher WTP · broad' },
  { id: 'costfocus', label: 'Cost focus', sub: 'lower cost · narrow' },
  { id: 'difffocus', label: 'Differentiation focus', sub: 'higher WTP · narrow' },
]

/** Placements accepted by the course materials. More than one cell is accepted where the sources themselves disagree. */
export const FIRMS: { name: string; ok: Cell[]; why: string; src: string }[] = [
  { name: 'Southwest (pre-2025)', ok: ['cost'], why: 'The paper’s own example: a cost leader whose cost-driven choices (one aircraft type, no assigned seats, no meals, point-to-point) happen to please customers. One strategy, fortunate side effects.', src: 'Porter §7' },
  { name: 'Aldi', ok: ['cost', 'costfocus'], why: 'Porter lists Aldi as a cost-leadership exemplar; the Aldi case says it began as cost focus and asks whether it is becoming a broad cost leader. Both placements are defensible — say which and why.', src: 'Porter Ex.1; Aldi Ex.2' },
  { name: 'Ryanair', ok: ['cost'], why: 'One aircraft type, secondary airports, 25-minute turns, unbundles everything.', src: 'Porter §3' },
  { name: 'Vanguard', ok: ['cost'], why: 'Owned by its funds, so the shareholder margin is removed from the cost stack — low fees are structural.', src: 'Porter §3' },
  { name: 'Walmart', ok: ['cost'], why: 'The broad cost leader in grocery and mass retail.', src: 'Porter Ex.2; Aldi' },
  { name: 'Chipotle', ok: ['diff'], why: 'Runs all three engines — better inputs, fresh prep in view, staff on the line.', src: 'Porter §4, Ex.1' },
  { name: 'Apple', ok: ['diff'], why: 'Product engineering plus an ecosystem that raises the cost of leaving.', src: 'Porter §4, Ex.1' },
  { name: 'Whole Foods', ok: ['diff'], why: 'Listed as grocery differentiation.', src: 'Porter Ex.2; Aldi Ex.2' },
  { name: 'Ferrari', ok: ['difffocus'], why: 'Limits volume deliberately; scarcity is part of the product.', src: 'Porter §5' },
  { name: 'In-N-Out', ok: ['difffocus'], why: 'A few western states, a few items, no franchising — freshness feasible, brand scarce.', src: 'Porter §5' },
  { name: 'USAA', ok: ['difffocus'], why: 'Serves military families exclusively and knows them better than any general insurer.', src: 'Porter §5' },
  { name: 'Aravind Eye Care', ok: ['costfocus'], why: 'One standardized procedure at extraordinary volume.', src: 'Porter §5' },
  { name: 'Dollar General', ok: ['costfocus'], why: 'Small stores in small towns that can’t support a big box.', src: 'Porter §5' },
  { name: 'Spirit Airlines', ok: ['costfocus'], why: 'Unbundles further than a broad low-cost carrier can, because it selected customers who tolerate it.', src: 'Porter §5, Ex.2' },
  { name: 'Trader Joe’s', ok: ['difffocus'], why: 'Porter lists it under grocery focus; the Aldi case calls it differentiation focus (people-based differentiation on cost-leadership bones, per §7).', src: 'Aldi Ex.2; Porter Ex.2' },
  { name: 'Costco', ok: ['cost'], why: 'Not placed by the Porter paper. The Aldi case: a limited range is the mechanism of cost leadership — “nobody calls Costco a niche player.” Session 11 asks whether it also has a differentiation advantage.', src: 'Aldi' },
]

/** Place firms on Porter's 2x2 by tapping a firm, then a cell (works with keyboard and touch). */
export function GenericMap() {
  const placed = useP((p) => (p.tools['s01-map'] as Record<string, Cell> | undefined) ?? NONE_OBJ)
  const [sel, setSel] = useState<string | null>(null)
  const [checked, setChecked] = useState(false)
  const place = (c: Cell) => {
    if (!sel) return
    setTool('s01-map', { ...placed, [sel]: c })
    setSel(null)
  }
  const unplaced = FIRMS.filter((f) => !placed[f.name])
  const right = FIRMS.filter((f) => placed[f.name] && f.ok.includes(placed[f.name])).length
  return (
    <div className="space-y-3" data-testid="generic-map">
      <p className="text-sm">
        Tap a firm, then tap the cell where it competes. {sel ? <strong>Placing: {sel}</strong> : 'No firm selected.'}
      </p>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Firms to place">
        {unplaced.map((f) => (
          <button key={f.name} type="button" className="btn btn-sm" aria-pressed={sel === f.name} onClick={() => setSel(f.name)} style={sel === f.name ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : undefined}>
            {f.name}
          </button>
        ))}
        {!unplaced.length && <span className="text-sm muted">All firms placed.</span>}
      </div>
      <div className="grid grid-cols-[2rem_1fr_1fr] gap-1.5 text-sm">
        <div />
        <div className="text-center text-xs muted font-semibold">LOWER COST</div>
        <div className="text-center text-xs muted font-semibold">DIFFERENTIATION</div>
        {(['BROAD', 'NARROW'] as const).map((row, ri) => (
          <div key={row} className="contents">
            <div className="grid place-items-center text-xs muted font-semibold" style={{ writingMode: 'vertical-rl' }}>
              {row}
            </div>
            {CELLS.slice(ri * 2, ri * 2 + 2).map((c) => (
              <button key={c.id} type="button" onClick={() => place(c.id)} disabled={!sel} className="card p-2 text-left min-h-[7rem] align-top" style={{ cursor: sel ? 'pointer' : 'default', borderColor: sel ? 'var(--accent)' : undefined }} aria-label={`${c.label}${sel ? ` — place ${sel} here` : ''}`}>
                <div className="font-semibold">{c.label}</div>
                <div className="text-xs muted mb-1">{c.sub}</div>
                <div className="flex flex-wrap gap-1">
                  {FIRMS.filter((f) => placed[f.name] === c.id).map((f) => {
                    const ok = f.ok.includes(c.id)
                    return (
                      <span key={f.name} className="chip" style={checked ? { borderColor: ok ? 'var(--ok)' : 'var(--bad)', color: ok ? 'var(--ok)' : 'var(--bad)' } : undefined}>
                        {checked && (ok ? '✓ ' : '✗ ')}
                        {f.name}
                      </span>
                    )
                  })}
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn btn-primary" onClick={() => setChecked(true)} disabled={!Object.keys(placed).length}>
          Check placements
        </button>
        <button type="button" className="btn btn-sm" onClick={() => (setTool('s01-map', {}), setChecked(false))}>
          Clear
        </button>
      </div>
      {checked && (
        <div className="card p-3 space-y-2 text-sm" role="status">
          <div className="font-semibold">
            {right}/{Object.keys(placed).length} placed where the course materials put them.
          </div>
          <ul className="space-y-1">
            {FIRMS.filter((f) => placed[f.name]).map((f) => (
              <li key={f.name}>
                <strong>{f.name}</strong> → {f.ok.map((c) => CELLS.find((x) => x.id === c)!.label).join(' or ')}. {f.why} <Cite tag={f.src} />
              </li>
            ))}
          </ul>
          <p className="muted">
            Exhibit 2’s note: placements are “illustrative and several are legitimately contested” — profitability tracks the <em>coherence</em> of a position more than which one was chosen <Cite tag="Porter Ex.2" />.
          </p>
        </div>
      )}
    </div>
  )
}

const TESTS = [
  { id: 'price', name: '1. Price test', q: 'Is realized price deliberately above or below the industry average, and can you explain the gap?' },
  { id: 'tradeoff', name: '2. Trade-off test', q: 'Name three things rivals do that this firm deliberately refuses to do.' },
  { id: 'consistency', name: '3. Consistency test', q: 'Do cost structure, hiring, metrics, incentives and capital allocation all point the same way?' },
]

/** Exhibit 3 worksheet, run on old and new Southwest. */
export function ThreeTests({ firms }: { firms: { id: string; name: string; model: Record<string, string> }[] }) {
  const [shown, setShown] = useState<Record<string, boolean>>({})
  return (
    <div className="space-y-3" data-testid="three-tests">
      <p className="text-sm">
        The three tests, in order — a firm that fails the trade-off test can’t pass the consistency test, “because there is nothing consistent to be” <Cite tag="Porter Ex.3" />.
      </p>
      {firms.map((f) => (
        <div key={f.id} className="card p-4 space-y-3">
          <h4 className="font-semibold">{f.name}</h4>
          {TESTS.map((t) => (
            <div key={t.id} className="space-y-1">
              <NoteBox id={`tests-${f.id}-${t.id}`} label={`${t.name}: ${t.q}`} rows={2} />
              {shown[f.id] && (
                <div className="callout text-sm">
                  <R t={f.model[t.id]} />
                </div>
              )}
            </div>
          ))}
          <button type="button" className="btn btn-sm" onClick={() => setShown({ ...shown, [f.id]: !shown[f.id] })}>
            {shown[f.id] ? 'Hide' : 'Show'} model answers
          </button>
          {shown[f.id] && <SiteBadge>Model answers apply Exhibit 3 to the case</SiteBadge>}
        </div>
      ))}
    </div>
  )
}
