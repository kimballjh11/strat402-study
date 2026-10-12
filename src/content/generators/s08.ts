import { Rng } from '../../lib/rng'
import { num, tex, dollars } from '../../lib/format'
import type { Generator, Problem } from '../types'

const r = String.raw
const classify = (e: number) => (Math.abs(e + 1) < 1e-9 ? 2 : e < -1 ? 0 : 1)
const CLASS_OPTS = ['Elastic (OPE < −1)', 'Inelastic (−1 < OPE < 0)', 'Unitary elastic (OPE = −1)']
const goods = [
  ['a cold-brew coffee shop', 'cups', 'cup'],
  ['a ski resort', 'day passes', 'pass'],
  ['a Provo food truck', 'tacos', 'taco'],
  ['a streaming app', 'subscriptions', 'month'],
  ['a campus print shop', 'color pages', 'page'],
  ['a car wash', 'washes', 'wash'],
  ['a climbing gym', 'memberships', 'membership'],
] as const

/** Arc (algebraic) OPE from a before/after price change, like Redbox $1.00 → $1.20. */
export const opeArc: Generator = {
  id: 's08-ope-arc',
  session: 'S08',
  los: ['S08-LO1', 'S08-LO2'],
  title: 'Own-price elasticity from a price change',
  skill: 'Algebraic OPE = %ΔQ ÷ %ΔP using the old values as the base (S08 slides p.23, Redbox exercise)',
  screen: 'apply',
  make(seed) {
    const g = new Rng(seed)
    const [biz, units] = g.pick(goods)
    let P0 = 0, P1 = 0, Q0 = 0, Q1 = 0, dP = 0, dQ = 0, E = 0
    for (let tries = 0; tries < 50; tries++) {
      P0 = g.pick([1, 2, 4, 5, 8, 10, 12, 20, 25, 40, 50])
      dP = g.pick([0.1, 0.2, 0.25]) * (g.bool(0.75) ? 1 : -1)
      E = g.pick([-0.25, -0.4, -0.5, -0.6, -0.75, -1.5, -2, -2.5, -3])
      dQ = E * dP
      Q0 = g.step(1000, 9000, 100)
      P1 = P0 * (1 + dP)
      Q1 = Math.round(Q0 * (1 + dQ))
      const revUp = P1 * Q1 > P0 * Q0
      const predictUp = E > -1 ? dP > 0 : dP < 0
      if (revUp === predictUp && Q1 > 0) break
    }
    const E2 = ((Q1 - Q0) / Q0) / ((P1 - P0) / P0)
    const R0 = P0 * Q0, R1 = P1 * Q1
    const p: Problem = {
      title: 'OPE from a price change',
      prompt: r`${biz[0].toUpperCase() + biz.slice(1)} changed its price from **${dollars(P0)} to ${dollars(P1)}**. Quantity demanded went from **${num(Q0, 0)} to ${num(Q1, 0)}** ${units} per week (everything else held constant). Use the algebraic formula with the *original* price and quantity as the base.`,
      parts: [
        { type: 'num', label: r`Percentage change in quantity, \(\%\Delta Q\)`, answer: (Q1 - Q0) / Q0, kind: 'percent', tol: 0.005, abs: 0.0005 },
        { type: 'num', label: r`Percentage change in price, \(\%\Delta P\)`, answer: (P1 - P0) / P0, kind: 'percent', tol: 0.005, abs: 0.0005 },
        { type: 'num', label: 'Own-price elasticity (OPE)', answer: E2, tol: 0.01, abs: 0.005 },
        { type: 'choice', label: 'At the original price, demand is…', options: CLASS_OPTS, correct: classify(E2) },
        { type: 'choice', label: 'So total revenue…', options: ['Rose', 'Fell'], correct: R1 > R0 ? 0 : 1 },
      ],
      steps: [
        r`\(\%\Delta Q = \dfrac{Q_{new}-Q_{old}}{Q_{old}} = \dfrac{${tex(Q1, 0)} - ${tex(Q0, 0)}}{${tex(Q0, 0)}} = ${tex(((Q1 - Q0) / Q0) * 100, 1)}\%\)`,
        r`\(\%\Delta P = \dfrac{P_{new}-P_{old}}{P_{old}} = \dfrac{${tex(P1)} - ${tex(P0)}}{${tex(P0)}} = ${tex(((P1 - P0) / P0) * 100, 1)}\%\)`,
        r`\(OPE = \dfrac{\%\Delta Q}{\%\Delta P} = \dfrac{${tex(((Q1 - Q0) / Q0) * 100, 1)}\%}{${tex(((P1 - P0) / P0) * 100, 1)}\%} = ${tex(E2)}\)`,
        r`${E2 < -1 ? r`\(OPE < -1\) → **elastic**: customers are relatively price sensitive.` : r`\(-1 < OPE < 0\) → **inelastic**: customers are relatively price insensitive.`} [[S08 slides p.17]]`,
        r`Total revenue test: ${E2 < -1 ? 'elastic' : 'inelastic'} demand and a price ${dP > 0 ? 'increase' : 'decrease'} → revenue ${R1 > R0 ? 'rises' : 'falls'}. Check: \(${tex(P0)}\times${tex(Q0, 0)} = ${tex(R0, 0)}\) vs. \(${tex(P1)}\times${tex(Q1, 0)} = ${tex(R1, 0)}\). [[S08 slides p.18]]`,
      ],
      src: 'S08 slides pp.21-23',
    }
    return p
  },
  verify(seed) {
    const p = this.make(seed)
    const e = (p.parts[2] as { answer: number }).answer
    if (!Number.isFinite(e) || e >= 0) return `OPE not negative: ${e}`
    return null
  },
}

