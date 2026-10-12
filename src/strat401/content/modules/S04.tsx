import { DataTable, HBar } from '../../components/Charts'
import { Cite } from '../../components/Cite'
import { FiveForcesRater, type Segment } from '../../widgets/FiveForces'
import type { Mcq, ModuleDef } from '../types'

function Diagram() {
  const b = (t: string, s: string) => (
    <div className="surface-2 rounded p-2 text-center text-sm">
      <strong>{t}</strong>
      <div className="text-xs">{s}</div>
    </div>
  )
  return (
    <figure className="card p-3 space-y-2">
      <figcaption className="font-semibold">
        Five parties contend for the value an industry creates <Cite tag="5F Fig.1" />
      </figcaption>
      <div className="grid grid-cols-3 gap-1.5 items-center">
        <div />
        {b('Threat of new entrants', 'barriers + expected retaliation')}
        <div />
        {b('Supplier power', 'takes value as input cost')}
        <div className="rounded p-3 text-center text-sm font-semibold" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>
          Rivalry
          <div className="text-xs font-normal">profit is what remains after the other four take their share</div>
        </div>
        {b('Buyer power', 'takes value as price pressure')}
        <div />
        {b('Threat of substitutes', 'another way to meet the same need — a price ceiling')}
        <div />
      </div>
      <div className="grid gap-1.5 md:grid-cols-2 text-xs">
        <div className="card p-2"><strong>The ceiling varies ~7×:</strong> 1992–2006 US ROIC — security brokers 40.9%, soft drinks & software 37.6%, pharma 31.7%, average 14.9%, airlines 5.9% <Cite tag="5F §1, Fig.2" />.</div>
        <div className="card p-2"><strong>Structure × position → capital:</strong> attractive + strong = invest and defend; attractive + weak = harvest or exit; unattractive + strong = milk or reshape; unattractive + weak = exit <Cite tag="5F Fig.3" />.</div>
      </div>
    </figure>
  )
}

function Exhibits() {
  return (
    <div className="space-y-4">
      <DataTable
        caption={<>Per-case economics of a concentrate producer, 2025 <Cite tag="Cola Ex.2" /></>}
        head={['Line item', 'Per case', '% of sales']}
        rows={[['Sales (concentrate)', '$1.30', '100.0%'], ['Cost of goods sold', '$0.30', '23.1%'], ['Gross profit', '$1.00', '76.9%'], ['Selling & delivery', '$0.00', '0.0%'], ['Advertising & marketing', '$0.28', '21.5%'], ['General & administration', '$0.32', '24.6%'], ['EBITDA', '$0.40', '30.8%']]}
      />
      <DataTable
        caption={<>Fixed-cost barriers to entry <Cite tag="Cola Ex.3" /></>}
        head={['Investment', 'Low', 'High', 'Average']}
        rows={[['Concentrate plant', '$35M', '$70M', '$53M'], ['Bottling plant (each)', '$300M', '$750M', '$525M'], ['Capacity per bottling plant', '250M cases', '500M cases', '375M cases'], ['Bottling plants for 10% share', '—', '—', '3'], ['Total incl. concentrate plant', '—', '—', '$1,628M']]}
      />
      <HBar title="US CSD volume share, 2025" rows={[{ label: 'Coca-Cola', value: 46 }, { label: 'PepsiCo', value: 25 }, { label: 'Keurig Dr Pepper', value: 22 }, { label: 'Private label (Cott/Refresco)', value: 3 }, { label: 'All other (incl. functional)', value: 4 }]} unit="%" digits={0} highlight="Coca-Cola" note={<>Functional soda ≈ 1.0–1.5% of volume but more of dollars <Cite tag="Cola Ex.4" /></>} />
      <DataTable
        caption={<>Adjacent categories — the substitutes ($B US retail) <Cite tag="Cola Ex.5" /></>}
        head={['Category', '2019', '2025', '5-yr CAGR']}
        rows={[['Carbonated soft drinks', '$118', '$128', '+1.6%'], ['Bottled water', '$36', '$58', '+10.0%'], ['Energy drinks', '$12', '$24', '+14.9%'], ['Sports drinks', '$8', '$12', '+8.4%'], ['RTD coffee', '$5', '$8', '+9.9%'], ['RTD tea', '$7', '$10', '+7.4%'], ['Modern functional soda', '<$0.1', '$1.2', '>60%']]}
      />
      <p className="text-xs muted">
        Case note: the text says volume peaked at 12.5B cases in 2004 and has declined; Exhibit 1 shows 10,300M cases in 2000 and volume edging up from 2020 to 2026E. Per-capita consumption clearly fell (53 → 28 gallons). Cite whichever you use <Cite tag="Cola Ex.1" />.
      </p>
    </div>
  )
}

