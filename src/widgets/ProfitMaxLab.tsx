import { useState } from 'react'
import { Cite } from '../components/Cite'
import { Frame, fnPath, scales, useWidth, type Axes } from '../components/Plot'
import { Tex } from '../components/Rich'
import { priceMaker, priceTaker } from '../content/generators/s10'
import { dollars, num, tex } from '../lib/format'
import { Rng, newSeed } from '../lib/rng'

type Structure = 'pc' | 'mono' | 'mc'
interface Params {
  s: Structure
  a: number // demand intercept (or market price for pc)
  b: number
  F: number
  c: number
  d: number
  longRun: boolean
}

const PRESETS: { name: string; p: Params; src: string }[] = [
  { name: 'Slides: price taker at $40, C = 125 + 4Q²', p: { s: 'pc', a: 40, b: 1, F: 125, c: 0, d: 4, longRun: false }, src: 'S10 slides p.46' },
  { name: 'Slides: monopoly P = 100 − Q, C = 125 + 4Q²', p: { s: 'mono', a: 100, b: 1, F: 125, c: 0, d: 4, longRun: false }, src: 'S10 slides p.47' },
  { name: 'Slides: monopolistic competition (same numbers)', p: { s: 'mc', a: 100, b: 1, F: 125, c: 0, d: 4, longRun: false }, src: 'S10 slides pp.48-49' },
  { name: 'CQ5: monopoly P = 120 − 2Q, C = 500 + 2Q²', p: { s: 'mono', a: 120, b: 2, F: 500, c: 0, d: 2, longRun: false }, src: 'CQ5 Q6-Q7' },
  { name: 'CQ5: price taker at $70, C = 50 + 10Q + 2Q²', p: { s: 'pc', a: 70, b: 1, F: 50, c: 10, d: 2, longRun: false }, src: 'CQ5 Q8' },
]

/** Long-run monopolistic competition: shift demand intercept so P = a' − bQ is tangent to ATC. */
function tangency(b: number, F: number, c: number, d: number) {
  const Q = Math.sqrt(F / (b + d))
  const atc = F / Q + c + d * Q
  return { Q, P: atc, a: atc + b * Q }
}

