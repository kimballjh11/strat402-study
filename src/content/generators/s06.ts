import { dollars, num, pct, tex } from '../../lib/format'
import { Rng } from '../../lib/rng'
import type { Generator } from '../types'

const r = String.raw

/** Cubic cost function C = cQ³ + bQ² + aQ + F — the J. Dawgs form. */
export function costAt(c: number, b: number, a: number, F: number, Q: number) {
  const VC = c * Q ** 3 + b * Q ** 2 + a * Q
  const MC = 3 * c * Q ** 2 + 2 * b * Q + a
  return { FC: F, VC, TC: F + VC, AFC: F / Q, AVC: VC / Q, ATC: (F + VC) / Q, MC }
}
const cubicTex = (c: number, b: number, a: number, F: number) =>
  r`C(Q) = ${tex(c, 6)}Q^3 ${b < 0 ? '-' : '+'} ${tex(Math.abs(b), 4)}Q^2 + ${tex(a, 2)}Q + ${tex(F, 0)}`

const PRESETS = [
  { c: 0.00002, b: -0.005, a: 0.8, F: 8, Qs: [50, 100, 150, 200], who: 'J. Dawgs (one grill)' },
  { c: 0.000002, b: -0.0005, a: 0.25, F: 16, Qs: [100, 200, 300, 400, 500], who: 'J. Dawgs (two grills)' },
  { c: 0.00001, b: -0.004, a: 0.9, F: 12, Qs: [50, 100, 150, 200], who: 'a food cart' },
  { c: 0.000004, b: -0.002, a: 0.6, F: 30, Qs: [100, 200, 300], who: 'a campus coffee kiosk' },
]

export const costMeasures: Generator = {
  id: 's06-measures',
  session: 'S06',
  los: ['S06-LO2'],
  title: 'FC, VC, TC, AFC, AVC, ATC and MC from a cost function',
  skill: 'FC = constant; VC = terms with Q; averages divide by Q; MC = dC/dQ (S06 Video Slides pp.14-21; CQ3 Q1-Q4)',
  screen: 'examples',
  make(seed) {
    const g = new Rng(seed)
    const pr = g.pick(PRESETS)
    const Q = g.pick(pr.Qs)
    const m = costAt(pr.c, pr.b, pr.a, pr.F, Q)
    const ask = g.shuffle(['AFC', 'VC', 'AVC', 'ATC', 'MC'] as const).slice(0, 3)
    const lab: Record<string, string> = { AFC: 'Average fixed cost (AFC)', VC: 'Variable cost (VC)', AVC: 'Average variable cost (AVC)', ATC: 'Average total cost (ATC)', MC: 'Marginal cost (MC)' }
    return {
      title: 'Cost measures',
      prompt: r`The estimated cost function for ${pr.who} is \(${cubicTex(pr.c, pr.b, pr.a, pr.F)}\). Evaluate at **Q = ${Q}** units.`,
      parts: ask.map((k) => ({ type: 'num' as const, label: `${lab[k]} at Q = ${Q}`, answer: m[k], kind: 'money' as const, tol: 0.005, abs: 0.006 })),
      steps: [
        r`**FC** = the constant = ${tex(pr.F, 0)}. **VC** = every term with Q: \(${tex(pr.c, 6)}(${Q})^3 ${pr.b < 0 ? '-' : '+'} ${tex(Math.abs(pr.b), 4)}(${Q})^2 + ${tex(pr.a, 2)}(${Q}) = ${tex(pr.c * Q ** 3, 3)} ${pr.b < 0 ? '-' : '+'} ${tex(Math.abs(pr.b) * Q ** 2, 3)} + ${tex(pr.a * Q, 3)} = ${tex(m.VC, 3)}\). [[S06 Video Slides pp.14-15]]`,
        r`\(AFC = FC/Q = ${tex(pr.F, 0)}/${Q} = ${tex(m.AFC, 4)}\); \(AVC = VC/Q = ${tex(m.AVC, 4)}\); \(ATC = AFC + AVC = ${tex(m.ATC, 4)}\). [[S06 Video Slides pp.17-19]]`,
        r`\(MC = \dfrac{dC}{dQ} = ${tex(3 * pr.c, 6)}Q^2 ${pr.b < 0 ? '-' : '+'} ${tex(Math.abs(2 * pr.b), 4)}Q + ${tex(pr.a, 2)}\); at ${Q}: \(${tex(m.MC, 4)}\). Fixed cost drops out of MC. [[S06 Video Slides p.21]]`,
      ],
      src: 'S06 Video Slides; CQ3 Q1-Q4',
    }
  },
}

