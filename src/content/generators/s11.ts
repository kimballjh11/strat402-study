import { dollars, num, tex } from '../../lib/format'
import { Rng } from '../../lib/rng'
import type { Generator } from '../types'

/** Practice in the form of the Session 11 slides and the Cascade exercise. */
const r = String.raw
const SL = 'S11 slides pp.19-20'
const EX = 'Advanced Pricing Strategies Exercise'

export const csGen: Generator = {
  id: 's11-cs',
  session: 'S11',
  los: ['S11-LO5', 'S11-LO3'],
  title: 'Consumer surplus from a linear demand function',
  skill: 'Inverse demand, quantity at the price, then CS = ½ × base × height',
  screen: 'math',
  make(seed) {
    const g = new Rng(seed)
    const b = g.pick([500, 1000, 2000, 5000, 20000])
    const choke = g.pick([2, 3, 4, 5, 10])
    const a = choke * b
    const p = g.pick([0.5, 1, 1.5, 2].filter((x) => x < choke))
    const q = a - b * p
    const cs = 0.5 * q * (choke - p)
    return {
      title: 'Consumer surplus',
      prompt: r`Demand is \(Q = ${num(a, 0)} - ${num(b, 0)}P\). The price is ${dollars(p)}. Use the slide’s four steps. [[${SL}]]`,
      parts: [
        { type: 'num', label: 'Choke price (inverse-demand intercept)', answer: choke, kind: 'money', tol: 0.001 },
        { type: 'num', label: 'Quantity demanded', answer: q, tol: 0.001 },
        { type: 'num', label: 'Consumer surplus', answer: cs, kind: 'money', tol: 0.05 },
      ],
      steps: [
        r`Inverse demand: \(P = ${tex(choke, 2)} - Q/${num(b, 0)}\). Choke price = **${dollars(choke)}**. [[${SL}]]`,
        r`At ${dollars(p)}: \(Q = ${num(a, 0)} - ${num(b, 0)}\times${tex(p, 2)} = ${num(q, 0)}\).`,
        r`Height = ${tex(choke, 2)} − ${tex(p, 2)} = ${tex(choke - p, 2)}. \(CS = \tfrac12 \times ${num(q, 0)} \times ${tex(choke - p, 2)} = ${tex(cs, 2)}\).`,
      ],
      src: SL,
    }
  },
}

export const twoPart: Generator = {
  id: 's11-twopart',
  session: 'S11',
  los: ['S11-LO3', 'S11-LO1'],
  title: 'Two-part price (usage fee at MC, access fee = CS)',
  skill: 'Same construction as the Sundance season pass',
  screen: 'examples',
  make(seed) {
    const g = new Rng(seed)
    const slope = g.pick([5, 10, 15, 20])
    const qMax = g.pick([8, 10, 12])
    const choke = slope * qMax
    const mc = g.pick([0, 0, slope, 2 * slope].filter((c) => c < choke))
    const q = (choke - mc) / slope
    const fee = 0.5 * (choke - mc) * q
    return {
      title: 'Two-part price',
      prompt: r`A customer’s inverse demand is \(P = ${choke} - ${slope}Q\). Marginal cost is ${dollars(mc)}. Set the profit-maximizing two-part price the way the Sundance slide does. [[S11 slides pp.22,25]]`,
      parts: [
        { type: 'num', label: 'Usage fee', answer: mc, kind: 'money', tol: 0.001 },
        { type: 'num', label: 'Units the customer buys at that usage fee', answer: q, tol: 0.001 },
        { type: 'num', label: 'Access fee', answer: fee, kind: 'money', tol: 0.05 },
      ],
      steps: [
        r`Usage fee = marginal cost = ${dollars(mc)}. [[S11 slides p.22]]`,
        r`\(Q = (${choke} - ${mc})/${slope} = ${tex(q, 2)}\).`,
        r`Access fee = consumer surplus = \(\tfrac12(${choke} - ${mc})(${tex(q, 2)}) = ${tex(fee, 2)}\). On the Sundance slide, MC = 0, Q = 10, and the pass is $750.`,
      ],
      src: 'S11 slides p.25',
    }
  },
}

