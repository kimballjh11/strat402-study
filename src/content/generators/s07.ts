import { dollars, num, tex } from '../../lib/format'
import { Rng } from '../../lib/rng'
import type { Generator } from '../types'

const r = String.raw
const goods = [
  ['energy drinks', 'cans'],
  ['ski passes', 'passes'],
  ['concert tickets', 'tickets'],
  ['frozen pies', 'pies'],
  ['phone cases', 'cases'],
  ['car washes', 'washes'],
] as const

/** Demand with shifters → plug in → inverse demand; classify substitute/complement, normal/inferior (CQ4 Q1-Q3). */
export const shifters: Generator = {
  id: 's07-inverse',
  session: 'S07',
  los: ['S07-LO1'],
  title: 'Demand function with shifters → inverse demand',
  skill: 'Sign of Py → substitute/complement; sign of I → normal/inferior; substitute knowns, then solve for P (CQ4 Q1-Q3)',
  screen: 'examples',
  make(seed) {
    const g = new Rng(seed)
    const [good] = g.pick(goods)
    for (;;) {
      const b = g.pick([2, 4, 5, 10, 20])
      const c = g.pick([1, 2, 3, 5]) * (g.bool() ? 1 : -1)
      const d = g.pick([0.05, 0.1, 0.2]) * (g.bool() ? 1 : -1)
      const a = g.step(2000, 12000, 500)
      const Py = g.step(20, 200, 10)
      const I = g.step(20000, 60000, 5000)
      const A = a + c * Py + d * I
      if (A <= b * 5) continue
      return {
        title: 'Shifters and inverse demand',
        prompt: r`Demand for ${good} is \(Q_x = ${tex(a, 0)} - ${b}P_x ${c > 0 ? '+' : '-'} ${Math.abs(c)}P_y ${d > 0 ? '+' : '-'} ${tex(Math.abs(d), 2)}I\), where \(P_y\) is the price of a related good and \(I\) is average income. Currently \(P_y = ${Py}\) and \(I = ${tex(I, 0)}\).`,
        parts: [
          { type: 'choice', label: 'Good y is a … of good x', options: ['Substitute', 'Complement'], correct: c > 0 ? 0 : 1 },
          { type: 'choice', label: 'Good x is a … good', options: ['Normal', 'Inferior'], correct: d > 0 ? 0 : 1 },
          { type: 'num', label: r`Intercept of the simplified demand \(Q_x = \_\_ - ${b}P_x\)`, answer: A, tol: 0.001 },
          { type: 'num', label: r`Intercept (choke price) of the inverse demand \(P_x = \_\_ - (1/${b})Q_x\)`, answer: A / b, tol: 0.001 },
        ],
        steps: [
          r`Coefficient on \(P_y\) is ${c > 0 ? 'positive → **substitute**' : 'negative → **complement**'}. Coefficient on \(I\) is ${d > 0 ? 'positive → **normal**' : 'negative → **inferior**'}. [[CQ4 Q1]] [[CQ4 Q2]]`,
          r`Substitute the knowns: \(Q_x = ${tex(a, 0)} - ${b}P_x ${c > 0 ? '+' : '-'} ${Math.abs(c)}(${Py}) ${d > 0 ? '+' : '-'} ${tex(Math.abs(d), 2)}(${tex(I, 0)}) = ${tex(A, 0)} - ${b}P_x\).`,
          r`Solve for price: \(${b}P_x = ${tex(A, 0)} - Q_x\) → \(P_x = ${tex(A / b, 2)} - ${tex(1 / b, 3)}Q_x\). That's the inverse demand function (price on the left). [[CQ4 Q3]]`,
        ],
        src: 'CQ4 Q1-Q3',
      }
    }
  },
}

