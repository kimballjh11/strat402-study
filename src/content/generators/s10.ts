import { Rng } from '../../lib/rng'
import { dollars, num, tex } from '../../lib/format'
import type { Generator } from '../types'

const r = String.raw

/** Solve a price-maker problem: P = a − bQ, C = F + cQ + dQ². */
export function priceMaker(a: number, b: number, F: number, c: number, d: number) {
  const Q = (a - c) / (2 * b + 2 * d)
  const P = a - b * Q
  const R = P * Q
  const C = F + c * Q + d * Q * Q
  return { Q, P, R, C, profit: R - C, atc: C / Q, mr: a - 2 * b * Q, mc: c + 2 * d * Q }
}

/** Price taker: P = MC with C = F + cQ + dQ². */
export function priceTaker(P: number, F: number, c: number, d: number) {
  const Q = (P - c) / (2 * d)
  const C = F + c * Q + d * Q * Q
  const avc = c + d * Q
  return { Q, R: P * Q, C, profit: P * Q - C, avc, atc: C / Q }
}

const costStr = (F: number, c: number, d: number) => r`C(Q) = ${tex(F, 0)}${c ? r` + ${tex(c, 2)}Q` : ''} + ${tex(d, 2)}Q^2`

export const mrGen: Generator = {
  id: 's10-mr',
  session: 'S10',
  los: ['S10-LO1', 'S10-LO4'],
  title: 'Marginal revenue from inverse demand',
  skill: 'R = P·Q, MR = dR/dQ; linear MR has twice the slope (S10 slides pp.17-19)',
  screen: 'math',
  make(seed) {
    const g = new Rng(seed)
    const b = g.pick([0.5, 1, 2, 3, 4, 5])
    const a = g.pick([10, 20, 40, 60, 80, 100, 120, 200])
    const Q0 = Math.round((a / b) * g.pick([0.1, 0.2, 0.3, 0.4]))
    return {
      title: 'Marginal revenue',
      prompt: r`Inverse demand is \(P = ${a} - ${tex(b, 1)}Q\).`,
      parts: [
        { type: 'num', label: r`MR at \(Q = ${Q0}\)`, answer: a - 2 * b * Q0, tol: 0.001, abs: 0.01 },
        { type: 'num', label: r`Quantity where revenue is maximized (MR = 0)`, answer: a / (2 * b), tol: 0.001 },
        { type: 'num', label: 'Maximum revenue', answer: (a / 2) * (a / (2 * b)), kind: 'money', tol: 0.001 },
      ],
      steps: [
        r`\(R = P\cdot Q = (${a} - ${tex(b, 1)}Q)Q = ${a}Q - ${tex(b, 1)}Q^2\)`,
        r`\(MR = \dfrac{dR}{dQ} = ${a} - ${tex(2 * b, 1)}Q\) — same intercept, twice the slope. [[S10 slides p.17]]`,
        r`At \(Q = ${Q0}\): \(MR = ${a} - ${tex(2 * b, 1)}(${Q0}) = ${tex(a - 2 * b * Q0, 2)}\).`,
        r`Revenue peaks where \(MR = 0\): \(Q = ${a}/${tex(2 * b, 1)} = ${tex(a / (2 * b), 2)}\), \(P = ${tex(a / 2, 2)}\), \(R = ${tex((a / 2) * (a / (2 * b)), 2)}\).`,
      ],
      src: 'S10 slides pp.17-19',
    }
  },
}

