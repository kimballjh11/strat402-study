import { useState } from 'react'
import { Frame, scales, useWidth, type Axes } from '../components/Plot'
import { dollars, num } from '../lib/format'

/** Sundance season pass: Q = 10 − P/15, so P = 150 − 15Q. Usage fee at MC, access fee = consumer surplus. */
export default function TwoPartTariff() {
  const choke = 150
  const slope = 15
  const qMax = choke / slope
  const [mc, setMc] = useState(0)
  const [p, setP] = useState(60)
  const [fee, setFee] = useState(200)
  const [boxRef, W] = useWidth()
  const q = Math.max(0, (choke - p) / slope)
  const cs = 0.5 * (choke - p) * q
  const joins = cs >= fee - 1e-9
  const profit = joins ? fee + (p - mc) * q : 0
  const bestQ = Math.max(0, (choke - mc) / slope)
  const best = 0.5 * (choke - mc) * bestQ
  const singleP = (choke + mc) / 2
  const singleQ = Math.max(0, (choke - singleP) / slope)
  const single = (singleP - mc) * singleQ
  const ax: Axes = { w: W, h: Math.max(240, Math.round(W * 0.5)), pad: { l: 48, r: 12, t: 12, b: 36 }, x: [0, qMax], y: [0, choke * 1.05] }
  const { sx, sy } = scales(ax)
  return (
    <div className="space-y-3" data-testid="two-part">
      <p className="text-sm">
        Sundance lift-pass demand: <strong>Q = 10 − P/15</strong>, so <strong>P = 150 − 15Q</strong>. The skier buys the season pass only if the consumer surplus from skiing covers the access fee.
      </p>
      <div className="grid sm:grid-cols-3 gap-3 text-sm">
        <label className="flex flex-col gap-1 font-medium">
          Usage fee per day {dollars(p)}
          <input type="range" min={0} max={choke} step={5} value={p} onChange={(e) => setP(Number(e.target.value))} />
        </label>
        <label className="flex flex-col gap-1 font-medium">
          Season-pass fee {dollars(fee)}
          <input type="range" min={0} max={800} step={10} value={fee} onChange={(e) => setFee(Number(e.target.value))} />
        </label>
        <label className="flex flex-col gap-1 font-medium">
          Marginal cost per day {dollars(mc)}
          <input type="range" min={0} max={60} step={5} value={mc} onChange={(e) => setMc(Number(e.target.value))} />
        </label>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm" aria-live="polite">
        {[
          ['Days skied', num(q, 1)],
          ['Skier’s CS', dollars(cs)],
          ['Buys the pass?', joins ? 'Yes' : 'No — fee > CS'],
          ['Profit per skier', dollars(profit)],
        ].map(([l, v]) => (
          <div key={l} className="rounded-xl border line px-3 py-2">
            <div className="text-xs muted">{l}</div>
            <div className="font-bold tabular-nums">{v}</div>
          </div>
        ))}
      </div>
      <div ref={boxRef} className="max-w-[640px]">
        <Frame ax={ax} title={`Two-part price: usage ${dollars(p)}, pass ${dollars(fee)}, profit ${dollars(profit)}`} xLabel="Days skied" yLabel="$ per day" fmtY={(v) => '$' + num(v, 0)}>
          <polygon points={`${sx(0)},${sy(choke)} ${sx(q)},${sy(p)} ${sx(0)},${sy(p)}`} fill="var(--color-g-cs)" opacity={0.35} />
          {p > mc && <rect x={sx(0)} y={sy(p)} width={Math.max(0, sx(q) - sx(0))} height={sy(mc) - sy(p)} fill="var(--color-g-profit)" opacity={0.35} />}
          <line x1={sx(0)} y1={sy(choke)} x2={sx(qMax)} y2={sy(0)} stroke="var(--color-g-demand)" strokeWidth={3} />
          <line x1={sx(0)} x2={sx(qMax)} y1={sy(mc)} y2={sy(mc)} stroke="var(--color-g-mc)" strokeWidth={2.5} />
          <text x={sx(qMax) - 4} y={sy(mc) - 6} textAnchor="end" style={{ fill: 'var(--color-g-mc)', fontWeight: 700 }}>
            MC
          </text>
        </Frame>
      </div>
      <div className="callout text-sm">
        Best possible: usage fee = MC = {dollars(mc)}, season pass = CS = ½ × {num(choke - mc, 0)} × {num(bestQ, 2)} = <strong>{dollars(best)}</strong>. A single daily price (P = {dollars(singleP)}) earns only {dollars(single)}. {profit >= best - 0.01 ? '✓ You found the optimum.' : `You're ${dollars(best - profit)} short of the optimum.`}
      </div>
    </div>
  )
}
