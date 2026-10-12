/**
 * Golden tests: the site's math must reproduce the professor's numbers exactly.
 * Sources are cited next to every expectation.
 */
import { describe, expect, it } from 'vitest'
import { arcElasticity, c4, hhi, linearOpe, linearQ, ols, powerFit, revMaxPriceLinear, simpleOls } from '../../src/lib/econ'

describe('S03 Industry structure [S03 slides pp.7-9]', () => {
  it('telecom 2013: C4 94%, HHI 3,154 (remaining 6% as one firm)', () => {
    expect(c4([42, 33, 16, 3])).toBeCloseTo(94, 10) // named firms only
    expect(Math.round(hhi([42, 33, 16, 3, 6]))).toBe(3154)
  })
  it('telecom 2014: C4 94%, HHI 2,706', () => {
    expect(c4([37, 31, 14, 12])).toBeCloseTo(94, 10)
    expect(Math.round(hhi([37, 31, 14, 12, 6]))).toBe(2706)
  })
})

describe('S05 Math review [Math Review p.8; S05 slides p.36,40]', () => {
  it('R = 100P − 2P² → P* = 25', () => expect(revMaxPriceLinear(100, 2)).toBe(25))
  it('ATC = 2Q² − 100Q + 1,400 → Q* = 25', () => expect(100 / (2 * 2)).toBe(25))
  it('Sundance Q = 6,000 − 12P → P* = $250 [S05 Optional Practice p.4]', () => expect(revMaxPriceLinear(6000, 12)).toBe(250))
})

describe('S06 Costs', () => {
  const rows = [
    ['Whole Foods', 14194, 579, 5744, 3813, 4.1, 2.5, 1.5, 10.1, 15.2],
    ['Kroger', 108465, 1728, 30556, 5442, 1.6, 3.5, 5.6, 5.7, 31.8],
    ['Safeway', 36360, 113, 13377, 5450, 0.3, 2.7, 2.5, 0.8, 2.1],
  ] as const
  it.each(rows)('%s FY2014 DuPont [S06 slides p.6]', (_n, rev, ni, ta, te, ros, at, lev, roa, roe) => {
    expect(+((ni / rev) * 100).toFixed(1)).toBe(ros)
    expect(+(rev / ta).toFixed(1)).toBe(at)
    expect(+(ta / te).toFixed(1)).toBe(lev)
    expect(+((ni / ta) * 100).toFixed(1)).toBe(roa)
    expect(+((ni / te) * 100).toFixed(1)).toBe(roe)
  })
  const R = [83209, 107000, 124263, 141788, 166190, 202618, 390000, 435000, 472809, 492913, 520201]
  const TC = [5441.216, 5344.601, 5308.445, 6016.505, 6607.969, 6959.884, 11437.542, 9866.034, 9366, 11618, 9804]
  it('Guest-Tek TC = 37.8335·R^0.4295 [S06 workbook, Solution!C91]', () => {
    const f = powerFit(R, TC)
    expect(f.A).toBeCloseTo(37.8335, 3)
    expect(f.B).toBeCloseTo(0.4295, 4)
  })
  it('Guest-Tek CPRPD = 414.6136·R^−0.5705; $0.15 needs ≈1,077,753 rooms; doubling −32.66% [S06 workbook, Solution!D75, C76, E83]', () => {
    const c = R.map((r, i) => (TC[i] * 1000) / ((r * 365) / 4))
    expect(c[10]).toBeCloseTo(0.20653765734862287, 10) // Solution!G47
    const f = powerFit(R, c)
    expect(f.A).toBeCloseTo(414.6136, 3)
    expect(f.B).toBeCloseTo(-0.5705, 4)
    expect((414.6136 / 0.15) ** (1 / 0.5705)).toBeCloseTo(1077753.2516121904, 3)
    expect(2 ** -0.5705 - 1).toBeCloseTo(-0.32661662890551657, 10)
  })
  it('Guest-Tek MC CPRPD at 100k and 500k rooms [S06 workbook, Solution!F91, F107]', () => {
    const mcPerQuarter = (r: number) => 0.4295 * 37.8335 * r ** (0.4295 - 1) * 1000
    expect((37.8335 * 100001 ** 0.4295 * 1000 - 37.8335 * 100000 ** 0.4295 * 1000) / (365 / 4)).toBeCloseTo(0.2500953265453038, 8)
    expect(mcPerQuarter(500000) / (365 / 4)).toBeCloseTo(0.09984916, 5)
  })
  it('J. Dawgs one grill at Q = 100 [S06 Video Slides pp.14-21]', () => {
    const vc = 0.00002 * 100 ** 3 - 0.005 * 100 ** 2 + 0.8 * 100
    expect(vc).toBeCloseTo(50)
    expect(8 / 100).toBeCloseTo(0.08)
    expect(vc / 100 + 8 / 100).toBeCloseTo(0.58)
    expect(0.00006 * 100 ** 2 - 0.01 * 100 + 0.8).toBeCloseTo(0.4)
  })
  it('J. Dawgs two grills at Q = 400 [CQ3 Q1-Q5]', () => {
    const vc = 0.000002 * 400 ** 3 - 0.0005 * 400 ** 2 + 0.25 * 400
    expect(16 / 400).toBeCloseTo(0.04)
    expect(vc).toBeCloseTo(148)
    expect(vc / 400).toBeCloseTo(0.37)
    expect(0.000006 * 400 ** 2 - 0.001 * 400 + 0.25).toBeCloseTo(0.81)
    expect(Math.round(0.001 / 0.000012)).toBe(83)
  })
})

