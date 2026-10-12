import { useState } from 'react'
import { Cite } from '../components/Cite'
import { num, pct } from '../lib/format'
import { AUTONATION, PC_1998, profitShares, type Pool, type PoolBlock } from '../lib/profitpool'

const COLORS = ['#1d4ed8', '#b45309', '#047857', '#7c3aed', '#be123c', '#0e7490', '#4d7c0f']

/** Gadiesh & Gilbert convention: x = share of industry revenue, y = margin, area = profit. */
export function ProfitPoolMapper() {
  const presets = [AUTONATION, PC_1998]
  const [pid, setPid] = useState(presets[0].id)
  const [custom, setCustom] = useState<PoolBlock[]>([
    { label: 'Activity A', revShare: 0.5, margin: 0.03 },
    { label: 'Activity B', revShare: 0.3, margin: 0.08 },
    { label: 'Activity C', revShare: 0.2, margin: 0.25 },
  ])
  const pool: Pool = pid === 'custom' ? { id: 'custom', title: 'Your own profit pool', marginLabel: 'margin', blocks: custom, src: 'Site', note: 'Shares are rescaled to total 100% of revenue.' } : presets.find((p) => p.id === pid)!
  const totRev = pool.blocks.reduce((a, b) => a + b.revShare, 0) || 1
  const blocks = profitShares({ ...pool, blocks: pool.blocks.map((b) => ({ ...b, revShare: b.revShare / totRev })) })
  const maxM = Math.max(...blocks.map((b) => b.margin), 0.05)
  const W = 640, H = 260, L = 40, B = 30
  let x0 = L
  return (
    <div className="space-y-3" data-testid="profit-pool">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a profit pool">
        {[...presets.map((p) => ({ id: p.id, t: p.id === 'pc' ? 'PC industry' : 'Car dealership' })), { id: 'custom', t: 'Build your own' }].map((o) => (
          <button key={o.id} type="button" className="btn btn-sm" aria-pressed={pid === o.id} onClick={() => setPid(o.id)} style={pid === o.id ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : undefined}>
            {o.t}
          </button>
        ))}
      </div>
      <figure className="card p-3 space-y-2">
        <figcaption className="font-semibold">
          {pool.title} <Cite tag={pool.src} />
        </figcaption>
        <div className="scroll-x">
          <svg viewBox={`0 0 ${W} ${H}`} className="graph w-full min-w-[480px]" role="img" aria-label={`${pool.title}: ${blocks.map((b) => `${b.label} ${pct(b.revShare)} of revenue at ${pct(b.margin)} ${pool.marginLabel}, ${pct(b.profitShare)} of profit`).join('; ')}`}>
            <line className="axis" x1={L} x2={W - 6} y1={H - B} y2={H - B} />
            <line className="axis" x1={L} x2={L} y1={8} y2={H - B} />
            <text x={L - 4} y={14} textAnchor="end">{pct(maxM, 0)}</text>
            <text x={L - 4} y={H - B} textAnchor="end">0</text>
            <text x={(W + L) / 2} y={H - 6} textAnchor="middle">share of industry revenue →</text>
            {blocks.map((b, i) => {
              const w = (W - 6 - L) * b.revShare
              const h = (H - B - 8) * (b.margin / maxM)
              const x = x0
              x0 += w
              return (
                <g key={b.label}>
                  <rect x={x} y={H - B - h} width={Math.max(1, w - 1)} height={h} fill={COLORS[i % COLORS.length]} opacity={0.85} />
                  {w > 50 && (
                    <text x={x + w / 2} y={H - B - h - 4} textAnchor="middle" style={{ fontSize: 10 }}>
                      {b.label}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>
        <div className="scroll-x">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th scope="col">Activity</th>
                <th scope="col">Revenue share</th>
                <th scope="col">{pool.marginLabel}</th>
                <th scope="col">Profit share</th>
              </tr>
            </thead>
            <tbody>
              {blocks.map((b, i) => (
                <tr key={b.label}>
                  <th scope="row">
                    <span aria-hidden className="inline-block w-2.5 h-2.5 mr-1.5 align-middle" style={{ background: COLORS[i % COLORS.length] }} />
                    {b.label}
                  </th>
                  <td>{pct(b.revShare)}</td>
                  <td>{pct(b.margin)}</td>
                  <td>
                    <strong>{pct(b.profitShare)}</strong> {b.profitShare > b.revShare * 1.5 ? '▲ richer than its size' : b.profitShare < b.revShare / 1.5 ? '▼ big but poor' : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs muted">{pool.note}</p>
      </figure>
      {pid === 'custom' && (
        <div className="space-y-2">
          {custom.map((b, i) => (
            <div key={i} className="grid grid-cols-[1fr_6rem_6rem] gap-2 items-end">
              <label className="text-sm">
                Activity
                <input type="text" className="w-full" value={b.label} onChange={(e) => setCustom(custom.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))} />
              </label>
              <label className="text-sm">
                Rev %
                <input type="text" inputMode="decimal" className="w-full" value={num(b.revShare * 100, 1)} onChange={(e) => setCustom(custom.map((x, j) => (j === i ? { ...x, revShare: Math.max(0, Number(e.target.value) || 0) / 100 } : x)))} />
              </label>
              <label className="text-sm">
                Margin %
                <input type="text" inputMode="decimal" className="w-full" value={num(b.margin * 100, 1)} onChange={(e) => setCustom(custom.map((x, j) => (j === i ? { ...x, margin: Math.max(0, Number(e.target.value) || 0) / 100 } : x)))} />
              </label>
            </div>
          ))}
          <button type="button" className="btn btn-sm" onClick={() => setCustom([...custom, { label: `Activity ${String.fromCharCode(65 + custom.length)}`, revShare: 0.1, margin: 0.1 }])}>
            + Add activity
          </button>
        </div>
      )}
      <p className="text-sm">
        <strong>Read it like a strategist:</strong> a tall, narrow block is a small, rich activity; a wide, flat one is large and poor. The value chain asks <em>how to perform an activity better</em>; the profit pool asks <em>whether you’re standing in the right part of the chain at all</em> <Cite tag="VC Profit pools" />.
      </p>
    </div>
  )
}
