import type { SessionModule } from '../types'

const r = String.raw
const GEN = 'General econ (B&P Ch 11 topic)'

export const s11: SessionModule = {
  id: 'S11',
  num: '11',
  title: 'Advanced Pricing Strategies',
  spine: 'value',
  minutes: 55,
  ready: true,
  takeaway: r`A single price leaves consumer surplus on the table. **Price discrimination, two-part pricing, block pricing, bundling, peak-load pricing, cross-subsidies and transfer pricing** are ways to capture more of it, if you have market power and can stop resale.`,
  why: r`> **Heads-up:** the Session 11 slides hadn't posted when this was built. Everything here comes from the Canvas learning objectives, the Digital Dialog page, and standard managerial economics (the topics of Baye & Prince Ch 11). Anything not from course files is tagged [[GEN]]. When the slides post, drop them in inputs/later and this module gets refreshed against them.

This is the last piece of **Unique Value to Offer**: once you've created value (S06 cost, S07 differentiation), **capture it**. S10's punchline was “Creating value isn't enough. You have to capture it.” A single price captures only the revenue rectangle. These strategies go after the consumer-surplus triangle from S07. [[S10 slides p.51]] [[CQ4 Q4]]

The LOs ask you to *know the terms*, *know the three forms of price discrimination*, *calculate the profit-maximizing price* under each strategy, and *articulate the benefits and risks*, which is what the Digital Dialog on dynamic/surveillance pricing is about. [[Canvas Session 11 module]]`,
  intuition: r`Picture the demand curve as a line of customers, highest willingness to pay first. One price splits them: those above it buy and keep surplus, those below it walk away. Every strategy here is a way around that one-price limitation:

- **Different prices for different people.** That's price discrimination: by individual (1st degree), by quantity (2nd), or by group (3rd).
- **An entry fee plus a usage price.** Two-part pricing: usage at cost, then charge the surplus as a membership fee (Costco, gyms).
- **Only sell packs.** Block pricing: a 12-pack priced at what the 12 cans are worth to you.
- **Sell things together.** Bundling: averages out differences in what people value (cable bundles, Microsoft Office).
- **Charge more when it's crowded.** Peak-load pricing (Uber surge, matinees).
- **Lose money on one product to make it on its complement.** Cross-subsidies (printers and ink).
- **Price inside the firm correctly.** Transfer pricing, so divisions don't each mark up and shrink output.

Each needs **market power**, a way to **sort customers**, and a way to **prevent resale**. [[GEN]]`,
  los: [
    { id: 'S11-LO1', text: 'Know and understand the following economic terms: block pricing, commodity bundling, cross-subsidies, price discrimination, peak-load pricing, two-part pricing, transfer pricing', src: 'Canvas Session 11 module' },
    { id: 'S11-LO2', text: 'Know and understand the three forms of price discrimination', src: 'Canvas Session 11 module' },
    { id: 'S11-LO3', text: 'Know how to calculate the profit-maximizing price when using two-part pricing, block pricing, commodity bundling, peak-load pricing, cross-subsidies, and transfer pricing', src: 'Canvas Session 11 module' },
    { id: 'S11-LO4', text: 'Be able to articulate the benefits and risks of charging different prices to different customers', src: 'Canvas Session 11 module' },
  ],
  terms: [
    { id: 's11-t-pd', term: 'Price discrimination', def: 'Charging different prices to different customers (or for different units) for the same product, when the price differences are not due to cost differences.', src: GEN, general: true },
    { id: 's11-t-1st', term: 'First-degree price discrimination', def: 'Each customer pays their maximum willingness to pay; the firm captures all consumer surplus (perfect price discrimination).', src: GEN, general: true },
    { id: 's11-t-2nd', term: 'Second-degree price discrimination', def: 'The per-unit price depends on how many units are bought (quantity discounts, tiers); customers self-select.', src: GEN, general: true },
    { id: 's11-t-3rd', term: 'Third-degree price discrimination', def: 'Different prices to identifiable groups with different elasticities (students, seniors, regions). The less elastic group pays more.', src: GEN, general: true },
    { id: 's11-t-two', term: 'Two-part pricing', def: 'A fixed fee for the right to buy plus a per-unit fee. Optimal with identical customers: per-unit fee = MC; fixed fee = consumer surplus at that price.', src: GEN, general: true },
    { id: 's11-t-block', term: 'Block pricing', def: 'Selling identical units only in packages; the package price equals the customer’s total value for the package (quantity where demand = MC).', src: GEN, general: true },
    { id: 's11-t-bundle', term: 'Commodity bundling', def: 'Selling two or more different products together for one price. Profitable when customers’ reservation prices are negatively correlated and the firm can’t price discriminate.', src: GEN, general: true },
    { id: 's11-t-peak', term: 'Peak-load pricing', def: 'Charging a higher price when demand (and the cost of capacity) peaks and a lower price off-peak; set MR = MC in each period.', src: GEN, general: true },
    { id: 's11-t-cross', term: 'Cross-subsidies', def: 'Pricing one product low (even below cost) to boost demand for a complement that earns the profit (printers/ink, razors/blades, game consoles/games).', src: GEN, general: true },
    { id: 's11-t-transfer', term: 'Transfer pricing', def: 'The internal price one division charges another. With no outside market, set it equal to the upstream division’s marginal cost to avoid double marginalization.', src: GEN, general: true },
    { id: 's11-t-dynamic', term: 'Dynamic vs. personalized (“surveillance”) pricing', def: 'Dynamic pricing adjusts prices in real time; personalized/bespoke/surveillance pricing tailors prices to individuals using data. Both raise questions about fairness, transparency, privacy and market power.', src: 'S11 Digital Dialog page' },
  ],
  mathIntro: r`[[GEN]] Each strategy is the S10 rule (**MR = MC**) applied cleverly, plus the S07 consumer-surplus triangle.`,
  formulas: [
    { id: 's11-f-markup', name: 'Markup rule', latex: r`P = \left[\frac{E}{1+E}\right]MC\qquad (E < -1)`, vars: [[r`E`, 'own-price elasticity (negative)'], [r`MC`, 'marginal cost']], words: 'Less elastic demand → bigger markup over marginal cost. Comes from MR = P(1 + E)/E = MC.', src: GEN, general: true },
    { id: 's11-f-third', name: 'Third-degree rule', latex: r`MR_1 = MR_2 = MC`, vars: [[r`MR_i`, 'marginal revenue in group i']], words: 'Set each group’s MR equal to the common MC; read each price off that group’s demand.', src: GEN, general: true },
    { id: 's11-f-two', name: 'Two-part tariff', latex: r`p = MC,\qquad F = CS(p) = \tfrac12\,(P_{choke}-MC)\,Q(MC)`, vars: [[r`p`, 'per-unit fee'], [r`F`, 'fixed fee']], words: 'Make the surplus as big as possible, then take it with the fee.', src: GEN, general: true },
    { id: 's11-f-block', name: 'Block price', latex: r`\text{package price} = MC\cdot Q^* + \tfrac12(P_{choke}-MC)Q^*,\quad Q^*: P(Q^*) = MC`, vars: [[r`Q^*`, 'units in the package']], words: 'The total area under demand up to the efficient quantity.', src: GEN, general: true },
    { id: 's11-f-transfer', name: 'Transfer price', latex: r`P_T = MC_{upstream};\quad MR_{final} = MC_{up} + MC_{down}`, vars: [[r`P_T`, 'internal transfer price']], words: 'Price inputs at marginal cost inside the firm.', src: GEN, general: true },
  ],
  examples: [
    {
      id: 's11-ex-third',
      title: 'Third-degree: visitors vs. local students',
      setup: r`[[GEN]] A ski resort (MC = $4) faces visitors \(P_1 = 60 - Q_1\) and students with ID \(P_2 = 20 - Q_2\). Resale of student tickets is blocked by ID checks.`,
      steps: [
        { ask: 'Visitors: MR = MC.', show: r`\(60 - 2Q_1 = 4\) → \(Q_1 = 28\), \(P_1 = \$32\).` },
        { ask: 'Students: MR = MC.', show: r`\(20 - 2Q_2 = 4\) → \(Q_2 = 8\), \(P_2 = \$12\).` },
        { ask: 'Why does it beat one price?', show: 'At one price near $32, students buy nothing; at $12, visitors pay far less than they would. Separate prices raise profit and also serve the price-sensitive group.' },
      ],
      takeaway: 'The less elastic (higher-value) group pays more; the firm needs to identify groups and stop resale.',
      src: GEN,
    },
    {
      id: 's11-ex-two',
      title: 'Two-part pricing at a gym',
      setup: r`[[GEN]] Each member's demand: \(P = 20 - Q\) visits/month; MC = $4 per visit.`,
      steps: [
        { ask: 'Single monopoly price for comparison?', show: r`\(MR = 20 - 2Q = 4\) → \(Q = 8\), \(P = \$12\), profit \((12-4)\times8 = \$64\).` },
        { ask: 'Two-part: per-visit fee?', show: 'Set it at MC = $4 → Q = 16 visits.' },
        { ask: 'Fixed fee?', show: r`Consumer surplus at $4: \(\tfrac12\times16\times16 = \$128\). Charge a $128 monthly fee: profit $128 per member, double the single price.` },
      ],
      takeaway: 'Usage at cost, surplus as the fee: Costco and gym memberships.',
      src: GEN,
    },
    {
      id: 's11-ex-bundle',
      title: 'Bundling sports and movies',
      setup: r`[[GEN]] Customer 1 values Sports $20 and Movies $5. Customer 2 values Sports $8 and Movies $14. MC = 0.`,
      steps: [
        { ask: 'Best separate prices?', show: 'Sports: $20 (one buys → $20) vs. $8 (both → $16) → $20. Movies: $14 (→ $14) vs. $5 (→ $10) → $14. Total **$34**.' },
        { ask: 'Bundle?', show: 'Bundle values: $25 and $22. Price at $22 → both buy → **$44**.' },
        { ask: 'Why does it work?', show: 'Values are **negatively correlated**: the sports fan cares less about movies and vice versa. The bundle evens out willingness to pay, so one price captures more.' },
      ],
      takeaway: 'Bundling is a way to price discriminate without knowing who’s who.',
      src: GEN,
    },
    {
      id: 's11-ex-peak',
      title: 'Peak-load: the BYU Testing Center project',
      setup: r`A prior STRAT 402 group asked: “Could charging a small fee on the last days of finals shorten lines and cut payroll?” They ran a survey experiment on when students would take finals at different fees. [[Skim: Group Projects from Prior Years page]]`,
      steps: [
        { ask: 'Why is this peak-load pricing?', show: 'Demand spikes on the last days. Capacity (seats, staff) must be sized for the peak, so the peak is where capacity is costly. [[GEN]]' },
        { ask: 'How do you set prices?', show: 'Treat peak and off-peak as separate markets: MR = MC in each. Peak demand is higher, so its price is higher, which also shifts some students to off-peak days.' },
        { ask: 'Your exam connection', show: 'Midterm 1 runs Mon Oct 19 – Fri Oct 23 with a late fee starting Friday: a small peak-load lever of its own. [[S10 slides p.7]]' },
      ],
      takeaway: 'Charge more when capacity is scarce; it rations demand and pays for capacity.',
      src: 'Skim: Group Projects from Prior Years page; GEN',
    },
    {
      id: 's11-ex-transfer',
      title: 'Transfer pricing: engines to scooters',
      setup: r`[[GEN]] Engine MC $20 (upstream), assembly MC $10 (downstream), final demand \(P = 150 - Q\). No outside market for engines.`,
      steps: [
        { ask: 'Firm-wide optimum?', show: r`\(MR = 150 - 2Q = 20 + 10\) → \(Q = 60\), \(P = \$90\).` },
        { ask: 'Optimal transfer price?', show: '$20, the upstream marginal cost. Then downstream’s own MR = $20 + $10 rule picks Q = 60.' },
        { ask: 'What if upstream charges $50?', show: r`Downstream sets \(150 - 2Q = 60\) → Q = 45: too few scooters, lower total profit (double marginalization).` },
      ],
      takeaway: 'Inside the firm, price at marginal cost.',
      src: GEN,
    },
  ],
  widgets: [
    {
      id: 'two-part',
      title: 'Two-part tariff builder',
      intro: 'Choose a per-visit price and a monthly fee for one gym member. The green triangle (consumer surplus) is the most the fee can be before the member walks away.',
      questions: [],
      numeric: [{ id: 's11-w1', label: 'With MC = $4, what fee maximizes profit (per-visit price at MC)?', part: { type: 'num', label: 'Monthly fee', answer: 128, kind: 'money', tol: 0.001 }, hint: 'CS = ½ × 16 × 16.', src: GEN }],
    },
    {
      id: 'bundle-table',
      title: 'Bundling table',
      intro: 'Set prices for A, B and an optional bundle. Each customer picks the option that gives them the most surplus.',
      questions: [],
      numeric: [{ id: 's11-w2', label: 'With the starting values, what revenue does the best pure bundle earn?', part: { type: 'num', label: 'Revenue', answer: 66, kind: 'money', tol: 0.001 }, hint: 'Bundle values are 25, 22 and 22. Try pricing at 22.', src: GEN }],
    },
  ],
  checkIds: ['s11-g-first', 's11-g-second', 's11-g-third', 's11-g-which-higher', 's11-g-twopart', 's11-g-bundle'],
  applyGenerators: ['s11-markup', 's11-third', 's11-twopart', 's11-block', 's11-bundle', 's11-peak', 's11-transfer'],
  traps: [
    { title: 'Which degree is which?', body: '1st = each individual’s max; 2nd = depends on *quantity* bought; 3rd = depends on *who* you are (group).', src: GEN },
    { title: 'Higher price to the more elastic group', body: 'Backwards. Price-sensitive (elastic) buyers get the lower price.', src: GEN },
    { title: 'Two-part: per-unit price at the monopoly price', body: 'No: set usage at MC to maximize surplus, then capture it with the fee.', src: GEN },
    { title: 'Bundling works for any pair of goods', body: 'Only when reservation prices are negatively correlated (and MC isn’t high).', src: GEN },
    { title: 'Forgetting resale', body: 'If low-price buyers can resell, discrimination collapses. That’s why student tickets need ID.', src: GEN },
    { title: 'Markup rule with inelastic demand', body: 'P = [E/(1+E)]MC only works for E < −1. A profit-maximizer never prices where demand is inelastic.', src: GEN },
    { title: 'Ignoring the backlash risk', body: 'Delta’s AI fares and Netflix 2011 show pricing can destroy goodwill. Weigh fairness, transparency and privacy. [[S11 Digital Dialog page]]', src: 'S11 Digital Dialog page' },
  ],
  feynman: [
    {
      id: 's11-fey-1',
      prompt: 'Explain why a gym makes more money with a membership fee plus cheap visits than with one price per visit.',
      model: r`With one price per visit, the gym must pick a price above its cost to make money. That scares off some visits members would happily pay for, and members who would pay a lot keep the difference as surplus. With two-part pricing, the gym charges each visit at cost, so members visit as much as is worth it and the total surplus is as big as possible. Then it takes that surplus up front as the membership fee. In the example: $64 profit per member with one price vs. $128 with a $4 visit fee plus a $128 membership.`,
      rubric: ['Single price → lost visits and leftover surplus', 'Per-visit at MC maximizes surplus', 'Fee captures the surplus', 'Used numbers'],
    },
    {
      id: 's11-fey-2',
      prompt: 'Articulate the benefits AND risks of charging different prices to different customers (think about the Digital Dialog articles).',
      model: r`Benefits: the firm captures more surplus. Price-sensitive customers (students, off-peak riders) can be served who would be priced out at one price, so output can expand. Surge pricing pulls more supply (drivers) to where it's needed.

Risks: customers may see it as unfair or manipulative (Delta's AI fares drew blowback). It depends on personal data (Target learning customers' secrets), which raises privacy concerns. People can game it or resell. And it can invite regulation. A strategist should ask who benefits, who is harmed, and under what conditions, and how the policy would look on the front page.`,
      rubric: ['At least two benefits (surplus capture, serving price-sensitive groups/expanding output)', 'At least two risks (fairness/backlash, privacy, arbitrage, regulation)', 'Referenced a Digital Dialog example', 'Balanced judgment'],
    },
  ],
  deeper: [
    { title: 'Deriving the markup rule', kind: 'derivation', body: r`[[GEN]] \(R = P(Q)Q\) → \(MR = P + Q\frac{dP}{dQ} = P\left(1 + \frac{Q}{P}\frac{dP}{dQ}\right) = P\left(1 + \frac1E\right)\). Set \(MR = MC\): \(P = \frac{E}{1+E}MC\). With E = −2, P = 2·MC; with E = −4, P = 1.33·MC. The more elastic the demand, the closer price gets to MC.` },
    { title: 'Dynamic & surveillance pricing (Digital Dialog)', kind: 'textbook', body: 'Read one of: *How Companies Learn Your Secrets* (NYT Magazine), *Uber CEO: Surge Pricing Is Here To Stay* (WSJ), *Delta Gets Blowback for Using AI to Set Airfares* (WSJ), *How AI-driven pricing systems determine what you’re willing to pay* (Deseret News). Prompt: who benefits, who is likely harmed and under what conditions? Ethical issues? Should policymakers intervene? [[S11 Digital Dialog page]]' },
    { title: 'Prior group projects that used these tools', kind: 'textbook', body: 'BYU Testing Center (peak-load fee), BYU Campus Printing (building-by-building price discrimination), BYU ROC Pass (bundling options), Done Right Roofing (seasonal discounts). [[Skim: Group Projects from Prior Years page]]' },
    { title: 'In a case interview: pricing strategy', kind: 'case-interview', body: 'When a case asks “how should we price?”, go beyond one number. Segment customers by willingness to pay (3rd degree), offer tiers or volume pricing (2nd degree, self-selection), consider a subscription/fee structure (two-part), and check for bundling opportunities. Always flag the risks: cannibalization, fairness perceptions, and resale.' },
  ],
  summary: r`[[GEN]] (S11 slides pending) **Goal:** capture consumer surplus a single price leaves behind. Needs market power, a way to sort customers, and no resale.

- **1st degree:** each pays their max. **2nd:** price depends on quantity (self-selection). **3rd:** price depends on group; less elastic group pays more; \(P = [E/(1+E)]MC\).
- **Two-part:** per-unit = MC, fee = CS (gym: $4 + $128 vs. single price $12 → $64).
- **Block:** package size where P = MC; price = area under demand.
- **Bundling:** works with negatively correlated values (sports $20/$5 + movies $8/$14 → bundle $22 × 2 = $44 > $34 separate).
- **Peak-load:** MR = MC each period; higher peak price (Testing Center project, Uber surge).
- **Cross-subsidy:** cheap printer, profitable ink. **Transfer pricing:** internal price = upstream MC.
- **Benefits vs. risks:** more surplus, serve price-sensitive buyers vs. fairness backlash (Delta AI), privacy (Target), regulation. [[S11 Digital Dialog page]]`,
}
