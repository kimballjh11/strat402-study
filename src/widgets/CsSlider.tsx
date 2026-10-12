import { useState } from 'react'
import { Cite } from '../components/Cite'
import { Frame, scales, useWidth, type Axes } from '../components/Plot'
import { dollars, num } from '../lib/format'

const PRESETS = [
  { name: 'Dr Pepper on campus: Q = 30,000 − 20,000P', a: 30000, b: 20000, src: 'CQ4 Q4' },
  { name: 'Slide example: Q = 80 − 2P', a: 80, b: 2, src: 'S08 slides p.19' },
  { name: 'Sundance passes: Q = 6,000 − 12P', a: 6000, b: 12, src: 'S05 Optional Practice p.2' },
]

/** Price slider on linear demand: shades consumer surplus (green) and revenue (gold). */
export default function CsSlider() {
  const [k, setK] = useState(0)
  const { a, b, src } = PRESETS[k]
  const choke = a / b
  const [P, setP] = useState(choke * (2 / 3))
  const [boxRef, W] = useWidth()
  const Q = a - b * P
  const cs = 0.5 * Q * (choke - P)
  const R = P * Q
  const ax: Axes = { w: W, h: Math.max(240, Math.round(W * 0.5)), pad: { l: 56, r: 12, t: 12, b: 36 }, x: [0, a], y: [0, choke * 1.05] }
  const { sx, sy } = scales(ax)
  const step = choke / 120
  return (
    <div className="space-y-3" data-testid="cs-slider">
      <label className="text-sm font-medium flex flex-col gap-1 max-w-md">
        Demand
        <select
          value={k}
          onChange={(e) => {
            const nk = Number(e.target.value)
            setK(nk)
            setP((PRESETS[nk].a / PRESETS[nk].b) * (2 / 3))
          }}
        >
          {PRESETS.map((p, i) => (
            <option key={i} value={i}>
              {p.name}
            </option>
          ))}
        </select>
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm" aria-live="polite">
        {[
          ['Price', dollars(P)],
          ['Quantity', num(Q, 0)],
          ['Consumer surplus', dollars(cs)],
          ['Revenue', dollars(R)],
        ].map(([l, v]) => (
          <div key={l} className="rounded-xl border line px-3 py-2">
            <div className="text-xs muted">{l}</div>
            <div className="font-bold tabular-nums">{v}</div>
          </div>
        ))}
      </div>
      <div ref={boxRef} className="max-w-[680px]">
        <Frame ax={ax} title={`Demand with consumer surplus ${dollars(cs)} and revenue ${dollars(R)} at price ${dollars(P)}`} xLabel="Quantity" yLabel="Price ($)" fmtY={(v) => (choke < 5 ? '$' + v.toFixed(2) : '$' + num(v, 0))}>
          <polygon points={`${sx(0)},${sy(choke)} ${sx(Q)},${sy(P)} ${sx(0)},${sy(P)}`} fill="var(--color-g-cs)" opacity={0.35} />
          <rect x={sx(0)} y={sy(P)} width={sx(Q) - sx(0)} height={sy(0) - sy(P)} fill="var(--color-g-profit)" opacity={0.3} />
          <line x1={sx(0)} y1={sy(choke)} x2={sx(a)} y2={sy(0)} stroke="var(--color-g-demand)" strokeWidth={3} />
          <circle cx={sx(Q)} cy={sy(P)} r={6} fill="var(--color-g-demand)" />
          <text x={sx(Q * 0.3)} y={sy((choke + P) / 2) + 14} style={{ fontWeight: 700 }}>
            CS
          </text>
          <text x={sx(Q * 0.45)} y={sy(P / 2)} style={{ fontWeight: 700 }}>
            Revenue
          </text>
        </Frame>
      </div>
      <label className="block text-sm font-medium" htmlFor="cs-p">
        Price: {dollars(P)}
      </label>
      <input id="cs-p" type="range" className="w-full" min={0} max={choke} step={step} value={P} onChange={(e) => setP(Number(e.target.value))} aria-valuetext={`${dollars(P)}; consumer surplus ${dollars(cs)}`} />
      <p className="text-xs muted">
        CS = ½ × Q × (choke price {dollars(choke)} − P). Revenue peaks at half the choke price, while CS keeps growing as price falls. Value you don't capture is CS, and S11 pricing strategies try to capture it. <Cite tag={src} />
      </p>
    </div>
  )
}
