import { useState } from 'react'
import { Cite, SiteBadge } from '../components/Cite'
import { R } from '../components/Rich'
import { NONE_OBJ, setTool, useP } from '../lib/store'

export const FORCES = ['New entrants', 'Supplier power', 'Buyer power', 'Substitutes', 'Rivalry'] as const
export type Force = (typeof FORCES)[number]
export interface Segment {
  id: string
  name: string
  then: Record<Force, number>
  now: Record<Force, number>
  why: Record<Force, string>
  binding: Force[]
  verdict: string
}
type Ratings = Record<string, number> // `${seg}-${when}-${force}` -> 1..5

/** Rate each force 1 (weak — good for the industry) to 5 (strong — takes the value), then vs. now; the arrow is the point. */
export function FiveForcesRater({ segments }: { segments: Segment[] }) {
  const r = useP((p) => (p.tools['S04-forces'] as Ratings | undefined) ?? NONE_OBJ)
  const bind = useP((p) => (p.tools['S04-binding'] as Record<string, string[]> | undefined) ?? NONE_OBJ)
  const [shown, setShown] = useState<Record<string, boolean>>({})
  const set = (k: string, v: number) => setTool('S04-forces', { ...r, [k]: v })
  const toggleBind = (seg: string, f: string) => {
    const cur = bind[seg] ?? []
    setTool('S04-binding', { ...bind, [seg]: cur.includes(f) ? cur.filter((x) => x !== f) : [...cur, f].slice(-2) })
  }
  const arrow = (a?: number, b?: number) => (!a || !b ? '·' : b > a ? '▲ strengthening' : b < a ? '▼ weakening' : '■ steady')
  return (
    <div className="space-y-6" data-testid="five-forces">
      <p className="text-sm">
        1 = weak force (leaves value with the industry) · 5 = strong force (takes the value). Rate <strong>then</strong> (the classic cola-wars era) and <strong>now</strong> (2026). “A force that is weak today and strengthening is the one to act on” <Cite tag="5F §4" />.
      </p>
      {segments.map((s) => {
        const avg = (when: 'then' | 'now') => {
          const v = FORCES.map((f) => r[`${s.id}-${when}-${f}`]).filter(Boolean) as number[]
          return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null
        }
        return (
          <section key={s.id} className="card p-4 space-y-3">
            <h3 className="font-semibold text-lg">{s.name}</h3>
            <div className="scroll-x">
              <table className="data-table w-full min-w-[520px]">
                <thead>
                  <tr>
                    <th scope="col">Force</th>
                    <th scope="col">Then (1–5)</th>
                    <th scope="col">Now (1–5)</th>
                    <th scope="col">Direction</th>
                    <th scope="col">Binding?</th>
                  </tr>
                </thead>
                <tbody>
                  {FORCES.map((f) => {
                    const t = r[`${s.id}-then-${f}`], n = r[`${s.id}-now-${f}`]
                    return (
                      <tr key={f}>
                        <th scope="row">{f}</th>
                        {(['then', 'now'] as const).map((w) => (
                          <td key={w}>
                            <label>
                              <span className="sr-only">{`${s.name} ${f} ${w}`}</span>
                              <select value={r[`${s.id}-${w}-${f}`] ?? ''} onChange={(e) => set(`${s.id}-${w}-${f}`, Number(e.target.value))} style={{ minWidth: '4.5rem' }}>
                                <option value="">–</option>
                                {[1, 2, 3, 4, 5].map((x) => (
                                  <option key={x} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </select>
                            </label>
                            {shown[s.id] && <div className="text-xs" style={{ color: '#2563eb' }}>model: {s[w][f]}</div>}
                          </td>
                        ))}
                        <td className="text-sm">{arrow(t, n)}</td>
                        <td>
                          <button type="button" className="btn btn-sm" aria-pressed={(bind[s.id] ?? []).includes(f)} onClick={() => toggleBind(s.id, f)} style={(bind[s.id] ?? []).includes(f) ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : undefined}>
                            {(bind[s.id] ?? []).includes(f) ? '✓ binding' : 'mark'}
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-sm" role="status">
              Average force strength — then: <strong>{avg('then')?.toFixed(1) ?? '–'}</strong>, now: <strong>{avg('now')?.toFixed(1) ?? '–'}</strong>. Lower = more of the value stays with the industry. Pick the one or two <strong>binding</strong> forces — “in most industries two of the five account for the majority of the structural effect” <Cite tag="5F Ex.1" />.
            </p>
            <button type="button" className="btn btn-sm" onClick={() => setShown({ ...shown, [s.id]: !shown[s.id] })}>
              {shown[s.id] ? 'Hide' : 'Show'} model ratings and reasons
            </button>
            {shown[s.id] && (
              <div className="space-y-2 text-sm">
                <ul className="space-y-1.5">
                  {FORCES.map((f) => (
                    <li key={f} className="surface-2 rounded p-2">
                      <strong>
                        {f}: {s.then[f]} → {s.now[f]}
                      </strong>{' '}
                      — <R t={s.why[f]} />
                    </li>
                  ))}
                </ul>
                <p>
                  <strong>Binding forces (model):</strong> {s.binding.join(' and ')}. {(bind[s.id] ?? []).length > 0 && `You picked: ${(bind[s.id] ?? []).join(', ')}.`}
                </p>
                <p className="callout">
                  <R t={s.verdict} />
                </p>
                <SiteBadge>Ratings are the site’s model analysis of the case, not numbers from the materials</SiteBadge>
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}
