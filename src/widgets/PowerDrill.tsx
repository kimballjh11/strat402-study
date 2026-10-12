import { useMemo, useRef, useState } from 'react'
import { Cite } from '../components/Cite'
import { Tex } from '../components/Rich'
import { derive, polyTex, type Term } from '../content/generators/s05'
import { Rng, newSeed } from '../lib/rng'
import { recordAnswer } from '../lib/store'

/** Endless power-rule drill: pick the correct derivative (keys 1–4, Enter for next). */
export default function PowerDrill() {
  const [seed, setSeed] = useState(newSeed)
  const [pick, setPick] = useState<number | null>(null)
  const [score, setScore] = useState({ right: 0, total: 0, streak: 0 })
  const ref = useRef<HTMLDivElement>(null)
  const item = useMemo(() => {
    const g = new Rng(seed)
    const powers = g.shuffle([4, 3, 2, 1, -1, 0.5]).slice(0, g.int(2, 3))
    const terms: Term[] = powers.map((p) => ({ c: g.pick([-6, -4, -3, -2, 2, 3, 5, 8]), p }))
    terms.push({ c: g.pick([2, 5, 9, 15]), p: 0 })
    const right = polyTex(derive(terms))
    const wrongs = [
      polyTex(terms.filter((t) => t.p !== 0).map((t) => ({ c: t.c, p: t.p - 1 }))), // forgot to multiply by exponent
      polyTex(terms.map((t) => ({ c: t.c * t.p, p: t.p }))), // forgot to subtract 1
      polyTex([...derive(terms), { c: terms[terms.length - 1].c, p: 0 }]), // kept the constant
      polyTex(derive(terms).map((t) => ({ c: -t.c, p: t.p }))), // sign flip
    ]
    const opts = g.shuffle([right, ...[...new Set(wrongs)].filter((w) => w !== right).slice(0, 3)])
    return { terms, opts, correct: opts.indexOf(right) }
  }, [seed])
  const answer = (i: number) => {
    if (pick !== null) return
    setPick(i)
    const ok = i === item.correct
    setScore((s) => ({ right: s.right + (ok ? 1 : 0), total: s.total + 1, streak: ok ? s.streak + 1 : 0 }))
    recordAnswer({ id: 's05-w-power', correct: ok, los: ['S05-LO1'], session: 'S05' })
  }
  const next = () => {
    setPick(null)
    setSeed(newSeed())
    ref.current?.focus({ preventScroll: true })
  }
  return (
    <div
      ref={ref}
      tabIndex={-1}
      className="space-y-3 outline-none"
      data-testid="power-drill"
      onKeyDown={(e) => {
        const n = Number(e.key)
        if (n >= 1 && n <= item.opts.length) answer(n - 1)
        if (e.key === 'Enter' && pick !== null) next()
      }}
    >
      <div className="flex gap-2 text-sm">
        <span className="chip">
          Score {score.right}/{score.total}
        </span>
        <span className="chip">Streak {score.streak}</span>
      </div>
      <div className="rounded-xl surface-2 p-4 text-center text-xl">
        <Tex>{`\\frac{d}{dx}\\left[${polyTex(item.terms)}\\right] = \\;?`}</Tex>
      </div>
      <div className="grid sm:grid-cols-2 gap-2">
        {item.opts.map((o, i) => (
          <button key={i} type="button" className={`opt ${pick !== null ? (i === item.correct ? 'ok' : i === pick ? 'bad' : '') : ''}`} onClick={() => answer(i)} aria-pressed={pick === i}>
            <span className="opt-key">{i + 1}</span>
            <Tex>{o}</Tex>
          </button>
        ))}
      </div>
      {pick !== null && (
        <div className="callout text-sm" aria-live="polite">
          <p className={pick === item.correct ? 'verdict-ok' : 'verdict-bad'}>{pick === item.correct ? 'Correct.' : 'Not quite.'}</p>
          <p>
            Term by term: bring the exponent down and subtract one; constants vanish. Negative and fractional exponents follow the same rule (e.g. <Tex>{'350x^{-0.5} \\to -175x^{-1.5}'}</Tex>). <Cite tag="S05 Optional Practice p.3" />
          </p>
          <button type="button" className="btn btn-primary mt-2" onClick={next}>
            Next (Enter)
          </button>
        </div>
      )}
    </div>
  )
}