export const mcMin: Generator = {
  id: 's06-mcmin',
  session: 'S06',
  los: ['S06-LO2'],
  title: 'Where is marginal cost minimized?',
  skill: 'MC = dC/dQ; then dMC/dQ = 0 (CQ3 Q5)',
  screen: 'math',
  make(seed) {
    const g = new Rng(seed)
    const pr = g.pick(PRESETS)
    const Qmin = -(2 * pr.b) / (6 * pr.c)
    return {
      title: 'MC minimum',
      prompt: r`For \(${cubicTex(pr.c, pr.b, pr.a, pr.F)}\), at what quantity is marginal cost minimized? (Round to the nearest unit.)`,
      parts: [
        { type: 'num', label: r`Coefficient on Q in \(dMC/dQ\)`, answer: 6 * pr.c, tol: 0.001 },
        { type: 'num', label: 'Quantity that minimizes MC', answer: Math.round(Qmin), tol: 0, abs: 1.01 },
        { type: 'num', label: 'MC at that quantity', answer: 3 * pr.c * Qmin ** 2 + 2 * pr.b * Qmin + pr.a, kind: 'money', tol: 0.01, abs: 0.006 },
      ],
      steps: [
        r`\(MC = ${tex(3 * pr.c, 6)}Q^2 ${pr.b < 0 ? '-' : '+'} ${tex(Math.abs(2 * pr.b), 4)}Q + ${tex(pr.a, 2)}\)`,
        r`\(\dfrac{dMC}{dQ} = ${tex(6 * pr.c, 6)}Q ${pr.b < 0 ? '-' : '+'} ${tex(Math.abs(2 * pr.b), 4)} = 0\) → \(Q = ${tex(Math.abs(2 * pr.b), 4)}/${tex(6 * pr.c, 6)} = ${tex(Qmin, 2)}\) ≈ ${Math.round(Qmin)}. [[CQ3 Q5]]`,
      ],
      src: 'CQ3 Q5',
    }
  },
}

const CURVES = [
  { who: 'Guest-Tek', unit: 'cost per room per day (CPRPD)', A: 414.6136, b: -0.5705, xs: 'hotel rooms', Q: [200000, 300000, 520201, 1077754], src: 'S06 workbook, Solution!D75' },
  { who: 'Redbox', unit: 'cost per rental', A: 656.06, b: -0.476, xs: 'rentals (000s)', Q: [120000, 150000, 200000], src: 'S07 slides p.6' },
  { who: 'Netflix (2012-2016 streaming)', unit: 'cost per subscriber per month (CPSPM)', A: 38.096, b: -0.182, xs: 'subscribers (000s)', Q: [25000, 35000, 45000], src: 'your Cost Advantage, Part 1 step 2' },
  { who: 'a solar installer', unit: 'cost per kW installed', A: 9200, b: -0.32, xs: 'kW installed', Q: [500, 1000, 4000], src: 'site example' },
]

export const scaleCurve: Generator = {
  id: 's06-scale',
  session: 'S06',
  los: ['S06-LO2', 'S06-LO3'],
  title: 'Scale curve: unit cost, doubling, and scale needed for a target cost',
  skill: 'ATC = A·Q^b; doubling multiplies cost by 2^b; Q needed = (A/target)^(1/(−b)) (S06 workbook steps 3-5; Cost Advantage step 5)',
  screen: 'examples',
  make(seed) {
    const g = new Rng(seed)
    const cv = g.pick(CURVES)
    const Q = g.pick(cv.Q)
    const cost = cv.A * Q ** cv.b
    const target = Number((cost * g.pick([0.6, 0.7, 0.75, 0.8])).toPrecision(2))
    const need = (cv.A / target) ** (1 / -cv.b)
    return {
      title: 'Scale curve',
      prompt: r`${cv.who}'s scale curve is \(ATC = ${tex(cv.A, 4)}\,Q^{${tex(cv.b, 4)}}\), where ATC is ${cv.unit} and Q is ${cv.xs}.`,
      parts: [
        { type: 'num', label: `Unit cost at Q = ${num(Q, 0)}`, answer: cost, kind: 'money', tol: 0.005, abs: 0.0006 },
        { type: 'num', label: 'Slope of the scale curve (cost multiplier per doubling, 2^b)', answer: 2 ** cv.b, kind: 'percent', tol: 0.003 },
        { type: 'num', label: '% change in unit cost each time Q doubles', answer: 2 ** cv.b - 1, kind: 'percent', tol: 0.01 },
        { type: 'num', label: `Q needed to reach a unit cost of ${dollars(target)}`, answer: need, tol: 0.01 },
      ],
      steps: [
        r`\(ATC(${num(Q, 0)}) = ${tex(cv.A, 4)}\times${tex(Q, 0)}^{${tex(cv.b, 4)}} = ${tex(cost, 4)}\)`,
        r`Doubling: \(\dfrac{A(2Q)^b}{AQ^b} = 2^b = 2^{${tex(cv.b, 4)}} = ${tex(2 ** cv.b, 4)}\), so each doubling changes unit cost by **${pct(2 ** cv.b - 1, 1)}**. (A “${num(2 ** cv.b * 100, 0)}% curve.”) [[S06 workbook, Solution!E83]]`,
        r`Solve \(${tex(target, 4)} = ${tex(cv.A, 4)}Q^{${tex(cv.b, 4)}}\): \(Q = (${tex(cv.A, 4)}/${tex(target, 4)})^{1/${tex(-cv.b, 4)}} = ${tex(need, 0)}\). [[S06 workbook, Solution!C76]]`,
      ],
      src: cv.src,
    }
  },
}