export const takerGen: Generator = {
  id: 's10-taker',
  session: 'S10',
  los: ['S10-LO4', 'S10-LO2'],
  title: 'Profit max for a price taker (perfect competition)',
  skill: 'P_market = MC(Q*); profit = PQ − C; operate short run / exit long run (S10 slides p.46; CQ5 Q8)',
  screen: 'examples',
  make(seed) {
    const g = new Rng(seed)
    const d = g.pick([1, 2, 4, 5])
    const c = g.pick([0, 0, 5, 10, 20])
    const Q = g.pick([4, 5, 6, 8, 10, 12, 15, 20])
    const P = c + 2 * d * Q
    const profitTarget = g.pick([-1, 1])
    // choose F so profit has the chosen sign and is a nice number
    const variable = P * Q - c * Q - d * Q * Q
    const F = Math.max(10, variable + (profitTarget < 0 ? g.pick([5, 10, 25, 50]) : -Math.min(variable - 5, g.pick([10, 25, 50, 75]))))
    const s = priceTaker(P, F, c, d)
    return {
      title: 'Price taker',
      prompt: r`You are a perfectly competitive firm with \(${costStr(F, c, d)}\). The market price is **${dollars(P)}**.`,
      parts: [
        { type: 'num', label: 'Profit-maximizing quantity', answer: s.Q, tol: 0.001 },
        { type: 'num', label: 'Total revenue', answer: s.R, kind: 'money', tol: 0.001 },
        { type: 'num', label: 'Total cost', answer: s.C, kind: 'money', tol: 0.001 },
        { type: 'num', label: 'Profit (negative for a loss)', answer: s.profit, kind: 'money', tol: 0.001, abs: 0.01 },
        { type: 'choice', label: 'Strategic implication', options: ['Earning profit now; expect entry to compete it away in the long run', 'Operate in the short run (P covers AVC) but exit in the long run'], correct: s.profit >= 0 ? 0 : 1 },
      ],
      steps: [
        r`Price taker → \(MR = P = ${tex(P, 0)}\). \(MC = \dfrac{dC}{dQ} = ${c ? `${tex(c, 0)} + ` : ''}${tex(2 * d, 0)}Q\). [[S10 slides p.46]]`,
        r`Set \(P = MC\): \(${tex(P, 0)} = ${c ? `${tex(c, 0)} + ` : ''}${tex(2 * d, 0)}Q\) → \(Q^* = ${tex(s.Q, 2)}\).`,
        r`\(R = ${tex(P, 0)}\times${tex(s.Q, 2)} = ${tex(s.R, 2)}\); \(C = ${tex(F, 0)}${c ? ` + ${tex(c, 0)}(${tex(s.Q, 2)})` : ''} + ${tex(d, 0)}(${tex(s.Q, 2)})^2 = ${tex(s.C, 2)}\).`,
        r`Profit \(= ${tex(s.R, 2)} - ${tex(s.C, 2)} = ${tex(s.profit, 2)}\).`,
        s.profit >= 0
          ? r`Positive profit in a perfectly competitive market attracts entry (free entry/exit), which pushes price down until profit is zero.`
          : r`A loss, but price ${dollars(P)} ≥ AVC ${dollars(s.avc)} covers variable cost, so the firm **continues to operate in the short run, but exits in the long run**. [[S10 slides p.46]]`,
      ],
      src: 'S10 slides p.46; CQ5 Q8',
    }
  },
  verify(seed) {
    const p = this.make(seed)
    const q = (p.parts[0] as { answer: number }).answer
    return q > 0 ? null : `Q<=0`
  },
}

export const makerGen: Generator = {
  id: 's10-maker',
  session: 'S10',
  los: ['S10-LO4'],
  title: 'Profit max for a monopoly / monopolistic competitor',
  skill: 'MR(Q*) = MC(Q*), then P* = P(Q*) from demand; profit = R − C (S10 slides pp.47-48; CQ5 Q6-Q7)',
  screen: 'examples',
  make(seed) {
    const g = new Rng(seed)
    for (let t = 0; ; t++) {
      const b = g.pick([1, 2, 3, 4])
      const d = g.pick([1, 2, 3, 4])
      const c = g.pick([0, 0, 4, 10, 20])
      const Q = g.pick([5, 6, 8, 10, 12, 15, 20])
      const a = c + 2 * (b + d) * Q
      const F = g.pick([50, 100, 125, 200, 300, 500])
      const s = priceMaker(a, b, F, c, d)
      if (s.profit > -F * 0.5 || t > 20) {
        const mc = g.bool()
        return {
          title: mc ? 'Monopolistic competition' : 'Monopoly',
          prompt: r`You are ${mc ? 'a monopolistically competitive firm; the inverse demand for **your brand** is' : 'a monopolist facing inverse demand'} \(P = ${tex(a, 0)} - ${b}Q\), with \(${costStr(F, c, d)}\).`,
          parts: [
            { type: 'num', label: 'Profit-maximizing quantity Q*', answer: s.Q, tol: 0.001 },
            { type: 'num', label: 'Profit-maximizing price P*', answer: s.P, kind: 'money', tol: 0.001 },
            { type: 'num', label: 'Profit', answer: s.profit, kind: 'money', tol: 0.001, abs: 0.01 },
            {
              type: 'choice',
              label: 'What should you expect in the long run?',
              options: mc
                ? ['Rivals imitate and enter; profit declines toward zero', 'No entry — profit persists indefinitely', 'Price rises as demand grows']
                : ['No entry unless patents or other entry barriers are eliminated', 'Rivals imitate and enter; profit declines toward zero', 'The firm must exit'],
              correct: 0,
            },
          ],
          steps: [
            r`\(R = (${tex(a, 0)} - ${b}Q)Q\) → \(MR = ${tex(a, 0)} - ${2 * b}Q\). \(MC = ${c ? `${c} + ` : ''}${2 * d}Q\).`,
            r`\(MR = MC\): \(${tex(a, 0)} - ${2 * b}Q = ${c ? `${c} + ` : ''}${2 * d}Q\) → \(Q^* = ${tex(s.Q, 2)}\). [[S10 slides p.47]]`,
            r`Read price off **demand** (not MC): \(P^* = ${tex(a, 0)} - ${b}(${tex(s.Q, 2)}) = ${tex(s.P, 2)}\).`,
            r`\(R = ${tex(s.R, 2)}\), \(C = ${tex(s.C, 2)}\), profit \(= ${tex(s.profit, 2)}\).`,
            mc
              ? r`Monopolistically competitive firms should expect other firms to imitate, so profits will decline with entry. [[S10 slides p.48]]`
              : r`A monopolist will not face entry (unless patent or other entry barriers are eliminated). [[S10 slides p.47]]`,
          ],
          src: 'S10 slides pp.47-48; CQ5 Q6-Q7',
        }
      }
    }
  },
  verify(seed) {
    const p = this.make(seed)
    const q = (p.parts[0] as { answer: number }).answer
    const P = (p.parts[1] as { answer: number }).answer
    return q > 0 && P > 0 ? null : 'bad'
  },
}