export default function ProfitMaxLab() {
  const [pi, setPi] = useState(1)
  const [p, setP] = useState<Params>(PRESETS[1].p)
  const [boxRef, W] = useWidth()
  const set = (k: keyof Params, v: number | string | boolean) => setP((x) => ({ ...x, [k]: v }))

  const lr = p.s === 'mc' && p.longRun ? tangency(p.b, p.F, p.c, p.d) : null
  const a = lr ? lr.a : p.a
  const sol = p.s === 'pc' ? (() => {
    const t = priceTaker(p.a, p.F, p.c, p.d)
    return { Q: t.Q, P: p.a, R: t.R, C: t.C, profit: t.profit, atc: t.atc, avc: t.avc }
  })() : (() => {
    const m = priceMaker(a, p.b, p.F, p.c, p.d)
    return { Q: m.Q, P: m.P, R: m.R, C: m.C, profit: m.profit, atc: m.atc, avc: p.c + p.d * m.Q }
  })()
  const valid = sol.Q > 0 && Number.isFinite(sol.Q)
  const Qmax = Math.max(sol.Q * 2.1, p.s === 'pc' ? sol.Q * 2 : a / p.b) || 10
  const Ymax = Math.max(p.s === 'pc' ? p.a * 1.8 : a, sol.atc * 1.3, (p.c + 2 * p.d * sol.Q) * 1.4)
  const ax: Axes = { w: W, h: Math.max(260, Math.round(W * 0.55)), pad: { l: 52, r: 12, t: 12, b: 36 }, x: [0, Qmax], y: [0, Ymax] }
  const { sx, sy } = scales(ax)
  const clip = (f: (q: number) => number) => (q: number) => {
    const v = f(q)
    return v >= ax.y[0] - Ymax * 0.05 && v <= Ymax * 1.02 ? v : NaN
  }
  const profitColor = sol.profit >= 0 ? 'var(--color-g-profit)' : '#dc2626'

  const randomize = () => {
    const g = new Rng(newSeed())
    const s = g.pick(['pc', 'mono', 'mc'] as Structure[])
    const d = g.pick([1, 2, 3, 4])
    const b = g.pick([1, 2, 3])
    const Q = g.pick([5, 8, 10, 12, 15])
    const c = g.pick([0, 0, 5, 10])
    const F = g.pick([50, 100, 125, 200, 300])
    const A = s === 'pc' ? c + 2 * d * Q : c + 2 * (b + d) * Q
    setP({ s, a: A, b, F, c, d, longRun: false })
    setPi(-1)
  }

  const costTex = r(p.F, p.c, p.d)
  return (
    <div className="space-y-3" data-testid="profit-max-lab">
      <div className="grid sm:grid-cols-2 gap-2">
        <label className="text-sm font-medium flex flex-col gap-1">
          Preset
          <select
            value={pi}
            onChange={(e) => {
              const k = Number(e.target.value)
              setPi(k)
              if (k >= 0) setP(PRESETS[k].p)
            }}
          >
            {pi === -1 && <option value={-1}>Random problem</option>}
            {PRESETS.map((x, k) => (
              <option key={k} value={k}>
                {x.name}
              </option>
            ))}
          </select>
        </label>
        <fieldset className="text-sm font-medium flex flex-col gap-1">
          <legend>Market structure</legend>
          <div className="flex gap-1">
            {(['pc', 'mono', 'mc'] as Structure[]).map((s) => (
              <button key={s} type="button" className={`btn btn-sm flex-1 ${p.s === s ? 'btn-primary' : ''}`} aria-pressed={p.s === s} onClick={() => setP((x) => ({ ...x, s, longRun: false }))}>
                {s === 'pc' ? 'Perfect comp.' : s === 'mono' ? 'Monopoly' : 'Monop. comp.'}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-sm">
        <NumIn label={p.s === 'pc' ? 'Market price P' : 'Demand intercept a'} v={p.a} on={(v) => set('a', v)} />
        {p.s !== 'pc' && <NumIn label="Demand slope b" v={p.b} on={(v) => set('b', v)} />}
        <NumIn label="Fixed cost F" v={p.F} on={(v) => set('F', v)} />
        <NumIn label="Linear cost c" v={p.c} on={(v) => set('c', v)} />
        <NumIn label="Quadratic cost d" v={p.d} on={(v) => set('d', v)} />
      </div>
      <p className="text-sm">
        <Tex>{p.s === 'pc' ? `P = ${p.a}` : `P = ${tex(a, 2)} - ${k(p.b)}Q`}</Tex> &nbsp;·&nbsp; <Tex>{costTex}</Tex>{' '}
        <button type="button" className="btn btn-sm btn-ghost" onClick={randomize}>
          Randomize ↻
        </button>
        {p.s === 'mc' && (
          <label className="inline-flex items-center gap-2 ml-2">
            <input type="checkbox" className="size-4" checked={p.longRun} onChange={(e) => set('longRun', e.target.checked)} /> Long run (imitators enter)
          </label>
        )}
      </p>

      <div ref={boxRef} className="max-w-[680px]">
        {valid ? (
          <Frame ax={ax} title={`Profit maximization graph: Q* ${num(sol.Q, 2)}, P* ${dollars(sol.P)}, profit ${dollars(sol.profit)}`} xLabel="Quantity (Q)" yLabel="$ per unit">
            <rect x={sx(0)} y={sy(Math.max(sol.P, sol.atc))} width={sx(sol.Q) - sx(0)} height={Math.abs(sy(sol.P) - sy(sol.atc))} fill={profitColor} opacity={0.28} />
            {p.s === 'pc' ? (
              <line x1={sx(0)} x2={sx(Qmax)} y1={sy(p.a)} y2={sy(p.a)} stroke="var(--color-g-demand)" strokeWidth={3} />
            ) : (
              <>
                <path d={fnPath(clip((q) => a - p.b * q), 0, Qmax, sx, sy)} stroke="var(--color-g-demand)" strokeWidth={3} fill="none" />
                <path d={fnPath(clip((q) => a - 2 * p.b * q), 0, Qmax, sx, sy)} stroke="var(--color-g-demand)" strokeWidth={2} strokeDasharray="7 5" fill="none" />
              </>
            )}
            <path d={fnPath(clip((q) => p.c + 2 * p.d * q), 0, Qmax, sx, sy)} stroke="var(--color-g-mc)" strokeWidth={2.5} fill="none" />
            <path d={fnPath(clip((q) => p.F / q + p.c + p.d * q), Qmax * 0.02, Qmax, sx, sy, 160)} stroke="var(--color-g-atc)" strokeWidth={2.5} fill="none" />
            <line x1={sx(sol.Q)} x2={sx(sol.Q)} y1={sy(0)} y2={sy(sol.P)} stroke="currentColor" strokeDasharray="3 3" opacity={0.6} />
            <circle cx={sx(sol.Q)} cy={sy(sol.P)} r={6} fill="var(--color-g-demand)" />
            {p.s !== 'pc' && <circle cx={sx(sol.Q)} cy={sy(p.c + 2 * p.d * sol.Q)} r={5} fill="var(--color-g-mc)" />}
            <Legend x={sx(Qmax) - 4} y={sy(Ymax) + 14} items={[['Demand' + (p.s === 'pc' ? ' = P = MR' : ''), 'var(--color-g-demand)', ''], ...(p.s === 'pc' ? [] : [['MR', 'var(--color-g-demand)', '6 4'] as [string, string, string]]), ['MC', 'var(--color-g-mc)', ''], ['ATC', 'var(--color-g-atc)', ''], [sol.profit >= 0 ? 'Profit' : 'Loss', profitColor, 'area']]} />
          </Frame>
        ) : (
          <p className="callout">No positive output is profitable with these numbers (demand intercept ≤ marginal cost at Q = 0). Try other values.</p>
        )}
      </div>

      {valid && (
        <ol className="card p-4 space-y-1.5 list-decimal pl-8 text-sm" aria-live="polite">
          {p.s === 'pc' ? (
            <>
              <li>
                Price taker: <Tex>{`MR = P = ${tex(p.a, 2)}`}</Tex>; <Tex>{`MC = ${p.c ? p.c + ' + ' : ''}${2 * p.d}Q`}</Tex>.
              </li>
              <li>
                <Tex>{`P = MC \\Rightarrow Q^* = ${tex(sol.Q, 2)}`}</Tex>
              </li>
            </>
          ) : (
            <>
              <li>
                <Tex>{`R = (${tex(a, 2)} - ${k(p.b)}Q)Q \\Rightarrow MR = ${tex(a, 2)} - ${2 * p.b}Q`}</Tex>; <Tex>{`MC = ${p.c ? p.c + ' + ' : ''}${2 * p.d}Q`}</Tex>
              </li>
              <li>
                <Tex>{`MR = MC \\Rightarrow Q^* = ${tex(sol.Q, 2)}`}</Tex>; price from demand: <Tex>{`P^* = ${tex(sol.P, 2)}`}</Tex>
              </li>
            </>
          )}
          <li>
            <Tex>{`R = ${tex(sol.R, 2)},\\; C = ${tex(sol.C, 2)},\\; \\text{ATC} = ${tex(sol.atc, 2)}`}</Tex>
          </li>
          <li>
            <strong>
              Profit = {dollars(sol.profit)} {sol.profit < 0 ? '(loss)' : ''}
            </strong>{' '}
            — the {sol.profit >= 0 ? 'gold' : 'red'} rectangle: (P* − ATC) × Q*.
          </li>
          <li>
            {p.s === 'pc'
              ? sol.profit < 0
                ? 'Loss, but P ≥ AVC → operate in the short run, exit in the long run.'
                : 'Profit attracts entry (free entry) → price falls toward zero economic profit.'
              : p.s === 'mono'
                ? 'Monopolist will not face entry (unless patents or other entry barriers are eliminated).'
                : p.longRun
                  ? `Long run: demand shifts to P = ${num(a, 2)} − ${k(p.b)}Q and is tangent to ATC; P = ATC, profit = 0.`
                  : 'Short run looks like monopoly — but expect imitators; tick “Long run” to see profit competed away.'}{' '}
            <Cite tag={p.s === 'pc' ? 'S10 slides p.46' : p.s === 'mono' ? 'S10 slides p.47' : 'S10 slides pp.48-49'} />
          </li>
        </ol>
      )}
    </div>
  )
}

const k = (b: number) => (b === 1 ? '' : String(b))

function r(F: number, c: number, d: number) {
  return `C(Q) = ${F}${c ? ` + ${c}Q` : ''} + ${d}Q^2`
}

function NumIn({ label, v, on }: { label: string; v: number; on: (v: number) => void }) {
  const [txt, setTxt] = useState(String(v))
  const [last, setLast] = useState(v)
  if (v !== last) {
    setLast(v)
    setTxt(String(v))
  }
  return (
    <label className="flex flex-col gap-1 font-medium">
      {label}
      <input
        type="text"
        inputMode="decimal"
        value={txt}
        onChange={(e) => {
          setTxt(e.target.value)
          const n = Number(e.target.value)
          if (Number.isFinite(n) && e.target.value.trim() !== '' && n >= 0) on(n)
        }}
      />
    </label>
  )
}

function Legend({ x, y, items }: { x: number; y: number; items: [string, string, string][] }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {items.map(([t, c, dash], i) => (
        <g key={t} transform={`translate(0 ${i * 15})`}>
          {dash === 'area' ? <rect x={-22} y={-8} width={16} height={9} fill={c} opacity={0.4} /> : <line x1={-24} x2={-6} y1={-4} y2={-4} stroke={c} strokeWidth={2.5} strokeDasharray={dash || undefined} />}
          <text x={-28} y={0} textAnchor="end">
            {t}
          </text>
        </g>
      ))}
    </g>
  )
}
