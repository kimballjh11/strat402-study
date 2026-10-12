import { DataTable, HBar } from '../../components/Charts'
import { Cite } from '../../components/Cite'
import { NoteBox } from '../../components/Note'
import { DiffCompare } from '../../widgets/DiffCompare'
import type { Mcq, ModuleDef } from '../types'

function Diagram() {
  return (
    <figure className="card p-3 space-y-2">
      <figcaption className="font-semibold">
        Product vs. beyond-product differentiation, judged with the same tests <Cite tag="Diff §2, §7" /> <Cite tag="Porter §4" />
      </figcaption>
      <div className="grid gap-2 md:grid-cols-2 text-sm">
        <div className="surface-2 rounded p-2">
          <strong>Product differentiation</strong>
          <div className="text-xs">WTP from the offering itself — performance, features, design (Porter’s “technology and the product” engine).</div>
          <div className="text-xs mt-1"><em>Strength:</em> visible, testable, provable as a price premium. <em>Weakness:</em> copied (Casper) or normalized (Peloton).</div>
        </div>
        <div className="surface-2 rounded p-2">
          <strong>Beyond-product differentiation</strong>
          <div className="text-xs">WTP from what surrounds the offering — people (“the encounter is the product”), trust, ownership, purpose, community.</div>
          <div className="text-xs mt-1"><em>Strength:</em> rests on social complexity, path dependence, credible commitment. <em>Weakness:</em> slow, hard to verify and measure, founder- and capital-constrained.</div>
        </div>
      </div>
      <p className="text-xs muted">The verdict depends on the market: in a credence business (auto repair) trust IS what the customer buys.</p>
    </figure>
  )
}

function Exhibits() {
  return (
    <div className="space-y-4">
      <DataTable
        caption={<>Two models for the same small business <Cite tag="More Ex.3" /></>}
        head={['Dimension', 'Private equity roll-up', 'A More Company trust']}
        rows={[
          ['Ownership', 'Concentrated, investors', 'Employee ownership trust, permanent'],
          ['Exit', 'Resale within holding period — the exit is the product', 'None possible; liquidation to charity'],
          ['Profit distribution', 'Owners and fund waterfall; employees at market wage', 'Profit shares for all; 10% to charity'],
          ['Time horizon', 'Fund life, 5–10 years', 'Perpetual'],
          ['Pitch to a retiring founder', 'The highest check', 'A lower check; people, name, legacy protected'],
          ['Source of operating advantage', 'Scale, consolidation, pricing power, cost reduction', 'Engagement: tenure, trust, service quality, reputation'],
          ['Growth capital', 'Equity and leverage, abundant', 'Cash flow and debt only'],
          ['Failure mode', 'Overleverage, hollowed-out acquisitions', 'Slow growth, founder dependence, capital starvation'],
          ['Governing number', 'Valuation', 'Value creation'],
        ]}
      />
      <DataTable
        caption={<>Three overlapping networks <Cite tag="More Ex.4" /></>}
        head={['', 'Movement', 'Community', 'Vertical']}
        rows={[
          ['Held together by', 'The idea', 'Shared place', 'Operational overlap (shared services)'],
          ['Economic case to join', 'Weakest — almost entirely ideological', 'Moderate', 'Strongest — direct and measurable'],
          ['Cost to run', 'Low', 'Moderate', 'High (staffing, governance, capital)'],
          ['Status 2026', 'Already moving (Holub, Felser)', 'Not built', 'Not built'],
          ['Failure mode', 'Enthusiasm without practice', 'Stays a chamber of commerce', 'Members join for savings, skip the idea'],
          ['What it proves', 'The idea travels', 'The effect compounds in a place', 'The model is economically competitive'],
        ]}
      />
      <HBar title="US employee engagement, H1 2026 (Gallup)" rows={[{ label: 'Engaged', value: 31 }, { label: 'Not engaged', value: 51 }, { label: 'Actively disengaged', value: 18 }]} unit="%" digits={0} highlight="Engaged" note={<>Global 2025: 20 / 64 / 16 <Cite tag="More Ex.5" /></>} />
      <HBar title="Employee profit distributions after the transition" rows={[{ label: 'Before (approx.)', value: 40 }, { label: 'First full year under the trust', value: 400 }]} unit="k" digits={0} highlight="First full year under the trust" note={<>“…without raising prices” <Cite tag="More Ex.6" /></>} />
    </div>
  )
}

const Q = (o: Omit<Mcq, 'session'>): Mcq => ({ ...o, session: 'S10' })

