import { dollars, num, tex } from '../../lib/format'
import { Rng } from '../../lib/rng'
import type { Generator } from '../types'

/**
 * Session 11 slides were not available, so these follow standard managerial economics
 * (Baye & Prince Ch 11 topics) and are labeled General econ on the site.
 */
const r = String.raw
const GEN = 'General econ (B&P Ch 11 topic)'

export const markup: Generator = {
  id: 's11-markup',
  session: 'S11',
  los: ['S11-LO3', 'S11-LO2'],
  title: 'Markup rule and third-degree price discrimination (elasticities)',
  skill: 'P = [E/(1+E)]·MC for each group; charge the less elastic group more',
  screen: 'math',
  make(seed) {
    const g = new Rng(seed)
    const mc = g.pick([4, 5, 6, 8, 10, 12, 20])
    const e1 = g.pick([-1.5, -2, -2.5])
    const e2 = g.pick([-3, -4, -5, -6])
    const [n1, n2] = g.pick([
      ['business travelers', 'leisure travelers'],
      ['adults', 'students'],
      ['weekday golfers', 'seniors'],
      ['downtown customers', 'suburban customers'],
    ])
    const p1 = (e1 / (1 + e1)) * mc
    const p2 = (e2 / (1 + e2)) * mc
    return {
      title: 'Third-degree pricing with the markup rule',
      prompt: r`[[GEN]] A firm with constant marginal cost **${dollars(mc)}** sells to two groups it can tell apart (and resale is impossible). Own-price elasticity: ${n1} **${num(e1, 1)}**, ${n2} **${num(e2, 1)}**.`,
      parts: [
        { type: 'num', label: `Profit-maximizing price for ${n1}`, answer: p1, kind: 'money', tol: 0.005 },
        { type: 'num', label: `Profit-maximizing price for ${n2}`, answer: p2, kind: 'money', tol: 0.005 },
        { type: 'choice', label: 'Which group pays more?', options: [`${n1} (less elastic)`, `${n2} (more elastic)`], correct: p1 > p2 ? 0 : 1 },
      ],
      steps: [
        r`Profit max: \(MR = MC\), with \(MR = P\left(\dfrac{1+E}{E}\right)\) → \(P = \left[\dfrac{E}{1+E}\right]MC\). [[GEN]]`,
        r`${n1}: \(\dfrac{${tex(e1, 1)}}{1 ${tex(e1, 1)}}\times${mc} = ${tex(e1 / (1 + e1), 3)}\times${mc} = ${tex(p1, 2)}\).`,
        r`${n2}: \(\dfrac{${tex(e2, 1)}}{1 ${tex(e2, 1)}}\times${mc} = ${tex(e2 / (1 + e2), 3)}\times${mc} = ${tex(p2, 2)}\).`,
        r`The less elastic (less price-sensitive) group gets the higher markup. That is third-degree price discrimination.`,
      ],
      src: GEN,
    }
  },
}

export const thirdLinear: Generator = {
  id: 's11-third',
  session: 'S11',
  los: ['S11-LO3', 'S11-LO2'],
  title: 'Third-degree price discrimination with two linear demands',
  skill: 'MR₁ = MC and MR₂ = MC separately; each P from its own demand',
  screen: 'examples',
  make(seed) {
    const g = new Rng(seed)
    const mc = g.pick([2, 4, 5, 10])
    const a1 = g.pick([40, 50, 60, 80, 100])
    const a2 = g.pick([16, 20, 24, 30])
    const b1 = g.pick([1, 2])
    const b2 = g.pick([0.5, 1, 2])
    const q1 = (a1 - mc) / (2 * b1)
    const q2 = (a2 - mc) / (2 * b2)
    const p1 = a1 - b1 * q1
    const p2 = a2 - b2 * q2
    return {
      title: 'Two markets',
      prompt: r`[[GEN]] A ski resort with MC = ${dollars(mc)} per lift ticket can separate out-of-state visitors (inverse demand \(P_1 = ${a1} - ${b1}Q_1\)) from local students with ID (\(P_2 = ${a2} - ${tex(b2, 1)}Q_2\)), Q in hundreds.`,
      parts: [
        { type: 'num', label: 'Visitors: quantity (hundreds)', answer: q1, tol: 0.005 },
        { type: 'num', label: 'Visitors: price', answer: p1, kind: 'money', tol: 0.005 },
        { type: 'num', label: 'Students: price', answer: p2, kind: 'money', tol: 0.005 },
      ],
      steps: [
        r`Each market: \(MR_i = a_i - 2b_iQ_i = MC\). Visitors: \(${a1} - ${2 * b1}Q_1 = ${mc}\) → \(Q_1 = ${tex(q1, 2)}\), \(P_1 = ${tex(p1, 2)}\). [[GEN]]`,
        r`Students: \(${a2} - ${tex(2 * b2, 1)}Q_2 = ${mc}\) → \(Q_2 = ${tex(q2, 2)}\), \(P_2 = ${tex(p2, 2)}\).`,
        r`With linear demand and constant MC, each price is halfway between that group's choke price and MC: \((${a1}+${mc})/2\) and \((${a2}+${mc})/2\).`,
      ],
      src: GEN,
    }
  },
}

