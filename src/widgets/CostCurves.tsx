import { useState } from 'react'
import { Cite } from '../components/Cite'
import { Frame, fnPath, scales, useWidth, type Axes } from '../components/Plot'
import { Tex } from '../components/Rich'
import { costAt } from '../content/generators/s06'
import { dollars, num } from '../lib/format'

const PRESETS = [
  { name: 'J. Dawgs, one grill', c: 0.00002, b: -0.005, a: 0.8, F: 8, Qmax: 250, src: 'S06 Video Slides p.14' },
  { name: 'J. Dawgs, two grills', c: 0.000002, b: -0.0005, a: 0.25, F: 16, Qmax: 500, src: 'S06 Video Slides p.24; CQ3' },
]

/** Set FC and the VC function; watch AFC, AVC, ATC and MC move. MC crosses AVC and ATC at their minimums. */
export default function CostCurves() {
  const [k, setK] = useState(0)
  const [F, setF] = useState(PRESETS[0].F)
  const [scaleVC, setScaleVC] = useState(1)
  const [Q, setQ] = useState(100)
  const [boxRef, W] = useWidth()
  const p = PRESETS[k]
  const c = p.c * scaleVC
  const b = p.b * scaleVC
  const a = p.a * scaleVC
  const m = costAt(c, b, a, F, Q)
  // minimums
  const grid = Array.from({ length: 2000 }, (_, i) => ((i + 1) * p.Qmax) / 2000)
  const argmin = (f: (q: number) => number) => grid.reduce((best, q) => (f(q) < f(best) ? q : best), grid[0])
  const qAvc = argmin((q) => costAt(c, b, a, F, q).AVC)
  const qAtc = argmin((q) => costAt(c, b, a, F, q).ATC)
  const ymax = Math.max(1.5 * a, 1.6 * costAt(c, b, a, F, qAtc).ATC)
  const ax: Axes = { w: W, h: Math.max(260, Math.round(W * 0.55)), pad: { l: 56, r: 12, t: 12, b: 36 }, x: [0, p.Qmax], y: [0, ymax] }
  const { sx, sy } = scales(ax)
  const clip = (f: (q: number) => number) => (q: number) => (f(q) <= ymax * 1.02 ? f(q) : NaN)
  const curve = (key: 'AFC' | 'AVC' | 'ATC' | 'MC', color: string, dash?: string) => (
    <path d={fnPath(clip((q) => costAt(c, b, a, F, q)[key]), p.Qmax * 0.01, p.Qmax, sx, sy, 200)} stroke={color} strokeWidth={2.5} strokeDasharray={dash} fill="none" />
  )
  return (
    <div className="space-y-3" data-testid="cost-curves">
      <div className="flex flex-wrap gap-2 items-center">
        {PRESETS.map((pr, i) => (
          <button
            key={pr.name}
            type="button"
            className={`btn btn-sm ${k === i ? 'btn-primary' : ''}`}
            aria-pressed={k === i}
            onClick={() => {
              setK(i)
              setF(pr.F)
              setScaleVC(1)
              setQ(i === 0 ? 100 : 400)
            }}
          >
            {pr.name}
          </button>
        ))}
        <Cite tag={p.src} />
      </div>
      <p className="text-sm">
        <Tex>{`C(Q) = ${+c.toPrecision(3)}Q^3 - ${+Math.abs(b).toPrecision(3)}Q^2 + ${+a.toPrecision(3)}Q + ${num(F, 1)}`}</Tex>
      </p>
      <div className="grid sm:grid-cols-3 gap-3 text-sm">
        <label className="flex flex-col gap-1 font-medium">
          Fixed cost F = {num(F, 1)}
          <input type="range" min={0} max={p.F * 4} step={p.F / 8} value={F} onChange={(e) => setF(Number(e.target.value))} />
        </label>
        <label className="flex flex-col gap-1 font-medium">
          Variable-cost scale ×{scaleVC.toFixed(2)}
          <input type="range" min={0.5} max={1.5} step={0.05} value={scaleVC} onChange={(e) => setScaleVC(Number(e.target.value))} />
        </label>
        <label className="flex flex-col gap-1 font-medium">
          Quantity Q = {Q}
          <input type="range" min={Math.round(p.Qmax * 0.04)} max={p.Qmax} step={1} value={Q} onChange={(e) => setQ(Number(e.target.value))} />
        </label>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm" aria-live="polite">
        {(
          [
            ['FC', m.FC],
            ['VC', m.VC],
            ['TC', m.TC],
            ['AFC', m.AFC],
            ['AVC', m.AVC],
            ['ATC', m.ATC],
            ['MC', m.MC],
          ] as const
        ).map(([l, v]) => (
          <div key={l} className="rounded-xl border line px-3 py-1.5">
            <div className="text-xs muted">{l}</div>
            <div className="font-semibold tabular-nums">{dollars(v)}</div>
          </div>
        ))}
        <div className="rounded-xl border line px-3 py-1.5">
          <div className="text-xs muted">Check</div>
          <div className="text-xs">ATC = AFC + AVC ✓</div>
        </div>
      </div>
      <div ref={boxRef} className="max-w-[680px]">
        <Frame ax={ax} title={`Cost curves; MC crosses AVC minimum at Q≈${num(qAvc, 0)} and ATC minimum at Q≈${num(qAtc, 0)}`} xLabel="Quantity (hot dogs)" yLabel="$ per unit" fmtY={(v) => '$' + v.toFixed(2)}>
          {curve('AFC', '#6b7280', '3 4')}
          {curve('AVC', '#a855f7')}
          {curve('ATC', 'var(--color-g-atc)')}
          {curve('MC', 'var(--color-g-mc)')}
          <line x1={sx(Q)} x2={sx(Q)} y1={sy(0)} y2={sy(ymax)} stroke="currentColor" strokeDasharray="2 3" opacity={0.5} />
          <circle cx={sx(qAvc)} cy={sy(costAt(c, b, a, F, qAvc).AVC)} r={5} fill="#a855f7" />
          <circle cx={sx(qAtc)} cy={sy(costAt(c, b, a, F, qAtc).ATC)} r={5} fill="var(--color-g-atc)" />
          <g transform={`translate(${sx(p.Qmax) - 6} ${sy(ymax) + 14})`}>
            {(
              [
                ['MC', 'var(--color-g-mc)', ''],
                ['ATC', 'var(--color-g-atc)', ''],
                ['AVC', '#a855f7', ''],
                ['AFC', '#6b7280', '3 4'],
              ] as const
            ).map(([t, col, d], i) => (
              <g key={t} transform={`translate(0 ${i * 15})`}>
                <line x1={-24} x2={-6} y1={-4} y2={-4} stroke={col} strokeWidth={2.5} strokeDasharray={d || undefined} />
                <text x={-28} y={0} textAnchor="end">
                  {t}
                </text>
              </g>
            ))}
          </g>
        </Frame>
      </div>
      <p className="text-xs muted">
        Dots mark the minimums of AVC (Q≈{num(qAvc, 0)}) and ATC (Q≈{num(qAtc, 0)}). MC passes through both. Raising F only moves AFC and ATC, never MC or AVC. ATC − AVC = AFC shrinks as Q grows. <Cite tag="CQ3 Q6-Q7" />
      </p>
    </div>
  )
}
