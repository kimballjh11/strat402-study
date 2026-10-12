import { useMemo, useState } from 'react'
import { Cite } from '../components/Cite'
import { Rich } from '../components/Rich'
import { ols } from '../lib/econ'
import { num } from '../lib/format'
import { recordAnswer } from '../lib/store'

const DATA = {
  tv: {
    name: 'Pittsburgh TVs (S09 slides)',
    src: 'S09 slides pp.16, 25',
    y: 'Quantity',
    xn: ['Price'],
    rows: [[180, 475], [590, 400], [430, 450], [250, 550], [275, 575], [720, 375], [660, 375], [490, 450], [700, 400], [210, 500]],
  },
  redstone: {
    name: 'Redstone Residential (S09 in-class)',
    src: 'S09 workbook, Solution!A15:G34',
    y: 'Units rented',
    xn: ['Price ($)', 'Advertising ($100s)', 'Distance (miles)'],
    rows: [[28, 250, 11, 12], [69, 400, 24, 6], [43, 450, 15, 5], [32, 550, 31, 7], [42, 575, 34, 4], [72, 375, 22, 2], [66, 375, 12, 5], [49, 450, 24, 7], [70, 400, 22, 4], [60, 375, 10, 5]],
  },
}
type Key = keyof typeof DATA

interface Cell {
  id: string
  label: string
  value: string
  explain: string
  q?: { stem: string; options: string[]; correct: number; why: string }
}

