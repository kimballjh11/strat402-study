import { useMemo, useState } from 'react'
import { Cite } from '../components/Cite'
import { Rich } from '../components/Rich'
import { num, tex } from '../lib/format'
import { Rng, newSeed } from '../lib/rng'
import { recordAnswer } from '../lib/store'

const r = String.raw

interface Card {
  text: string
  sub: boolean
  why: string
  src: string
}

const PAIRS: Card[] = [
  { text: 'Dr Pepper and Mr. Pibb', sub: true, why: 'The professor’s own substitute example: CPEs of 1.2 and 2.0 are both positive.', src: 'S08 slides p.27' },
  { text: 'Milk and cereal', sub: false, why: 'The professor’s complement example: people consume them together.', src: 'S08 slides p.27' },
  { text: 'Netflix streaming and Redbox DVD rentals', sub: true, why: 'Same job (entertainment), different way. As streaming got cheaper and better, Redbox demand shifted left.', src: 'S07 slides p.5; S09 slides p.4' },
  { text: 'Hot dogs and hot dog buns', sub: false, why: 'Used together: a pricier bun lowers hot dog demand.', src: 'General econ' },
  { text: 'Uber and Lyft rides', sub: true, why: 'Riders switch apps when one surges.', src: 'General econ' },
  { text: 'Printers and ink cartridges', sub: false, why: 'Ink is only useful with a printer (the classic cross-subsidy setup in S11).', src: 'General econ (B&P Ch 11)' },
  { text: 'Home Depot and Lowe’s', sub: true, why: 'Rival home-improvement retailers selling largely the same job. A high CPE between rivals means intense rivalry.', src: 'S04 slides p.12; S08 slides p.32' },
  { text: 'Gasoline and large SUVs', sub: false, why: 'Expensive gas makes gas-guzzlers less attractive.', src: 'General econ' },
]

function makeCard(seed: number): Card {
  const g = new Rng(seed)
  const kind = g.pick(['value', 'equation', 'pair', 'pair'] as const)
  if (kind === 'pair') return g.pick(PAIRS)
  if (kind === 'value') {
    const v = g.pick([-2.5, -1.2, -0.6, -0.18, 0.18, 0.45, 1.2, 2.0, 3.1])
    return { text: r`The cross-price elasticity of x with respect to y is **${num(v, 2)}**.`, sub: v > 0, why: v > 0 ? 'Positive CPE → substitutes.' : 'Negative CPE → complements.', src: 'S08 slides p.27' }
  }
  const c = g.pick([3, 4, 6, 8]) * (g.bool() ? 1 : -1)
  const b = g.pick([2, 5, 10])
  return {
    text: r`\(Q_x = ${tex(g.step(400, 1200, 100), 0)} - ${b}P_x ${c > 0 ? '+' : '-'} ${Math.abs(c)}P_y\)`,
    sub: c > 0,
    why: `Look at the coefficient on Py: ${c > 0 ? 'positive → substitute' : 'negative → complement'}.`,
    src: 'S08 slides p.29',
  }
}

export default function CpeClassifier() {
  const [seed, setSeed] = useState(newSeed)
  const [pick, setPick] = useState<boolean | null>(null)
  const [score, setScore] = useState([0, 0])
  const card = useMemo(() => makeCard(seed), [seed])
  const answer = (sub: boolean) => {
    if (pick !== null) return
    setPick(sub)
    const ok = sub === card.sub
    setScore(([a, b]) => [a + (ok ? 1 : 0), b + 1])
    recordAnswer({ id: 's08-w-cpe-classifier', correct: ok, los: ['S08-LO1'], session: 'S08' })
  }
  return (
    <div
      className="space-y-3"
      data-testid="cpe-classifier"
      onKeyDown={(e) => {
        if (e.key === '1') answer(true)
        if (e.key === '2') answer(false)
        if (e.key === 'Enter' && pick !== null) {
          setPick(null)
          setSeed(newSeed())
        }
      }}
    >
      <span className="chip">
        Score {score[0]}/{score[1]}
      </span>
      <div className="rounded-xl surface-2 p-4 text-center text-lg">
        <Rich>{card.text}</Rich>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[true, false].map((s, i) => (
          <button
            key={String(s)}
            type="button"
            className={`opt justify-center ${pick !== null ? (s === card.sub ? 'ok' : s === pick ? 'bad' : '') : ''}`}
            onClick={() => answer(s)}
            aria-pressed={pick === s}
          >
            <span className="opt-key">{i + 1}</span>
            {s ? 'Substitutes (CPE > 0)' : 'Complements (CPE < 0)'}
          </button>
        ))}
      </div>
      {pick !== null && (
        <div className="callout" aria-live="polite">
          <p className={pick === card.sub ? 'verdict-ok' : 'verdict-bad'}>{pick === card.sub ? 'Correct.' : `Answer: ${card.sub ? 'Substitutes' : 'Complements'}.`}</p>
          <p>
            {card.why} <Cite tag={card.src} />
          </p>
          <button
            type="button"
            className="btn btn-primary mt-2"
            onClick={() => {
              setPick(null)
              setSeed(newSeed())
            }}
          >
            Next card (Enter)
          </button>
        </div>
      )}
    </div>
  )
}