/** Point OPE on a linear demand function, like Dr Pepper Q = 30,000 − 20,000P. */
export const opeLinear: Generator = {
  id: 's08-ope-linear',
  session: 'S08',
  los: ['S08-LO1', 'S08-LO2'],
  title: 'Point elasticity on a linear demand curve',
  skill: 'Calculus OPE = (∂Q/∂P)(P/Q); revenue-max where OPE = −1 (S08 workbook OPE tab; CQ4 Q5–Q7)',
  screen: 'apply',
  make(seed) {
    const g = new Rng(seed)
    const [biz, units] = g.pick(goods)
    const scale = g.pick([1, 10, 100, 1000])
    const choke = g.pick([2, 4, 5, 8, 10, 12, 20, 40, 50, 60, 80, 100, 120])
    const b = g.pick([2, 4, 5, 10, 20, 25, 50]) * scale / (choke >= 20 ? 10 : 1)
    const a = b * choke
    const P = choke * g.pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8])
    const Q = a - b * P
    const E = (-b * P) / Q
    const Pstar = choke / 2
    return {
      title: 'Point OPE on linear demand',
      prompt: r`Demand for ${biz} is \(Q = ${tex(a, 2)} - ${tex(b, 2)}P\), where \(Q\) is ${units} per month and \(P\) is the price.`,
      parts: [
        { type: 'num', label: r`Quantity demanded at \(P = ${dollars(P)}\)`, answer: Q, tol: 0.005, abs: 0.5 },
        { type: 'num', label: r`OPE at \(P = ${dollars(P)}\)`, answer: E, tol: 0.01, abs: 0.005 },
        { type: 'choice', label: 'Demand at that price is…', options: CLASS_OPTS, correct: classify(E) },
        { type: 'num', label: 'Revenue-maximizing price', answer: Pstar, kind: 'money', tol: 0.005 },
      ],
      steps: [
        r`Plug in the price: \(Q = ${tex(a, 2)} - ${tex(b, 2)}(${tex(P)}) = ${tex(Q, 2)}\).`,
        r`The slope \(\partial Q/\partial P\) is the coefficient on \(P\): \(${tex(-b, 2)}\).`,
        r`\(OPE = \dfrac{\partial Q}{\partial P}\cdot\dfrac{P}{Q} = (${tex(-b, 2)})\cdot\dfrac{${tex(P)}}{${tex(Q, 2)}} = ${tex(E)}\) [[S08 slides p.16]]`,
        r`${E < -1 ? 'Below −1 → elastic.' : Math.abs(E + 1) < 1e-9 ? 'Exactly −1 → unitary: revenue is at its peak.' : 'Between −1 and 0 → inelastic.'}`,
        r`Revenue: \(R = P\cdot Q = ${tex(a, 2)}P - ${tex(b, 2)}P^2\). Set \(\dfrac{dR}{dP} = ${tex(a, 2)} - ${tex(2 * b, 2)}P = 0\) → \(P^* = ${tex(Pstar)}\). There \(OPE = -1\). [[S08 workbook, OPE - Solution comment B61]]`,
      ],
      src: 'S08 workbook OPE tab; CQ4 Q5',
    }
  },
  verify(seed) {
    const p = this.make(seed)
    const Q = (p.parts[0] as { answer: number }).answer
    const E = (p.parts[1] as { answer: number }).answer
    if (!(Q > 0)) return `Q not positive: ${Q}`
    if (!(E < 0)) return `E not negative`
    return null
  },
}