/** Consumer surplus on linear demand (CQ4 Q4). */
export const csGen: Generator = {
  id: 's07-cs',
  session: 'S07',
  los: ['S07-LO4'],
  title: 'Consumer surplus on a linear demand curve',
  skill: 'CS = ½ × Q × (choke price − P): the triangle under demand, above price (CQ4 Q4)',
  screen: 'examples',
  make(seed) {
    const g = new Rng(seed)
    const [good, units] = g.pick(goods)
    const choke = g.pick([1.5, 2, 4, 5, 10, 20, 40, 50, 80, 100])
    const b = g.pick([10, 20, 50, 100, 200, 500, 1000, 20000]) / (choke >= 10 ? 10 : 1)
    const a = b * choke
    const P = choke * g.pick([0.2, 0.25, 0.4, 0.5, 0.6, 0.75])
    const Q = a - b * P
    const cs = 0.5 * Q * (choke - P)
    return {
      title: 'Consumer surplus',
      prompt: r`Demand for ${good} is \(Q = ${tex(a, 0)} - ${tex(b, 2)}P\) (${units}). The price is **${dollars(P)}**.`,
      parts: [
        { type: 'num', label: 'Choke price (where quantity demanded is zero)', answer: choke, kind: 'money', tol: 0.001 },
        { type: 'num', label: 'Quantity demanded at the current price', answer: Q, tol: 0.001, abs: 0.5 },
        { type: 'num', label: 'Total consumer surplus', answer: cs, kind: 'money', tol: 0.005 },
      ],
      steps: [
        r`Set \(Q = 0\): \(P_{choke} = ${tex(a, 0)}/${tex(b, 2)} = ${tex(choke, 2)}\). [[CQ4 Q4]]`,
        r`\(Q = ${tex(a, 0)} - ${tex(b, 2)}(${tex(P, 2)}) = ${tex(Q, 0)}\).`,
        r`CS is the triangle under demand and above price: \(\tfrac12\times${tex(Q, 0)}\times(${tex(choke, 2)} - ${tex(P, 2)}) = ${tex(cs, 2)}\).`,
        r`Meaning: buyers valued what they bought at ${dollars(cs)} more than they paid — value the firm did *not* capture. [[GEN]]`,
      ],
      src: 'CQ4 Q4',
    }
  },
}

/** Revenue-maximizing price with calculus (CQ4 Q7, Redbox). */
export const revMax: Generator = {
  id: 's07-revmax',
  session: 'S07',
  los: ['S07-LO3'],
  title: 'Revenue-maximizing price with calculus',
  skill: 'R = P·Q(P); dR/dP = 0; solve for P (S07 slides p.30; CQ4 Q7; S05 optional practice)',
  screen: 'examples',
  make(seed) {
    const g = new Rng(seed)
    const [good] = g.pick(goods)
    const b = g.pick([2, 3, 4, 6, 8, 12, 20, 25, 40, 3728])
    const Pstar = g.pick([0.75, 1.25, 2.5, 5, 7.5, 12, 15, 25, 40, 250])
    const a = Math.round(2 * b * Pstar)
    const P = a / (2 * b)
    return {
      title: 'Revenue-maximizing price',
      prompt: r`Demand for ${good} is \(Q = ${tex(a, 0)} - ${tex(b, 0)}P\). What price maximizes total revenue?`,
      parts: [
        { type: 'num', label: r`Coefficient on \(P\) in \(dR/dP\) (i.e., \(dR/dP = ${tex(a, 0)} - \_\_P\))`, answer: 2 * b, tol: 0.001 },
        { type: 'num', label: 'Revenue-maximizing price', answer: P, kind: 'money', tol: 0.002 },
        { type: 'num', label: 'Maximum revenue', answer: P * (a - b * P), kind: 'money', tol: 0.002 },
      ],
      steps: [
        r`Define revenue: \(R = P\cdot Q = ${tex(a, 0)}P - ${tex(b, 0)}P^2\). [[S07 slides p.30]]`,
        r`Derivative: \(\dfrac{dR}{dP} = ${tex(a, 0)} - ${tex(2 * b, 0)}P\).`,
        r`Set to zero and solve: \(P^* = ${tex(a, 0)}/${tex(2 * b, 0)} = ${tex(P, 4)}\).`,
        r`\(Q^* = ${tex(a - b * P, 2)}\), \(R^* = ${tex(P * (a - b * P), 2)}\). At this price OPE = −1 (S08).`,
      ],
      src: 'S07 slides p.30; CQ4 Q7',
    }
  },
}