export const twoPart: Generator = {
  id: 's11-twopart',
  session: 'S11',
  los: ['S11-LO3', 'S11-LO1'],
  title: 'Two-part pricing (fixed fee + per-unit fee)',
  skill: 'Per-unit price = MC; fixed fee = the consumer surplus at that price',
  screen: 'widgets',
  make(seed) {
    const g = new Rng(seed)
    const a = g.pick([10, 12, 20, 30, 40, 50])
    const b = g.pick([0.5, 1, 2])
    const c = g.pick([2, 4, 5, 6].filter((x) => x < a))
    const q = (a - c) / b
    const fee = 0.5 * (a - c) * q
    const thing = g.pick(['a gym', 'a golf club', 'a wholesale club', 'a phone plan'])
    return {
      title: 'Two-part tariff',
      prompt: r`[[GEN]] Each customer of ${thing} has inverse demand \(P = ${a} - ${tex(b, 1)}Q\) (visits per month). Marginal cost is ${dollars(c)} per visit. Design the profit-maximizing two-part price.`,
      parts: [
        { type: 'num', label: 'Per-unit (usage) fee', answer: c, kind: 'money', tol: 0.001 },
        { type: 'num', label: 'Visits each customer buys', answer: q, tol: 0.001 },
        { type: 'num', label: 'Fixed (membership) fee', answer: fee, kind: 'money', tol: 0.001 },
        { type: 'num', label: 'Profit per customer (fee + (price − MC)×Q)', answer: fee, kind: 'money', tol: 0.001 },
      ],
      steps: [
        r`Set the per-unit fee at marginal cost (${dollars(c)}) so every visit worth more than it costs gets bought. That makes the surplus as big as possible. [[GEN]]`,
        r`At \(P = ${c}\): \(Q = (${a} - ${c})/${tex(b, 1)} = ${tex(q, 2)}\).`,
        r`Capture that surplus with the fixed fee: \(\tfrac12(${a} - ${c})(${tex(q, 2)}) = ${tex(fee, 2)}\).`,
        r`Profit per customer = fee + (P − MC)Q = ${dollars(fee)} + 0. The firm captures all consumer surplus.`,
      ],
      src: GEN,
    }
  },
}

