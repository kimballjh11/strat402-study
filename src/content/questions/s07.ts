import type { Mcq } from '../types'

const r = String.raw
const L1 = 'S07-LO1'
const L2 = 'S07-LO2'
const L3 = 'S07-LO3'
const L4 = 'S07-LO4'
const L5 = 'S07-LO5'
const S = 'S07' as const
const cq = r`Suppose the demand for a particular good x can be represented by the following function: \(Q_x = 10{,}000 - 4P_x + 5P_y - 0.2I\), where \(Q_x\) is the quantity demanded of good x, \(P_x\) is the price of good x, \(P_y\) is the price of some other related good, and \(I\) is the average income of the target population. Research also shows that the average price of good y is \(P_y = \$100\) and the average income of the target population is $30,000. `
const dp = r`Suppose the demand curve for Dr Pepper on BYU campus can be represented by the following function: \(Q_{DP} = 30{,}000 - 20{,}000P_{DP}\). `

export const s07Mcqs: Mcq[] = [
  // ───────── CQ4 Q1–Q4, Q7 verbatim ─────────
  {
    id: 's07-cq4-q1', session: S, los: [L1], origin: 'cq', src: 'CQ4 Q1', screen: 'terms',
    stem: cq + 'Good y and good x are complements.',
    options: [
      { text: 'True', why: 'The coefficient on Py is +5 (positive), which means substitutes.' },
      { text: 'False', why: 'Correct. +5 on Py → substitute: when y gets pricier, people buy more x. [[CQ4 Q1]]' },
    ],
    correct: 1,
  },
  {
    id: 's07-cq4-q2', session: S, los: [L1], origin: 'cq', src: 'CQ4 Q2', screen: 'terms',
    stem: cq + 'Good x is a normal good.',
    options: [
      { text: 'True', why: 'A normal good has a positive income coefficient; here it is −0.2.' },
      { text: 'False', why: 'Correct. The income coefficient is negative (−0.2) → inferior good. [[CQ4 Q2]]' },
    ],
    correct: 1,
  },
  {
    id: 's07-cq4-q3', session: S, los: [L1], origin: 'cq', src: 'CQ4 Q3', screen: 'examples',
    stem: cq + 'Given the information above, what is the inverse demand function for good x?',
    options: [
      { text: r`Qx = 4,500 − 4Px`, why: 'That is the simplified *demand* function (Q on the left), not the inverse.' },
      { text: r`Qx = 10,000 − 4Px`, why: 'Forgot to plug in Py and I, and it isn’t inverted.' },
      { text: r`Px = 2,500 − 0.25Qx`, why: 'Inverted without plugging in Py and I first (10,000/4).' },
      { text: r`Px = 1,125 − 0.25Qx`, why: r`Correct. Plug in: \(Q_x = 10{,}000 + 500 - 6{,}000 - 4P_x = 4{,}500 - 4P_x\); solve: \(P_x = 1{,}125 - 0.25Q_x\). [[CQ4 Q3]]` },
    ],
    correct: 3,
  },
  {
    id: 's07-cq4-q4', session: S, los: [L4], origin: 'cq', src: 'CQ4 Q4', screen: 'examples',
    stem: dp + 'What is the total consumer surplus when the price of Dr Pepper is $1.00?',
    options: [
      { text: '$2,500', why: r`Correct. Choke price $1.50; Q = 10,000 at $1.00; CS = ½ × 10,000 × $0.50 = $2,500. [[CQ4 Q4]]` },
      { text: '$5,000', why: 'Forgot the ½ for the triangle.' },
      { text: '$10,000', why: 'That is revenue at $1.00 (10,000 × $1).' },
      { text: '$20,000', why: 'Not a meaningful area here.' },
    ],
    correct: 0,
  },
  {
    id: 's07-cq4-q7', session: S, los: [L3], origin: 'cq', src: 'CQ4 Q7', screen: 'examples',
    stem: dp + 'What is the revenue maximizing price?',
    options: [
      { text: '$0.50', why: 'Check dR/dP = 30,000 − 40,000(0.5) = 10,000 > 0, so revenue still rises with price.' },
      { text: '$0.75', why: r`Correct. \(R = 30{,}000P - 20{,}000P^2\); \(dR/dP = 30{,}000 - 40{,}000P = 0\) → \(P = 0.75\). [[CQ4 Q7]]` },
      { text: '$1.00', why: 'At $1.00 demand is elastic (OPE −2); a lower price raises revenue.' },
      { text: '$1.50', why: 'That is the choke price, where quantity (and revenue) is zero.' },
    ],
    correct: 1,
  },
  // ───────── Variants ─────────
  {
    id: 's07-v-sub', session: S, los: [L1], origin: 'cq-variant', src: 'Variant of CQ4 Q1', screen: 'terms',
    stem: r`\(Q_x = 800 - 3P_x - 2P_y + 0.01I\). Good y is a ___ and good x is a ___ good.`,
    options: [
      { text: 'complement; normal', why: 'Correct. −2 on Py → complement; +0.01 on I → normal.' },
      { text: 'substitute; normal', why: 'A negative Py coefficient means complement.' },
      { text: 'complement; inferior', why: 'The income coefficient is positive → normal.' },
      { text: 'substitute; inferior', why: 'Both signs read backwards.' },
    ],
    correct: 0,
  },
  {
    id: 's07-v-inverse', session: S, los: [L1], origin: 'cq-variant', src: 'Variant of CQ4 Q3', screen: 'examples',
    stem: r`\(Q_x = 6{,}000 - 5P_x + 2P_y - 0.1I\), with \(P_y = 50\) and \(I = 40{,}000\). Inverse demand?`,
    options: [
      { text: r`\(P_x = 420 - 0.2Q_x\)`, why: r`Correct. \(6{,}000 + 100 - 4{,}000 = 2{,}100\) → \(Q_x = 2{,}100 - 5P_x\) → \(P_x = 420 - 0.2Q_x\).` },
      { text: r`\(Q_x = 2{,}100 - 5P_x\)`, why: 'That is the demand function, not the inverse.' },
      { text: r`\(P_x = 1{,}200 - 0.2Q_x\)`, why: 'Inverted before plugging in Py and I.' },
      { text: r`\(P_x = 2{,}100 - 5Q_x\)`, why: 'Swapped P and Q without dividing.' },
    ],
    correct: 0,
  },
  {
    id: 's07-v-cs', session: S, los: [L4], origin: 'cq-variant', src: 'Variant of CQ4 Q4', screen: 'examples',
    stem: r`Same Dr Pepper demand, \(Q = 30{,}000 - 20{,}000P\). What is consumer surplus at $0.75?`,
    options: [
      { text: '$5,625', why: 'Correct. Q = 15,000; height = $1.50 − $0.75 = $0.75; CS = ½ × 15,000 × 0.75 = $5,625.' },
      { text: '$11,250', why: 'That is revenue at $0.75 (or CS without the ½).' },
      { text: '$2,500', why: 'That is CS at $1.00.' },
      { text: '$22,500', why: 'Used the full $1.50 height.' },
    ],
    correct: 0,
  },
  {
    id: 's07-v-revmax', session: S, los: [L3], origin: 'cq-variant', src: 'Variant of CQ4 Q7; S05 Optional Practice', screen: 'examples',
    stem: r`Season passes at Sundance: \(Q = 6{,}000 - 12P\). Revenue-maximizing price?`,
    options: [
      { text: '$250', why: r`Correct. \(dR/dP = 6{,}000 - 24P = 0\) → $250. [[S05 Optional Practice p.4]]` },
      { text: '$500', why: 'That is the choke price (6,000/12).' },
      { text: '$125', why: 'Divided by 48 instead of 24.' },
      { text: '$3,000', why: 'That is the revenue-maximizing *quantity*.' },
    ],
    correct: 0,
  },
  {
    id: 's07-v-redbox', session: S, los: [L3], origin: 'course', src: 'S07 slides p.30', screen: 'examples',
    stem: r`Using Redbox’s demand \(Q = -3{,}728P + 8{,}845\) (rentals per kiosk), the revenue-maximizing price is about…`,
    options: [
      { text: '$1.19', why: r`Correct. \(dR/dP = 8{,}845 - 7{,}456P = 0\) → \(P \approx 1.19\). [[S07 slides p.30]]` },
      { text: '$2.37', why: 'That is the choke price (8,845/3,728).' },
      { text: '$1.50', why: 'That was Redbox’s later price — above the 2011 revenue-max price.' },
      { text: '$1.00', why: 'Demand was inelastic at $1.00, so revenue rises above it.' },
    ],
    correct: 0,
  },
  // ───────── Course / concept ─────────
  {
    id: 's07-c-law', session: S, los: [L1], origin: 'course', src: 'S08 slides p.16', screen: 'terms',
    stem: 'The law of demand says…',
    options: [
      { text: 'price and quantity demanded move in opposite directions, all else equal', why: 'Correct — a % increase in price leads to a % decrease in quantity demanded. [[S08 slides p.16]]' },
      { text: 'demand always rises over time', why: 'That is about shifts, not the law of demand.' },
      { text: 'higher income raises demand', why: 'True only for normal goods; that is an income effect.' },
      { text: 'supply equals demand', why: 'That is market equilibrium.' },
    ],
    correct: 0,
  },
  {
    id: 's07-c-movement', session: S, los: [L1], origin: 'course', src: 'S07 slides p.15 (LO); S05 slides p.41', screen: 'widgets',
    stem: 'Which event causes a *change in quantity demanded* (a movement along the curve) rather than a shift in demand?',
    options: [
      { text: 'The good’s own price changes', why: 'Correct. Only the own price moves you along a given demand curve.' },
      { text: 'Consumer income changes', why: 'Income is a shifter.' },
      { text: 'The price of a substitute changes', why: 'Prices of related goods are shifters.' },
      { text: 'Advertising increases', why: 'Advertising/preferences shift demand.' },
    ],
    correct: 0,
  },
  {
    id: 's07-c-shifters', session: S, los: [L1], origin: 'course', src: 'S05 slides p.41; Math Review p.9', screen: 'terms',
    stem: 'When Apple forecasts iPhone sales, which factors does the professor list besides the iPhone’s own price?',
    options: [
      { text: 'Prices of related goods, income of the target market, advertising/consumer preferences, and population of the target market', why: 'Correct — the demand shifters. [[S05 slides p.41]]' },
      { text: 'Only Apple’s production costs', why: 'Costs affect supply, not demand.' },
      { text: 'Only the price of Samsung phones', why: 'That’s one related-good price among several shifters.' },
      { text: 'Apple’s stock price', why: 'Not a demand shifter.' },
    ],
    correct: 0,
  },
  {
    id: 's07-c-inferior', session: S, los: [L1], origin: 'course', src: 'CQ4 Q2 feedback', screen: 'terms',
    stem: 'For an inferior good, an increase in average income of the target population…',
    options: [
      { text: 'lowers the quantity demanded at every price (demand shifts left)', why: 'Correct. [[CQ4 Q2]]' },
      { text: 'raises demand', why: 'That is a normal good.' },
      { text: 'has no effect', why: 'Inferior goods do respond to income — negatively.' },
      { text: 'moves the firm along its demand curve', why: 'Income shifts the whole curve.' },
    ],
    correct: 0,
  },
  {
    id: 's07-c-complement', session: S, los: [L1], origin: 'course', src: 'S08 slides p.27', screen: 'terms',
    stem: 'Milk prices rise sharply. What happens to the demand curve for cereal?',
    options: [
      { text: 'Shifts left — milk and cereal are complements', why: 'Correct. [[S08 slides p.27]]' },
      { text: 'Shifts right — they are substitutes', why: 'They’re used together → complements.' },
      { text: 'Movement along the cereal demand curve', why: 'Cereal’s own price didn’t change.' },
      { text: 'No change', why: 'Related-good prices shift demand.' },
    ],
    correct: 0,
  },
  {
    id: 's07-c-inversedef', session: S, los: [L1], origin: 'course', src: 'CQ4 Q3 feedback', screen: 'terms',
    stem: 'What distinguishes an inverse demand function from a demand function?',
    options: [
      { text: 'The inverse demand function puts price on the left as a function of quantity', why: 'Correct. [[CQ4 Q3]]' },
      { text: 'It slopes upward', why: 'It still slopes down; it’s the same curve written the other way.' },
      { text: 'It includes income and related prices', why: 'Either form can include shifters.' },
      { text: 'It is the marginal revenue curve', why: 'MR is a different function (twice the slope).' },
    ],
    correct: 0,
  },
  {
    id: 's07-c-estimate', session: S, los: [L2], origin: 'course', src: 'S07 slides p.16', screen: 'intuition',
    stem: 'What are the professor’s three ways of estimating a demand curve?',
    options: [
      { text: 'Experimental trials (A/B tests), market surveys (Dr Pepper), and historical data (Redbox)', why: 'Correct. [[S07 slides p.16]]' },
      { text: 'Five Forces, PEST, and NAICS', why: 'Those are industry-analysis tools (S04).' },
      { text: 'HHI, C4, and ROIC', why: 'Concentration and profitability measures.' },
      { text: 'Only regression', why: 'Regression is one way to analyze historical data.' },
    ],
    correct: 0,
  },
  {
    id: 's07-c-survey', session: S, los: [L2], origin: 'course', src: 'S07 workbook', screen: 'widgets',
    stem: 'In the Dr Pepper vs. Mr. Pibb survey, how is quantity demanded at $0.75 computed from the responses?',
    options: [
      { text: 'Count everyone whose maximum willingness to pay is $0.75 or more (cumulative from the highest price down), then scale by the market-to-sample ratio', why: 'Correct — the workbook’s F column sums each price row plus all rows above it, and the market column multiplies by the ratio. [[S07 workbook, Dr Pepper!F7, H7]]' },
      { text: 'Count only people who chose exactly $0.75', why: 'People willing to pay more would also buy at $0.75.' },
      { text: 'Average the WTP answers', why: 'An average is one number, not a schedule.' },
      { text: 'Use the number of sections that took the survey', why: 'Sections are just groups of respondents.' },
    ],
    correct: 0,
  },
  {
    id: 's07-c-ab', session: S, los: [L2], origin: 'course', src: 'S07 slides pp.11-12', screen: 'deeper',
    stem: 'In the WSJ review of “Experimentation Works,” what did a tiny tweak to how Bing displayed ad headlines produce?',
    options: [
      { text: 'A 12% revenue increase — about $100 million a year in the U.S.', why: 'Correct. [[S07 slides p.11]]' },
      { text: 'A 12% drop in clicks', why: 'It increased revenue.' },
      { text: 'No measurable effect', why: 'The point was a huge effect from a small change.' },
      { text: '$1 billion in new users', why: 'Not the figure.' },
    ],
    correct: 0,
  },
  {
    id: 's07-c-booking', session: S, los: [L2], origin: 'course', src: 'S07 slides p.12', screen: 'deeper',
    stem: 'Why does the professor emphasize A/B testing? A Booking.com data scientist said that without experiments…',
    options: [
      { text: '“our predictions of how customers behave are wrong nine times out of ten”', why: 'Correct. Empiricism beats intuition about demand. [[S07 slides p.12]]' },
      { text: '“we would have no customers”', why: 'Not the quote.' },
      { text: '“prices would be too low”', why: 'Not the quote.' },
      { text: '“our costs would double”', why: 'Not the quote.' },
    ],
    correct: 0,
  },
  {
    id: 's07-c-cs-mean', session: S, los: [L4], origin: 'site', src: 'CQ4 Q4; General econ (B&P Ch 2)', screen: 'terms',
    stem: '[[GEN]] What does consumer surplus represent?',
    options: [
      { text: 'The value buyers receive above what they pay — the area under demand and above price', why: 'Correct. It is value the firm created but did not capture (S11 pricing strategies try to capture it).' },
      { text: 'The firm’s profit', why: 'Profit is producer-side.' },
      { text: 'Total revenue', why: 'Revenue is the rectangle P × Q, below price.' },
      { text: 'Unsold inventory', why: 'Not a surplus in this sense.' },
    ],
    correct: 0,
  },
  {
    id: 's07-c-cs-dir', session: S, los: [L4], origin: 'site', src: 'General econ; CQ4 Q4 setup', screen: 'widgets',
    stem: 'Dr Pepper lowers its price from $1.00 to $0.75 (Q = 30,000 − 20,000P). Consumer surplus…',
    options: [
      { text: 'rises from $2,500 to $5,625', why: 'Correct. Existing buyers pay less and new buyers enter.' },
      { text: 'falls', why: 'Lower prices raise CS.' },
      { text: 'stays at $2,500', why: 'The triangle gets bigger.' },
      { text: 'becomes negative', why: 'CS can’t be negative for voluntary buyers.' },
    ],
    correct: 0,
  },
  {
    id: 's07-c-redbox-150', session: S, los: [L3], origin: 'course', src: 'S07 slides p.31; Differentiation Advantage Part 1 step 8', screen: 'examples',
    stem: 'Using the 2011 Redbox demand (revenue-max ≈ $1.19), what would the model predict about the later move from $1.20 to $1.50?',
    options: [
      { text: 'Revenue per kiosk falls — $1.50 is on the elastic part of the 2011 curve', why: 'Correct for the 2011 curve. But the 2014 curve was less elastic (revenue-max ≈ $1.45), which is why “demand curves are dynamic” matters. [[S09 slides p.4]]' },
      { text: 'Revenue rises, because demand is always inelastic for Redbox', why: 'Elasticity changes along a linear curve; above ~$1.19 the 2011 curve is elastic.' },
      { text: 'Rentals per kiosk rise', why: 'Law of demand: quantity falls when price rises.' },
      { text: 'Nothing can be said without cost data', why: 'Revenue questions only need demand.' },
    ],
    correct: 0,
  },
  {
    id: 's07-c-trend', session: S, los: [L3], origin: 'course', src: 'S07 slides p.7', screen: 'deeper',
    stem: '“Look at the trend, not the snapshot”: Netflix’s total expense was 220% of revenue in 2001 but 93% by 2006 (Blockbuster: ~94–95%). The lesson for Blockbuster?',
    options: [
      { text: 'A money-losing snapshot hid a cost curve that was falling fast with scale', why: 'Correct — Blockbuster dismissed online rental as a niche (“not financially viable”), but the trend showed Netflix heading below break-even. [[S07 slides p.7]]' },
      { text: 'Netflix was never profitable', why: 'By 2006 its expenses were below revenue.' },
      { text: 'Blockbuster had a lower cost structure the whole time', why: 'Netflix ended lower (93% vs. 95%).' },
      { text: 'Snapshots are more reliable than trends', why: 'The opposite.' },
    ],
    correct: 0,
  },
  {
    id: 's07-c-wtp-margin', session: S, los: [L5], origin: 'course', src: 'S09 slides p.5', screen: 'deeper',
    stem: 'In the professor’s “Same Cost, Different Margin” chart (Netflix vs. Redbox, 2016-2), gross margin is labeled “willingness to pay” and operating expense is labeled “costs incurred.” Netflix has the higher gross margin (~41% vs ~30%) with similar operating expense. What does that suggest?',
    options: [
      { text: 'Netflix has a differentiation advantage — customers are willing to pay more relative to the cost of delivering it', why: 'Correct. Differentiation shows up as higher willingness to pay. [[S09 slides p.5]]' },
      { text: 'Redbox has a differentiation advantage', why: 'Redbox’s margin (WTP proxy) is lower.' },
      { text: 'The two companies are identical', why: 'Similar costs but different margins.' },
      { text: 'Netflix has a cost disadvantage', why: 'Operating expenses are similar, and Netflix had the lower marginal cost per hour (S07 slide p.5).' },
    ],
    correct: 0,
  },
  {
    id: 's07-c-diff-demand', session: S, los: [L5, L1], origin: 'site', src: 'General econ; S06 slides pp.6-7 (Whole Foods)', screen: 'deeper',
    stem: '[[GEN]] In demand terms, what does a successful differentiation strategy do?',
    options: [
      { text: 'Raises willingness to pay — shifts the firm’s demand right and makes it less price sensitive', why: 'Correct. Whole Foods’ customers “pay more, and that premium covers overhead” (S06 slides p.7).' },
      { text: 'Lowers the firm’s marginal cost', why: 'That is a cost advantage.' },
      { text: 'Moves the firm down its demand curve', why: 'A price cut does that; differentiation changes the curve itself.' },
      { text: 'Makes demand perfectly elastic', why: 'The opposite — differentiated products have fewer close substitutes.' },
    ],
    correct: 0,
  },
  {
    id: 's07-c-diff-wf', session: S, los: [L5], origin: 'course', src: 'S06 slides p.7', screen: 'deeper',
    stem: 'How does the professor show Whole Foods competes on differentiation (FY2014)?',
    options: [
      { text: 'It keeps 36¢ of each sales dollar after paying for groceries (vs. Kroger’s 21¢); customers pay a premium that covers 29% SG&A', why: 'Correct — higher gross margin = higher willingness to pay. [[S06 slides p.7]]' },
      { text: 'It has the highest asset turnover', why: 'Kroger has the higher asset turnover (3.5 vs. 2.5) — that’s a cost/volume signal.' },
      { text: 'It has the highest ROE', why: 'Kroger’s ROE is higher, mostly from debt.' },
      { text: 'It is stuck in the middle', why: 'That was Safeway.' },
    ],
    correct: 0,
  },
]
