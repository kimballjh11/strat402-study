import { DataTable, HBar } from '../../components/Charts'
import { Cite } from '../../components/Cite'
import { CostcoDecomp } from '../../widgets/CostcoDecomp'
import type { Mcq, ModuleDef } from '../types'

function Diagram() {
  return (
    <figure className="card p-3 space-y-2">
      <figcaption className="font-semibold">
        Can a firm win on both sides of the wedge? <Cite tag="Porter §7, Fig.4" />
      </figcaption>
      <div className="grid gap-1.5 md:grid-cols-3 text-xs">
        <div className="card p-2"><strong>1 · Operational effectiveness misread as position.</strong> Better on both dimensions because it’s nearer a frontier every rival can reach; decays as best practice spreads.</div>
        <div className="card p-2"><strong>2 · A genuine frontier shift.</strong> A business-model innovation moves the frontier itself (Toyota); real dual advantage while it lasts.</div>
        <div className="card p-2"><strong>3 · One strategy with fortunate side effects.</strong> Choices made for cost happen to please customers (Southwest). Test: what does it refuse to do?</div>
      </div>
      <div className="card p-2 text-xs">
        <strong>Costco’s loop:</strong> few SKUs, pallets, no promotions, low SG&A → tiny markups (≤14–15% reported rule) → members trust the prices and Kirkland → higher fees, 92% renewal, ~2× sales per box → fixed costs spread further → even lower cost. Cost choices create the WTP, and the WTP funds the low cost.
      </div>
    </figure>
  )
}

function Exhibits() {
  return (
    <div className="space-y-4">
      <DataTable
        caption={<>Costco consolidated, $M <Cite tag="Costco Ex.1" /></>}
        head={['', 'FY2025', 'FY2024', 'FY2023', 'Q3 FY26']}
        rows={[['Net sales', '269,912', '249,625', '237,710', '69,154'], ['Membership fees', '5,323', '4,828', '4,580', '1,373'], ['Total revenue', '275,235', '254,453', '242,290', '70,527'], ['Merchandise costs', '239,886', '222,358', '212,586', '61,519'], ['SG&A', '24,966', '22,810', '21,590', '6,193'], ['Operating income', '10,383', '9,285', '8,114', '2,815'], ['Gross margin % of net sales', '11.12', '10.92', '10.57', '11.04'], ['SG&A % of net sales', '9.25', '9.14', '9.08', '8.96']]}
      />
      <DataTable
        caption={<>Sam’s Club segment, $M <Cite tag="Costco Ex.3" /></>}
        head={['', 'FY2026', 'FY2025', 'FY2024']}
        rows={[['Net sales', '93,015', '90,238', '86,179'], ['Membership and other income', '2,525', '2,323', '2,051'], ['Operating income', '2,442', '2,404', '2,192'], ['Clubs at year end', '601', '600', '599']]}
      />
      <DataTable
        caption={<>Selected comparisons <Cite tag="Costco Ex.4" /></>}
        head={['', 'Costco US', 'Sam’s Club']}
        rows={[['Units', '629 warehouses', '601 clubs'], ['Revenue per unit', '$318.0M', '$159.0M'], ['Revenue per sq ft', '~$2,164', '$1,187'], ['Employees per unit', '355', '166'], ['Average hourly wage', '~$32.00', '>$19'], ['Items in unit / online', '<4,000 / 9,000–10,000', '~4,000 / ~20,000'], ['Private brand share', '~28% (2022)', '~30% (press est.)'], ['Membership fee', '$65; Executive $130', '$60; Plus $120 (May 2026)'], ['Units opened, latest year', '27 opened, 24 net', '1 net']]}
      />
      <HBar title="Comparable sales growth, latest quarter (%)" rows={[{ label: 'Costco US (adjusted, Apr–May 2026)', value: 6.8 }, { label: 'Sam’s Club ex-fuel (Jul 2026)', value: 4.4 }]} digits={1} highlight="Costco US (adjusted, Apr–May 2026)" note={<>Definitions differ; calendars align only approximately <Cite tag="Costco Ex.5" /></>} />
      <DataTable
        caption={<>What each discloses about members <Cite tag="Costco Ex.6" /></>}
        head={['', 'Costco', 'Sam’s Club']}
        rows={[['Paid members', '81.0M (Aug 2025); 82.9M (May 2026)', 'Not disclosed'], ['Executive / Plus', '38.7M Executive ≈ 73.6% of worldwide sales', '“Growing” — no figure'], ['Renewal rate', '92.3% US & Canada; 89.8% worldwide', '“Record first-year renewal” — no figure']]}
      />
    </div>
  )
}

const Q = (o: Omit<Mcq, 'session'>): Mcq => ({ ...o, session: 'S11' })

