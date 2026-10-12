/** STRAT 401 golden tests: the site's calculators must reproduce the briefs' and slides' own numbers. */
import { describe, expect, it } from 'vitest'
import { BUCKETS, OBSERVED_GAP, aldiVsKroger, sumPoints } from '../../../src/strat401/lib/aldi'
import { band, c4, deltaHHI, hhi, merge, numbersEquivalent } from '../../../src/strat401/lib/hhi'
import { AUTONATION, profitShares } from '../../../src/strat401/lib/profitpool'

describe('HHI C4 Brief', () => {
  it('DOJ example 30/30/20/20 = 2,600 (≈3.8 equal firms)', () => {
    expect(hhi([30, 30, 20, 20])).toBe(2600)
    expect(numbersEquivalent(2600)).toBeCloseTo(3.85, 2)
    expect(numbersEquivalent(2000)).toBe(5)
  })
  it('12% + 8% merger raises HHI by 192', () => expect(deltaHHI(12, 8)).toBe(192))
  it('identical C4 of 80, HHIs 2,700 apart (Figure 1)', () => {
    const A = [65, 5, 5, 5, 5, 5, 5, 5]
    const B = [20, 20, 20, 20, 5, 5, 5, 5]
    expect(c4(A)).toBe(80)
    expect(c4(B)).toBe(80)
    expect(hhi(A)).toBe(4400)
    expect(hhi(B)).toBe(1700)
    expect(hhi(A) - hhi(B)).toBe(2700)
    expect(band(hhi(A))).toBe('Highly concentrated')
    expect(band(hhi(B))).toBe('Moderately concentrated')
  })
  it.each([
    { shares: [30, 25, 20, 15, 10], i: 2, j: 3, c: 90, pre: 2250, d: 600, post: 2850, presumed: true },
    { shares: [35, 30, 20, 15], i: 0, j: 3, c: 100, pre: 2750, d: 1050, post: 3800, presumed: true },
    { shares: [20, 20, 20, 20, 5, 5, 5, 5], i: 0, j: 4, c: 80, pre: 1700, d: 200, post: 1900, presumed: true },
    { shares: Array(10).fill(10), i: 0, j: 1, c: 40, pre: 1000, d: 200, post: 1200, presumed: false },
    { shares: [65, 5, 5, 5, 5, 5, 5, 5], i: 1, j: 2, c: 80, pre: 4400, d: 50, post: 4450, presumed: false },
  ])('Exhibit 2 row: pre $pre, Δ $d, post $post', (r) => {
    const m = merge(r.shares, r.i, r.j)
    expect(c4(r.shares)).toBe(r.c)
    expect(m.pre).toBe(r.pre)
    expect(m.delta).toBe(r.d)
    expect(m.post).toBe(r.post)
    expect(m.presumed).toBe(r.presumed)
  })
  it('Exhibit 2 row 2 meets BOTH tests (merged share 50%)', () => {
    const m = merge([35, 30, 20, 15], 0, 3)
    expect(m.concentrationTest && m.shareTest).toBe(true)
    expect(m.mergedShare).toBe(50)
  })
  it('Capital One + Discover (S7 slide 2): pre-HHI and C4 match the slide; Δ by formula is 238.42 (slide shows 233.99)', () => {
    const s = [18.7, 14.6, 13.1, 9.1, 9.1, 8.7, 8.6, 4.6, 2.8, 2.6]
    const m = merge(s, 2, 3)
    expect(m.pre).toBe(1085.49)
    expect(m.preC4).toBe(55.5)
    expect(m.postC4).toBe(64.6) // 22.2 + 18.7 + 14.6 + 9.1; the slide's 64.5 uses 22.1
    expect(m.delta).toBe(238.42)
    // the slide's own figures, reproduced with its 22.1 combined share
    const slidePost = Math.round((m.pre - 13.1 ** 2 - 9.1 ** 2 + 22.1 ** 2) * 100) / 100
    expect(slidePost).toBe(1319.48)
    expect(Math.round((slidePost - m.pre) * 100) / 100).toBe(233.99)
  })
})

describe('Aldi cost gap (S8 slides 2-3)', () => {
  it('eleven buckets sum to 20.2 against an observed 20.1', () => {
    expect(BUCKETS).toHaveLength(11)
    expect(sumPoints(BUCKETS)).toBe(20.2)
    expect(OBSERVED_GAP).toBe(20.1)
  })
  it('Aldi re-indexed to Kroger = 100 is 79.9', () => expect(aldiVsKroger()).toBe(79.9))
  it('private label + store labor = 10 points', () => {
    expect(sumPoints(BUCKETS.filter((b) => b.id === 'pl' || b.id === 'labor'))).toBe(10)
  })
})

describe('Value Chain Brief profit pool (AutoNation 2025)', () => {
  it('reproduces the brief’s revenue and gross-profit shares', () => {
    const s = profitShares(AUTONATION)
    const by = Object.fromEntries(s.map((b) => [b.label, b]))
    expect(by['New vehicles'].revShare).toBe(0.489)
    expect(by['New vehicles'].profitShare).toBeCloseTo(0.134, 3)
    expect(by['Parts & service'].profitShare).toBeCloseTo(0.476, 3)
    expect(by['Parts & service'].revShare + by['Finance & insurance'].revShare).toBeCloseTo(0.228, 3)
    expect(by['Parts & service'].profitShare + by['Finance & insurance'].profitShare).toBeCloseTo(0.772, 3)
  })
})
