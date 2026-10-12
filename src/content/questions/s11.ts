import type { Mcq } from '../types'

const L1 = 'S11-LO1'
const L2 = 'S11-LO2'
const L3 = 'S11-LO3'
const L4 = 'S11-LO4'
const S = 'S11' as const
const G = 'General econ (B&P Ch 11 topic)'

// Session 11 slides weren't available; questions follow standard managerial economics and are tagged [[GEN]].
export const s11Mcqs: Mcq[] = [
  {
    id: 's11-g-pd-def', session: S, los: [L1], origin: 'site', src: G, screen: 'terms',
    stem: '[[GEN]] Price discrimination means…',
    options: [
      { text: 'charging different prices to different customers (or for different units) for the same product, where the differences aren’t due to cost', why: 'Correct.' },
      { text: 'charging higher prices to cover higher costs for some customers', why: 'Cost-based price differences aren’t discrimination.' },
      { text: 'refusing to sell to certain customers', why: 'That’s not the economic meaning.' },
      { text: 'changing prices over time because costs changed', why: 'Cost-driven again.' },
    ],
    correct: 0,
  },
  {
    id: 's11-g-first', session: S, los: [L2], origin: 'site', src: G, screen: 'terms',
    stem: '[[GEN]] First-degree (perfect) price discrimination…',
    options: [
      { text: 'charges each customer their maximum willingness to pay, capturing all consumer surplus', why: 'Correct.' },
      { text: 'gives quantity discounts', why: 'That is second-degree.' },
      { text: 'charges different identifiable groups different prices', why: 'That is third-degree.' },
      { text: 'charges everyone the monopoly price', why: 'That is a single (uniform) price.' },
    ],
    correct: 0,
  },
  {
    id: 's11-g-second', session: S, los: [L2], origin: 'site', src: G, screen: 'terms',
    stem: '[[GEN]] A coffee shop charges $3 for one cup but $10 for a four-cup card. Which form of price discrimination?',
    options: [
      { text: 'Second-degree — price per unit depends on how much you buy; customers self-select', why: 'Correct.' },
      { text: 'First-degree', why: 'The shop isn’t charging each person their own maximum.' },
      { text: 'Third-degree', why: 'The price doesn’t depend on who you are, only how much you buy.' },
      { text: 'Not price discrimination', why: 'Same coffee, lower per-unit price for volume (not cost-driven) → second-degree.' },
    ],
    correct: 0,
  },
  {
    id: 's11-g-third', session: S, los: [L2], origin: 'site', src: G, screen: 'terms',
    stem: '[[GEN]] Student and senior discounts at a movie theater are…',
    options: [
      { text: 'third-degree price discrimination: different prices for identifiable groups with different elasticities', why: 'Correct.' },
      { text: 'second-degree price discrimination', why: 'Second-degree depends on quantity purchased, not identity.' },
      { text: 'first-degree price discrimination', why: 'The theater isn’t charging each person their individual max.' },
      { text: 'peak-load pricing', why: 'Peak-load varies by time, not group.' },
    ],
    correct: 0,
  },
  {
    id: 's11-g-which-higher', session: S, los: [L2, L3], origin: 'site', src: G, screen: 'math',
    stem: '[[GEN]] Under third-degree price discrimination, which group should get the higher price?',
    options: [
      { text: 'The group with less elastic (less price-sensitive) demand', why: 'Correct. Markup rule: P = [E/(1+E)]MC — smaller |E| → bigger markup.' },
      { text: 'The group with more elastic demand', why: 'Price-sensitive buyers get the lower price.' },
      { text: 'The larger group', why: 'Size doesn’t set the markup; elasticity does.' },
      { text: 'Both groups pay the same', why: 'Then it wouldn’t be discrimination.' },
    ],
    correct: 0,
  },
  {
    id: 's11-g-markup', session: S, los: [L3], origin: 'site', src: G, screen: 'math',
    stem: '[[GEN]] MC = $10 and a group’s own-price elasticity is −2. Using the markup rule P = [E/(1+E)]MC, the profit-maximizing price is…',
    options: [
      { text: '$20', why: 'Correct. (−2)/(−1) = 2 → 2 × $10.' },
      { text: '$10', why: 'That is price = MC (a price taker).' },
      { text: '$5', why: 'Inverted the markup.' },
      { text: '$30', why: 'Arithmetic slip.' },
    ],
    correct: 0,
  },
  {
    id: 's11-g-conditions', session: S, los: [L2, L4], origin: 'site', src: G, screen: 'deeper',
    stem: '[[GEN]] Which condition is NOT needed for price discrimination to work?',
    options: [
      { text: 'The firm must be a price taker', why: 'Correct — a price taker can’t discriminate; you need market power.' },
      { text: 'The firm has some market power', why: 'Needed.' },
      { text: 'The firm can identify or sort customers with different willingness to pay', why: 'Needed.' },
      { text: 'Customers can’t easily resell to each other', why: 'Needed — otherwise low-price buyers resell to high-price buyers.' },
    ],
    correct: 0,
  },
  {
    id: 's11-g-twopart', session: S, los: [L1, L3], origin: 'site', src: G, screen: 'widgets',
    stem: '[[GEN]] With identical customers, a profit-maximizing two-part price sets the per-unit fee at ___ and the fixed fee at ___.',
    options: [
      { text: 'marginal cost; the consumer surplus each customer gets at that price', why: 'Correct — maximize the surplus with P = MC, then capture it with the fee.' },
      { text: 'the monopoly price; zero', why: 'That’s single pricing; it leaves surplus and deadweight loss.' },
      { text: 'zero; total revenue', why: 'A zero usage price leads to overuse beyond where value ≥ cost.' },
      { text: 'average cost; marginal cost', why: 'Not the rule.' },
    ],
    correct: 0,
  },
  {
    id: 's11-g-twopart-ex', session: S, los: [L3], origin: 'site', src: G, screen: 'widgets',
    stem: '[[GEN]] Each gym member’s demand is P = 20 − Q (visits/month); MC = $4/visit. Optimal two-part tariff?',
    options: [
      { text: '$4 per visit plus a $128 monthly fee', why: 'Correct. Q = 16 at P = 4; CS = ½ × 16 × 16 = $128.' },
      { text: '$12 per visit, no fee', why: 'That is the single monopoly price (MR = MC: 20 − 2Q = 4 → Q = 8, P = 12).' },
      { text: '$4 per visit plus a $64 fee', why: 'Fee too low — that leaves half the surplus.' },
      { text: '$0 per visit plus a $200 fee', why: 'Customers would value 20 visits at only $200 total, but serving them costs $80; profit is lower.' },
    ],
    correct: 0,
  },
  {
    id: 's11-g-block', session: S, los: [L1, L3], origin: 'site', src: G, screen: 'examples',
    stem: '[[GEN]] Block pricing sells…',
    options: [
      { text: 'identical units only in packages, priced at the customer’s total value for the package', why: 'Correct — like a two-part tariff, it can capture all consumer surplus.' },
      { text: 'different products together', why: 'That is commodity bundling.' },
      { text: 'at higher prices during busy times', why: 'That is peak-load pricing.' },
      { text: 'at a price below cost to sell a complement', why: 'That is a cross-subsidy.' },
    ],
    correct: 0,
  },
  {
    id: 's11-g-bundle', session: S, los: [L1, L3], origin: 'site', src: G, screen: 'widgets',
    stem: '[[GEN]] Commodity bundling is most likely to raise profit when…',
    options: [
      { text: 'customers’ reservation prices for the goods are negatively correlated and the firm can’t price discriminate', why: 'Correct — the bundle evens out willingness to pay.' },
      { text: 'every customer values both goods identically', why: 'Then bundling adds nothing.' },
      { text: 'the goods are perfect substitutes', why: 'Customers want one or the other.' },
      { text: 'marginal costs are very high', why: 'High MC makes selling unwanted items in a bundle costly.' },
    ],
    correct: 0,
  },
  {
    id: 's11-g-bundle-ex', session: S, los: [L3], origin: 'site', src: G, screen: 'widgets',
    stem: '[[GEN]] Customer 1 values sports $20 and movies $5; customer 2 values sports $8 and movies $14 (MC = 0). Best bundle price and revenue?',
    options: [
      { text: '$22 each → $44', why: 'Correct. Bundle values: 25 and 22. Price at 22: both buy → $44 (vs. separate best: sports 20 or 16 → 20; movies 14 or 10 → 14; total $34).' },
      { text: '$25 → $25', why: 'Only customer 1 buys.' },
      { text: '$34 → $34', why: 'That is separate pricing.' },
      { text: '$13 each → $26', why: 'Underpriced.' },
    ],
    correct: 0,
  },
  {
    id: 's11-g-peak', session: S, los: [L1], origin: 'site', src: G, screen: 'terms',
    stem: '[[GEN]] Peak-load pricing charges…',
    options: [
      { text: 'higher prices when demand (and capacity cost) is high, lower prices off-peak', why: 'Correct — e.g., surge pricing, matinee movie prices, a finals-week fee at the Testing Center.' },
      { text: 'the same price all day', why: 'That’s uniform pricing.' },
      { text: 'lower prices to bulk buyers', why: 'That’s second-degree.' },
      { text: 'by customer group', why: 'That’s third-degree.' },
    ],
    correct: 0,
  },
  {
    id: 's11-g-cross', session: S, los: [L1], origin: 'site', src: G, screen: 'terms',
    stem: '[[GEN]] Selling printers near cost and earning profit on ink cartridges is an example of…',
    options: [
      { text: 'a cross-subsidy', why: 'Correct — profit on one product subsidizes a low price on its complement.' },
      { text: 'transfer pricing', why: 'Transfer pricing is between divisions of one firm.' },
      { text: 'block pricing', why: 'No package of identical units here.' },
      { text: 'first-degree price discrimination', why: 'Everyone pays the same printer price.' },
    ],
    correct: 0,
  },
  {
    id: 's11-g-transfer', session: S, los: [L1, L3], origin: 'site', src: G, screen: 'examples',
    stem: '[[GEN]] With no outside market for the input, a firm maximizes overall profit by setting the internal transfer price equal to…',
    options: [
      { text: 'the upstream division’s marginal cost', why: 'Correct — avoids double marginalization.' },
      { text: 'the final product’s price', why: 'Then downstream earns nothing and produces too little.' },
      { text: 'the upstream division’s average total cost plus a markup', why: 'A markup at each stage cuts output below the firm optimum.' },
      { text: 'zero', why: 'Downstream would over-produce relative to the true cost.' },
    ],
    correct: 0,
  },
  {
    id: 's11-g-dm', session: S, los: [L3], origin: 'site', src: G, screen: 'deeper',
    stem: '[[GEN]] If the upstream division charges downstream a transfer price above its marginal cost, the firm will…',
    options: [
      { text: 'produce too little and earn less total profit (double marginalization)', why: 'Correct.' },
      { text: 'earn more total profit', why: 'Total profit falls.' },
      { text: 'produce more', why: 'Downstream sees a higher cost and cuts output.' },
      { text: 'be unaffected', why: 'Downstream’s decisions depend on the transfer price.' },
    ],
    correct: 0,
  },
  {
    id: 's11-g-cs-capture', session: S, los: [L4], origin: 'site', src: 'General econ; S07 consumer surplus', screen: 'why',
    stem: '[[GEN]] What do all of the S11 pricing strategies try to do relative to a single price?',
    options: [
      { text: 'Capture more of the consumer surplus that a single price leaves on the table', why: 'Correct — S07’s CS triangle is value created but not captured.' },
      { text: 'Lower marginal cost', why: 'These are pricing tools, not cost tools.' },
      { text: 'Increase consumer surplus', why: 'Usually they transfer surplus to the firm.' },
      { text: 'Reduce the number of customers', why: 'Many of them expand output (e.g., discounts for price-sensitive groups).' },
    ],
    correct: 0,
  },
  {
    id: 's11-c-dynamic', session: S, los: [L4, L1], origin: 'course', src: 'S11 Digital Dialog page', screen: 'deeper',
    stem: 'In the Digital Dialog, what is the difference between dynamic pricing and personalized (“surveillance”) pricing?',
    options: [
      { text: 'Dynamic pricing adjusts prices in real time (e.g., to demand); personalized pricing tailors prices to individuals using their data', why: 'Correct. [[S11 Digital Dialog page]]' },
      { text: 'They are the same thing', why: 'The dialog distinguishes them.' },
      { text: 'Dynamic pricing is illegal; personalized pricing is legal', why: 'Neither is categorically described that way.' },
      { text: 'Personalized pricing charges everyone the same', why: 'Opposite.' },
    ],
    correct: 0,
  },
  {
    id: 's11-c-articles', session: S, los: [L4], origin: 'course', src: 'S11 Digital Dialog page', screen: 'deeper',
    stem: 'Which set matches the four Digital Dialog articles?',
    options: [
      { text: 'How Companies Learn Your Secrets (NYT, Target); Uber CEO: Surge Pricing Is Here To Stay (WSJ); Delta Gets Blowback for Using AI to Set Airfares (WSJ); How AI-driven pricing systems determine what you’re willing to pay (Deseret News)', why: 'Correct. [[S11 Digital Dialog page]]' },
      { text: 'Articles on Netflix, Redbox, Blockbuster and Hulu', why: 'Those are cost/differentiation cases.' },
      { text: 'Articles on Big Tech antitrust', why: 'That was the S10 dialog.' },
      { text: 'Articles on Home Depot and Lowe’s tariffs', why: 'That was S04 Theory Meets Practice.' },
    ],
    correct: 0,
  },
  {
    id: 's11-c-questions', session: S, los: [L4], origin: 'course', src: 'S11 Digital Dialog page', screen: 'deeper',
    stem: 'What questions does the professor want you to weigh about dynamic/surveillance pricing?',
    options: [
      { text: 'Who benefits, who is harmed and under what conditions; ethical issues; whether policymakers should intervene', why: 'Correct — fairness, transparency, privacy, market power. [[S11 Digital Dialog page]]' },
      { text: 'Only how much extra profit it generates', why: 'The prompt is broader.' },
      { text: 'Whether it lowers marginal cost', why: 'Not the focus.' },
      { text: 'How to compute HHI for airlines', why: 'Unrelated.' },
    ],
    correct: 0,
  },
  {
    id: 's11-g-benefit', session: S, los: [L4], origin: 'site', src: G, screen: 'deeper',
    stem: '[[GEN]] Which is a genuine BENEFIT of charging different prices to different customers?',
    options: [
      { text: 'Price-sensitive customers who would be priced out at a single price can be served at a lower price (output can expand)', why: 'Correct — e.g., student discounts.' },
      { text: 'It always raises every customer’s surplus', why: 'High-WTP customers usually pay more.' },
      { text: 'It eliminates the need for market power', why: 'It requires market power.' },
      { text: 'It reduces the firm’s costs', why: 'It’s a pricing, not a cost, effect.' },
    ],
    correct: 0,
  },
  {
    id: 's11-g-risk', session: S, los: [L4], origin: 'site', src: 'General econ; S11 Digital Dialog page; S08 slides p.12 (Netflix goodwill)', screen: 'deeper',
    stem: '[[GEN]] Which is a RISK of charging different prices to different customers?',
    options: [
      { text: 'Perceived unfairness and backlash (e.g., Delta’s AI fares), privacy concerns, arbitrage/resale, and regulatory attention', why: 'Correct — the Netflix 2011 story shows how pricing moves can destroy goodwill.' },
      { text: 'It always lowers revenue', why: 'Done well it raises revenue.' },
      { text: 'It requires perfect competition', why: 'It requires market power.' },
      { text: 'It makes demand perfectly elastic', why: 'No.' },
    ],
    correct: 0,
  },
  {
    id: 's11-c-projects', session: S, los: [L2, L3], origin: 'course', src: 'Skim: Group Projects from Prior Years page', screen: 'deeper',
    stem: 'Prior STRAT 402 group projects applied S11 tools. Which pairing is correct?',
    options: [
      { text: 'BYU Testing Center → peak-load fee on the last days of finals; BYU Campus Printing → building-by-building price discrimination; BYU ROC Pass → bundling options', why: 'Correct. [[Skim: Group Projects from Prior Years page]]' },
      { text: 'Chick-fil-A → bundling', why: 'Chick-fil-A did marginal benefit vs. marginal cost of an extra hour.' },
      { text: 'Qualtrics → peak-load pricing', why: 'Qualtrics optimized phone/email support staffing.' },
      { text: 'Maverik → two-part pricing', why: 'Maverik estimated store-level price sensitivity.' },
    ],
    correct: 0,
  },
  {
    id: 's11-g-surge', session: S, los: [L1, L4], origin: 'site', src: 'General econ; S11 Digital Dialog page (Uber)', screen: 'terms',
    stem: '[[GEN]] Uber’s surge pricing during a rainstorm is best described as…',
    options: [
      { text: 'dynamic / peak-load pricing — higher prices when demand outstrips capacity', why: 'Correct; it also pulls more drivers onto the road.' },
      { text: 'block pricing', why: 'No package of units.' },
      { text: 'a cross-subsidy', why: 'No complement is involved.' },
      { text: 'transfer pricing', why: 'No internal division sale.' },
    ],
    correct: 0,
  },
  {
    id: 's11-g-third-ex', session: S, los: [L3], origin: 'site', src: G, screen: 'examples',
    stem: '[[GEN]] Visitors: P = 60 − Q; students: P = 20 − Q; MC = $4. Third-degree prices?',
    options: [
      { text: 'Visitors $32, students $12', why: 'Correct. MR = MC each: 60 − 2Q = 4 → Q = 28, P = 32; 20 − 2Q = 4 → Q = 8, P = 12.' },
      { text: 'Both $32', why: 'A single high price loses the student market.' },
      { text: 'Visitors $56, students $16', why: 'Those are choke price minus MC, not the MR = MC prices.' },
      { text: 'Visitors $28, students $8', why: 'Those are the quantities.' },
    ],
    correct: 0,
  },
  {
    id: 's11-g-resale', session: S, los: [L4], origin: 'site', src: G, screen: 'deeper',
    stem: '[[GEN]] Why do airlines and software companies often make discounted tickets/licenses non-transferable?',
    options: [
      { text: 'To prevent resale (arbitrage) from low-price buyers to high-price buyers, which would undo price discrimination', why: 'Correct.' },
      { text: 'Because transfers raise marginal cost a lot', why: 'Not the main reason.' },
      { text: 'Because it is legally required', why: 'It’s a strategic choice.' },
      { text: 'To make demand more elastic', why: 'No.' },
    ],
    correct: 0,
  },
]
