import { num, tex } from '../../lib/format'
import { priceMaker, priceTaker } from '../generators/s10'
import type { SessionModule } from '../types'

const r = String.raw

// ── course numbers (computed) ──
const ads = { TR: [0, 90, 170, 240, 300, 350, 390, 420, 440, 450, 450], TC: [0, 10, 30, 60, 100, 150, 210, 280, 360, 450, 550] }
const adRows = ads.TR.map((tr, i) => {
  const mb = i ? tr - ads.TR[i - 1] : 0
  const mc = i ? ads.TC[i] - ads.TC[i - 1] : 0
  return `| ${i} | ${tr} | ${ads.TC[i]} | ${tr - ads.TC[i]} | ${i ? mb : ''} | ${i ? mc : 0} |`
}).join('\n')
const pc = priceTaker(40, 125, 0, 4)
const mono = priceMaker(100, 1, 125, 0, 4)
const cq = priceMaker(120, 2, 500, 0, 2)

export const s10: SessionModule = {
  id: 'S10',
  num: '10',
  title: 'Profit Maximization Across Market Structures',
  spine: 'value',
  minutes: 60,
  ready: true,
  takeaway: r`Every firm maximizes profit with one idea: **keep going until marginal benefit = marginal cost**. Price takers set \(P = MC\). Price makers set \(MR = MC\), then read price off demand.`,
  why: r`This is strategy question 2, **Unique Value to Offer**, turned into dollars. Your value proposition decides which market structure you're in. Commodity sellers are price takers. A differentiated brand gets some pricing power. A firm with no close rivals is a monopoly. The structure decides how much profit you can keep.

The professor's punchline: “Creating value isn't enough. You have to capture it… **The strategist's job: Avoid competition and move toward monopoly.**” [[S10 slides p.51]]

> This is the calculation-heaviest session on the midterm. CQ5 asked for Q*, P*, and a price-taker Q*, and the S10 in-class exercise solves one cost function under all three structures. Short answers will look exactly like that. [[CQ5 Q6]] [[S10 slides p.45]]`,
  intuition: r`**Marginal thinking is how you already decide everything.** Should you study one more hour? Drive one more mile for cheaper gas? Buy one more scoop of Blue Goggles at the Creamery? You do it while the extra benefit beats the extra cost. You stop when they're equal. [[S10 slides p.14]]

A firm does the same with output. Each extra unit brings in **marginal revenue (MR)** and costs **marginal cost (MC)**. Keep producing while MR > MC. Stop where MR = MC.

The only thing that changes across market structures is **what MR looks like**:

- **Price taker (perfect competition).** You can sell as much as you want at the market price, so every extra unit brings in exactly \(P\). \(MR = P\), and the rule becomes \(P = MC\).
- **Price maker (monopoly, monopolistic competition).** To sell one more unit you must lower the price on *all* your units. So MR is *less than* price, and on a straight-line demand curve MR falls twice as fast as demand. Set \(MR = MC\) to get \(Q^*\), then charge the highest price demand allows at \(Q^*\).

Then ask what happens **in the long run**. Profit attracts entrants unless something blocks them. That's why barriers to entry (S04) and sources of monopoly power matter.`,
  los: [
    { id: 'S10-LO1', text: 'Know and understand the following economic terms: marginal analysis, marginal benefit, marginal cost, marginal revenue, monopoly, monopolistic competition, perfectly competitive market', src: 'Canvas Session 10 module; S10 slides p.12' },
    { id: 'S10-LO2', text: 'Be able to identify when a firm operates in an industry that is perfectly competitive, monopolistically competitive, or a monopoly', src: 'Canvas Session 10 module; S10 slides p.13' },
    { id: 'S10-LO3', text: 'Be able to identify the sources of (and strategies for obtaining) monopoly power', src: 'Canvas Session 10 module; S10 slides p.13' },
    { id: 'S10-LO4', text: 'Know how to calculate the profit-maximizing levels of price and quantity for perfectly competitive, monopolistically competitive, and monopoly firms using marginal analysis', src: 'Canvas Session 10 module; S10 slides p.13' },
  ],
  terms: [
    { id: 's10-t-marginal', term: 'Marginal analysis', def: 'Deciding by comparing the benefit and cost of one more unit. Stop when the marginal benefit (MB) equals the marginal cost (MC): MB = MC.', src: 'S10 slides p.14' },
    { id: 's10-t-mb', term: 'Marginal benefit (MB)', def: 'The extra benefit (e.g., revenue) from one more unit — the change in total benefit.', src: 'S10 slides p.15 (table)' },
    { id: 's10-t-mc', term: 'Marginal cost (MC)', def: r`The extra cost of one more unit: \(MC = \Delta C/\Delta Q = dC/dQ\).`, src: 'S06 Video Slides p.20; S10 slides p.15' },
    { id: 's10-t-mr', term: 'Marginal revenue (MR)', def: r`The additional revenue collected when one additional unit of production or service is rendered: \(MR = dR/dQ\).`, src: 'S10 slides p.17' },
    { id: 's10-t-pc', term: 'Perfectly competitive market', def: 'Many firms; homogeneous goods (e.g., commodities); perfect information; no transaction costs; free entry and exit; firms are price takers. D_firm = P_market = MR.', src: 'S10 slides p.44' },
    { id: 's10-t-moncomp', term: 'Monopolistic competition', def: 'Many firms; differentiated goods (e.g., fast food); imperfect information; transaction costs; free entry and exit; firms are price makers facing their own downward-sloping demand.', src: 'S10 slides p.44' },
    { id: 's10-t-mono', term: 'Monopoly', def: 'One firm (e.g., a rural gas station); price maker; the firm’s demand is the market demand (D_firm = D_market).', src: 'S10 slides p.44' },
    { id: 's10-t-taker', term: 'Price taker vs. price maker', def: 'A price taker has no influence on price (perfect competition). A price maker chooses price from its downward-sloping demand (monopoly, monopolistic competition).', src: 'S10 slides p.44' },
    { id: 's10-t-power', term: 'Sources of monopoly power', def: 'Barriers that keep rivals out: economies of scale and scope, patents and other legal barriers, control of key inputs, network effects, high switching costs. These are the same barriers you rate under “threat of new entrants” in S04.', src: 'General econ (B&P Ch 8); S04 slides p.22', general: true },
  ],
  mathIntro: r`One recipe, three versions. Steps: (1) write revenue and cost; (2) take derivatives to get MR and MC (power rule from S05); (3) set the optimality condition; (4) solve for \(Q^*\); (5) get \(P^*\); (6) profit = R − C. [[S10 slides pp.46-48]]`,
  formulas: [
    { id: 's10-f-mbmc', name: 'Marginal analysis rule', latex: r`MB = MC`, vars: [[r`MB`, 'marginal benefit of one more unit'], [r`MC`, 'marginal cost of one more unit']], words: 'Keep doing more while the next unit adds more benefit than cost; stop where they are equal.', src: 'S10 slides p.14' },
    { id: 's10-f-mr', name: 'Marginal revenue', latex: r`MR = \frac{dR}{dQ},\quad P = a - bQ \Rightarrow R = aQ - bQ^2,\; MR = a - 2bQ`, vars: [[r`a`, 'demand intercept (choke price)'], [r`b`, 'slope of inverse demand']], words: 'For straight-line demand, MR has the same intercept and twice the slope.', src: 'S10 slides pp.17-19' },
    { id: 's10-f-pc', name: 'Price taker', latex: r`P_{market} = MC(Q^*),\quad P^* = P_{market}`, vars: [[r`P_{market}`, 'market price (= MR for a price taker)']], words: 'Produce until marginal cost rises to the market price.', src: 'S10 slides p.44' },
    { id: 's10-f-pm', name: 'Price maker', latex: r`MR(Q^*) = MC(Q^*),\quad P^* = P(Q^*)`, vars: [[r`P(Q^*)`, 'price read off the demand curve at Q*']], words: 'Find the quantity where MR = MC, then charge the most demand will pay for that quantity.', src: 'S10 slides p.44' },
    { id: 's10-f-profit', name: 'Profit', latex: r`\pi = R - C = P^*Q^* - C(Q^*) = (P^* - ATC)\,Q^*`, vars: [[r`ATC`, 'average total cost at Q*']], words: 'Revenue minus total cost (fixed cost included). On a graph it is the rectangle between price and ATC.', src: 'S10 slides pp.46-49' },
  ],
  examples: [
    {
      id: 's10-ex-ads',
      title: 'Advertising spend for a small business (MB = MC from a table)',
      setup: r`How many ads should the business buy? [[S10 slides p.15]]

| Ads | Total revenue | Total cost | Profit | MB | MC |
| --- | --- | --- | --- | --- | --- |
${adRows}`,
      steps: [
        { ask: 'How do you get MB and MC from the totals?', show: 'MB = change in total revenue; MC = change in total cost. The 1st ad: MB = 90 − 0 = 90, MC = 10 − 0 = 10.' },
        { ask: 'Where do MB and MC cross?', show: 'At the **5th ad**: MB = 50 = MC. The 6th ad has MB 40 < MC 60.' },
        { ask: 'Check with profit.', show: 'Profit peaks at **$200** (ads 4 and 5). Ads 6–10 lower profit, all the way to −$100 at 10 ads. Total revenue keeps rising until 9 ads, but that doesn’t matter.' },
      ],
      takeaway: 'Stop where MB = MC, not where total revenue is largest.',
      src: 'S10 slides p.15',
    },
    {
      id: 's10-ex-mr',
      title: 'Marginal revenue from P = 10 − Q',
      setup: r`Graph \(P = 10 - Q\) and determine MR \(= dR/dQ\). [[S10 slides p.17]]`,
      steps: [
        { ask: 'Write total revenue.', show: r`\(R = P\cdot Q = (10 - Q)Q = 10Q - Q^2\)` },
        { ask: 'Differentiate (power rule).', show: r`\(MR = 10 - 2Q\) — same intercept as demand, twice the slope. [[S10 slides p.19]]` },
        { ask: 'Where is revenue maximized?', show: r`\(MR = 0\) at \(Q = 5\) (P = 5), R = 25 — the top of the revenue hill. [[S10 slides p.18]]` },
      ],
      takeaway: 'MR lies below demand for a price maker because selling one more unit means cutting the price on every unit.',
      src: 'S10 slides pp.17-19',
    },
    {
      id: 's10-ex-table',
      title: 'Fill in the professor’s market-structure table',
      setup: 'Try to fill in each row for perfect competition | monopolistic competition | monopoly before revealing it. [[S10 slides p.44]]',
      steps: [
        { ask: 'Number of firms; type of goods; an example of each.', show: 'Many firms | Many firms | One firm. Homogeneous | Differentiated | N/A. **Commodities | Fast food | Rural gas station.**' },
        { ask: 'Perfect information? Transaction costs? Free entry/exit?', show: 'Yes, No, Yes | No, Yes, Yes | N/A, N/A, N/A.' },
        { ask: 'Firm’s influence on price; the firm’s demand curve.', show: r`No (price taker), \(D_{firm} = P_{market} = MR\) | Yes (price maker), \(D_{firm}\) | Yes (price maker), \(D_{firm} = D_{market}\).` },
        { ask: 'Profit-maximizing quantity and price.', show: r`\(P_{market} = MC(Q^*)\), \(P^* = P_{market}\) | \(MR(Q^*) = MC(Q^*)\), \(P^* = P(Q^*)\) | \(MR(Q^*) = MC(Q^*)\), \(P^* = P(Q^*)\).` },
      ],
      takeaway: 'Two rules cover all three: P = MC for price takers; MR = MC for price makers.',
      src: 'S10 slides p.44',
    },
    {
      id: 's10-ex-pc',
      title: 'In-class exercise, scenario 1: price taker at $40',
      setup: r`\(C(Q) = 125 + 4Q^2\). You are a price taker and other firms charge $40/unit. [[S10 slides p.45]]`,
      steps: [
        { ask: 'MR and MC?', show: r`\(MR = P = 40\); \(MC = 8Q\).` },
        { ask: 'Optimal output?', show: r`\(40 = 8Q\) → \(Q = ${pc.Q}\).` },
        { ask: 'Revenue, cost, profit?', show: r`\(R = 40\times5 = ${pc.R}\); \(C = 125 + 4(5)^2 = ${pc.C}\); profit \(= ${pc.profit}\). [[S10 slides p.46]]` },
        { ask: 'Strategic implication?', show: r`The firm will **continue to operate in the short run, but exit in the long run**. Revenue (${pc.R}) covers variable cost (${pc.C - 125}), so operating loses less than the 125 fixed cost it would lose by shutting down. [[S10 slides p.46]]` },
      ],
      takeaway: 'A short-run loss is not a reason to shut down, as long as price covers average variable cost.',
      src: 'S10 slides pp.45-46',
    },
    {
      id: 's10-ex-mono',
      title: 'Scenario 2: monopoly with P = 100 − Q',
      setup: r`Same cost \(C(Q) = 125 + 4Q^2\). You are a monopolist with inverse demand \(P = 100 - Q\). [[S10 slides p.47]]`,
      steps: [
        { ask: 'MR and MC?', show: r`\(MR = 100 - 2Q\); \(MC = 8Q\).` },
        { ask: 'Q*?', show: r`\(100 - 2Q = 8Q\) → \(Q^M = ${mono.Q}\).` },
        { ask: 'P*? (Careful which curve.)', show: r`From demand: \(P^M = 100 - 10 = ${mono.P}\). (MC at Q = 10 is only 80, but price comes from demand.)` },
        { ask: 'Profit and long-run outlook?', show: r`\(R = ${mono.R}\), \(C = 125 + 400 = ${mono.C}\), profit \(= ${mono.profit}\). The monopolist will not face entry, unless patents or other entry barriers are eliminated. [[S10 slides p.47]]` },
      ],
      takeaway: 'Q from MR = MC, P from demand, profit = R − C.',
      src: 'S10 slides p.47',
    },
    {
      id: 's10-ex-mc',
      title: 'Scenario 3: monopolistic competition — short run vs. long run',
      setup: r`Same cost; inverse demand for **your brand** is \(P = 100 - Q\). [[S10 slides p.48]]`,
      steps: [
        { ask: 'Short-run answer?', show: r`Identical to monopoly: Q = 10, P = 90, ATC = ${num(mono.atc, 1)}, profit = (90 − 52.5) × 10 = **$375**. [[S10 slides p.49]]` },
        { ask: 'What happens next?', show: 'Monopolistically competitive firms should expect other firms to imitate, so profits will decline with entry. [[S10 slides p.48]]' },
        { ask: 'Where does it end?', show: r`Your demand shifts left until it is **tangent to ATC**: in the professor’s graph \(P = 50 - Q\), with Q = 5 and \(P = ATC = 45\) (\(125/5 + 4\cdot5 = 45\)). Profit = (45 − 45) × 5 = **$0**. [[S10 slides p.49]]` },
      ],
      takeaway: 'Differentiation buys short-run profit; free entry competes it away. That’s why strategists want barriers.',
      src: 'S10 slides pp.48-49',
    },
    {
      id: 's10-ex-cq5',
      title: 'CQ5: monopoly with P = 120 − 2Q and C = 500 + 2Q²',
      setup: 'Your quiz question. Find Q*, P*, and profit. [[CQ5 Q6]]',
      steps: [
        { ask: 'MR and MC.', show: r`\(R = 120Q - 2Q^2\) → \(MR = 120 - 4Q\); \(MC = 4Q\).` },
        { ask: 'Q*.', show: r`\(120 - 4Q = 4Q\) → \(Q = ${cq.Q}\). [[CQ5 Q6]]` },
        { ask: 'P* and profit.', show: r`\(P = 120 - 2(15) = ${cq.P}\); profit \(= ${tex(cq.R, 0)} - ${tex(cq.C, 0)} = ${cq.profit}\). [[CQ5 Q7]]` },
      ],
      takeaway: 'Same recipe, different numbers. Practice it until it takes two minutes.',
      src: 'CQ5 Q6-Q7',
    },
  ],
  widgets: [
    {
      id: 'profit-max-lab',
      title: 'Profit-max lab: pick a structure, solve, see the profit rectangle',
      intro: 'Demand is blue, MR is dashed blue, MC is red, and ATC is orange. Profit is the gold rectangle (a loss shows in red). Load the professor’s presets, change the numbers, or randomize, and the step-by-step solution updates.',
      questions: [],
      numeric: [
        { id: 's10-w1-mono', label: 'Load the **CQ5 monopoly** preset. What profit does it earn?', part: { type: 'num', label: 'Profit ($)', answer: cq.profit, kind: 'money', tol: 0.001 }, hint: 'Look at step 4 below the graph.', src: 'CQ5 Q7' },
        { id: 's10-w1-lr', label: 'Load the **monopolistic competition** preset and tick **Long run**. What price prevails?', part: { type: 'num', label: 'Long-run price ($)', answer: 45, kind: 'money', tol: 0.001 }, hint: 'Demand shifts until it is tangent to ATC.', src: 'S10 slides p.49' },
      ],
    },
  ],
  checkIds: ['s10-c-mbmc', 's10-c-mr', 's10-c-rules', 's10-cq5-q9', 's10-c-longrun', 's10-c-strategist'],
  applyGenerators: ['s10-maker', 's10-taker', 's10-mr', 's10-mbmc'],
  traps: [
    { title: 'Reading P* off the MC curve', body: 'For a price maker, find Q* where MR = MC, then go **up to the demand curve** for price. CQ5 offered $60 (MC at 15) and $40 as traps. [[CQ5 Q7]]', src: 'CQ5 Q7' },
    { title: 'Using P = MC for a monopoly', body: 'P = MC is the *price-taker* rule. For CQ5’s monopoly it gives Q = 20 instead of 15. [[CQ5 Q6]]', src: 'CQ5 Q6' },
    { title: 'Forgetting MR has twice the slope', body: r`\(P = a - bQ\) → \(MR = a - 2bQ\), not \(a - bQ\).`, src: 'S10 slides p.17' },
    { title: 'Dropping the fixed cost from profit', body: r`Profit = R − C(Q*), and C includes the fixed cost (125 + 4Q²). MC ignores it; profit doesn’t.`, src: 'S10 slides p.46' },
    { title: 'Revenue max ≠ profit max', body: 'MR = 0 maximizes revenue. MR = MC maximizes profit. The difference is cost.', src: 'S10 slides pp.18, 47' },
    { title: 'Loss → shut down?', body: 'Not in the short run if price covers average variable cost: operate now, exit in the long run (the $40 scenario). [[S10 slides p.46]]', src: 'S10 slides p.46' },
    { title: 'Marginal vs. total in MB tables', body: 'CQ5 Q10’s trap: marginal revenue of the 4th worker is 15 × $5 = $75, not $25 and not total revenue. [[CQ5 Q10]]', src: 'CQ5 Q10' },
  ],
  feynman: [
    {
      id: 's10-fey-1',
      prompt: 'Explain why a monopolist’s marginal revenue is less than its price, but a price taker’s MR equals price.',
      model: r`A price taker can sell one more unit at the same market price, so each extra unit adds exactly \(P\) to revenue.

A monopolist faces downward-sloping demand. To sell one more unit it must lower the price, and not just on that unit but on every unit it sells. The extra unit adds \(P\), but the price cut on all the earlier units takes some away. So MR < P. With linear demand, MR falls twice as fast as price.`,
      rubric: ['Price taker: sells more at the same price', 'Monopolist must cut price to sell more', 'Price cut applies to all units, not just the last', 'Concluded MR < P (twice the slope for linear demand)'],
    },
    {
      id: 's10-fey-2',
      prompt: 'Explain why monopolistically competitive firms end up with zero economic profit, and what a strategist should do about it.',
      model: r`In the short run a differentiated brand can price above average cost and earn profit (the $375 example). But entry is free. Imitators see the profit and enter with similar products. Each entrant steals some customers, which shifts our demand left. This continues until demand just touches ATC, so price = ATC and profit = 0 (Q = 5, P = 45 in the professor’s graph).

The strategist’s answer: avoid competition and move toward monopoly. Build barriers (scale, patents, network effects, switching costs) or keep innovating so imitation always lags behind.`,
      rubric: ['Short-run profit from differentiation', 'Free entry → imitators shift demand left', 'Ends at tangency: P = ATC, zero profit', 'Strategic implication: build barriers/innovate'],
    },
  ],
  deeper: [
    { title: 'Why MR = MC maximizes profit (calculus)', kind: 'derivation', body: r`Profit \(\pi(Q) = R(Q) - C(Q)\). At a maximum the slope is zero: \(\pi'(Q) = R'(Q) - C'(Q) = MR - MC = 0\). The S05 three-step recipe applied to profit. For a price taker, \(R = PQ\) so \(R' = P\) and the condition becomes \(P = MC\). [[GEN]]` },
    { title: 'Sources of monopoly power (Baye & Prince Ch 8)', kind: 'textbook', body: r`[[GEN]] Economies of scale (one large firm is cheapest; S06), economies of scope, cost complementarity, patents and other legal barriers, control of essential inputs, network effects, and switching costs. Tie each one to the S04 Five Forces “threat of new entrants” sub-factors: scale economies, capital required, property rights, network effects, switching costs, regulation. [[S04 slides p.22]]` },
    { title: 'Big Tech: heartless monopolists or innovative leaders?', kind: 'textbook', body: r`Digital Dialog update [[S10 Digital Dialog page]]: **Google lost.** In 2024 a judge ruled it illegally maintained its search monopoly by paying to be the default. In 2025 the court declined a breakup but banned exclusive default deals and required data sharing, and a second court found ad-tech monopolization. **Meta won.** In 2025 the FTC challenge failed because TikTok and YouTube compete with it. **Amazon** (sued 2023) and **Apple** (sued 2024) are pending. The professor’s three points: creating value isn’t enough, you must capture it; profits give room to look past survival; creative monopolies expand customer choice. [[S10 slides p.51]]` },
    { title: 'In a case interview: should the client enter this market?', kind: 'case-interview', body: r`Map the structure first. Many undifferentiated rivals means price-taker economics: margins get competed to zero, so only enter with a cost advantage. Differentiated rivals with free entry means early profit that fades, so ask how long the advantage lasts. One incumbent with barriers means you need to break a barrier. Then do the unit economics: price vs. MC and breakeven volume. “Is there a moat?” is the S10 + S04 question.` },
  ],
  summary: r`**Marginal analysis:** do more while MB > MC; stop at **MB = MC** (studying, gas, Creamery scoops). [[S10 slides p.14]]

- **MR** \(= dR/dQ\). For \(P = a - bQ\): \(MR = a - 2bQ\). Revenue peaks where MR = 0. [[S10 slides p.17]]
- **Perfect competition:** many firms, homogeneous, price taker, \(D = P = MR\) → \(P = MC(Q^*)\). [[S10 slides p.44]]
- **Monopolistic competition:** many firms, differentiated, price maker → \(MR = MC\), \(P^* = P(Q^*)\). Long run: entry → P = ATC, zero profit.
- **Monopoly:** one firm, \(D_{firm} = D_{market}\) → \(MR = MC\), \(P^* = P(Q^*)\); no entry unless barriers fall.
- **C = 125 + 4Q²:** price taker at $40 → Q 5, R 200, C 225, π −25 (operate SR, exit LR). Monopoly P = 100 − Q → Q 10, P 90, C 525, R 900, π 375. [[S10 slides pp.46-47]]
- **CQ5:** P = 120 − 2Q, C = 500 + 2Q² → Q 15, P 90, π 400. Price taker C = 50 + 10Q + 2Q², P 70 → Q 15. [[CQ5 Q6]]
- **Strategy:** “Creating value isn’t enough. You have to capture it.” Avoid competition; move toward monopoly. [[S10 slides p.51]]`,
}