describe('S07/S08 Demand & elasticity', () => {
  it('Redbox algebraic OPE = −0.50 [S08 slides p.23]', () => expect(arcElasticity(5000, 4500, 1, 1.2)).toBeCloseTo(-0.5, 10))
  it('Redbox calculus OPE = −0.73 [S08 slides p.25]', () => expect(+linearOpe(8845, 3728, 1).toFixed(2)).toBe(-0.73))
  it('Redbox revenue-max price ≈ $1.19 [Differentiation Advantage Part 1 step 7]', () => expect(+revMaxPriceLinear(8845, 3728).toFixed(2)).toBe(1.19))
  it('Redbox fit from slide points ≈ Q = 8,845 − 3,728P [S07 slides pp.27-28]', () => {
    const { a, b } = simpleOls([1, 1, 1, 1.2, 1.2, 1.2], [5169, 5012, 5172, 4655, 4160, 4301])
    expect(Math.round(a)).toBe(8846)
    expect(Math.round(b)).toBe(-3728)
  })
  it('Dr Pepper OPE table [S08 workbook, OPE - Solution!C14:E19]', () => {
    const P = [0, 0.25, 0.5, 0.75, 1, 1.25]
    expect(P.map((p) => linearQ(30000, 20000, p))).toEqual([30000, 25000, 20000, 15000, 10000, 5000])
    ;[0, -0.2, -0.5, -1, -2, -5].forEach((v, i) => expect(linearOpe(30000, 20000, P[i])).toBeCloseTo(v, 10))
    expect(P.map((p) => p * linearQ(30000, 20000, p))).toEqual([0, 6250, 10000, 11250, 10000, 6250])
    expect(revMaxPriceLinear(30000, 20000)).toBe(0.75)
  })
  it('Dr Pepper CS at $1.00 = $2,500 [CQ4 Q4]', () => expect(0.5 * linearQ(30000, 20000, 1) * (1.5 - 1)).toBe(2500))
  it('CQ4 inverse demand Px = 1,125 − 0.25Qx [CQ4 Q3]', () => {
    const a = 10000 + 5 * 100 - 0.2 * 30000
    expect(a).toBe(4500)
    expect(a / 4).toBe(1125)
  })
  it('CPE exercise = 0.18; +10% Py → +1.8% [S08 slides pp.30-31]', () => {
    const q = 500 - 5 * 25 + 4 * 20
    expect(q).toBe(455)
    expect(+((4 * 20) / q).toFixed(2)).toBe(0.18)
    expect(+(0.18 * 0.1).toFixed(3)).toBe(0.018)
  })
  it('Dr Pepper / Mr. Pibb CPE 25% cuts → −50% and −30% [S08 workbook, CPE - Solution B15, B26]', () => {
    expect(2.0 * -0.25).toBe(-0.5)
    expect(1.2 * -0.25).toBeCloseTo(-0.3)
  })
  it('Netflix OPE = −0.08 [CQ4 Q10]', () => expect(+arcElasticity(25, 23.8, 10, 16).toFixed(2)).toBe(-0.08))
  it('CQ4 Q8: CPE −2 × 20% = −40%', () => expect(-2 * 0.2).toBe(-0.4))
})

