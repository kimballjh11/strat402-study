import type { Mcq } from '../types'

const r = String.raw
const L1 = 'S10-LO1'
const L2 = 'S10-LO2'
const L3 = 'S10-LO3'
const L4 = 'S10-LO4'
const S = 'S10' as const

// computed numbers
const cq6 = { Q: 120 / 8 }
const cq7P = 120 - 2 * cq6.Q
const cq7profit = cq7P * cq6.Q - (500 + 2 * cq6.Q ** 2)
const v1 = { a: 200, b: 2, F: 300, d: 3 } // P = 200 − 2Q, C = 300 + 3Q²
const v1Q = v1.a / (2 * v1.b + 2 * v1.d)
const v1P = v1.a - v1.b * v1Q
const v1Profit = v1P * v1Q - (v1.F + v1.d * v1Q ** 2)

export const s10Mcqs: Mcq[] = [
  // ───────── From your Comprehension Quiz 5 ─────────
  {
    id: 's10-cq5-q6', session: S, los: [L4], origin: 'cq', src: 'CQ5 Q6', screen: 'examples',
    stem: r`You are the manager of a monopoly, and your demand and cost functions are \(P = 120 - 2Q\) and \(C = 500 + 2Q^2\), respectively. If you want to maximize profits, how much should you produce?`,
    options: [
      { text: '15', why: r`Correct. \(MR = 120 - 4Q\), \(MC = 4Q\); \(120 - 4Q = 4Q\) → \(Q = ${cq6.Q}\). [[CQ5 Q6]]` },
      { text: '20', why: 'That sets MC equal to *price* (P = MC → 120 − 2Q = 4Q gives 20). Monopolists set MR = MC.' },
      { text: '30', why: 'That is where MR = 0 (revenue max), ignoring cost.' },
      { text: '40', why: 'Not a stationary point of anything here; possibly 120/3.' },
    ],
    correct: 0,
  },
  {
    id: 's10-cq5-q7', session: S, los: [L4], origin: 'cq', src: 'CQ5 Q7', screen: 'examples',
    stem: r`You are the manager of a monopoly, and your demand and cost functions are \(P = 120 - 2Q\) and \(C = 500 + 2Q^2\), respectively. If you want to maximize profits, what price should you charge?`,
    options: [
      { text: '$40', why: 'That is MC at Q = 10 — never read price off MC for a price maker.' },
      { text: '$60', why: 'That is MC at Q = 15 (4 × 15). Price comes from the demand curve.' },
      { text: '$80', why: 'That is the price at Q = 20 (the P = MC quantity).' },
      { text: '$90', why: r`Correct. Plug Q* = 15 into demand: \(P = 120 - 2(15) = ${cq7P}\). Profit \(= 1{,}350 - 950 = ${cq7profit}\). [[CQ5 Q7]]` },
    ],
    correct: 3,
  },
  {
    id: 's10-cq5-q8', session: S, los: [L4], origin: 'cq', src: 'CQ5 Q8', screen: 'examples',
    stem: r`You are the manager of a perfectly competitive firm with a cost function of \(C = 50 + 10Q + 2Q^2\). The current market price for your good is $70. How much should your firm produce in the short run?`,
    options: [
      { text: '10', why: 'Check: MC(10) = 10 + 40 = 50 ≠ 70.' },
      { text: '15', why: r`Correct. \(MC = 10 + 4Q\); \(P = MC\): \(70 = 10 + 4Q\) → \(Q = 15\). [[CQ5 Q8]]` },
      { text: '20', why: 'MC(20) = 90 > 70: the last units cost more than they bring in.' },
      { text: '25', why: 'MC(25) = 110, far above price.' },
    ],
    correct: 1,
  },
  {
    id: 's10-cq5-q9', session: S, los: [L2], origin: 'cq', src: 'CQ5 Q9', screen: 'examples',
    stem: 'Pizza Hut began with just one style of pizza but has since expanded to offer many different varieties. In which type of market structure does Pizza Hut compete?',
    options: [
      { text: 'Monopolistic competition', why: 'Correct. Many firms selling similar but differentiated products (styles, crusts, toppings); short-run profit from new items gets competed away in the long run. [[CQ5 Q9]]' },
      { text: 'Monopoly', why: 'Pizza Hut is one of many pizza sellers.' },
      { text: 'Oligopoly', why: 'Oligopoly is a Midterm 2 topic; the professor’s answer is monopolistic competition (many firms, differentiated products).' },
      { text: 'Perfect competition', why: 'Pizzas are differentiated, not homogeneous, and firms set their own prices.' },
    ],
    correct: 0,
  },
  {
    id: 's10-cq5-q10', session: S, los: [L1], origin: 'cq', src: 'CQ5 Q10', screen: 'examples',
    stem: 'A sandwich shop currently has 3 workers producing 60 sandwiches per day. Adding a 4th worker increases total output to 75 sandwiches. Each sandwich sells for $5, and the daily wage per worker is $50. Should the shop hire the 4th worker?',
    options: [
      { text: 'No, because marginal revenue ($25) is less than marginal cost ($50).', why: 'MR is 15 extra sandwiches × $5 = $75, not $25.' },
      { text: 'Yes, because marginal revenue ($75) exceeds marginal cost ($50).', why: 'Correct. MP = 15 sandwiches; MR = 15 × $5 = $75 > $50 wage → profit rises $25. [[CQ5 Q10]]' },
      { text: 'No, because total revenue will decrease.', why: 'Total revenue rises from $300 to $375.' },
      { text: 'Yes, because the 4th worker reduces average cost.', why: 'Average cost isn’t the decision rule — compare marginal benefit with marginal cost.' },
    ],
    correct: 1,
  },
  // ───────── Variants ─────────
  {
    id: 's10-v-mono-q', session: S, los: [L4], origin: 'cq-variant', src: 'Variant of CQ5 Q6', screen: 'examples',
    stem: r`A monopolist faces \(P = ${v1.a} - ${v1.b}Q\) and \(C = ${v1.F} + ${v1.d}Q^2\). What quantity maximizes profit?`,
    options: [
      { text: String(v1Q), why: r`Correct. \(MR = ${v1.a} - ${2 * v1.b}Q = MC = ${2 * v1.d}Q\) → \(Q = ${v1.a}/${2 * v1.b + 2 * v1.d} = ${v1Q}\).` },
      { text: String(v1.a / (v1.b + 2 * v1.d)), why: 'That uses P = MC (the price-taker rule).' },
      { text: String(v1.a / (2 * v1.b)), why: 'That is MR = 0 — revenue max, ignoring cost.' },
      { text: String(Math.round(v1.a / (2 * v1.d))), why: 'That sets MC equal to the demand intercept (200 = 6Q), ignoring that MR falls as Q rises.' },
    ],
    correct: 0,
  },
  {
    id: 's10-v-mono-profit', session: S, los: [L4], origin: 'cq-variant', src: 'Variant of CQ5 Q7', screen: 'examples',
    stem: r`Same monopolist (\(P = ${v1.a} - ${v1.b}Q\), \(C = ${v1.F} + ${v1.d}Q^2\)) produces Q* = ${v1Q}. What price and profit?`,
    options: [
      { text: `P = $${v1P}; profit = $${v1Profit}`, why: r`Correct. \(P = ${v1.a} - ${v1.b}(${v1Q}) = ${v1P}\); \(R = ${v1P * v1Q}\); \(C = ${v1.F} + ${v1.d}(${v1Q})^2 = ${v1.F + v1.d * v1Q ** 2}\); profit \(= ${v1Profit}\).` },
      { text: `P = $${2 * v1.d * v1Q}; profit = $${2 * v1.d * v1Q * v1Q - (v1.F + v1.d * v1Q ** 2)}`, why: 'Price was read off MC (6 × 20 = 120). Price makers read price off demand.' },
      { text: `P = $${v1P}; profit = $${v1P * v1Q}`, why: 'That is revenue, not profit — subtract total cost including the fixed cost.' },
      { text: `P = $${v1.a}; profit = $0`, why: 'The demand intercept is the choke price, where nothing sells.' },
    ],
    correct: 0,
  },
  {
    id: 's10-v-taker', session: S, los: [L4], origin: 'cq-variant', src: 'Variant of CQ5 Q8', screen: 'examples',
    stem: r`A perfectly competitive firm has \(C = 100 + 20Q + Q^2\) and the market price is $60. Profit-maximizing output?`,
    options: [
      { text: '20', why: r`Correct. \(MC = 20 + 2Q = 60\) → \(Q = 20\).` },
      { text: '40', why: 'That forgets to divide by 2: 60 − 20 = 40 = 2Q, so Q = 20.' },
      { text: '30', why: 'MC(30) = 80 > 60.' },
      { text: '10', why: 'MC(10) = 40 < 60 — producing more adds profit.' },
    ],
    correct: 0,
  },
  {
    id: 's10-v-taker-loss', session: S, los: [L2, L4], origin: 'course', src: 'S10 slides p.46', screen: 'examples',
    stem: r`In the professor’s exercise, \(C(Q) = 125 + 4Q^2\) and you are a price taker at $40/unit. Q* = 5, revenue = $200, cost = $225, profit = −$25. What should you do?`,
    options: [
      { text: 'Continue to operate in the short run, but exit in the long run', why: 'Correct — the slide’s conclusion. [[S10 slides p.46]]' },
      { text: 'Shut down immediately', why: 'Revenue ($200) covers variable cost ($100); operating loses less than the $125 fixed cost you would lose by shutting down.' },
      { text: 'Raise the price to $45 to cover cost', why: 'A price taker has no influence on price.' },
      { text: 'Expand output until profit is positive', why: 'More output raises MC above $40 and makes the loss worse.' },
    ],
    correct: 0,
  },
  {
    id: 's10-v-mbmc', session: S, los: [L1], origin: 'cq-variant', src: 'Variant of CQ5 Q10', screen: 'examples',
    stem: 'A food truck staffs 2 cooks making 80 tacos a night. A 3rd cook raises output to 92 tacos. Tacos sell for $4; a cook costs $60 a night. Hire the 3rd cook?',
    options: [
      { text: 'No — marginal revenue $48 < marginal cost $60', why: 'Correct. MP = 12 tacos × $4 = $48 < $60. Hiring lowers profit by $12.' },
      { text: 'Yes — total revenue rises', why: 'Revenue rising isn’t enough; it must rise by more than the added cost.' },
      { text: 'Yes — MR $368 > MC $60', why: '$368 is total revenue, not marginal.' },
      { text: 'No — average output per cook falls', why: 'Average product isn’t the decision rule; marginal benefit vs. marginal cost is.' },
    ],
    correct: 0,
  },
  {
    id: 's10-v-structure', session: S, los: [L2], origin: 'cq-variant', src: 'Variant of CQ5 Q9; S10 slides p.44', screen: 'examples',
    stem: 'Wheat farmers sell an identical product, face many rivals, and accept whatever price the market sets. Which market structure?',
    options: [
      { text: 'Perfect competition', why: 'Correct — many firms, homogeneous goods (commodities), price takers. [[S10 slides p.44]]' },
      { text: 'Monopolistic competition', why: 'That needs differentiated products (e.g., fast food).' },
      { text: 'Monopoly', why: 'A monopoly is one firm.' },
      { text: 'It depends on each farm’s marginal cost', why: 'Structure is about the market, not one firm’s costs.' },
    ],
    correct: 0,
  },
  {
    id: 's10-v-structure2', session: S, los: [L2], origin: 'cq-variant', src: 'Variant of CQ5 Q9; S10 slides p.44', screen: 'examples',
    stem: 'The only gas station within 40 miles on a rural highway sets its own price. Which structure does the professor use this as an example of?',
    options: [
      { text: 'Monopoly', why: 'Correct — “Rural Gas Station” is the professor’s monopoly example. [[S10 slides p.44]]' },
      { text: 'Perfect competition', why: 'Gasoline is fairly standardized, but with no rivals nearby the station is a price maker.' },
      { text: 'Monopolistic competition', why: 'That requires many firms.' },
      { text: 'None — gas stations are always price takers', why: 'Local market definition matters (S03): one station in a local market is a monopoly.' },
    ],
    correct: 0,
  },
  // ───────── Course-sourced conceptual ─────────
  {
    id: 's10-c-mbmc', session: S, los: [L1], origin: 'course', src: 'S10 slides p.14', screen: 'intuition',
    stem: 'When should you stop studying for an exam, stop driving around for cheaper gas, or stop buying scoops of Blue Goggles ice cream at the BYU Creamery?',
    options: [
      { text: 'When marginal benefit equals marginal cost (MB = MC)', why: 'Correct — the professor’s answer to all four examples. [[S10 slides p.14]]' },
      { text: 'When total benefit is maximized regardless of cost', why: 'Ignores cost.' },
      { text: 'When average benefit equals average cost', why: 'Decisions at the margin use marginal values.' },
      { text: 'When marginal benefit is zero', why: 'That ignores that the next unit costs something.' },
    ],
    correct: 0,
  },
  {
    id: 's10-c-adtable', session: S, los: [L1], origin: 'course', src: 'S10 slides p.15', screen: 'examples',
    stem: 'In the professor’s advertising table, the 5th ad has MB = $50 and MC = $50, and profit is $200 at both 4 and 5 ads. The 6th ad has MB = $40 and MC = $60. What does marginal analysis say?',
    options: [
      { text: 'Stop at 5 ads (MB = MC); the 6th ad would lower profit by $20', why: 'Correct. Profit peaks where MB = MC. [[S10 slides p.15]]' },
      { text: 'Buy all 10 ads because total revenue keeps rising', why: 'Revenue rises to $450 but cost rises faster; profit falls to −$100.' },
      { text: 'Buy 1 ad because it has the highest MB', why: 'Profit keeps rising while MB > MC.' },
      { text: 'Buy 9 ads where total revenue equals total cost', why: 'That is break-even (profit = 0), not profit max.' },
    ],
    correct: 0,
  },
  {
    id: 's10-c-mrdef', session: S, los: [L1], origin: 'course', src: 'S10 slides p.17', screen: 'terms',
    stem: 'Marginal revenue is…',
    options: [
      { text: 'the additional revenue collected when one additional unit is produced/sold (dR/dQ)', why: 'Correct. [[S10 slides p.17]]' },
      { text: 'price times quantity', why: 'That is total revenue.' },
      { text: 'revenue divided by quantity', why: 'That is average revenue (= price).' },
      { text: 'the revenue left after paying marginal cost', why: 'That is marginal profit.' },
    ],
    correct: 0,
  },
  {
    id: 's10-c-mr', session: S, los: [L1, L4], origin: 'course', src: 'S10 slides pp.17-19', screen: 'math',
    stem: r`For inverse demand \(P = 10 - Q\), the marginal revenue function is…`,
    options: [
      { text: r`\(MR = 10 - 2Q\)`, why: r`Correct. \(R = 10Q - Q^2\) → \(dR/dQ = 10 - 2Q\). [[S10 slides p.17]]` },
      { text: r`\(MR = 10 - Q\)`, why: 'That is the demand curve itself. MR lies below demand for a price maker.' },
      { text: r`\(MR = 10Q - Q^2\)`, why: 'That is total revenue.' },
      { text: r`\(MR = 10\)`, why: 'Only a price taker has constant MR (= P).' },
    ],
    correct: 0,
  },
  {
    id: 's10-c-revpeak', session: S, los: [L1], origin: 'course', src: 'S10 slides pp.18-19', screen: 'math',
    stem: r`For \(P = 10 - Q\), revenue \(R = 10Q - Q^2\) peaks at Q = 5 (R = $25). What is MR there?`,
    options: [
      { text: '0', why: 'Correct — revenue peaks where MR = 0 (the slope of the revenue curve is zero).' },
      { text: '5', why: 'That is the price at Q = 5.' },
      { text: '10', why: 'That is MR at Q = 0.' },
      { text: '25', why: 'That is total revenue.' },
    ],
    correct: 0,
  },
  {
    id: 's10-c-pc-demand', session: S, los: [L2], origin: 'course', src: 'S10 slides p.44', screen: 'examples',
    stem: 'For a perfectly competitive firm, the firm’s demand curve is…',
    options: [
      { text: r`horizontal: \(D_{firm} = P_{market} = MR\)`, why: 'Correct. A price taker can sell any amount at the market price. [[S10 slides p.44]]' },
      { text: r`the market demand curve: \(D_{firm} = D_{market}\)`, why: 'That is the monopoly row.' },
      { text: 'downward sloping, but flatter than the market’s', why: 'That describes monopolistic competition’s own D_firm.' },
      { text: 'vertical at the firm’s capacity', why: 'No.' },
    ],
    correct: 0,
  },
  {
    id: 's10-c-mono-demand', session: S, los: [L2], origin: 'course', src: 'S10 slides p.44', screen: 'examples',
    stem: 'For a monopoly, the firm’s demand curve is…',
    options: [
      { text: r`the market demand curve (\(D_{firm} = D_{market}\))`, why: 'Correct — one firm serves the whole market. [[S10 slides p.44]]' },
      { text: r`\(D_{firm} = P_{market} = MR\)`, why: 'That is perfect competition.' },
      { text: 'its marginal cost curve', why: 'MC is a cost curve, not demand.' },
      { text: 'perfectly inelastic', why: 'Monopoly demand still slopes down — the monopolist operates where demand is elastic.' },
    ],
    correct: 0,
  },
  {
    id: 's10-c-rules', session: S, los: [L4], origin: 'course', src: 'S10 slides p.44', screen: 'examples',
    stem: 'Which pair of rules is right?',
    options: [
      { text: r`Perfect competition: \(P_{market} = MC(Q^*)\); monopoly & monopolistic competition: \(MR(Q^*) = MC(Q^*)\), then \(P^* = P(Q^*)\)`, why: 'Correct — the last two rows of the professor’s table. [[S10 slides p.44]]' },
      { text: 'All three: P = MC', why: 'Price makers set MR = MC.' },
      { text: 'All three: MR = 0', why: 'That is revenue max, which ignores cost.' },
      { text: 'Monopoly: P = MC; perfect competition: MR = MC with a downward-sloping MR', why: 'Reversed.' },
    ],
    correct: 0,
  },
  {
    id: 's10-c-mc-info', session: S, los: [L2], origin: 'course', src: 'S10 slides p.44', screen: 'examples',
    stem: 'According to the professor’s table, monopolistic competition has…',
    options: [
      { text: 'many firms, differentiated products, imperfect information, transaction costs, and free entry/exit', why: 'Correct — “Many firms · Differentiated · Fast Food · Perfect info? No · Transaction costs? Yes · Free entry/exit? Yes · Price maker.” [[S10 slides p.44]]' },
      { text: 'many firms, homogeneous products, perfect information, no transaction costs', why: 'That is perfect competition.' },
      { text: 'one firm and blocked entry', why: 'That is monopoly.' },
      { text: 'a few large firms that react to each other', why: 'That is oligopoly (Midterm 2).' },
    ],
    correct: 0,
  },
  {
    id: 's10-c-longrun', session: S, los: [L2, L4], origin: 'course', src: 'S10 slides pp.48-49', screen: 'widgets',
    stem: 'In the professor’s monopolistic-competition graphs, short-run profit is $375. In the long run imitators enter and demand shifts to P = 50 − Q. What happens?',
    options: [
      { text: 'Demand becomes tangent to ATC at Q = 5, P = ATC = $45, profit = $0', why: 'Correct. Entry erodes profit until price just covers average cost. [[S10 slides p.49]]' },
      { text: 'Profit stays $375 because the brand is differentiated', why: 'Differentiation buys short-run profit only; free entry competes it away.' },
      { text: 'The firm becomes a price taker at $45', why: 'It still faces its own downward-sloping demand.' },
      { text: 'The firm exits immediately', why: 'At P = ATC it earns zero economic (normal accounting) profit and stays.' },
    ],
    correct: 0,
  },
  {
    id: 's10-c-pizza-lr', session: S, los: [L2], origin: 'cq-variant', src: 'CQ5 Q9 feedback', screen: 'examples',
    stem: 'Pizza Hut introduces a stuffed-crust pizza and earns economic profit for a while. What does the professor’s explanation predict next?',
    options: [
      { text: 'Rivals innovate too and compete the profit away — zero economic profit, though still a normal accounting profit', why: 'Correct. [[CQ5 Q9]]' },
      { text: 'Pizza Hut earns monopoly profit forever', why: 'Entry is free in monopolistic competition.' },
      { text: 'Pizza Hut becomes a price taker', why: 'Its pizzas remain differentiated.' },
      { text: 'Prices rise as rivals enter', why: 'Entry shifts each firm’s demand left, lowering price/profit.' },
    ],
    correct: 0,
  },
  {
    id: 's10-c-capture', session: S, los: [L3], origin: 'course', src: 'S10 slides p.51', screen: 'why',
    stem: 'Complete the professor’s line from “Heartless Monopolists or Innovative Leaders?”: “Creating value isn’t enough…”',
    options: [
      { text: '“…You have to capture it.”', why: 'Correct. The slide also says profits give a firm room to look past survival, and creative monopolies expand customer choice. [[S10 slides p.51]]' },
      { text: '“…You have to share it with customers.”', why: 'Not the slide.' },
      { text: '“…You have to cut costs.”', why: 'Not the slide.' },
      { text: '“…You have to grow faster than rivals.”', why: 'Not the slide.' },
    ],
    correct: 0,
  },
  {
    id: 's10-c-strategist', session: S, los: [L3], origin: 'course', src: 'S10 slides p.51', screen: 'why',
    stem: 'According to the professor, the strategist’s job is to…',
    options: [
      { text: 'avoid competition and move toward monopoly', why: 'Correct. [[S10 slides p.51]]' },
      { text: 'match competitors’ prices', why: 'That invites perfect-competition outcomes (zero profit).' },
      { text: 'maximize revenue', why: 'Profit, not revenue — and through market power.' },
      { text: 'enter the most competitive industries', why: 'Competitive industries have the least profit (S04 ROIC rankings).' },
    ],
    correct: 0,
  },
  {
    id: 's10-c-bigtech', session: S, los: [L3], origin: 'course', src: 'S10 Digital Dialog page', screen: 'deeper',
    stem: 'In the Big Tech Digital Dialog update, how did the courts treat Google and Meta?',
    options: [
      { text: 'Google lost (illegally maintained its search monopoly); Meta won (TikTok and YouTube compete with it)', why: 'Correct. Amazon (sued 2023) and Apple (sued 2024) are still pending. [[S10 Digital Dialog page]]' },
      { text: 'Both were broken up', why: 'In 2025 the court declined to break Google up; it banned exclusive default deals and required data sharing.' },
      { text: 'Google won; Meta lost', why: 'Reversed.' },
      { text: 'Neither case has been decided', why: 'Both had rulings by 2025.' },
    ],
    correct: 0,
  },
  {
    id: 's10-c-sources', session: S, los: [L3], origin: 'site', src: 'General econ (B&P Ch 8); S04 barriers to entry', screen: 'terms',
    stem: '[[GEN]] Which of these is a source of monopoly power?',
    options: [
      { text: 'All of these: economies of scale, patents/legal barriers, control of a key input, network effects', why: 'Correct. Each makes it hard for rivals to enter — the same barriers you rated in the S04 Five Forces “threat of entry.”' },
      { text: 'Only patents', why: 'Patents are one source among several.' },
      { text: 'Having many small rivals', why: 'That is the opposite of monopoly power.' },
      { text: 'Selling a homogeneous product', why: 'Homogeneous products push toward perfect competition.' },
    ],
    correct: 0,
  },
  {
    id: 's10-c-network', session: S, los: [L3], origin: 'site', src: 'General econ (B&P Ch 8); Five Forces Tool Glossary', screen: 'terms',
    stem: '[[GEN]] A messaging app becomes more valuable to each user as more people join, making it hard for a new app to attract users. This source of monopoly power is…',
    options: [
      { text: 'network effects', why: 'Correct — the Five Forces Tool glossary: a product becomes more valuable as more consumers use it, lowering the threat of entry.' },
      { text: 'economies of scope', why: 'Scope is about producing several products together cheaply.' },
      { text: 'a patent', why: 'No legal protection is described.' },
      { text: 'learning curves', why: 'Learning lowers cost with cumulative output; this is about user value.' },
    ],
    correct: 0,
  },
  {
    id: 's10-c-profit-def', session: S, los: [L4], origin: 'course', src: 'S10 slides pp.46-47', screen: 'math',
    stem: 'After finding Q* and P*, how do you compute profit?',
    options: [
      { text: r`\(\pi = P^*Q^* - C(Q^*)\), including fixed cost`, why: 'Correct — revenue minus total cost, as on the slides (e.g., 900 − 525 = 375). [[S10 slides p.47]]' },
      { text: r`\(\pi = (P^* - MC)\times Q^*\)`, why: 'That ignores fixed cost and uses MC instead of average cost.' },
      { text: r`\(\pi = MR - MC\)`, why: 'At the optimum MR − MC = 0; that is not profit.' },
      { text: r`\(\pi = P^*Q^*\)`, why: 'That is revenue.' },
    ],
    correct: 0,
  },
  {
    id: 's10-c-provo', session: S, los: ['S09-LO3', L1], origin: 'course', src: 'S10 slides pp.10-11', screen: 'deeper',
    stem: 'Midterm practice — Provo Peaks Root Beer (350 obs.): Price coefficient −5.849 (t = −2.151, p = 0.032); Income ($000/capita) 7.804 (t = 6.677, p = 0.000); R² = 0.122. Best economic interpretation?',
    options: [
      { text: 'A $1 price increase lowers cases sold by about 5.8; root beer is a normal good (+7.8 cases per $1,000 income); both are significant, but the model explains only 12.2% of the variation', why: 'Correct. Signs, magnitudes, significance (|t| > 2, p < 0.05) and fit. [[S10 slides p.11]]' },
      { text: 'Price is not significant because its t-stat is negative', why: 'Significance uses |t|; |−2.151| > 2 and p = 0.032 < 0.05.' },
      { text: 'Root beer is an inferior good', why: 'The income coefficient is positive → normal good.' },
      { text: 'The model is useless because R² is low', why: 'Low R² means lots of unexplained variation, but the coefficients can still be significant and useful.' },
    ],
    correct: 0,
  },
]
