import { useMemo, useState } from 'react'
import { Cite } from '../components/Cite'
import { Frame, fnPath, scales, useWidth, type Axes } from '../components/Plot'
import { Tex } from '../components/Rich'
import { checkNumeric } from '../lib/answer'
import { num } from '../lib/format'
import { Rng, newSeed } from '../lib/rng'
import { recordAnswer } from '../lib/store'

/** Set the derivative to zero, solve, and let the graph confirm the maximum (or minimum). */
export default function FindMax() {
  const [seed, setSeed] = useState(() => 7)
  const [guess, setGuess] = useState('')
  const [checked, setChecked] = useState<null | boolean>(null)
  const [boxRef, W] = useWidth()
  const pr = useMemo(() => {
    if (seed === 7) return { kind: 'max' as const, a: 100, b: 2, star: 25, v: 'P', name: 'R(P)' }
    const g = new Rng(seed)
    const max = g.bool()
    const b = g.pick([1, 2, 3, 4, 5])
    const star = g.pick([5, 10, 12, 15, 20, 25, 30])
    return max ? { kind: 'max' as const, a: 2 * b * star, b, star, v: 'P', name: 'R(P)' } : { kind: 'min' as const, a: 2 * b * star, b, star, v: 'Q', name: 'ATC(Q)' }
  }, [seed])
  const c = pr.kind === 'min' ? pr.b * pr.star * pr.star + 200 : 0
  const f = (x: number) => (pr.kind === 'max' ? pr.a * x - pr.b * x * x : pr.b * x * x - pr.a * x + c)
  const xmax = 2 * pr.star
  const ys = Array.from({ length: 50 }, (_, i) => f((i / 49) * xmax))
  const ax: Axes = { w: W, h: Math.max(220, Math.round(W * 0.5)), pad: { l: 56, r: 12, t: 12, b: 36 }, x: [0, xmax], y: [Math.min(0, ...ys), Math.max(...ys) * 1.1] }
  const { sx, sy } = scales(ax)
  const g = Number(guess.replace(/[^\d.-]/g, ''))
  const show = checked !== null && Number.isFinite(g)
  const fnTex = pr.kind === 'max' ? `${pr.name} = ${pr.a}${pr.v} - ${pr.b}${pr.v}^2` : `${pr.name} = ${pr.b}${pr.v}^2 - ${pr.a}${pr.v} + ${c}`
  return (
    <div className="space-y-3" data-testid="find-max">
      <p className="text-lg">
        <Tex>{fnTex}</Tex>: find the {pr.v} that {pr.kind === 'max' ? 'maximizes revenue' : 'minimizes average cost'}.
      </p>
      <ol className="text-sm list-decimal pl-6">
        <li>Take the derivative (power rule).</li>
        <li>Set it equal to 0.</li>
        <li>Solve for {pr.v}. <Cite tag="Math Review p.7" /></li>
      </ol>
      <div className="flex flex-wrap gap-2 items-center">
        <label htmlFor="fm-g" className="text-sm font-medium">
          {pr.v}* =
        </label>
        <input
          id="fm-g"
          type="text"
          inputMode="decimal"
          className={`w-32 ${checked === null ? '' : checked ? 'ok' : 'bad'}`}
          value={guess}
          onChange={(e) => (setGuess(e.target.value), setChecked(null))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const ok = checkNumeric(guess, { answer: pr.star, tol: 0.001 })
              setChecked(ok)
              recordAnswer({ id: 's05-w-findmax', correct: ok, los: ['S05-LO2'], session: 'S05' })
            }
          }}
        />
        <button
          type="button"
          className="btn btn-primary btn-sm"
          disabled={!guess.trim()}
          onClick={() => {
            const ok = checkNumeric(guess, { answer: pr.star, tol: 0.001 })
            setChecked(ok)
            recordAnswer({ id: 's05-w-findmax', correct: ok, los: ['S05-LO2'], session: 'S05' })
          }}
        >
          Check on the graph
        </button>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => (setSeed(newSeed()), setGuess(''), setChecked(null))}>
          New function ↻
        </button>
      </div>
      <div ref={boxRef} className="max-w-[640px]">
        <Frame ax={ax} title={`${fnTex}; optimum at ${pr.star}`} xLabel={pr.v === 'P' ? 'Price (P)' : 'Quantity (Q)'} yLabel={pr.name}>
          <path d={fnPath(f, 0, xmax, sx, sy, 120)} stroke="var(--color-g-demand)" strokeWidth={3} fill="none" />
          {show && (
            <>
              <circle cx={sx(g)} cy={sy(f(g))} r={7} fill={checked ? 'var(--color-g-cs)' : 'var(--color-g-mc)'} />
              <line x1={sx(g)} x2={sx(g)} y1={sy(ax.y[0])} y2={sy(f(g))} stroke="currentColor" strokeDasharray="3 3" opacity={0.6} />
            </>
          )}
          {checked === false && <circle cx={sx(pr.star)} cy={sy(f(pr.star))} r={7} fill="var(--color-g-cs)" />}
        </Frame>
      </div>
      {checked !== null && (
        <p className="callout text-sm" aria-live="polite">
          <strong className={checked ? 'verdict-ok' : 'verdict-bad'}>{checked ? 'Correct — the slope is zero there.' : `Not quite: your point has slope ${num(pr.kind === 'max' ? pr.a - 2 * pr.b * g : 2 * pr.b * g - pr.a, 2)}.`}</strong>{' '}
          <Tex>{pr.kind === 'max' ? `\\frac{dR}{dP} = ${pr.a} - ${2 * pr.b}P = 0 \\Rightarrow P^* = ${pr.star}` : `\\frac{dATC}{dQ} = ${2 * pr.b}Q - ${pr.a} = 0 \\Rightarrow Q^* = ${pr.star}`}</Tex>
        </p>
      )}
    </div>
  )
}
