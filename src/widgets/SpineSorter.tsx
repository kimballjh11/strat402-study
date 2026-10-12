import { useMemo, useState } from 'react'
import { Cite } from '../components/Cite'
import { Rng, newSeed } from '../lib/rng'
import { recordAnswer } from '../lib/store'

const Q = ['Markets to Pursue', 'Unique Value to Offer', 'Resources & Capabilities', 'Sustaining Advantage']
const ITEMS: [string, number, string][] = [
  ['Computing HHI for airports Allegiant might serve', 0, 'Which geographic markets are attractive → Markets to Pursue (S03).'],
  ['Rating the Five Forces for self-storage', 0, 'Industry attractiveness → Markets to Pursue (S04).'],
  ['Defining Netflix’s industry with NAICS codes', 0, 'Which industry/market are we in → Markets to Pursue (S04).'],
  ['Estimating Guest-Tek’s scale curve', 1, 'Cost advantage → Unique Value to Offer (S06).'],
  ['Building a Dr Pepper demand curve from a survey', 1, 'Willingness to pay / differentiation → Unique Value to Offer (S07).'],
  ['Deciding whether Netflix should raise its price', 1, 'Pricing to capture value → Unique Value to Offer (S08).'],
  ['Finding the monopoly’s profit-maximizing Q and P', 1, 'Capturing value → Unique Value to Offer (S10).'],
  ['Designing a two-part tariff for a gym', 1, 'Pricing strategy → Unique Value to Offer (S11).'],
  ['Choosing which production capabilities to build (after Midterm 1)', 2, 'Resources and capabilities to develop (Sessions 15+).'],
  ['Creating barriers to imitation (after Midterm 1)', 3, 'Sustaining advantage (Sessions 18+).'],
]

/** Sort course tools into the four strategy questions that organize STRAT 402. */
export default function SpineSorter() {
  const [seed, setSeed] = useState(newSeed)
  const order = useMemo(() => new Rng(seed).shuffle(ITEMS.map((_, i) => i)), [seed])
  const [i, setI] = useState(0)
  const [pick, setPick] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const item = ITEMS[order[i % order.length]]
  return (
    <div className="space-y-3" data-testid="spine-sorter">
      <span className="chip">
        {score} correct · card {(i % order.length) + 1}/{order.length}
      </span>
      <div className="rounded-xl surface-2 p-4 text-center text-lg font-medium">{item[0]}</div>
      <div className="grid sm:grid-cols-2 gap-2">
        {Q.map((q, k) => (
          <button
            key={q}
            type="button"
            className={`opt ${pick !== null ? (k === item[1] ? 'ok' : k === pick ? 'bad' : '') : ''}`}
            aria-pressed={pick === k}
            onClick={() => {
              if (pick !== null) return
              setPick(k)
              const ok = k === item[1]
              if (ok) setScore((s) => s + 1)
              recordAnswer({ id: 's01-w-spine', correct: ok, los: ['S01-LO1'], session: 'S01' })
            }}
          >
            <span className="opt-key">{k + 1}</span>
            {q}
          </button>
        ))}
      </div>
      {pick !== null && (
        <div className="callout text-sm">
          {item[2]} <Cite tag="S01 slides p.36" />
          <div>
            <button type="button" className="btn btn-primary btn-sm mt-2" onClick={() => (setPick(null), i + 1 >= order.length ? (setSeed(newSeed()), setI(0)) : setI(i + 1))}>
              Next card
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
