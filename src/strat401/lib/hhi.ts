/** Concentration math, in percentage points (30% → 30), as the HHI C4 Brief and the DOJ write it. */
export const round2 = (x: number) => Math.round(x * 100) / 100
export const c4 = (shares: number[]) => round2([...shares].sort((a, b) => b - a).slice(0, 4).reduce((a, b) => a + b, 0))
export const hhi = (shares: number[]) => round2(shares.reduce((a, s) => a + s * s, 0))
export const deltaHHI = (s1: number, s2: number) => round2(2 * s1 * s2)
export const numbersEquivalent = (h: number) => (h > 0 ? 10000 / h : Infinity)

export type Band = 'Unconcentrated' | 'Moderately concentrated' | 'Highly concentrated'
/** 2023 Merger Guidelines bands: below 1,000 / 1,000–1,800 / above 1,800 [HHI Ex.3]. */
export const band = (h: number): Band => (h > 1800 ? 'Highly concentrated' : h >= 1000 ? 'Moderately concentrated' : 'Unconcentrated')

export interface MergerResult {
  pre: number
  post: number
  delta: number
  mergedShare: number
  concentrationTest: boolean // post > 1,800 and Δ > 100
  shareTest: boolean // merged share > 30% and Δ > 100
  presumed: boolean
  preC4: number
  postC4: number
}

export function merge(shares: number[], i: number, j: number): MergerResult {
  const pre = hhi(shares)
  const merged = shares[i] + shares[j]
  const after = shares.filter((_, k) => k !== i && k !== j).concat(merged)
  const delta = deltaHHI(shares[i], shares[j])
  const post = round2(pre + delta)
  const concentrationTest = post > 1800 && delta > 100
  const shareTest = merged > 30 && delta > 100
  return { pre, post, delta, mergedShare: round2(merged), concentrationTest, shareTest, presumed: concentrationTest || shareTest, preC4: c4(shares), postC4: c4(after) }
}

/** Under the 2010 Guidelines the lines were 2,500 and 200 [HHI §4]. */
export const presumed2010 = (post: number, delta: number) => post > 2500 && delta > 200

export const parseShares = (s: string) =>
  s
    .split(/[\s,;/]+/)
    .map((x) => Number(x.replace('%', '')))
    .filter((x) => Number.isFinite(x) && x > 0)

export interface Preset { id: string; label: string; names?: string[]; shares: number[]; pair?: [number, number]; src: string; note?: string }
export const PRESETS: Preset[] = [
  { id: 'ex2a', label: 'Exhibit 2 · 30/25/20/15/10, merge 20 + 15', shares: [30, 25, 20, 15, 10], pair: [2, 3], src: 'HHI Ex.2' },
  { id: 'ex2b', label: 'Exhibit 2 · 35/30/20/15, merge 35 + 15', shares: [35, 30, 20, 15], pair: [0, 3], src: 'HHI Ex.2' },
  { id: 'ex2c', label: 'Exhibit 2 · 20×4 + 5×4, merge 20 + 5', shares: [20, 20, 20, 20, 5, 5, 5, 5], pair: [0, 4], src: 'HHI Ex.2' },
  { id: 'ex2d', label: 'Exhibit 2 · ten firms at 10, merge two', shares: Array(10).fill(10), pair: [0, 1], src: 'HHI Ex.2' },
  { id: 'ex2e', label: 'Exhibit 2 · 65 + 5×7, merge 5 + 5', shares: [65, 5, 5, 5, 5, 5, 5, 5], pair: [1, 2], src: 'HHI Ex.2' },
  { id: 'doj', label: 'DOJ example · 30/30/20/20', shares: [30, 30, 20, 20], src: 'HHI §3' },
  { id: 'cof', label: 'Capital One + Discover (S7 slide)', names: ['JPMorgan', 'Citi', 'Capital One', 'Discover', 'Bank of America', 'American Express', 'Synchrony', 'Wells Fargo', 'Barclays', 'Navy Federal'], shares: [18.7, 14.6, 13.1, 9.1, 9.1, 8.7, 8.6, 4.6, 2.8, 2.6], pair: [2, 3], src: 'S7 slides 2', note: 'The slide shows post-merger HHI 1,319.48 and a change of 233.99 because it uses a combined share of 22.1; the formula gives 2 × 13.1 × 9.1 = 238.42 (13.1 + 9.1 = 22.2). The calculator uses the formula.' },
  { id: 'cola', label: 'US CSD 2025 (Coke/Pepsi/KDP/private label)', names: ['Coca-Cola', 'PepsiCo', 'Keurig Dr Pepper', 'Private label'], shares: [46, 25, 22, 3], src: 'Cola Ex.4', note: 'The ~4% “all other” fragment is omitted; it adds very little once squared (Exhibit 1: small firms contribute little).' },
]
