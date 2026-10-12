import { num, tex } from '../../lib/format'
import { Rng } from '../../lib/rng'
import type { Generator } from '../types'

const r = String.raw

export type Term = { c: number; p: number }
/** Pretty-print a polynomial in LaTeX (highest power first). */
export function polyTex(terms: Term[], v = 'x') {
  const ts = [...terms].filter((t) => t.c !== 0).sort((a, b) => b.p - a.p)
  if (!ts.length) return '0'
  return ts
    .map((t, i) => {
      const sign = t.c < 0 ? '-' : i ? '+' : ''
      const abs = Math.abs(t.c)
      const coef = abs === 1 && t.p !== 0 ? '' : tex(abs, 4)
      const pow = t.p === 0 ? '' : t.p === 1 ? v : `${v}^{${t.p}}`
      return `${i ? ` ${sign} ` : sign}${coef}${pow}`
    })
    .join('')
}
export function derive(terms: Term[]): Term[] {
  return terms.filter((t) => t.p !== 0).map((t) => ({ c: t.c * t.p, p: t.p - 1 }))
}
export const evalPoly = (terms: Term[], x: number) => terms.reduce((s, t) => s + t.c * x ** t.p, 0)

export const derivGen: Generator = {
  id: 's05-derivative',
  session: 'S05',
  los: ['S05-LO1'],
  title: 'Power rule: differentiate a polynomial',
  skill: 'For y = x^a, dy/dx = a·x^(a−1); constants vanish (S05 slides p.27; Math Review p.5)',
  screen: 'widgets',
  make(seed) {
    const g = new Rng(seed)
    const n = g.int(2, 3)
    const powers = g.shuffle([3, 2, 1, 4]).slice(0, n)
    const terms: Term[] = powers.map((p) => ({ c: g.pick([-5, -4, -3, -2, 2, 3, 4, 5, 6, 10]), p }))
    terms.push({ c: g.pick([1, 3, 7, 12, 50]), p: 0 })
    const d = derive(terms)
    const x0 = g.pick([-2, -1, 1, 2, 3])
    const lead = [...d].sort((a, b) => b.p - a.p)[0]
    return {
      title: 'Power rule',
      prompt: r`Find the derivative of \(y = ${polyTex(terms)}\).`,
      parts: [
        { type: 'num', label: r`Coefficient on the highest-power term of \(dy/dx\) (the \(x^{${lead.p}}\) term)`, answer: lead.c, tol: 0.001 },
        { type: 'num', label: r`Slope of the original function at \(x = ${x0}\), i.e. \(dy/dx\) at ${x0}`, answer: evalPoly(d, x0), tol: 0.001, abs: 0.001 },
      ],
      steps: [
        r`Apply the power rule term by term: bring the exponent down, subtract 1; the constant drops out. [[S05 slides p.27]]`,
        r`\(\dfrac{dy}{dx} = ${polyTex(d)}\)`,
        r`At \(x = ${x0}\): \(${tex(evalPoly(d, x0), 2)}\). That is the slope of the tangent line there. [[Math Review p.6]]`,
      ],
      src: 'S05 slides pp.27-32',
    }
  },
}

export const optimizeGen: Generator = {
  id: 's05-optimize',
  session: 'S05',
  los: ['S05-LO2'],
  title: 'Three-step optimization (revenue max or cost min)',
  skill: '1) derivative 2) set = 0 3) solve (Math Review pp.7-9)',
  screen: 'examples',
  make(seed) {
    const g = new Rng(seed)
    const max = g.bool()
    if (max) {
      const b = g.pick([1, 2, 3, 4, 5])
      const Pstar = g.pick([10, 15, 20, 25, 30, 40, 50])
      const a = 2 * b * Pstar
      return {
        title: 'Revenue-maximizing price',
        prompt: r`Revenue as a function of price is \(R(P) = ${a}P - ${b}P^2\). Find the revenue-maximizing price.`,
        parts: [
          { type: 'num', label: r`\(dR/dP\) evaluated at P = 0 (the intercept of the derivative)`, answer: a, tol: 0.001 },
          { type: 'num', label: 'Revenue-maximizing price P*', answer: Pstar, kind: 'money', tol: 0.001 },
          { type: 'num', label: 'Maximum revenue', answer: a * Pstar - b * Pstar ** 2, kind: 'money', tol: 0.001 },
        ],
        steps: [
          r`Step 1: \(\dfrac{dR}{dP} = ${a} - ${2 * b}P\). [[Math Review p.7]]`,
          r`Step 2: \(${a} - ${2 * b}P = 0\) (slope is zero at the top of the hill).`,
          r`Step 3: \(P^* = ${a}/${2 * b} = ${Pstar}\); \(R = ${a}(${Pstar}) - ${b}(${Pstar})^2 = ${tex(a * Pstar - b * Pstar ** 2, 0)}\).`,
        ],
        src: 'Math Review pp.7-8; S05 slides p.36',
      }
    }
    const a = g.pick([1, 2, 3, 4])
    const Qstar = g.pick([10, 15, 20, 25, 30])
    const b = 2 * a * Qstar
    const c = g.pick([800, 1000, 1400, 2000, 3000])
    return {
      title: 'Cost-minimizing quantity',
      prompt: r`Average total cost is \(ATC(Q) = ${a}Q^2 - ${b}Q + ${tex(c, 0)}\). Find the cost-minimizing quantity.`,
      parts: [
        { type: 'num', label: r`Coefficient on Q in \(dATC/dQ\)`, answer: 2 * a, tol: 0.001 },
        { type: 'num', label: 'Cost-minimizing quantity Q*', answer: Qstar, tol: 0.001 },
        { type: 'num', label: 'Minimum ATC', answer: a * Qstar ** 2 - b * Qstar + c, kind: 'money', tol: 0.001 },
      ],
      steps: [
        r`Step 1: \(\dfrac{dATC}{dQ} = ${2 * a}Q - ${b}\). [[Math Review p.8]]`,
        r`Step 2: \(${2 * a}Q - ${b} = 0\).`,
        r`Step 3: \(Q^* = ${b}/${2 * a} = ${Qstar}\); ATC = ${tex(a * Qstar ** 2 - b * Qstar + c, 0)}.`,
      ],
      src: 'Math Review pp.8-9; S05 slides p.40',
    }
  },
}

