import { useState } from 'react'
import { Cite } from '../components/Cite'
import { num } from '../lib/format'

type Firm = { name: string; share: number }
const PRESETS: { name: string; firms: Firm[]; src: string; otherAsFirm: boolean }[] = [
  { name: 'US mobile telecom 2013', firms: [{ name: 'Verizon', share: 42 }, { name: 'AT&T', share: 33 }, { name: 'Sprint', share: 16 }, { name: 'T-Mobile', share: 3 }], src: 'S03 slides p.7', otherAsFirm: true },
  { name: 'US mobile telecom 2014', firms: [{ name: 'Verizon', share: 37 }, { name: 'AT&T', share: 31 }, { name: 'Sprint', share: 14 }, { name: 'T-Mobile', share: 12 }], src: 'S03 slides p.9', otherAsFirm: true },
  { name: 'US autos 2025 — domestic firms only', firms: [{ name: 'General Motors', share: 50 }, { name: 'Ford', share: 39 }, { name: 'Tesla', share: 10 }, { name: 'Rivian', share: 1 }], src: 'S03 slides p.15', otherAsFirm: true },
  { name: 'Oakland (OAK), Dec 2025', firms: [{ name: 'Southwest', share: 85.3 }, { name: 'Hawaiian', share: 4.08 }, { name: 'Spirit', share: 3.78 }, { name: 'Horizon Air', share: 2.2 }, { name: 'Alaska', share: 1.8 }], src: 'S03 workbook, Solution!B36:D43', otherAsFirm: true },
  { name: 'San Francisco (SFO), Dec 2025', firms: [{ name: 'United', share: 46.5 }, { name: 'SkyWest', share: 10.56 }, { name: 'Delta', share: 10.48 }, { name: 'American', share: 9.3 }, { name: 'Alaska', share: 7.87 }], src: 'S03 workbook, Solution!F36:H43', otherAsFirm: true },
]
const COLORS = ['#002e5d', '#2563eb', '#16a34a', '#ca8a04', '#ea580c', '#a855f7', '#0891b2', '#be123c']