const SEGMENTS: Segment[] = [
  {
    id: 'conc',
    name: 'Concentrate production (US)',
    then: { 'New entrants': 1, 'Supplier power': 1, 'Buyer power': 2, Substitutes: 2, Rivalry: 3 },
    now: { 'New entrants': 2, 'Supplier power': 1, 'Buyer power': 3, Substitutes: 5, Rivalry: 3 },
    why: {
      'New entrants': 'The concentrate plant is cheap ($35–70M) — the barrier is access to bottling and distribution (~$1.6B to build your own), decades of brand, fountain exclusives, and credible retaliation. Now niche entrants (poppi, Olipop) get in through channels the incumbents don’t defend [[Cola Ex.3]] [[Cracking §5]].',
      'Supplier power': 'Inputs are commodities (caramel, sweetener, flavorings, packaging); COGS is only 23% of sales [[Cola Ex.2]].',
      'Buyer power': 'Bottlers were bound by exclusive franchise territories the concentrate makers controlled; now a few large refranchised bottlers and powerful take-home retailers (private label, leverage) push back [[Cola]].',
      Substitutes: 'Was a modest ceiling; now strengthening fast — water $36B → $58B, energy $12B → $24B, functional soda <$0.1B → $1.2B, per-capita CSD 53 → 28 gallons, SNAP and sugar-tax pressure acting through demand [[Cola Ex.1]] [[Cola Ex.5]].',
      Rivalry: 'Concentrated (big three ~93%) and intense, but fought on advertising, brand and channels rather than price; Coke raised concentrate prices 5–7% a year 2021–24 with volume down <1% [[Cola]].',
    },
    binding: ['Substitutes', 'Buyer power'],
    verdict: 'Then: a structure engineered for profit (~31% EBITDA; soft drinks 37.6% ROIC). Now: still strong, but the binding force — substitutes — is strengthening, with buyers second. Strong position in a slowly deteriorating structure → **milk, or reshape** (functional, energy, portfolio) rather than reinvesting in the same structure [[5F Fig.3]].',
  },
  {
    id: 'bott',
    name: 'Bottling (US)',
    then: { 'New entrants': 2, 'Supplier power': 5, 'Buyer power': 3, Substitutes: 2, Rivalry: 2 },
    now: { 'New entrants': 2, 'Supplier power': 5, 'Buyer power': 4, Substitutes: 5, Rivalry: 2 },
    why: {
      'New entrants': 'Capital-heavy ($300–750M per plant) and territories are granted by the concentrate producers, so entry is controlled from above [[Cola Ex.3]].',
      'Supplier power': 'The suppliers are Coke and Pepsi: concentrated, differentiated brands, set pricing strategy, own the trademarks, and have repeatedly integrated forward (owned, divested and reconsolidated bottlers) [[Cola]].',
      'Buyer power': 'Retailers in take-home (≈50% of volume, less of profit) compress per-case margins; fountain chains sign 10–20 year contracts with the brand owner [[Cola]].',
      Substitutes: 'Same substitutes as concentrate — but bottlers carry the fixed plants and fleets, so volume loss hurts them more.',
      Rivalry: 'Exclusive territories limit head-to-head competition between same-brand bottlers.',
    },
    binding: ['Supplier power', 'Buyer power'],
    verdict: 'Bottling earns 5–10% operating margins with ROIC often below the cost of capital — the same brands, different structure. That contrast is the whole answer to “how did Coke structure the industry”: keep the capital-light, brand-heavy layer; push capital intensity and buyer pressure onto bottlers [[Cola]].',
  },
]

const Q = (o: Omit<Mcq, 'session'>): Mcq => ({ ...o, session: 'S04' })

