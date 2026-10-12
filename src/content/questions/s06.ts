import type { Mcq } from '../types'

const r = String.raw
const L1 = 'S06-LO1'
const L2 = 'S06-LO2'
const L3 = 'S06-LO3'
const S = 'S06' as const
const jd = r`A year after its founding, J-Dawgs decides to expand its facility to include two functioning grills. Suppose total cost as a function of the quantity of hot dogs produced can be represented by the following relationship: \(C = 0.000002Q^3 - 0.0005Q^2 + 0.25Q + 16\). `
const jd1 = (Q: number) => ({ vc: 0.00002 * Q ** 3 - 0.005 * Q ** 2 + 0.8 * Q, mc: 0.00006 * Q ** 2 - 0.01 * Q + 0.8 })

export const s06Mcqs: Mcq[] = [
  // ───────── CQ3 verbatim ─────────
  {
    id: 's06-cq3-q1', session: S, los: [L2], origin: 'cq', src: 'CQ3 Q1', screen: 'examples',
    stem: jd + 'What is the average fixed cost (AFC) of producing 400 hot dogs?',
    options: [
      { text: '$0.04', why: 'Correct. FC = 16 (the constant); AFC = 16/400 = $0.04. [[CQ3 Q1]]' },
      { text: '$0.10', why: 'Not FC/Q.' },
      { text: '$0.16', why: 'Divided 16 by 100 instead of 400.' },
      { text: '$0.40', why: 'Off by a factor of 10.' },
    ],
    correct: 0,
  },
  {
    id: 's06-cq3-q2', session: S, los: [L2], origin: 'cq', src: 'CQ3 Q2', screen: 'examples',
    stem: jd + 'What is the variable cost (VC) of producing 400 hot dogs?',
    options: [
      { text: '$52', why: 'Arithmetic slip; VC = 128 − 80 + 100.' },
      { text: '$148', why: 'Correct. VC = 0.000002(400)³ − 0.0005(400)² + 0.25(400) = 128 − 80 + 100 = $148. [[CQ3 Q2]]' },
      { text: '$308', why: 'Added the Q² term instead of subtracting.' },
      { text: '$324', why: 'That adds both errors (and/or the fixed cost).' },
    ],
    correct: 1,
  },
  {
    id: 's06-cq3-q3', session: S, los: [L2], origin: 'cq', src: 'CQ3 Q3', screen: 'examples',
    stem: jd + 'What is the average variable cost (AVC) of producing 400 hot dogs?',
    options: [
      { text: '$0.37', why: 'Correct. AVC = VC/Q = 148/400 = $0.37. [[CQ3 Q3]]' },
      { text: '$0.77', why: 'That’s 308/400 (sign error in VC).' },
      { text: '$0.81', why: 'That’s MC at 400, not AVC.' },
      { text: '$1.81', why: 'Not a valid combination.' },
    ],
    correct: 0,
  },
  {
    id: 's06-cq3-q4', session: S, los: [L2], origin: 'cq', src: 'CQ3 Q4', screen: 'examples',
    stem: jd + 'What is the marginal cost (MC) of producing 400 hot dogs?',
    options: [
      { text: '$0.25', why: 'That’s just the linear coefficient — MC also depends on Q.' },
      { text: '$0.31', why: 'Arithmetic slip in the derivative.' },
      { text: '$0.67', why: 'Not the derivative at 400.' },
      { text: '$0.81', why: r`Correct. \(MC = 0.000006Q^2 - 0.001Q + 0.25\) → \(0.96 - 0.40 + 0.25 = 0.81\). [[CQ3 Q4]]` },
    ],
    correct: 3,
  },
  {
    id: 's06-cq3-q5', session: S, los: [L2], origin: 'cq', src: 'CQ3 Q5', screen: 'math',
    stem: jd + 'At what quantity (Q) is the marginal cost of producing one more hot dog minimized?',
    options: [
      { text: '9', why: 'Not where dMC/dQ = 0.' },
      { text: '42', why: 'That would be 0.0005/0.000012 — forgot the 2 from differentiating Q².' },
      { text: '83', why: 'Correct. dMC/dQ = 0.000012Q − 0.001 = 0 → Q ≈ 83.3. [[CQ3 Q5]]' },
      { text: '250', why: 'Not the minimum of MC.' },
    ],
    correct: 2,
  },
  {
    id: 's06-cq3-q6', session: S, los: [L2], origin: 'cq', src: 'CQ3 Q6', screen: 'terms',
    stem: 'Average total cost (ATC) and average variable cost (AVC) get closer together as output increases because _____.',
    options: [
      { text: 'the only difference between ATC and AVC is average fixed cost (AFC)', why: 'True — but incomplete on its own.' },
      { text: 'AFC gets closer to zero', why: 'True — but incomplete on its own.' },
      { text: 'Both of the above', why: 'Correct. ATC = AVC + AFC, and AFC = FC/Q shrinks toward zero as Q grows. [[CQ3 Q6]]' },
      { text: 'Neither of the above', why: 'Both statements are true.' },
    ],
    correct: 2,
  },
  {
    id: 's06-cq3-q7', session: S, los: [L2], origin: 'cq', src: 'CQ3 Q7', screen: 'widgets',
    stem: 'The marginal cost (MC) curve _____.',
    options: [
      { text: 'always lies below the average total cost (ATC) curve.', why: 'MC rises above ATC once ATC starts rising.' },
      { text: 'always lies above the average total cost (ATC) curve.', why: 'MC is below ATC while ATC is falling.' },
      { text: 'intersects the average total cost (ATC) curve and average variable cost (AVC) curve at their maximum points.', why: 'Minimum, not maximum.' },
      { text: 'intersects the average total cost (ATC) curve and average variable cost (AVC) curve at their minimum points.', why: 'Correct. When the next unit costs less than the average it pulls the average down; more than the average pulls it up — so MC crosses at the minimum. [[CQ3 Q7]]' },
    ],
    correct: 3,
  },
  {
    id: 's06-cq3-q8', session: S, los: [L3], origin: 'cq', src: 'CQ3 Q8', screen: 'why',
    stem: 'If costs per unit of production decrease with scale, why might a firm want to price its product aggressively (i.e., lower its price)?',
    options: [
      { text: 'Pricing aggressively can increase the market share of a product.', why: 'True, but only half the story.' },
      { text: 'Pricing aggressively can decrease the cost per unit of production.', why: 'True, but only half the story.' },
      { text: 'Both of the above', why: 'Correct. Lower price → more volume/share → further down the scale curve → lower unit cost → can keep price low. [[CQ3 Q8]]' },
      { text: 'Neither of the above', why: 'Both are the logic of a volume imperative (Guest-Tek).' },
    ],
    correct: 2,
  },
  {
    id: 's06-cq3-q9', session: S, los: [L1], origin: 'cq', src: 'CQ3 Q9', screen: 'terms',
    stem: '“Practice makes perfect” applies to which cost advantage?',
    options: [
      { text: 'Proprietary knowledge', why: 'That is know-how others don’t have, not practice-driven efficiency.' },
      { text: 'Economies of scale', why: 'Scale comes from volume in a given period, not cumulative practice.' },
      { text: 'Learning and experience', why: 'Correct. Costs fall with cumulative output over time. [[CQ3 Q9]]' },
      { text: 'A different business model', why: 'That is a different way of delivering the job (e.g., kiosks vs. stores).' },
    ],
    correct: 2,
  },
  {
    id: 's06-cq3-q10', session: S, los: [L1, L3], origin: 'cq', src: 'CQ3 Q10', screen: 'deeper',
    stem: 'Which section(s) of an annual report (10-K) likely contain(s) the information required to compute a scale curve?',
    options: [
      { text: 'Item 7 – “Management’s Discussion and Analysis of Financial Condition and Results of Operations”', why: 'Has the operational scale measures — but you also need costs.' },
      { text: 'Item 8 – “Financial Statements and Supplementary Data”', why: 'Has the expense data — but you also need scale.' },
      { text: 'Both of the above', why: 'Correct. Scale (stores, subscribers) from Item 7 MD&A; costs from Item 8 financial statements. [[CQ3 Q10]]' },
      { text: 'Neither of the above', why: 'Both are needed.' },
    ],
    correct: 2,
  },
  // ───────── Variants ─────────
  {
    id: 's06-v-jd1-afc', session: S, los: [L2], origin: 'cq-variant', src: 'Variant of CQ3 Q1-Q3 (S06 Video Slides pp.14-19)', screen: 'examples',
    stem: r`One-grill J. Dawgs: \(C(Q) = 0.00002Q^3 - 0.005Q^2 + 0.8Q + 8\). What is ATC at Q = 100?`,
    options: [
      { text: '$0.58', why: 'Correct. VC = 20 − 50 + 80 = $50; AVC = $0.50; AFC = 8/100 = $0.08; ATC = $0.58. [[S06 Video Slides p.19]]' },
      { text: '$0.50', why: 'That is AVC — add AFC.' },
      { text: '$0.40', why: 'That is MC at 100.' },
      { text: '$58', why: 'That is total cost, not per unit.' },
    ],
    correct: 0,
  },
  {
    id: 's06-v-jd1-mc', session: S, los: [L2], origin: 'cq-variant', src: 'Variant of CQ3 Q4 (S06 Video Slides p.21)', screen: 'examples',
    stem: r`One-grill J. Dawgs: \(C(Q) = 0.00002Q^3 - 0.005Q^2 + 0.8Q + 8\). Marginal cost at Q = 150?`,
    options: [
      { text: `$${jd1(150).mc.toFixed(2)}`, why: r`Correct. \(MC = 0.00006Q^2 - 0.01Q + 0.8\) → \(1.35 - 1.5 + 0.8 = 0.65\).` },
      { text: `$${(jd1(150).vc / 150).toFixed(2)}`, why: 'That is AVC at 150.' },
      { text: '$0.80', why: 'That’s MC at Q = 0 only.' },
      { text: `$${((jd1(150).vc + 8) / 150).toFixed(2)}`, why: 'That is ATC at 150.' },
    ],
    correct: 0,
  },
  {
    id: 's06-v-mcmin', session: S, los: [L2], origin: 'cq-variant', src: 'Variant of CQ3 Q5', screen: 'math',
    stem: r`For \(C(Q) = 0.00002Q^3 - 0.005Q^2 + 0.8Q + 8\), where is MC minimized?`,
    options: [
      { text: 'About 83', why: r`Correct. \(dMC/dQ = 0.00012Q - 0.01 = 0\) → \(Q = 83.3\). (Same answer as two grills, by coincidence of the coefficients.)` },
      { text: 'About 167', why: 'Off by a factor of 2 in the derivative: 0.01/0.00006. The derivative of 0.00006Q² is 0.00012Q.' },
      { text: '100', why: 'MC at 100 is 0.40, not its minimum.' },
      { text: '0', why: 'MC is falling at first.' },
    ],
    correct: 0,
  },
  {
    id: 's06-v-learning', session: S, los: [L1], origin: 'cq-variant', src: 'Variant of CQ3 Q9; S06 slides p.8', screen: 'terms',
    stem: 'Kroger buys groceries in such large volume that suppliers give it lower prices than small grocers get. Which source of cost advantage is that?',
    options: [
      { text: 'Input costs (enabled by scale)', why: 'Correct — cheaper inputs; purchasing power comes from size. [[S06 slides p.8]]' },
      { text: 'Learning and experience', why: 'That is efficiency from cumulative practice.' },
      { text: 'Proprietary knowledge', why: 'No secret know-how involved.' },
      { text: 'Different business model', why: 'Same model, cheaper inputs.' },
    ],
    correct: 0,
  },
  {
    id: 's06-v-model', session: S, los: [L1], origin: 'cq-variant', src: 'Variant of CQ3 Q9; S06 slides p.8; S07 slides p.5', screen: 'terms',
    stem: 'Netflix delivers an entertainment hour for about $0.10 of marginal cost while Redbox’s kiosks cost about $0.65. Netflix’s main advantage is best described as…',
    options: [
      { text: 'a different business model (streaming vs. physical discs/kiosks), plus scale', why: 'Correct — “same job, different cost.” [[S07 slides p.5]]' },
      { text: 'cheaper DVDs', why: 'Netflix streaming doesn’t use DVDs.' },
      { text: 'learning by doing at kiosks', why: 'Netflix doesn’t run kiosks.' },
      { text: 'diseconomies of scale at Netflix', why: 'Diseconomies would raise costs.' },
    ],
    correct: 0,
  },
  {
    id: 's06-v-10k', session: S, los: [L1], origin: 'cq-variant', src: 'Variant of CQ3 Q10', screen: 'deeper',
    stem: 'To build a scale curve for self-storage REITs, where would you find the number of stores and net rentable square feet?',
    options: [
      { text: 'Item 7 (MD&A) — the operating/scale measures', why: 'Correct. Costs come from Item 8. [[CQ3 Q10]]' },
      { text: 'Item 1A (Risk Factors)', why: 'That’s for PEST-type risks (S04).' },
      { text: 'The cover page', why: 'No.' },
      { text: 'Item 8 only', why: 'Item 8 has the expenses, not usually the operating measures.' },
    ],
    correct: 0,
  },
  // ───────── Course concepts ─────────
  {
    id: 's06-c-sources', session: S, los: [L1], origin: 'course', src: 'S06 slides p.8', screen: 'terms',
    stem: 'Which list matches the professor’s sources of cost advantage?',
    options: [
      { text: 'Economies of scale and scope; learning and experience; proprietary knowledge; input costs; different business model', why: 'Correct. [[S06 slides p.8]]' },
      { text: 'Brand, quality, service, innovation', why: 'Those sound like differentiation sources.' },
      { text: 'Rivalry, buyers, suppliers, entrants, substitutes', why: 'Those are the Five Forces.' },
      { text: 'Price, product, place, promotion', why: 'The marketing 4 Ps.' },
    ],
    correct: 0,
  },
  {
    id: 's06-c-kroger', session: S, los: [L1], origin: 'course', src: 'S06 slides pp.6-7', screen: 'examples',
    stem: 'FY2014: Kroger keeps 21¢ of each sales dollar after paying for groceries (Whole Foods 36¢) and generates $3.50 of sales per $1 of assets (Whole Foods $2.50). What does that say?',
    options: [
      { text: 'Kroger competes on cost and wins on volume; Whole Foods competes on differentiation', why: 'Correct. [[S06 slides p.7]]' },
      { text: 'Kroger competes on differentiation', why: 'A lower gross margin signals lower prices, not a premium.' },
      { text: 'Both are stuck in the middle', why: 'That was Safeway.' },
      { text: 'Whole Foods has the cost advantage', why: 'Its overhead is 29% of sales vs. Kroger’s 18%.' },
    ],
    correct: 0,
  },
  {
    id: 's06-c-safeway', session: S, los: [L1], origin: 'course', src: 'S06 slides p.7', screen: 'examples',
    stem: 'Why does the professor call Safeway “stuck in the middle”?',
    options: [
      { text: 'Its prices are in the middle, its overhead is close to Whole Foods’, and it earned only a 1.5% operating margin (Albertsons bought it a year later)', why: 'Correct. [[S06 slides p.7]]' },
      { text: 'It had the highest ROE', why: 'Kroger had the highest ROE (31.8%), mostly from debt.' },
      { text: 'It had the highest gross margin', why: 'Whole Foods did (35.5%).' },
      { text: 'It was the largest grocer', why: 'Kroger was far larger.' },
    ],
    correct: 0,
  },
  {
    id: 's06-c-roe', session: S, los: [L1], origin: 'course', src: 'S06 slides pp.6-7', screen: 'examples',
    stem: 'Kroger’s ROE (31.8%) beats Whole Foods’ (15.2%), yet the professor calls Whole Foods the most successful in 2014. Why?',
    options: [
      { text: 'Whole Foods has the best margins and ROA; Kroger’s higher ROE comes mostly from debt (leverage 5.6 vs. 1.5)', why: 'Correct. ROE = ROA × leverage. [[S06 slides p.7]]' },
      { text: 'ROE doesn’t matter for grocers', why: 'It matters; it just needs decomposing.' },
      { text: 'Whole Foods has higher revenue', why: 'Kroger’s revenue is ~7.6× larger.' },
      { text: 'Kroger lost money', why: 'Kroger earned $1,728M.' },
    ],
    correct: 0,
  },
  {
    id: 's06-c-mcdef', session: S, los: [L2], origin: 'course', src: 'S06 Video Slides p.20', screen: 'terms',
    stem: 'Conceptually, marginal cost is…',
    options: [
      { text: 'the cost of producing an additional unit of output (ΔC/ΔQ = dC/dQ)', why: 'Correct. [[S06 Video Slides p.20]]' },
      { text: 'total cost divided by quantity', why: 'That is ATC.' },
      { text: 'the fixed cost per unit', why: 'That is AFC.' },
      { text: 'the minimum of the ATC curve', why: 'MC crosses ATC there, but that’s not its definition.' },
    ],
    correct: 0,
  },
  {
    id: 's06-c-mcfixed', session: S, los: [L2], origin: 'course', src: 'S06 workbook, Solution!A153', screen: 'traps',
    stem: 'Why does Guest-Tek’s marginal cost per room per day ignore its fixed operating expenses?',
    options: [
      { text: 'Marginal cost is only the variable cost of the last unit — fixed costs don’t change when one more room is added', why: 'Correct — “marginal costs do NOT include fixed costs.” [[S06 workbook, Solution!A153]]' },
      { text: 'Because Guest-Tek has no fixed costs', why: 'It has $3–4M per quarter of operating expenses.' },
      { text: 'Because fixed costs are in a different currency', why: 'No.' },
      { text: 'It’s a mistake in the solution', why: 'It’s the definition of marginal cost.' },
    ],
    correct: 0,
  },
  {
    id: 's06-c-srlr', session: S, los: [L2], origin: 'course', src: 'S06 Video Slides p.27', screen: 'terms',
    stem: 'In the long run…',
    options: [
      { text: 'all costs are variable — a manager can buy more grills or build more locations', why: 'Correct. In the short run, capital (grills) is fixed. [[S06 Video Slides p.27]]' },
      { text: 'all costs are fixed', why: 'Reversed.' },
      { text: 'labor is fixed but capital is variable', why: 'Short run usually holds capital fixed; long run frees everything.' },
      { text: 'marginal cost is zero', why: 'No.' },
    ],
    correct: 0,
  },
  {
    id: 's06-c-eos', session: S, los: [L2], origin: 'course', src: 'S06 Video Slides p.29', screen: 'terms',
    stem: 'Economies of scale exist when…',
    options: [
      { text: 'long-run average costs decline as output is increased', why: 'Correct. Diseconomies: LRAC rises with output. [[S06 Video Slides p.29]]' },
      { text: 'marginal cost is constant', why: 'Not the definition.' },
      { text: 'a firm produces several products', why: 'That relates to economies of scope.' },
      { text: 'total cost falls as output rises', why: 'Total cost rarely falls; average cost does.' },
    ],
    correct: 0,
  },
  {
    id: 's06-c-lrac', session: S, los: [L2], origin: 'course', src: 'S06 Video Slides p.29', screen: 'terms',
    stem: 'The long-run average cost (LRAC) curve…',
    options: [
      { text: 'defines the minimum average cost of producing each output level, allowing optimal choice of fixed and variable inputs', why: 'Correct — it envelopes the short-run ATC curves (one grill, two grills…). [[S06 Video Slides p.29]]' },
      { text: 'is the same as the short-run MC curve', why: 'No.' },
      { text: 'always slopes upward', why: 'It slopes down where there are economies of scale.' },
      { text: 'ignores capital', why: 'It lets capital vary.' },
    ],
    correct: 0,
  },
  {
    id: 's06-c-grow', session: S, los: [L3], origin: 'course', src: 'S06 workbook, Solution!A118', screen: 'examples',
    stem: 'Guest-Tek’s unit cost falls steeply with rooms installed. What strategic implication does the S06 solution draw?',
    options: [
      { text: 'There is a volume imperative — acquire as many rooms as possible, e.g., by pricing near marginal cost', why: 'Correct. [[S06 workbook, Solution!A118]]' },
      { text: 'Guest-Tek should shrink to cut costs', why: 'Scale economies work in reverse — shrinking raises unit cost.' },
      { text: 'Price is irrelevant', why: 'Price is the lever for volume.' },
      { text: 'Guest-Tek should exit HSIA', why: 'Not the solution’s conclusion.' },
    ],
    correct: 0,
  },
  {
    id: 's06-c-risks', session: S, los: [L3], origin: 'course', src: 'S06 workbook, Solution!A146-A153', screen: 'examples',
    stem: 'Which is NOT one of the S06 solution’s three key issues for Guest-Tek’s $0.10 price?',
    options: [
      { text: 'Whether its hotel rooms have enough bandwidth', why: 'Correct — not one of the three. The three: low-cost producer or differentiated? can it charge the low price only to new customers? is the industry big enough (2.2M rooms ≈ 88% of 2.5M) to cover fixed costs?' },
      { text: 'Are they the low-cost producer, or do they have a differentiated product?', why: 'This IS key issue 1.' },
      { text: 'Can they charge the lower price only to new customers?', why: 'This IS key issue 2.' },
      { text: 'Is the industry big enough to cover fixed costs at this price?', why: 'This IS key issue 3.' },
    ],
    correct: 0,
  },
  {
    id: 's06-c-postnote', session: S, los: [L3], origin: 'course', src: 'S06 workbook, Solution!A135', screen: 'deeper',
    stem: 'According to the post-case note, why did Guest-Tek’s aggressive pricing backfire?',
    options: [
      { text: 'Its main competitor had a quality differentiator and other businesses (scope economies) that let it match $0.10 and make it up elsewhere', why: 'Correct — Guest-Tek misread differentiation and the competitor’s business model. [[S06 workbook, Solution!A135]]' },
      { text: 'Its marginal cost was actually $0.65', why: 'Its MC was at or below $0.10.' },
      { text: 'Hotels refused all fixed-price contracts', why: 'Not the story.' },
      { text: 'Regulators banned the price', why: 'No.' },
    ],
    correct: 0,
  },
  {
    id: 's06-c-reverse', session: S, los: [L3], origin: 'course', src: 'S07 slides p.6', screen: 'deeper',
    stem: '“Scale economies work in reverse”: Redbox’s ATC = 656.06R^−0.476. What happened as rentals fell 2012–2016?',
    options: [
      { text: 'It moved back up its steep scale curve, so cost per rental rose (~28% per halving)', why: 'Correct. A steep curve helps when growing and hurts when shrinking. [[S07 slides p.6]]' },
      { text: 'Cost per rental fell', why: 'Lower volume → higher unit cost on a downward-sloping scale curve.' },
      { text: 'Nothing, because its costs are all variable', why: 'The steep curve shows large fixed costs.' },
      { text: 'Its scale curve became flat', why: 'The curve didn’t change; Redbox slid along it.' },
    ],
    correct: 0,
  },
  {
    id: 's06-c-slope', session: S, los: [L2, L3], origin: 'course', src: 'your Cost Advantage, Part 1 step 5; S06 workbook, Solution!E83', screen: 'math',
    stem: r`A scale curve \(ATC = A\cdot Q^{-0.476}\). By what % does unit cost change each time output doubles?`,
    options: [
      { text: 'About −28%', why: r`Correct. \(2^{-0.476} = 0.719\) → −28.1% per doubling (a ~72% curve).` },
      { text: '−47.6%', why: 'The exponent isn’t the % change; compute 2^b − 1.' },
      { text: '−0.476%', why: 'No.' },
      { text: '+28%', why: 'A negative exponent means cost falls.' },
    ],
    correct: 0,
  },
]