export const block: Generator = {
  id: 's11-block',
  session: 'S11',
  los: ['S11-LO3', 'S11-LO1'],
  title: 'Block price (area under demand up to where P = MC)',
  skill: 'Same construction as the Dr Pepper 12-pack and the Spotify annual plan',
  screen: 'examples',
  make(seed) {
    const g = new Rng(seed)
    const a = g.pick([10, 12, 14, 16, 20])
    const mc = g.pick([0, 2, 4].filter((c) => c < a))
    const q = a - mc
    const price = mc * q + 0.5 * (a - mc) * q
    const profit = price - mc * q
    return {
      title: 'Block price',
      prompt: r`A typical customer’s inverse demand is \(P = ${a} - Q\). Marginal cost is ${dollars(mc)} per unit. The firm sells only a fixed package, as on the block-pricing slides. [[S11 slides pp.26-28]]`,
      parts: [
        { type: 'num', label: 'Units in the package (where P = MC)', answer: q, tol: 0.001 },
        { type: 'num', label: 'Package price', answer: price, kind: 'money', tol: 0.05 },
        { type: 'num', label: 'Profit on the package', answer: profit, kind: 'money', tol: 0.05 },
      ],
      steps: [
        r`\(Q^*\): \({a} - Q = ${mc}\) so \(Q^* = ${q}\). [[S11 slides p.26]]`,
        r`Package price = rectangle \(${mc}\times${q} = ${tex(mc * q, 2)}\) plus triangle \(\tfrac12(${a}-${mc})(${q}) = ${tex(0.5 * (a - mc) * q, 2)}\) → **${dollars(price)}**.`,
        r`Profit = price − cost = ${dollars(price)} − ${dollars(mc * q)} = ${dollars(profit)}. Spotify’s version of this, with P = 14 − Q and MC = $2, is a $96 annual plan.`,
      ],
      src: 'S11 slides p.28',
    }
  },
}

export const bundle: Generator = {
  id: 's11-bundle',
  session: 'S11',
  los: ['S11-LO3', 'S11-LO1'],
  title: 'Commodity bundle with two customers',
  skill: 'Who buys at the separate prices, and who buys the bundle — the Five Guys question',
  screen: 'widgets',
  make(seed) {
    const g = new Rng(seed)
    const hi = g.pick([8, 10, 12])
    const lo = g.pick([2, 3, 4].filter((x) => x < hi))
    const midA = hi - 2
    const midB = lo + 2
    // customer 1 likes A, customer 2 likes B; pair values equal hi+lo and midA+midB
    const a1 = hi
    const b1 = lo
    const a2 = midA
    const b2 = midB
    const pA = hi
    const pB = midB
    // At these prices: cust1 buys A only if a1>=pA and b1<pB; cust2 buys B only if a2<pA and b2>=pB
    const rev1 = a1 >= pA && b1 < pB ? pA : a1 + b1 >= pA + pB ? pA + pB : 0
    const rev2 = a2 < pA && b2 >= pB ? pB : a2 + b2 >= pA + pB ? pA + pB : 0
    const separate = rev1 + rev2
    const pair1 = a1 + b1
    const pair2 = a2 + b2
    const bundleP = Math.min(pair1, pair2)
    const bundleRev = (pair1 >= bundleP ? bundleP : 0) + (pair2 >= bundleP ? bundleP : 0)
    return {
      title: 'Bundling',
      prompt: r`Two customers, as on the Five Guys slide. Marginal cost is zero.

| | Product A | Product B |
| --- | --- | --- |
| Customer 1 | ${a1} | ${b1} |
| Customer 2 | ${a2} | ${b2} |

Posted prices if sold separately: A = ${dollars(pA)}, B = ${dollars(pB)}. A customer buys an item only when their value is at least the price. [[S11 slides p.31]]`,
      parts: [
        { type: 'num', label: 'Revenue from selling A and B separately at those prices', answer: separate, kind: 'money', tol: 0.001 },
        { type: 'num', label: 'Bundle price equal to the lower of the two pair-values', answer: bundleP, kind: 'money', tol: 0.001 },
        { type: 'num', label: 'Revenue if both customers buy that bundle', answer: bundleRev, kind: 'money', tol: 0.001 },
        { type: 'choice', label: 'Does the bundle earn more than those separate prices?', options: ['Yes', 'No'], correct: bundleRev > separate ? 0 : 1 },
      ],
      steps: [
        r`Separately: customer 1 pays ${dollars(rev1)}, customer 2 pays ${dollars(rev2)}. Total **${dollars(separate)}**. On the slide, $8 and $4 produce $12. [[S11 slides p.31]]`,
        r`Pair values: ${pair1} and ${pair2}. Price the bundle at ${dollars(bundleP)} and both buy → **${dollars(bundleRev)}**.`,
        r`The gain comes from negatively correlated tastes: each customer wants a different item, and the bundle prices the pair.`,
      ],
      src: 'S11 slides p.31',
    }
  },
}