/** CPE from a demand function, like Qx = 500 − 5Px + 4Py (S08 slides pp.28-31). */
export const cpe: Generator = {
  id: 's08-cpe',
  session: 'S08',
  los: ['S08-LO1', 'S08-LO2'],
  title: 'Cross-price elasticity from a demand function',
  skill: 'CPE = (∂Qx/∂Py)(Py/Qx); sign → substitutes/complements; %ΔQx = CPE × %ΔPy (S08 slides pp.28-31)',
  screen: 'apply',
  make(seed) {
    const g = new Rng(seed)
    const sub = g.bool()
    const a = g.step(300, 2000, 50)
    const b = g.pick([2, 3, 4, 5, 6, 8, 10])
    const c = g.pick([2, 3, 4, 5, 6]) * (sub ? 1 : -1)
    let Px = 0, Py = 0, Qx = 0
    for (let t = 0; t < 30; t++) {
      Px = g.step(5, 60, 5)
      Py = g.step(5, 60, 5)
      Qx = a - b * Px + c * Py
      if (Qx > a * 0.2) break
    }
    const E = (c * Py) / Qx
    const k = g.pick([0.05, 0.1, 0.2, 0.25]) * (g.bool() ? 1 : -1)
    return {
      title: 'CPE from a demand function',
      prompt: r`Demand for good x is \(Q_x = ${tex(a, 0)} - ${b}P_x ${c > 0 ? '+' : '-'} ${Math.abs(c)}P_y\). Currently \(P_x = ${Px}\) and \(P_y = ${Py}\).`,
      parts: [
        { type: 'choice', label: 'Good y is a … of good x', options: ['Substitute', 'Complement'], correct: sub ? 0 : 1 },
        { type: 'num', label: r`\(Q_x\) at current prices`, answer: Qx, tol: 0.001, abs: 0.5 },
        { type: 'num', label: 'CPE (2 decimals)', answer: E, tol: 0.02, abs: 0.006 },
        { type: 'num', label: r`If \(P_y\) ${k > 0 ? 'rises' : 'falls'} by ${num(Math.abs(k) * 100, 0)}%, the % change in \(Q_x\) is`, answer: E * k, kind: 'percent', tol: 0.03, abs: 0.0006 },
      ],
      steps: [
        r`Look at the sign on \(P_y\): ${c > 0 ? 'positive → **substitute**' : 'negative → **complement**'}. [[S08 slides p.29]]`,
        r`\(Q_x = ${tex(a, 0)} - ${b}(${Px}) ${c > 0 ? '+' : '-'} ${Math.abs(c)}(${Py}) = ${tex(Qx, 0)}\)`,
        r`\(CPE = \dfrac{\partial Q_x}{\partial P_y}\cdot\dfrac{P_y}{Q_x} = (${c})\cdot\dfrac{${Py}}{${tex(Qx, 0)}} = ${tex(E, 3)}\) [[S08 slides p.30]]`,
        r`\(\%\Delta Q_x = CPE\times\%\Delta P_y = ${tex(E, 3)}\times(${tex(k * 100, 0)}\%) = ${tex(E * k * 100, 2)}\%\) [[S08 slides p.31]]`,
      ],
      src: 'S08 slides pp.28-31',
    }
  },
  verify(seed) {
    const p = this.make(seed)
    const Q = (p.parts[1] as { answer: number }).answer
    return Q > 0 ? null : `Qx not positive ${Q}`
  },
}