/** Click any number in an Excel regression output to see what it means — and answer a question about it. */
export default function RegressionOutput() {
  const [k, setK] = useState<Key>('tv')
  const [sel, setSel] = useState<string>('coef1')
  const [ans, setAns] = useState<number | null>(null)
  const d = DATA[k]
  const o = useMemo(() => ols(d.rows.map((r) => r[0]), d.rows.map((r) => r.slice(1))), [d])
  const f = (x: number, dd = 2) => num(x, dd, { trim: false })
  const names = ['Intercept', ...d.xn]
  const v1 = d.xn[0]
  const cd = k === 'tv' ? 2 : 3 // match the professor's displayed precision

  const cells: Cell[] = [
    { id: 'mr', label: 'Multiple R', value: f(o.multipleR), explain: r`**Multiple R = ${f(o.multipleR)}** is the correlation between actual and predicted Y, the square root of R². Rarely the number you want: CQ5 used it as a distractor. [[CQ5 Q2]]` },
    {
      id: 'r2', label: 'R Square', value: f(o.r2),
      explain: r`**R² = ${f(o.r2)}**: “An R-squared of ${f(o.r2)} indicates that ${f(o.r2 * 100, 0)}% of the variation in y can be explained by variation in the x's.” It equals Regression SS ÷ Total SS = ${f(o.ssr)} ÷ ${f(o.sst)}. [[S09 slides p.33]]`,
      q: { stem: 'How much of the variation in Y does the model explain?', options: [`${f(o.r2 * 100, 0)}%`, `${f(o.multipleR * 100, 0)}%`, `${f(o.adjR2 * 100, 0)}%`], correct: 0, why: 'R Square, not Multiple R or adjusted R².' },
    },
    { id: 'adj', label: 'Adjusted R Square', value: f(o.adjR2), explain: r`**Adjusted R² = ${f(o.adjR2)}**: R² penalized for the number of variables (${o.k}) relative to observations (${o.n}). It only rises if a new variable adds more than chance would. [[CQ5 Q2]]` },
    { id: 'se', label: 'Standard Error', value: f(o.seReg), explain: r`**Standard error of the regression = ${f(o.seReg)}**: the typical size of a residual (actual − predicted), in Y's units. Don't confuse it with a coefficient's standard error.` },
    { id: 'n', label: 'Observations', value: String(o.n), explain: `**${o.n} observations.** Small samples make estimates noisy. With ${o.n} observations, the “|t| > 2” rule of thumb can disagree with p < 0.05 (Redstone price: t = −2.41, p = 0.053). [[S09 workbook, Solution!A43]]` },
    { id: 'f', label: 'F / Significance F', value: `${f(o.f)} / ${o.sigF < 0.0001 ? f(o.sigF, 6) : f(o.sigF, 4)}`, explain: r`**F = ${f(o.f)}, Significance F = ${f(o.sigF, 4)}**: tests whether the x's *together* explain anything. Significance F < 0.05 → the model as a whole is significant. (Not on the professor's term list, but it is in every Excel output.)` },
    ...o.coef.flatMap((c, i) => [
      {
        id: `coef${i}`, label: `${names[i]}: Coefficient`, value: f(c, cd),
        explain:
          i === 0
            ? r`**Intercept = ${f(c, 3)}**: predicted Y when every x is 0. Usually not meaningful by itself (a price of $0 is outside the data), but you need it to write the equation and forecast.`
            : r`**${names[i]} coefficient = ${f(c, 3)}**: “A one-unit increase in ${names[i]} leads to a ${f(Math.abs(c), 3)} ${c < 0 ? 'decrease' : 'increase'} in ${d.y}”, holding the other x's constant. [[S09 slides p.24]]`,
        q:
          i === 0
            ? undefined
            : { stem: `If ${names[i]} rises by 10 units (other x's constant), ${d.y} changes by…`, options: [f(10 * c, 2), f(c, 3), f(-10 * c, 2)], correct: 0, why: `10 × ${f(c, 3)} = ${f(10 * c, 2)}.` },
      },
      { id: `se${i}`, label: `${names[i]}: Standard Error`, value: f(o.se[i], cd), explain: r`**Standard error = ${f(o.se[i], 3)}**: the standard deviation of this coefficient estimate, i.e. how noisy it is. Smaller means more precise. [[S09 slides p.26]]` },
      {
        id: `t${i}`, label: `${names[i]}: t Stat`, value: f(o.t[i]),
        explain: r`**t = coefficient ÷ standard error = ${f(c, 3)} ÷ ${f(o.se[i], 3)} = ${f(o.t[i])}.** |t| > 2 generally means significant (not zero). Here |t| ${Math.abs(o.t[i]) > 2 ? '> 2 → significant' : '≤ 2 → not significant'} by the rule of thumb. [[S09 slides p.29]]`,
        q: { stem: `Is ${names[i]} statistically significant by the |t| > 2 rule?`, options: ['Yes', 'No'], correct: Math.abs(o.t[i]) > 2 ? 0 : 1, why: `|t| = ${f(Math.abs(o.t[i]))}.` },
      },
      {
        id: `p${i}`, label: `${names[i]}: P-value`, value: f(o.p[i], 4),
        explain: r`**p = ${f(o.p[i], 4)}.** In the professor's words, it “tells you the probability that a true parameter that you estimated is equal to zero.” Significant when p < 0.05: here ${o.p[i] < 0.05 ? 'yes' : 'no'}. [[S09 slides p.31]]`,
        q: { stem: `At the 5% level, is ${names[i]} significant?`, options: ['Yes (p < 0.05)', 'No (p ≥ 0.05)'], correct: o.p[i] < 0.05 ? 0 : 1, why: `p = ${f(o.p[i], 4)}.` },
      },
      { id: `ci${i}`, label: `${names[i]}: 95% interval`, value: `${f(o.lower[i], 2)} to ${f(o.upper[i], 2)}`, explain: r`**95% confidence interval ${f(o.lower[i], 2)} to ${f(o.upper[i], 2)}.** If it ${o.lower[i] < 0 && o.upper[i] > 0 ? 'includes 0 (as it does here)' : 'excludes 0 (as it does here)'}, the coefficient is ${o.lower[i] < 0 && o.upper[i] > 0 ? 'NOT' : ''} significant at 5%. Same conclusion as the p-value.` },
    ]),
  ]
  const cell0 = cells.find((c) => c.id === sel) ?? cells[0]
  // rotate options so the right answer isn't always first
  const cell = cell0.q
    ? (() => {
        const n = cell0.q.options.length
        const rot = (cell0.id.length + k.length) % n
        const options = cell0.q.options.map((_, i) => cell0.q!.options[(i + rot) % n])
        return { ...cell0, q: { ...cell0.q, options, correct: (cell0.q.correct - rot + n) % n } }
      })()
    : cell0
  const Btn = ({ id }: { id: string }) => {
    const c = cells.find((x) => x.id === id)!
    return (
      <button type="button" className={`tabular-nums underline decoration-dotted underline-offset-4 px-1 rounded ${sel === id ? 'surface-2 font-bold' : ''}`} onClick={() => (setSel(id), setAns(null))} aria-label={`${c.label}: ${c.value}. Explain`} aria-pressed={sel === id}>
        {c.value}
      </button>
    )
  }

  return (
    <div className="space-y-3" data-testid="regression-output">
      <div className="flex flex-wrap gap-2 items-center">
        {(Object.keys(DATA) as Key[]).map((key) => (
          <button key={key} type="button" className={`btn btn-sm ${k === key ? 'btn-primary' : ''}`} aria-pressed={k === key} onClick={() => (setK(key), setSel('coef1'), setAns(null))}>
            {DATA[key].name}
          </button>
        ))}
        <Cite tag={d.src} />
      </div>
      <p className="text-sm muted">Output recomputed by this site from the raw data, and it matches the professor's numbers. Click any underlined number.</p>
      <div className="scroll-x">
        <table className="data-table">
          <tbody>
            <tr><th colSpan={2}>Regression Statistics</th></tr>
            <tr><td>Multiple R</td><td><Btn id="mr" /></td></tr>
            <tr><td>R Square</td><td><Btn id="r2" /></td></tr>
            <tr><td>Adjusted R Square</td><td><Btn id="adj" /></td></tr>
            <tr><td>Standard Error</td><td><Btn id="se" /></td></tr>
            <tr><td>Observations</td><td><Btn id="n" /></td></tr>
            <tr><td>F / Significance F</td><td><Btn id="f" /></td></tr>
          </tbody>
        </table>
        <table className="data-table">
          <thead>
            <tr><th></th><th>Coefficients</th><th>Standard Error</th><th>t Stat</th><th>P-value</th><th>Lower–Upper 95%</th></tr>
          </thead>
          <tbody>
            {names.map((n, i) => (
              <tr key={n}>
                <td className="whitespace-nowrap">{n}</td>
                <td><Btn id={`coef${i}`} /></td>
                <td><Btn id={`se${i}`} /></td>
                <td><Btn id={`t${i}`} /></td>
                <td><Btn id={`p${i}`} /></td>
                <td className="whitespace-nowrap"><Btn id={`ci${i}`} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="callout" aria-live="polite">
        <div className="text-xs font-bold uppercase tracking-wide muted">{cell.label}</div>
        <Rich>{cell.explain}</Rich>
        {cell.q && (
          <div className="mt-2">
            <p className="font-medium text-sm">{cell.q.stem}</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {cell.q.options.map((o, i) => (
                <button
                  key={o}
                  type="button"
                  className={`btn btn-sm ${ans === null ? '' : i === cell.q!.correct ? 'verdict-ok' : i === ans ? 'verdict-bad' : ''}`}
                  onClick={() => {
                    if (ans !== null) return
                    setAns(i)
                    recordAnswer({ id: 's09-w-output', correct: i === cell.q!.correct, los: ['S09-LO3'], session: 'S09' })
                  }}
                >
                  {o}
                </button>
              ))}
            </div>
            {ans !== null && <p className="text-sm mt-1">{ans === cell.q.correct ? '✓ ' : '✗ '}{cell.q.why}</p>}
          </div>
        )}
      </div>
      <p className="text-xs muted">
        Estimated equation: {d.y} = {f(o.coef[0], 2)} {o.coef.slice(1).map((c, i) => `${c < 0 ? '−' : '+'} ${f(Math.abs(c), 2)}·${names[i + 1]}`).join(' ')} · {v1} is the first predictor.
      </p>
    </div>
  )
}

function r(strings: TemplateStringsArray, ...vals: unknown[]) {
  return String.raw({ raw: strings }, ...vals)
}
