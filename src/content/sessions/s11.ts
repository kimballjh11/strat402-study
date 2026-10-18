import type { SessionModule } from '../types'

const r = String.raw
const EX = 'Advanced Pricing Strategies Exercise'

export const s11: SessionModule = {
  id: 'S11',
  num: '11',
  title: 'Advanced Pricing Strategies',
  spine: 'value',
  minutes: 70,
  ready: true,
  takeaway: r`A single price leaves consumer surplus on the table. **Two-part pricing, block pricing, commodity bundling, and peak-load pricing** capture more of it. On the exam, Additional Pricing Strategies is **7%** (3% conceptual, 4% application).`,
  why: r`This is the last piece of **Unique Value to Offer**. S10’s rule was MR = MC. These strategies use that rule, plus the consumer-surplus triangle from S07, to charge different prices without a single posted price. [[S10 slides p.51]] [[S11 slides p.17]]

The deck opens with the midterm, then the pricing lecture and the Cascade exercise. [[S11 slides pp.4-8]] [[S11 slides p.34]]

**Midterm 1** (the facts on this deck): opens **Mon Oct 19, 8:00 AM**, closes **Fri Oct 23, 9:00 PM**. Paper exam in the Testing Center. Closed book, closed note. No Excel, phones, or other devices. A scientific or financial calculator is allowed; a graphing calculator is not. **4-hour** limit. The equation sheet is the last page of the booklet. Scratch paper is allowed, but do not write in the booklet. TAs hold an optional review **Mon Oct 19** during the normal class time. [[S11 slides p.6]]

**66 questions, 100 points.** 34 conceptual (1 point each, like the quizzes) and 32 application (1–4 points, like the spreadsheets). Share of the exam: Industry Structure 8%, Industry Analysis 26%, Cost 20%, Demand 9%, Elasticity 10%, Regression 13%, Profit Maximization 7%, **Additional Pricing Strategies 7%** (3% conceptual + 4% application). [[S11 slides p.7]]

What he will ask you to do by hand: a demand function (quantity, elasticity, revenue, consumer surplus); printed regression output; a 10-K excerpt; an IBISWorld fact sheet for Five Forces; scale and total-cost curves with the trend line given; HHI from a market-share table. [[S11 slides p.8]]

Class then discusses *Heartless Monopolists or Innovative Leaders?* and dynamic pricing, which is the Digital Dialog. [[S11 slides pp.14-15]] [[S11 Digital Dialog page]]`,
  intuition: r`Picture the demand curve as a line of customers, highest willingness to pay first. One price splits them: buyers above it keep surplus, buyers below it walk away. Every strategy in this lecture gets around that one price.

- **Charge each person, each quantity, or each group a different price.** That is price discrimination: 1st degree (reservation price), 2nd degree (quantity), 3rd degree (group). [[S11 slides p.21]]
- **Charge an entry fee, then a usage fee near cost.** Two-part pricing. Sundance’s unlimited season pass is the clean case: marginal cost is zero, so the usage fee is $0 and the pass equals the whole consumer surplus, **$750**. [[S11 slides pp.22-25]]
- **Sell only a package of identical units.** Block pricing. The 12-pack is priced at the whole area under demand up to 12 cans (**$12**), not at a per-can price. [[S11 slides pp.26-27]]
- **Sell different products together.** Commodity bundling. Alex wants the burger and Ben wants the drink; a **$10** combo takes in **$20** where separate prices of $8 and $4 take in **$12**. [[S11 slides pp.29-31]]
- **Charge more when capacity is scarce.** Peak-load pricing. The Cascade exercise is this idea with seasons instead of hours. [[S11 slides pp.32-34]]`,
  los: [
    { id: 'S11-LO1', text: 'Know and understand price discrimination, two-part pricing, block pricing, commodity bundling, and peak-load pricing', src: 'S11 slides p.17' },
    { id: 'S11-LO2', text: 'Know and understand the three forms of price discrimination', src: 'S11 slides p.17' },
    { id: 'S11-LO3', text: 'Know how to calculate the profit-maximizing price when using two-part pricing, block pricing, commodity bundling, and peak-load pricing', src: 'S11 slides p.17' },
    { id: 'S11-LO4', text: 'Be able to articulate the benefits and risks of charging different prices to different customers', src: 'S11 slides p.17' },
    { id: 'S11-LO5', text: 'Know how to calculate consumer surplus and describe what it means', src: 'S11 slides p.17' },
  ],
  terms: [
    { id: 's11-t-cs', term: 'Consumer surplus', def: 'The value customers get by buying a good for less than they would be willing to pay. On a graph, the area under demand and above the price.', src: 'S11 slides p.18' },
    { id: 's11-t-pd', term: 'Price discrimination', def: 'Charging different prices to consumers for the same good or service. The slide’s examples of the three degrees: auctions (1st), bulk discounts (2nd), student/senior or business/economy fares (3rd).', src: 'S11 slides p.21' },
    { id: 's11-t-1st', term: 'First-degree price discrimination', def: 'Charging each customer his or her reservation price. Example on the slide: auctions.', src: 'S11 slides p.21' },
    { id: 's11-t-2nd', term: 'Second-degree price discrimination', def: 'Charging different prices based on the quantity or volume purchased. Example: bulk discounts. The customer self-selects the quantity.', src: 'S11 slides p.21' },
    { id: 's11-t-3rd', term: 'Third-degree price discrimination', def: 'Charging different prices to distinct groups or market segments. Examples: student and senior discounts, business versus economy travel.', src: 'S11 slides p.21' },
    { id: 's11-t-two', term: 'Two-part pricing', def: 'A fixed access fee for the right to buy, plus a per-unit usage fee. The access fee is typically the consumer surplus; the usage fee is often set close to marginal cost. Works best when customers have similar demand, usage is easy to meter, the access fee faces little competition, and customers see it as convenience or exclusivity. Works poorly when demand varies widely, marginal cost is high, or switching costs are low.', src: 'S11 slides p.22' },
    { id: 's11-t-block', term: 'Block pricing', def: 'Identical products packaged together so the buyer makes an all-or-none decision. The block price equals the total area under demand up to Q, not a single per-unit price. Works best with similar demand, low or constant marginal cost, and low transaction costs. Works poorly when demand varies a lot, the product is perishable, or rivals sell smaller quantities.', src: 'S11 slides p.26' },
    { id: 's11-t-bundle', term: 'Commodity bundling', def: 'Bundling several different products and selling them at one bundle price, to capture more consumer surplus. Works best when valuations are negatively correlated, the products are complements, marginal costs are low, and separate pricing is inefficient. Works poorly when the products are substitutes, valuations are highly correlated, or forced bundling draws backlash.', src: 'S11 slides p.29' },
    { id: 's11-t-peak', term: 'Peak-load pricing', def: 'A higher price in peak hours than in off-peak hours. Used when capacity is fixed in the short run and demand fluctuates predictably (by hour, day, or season). The goal is to allocate scarce capacity and smooth demand across time.', src: 'S11 slides p.32' },
    { id: 's11-t-dynamic', term: 'Dynamic vs. personalized (“surveillance”) pricing', def: 'The class discussion (Heartless Monopolists or Innovative Leaders?) distinguishes dynamic pricing, which moves prices in real time, from personalized pricing, which tailors a price to a person using data. Both raise fairness, transparency, privacy, and market-power questions.', src: 'S11 slides pp.14-15; S11 Digital Dialog page' },
  ],
  mathIntro: r`Consumer surplus is the triangle. Two-part and block pricing price that whole area. Peak-load pricing, in the exercise, fits a line to each season and then uses OPE and MR = MC. [[S11 slides pp.18-20]] [[${EX}]]`,
  formulas: [
    { id: 's11-f-cs', name: 'Consumer surplus (linear demand)', latex: r`CS = \frac{bh}{2},\quad h = P_{choke}-P,\quad b = Q(P)`, vars: [[r`P_{choke}`, 'price where quantity demanded is zero (the inverse-demand intercept)'], [r`Q(P)`, 'quantity demanded at the current price']], words: 'Four steps: inverse demand, graph it, quantity at the current price, then the triangle above that price.', src: 'S11 slides pp.19-20' },
    { id: 's11-f-two', name: 'Two-part price', latex: r`\text{usage fee} \approx MC,\qquad \text{access fee} = CS(MC)`, vars: [[r`MC`, 'marginal cost of one more unit'], [r`CS`, 'consumer surplus at that usage fee']], words: 'Set usage near cost so people consume, then charge the surplus as the access fee. If MC = 0, the access fee is the whole triangle.', src: 'S11 slides pp.22,25' },
    { id: 's11-f-block', name: 'Block price', latex: r`Q^*: P(Q^*) = MC,\qquad \text{block price} = \text{area under demand up to } Q^*`, vars: [[r`Q^*`, 'units in the package']], words: 'The buyer must take the whole block. The price is total willingness to pay for those units, which is the rectangle MC × Q* plus the triangle above MC.', src: 'S11 slides pp.26-28' },
    { id: 's11-f-peak', name: 'Peak vs. off-peak (exercise)', latex: r`Q = \frac{P-a}{b},\quad OPE = \frac{1}{b}\cdot\frac{P}{Q},\quad \%\Delta P = \frac{\%\Delta Q}{OPE},\quad P^* = \frac{a+MC}{2}`, vars: [[r`P = a + bQ`, 'fitted inverse demand (b is negative)'], [r`OPE`, 'own-price elasticity at the current price']], words: 'Fit each season’s curve with quantity in jobs per month. Elasticity scales a quantity gap into a price change. Profit max on a straight line is the midpoint of the intercept and marginal cost.', src: EX },
  ],
  examples: [
    {
      id: 's11-ex-cs',
      title: 'Dr Pepper on campus: consumer surplus at $0.75',
      setup: r`Demand is \(Q_{DP} = 30{,}000 - 20{,}000 P_{DP}\). What is consumer surplus at P = $0.75? [[S11 slides p.18]]`,
      steps: [
        { ask: 'Inverse demand?', show: r`\(P = 1.50 - Q/20{,}000\). The choke price is **$1.50** (quantity is zero) and quantity is 30,000 at a price of zero.` },
        { ask: 'Quantity at $0.75?', show: r`\(Q = 30{,}000 - 20{,}000(0.75) = 15{,}000\).` },
        { ask: 'Triangle?', show: r`Height = \(1.50 - 0.75 = 0.75\). Base = 15,000. \(CS = (0.75)(15{,}000)/2 = \$5{,}625\).` },
      ],
      takeaway: 'Consumer surplus is value the buyer keeps: willingness to pay minus the price, added up. Here that leftover is $5,625.',
      src: 'S11 slides pp.18-20',
    },
    {
      id: 's11-ex-sundance',
      title: 'Sundance: the unlimited season pass',
      setup: r`Demand for a lift pass is \(Q = 10 - P/15\). Marginal cost is zero. What should Sundance charge for an unlimited season pass? [[S11 slides p.25]]`,
      steps: [
        { ask: 'Usage fee?', show: 'Marginal cost is zero, so the usage fee is **$0**. Skiing is free once you hold the pass.' },
        { ask: 'Inverse demand and the triangle?', show: r`\(P = 150 - 15Q\). At a usage price of $0, Q = 10 days. \(CS = \tfrac12(10)(150) = \$750\).` },
        { ask: 'Season pass?', show: 'Charge **$750**. That is the whole consumer surplus. Other two-part examples on the slides: Amazon Prime, and the Cougar Club (a one-time gift plus an annual renewal). [[S11 slides pp.23-24]]' },
      ],
      takeaway: 'Usage at marginal cost, access fee equal to consumer surplus.',
      src: 'S11 slides p.25',
    },
    {
      id: 's11-ex-block-dp',
      title: 'Block pricing a 12-pack of Dr Pepper',
      setup: r`The slide’s demand hits $1.50 at zero cans and $0 at 18 cans. Marginal cost equals average cost at **$0.50**, which demand reaches at **12 cans**. [[S11 slides p.27]]`,
      steps: [
        { ask: 'Why 12 cans?', show: r`That is \(Q^*\) where price equals marginal cost. Past 12 cans, willingness to pay is below the $0.50 cost.` },
        { ask: 'Price of the block?', show: r`Area under demand up to 12: rectangle \(0.50 \times 12 = \$6\) plus triangle \(\tfrac12(1.00)(12) = \$6\). **Block price = $12.** The slide’s store listing is $11.99 for a 12-pack.` },
        { ask: 'Profit?', show: 'The hatched triangle above marginal cost is **$6**. That is price minus cost: $12 − $6.' },
      ],
      takeaway: 'The customer must buy the whole 12-pack. The firm prices the package at total willingness to pay, not at $0.50 a can.',
      src: 'S11 slides p.27',
    },
    {
      id: 's11-ex-spotify',
      title: 'Spotify: an annual subscription as a block',
      setup: r`Inverse demand for the monthly service is \(P = 14 - Q\). Marginal cost is $2 per user per month. What should the annual subscription cost? [[S11 slides p.28]]`,
      steps: [
        { ask: 'Where does price equal marginal cost?', show: r`\(14 - Q = 2\) so \(Q^* = 12\) months.` },
        { ask: 'Total willingness to pay for those 12 months?', show: r`Rectangle \(2 \times 12 = \$24\) plus triangle \(\tfrac12(12)(12) = \$72\). **$96.**` },
        { ask: 'The slide’s answer?', show: 'Spotify should charge **$96** for the annual subscription.' },
      ],
      takeaway: 'A year of service is one block. Price it at the area under demand up to the month where willingness to pay equals marginal cost.',
      src: 'S11 slides p.28',
    },
    {
      id: 's11-ex-five',
      title: 'Five Guys combo',
      setup: r`Alex values a burger at $8 and a Dr Pepper at $2. Ben values the burger at $6 and the drink at $4. Each values the pair at $10. [[S11 slides p.31]]`,
      steps: [
        { ask: 'Burger at $8 and drink at $4?', show: 'Alex buys only the burger (the drink is worth $2 to him). Ben buys only the drink (the burger is worth $6 to him). Revenue = $8 + $4 = **$12**.' },
        { ask: 'Combo at $10?', show: 'Both value the pair at exactly $10, so both buy. Revenue = **$20**.' },
        { ask: 'Why the bundle wins?', show: 'Valuations are negatively correlated: Alex wants the burger, Ben wants the drink. One combo price captures both. Other bundling examples on the slides: Hulu with Disney+, Disneyland tickets, Allegiant. [[S11 slides p.30]]' },
      ],
      takeaway: 'Separate prices of $8 and $4 earn $12. The $10 combo earns $20.',
      src: 'S11 slides p.31',
    },
    {
      id: 's11-ex-cascade',
      title: 'Cascade Heating & Air: peak-load by season',
      setup: r`Cascade replaces residential systems along the Wasatch Front and posts **$4,000 per ton** year-round. Crews are booked in the temperature extremes and idle in the mild months. The owner wants the slow-season discount that would match busy-season volume, and whether that discount makes money. Data: every 2025 residential replacement (113 jobs). [[${EX}]] [[S11 slides p.34]]`,
      steps: [
        { ask: 'Which months are busy?', show: 'Count jobs by month. Busy: **January, February, July, August, December** (12, 12, 12, 12, 12). Slow: March–June (8 each) and September–November (7 each). Failures bunch up at about 100°F and in winter cold; spring and fall can wait. The exercise then treats busy as those 5 months and slow as the other 7.' },
        { ask: 'Price per ton, then the demand curves.', show: r`Price per ton = Invoice Total ÷ Tons. Check percentiles (PERCENTILE.INC, matching the sheet’s check cells): busy **$3,856 to $5,125**, slow **$3,500 to $4,500**. Build 11 prices from P25 to P75, count jobs at or above each price, and divide by 5 or 7 so both curves are **jobs per month**. Fitted lines: busy \(P = 5{,}861 - 219.1Q\) (R² = 0.90); slow \(P = 5{,}021 - 237.5Q\) (R² = 0.88). At $4,000 the busy curve is about **8.5 jobs per month** and the slow curve about **4.3**.` },
        { ask: 'Who is more price-sensitive at $4,000?', show: r`\(Q = (P - a)/b\) and \(OPE = (1/b)(P/Q)\). Busy: Q = 8.49, **OPE = −2.15**. Slow: Q = 4.30, **OPE = −3.92**. Slow-season buyers are more elastic: a postponed replacement is easy when the weather is mild.` },
        { ask: 'What discount equalizes monthly volume?', show: r`Slow season needs a 97.6% increase in jobs per month to reach 8.49. \(\%\Delta P = \%\Delta Q / OPE = 0.976 / -3.92 = -24.9\%\). New price ≈ **$3,004 per ton**. That is essentially the lowest slow-season price in the data ($3,000), so the forecast sits on the edge of the sample. Do not trust it far.` },
        { ask: 'Does equalizing make money? What price does?', show: r`Marginal cost ≈ **$2,517 per ton** (equipment $1,808 + subcontracted labor $708, each as total ÷ total tons). Average job ≈ **3.24 tons**. Profit per month = (Price − MC) × 3.24 × jobs per month. Equalizing cuts slow-season profit from about $144,600 to about $93,800. Profit-max prices, \(P^* = (a + MC)/2\): busy **$4,189** (+4.7%, Q* = 7.63) and slow **$3,769** (−5.8%, Q* = 5.27). Together those beat a flat $4,000 by about **$7,700 a year**.` },
        { ask: 'Keep the crew with the big discount?', show: 'The full equalizing discount costs about $55,900 a year relative to the profit-max slow price. Losing the crew (2 busy-season jobs a month that cannot be staffed, at the busy profit-max price) costs about $54,200. The discount does not pay for itself. Use the two profit-max prices, and keep the crew some cheaper way.' },
      ],
      takeaway: 'Peak-load here means a higher busy-season price and a modest slow-season discount, not a 25% cut that merely fills the schedule.',
      src: EX,
    },
  ],
  widgets: [
    {
      id: 'two-part',
      title: 'Sundance two-part price',
      intro: 'Same demand as the lecture: Q = 10 − P/15. Set the daily usage fee and the season-pass fee. With marginal cost at $0, the pass that captures all surplus is $750.',
      questions: [],
      numeric: [{ id: 's11-w1', label: 'Marginal cost is $0. What season-pass fee captures the entire consumer surplus?', part: { type: 'num', label: 'Season pass', answer: 750, kind: 'money', tol: 0.001 }, hint: 'Inverse demand is P = 150 − 15Q. At a usage price of $0, Q = 10. CS = ½ × 10 × 150.', src: 'S11 slides p.25' }],
    },
    {
      id: 'bundle-table',
      title: 'Five Guys combo',
      intro: 'Alex and Ben are the slide’s two customers. The combo starts at $10.',
      questions: [],
      numeric: [{ id: 's11-w2', label: 'With the starting reservation prices and a $10 combo, what revenue does the combo earn?', part: { type: 'num', label: 'Revenue', answer: 20, kind: 'money', tol: 0.001 }, hint: 'Both value the pair at $10, so both buy.', src: 'S11 slides p.31' }],
    },
  ],
  checkIds: ['s11-cs-def', 's11-cs-dp', 's11-pd-1', 's11-pd-2', 's11-pd-3', 's11-two-rule', 's11-bundle-when', 's11-five'],
  applyGenerators: ['s11-cs', 's11-twopart', 's11-block', 's11-bundle', 's11-peak'],
  traps: [
    { title: 'Which degree is which?', body: '1st = each person’s reservation price (auctions). 2nd = the price depends on quantity (bulk discounts). 3rd = the price depends on the group (student, senior, business vs. economy). [[S11 slides p.21]]', src: 'S11 slides p.21' },
    { title: 'Usage fee at the monopoly price', body: 'Two-part pricing sets the usage fee near marginal cost, then takes the surplus as the access fee. Sundance’s usage fee is $0 because marginal cost is $0. [[S11 slides pp.22,25]]', src: 'S11 slides p.22' },
    { title: 'Block pricing vs. bundling', body: 'A block is identical units (12 cans, 12 months of Spotify). A bundle is different products (burger and drink). [[S11 slides pp.26,29]]', src: 'S11 slides p.26' },
    { title: 'Jobs per season instead of jobs per month', body: 'Cascade’s slow season has 7 months and the busy season has 5. Comparing raw job counts makes the slow season look larger just because it is longer. Divide by months before you fit the curves. [[Advanced Pricing Strategies Exercise]]', src: EX },
    { title: 'The equalizing discount', body: 'The price that matches busy-season volume (~$3,004) sits on the lowest slow-season price in the data, and it cuts slow-season profit by about $50,000. The profit-max slow price is about $3,769, not $3,004. [[Advanced Pricing Strategies Exercise]]', src: EX },
    { title: 'Ignoring the backlash', body: 'The discussion slides are about whether different prices are innovative or heartless. Delta’s AI fares, Target’s data, and Uber’s surge are the Digital Dialog cases. [[S11 slides pp.14-15]] [[S11 Digital Dialog page]]', src: 'S11 Digital Dialog page' },
  ],
  feynman: [
    {
      id: 's11-fey-1',
      prompt: 'Explain Sundance’s $750 season pass to someone who has only seen a single daily ticket price.',
      model: 'Demand is Q = 10 − P/15, so the most anyone pays for a day is $150 and, at a price of zero, a skier wants 10 days. Marginal cost of one more day is zero, so charging for each day just shrinks use and leaves surplus with the skier. Sundance sets the daily fee at zero and charges the whole triangle, ½ × 10 × 150 = $750, as the season pass. The skier skis every day that is worth anything, and the resort keeps the surplus.',
      rubric: ['Named the demand function or the $150 choke price', 'Usage fee at marginal cost ($0)', 'Fee equals the triangle, $750', 'Said why a per-day price leaves surplus behind'],
    },
    {
      id: 's11-fey-2',
      prompt: 'Should Cascade cut the slow-season price by about 25% so crews stay as busy as they are in July? Argue from the exercise.',
      model: 'No. At the $4,000 list price the slow season is more elastic (about −3.9 versus −2.1), so a discount does raise volume, and the cut that matches busy-season jobs per month is about 25%, to roughly $3,004 a ton. That price is the bottom of the prices Cascade has actually charged, so the forecast is a stretch. It also gives up about $50,000 of slow-season profit. Setting MR = MC on each fitted line instead gives about $4,189 in the busy season and $3,769 in the slow season, and that pair beats a flat $4,000 by roughly $7,700 a year. Even the crew threat does not rescue the 25% cut: keeping those two busy-season jobs is worth about as much as the discount costs, not more. Offer the smaller slow-season discount, and keep the crew some cheaper way.',
      rubric: ['Slow season is more elastic', 'Equalizing price is about $3,000 and poorly supported by the data', 'Profit-max prices are about $4,189 and $3,769', 'The crew threat does not justify the full discount'],
    },
  ],
  deeper: [
    { title: 'Cross-subsidies are named, not taught', kind: 'textbook', body: 'The learning-objective slide says you should be able to calculate a profit-maximizing price for cross-subsidies, along with two-part pricing, block pricing, bundling, and peak-load pricing. The lecture slides do not define cross-subsidies or work an example. Do not import a textbook printer-and-ink problem and treat it as if it were on this deck. [[S11 slides p.17]]' },
    { title: 'Dynamic pricing discussion', kind: 'textbook', body: 'Slides titled “Heartless Monopolists or Innovative Leaders?” and “Thoughts on Dynamic Pricing” are the in-class discussion. The reading is one of: *How Companies Learn Your Secrets* (NYT Magazine), *Uber CEO: Surge Pricing Is Here To Stay* (WSJ), *Delta Gets Blowback for Using AI to Set Airfares* (WSJ), *How AI-driven pricing systems determine what you’re willing to pay* (Deseret News). Weigh who benefits, who is harmed and under what conditions, the ethical issues, and whether policymakers should intervene. [[S11 slides pp.14-15]] [[S11 Digital Dialog page]]' },
    { title: 'Peak-load examples on the slide', kind: 'textbook', body: 'The examples slide is Uber, Alta, Disneyland, and the Provo Recreation Center: higher prices when a fixed facility is crowded, lower prices when it is not. Cascade is the same idea with weather seasons instead of hours. [[S11 slides p.33]]' },
    { title: 'In a case interview', kind: 'case-interview', body: 'If a case says “one price,” ask which of the lecture’s tools fits. Similar customers and a meter → two-part (usage near cost, fee = surplus). Identical units people will take as a pack → block, priced at the area under demand. Different products with opposite tastes → a bundle. Demand that surges on a clock or a season, with capacity that cannot flex → peak-load, and do not “solve” it by discounting so hard that you only fill the schedule.' },
  ],
  summary: r`**Consumer surplus** is the triangle under demand and above price. Dr Pepper: \(Q = 30{,}000 - 20{,}000P\), at $0.75 quantity is 15,000 and **CS = $5,625**. [[S11 slides pp.18-20]]

- **Price discrimination:** 1st = reservation price (auctions); 2nd = quantity (bulk discounts); 3rd = group (student/senior, business/economy). [[S11 slides p.21]]
- **Two-part:** usage fee near MC, access fee = CS. Sundance \(Q = 10 - P/15\), MC = 0 → usage fee $0, season pass **$750**. [[S11 slides pp.22-25]]
- **Block:** identical units, all or nothing, price = area under demand up to where P = MC. Dr Pepper 12-pack **$12** (profit $6). Spotify \(P = 14 - Q\), MC = $2 → **$96** a year. [[S11 slides pp.26-28]]
- **Bundle:** different products, one price. Five Guys $8 and $4 earn **$12**; the $10 combo earns **$20**. Best when tastes are negatively correlated. [[S11 slides pp.29-31]]
- **Peak-load:** higher price when capacity is scarce (Uber, Alta, Disneyland, Provo Rec). Cascade: busy \(P = 5{,}861 - 219Q\), slow \(P = 5{,}021 - 238Q\); at $4,000 elasticities about **−2.15** and **−3.92**; equalizing price ≈ **$3,004** (don’t); profit-max ≈ **$4,189** busy and **$3,769** slow. [[S11 slides p.32]] [[${EX}]]
- **Exam:** Additional Pricing Strategies is 7% (3% conceptual, 4% application). Closed-book Testing Center exam, Mon Oct 19–Fri Oct 23, 4 hours, calculator but not a graphing one. [[S11 slides pp.6-8]]
- **Risks:** the discussion is whether different prices are fair. [[S11 slides pp.14-15]] [[S11 Digital Dialog page]]`,
}
