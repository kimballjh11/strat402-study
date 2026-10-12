import { useState } from 'react'
import { Cite } from '../components/Cite'
import { Frame, scales, useWidth, type Axes } from '../components/Plot'
import { dollars, num } from '../lib/format'

const LEVELS = [1.5, 1.25, 1, 0.75, 0.5, 0.25, 0]
// Your S07 in-class workbook, Dr Pepper tab, sections 2+3 (B+C columns)
const CLASS = [21, 5, 23, 9, 10, 7, 9]

/** Willingness-to-pay survey → cumulative demand schedule → step demand curve, revenue and CS. */
export default function WtpBuilder() {
  const [counts, setCounts] = useState<number[]>(CLASS)
  const [ratio, setRatio] = useState(300)
  const [pi, setPi] = useState(2) // index into LEVELS
  const [boxRef, W] = useWidth()
  const cum = counts.map((_, i) => counts.slice(0, i + 1).reduce((s, v) => s + v, 0))
  const P = LEVELS[pi]
  const Qs = cum[pi]
  const cs = counts.slice(0, pi + 1).reduce((s, n, i) => s + n * (LEVELS[i] - P), 0)
  const total = cum[cum.length - 1]
  const ax: Axes = { w: W, h: Math.max(240, Math.round(W * 0.5)), pad: { l: 52, r: 12, t: 12, b: 36 }, x: [0, Math.max(10, total * ratio * 1.05)], y: [0, 1.7] }
  const { sx, sy } = scales(ax)
  // step demand: at each price level the market quantity
  const steps = LEVELS.map((l, i) => [cum[i] * ratio, l] as const)
  let path = `M${sx(0)} ${sy(LEVELS[0])}`
  steps.forEach(([q, p], i) => {
    path += `L${sx(q)} ${sy(p)}`
    if (i < steps.length - 1) path += `L${sx(q)} ${sy(LEVELS[i + 1])}`
  })
  // CS region: for each level above P, rectangle from previous cum to this cum, height (level − P)
  const csRects = LEVELS.slice(0, pi).map((l, i) => {
    const q0 = (i ? cum[i - 1] : 0) * ratio
    const q1 = cum[i] * ratio
    return { x: sx(q0), w: sx(q1) - sx(q0), y: sy(l), h: sy(P) - sy(l) }
  })

  return (
    <div className="space-y-3" data-testid="wtp-builder">
      <p className="text-sm">
        Preset: <strong>your class's Dr Pepper responses</strong> (sections 2 + 3 from your S07 workbook). Edit the counts to see the curve rebuild. <Cite tag="your S07 workbook, Dr Pepper!B4:C10" />
      </p>
      <div className="scroll-x">
        <table className="data-table">
          <thead>
            <tr>
              <th>Max WTP</th>
              {LEVELS.map((l) => (
                <th key={l}>{dollars(l)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td># students</td>
              {counts.map((c, i) => (
                <td key={i}>
                  <label className="sr-only" htmlFor={`wtp-${i}`}>
                    Students with max WTP {dollars(LEVELS[i])}
                  </label>
                  <input
                    id={`wtp-${i}`}
                    type="text"
                    inputMode="numeric"
                    className="w-14 !min-h-9 !px-1 text-center"
                    value={c}
                    onChange={(e) => {
                      const v = Math.max(0, Math.min(99, Number(e.target.value.replace(/\D/g, '')) || 0))
                      setCounts((cs) => cs.map((x, j) => (j === i ? v : x)))
                    }}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td>Quantity (sample)</td>
              {cum.map((c, i) => (
                <td key={i} className={i === pi ? 'font-bold' : ''}>
                  {c}
                </td>
              ))}
            </tr>
            <tr>
              <td>Quantity (market ×{ratio})</td>
              {cum.map((c, i) => (
                <td key={i} className={i === pi ? 'font-bold' : ''}>
                  {num(c * ratio, 0)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-3 items-end text-sm">
        <label className="flex flex-col gap-1 font-medium">
          Market-to-sample ratio
          <input type="text" inputMode="numeric" className="w-28" value={ratio} onChange={(e) => setRatio(Math.max(1, Number(e.target.value.replace(/\D/g, '')) || 1))} />
        </label>
        <label className="flex flex-col gap-1 font-medium flex-1 min-w-48">
          Price: {dollars(P)}
          <input type="range" min={0} max={LEVELS.length - 1} step={1} value={LEVELS.length - 1 - pi} onChange={(e) => setPi(LEVELS.length - 1 - Number(e.target.value))} aria-valuetext={dollars(P)} />
        </label>
      </div>
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="rounded-xl border line px-3 py-2">
          <div className="text-xs muted">Market quantity</div>
          <div className="font-bold tabular-nums">{num(Qs * ratio, 0)}</div>
        </div>
        <div className="rounded-xl border line px-3 py-2">
          <div className="text-xs muted">Revenue</div>
          <div className="font-bold tabular-nums">{dollars(Qs * ratio * P)}</div>
        </div>
        <div className="rounded-xl border line px-3 py-2">
          <div className="text-xs muted">Consumer surplus</div>
          <div className="font-bold tabular-nums">{dollars(cs * ratio)}</div>
        </div>
      </div>
      <div ref={boxRef} className="max-w-[680px]">
        <Frame ax={ax} title={`Step demand curve from the survey; at ${dollars(P)} quantity is ${num(Qs * ratio, 0)}`} xLabel="Quantity (cans, market)" yLabel="Price ($)" fmtY={(v) => '$' + v.toFixed(2)}>
          <rect x={sx(0)} y={sy(P)} width={sx(Qs * ratio) - sx(0)} height={sy(0) - sy(P)} fill="var(--color-g-profit)" opacity={0.3} />
          {csRects.map((c, i) => (
            <rect key={i} x={c.x} y={c.y} width={Math.max(0, c.w)} height={Math.max(0, c.h)} fill="var(--color-g-cs)" opacity={0.3} />
          ))}
          <path d={path} stroke="var(--color-g-demand)" strokeWidth={3} fill="none" />
          <line x1={sx(0)} x2={sx(ax.x[1])} y1={sy(P)} y2={sy(P)} stroke="currentColor" strokeDasharray="4 3" opacity={0.6} />
          <text x={sx(ax.x[1]) - 4} y={sy(P) - 6} textAnchor="end">
            price {dollars(P)}
          </text>
        </Frame>
      </div>
      <p className="text-xs muted">
        Gold = revenue (P × Q). Green = consumer surplus (each buyer's WTP minus the price). Quantity at a price counts everyone willing to pay <em>at least</em> that much. <Cite tag="S07 workbook" />
      </p>
    </div>
  )
}