/** Predict the % change in quantity (and revenue direction) from a given elasticity. */
export const predict: Generator = {
  id: 's08-predict',
  session: 'S08',
  los: ['S08-LO2'],
  title: 'Use an elasticity to predict quantity and revenue',
  skill: '%ΔQ = elasticity × %Δ(driver); total revenue test (CQ4 Q8–Q9; S08 slides p.18)',
  screen: 'apply',
  make(seed) {
    const g = new Rng(seed)
    const kind = g.pick(['ope', 'cpe'] as const)
    if (kind === 'ope') {
      const E = g.pick([-0.2, -0.4, -0.5, -0.7, -0.8, -1.2, -1.5, -2, -2.5, -3, -4])
      const dP = g.pick([0.05, 0.1, 0.15, 0.2]) * (g.bool() ? 1 : -1)
      const dQ = E * dP
      const revUp = (1 + dP) * (1 + dQ) > 1
      return {
        title: 'Predict from OPE',
        prompt: r`Your analysts estimate OPE = **${num(E, 2)}** at the current price. The CEO wants to ${dP > 0 ? 'raise' : 'cut'} price by **${num(Math.abs(dP) * 100, 0)}%**.`,
        parts: [
          { type: 'num', label: r`Expected % change in quantity demanded`, answer: dQ, kind: 'percent', tol: 0.005, abs: 0.0005 },
          { type: 'choice', label: 'Total revenue will…', options: ['Rise', 'Fall'], correct: revUp ? 0 : 1 },
          { type: 'choice', label: 'To maximize revenue the firm should move price…', options: ['Up', 'Down', 'Nowhere — already at OPE = −1'], correct: E > -1 ? 0 : 1 },
        ],
        steps: [
          r`\(\%\Delta Q = OPE\times\%\Delta P = (${tex(E)})\times(${tex(dP * 100, 0)}\%) = ${tex(dQ * 100, 1)}\%\)`,
          r`${E < -1 ? 'Elastic' : 'Inelastic'} demand: a price ${dP > 0 ? 'increase' : 'cut'} makes revenue ${revUp ? 'rise' : 'fall'} — quantity moves ${Math.abs(E) > 1 ? 'more' : 'less'} than price in % terms. Check: \((1${dP > 0 ? '+' : '-'}${tex(Math.abs(dP), 2)})(1${dQ > 0 ? '+' : '-'}${tex(Math.abs(dQ), 3)}) = ${tex((1 + dP) * (1 + dQ), 3)}\).`,
          r`Revenue peaks at OPE = −1, so ${E > -1 ? 'raise price (inelastic → room to go up)' : 'lower price (elastic → each cut gains more volume than it gives up in price)'}. [[S08 slides p.18]] [[CQ4 Q9]]`,
        ],
        src: 'S08 slides p.18; CQ4 Q9',
      }
    }
    const E = g.pick([-2, -1.5, -0.8, -0.5, -0.3, 0.3, 0.5, 1.2, 2, 2.5])
    const dPy = g.pick([0.1, 0.2, 0.25, 0.3]) * (g.bool() ? 1 : -1)
    return {
      title: 'Predict from CPE',
      prompt: r`The cross-price elasticity of good x with respect to good y is **${num(E, 1)}**. The price of good y ${dPy > 0 ? 'increases' : 'decreases'} by **${num(Math.abs(dPy) * 100, 0)}%**.`,
      parts: [
        { type: 'num', label: 'Expected % change in demand for x', answer: E * dPy, kind: 'percent', tol: 0.005, abs: 0.0005 },
        { type: 'choice', label: 'x and y are…', options: ['Substitutes', 'Complements'], correct: E > 0 ? 0 : 1 },
      ],
      steps: [
        r`\(CPE = \dfrac{\%\Delta Q_x}{\%\Delta P_y}\) so \(\%\Delta Q_x = ${tex(E, 1)}\times(${tex(dPy * 100, 0)}\%) = ${tex(E * dPy * 100, 1)}\%\). [[CQ4 Q8]]`,
        r`CPE ${E > 0 ? '> 0 → substitutes' : '< 0 → complements'}. [[S08 slides p.27]]`,
      ],
      src: 'CQ4 Q8; S08 slides p.27',
    }
  },
}