describe('S09 Regression', () => {
  it('Pittsburgh TVs: Q = 1,631.47 − 2.60P and the full Summary Output [S09 slides p.25]', () => {
    const q = [180, 590, 430, 250, 275, 720, 660, 490, 700, 210]
    const p = [475, 400, 450, 550, 575, 375, 375, 450, 400, 500]
    const r = ols(q, p.map((x) => [x]))
    expect(r.coef[0]).toBeCloseTo(1631.47, 2)
    expect(r.coef[1]).toBeCloseTo(-2.6, 2)
    expect(r.r2).toBeCloseTo(0.75, 2)
    expect(r.adjR2).toBeCloseTo(0.72, 2)
    expect(r.seReg).toBeCloseTo(112.22, 2)
    expect(r.ssr).toBeCloseTo(301470.89, 1)
    expect(r.sse).toBeCloseTo(100751.61, 1)
    expect(r.f).toBeCloseTo(23.94, 2)
    expect(r.sigF).toBeCloseTo(0.0012, 4)
    expect(r.se[0]).toBeCloseTo(243.97, 2)
    expect(r.se[1]).toBeCloseTo(0.53, 2)
    expect(r.t[0]).toBeCloseTo(6.69, 2)
    expect(r.t[1]).toBeCloseTo(-4.89, 2)
    expect(r.p[0]).toBeCloseTo(0.0002, 4)
    expect(r.lower[0]).toBeCloseTo(1068.87, 1)
    expect(r.upper[1]).toBeCloseTo(-1.37, 2)
  })
  it('Redstone Residential matches the Solution tab [S09 workbook, Solution!B18:G34]', () => {
    const d = [
      [28, 250, 11, 12], [69, 400, 24, 6], [43, 450, 15, 5], [32, 550, 31, 7], [42, 575, 34, 4],
      [72, 375, 22, 2], [66, 375, 12, 5], [49, 450, 24, 7], [70, 400, 22, 4], [60, 375, 10, 5],
    ]
    const r = ols(d.map((x) => x[0]), d.map((x) => x.slice(1)))
    const want = {
      coef: [135.1481593127415, -0.1431237906571564, 0.5381600727081847, -5.783938373202387],
      se: [20.65295250491789, 0.05942476971090495, 0.6355998008346452, 1.255141659203719],
      t: [6.543769433477367, -2.408487089700778, 0.8466964149477291, -4.608195681172599],
      p: [0.0006089680516727621, 0.05268230411270983, 0.4296352935122465, 0.003660383679930456],
      lower: [84.61220506732374, -0.2885309639143304, -1.017096612539491, -8.855159373973727],
      upper: [185.6841135581593, 0.002283382600017536, 2.09341675795586, -2.712717372431047],
    }
    for (const k of Object.keys(want) as (keyof typeof want)[]) want[k].forEach((v, i) => expect(r[k][i]).toBeCloseTo(v, 6))
    expect(r.multipleR).toBeCloseTo(0.8896848939913512, 8)
    expect(r.r2).toBeCloseTo(0.7915392105964019, 8)
    expect(r.adjR2).toBeCloseTo(0.6873088158946028, 8)
    expect(r.seReg).toBeCloseTo(9.182533145448774, 8)
    expect(r.f).toBeCloseTo(7.594130415230403, 6)
    expect(r.sigF).toBeCloseTo(0.01819623247439714, 6)
    // step 4 and 5
    expect(-0.1431237906571564 * 100).toBeCloseTo(-14.3, 1)
    expect(+(-0.143 * (420 / 53.1)).toFixed(2)).toBe(-1.13)
  })
})

