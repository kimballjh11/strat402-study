import { num, pct, tex } from '../../lib/format'
import { costAt } from '../generators/s06'
import type { SessionModule } from '../types'

const r = String.raw
const j1 = costAt(0.00002, -0.005, 0.8, 8, 100)
const j2 = costAt(0.000002, -0.0005, 0.25, 16, 400)
const grocers = [
  { n: 'Whole Foods', rev: 14194, cogs: 9150, sga: 4110, oi: 934, ni: 579, ta: 5744, tl: 1931, te: 3813 },
  { n: 'Kroger', rev: 108465, cogs: 85512, sga: 19816, oi: 3137, ni: 1728, ta: 30556, tl: 25114, te: 5442 },
  { n: 'Safeway', rev: 36360, cogs: 26648, sga: 9148, oi: 534, ni: 113, ta: 13377, tl: 7927, te: 5450 },
]
const row = (label: string, f: (g: (typeof grocers)[number]) => string) => `| ${label} | ${grocers.map(f).join(' | ')} |`
const gTable = [
  '| FY2014 ($M) | Whole Foods | Kroger | Safeway |',
  '| --- | --- | --- | --- |',
  row('Revenue', (g) => num(g.rev, 0)),
  row('Gross margin', (g) => pct((g.rev - g.cogs) / g.rev)),
  row('SG&A % of sales', (g) => pct(g.sga / g.rev)),
  row('Operating margin', (g) => pct(g.oi / g.rev)),
  row('Return on sales (NI/Rev)', (g) => pct(g.ni / g.rev)),
  row('Asset turnover (Rev/Assets)', (g) => num(g.rev / g.ta, 1)),
  row('Leverage (Assets/Equity)', (g) => num(g.ta / g.te, 1)),
  row('ROA', (g) => pct(g.ni / g.ta)),
  row('ROE', (g) => pct(g.ni / g.te)),
].join('\n')