/** Income elasticity — labeled General econ (formula is from B&P Ch 3, not the slides). */
export const incomeE: Generator = {
  id: 's08-income',
  session: 'S08',
  los: ['S08-LO2'],
  title: 'Income elasticity (normal vs. inferior)',
  skill: 'E_I = (∂Q/∂I)(I/Q). General econ — the slides list income elasticity as a type but give no formula.',
  screen: 'apply',
  make(seed) {
    const g = new Rng(seed)
    const normal = g.bool()
    const a = g.step(2000, 8000, 500)
    const b = g.pick([10, 20, 25, 40, 50])
    const d = g.pick([0.02, 0.04, 0.05, 0.1]) * (normal ? 1 : -1)
    const P = g.step(10, 60, 5)
    const I = g.step(20000, 60000, 5000)
    const Q = a - b * P + d * I
    if (Q <= 0) return incomeE.make(seed + 1)
    const E = (d * I) / Q
    return {
      title: 'Income elasticity',
      prompt: r`[[GEN]] Demand is \(Q = ${tex(a, 0)} - ${b}P ${d > 0 ? '+' : '-'} ${tex(Math.abs(d), 2)}I\), with \(P = ${P}\) and average income \(I = ${tex(I, 0)}\).`,
      parts: [
        { type: 'num', label: r`\(Q\)`, answer: Q, tol: 0.001, abs: 0.5 },
        { type: 'num', label: 'Income elasticity (2 decimals)', answer: E, tol: 0.02, abs: 0.006 },
        { type: 'choice', label: 'The good is…', options: ['Normal', 'Inferior'], correct: normal ? 0 : 1 },
      ],
      steps: [
        r`\(Q = ${tex(a, 0)} - ${b}(${P}) ${d > 0 ? '+' : '-'} ${tex(Math.abs(d), 2)}(${tex(I, 0)}) = ${tex(Q, 0)}\)`,
        r`\(E_I = \dfrac{\partial Q}{\partial I}\cdot\dfrac{I}{Q} = ${tex(d, 2)}\cdot\dfrac{${tex(I, 0)}}{${tex(Q, 0)}} = ${tex(E, 3)}\) [[GEN]]`,
        r`Sign tells the story: ${d > 0 ? 'positive → **normal** good (CQ4 logic: a positive income coefficient)' : 'negative → **inferior** good (like CQ4 Q2, coefficient −0.2)'}. [[CQ4 Q2]]`,
      ],
      src: 'General econ (B&P Ch 3); sign rule from CQ4 Q2',
    }
  },
  verify(seed) {
    const p = this.make(seed)
    return (p.parts[0] as { answer: number }).answer > 0 ? null : 'Q<=0'
  },
}

export const s08Generators = [opeArc, opeLinear, cpe, predict, incomeE]