export const S10: ModuleDef = {
  id: 'S10',
  short: 'Beyond-Product Diff. · A More Co.',
  framework: {
    oneLiner: 'Differentiation doesn’t have to live in the product. It can come from **people, trust, ownership and purpose** around the product — judged by the same rules: the buyer must **perceive and pay**, the premium must show in the accounts, and a **durability mechanism** must stop rivals copying it [[Diff §1, §7]] [[Porter §4]].',
    analogy: 'Two auto shops quote the same brake job. One has the newest diagnostic machine. The other has a mechanic who told you last year your brakes were fine when they were, and has worked there ten years. You can’t check either mechanic’s work — so you pay for the one you trust [[More Co]] [[Diff §2]].',
    intuition: [
      'Porter’s paper names three differentiation engines: technology/product, process, and **people — where the encounter is the product** (Ritz-Carlton, Chick-fil-A, USAA, Nordstrom) [[Porter §4]].',
      'Clegg’s theory is **causal**, not about morale: invest in what a person is trying to build in life → an employee who cares → work customers value. In repair the mechanism is visible: fewer comebacks, honest tickets, a reputation that fills bays [[More Co]].',
      'Auto repair is a **credence** market — customers can’t verify the work. The Differentiation Brief lists **trust** as a source of WTP and uses auto repair as its example (63% don’t trust repair shops; 64% have found one they do) [[Diff §2]].',
      'Structure can be a **credible commitment**: a perpetual purpose trust can never be sold, so the promise to employees can’t be walked back — a PE-owned rival can say the words but can’t sign the document [[Diff §7]] [[More Co]].',
      'But the brief’s tests still apply: where does the gain land? Profit distributions rose 10× **without raising prices** — that’s volume/cost, not (yet) a price premium [[More Ex.6]] [[Diff §3, §8]].',
      'The practical limits: the practice spreads one conversation at a time (~25% of the workforce consistently engaged), depends on managers’ skill and the founder’s attention, and the trust can’t sell equity [[More Co]] [[More Ex.3]].',
    ],
    howToRun: [
      '**1. Name the buyer, the alternative and the source of WTP** (trust? identity? risk reduction?) [[Diff §8]].',
      '**2. Is the attribute verifiable or a credence attribute?** If credence, what signals it? [[Diff §2]]',
      '**3. Where does the gain land** — price, volume at parity, retention, or only cost? [[Diff §3]]',
      '**4. Which durability mechanism protects it** — social complexity, path dependence, causal ambiguity, credible commitment? [[Diff §7]]',
      '**5. Can it scale and be funded** without the founder and without equity? [[More Ex.3]]',
      '**6. Compare with a product-based alternative** on durability, verifiability, measurability and scalability, and state which matters most for THIS market.',
    ],
    recall: [
      { id: 'S10-engines', title: 'Porter’s three differentiation engines', prompt: 'Where uniqueness comes from.', items: [{ name: 'Technology and the product itself' }, { name: 'Process — selling certainty (speed, consistency, reliability)' }, { name: 'People — where the encounter is the product' }], src: 'Porter §4' },
      { id: 'S10-purposes', title: 'The trust’s five purposes', prompt: 'A More Stewardship Trust.', items: [{ name: 'Keep It Evergreen' }, { name: 'Own This Together' }, { name: 'Dare To Care' }, { name: 'Pay It Forward (≥10% of distributable profits)' }, { name: 'Expand The Circle' }], src: 'More Ex.2' },
      { id: 'S10-networks', title: 'Three networks', prompt: 'And what each proves.', items: [{ name: 'Movement — that the idea travels' }, { name: 'Community — that the effect compounds in a place' }, { name: 'Vertical — that the model is economically competitive' }], src: 'More Ex.4' },
      { id: 'S10-sequence', title: 'The MORE conversation sequence', prompt: 'In order.', items: [{ name: 'Life — what matters most?' }, { name: 'Career — what do you want from work?' }, { name: 'Company — how can it help?' }, { name: 'The very next step (days or weeks, not years)' }], src: 'More Co' },
      { id: 'S10-obj', title: 'Three challenges Clegg expects', prompt: 'Why the practice is hard.', items: [{ name: 'Managers have never led this way; training takes time' }, { name: 'Employees believe the company has no business in their personal life' }, { name: 'Production demands crowd out the work' }], src: 'More Co' },
    ],
    diagram: Diagram,
    newScenarios: [
      { prompt: '**Brightside Plumbing** (fictional) trains every technician to explain repairs with photos and offers a 2-year workmanship guarantee. Customers can’t judge plumbing. Is this beyond-product differentiation, and what would prove it works?', answer: 'Yes — trust and risk reduction in a credence market, signaled by photos and a credible guarantee. Proof: realized price vs. local rivals, repeat/referral rate (retention), volume at parity, and whether the premium exceeds the cost of guarantees and training [[Diff §2-3, §8]].' },
      { prompt: 'A PE firm (fictional) buys Brightside and plans to cut training, end the guarantee and raise prices. Predict the result.', answer: 'A premium harvest: the invisible spending (training, the guarantee’s cost) is trimmed while price rises — several good years, then erosion very hard to reverse, because the trust signal was the product [[Porter §4]] [[More Ex.3]].' },
      { prompt: 'Clegg must choose between deepening the practice in his own shops and launching the vertical network. Which first, and why?', answer: 'Deepen first — the evidentiary argument: “a claim that it works anywhere is worth very little until it works everywhere in one place.” The vertical network has the strongest economic case but the heaviest operational demands and the risk members “join for the savings and skip the idea” [[More Co]] [[More Ex.4]].' },
    ],
  },
  argument: {
    intro: 'No new brief this session: the argument comes from applying the Differentiation Brief (and Porter’s people engine) to a company whose differentiation lives in how it treats people and who owns it.',
    propositions: [
      '**Differentiation can come from people — where the encounter is the product** [[Porter §4]].',
      '**In credence markets, trust is a source of willingness to pay** and must be signaled [[Diff §2]].',
      '**A permanent structure can be a credible commitment** rivals won’t match [[Diff §7]] [[More Co]].',
      '**The structure is downstream; the idea is what travels** — Holub and Felser changed after a conversation, not a legal document [[More Co]].',
      '**Gains that land only in cost are operating improvements,** so the MORE model must show up in price, retention or volume to count as differentiation [[Diff §3, §8]].',
      '**Durable but slow:** beyond-product differentiation leans on the hardest-to-copy mechanisms but is hardest to scale, measure and fund [[Diff §7]] [[More Ex.3]].',
    ],
  },
  case: {
    protagonist: 'Kevin Clegg, who moved four auto-repair businesses into a perpetual purpose employee ownership trust in 2022 and now leads the MORE Movement [[More Co]].',
    decision: 'Is beyond-product differentiation better or worse than product differentiation? And with limited attention, should Clegg deepen the practice in his shops, launch the movement, or build the networks — in what order? [[More Co]] [[Canvas S10]]',
    timeline: [
      { when: '1950s', what: 'The Clegg family enters auto repair [[More Ex.6]]' },
      { when: '1998', what: 'Kevin and his brother start Clegg Auto Repair (Spanish Fork; later Provo, American Fork, body shop)' },
      { when: '1999–2000s', what: 'BYU Master of Organizational Behavior; a decade in HR at Honeywell, Pulte, Jacuzzi, USAA — the layoff rooms “are why we are here”' },
      { when: '2012', what: 'Rejoins the family business' },
      { when: '2021–22', what: 'Two years studying ESOPs and alternatives; chooses a perpetual purpose trust' },
      { when: '2023', what: 'First full year: profit distributions ~$40k → ~$400k, no price increase' },
      { when: '2025–26', what: 'Weekly check-ins replace monthly one-on-ones; manager mastermind; best revenue month; ~25% consistently engaged' },
    ],
    exhibits: Exhibits,
  },
  tool: {
    title: 'Product vs. beyond-product: which is stronger, criterion by criterion?',
    intro: 'Judge both kinds of differentiation on durability, verifiability, measurability, fit, scalability, funding and cost — then take a position on the Key Question.',
    render: () => (
      <div className="space-y-6">
        <DiffCompare />
        <section className="card p-4 space-y-2">
          <h3 className="font-semibold">Clegg’s sequencing decision</h3>
          <NoteBox id="S10-seq" label="Rank: deepen the practice / launch the movement / build the networks (movement, community, vertical). Justify the order in two sentences." rows={3} />
          <p className="text-xs muted">
            Use Exhibit 4’s trade-offs (economic case vs. cost to run vs. failure mode) and the case’s evidentiary argument for going first in the shops <Cite tag="More Ex.4" />.
          </p>
        </section>
      </div>
    ),
  },
  coldCalls: [
    { id: 'c1', level: 'Facts', q: 'What structure did Clegg choose, and why not an ESOP?', model: 'A perpetual purpose employee ownership trust: it can never be sold, employees share profits, 10% goes to charity, liquidation goes to charity. He rejected the ESOP because it points everyone at the appraised valuation, its repurchase obligation grows as the workforce ages, and an attractive outside offer can pressure trustees to sell [[More Co]].', weak: 'An ESOP, because it has tax benefits.', whyWeak: 'Wrong structure; misses his objection.' },
    { id: 'c2', level: 'Facts', q: 'What happened in the first full year under the trust?', model: 'Employee profit distributions rose from about $40,000 to about $400,000 — without raising prices [[More Co]] [[More Ex.6]].', weak: 'Revenue doubled.', whyWeak: 'Not in the case.' },
    { id: 'c3', level: 'Analysis', q: 'Clegg says “the structure is downstream.” What does he mean?', model: 'The trust protects the idea but isn’t the idea. Holub and Felser came asking about structure and left talking about building people. The source of advantage is the practice — starting with the person’s life, then career, then company — not the legal form [[More Co]].', weak: 'The structure doesn’t matter.', whyWeak: 'It matters as protection (credible commitment), just not as the source.' },
    { id: 'c4', level: 'Analysis', q: 'Why is auto repair a good place for beyond-product differentiation?', model: 'It’s a trust (credence) business: customers can’t verify the work and must believe the recommendation. Engaged, experienced technicians produce fewer comebacks and honest tickets, which builds reputation that fills bays — and reputation pays most for independents [[More Co]] [[Diff §2, Ex.3]].', weak: 'Because customers like nice mechanics.', whyWeak: 'Misses the credence mechanism.' },
    { id: 'c5', level: 'Analysis', q: 'Is the $40k → $400k jump evidence of differentiation?', model: 'Not by itself. It came without price increases, so the gain landed in cost or volume. The brief says a gain that shows up entirely in cost is an operating improvement. To prove differentiation, show price realization, retention, or volume at parity vs. rival shops [[Diff §3, §8]].', weak: 'Yes — profits went up 10×.', whyWeak: 'Ignores where the gain landed.' },
    { id: 'c6', level: 'Analysis', q: 'Which durability mechanism protects the MORE model?', model: 'Social complexity (care lived in thousands of small moments across many people), path dependence (reputation built over years), causal ambiguity (hard to specify what makes it work), and credible commitment (a trust that can never be sold) — all four of the brief’s mechanisms [[Diff §7]].', weak: 'Patents.', whyWeak: 'Nothing patentable here.' },
    { id: 'c7', level: 'Judgment', q: 'Is beyond-product differentiation better or worse than product differentiation?', model: 'More durable, slower. It rests on the mechanisms that make premiums last and fits trust businesses, but it’s hard to verify, measure, scale and fund (founder dependence; no equity). It’s better where the product is a credence good and the encounter is the product — if the firm can show the premium in retention or price [[Diff §2, §7]] [[More Ex.3]].', weak: 'Better, because it’s about people.', whyWeak: 'A value judgment, not an analysis with tests.' },
    { id: 'c8', level: 'Judgment', q: 'Only about a quarter of the workforce is consistently engaged. Is the model failing?', model: 'The case warns that’s easy to misread: it doesn’t mean the rest are disengaged or that implementation lags — the company posted its best revenue month in the same period. It means the practice is “real, uneven and unfinished”; the constraint is manager skill and attention [[More Co]].', weak: 'Yes, 75% aren’t buying in.', whyWeak: 'Overreads the statistic the case cautions about.' },
    { id: 'c9', level: 'Action', q: 'Which network should Clegg build first?', model: 'None before deepening the practice in his own shops — the evidentiary argument. Then movement (cheap, already moving) over vertical (strongest economics but heaviest demands, and members may join for savings and skip the idea) [[More Ex.4]] [[More Co]].', weak: 'Vertical — it saves the most money.', whyWeak: 'Ignores cost to run and its failure mode.' },
    { id: 'c10', level: 'Action', q: 'How would you prove to a skeptical founder that the MORE model is a competitive advantage, not charity?', model: 'Show it in the accounts against comparable shops: comeback/rework rates, technician turnover and tenure, customer retention and reviews, realized labor rates, and revenue per bay. If engagement raises retention and price realization, it’s differentiation; if it only cuts cost, it’s still valuable but a different advantage [[Diff §3, §8]].', weak: 'It feels right.', whyWeak: 'Not evidence.' },
  ],
  devil: {
    argument: 'Beyond-product differentiation is just good management. Engaged employees lower turnover and rework — that’s an operating improvement any well-run shop can copy, not a strategy.',
    response: 'Partly right: a gain that lands only in cost is an operating improvement [[Diff §8]]. But the case’s mechanism is trust in a credence market — honest tickets, fewer comebacks, reputation — which lands in willingness to pay and volume. And what rivals can’t copy isn’t “be nice to employees”; it’s the bundle: a structure that can never be sold (credible commitment), a culture lived in thousands of moments (social complexity), and years of reputation (path dependence) [[Diff §7]]. The burden is on Clegg to show it in retention and price realization.',
    probes: ['Why can’t a PE-owned shop just copy the practice?', 'What would show this is cost, not differentiation?', 'What happens when Clegg steps back?'],
  },
  pyramid: {
    prompt: 'Answer the Key Question: **Is beyond-product differentiation better or worse than product differentiation?** Use A More Company as evidence.',
    model: {
      structure: 'inductive',
      s: 'Most firms differentiate on the product; A More Company differentiates on how it treats people and who owns it [[More Co]].',
      c: 'Its evidence so far is mostly cost and volume, the practice reaches about a quarter of the workforce, and the trust can’t raise equity [[More Co]] [[More Ex.3]].',
      q: 'Is beyond-product differentiation better or worse than product differentiation?',
      a: 'Beyond-product differentiation is more durable but slower and harder to prove, so it is the better choice in trust-based markets like auto repair — provided the firm can show the premium in retention or price.',
      supports: [
        { label: 'Reason 1', point: 'It rests on the mechanisms that make premiums last.', evidence: ['Social complexity, path dependence, credible commitment [[Diff §7]]', 'Product features get copied (Casper) [[Diff §6]]'] },
        { label: 'Reason 2', point: 'It fits credence markets, where trust is what the buyer pays for.', evidence: ['Repair customers can’t verify the work [[More Co]]', 'Reputation pays most for independents [[Diff Ex.3]]'] },
        { label: 'Reason 3', point: 'Its costs are speed, measurability and capital.', evidence: ['~25% consistently engaged', 'Gains so far in cost/volume ($40k → $400k, no price rise)', 'No equity; founder dependence'] },
      ],
      competing: '“Product differentiation is better because it’s measurable.” Measurability isn’t durability — measurable features are also easy to copy; in a credence market, a better machine doesn’t tell the customer whom to trust.',
      memo: 'Inductive: three parallel considerations (durability, fit, cost) that roll up into a conditional judgment.',
    },
  },
  checkIds: ['S10-q01', 'S10-q02', 'S10-q03', 'S10-q05', 'S10-q07', 'S10-q09', 'S10-q11', 'S10-q13', 'S10-q15', 'S10-q18'],
  bank: [
    Q({ id: 'S10-q01', kind: 'case', src: 'More Co', stem: 'Why did Clegg reject an ESOP?', correct: 2, options: [
      { text: 'ESOPs are illegal in Utah.', why: 'Not in the case.' },
      { text: 'ESOPs give no tax advantage.', why: 'The case says the tax advantages are substantial.' },
      { text: 'It points everyone at valuation rather than value created, its repurchase obligation grows, and trustees can be pressured to sell.', why: 'The case’s three objections.' },
      { text: 'Employees didn’t want ownership.', why: 'Not stated.' },
    ] }),
    Q({ id: 'S10-q02', kind: 'concept', src: 'Porter §4', stem: 'Porter’s “people” differentiation engine means…', correct: 0, options: [
      { text: 'the encounter with staff is itself the product (Ritz-Carlton, Chick-fil-A, USAA, Nordstrom).', why: '§4.' },
      { text: 'hiring cheaper staff.', why: 'That’s a cost move.' },
      { text: 'having more employees than rivals.', why: 'No.' },
      { text: 'outsourcing service.', why: 'Opposite.' },
    ] }),
    Q({ id: 'S10-q03', kind: 'concept', src: 'Diff §2', stem: 'Auto repair is the Differentiation Brief’s example of which WTP source?', correct: 3, options: [
      { text: 'Performance.', why: 'The point is that customers can’t verify performance.' },
      { text: 'Identity and signal.', why: 'That’s Hermès.' },
      { text: 'Switching and integration.', why: 'That’s NVIDIA.' },
      { text: 'Trust in a market the buyer cannot verify.', why: '63% don’t trust shops; 64% found one they do.' },
    ] }),
    Q({ id: 'S10-q04', kind: 'quant', src: 'More Ex.6', stem: 'Profit distributions rose from ~$40k to ~$400k. By what factor?', correct: 1, options: [
      { text: '4×', why: 'Arithmetic slip.' },
      { text: '10×', why: '400 ÷ 40.' },
      { text: '100×', why: 'No.' },
      { text: '1.4×', why: 'No.' },
    ] }),
    Q({ id: 'S10-q05', kind: 'apply', src: 'Diff §3, §8', stem: 'A More Company’s profits rose sharply without raising prices. Under the Differentiation Brief, that alone shows…', correct: 2, options: [
      { text: 'a proven price premium.', why: 'Price didn’t move.' },
      { text: 'a network effect.', why: 'No.' },
      { text: 'a gain landing in cost or volume — an operating improvement unless price, retention or volume at parity also show a premium.', why: '“Where it lands” test.' },
      { text: 'failure.', why: 'It’s a real gain, just not proof of differentiation.' },
    ] }),
    Q({ id: 'S10-q06', kind: 'case', src: 'More Ex.3', stem: 'Which is a failure mode of the trust model, per Exhibit 3?', correct: 0, options: [
      { text: 'Slow growth, founder dependence, capital starvation.', why: 'Exhibit 3.' },
      { text: 'Overleverage.', why: 'That’s the PE roll-up.' },
      { text: 'Hollowed-out acquisitions.', why: 'PE roll-up.' },
      { text: 'Too much equity.', why: 'It can’t sell equity.' },
    ] }),
    Q({ id: 'S10-q07', kind: 'concept', src: 'Diff §7', stem: 'A trust that can never be sold works as which durability mechanism?', correct: 3, options: [
      { text: 'Causal ambiguity.', why: 'The structure is explicit.' },
      { text: 'A patent.', why: 'No.' },
      { text: 'Scale.', why: 'No.' },
      { text: 'Credible commitment — the firm can’t walk the promise back, and rivals won’t surrender the option to sell.', why: '§7.' },
    ] }),
    Q({ id: 'S10-q08', kind: 'case', src: 'More Co', stem: 'What operating change did Clegg make in 2025–26?', correct: 1, options: [
      { text: 'Added formal monthly one-on-ones.', why: 'Those were replaced.' },
      { text: 'Shifted from formal monthly one-on-ones to frequent, informal help finding each person’s “very next step,” plus a monthly manager mastermind.', why: 'The case.' },
      { text: 'Raised prices.', why: 'No.' },
      { text: 'Franchised the shops.', why: 'No.' },
    ] }),
    Q({ id: 'S10-q09', kind: 'apply', src: 'Diff §2', stem: '**Lumen Dental** (fictional) can’t prove its fillings last longer, but patients trust its dentists and return for decades. Which kind of good is dental work, and how should Lumen compete?', correct: 0, options: [
      { text: 'A credence good — compete on trust and signals (reputation, guarantees, transparency), not on claims patients can’t verify.', why: '§2.' },
      { text: 'A search good — publish specs.', why: 'Quality can’t be judged before purchase.' },
      { text: 'An experience good — offer free trials.', why: 'Even after treatment, quality is hard to judge.' },
      { text: 'A commodity — cut price.', why: 'Ignores the trust source of WTP.' },
    ] }),
    Q({ id: 'S10-q10', kind: 'case', src: 'More Ex.4', stem: 'Which network has the strongest economic case for members but the highest cost to run?', correct: 2, options: [
      { text: 'Movement.', why: 'Weakest economic case, low cost.' },
      { text: 'Community.', why: 'Moderate on both.' },
      { text: 'Vertical (shared services).', why: 'Exhibit 4.' },
      { text: 'All equal.', why: 'No.' },
    ] }),
    Q({ id: 'S10-q11', kind: 'case', src: 'More Co', stem: 'What is the case’s argument for deepening the practice in the shops first?', correct: 3, options: [
      { text: 'It’s cheapest.', why: 'Its cost is time.' },
      { text: 'The movement isn’t working.', why: 'The movement is already moving.' },
      { text: 'Investors demand it.', why: 'There are no investors.' },
      { text: 'Evidentiary: nobody has shown it works with blue-collar employees at full coverage, and a claim that it works anywhere is worth little until it works everywhere in one place.', why: 'The case.' },
    ] }),
    Q({ id: 'S10-q12', kind: 'concept', src: 'Diff §6-7', stem: 'Compared with a product feature, a culture of genuine care is harder to copy mainly because of…', correct: 1, options: [
      { text: 'patents.', why: 'Culture isn’t patentable.' },
      { text: 'social complexity and path dependence — it lives in relationships across many people and was built over time.', why: '§7.' },
      { text: 'scale economies.', why: 'Not the mechanism.' },
      { text: 'regulation.', why: 'No.' },
    ] }),
    Q({ id: 'S10-q13', kind: 'case', src: 'More Ex.3', stem: 'What is the “governing number” of each model in Exhibit 3?', correct: 0, options: [
      { text: 'PE roll-up: valuation. Trust model: value creation.', why: 'Exhibit 3.' },
      { text: 'Both: valuation.', why: 'No.' },
      { text: 'PE: employee engagement. Trust: valuation.', why: 'Reversed.' },
      { text: 'Both: revenue growth.', why: 'No.' },
    ] }),
    Q({ id: 'S10-q14', kind: 'case', src: 'More Ex.5', stem: 'Gallup found what share of US employees engaged in H1 2026?', correct: 2, options: [
      { text: '51%', why: 'That’s not engaged.' },
      { text: '18%', why: 'That’s actively disengaged.' },
      { text: '31%', why: 'Exhibit 5.' },
      { text: '64%', why: 'That’s global not engaged.' },
    ] }),
    Q({ id: 'S10-q15', kind: 'apply', src: 'Porter §4', stem: 'A PE firm (fictional) buys a beloved repair chain, cuts training and keeps prices high. Years 1–3 are excellent; then reviews and repeat business collapse. Which Porter failure?', correct: 3, options: [
      { text: 'Over-serving.', why: 'Opposite.' },
      { text: 'The treadmill.', why: 'Not product cycles.' },
      { text: 'Imitation.', why: 'No rival copied.' },
      { text: 'The premium harvest.', why: '“Quietly trims the invisible spending, keeps the price, and enjoys several excellent years.”' },
    ] }),
    Q({ id: 'S10-q16', kind: 'case', src: 'More Co', stem: 'About a quarter of the workforce is consistently in the conversations. The case says this means…', correct: 1, options: [
      { text: 'three-quarters are disengaged.', why: 'The case says not to read it that way.' },
      { text: 'the practice is real, uneven and unfinished — not that the rest are disengaged or that implementation lags.', why: 'The case.' },
      { text: 'the model has failed.', why: 'Best revenue month in the same period.' },
      { text: 'managers are resisting.', why: 'Not stated.' },
    ] }),
    Q({ id: 'S10-q17', kind: 'concept', src: 'Diff §3', stem: 'Which test would BEST show the MORE model creates a premium rather than just lowering cost?', correct: 0, options: [
      { text: 'Retention and realized price vs. comparable shops (customers return and accept a higher labor rate).', why: 'Price and retention tests.' },
      { text: 'Lower employee turnover.', why: 'That’s cost.' },
      { text: 'Higher profit distributions.', why: 'Could be cost.' },
      { text: 'More LinkedIn followers.', why: 'Not a premium test.' },
    ] }),
    Q({ id: 'S10-q18', kind: 'apply', src: 'Diff §6-7', stem: 'Which kind of differentiation is most at risk of being “copied before it could pay”?', correct: 2, options: [
      { text: 'A 20-year culture of trust.', why: 'Socially complex, path-dependent.' },
      { text: 'A permanent ownership trust.', why: 'Credible commitment.' },
      { text: 'A new product feature with no barrier beyond a website (bed-in-a-box).', why: 'Casper.' },
      { text: 'A reputation for honest tickets.', why: 'Path-dependent.' },
    ] }),
    Q({ id: 'S10-q19', kind: 'apply', src: 'Diff §8', stem: 'A fictional consultancy claims its “culture of care” is its differentiation. Per the brief’s diagnostic, what should it name FIRST?', correct: 2, options: [
      { text: 'Its mission statement.', why: 'Not a diagnostic step.' },
      { text: 'Its cost per employee.', why: 'That’s a cost measure.' },
      { text: 'The buyer and the alternative — a premium is always measured against a specific substitute for a specific person.', why: 'Step one of the diagnostic.' },
      { text: 'Its NPS.', why: 'Useful later, not first.' },
    ] }),
    Q({ id: 'S10-q20', kind: 'case', src: 'More Co', stem: 'Holub (regenerative farming) and Felser (camper vans) changed their companies after talking with Clegg. What does that suggest about the model?', correct: 1, options: [
      { text: 'The trust structure is what other founders want.', why: 'They came asking about structure and left talking about the idea.' },
      { text: 'The idea travels across unrelated industries — the movement network — even without the structure.', why: '“Neither needed a trust to act on it.”' },
      { text: 'The model only works in auto repair.', why: 'Opposite.' },
      { text: 'Founders want a higher sale price.', why: 'Not discussed.' },
    ] }),
  ],
  shorts: [
    { id: 'S10-sa1', session: 'S10', src: 'Diff §2, §7', prompt: 'In three sentences: is beyond-product differentiation better or worse than product differentiation?', model: 'More durable — it rests on social complexity, path dependence and credible commitment — and a better fit for credence markets where trust is what buyers pay for. But it’s slower, harder to verify and measure, and harder to scale and fund. It’s better when the firm can show the premium in retention or price.', points: ['Durability', 'Credence fit', 'Costs/limits', 'Conditional verdict'] },
    { id: 'S10-sa2', session: 'S10', src: 'More Co', prompt: 'Why did Clegg choose a perpetual purpose trust over an ESOP?', model: 'An ESOP centers on the appraised valuation, accumulates a growing repurchase obligation, and can be pushed to sell by an attractive offer; the perpetual trust removes ownership from the market — no exit, no valuation — so employees and mission can never be subordinated to a future owner.', points: ['ESOP objections', 'Trust’s permanence'] },
    { id: 'S10-sa3', session: 'S10', src: 'Diff §3, §8', prompt: 'What evidence would show A More Company’s model is differentiation, not just cost reduction?', model: 'A realized price premium or higher retention vs. comparable shops (customers return and accept the labor rate), volume at parity, fewer comebacks driving reputation — not just lower turnover or higher profit with flat prices.', points: ['Price/retention/volume', 'Distinguishes cost gains'] },
    { id: 'S10-sa4', session: 'S10', src: 'More Ex.4', prompt: 'Which network would you build first and why?', model: 'Beyond deepening the shops, the movement network: low cost and already moving; the vertical network has the strongest economics but the heaviest demands and the risk members join for savings and skip the idea.', points: ['Choice', 'Trade-off from Exhibit 4'] },
  ],
  written: {
    prompt: '**Timed (20 min).** A fictional regional home-services firm, **Hearthwell**, can spend $2M either on smart-home diagnostic devices for its technicians (product) or on a training-and-ownership program like A More Company’s (beyond-product). Recommend one using the Differentiation Brief.',
    minutes: 20,
    model: 'Name the buyer and alternative; identify WTP sources (devices: performance; program: trust/risk reduction in a credence market). Durability: devices are copyable (any rival can buy them); the program rests on social complexity and commitment. Measurement plan: price realization, retention, callbacks. Risks: the program is slow and founder-dependent; devices are quick but parity. Recommendation: the program if Hearthwell competes on trust and can measure it — possibly devices as parity spend.',
    rubric: ['Uses WTP sources', 'Durability mechanisms', 'Where the gain lands / measurement', 'Clear recommendation with trade-off'],
  },
  oral: { prompt: 'Is beyond-product differentiation better or worse than product differentiation? Use A More Company.', probes: ['Isn’t this just good management?', 'How would you know it’s working?', 'Why can’t a PE-owned rival copy it?', 'What should Clegg do first?'] },
  summary: {
    answer: 'Beyond-product differentiation (people, trust, ownership) is more durable — it rests on social complexity, path dependence and credible commitment — and fits credence markets like auto repair, but it is slower, harder to measure, scale and fund. It’s better when the firm can show the premium in retention or price; so far A More Company’s gains land mostly in cost and volume.',
    numbers: [
      { label: 'Profit distributions', value: '~$40k → ~$400k, no price increase', src: 'More Ex.6' },
      { label: 'Consistently engaged', value: '~25% of the workforce (summer 2026)', src: 'More Co' },
      { label: 'US engagement (Gallup)', value: '31% engaged · 51% not · 18% actively disengaged', src: 'More Ex.5' },
      { label: 'Charity', value: '≥10% of distributable profits', src: 'More Ex.2' },
    ],
    frameworkBullets: ['Porter’s people engine', 'Trust in credence markets', 'Credible commitment via structure', 'Where the gain lands', 'Durable vs. slow/hard to scale'],
    caseBullets: ['Perpetual purpose trust > ESOP for Clegg', 'Structure is downstream of the idea', 'Evidence so far: cost/volume', 'Deepen the practice before the networks'],
  },
}
