import { useRef, useState } from 'react'
import { Cite } from '../components/Cite'
import { Frame, scales, svgPoint, useWidth, type Axes } from '../components/Plot'
import { simpleOls } from '../lib/econ'
import { num } from '../lib/format'

// Pittsburgh TVs [S09 slides p.16]: x = price, y = quantity
const PTS = [[475, 180], [400, 590], [450, 430], [550, 250], [575, 275], [375, 720], [375, 660], [450, 490], [400, 700], [500, 210]]
const X0 = 350
const X1 = 600
const sse = (a: number, b: number) => PTS.reduce((s, [x, y]) => s + (y - (a + b * x)) ** 2, 0)
const best = simpleOls(PTS.map((p) => p[0]), PTS.map((p) => p[1]))
const bestSse = sse(best.a, best.b)

/** Drag the two ends of a line to minimize the sum of squared errors, then reveal the OLS line. */
export default function SseDragger() {
  const [yL, setYL] = useState(500)
  const [yR, setYR] = useState(400)
  const [show, setShow] = useState(false)
  const [boxRef, W] = useWidth()
  const ax: Axes = { w: W, h: Math.max(260, Math.round(W * 0.55)), pad: { l: 50, r: 12, t: 12, b: 36 }, x: [X0, X1], y: [0, 900] }
  const { sx, sy, iy } = scales(ax)
  const svg = useRef<SVGSVGElement>(null)
  const drag = useRef<'L' | 'R' | null>(null)
  const b = (yR - yL) / (X1 - X0)
  const a = yL - b * X0
  const cur = sse(a, b)
  const ratio = cur / bestSse

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!drag.current || !svg.current) return
    const v = Math.max(0, Math.min(900, iy(svgPoint(svg.current, e.clientX, e.clientY).y)))
    if (drag.current === 'L') setYL(Math.round(v))
    else setYR(Math.round(v))
  }
  const handle = (side: 'L' | 'R', y: number, set: (v: number) => void) => (
    <g
      className="handle"
      tabIndex={0}
      role="slider"
      aria-label={`${side === 'L' ? 'Left' : 'Right'} end of your line (quantity at price ${side === 'L' ? X0 : X1})`}
      aria-valuemin={0}
      aria-valuemax={900}
      aria-valuenow={y}
      onPointerDown={(e) => {
        drag.current = side
        svg.current?.setPointerCapture?.(e.pointerId)
      }}
      onKeyDown={(e) => {
        const d = { ArrowUp: 10, ArrowDown: -10 }[e.key]
        if (d) {
          e.preventDefault()
          set(Math.max(0, Math.min(900, y + d * (e.shiftKey ? 5 : 1))))
        }
      }}
    >
      <circle cx={sx(side === 'L' ? X0 : X1)} cy={sy(y)} r={16} fill="transparent" />
      <circle className="ring" cx={sx(side === 'L' ? X0 : X1)} cy={sy(y)} r={9} fill="var(--surface)" stroke="var(--color-g-mc)" strokeWidth={3} />
    </g>
  )

  return (
    <div className="space-y-3" data-testid="sse-dragger">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
        <div className="rounded-xl border line px-3 py-2">
          <div className="text-xs muted">Your line</div>
          <div className="font-semibold tabular-nums">Q = {num(a, 0)} {b < 0 ? '−' : '+'} {num(Math.abs(b), 2)}P</div>
        </div>
        <div className="rounded-xl border line px-3 py-2">
          <div className="text-xs muted">Your sum of squared errors</div>
          <div className="font-bold tabular-nums">{num(cur, 0)}</div>
        </div>
        <div className="rounded-xl border line px-3 py-2">
          <div className="text-xs muted">vs. the minimum possible</div>
          <div className="font-semibold tabular-nums">{ratio < 1.02 ? 'Within 2% — that’s OLS!' : `${num((ratio - 1) * 100, 0)}% worse`}</div>
        </div>
      </div>
      <div ref={boxRef} className="max-w-[680px]">
        <Frame
          ax={ax}
          svgRef={svg}
          title={`Scatter of TV quantity vs price with your line. SSE ${num(cur, 0)}.`}
          xLabel="Price ($)"
          yLabel="Quantity demanded (# of TVs)"
          onPointerMove={onMove}
          onPointerUp={() => (drag.current = null)}
        >
          {PTS.map(([x, y]) => (
            <line key={`r${x}${y}`} x1={sx(x)} x2={sx(x)} y1={sy(y)} y2={sy(a + b * x)} stroke="var(--color-g-mc)" strokeWidth={1.5} strokeDasharray="3 2" opacity={0.7} />
          ))}
          {show && <line x1={sx(X0)} x2={sx(X1)} y1={sy(best.a + best.b * X0)} y2={sy(best.a + best.b * X1)} stroke="var(--color-g-cs)" strokeWidth={3} />}
          <line x1={sx(X0)} x2={sx(X1)} y1={sy(yL)} y2={sy(yR)} stroke="var(--color-g-mc)" strokeWidth={2.5} />
          {PTS.map(([x, y]) => (
            <circle key={`p${x}${y}`} cx={sx(x)} cy={sy(y)} r={5} fill="var(--color-g-demand)" />
          ))}
          {handle('L', yL, setYL)}
          {handle('R', yR, setYR)}
        </Frame>
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn btn-primary" onClick={() => setShow(true)} disabled={show}>
          Reveal the OLS line
        </button>
        <button type="button" className="btn" onClick={() => (setYL(500), setYR(400), setShow(false))}>
          Reset
        </button>
      </div>
      {show && (
        <p className="callout text-sm">
          OLS (green): <strong>Q = {num(best.a, 2)} − {num(-best.b, 2)}P</strong>, SSE = {num(bestSse, 0)}. That's the professor's Q = 1,631.47 − 2.60P, and no other straight line has a smaller sum of squared errors. The SSE is the Residual SS (100,751.61) in the ANOVA table. <Cite tag="S09 slides pp.20-25" />
        </p>
      )}
      <p className="text-xs muted">Drag the red handles, or focus one and press ↑/↓. Each dashed red segment is a residual, and squaring and adding them gives SSE.</p>
    </div>
  )
}
