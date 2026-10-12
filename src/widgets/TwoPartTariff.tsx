import { useState } from 'react'
import { GeneralBadge } from '../components/Cite'
import { Frame, scales, useWidth, type Axes } from '../components/Plot'
import { dollars, num } from '../lib/format'

/** Choose a per-visit price and a membership fee; the consumer surplus is what the fee can capture. */
export default function TwoPartTariff() {
  const a = 20 // inverse demand P = 20 − Q (visits / month)
  const [mc, setMc] = useState(4)
  const [p, setP] = useState(10)
  const [fee, setFee] = useState(30)
  const [boxRef, W] = useWidth()
  const q = Math.max(0, a - p)
  const cs = 0.5 * q * (a - p)
  const joins = cs >= fee - 1e-9
  const profit = joins ? fee + (p - mc) * q : 0
  const best = 0.5 * (a - mc) * (a - mc)
  const single = ((a + mc) / 2 - mc) * ((a - mc) / 2)
  const ax: Axes = { w: W, h: Math.max(240, Math.round(W * 0.5)), pad: { l: 48, r: 12, t: 12, b: 36 }, x: [0, a], y: [0, a * 1.05] }
  const { sx, sy } = scales(ax)
  return (
    <div className="space-y-3" data-testid="two-part">
      <p className="text-sm">
        <GeneralBadge /> One gym member's demand: <strong>P = 20 − Q</strong> visits per month. Pick the per-visit price and the monthly fee. The member joins only if the consumer surplus from visiting covers the fee.
      </p>
      <div className="grid sm:grid-cols-3 gap-3 text-sm">
        <label className="flex flex-col gap-1 font-medium">
          Per-visit price {dollars(p)}
          <input type="range" min={0} max={a} step={0.5} value={p} onChange={(e) => setP(Number(e.target.value))} />
        </label>
        <label className="flex flex-col gap-1 font-medium">
          Monthly fee {dollars(fee)}
          <input type="range" min={0} max={200} step={1} value={fee} onChange={(e) => setFee(Number(e.target.value))} />
        </label>
        <label className="flex flex-col gap-1 font-medium">
          Marginal cost per visit {dollars(mc)}
          <input type="range" min={0} max={12} step={1} value={mc} onChange={(e) => setMc(Number(e.target.value))} />
        </label>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm" aria-live="polite">
        {[
          ['Visits', num(q, 1)],
          ['Member’s CS from visits', dollars(cs)],
          ['Joins?', joins ? 'Yes' : 'No — fee > CS'],
          ['Profit per member', dollars(profit)],
        ].map(([l, v]) => (
          <div key={l} className="rounded-xl border line px-3 py-2">
            <div className="text-xs muted">{l}</div>
            <div className="font-bold tabular-nums">{v}</div>
          </div>
        ))}
      </div>
      <div ref={boxRef} className="max-w-[640px]">
        <Frame ax={ax} title={`Two-part tariff: per-visit price ${dollars(p)}, fee ${dollars(fee)}, profit ${dollars(profit)}`} xLabel="Visits per month" yLabel="$ per visit" fmtY={(v) => '$' + num(v, 0)}>
          <polygon points={`${sx(0)},${sy(a)} ${sx(q)},${sy(p)} ${sx(0)},${sy(p)}`} fill="var(--color-g-cs)" opacity={0.35} />
          {p > mc && <rect x={sx(0)} y={sy(p)} width={sx(q) - sx(0)} height={sy(mc) - sy(p)} fill="var(--color-g-profit)" opacity={0.35} />}
          <line x1={sx(0)} y1={sy(a)} x2={sx(a)} y2={sy(0)} stroke="var(--color-g-demand)" strokeWidth={3} />
          <line x1={sx(0)} x2={sx(a)} y1={sy(mc)} y2={sy(mc)} stroke="var(--color-g-mc)" strokeWidth={2.5} />
          <text x={sx(a) - 4} y={sy(mc) - 6} textAnchor="end" style={{ fill: 'var(--color-g-mc)', fontWeight: 700 }}>
            MC
          </text>
          <text x={sx(q * 0.25)} y={sy((a + p) / 2) + 12} style={{ fontWeight: 700 }}>
            CS → fee
          </text>
        </Frame>
      </div>
      <div className="callout text-sm">
        Best possible: price = MC = {dollars(mc)}, fee = CS = ½ × {a - mc} × {a - mc} = <strong>{dollars(best)}</strong> per member. A single monopoly price (MR = MC → P = {dollars((a + mc) / 2)}) earns only {dollars(single)}. {profit >= best - 0.01 ? '✓ You found the optimum.' : `You're ${dollars(best - profit)} short of the optimum.`}
      </div>
    </div>
  )
}