export const block: Generator = {
  id: 's11-block',
  session: 'S11',
  los: ['S11-LO3', 'S11-LO1'],
  title: 'Block pricing (sell a package)',
  skill: 'Package size where P = MC; package price = total value (area under demand) of that many units',
  screen: 'examples',
  make(seed) {
    const g = new Rng(seed)
    const a = g.pick([8, 10, 12, 16, 20])
    const b = g.pick([0.5, 1, 2])
    const c = g.pick([1, 2, 4].filter((x) => x < a))
    const q = (a - c) / b
    const value = c * q + 0.5 * (a - c) * q
    const item = g.pick(['toilet-paper rolls', 'soda cans', 'tennis balls', 'golf balls'])
    return {
      title: 'Block pricing',
      prompt: r`[[GEN]] A typical customer's inverse demand for ${item} is \(P = ${a} - ${tex(b, 1)}Q\). Marginal cost is ${dollars(c)} per unit. The firm sells only fixed packages.`,
      parts: [
        { type: 'num', label: 'Units per package', answer: q, tol: 0.001 },
        { type: 'num', label: 'Profit-maximizing package price', answer: value, kind: 'money', tol: 0.001 },
        { type: 'num', label: 'Profit per package', answer: value - c * q, kind: 'money', tol: 0.001 },
      ],
      steps: [
        r`Package size: where demand meets MC, \(${a} - ${tex(b, 1)}Q = ${c}\) → \(Q = ${tex(q, 2)}\). [[GEN]]`,
        r`Price = the customer's total value for those units (area under demand): rectangle \(${c}\times${tex(q, 2)} = ${tex(c * q, 2)}\) + triangle \(\tfrac12(${a}-${c})(${tex(q, 2)}) = ${tex(0.5 * (a - c) * q, 2)}\) → **${dollars(value)}**.`,
        r`Profit = ${dollars(value)} − cost ${dollars(c * q)} = ${dollars(value - c * q)}. That is the same as the two-part tariff: all consumer surplus captured.`,
      ],
      src: GEN,
    }
  },
}

export const bundle: Generator = {
  id: 's11-bundle',
  session: 'S11',
  los: ['S11-LO3', 'S11-LO1'],
  title: 'Commodity bundling with reservation prices',
  skill: 'Compare best separate prices vs. a bundle priced at the lower combined reservation price (negative correlation)',
  screen: 'widgets',
  make(seed) {
    const g = new Rng(seed)
    const hiA = g.pick([12, 15, 20, 25])
    const loA = g.pick([5, 6, 8, 10].filter((x) => x < hiA))
    const hiB = g.pick([10, 12, 14, 18])
    const loB = g.pick([3, 4, 5, 6].filter((x) => x < hiB))
    // consumer 1 likes A, consumer 2 likes B (negatively correlated); MC = 0
    const res = [
      [hiA, loB],
      [loA, hiB],
    ]
    const bestSep = (h: number, l: number) => Math.max(h, 2 * l)
    const sep = bestSep(hiA, loA) + bestSep(hiB, loB)
    const s1 = hiA + loB
    const s2 = loA + hiB
    const bundleRev = Math.max(2 * Math.min(s1, s2), Math.max(s1, s2))
    const bundleP = 2 * Math.min(s1, s2) >= Math.max(s1, s2) ? Math.min(s1, s2) : Math.max(s1, s2)
    return {
      title: 'Bundling',
      prompt: r`[[GEN]] A streaming service sells a sports channel (A) and a movie channel (B). Marginal cost is zero. Two customers' reservation prices ($/month):

| | Sports (A) | Movies (B) |
| --- | --- | --- |
| Customer 1 | ${res[0][0]} | ${res[0][1]} |
| Customer 2 | ${res[1][0]} | ${res[1][1]} |`,
      parts: [
        { type: 'num', label: 'Best total revenue selling A and B separately (one price each)', answer: sep, kind: 'money', tol: 0.001 },
        { type: 'num', label: 'Best bundle price', answer: bundleP, kind: 'money', tol: 0.001 },
        { type: 'num', label: 'Revenue from the bundle', answer: bundleRev, kind: 'money', tol: 0.001 },
        { type: 'choice', label: 'Should the firm bundle?', options: ['Yes — the bundle earns more', 'No — separate pricing earns at least as much'], correct: bundleRev > sep ? 0 : 1 },
      ],
      steps: [
        r`Separate: for A, price at ${hiA} (sell 1 → ${hiA}) or ${loA} (sell 2 → ${2 * loA}) → ${bestSep(hiA, loA)}. For B: ${hiB} vs. ${2 * loB} → ${bestSep(hiB, loB)}. Total ${sep}. [[GEN]]`,
        r`Bundle reservation prices: customer 1 = ${s1}, customer 2 = ${s2}. Price at ${Math.min(s1, s2)} (both buy → ${2 * Math.min(s1, s2)}) or ${Math.max(s1, s2)} (one buys) → best ${dollars(bundleRev)} at ${dollars(bundleP)}.`,
        r`Reservation prices are **negatively correlated** (each customer values a different channel more), so the bundle evens out willingness to pay and captures more surplus.`,
      ],
      src: GEN,
    }
  },
}

