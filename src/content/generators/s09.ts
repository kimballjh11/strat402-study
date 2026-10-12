import { ols, type RegressionOutput } from '../../lib/econ'
import { num, tex } from '../../lib/format'
import { Rng } from '../../lib/rng'
import type { Generator } from '../types'

const r = String.raw

export function gauss(g: Rng) {
  const u = Math.max(1e-12, g.float())
  const v = g.float()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

/** Render an Excel-style SUMMARY OUTPUT as a Rich markdown table. */
export function outputTable(o: RegressionOutput, names: string[], d = 3) {
  const f = (x: number, k = d) => num(x, k, { trim: false })
  const pv = (p: number) => (p < 0.0005 ? '0.000' : f(p, 3))
  return [
    '| Regression Statistics | |',
    '| --- | --- |',
    `| Multiple R | ${f(o.multipleR)} |`,
    `| R Square | ${f(o.r2)} |`,
    `| Adjusted R Square | ${f(o.adjR2)} |`,
    `| Standard Error | ${f(o.seReg)} |`,
    `| Observations | ${o.n} |`,
    '',
    '| | Coefficients | Standard Error | t Stat | P-value |',
    '| --- | --- | --- | --- | --- |',
    ...o.coef.map((c, i) => `| ${i === 0 ? 'Intercept' : names[i - 1]} | ${f(c)} | ${f(o.se[i])} | ${f(o.t[i], 2)} | ${pv(o.p[i])} |`),
  ].join('\n')
}

const SCEN = [
  { y: 'monthly smoothie sales (units)', x: [['Price ($)', 4, 9, -60, 'price'], ['Advertising ($100s)', 2, 20, 12, 'adv'], ['Avg. income ($1,000s)', 40, 90, 0.8, 'inc']] },
  { y: 'weekly gym sign-ups', x: [['Monthly fee ($)', 20, 60, -1.5, 'price'], ['Instagram ads ($100s)', 1, 15, 2.2, 'adv'], ['Rival’s fee ($)', 20, 60, 0.9, 'rival']] },
  { y: 'daily ice-cream cones sold', x: [['Price per cone ($)', 2, 6, -45, 'price'], ['High temperature (°F)', 50, 100, 3.1, 'temp'], ['Rival’s price ($)', 2, 6, 20, 'rival']] },
  { y: 'apartments rented (of 100)', x: [['Monthly rent ($)', 300, 700, -0.12, 'price'], ['Advertising ($100s)', 5, 35, 0.4, 'adv'], ['Distance to campus (miles)', 1, 12, -5, 'dist']] },
] as const

/** Generate a fake dataset, run real OLS, and ask the S09 questions about the output. */
export const interpret: Generator = {
  id: 's09-interpret',
  session: 'S09',
  los: ['S09-LO1', 'S09-LO3'],
  title: 'Interpret this regression output',
  skill: 'Write the demand function, judge significance (|t| > 2, p < 0.05), interpret R², forecast, elasticity (S09 slides pp.20-34; CQ5 Q1-Q5; Redstone)',
  screen: 'widgets',
  make(seed) {
    const g = new Rng(seed)
    const sc = SCEN[g.int(0, SCEN.length - 1)]
    const n = g.pick([20, 24, 30, 36, 40])
    // one variable is deliberately weak (true effect tiny) so significance varies
    const weak = g.int(1, 2)
    const xs: number[][] = []
    const ys: number[] = []
    const base = sc.x[0][3] < 0 ? 500 : 50
    for (let i = 0; i < n; i++) {
      const row = sc.x.map(([, lo, hi]) => Math.round((lo + (hi - lo) * g.float()) * 100) / 100)
      xs.push(row)
      const mean = row.reduce((s, v, j) => s + v * (j === weak ? (sc.x[j][3] as number) * 0.05 : (sc.x[j][3] as number)), base * (sc.y.includes('apartments') ? 0.2 : 1) + 60)
      ys.push(Math.round(mean + gauss(g) * Math.abs(mean) * 0.06))
    }
    const o = ols(ys, xs)
    const names = sc.x.map((x) => x[0] as string)
    const R = (v: number, k = 3) => Number(v.toFixed(k))
    const b = o.coef.map((c) => R(c))
    const sig = o.p.map((p) => p < 0.05)
    const pick = g.int(1, 3) // variable for interpretation question
    const sigVar = sig.slice(1).map((s, i) => (s ? i : -1)).filter((i) => i >= 0)
    const xbar = sc.x.map((_, j) => xs.reduce((s, r) => s + r[j], 0) / n)
    const ybar = ys.reduce((s, v) => s + v, 0) / n
    const forecastX = sc.x.map(([, lo, hi]) => Math.round((lo as number) + ((hi as number) - (lo as number)) * g.pick([0.25, 0.5, 0.75])))
    const forecast = b[0] + forecastX.reduce((s, v, j) => s + v * b[j + 1], 0)
    const opeAtMeans = (b[1] * R(xbar[0], 2)) / R(ybar, 2)
    const change = g.pick([1, 2, 5, 10])
    return {
      title: 'Interpret the output',
      prompt: r`You regress **${sc.y}** (Y) on ${names.join(', ')} using ${n} observations. Excel's Analysis ToolPak output:

${outputTable(o, names)}

Sample means: ${names.map((nm, j) => `${nm} = ${num(xbar[j], 2)}`).join('; ')}; Y = ${num(ybar, 2)}.`,
      parts: [
        { type: 'num', label: r`Holding the others constant, a ${change}-unit increase in **${names[pick - 1]}** changes Y by…`, answer: b[pick] * change, tol: 0.01, abs: 0.002 },
        { type: 'choice', label: `Which predictors are statistically significant at the 5% level?`, ...significanceOptions(names, sig.slice(1), g) },
        { type: 'num', label: 'What % of the variation in Y does the model explain?', answer: R(o.r2), kind: 'percent', tol: 0.005, abs: 0.0006 },
        { type: 'num', label: r`Forecast Y when ${names.map((nm, j) => `${nm} = ${forecastX[j]}`).join(', ')}`, answer: forecast, tol: 0.01, abs: 0.05 },
        { type: 'num', label: `Own-price elasticity at the sample means (use the ${names[0]} coefficient)`, answer: opeAtMeans, tol: 0.02, abs: 0.006 },
      ],
      steps: [
        r`Estimated equation: \(\hat Y = ${tex(b[0], 3)} ${b.slice(1).map((c, j) => `${c < 0 ? '-' : '+'} ${tex(Math.abs(c), 3)}\\,X_{${j + 1}}`).join(' ')}\), where \(X_1\)=${names[0]}, \(X_2\)=${names[1]}, \(X_3\)=${names[2]}. [[S09 slides p.23]]`,
        r`“A one-unit increase in x leads to a (coefficient) increase/decrease in y”: ${change} × ${num(b[pick], 3)} = **${num(b[pick] * change, 3)}**. [[S09 slides p.24]]`,
        r`Significant if |t| > 2 (rule of thumb) or p < 0.05: ${names.map((nm, j) => `${nm} t = ${num(o.t[j + 1], 2)}, p = ${o.p[j + 1] < 0.0005 ? '0.000' : num(o.p[j + 1], 3)} → ${sig[j + 1] ? 'significant' : 'not'}`).join('; ')}. ${sigVar.length === 0 ? 'None.' : ''} [[S09 slides pp.29-31]]`,
        r`R² = ${num(o.r2, 3)} → about ${num(o.r2 * 100, 1)}% of the variation in Y is explained by the x's. [[S09 slides p.33]]`,
        r`Forecast: \(${tex(b[0], 3)} ${forecastX.map((v, j) => `${b[j + 1] < 0 ? '-' : '+'} ${tex(Math.abs(b[j + 1]), 3)}(${v})`).join(' ')} = ${tex(forecast, 2)}\).`,
        r`\(OPE = b_P\cdot\bar P/\bar Y = ${tex(b[1], 3)}\times${tex(xbar[0], 2)}/${tex(ybar, 2)} = ${tex(opeAtMeans, 3)}\) → ${opeAtMeans < -1 ? 'elastic: a price increase lowers revenue' : 'inelastic: a price increase raises revenue'}. [[S09 workbook, Solution!A57]]`,
      ],
      src: 'S09 slides pp.20-34; S09 workbook (Redstone)',
    }
  },
  verify(seed) {
    const p = this.make(seed)
    for (const part of p.parts) if (part.type === 'num' && !Number.isFinite(part.answer)) return 'NaN'
    return null
  },
}

function significanceOptions(names: string[], sig: boolean[], g: Rng) {
  const label = (s: boolean[]) => {
    const ns = names.filter((_, i) => s[i])
    return ns.length ? ns.join(' and ') : 'None of them'
  }
  const correct = label(sig)
  const alts = [sig.map(() => true), sig.map((s) => !s), sig.map((_, i) => i === 0), sig.map(() => false)].map(label)
  const opts = g.shuffle([correct, ...alts.filter((a, i, arr) => a !== correct && arr.indexOf(a) === i)].slice(0, 4))
  return { options: opts, correct: opts.indexOf(correct) }
}

/** Forecast and marginal effects with units (CQ5 Q1, Q4, Q5 style). */
export const unitsGen: Generator = {
  id: 's09-units',
  session: 'S09',
  los: ['S09-LO3'],
  title: 'Use a coefficient with units (marginal effect)',
  skill: 'Convert the change into the variable’s units, then multiply by the coefficient (CQ5 Q1, Q4, Q5)',
  screen: 'examples',
  make(seed) {
    const g = new Rng(seed)
    const v = g.pick([
      { name: '# of Departures (1,000s)', coef: g.pick([0.052, 0.04, 0.065]), unitSize: 1000, what: 'departing flights per year', y: 'cents per mile' },
      { name: '# of Passengers (100,000s)', coef: g.pick([-0.027, -0.031, -0.018]), unitSize: 100000, what: 'passengers', y: 'cents per mile' },
      { name: 'Advertising ($100s)', coef: g.pick([0.54, 0.8, 1.2]), unitSize: 100, what: 'dollars of advertising', y: 'units rented' },
      { name: 'Average Flight Distance (miles)', coef: g.pick([-0.007, -0.005, -0.009]), unitSize: 1, what: 'miles', y: 'cents per mile' },
    ])
    const units = g.pick([2, 5, 10, 12, 17, 20, 25, 50])
    const raw = units * v.unitSize
    const effect = units * v.coef
    return {
      title: 'Marginal effect with units',
      prompt: r`A regression's coefficient on **${v.name}** is **${num(v.coef, 3)}** (dependent variable: ${v.y}). Holding everything else constant, what is the expected change in Y if ${v.what} ${raw > 0 ? 'increase' : 'change'} by **${num(raw, 0)}**?`,
      parts: [
        { type: 'num', label: 'Change in the variable, in its own units', answer: units, tol: 0.001 },
        { type: 'num', label: `Expected change in Y (${v.y}; negative for a decrease)`, answer: effect, tol: 0.01, abs: 0.0005 },
      ],
      steps: [
        r`The variable is measured in units of ${num(v.unitSize, 0)}, so ${num(raw, 0)} = **${units} units**. [[CQ5 Q5]]`,
        r`\(\Delta Y = ${units}\times(${tex(v.coef, 3)}) = ${tex(effect, 3)}\) ${v.y}.`,
      ],
      src: 'CQ5 Q1, Q4, Q5',
    }
  },
}

/** t-stat and significance from coefficient and SE. */
export const tstatGen: Generator = {
  id: 's09-tstat',
  session: 'S09',
  los: ['S09-LO1'],
  title: 't-statistics and significance',
  skill: 't = coefficient ÷ standard error; |t| > 2 → significant (S09 slides p.29)',
  screen: 'terms',
  make(seed) {
    const g = new Rng(seed)
    const coef = (g.bool() ? -1 : 1) * g.pick([0.14, 0.54, 2.6, 5.8, 7.8, 12.5, 120])
    const t = Math.sign(coef) * g.pick([0.6, 1.1, 1.6, 2.4, 3.3, 4.9, 6.7])
    const se = Number((coef / t).toFixed(3))
    const tt = coef / se
    return {
      title: 't-stat',
      prompt: r`A coefficient is **${num(coef, 3)}** with standard error **${num(se, 3)}**.`,
      parts: [
        { type: 'num', label: 't Stat', answer: tt, tol: 0.01, abs: 0.01 },
        { type: 'choice', label: 'Using the professor’s rule of thumb, is it statistically significant?', options: ['Yes (|t| > 2)', 'No (|t| ≤ 2)'], correct: Math.abs(tt) > 2 ? 0 : 1 },
      ],
      steps: [
        r`\(t = \dfrac{\text{coefficient}}{\text{standard error}} = \dfrac{${tex(coef, 3)}}{${tex(se, 3)}} = ${tex(tt, 2)}\) [[S09 slides p.29]]`,
        r`Generally, t-statistics greater than 2 in absolute value indicate that the coefficient is statistically significant (not equal to zero). |t| = ${num(Math.abs(tt), 2)} → ${Math.abs(tt) > 2 ? 'significant' : 'not significant'}.`,
      ],
      src: 'S09 slides p.29',
    }
  },
}

/** Elasticity and revenue implication from a linear regression at given values (Redstone style). */
export const regElasticity: Generator = {
  id: 's09-elasticity',
  session: 'S09',
  los: ['S09-LO3', 'S08-LO2'],
  title: 'Elasticity from regression output',
  skill: 'OPE = b_P × P/Q at the given (average) values; elastic → raising price lowers revenue (S09 workbook, Solution!A57)',
  screen: 'examples',
  make(seed) {
    const g = new Rng(seed)
    const bP = -g.pick([0.08, 0.12, 0.143, 0.2, 0.25, 0.4])
    const P = g.step(250, 650, 25)
    const Q = Math.round(-bP * P * g.pick([0.5, 0.6, 0.75, 0.9, 1.15, 1.3, 1.6, 2]))
    const E = (bP * P) / Q
    return {
      title: 'Elasticity from regression',
      prompt: r`A demand regression for apartments gives a rent coefficient of **${num(bP, 3)}** (units rented per $1 of rent). At an average complex, rent is **$${num(P, 0)}** and **${Q}** units are rented.`,
      parts: [
        { type: 'num', label: 'Change in units rented if rent rises $100', answer: bP * 100, tol: 0.01 },
        { type: 'num', label: 'OPE at the average values', answer: E, tol: 0.01, abs: 0.006 },
        { type: 'choice', label: 'Raising rent at an average complex would make total revenue…', options: ['Rise', 'Fall'], correct: E < -1 ? 1 : 0 },
      ],
      steps: [
        r`\(\partial Q/\partial P = ${tex(bP, 3)}\) → +$100 → \(${tex(bP * 100, 1)}\) units. [[S09 workbook, Solution!A49]]`,
        r`\(OPE = ${tex(bP, 3)}\times\dfrac{${num(P, 0)}}{${Q}} = ${tex(E, 2)}\) [[S09 workbook, Solution!A57]]`,
        r`${E < -1 ? 'OPE < −1 → elastic: raising rent lowers units rented AND total revenue.' : '−1 < OPE < 0 → inelastic: raising rent lowers units rented but raises revenue.'}`,
      ],
      src: 'S09 workbook (Redstone Residential)',
    }
  },
}

export const s09Generators = [interpret, unitsGen, tstatGen, regElasticity]
