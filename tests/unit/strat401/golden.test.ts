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

import { afterDoublings, breakevenSubs, channels, contentPerSub, doublingsToClose, exponent, fitRate, plantCost, pooledSafetyStock, unitCapitalRatio, unitCost, volumeMultiple } from '../../../src/strat401/lib/learning'

describe('Economies of Scale Brief, Appendix A', () => {
  it.each([
    [0.7, 0.515, 2.8],
    [0.75, 0.415, 5.6],
    [0.8, 0.322, 10.7],
    [0.85, 0.234, 19.7],
    [0.9, 0.152, 34.9],
    [0.95, 0.074, 59.9],
  ])('Exhibit A1: s=%s → b=%s, cost after 10 doublings %s%%', (s, b, pct10) => {
    expect(exponent(s)).toBeCloseTo(b, 3)
    expect(Math.round(afterDoublings(s, 10) * 1000) / 10).toBe(pct10)
  })
  it('80% curve exponent is 0.3219 (Wright’s 0.322)', () => expect(exponent(0.8)).toBeCloseTo(0.3219, 4))
  it('worked problem 1: $100 → $64 from 1,000 to 4,000 units is an 80% curve', () => expect(fitRate(100, 64, 1000, 4000)).toBeCloseTo(0.8, 10))
  it('worked problem 2: 85% curve, $500,000 first unit → 64th unit ≈ $188,600', () => {
    expect(Math.round(unitCost(500000, 64, 0.85) / 100) * 100).toBe(188600)
    expect(afterDoublings(0.85, 6)).toBeCloseTo(0.3771, 4)
  })
  it('worked problem 3: 500k-ton $200M plant → 1M tons ≈ $303M; $400 → $303 per ton (−24%)', () => {
    expect(Math.round(plantCost(200, 2))).toBe(303)
    expect(Math.round((plantCost(200, 2) * 1e6) / 1e6)).toBe(303)
    expect(Math.round(unitCapitalRatio(2) * 1000) / 1000).toBe(0.758)
  })
  it.each([[0.6, 1.52, 0.758], [0.667, 1.59, 0.794], [0.7, 1.63, 0.812], [0.8, 1.74, 0.871], [1, 2, 1]])('Exhibit A2: k=%s', (k, cost, unit) => {
    // the brief prints 1.63× for k = 0.70; 2^0.7 = 1.6245 (a rounding slip in the exhibit), so allow ±0.006
    expect(Math.abs(Math.pow(2, k) - cost)).toBeLessThan(0.006)
    expect(Math.round(unitCapitalRatio(2, k) * 1000) / 1000).toBeCloseTo(unit, 2)
  })
  it('worked problem 4: $124k follower vs $47k leader at 81.5% → 4.7 doublings, ~27× volume', () => {
    const d = doublingsToClose(124000, 47000, 0.815)
    expect(Math.round(d * 10) / 10).toBe(4.7)
    expect(Math.round(volumeMultiple(Math.round(d * 10) / 10))).toBe(26) // 2^4.7 = 26.0; the brief rounds to "twenty-seven times"
    expect(volumeMultiple(d)).toBeGreaterThan(26.5)
    expect(volumeMultiple(d)).toBeLessThan(27.5)
  })
  it('square-root law: 4 → −50%, 9 → −67%, 16 → −75%', () => {
    expect(1 - pooledSafetyStock(4)).toBe(0.5)
    expect(Math.round((1 - pooledSafetyStock(9)) * 100)).toBe(67)
    expect(1 - pooledSafetyStock(16)).toBe(0.75)
  })
  it('solar: $106/W at 0.3 MW → $0.10/W at 2,973 GW = 23.2 doublings, 25.9% learning rate', () => {
    const d = Math.log2(2973e3 / 0.3)
    expect(Math.round(d * 10) / 10).toBe(23.2)
    expect(Math.round(106 / 0.1)).toBe(1060) // "a factor of 1,061" in the brief (rounded inputs)
    expect(Math.round((1 - Math.pow(0.1 / 106, 1 / d)) * 1000) / 10).toBe(25.9)
  })
  it('Brooks: 3 → 3, 10 → 45, 50 → 1,225 channels', () => {
    expect(channels(3)).toBe(3)
    expect(channels(10)).toBe(45)
    expect(channels(50)).toBe(1225)
  })
})