export const S04: ModuleDef = {
  id: 'S04',
  short: 'Five Forces · Cola Wars',
  framework: {
    oneLiner: 'Before “how do we win?” ask “**is this game worth winning?**” Five parties — entrants, suppliers, buyers, substitutes and rivals — contend for the value an industry creates; **profit is the residual**, and structure sets a ceiling that varies about **seven-fold** across industries [[5F §1-2]].',
    analogy: 'Think of a pizza you baked to sell. The flour supplier takes a slice, the delivery app takes a slice, cheaper frozen pizzas cap your price, new pizza shops open whenever you look profitable, and the shop across the street fights you for the rest. What you keep is what’s left after everyone else eats [[5F §2]].',
    intuition: [
      'A competent team in a poor structure usually underperforms a mediocre one in a good structure; no operating discipline closes that gap (airlines 5.9% ROIC vs. soft drinks 37.6%) [[5F §1]].',
      'Five Forces is a **theory of how value gets divided**, not a market survey or a list of what’s happening [[5F §1]].',
      'Each outer force takes value: suppliers as input cost, buyers as price pressure, entrants by adding capacity, substitutes by capping price. **Rivalry** decides how much of the residual reaches shareholders — and its *dimension* (price vs. brand/features) matters as much as its intensity [[5F §2-3]].',
      '**Latent** entry caps returns even if nobody has entered; substitutes are found late because they come from outside the industry [[5F §3]].',
      'Run it **at two points in time** — direction, not level, should trigger decisions — and name the **one or two binding forces** [[5F §4, §9]].',
      'Structure is not fate: **position** where forces are weakest, **exploit change** before rivals, or **reshape** the structure (consolidation, switching costs, standards, supplier development, demand creation) — the highest-return move [[5F §5]].',
      'Government and complements are **not a sixth force**; ask which of the five they act through [[5F §7]].',
    ],
    howToRun: [
      '**1. Define the industry** — product and geography. Test: do firms inside face the same forces and readily serve each other’s customers? (concentrate ≠ bottling) [[5F §4]].',
      '**2. Rate each force** using what makes it strong vs. weak (Exhibit 1) [[5F Ex.1]].',
      '**3. Run it twice** (then vs. now) and mark direction [[5F §4]].',
      '**4. Name the one or two binding forces** [[5F §6, Ex.1]].',
      '**5. Separate structure from position** — what returns are available vs. what share this firm captures [[5F §4]].',
      '**6. Convert to a decision:** structure × position → invest/defend, harvest/exit, milk/reshape, exit [[5F §6, Fig.3]].',
      '**7. For any initiative, name which force it changes and by what mechanism** — otherwise it’s an operating improvement [[5F §5]].',
    ],
    recall: [
      { id: 'S04-forces', title: 'The five forces and what each takes', prompt: 'Name all five and how each takes value.', items: [{ name: 'Threat of new entrants — adds capacity, bids down returns' }, { name: 'Supplier power — input cost' }, { name: 'Buyer power — price and service concessions' }, { name: 'Threat of substitutes — a ceiling on price' }, { name: 'Rivalry — how much of the residual reaches shareholders' }], src: '5F §2, Ex.1' },
      { id: 'S04-misuse', title: 'Four misuses', prompt: 'How the theory gets misused.', items: [{ name: 'Defining the industry incorrectly' }, { name: 'Mistaking growth for attractiveness' }, { name: 'Confusing your position with the industry’s structure' }, { name: 'Treating the analysis as a snapshot' }], src: '5F §4' },
      { id: 'S04-use', title: 'Three uses (moves)', prompt: 'How firms act on structure.', items: [{ name: 'Position where the forces are weakest' }, { name: 'Exploit change in the forces before rivals' }, { name: 'Reshape the structure itself' }], src: '5F §5' },
      { id: 'S04-cap', title: 'Structure × position grid', prompt: 'Four answers for capital.', items: [{ name: 'Attractive + strong → invest and defend' }, { name: 'Attractive + weak → harvest or exit' }, { name: 'Unattractive + strong → milk, or reshape' }, { name: 'Unattractive + weak → exit' }], src: '5F Fig.3' },
      { id: 'S04-props', title: 'Three propositions', prompt: 'What to carry forward.', items: [{ name: 'Structure sets a ceiling (~7×) no operating program lifts' }, { name: 'Use it comparatively and convert it into a decision' }, { name: 'Structure can be shaped; returns to shaping exceed returns to performing within it' }], src: '5F §9' },
    ],
    diagram: Diagram,
    newScenarios: [
      { prompt: '**Bayside Ferries** (fictional) is the only ferry to an island, but a bridge is being approved and the ferry’s fuel comes from one supplier. Which forces bind, and which way are they moving?', answer: 'Substitutes (the bridge) — weak today and about to strengthen sharply, which is the one to act on; and supplier power (single fuel source). Its strong position today sits in a deteriorating structure → milk or reshape [[5F §4, Fig.3]].' },
      { prompt: 'A pitch deck says “Scooter-sharing is growing 40% a year, so it’s an attractive industry.” Respond.', answer: '“Growth is not a force.” Ask what growth does to each force: low barriers invite entry and capacity faster than demand; riders switch apps freely (buyer power); bikes and transit substitute. A growing market with weak barriers and powerful buyers converts investor capital into consumer surplus [[5F §4]].' },
      { prompt: '**Halden Labs** (fictional) dominates a profitable niche but plans to expand into the broad market, which earns half the returns. A board member says “we’re doing great, so the broad market must be fine too.” What’s the error?', answer: 'Confusing position with structure — Halden’s strong position in its niche says nothing about the broad industry’s ceiling. Structure tells you what returns are available; position, what share you capture [[5F §4]].' },
    ],
  },
  argument: {
    intro: 'The brief argues that structure is the first and most expensive question, that the theory only pays when used comparatively and turned into a decision, and that the biggest returns come from shaping structure rather than performing within it.',
    propositions: [
      '**Structure sets the ceiling;** it varies ~7× and no operating program lifts it — choosing the industry is bigger than any decision within it [[5F §9]].',
      '**Profit is the residual** after suppliers, buyers, entrants and substitutes take their share [[5F §2]].',
      '**Use it comparatively, name the binding forces, convert it into a decision** — a one-period description “filed and admired” has no value [[5F §9]].',
      '**Structure can be shaped** (consolidation, switching costs, standards, supplier development, demand creation); anything built can be dismantled [[5F §9]].',
      '**Name which force an initiative changes, and how** — otherwise it’s an operating improvement that diffuses [[5F §5]].',
      '**A strong position in a deteriorating structure is a source of funds, not a use** [[5F §6]].',
      '**Government and complements act through the five forces,** not as a sixth [[5F §7]].',
    ],
  },
  case: {
    protagonist: 'Coca-Cola, PepsiCo and Keurig Dr Pepper executives in mid-2026 [[Cola]].',
    decision: 'How did Coke structure the industry to give itself an advantage — and how should the incumbents defend “the most profitable business in the consumer goods sector” against functional sodas, energy drinks, regulators and shrinking per-capita demand? [[Cola]] [[Canvas S4]]',
    timeline: [
      { when: '1886 / 1893', what: 'Coca-Cola (Pemberton) and Pepsi-Cola (Bradham) created [[Cola]]' },
      { when: '1975', what: 'Pepsi Challenge closes Coke’s share lead toward parity by 1980' },
      { when: '1977–86', what: 'PepsiCo buys Pizza Hut, Taco Bell, KFC — partly to secure fountain sales' },
      { when: '1985', what: 'New Coke withdrawn in 79 days; Coca-Cola Classic emerges stronger' },
      { when: '2014–18', what: 'Sugar taxes (Berkeley, Mexico, Philadelphia, UK levy)' },
      { when: '2024', what: 'Dr Pepper clear #2 single brand; Olipop >$400M revenue' },
      { when: 'Mar–May 2025', what: 'PepsiCo buys poppi for $1.95B; first SNAP soda waiver (Nebraska)' },
      { when: 'Q1 2026', what: '18 states (~28% of SNAP recipients) restricting soda' },
    ],
    exhibits: Exhibits,
  },
  tool: {
    title: 'Five Forces rater: concentrate vs. bottling, then vs. now',
    intro: 'Rate each force for both segments at both times, mark the binding forces, then compare with the model. The contrast between the two segments IS the answer to the Key Question.',
    render: () => <FiveForcesRater segments={SEGMENTS} />,
  },
  coldCalls: [
    { id: 'c1', level: 'Facts', q: 'Give me the concentrate economics per case.', model: '$1.30 sales, $0.30 COGS (23%), $1.00 gross profit (77%), $0.28 advertising, $0.32 G&A, $0.40 EBITDA (~31%) — no selling and delivery cost at all [[Cola Ex.2]].', weak: 'It’s very profitable — like 30%.', whyWeak: 'No structure; misses that the costs that matter (delivery) sit with bottlers.' },
    { id: 'c2', level: 'Facts', q: 'What does it cost to enter, and where is the real barrier?', model: 'A concentrate plant for 10% of the market is only $35–70M — under 1% of a year’s concentrate sales. The barrier is bottling and distribution: ~3 plants at ~$525M each, ~$1.6B total, if you can’t use the incumbents’ bottlers — plus brand and fountain exclusives [[Cola Ex.3]].', weak: 'Entry is expensive.', whyWeak: 'Misses that the cheap layer is the profitable one — the barrier was engineered elsewhere.' },
    { id: 'c3', level: 'Analysis', q: 'Why does concentrate earn ~30% while bottling earns 5–10%?', model: 'Same brands, different structure. Concentrate is capital-light, faces commodity suppliers and bottlers bound by exclusive territories, and competes on brand. Bottling is capital-heavy, buys from two powerful suppliers that set pricing and can integrate forward, and sells into powerful retailers [[Cola]].', weak: 'Because Coke is a better company than its bottlers.', whyWeak: 'Confuses position with structure.' },
    { id: 'c4', level: 'Analysis', q: 'How did Coke structure the industry to its advantage?', model: 'It kept the high-margin, brand-heavy layer and pushed capital intensity and channel pressure onto bottlers; granted exclusive territories that kept bottlers dependent and unable to play suppliers against each other; locked fountain channels with 10–20 year exclusives; and competed with Pepsi on brand and advertising rather than price [[Cola]] [[5F §5]].', weak: 'It had great advertising.', whyWeak: 'Advertising is one tool; the answer is structural engineering of buyer power and entry.' },
    { id: 'c5', level: 'Analysis', q: 'Which force is binding today, and which way is it moving?', model: '**Substitutes**, strengthening: water $36B → $58B, energy $12B → $24B, functional soda to $1.2B growing >50%, per-capita CSD 53 → 28 gallons. Government (SNAP, sugar taxes, labeling) acts *through* demand and substitutes rather than as a sixth force [[Cola Ex.5]] [[5F §7]].', weak: 'Rivalry with Pepsi.', whyWeak: 'The case says the war is no longer Coke vs. Pepsi.' },
    { id: 'c6', level: 'Analysis', q: 'Is SNAP restriction a sixth force?', model: 'No — Porter declined to add government; it operates through the five. Here it reduces demand in take-home and dollar-store channels and pushes consumers toward substitutes [[5F §7]] [[Cola]].', weak: 'Yes, government is the sixth force.', whyWeak: 'Contradicts the brief’s explicit position.' },
    { id: 'c7', level: 'Analysis', q: 'Volume is flat-to-down. Is this still an attractive industry?', model: 'Yes for now — dollar growth 2–4% on mix and price, and Coke raised prices 5–7% a year with volume down <1%. But direction matters more than level: the binding force is strengthening, so it’s a strong position in a slowly deteriorating structure [[Cola]] [[5F §4]].', weak: 'No, because volume is declining.', whyWeak: 'Confuses growth with attractiveness — in the other direction.' },
    { id: 'c8', level: 'Judgment', q: 'Was PepsiCo right to pay $1.95B (~20× revenue) for poppi?', model: 'As defense, possibly; as integration, risky. Cracking Markets shows poppi declining in H1 2026 after a rocky distribution transition — moving a challenger onto the incumbent’s system removes what made it work. “Price the channel, not only the brand” [[Cracking §7]].', weak: 'Yes, functional soda is growing.', whyWeak: 'Growth alone doesn’t justify a price.' },
    { id: 'c9', level: 'Action', q: 'You run Coke. Where does the CSD cash go?', model: 'Treat CSDs as a source of funds (strong position, deteriorating structure): defend pricing and channels, but direct capital to reshape — functional and energy positions, possibly via distribution partnerships rather than integration that kills the acquired brand [[5F §6, Fig.3]].', weak: 'Spend more on Coke advertising to win back volume.', whyWeak: 'Reinvests into the same structure — the misread quadrant.' },
    { id: 'c10', level: 'Action', q: 'One sentence: how did Coke structure the industry?', model: 'Coke kept the capital-light, brand-heavy concentrate layer for itself and engineered the rest of the chain — exclusive bottler territories, fountain exclusives, brand-based rivalry — so buyers stayed weak and entrants stayed out.', weak: 'Coke made a great product people love.', whyWeak: 'A position claim, not a structural one.' },
  ],
  devil: {
    argument: 'Coke’s advantage is its brand, not structure. The brand would earn a premium in any structure — this is a VRIO story, and Five Forces overstates structure.',
    response: 'They answer different questions: structure says what returns are available, position says what share Coke captures [[5F §4]]. Structure explains why the whole concentrate layer — Pepsi and KDP included — earns ~30% while bottling earns 5–10% with the same brands. And the brand’s profitability depends on structural choices — exclusive territories and channel control keep buyers weak and entrants out [[Cola]].',
    probes: ['If structure is so good, why did Virgin Cola fail?', 'What would make concentrate look like bottling?', 'Is Dr Pepper’s rise evidence against your answer?'],
  },
  pyramid: {
    prompt: 'Answer: **How did Coke structure an industry to give itself a competitive advantage?** (Combined structure works well.)',
    model: {
      structure: 'combined',
      s: 'Coca-Cola, PepsiCo and KDP control ~93% of US CSD volume, and concentrate earns ~31% EBITDA [[Cola Ex.2, Ex.4]].',
      c: 'Bottlers using the same brands earn 5–10%, and the industry’s century-old structure now faces substitutes, regulators and niche entrants [[Cola]].',
      q: 'How did Coke structure the industry to give itself an advantage?',
      a: 'Coke kept the capital-light, brand-driven concentrate layer and engineered the rest of the chain so that buyers stayed weak and entrants stayed out, which is why concentrate captures most of the industry’s profit.',
      supports: [
        { label: 'Major premise', point: 'Profit goes to the layer whose suppliers, buyers, entrants and substitutes take the least [[5F §2]].', evidence: ['Structure, not management, sets the ceiling'] },
        { label: 'Minor premise', point: 'Coke’s choices weakened every force on concentrate: commodity inputs, bottlers bound by exclusive territories, entry blocked by bottling and fountain exclusives, rivalry on brand not price [[Cola]].', evidence: ['COGS 23%', '$1.6B to build bottling for 10% share', '10–20 year fountain contracts', 'Prices +5–7%/yr with volume −<1%'] },
        { label: 'Therefore', point: 'Concentrate earns ~31% while bottling earns 5–10% — the advantage is structural, and today it is most exposed to substitutes.', evidence: ['Water, energy, functional soda growing; per-capita CSD 53 → 28 gal'] },
      ],
      competing: '“It’s just the brand.” The brand is the means; the same brand earns 5–10% in bottling — so structure decides where the brand’s value lands.',
      memo: 'Deductive spine because one theory (profit is the residual of the forces) explains the gap; each premise needs case evidence.',
    },
  },
  checkIds: ['S04-q01', 'S04-q02', 'S04-q04', 'S04-q06', 'S04-q08', 'S04-q10', 'S04-q12', 'S04-q14', 'S04-q17', 'S04-q20'],
  bank: [
    Q({ id: 'S04-q01', kind: 'concept', src: '5F §2', stem: 'In the Five Forces brief, industry profitability is best described as…', correct: 1, options: [
      { text: 'what the market leader earns.', why: 'That’s position, not structure.' },
      { text: 'the residual left after suppliers, buyers, entrants and substitutes take their share — what rivals compete over.', why: '§2: “Industry profitability is the residual.”' },
      { text: 'revenue growth.', why: 'Growth is not a force.' },
      { text: 'the sum of the five force scores.', why: 'Not a scoring model.' },
    ] }),
    Q({ id: 'S04-q02', kind: 'concept', src: '5F §1', stem: 'What does “the ceiling varies by a factor of seven” refer to?', correct: 3, options: [
      { text: 'Market shares across firms.', why: 'Not shares.' },
      { text: 'Prices across countries.', why: 'Not prices.' },
      { text: 'Growth across decades.', why: 'Not growth.' },
      { text: 'Average ROIC across industries: ~40.9% for security brokers vs. 5.9% for airlines (1992–2006).', why: '§1 and Fig.2.' },
    ] }),
    Q({ id: 'S04-q03', kind: 'concept', src: '5F §3', stem: 'Why does the brief say entry is most dangerous when latent?', correct: 0, options: [
      { text: 'High returns in an accessible industry invite entry — “a countdown, not an achievement” — and cap returns even before anyone enters.', why: '§3 and Ex.1.' },
      { text: 'Latent entrants have more capital.', why: 'Not the argument.' },
      { text: 'Regulators favor entrants.', why: 'Not discussed.' },
      { text: 'Latent entry is easier to measure.', why: 'Opposite — it’s invisible.' },
    ] }),
    Q({ id: 'S04-q04', kind: 'apply', src: '5F §3', stem: '**Cobalt Robotics** (fictional) sells a component to three giant automakers that each buy 30% of its output and are qualifying second sources. Which force dominates?', correct: 2, options: [
      { text: 'Supplier power.', why: 'Cobalt is the supplier; its buyers are the powerful party.' },
      { text: 'Threat of substitutes.', why: 'Not described.' },
      { text: 'Buyer power — few, large buyers who threaten second sources.', why: 'Ex.1: few buyers, high volumes, credible alternatives.' },
      { text: 'Rivalry.', why: 'Not the dominant force described.' },
    ] }),
    Q({ id: 'S04-q05', kind: 'concept', src: '5F §3', stem: 'Two industries have identical concentration, yet one earns far more. Which explanation fits the brief?', correct: 1, options: [
      { text: 'One has better managers.', why: 'Structure, not management, sets the ceiling.' },
      { text: 'One competes on price, transferring value to customers; the other competes on features, service or brand.', why: '“The dimension of competition matters as much as its intensity.”' },
      { text: 'Concentration always determines profit.', why: 'The example contradicts it.' },
      { text: 'One has more growth.', why: 'Growth is not a force.' },
    ] }),
    Q({ id: 'S04-q06', kind: 'concept', src: '5F §7', stem: 'How does the brief treat government and complements?', correct: 3, options: [
      { text: 'As the sixth and seventh forces.', why: 'Porter declined to add them.' },
      { text: 'As irrelevant.', why: 'They matter — through the five.' },
      { text: 'As always reducing profit.', why: 'Neither is inherently good or bad.' },
      { text: 'They operate through the five forces; identify which force a factor acts through.', why: '§7.' },
    ] }),
    Q({ id: 'S04-q07', kind: 'apply', src: '5F §7', stem: 'A regulator mandates that customers can port their data between rival software vendors. Through which force does it act?', correct: 0, options: [
      { text: 'It lowers switching costs, strengthening buyers.', why: '“Regulation that mandates interoperability lowers switching costs and strengthens buyers.”' },
      { text: 'It is a sixth force.', why: 'No sixth box.' },
      { text: 'It strengthens suppliers.', why: 'Not the mechanism.' },
      { text: 'It raises entry barriers.', why: 'Usually the opposite.' },
    ] }),
    Q({ id: 'S04-q08', kind: 'case', src: 'Cola Ex.3', stem: 'Why is the $35–70M concentrate plant NOT the real barrier to entering cola?', correct: 2, options: [
      { text: 'Because concentrate is patented.', why: 'Not the case’s argument.' },
      { text: 'Because supplier power is high.', why: 'Inputs are commodities.' },
      { text: 'Because an entrant shut out of the incumbents’ bottlers must build ~$1.6B of bottling, plus face brands and fountain exclusives.', why: 'Exhibit 3’s assumption and total.' },
      { text: 'Because the FDA restricts new sodas.', why: 'Not in the case.' },
    ] }),
    Q({ id: 'S04-q09', kind: 'case', src: 'Cola', stem: 'Bottlers earn 5–10% while concentrate earns ~31%. What is the brief’s name for mistaking Coke’s success for the bottling layer’s attractiveness?', correct: 1, options: [
      { text: 'Mistaking growth for attractiveness.', why: 'Not about growth.' },
      { text: 'Confusing your position with the industry’s structure / defining the industry incorrectly.', why: 'Concentrate and bottling face different forces and must be analyzed separately.' },
      { text: 'Treating the analysis as a snapshot.', why: 'Not about time.' },
      { text: 'Adding a sixth force.', why: 'Not relevant.' },
    ] }),
    Q({ id: 'S04-q10', kind: 'apply', src: '5F §4', stem: 'An analyst calls “meal-kit delivery” attractive because it grew 40% a year. The brief’s response?', correct: 0, options: [
      { text: 'Growth is not a force; ask what it does to each force — it often attracts entry faster than demand, converting investor capital into consumer surplus.', why: '§4.' },
      { text: 'Agree — growth signals attractiveness.', why: 'The brief rejects this.' },
      { text: 'Growth only matters for buyers.', why: 'It affects all forces.' },
      { text: 'Growth means rivalry is weak, so it’s attractive.', why: 'Only one effect; ignores entry.' },
    ] }),
    Q({ id: 'S04-q11', kind: 'concept', src: '5F §6', stem: 'A business generates strong cash in a structurally deteriorating industry. The brief says treat it as…', correct: 3, options: [
      { text: 'the top priority for reinvestment.', why: 'The commonly misread quadrant.' },
      { text: 'irrelevant to strategy.', why: 'It’s central.' },
      { text: 'a candidate for immediate shutdown.', why: 'Too strong; it’s a source of funds.' },
      { text: 'a source of funds, with a high burden of proof on reinvestment.', why: '§6.' },
    ] }),
    Q({ id: 'S04-q12', kind: 'concept', src: '5F Fig.3', stem: 'Weak position, attractive structure. The capital-allocation answer is…', correct: 2, options: [
      { text: 'Invest and defend.', why: 'That’s strong + attractive.' },
      { text: 'Milk, or reshape.', why: 'That’s strong + unattractive.' },
      { text: 'Harvest or exit — fix the position quickly or sell into a market that still values it.', why: 'Fig.3.' },
      { text: 'Exit immediately.', why: 'That’s weak + unattractive.' },
    ] }),
    Q({ id: 'S04-q13', kind: 'apply', src: '5F §5', stem: 'A firm launches a loyalty program “to fight competitors” but can’t name which force it changes. The brief calls this…', correct: 1, options: [
      { text: 'reshaping structure.', why: 'Reshaping must name the force and mechanism.' },
      { text: 'an operating improvement — worth having, but it diffuses and doesn’t alter the ceiling.', why: '§5.' },
      { text: 'a sixth force.', why: 'No.' },
      { text: 'a barrier to entry.', why: 'Only if it raises switching costs, which must be shown.' },
    ] }),
    Q({ id: 'S04-q14', kind: 'case', src: 'Cola Ex.5', stem: 'Which force is strengthening fastest against concentrate in 2026?', correct: 0, options: [
      { text: 'Substitutes — water, energy, RTD coffee/tea and functional soda growing far faster than CSDs.', why: 'Exhibit 5 CAGRs vs. CSD +1.6%.' },
      { text: 'Supplier power.', why: 'Inputs remain commodities.' },
      { text: 'Rivalry between Coke and Pepsi.', why: 'The case says that’s no longer the main contest.' },
      { text: 'Entry by Virgin Cola.', why: 'Virgin finished under 1% long ago.' },
    ] }),
    Q({ id: 'S04-q15', kind: 'concept', src: '5F §5', stem: 'Which is an example of RESHAPING structure, per the brief?', correct: 2, options: [
      { text: 'Cutting costs 5%.', why: 'An operating improvement.' },
      { text: 'Launching a new flavor.', why: 'Not structural by itself.' },
      { text: 'Industry consolidation that reduces rivalry (US airline mergers 2008–2013).', why: '§5.' },
      { text: 'Raising advertising.', why: 'Not structural.' },
    ] }),
    Q({ id: 'S04-q16', kind: 'apply', src: '5F §3', stem: '**Ultracell** (fictional) is the only qualified supplier of a battery chemistry to a fast-growing drone industry, and could make drones itself. Prediction?', correct: 3, options: [
      { text: 'Drone makers will capture rising margins as the market grows.', why: 'The single supplier holds the option on the margin.' },
      { text: 'Buyer power will dominate.', why: 'Buyers lack alternatives.' },
      { text: 'Substitutes will cap Ultracell’s price.', why: 'No substitute is described.' },
      { text: 'Ultracell will take an increasing share of value as the market grows unless buyers build alternatives.', why: '“Suppliers of a critical component in a growing market will take an increasing share.”' },
    ] }),
    Q({ id: 'S04-q17', kind: 'concept', src: '5F §9', stem: 'Which is NOT one of the brief’s three propositions?', correct: 1, options: [
      { text: 'Structure sets a ceiling no operating program lifts.', why: 'Proposition 1.' },
      { text: 'All five forces should be weighted equally.', why: 'The brief says one or two forces usually bind — concentrate effort there.' },
      { text: 'The framework earns its keep used comparatively and turned into a decision.', why: 'Proposition 2.' },
      { text: 'Structure can be shaped, and shaping beats performing within it.', why: 'Proposition 3.' },
    ] }),
    Q({ id: 'S04-q18', kind: 'case', src: 'Cola', stem: 'Why did PepsiCo buy Pizza Hut, Taco Bell and KFC?', correct: 0, options: [
      { text: 'Partly to secure fountain sales in a channel where exclusivity can shift national share.', why: 'The case’s explanation.' },
      { text: 'To enter the restaurant industry as its main business.', why: 'The case ties it to fountain access.' },
      { text: 'To lower sugar costs.', why: 'Unrelated.' },
      { text: 'Because of SNAP rules.', why: 'Decades earlier.' },
    ] }),
    Q({ id: 'S04-q19', kind: 'quant', src: 'Cola Ex.2', stem: 'Concentrate sells at $1.30 per case with $0.30 COGS, $0.28 advertising, $0.32 G&A. EBITDA margin is about…', correct: 2, options: [
      { text: '77%', why: 'That’s gross margin.' },
      { text: '23%', why: 'That’s COGS share.' },
      { text: '31% ($0.40 ÷ $1.30)', why: '1.30 − 0.30 − 0.28 − 0.32 = 0.40; 0.40/1.30 = 30.8%.' },
      { text: '45%', why: 'Arithmetic slip.' },
    ] }),
    Q({ id: 'S04-q20', kind: 'apply', src: '5F §4', stem: 'A regional bank sees no recent entrants and concludes entry is no threat. Error?', correct: 3, options: [
      { text: 'None — no entrants means no threat.', why: 'The relevant question is what a determined entrant would face.' },
      { text: 'Confusing growth with attractiveness.', why: 'Not about growth.' },
      { text: 'Adding a sixth force.', why: 'No.' },
      { text: 'Judging entry by recent history instead of by what a determined, well-capitalized entrant would face (latent entry).', why: '§3.' },
    ] }),
  ],
  shorts: [
    { id: 'S04-sa1', session: 'S04', src: '5F §4', prompt: 'Explain structure vs. position with the cola example.', model: 'Structure is the ceiling on returns available in a layer; position is the share one firm captures. Concentrate’s structure lets Coke, Pepsi and KDP all earn ~30%; Coke’s position (brand, share) decides its slice. Bottling’s structure caps even well-run bottlers at 5–10%.', points: ['Define both', 'Concentrate vs. bottling'] },
    { id: 'S04-sa2', session: 'S04', src: '5F §5', prompt: 'Name the three ways to act on structure, with an example of each.', model: 'Position where forces are weakest (segments with fragmented buyers); exploit change before rivals (deregulation, channel shifts); reshape the structure (consolidation, switching costs, standards, supplier development, demand creation — e.g., airline mergers, the diamond ring norm).', points: ['Three moves', 'Examples'] },
    { id: 'S04-sa3', session: 'S04', src: 'Cola', prompt: 'Which force binds concentrate in 2026 and why?', model: 'Substitutes, strengthening: water, energy, RTD coffee/tea and functional soda are growing at 7–60%+ CAGRs vs. CSD’s 1.6%, per-capita CSD fell 53 → 28 gallons, and regulation pushes consumers toward them.', points: ['Names substitutes', 'Direction', 'Evidence'] },
    { id: 'S04-sa4', session: 'S04', src: '5F §4', prompt: 'Why must Five Forces be run at two points in time?', model: 'Structure changes; a force weak today and strengthening is the one to act on, and only a comparison reveals direction. A single-period description can’t trigger a decision.', points: ['Direction', 'Decision trigger'] },
  ],
  written: {
    prompt: '**Timed (20 min).** **Vantage Gyms** (fictional) is choosing between two industries to enter: boutique fitness studios or commercial gym equipment manufacturing. Use Five Forces to recommend one.',
    minutes: 20,
    model: 'A strong answer defines each industry, rates forces with Exhibit 1 drivers (studios: low entry barriers, many rivals, low switching costs, substitutes from apps → weak structure; equipment: scale and distribution barriers, concentrated buyers like gym chains, fewer rivals), names the binding forces, checks direction, and recommends the better structure — while separating structure from Vantage’s likely position. Ends with the capital-allocation quadrant.',
    rubric: ['Defines both industries', 'Uses force drivers, not adjectives', 'Names binding forces + direction', 'Separates structure from position', 'Clear recommendation'],
  },
  oral: { prompt: 'Evaluate the US cola concentrate industry with Five Forces, then and now.', probes: ['Which force binds, and how do you know?', 'Why not just say Coke has a great brand?', 'Is government a sixth force here?', 'What should Coke do with its CSD cash?'] },
  summary: {
    answer: 'Coke kept the capital-light, brand-driven concentrate layer and engineered the rest of the chain — exclusive bottler territories, fountain exclusives, brand-based rivalry — so buyers stayed weak and entrants stayed out; concentrate earns ~31% while bottling earns 5–10%. Today substitutes are the strengthening, binding force.',
    numbers: [
      { label: 'Concentrate per case', value: '$1.30 sales → $0.40 EBITDA (30.8%)', src: 'Cola Ex.2' },
      { label: 'Entry capex for 10% share', value: '~$1,628M (3 bottling plants + concentrate)', src: 'Cola Ex.3' },
      { label: 'Shares', value: 'Coke 46 · Pepsi 25 · KDP 22', src: 'Cola Ex.4' },
      { label: 'Per-capita CSD', value: '53 gal (1998) → 28 gal (2025)', src: 'Cola' },
      { label: 'ROIC: soft drinks vs. airlines', value: '37.6% vs. 5.9%', src: '5F §1' },
    ],
    frameworkBullets: ['Profit = residual after four outer forces', 'Ceiling varies ~7×', 'Rate with drivers; two points in time; binding forces', 'Misuses: wrong boundary, growth ≠ attractive, position ≠ structure, snapshot', 'Moves: position, exploit change, reshape', 'No sixth force'],
    caseBullets: ['Concentrate ≈31% vs. bottling 5–10%', 'Structure engineered via territories, fountain, brand rivalry', 'Substitutes binding and strengthening', 'Milk or reshape'],
  },
  crossLinks402: [{ topic: 'Five Forces rated with evidence', note: 'STRAT 402 rates each force 1–5 with the Five Forces Excel tool; 401 stresses direction, binding forces and reshaping.', href: '#/learn/S04' }],
}
