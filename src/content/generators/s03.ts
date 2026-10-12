import { c4, hhi } from '../../lib/econ'
import { num } from '../../lib/format'
import { Rng } from '../../lib/rng'
import type { Generator } from '../types'

const r = String.raw

const MARKETS = [
  ['US wireless carriers', ['Verizon', 'AT&T', 'T-Mobile', 'US Cellular', 'Dish']],
  ['airlines at a mid-size airport', ['Southwest', 'Delta', 'United', 'American', 'Allegiant', 'Frontier']],
  ['home-improvement retail in a city', ['Home Depot', 'Lowe’s', 'Menards', 'Ace', 'True Value']],
  ['self-storage operators in a metro', ['Public Storage', 'Extra Space', 'CubeSmart', 'U-Haul', 'Life Storage']],
  ['streaming services', ['Netflix', 'YouTube', 'Disney+', 'Prime Video', 'Max', 'Peacock']],
] as const

/** Random shares (integers) that leave an "other" remainder. */
function shares(g: Rng, n: number) {
  for (;;) {
    const s = Array.from({ length: n }, () => g.int(2, 45)).sort((a, b) => b - a)
    const tot = s.reduce((a, b) => a + b, 0)
    if (tot < 98 && tot > 60) return { s, other: 100 - tot }
  }
}

export const hhiGen: Generator = {
  id: 's03-hhi',
  session: 'S03',
  los: ['S03-LO1', 'S03-LO2'],
  title: 'Compute C4 and HHI',
  skill: 'C4 = sum of the top four shares; HHI = 10,000 × Σ(shares as decimals)²; treat the remainder as one firm for HHI (S03 slides pp.5-9)',
  screen: 'widgets',
  make(seed) {
    const g = new Rng(seed)
    const [mkt, names] = g.pick(MARKETS)
    const n = g.int(4, Math.min(5, names.length))
    const { s, other } = shares(g, n)
    const C4 = c4(s)
    const H = hhi([...s, other])
    const rows = ['| Firm | Market share |', '| --- | --- |', ...s.map((v, i) => `| ${names[i]} | ${v}% |`), `| All others | ${other}% |`].join('\n')
    return {
      title: 'C4 and HHI',
      prompt: r`Market shares for ${mkt}:

${rows}

Assume the remaining share (“All others”) is controlled by **one firm**, as in the professor's telecom example.`,
      parts: [
        { type: 'num', label: 'C4 (%)', answer: C4 / 100, kind: 'percent', tol: 0.001 },
        { type: 'num', label: 'HHI', answer: H, tol: 0.001, abs: 0.6 },
        { type: 'choice', label: 'Compared with perfect competition (HHI ≈ 0) and monopoly (10,000), this market is…', options: ['Unconcentrated / highly competitive (HHI under ~1,500)', 'Moderately concentrated (~1,500–2,500)', 'Highly concentrated (above ~2,500)'], correct: H < 1500 ? 0 : H <= 2500 ? 1 : 2 },
      ],
      steps: [
        r`C4 = sum of the four largest **named** firms: ${s.slice(0, 4).join(' + ')} = ${C4}%. [[S03 slides p.5]]`,
        r`HHI = 10,000 × Σ w²: \(10{,}000\times[${[...s, other].map((v) => `(${(v / 100).toFixed(2)})^2`).join(' + ')}] = ${num(H, 0)}\). [[S03 slides p.6]]`,
        r`HHI runs from 0 (extremely competitive) to 10,000 (monopoly). The 1,500/2,500 bands are a common rule of thumb (U.S. merger guidelines), **not** something the professor stated. [[GEN]]`,
      ],
      src: 'S03 slides pp.5-9',
    }
  },
}

