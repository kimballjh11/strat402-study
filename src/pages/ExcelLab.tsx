import { useState } from 'react'
import { Cite } from '../components/Cite'
import { NumericAsk } from '../components/NumericAsk'
import { Rich } from '../components/Rich'
import { ols } from '../lib/econ'
import { num } from '../lib/format'

const r = String.raw

// Essential Excel Skills workbook (Squatty-Potty demand data), Solution tab
const SP = [[28, 145], [29, 163], [30, 140], [31, 161], [32, 144], [33, 162], [34, 144], [35, 129]]
const fit = ols(SP.map((x) => x[1]), SP.map((x) => [x[0]]))
const a = 207.75
const b = -1.881
const pStar = -a / (2 * b)

interface Skill {
  id: string
  title: string
  why: string
  win: string[]
  mac: string[]
  check: string
  src: string
}

const SKILLS: Skill[] = [
  {
    id: 'scatter',
    title: '1. Create a scatterplot',
    why: 'Every demand curve, cost curve and scale curve in the course starts as a scatterplot. Put the variable you’re explaining (quantity, cost) on the y-axis.',
    win: ['Select the two columns (x first, then y), e.g. Price and Quantity.', 'Insert → Charts → Insert Scatter (X, Y) → Scatter (markers only).', 'If the axes are swapped, right-click the chart → Select Data → Edit the series and swap the X and Y ranges.'],
    mac: ['Select the two columns (x first, then y).', 'Insert → Chart → X Y (Scatter) → Scatter.', 'To swap axes: Chart Design → Select Data → edit the series’ X and Y values.'],
    check: 'Price on the horizontal axis, quantity demanded on the vertical (as in the Essential Excel Skills step 1).',
    src: 'Essential Excel Skills workbook, step 1',
  },
  {
    id: 'axes',
    title: '2. Adjust the axes to fit the data',
    why: 'Excel starts axes at 0, which squashes your data into a corner. The professor expects axes that fit the range of the data.',
    win: ['Double-click the horizontal axis → Format Axis pane → Axis Options → Bounds: set Minimum and Maximum (e.g. 27 and 36).', 'Repeat for the vertical axis.'],
    mac: ['Double-click the axis (or Ctrl-click → Format Axis) → Axis Options → Bounds: Minimum / Maximum.', 'Repeat for the vertical axis.'],
    check: 'Points spread across the plot area instead of clumping in a corner.',
    src: 'Essential Excel Skills workbook, step 2; S05 slides p.11',
  },
  {
    id: 'labels',
    title: '3. Add a title and axis labels',
    why: 'An alum wrote to thank the professor for drilling “chart names, axis titles, data labels, good formatting.” Unlabeled charts cost points on spreadsheet assignments.',
    win: ['Click the chart → the green “+” (Chart Elements) → check Chart Title and Axis Titles.', 'Click each title and type, e.g. “Demand for Squatty Potty”, “Price ($)”, “Quantity Demanded”.'],
    mac: ['Click the chart → Chart Design → Add Chart Element → Chart Title / Axis Titles → Primary Horizontal / Vertical.', 'Click each title to type.'],
    check: 'Title, x-axis label with units, y-axis label with units.',
    src: 'S06 slides pp.12-13; Essential Excel Skills step 3',
  },
  {
    id: 'trend',
    title: '4. Add a trendline and show its equation',
    why: 'The trendline equation IS your estimated demand (or cost) function. Linear for demand; power for cost and scale curves (“other functions may lead you astray in this cost range”).',
    win: ['Right-click a data point → Add Trendline.', 'Format Trendline pane: choose Linear (demand), Power (scale/cost curves) or Polynomial order 2 (revenue).', 'Check “Display Equation on chart” and “Display R-squared value on chart”.'],
    mac: ['Ctrl-click a data point → Add Trendline (or Chart Design → Add Chart Element → Trendline → More Trendline Options).', 'Pick Linear / Power / Polynomial (order 2).', 'Check Display Equation and Display R-squared.'],
    check: r`Squatty-Potty linear trendline: y = −1.881x + 207.75. Guest-Tek power trendline: y = 414.61x^−0.5705.`,
    src: 'Essential Excel Skills steps 4-5; S06 workbook, Solution!B12, B50',
  },
  {
    id: 'solver',
    title: '5. Use Solver to optimize',
    why: 'Solver finds the input that maximizes or minimizes a formula, or that hits a target. You’ll use it for revenue-maximizing prices (Differentiation Advantage) and the volume needed for a target cost (Guest-Tek step 4).',
    win: ['One-time setup: File → Options → Add-ins → Manage: Excel Add-ins → Go → check Solver Add-in → OK.', 'Put a trial price in a cell (e.g. B51) and the revenue formula next to it (e.g. =-1.881*B51^2+207.75*B51).', 'Data → Solver. Set Objective: the revenue cell. To: Max. By Changing Variable Cells: the price cell.', 'Solving method: GRG Nonlinear → Solve → Keep Solver Solution.'],
    mac: ['One-time setup: Tools → Excel Add-ins → check Solver Add-in → OK.', 'Set up the price cell and revenue formula the same way.', 'Data → Solver → Set Objective (revenue) → Max → By Changing (price) → GRG Nonlinear → Solve.'],
    check: r`Squatty-Potty: P* ≈ $55.22, revenue ≈ $5,736.32. Target-value version: Guest-Tek “Value Of: 0.15” by changing rooms → ≈ 1,077,754 rooms.`,
    src: 'Essential Excel Skills, Solution!B51:C51; S06 workbook, Solution!C75',
  },
  {
    id: 'toolpak',
    title: '6. Run a regression with the Analysis ToolPak',
    why: 'This produces the SUMMARY OUTPUT you read in S09 (Redstone, Pittsburgh TVs, Mrs. Smith’s pies, the airline cost per mile).',
    win: ['One-time setup: File → Options → Add-ins → Manage: Excel Add-ins → Go → check Analysis ToolPak → OK.', 'Data → Data Analysis → Regression → OK.', 'Input Y Range: the dependent variable column (with header). Input X Range: all predictor columns, adjacent (with headers).', 'Check Labels. Output Range: an empty cell (or New Worksheet Ply) → OK.'],
    mac: ['One-time setup: Tools → Excel Add-ins → check Analysis ToolPak.', 'Data → Data Analysis → Regression.', 'Same Y range / X range / Labels / Output choices.'],
    check: 'Redstone: Intercept 135.15, Price −0.143, Advertising 0.538, Distance −5.784, R² 0.792.',
    src: 'S09 workbook, Solution!A11-G34; Watch: Regression in Excel Demonstration page',
  },
  {
    id: 'read',
    title: '7. Read the output (exam skill, no Excel needed)',
    why: 'If Excel isn’t available in the Testing Center, you still need to read an output table. Coefficients → equation; |t| > 2 or p < 0.05 → significant; R Square → % of variation explained.',
    win: ['Practice on the annotated output in Session 9 → Interactives (click any number).'],
    mac: ['Same.'],
    check: 'CQ5: R² 0.722 means 72.2% explained; departures t = 5.78, p = 0.000 → significant.',
    src: 'S09 slides pp.24-34; CQ5 Q1-Q5',
  },
]

