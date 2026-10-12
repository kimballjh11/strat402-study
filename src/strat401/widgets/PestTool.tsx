import { useState } from 'react'
import { Cite, SiteBadge } from '../components/Cite'
import { R } from '../components/Rich'
import { NONE_OBJ, setTool, useP } from '../lib/store'

export type Dir = 'Favorable' | 'Adverse' | 'Ambiguous'
export interface PestRow {
  id: string
  domain: 'Political' | 'Economic' | 'Socio-cultural' | 'Technological'
  factor: string
  then: string
  now: string
  model: { dir: Dir; shaped: 'Given' | 'Shaped'; mechanism: string; decision: string; falsifier: string }
  src: string
}
interface Ans { dir?: Dir; shaped?: 'Given' | 'Shaped'; mechanism?: string }

/** The Exhibit 2 worksheet, run at two points in time, with a direction arrow and a given/shaped call on every row. */
export function PestTool({ id, rows, forWhom }: { id: string; rows: PestRow[]; forWhom: string }) {
  const ans = useP((p) => (p.tools[id] as Record<string, Ans> | undefined) ?? NONE_OBJ)
  const [shown, setShown] = useState<Record<string, boolean>>({})
  const put = (rid: string, a: Ans) => setTool(id, { ...ans, [rid]: { ...ans[rid], ...a } })
  const arrow = (d?: Dir) => (d === 'Favorable' ? '▲' : d === 'Adverse' ? '▼' : d === 'Ambiguous' ? '◆' : '·')
  return (
    <div className="space-y-3" data-testid="pest-tool">
      <p className="text-sm">
        For each factor: read it <strong>then</strong> and <strong>now</strong>, give it a direction <em>for {forWhom}</em>, write the mechanism (factor → mechanism → decision), and call it given or shaped <Cite tag="PEST Ex.2" />.
      </p>
      {rows.map((r) => {
        const a = ans[r.id] ?? {}
        return (
          <div key={r.id} className="card p-3 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip">{r.domain}</span>
              <strong>{r.factor}</strong>
              <Cite tag={r.src} />
            </div>
            <div className="grid gap-2 md:grid-cols-2 text-sm">
              <div className="surface-2 rounded p-2">
                <div className="text-xs muted uppercase">Then</div>
                {r.then}
              </div>
              <div className="surface-2 rounded p-2">
                <div className="text-xs muted uppercase">Now</div>
                {r.now}
              </div>
            </div>
            <div className="grid gap-2 md:grid-cols-[1fr_1fr] text-sm">
              <label>
                Direction for {forWhom}
                <select value={a.dir ?? ''} onChange={(e) => put(r.id, { dir: e.target.value as Dir })}>
                  <option value="">Choose…</option>
                  <option>Favorable</option>
                  <option>Adverse</option>
                  <option>Ambiguous</option>
                </select>
              </label>
              <label>
                Given or shaped?
                <select value={a.shaped ?? ''} onChange={(e) => put(r.id, { shaped: e.target.value as 'Given' | 'Shaped' })}>
                  <option value="">Choose…</option>
                  <option>Given</option>
                  <option>Shaped</option>
                </select>
              </label>
            </div>
            <label className="block text-sm">
              Mechanism → decision affected
              <textarea className="w-full" rows={2} value={a.mechanism ?? ''} onChange={(e) => put(r.id, { mechanism: e.target.value })} />
            </label>
            <button type="button" className="btn btn-sm" onClick={() => setShown({ ...shown, [r.id]: !shown[r.id] })}>
              {shown[r.id] ? 'Hide' : 'Show'} model row
            </button>
            {shown[r.id] && (
              <div className="callout text-sm space-y-1">
                <div>
                  <strong>
                    {arrow(r.model.dir)} {r.model.dir} · {r.model.shaped}
                  </strong>{' '}
                  {a.dir && (a.dir === r.model.dir ? '✓ direction matches' : `(you said ${a.dir})`)} {a.shaped && (a.shaped === r.model.shaped ? '✓ given/shaped matches' : `(you said ${a.shaped})`)}
                </div>
                <div>
                  <strong>Mechanism:</strong> <R t={r.model.mechanism} />
                </div>
                <div>
                  <strong>Decision affected:</strong> <R t={r.model.decision} />
                </div>
                <div>
                  <strong>Falsifier:</strong> <R t={r.model.falsifier} />
                </div>
              </div>
            )}
          </div>
        )
      })}
      <div className="card p-3 text-sm" role="status">
        <strong>Your grid:</strong> {rows.map((r) => `${r.domain[0]} ${arrow(ans[r.id]?.dir)}`).join('   ')} <SiteBadge>Model rows apply the PEST paper to the case</SiteBadge>
      </div>
    </div>
  )
}
