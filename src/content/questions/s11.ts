import type { Mcq } from '../types'

const L1 = 'S11-LO1'
const L2 = 'S11-LO2'
const L3 = 'S11-LO3'
const L4 = 'S11-LO4'
const L5 = 'S11-LO5'
const S = 'S11' as const
const EX = 'Advanced Pricing Strategies Exercise'

export const s11Mcqs: Mcq[] = [
  {
    id: 's11-cs-def', session: S, los: [L5], origin: 'course', src: 'S11 slides p.18', screen: 'terms',
    stem: 'On the Session 11 slides, consumer surplus is…',
    options: [
      { text: 'the value customers get by buying for less than they are willing to pay — the area under demand and above the price', why: 'Correct. [[S11 slides p.18]]' },
      { text: 'the firm’s revenue minus marginal cost', why: 'That is a profit rectangle, not consumer surplus.' },
      { text: 'the area above demand and below the price', why: 'Surplus sits under demand and above the price.' },
      { text: 'total quantity demanded', why: 'Quantity is the base of the triangle, not the surplus.' },
    ],
    correct: 0,
  },
  {
    id: 's11-cs-steps', session: S, los: [L5], origin: 'course', src: 'S11 slides p.19', screen: 'math',
    stem: 'The slide’s four steps for consumer surplus, in order, are…',
    options: [
      { text: 'inverse demand, graph it, quantity at the current price, then the area under the curve and above the price', why: 'Correct. [[S11 slides p.19]]' },
      { text: 'set MR = MC, then read price off demand', why: 'That is a profit-max quantity, not the surplus triangle.' },
      { text: 'estimate a regression, then multiply the coefficient by the price', why: 'That is an elasticity-from-regression step (S09), not this slide.' },
      { text: 'choke price minus marginal cost, times quantity', why: 'You need the triangle formula, and the height is choke minus the current price, not minus MC, unless price equals MC.' },
    ],
    correct: 0,
  },
  {
    id: 's11-cs-dp', session: S, los: [L5, L3], origin: 'course', src: 'S11 slides p.20', screen: 'examples',
    stem: 'Campus Dr Pepper demand is Q = 30,000 − 20,000P. Consumer surplus at P = $0.75 is…',
    options: [
      { text: '$5,625', why: 'Correct. Inverse demand chokes at $1.50. Q = 15,000. CS = (0.75)(15,000)/2. [[S11 slides p.20]]' },
      { text: '$11,250', why: 'That forgets the ½ in the triangle.' },
      { text: '$15,000', why: 'That is the quantity, not the surplus.' },
      { text: '$1.50', why: 'That is the choke price.' },
    ],
    correct: 0,
  },
  {
    id: 's11-pd-def', session: S, los: [L1, L2], origin: 'course', src: 'S11 slides p.21', screen: 'terms',
    stem: 'The slides define price discrimination as…',
    options: [
      { text: 'charging different prices to consumers for the same good or service', why: 'Correct. [[S11 slides p.21]]' },
      { text: 'charging more when your costs are higher', why: 'A cost difference is not the slide’s definition.' },
      { text: 'refusing to sell to some customers', why: 'That is not the definition on the slide.' },
      { text: 'changing the product so a higher price is justified', why: 'The slide is about the same good or service.' },
    ],
    correct: 0,
  },
  {
    id: 's11-pd-1', session: S, los: [L2], origin: 'course', src: 'S11 slides p.21', screen: 'terms',
    stem: 'First-degree price discrimination, as the slide defines it, is…',
    options: [
      { text: 'charging each customer his or her reservation price (example: auctions)', why: 'Correct. [[S11 slides p.21]]' },
      { text: 'a bulk discount', why: 'That is second-degree.' },
      { text: 'a student or senior discount', why: 'That is third-degree.' },
      { text: 'a higher price on a Saturday', why: 'That is peak-load pricing, not first-degree.' },
    ],
    correct: 0,
  },
  {
    id: 's11-pd-2', session: S, los: [L2], origin: 'course', src: 'S11 slides p.21', screen: 'terms',
    stem: 'A bulk discount is which degree of price discrimination on the slide?',
    options: [
      { text: 'Second-degree: the price depends on the quantity purchased', why: 'Correct. [[S11 slides p.21]]' },
      { text: 'First-degree', why: 'First-degree charges each person their own reservation price.' },
      { text: 'Third-degree', why: 'Third-degree charges identifiable groups different prices.' },
      { text: 'Not price discrimination', why: 'The slide lists bulk discounts as second-degree price discrimination.' },
    ],
    correct: 0,
  },
  {
    id: 's11-pd-3', session: S, los: [L2], origin: 'course', src: 'S11 slides p.21', screen: 'terms',
    stem: 'Student discounts and business-versus-economy fares are…',
    options: [
      { text: 'third-degree price discrimination: different prices for distinct groups', why: 'Correct. [[S11 slides p.21]]' },
      { text: 'second-degree price discrimination', why: 'Second-degree depends on quantity, not on who you are.' },
      { text: 'block pricing', why: 'A block is a package of identical units.' },
      { text: 'two-part pricing', why: 'Two-part pricing is an access fee plus a usage fee.' },
    ],
    correct: 0,
  },
  {
    id: 's11-two-def', session: S, los: [L1], origin: 'course', src: 'S11 slides p.22', screen: 'terms',
    stem: 'Two-part pricing on the slides is…',
    options: [
      { text: 'a fixed access fee for the right to buy, plus a per-unit usage fee', why: 'Correct. The access fee is typically consumer surplus; the usage fee is often near marginal cost. [[S11 slides p.22]]' },
      { text: 'one price for a package of identical units', why: 'That is block pricing.' },
      { text: 'one price for two different products', why: 'That is commodity bundling.' },
      { text: 'a higher price only during peak hours', why: 'That is peak-load pricing.' },
    ],
    correct: 0,
  },
  {
    id: 's11-two-rule', session: S, los: [L1, L3], origin: 'course', src: 'S11 slides p.22', screen: 'math',
    stem: 'Where do the slides say the two fees usually get set?',
    options: [
      { text: 'access fee at consumer surplus; usage fee close to marginal cost', why: 'Correct. [[S11 slides p.22]]' },
      { text: 'both fees at the single-price monopoly price', why: 'That throws away the point of separating access and usage.' },
      { text: 'usage fee at the choke price; access fee at zero', why: 'That is the opposite of the slide.' },
      { text: 'access fee at marginal cost; usage fee at consumer surplus', why: 'Swapped.' },
    ],
    correct: 0,
  },
  {
    id: 's11-two-when', session: S, los: [L1, L4], origin: 'course', src: 'S11 slides p.22', screen: 'terms',
    stem: 'Two-part pricing works poorly, according to the slide, when…',
    options: [
      { text: 'customers have very different demand, marginal cost is high, or people can easily skip the access fee', why: 'Correct. [[S11 slides p.22]]' },
      { text: 'customers have similar demand and usage is easy to meter', why: 'Those are conditions where it works well.' },
      { text: 'the access fee feels like exclusivity', why: 'The slide lists that as a reason it works.' },
      { text: 'marginal cost is zero', why: 'A zero marginal cost is the Sundance case, and the strategy works.' },
    ],
    correct: 0,
  },
  {
    id: 's11-sundance', session: S, los: [L3], origin: 'course', src: 'S11 slides p.25', screen: 'examples',
    stem: 'Sundance demand is Q = 10 − P/15 and marginal cost is zero. The unlimited season pass should cost…',
    options: [
      { text: '$750', why: 'Correct. Usage fee $0. Inverse demand P = 150 − 15Q. CS = ½ × 10 × 150 = $750. [[S11 slides p.25]]' },
      { text: '$150', why: 'That is the choke price for one day, not the season pass.' },
      { text: '$15', why: 'That is the slope, not the fee.' },
      { text: '$1,500', why: 'That drops the ½ in the triangle (10 × 150).' },
    ],
    correct: 0,
  },
  {
    id: 's11-block-def', session: S, los: [L1], origin: 'course', src: 'S11 slides p.26', screen: 'terms',
    stem: 'Block pricing, as the slide defines it, …',
    options: [
      { text: 'packages identical products so the buyer makes an all-or-none decision, with the block price equal to the area under demand up to Q', why: 'Correct. [[S11 slides p.26]]' },
      { text: 'sells two different products for one price', why: 'That is commodity bundling.' },
      { text: 'charges an access fee plus a per-unit fee', why: 'That is two-part pricing.' },
      { text: 'charges more on Saturday than on Tuesday', why: 'That is peak-load pricing.' },
    ],
    correct: 0,
  },
  {
    id: 's11-block-dp', session: S, los: [L3], origin: 'course', src: 'S11 slides p.27', screen: 'examples',
    stem: 'On the Dr Pepper block-pricing graph, marginal cost is $0.50 and demand meets that cost at 12 cans. The 12-pack price and the profit are…',
    options: [
      { text: 'price $12, profit $6', why: 'Correct. Rectangle $6 plus triangle $6 = $12. The hatched profit triangle is $6. [[S11 slides p.27]]' },
      { text: 'price $6, profit $12', why: 'Swapped. $6 is the cost of 12 cans (and also the profit), not the price.' },
      { text: 'price $0.50, profit $1.50', why: 'Those are per-can cost and the choke price.' },
      { text: 'price $11.99, profit $0', why: 'The store listing is $11.99, which matches the $12 block, but profit is the $6 triangle, not zero.' },
    ],
    correct: 0,
  },
  {
    id: 's11-spotify', session: S, los: [L3], origin: 'course', src: 'S11 slides p.28', screen: 'examples',
    stem: 'Spotify’s inverse demand is P = 14 − Q and marginal cost is $2 per user per month. The annual subscription on the slide is…',
    options: [
      { text: '$96', why: 'Correct. Q* = 12 where P = MC. Area = 2×12 + ½×12×12 = $96. [[S11 slides p.28]]' },
      { text: '$14', why: 'That is the choke price for the first unit.' },
      { text: '$24', why: 'That is only the rectangle of cost (2 × 12), not total willingness to pay.' },
      { text: '$72', why: 'That is only the triangle above marginal cost.' },
    ],
    correct: 0,
  },
  {
    id: 's11-bundle-when', session: S, los: [L1], origin: 'course', src: 'S11 slides p.29', screen: 'terms',
    stem: 'Commodity bundling is most successful on the slide when…',
    options: [
      { text: 'customers’ valuations are negatively correlated, products are complements, and marginal costs are low', why: 'Correct. [[S11 slides p.29]]' },
      { text: 'everyone values both products the same way', why: 'Highly correlated valuations are when bundling is less effective.' },
      { text: 'the products are substitutes', why: 'The slide says bundling is less effective for substitutes.' },
      { text: 'marginal costs are high', why: 'The slide says it works best when marginal costs are low.' },
    ],
    correct: 0,
  },
  {
    id: 's11-five', session: S, los: [L3], origin: 'course', src: 'S11 slides p.31', screen: 'widgets',
    stem: 'Five Guys: Alex values the burger at $8 and the drink at $2; Ben values them at $6 and $4. Revenue at burger $8 / drink $4, versus a $10 combo?',
    options: [
      { text: '$12 separate, $20 as a combo', why: 'Correct. Separately Alex buys only the burger and Ben buys only the drink. Both buy the $10 combo. [[S11 slides p.31]]' },
      { text: '$10 separate, $10 as a combo', why: 'Each customer’s pair is worth $10, but that is willingness to pay, not the separate-price revenue.' },
      { text: '$20 separate, $12 as a combo', why: 'Swapped.' },
      { text: '$8 separate, $16 as a combo', why: 'Doesn’t match who buys at those prices.' },
    ],
    correct: 0,
  },
  {
    id: 's11-peak-def', session: S, los: [L1], origin: 'course', src: 'S11 slides p.32', screen: 'terms',
    stem: 'Peak-load pricing, as the slide defines it, …',
    options: [
      { text: 'charges a higher price in peak hours than off-peak, when capacity is fixed and demand moves predictably, to allocate that capacity and smooth demand', why: 'Correct. Examples on the next slide: Uber, Alta, Disneyland, Provo Recreation Center. [[S11 slides p.32]]' },
      { text: 'charges each customer their reservation price', why: 'That is first-degree price discrimination.' },
      { text: 'packages a year of service into one fee', why: 'That is the Spotify block.' },
      { text: 'sells a burger and a drink for one price', why: 'That is bundling.' },
    ],
    correct: 0,
  },
  {
    id: 's11-cascade-months', session: S, los: [L3], origin: 'course', src: EX, screen: 'examples',
    stem: 'In the Cascade exercise, which months are the busy season?',
    options: [
      { text: 'January, February, July, August, and December', why: 'Correct. The other seven months are the slow season. [[Advanced Pricing Strategies Exercise]]' },
      { text: 'June, July, and August only', why: 'Winter cold is busy too: December, January, and February.' },
      { text: 'March through June', why: 'Those are slow months on the Wasatch Front.' },
      { text: 'Every month is treated the same', why: 'The whole exercise splits the year into two seasons.' },
    ],
    correct: 0,
  },
  {
    id: 's11-cascade-ope', session: S, los: [L3], origin: 'course', src: EX, screen: 'math',
    stem: 'The exercise formula for own-price elasticity, once you have fitted P = a + bQ, is…',
    options: [
      { text: 'OPE = (1/b) × (P/Q), with Q = (P − a) / b', why: 'Correct. [[Advanced Pricing Strategies Exercise]]' },
      { text: 'OPE = b × P', why: 'Missing quantity, and the 1/b is the slope of quantity on price.' },
      { text: 'OPE = a / P', why: 'The intercept alone is not an elasticity.' },
      { text: 'OPE = (P − MC) / P', why: 'That is a markup, not the exercise’s elasticity.' },
    ],
    correct: 0,
  },
  {
    id: 's11-cascade-choice', session: S, los: [L3, L4], origin: 'course', src: EX, screen: 'examples',
    stem: 'What should Cascade’s owner do with the slow-season price?',
    options: [
      { text: 'Use the profit-max prices (about $4,189 busy and $3,769 slow), not the ~25% cut that merely matches busy-season volume', why: 'Correct. The equalizing price (~$3,004) sits at the bottom of observed slow-season prices and gives up about $50,000 of slow-season profit. [[Advanced Pricing Strategies Exercise]]' },
      { text: 'Cut about 25%, to roughly $3,000, so crews stay as busy as in July', why: 'That discount does not pay, and it is an extrapolation to the edge of the data.' },
      { text: 'Raise the slow-season price above $4,000, because slow-season demand is less elastic', why: 'Slow-season demand is more elastic (about −3.9 versus −2.1), so the profit-max slow price is below $4,000.' },
      { text: 'Keep $4,000 in both seasons, because the two curves are the same', why: 'The busy curve sits well above the slow curve.' },
    ],
    correct: 0,
  },
  {
    id: 's11-benefit', session: S, los: [L4], origin: 'course', src: 'S11 slides p.32', screen: 'deeper',
    stem: 'A benefit of peak-load pricing, in the slide’s own words, is that it…',
    options: [
      { text: 'allocates scarce capacity and smooths demand across time', why: 'Correct. [[S11 slides p.32]]' },
      { text: 'lowers marginal cost', why: 'It reallocates demand. It does not change the cost of a unit.' },
      { text: 'makes every customer better off', why: 'Peak customers pay more.' },
      { text: 'removes the need for market power', why: 'You cannot charge two prices if you are a pure price taker.' },
    ],
    correct: 0,
  },
  {
    id: 's11-c-dynamic', session: S, los: [L4], origin: 'course', src: 'S11 Digital Dialog page', screen: 'deeper',
    stem: 'In the Digital Dialog, what is the difference between dynamic pricing and personalized (“surveillance”) pricing?',
    options: [
      { text: 'Dynamic pricing adjusts prices in real time (for example to demand); personalized pricing tailors prices to individuals using their data', why: 'Correct. The discussion slides are “Heartless Monopolists or Innovative Leaders?” and “Thoughts on Dynamic Pricing.” [[S11 Digital Dialog page]] [[S11 slides pp.14-15]]' },
      { text: 'They are the same thing', why: 'The dialog distinguishes them.' },
      { text: 'Dynamic pricing is illegal and personalized pricing is not', why: 'The prompt does not sort them that way.' },
      { text: 'Personalized pricing charges everyone the same price', why: 'Opposite.' },
    ],
    correct: 0,
  },
  {
    id: 's11-c-articles', session: S, los: [L4], origin: 'course', src: 'S11 Digital Dialog page', screen: 'deeper',
    stem: 'Which set matches the four Digital Dialog articles?',
    options: [
      { text: 'How Companies Learn Your Secrets (NYT, Target); Uber CEO: Surge Pricing Is Here To Stay (WSJ); Delta Gets Blowback for Using AI to Set Airfares (WSJ); How AI-driven pricing systems determine what you’re willing to pay (Deseret News)', why: 'Correct. [[S11 Digital Dialog page]]' },
      { text: 'Articles on Netflix, Redbox, Blockbuster, and Hulu', why: 'Those are cost and differentiation cases.' },
      { text: 'Articles on Big Tech antitrust', why: 'That was the S10 dialog.' },
      { text: 'Articles on Home Depot and Lowe’s tariffs', why: 'That was S04.' },
    ],
    correct: 0,
  },
  {
    id: 's11-c-questions', session: S, los: [L4], origin: 'course', src: 'S11 Digital Dialog page', screen: 'deeper',
    stem: 'What does the professor want you to weigh about dynamic and surveillance pricing?',
    options: [
      { text: 'Who benefits, who is harmed and under what conditions; the ethical issues; whether policymakers should intervene', why: 'Correct. [[S11 Digital Dialog page]]' },
      { text: 'Only how much extra profit it generates', why: 'The prompt is broader than profit.' },
      { text: 'Whether it lowers marginal cost', why: 'Not the question.' },
      { text: 'How to compute an airline HHI', why: 'That is an industry-structure skill, not this discussion.' },
    ],
    correct: 0,
  },
  {
    id: 's11-exam', session: S, los: [L1], origin: 'course', src: 'S11 slides p.7', screen: 'why',
    stem: 'On the midterm breakdown slide, Additional Pricing Strategies is worth…',
    options: [
      { text: '7% of the exam: 3% conceptual and 4% application', why: 'Correct. Conceptual questions are 1 point; application questions are 1–4 points. [[S11 slides p.7]]' },
      { text: '26%, the same as Industry Analysis', why: 'Industry Analysis is the largest block, at 26%.' },
      { text: '20%, tied with Cost', why: 'Cost is 20% (6% conceptual + 14% application).' },
      { text: 'It is not on Midterm 1', why: 'The breakdown slide includes it.' },
    ],
    correct: 0,
  },
]