export const S11: ModuleDef = {
  id: 'S11',
  short: 'Dual Advantage · Costco vs. Sam’s',
  framework: {
    oneLiner: 'A firm can hold **both** a cost and a willingness-to-pay advantage — but test the claim with Porter’s resolution: is it **operational effectiveness**, a **frontier shift**, or **one strategy whose trade-offs please customers**? Then put numbers on it: decompose the profit lead into its **cost** and **WTP** sources, with your assumptions stated [[Porter §7]].',
    analogy: 'A warehouse store that’s cheapest AND most loved looks like it’s breaking Porter’s rule. Look closer and the low prices themselves (made possible by refusing most products, displays and promotions) are what members love — like a restaurant whose one dish is so good and so cheap the line goes around the block. The cost choices create the loyalty; the loyalty funds the cost [[Porter §7]] [[Costco]].',
    intuition: [
      'The **hybrid objection** is real: Toyota, IKEA, Zara, Amazon, Southwest, Trader Joe’s all seem to win on cost and WTP at once [[Porter §7]].',
      'Porter’s resolution: (1) many are **operational effectiveness** — nearer a frontier everyone can reach; (2) some are **frontier shifts** from business-model innovation, real while they last; (3) most are **one strategy** whose trade-offs happen to please customers. The test: **what does it refuse?** [[Porter §7]]',
      'On the value stick, dual advantage = **raising WTP above rivals while lowering cost below them** — the wedge widens from both ends [[Diff Fig.1]].',
      'Costco’s refusals are loud: <4,000 SKUs, pallets, few promotions, no branded markup above ~14% (reported), stopping Coca-Cola, ending Amex, holding the $1.50 hot dog — **credible commitments** to low prices [[Costco]] [[Diff §7]].',
      'The numbers: Costco’s merchandise operations earn a thin positive spread (11.12% − 9.25%) and **membership fees are ~51% of operating income**; Sam’s merchandise spread is about **zero** (−$83M), so its profit is fees and other income [[Costco Ex.1, Ex.3]].',
      'WTP evidence: a higher fee, 92.3% renewal, Executive members ~73.6% of sales, and **~2× sales per box** (volume at parity). Cost evidence: SG&A 9.25% even while paying ~$32/hour with 94% retention [[Costco]] [[Diff §3]].',
      'Why Walmart’s buying power doesn’t rescue Sam’s: bargaining is the **weakest** scale mechanism, Costco concentrates volume on few SKUs (Kirkland is “a tremendous negotiating tool”), and Sam’s has had five leaders since 2005 — an Organization problem [[Scale]] [[Costco]].',
    ],
    howToRun: [
      '**1. State the claim** — both a cost and a WTP advantage vs. a named rival [[Porter §7]].',
      '**2. Test it:** OE (imitable best practice), frontier shift (new model), or one strategy with side effects? List what the firm refuses [[Porter §7]].',
      '**3. Find where profit is earned** — merchandise spread vs. fees (or the equivalent split) [[Costco Ex.1, Ex.3]].',
      '**4. Gather WTP evidence** (fees, renewal, volume at parity, premium tiers) and **cost evidence** (expense ratios, productivity, SKU count) [[Diff §3]].',
      '**5. Decompose the gap** (volume effect + margin effect) and assign each piece to cost or differentiation — **state every assumption** [[Costco]].',
      '**6. Check the loop:** do the cost choices create the WTP, and does the WTP fund the cost? That reinforcing system is what rivals can’t copy piecemeal [[Porter §3]].',
    ],
    recall: [
      { id: 'S11-hybrid', title: 'Porter’s three-part resolution of the hybrid objection', prompt: 'Name all three.', items: [{ name: 'Operational effectiveness misread as position' }, { name: 'Genuine frontier shift (real while it lasts)' }, { name: 'One strategy whose trade-offs please customers' }], src: 'Porter §7' },
      { id: 'S11-nums', title: 'Costco FY2025 anchors', prompt: 'The numbers to know.', items: [{ name: 'Gross margin 11.12% of net sales' }, { name: 'SG&A 9.25% of net sales' }, { name: 'Membership fees $5,323M ≈ 51% of operating income ($10,383M)' }, { name: 'Renewal 92.3% US & Canada' }, { name: 'Revenue per US warehouse ~$318M vs. Sam’s ~$159M' }], src: 'Costco Ex.1, Ex.4, Ex.6' },
      { id: 'S11-three', title: 'Assignment Q5: three things true at once', prompt: 'Higher fee, higher wages, lower prices — how?', items: [{ name: 'Fees carry about half the profit, so markups can stay tiny' }, { name: 'High wages buy productivity and retention, keeping SG&A per dollar low' }, { name: '~2× sales per box spreads fixed costs further' }], src: 'Costco' },
      { id: 'S11-why', title: 'Why Walmart’s scale doesn’t carry Sam’s', prompt: 'Assignment Q4.', items: [{ name: 'Bargaining is the weakest scale mechanism' }, { name: 'Costco concentrates volume per SKU; Kirkland is a negotiating tool' }, { name: 'Sam’s organization: leadership turnover, weak vendor relations' }], src: 'Scale; Costco' },
    ],
    diagram: Diagram,
    newScenarios: [
      { prompt: '**Brio Furniture** (fictional) sells stylish flat-pack furniture below rivals’ prices because customers assemble it and pick it up from a warehouse. Hybrid?', answer: 'Most likely one strategy with fortunate side effects (the IKEA pattern): its cost choices (flat-pack, self-service) are part of what customers like about it. Test what it refuses (assembly, delivery, sales help) [[Porter §7]].' },
      { prompt: '**Northwind Grocers** (fictional) adopts the same self-checkout and inventory software every rival bought last year and claims a “dual advantage.”', answer: 'Operational effectiveness misread as position: nearer a frontier everyone can reach; it will diffuse [[Porter §7]].' },
      { prompt: 'A warehouse club (fictional) earns all its profit from fees and nothing on merchandise. What does that tell you?', answer: 'Like Sam’s, its gross margin barely covers operating expenses; the fee is doing all the work, and the merchandise operation has no cost advantage of its own [[Costco Ex.3]].' },
    ],
  },
  argument: {
    intro: 'No new brief: the session tests Porter’s hybrid resolution against the cleanest available pair — two clubs that look identical from the parking lot.',
    propositions: [
      '**Dual advantage is possible but usually explained** by a frontier shift or one strategy with side effects, not by doing everything [[Porter §7]].',
      '**Refusals define the position** — “what does this firm refuse to do?” [[Porter §7]]',
      '**Fees as evidence of WTP:** members pay more and renew at 92% for the right to shop [[Costco Ex.6]] [[Diff §3]].',
      '**Cost as evidence of efficiency:** SG&A 9.25% while paying ~$32/hour [[Costco]].',
      '**The loop is the moat:** cost choices create WTP; WTP funds the low cost — copyable piece by piece, not as a system [[Porter §3]].',
      '**Buying power alone isn’t an advantage** — bargaining is the weakest scale mechanism, and organization decides whether it’s used [[Scale]] [[VRIO §5]].',
    ],
  },
  case: {
    protagonist: 'Chris Nicholas, Sam’s Club CEO since September 2023, eighteen months into a plan to double membership and more than double sales and profit [[Costco]].',
    decision: 'How can a firm have both a low-cost and a differentiation advantage — and what share of Costco’s advantage comes from cost vs. differentiation? With $2B of incremental capital and authority to change three things, what should Nicholas do? [[Costco]] [[Canvas S11]]',
    timeline: [
      { when: '1954 / 1976', what: 'Sol Price opens FedMart, then Price Club (“mark it up as little as possible”) [[Costco Ex.7]]' },
      { when: '1983', what: 'Sam’s Wholesale Club opens in April; Costco opens in Seattle in September' },
      { when: '1993', what: 'Costco and Price Club merge (206 warehouses)' },
      { when: '1995', what: 'Kirkland Signature launched as one brand' },
      { when: '2017', what: 'Sam’s peaks at 655 clubs; consolidates ~20 brands into Member’s Mark (22 years after Kirkland)' },
      { when: '2018', what: 'Sam’s closes 63 clubs' },
      { when: '2024', what: 'Costco raises fees to $65/$130; Vachris becomes CEO' },
      { when: 'Apr 2025', what: 'Nicholas’s plan: double members, remodel all clubs, ~15 new clubs a year' },
      { when: 'Aug 2026', what: 'Sam’s: 602 clubs, comps slowed to 4.4%; Costco: 928 warehouses, comps 5.9–8.6%' },
    ],
    exhibits: Exhibits,
  },
  tool: {
    title: 'Where Costco earns its lead — and how much is cost vs. differentiation',
    intro: 'Work the case’s assignment questions with the numbers: where each company earns its profit, a per-box income statement (with stated assumptions), then an exact decomposition of Costco’s per-box lead that you assign to cost or differentiation.',
    render: () => <CostcoDecomp />,
  },
  coldCalls: [
    { id: 'c1', level: 'Facts', q: 'Where does Costco earn its operating income?', model: 'About half from membership fees ($5,323M of $10,383M, ~51%) and half from a thin merchandise spread — gross margin 11.12% minus SG&A 9.25% ≈ 1.87% of net sales, ~$5,060M [[Costco Ex.1]].', weak: 'From selling lots of stuff.', whyWeak: 'Misses the fee/merchandise split that answers Q2.' },
    { id: 'c2', level: 'Facts', q: 'What can you infer about Sam’s gross margin and expenses even though Walmart doesn’t disclose them?', model: 'Operating income $2,442M minus membership & other income $2,525M = −$83M, so Sam’s gross margin minus operating expenses is about −0.09% of net sales: its merchandise operation roughly breaks even and all its profit is fees and other income [[Costco Ex.3]].', weak: 'Nothing — it isn’t disclosed.', whyWeak: 'The exhibit allows the inference.' },
    { id: 'c3', level: 'Analysis', q: 'How can Costco charge a higher fee, pay ~$32 vs. ~$19 an hour, AND have lower shelf prices?', model: 'Fees carry about half the profit, so markups stay tiny; high wages buy productivity and 94% retention, so SG&A stays ~9% of sales; and sales per box are ~2× Sam’s, spreading fixed costs. The three reinforce each other [[Costco]].', weak: 'Costco is just better run.', whyWeak: 'No mechanism.' },
    { id: 'c4', level: 'Analysis', q: 'Sam’s buys alongside a $706B parent. Why doesn’t that help more?', model: 'Bargaining is the weakest scale mechanism (Wright: purchased material 88%, raw 95%), and Costco concentrates enormous volume on fewer than 4,000 SKUs with Kirkland as a “tremendous negotiating tool.” And Sam’s has the organization problem — five leaders since 2005, poor vendor relations — so the parent’s scale isn’t exploited [[Scale]] [[Costco]] [[VRIO §5]].', weak: 'It should help — Sam’s just needs time.', whyWeak: 'Ignores the brief’s evidence on bargaining.' },
    { id: 'c5', level: 'Analysis', q: 'Is Costco a hybrid by Porter’s standard?', model: 'Best read as part 3 — one strategy (cost) whose trade-offs please customers — that has become a reinforcing loop close to part 2 (a frontier shift). The cost choices (few SKUs, pallets, no promotions, tiny markups) are exactly what members trust and pay a fee for [[Porter §7]].', weak: 'Yes, it’s both cheap and good.', whyWeak: 'Doesn’t apply the three-part test.' },
    { id: 'c6', level: 'Analysis', q: 'Sort Exhibit 4’s differences into causes, consequences and neither.', model: 'Plausible causes: wage level and retention, SKU discipline, private-brand history (Kirkland 22 years earlier), fee structure, leadership continuity. Consequences: revenue per box, per sq ft, units opened, comparable sales. Neither (or ambiguous): box size (~147k vs. ~134k sq ft), item counts in store (~4,000 each), revenue per employee (definitions differ) [[Costco Ex.4]].', weak: 'All of them cause the gap.', whyWeak: 'Confuses outcomes with drivers.' },
    { id: 'c7', level: 'Judgment', q: 'What share of Costco’s advantage is cost, and what share is differentiation?', model: 'Decompose Costco’s ~$6.9M per-box operating-income lead: a volume effect (~2× sales per box at Sam’s margin, ~$4.1M) and a margin effect (~$2.8M). If half the volume reflects members choosing to spend more (WTP) and 60% of the margin edge is cost efficiency, it’s roughly half and half — and the honest answer states the assumptions, because the case gives no split [[Costco Ex.1-4]].', weak: 'It’s all cost — they’re cheap.', whyWeak: 'Ignores fees, renewal and volume at parity as WTP evidence.' },
    { id: 'c8', level: 'Judgment', q: 'Is Sam’s Club stuck in the middle?', model: 'It shows the symptoms: same format and SKU count as Costco without the cost spread (merchandise ≈ break-even), a lower fee, and a plan that adds technology and remodels rather than refusals. Its distinctive bet — Scan & Go and digital — is a convenience differentiator, but it hasn’t shown up as margin [[Costco]] [[Porter §6]].', weak: 'No, it’s growing sales.', whyWeak: 'Growth isn’t position.' },
    { id: 'c9', level: 'Action', q: 'You’re Nicholas with $2B and three changes. What do you do?', model: 'Fix the cost spread before the footprint: (1) concentrate volume on fewer SKUs and deepen Member’s Mark to win buying power per item; (2) invest in wages/retention where productivity data supports it; (3) use digital (Scan & Go, delivery) as the differentiator and price the fee/Plus tier to it. Expect merchandise spread and renewal (if disclosed) to move first; comps later [[Costco]].', weak: 'Open 50 new clubs.', whyWeak: 'Multiplies a box that earns nothing on merchandise.' },
    { id: 'c10', level: 'Action', q: 'One sentence: how can a firm have both advantages?', model: 'When its cost choices themselves create what customers value — Costco’s refusals produce prices members trust and pay a fee for, and the fees and volume that trust generates fund even lower costs — a reinforcing system rivals can’t copy piece by piece.', weak: 'By being good at everything.', whyWeak: 'That’s the stuck-in-the-middle wish.' },
  ],
  devil: {
    argument: 'Costco has no differentiation advantage — it’s a pure cost leader. Members pay the fee because the savings exceed it, not because they value Costco more.',
    response: 'Porter would partly agree: one strategy with fortunate side effects. But the accounts show WTP above Sam’s at near-equal prices: a higher fee, 92.3% renewal, Executive members (~74% of sales) paying $130, and roughly double sales per box — the brief’s retention and volume-at-parity tests [[Costco Ex.6]] [[Diff §3]]. Kirkland quality and credible commitments (the $1.50 hot dog, stopping Coca-Cola over price) raise trust independent of any single price. Honest answer: it starts as cost and converts into WTP; the split depends on assumptions you must state.',
    probes: ['If it’s all cost, why does Costco charge a higher fee than Sam’s?', 'Would members pay the fee if prices matched Sam’s?', 'What evidence would settle the split?'],
  },
  pyramid: {
    prompt: 'Answer: **How can a firm have both a low-cost and a differentiation advantage — and what share of Costco’s comes from each?** Combined structure.',
    model: {
      structure: 'combined',
      s: 'Costco and Sam’s Club run nearly identical formats — big boxes, ~4,000 items, paid memberships [[Costco]].',
      c: 'Yet Costco earns ~$10.9M of operating income per US warehouse vs. ~$4.1M per Sam’s club, despite paying ~$32 vs. ~$19 an hour and charging lower prices [[Costco Ex.4]].',
      q: 'How does Costco hold both a cost and a differentiation advantage, and how much comes from each?',
      a: 'Costco holds both because its cost choices create the trust members pay for and the fees and volume that trust generates fund even lower costs, so its lead splits roughly evenly between cost and differentiation on reasonable assumptions.',
      supports: [
        { label: 'Major premise', point: 'Dual advantage is real when one system of choices lowers cost and raises WTP at once (frontier shift / one strategy with side effects) [[Porter §7]].', evidence: ['Refusals define the position'] },
        { label: 'Minor premise', point: 'Costco’s refusals (few SKUs, pallets, no promotions, ≤14–15% markups) lower cost and create the low-price trust members pay a premium fee for.', evidence: ['SG&A 9.25% with $32/hr wages', 'Fee $65/$130 vs. $60/$120; renewal 92.3%', 'Revenue per box ~$318M vs. ~$159M'] },
        { label: 'Therefore', point: 'The per-box lead splits into a volume effect (~$4.1M) and a margin effect (~$2.8M); assigning them gives roughly half cost, half differentiation.', evidence: ['Assumptions: ~50% of volume = WTP; ~60% of margin edge = cost efficiency'] },
      ],
      competing: '“It’s all cost.” It fails on its own terms: a pure cost story can’t explain why members pay a higher fee and renew at 92% for access to prices Sam’s nearly matches.',
      memo: 'Deductive spine (Porter’s resolution as the major premise) with inductive evidence under each premise; the quantitative split is stated with explicit assumptions.',
    },
  },
  checkIds: ['S11-q01', 'S11-q02', 'S11-q04', 'S11-q06', 'S11-q08', 'S11-q10', 'S11-q12', 'S11-q14', 'S11-q16', 'S11-q18'],
  bank: [
    Q({ id: 'S11-q01', kind: 'quant', src: 'Costco Ex.1', stem: 'Costco FY2025: net sales $269,912M, merchandise costs $239,886M, SG&A $24,966M. The merchandise spread (GM − SG&A) is about…', correct: 1, options: [
      { text: '$30,026M', why: 'That’s gross profit before SG&A.' },
      { text: '$5,060M', why: '269,912 − 239,886 − 24,966.' },
      { text: '$10,383M', why: 'That’s operating income including fees.' },
      { text: '$24,966M', why: 'That’s SG&A.' },
    ] }),
    Q({ id: 'S11-q02', kind: 'quant', src: 'Costco Ex.1', stem: 'Membership fees ($5,323M) are roughly what share of Costco’s operating income ($10,383M)?', correct: 2, options: [
      { text: '~2%', why: 'That’s fees as a share of revenue.' },
      { text: '~25%', why: 'Arithmetic slip.' },
      { text: '~51%', why: '5,323 ÷ 10,383.' },
      { text: '~100%', why: 'That would be Sam’s, roughly.' },
    ] }),
    Q({ id: 'S11-q03', kind: 'quant', src: 'Costco Ex.3', stem: 'Sam’s FY2026: operating income $2,442M, membership & other income $2,525M. What does that imply?', correct: 0, options: [
      { text: 'Gross margin minus operating expenses ≈ −$83M: the merchandise operation roughly breaks even; profit comes from fees and other income.', why: 'Assignment Q2’s inference.' },
      { text: 'Sam’s merchandise margin is higher than Costco’s.', why: 'The opposite.' },
      { text: 'Sam’s has no operating expenses.', why: 'No.' },
      { text: 'Nothing can be inferred.', why: 'The subtraction is valid.' },
    ] }),
    Q({ id: 'S11-q04', kind: 'concept', src: 'Porter §7', stem: 'Which is NOT part of Porter’s resolution of the hybrid objection?', correct: 3, options: [
      { text: 'Many hybrids are operational effectiveness misread as position.', why: 'Part 1.' },
      { text: 'Genuine dual advantage can come from a business-model innovation that shifts the frontier.', why: 'Part 2.' },
      { text: 'Most apparent hybrids are one strategy whose trade-offs please customers.', why: 'Part 3.' },
      { text: 'Hybrids succeed by refusing nothing and doing everything well.', why: 'The opposite — a position requires refusals.' },
    ] }),
    Q({ id: 'S11-q05', kind: 'quant', src: 'Costco Ex.4', stem: 'Costco US revenue $200,046M across 629 warehouses ≈ $318M per unit; Sam’s ≈ $159M. What does the ~2× gap most directly indicate?', correct: 1, options: [
      { text: 'Costco’s boxes are twice as large.', why: '~147k vs. ~134k sq ft.' },
      { text: 'Volume at parity — members spend far more per box, a signal of WTP and a driver of lower unit cost.', why: 'Revenue per sq ft ~$2,164 vs. $1,187.' },
      { text: 'Costco charges twice the prices.', why: 'Costco is believed to be cheaper.' },
      { text: 'Sam’s has more stores.', why: 'Per-unit comparison.' },
    ] }),
    Q({ id: 'S11-q06', kind: 'case', src: 'Costco', stem: 'How can Costco charge a higher fee, pay higher wages AND have lower prices?', correct: 0, options: [
      { text: 'Fees carry ~half the profit so markups stay tiny; high wages buy productivity/retention keeping SG&A low; ~2× sales per box spreads fixed cost.', why: 'Assignment Q5 logic.' },
      { text: 'Costco loses money.', why: 'It earned $10.4B.' },
      { text: 'Costco’s suppliers subsidize it.', why: 'Not in the case.' },
      { text: 'It can’t; the case is wrong.', why: 'The numbers reconcile.' },
    ] }),
    Q({ id: 'S11-q07', kind: 'case', src: 'Scale', stem: 'Why doesn’t Walmart’s $706B purchasing scale make Sam’s cheaper than Costco?', correct: 2, options: [
      { text: 'Walmart doesn’t share suppliers.', why: 'Sam’s buys alongside Walmart.' },
      { text: 'Costco is bigger.', why: 'Walmart is far bigger.' },
      { text: 'Bargaining is the weakest scale mechanism, Costco concentrates volume on few SKUs, and Sam’s organization doesn’t exploit the parent’s scale.', why: 'Scale brief + case.' },
      { text: 'Tariffs.', why: 'Not the explanation.' },
    ] }),
    Q({ id: 'S11-q08', kind: 'apply', src: 'Porter §7', stem: '**Jetstream Air** (fictional) flies one aircraft type, turns planes in 25 minutes, and is also rated friendliest airline. Porter’s most likely reading?', correct: 1, options: [
      { text: 'A genuine hybrid that disproves Porter.', why: 'Porter’s own Southwest reading says otherwise.' },
      { text: 'One strategy (cost) whose trade-offs happen to please customers — test what it refuses.', why: 'Part 3.' },
      { text: 'Stuck in the middle.', why: 'It has a clear cost position.' },
      { text: 'Operational effectiveness only.', why: 'A single fleet and fast turns are structural choices.' },
    ] }),
    Q({ id: 'S11-q09', kind: 'case', src: 'Costco Ex.6', stem: 'Which Costco disclosure is the strongest evidence of willingness to pay?', correct: 3, options: [
      { text: '928 warehouses.', why: 'Scale, not WTP.' },
      { text: 'Gross margin 11.04%.', why: 'A cost/price measure.' },
      { text: 'SG&A 8.96%.', why: 'Cost.' },
      { text: '92.3% renewal (US & Canada) with Executive members (~74% of sales) paying $130.', why: 'Retention and premium-tier evidence.' },
    ] }),
    Q({ id: 'S11-q10', kind: 'concept', src: 'Diff §7', stem: 'Costco’s $1.50 hot dog (held since the mid-1980s; it built hot dog plants rather than raise the price) best illustrates…', correct: 0, options: [
      { text: 'a credible commitment to low prices — a promise rivals could say but won’t sign.', why: 'Diff §7.' },
      { text: 'operational effectiveness.', why: 'It’s a commitment, not a best practice.' },
      { text: 'a scale economy.', why: 'Not the point.' },
      { text: 'a premium harvest.', why: 'Opposite.' },
    ] }),
    Q({ id: 'S11-q11', kind: 'quant', src: 'Costco Ex.4', stem: 'Costco US operating income $6,878M across 629 warehouses ≈ $10.9M per box; Sam’s $2,442M across 601 clubs ≈ $4.1M. The per-box gap is about…', correct: 2, options: [
      { text: '$2.8M', why: 'That’s the margin effect alone.' },
      { text: '$4.1M', why: 'That’s Sam’s per box (and roughly the volume effect).' },
      { text: '$6.9M', why: '10.93 − 4.06.' },
      { text: '$15.0M', why: 'Added instead of subtracted.' },
    ] }),
    Q({ id: 'S11-q12', kind: 'concept', src: 'Costco', stem: 'The decomposition of Costco’s per-box lead into “volume” and “margin” effects is exact. What is NOT given by the case and must be assumed?', correct: 1, options: [
      { text: 'Costco’s US revenue.', why: 'Disclosed (Ex.2).' },
      { text: 'How much of each effect to attribute to cost vs. differentiation.', why: 'A judgment you must state.' },
      { text: 'Sam’s operating income.', why: 'Disclosed (Ex.3).' },
      { text: 'Number of units.', why: 'Disclosed.' },
    ] }),
    Q({ id: 'S11-q13', kind: 'case', src: 'Costco Ex.4', stem: 'Which Exhibit 4 difference is most plausibly a CONSEQUENCE of the performance gap rather than a cause?', correct: 3, options: [
      { text: 'Average hourly wage.', why: 'Plausibly a cause (productivity, retention).' },
      { text: 'Items carried.', why: 'Similar at both (~4,000).' },
      { text: 'Private brand history.', why: 'Plausibly a cause.' },
      { text: 'Units opened in the latest year (27 vs. 1 net).', why: 'Expansion follows from profitability.' },
    ] }),
    Q({ id: 'S11-q14', kind: 'apply', src: 'Porter §6', stem: 'A club (fictional) matches Costco’s format and SKU count but earns nothing on merchandise and charges a lower fee. Its biggest risk?', correct: 2, options: [
      { text: 'Over-differentiation.', why: 'It isn’t differentiated.' },
      { text: 'Supplier power.', why: 'Not the main issue.' },
      { text: 'Being stuck in the middle — no cost advantage against Costco and no premium.', why: 'Porter §6.' },
      { text: 'Antitrust.', why: 'No.' },
    ] }),
    Q({ id: 'S11-q15', kind: 'case', src: 'Costco', stem: 'What did Costco do when Coca-Cola wouldn’t provide competitive pricing in 2009?', correct: 0, options: [
      { text: 'Stopped restocking Coke products and told members why.', why: 'The case.' },
      { text: 'Raised Coke prices.', why: 'No.' },
      { text: 'Switched to Pepsi permanently.', why: 'Coke returned about three weeks later.' },
      { text: 'Sued Coca-Cola.', why: 'No.' },
    ] }),
    Q({ id: 'S11-q16', kind: 'concept', src: 'Diff Fig.1', stem: 'On the value stick, a dual advantage means…', correct: 3, options: [
      { text: 'raising price and cost together.', why: 'That’s not an advantage.' },
      { text: 'lowering price to equal cost.', why: 'Margin disappears.' },
      { text: 'moving only the top.', why: 'That’s differentiation alone.' },
      { text: 'raising WTP above rivals’ AND lowering cost below theirs — widening the wedge from both ends.', why: 'Both levels move.' },
    ] }),
    Q({ id: 'S11-q17', kind: 'case', src: 'Costco', stem: 'Kirkland Signature’s function, per Costco’s chief merchandising officer, is…', correct: 1, options: [
      { text: 'a luxury brand.', why: 'No.' },
      { text: '“a tremendous negotiating tool.”', why: 'The case quote.' },
      { text: 'a way to raise prices.', why: 'Opposite.' },
      { text: 'a loss leader.', why: 'Not stated.' },
    ] }),
    Q({ id: 'S11-q18', kind: 'apply', src: 'Porter §7', stem: 'Which question best tests whether Costco’s dual advantage is real or just operational effectiveness?', correct: 0, options: [
      { text: 'Could rivals copy it by adopting best practices — and what does Costco refuse that rivals keep doing?', why: 'Frontier/refusal test.' },
      { text: 'Is Costco profitable?', why: 'Doesn’t distinguish OE from position.' },
      { text: 'Is Costco large?', why: 'Size isn’t position.' },
      { text: 'Do customers like Costco?', why: 'Not sufficient.' },
    ] }),
    Q({ id: 'S11-q19', kind: 'quant', src: 'Costco Ex.1', stem: 'Costco’s gross margin rose from 10.57% (FY2023) to 11.12% (FY2025) while SG&A rose from 9.08% to 9.25%. The merchandise spread (GM − SG&A) moved from about…', correct: 0, options: [
      { text: '1.49 to 1.87 percentage points.', why: '10.57 − 9.08 = 1.49; 11.12 − 9.25 = 1.87.' },
      { text: '1.87 to 1.49 points.', why: 'Reversed.' },
      { text: '19.65 to 20.37 points.', why: 'Added instead of subtracting.' },
      { text: 'It didn’t change.', why: 'It widened.' },
    ] }),
    Q({ id: 'S11-q20', kind: 'case', src: 'Costco Ex.6', stem: 'Why is Sam’s weaker disclosure itself relevant to the analysis?', correct: 3, options: [
      { text: 'It proves Sam’s is unprofitable.', why: 'Sam’s is profitable.' },
      { text: 'It shows Sam’s has more members.', why: 'Unknown.' },
      { text: 'It’s irrelevant.', why: 'It limits what you can conclude.' },
      { text: 'You can’t measure Sam’s WTP (paid members, renewal, Plus penetration), so any cost-vs-differentiation comparison must state assumptions and caveats.', why: 'Assignment Q7: what information you’d need.' },
    ] }),
  ],
  shorts: [
    { id: 'S11-sa1', session: 'S11', src: 'Costco Ex.1, Ex.3', prompt: 'Using the exhibits, explain where Costco and Sam’s each earn their profit.', model: 'Costco: ~half from fees ($5,323M of $10,383M) and half from a thin merchandise spread (11.12% − 9.25%). Sam’s: operating income $2,442M minus membership & other $2,525M ≈ −$83M, so its merchandise operation roughly breaks even and its profit is fees and other income.', points: ['Costco split', 'Sam’s inference', 'Numbers'] },
    { id: 'S11-sa2', session: 'S11', src: 'Porter §7', prompt: 'Apply Porter’s hybrid resolution to Costco in three sentences.', model: 'It isn’t mere operational effectiveness — Sam’s has the same format and tools. It’s best read as one cost strategy whose trade-offs please customers, compounding into something like a frontier shift: refusals create low prices, low prices create trust and fees, fees and volume fund lower costs. The test is its refusals.', points: ['Rejects OE', 'One strategy / frontier shift', 'Refusals'] },
    { id: 'S11-sa3', session: 'S11', src: 'Costco', prompt: 'Give your cost vs. differentiation split for Costco and defend one assumption.', model: 'e.g., ~50/50: the per-box lead (~$6.9M) = volume (~$4.1M) + margin (~$2.8M). Assume half the volume effect is WTP (members choose to spend more — 92% renewal, Executive tier) and 60% of the margin effect is cost (SG&A 9.25% at $32/hr).', points: ['A split', 'Decomposition', 'Defended assumption'] },
    { id: 'S11-sa4', session: 'S11', src: 'Scale; Costco', prompt: 'Why isn’t Walmart’s purchasing scale enough for Sam’s?', model: 'Bargaining is the weakest scale mechanism; Costco concentrates volume per item on <4,000 SKUs and uses Kirkland as leverage; and Sam’s organization (leadership turnover, vendor relations) doesn’t exploit the parent’s scale.', points: ['Weakest mechanism', 'Volume per SKU', 'Organization'] },
  ],
  written: {
    prompt: '**Timed (25 min, includes calculation).** Using the case exhibits: (a) show where Costco and Sam’s each earn their operating income; (b) compute operating income per box for Costco US and Sam’s and split the gap into a volume effect and a margin effect; (c) state what share you attribute to cost vs. differentiation and defend your assumptions.',
    minutes: 25,
    model: '(a) Costco: fees $5,323M ≈ 51% of $10,383M; merchandise spread ≈ $5,060M (11.12% − 9.25%). Sam’s: $2,442M − $2,525M = −$83M on merchandise. (b) Costco US: $6,878M ÷ 629 ≈ $10.93M; Sam’s $2,442M ÷ 601 ≈ $4.06M; gap ≈ $6.87M. Volume effect = ($318.0M − $159.0M) × Sam’s margin 2.56% ≈ $4.07M; margin effect = $318.0M × (3.44% − 2.56%) ≈ $2.80M. (c) A defended split, e.g., ~45–55% cost, using fee/renewal/Executive evidence for WTP and SG&A/wages/SKU evidence for cost; state fiscal-year and definition caveats.',
    rubric: ['Correct fee/merchandise split', 'Correct per-box OI and decomposition', 'Explicit, defended assumptions', 'Uses Porter’s hybrid resolution', 'States data caveats'],
  },
  oral: { prompt: 'How can Costco have both a cost and a differentiation advantage — and how much of each?', probes: ['Isn’t it just a cost leader?', 'Where does Sam’s earn its profit?', 'Why doesn’t Walmart’s scale help Sam’s?', 'Defend your split.'] },
  summary: {
    answer: 'Costco holds both because its cost choices (few SKUs, pallets, no promotions, tiny markups) create the price trust members pay a premium fee for, and the fees and ~2× volume per box fund even lower costs. Its ~$6.9M per-box lead splits into a volume effect (~$4.1M) and a margin effect (~$2.8M); on reasonable, stated assumptions that’s roughly half cost, half differentiation.',
    numbers: [
      { label: 'Costco GM / SG&A', value: '11.12% / 9.25% of net sales', src: 'Costco Ex.1' },
      { label: 'Fees as share of operating income', value: '~51% ($5,323M of $10,383M)', src: 'Costco Ex.1' },
      { label: 'Sam’s merchandise spread', value: '≈ −$83M', src: 'Costco Ex.3' },
      { label: 'Revenue per box', value: '~$318M vs. ~$159M', src: 'Costco Ex.4' },
      { label: 'OI per box', value: '~$10.9M vs. ~$4.1M', src: 'Costco Ex.2-4' },
      { label: 'Renewal', value: '92.3% US & Canada', src: 'Costco Ex.6' },
    ],
    frameworkBullets: ['Hybrid resolution: OE / frontier shift / one strategy', 'Refusals define the position', 'Dual advantage = both ends of the wedge', 'Decompose; state assumptions'],
    caseBullets: ['Costco: fees ~half of profit; thin merchandise spread', 'Sam’s: merchandise ≈ break-even', 'Higher fee + higher wages + lower prices reconcile', 'Bargaining scale ≠ advantage without organization'],
  },
  crossLinks402: [{ topic: 'Two-part pricing (membership fee + low per-unit price)', note: 'STRAT 402’s advanced pricing covers two-part pricing — the economics of a warehouse-club fee.', href: '#/learn/S11' }],
}