export const s06: SessionModule = {
  id: 'S06',
  num: '6',
  title: 'Cost & Economies of Scale',
  spine: 'value',
  minutes: 60,
  ready: true,
  takeaway: r`A cost advantage comes from five sources, and economies of scale are the one you can calculate: **unit cost falls as volume grows**. When the scale curve is steep, there's a volume imperative: grow (sometimes by pricing aggressively) or be out-costed.`,
  why: r`Strategy question 2, **Unique Value to Offer**, has two generic answers: be cheaper (**cost advantage**) or be worth more (**differentiation**). This session is the cost side. [[S06 slides p.8]]

The professor's opening comparison shows both strategies in the financials. **Kroger** competes on cost: thin margins, huge volume. **Whole Foods** competes on differentiation: customers pay a premium that covers higher overhead. **Safeway** is stuck in the middle. [[S06 slides p.7]]

> CQ3 is all S06: five J-Dawgs cost calculations, the MC–ATC relationship, the volume imperative, learning curves, and where 10-K scale data live. The Cost Advantage spreadsheet (Netflix vs. Redbox vs. Blockbuster) is “the practice that shows up on the midterm.” [[CQ3 Q1]] [[Succeeding in STRAT 402 page]]`,
  intuition: r`Think about J. Dawgs, the hot-dog stand. The **grill** costs the same whether you sell 10 hot dogs or 200. That's a *fixed cost*. **Buns, dogs and labor** grow with each sale. Those are *variable costs*.

- Spread the grill over more hot dogs and the fixed cost per hot dog (**AFC**) shrinks toward zero.
- The cost of the *next* hot dog (**MC**) first falls (two workers beat one) and then rises (the grill gets crowded: diminishing returns). [[S06 Video Slides p.6]]
- Average total cost (**ATC**) falls while the next hot dog is cheaper than the average, and rises once it's pricier. So **MC crosses ATC at its minimum**, like a new test score pulling your GPA up or down. [[CQ3 Q7]]

Zoom out to a whole company and the same logic becomes a **scale curve**: cost per unit vs. volume. Guest-Tek's cost per hotel room per day fell from $0.72 to $0.21 as it grew. If your rival is further down that curve, it can price below your cost. [[S06 workbook, Solution!G37:G47]]`,
  los: [
    { id: 'S06-LO1', text: 'Know and understand the sources of cost advantage', src: 'Canvas Session 6 module; S06 slides p.9' },
    { id: 'S06-LO2', text: 'Know and understand the following economic concepts and how they relate to one another: fixed costs, variable costs, total cost, average fixed cost, average variable cost, average total cost, marginal cost, economies of scale', src: 'Canvas Session 6 module; S06 slides p.9' },
    { id: 'S06-LO3', text: 'Understand the strategic implications of economies of scale (i.e., when does it make sense to grow?)', src: 'Canvas Session 6 module; S06 slides p.9' },
  ],
  terms: [
    { id: 's06-t-sources', term: 'Sources of cost advantage', def: 'Economies of scale and scope; learning and experience; proprietary knowledge; input costs; different business model.', src: 'S06 slides p.8' },
    { id: 's06-t-costfn', term: 'Cost function', def: 'The relationship between production (Q) and total cost (C); total cost can be broken into fixed (FC) and variable costs (VC).', src: 'S06 Video Slides p.12' },
    { id: 's06-t-fc', term: 'Fixed cost (FC)', def: 'The part of cost that does not change with Q (the constant term, e.g., the grill rental).', src: 'S06 Video Slides p.14; CQ3 Q1' },
    { id: 's06-t-vc', term: 'Variable cost (VC)', def: 'Every term in the cost function that changes with Q.', src: 'S06 Video Slides p.15; CQ3 Q2' },
    { id: 's06-t-avg', term: 'AFC, AVC, ATC', def: r`\(AFC = FC/Q\); \(AVC = VC/Q\); \(ATC = AFC + AVC = C/Q\). The gap between ATC and AVC is AFC, which shrinks toward zero as Q grows.`, src: 'S06 Video Slides pp.17-19; CQ3 Q6' },
    { id: 's06-t-mc', term: 'Marginal cost (MC)', def: r`The cost of producing an additional unit, or the change in cost attributable to the last unit: \(MC = \Delta C/\Delta Q = dC/dQ\). MC excludes fixed cost.`, src: 'S06 Video Slides p.20; S06 workbook, Solution!A153' },
    { id: 's06-t-mcatc', term: 'MC and the averages', def: 'MC intersects ATC and AVC at their minimum points.', src: 'CQ3 Q7' },
    { id: 's06-t-srlr', term: 'Short run vs. long run', def: 'Short run: capital (e.g., number of grills) is fixed and labor is variable. Long run: all inputs can be adjusted (buy grills, build locations), so all costs are variable.', src: 'S06 Video Slides p.27' },
    { id: 's06-t-lrac', term: 'Long-run average cost (LRAC)', def: 'The minimum average cost of producing each output level, allowing optimal selection of fixed and variable inputs (the envelope of short-run ATC curves).', src: 'S06 Video Slides p.29' },
    { id: 's06-t-eos', term: 'Economies / diseconomies of scale', def: 'Economies of scale: long-run average costs decline as output increases. Diseconomies: long-run average costs rise as output increases.', src: 'S06 Video Slides p.29' },
    { id: 's06-t-learning', term: 'Learning and experience', def: '“Practice makes perfect”: firms get more efficient through practice, so costs fall with *cumulative* output over time. Economies of scale come from volume in a given period.', src: 'CQ3 Q9' },
    { id: 's06-t-scalecurve', term: 'Scale (experience) curve', def: r`Cost per unit plotted against scale, fit with a power function \(ATC = A\cdot Q^{b}\). Slope = \(2^b\) (the multiplier per doubling of scale). Scale data come from 10-K Item 7 (MD&A); costs come from Item 8.`, src: 'S06 workbook steps 3-5; CQ3 Q10' },
    { id: 's06-t-stuck', term: 'Stuck in the middle', def: 'Neither the low-cost leader nor clearly differentiated: middle prices, overhead near the differentiator’s, thin margins (Safeway FY2014, 1.5% operating margin).', src: 'S06 slides p.7' },
  ],
  mathIntro: r`Everything starts from one cost function. Read FC off the constant, VC off the Q terms, divide by Q for averages, and differentiate for MC. [[S06 Video Slides pp.14-21]]`,
  formulas: [
    { id: 's06-f-tc', name: 'Total cost', latex: r`C(Q) = FC + VC(Q)`, vars: [[r`FC`, 'constant term'], [r`VC(Q)`, 'terms with Q']], words: 'Split the cost function into the part that varies with output and the part that doesn’t.', src: 'S06 Video Slides p.12' },
    { id: 's06-f-avg', name: 'Average costs', latex: r`AFC = \frac{FC}{Q},\quad AVC = \frac{VC(Q)}{Q},\quad ATC = AFC + AVC`, vars: [[r`Q`, 'quantity produced']], words: 'Per-unit versions of each cost.', src: 'S06 Video Slides pp.17-19' },
    { id: 's06-f-mc', name: 'Marginal cost', latex: r`MC = \frac{\Delta C}{\Delta Q} = \frac{dC}{dQ}`, vars: [[r`dC/dQ`, 'derivative of total cost (power rule)']], words: 'The cost of the next unit; fixed cost drops out when you differentiate.', src: 'S06 Video Slides p.20' },
    { id: 's06-f-mcmin', name: 'Minimum of MC (or ATC)', latex: r`\frac{dMC}{dQ} = 0`, vars: [[r`dMC/dQ`, 'second derivative of C']], words: 'Same three-step optimization as S05, applied to the MC (or ATC) function.', src: 'CQ3 Q5; Math Review p.8' },
    { id: 's06-f-scale', name: 'Scale curve', latex: r`ATC = A\,Q^{b},\qquad \text{doubling: } \times 2^{b},\qquad Q_{target} = \left(\frac{A}{ATC_{target}}\right)^{1/(-b)}`, vars: [[r`b`, 'scale exponent (negative = economies of scale)'], [r`2^b`, '“slope” of the curve, e.g., 0.67 = 67% curve']], words: 'Each doubling of scale multiplies unit cost by 2^b; invert the curve to find the volume needed for a target cost.', src: 'S06 workbook, Solution!C75:E84' },
    { id: 's06-f-dupont', name: 'Return ratios', latex: r`ROA = \underbrace{\tfrac{NI}{Rev}}_{ROS}\times\underbrace{\tfrac{Rev}{Assets}}_{AT},\quad ROE = ROA\times\underbrace{\tfrac{Assets}{Equity}}_{\text{leverage}}`, vars: [[r`ROS`, 'return on sales (margin)'], [r`AT`, 'asset turnover (volume)']], words: 'Low margin × high turnover can match high margin × low turnover; leverage inflates ROE.', src: 'S06 slides p.6' },
  ],
  examples: [
    {
      id: 's06-ex-grocers',
      title: 'Competing on cost: Whole Foods vs. Kroger vs. Safeway (FY2014)',
      setup: r`Which company competes via cost leadership? Differentiation? How do you know? [[S06 slides p.6]]

${gTable}`,
      steps: [
        { ask: 'Who is the cost leader?', show: '**Kroger.** After paying for groceries it keeps 21¢ of each sales dollar (Whole Foods 36¢), and it wins on volume: $3.50 of sales per $1 of assets vs. $2.50. [[S06 slides p.7]]' },
        { ask: 'Who differentiates?', show: '**Whole Foods.** Customers pay more, and that premium covers overhead of 29% of sales (Kroger 18%).' },
        { ask: 'And Safeway?', show: '**Stuck in the middle:** middle prices, overhead close to Whole Foods’, a 1.5% operating margin. Albertsons bought it a year later.' },
        { ask: 'Who was most successful?', show: '**Whole Foods:** best margins and ROA. Kroger’s higher ROE comes mostly from debt (leverage 5.6).' },
      ],
      takeaway: 'Margins signal willingness to pay; turnover signals a volume/cost model; decompose ROE before praising it.',
      src: 'S06 slides pp.6-7',
    },
    {
      id: 's06-ex-jdawgs',
      title: 'J. Dawgs (one grill): every cost measure at Q = 100',
      setup: r`\(C(Q) = 0.00002Q^3 - 0.005Q^2 + 0.8Q + 8\). [[S06 Video Slides p.14]]`,
      steps: [
        { ask: 'FC and VC?', show: r`FC = 8. \(VC(100) = 20 - 50 + 80 = \$${tex(j1.VC, 0)}\). [[S06 Video Slides p.15]]` },
        { ask: 'Total cost?', show: r`\(C = 8 + 50 = \$${tex(j1.TC, 0)}\). (The video slide prints “8 + 58 = $58,” a typo; it’s 8 + 50.) [[S06 Video Slides p.16]]` },
        { ask: 'AFC, AVC, ATC?', show: r`\(AFC = 8/100 = \$${tex(j1.AFC, 2)}\); \(AVC = 50/100 = \$${tex(j1.AVC, 2)}\); \(ATC = \$${tex(j1.ATC, 2)}\). [[S06 Video Slides pp.17-19]]` },
        { ask: 'MC?', show: r`\(MC = 0.00006Q^2 - 0.01Q + 0.8\) → \(0.6 - 1 + 0.8 = \$${tex(j1.MC, 2)}\). [[S06 Video Slides p.21]]` },
      ],
      takeaway: 'Constant → FC; Q-terms → VC; ÷Q → averages; d/dQ → MC.',
      src: 'S06 Video Slides pp.14-21',
    },
    {
      id: 's06-ex-jdawgs2',
      title: 'CQ3: J. Dawgs with two grills at Q = 400',
      setup: r`\(C = 0.000002Q^3 - 0.0005Q^2 + 0.25Q + 16\). [[CQ3 Q1]]`,
      steps: [
        { ask: 'AFC and VC?', show: r`\(AFC = 16/400 = \$${tex(j2.AFC, 2)}\); \(VC = 128 - 80 + 100 = \$${tex(j2.VC, 0)}\). [[CQ3 Q1-Q2]]` },
        { ask: 'AVC and MC?', show: r`\(AVC = 148/400 = \$${tex(j2.AVC, 2)}\); \(MC = 0.000006Q^2 - 0.001Q + 0.25 = 0.96 - 0.40 + 0.25 = \$${tex(j2.MC, 2)}\). [[CQ3 Q3-Q4]]` },
        { ask: 'Where is MC minimized?', show: r`\(dMC/dQ = 0.000012Q - 0.001 = 0\) → \(Q = 83.3\) ≈ **83**. [[CQ3 Q5]]` },
        { ask: 'Why buy the second grill?', show: 'Short run vs. long run: in the long run you choose capital too. With two grills the short-run ATC minimum sits lower and further right, so the firm moves along its long-run average cost curve. [[S06 Video Slides pp.26-30]]' },
      ],
      takeaway: 'Same recipe, more zeros. Be careful with the decimal places.',
      src: 'CQ3 Q1-Q5',
    },
    {
      id: 's06-ex-guest',
      title: 'Guest-Tek: estimate the cost curves and judge the $0.10 price',
      setup: r`Eleven quarters of Guest-Tek financials (2004-Q3 to 2007-Q1), costs in $000s, rooms installed 83,209 → 520,201. In early 2007 Guest-Tek offered hotels HSIA for **$0.10 per room per day**. iBahn was earning ~$0.65. [[HSIA Wars case p.1]] [[S06 workbook]]`,
      steps: [
        { ask: 'Step 1: fit total cost vs. rooms (power function).', show: r`\(TC(\$000s) = 37.8335\cdot Rooms^{0.4295}\). [[S06 workbook, Solution!C91]]` },
        { ask: 'Step 2: cost per room per day (CPRPD).', show: r`\(CPRPD = \dfrac{TC\times1{,}000}{Rooms\times365/4}\). 2004-Q3: $0.72 → 2007-Q1: $0.21. [[S06 workbook, Solution!G37:G47]]` },
        { ask: 'Step 3: scale curve.', show: r`\(CPRPD = 414.6136\cdot Rooms^{-0.5705}\). [[S06 workbook, Solution!D75]]` },
        { ask: 'Step 4: rooms needed for $0.15 CPRPD?', show: r`\(Rooms = (414.6136/0.15)^{1/0.5705} \approx 1{,}077{,}753\). [[S06 workbook, Solution!C76]]` },
        { ask: 'Step 5: % change if output doubles again?', show: r`\(2^{-0.5705} - 1 = -32.7\%\). [[S06 workbook, Solution!E83]]` },
        { ask: 'Step 6: marginal cost per room per day at ~500k rooms?', show: r`\(MC = 0.4295\times37.8335\times R^{-0.5705}\times1{,}000/91.25\) → $0.25 at 100k rooms, **$0.10 at 500k**. [[S06 workbook, Solution!F91:F107]]` },
        { ask: 'Can they afford $0.10? Should they?', show: 'They can, on a marginal basis: MC ≈ $0.10 at current volume, a volume imperative. But three key issues: (1) are they really the low-cost producer, or is the rival differentiated? (2) can they offer the low price only to new customers? (3) to cover fixed costs at $0.10 they need ~2.2M rooms, about 88% of the 2.5M select-service rooms. Post-case: the rival (iBahn) had a quality differentiator and scope economies, so Guest-Tek risked a price war it couldn’t win. [[S06 workbook, Solution!A112-A153]]' },
      ],
      takeaway: 'Steep scale curve → volume imperative. But marginal-cost pricing only works if you’re truly lowest-cost and the rival isn’t differentiated.',
      src: 'S06 workbook Solution tab; HSIA Wars case',
    },
    {
      id: 's06-ex-netflix',
      title: 'Same job, different cost: Netflix vs. Redbox (Cost Advantage assignment)',
      setup: r`Netflix (streaming) and Redbox (kiosks) both do the entertainment job. The professor's debrief chart shows their marginal cost per entertainment hour (MCPEH) from 2012 to 2016. [[S07 slides p.5]]`,
      steps: [
        { ask: 'Who has the cost advantage?', show: 'Netflix: about $0.10 per hour vs. Redbox about $0.52 → $0.65, and the gap widens. [[S07 slides p.5]]' },
        { ask: 'Source?', show: 'A different business model (no discs or kiosks; content cost spread over ~137 viewing hours per subscriber per quarter vs. 2 hours per rental) plus scale.' },
        { ask: 'Why did Redbox’s unit cost rise?', show: r`“Scale economies work in reverse.” \(ATC = 656.06R^{-0.476}\), a ~72% curve. As rentals shrank, Redbox slid back *up* its steep curve. [[S07 slides p.6]]` },
        { ask: 'Your numbers (your Cost Advantage workbook):', show: 'Netflix CPSPM ≈ 38.10·S^−0.182 (−11.9% per doubling); breakeven at $7.99 ≈ 5.34M subscribers; MCPEH 2016-2 ≈ $0.096 vs. Redbox ≈ $0.65 (≈ 6.8×). [[your Cost Advantage, Part 1]]' },
      ],
      takeaway: 'The cost comparison only works once you convert to the same “job” unit (an entertainment hour).',
      src: 'S07 slides pp.5-6; your Cost Advantage workbook',
    },
  ],
  widgets: [
    {
      id: 'cost-curves',
      title: 'Cost curve explorer',
      intro: 'Start from the J. Dawgs cost functions. Change fixed cost and the variable-cost scale and watch AFC, AVC, ATC and MC respond. MC always passes through the minimums of AVC and ATC.',
      questions: [],
      numeric: [{ id: 's06-w1-atcmin', label: 'On the **two-grill** preset with F = 16, where (roughly) is ATC minimized? Read the orange dot.', part: { type: 'num', label: 'Q at ATC minimum', answer: atcMinTwoGrill(), tol: 0.03 }, hint: 'Move Q until MC equals ATC.', src: 'CQ3 Q7' }],
    },
    {
      id: 'scale-fitter',
      title: 'Scale curve fitter',
      intro: 'The professor’s method: plot unit cost against scale and add an Excel power trendline. Read the exponent as “% cost change per doubling.” Try Guest-Tek, Redbox and Netflix.',
      questions: [],
      numeric: [{ id: 's06-w2-redbox', label: 'With the **Redbox** data (all points), what % does unit cost change per doubling of rentals?', part: { type: 'num', label: '% change per doubling', answer: 2 ** -0.4756250678728674 - 1, kind: 'percent', tol: 0.02 }, hint: 'Compute 2^b − 1 using the fitted exponent.', src: 'your Cost Advantage, Part 1 step 5' }],
    },
  ],
  checkIds: ['s06-cq3-q7', 's06-cq3-q9', 's06-c-sources', 's06-c-kroger', 's06-cq3-q8', 's06-c-eos'],
  applyGenerators: ['s06-measures', 's06-mcmin', 's06-scale', 's06-dupont', 's06-cprpd'],
  traps: [
    { title: 'FC is the constant, and only the constant', body: 'In C = 0.000002Q³ − 0.0005Q² + 0.25Q + 16, FC = 16. All three Q terms are variable cost. [[CQ3 Q1-Q2]]', src: 'CQ3 Q1-Q2' },
    { title: 'MC ignores fixed cost', body: 'Differentiating wipes out the constant. Guest-Tek’s $0.10 MC doesn’t cover its fixed operating expenses. [[S06 workbook, Solution!A153]]', src: 'S06 workbook' },
    { title: 'Decimal places in cubic costs', body: '0.000002 × 400³ = 128, not 12.8. Count the zeros, then sanity-check (CQ3 offered $52, $308 and $324).', src: 'CQ3 Q2' },
    { title: 'AVC vs. MC', body: 'At Q = 400, AVC = $0.37 but MC = $0.81. Both are per-unit, but MC is the next unit while AVC is the average so far.', src: 'CQ3 Q3-Q4' },
    { title: 'Learning vs. scale', body: 'Learning = cumulative output over time (“practice makes perfect”). Scale = volume in a period.', src: 'CQ3 Q9' },
    { title: 'Units in CPRPD', body: 'Guest-Tek costs are in $000s and quarterly. Multiply by 1,000 and divide by rooms × 365/4.', src: 'S06 workbook step 2' },
    { title: 'Reading the scale exponent', body: 'b = −0.476 is not “−47.6%.” The doubling effect is 2^b − 1 = −28%.', src: 'S06 workbook step 5' },
    { title: 'ROE without decomposition', body: 'Kroger’s 31.8% ROE is mostly leverage (5.6×). Check ROS and asset turnover.', src: 'S06 slides p.7' },
  ],
  feynman: [
    {
      id: 's06-fey-1',
      prompt: 'Explain why the MC curve must cross the ATC curve at ATC’s minimum point.',
      model: 'ATC is an average, like a GPA. If the next unit costs less than the current average (MC < ATC), producing it pulls the average down. If it costs more (MC > ATC), it pulls the average up. So ATC falls while MC is below it and rises once MC is above it. The turning point, the minimum, is exactly where MC = ATC. The same logic applies to AVC.',
      rubric: ['Used an averaging intuition (e.g., GPA)', 'MC < ATC → ATC falls', 'MC > ATC → ATC rises', 'Concluded they meet at ATC’s minimum (same for AVC)'],
    },
    {
      id: 's06-fey-2',
      prompt: 'When does it make sense for a firm like Guest-Tek to price aggressively to grow? When is it dangerous?',
      model: 'If unit costs fall steeply with scale, volume is strategic: a lower price wins share, the extra volume moves you down the scale curve, and lower cost lets you keep the low price. Pricing near marginal cost can make sense if you really are the low-cost producer and the product is undifferentiated. It’s dangerous if a rival has a quality differentiator or other businesses to subsidize a price war (iBahn), if existing customers demand the lower price, or if the market isn’t big enough to cover your fixed costs at that price (Guest-Tek needed ~2.2M rooms, ~88% of the market).',
      rubric: ['Volume imperative from a steep scale curve', 'Price → share → lower unit cost loop', 'Conditions: lowest cost + undifferentiated', 'At least two risks (differentiated rival, existing customers, market size/fixed costs)'],
    },
  ],
  deeper: [
    { title: 'Production function behind the cost curve', kind: 'textbook', body: r`J. Dawgs with one grill: labor 0–9 produces 0, 10, 28, 54, 84, 116, 146, 172, 190, 200 hot dogs. That is **increasing marginal returns** first (each worker adds more) and then **diminishing marginal returns**. With capital at $8 and wages at $10, TC = 8 + 10L, so the cost curve is the production function flipped. That's why MC first falls and then rises. [[S06 Video Slides pp.4-11]]` },
    { title: 'Short-run curves and the long-run envelope', kind: 'derivation', body: r`Each grill count K gives its own short-run ATC (K = 1 minimum ≈ $0.55 near Q ≈ 140; K = 2 minimum ≈ $0.30 near Q ≈ 220 in the video's chart). The LRAC traces the lowest ATC available at each Q when you can pick K. It slopes down (economies of scale), then may turn up (diseconomies). [[S06 Video Slides pp.26-30]]` },
    { title: 'Building a scale curve with AI (and checking it)', kind: 'textbook', body: 'The course prompt for self-storage REITs asks for stores, net rentable square feet, property operating expense, and G&A from each 10-K, with a source for every number and “not reported” instead of estimates. “AI tools make mistakes. Always check the numbers against the original 10-K filings.” [[Watch: Finding Data to Construct Scale and Experience Curves Using AI page]]' },
    { title: 'In a case interview: unit economics and scale', kind: 'case-interview', body: 'Profitability cases start with profit = revenue − cost, then split cost into fixed and variable. If fixed costs dominate, ask whether the client is at efficient scale and what volume breaks even: breakeven Q = FC / (P − AVC). A scale curve (cost per unit vs. volume) tells you whether merging or growing would cut costs. Quote the doubling rule: “a 70% curve means each doubling cuts unit cost 30%.”' },
  ],
  summary: r`**Generic strategies:** cost leadership (Kroger: low margin, high turnover) vs. differentiation (Whole Foods: 36¢ gross margin, 29% overhead); Safeway stuck in the middle. [[S06 slides pp.6-7]]

- **Sources of cost advantage:** scale and scope; learning and experience; proprietary knowledge; input costs; different business model. [[S06 slides p.8]]
- **Costs:** FC = constant; VC = Q terms; AFC = FC/Q; AVC = VC/Q; ATC = AFC + AVC; MC = dC/dQ (no FC). MC crosses AVC and ATC at their minimums. [[S06 Video Slides pp.14-21]] [[CQ3 Q7]]
- **J. Dawgs Q = 100:** VC 50, C 58, AFC 0.08, AVC 0.50, ATC 0.58, MC 0.40. **CQ3 Q = 400:** AFC 0.04, VC 148, AVC 0.37, MC 0.81; MC min at Q ≈ 83.
- **Economies of scale:** LRAC falls as output rises. Short run: capital fixed. Long run: all costs variable. [[S06 Video Slides pp.27-29]]
- **Scale curve:** \(ATC = AQ^b\), doubling × \(2^b\). Guest-Tek \(414.6\,R^{-0.5705}\) (−33%/doubling); Redbox \(656.06\,R^{-0.476}\) (−28%; works in reverse). [[S06 workbook]] [[S07 slides p.6]]
- **When to grow:** steep scale curve → volume imperative (price aggressively → share → lower cost). But check differentiation, existing customers, and market size (Guest-Tek). [[S06 workbook, Solution!A118-A153]]`,
}

function atcMinTwoGrill() {
  let best = 1
  let bestV = Infinity
  for (let q = 1; q <= 500; q += 0.25) {
    const v = costAt(0.000002, -0.0005, 0.25, 16, q).ATC
    if (v < bestV) (bestV = v), (best = q)
  }
  return best
}