export const peak: Generator = {
  id: 's11-peak',
  session: 'S11',
  los: ['S11-LO3', 'S11-LO1'],
  title: 'Peak-load price from two fitted lines',
  skill: 'Q = (P − a)/b, OPE = (1/b)(P/Q), then P* = (a + MC)/2 — the Cascade steps',
  screen: 'examples',
  make(seed) {
    const g = new Rng(seed)
    const ab = g.pick([5000, 5600, 5861, 6200])
    const bb = g.pick([-180, -200, -219, -250])
    const as = g.pick([4600, 5021, 5400])
    const bs = g.pick([-200, -238, -260])
    const list = 4000
    const mc = g.pick([2000, 2517, 3000])
    const qOf = (a: number, b: number, p: number) => (p - a) / b
    const ope = (b: number, p: number, q: number) => (1 / b) * (p / q)
    const qb = qOf(ab, bb, list)
    const qs = qOf(as, bs, list)
    const ob = ope(bb, list, qb)
    const os = ope(bs, list, qs)
    const pStar = (a: number) => (a + mc) / 2
    return {
      title: 'Two seasons',
      prompt: r`A contractor has fitted jobs per month: busy \(P = ${ab} ${tex(bb, 0)}Q\), slow \(P = ${as} ${tex(bs, 0)}Q\). The list price is ${dollars(list)} per ton. Marginal cost is ${dollars(mc)} per ton. Use the exercise formulas. [[${EX}]]`,
      parts: [
        { type: 'num', label: 'Busy-season jobs per month at the list price', answer: qb, tol: 0.02 },
        { type: 'num', label: 'Slow-season own-price elasticity at the list price', answer: os, tol: 0.02 },
        { type: 'num', label: 'Profit-maximizing busy-season price', answer: pStar(ab), kind: 'money', tol: 1 },
        { type: 'num', label: 'Profit-maximizing slow-season price', answer: pStar(as), kind: 'money', tol: 1 },
      ],
      steps: [
        r`\(Q = (P - a)/b\). Busy: \((${list} - ${ab})/${tex(bb, 0)} = ${tex(qb, 2)}\). Slow: \((${list} - ${as})/${tex(bs, 0)} = ${tex(qs, 2)}\). [[${EX}]]`,
        r`\(OPE = (1/b)(P/Q)\). Slow: \((1/${tex(bs, 0)})(${list}/${tex(qs, 2)}) = ${tex(os, 2)}\). Busy OPE is ${tex(ob, 2)}. The season with the more negative elasticity is more price-sensitive.`,
        r`For \(P = a + bQ\), \(MR = a + 2bQ\). Set MR = MC: \(P^* = (a + MC)/2\). Busy **${dollars(pStar(ab))}**, slow **${dollars(pStar(as))}**.`,
        r`On Cascade’s own fit this is about $4,189 busy and $3,769 slow. The price that merely equalizes volume is a much deeper cut, and it does not pay.`,
      ],
      src: EX,
    }
  },
}

export const s11Generators = [csGen, twoPart, block, bundle, peak]
