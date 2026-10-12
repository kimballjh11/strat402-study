import { useEffect, useMemo, useRef, useState } from 'react'
import { Cite } from '../components/Cite'
import { Tex } from '../components/Rich'
import { num } from '../lib/format'
import { Rng, newSeed } from '../lib/rng'
import { recordAnswer } from '../lib/store'

const CHOICES = ['Revenue rises', 'Revenue falls', 'About the same']
const ES = [-0.1, -0.3, -0.5, -0.7, -1, -1.5, -2, -3, -4]

/** Quick-fire total revenue test: given OPE and a ±10% price move, call the revenue direction. */
export default function RevenueDrill() {
  const [seed, setSeed] = useState(newSeed)
  const [pick, setPick] = useState<number | null>(null)
  const [score, setScore] = useState({ right: 0, total: 0, streak: 0 })
  const ref = useRef<HTMLDivElement>(null)
  const item = useMemo(() => {
    const g = new Rng(seed)
    const E = g.pick(ES)
    const dP = g.bool(0.7) ? 0.1 : -0.1
    const ratio = (1 + dP) * (1 + E * dP)
    const correct = E === -1 ? 2 : ratio > 1 ? 0 : 1
    return { E, dP, ratio, correct }
  }, [seed])

  const answer = (i: number) => {
    if (pick !== null) return
    setPick(i)
    const ok = i === item.correct
    setScore((s) => ({ right: s.right + (ok ? 1 : 0), total: s.total + 1, streak: ok ? s.streak + 1 : 0 }))
    recordAnswer({ id: 's08-w-revenue-drill', correct: ok, los: ['S08-LO1'], session: 'S08' })
  }
  const next = () => {
    setPick(null)
    setSeed(newSeed())
  }
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    ref.current?.focus({ preventScroll: true })
  }, [seed])

  return (
    <div
      ref={ref}
      tabIndex={-1}
      className="outline-none space-y-3"
      data-testid="revenue-drill"
      onKeyDown={(e) => {
        const n = Number(e.key)
        if (n >= 1 && n <= 3) answer(n - 1)
        if (e.key === 'Enter' && pick !== null) next()
      }}
    >
      <div className="flex items-center justify-between text-sm">
        <span className="chip">
          Score {score.right}/{score.total}
        </span>
        <span className="chip">Streak {score.streak}</span>
      </div>
      <div className="rounded-xl surface-2 p-4 text-center">
        <div className="text-sm muted">Current own-price elasticity</div>
        <div className="text-3xl font-bold tabular-nums my-1">OPE = {num(item.E, 1)}</div>
        <div className="text-lg">
          Price {item.dP > 0 ? 'rises' : 'falls'} <strong>10%</strong>. What happens to total revenue?
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-2">
        {CHOICES.map((c, i) => (
          <button
            key={c}
            type="button"
            className={`opt ${pick !== null ? (i === item.correct ? 'ok' : i === pick ? 'bad' : '') : ''}`}
            onClick={() => answer(i)}
            aria-pressed={pick === i}
          >
            <span className="opt-key">{i + 1}</span>
            {c}
          </button>
        ))}
      </div>
      {pick !== null && (
        <div className="callout" aria-live="polite">
          <p className={pick === item.correct ? 'verdict-ok' : 'verdict-bad'}>{pick === item.correct ? 'Correct.' : `Answer: ${CHOICES[item.correct]}.`}</p>
          <p>
            {item.E === -1
              ? 'Unitary elastic: the % drop in quantity matches the % rise in price, so revenue is (to a first approximation) unchanged. You are at the revenue peak.'
              : item.E > -1
                ? `Inelastic (|OPE| < 1): quantity moves only ${num(Math.abs(item.E) * 10, 0)}% for a 10% price move, so the price effect wins.`
                : `Elastic (|OPE| > 1): quantity moves ${num(Math.abs(item.E) * 10, 0)}% for a 10% price move, so the quantity effect wins.`}{' '}
            Check: <Tex>{`(1${item.dP > 0 ? '+' : '-'}0.10)(1${item.E * item.dP > 0 ? '+' : '-'}${num(Math.abs(item.E * item.dP), 2)}) = ${item.ratio.toFixed(3)}`}</Tex>. <Cite tag="S08 slides p.18" />
          </p>
          <button type="button" className="btn btn-primary mt-2" onClick={next}>
            Next (Enter)
          </button>
        </div>
      )}
    </div>
  )
}
