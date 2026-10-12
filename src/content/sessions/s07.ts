import { num, tex } from '../../lib/format'
import type { SessionModule } from '../types'

const r = String.raw

const rbP = 8845 / (2 * 3728)
const rbQ = 8845 - 3728 * rbP
const dpQ = (p: number) => 30000 - 20000 * p
const surveyCounts = [21, 5, 23, 9, 10, 7, 9]
const surveyCum = surveyCounts.map((_, i) => surveyCounts.slice(0, i + 1).reduce((s, v) => s + v, 0))

export const s07: SessionModule = {
  id: 'S07',
  num: '7',
  title: 'Demand & Consumer Surplus',
  spine: 'value',
  minutes: 55,
  ready: true,
  takeaway: r`A demand function tells you how many units sell at each price, given income, related goods, ads and population. Own price moves you **along** the curve, and everything else **shifts** it. Calculus finds the revenue-maximizing price. Consumer surplus is the value you created but didn't capture.`,
  why: r`Strategy question 2, **Unique Value to Offer**, splits into a cost side (S06) and a **demand side**: how much customers are willing to pay. Differentiation is about raising that willingness to pay. Demand curves let you measure it and price on it. [[S01 slides p.36]]

The professor's three ways to get a demand curve are **A/B tests, surveys (Dr Pepper), and historical data (Redbox)**. Every later pricing tool needs one: elasticity (S08), regression (S09), profit max (S10), advanced pricing (S11). [[S07 slides p.16]]

> CQ4 Q1–Q4 and Q7 come straight from this session: read the shifter signs, invert the demand function, compute consumer surplus, and solve for the revenue-maximizing price. [[CQ4 Q1]]`,
  intuition: r`Line up every potential buyer by how much they'd pay, highest first. At any price, everyone whose willingness to pay (WTP) is **at least** that price buys. Plot that count against price and you've drawn a **demand curve**. That's exactly what the Dr Pepper survey does. [[S07 workbook]]

Two kinds of change:

- **The good's own price changes.** You slide along the same curve to a different quantity. That's a *change in quantity demanded*.
- **Anything else changes** (income, a substitute's or complement's price, advertising, population, expectations). The whole line of buyers changes, so the curve itself *shifts*.

Every buyer who would have paid more than the price walks away with a bonus, the gap between their WTP and the price. Add those up and you get **consumer surplus**: value the firm created but left on the table.`,
  los: [
    { id: 'S07-LO1', text: 'Know and understand the following concepts: market demand curve, law of demand, change in quantity demanded, shift in demand, normal good, inferior good, substitute, complement, demand function, inverse demand function, consumer surplus', src: 'Canvas Session 7 module; S07 slides p.15' },
    { id: 'S07-LO2', text: 'Know and understand how to construct and plot a demand curve', src: 'Canvas Session 7 module; S07 slides p.15' },
    { id: 'S07-LO3', text: 'Know how to calculate the revenue maximizing price using calculus', src: 'Canvas Session 7 module; S07 slides p.15' },
    { id: 'S07-LO4', text: 'Know how to calculate consumer surplus and describe what it means', src: 'Canvas Session 7 module; S07 slides p.15' },
    { id: 'S07-LO5', text: 'Know and understand the four major categories or sources of product or service differentiation', src: 'Canvas Session 7 module (taught in the “Differentiation Advantage” video — transcript not in your files)' },
  ],
  terms: [
    { id: 's07-t-market', term: 'Market demand curve', def: 'The total quantity all consumers in the market would buy at each price, holding other factors constant. In the survey, it is the cumulative count of buyers willing to pay at least each price, scaled to the market.', src: 'General econ (B&P Ch 2); S07 workbook', general: true },
    { id: 's07-t-law', term: 'Law of demand', def: 'Price and quantity demanded are inversely related, all else equal: a % increase in price leads to a % decrease in quantity demanded.', src: 'S08 slides p.16' },
    { id: 's07-t-qd', term: 'Change in quantity demanded', def: 'A movement along a given demand curve caused by a change in the good’s own price.', src: 'General econ (B&P Ch 2)', general: true },
    { id: 's07-t-shift', term: 'Shift in demand', def: 'The whole curve moves (right = increase, left = decrease) because a non-price determinant changed: prices of related goods, income, advertising/preferences, population, expectations.', src: 'General econ (B&P Ch 2); determinants from S05 slides p.41', general: true },
    { id: 's07-t-normal', term: 'Normal good', def: 'Demand rises when income rises; positive coefficient on income in the demand function.', src: 'CQ4 Q2 feedback (sign logic)' },
    { id: 's07-t-inferior', term: 'Inferior good', def: 'Demand falls when income rises; negative coefficient on income (CQ4: −0.2).', src: 'CQ4 Q2 feedback' },
    { id: 's07-t-sub', term: 'Substitute', def: 'A good y whose price increase raises demand for x; positive coefficient on Py (CQ4: +5); Dr Pepper vs. Mr. Pibb.', src: 'CQ4 Q1 feedback; S08 slides p.27' },
    { id: 's07-t-comp', term: 'Complement', def: 'A good y whose price increase lowers demand for x; negative coefficient on Py; milk and cereal.', src: 'S08 slides p.27' },
    { id: 's07-t-fn', term: 'Demand function', def: r`Quantity as a function of price and other variables, e.g., \(Q_x = 10{,}000 - 4P_x + 5P_y - 0.2I\).`, src: 'CQ4 Q1' },
    { id: 's07-t-inv', term: 'Inverse demand function', def: r`The demand function solved for price (price on the left): \(Q_x = 4{,}500 - 4P_x\) → \(P_x = 1{,}125 - 0.25Q_x\).`, src: 'CQ4 Q3 feedback' },
    { id: 's07-t-cs', term: 'Consumer surplus', def: r`The area under the demand curve and above the price, \(\tfrac12 Q(P_{choke} - P)\) for linear demand. It is the value consumers receive beyond what they pay, i.e. value the firm did not capture.`, src: 'CQ4 Q4 feedback; meaning: General econ' },
    { id: 's07-t-choke', term: 'Choke price', def: 'The price at which quantity demanded hits zero (the intercept of inverse demand). For Dr Pepper, $1.50.', src: 'CQ4 Q4 feedback' },
  ],
  mathIntro: r`Three skills: **read** a demand function (signs tell you substitute/complement and normal/inferior), **invert** it (solve for P), and **optimize** revenue with the S05 three-step recipe. [[CQ4 Q1]] [[S07 slides p.30]]`,
  formulas: [
    { id: 's07-f-fn', name: 'Demand function with shifters', latex: r`Q_x = a - bP_x + cP_y + dI + eA + \dots`, vars: [[r`c > 0`, 'y is a substitute; c < 0 complement'], [r`d > 0`, 'x is normal; d < 0 inferior'], [r`b`, 'law of demand: quantity falls as own price rises']], words: 'Each coefficient is a partial derivative: the effect of that variable holding the others constant.', src: 'CQ4 Q1-Q2; Math Review p.10' },
    { id: 's07-f-inv', name: 'Inverse demand', latex: r`Q = A - bP \;\Longleftrightarrow\; P = \frac{A}{b} - \frac{1}{b}Q`, vars: [[r`A/b`, 'choke price']], words: 'Plug in the shifters first to get A, then solve for P.', src: 'CQ4 Q3' },
    { id: 's07-f-rev', name: 'Revenue-maximizing price', latex: r`R = P\cdot Q(P),\quad \frac{dR}{dP} = 0 \Rightarrow P^* = \frac{A}{2b}\ \text{(linear)}`, vars: [[r`R`, 'total revenue']], words: 'Write revenue in terms of price, differentiate, set to zero, solve.', src: 'S07 slides p.30; CQ4 Q7' },
    { id: 's07-f-cs', name: 'Consumer surplus (linear)', latex: r`CS = \tfrac12\,Q(P)\,\bigl(P_{choke} - P\bigr)`, vars: [[r`P_{choke}`, 'price where Q = 0']], words: 'Area of the triangle under demand and above price.', src: 'CQ4 Q4' },
    { id: 's07-f-cs-wtp', name: 'Consumer surplus (survey)', latex: r`CS = \sum_{\text{buyers}} (\text{WTP}_i - P)`, vars: [[r`\text{WTP}_i`, 'buyer i’s maximum willingness to pay']], words: 'Each buyer’s bonus, added up.', src: 'S07 workbook (survey logic)' },
  ],
  examples: [
    {
      id: 's07-ex-cq4',
      title: 'CQ4: read the signs, then invert',
      setup: r`\(Q_x = 10{,}000 - 4P_x + 5P_y - 0.2I\), with \(P_y = 100\) and \(I = 30{,}000\). [[CQ4 Q1]]`,
      steps: [
        { ask: 'Substitute or complement? Normal or inferior?', show: '+5 on Py → **substitute** (CQ4 Q1 “complements” is False). −0.2 on I → **inferior** (CQ4 Q2 “normal” is False). [[CQ4 Q2]]' },
        { ask: 'Plug in Py and I.', show: r`\(Q_x = 10{,}000 - 4P_x + 500 - 6{,}000 = 4{,}500 - 4P_x\)` },
        { ask: 'Invert.', show: r`\(4P_x = 4{,}500 - Q_x\) → \(P_x = 1{,}125 - 0.25Q_x\). [[CQ4 Q3]]` },
      ],
      takeaway: 'Plug in the shifters first, then invert.',
      src: 'CQ4 Q1-Q3',
    },
    {
      id: 's07-ex-survey',
      title: 'Dr Pepper survey → demand schedule (your class data)',
      setup: r`Max WTP counts from sections 2 + 3 in your S07 workbook: $1.50: 21, $1.25: 5, $1.00: 23, $0.75: 9, $0.50: 10, $0.25: 7, $0: 9. Market-to-sample ratio 300. [[your S07 workbook, Dr Pepper!B4:C10]]`,
      steps: [
        { ask: 'Quantity demanded (sample) at each price?', show: `Cumulative from the top: ${surveyCum.join(', ')}. At $1.00, 21 + 5 + 23 = ${surveyCum[2]}. [[S07 workbook, Dr Pepper!F6 = SUM(B6:E6)+F5]]` },
        { ask: 'Scale to the market.', show: `× 300: ${surveyCum.map((c) => num(c * 300, 0)).join(', ')} cans.` },
        { ask: 'Plot it.', show: 'Price on the vertical axis, quantity on the horizontal: a downward-sloping step curve, which is the law of demand in your own classmates’ answers. Try it in the WTP builder (Interactives).' },
      ],
      takeaway: 'A demand curve is just a cumulative count of willingness to pay.',
      src: 'S07 workbook',
    },
    {
      id: 's07-ex-dp',
      title: 'Dr Pepper on campus: consumer surplus and revenue max',
      setup: r`\(Q_{DP} = 30{,}000 - 20{,}000P_{DP}\). [[CQ4 Q4]]`,
      steps: [
        { ask: 'Choke price and Q at $1.00?', show: r`\(P_{choke} = 30{,}000/20{,}000 = \$1.50\); \(Q(1) = ${tex(dpQ(1), 0)}\).` },
        { ask: 'Consumer surplus at $1.00?', show: r`\(\tfrac12\times10{,}000\times(1.50 - 1.00) = \$2{,}500\). [[CQ4 Q4]]` },
        { ask: 'Revenue-maximizing price?', show: r`\(R = 30{,}000P - 20{,}000P^2\); \(dR/dP = 30{,}000 - 40{,}000P = 0\) → **$0.75** (Q = 15,000, R = $11,250). [[CQ4 Q7]]` },
      ],
      takeaway: 'CS is a triangle; revenue max is the S05 recipe.',
      src: 'CQ4 Q4, Q7',
    },
    {
      id: 's07-ex-redbox',
      title: 'Redbox: demand from historical data, then revenue max',
      setup: r`Rentals per kiosk: 2011-1/2/3 at $1.00 → 5,169, 5,012, 5,172; 2012-2/3/4 at $1.20 → 4,655, 4,160, 4,301. Fit a line. [[S07 slides p.27]]`,
      steps: [
        { ask: 'Linear fit of Q on P?', show: r`\(Q = -3{,}728P + 8{,}845\). [[S07 slides p.28]]` },
        { ask: 'Define revenue and differentiate.', show: r`\(R = 8{,}845P - 3{,}728P^2\); \(dR/dP = 8{,}845 - 7{,}456P\). [[S07 slides p.30]]` },
        { ask: 'Solve.', show: r`\(P^* = 8{,}845/7{,}456 = \$${tex(rbP, 2)}\), with about ${num(rbQ, 0)} rentals per kiosk.` },
        { ask: 'So was the later move to $1.50 a good idea?', show: 'On the 2011 curve, no: $1.50 is past the revenue peak. But demand moved: by 2014 the curve had shifted left and become less price-sensitive (revenue max ≈ $1.45, per your Differentiation Advantage analysis). Demand curves are dynamic. [[S09 slides p.4]] [[your Differentiation Advantage, Part 2]]' },
      ],
      takeaway: 'Historical before/after data → a demand curve → a pricing decision. Re-estimate as the market changes.',
      src: 'S07 slides pp.27-32',
    },
  ],
  widgets: [
    {
      id: 'wtp-builder',
      title: 'WTP → demand curve builder',
      intro: 'Your class’s Dr Pepper survey responses build a demand schedule and a step demand curve. Move the price to see quantity, revenue (gold) and consumer surplus (green).',
      questions: [],
      numeric: [{ id: 's07-w1-q', label: 'With the class preset and ratio 300, what is market quantity demanded at $0.75?', part: { type: 'num', label: 'Cans', answer: surveyCum[3] * 300, tol: 0.001 }, hint: '21 + 5 + 23 + 9, then × 300.', src: 'your S07 workbook' }],
    },
    {
      id: 'cs-slider',
      title: 'Price slider: consumer surplus vs. revenue',
      intro: 'Slide the price on the Dr Pepper demand curve. Green is consumer surplus, gold is revenue.',
      questions: [],
      numeric: [{ id: 's07-w2-cs', label: 'Set the price to $0.50 on the Dr Pepper preset. What is consumer surplus?', part: { type: 'num', label: 'CS ($)', answer: 0.5 * dpQ(0.5) * 1, kind: 'money', tol: 0.005 }, hint: 'Q = 20,000; height = $1.50 − $0.50.', src: 'CQ4 Q4 (same method)' }],
    },
    {
      id: 'shift-sim',
      title: 'Shift or movement? Predict, then watch',
      intro: 'Pick an event, predict what happens to demand, and see it on the graph.',
      questions: [],
    },
  ],
  checkIds: ['s07-cq4-q1', 's07-cq4-q2', 's07-c-movement', 's07-c-estimate', 's07-cq4-q4', 's07-c-inversedef'],
  applyGenerators: ['s07-inverse', 's07-cs', 's07-revmax', 's07-wtp', 's07-shift'],
  traps: [
    { title: 'Inverting before plugging in', body: r`CQ4 offered \(P_x = 2{,}500 - 0.25Q_x\) (10,000/4) as a trap. Substitute \(P_y\) and \(I\) first, then solve for P. [[CQ4 Q3]]`, src: 'CQ4 Q3' },
    { title: 'Demand vs. inverse demand', body: r`\(Q_x = 4{,}500 - 4P_x\) is the demand function. The inverse has **P on the left**.`, src: 'CQ4 Q3' },
    { title: 'Shift vs. movement', body: 'Only a change in the good’s own price moves you along the curve. Income, related prices, advertising, population and expectations shift it.', src: 'S07 slides p.15' },
    { title: 'Reading signs backwards', body: '+ on Py = substitute; − = complement. + on I = normal; − = inferior. CQ4 Q1 and Q2 were both “False” for this reason.', src: 'CQ4 Q1-Q2' },
    { title: 'CS without the ½', body: 'Consumer surplus on linear demand is a triangle: ½ × Q × (choke − P). $5,000 was the CQ4 trap. [[CQ4 Q4]]', src: 'CQ4 Q4' },
    { title: 'Survey: counting only exact answers', body: 'Quantity at $0.75 includes everyone willing to pay $0.75 *or more*, so the counts are cumulative.', src: 'S07 workbook' },
    { title: 'Revenue max at the choke price', body: 'At the choke price nobody buys. Revenue peaks at half the choke price for linear demand.', src: 'CQ4 Q7' },
  ],
  feynman: [
    {
      id: 's07-fey-1',
      prompt: 'Explain the difference between a “change in quantity demanded” and a “shift in demand,” with one example of each from this course.',
      model: r`A demand curve answers: at each price, how many units would people buy, holding everything else fixed? If only the good’s own price changes, you just read a different point off the same curve. That’s a change in quantity demanded, like Redbox raising its price from $1.00 to $1.20 and rentals per kiosk falling. If something else changes, the whole curve moves to a new position. That’s a shift. Example: streaming got better, so Redbox demand in 2014 sat to the left of 2011 at every price.`,
      rubric: ['Defined demand as holding other factors constant', 'Own price → movement along the curve', 'Other determinants → shift', 'Gave a correct course example of each'],
    },
    {
      id: 's07-fey-2',
      prompt: 'What does consumer surplus mean, and why should a strategist care about it?',
      model: r`Consumer surplus is the gap between what customers would have paid and what they actually paid, added up across buyers: the triangle under demand and above price. It is value your product created that went to customers instead of you. Strategists care because a bigger surplus means room to capture more value, through pricing strategies like two-part pricing, bundling and price discrimination (S11), without losing customers.`,
      rubric: ['WTP minus price, summed', 'Area under demand above price', 'Value created but not captured', 'Linked to pricing strategy / capture'],
    },
  ],
  deeper: [
    { title: 'Four sources of differentiation — gap in your materials', kind: 'textbook', body: r`The professor’s “four major categories or sources of differentiation” (S07-LO5) are taught in the LearnStrategy **Differentiation Advantage** video, and its transcript isn’t in your files, so this site won’t guess the list. Grab the transcript (Canvas › Session 7 › Watch: Differentiation Advantage › “Prefer to read?”) and re-run the ingest. What the course materials *do* show: differentiation appears as **higher willingness to pay**, i.e. higher gross margin. Whole Foods keeps 36¢ of each sales dollar vs. Kroger’s 21¢ [[S06 slides p.7]], and Netflix out-earns Redbox on gross margin at similar operating expense [[S09 slides p.5]].` },
    { title: 'Why revenue peaks at half the choke price', kind: 'derivation', body: r`\(Q = A - bP\) → \(R = AP - bP^2\) → \(R' = A - 2bP = 0\) → \(P^* = A/(2b)\), half of the choke price \(A/b\). At that point \(OPE = -bP/Q = -1\) (S08).` },
    { title: 'Behavioral nudges', kind: 'textbook', body: 'Thaler & Sunstein’s *Nudge*: a UK tax letter that added “9 out of 10 people in your town have paid” recovered more revenue, and opt-out organ donation raises donors. Framing changes demand without changing price. [[S07 slides p.13]]' },
    { title: 'In a case interview: sizing demand', kind: 'case-interview', body: 'The Dr Pepper method is market sizing: survey a sample, build a WTP schedule, scale by the market-to-sample ratio. In a case, state the scaling assumption out loud (e.g., “our 84 respondents represent 1/300 of campus”) and sanity-check it against population × purchase frequency.' },
  ],
  summary: r`**Demand** = how many units sell at each price, holding other factors constant. Own price → *movement along* the curve; income, related prices, ads, population, expectations → *shift*. [[S07 slides p.15]]

- Signs: +Py substitute, −Py complement; +I normal, −I inferior (CQ4: +5 → substitute; −0.2 → inferior). [[CQ4 Q1-Q2]]
- **Inverse demand:** plug in shifters, then solve for P (\(P_x = 1{,}125 - 0.25Q_x\)). [[CQ4 Q3]]
- **Estimate demand:** A/B tests, surveys (Dr Pepper: cumulative WTP counts × market ratio), historical data (Redbox: Q = 8,845 − 3,728P). [[S07 slides p.16]]
- **Revenue max:** \(R = P\cdot Q\), \(dR/dP = 0\) (Dr Pepper $0.75; Redbox ≈ $1.19). [[CQ4 Q7]] [[S07 slides p.30]]
- **Consumer surplus:** ½ × Q × (choke − P) (Dr Pepper at $1: $2,500): value created but not captured. [[CQ4 Q4]]
- **Differentiation** shows up as willingness to pay / gross margin. The four categories are in the video (gap).`,
}