export function ExcelLab() {
  const [os, setOs] = useState<'win' | 'mac'>('win')
  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-3xl font-semibold">Excel Lab</h1>
        <p className="muted">
          The S05 Excel skills, step by step for Windows and Mac. It isn’t certain Excel is available on the midterm, so learn the mechanics here and practice reading output in Session 9. <Cite tag="S05 slides p.11" />
        </p>
        <div className="flex gap-1 mt-2" role="group" aria-label="Operating system">
          <button type="button" className={`btn btn-sm ${os === 'win' ? 'btn-primary' : ''}`} aria-pressed={os === 'win'} onClick={() => setOs('win')}>
            Windows
          </button>
          <button type="button" className={`btn btn-sm ${os === 'mac' ? 'btn-primary' : ''}`} aria-pressed={os === 'mac'} onClick={() => setOs('mac')}>
            Mac
          </button>
        </div>
      </header>
      {SKILLS.map((s) => (
        <section key={s.id} className="card p-4 md:p-5 space-y-2" aria-labelledby={`xl-${s.id}`} data-testid="excel-skill">
          <h2 id={`xl-${s.id}`} className="text-xl font-semibold">
            {s.title}
          </h2>
          <p className="muted text-sm">{s.why}</p>
          <ol className="list-decimal pl-6 space-y-1">
            {(os === 'win' ? s.win : s.mac).map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="text-sm">
            <strong>Check yourself:</strong> {s.check} <Cite tag={s.src} />
          </p>
        </section>
      ))}
      <section className="card p-4 md:p-5 space-y-3">
        <h2 className="text-xl font-semibold">Practice: the Essential Excel Skills workbook (Squatty Potty)</h2>
        <Rich>{r`In 2015, Squatty Potty hired a local economic consulting firm to analyze demand for its plastic toilet stand. Data (price, quantity): ${SP.map(([p, q]) => `($${p}, ${q})`).join(', ')}. Do steps 1–8 in Excel, then check your numbers here. [[Essential Excel Skills workbook]]`}</Rich>
        <NumericAsk id="xl-slope" label="Step 5: slope of the linear trendline (Quantity on Price)" part={{ type: 'num', label: 'slope', answer: b, tol: 0.003 }} hint="Excel shows y = −1.881x + 207.75." src="Essential Excel Skills, Solution!C34" session="S05" los={['S05-LO3']} />
        <NumericAsk id="xl-rev50" label="Step 6: revenue at a price of $50, using the trendline" part={{ type: 'num', label: 'revenue', answer: 50 * (a + b * 50), kind: 'money', tol: 0.002 }} hint="Q = −1.881(50) + 207.75 = 113.7; R = 50 × 113.7." src="Essential Excel Skills, Solution!D39" session="S05" los={['S05-LO3', 'S07-LO3']} />
        <NumericAsk id="xl-pstar" label="Step 8: Solver’s revenue-maximizing price" part={{ type: 'num', label: 'price', answer: pStar, kind: 'money', tol: 0.002 }} hint="Or by calculus: 207.75 / (2 × 1.881)." src="Essential Excel Skills, Solution!B51" session="S05" los={['S05-LO3', 'S05-LO2']} />
        <p className="text-xs muted">
          This site’s own OLS on the same 8 points gives Q = {num(fit.coef[0], 2)} {num(fit.coef[1], 3)}P (R² {num(fit.r2, 3)}), which matches Excel’s trendline. Calculus check: P* = 207.75 / 3.762 = ${num(pStar, 2)}.
        </p>
      </section>
    </div>
  )
}