export const peak: Generator = {
  id: 's11-peak',
  session: 'S11',
  los: ['S11-LO3', 'S11-LO1'],
  title: 'Peak-load pricing',
  skill: 'Set MR = MC separately in peak and off-peak periods; peak demand → higher price',
  screen: 'examples',
  make(seed) {
    const g = new Rng(seed)
    const c = g.pick([2, 4, 5, 6])
    const ap = g.pick([30, 40, 50, 60])
    const ao = g.pick([10, 12, 16, 20])
    const b = g.pick([1, 2])
    const qp = (ap - c) / (2 * b)
    const qo = (ao - c) / (2 * b)
    return {
      title: 'Peak-load pricing',
      prompt: r`[[GEN]] The BYU Testing Center (like the student project) faces peak demand during finals \(P = ${ap} - ${b}Q\) and off-peak demand \(P = ${ao} - ${b}Q\) (Q in hundreds of exams/day). Marginal cost is ${dollars(c)}.`,
      parts: [
        { type: 'num', label: 'Peak price', answer: ap - b * qp, kind: 'money', tol: 0.005 },
        { type: 'num', label: 'Off-peak price', answer: ao - b * qo, kind: 'money', tol: 0.005 },
      ],
      steps: [
        r`Peak: \(MR = ${ap} - ${2 * b}Q = ${c}\) → \(Q = ${tex(qp, 2)}\), \(P = ${tex(ap - b * qp, 2)}\). [[GEN]]`,
        r`Off-peak: \(${ao} - ${2 * b}Q = ${c}\) → \(Q = ${tex(qo, 2)}\), \(P = ${tex(ao - b * qo, 2)}\).`,
        r`Charging more at the peak shifts some demand to off-peak days and recovers the cost of capacity that is only needed at the peak. The BYU Testing Center project proposed exactly this kind of fee. [[Skim: Group Projects from Prior Years page]]`,
      ],
      src: GEN,
    }
  },
}

export const transfer: Generator = {
  id: 's11-transfer',
  session: 'S11',
  los: ['S11-LO3', 'S11-LO1'],
  title: 'Transfer pricing (no external market)',
  skill: 'Firm-wide MR = MC_upstream + MC_downstream; transfer price = upstream MC',
  screen: 'examples',
  make(seed) {
    const g = new Rng(seed)
    const a = g.pick([100, 120, 150, 200])
    const b = g.pick([1, 2])
    const mu = g.pick([10, 15, 20])
    const md = g.pick([5, 10, 15])
    const q = (a - mu - md) / (2 * b)
    return {
      title: 'Transfer pricing',
      prompt: r`[[GEN]] A firm's upstream division makes an engine (constant MC ${dollars(mu)}) that its downstream division assembles into a scooter (assembly MC ${dollars(md)}). Final demand: \(P = ${a} - ${b}Q\). There is no outside market for engines.`,
      parts: [
        { type: 'num', label: 'Firm-wide profit-maximizing Q', answer: q, tol: 0.005 },
        { type: 'num', label: 'Scooter price', answer: a - b * q, kind: 'money', tol: 0.005 },
        { type: 'num', label: 'Optimal transfer price per engine', answer: mu, kind: 'money', tol: 0.001 },
      ],
      steps: [
        r`Maximize total firm profit: \(MR = ${a} - ${2 * b}Q = MC_u + MC_d = ${mu + md}\) → \(Q = ${tex(q, 2)}\), \(P = ${tex(a - b * q, 2)}\). [[GEN]]`,
        r`Set the transfer price at the upstream division's marginal cost (${dollars(mu)}). Then the downstream manager, maximizing their division’s profit, chooses the firm-optimal Q. A higher transfer price causes “double marginalization”: the downstream division sells too few scooters.`,
      ],
      src: GEN,
    }
  },
}

export const s11Generators = [markup, thirdLinear, twoPart, block, bundle, peak, transfer]
