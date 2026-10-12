import { dollars, num, tex } from '../../lib/format'
import type { SessionModule } from '../types'

const r = String.raw

// ── Course numbers, computed (never typed) ──
const redbox = { a: 8845, b: 3728 }
const rbQ1 = redbox.a - redbox.b * 1
const rbE1 = (-redbox.b * 1) / rbQ1
const rbArc = ((4500 - 5000) / 5000) / ((1.2 - 1.0) / 1.0)
const dpQ = (P: number) => 30000 - 20000 * P
const dpE = (P: number) => (P === 1.5 ? -Infinity : (-20000 * P) / dpQ(P))
const dpRows = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5]
const cpeQx = 500 - 5 * 25 + 4 * 20
const cpeE = (4 * 20) / cpeQx
const nfDQ = (23.8 - 25) / 25
const nfDP = (16 - 10) / 10

export const s08: SessionModule = {
  id: 'S08',
  num: '8',
  title: 'Elasticity',
  spine: 'value',
  minutes: 55,
  ready: true,
  takeaway: r`Elasticity tells you whether a price change will **raise or lower revenue**: if \(-1 < OPE < 0\) raise price, if \(OPE < -1\) cut it, and revenue peaks at \(OPE = -1\).`,
  why: r`This session answers strategy question 2, **Unique Value to Offer**. A value proposition is only worth something if you can capture it in price. Elasticity measures how much pricing power you actually have. [[S01 slides p.36]]

It also connects back to the Five Forces. The firm's own-price elasticity reveals **buyer power**. The cross-price elasticity between rival brands reveals **rivalry**. The cross-price elasticity with products outside the industry reveals the **threat of substitutes**. [[S08 slides p.32]]

> On the midterm, expect to *compute* an elasticity (algebraic or calculus), *classify* it, and *recommend* a price move with the total revenue test. CQ4 asked exactly this, five different ways. [[CQ4 Q5]] [[CQ4 Q9]]`,
  intuition: r`Elasticity is **how hard customers flinch** when the price moves.

Picture two price increases of 10%. One is on gas at the only station for 60 miles. The other is on one brand of root beer sitting next to five others. Gas buyers grumble and pay, so quantity barely moves. Root beer buyers just grab a different can, so quantity drops a lot. Same 10% price change, very different flinch.

Elasticity puts that flinch into one unit-free number: the **% change in quantity divided by the % change in price**. It uses percentages, not dollars, so you can compare cans of soda to monthly subscriptions.

Why care? Revenue is \(P\times Q\). When you raise the price, you win on \(P\) and lose on \(Q\). Elasticity tells you which effect is bigger:

- Customers barely flinch (inelastic). The price gain beats the volume loss, so **revenue rises**.
- Customers flinch hard (elastic). The volume loss beats the price gain, so **revenue falls**.
- Right at the tipping point (unitary), the two effects cancel and revenue is at its **peak**.`,
  los: [
    { id: 'S08-LO1', text: 'Know and understand the following concepts: own price elasticity, inelastic and elastic demand, the total revenue test, cross price elasticity', src: 'Canvas Session 8 module; S08 slides p.14' },
    { id: 'S08-LO2', text: 'Know how to calculate the various forms of elasticity and understand how they relate to strategy', src: 'Canvas Session 8 module; S08 slides p.14' },
  ],
  terms: [
    { id: 's08-t-elasticity', term: 'Elasticity', def: 'A measure of responsiveness of one variable to changes in another variable; the percentage change in one variable relative to changes in another; a measure of sensitivity (e.g., price-sensitive customers). Types: own-price, cross-price, income, advertising.', src: 'S08 slides p.15' },
    { id: 's08-t-ope', term: 'Own-price elasticity (OPE)', def: r`\(OPE = \frac{\%\Delta Q_x}{\%\Delta P_x} = \frac{\partial Q_x}{\partial P_x}\frac{P_x}{Q_x}\). OPE will always be negative: by the law of demand, a % increase in price leads to a % decrease in quantity demanded.`, src: 'S08 slides p.16' },
    { id: 's08-t-elastic', term: 'Elastic demand', def: r`\(OPE < -1\). Consumers are relatively *price sensitive*.`, src: 'S08 slides p.17' },
    { id: 's08-t-inelastic', term: 'Inelastic demand', def: r`\(-1 < OPE < 0\). Consumers are relatively *price insensitive*.`, src: 'S08 slides p.17' },
    { id: 's08-t-unitary', term: 'Unitary elastic', def: r`\(OPE = -1\). Total revenue is at its maximum here.`, src: 'S08 slides pp.17-18' },
    { id: 's08-t-trtest', term: 'Total revenue test', def: '(1) Elastic (OPE < −1): a price increase (decrease) → total revenue decreases (increases). (2) Inelastic (−1 < OPE < 0): a price increase (decrease) → total revenue increases (decreases). (3) Total revenue is maximized when demand is unitary elastic.', src: 'S08 slides p.18' },
    { id: 's08-t-cpe', term: 'Cross-price elasticity (CPE)', def: r`\(CPE = \frac{\%\Delta Q_x}{\%\Delta P_y} = \frac{\partial Q_x}{\partial P_y}\frac{P_y}{Q_x}\). Can be positive or negative: **positive → substitutes** (Dr Pepper vs. Mr. Pibb); **negative → complements** (milk and cereal).`, src: 'S08 slides p.27' },
    { id: 's08-t-income', term: 'Income elasticity', def: r`\(\frac{\%\Delta Q_x}{\%\Delta I}\). Positive → normal good; negative → inferior good. (Listed as a type on the slides; formula is standard.)`, src: 'S08 slides p.15; General econ (B&P Ch 3)', general: true },
    { id: 's08-t-advert', term: 'Advertising elasticity', def: r`\(\frac{\%\Delta Q_x}{\%\Delta A_x}\): how responsive quantity is to advertising spending. (Listed as a type on the slides; formula is standard.)`, src: 'S08 slides p.15; General econ (B&P Ch 3)', general: true },
  ],
  mathIntro: r`You'll compute elasticity **two ways**, and the professor uses both [[S08 slides pp.21-25]]:

1. **Algebraic (two-point).** You know a before and an after. Use the *old* price and quantity as the base.
2. **Calculus (point).** You have a demand *function*. Use the slope \(\partial Q/\partial P\) (just the coefficient on \(P\)), then scale it by \(P/Q\) at the point you care about.`,
  formulas: [
    { id: 's08-f-arc', name: 'OPE — algebraic', latex: r`OPE = \frac{\%\Delta Q_x}{\%\Delta P_x} = \frac{(Q_{new}-Q_{old})/Q_{old}}{(P_{new}-P_{old})/P_{old}}`, vars: [[r`Q_{old}, P_{old}`, 'quantity and price before the change (the base)'], [r`Q_{new}, P_{new}`, 'after the change']], words: 'Percent change in quantity divided by percent change in price, using the original values as the base.', src: 'S08 slides p.23' },
    { id: 's08-f-point', name: 'OPE — calculus', latex: r`OPE = \frac{\partial Q_x}{\partial P_x}\cdot\frac{P_x}{Q_x}`, vars: [[r`\partial Q_x/\partial P_x`, 'slope of demand: the coefficient on price'], [r`P_x, Q_x`, 'the price and quantity at the point you evaluate']], words: 'Slope times price-over-quantity. Same slope everywhere on a straight line, but P/Q changes, so elasticity changes along the curve.', src: 'S08 slides p.16' },
    { id: 's08-f-cpe', name: 'Cross-price elasticity', latex: r`CPE = \frac{\%\Delta Q_x}{\%\Delta P_y} = \frac{\partial Q_x}{\partial P_y}\cdot\frac{P_y}{Q_x}`, vars: [[r`\partial Q_x/\partial P_y`, 'coefficient on the *other* good’s price'], [r`P_y`, 'price of the other good'], [r`Q_x`, 'quantity of the focal good']], words: 'How much x’s quantity moves (%) when y’s price moves 1%. Sign tells you substitute (+) or complement (−).', src: 'S08 slides p.27' },
    { id: 's08-f-predict', name: 'Prediction', latex: r`\%\Delta Q = E\times\%\Delta P`, vars: [[r`E`, 'any elasticity (OPE, CPE, …)'], [r`\%\Delta P`, 'the % change in the driver']], words: 'Rearrange the definition to forecast the quantity response.', src: 'S08 slides p.31; CQ4 Q8' },
    { id: 's08-f-linear', name: 'Linear demand shortcut', latex: r`Q = a - bP \;\Rightarrow\; OPE = \frac{-bP}{a-bP},\quad P_{rev\,max} = \frac{a}{2b}`, vars: [[r`a`, 'intercept'], [r`b`, 'how many units are lost per $1']], words: 'On a straight-line demand, revenue peaks at half the choke price, exactly where OPE = −1.', src: 'S08 workbook OPE tab (Dr Pepper); derived' },
    { id: 's08-f-income', name: 'Income elasticity', latex: r`E_I = \frac{\partial Q_x}{\partial I}\cdot\frac{I}{Q_x}`, vars: [[r`I`, 'average income']], words: 'Positive → normal good; negative → inferior good.', src: 'General econ (B&P Ch 3)', general: true },
  ],
  examples: [
    {
      id: 's08-ex-redbox-arc',
      title: 'Redbox, October 31, 2011 — the algebraic formula',
      setup: r`Redbox raised the price of a DVD rental from **$1.00 to $1.20**, and quantity demanded fell from **5,000 to 4,500** rentals per kiosk. Was demand elastic or inelastic at $1.00? [[S08 slides p.21]]`,
      steps: [
        { ask: r`Compute \(\%\Delta Q\) using the old quantity as the base.`, show: r`\(\dfrac{4{,}500-5{,}000}{5{,}000} = -0.10\) (−10%)` },
        { ask: r`Compute \(\%\Delta P\).`, show: r`\(\dfrac{1.20-1.00}{1.00} = 0.20\) (+20%)` },
        { ask: 'Divide.', show: r`\(OPE = \dfrac{-0.10}{0.20} = ${tex(rbArc, 2)}\) [[S08 slides p.23]]` },
        { ask: 'Classify it and apply the total revenue test.', show: r`\(-1 < ${tex(rbArc, 2)} < 0\) → **inelastic**. A price *increase* should *increase* revenue. Check: \(1.00\times5{,}000 = 5{,}000\) vs. \(1.20\times4{,}500 = ${tex(1.2 * 4500, 0)}\). [[S08 slides p.22]]` },
      ],
      takeaway: 'Two observed points → algebraic formula, old values as the base.',
      src: 'S08 slides pp.21-23',
    },
    {
      id: 's08-ex-redbox-calc',
      title: 'Redbox again — the calculus formula on a fitted demand curve',
      setup: r`Suppose demand at that time is \(Q_x = -3{,}728P_x + 8{,}845\) (fitted from rentals per kiosk before and after the increase). What was OPE at $1.00? [[S08 slides p.24]]`,
      steps: [
        { ask: r`What is \(\partial Q/\partial P\)?`, show: r`The coefficient on price: \(-3{,}728\).` },
        { ask: r`What is \(Q\) at \(P = 1\)?`, show: r`\(Q = -3{,}728(1) + 8{,}845 = ${tex(rbQ1, 0)}\)` },
        { ask: 'Scale the slope by P/Q.', show: r`\(OPE = -3{,}728\times\dfrac{1}{${tex(rbQ1, 0)}} = ${tex(rbE1, 2)}\) → inelastic. [[S08 slides p.25]]` },
      ],
      takeaway: r`Both methods say inelastic; the numbers differ (${num(rbArc, 2)} vs. ${num(rbE1, 2)}) because one uses two raw points and the other uses the slope of a fitted line.`,
      src: 'S08 slides pp.24-25',
    },
    {
      id: 's08-ex-dp-table',
      title: 'Dr Pepper on campus — elasticity and revenue at every price (in-class exercise)',
      setup: r`Use \(Q = 30{,}000 - 20{,}000P\) to fill in OPE and revenue at each price, then find where revenue is maximized. [[S08 workbook, OPE - Solution]]`,
      steps: [
        {
          ask: 'Fill in the table: Q, OPE = −20,000·P/Q, and R = P·Q.',
          show:
            r`| Price | Quantity | OPE | Revenue |
| --- | --- | --- | --- |
` +
            dpRows
              .map((P) => `| ${dollars(P)} | ${num(dpQ(P), 0)} | ${P === 1.5 ? '−∞' : num(dpE(P), 1)} | ${dollars(P * dpQ(P)).replace('.00', '')} |`)
              .join('\n') +
            '\n\n[[S08 workbook, OPE - Solution!B14:E20]]',
        },
        { ask: 'Where is revenue maximized, and what is OPE there?', show: r`At **$0.75**, Q = 15,000, R = $11,250, and **OPE = −1**. Three ways to know: dR/dP = 30,000 − 40,000P = 0; the total revenue test (unitary elasticity); the revenue chart peaks there. [[S08 workbook, OPE - Solution comment B61]]` },
        { ask: 'For what prices is demand elastic? Inelastic?', show: 'Elastic above $0.75 (a price increase loses more % quantity than it gains % price → revenue falls). Inelastic below $0.75. [[S08 workbook, OPE - Solution comment B70]]' },
      ],
      takeaway: 'On a straight-line demand curve the top half is elastic, the bottom half inelastic, and revenue peaks exactly at the midpoint where OPE = −1.',
      src: 'S08 workbook OPE tab',
    },
    {
      id: 's08-ex-cpe',
      title: 'Cross-price elasticity from a demand function',
      setup: r`\(Q_x = 500 - 5P_x + 4P_y\). (1) Is y a substitute or complement? (2) CPE at \(P_x = 25,\,P_y = 20\)? (3) Effect of a 10% increase in \(P_y\)? [[S08 slides p.28]]`,
      steps: [
        { ask: r`Look at the coefficient on \(P_y\).`, show: '+4 → positive → **substitute**. [[S08 slides p.29]]' },
        { ask: r`Find \(Q_x\), then CPE.`, show: r`\(Q_x = 500 - 5(25) + 4(20) = ${cpeQx}\). \(CPE = 4\times\dfrac{20}{${cpeQx}} = ${tex(cpeE, 2)}\). [[S08 slides p.30]]` },
        { ask: r`Predict \(\%\Delta Q_x\) for \(\%\Delta P_y = +10\%\).`, show: r`\(\%\Delta Q_x = ${tex(cpeE, 2)}\times0.10 = ${tex(Math.round(cpeE * 100) / 100 * 0.1, 3)}\) → about **+1.8%**. [[S08 slides p.31]]` },
      ],
      takeaway: 'The coefficient gives you the sign instantly; the formula gives you the size.',
      src: 'S08 slides pp.28-31',
    },
    {
      id: 's08-ex-dpmp',
      title: 'Dr Pepper vs. Mr. Pibb — asymmetric substitutes',
      setup: r`From a survey in a prior class: **CPE for Dr Pepper = 1.2**, **CPE for Mr. Pibb = 2.0**. Each drink sells for $1.00. What happens if each one cuts price 25%? [[S08 workbook, CPE - Solution comment A2]]`,
      steps: [
        { ask: 'Dr Pepper cuts from $1.00 to $0.75 (−25%). Effect on Mr. Pibb?', show: r`Mr. Pibb’s CPE (its quantity vs. Dr Pepper’s price) is 2.0: \(\%\Delta Q_{MP} = 2.0\times(-25\%) = -50\%\). [[S08 workbook, CPE - Solution comment B15]]` },
        { ask: 'Mr. Pibb cuts 25%. Effect on Dr Pepper?', show: r`\(\%\Delta Q_{DP} = 1.2\times(-25\%) = -30\%\). [[S08 workbook, CPE - Solution comment B26]]` },
        { ask: 'What do you conclude?', show: 'Dr Pepper is a much stronger substitute for Mr. Pibb than Mr. Pibb is for Dr Pepper. A Dr Pepper price cut hurts Mr. Pibb far more than the reverse. [[S08 workbook, CPE - Solution comment B37]]' },
      ],
      takeaway: 'Substitution is not symmetric. The stronger brand’s price moves hurt the weaker brand more.',
      src: 'S08 workbook CPE tab',
    },
    {
      id: 's08-ex-netflix',
      title: 'Netflix, July 2011 — measuring against the right baseline',
      setup: r`Netflix raised the combo plan from **$10 to $16** (WSJ called it $9.99 → $15.98, +60%). It ended Q3 with 23.8M U.S. subscribers. It had been *expected* to reach 25M. [[S08 slides p.10]] [[CQ4 Q10]]`,
      steps: [
        { ask: 'What’s the right % change in quantity?', show: r`Against the expected 25M, not the reported 800K loss: \((23.8 - 25)/25 = ${tex(nfDQ * 100, 1)}\%\). The 800K figure ignores growth that would have happened anyway. [[CQ4 Q10]]` },
        { ask: '% change in price?', show: r`\((16-10)/10 = ${tex(nfDP * 100, 0)}\%\)` },
        { ask: 'OPE and classification?', show: r`\(OPE = ${tex(nfDQ * 100, 1)}\% / ${tex(nfDP * 100, 0)}\% = ${tex(nfDQ / nfDP, 2)}\) → **inelastic**.` },
        { ask: 'So was the price increase a revenue mistake?', show: 'On pure revenue, no: with demand that inelastic, revenue rose. The damage was to goodwill and how the increase was executed. The NYT headline was “How Netflix Lost 800,000 Members, and Good Will.” [[S08 slides p.12]]' },
      ],
      takeaway: 'Always ask: compared to what? Isolating the effect of price is exactly why S09 brings in regression.',
      src: 'CQ4 Q10; S08 slides pp.10-12',
    },
  ],
  widgets: [
    {
      id: 'elasticity-explorer',
      title: 'Elasticity explorer: demand, MR and total revenue',
      intro: 'Drag the point along the demand curve (or use the arrow keys). Watch OPE, the elastic/inelastic region, marginal revenue, and the total revenue curve move together.',
      questions: [],
      numeric: [
        { id: 's08-w1-ope-peak', label: 'Find the point where total revenue is at its peak. What is OPE there?', part: { type: 'num', label: 'OPE at the revenue peak', answer: -1, tol: 0.001, abs: 0.02 }, hint: 'Drag until MR = 0. The revenue curve’s top is directly below.', src: 'S08 slides p.18' },
        { id: 's08-w1-dp-1', label: 'Switch to the **Dr Pepper** preset and set P = $1.00. What is OPE?', part: { type: 'num', label: 'OPE at $1.00', answer: dpE(1), tol: 0.01, abs: 0.02 }, hint: 'Q = 10,000 at $1.00.', src: 'CQ4 Q5' },
      ],
    },
    {
      id: 'revenue-drill',
      title: 'Quick-fire: price rises 10% — what happens to revenue?',
      intro: 'You get an elasticity. Decide fast: does a 10% price change make revenue rise, fall, or stay about the same? Keys 1–3 answer, Enter for the next one.',
      questions: [],
      numeric: [
        { id: 's08-w2-pct', label: r`OPE = −0.4 and price rises 10%. By what % does quantity demanded change?`, part: { type: 'num', label: '% change in quantity', answer: -0.04, kind: 'percent', tol: 0.001, abs: 0.0005 }, hint: r`\(\%\Delta Q = OPE	imes\%\Delta P\).`, src: 'S08 slides p.31' },
      ],
    },
    {
      id: 'cpe-classifier',
      title: 'CPE sign classifier',
      intro: 'Each card gives you a CPE, a demand function, or a real-world pair. Classify the goods as substitutes or complements.',
      questions: [],
      numeric: [
        { id: 's08-w3-cpe', label: r`\(Q_x = 900 - 3P_x - 6P_y\) with \(P_x = 50\), \(P_y = 40\). Compute the CPE.`, part: { type: 'num', label: 'CPE', answer: (-6 * 40) / (900 - 3 * 50 - 6 * 40), tol: 0.02, abs: 0.006 }, hint: r`\(Q_x = 900 - 150 - 240 = 510\); then \(-6	imes40/510\).`, src: 'S08 slides p.30 (same method)' },
      ],
    },
  ],
  checkIds: ['s08-cq4-q5', 's08-cq4-q6', 's08-c-elastic-def', 's08-c-cpe-sign', 's08-c-linear-halves', 's08-c-rivalry'],
  applyGenerators: ['s08-ope-arc', 's08-ope-linear', 's08-cpe', 's08-predict'],
  traps: [
    { title: 'Dropping the minus sign', body: r`The professor reports OPE as **negative** and defines elastic as \(OPE < -1\). "OPE = 2.0" is wrong even if the magnitude is right; CQ4 Q5 offered 2.0 as a distractor. [[S08 slides p.16]] [[CQ4 Q5]]`, src: 'S08 slides p.16' },
    { title: 'Using the new values as the base', body: r`The algebraic formula divides by \(Q_{old}\) and \(P_{old}\). Redbox: \(-500/5{,}000\), not \(-500/4{,}500\). [[S08 slides p.23]]`, src: 'S08 slides p.23' },
    { title: 'Flipping the fraction', body: r`It is \(\%\Delta Q\) over \(\%\Delta P\) (quantity on top). Flipping it turns −0.50 into −2.00 and changes your recommendation.`, src: 'S08 slides p.16' },
    { title: 'Forgetting to scale the slope', body: r`\(\partial Q/\partial P = -20{,}000\) is not an elasticity. Multiply by \(P/Q\).`, src: 'CQ4 Q5' },
    { title: 'Using the inverse-demand slope', body: r`If you’re given \(P = 1.50 - Q/20{,}000\), the slope of *that* line is \(\partial P/\partial Q\). Elasticity needs \(\partial Q/\partial P\), so invert first (or use \(1/\text{slope}\)).`, src: 'CQ4 Q4' },
    { title: 'Wrong baseline for the quantity change', body: 'Netflix “lost 800,000,” but the price effect is the gap to the 25M it *expected*. Compare to the counterfactual. [[CQ4 Q10]]', src: 'CQ4 Q10' },
    { title: '% vs. decimal', body: r`\(CPE = 0.18\) and \(\%\Delta P_y = 10\%\) give \(0.18\times0.10 = 0.018\), which is **1.8%**, not 18%. [[S08 slides p.31]]`, src: 'S08 slides p.31' },
    { title: 'Revenue max ≠ profit max', body: 'OPE = −1 maximizes *revenue*. Profit maximization (S10) also needs marginal cost, and it puts you on the elastic part of demand.', src: 'S08 slides p.18' },
  ],
  feynman: [
    {
      id: 's08-fey-1',
      prompt: 'Explain to a friend why total revenue peaks exactly where demand is unitary elastic.',
      model: r`Revenue is price times quantity. A small price increase has two effects. You earn more on every unit you still sell, and you sell fewer units. Elasticity compares those two in percentage terms.

If \(|OPE| < 1\), quantity falls by a smaller % than price rises, so the price effect wins and revenue goes **up**. If \(|OPE| > 1\), the quantity effect wins and revenue goes **down**.

Revenue keeps climbing as long as you're in the inelastic zone and keeps falling once you're in the elastic zone, so the top must be where the two effects exactly cancel: \(OPE = -1\).`,
      rubric: ['Said revenue = P × Q', 'Named both effects (price gain vs. quantity loss)', 'Linked |OPE| < 1 → revenue rises, > 1 → falls', 'Concluded the peak is where they balance: OPE = −1', 'Used no jargon a friend wouldn’t follow'],
    },
    {
      id: 's08-fey-2',
      prompt: 'Explain why the same straight-line demand curve can be elastic at one price and inelastic at another.',
      model: r`The slope of a straight line is constant, but elasticity is slope × P/Q. At a high price, P is big and Q is small, so P/Q is large and |OPE| is large: elastic. At a low price, P is small and Q is big, so P/Q is tiny: inelastic. Losing 20,000 cans per dollar is a huge *percentage* when you only sell 5,000 cans, and a small one when you sell 25,000.`,
      rubric: ['Distinguished slope from elasticity', 'Explained the role of P/Q', 'Gave the high-price → elastic direction correctly', 'Used a concrete example'],
    },
  ],
  deeper: [
    { title: 'Why OPE on a linear demand hits −1 at the midpoint', kind: 'derivation', body: r`With \(Q = a - bP\), \(OPE = \dfrac{-bP}{a-bP}\). Set it equal to −1: \(-bP = -(a - bP)\) → \(2bP = a\) → \(P = \dfrac{a}{2b}\), half the choke price \(a/b\). Revenue \(R = aP - bP^2\) gives \(dR/dP = a - 2bP = 0\) at the same \(P\). Two roads, one answer.` },
    { title: 'Elasticity from a log-linear regression', kind: 'textbook', body: r`[[GEN]] If you estimate \(\ln Q = \beta_0 + \beta_P\ln P + \beta_I\ln I + \dots\), each coefficient *is* an elasticity: \(OPE = \beta_P\), constant along the whole curve. Baye & Prince Ch 3 covers this. The course regressions (S09) are linear, so there you must evaluate \(b\cdot P/Q\) at a point.` },
    { title: 'Elasticity and the Five Forces', kind: 'textbook', body: r`The professor’s map [[S08 slides p.32]]: **Rivalry** ← CPE between rival brands (high → buyers switch easily → intense rivalry). **Buyer power** ← the firm’s OPE (elastic → price-sensitive buyers). **Substitutes** ← CPE with products outside the industry (high → strong threat, caps prices). Supplier power and threat of entry are *not* captured by demand elasticity. “The larger the elasticity (in absolute value), the stronger the force — and the less pricing power the firm has.”` },
    { title: 'In a case interview: pricing', kind: 'case-interview', body: r`“Should our client raise prices 10%?” is a classic. The elasticity-first answer: estimate how volume responds (historical price changes, A/B tests, surveys; see S07). Compute break-even volume loss: a 10% price increase is revenue-neutral if volume falls about 9.1% (\(1/1.1 = 0.909\)). Then check competitor CPE, since rivals may not follow. Mention the Netflix 2011 lesson: execution and goodwill matter, not just the math.` },
  ],
  summary: r`**Elasticity = % change in Q ÷ % change in the driver.** [[S08 slides p.15]]

- **OPE** \(= \frac{\%\Delta Q}{\%\Delta P} = \frac{\partial Q}{\partial P}\frac{P}{Q}\), always negative. Elastic \(< -1\); inelastic between −1 and 0; unitary = −1. [[S08 slides pp.16-17]]
- **Total revenue test:** inelastic → raise price to raise revenue; elastic → cut price; revenue peaks at OPE = −1. [[S08 slides p.18]]
- **Algebraic** formula uses the old values as the base (Redbox −0.50). **Calculus** uses the slope times P/Q (Redbox −0.73; Dr Pepper −2.0 at $1). [[S08 slides pp.23-25]]
- **CPE** \(= \frac{\partial Q_x}{\partial P_y}\frac{P_y}{Q_x}\). + substitutes, − complements. Coefficient sign tells you instantly. [[S08 slides pp.27-30]]
- **Predict:** \(\%\Delta Q = E\times\%\Delta P\) (CPE −2, +20% → −40%). [[CQ4 Q8]]
- **Strategy:** OPE ↔ buyer power; CPE (rivals) ↔ rivalry; CPE (outside) ↔ substitutes. [[S08 slides p.32]]`,
}