describe('Netflix case and S8 slides', () => {
  it.each([[10, 1700, 142], [25, 680, 57], [50, 340, 28], [100, 170, 14], [200, 85, 7.1], [300, 57, 4.7]])('Exhibit 5: %sM subscribers → $%s/yr, $%s/mo', (n, yr, mo) => {
    expect(Math.round(contentPerSub(17000, n))).toBe(yr)
    const m = contentPerSub(17000, n) / 12 // the exhibit rounds to whole dollars, or to dimes below $10
    expect(mo >= 10 ? Math.round(m) : Math.round(m * 10) / 10).toBe(mo)
  })
  it('breakeven on a $17B library at $12 ARPU ≈ 118M subscribers', () => expect(Math.round(breakevenSubs(17000, 12))).toBe(118))
  it('Netflix $17B/200M = $85 vs HBO $2.5B/40M ≈ $63', () => {
    expect(contentPerSub(17000, 200)).toBe(85)
    expect(Math.round(contentPerSub(2500, 40))).toBe(63)
  })
  it('Rivian vs Tesla: 4.7 doublings (~27×); Lucid ≈ 6.3–6.4 doublings (~80×)', () => {
    const r = doublingsToClose(123995, 46978, 0.815)
    expect(Math.round(r * 10) / 10).toBe(4.7)
    expect(Math.round(volumeMultiple(r))).toBe(27)
    const l = doublingsToClose(146300, 46978, 0.836)
    expect(l).toBeGreaterThan(6.2)
    expect(l).toBeLessThan(6.5)
  })
  it('pizza example: $20.00 → $5.70 per pizza, 71.5% lower', () => {
    const small = (10000 + 5000 + 2 * 1000 + 3 * 1000) / 1000
    const large = (10000 + 5000 + 1.8 * 10000 + 2.4 * 10000) / 10000
    expect(small).toBe(20)
    expect(large).toBe(5.7)
    expect(Math.round((1 - large / small) * 1000) / 10).toBe(71.5)
  })
})

import { costcoFeeShareOfOI, costcoGrossMargin, costcoMerchSpread, costcoSgaRate, decompose, perUnit, samsMerchSpread } from '../../../src/strat401/lib/costco'
import { consumerSurplus, split } from '../../../src/strat401/lib/value'
import { slideVerdict, verdict } from '../../../src/strat401/lib/vrio'

describe('Costco vs Sam’s Club case', () => {
  it('Exhibit 1 ratios: GM 11.12%, SG&A 9.25%', () => {
    expect(Math.round(costcoGrossMargin() * 10000) / 100).toBe(11.12)
    expect(Math.round(costcoSgaRate() * 10000) / 100).toBe(9.25)
  })
  it('merchandise spread $5,060M; fees ≈ 51% of operating income', () => {
    expect(costcoMerchSpread()).toBe(5060)
    expect(Math.round(costcoFeeShareOfOI() * 100)).toBe(51)
  })
  it('Sam’s operating income minus membership & other = −$83M', () => expect(samsMerchSpread()).toBe(-83))
  it('Exhibit 4 computed figures', () => {
    const u = perUnit()
    expect(Math.round(u.costcoRevPerUnit * 10) / 10).toBe(318)
    expect(Math.round(u.samsRevPerUnit * 10) / 10).toBe(159)
    expect(Math.round(u.samsSqftPerUnit / 100) * 100).toBe(133900)
    expect(Math.round(u.costcoRevPerSqft)).toBe(2164)
    expect(Math.round(u.samsRevPerSqft)).toBe(1187)
    expect(Math.round(u.costcoEmpPerUnit)).toBe(355)
    expect(Math.round(u.samsEmpPerUnit)).toBe(166)
    expect(Math.round(u.costcoRevPerEmpK)).toBe(897)
    expect(Math.round(u.samsRevPerEmpK)).toBe(955)
  })
  it('decomposition is an exact identity: volume + margin = per-box OI gap', () => {
    const d = decompose(0.5, 0.6)
    expect(d.volume + d.margin).toBeCloseTo(d.gap, 9)
    expect(d.cost + d.diff).toBeCloseTo(d.gap, 9)
    expect(Math.round(d.gap * 100) / 100).toBe(6.87)
  })
})

describe('S9 slides and the value stick', () => {
  it('consumer surplus at P = $0.75 with Q = 30,000 − 20,000P is $5,625', () => {
    const r = consumerSurplus(30000, 20000, 0.75)
    expect(r.q).toBe(15000)
    expect(r.choke).toBe(1.5)
    expect(r.cs).toBe(5625)
  })
  it('value stick pieces add up to value created', () => {
    const s = split({ wtp: 16, price: 12, cost: 9, supplier: 5 })
    expect(s.customerSurplus + s.firmMargin + s.supplierSurplus).toBe(s.valueCreated)
  })
})

describe('VRIO verdicts', () => {
  it('brief table (Barney 1995) and the four Exhibit 1 cases', () => {
    expect(verdict('Y', 'Y', 'Y', 'Y')).toBe('Sustained competitive advantage') // Visa
    expect(verdict('Y', 'N', '', '')).toBe('Competitive parity') // regional bank
    expect(verdict('Y', 'Y', 'Y', 'N')).toBe('Unexploited competitive advantage') // Intel
    expect(verdict('Y', 'Y', 'N', '')).toBe('Temporary competitive advantage')
    expect(verdict('N', '', '', '')).toBe('Competitive disadvantage')
    expect(verdict('Y', 'Y', 'Y', '')).toBeNull() // McKinsey: O unresolved
  })
  it('slide table labels', () => {
    expect(slideVerdict('Y', 'Y', 'N', 'N')).toBe('Competitive advantage')
    expect(slideVerdict('Y', 'Y', 'Y', 'N')).toBe('Durable competitive advantage')
  })
})
