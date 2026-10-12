import { useRef, useState } from 'react'
import { Cite } from '../components/Cite'
import { Frame, fnPath, scales, svgPoint, useWidth, type Axes } from '../components/Plot'
import { dollars, num } from '../lib/format'

interface Preset {
  key: string
  name: string
  a: number // Q = a − bP
  b: number
  unit: string
  src: string
  money: (p: number) => string
}

export const PRESETS: Preset[] = [
  { key: 'slide', name: 'Slide example (Q = 80 − 2P)', a: 80, b: 2, unit: 'units', src: 'S08 slides p.19', money: (p) => dollars(p) },
  { key: 'dp', name: 'Dr Pepper on campus (Q = 30,000 − 20,000P)', a: 30000, b: 20000, unit: 'cans', src: 'CQ4 Q5; S08 workbook OPE tab', money: (p) => dollars(p) },
  { key: 'redbox', name: 'Redbox 2011 (Q = 8,845 − 3,728P)', a: 8845, b: 3728, unit: 'rentals/kiosk', src: 'S08 slides p.24', money: (p) => dollars(p) },
]

/** Draggable point on linear demand; shows OPE, elastic/inelastic region, MR, and TR peaking at |E| = 1. */
export default function ElasticityExplorer() {
  const [pk, setPk] = useState('slide')
  const preset = PRESETS.find((p) => p.key === pk)!
  const { a, b } = preset
  const choke = a / b
  const stepP = choke / 200
  const [P, setP] = useState(choke * 0.7)
  const Q = a - b * P
  const E = Q > 0 ? (-b * P) / Q : -Infinity
  const TR = P * Q
  const MR = (a - 2 * Q) / b // dR/dQ from inverse demand P = (a − Q)/b
  const region = Math.abs(E + 1) < 0.005 ? 'Unitary elastic' : E < -1 ? 'Elastic' : 'Inelastic'

  const [boxRef, W] = useWidth()
  const top: Axes = { w: W, h: Math.max(230, Math.round(W * 0.48)), pad: { l: 58, r: 14, t: 12, b: 34 }, x: [0, a], y: [-choke * 0.15, choke * 1.05] }
  const bot: Axes = { w: W, h: Math.max(160, Math.round(W * 0.34)), pad: { l: 58, r: 14, t: 10, b: 34 }, x: [0, a], y: [0, (a * a) / (4 * b) * 1.12] }
  const ts = scales(top)
  const bs = scales(bot)
  const svgRef = useRef<SVGSVGElement>(null)
  const dragging = useRef(false)

  const setFromQ = (q: number) => {
    const qq = Math.min(a * 0.995, Math.max(a * 0.005, q))
    const p = (a - qq) / b
    setP(Math.round(p / stepP) * stepP)
  }
  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragging.current || !svgRef.current) return
    const pt = svgPoint(svgRef.current, e.clientX, e.clientY)
    setFromQ(ts.ix(pt.x))
  }
  const fmtP = (v: number) => (choke < 5 ? '$' + v.toFixed(2) : '$' + num(v, 0))

  return (
    <div className="space-y-3" data-testid="elasticity-explorer">
      <div className="flex flex-wrap gap-2 items-center">
        <label className="text-sm font-medium" htmlFor="ee-preset">
          Demand curve
        </label>
        <select
          id="ee-preset"
          value={pk}
          onChange={(e) => {
            const np = PRESETS.find((p) => p.key === e.target.value)!
            setPk(np.key)
            setP((np.a / np.b) * 0.7)
          }}
        >
          {PRESETS.map((p) => (
            <option key={p.key} value={p.key}>
              {p.name}
            </option>
          ))}
        </select>
        <Cite tag={preset.src} />
      </div>

      <div className="grid gap-2 grid-cols-2 sm:grid-cols-4 text-sm" aria-live="polite">
        <Stat label="Price" value={preset.money(P)} />
        <Stat label="Quantity" value={num(Q, Q < 100 ? 1 : 0)} />
        <Stat label="OPE" value={Number.isFinite(E) ? num(E, 2) : '−∞'} strong />
        <Stat label="Total revenue" value={dollars(TR).replace(/\.00$/, '')} />
      </div>
      <p className="text-sm">
        <span className="font-semibold">{region}.</span>{' '}
        {region === 'Unitary elastic'
          ? 'Revenue is at its peak: MR = 0. A small price change in either direction lowers revenue.'
          : region === 'Elastic'
            ? 'A small price increase would make revenue FALL (quantity drops by a bigger % than price rises). MR > 0 here, so selling more units adds revenue.'
            : 'A small price increase would make revenue RISE (quantity drops by a smaller % than price rises). MR < 0 here.'}{' '}
        MR at this quantity = {num(MR, choke < 5 ? 3 : 2)}.
      </p>

      <div ref={boxRef} className="max-w-[680px] space-y-2">
      <Frame
        ax={top}
        title={`Demand and marginal revenue. Current price ${preset.money(P)}, quantity ${num(Q, 0)}, OPE ${num(E, 2)}.`}
        xLabel={`Quantity (${preset.unit})`}
        yLabel="Price ($)"
        fmtY={fmtP}
        svgRef={svgRef}
        onPointerDown={(e) => {
          dragging.current = true
          ;(e.target as Element).setPointerCapture?.(e.pointerId)
          onMove(e)
        }}
        onPointerMove={onMove}
        onPointerUp={() => (dragging.current = false)}
      >
        {/* region bands (text labels so color is never the only signal) */}
        <rect x={ts.sx(0)} y={ts.sy(choke * 1.05)} width={ts.sx(a / 2) - ts.sx(0)} height={ts.sy(0) - ts.sy(choke * 1.05)} fill="#dc2626" opacity={0.06} />
        <rect x={ts.sx(a / 2)} y={ts.sy(choke * 1.05)} width={ts.sx(a) - ts.sx(a / 2)} height={ts.sy(0) - ts.sy(choke * 1.05)} fill="#2563eb" opacity={0.06} />
        <text x={ts.sx(a * 0.25)} y={ts.sy(choke * 0.98)} textAnchor="middle" style={{ fontWeight: 700 }}>
          {W < 480 ? 'Elastic' : 'Elastic (OPE < −1)'}
        </text>
        <text x={ts.sx(a * 0.75)} y={ts.sy(choke * 0.98)} textAnchor="middle" style={{ fontWeight: 700 }}>
          {W < 480 ? 'Inelastic' : 'Inelastic (−1 < OPE < 0)'}
        </text>
        <line x1={ts.sx(a / 2)} x2={ts.sx(a / 2)} y1={ts.sy(top.y[0])} y2={ts.sy(top.y[1])} stroke="currentColor" strokeDasharray="3 4" opacity={0.5} />
        <line x1={ts.sx(0)} x2={ts.sx(a)} y1={ts.sy(0)} y2={ts.sy(0)} className="axis" />
        <path d={fnPath((q) => (a - q) / b, 0, a, ts.sx, ts.sy)} stroke="var(--color-g-demand)" strokeWidth={3} fill="none" />
        <path d={fnPath((q) => (a - 2 * q) / b, 0, a * 0.575, ts.sx, ts.sy)} stroke="var(--color-g-demand)" strokeWidth={2} strokeDasharray="7 5" fill="none" />
        <text x={ts.sx(a * 0.6)} y={ts.sy(choke * 0.4) - 12} style={{ fill: 'var(--color-g-demand)', fontWeight: 700 }}>
          Demand
        </text>
        <text x={ts.sx(a * 0.53)} y={ts.sy(-choke * 0.06)} style={{ fill: 'var(--color-g-demand)', fontWeight: 700 }}>
          MR (dashed)
        </text>
        <line x1={ts.sx(0)} x2={ts.sx(Q)} y1={ts.sy(P)} y2={ts.sy(P)} stroke="currentColor" strokeDasharray="2 3" opacity={0.6} />
        <line x1={ts.sx(Q)} x2={ts.sx(Q)} y1={ts.sy(P)} y2={ts.sy(0)} stroke="currentColor" strokeDasharray="2 3" opacity={0.6} />
        <g
          className="handle"
          tabIndex={0}
          role="slider"
          aria-label="Point on the demand curve (price)"
          aria-valuemin={0}
          aria-valuemax={choke}
          aria-valuenow={Number(P.toFixed(4))}
          aria-valuetext={`Price ${preset.money(P)}, OPE ${num(E, 2)}`}
          onKeyDown={(e) => {
            // Up/Left = higher price (up the curve); Down/Right = lower price (more quantity)
            const dir = { ArrowUp: 1, ArrowLeft: 1, ArrowDown: -1, ArrowRight: -1 }[e.key]
            if (dir === undefined) return
            e.preventDefault()
            const big = e.shiftKey ? 10 : 1
            setP((p) => Math.min(choke - stepP, Math.max(stepP, p + dir * stepP * big)))
          }}
        >
          <circle cx={ts.sx(Q)} cy={ts.sy(P)} r={16} fill="transparent" />
          <circle className="ring" cx={ts.sx(Q)} cy={ts.sy(P)} r={9} fill="var(--surface)" stroke="var(--color-g-demand)" strokeWidth={3} />
        </g>
      </Frame>

      <Frame ax={bot} title={`Total revenue as a function of quantity; peak at quantity ${num(a / 2, 0)}.`} xLabel={`Quantity (${preset.unit})`} yLabel="Revenue ($)">
        <line x1={bs.sx(a / 2)} x2={bs.sx(a / 2)} y1={bs.sy(0)} y2={bs.sy(bot.y[1])} stroke="currentColor" strokeDasharray="3 4" opacity={0.5} />
        <path d={fnPath((q) => (q * (a - q)) / b, 0, a, bs.sx, bs.sy)} stroke="var(--color-g-profit)" strokeWidth={3} fill="none" />
        <text x={bs.sx(a / 2) + 6} y={bs.sy((a * a) / (4 * b)) - 6}>
          peak: OPE = −1, MR = 0
        </text>
        <circle cx={bs.sx(Q)} cy={bs.sy(TR)} r={7} fill="var(--color-g-profit)" />
      </Frame>
      </div>

      <label className="block text-sm font-medium" htmlFor="ee-slider">
        Price slider (touch-friendly alternative to dragging): {preset.money(P)}
      </label>
      <input
        id="ee-slider"
        type="range"
        min={stepP}
        max={choke - stepP}
        step={stepP}
        value={P}
        onChange={(e) => setP(Number(e.target.value))}
        className="w-full"
        aria-valuetext={`${preset.money(P)}; OPE ${num(E, 2)}`}
      />
      <p className="text-xs muted">
        Demand is blue, MR is dashed blue, and revenue is gold. Arrow keys move the point (hold Shift for big steps). The TR curve peaks exactly where the point crosses the midpoint: OPE = −1 and MR = 0. <Cite tag="S08 slides pp.18-20" />
      </p>
    </div>
  )
}

function Stat({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="rounded-xl border line px-3 py-2">
      <div className="text-xs muted">{label}</div>
      <div className={`tabular-nums ${strong ? 'text-lg font-bold' : 'font-semibold'}`}>{value}</div>
    </div>
  )
}