export const mbmcGen: Generator = {
  id: 's10-mbmc',
  session: 'S10',
  los: ['S10-LO1'],
  title: 'Marginal analysis from a table (MB = MC)',
  skill: 'Compute MB and MC from totals; keep going while MB ≥ MC (S10 slides p.15; CQ5 Q10)',
  screen: 'examples',
  make(seed) {
    const g = new Rng(seed)
    const unit = g.pick(['ads purchased', 'workers hired', 'hours open', 'delivery drivers'])
    const n = 7
    const mb0 = g.pick([60, 80, 90, 100, 120])
    const mbStep = g.pick([10, 15, 20])
    const mc0 = g.pick([5, 10, 15, 20])
    const mcStep = g.pick([10, 15, 20])
    const MB = Array.from({ length: n }, (_, i) => Math.max(0, mb0 - mbStep * i))
    const MC = Array.from({ length: n }, (_, i) => mc0 + mcStep * i)
    const TR = MB.map((_, i) => MB.slice(0, i + 1).reduce((s, v) => s + v, 0))
    const TC = MC.map((_, i) => MC.slice(0, i + 1).reduce((s, v) => s + v, 0))
    const profit = TR.map((v, i) => v - TC[i])
    let best = 0
    profit.forEach((p, i) => (p > profit[best] || (p === profit[best] && i > best) ? (best = i) : null))
    const k = g.int(2, n - 1)
    const rows = ['| Units | Total benefit | Total cost |', '| --- | --- | --- |', '| 0 | 0 | 0 |', ...TR.map((t, i) => `| ${i + 1} | ${num(t, 0)} | ${num(TC[i], 0)} |`)].join('\n')
    return {
      title: 'Marginal analysis table',
      prompt: r`A small business is deciding how many ${unit} to use. Total benefit (revenue) and total cost:

${rows}`,
      parts: [
        { type: 'num', label: `Marginal benefit of unit ${k}`, answer: MB[k - 1], tol: 0.001, abs: 0.01 },
        { type: 'num', label: `Marginal cost of unit ${k}`, answer: MC[k - 1], tol: 0.001, abs: 0.01 },
        { type: 'num', label: 'Profit-maximizing number of units (if two tie, choose the larger)', answer: best + 1, tol: 0 },
        { type: 'num', label: 'Maximum profit', answer: profit[best], kind: 'money', tol: 0.001, abs: 0.01 },
      ],
      steps: [
        r`MB of unit \(k\) = \(TB_k - TB_{k-1}\); MC of unit \(k\) = \(TC_k - TC_{k-1}\). Unit ${k}: MB = ${MB[k - 1]}, MC = ${MC[k - 1]}.`,
        r`MB: ${MB.join(', ')}. MC: ${MC.join(', ')}.`,
        r`Keep adding units while MB ≥ MC; stop when MB = MC (or the next unit's MC exceeds its MB). That's unit **${best + 1}**, profit ${num(profit[best], 0)}. [[S10 slides pp.14-15]]`,
      ],
      src: 'S10 slides p.15',
    }
  },
}

export const s10Generators = [mrGen, takerGen, makerGen, mbmcGen]
