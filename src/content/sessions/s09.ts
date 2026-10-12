import { ols } from '../../lib/econ'
import { num } from '../../lib/format'
import type { SessionModule } from '../types'

const r = String.raw

// Pittsburgh TVs and Redstone, recomputed (golden tests check these against the slides/workbook)
const tvQ = [180, 590, 430, 250, 275, 720, 660, 490, 700, 210]
const tvP = [475, 400, 450, 550, 575, 375, 375, 450, 400, 500]
const tv = ols(tvQ, tvP.map((p) => [p]))
const rs = ols(
  [28, 69, 43, 32, 42, 72, 66, 49, 70, 60],
  [[250, 11, 12], [400, 24, 6], [450, 15, 5], [550, 31, 7], [575, 34, 4], [375, 22, 2], [375, 12, 5], [450, 24, 7], [400, 22, 4], [375, 10, 5]],
)
const f = (x: number, d = 2) => num(x, d, { trim: false })
const rsOpe = -0.143 * (420 / 53.1)

export const s09: SessionModule = {
  id: 'S09',
  num: '9',
  title: 'Forecasting Demand Using Linear Regression',
  spine: 'value',
  minutes: 60,
  ready: true,
  takeaway: r`Regression **isolates the effect of one variable while holding the others constant**. Read the output in this order: coefficient (direction and size, in the variable's units) → significance (|t| > 2 or p < 0.05) → R² (overall fit) → plug in to forecast.`,
  why: r`To price for revenue or profit (S08, S10), you need a **demand function**. The real world gives you messy data where price, income, advertising, competitors and seasons all move at once. Regression pulls apart how much of the change in quantity comes from each one. [[S09 slides p.9]]

This is how the professor isolated Netflix's price effect: about **596K fewer subscribers per $1**, after removing growth and seasonality. [[S09 slides p.12]]

> CQ5 Q1–Q5 were all “read this regression output” questions, and the professor's midterm practice problem (Provo Peaks Root Beer) is one too. Expect at least one output table on the exam, with no Excel needed to answer it. [[CQ5 Q1]] [[S10 slides pp.10-11]]`,
  intuition: r`Suppose you scatter-plot TV sales against price and draw the line that fits best. **OLS** picks that line by making the vertical misses (residuals) as small as possible. Specifically, it minimizes the *sum of their squares*. [[S09 slides p.20]]

The line's slope is a **coefficient**: “one more dollar of price → 2.60 fewer TVs.” [[S09 slides p.25]] With several x's, each coefficient answers a “holding everything else constant” question. That's the superpower: it is a partial derivative from S05, estimated from data. [[Math Review p.10]]

Then ask *how much to trust it*:

- **Standard error:** how noisy the estimate is. Small means precise.
- **t-stat** = coefficient ÷ standard error. If the estimate is more than ~2 standard errors from zero, it's probably not zero.
- **p-value:** the same verdict as a probability. Below 0.05 means significant.
- **R²:** how much of Y's ups and downs the whole model explains.`,
  los: [
    { id: 'S09-LO1', text: 'Know and understand the following statistical terms: regression coefficient, standard error, t-statistic, p-value, R-squared', src: 'Canvas Session 9 module; S09 slides p.15' },
    { id: 'S09-LO2', text: 'Know how to run a regression model in Excel', src: 'Canvas Session 9 module; S09 slides p.15' },
    { id: 'S09-LO3', text: 'Know and understand how to interpret and use regression output', src: 'Canvas Session 9 module; S09 slides p.15' },
  ],
  terms: [
    { id: 's09-t-ols', term: 'Ordinary least squares (OLS)', def: r`The line that minimizes the sum of squared deviations between the line and the actual data points: \(Y = a + bX\), where \(a\) and \(b\) are the parameters (intercept and slope). The objective: estimate the parameters that define the true relationship between Y and the X(s).`, src: 'S09 slides p.20' },
    { id: 's09-t-coef', term: 'Regression coefficient', def: 'An estimate of the true parameter relating the dependent and independent variables. Interpretation: “A one-unit increase in x leads to (magnitude of coefficient) increase/decrease (sign of coefficient) in y.”', src: 'S09 slides p.24' },
    { id: 's09-t-se', term: 'Standard error', def: 'The standard deviation of the parameter estimate — a measure of how noisy the estimate is. The smaller (greater) the standard error, the more (less) precise the estimate.', src: 'S09 slides p.26' },
    { id: 's09-t-t', term: 't-statistic', def: r`The ratio of the parameter estimate (coefficient) to its standard error. Generally, \(|t| > 2\) indicates the coefficient is statistically significant (not equal to zero).`, src: 'S09 slides p.29' },
    { id: 's09-t-p', term: 'p-value', def: 'An alternative measure of statistical significance. In the professor’s words it “tells you the probability that a true parameter that you estimated is equal to zero.” By convention, significant when p < 0.05.', src: 'S09 slides p.31' },
    { id: 's09-t-r2', term: 'R-squared', def: 'The coefficient of determination: a measure of model fit equal to explained variation ÷ total variation, from 0 (poor fit) to 1 (perfect fit). “An R-squared of 0.75 indicates that 75% of the variation in y can be explained by variation in the x’s.”', src: 'S09 slides p.33' },
    { id: 's09-t-adj', term: 'Adjusted R-squared / Multiple R', def: 'Adjusted R² penalizes the model for the number of variables it uses. Multiple R is the square root of R². Neither one is “the % of variation explained.”', src: 'CQ5 Q2 feedback' },
    { id: 's09-t-dep', term: 'Dependent vs. independent variables', def: 'The dependent variable (Y, e.g., quantity demanded) is what you explain. The independent variables (X’s: price, income, advertising…) are the predictors.', src: 'S09 slides pp.20-21' },
  ],
  mathIntro: r`You won't compute OLS by hand on the exam. Excel does that. You *will* read, write and use the output. [[S10 slides p.7]]`,
  formulas: [
    { id: 's09-f-line', name: 'Regression line', latex: r`Y = a + bX \quad\text{or}\quad Y = a + b_1X_1 + b_2X_2 + \dots`, vars: [[r`a`, 'intercept (Y when all X = 0)'], [r`b_i`, 'coefficient: change in Y per one-unit change in X_i, others held constant']], words: 'The estimated demand (or cost) function you plug numbers into.', src: 'S09 slides pp.20-23' },
    { id: 's09-f-t', name: 't-statistic', latex: r`t = \frac{\text{coefficient}}{\text{standard error}},\qquad |t| > 2 \Rightarrow \text{significant}`, vars: [[r`t`, 't Stat column in Excel']], words: 'How many standard errors the estimate is away from zero.', src: 'S09 slides p.29' },
    { id: 's09-f-p', name: 'Significance rule', latex: r`p < 0.05 \Rightarrow \text{significant}`, vars: [[r`p`, 'P-value column']], words: 'Small p-values mean the coefficient is unlikely to be zero.', src: 'S09 slides p.31' },
    { id: 's09-f-r2', name: 'R-squared', latex: r`R^2 = \frac{\text{explained variation}}{\text{total variation}} = \frac{SS_{Regression}}{SS_{Total}}`, vars: [[r`SS`, 'sums of squares from the ANOVA table']], words: 'Share of the variation in Y the model explains (0 to 1).', src: 'S09 slides p.33' },
    { id: 's09-f-effect', name: 'Marginal effect with units', latex: r`\Delta Y = b\times\frac{\Delta X_{raw}}{\text{unit size}}`, vars: [[r`\text{unit size}`, 'e.g., 1,000 departures or 100,000 passengers per unit']], words: 'Convert the change into the variable’s own units first, then multiply by the coefficient.', src: 'CQ5 Q1, Q5' },
    { id: 's09-f-ope', name: 'Elasticity from a linear regression', latex: r`OPE = b_P\cdot\frac{P}{Q}`, vars: [[r`b_P`, 'price coefficient'], [r`P, Q`, 'evaluate at given or average values']], words: 'Same calculus OPE as S08 — the coefficient is your ∂Q/∂P.', src: 'S09 workbook, Solution!A57' },
  ],
  examples: [
    {
      id: 's09-ex-tv',
      title: 'Pittsburgh TVs — from data to demand function',
      setup: r`Ten observations of quantity and price (e.g., 180 TVs at $475; 720 at $375). Run Q on P. [[S09 slides p.16]]`,
      steps: [
        { ask: 'Which variable is Y? Write the generic function.', show: r`Quantity depends on price: \(Q_{TV} = a + bP_{TV}\). [[S09 slides p.21]]` },
        { ask: 'Read the coefficients from the output and write the estimated demand function.', show: r`Intercept ${f(tv.coef[0])}, Price ${f(tv.coef[1])} → \(Q_{TV} = 1{,}631.47 - 2.60P_{TV}\). [[S09 slides p.23]]` },
        { ask: 'Interpret −2.60.', show: 'A $1 increase in price leads to a 2.60-TV decrease in quantity demanded. [[S09 slides pp.24-25]]' },
        { ask: 'Is price significant? How well does the model fit?', show: r`Price: SE ${f(tv.se[1])}, t ${f(tv.t[1])} (|t| > 2), p ${f(tv.p[1], 4)} (< 0.05) → significant. R² = ${f(tv.r2)} → 75% of the variation in TV sales is explained by price. [[S09 slides pp.25-34]]` },
        { ask: 'Forecast demand at $425.', show: r`\(1{,}631.47 - 2.60(425) = ${f(1631.47 - 2.6 * 425)}\) TVs.` },
      ],
      takeaway: 'Equation → interpretation → significance → fit → forecast. That order works for every output table.',
      src: 'S09 slides pp.16-34',
    },
    {
      id: 's09-ex-redstone',
      title: 'Redstone Residential (in-class exercise)',
      setup: r`10 complexes of 100 units, ~50% vacancy. Regress units rented on rent ($), advertising ($100s) and distance to campus (miles). [[S09 workbook, Solution!A2]]

| | Coefficients | Standard Error | t Stat | P-value |
| --- | --- | --- | --- | --- |
| Intercept | ${f(rs.coef[0])} | ${f(rs.se[0])} | ${f(rs.t[0])} | ${f(rs.p[0], 4)} |
| Price ($) | ${f(rs.coef[1], 3)} | ${f(rs.se[1], 3)} | ${f(rs.t[1])} | ${f(rs.p[1], 3)} |
| Advertising ($100s) | ${f(rs.coef[2], 3)} | ${f(rs.se[2], 3)} | ${f(rs.t[2])} | ${f(rs.p[2], 3)} |
| Distance (miles) | ${f(rs.coef[3], 3)} | ${f(rs.se[3], 3)} | ${f(rs.t[3])} | ${f(rs.p[3], 3)} |

R² = ${f(rs.r2, 3)}, adjusted R² = ${f(rs.adjR2, 3)}, n = 10.`,
      steps: [
        { ask: 'Write the estimated demand function.', show: r`\(Q_x = 135.15 - 0.14P_x + 0.54A - 5.78D\) [[S09 workbook, Solution!A37]]` },
        { ask: 'Which variables are significant predictors? How do you know?', show: 'Distance is significant at 5% (p = 0.004). Price is borderline: t = −2.41 but p = 0.053, so it is significant at 10% but not quite at 5%. The “|t| > 2” rule of thumb assumes a reasonably large sample. Advertising is not significant (p = 0.43). [[S09 workbook, Solution!A43]]' },
        { ask: 'Rent rises $100 at one complex. Units rented?', show: r`\(\partial Q/\partial P = -0.143\) → \(-0.143\times100 = -14.3\): about **14 fewer units**, holding advertising and distance constant. [[S09 workbook, Solution!A49]]` },
        { ask: 'Rent rises at an average complex (P = $420, Q = 53.1). What happens to revenue?', show: r`\(OPE = -0.143\times(420/53.1) = ${f(rsOpe)}\) → elastic → raising rent lowers units rented **and** total revenue. [[S09 workbook, Solution!A57]]` },
      ],
      takeaway: 'Regression gives you ∂Q/∂P; combine it with S08 elasticity to make the pricing call.',
      src: 'S09 workbook Solution tab',
    },
    {
      id: 's09-ex-airline',
      title: 'CQ5: airline cost per mile — mind the units',
      setup: r`Y = cost of a flight (cents per mile), 75 airports. Departures (1,000s) +0.052 (p 0.000); Passengers (100,000s) −0.027 (p 0.000); Distance (miles) −0.007 (p 0.000); Fortune 500 0.014 (p 0.293); HHI 0.000 (p 0.622); R² 0.722. [[CQ5 Q1]]`,
      steps: [
        { ask: '+100,000 passengers?', show: 'One unit of the variable → −0.027 cents per mile. [[CQ5 Q1]]' },
        { ask: '+17,000 departing flights?', show: '17 units × 0.052 = **+0.88 cents per mile**. [[CQ5 Q5]]' },
        { ask: '700-mile vs. 500-mile flight?', show: '200 × 0.007 = **1.4 cents per mile** (the longer flight is cheaper per mile). [[CQ5 Q4]]' },
        { ask: 'Variation explained? Significant factors?', show: '72.2% (R Square — not Multiple R 0.850 or adjusted 0.697). Departures, passengers and distance are significant; Fortune 500, income and HHI are not. [[CQ5 Q2]] [[CQ5 Q3]]' },
      ],
      takeaway: 'Before multiplying, ask “what is one unit of this variable?”',
      src: 'CQ5 Q1-Q5',
    },
    {
      id: 's09-ex-netflix',
      title: 'Netflix revisited — isolating the price effect',
      setup: r`Subscribers 2009–2013 with prices $10 → $16 → $8. How big was the price effect? [[S09 slides pp.10-14]]`,
      steps: [
        { ask: 'Why can’t you just regress subscribers on price?', show: 'Subscribers were also growing fast and moved with the seasons. The raw slope (−855K per $1) mixes all three. [[S09 slides p.13]]' },
        { ask: 'What does adding year and quarter dummies do?', show: 'It holds growth and season constant, so the price coefficient becomes **−596K per $1**: “the gap is the price effect.” [[S09 slides p.12]]' },
        { ask: 'Rebuild 2011 Q4.', show: '9.3M start + 13.9M growth + 3.7M season − 3.6M price (6 × 596K) = 23.4M predicted vs. 21.7M actual. [[S09 slides p.14]]' },
      ],
      takeaway: 'Multiple regression = isolating one effect while holding the others constant. That’s the whole point of S09.',
      src: 'S09 slides pp.10-14',
    },
    {
      id: 's09-ex-provo',
      title: 'Midterm practice: Provo Peaks Root Beer',
      setup: r`Seven-state distributor data (350 obs.): cases sold on price ($) and average income ($000/capita). [[S10 slides pp.10-11]]

| | Coefficients | Standard Error | t Stat | P-value |
| --- | --- | --- | --- | --- |
| Intercept | 200.152 | 90.396 | 2.214 | 0.027 |
| Price | −5.849 | 2.719 | −2.151 | 0.032 |
| Income | 7.804 | 1.169 | 6.677 | 0.000 |

R² = 0.122, adj. R² = 0.117, F = 24.065 (Sig. F 0.000).`,
      steps: [
        { ask: 'Demand function?', show: r`\(Q = 200.152 - 5.849P + 7.804I\)` },
        { ask: 'Interpret price and income.', show: 'A $1 price increase → about 5.85 fewer cases (law of demand holds). A $1,000 increase in per-capita income → about 7.8 more cases, so root beer is a **normal good**.' },
        { ask: 'Significant?', show: 'Both: |t| > 2 and p < 0.05 (price p = 0.032; income p = 0.000).' },
        { ask: 'Fit?', show: 'R² = 0.122. Only 12.2% of the variation in cases is explained, so other factors (season, competition, store traffic…) matter a lot. The coefficients can still be useful.' },
      ],
      takeaway: 'Give a full “economic interpretation”: signs, magnitudes with units, significance, and fit.',
      src: 'S10 slides pp.10-11',
    },
  ],
  widgets: [
    {
      id: 'regression-output',
      title: 'Annotated regression output: click any number',
      intro: 'This is the real Excel SUMMARY OUTPUT for the Pittsburgh TVs and Redstone, recomputed by this site and matching the professor’s numbers. Click a number to learn what it means and answer a quick question about it.',
      questions: [],
      numeric: [{ id: 's09-w1-t', label: 'Switch to **Redstone**. What is the t Stat on Distance?', part: { type: 'num', label: 't Stat', answer: rs.t[3], tol: 0.01 }, hint: 'Coefficient ÷ standard error.', src: 'S09 workbook, Solution!D34' }],
    },
    {
      id: 'sse-dragger',
      title: 'Be the OLS: drag a line to minimize the squared errors',
      intro: 'OLS is “the line that minimizes the sum of squared deviations.” Try to beat it with your own line through the professor’s TV data.',
      questions: [],
      numeric: [{ id: 's09-w2-sse', label: 'After revealing OLS: what is the minimum sum of squared errors (to the nearest thousand)?', part: { type: 'num', label: 'Minimum SSE', answer: tv.sse, tol: 0.01 }, hint: 'It equals the Residual SS in the ANOVA table.', src: 'S09 slides p.25' }],
    },
    {
      id: 'interpret-drill',
      title: '“Interpret this output”: unlimited fresh regressions',
      intro: 'Each problem invents a new dataset, runs a real regression, and asks the exam-style questions: marginal effects, significance, R², forecasting, elasticity. Hit “New numbers” for another one.',
      questions: [],
    },
  ],
  checkIds: ['s09-c-ols', 's09-c-coef', 's09-cq5-q2', 's09-cq5-q3', 's09-c-t', 's09-c-netflix'],
  applyGenerators: ['s09-interpret', 's09-units', 's09-elasticity', 's09-tstat'],
  traps: [
    { title: 'Ignoring the units of X', body: '“Passengers (100,000s)”: 100,000 more passengers is ONE unit (−0.027), not 100,000 units. 17,000 departures = 17 units. [[CQ5 Q1]] [[CQ5 Q5]]', src: 'CQ5 Q1, Q5' },
    { title: 'Grabbing the wrong fit number', body: 'Variation explained = **R Square**. Not Multiple R (its square root), not adjusted R². [[CQ5 Q2]]', src: 'CQ5 Q2' },
    { title: 'Using the wrong row', body: 'Read the coefficient in the row for the variable you were asked about. CQ5 Q5 offered the passengers answer as a trap for a departures question.', src: 'CQ5 Q5' },
    { title: 'Sign of the t-stat', body: 'Significance uses |t|. A t of −4.89 is highly significant.', src: 'S09 slides p.29' },
    { title: 'Small samples', body: 'With 10 observations, |t| = 2.41 still had p = 0.053. When the p-value is shown, it wins. [[S09 workbook, Solution!A43]]', src: 'S09 workbook' },
    { title: 'Q vs. P on the left', body: 'In a demand regression, quantity is Y: Q = 1,631.47 − 2.60P. Don’t write it as inverse demand.', src: 'S09 slides p.23' },
    { title: 'Forgetting “all else equal”', body: 'A coefficient is a *ceteris paribus* effect. When forecasting a specific case, plug in **every** variable, including the intercept.', src: 'S09 slides p.24' },
    { title: 'Low R² ≠ useless', body: 'Provo Peaks has R² = 0.122 but significant price and income effects. R² is fit, not significance.', src: 'S10 slides p.11' },
  ],
  feynman: [
    {
      id: 's09-fey-1',
      prompt: 'Explain to a friend what a t-stat and a p-value tell you, using the Pittsburgh TV price coefficient (−2.60, SE 0.53).',
      model: r`The coefficient says a $1 price increase loses about 2.6 TVs. But it's an estimate from 10 data points, so it has noise. The standard error, 0.53, is how wobbly that estimate is. The t-stat asks how many wobbles away from zero it is: −2.60 / 0.53 ≈ −4.9. That's way more than 2, so it's very unlikely the true effect is zero. The p-value (0.0012) says the same thing as a probability. It's under 0.05, so price is a statistically significant predictor of TV demand.`,
      rubric: ['Explained coefficient in plain words', 'Standard error = noise/precision', 't = coefficient ÷ SE and compared to 2', 'p < 0.05 → significant', 'Used the actual numbers'],
    },
    {
      id: 's09-fey-2',
      prompt: 'Why did the professor need regression (not just a before/after comparison) to measure Netflix’s 2011 price effect?',
      model: r`Netflix subscribers were growing fast and bumped up in Q4 every year anyway. A simple before/after (or a raw scatter of subscribers vs. price) mixes the price effect with growth and season, which gave −855K per $1. Multiple regression adds controls for year and quarter, so the price coefficient measures the effect holding growth and season constant: about −596K per $1. That's “isolating the effect of a specific variable,” the second reason we use calculus and partial derivatives (S05).`,
      rubric: ['Named the confounders (growth, seasonality)', 'Explained controls / holding constant', 'Gave the −596K vs −855K contrast', 'Linked to partial derivatives / isolating effects'],
    },
  ],
  deeper: [
    { title: 'What Excel is actually doing', kind: 'derivation', body: r`For one X: \(b = \dfrac{\sum (x-\bar x)(y-\bar y)}{\sum (x-\bar x)^2}\), \(a = \bar y - b\bar x\). With several X's: \(\hat\beta = (X'X)^{-1}X'y\). The standard errors come from \(s^2 (X'X)^{-1}\), with \(s^2 = SSE/(n-k-1)\). This site's regressions use exactly that, and the golden tests confirm they match the professor's outputs. [[GEN]]` },
    { title: 'Log-linear demand gives elasticities directly', kind: 'textbook', body: r`[[GEN]] Regress \(\ln Q\) on \(\ln P\) and \(\ln I\), and the coefficients *are* the own-price and income elasticities, constant everywhere (B&P Ch 3 regression section). The course's linear models need \(b\cdot P/Q\) evaluated at a point.` },
    { title: 'Your Regression Exercise (Mrs. Smith’s pies)', kind: 'textbook', body: r`From your submitted workbook (your work, not an official key): \(Q = 504{,}428 - 120{,}906P + 5{,}737A + 29{,}691P_c + 2{,}596I + 30{,}422Pop\). R² 0.870, and income is not significant (p 0.478). At \(P = \$6.75\), \(P_c = \$6.00\): OPE ≈ −2.11 and CPE ≈ 0.46. The Atlanta 2007-Q4 forecast was 379,068 vs. 361,677 actual (+4.8%). [[your Regression Exercise]]` },
    { title: 'In a case interview: “What drives demand?”', kind: 'case-interview', body: 'Interviewers love a driver tree: volume = f(price, competitor price, marketing, macro, seasonality). Regression is the quantitative version. Say you would control for the other drivers before attributing a sales drop to a price change (the Netflix lesson), and sanity-check signs: law of demand, substitutes positive.' },
  ],
  summary: r`**OLS** minimizes the sum of squared deviations; \(Y = a + bX\). [[S09 slides p.20]]

- **Coefficient:** “a one-unit increase in x leads to (magnitude) increase/decrease (sign) in y,” holding others constant. Mind the units (100,000s!). [[S09 slides p.24]] [[CQ5 Q1]]
- **Standard error:** noise of the estimate. **t = coef/SE**; |t| > 2 → significant. **p < 0.05** → significant. [[S09 slides pp.26-31]]
- **R²** = explained ÷ total variation (CQ5: 72.2%, not 85.0% or 69.7%). [[S09 slides p.33]]
- **TVs:** Q = 1,631.47 − 2.60P (R² 0.75, t −4.89, p 0.0012). [[S09 slides p.25]]
- **Redstone:** Q = 135.15 − 0.14P + 0.54A − 5.78D; distance significant, price borderline (p 0.053), advertising not; +$100 rent → −14 units; OPE −1.13 → elastic → rent increase lowers revenue. [[S09 workbook, Solution]]
- **Netflix:** −596K subscribers per $1 once growth and season are held constant. [[S09 slides p.12]]
- **Provo Peaks:** price −5.85 (sig.), income +7.80 (sig., normal good), R² 0.122. [[S10 slides p.11]]`,
}