export const partialGen: Generator = {
  id: 's05-partial',
  session: 'S05',
  los: ['S05-LO1', 'S05-LO2'],
  title: 'Partial derivatives: isolate one variable',
  skill: '∂Q/∂x treats every other variable as a constant (Math Review p.10; S05 slides pp.43-45)',
  screen: 'math',
  make(seed) {
    const g = new Rng(seed)
    const cP = -g.pick([2, 4, 5, 8, 10])
    const cS = g.pick([1, 2, 3, 4])
    const cA = g.pick([20, 50, 100, 150])
    const k = g.pick([10, 20, 25, 50])
    const which = g.pick(['P', 'S', 'A'] as const)
    const coef = which === 'P' ? cP : which === 'S' ? cS : cA
    const label = which === 'P' ? 'its own price' : which === 'S' ? 'the rival’s price' : 'advertising ($000s)'
    const sym = which === 'P' ? 'P' : which === 'S' ? 'P_R' : 'A'
    return {
      title: 'Partial derivative',
      prompt: r`Forecast demand: \(Q = ${tex(g.step(2000, 9000, 500), 0)} ${cP < 0 ? '-' : '+'} ${Math.abs(cP)}P + ${cS}P_R + ${cA}A + 300I^2\). Holding everything else constant, by how much does Q change if **${label}** rises by ${k}?`,
      parts: [
        { type: 'num', label: r`\(\partial Q/\partial ${sym}\)`, answer: coef, tol: 0.001 },
        { type: 'num', label: `Change in Q for a ${k}-unit increase`, answer: coef * k, tol: 0.001 },
      ],
      steps: [
        r`Partial derivative: differentiate with respect to \(${sym}\) only; every other term is a constant and drops out. \(\partial Q/\partial ${sym} = ${coef}\). [[Math Review p.10]]`,
        r`\(${coef}\times${k} = ${coef * k}\) units (like the iPhone example: a $10 Galaxy price increase → 2 × 10 = 20 more iPhones). [[Math Review p.10]]`,
      ],
      src: 'Math Review p.10',
    }
  },
}

export const algebraGen: Generator = {
  id: 's05-algebra',
  session: 'S05',
  los: ['S05-LO1'],
  title: 'Algebra warm-up: solve for x',
  skill: 'The algebra used to solve “set the derivative = 0” equations (S05 Optional Practice p.1)',
  screen: 'apply',
  make(seed) {
    const g = new Rng(seed)
    const kind = g.int(0, 3)
    if (kind === 0) {
      const x = g.pick([5, 10, 12, 15, 20])
      const m = g.pick([4, 6, 8, 20])
      const b = g.pick([100, 200, 300])
      return { title: 'Linear', prompt: r`Solve \(${m * x + b} = ${m}x + ${b}\).`, parts: [{ type: 'num', label: 'x', answer: x, tol: 0.001 }], steps: [r`Subtract ${b}: \(${m * x} = ${m}x\) → \(x = ${x}\). [[S05 Optional Practice p.3]]`], src: 'S05 Optional Practice p.1' }
    }
    if (kind === 1) {
      const x = g.pick([4, 9, 16, 25, 36])
      const c = g.pick([2, 3, 4, 5])
      return { title: 'Square root', prompt: r`Solve \(${c * Math.sqrt(x)} = ${c}\sqrt{x}\).`, parts: [{ type: 'num', label: 'x', answer: x, tol: 0.001 }], steps: [r`Divide by ${c}: \(\sqrt{x} = ${Math.sqrt(x)}\) → square both sides: \(x = ${x}\).`], src: 'S05 Optional Practice p.1' }
    }
    if (kind === 2) {
      const x = g.pick([4, 9, 16, 25, 100])
      return { title: 'Negative exponent', prompt: r`Solve \(x^{-0.5} = \tfrac{1}{${Math.sqrt(x)}}\).`, parts: [{ type: 'num', label: 'x', answer: x, tol: 0.001 }], steps: [r`\(x^{-0.5} = 1/\sqrt{x}\), so \(\sqrt{x} = ${Math.sqrt(x)}\) → \(x = ${x}\). [[S05 Optional Practice p.3]]`], src: 'S05 Optional Practice p.1' }
    }
    const x = g.pick([0.5, 1, 2, 4, 5])
    const a = g.pick([10, 20, 40])
    const b = g.pick([5, 10, 20])
    return { title: 'Fraction', prompt: r`Solve \(${b} + \dfrac{${a}}{x} = ${num(b + a / x, 2)}\).`, parts: [{ type: 'num', label: 'x', answer: x, tol: 0.001 }], steps: [r`Subtract ${b}: \(${a}/x = ${num(a / x, 2)}\) → \(x = ${a}/${num(a / x, 2)} = ${x}\).`], src: 'S05 Optional Practice p.1' }
  },
}

export const s05Generators = [derivGen, optimizeGen, partialGen, algebraGen]
