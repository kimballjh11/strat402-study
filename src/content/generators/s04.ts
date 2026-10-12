import { num } from '../../lib/format'
import { Rng } from '../../lib/rng'
import type { Generator } from '../types'

const r = String.raw
const band = (x: number) => (x < 2 ? 0 : x < 3 ? 1 : x < 4 ? 2 : 3)
const BANDS = ['Very unattractive (1–2)', 'Moderately unattractive (2–3)', 'Moderately attractive (3–4)', 'Very attractive (4–5)']

/** Weighted-average scoring exactly like the Five Forces Strategy Excel Tool. */
export const scoreGen: Generator = {
  id: 's04-score',
  session: 'S04',
  los: ['S04-LO3'],
  title: 'Score a force with the Five Forces tool’s weights',
  skill: 'Force score = Σ(rating × weight) / Σ weights; overall = average of forces (S04 Solution, Calculations Hub)',
  screen: 'widgets',
  make(seed) {
    const g = new Rng(seed)
    const force = g.pick(['Rivalry', 'Buyer power', 'Threat of new entrants'])
    const comps = {
      Rivalry: ['Top-4 combined share', 'Product standardization', 'Industry growth rate', 'Capacity utilization', 'Fixed/storage costs', 'Exit barriers'],
      'Buyer power': ['Buyer concentration', 'Buyer switching costs', 'Demand growth', 'Backward integration'],
      'Threat of new entrants': ['Scale economies', 'Capital required', 'Marketing to match brands', 'Property rights', 'Share to break even'],
    }[force]!
    const ratings = comps.map(() => g.int(1, 5))
    const weights = comps.map(() => g.pick([1, 1, 1, 2]))
    const score = ratings.reduce((s, v, i) => s + v * weights[i], 0) / weights.reduce((a, b) => a + b, 0)
    const rows = ['| Component | Rating (1–5) | Weight |', '| --- | --- | --- |', ...comps.map((c, i) => `| ${c} | ${ratings[i]} | ${weights[i]} |`)].join('\n')
    return {
      title: 'Five Forces scoring',
      prompt: r`Your team rated **${force}** for an industry (5 = most attractive for incumbents):

${rows}`,
      parts: [
        { type: 'num', label: `Weighted ${force} score`, answer: score, tol: 0.005 },
        { type: 'choice', label: 'The tool’s verdict for this force', options: BANDS, correct: band(score) },
      ],
      steps: [
        r`Weighted average: (${ratings.map((v, i) => `${v}×${weights[i]}`).join(' + ')}) / ${weights.reduce((a, b) => a + b, 0)} = ${num(score, 3)}. [[S04 Solution, Calculations Hub!K21]]`,
        r`The tool's bands: 1–2 very unattractive, 2–3 moderately unattractive, 3–4 moderately attractive, 4–5 very attractive → **${BANDS[band(score)]}**. [[S04 Solution, Five Forces!A23]]`,
      ],
      src: 'S04 Solution',
    }
  },
}

