import { useState } from 'react'
import { Cite } from '../components/Cite'
import { Frame, fnPath, scales, useWidth, type Axes } from '../components/Plot'
import { Tex } from '../components/Rich'
import { num } from '../lib/format'

const FNS = [
  { key: 'x2', label: 'y = x² + 3', tex: 'y = x^2 + 3', d: '\\frac{dy}{dx} = 2x', f: (x: number) => x * x + 3, df: (x: number) => 2 * x, x: [-4, 4] as [number, number], y: [-2, 20] as [number, number], start: 1, src: 'S05 slides pp.18-30', xl: 'x', yl: 'y' },
  { key: 'rev', label: 'R(P) = 100P − 2P²', tex: 'R(P) = 100P - 2P^2', d: '\\frac{dR}{dP} = 100 - 4P', f: (p: number) => 100 * p - 2 * p * p, df: (p: number) => 100 - 4 * p, x: [0, 50] as [number, number], y: [0, 1400] as [number, number], start: 10, src: 'Math Review p.2', xl: 'Price ($)', yl: 'Revenue ($)' },
  { key: 'atc', label: 'ATC(Q) = 2Q² − 100Q + 1,400', tex: 'ATC(Q) = 2Q^2 - 100Q + 1{,}400', d: '\\frac{dATC}{dQ} = 4Q - 100', f: (q: number) => 2 * q * q - 100 * q + 1400, df: (q: number) => 4 * q - 100, x: [0, 50] as [number, number], y: [0, 1400] as [number, number], start: 10, src: 'Math Review p.2', xl: 'Quantity (Q)', yl: 'ATC ($)' },
]

/** Slide along a curve; the tangent line's slope is the derivative at that point. */
export default function TangentSlider() {
  const [k, setK] = useState(0)
  const fn = FNS[k]
  const [x0, setX0] = useState(fn.start)
  const [boxRef, W] = useWidth()
  const m = fn.df(x0)
  const y0 = fn.f(x0)
  const ax: Axes = { w: W, h: Math.max(240, Math.round(W * 0.52)), pad: { l: 52, r: 12, t: 12, b: 36 }, x: fn.x, y: fn.y }
  const { sx, sy } = scales(ax)
  const span = (fn.x[1] - fn.x[0]) * 0.18
  const step = (fn.x[1] - fn.x[0]) / 160
  return (
    <div className="space-y-3" data-testid="tangent-slider">
      <div className="flex flex-wrap gap-2 items-center">
        {FNS.map((f, i) => (
          <button
            key={f.key}
            type="button"
            className={`btn btn-sm ${k === i ? 'btn-primary' : ''}`}
            aria-pressed={k === i}
            onClick={() => {
              setK(i)
              setX0(f.start)
            }}
          >
            {f.label}
          </button>
        ))}
        <Cite tag={fn.src} />
      </div>
      <p>
        <Tex>{fn.tex}</Tex> &nbsp;→&nbsp; <Tex>{fn.d}</Tex>
      </p>
      <div className="grid grid-cols-3 gap-2 text-sm" aria-live="polite">
        <div className="rounded-xl border line px-3 py-2">
          <div className="text-xs muted">{fn.xl}</div>
          <div className="font-bold tabular-nums">{num(x0, 2)}</div>
        </div>
        <div className="rounded-xl border line px-3 py-2">
          <div className="text-xs muted">Function value</div>
          <div className="font-bold tabular-nums">{num(y0, 2)}</div>
        </div>
        <div className="rounded-xl border line px-3 py-2">
          <div className="text-xs muted">Derivative = slope of tangent</div>
          <div className="font-bold tabular-nums">{num(m, 2)}</div>
        </div>
      </div>
      <div ref={boxRef} className="max-w-[640px]">
        <Frame ax={ax} title={`${fn.label} with tangent at ${num(x0, 2)}; slope ${num(m, 2)}`} xLabel={fn.xl} yLabel={fn.yl}>
          <path d={fnPath(fn.f, fn.x[0], fn.x[1], sx, sy, 120)} stroke="var(--color-g-demand)" strokeWidth={3} fill="none" />
          <line x1={sx(x0 - span)} y1={sy(y0 - m * span)} x2={sx(x0 + span)} y2={sy(y0 + m * span)} stroke="var(--color-g-mc)" strokeWidth={2.5} />
          <circle cx={sx(x0)} cy={sy(y0)} r={6} fill="var(--color-g-mc)" />
        </Frame>
      </div>
      <label className="block text-sm font-medium" htmlFor="tan-x">
        Move the point: {fn.xl} = {num(x0, 2)}
      </label>
      <input id="tan-x" type="range" className="w-full" min={fn.x[0]} max={fn.x[1]} step={step} value={x0} onChange={(e) => setX0(Number(e.target.value))} aria-valuetext={`${num(x0, 2)}, slope ${num(m, 2)}`} />
      <p className="text-xs muted">
        {Math.abs(m) < (fn.x[1] - fn.x[0]) / 50 ? 'Slope ≈ 0: you are at the maximum or minimum. That is why optimization sets the derivative equal to zero.' : m > 0 ? 'Positive slope: the function is rising here.' : 'Negative slope: the function is falling here.'} <Cite tag="Math Review pp.5-7" />
      </p>
    </div>
  )
}
