import { useMemo, useState } from 'react'
import { GeneralBadge } from '../components/Cite'
import { dollars } from '../lib/format'

type Res = [number, number][]
const START: Res = [
  [20, 5],
  [8, 14],
  [12, 10],
]

/** Each consumer picks the option with the most surplus (≥ 0): A, B, both separately, the bundle, or nothing. */
function outcome(res: Res, pA: number, pB: number, pBundle: number | null) {
  return res.map(([a, b]) => {
    const opts: [string, number, number][] = [
      ['nothing', 0, 0],
      ['A only', a - pA, pA],
      ['B only', b - pB, pB],
      ['A + B separately', a + b - pA - pB, pA + pB],
    ]
    if (pBundle !== null) opts.push(['bundle', a + b - pBundle, pBundle])
    return opts.filter((o) => o[1] >= -1e-9).sort((x, y) => y[1] - x[1] || y[2] - x[2])[0]
  })
}

export default function BundleTable() {
  const [res, setRes] = useState<Res>(START)
  const [pA, setPA] = useState(12)
  const [pB, setPB] = useState(10)
  const [useBundle, setUseBundle] = useState(true)
  const [pBundle, setPBundle] = useState(22)
  const out = outcome(res, pA, pB, useBundle ? pBundle : null)
  const revenue = out.reduce((s, o) => s + o[2], 0)
  const best = useMemo(() => {
    const cands = [...new Set(res.flatMap(([a, b]) => [a, b, a + b]))]
    let sep = { rev: 0, pA: 0, pB: 0 }
    for (const x of cands) for (const y of cands) {
      const r = outcome(res, x, y, null).reduce((s, o) => s + o[2], 0)
      if (r > sep.rev) sep = { rev: r, pA: x, pB: y }
    }
    let bun = { rev: 0, p: 0 }
    for (const pb of cands) {
      const r = outcome(res, 999, 999, pb).reduce((s, o) => s + o[2], 0)
      if (r > bun.rev) bun = { rev: r, p: pb }
    }
    return { sep, bun }
  }, [res])

  return (
    <div className="space-y-3" data-testid="bundle-table">
      <p className="text-sm">
        <GeneralBadge /> A streaming service sells Sports (A) and Movies (B); marginal cost is $0. Edit the reservation prices, set your prices, and see what each customer buys.
      </p>
      <div className="scroll-x">
        <table className="data-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Values A</th>
              <th>Values B</th>
              <th>A + B</th>
              <th>Buys</th>
              <th>Pays</th>
            </tr>
          </thead>
          <tbody>
            {res.map(([a, b], i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                {[a, b].map((v, j) => (
                  <td key={j}>
                    <label className="sr-only" htmlFor={`b-${i}-${j}`}>
                      Customer {i + 1} values {j ? 'B' : 'A'}
                    </label>
                    <input
                      id={`b-${i}-${j}`}
                      type="text"
                      inputMode="numeric"
                      className="w-16 !min-h-9 !px-1 text-center"
                      value={v}
                      onChange={(e) => {
                        const n = Math.max(0, Math.min(99, Number(e.target.value.replace(/\D/g, '')) || 0))
                        setRes((rs) => rs.map((row, k) => (k === i ? (j ? [row[0], n] : [n, row[1]]) : row)) as Res)
                      }}
                    />
                  </td>
                ))}
                <td>{a + b}</td>
                <td className="font-semibold">{out[i][0]}</td>
                <td>{dollars(out[i][2])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid sm:grid-cols-3 gap-3 text-sm">
        <label className="flex flex-col gap-1 font-medium">
          Price of A: {dollars(pA)}
          <input type="range" min={0} max={30} step={1} value={pA} onChange={(e) => setPA(Number(e.target.value))} />
        </label>
        <label className="flex flex-col gap-1 font-medium">
          Price of B: {dollars(pB)}
          <input type="range" min={0} max={30} step={1} value={pB} onChange={(e) => setPB(Number(e.target.value))} />
        </label>
        <label className="flex flex-col gap-1 font-medium">
          <span>
            <input type="checkbox" className="size-4 mr-2 align-middle" checked={useBundle} onChange={(e) => setUseBundle(e.target.checked)} />
            Offer bundle: {dollars(pBundle)}
          </span>
          <input type="range" min={0} max={50} step={1} value={pBundle} disabled={!useBundle} onChange={(e) => setPBundle(Number(e.target.value))} />
        </label>
      </div>
      <p className="text-lg font-bold" aria-live="polite">
        Your revenue: {dollars(revenue)}
      </p>
      <div className="callout text-sm">
        Best separate prices: A = {dollars(best.sep.pA)}, B = {dollars(best.sep.pB)} → {dollars(best.sep.rev)}. Best pure bundle: {dollars(best.bun.p)} → {dollars(best.bun.rev)}. {best.bun.rev > best.sep.rev ? 'Bundling wins here because values are negatively correlated: customers who love A care less about B, and vice versa.' : 'Bundling doesn’t help with these values. Try making them negatively correlated.'}
      </div>
    </div>
  )
}
