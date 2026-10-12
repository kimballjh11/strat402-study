import { useState } from 'react'
import { Cite } from '../components/Cite'
import { money, num } from '../lib/format'
import { breakevenSubs, contentPerSub } from '../lib/learning'

const RIVALS = [
  { name: 'Peacock', subs: 41 },
  { name: 'Paramount+', subs: 79.1 },
  { name: 'HBO Max', subs: 128 },
  { name: 'Disney+', subs: 131.6 },
  { name: 'Netflix', subs: 300 },
] // Q3 2025, millions [Netflix Ex.7]

/** Fixed content cost spread over subscribers: AC = F/N + c. */
export function ScaleCurve() {
  const [F, setF] = useState(17)
  const [arpu, setArpu] = useState(12)
  const W = 560, H = 240, L = 50, B = 30, maxN = 320
  const maxY = contentPerSub(F * 1000, 10) / 12
  const x = (n: number) => L + ((W - L - 8) * n) / maxN
  const y = (v: number) => 8 + (H - B - 8) * (1 - Math.min(v, maxY) / maxY)
  const ns = Array.from({ length: 80 }, (_, i) => 10 + (i * (maxN - 10)) / 79)
  const path = ns.map((n, i) => `${i ? 'L' : 'M'}${x(n).toFixed(1)},${y(contentPerSub(F * 1000, n) / 12).toFixed(1)}`).join(' ')
  const be = breakevenSubs(F * 1000, arpu)
  return (
    <div className="space-y-3" data-testid="scale-curve">
      <div className="grid gap-3 sm:grid-cols-2 text-sm">
        <label>
          Annual content budget F = ${F}B
          <input type="range" min={1} max={25} step={0.5} value={F} onChange={(e) => setF(Number(e.target.value))} className="w-full" />
        </label>
        <label>
          Revenue per member per month = ${arpu}
          <input type="range" min={4} max={20} step={0.5} value={arpu} onChange={(e) => setArpu(Number(e.target.value))} className="w-full" />
        </label>
      </div>
      <figure className="card p-3">
        <figcaption className="font-semibold text-sm">
          Content cost per subscriber per month vs. subscribers (millions) <Cite tag="Netflix Ex.5" />
        </figcaption>
        <div className="scroll-x">
          <svg viewBox={`0 0 ${W} ${H}`} className="graph w-full min-w-[440px]" role="img" aria-label={`At $${F}B a year, content cost per subscriber per month falls from ${money(contentPerSub(F * 1000, 10) / 12)} at 10M subscribers to ${money(contentPerSub(F * 1000, 300) / 12, 2)} at 300M; breakeven on content alone at ${num(be, 0)}M subscribers.`}>
            <line className="axis" x1={L} x2={W - 6} y1={H - B} y2={H - B} />
            <line className="axis" x1={L} x2={L} y1={8} y2={H - B} />
            <line x1={L} x2={W - 6} y1={y(arpu)} y2={y(arpu)} stroke="var(--ok)" strokeDasharray="5 4" />
            <text x={W - 8} y={y(arpu) - 4} textAnchor="end">revenue/member ${arpu}</text>
            <path d={path} fill="none" stroke="var(--accent)" strokeWidth={2.5} />
            {RIVALS.map((r) => (
              <g key={r.name}>
                <circle cx={x(r.subs)} cy={y(contentPerSub(F * 1000, r.subs) / 12)} r={4} fill="#b45309" />
                <text x={x(r.subs) + 5} y={y(contentPerSub(F * 1000, r.subs) / 12) - 5} style={{ fontSize: 10 }}>
                  {r.name}
                </text>
              </g>
            ))}
            <text x={L - 4} y={12} textAnchor="end">{money(maxY)}</text>
            <text x={(W + L) / 2} y={H - 6} textAnchor="middle">subscribers (millions) →</text>
          </svg>
        </div>
      </figure>
      <p role="status" className="text-sm">
        Breakeven on content alone: F ÷ (revenue/member × 12) = <strong>{num(be, 0)}M subscribers</strong>. At 41M the same library costs {money(contentPerSub(F * 1000, 41) / 12, 2)}/month per subscriber; at 300M, {money(contentPerSub(F * 1000, 300) / 12, 2)} — “steepness is the whole story” <Cite tag="S8 slides 18" />.
      </p>
      <p className="text-xs muted">Dots place each rival’s Q3 2025 subscriber count on the curve as if it spent the same budget — the case’s thought experiment, not their actual spend <Cite tag="Netflix Ex.7" />.</p>
    </div>
  )
}