/** Willingness-to-pay survey → demand schedule → revenue and CS (Dr Pepper exercise). */
export const wtp: Generator = {
  id: 's07-wtp',
  session: 'S07',
  los: ['S07-LO2', 'S07-LO4'],
  title: 'Build demand from a willingness-to-pay survey',
  skill: 'Quantity at a price = # of people whose max WTP ≥ price; scale sample to market; CS = Σ(WTP − P) (S07 workbook)',
  screen: 'widgets',
  make(seed) {
    const g = new Rng(seed)
    const levels = [1.5, 1.25, 1, 0.75, 0.5, 0.25]
    const counts = levels.map(() => g.int(1, 12))
    const cum = counts.map((_, i) => counts.slice(0, i + 1).reduce((s, v) => s + v, 0))
    const ratio = g.pick([100, 200, 300, 500])
    const k = g.int(1, 4)
    const P = levels[k]
    const buyers = cum[k]
    const cs = counts.slice(0, k + 1).reduce((s, n, i) => s + n * (levels[i] - P), 0)
    const rows = ['| Max willingness to pay | # of students |', '| --- | --- |', ...levels.map((l, i) => `| ${dollars(l)} | ${counts[i]} |`)].join('\n')
    return {
      title: 'WTP survey → demand',
      prompt: r`A class survey asked each student the most they would pay for a can of soda (answers rounded to the price levels below). Each student buys at most one can.

${rows}

The market is **${ratio}×** the sample.`,
      parts: [
        { type: 'num', label: `Sample quantity demanded at ${dollars(P)}`, answer: buyers, tol: 0 },
        { type: 'num', label: `Market quantity demanded at ${dollars(P)}`, answer: buyers * ratio, tol: 0.001 },
        { type: 'num', label: `Market revenue at ${dollars(P)}`, answer: buyers * ratio * P, kind: 'money', tol: 0.001 },
        { type: 'num', label: `Sample consumer surplus at ${dollars(P)}`, answer: cs, kind: 'money', tol: 0.001, abs: 0.001 },
      ],
      steps: [
        r`Everyone whose maximum WTP is **at least** ${dollars(P)} buys, so quantity is the cumulative count from the top: ${counts.slice(0, k + 1).join(' + ')} = ${buyers}. [[S07 workbook, Dr Pepper!F5 = SUM(B5:E5)+F4]]`,
        r`Scale to the market: ${buyers} × ${ratio} = ${num(buyers * ratio, 0)}. Revenue = ${num(buyers * ratio, 0)} × ${dollars(P)} = ${dollars(buyers * ratio * P)}.`,
        r`CS = Σ (WTP − price) over buyers: ${counts.slice(0, k + 1).map((n, i) => `${n}×(${levels[i].toFixed(2)}−${P.toFixed(2)})`).join(' + ')} = ${dollars(cs)}.`,
      ],
      src: 'S07 workbook (Dr Pepper vs. Mr. Pibb)',
    }
  },
}

/** Shift vs. movement (conceptual generator). */
export const shiftGen: Generator = {
  id: 's07-shift',
  session: 'S07',
  los: ['S07-LO1'],
  title: 'Shift in demand or change in quantity demanded?',
  skill: 'Own price → movement along; any other determinant → shift (S07 LOs; CQ4 Q1-Q2 sign logic)',
  screen: 'terms',
  make(seed) {
    const g = new Rng(seed)
    const cases: [string, number, string][] = [
      ['The price of Dr Pepper itself falls from $1.00 to $0.75.', 0, 'Own price changed → movement along the curve (quantity demanded rises).'],
      ['Redbox raises its rental price from $1.00 to $1.20.', 0, 'Own price → movement along Redbox’s demand curve (quantity demanded falls).'],
      ['Streaming gets cheaper and better (a substitute for DVD rentals).', 2, 'Price/quality of a substitute improved → demand for DVD rentals shifts LEFT (S09 “demand curves are dynamic”).'],
      ['The price of Mr. Pibb (a substitute for Dr Pepper) rises.', 1, 'Substitute got pricier → Dr Pepper demand shifts RIGHT.'],
      ['The price of milk (a complement to cereal) rises.', 2, 'Complement got pricier → cereal demand shifts LEFT.'],
      ['Average income rises and the good is normal.', 1, 'Normal good + higher income → shift RIGHT.'],
      ['Average income rises and the good is inferior (like good x in CQ4).', 2, 'Inferior good + higher income → shift LEFT.'],
      ['The firm launches a successful advertising campaign.', 1, 'Advertising/consumer preferences → shift RIGHT.'],
      ['The target market’s population grows.', 1, 'More buyers → shift RIGHT.'],
      ['Consumers expect the price to rise next month.', 1, 'Expectations of higher future prices → buy now → shift RIGHT.'],
    ]
    const [txt, ans, why] = g.pick(cases)
    return {
      title: 'Shift or movement?',
      prompt: `For the product in question: **${txt}** What happens to the demand curve?`,
      parts: [{ type: 'choice', label: 'Effect', options: ['Movement along the curve (change in quantity demanded)', 'Demand shifts right (increase in demand)', 'Demand shifts left (decrease in demand)'], correct: ans }],
      steps: [why + ' [[S07 slides p.15]]'],
      src: 'S07 slides p.15 (LOs); S05 slides p.41 (demand determinants)',
    }
  },
}

export const s07Generators = [shifters, csGen, revMax, wtp, shiftGen]