const FIRMS = [
  { n: 'Whole Foods FY2014', rev: 14194, ni: 579, ta: 5744, te: 3813 },
  { n: 'Kroger FY2014', rev: 108465, ni: 1728, ta: 30556, te: 5442 },
  { n: 'Safeway FY2014', rev: 36360, ni: 113, ta: 13377, te: 5450 },
  { n: 'a regional grocer', rev: 8200, ni: 205, ta: 3100, te: 1400 },
  { n: 'a discount retailer', rev: 52000, ni: 1040, ta: 15000, te: 4300 },
]
export const dupont: Generator = {
  id: 's06-dupont',
  session: 'S06',
  los: ['S06-LO1'],
  title: 'Competing on cost: return on sales, asset turnover, leverage, ROA, ROE',
  skill: 'ROS = NI/Revenue; AT = Revenue/Assets; Leverage = Assets/Equity; ROA = ROS×AT; ROE = ROA×Leverage (S06 slides p.6)',
  screen: 'examples',
  make(seed) {
    const g = new Rng(seed)
    const f = g.pick(FIRMS)
    const ros = f.ni / f.rev
    const at = f.rev / f.ta
    const lev = f.ta / f.te
    return {
      title: 'Financial ratios',
      prompt: `${f.n} ($ millions): revenue ${num(f.rev, 0)}, net income ${num(f.ni, 0)}, total assets ${num(f.ta, 0)}, total equity ${num(f.te, 0)}.`,
      parts: [
        { type: 'num', label: 'Return on sales', answer: ros, kind: 'percent', tol: 0.01, abs: 0.0006 },
        { type: 'num', label: 'Asset turnover', answer: at, tol: 0.01 },
        { type: 'num', label: 'Financial leverage', answer: lev, tol: 0.01 },
        { type: 'num', label: 'Return on assets', answer: ros * at, kind: 'percent', tol: 0.01, abs: 0.0006 },
        { type: 'num', label: 'Return on equity', answer: ros * at * lev, kind: 'percent', tol: 0.01, abs: 0.0006 },
      ],
      steps: [
        r`ROS = NI/Revenue = ${num(f.ni, 0)}/${num(f.rev, 0)} = ${pct(ros)}; AT = Revenue/Assets = ${num(at, 2)}; Leverage = Assets/Equity = ${num(lev, 2)}. [[S06 slides p.6]]`,
        r`ROA = ROS × AT = ${pct(ros * at)}; ROE = ROA × Leverage = ${pct(ros * at * lev)}.`,
        r`Reading it: low margin + high asset turnover → cost/volume strategy (Kroger); high gross margin and overhead → differentiation (Whole Foods); a high ROE from leverage comes “mostly from debt.” [[S06 slides p.7]]`,
      ],
      src: 'S06 slides pp.6-7',
    }
  },
}

export const cprpd: Generator = {
  id: 's06-cprpd',
  session: 'S06',
  los: ['S06-LO2'],
  title: 'Cost per unit with unit conversions (Guest-Tek CPRPD)',
  skill: 'Costs in $000s × 1,000 ÷ (rooms × 365/4 days per quarter) (S06 workbook step 2)',
  screen: 'examples',
  make(seed) {
    const g = new Rng(seed)
    const rooms = g.step(80000, 600000, 1000)
    const tc = g.step(4000, 12000, 1)
    const v = (tc * 1000) / ((rooms * 365) / 4)
    return {
      title: 'Cost per room per day',
      prompt: `In one quarter an HSIA provider had total costs of ${num(tc, 0)} (in $000s) and ${num(rooms, 0)} hotel rooms installed. Compute cost per room per day (CPRPD).`,
      parts: [
        { type: 'num', label: 'Room-days in the quarter', answer: (rooms * 365) / 4, tol: 0.001 },
        { type: 'num', label: 'CPRPD', answer: v, kind: 'money', tol: 0.005, abs: 0.0006 },
      ],
      steps: [
        r`Convert the denominator to room-days: ${num(rooms, 0)} × 365/4 = ${num((rooms * 365) / 4, 0)}. [[S06 workbook, Solution!B33]]`,
        r`Costs are in thousands: ${num(tc, 0)} × 1,000 = $${num(tc * 1000, 0)}. CPRPD = ${num(tc * 1000, 0)} / ${num((rooms * 365) / 4, 0)} = ${dollars(v)}.`,
      ],
      src: 'S06 workbook step 2',
    }
  },
}

export const s06Generators = [costMeasures, mcMin, scaleCurve, dupont, cprpd]