describe('S10 Profit maximization [S10 slides pp.17, 46-48]', () => {
  const C = (q: number) => 125 + 4 * q * q
  it('P = 10 − Q → MR = 10 − 2Q', () => {
    const R = (q: number) => (10 - q) * q
    for (const q of [1, 2.5, 4]) expect((R(q + 1e-6) - R(q - 1e-6)) / 2e-6).toBeCloseTo(10 - 2 * q, 5)
  })
  it('price taker at $40: Q* = 5, cost 225, revenue 200, profit −25', () => {
    const q = 40 / 8
    expect(q).toBe(5)
    expect(C(q)).toBe(225)
    expect(40 * q).toBe(200)
    expect(40 * q - C(q)).toBe(-25)
  })
  it('monopoly P = 100 − Q: Q* = 10, P* = 90, cost 525, revenue 900, profit 375', () => {
    const q = 100 / 10
    expect(q).toBe(10)
    expect(100 - q).toBe(90)
    expect(C(q)).toBe(525)
    expect((100 - q) * q).toBe(900)
    expect((100 - q) * q - C(q)).toBe(375)
  })
  it('long run monopolistic competition: P = 50 − Q tangency at Q = 5, P = ATC = 45 [S10 slides p.49]', () => {
    expect(50 - 5).toBe(45)
    expect(C(5) / 5).toBe(45)
  })
  it('CQ5 monopoly P = 120 − 2Q, C = 500 + 2Q² → Q 15, P 90, profit 400 [CQ5 Q6-Q7]', () => {
    expect(120 / 8).toBe(15)
    expect(120 - 2 * 15).toBe(90)
    expect(90 * 15 - (500 + 2 * 225)).toBe(400)
  })
})

describe('Cost Advantage assignment fits [your Cost Advantage, Part 1; S07 slides p.6]', () => {
  const NFs = [23410, 23938, 25101, 27146, 29174, 29807, 31092, 33420, 35674, 36224, 37219, 39114, 41397, 42300, 43181, 44738, 46967, 47129]
  const NFc = [434181, 445306, 460321, 476051, 507299, 519775, 534602, 566932, 597352, 610950, 626296, 660616, 672080, 686118, 719749, 726892, 748488, 793912]
  const RBr = [196226, 179231, 176367, 187937, 197543, 186684, 199480, 192035, 199972, 169322, 172172, 181279, 173047, 146047, 132645, 135815, 137701, 123593]
  const RBc = [394124, 361248, 358335, 408313, 415746, 371325, 400728, 359343, 412737, 361969, 352372, 348074, 381495, 340046, 304990, 336030, 334854, 306975]
  it('Redbox ATC = 656.06·R^−0.476 (professor’s debrief slide)', () => {
    const f = powerFit(RBr, RBr.map((r, i) => RBc[i] / r))
    expect(f.A).toBeCloseTo(656.06, 1)
    expect(f.B).toBeCloseTo(-0.476, 3)
  })
  it('Netflix CPSPM = 38.10·S^−0.182; breakeven at $7.99 ≈ 5,339k subscribers', () => {
    const f = powerFit(NFs, NFs.map((s, i) => NFc[i] / s / 3))
    expect(f.A).toBeCloseTo(38.0964, 3)
    expect(f.B).toBeCloseTo(-0.18198, 4)
    expect((f.A / 7.99) ** (1 / -f.B)).toBeCloseTo(5338.9, 0)
  })
})

describe('S03 Allegiant workbook [S03 workbook, Solution!D42:H65]', () => {
  const cases: [string, number[], number, number][] = [
    ['OAK', [85.3, 4.08, 3.78, 2.2, 1.8, 2.84], 7323.1704, 0.9536],
    ['SFO', [46.5, 10.56, 10.48, 9.3, 7.87, 15.28], 2765.4993, 0.7684],
    ['HOU', [94.5, 2.48, 1.18, 0.68, 0.38, 0.77], 8938.9925, 0.9884],
    ['IAH', [56.01, 10.15, 7.12, 5.45, 5.38, 15.89], 3601.976, 0.7873],
    ['MDW', [92.81, 3.7, 1.61, 1.07, 0.16, 0.65], 8631.5712, 0.9919],
    ['ORD', [38.91, 22.46, 9.36, 7.46, 3.7, 18.1], 2503.0009, 0.7819],
  ]
  it.each(cases)('%s HHI and C4', (_n, s, H, C) => {
    expect(hhi(s)).toBeCloseTo(H, 3)
    expect(c4(s.slice(0, 4)) / 100).toBeCloseTo(C, 6)
  })
})
