import { useState } from 'react'
import { Cite } from '../components/Cite'
import { Frame, scales, useWidth, type Axes } from '../components/Plot'
import { recordAnswer } from '../lib/store'

type Effect = 'move-down' | 'move-up' | 'right' | 'left'
const EVENTS: { label: string; effect: Effect; why: string }[] = [
  { label: 'The good’s own price falls', effect: 'move-down', why: 'Own price → movement ALONG the curve: quantity demanded rises.' },
  { label: 'The good’s own price rises', effect: 'move-up', why: 'Own price → movement along the curve: quantity demanded falls (law of demand).' },
  { label: 'Income rises (normal good)', effect: 'right', why: 'Normal good: positive income coefficient → demand increases at every price.' },
  { label: 'Income rises (inferior good)', effect: 'left', why: 'Inferior good (like x in CQ4, coefficient −0.2) → demand decreases.' },
  { label: 'Price of a substitute rises', effect: 'right', why: 'Substitute pricier → customers switch toward this good → shift right.' },
  { label: 'Price of a complement rises', effect: 'left', why: 'Complement pricier (milk for cereal) → shift left.' },
  { label: 'Advertising increases', effect: 'right', why: 'Advertising/preferences → shift right.' },
  { label: 'Population of the target market grows', effect: 'right', why: 'More buyers → shift right.' },
  { label: 'A better substitute appears (streaming vs. Redbox)', effect: 'left', why: 'Like Redbox 2011 → 2014: demand shifted left. Demand curves are dynamic.' },
]

/** Pick a demand shifter and predict: movement along the curve, or a shift? Then watch it happen. */
export default function ShiftSim() {
  const [ev, setEv] = useState<number | null>(null)
  const [guess, setGuess] = useState<Effect | null>(null)
  const [boxRef, W] = useWidth()
  const ax: Axes = { w: W, h: Math.max(220, Math.round(W * 0.48)), pad: { l: 44, r: 12, t: 12, b: 34 }, x: [0, 100], y: [0, 50] }
  const { sx, sy } = scales(ax)
  const e = ev === null ? null : EVENTS[ev]
  const shown = e && guess ? e.effect : null
  const shift = shown === 'right' ? 18 : shown === 'left' ? -18 : 0
  const P0 = 25
  const pt = shown === 'move-down' ? 15 : shown === 'move-up' ? 35 : P0
  const qOn = (p: number, s = 0) => 80 - 1.6 * p + s
  const choices: [Effect, string][] = [
    ['move-down', 'Movement along: quantity demanded ↑'],
    ['move-up', 'Movement along: quantity demanded ↓'],
    ['right', 'Demand shifts right'],
    ['left', 'Demand shifts left'],
  ]
  return (
    <div className="space-y-3" data-testid="shift-sim">
      <label className="text-sm font-medium flex flex-col gap-1 max-w-md">
        Event
        <select
          value={ev ?? ''}
          onChange={(x) => {
            setEv(x.target.value === '' ? null : Number(x.target.value))
            setGuess(null)
          }}
        >
          <option value="">Choose an event…</option>
          {EVENTS.map((x, i) => (
            <option key={i} value={i}>
              {x.label}
            </option>
          ))}
        </select>
      </label>
      {e && (
        <div className="grid sm:grid-cols-2 gap-2">
          {choices.map(([k, l], i) => (
            <button
              key={k}
              type="button"
              className={`opt ${guess ? (k === e.effect ? 'ok' : k === guess ? 'bad' : '') : ''}`}
              aria-pressed={guess === k}
              onClick={() => {
                if (guess) return
                setGuess(k)
                recordAnswer({ id: 's07-w-shift', correct: k === e.effect, los: ['S07-LO1'], session: 'S07' })
              }}
            >
              <span className="opt-key">{i + 1}</span>
              {l}
            </button>
          ))}
        </div>
      )}
      {e && guess && (
        <p className="callout text-sm" aria-live="polite">
          <strong className={guess === e.effect ? 'verdict-ok' : 'verdict-bad'}>{guess === e.effect ? 'Correct. ' : 'Not quite. '}</strong>
          {e.why} <Cite tag="S07 slides p.15" />
        </p>
      )}
      <div ref={boxRef} className="max-w-[600px]">
        <Frame ax={ax} title="Demand curve: original (blue) and after the event (dashed)" xLabel="Quantity" yLabel="Price">
          <line x1={sx(qOn(50))} y1={sy(50)} x2={sx(qOn(0))} y2={sy(0)} stroke="var(--color-g-demand)" strokeWidth={3} />
          <text x={sx(qOn(46)) + 6} y={sy(46)} style={{ fill: 'var(--color-g-demand)', fontWeight: 700 }}>
            D₀
          </text>
          {shift !== 0 && (
            <>
              <line x1={sx(qOn(50, shift))} y1={sy(50)} x2={sx(qOn(0, shift))} y2={sy(0)} stroke="var(--color-g-demand)" strokeWidth={3} strokeDasharray="8 5" />
              <text x={sx(qOn(46, shift)) + 6} y={sy(46)} style={{ fill: 'var(--color-g-demand)', fontWeight: 700 }}>
                D₁
              </text>
            </>
          )}
          <circle cx={sx(qOn(P0))} cy={sy(P0)} r={6} fill="var(--color-g-demand)" opacity={shown ? 0.35 : 1} />
          {shown && <circle cx={sx(qOn(pt, shift))} cy={sy(pt)} r={7} fill="var(--color-g-mc)" />}
          {shown && (
            <line x1={sx(qOn(P0))} y1={sy(P0)} x2={sx(qOn(pt, shift))} y2={sy(pt)} stroke="var(--color-g-mc)" strokeWidth={2} markerEnd="" strokeDasharray="2 3" />
          )}
        </Frame>
      </div>
      <p className="text-xs muted">The red dot is where you end up. A shift means a new curve (D₁) at the same price; a movement means a new point on the same curve.</p>
    </div>
  )
}
