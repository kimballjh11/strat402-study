import { useState } from 'react'
import { Cite } from '../components/Cite'
import { money, num } from '../lib/format'
import { afterDoublings, doublingsToClose, exponent, fitRate, unitCost, volumeMultiple } from '../lib/learning'

/** Pick a progress ratio and cumulative volume; watch unit cost fall. Then test a catch-up claim. */
export function LearningCalc() {
  const [s, setS] = useState(0.8)
  const [first, setFirst] = useState(100)
  const [vol, setVol] = useState(64)
  const [cf, setCf] = useState(124000)
  const [cl, setCl] = useState(47000)
  const [sf, setSf] = useState(0.815)
  const [y1, setY1] = useState(100), [y2, setY2] = useState(64), [x1, setX1] = useState(1000), [x2, setX2] = useState(4000)
  const W = 560, H = 220, L = 46, B = 28
  const maxX = Math.max(2, vol)
  const lx = (x: number) => L + ((W - L - 8) * Math.log2(x)) / Math.log2(maxX)
  const ly = (c: number) => 8 + (H - B - 8) * (1 - c / first)
  const pts = Array.from({ length: 60 }, (_, i) => 1 + (maxX - 1) * (i / 59) ** 2)
  const path = pts.map((x, i) => `${i ? 'L' : 'M'}${lx(x).toFixed(1)},${ly(unitCost(first, x, s)).toFixed(1)}`).join(' ')
  const d = doublingsToClose(cf, cl, sf)
  return (
    <div className="space-y-5" data-testid="learning-calc">
      <section className="card p-4 space-y-3">
        <h3 className="font-semibold">Learning curve: Y = a · X<sup>−b</sup>, with s = 2<sup>−b</sup></h3>
        <div className="grid gap-3 md:grid-cols-3 text-sm">
          <label>
            Progress ratio s = {Math.round(s * 1000) / 10}% (cut per doubling {Math.round((1 - s) * 1000) / 10}%)
            <input type="range" min={0.55} max={1} step={0.005} value={s} onChange={(e) => setS(Number(e.target.value))} className="w-full" />
          </label>
          <label>
            First-unit cost (a)
            <input type="text" inputMode="decimal" value={first} onChange={(e) => setFirst(Math.max(1, Number(e.target.value) || 1))} className="w-full" />
          </label>
          <label>
            Cumulative units (X) = {num(vol, 0)}
            <input type="range" min={2} max={4096} step={1} value={vol} onChange={(e) => setVol(Number(e.target.value))} className="w-full" />
          </label>
        </div>
        <p role="status">
          b = {num(exponent(s), 3)} · unit cost of unit #{num(vol, 0)} = <strong>{num(unitCost(first, vol, s), 2)}</strong> ({num((100 * unitCost(first, vol, s)) / first, 1)}% of the first) · after 10 doublings: {num(100 * afterDoublings(s, 10), 1)}% of the first unit
        </p>
        <div className="scroll-x">
          <svg viewBox={`0 0 ${W} ${H}`} className="graph w-full min-w-[440px]" role="img" aria-label={`Unit cost falls from ${first} to ${num(unitCost(first, vol, s), 2)} over ${vol} cumulative units at a ${Math.round(s * 100)}% curve`}>
            <line className="axis" x1={L} x2={W - 6} y1={H - B} y2={H - B} />
            <line className="axis" x1={L} x2={L} y1={8} y2={H - B} />
            <path d={path} fill="none" stroke="var(--accent)" strokeWidth={2.5} />
            <text x={L - 4} y={12} textAnchor="end">{num(first, 0)}</text>
            <text x={L - 4} y={H - B} textAnchor="end">0</text>
            <text x={(W + L) / 2} y={H - 6} textAnchor="middle">cumulative units (log scale) →</text>
          </svg>
        </div>
        <p className="text-xs muted">
          Wright’s 80% curve was for direct LABOR only and was a cumulative-average curve; the whole airplane flattened from 83% toward 90% <Cite tag="Scale Learning" />. Ask which convention “learning rate” means: s or 1 − s <Cite tag="Scale App.A" />.
        </p>
      </section>
      <section className="card p-4 space-y-3">
        <h3 className="font-semibold">Fit a rate from two observations</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
          {([['Cost 1', y1, setY1], ['Cost 2', y2, setY2], ['Cum. units 1', x1, setX1], ['Cum. units 2', x2, setX2]] as const).map(([l, v, f]) => (
            <label key={l}>
              {l}
              <input type="text" inputMode="decimal" value={v} onChange={(e) => f(Number(e.target.value) || 0)} className="w-full" />
            </label>
          ))}
        </div>
        <p role="status">
          d = log₂({num(x2, 0)}/{num(x1, 0)}) = {num(Math.log2(x2 / x1), 2)} doublings → s = ({num(y2, 2)}/{num(y1, 2)})<sup>1/d</sup> = <strong>{num(100 * fitRate(y1, y2, x1, x2), 1)}%</strong>. “Two points and a ruler will give you a progress ratio; they will not tell you whether it is learning, scale, or the price of copper” <Cite tag="Scale App.A" />.
        </p>
      </section>
      <section className="card p-4 space-y-3">
        <h3 className="font-semibold">Test a catch-up claim</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
          <label>
            Follower unit cost
            <input type="text" inputMode="decimal" value={cf} onChange={(e) => setCf(Number(e.target.value) || 1)} className="w-full" />
          </label>
          <label>
            Leader unit cost
            <input type="text" inputMode="decimal" value={cl} onChange={(e) => setCl(Number(e.target.value) || 1)} className="w-full" />
          </label>
          <label>
            Follower progress ratio
            <input type="text" inputMode="decimal" value={sf} onChange={(e) => setSf(Number(e.target.value) || 0.9)} className="w-full" />
          </label>
        </div>
        <p role="status">
          d = ln({money(cf)} ÷ {money(cl)}) ÷ (−ln {sf}) = <strong>{num(d, 2)} doublings</strong> → the follower must produce <strong>{num(volumeMultiple(d), 0)}×</strong> its cumulative output to date. “That is the number that usually kills the claim” <Cite tag="Scale App.A" />.
        </p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-sm" onClick={() => (setCf(124000), setCl(47000), setSf(0.815))}>
            Brief’s worked problem 4
          </button>
          <button type="button" className="btn btn-sm" onClick={() => (setCf(123995), setCl(46978), setSf(0.815))}>
            Rivian vs. Tesla (S8 slide 31)
          </button>
          <button type="button" className="btn btn-sm" onClick={() => (setCf(146300), setCl(46978), setSf(0.836))}>
            Lucid vs. Tesla
          </button>
        </div>
      </section>
    </div>
  )
}