/** Type or drag market shares; C4 and HHI update live with a stacked bar. */
export default function HhiCalc() {
  const [pi, setPi] = useState(0)
  const [firms, setFirms] = useState<Firm[]>(PRESETS[0].firms)
  const [otherAsFirm, setOther] = useState(true)
  const named = firms.reduce((s, f) => s + f.share, 0)
  const other = Math.max(0, 100 - named)
  const top4 = [...firms].sort((a, b) => b.share - a.share).slice(0, 4).reduce((s, f) => s + f.share, 0)
  const contrib = firms.map((f) => (f.share / 100) ** 2 * 10000)
  const otherContrib = otherAsFirm ? (other / 100) ** 2 * 10000 : 0
  const H = contrib.reduce((s, v) => s + v, 0) + otherContrib
  const over = named > 100.0001
  const set = (i: number, patch: Partial<Firm>) => setFirms((fs) => fs.map((f, j) => (j === i ? { ...f, ...patch } : f)))
  return (
    <div className="space-y-3" data-testid="hhi-calc">
      <div className="flex flex-wrap gap-2 items-center">
        <label className="text-sm font-medium flex flex-col gap-1 min-w-60">
          Preset
          <select
            value={pi}
            onChange={(e) => {
              const k = Number(e.target.value)
              setPi(k)
              setFirms(PRESETS[k].firms)
              setOther(PRESETS[k].otherAsFirm)
            }}
          >
            {PRESETS.map((p, i) => (
              <option key={i} value={i}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <Cite tag={PRESETS[pi].src} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm" aria-live="polite">
        <div className="rounded-xl border line px-3 py-2">
          <div className="text-xs muted">C4 (top four named firms)</div>
          <div className="text-xl font-bold tabular-nums">{num(top4, 2)}%</div>
        </div>
        <div className="rounded-xl border line px-3 py-2">
          <div className="text-xs muted">HHI</div>
          <div className="text-xl font-bold tabular-nums">{num(H, 0)}</div>
        </div>
        <div className="rounded-xl border line px-3 py-2 col-span-2 sm:col-span-1">
          <div className="text-xs muted">Remaining share</div>
          <div className="font-semibold tabular-nums">{num(other, 2)}%</div>
        </div>
      </div>
      {over && <p className="verdict-bad text-sm">Shares add to more than 100%. Check your inputs.</p>}
      <div className="flex h-9 rounded-lg overflow-hidden border line" role="img" aria-label={`Stacked bar of market shares: ${firms.map((f) => `${f.name} ${f.share}%`).join(', ')}, other ${num(other, 1)}%`}>
        {firms.map((f, i) => (
          <div key={i} style={{ width: `${Math.min(100, f.share)}%`, background: COLORS[i % COLORS.length] }} className="text-[10px] text-white flex items-center justify-center overflow-hidden whitespace-nowrap" title={`${f.name} ${f.share}%`}>
            {f.share >= 8 ? f.name : ''}
          </div>
        ))}
        {other > 0 && (
          <div style={{ width: `${other}%`, background: otherAsFirm ? '#9ca3af' : 'repeating-linear-gradient(45deg,#d1d5db,#d1d5db 4px,#f3f4f6 4px,#f3f4f6 8px)' }} className="text-[10px] flex items-center justify-center" title={`Other ${other}%`}>
            {other >= 6 ? 'other' : ''}
          </div>
        )}
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" className="size-4" checked={otherAsFirm} onChange={(e) => setOther(e.target.checked)} />
        Treat remaining share as one firm (professor’s telecom convention; counts in HHI, not C4)
      </label>
      <div className="scroll-x">
        <table className="data-table">
          <thead>
            <tr>
              <th>Firm</th>
              <th>Share %</th>
              <th className="min-w-40">Drag</th>
              <th>Share² × 10,000</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {firms.map((f, i) => (
              <tr key={i}>
                <td>
                  <label className="sr-only" htmlFor={`hn-${i}`}>
                    Firm name
                  </label>
                  <input id={`hn-${i}`} type="text" className="w-32 !min-h-9" value={f.name} onChange={(e) => set(i, { name: e.target.value })} />
                </td>
                <td>
                  <label className="sr-only" htmlFor={`hs-${i}`}>
                    {f.name} share
                  </label>
                  <input
                    id={`hs-${i}`}
                    type="text"
                    inputMode="decimal"
                    className="w-20 !min-h-9"
                    value={f.share}
                    onChange={(e) => {
                      const v = Number(e.target.value)
                      if (Number.isFinite(v) && v >= 0 && v <= 100) set(i, { share: v })
                    }}
                  />
                </td>
                <td>
                  <input type="range" min={0} max={100} step={0.5} value={f.share} onChange={(e) => set(i, { share: Number(e.target.value) })} aria-label={`${f.name} share slider`} className="w-full" />
                </td>
                <td className="tabular-nums">{num(contrib[i], 0)}</td>
                <td>
                  <button type="button" className="btn btn-sm btn-ghost" onClick={() => setFirms((fs) => fs.filter((_, j) => j !== i))} aria-label={`Remove ${f.name}`}>
                    ✕
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td>Other {otherAsFirm ? '(one firm)' : '(ignored)'}</td>
              <td>{num(other, 2)}</td>
              <td></td>
              <td className="tabular-nums">{num(otherContrib, 0)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <button type="button" className="btn btn-sm" onClick={() => setFirms((fs) => [...fs, { name: `Firm ${fs.length + 1}`, share: 0 }])}>
        + Add firm
      </button>
      <p className="text-xs muted">
        HHI = 10,000 × Σ(share as a decimal)². C4 = sum of the four largest named firms. Watch how a single big firm drives the HHI up: squaring weights large firms more. <Cite tag="S03 slides pp.5-11" />
      </p>
    </div>
  )
}