export const compareGen: Generator = {
  id: 's03-compare',
  session: 'S03',
  los: ['S03-LO2', 'S03-LO3'],
  title: 'Same C4, different HHI',
  skill: 'HHI weights big firms more because shares are squared (S03 slides p.11; telecom 2013 vs 2014)',
  screen: 'examples',
  make(seed) {
    const g = new Rng(seed)
    const top = g.pick([80, 84, 88, 90, 94])
    const a = [Math.round(top * 0.5), Math.round(top * 0.3)]
    a.push(top - a[0] - a[1] - 2, 2)
    const even = [Math.round(top / 4), Math.round(top / 4), Math.round(top / 4)]
    even.push(top - even[0] - even[1] - even[2])
    const b = even
    if (g.bool()) {
      const tmp = a.slice()
      a.splice(0, 4, ...b)
      b.splice(0, 4, ...tmp)
    }
    const rest = 100 - top
    const ha = hhi([...a, rest])
    const hb = hhi([...b, rest])
    return {
      title: 'Compare two markets',
      prompt: r`Market A shares: ${a.join('%, ')}% (+${rest}% other). Market B shares: ${b.join('%, ')}% (+${rest}% other). Treat "other" as one firm.`,
      parts: [
        { type: 'num', label: 'C4 of market A (%)', answer: c4(a) / 100, kind: 'percent', tol: 0.001 },
        { type: 'num', label: 'HHI of market A', answer: ha, tol: 0.001, abs: 0.6 },
        { type: 'num', label: 'HHI of market B', answer: hb, tol: 0.001, abs: 0.6 },
        { type: 'choice', label: 'Which market is more concentrated?', options: ['Market A', 'Market B', 'Equal — they have the same C4'], correct: ha > hb ? 0 : 1 },
      ],
      steps: [
        r`Both C4s are ${top}%. C4 can't tell them apart. [[S03 slides p.11]]`,
        r`HHI_A = ${num(ha, 0)}; HHI_B = ${num(hb, 0)}. Squaring gives extra weight to the dominant ${Math.max(a[0], b[0])}% firm. “HHI places greater weight on firms with relatively larger market shares.” [[S03 slides p.11]]`,
      ],
      src: 'S03 slides p.11',
    }
  },
}

export const mergerGen: Generator = {
  id: 's03-merger',
  session: 'S03',
  los: ['S03-LO2'],
  title: 'How a merger changes HHI',
  skill: 'Combine two firms’ shares and recompute; ΔHHI = 2 × s₁ × s₂ (shares in %) (S03 slides p.10: DOJ uses these measures)',
  screen: 'deeper',
  make(seed) {
    const g = new Rng(seed)
    const { s, other } = shares(g, 5)
    const i = g.int(1, 3)
    const j = g.int(i + 1, 4)
    const before = hhi([...s, other])
    const merged = s.filter((_, k) => k !== i && k !== j).concat(s[i] + s[j])
    const after = hhi([...merged, other])
    return {
      title: 'Merger',
      prompt: r`Shares: ${s.map((v, k) => `Firm ${k + 1} ${v}%`).join(', ')}, all others ${other}% (treat as one firm). Firms ${i + 1} and ${j + 1} propose to merge.`,
      parts: [
        { type: 'num', label: 'HHI before', answer: before, tol: 0.001, abs: 0.6 },
        { type: 'num', label: 'HHI after', answer: after, tol: 0.001, abs: 0.6 },
        { type: 'num', label: 'Change in HHI', answer: after - before, tol: 0.001, abs: 0.6 },
      ],
      steps: [
        r`Before: ${num(before, 0)}. After, the merged firm has ${s[i] + s[j]}%: HHI = ${num(after, 0)}.`,
        r`Shortcut: \(\Delta HHI = 2\times${s[i]}\times${s[j]} = ${2 * s[i] * s[j]}\). The Justice Department uses these measures when deciding whether to approve a merger. [[S03 slides p.10]]`,
      ],
      src: 'S03 slides p.10',
    }
  },
}

export const s03Generators = [hhiGen, compareGen, mergerGen]