/** Scenario → which force, and does it make the industry more or less attractive? */
export const forceGen: Generator = {
  id: 's04-force',
  session: 'S04',
  los: ['S04-LO1', 'S04-LO3'],
  title: 'Which force? Which direction?',
  skill: 'Map evidence to rivalry, buyers, suppliers, entry or substitutes, and judge attractiveness (S04 slides pp.19-23)',
  screen: 'terms',
  make(seed) {
    const g = new Rng(seed)
    const cases: [string, number, number, string][] = [
      ['Walmart buys 30% of a snack maker’s output and threatens to launch its own private label.', 1, 1, 'A big buyer that can backward integrate has strong buyer power → less attractive.'],
      ['A single chip supplier’s brand (“Intel Inside”) matters to end consumers of PCs.', 2, 1, 'A supplier brand that matters to end consumers raises supplier power → less attractive for PC makers.'],
      ['Ride-share apps let travelers skip renting a car.', 4, 1, 'Same job, different way → threat of substitutes rises → less attractive for car rental.'],
      ['Opening a new semiconductor fab costs $20 billion and takes years.', 3, 0, 'Huge capital requirements are a barrier to entry → lower threat of entry → more attractive for incumbents.'],
      ['Industry demand is forecast to shrink 2% a year and plants run at 65% capacity.', 0, 1, 'Declining demand + excess capacity → price wars → intense rivalry → less attractive.'],
      ['A social app becomes more valuable to each user as more friends join.', 3, 0, 'Network effects deter entry → more attractive for the incumbent.'],
      ['Customers face high switching costs (data migration, retraining) to change software vendors.', 0, 0, 'High switching costs soften rivalry and buyer power → more attractive.'],
      ['The four largest firms hold 85% of the market and products are highly differentiated.', 0, 0, 'Concentration + differentiation → less intense rivalry → more attractive.'],
      ['A key ingredient comes from one supplier that could open its own competing brand.', 2, 1, 'Concentrated supplier that can forward integrate → strong supplier power → less attractive.'],
      ['New regulations require FDA approval before any product can launch.', 3, 0, 'Regulatory barriers lower the threat of entry → more attractive for incumbents.'],
    ]
    const [txt, f, dir, why] = g.pick(cases)
    return {
      title: 'Force + direction',
      prompt: `**Evidence:** ${txt}`,
      parts: [
        { type: 'choice', label: 'Which force does this mainly affect?', options: ['Rivalry', 'Buyer power', 'Supplier power', 'Threat of new entrants', 'Threat of substitutes'], correct: f },
        { type: 'choice', label: 'For incumbents, it makes the industry…', options: ['More attractive', 'Less attractive'], correct: dir },
      ],
      steps: [why + ' [[S04 slides pp.19-23]] [[Five Forces Tool, Glossary]]'],
      src: 'S04 slides pp.19-23; Five Forces Tool Glossary',
    }
  },
}

/** Pick the right growth rate / rating from IBISWorld-style numbers (debrief lesson). */
export const growthGen: Generator = {
  id: 's04-growth',
  session: 'S04',
  los: ['S04-LO3', 'S04-LO5'],
  title: 'Which growth rate do you rate?',
  skill: 'Use the forward-looking rate; map it to the tool’s growth bands (S04 Solution A15; S05 slides p.9)',
  screen: 'examples',
  make(seed) {
    const g = new Rng(seed)
    const trailing = g.pick([2.1, 3.4, 4.3, 5.6, 6.2])
    const current = g.pick([-0.4, 0.3, 0.8, 1.9])
    const forward = g.pick([-1.2, -0.1, 0.6, 2.4, 3.8, 5.5])
    const rating = forward < 0 ? 1 : forward < 1 ? 2 : forward < 3 ? 3 : forward <= 5 ? 4 : 5
    return {
      title: 'Industry growth rate',
      prompt: `An IBISWorld report shows: 2021–26 revenue CAGR **${trailing}%** (trailing), 2026 revenue growth **${current}%** (current year), and 2026–31 revenue CAGR **${forward}%** (forecast). The tool’s rivalry growth bands: <0% = 1, 0–1% = 2, 1–3% = 3, 3–5% = 4, >5% = 5.`,
      parts: [
        { type: 'choice', label: 'Which rate should you use?', options: ['Trailing (2021–26)', 'Current year (2026)', 'Forward (2026–31)'], correct: 2 },
        { type: 'num', label: 'Rating (1–5) for rivalry → industry growth rate', answer: rating, tol: 0 },
      ],
      steps: [
        r`“Industry analysis asks whether the industry will be attractive from now into the near future, not what growth has already been captured.” Use the forward rate: ${forward}%. [[S04 Solution, Five Forces!A15]]`,
        r`${forward}% falls in the band rated **${rating}**. [[S05 slides p.9]]`,
      ],
      src: 'S04 Solution A15; S05 slides p.9',
    }
  },
}

export const s04Generators = [scoreGen, forceGen, growthGen]
