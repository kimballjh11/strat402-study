import { DataTable, HBar } from '../../components/Charts'
import { Cite } from '../../components/Cite'
import { PestTool, type PestRow } from '../../widgets/PestTool'
import type { Mcq, ModuleDef } from '../types'

function Diagram() {
  const box = (t: string, d: string, s: string) => (
    <div className="surface-2 rounded p-2 text-sm">
      <strong>{t}</strong>
      <div className="text-xs">{d}</div>
      <div className="text-xs muted">Moves: {s}</div>
    </div>
  )
  return (
    <figure className="card p-3 space-y-2">
      <figcaption className="font-semibold">
        PEST: the layer above the industry — and the three disciplines that make it useful <Cite tag="PEST Ex.1" />
      </figcaption>
      <div className="grid grid-cols-2 gap-1.5">
        {box('Political', 'Political risk: the rules and who may play', 'discontinuously, by announcement')}
        {box('Economic', 'Purchasing power, cost of capital, relative prices', 'cyclically, with long turns')}
        {box('Socio-cultural', 'What people want, tolerate — and who is doing the wanting', 'slowly, then all at once')}
        {box('Technological', 'What is possible, at what cost, by whom: physical · information · human capital', 'information fastest, human capital slowest')}
      </div>
      <div className="grid gap-1.5 md:grid-cols-3 text-xs">
        <div className="card p-2"><strong>1 · Relevance:</strong> factor → mechanism → decision. If no decision changes, the factor comes off the page.</div>
        <div className="card p-2"><strong>2 · Direction:</strong> run it at two points in time; the arrow, not the level, decides.</div>
        <div className="card p-2"><strong>3 · Bargaining power:</strong> factors set each side’s outside option, and outside options split the surplus.</div>
      </div>
      <div className="card p-2 text-xs"><strong>+ Given vs. built:</strong> the environment is less exogenous than PEST assumes; what a firm builds for itself is worth more than what it adapts to — and what was built can be dismantled.</div>
    </figure>
  )
}

function Exhibits() {
  return (
    <div className="space-y-4">
      <HBar title="Debswana ownership: Government of Botswana’s share" rows={[{ label: '1969 (initial JV)', value: 15 }, { label: '1975 renegotiation', value: 25 }, { label: '1980s renegotiations', value: 50 }]} unit="%" digits={0} max={100} highlight="1980s renegotiations" note={<>De Beers held the remainder (85 → 75 → 50). 2000s+: “?” — the renegotiation question <Cite tag="Botswana Ex.2" /></>} />
      <DataTable
        caption={<>Timeline <Cite tag="Botswana Ex.1" /></>}
        head={['Year', 'Event']}
        rows={[['1885', 'Bechuanaland becomes a British protectorate'], ['1948', 'Seretse Khama exiled after his marriage to Ruth Williams'], ['1956', 'Khama returns'], ['1965', 'Botswana Democratic Party wins the first elections'], ['1966', 'Independence; Khama becomes President'], ['1967', 'Diamonds discovered at Orapa'], ['1969', 'Debswana joint venture formed'], ['1972', 'Jwaneng discovered'], ['1980s', 'Ownership and fiscal terms renegotiated'], ['2020s', 'Time for a renegotiation?']]}
      />
      <DataTable
        caption={<>Botswana’s PEST in 1966 (slides) <Cite tag="S3 slides 111" /></>}
        head={['Domain', '1966']}
        rows={[['Political', 'King turned prime minister; different tribes rule most of the country; little central control'], ['Economic', 'GDP third-lowest in the world (~$89 per capita); currency the pula; no known resources; subsistence farming'], ['Socio-cultural', 'Tribes have their own culture; family'], ['Technological', '12 km of roads; 22 college graduates']]}
      />
      <HBar title="Lab-grown share of US engagement rings" rows={[{ label: '2019', value: 12 }, { label: '2025', value: 61 }]} unit="%" digits={0} max={100} highlight="2025" note={<>“A change in values expressing itself as a change in demand” <Cite tag="PEST §2" /></>} />
    </div>
  )
}

const ROWS: PestRow[] = [
  { id: 'p1', domain: 'Political', factor: 'Who owns the mineral rights', then: 'Fragmented among tribal authorities and private interests at independence; Khama consolidates them under the state before the scale of wealth is known.', now: 'The state is the sole counterparty for every discovery and a 50% Debswana owner.', src: 'Botswana; PEST §2', model: { dir: 'Favorable', shaped: 'Shaped', mechanism: 'Consolidation made every discovery a national negotiation rather than a tribal or private windfall — the political act “that determined the distribution of tens of billions of dollars over the next sixty years.”', decision: 'Who sits across from De Beers, and what each discovery is worth to the state.', falsifier: 'Tribal or private claims re-emerging over new deposits.' } },
  { id: 'p2', domain: 'Political', factor: 'Botswana as a low-risk counterparty', then: 'Newly independent, poor, surrounded by apartheid South Africa and Rhodesia; reputation unknown.', now: 'Sixty years of honored contracts, “no palaces and no fancy cars,” orderly renegotiations.', src: 'PEST Ex.3; Botswana', model: { dir: 'Favorable', shaped: 'Shaped', mechanism: 'Built deliberately — rights consolidated before valuation, public rejection of elite enrichment, a contract honored when breaking it would have paid — lowering perceived political risk for De Beers and investors.', decision: 'How much De Beers will concede without fearing expropriation.', falsifier: 'A unilateral output increase or contract break.' } },
  { id: 'e1', domain: 'Economic', factor: 'Botswana’s capital and outside option', then: 'Aid-dependent; no capital, no route to a market De Beers controlled. Outside option: leave the stones in the ground.', now: 'Revenue, reserves, trained administrators, its own sales channel.', src: 'PEST §5-6', model: { dir: 'Favorable', shaped: 'Shaped', mechanism: 'A better outside option takes a larger share of the surplus — “the split was 85/15 because the options were 85/15,” and moved to parity without a single expropriation.', decision: 'How hard to press in the renegotiation.', falsifier: 'Botswana unable to sell output except through De Beers.' } },
  { id: 'e2', domain: 'Economic', factor: 'De Beers’ position', then: 'Controls much of global supply and the selling system (CSO); can source elsewhere.', now: 'Loss-making and written down by its parent three years running; dependent on Botswana for a large share of supply.', src: 'PEST §5-6; Botswana', model: { dir: 'Favorable', shaped: 'Given', mechanism: 'A weaker counterparty has a worse outside option, shifting bargaining power toward Botswana.', decision: 'Terms Botswana can demand (equity, sales share, beneficiation).', falsifier: 'De Beers finding comparable supply elsewhere.' } },
  { id: 's1', domain: 'Socio-cultural', factor: 'What a diamond means to buyers', then: 'The engagement-ring norm — manufactured by an advertising campaign from 1938 on behalf of the cartel.', now: 'Lab-grown share of US engagement rings 12% (2019) → 61% (2025); younger buyers question price transparency, ethics and environment.', src: 'PEST §2, Ex.3; Botswana', model: { dir: 'Adverse', shaped: 'Shaped', mechanism: 'Willingness to pay for scarcity is falling — a change in values that “no amount of supply discipline can answer.”', decision: 'Whether to accelerate or restrain extraction; how urgently to diversify.', falsifier: 'The natural-to-lab price ratio at the top of the range stops narrowing.' } },
  { id: 't1', domain: 'Technological', factor: 'Lab-grown diamonds', then: 'Not a factor.', now: 'Chemically and visually identical stones at large discounts, made outside the supply-control system.', src: 'PEST §2, §8', model: { dir: 'Adverse', shaped: 'Given', mechanism: 'A discontinuity, not a trend: it doesn’t undercut price so much as dissolve the manufactured scarcity that set price. Combined with the social shift, it breaks the model — “either alone would have been survivable.”', decision: 'Long-term value of reserves; timing of extraction; diversification.', falsifier: 'Natural stones sustaining a stable premium at scale.' } },
  { id: 't2', domain: 'Technological', factor: 'Human capital (brainware)', then: 'Fewer than a dozen university graduates.', now: 'Trained administrators and demonstrated ability to run the operation.', src: 'Botswana; PEST §2, §6', model: { dir: 'Favorable', shaped: 'Shaped', mechanism: 'Capability Botswana built raises its outside option — it could run more of the chain itself.', decision: 'Whether to take on sorting, valuation and sales.', falsifier: 'Botswana still needing De Beers’ expertise to operate.' } },
]

const Q = (o: Omit<Mcq, 'session'>): Mcq => ({ ...o, session: 'S03' })

export const S03: ModuleDef = {
  id: 'S03',
  short: 'PEST · Botswana',
  framework: {
    oneLiner: 'PEST scans the forces that hit **every competitor at once** — but it only earns its place when you name a **decision**, run it at **two points in time**, read it from **both sides of the table**, and ask what is **given** versus what can be **built** [[PEST §1]].',
    analogy: 'Planning a hike, the weather forecast matters — but only for your decision (“go today or Saturday?”), only as a trend (“the storm is moving in”), and only relative to your options (“the lodge is booked if we wait”). A list of true facts about the climate is background. And some “weather” you can change: pick the trail with shelter [[PEST §4-7]].',
    intuition: [
      'Most course tools take the world as it is; PEST works one layer up, on forces no single firm can negotiate with that periodically **rewrite the rules** [[PEST §1]].',
      'Its bad reputation comes from the **inventory**: a grid of true, irrelevant facts. “A PEST analysis that could have been written before the decision was identified is not analysis. It is background” [[PEST §1]].',
      '**Relevance:** a factor earns a place only if a plausible change in it would change the decision; write every factor as **factor → mechanism → decision** [[PEST §4]].',
      '**Direction:** the level tells you what your position is worth; only the **delta** tells you whether to change it. An arrow on every row beats a number on every row [[PEST §5]].',
      '**Bargaining power:** every factor eventually answers “what happens to each party if this deal isn’t signed?” — the outside option decides the split, regardless of who deserves what [[PEST §6]].',
      '**Given vs. built:** for geology, demographics and weather the environment is exogenous; for much of politics, society and technology it isn’t — and what firms build is where durable advantage lives (Tesla’s connector, Samsung funding MBAs). What was built can be dismantled [[PEST §7, §9]].',
      '**Technology is three infrastructures**, not one number: physical (hardware), information (software), human capital (brainware). Opportunities sit in the gaps (M-Pesa) [[PEST §2]].',
    ],
    howToRun: [
      '**1. Name the decision** first (“should we commit to a 15-year fleet order?”) [[PEST §4]].',
      '**2. List only factors whose change would change that decision;** write each as factor → mechanism → decision [[PEST §4]].',
      '**3. Run the grid twice** (then vs. now) and put an arrow on every row — favorable, adverse, or ambiguous **for us** [[PEST §5, Ex.2]].',
      '**4. In a negotiation, write it once for each side** and ask whose outside option moved [[PEST §6]].',
      '**5. Mark each factor given or shaped** — the shaped column is where strategy lives, and it’s usually too short [[PEST Ex.2]].',
      '**6. Look for pairs of factors moving the same way** — those break business models [[PEST §8]].',
      '**7. Attach a falsifier** to every row [[PEST Ex.2]].',
    ],
    recall: [
      { id: 'S03-domains', title: 'The four domains and what each governs', prompt: 'Name each domain and what it governs.', items: [{ name: 'Political — political risk: the rules of the game and who may play' }, { name: 'Economic — purchasing power, cost of capital, relative prices' }, { name: 'Socio-cultural — what people want, tolerate, and who does the wanting' }, { name: 'Technological — what is possible, at what cost, by whom' }], src: 'PEST Ex.1' },
      { id: 'S03-disc', title: 'The three disciplines (+ the assumption it gets wrong)', prompt: 'What makes PEST earn its place?', items: [{ name: 'Relevance (factor → mechanism → decision)' }, { name: 'Direction (two points in time)' }, { name: 'Bargaining power (outside options)' }, { name: 'Given vs. built (the environment is less exogenous than assumed)' }], src: 'PEST §4-7' },
      { id: 'S03-tech', title: 'Three technology infrastructures', prompt: 'Morris & Oldroyd.', items: [{ name: 'Physical — the hardware', hint: 'raw materials, manufacturing, transport, energy' }, { name: 'Information — the software', hint: 'communications, data storage and processing' }, { name: 'Human capital — the brainware', hint: 'education, corporate training, government-business-education cooperation' }], src: 'PEST §2, Fig.1' },
      { id: 'S03-fail', title: 'Seven ways PEST fails', prompt: 'Name all seven.', items: [{ name: 'The inventory' }, { name: 'The snapshot' }, { name: 'False precision' }, { name: 'Reading technology as a single number' }, { name: 'Scanning where you already look' }, { name: 'Confusing a trend with a discontinuity' }, { name: 'Treating the quadrants as independent' }], src: 'PEST §8' },
      { id: 'S03-ws', title: 'The PEST worksheet’s seven columns', prompt: 'Exhibit 2.', items: [{ name: 'Factor' }, { name: 'Then / now' }, { name: 'Direction' }, { name: 'Mechanism' }, { name: 'Decision affected' }, { name: 'Given or shaped' }, { name: 'Falsifier' }], src: 'PEST Ex.2' },
      { id: 'S03-risk', title: 'Seizure typology (slides)', prompt: 'Three ways governments take assets.', items: [{ name: 'Confiscation — seizure without compensation', hint: 'Mugabe’s farm seizures' }, { name: 'Expropriation — seizure with compensation', hint: 'Exxon, Conoco in Venezuela' }, { name: 'Nationalization — seizure of an industry, with or without compensation', hint: 'Chavez cement 2008; Morales airports 2013' }], src: 'S3 slides 8' },
    ],
    diagram: Diagram,
    variants: [
      {
        title: 'What sits inside the technology infrastructures',
        brief: '**Information infrastructure** = communication technologies + data storage and processing; **physical** = raw materials, manufacturing, transport, energy; **human capital** = education, corporate training, government-business-education cooperation [[PEST §2]].',
        slides: 'The slides list the same three axes but add **“Laws”** under information infrastructure, and an earlier slide lists generic technological factors (maturity of manufacturing equipment, information systems, platforms, research funding, consumer access, roads) [[S3 slides 98-101]].',
        differ: 'Mostly the same model. The slide puts laws under information infrastructure; the brief keeps laws in the political domain (“legal factors are political factors with a court attached”).',
        guess: '**Guess:** the slides come from the professor’s International Business textbook deck (Morris & Oldroyd), which bundles IP and data laws with information systems; the white paper is the newer, tighter version. On a PEST question, file laws under Political.',
      },
      {
        title: 'Botswana in 1966: the numbers',
        brief: 'The case: fewer than a dozen university graduates and **under 20 km of paved road** [[Botswana]].',
        slides: 'The slide: **22 college graduates and 12 km of roads**, GDP ~$89 per capita [[S3 slides 111]].',
        differ: 'Different figures for the same starting point.',
        guess: '**Guess:** different historical sources (paved vs. total roads; university vs. college graduates). The point is identical — near-zero human capital and physical infrastructure. Quote either with its source.',
      },
    ],
    newScenarios: [
      { prompt: '**Coastline Cement** (fictional) is deciding whether to build a plant in a country that just elected a government promising to “return strategic industries to the people.” Which PEST discipline matters most, and what would you put in the falsifier column?', answer: 'Direction plus political risk: the factor (expropriation/nationalization risk) is moving adversely by announcement — political factors change discontinuously. Mechanism: risk of seizure lowers the expected value of a sunk plant → decision: build, delay, or structure as a JV with local ownership. Falsifier: the government signing investment-protection terms or honoring existing contracts [[PEST §2]] [[S3 slides 8]].' },
      { prompt: 'A consultant hands **Pinecrest Foods** (fictional) a PEST with 40 true facts about the economy and demographics but no recommendation. What’s wrong?', answer: 'The inventory failure — no decision named, so nothing connects to a choice. Fix: name the decision, keep only factors whose change would change it, and write each as factor → mechanism → decision [[PEST §4, §8]].' },
      { prompt: 'A telecom (fictional, **Vela Mobile**) sees a country with near-universal mobile coverage but few bank branches. What does the three-infrastructure lens suggest?', answer: 'High information infrastructure, low physical banking infrastructure — the M-Pesa gap. The opportunity is to route around the missing physical infrastructure with phone-based payments [[PEST §2]].' },
    ],
  },
  argument: {
    intro: 'The paper defends PEST against its own reputation: the framework is fine; the execution is bad. It works only when tied to a decision, run comparatively, read as bargaining power, and stripped of the assumption that the environment is simply given.',
    propositions: [
      '**Analyze the environment only against a decision**; done when every factor is connected to it by a stated mechanism [[PEST §9]].',
      '**Movement matters more than level** — run it across time and, in a negotiation, across both sides of the table [[PEST §9]].',
      '**The environment is less exogenous than PEST implies;** factors a firm builds beat factors it adapts to, because rivals can adapt to the same conditions but can’t copy an environment built to suit someone else [[PEST §9]].',
      '**What was built can be dismantled** — sometimes by a party never on the industry map (the laboratory) [[PEST §9]].',
      '**Outside options split the surplus;** Botswana went from 15% to 50% “without a single expropriation, because the outside options had moved” [[PEST §6]].',
      '**Botswana today has a stronger claim on a shrinking asset** — P and E improved, S and T deteriorated; only the comparison shows it [[PEST §5]].',
      '**PEST comes before the industry tools,** telling you which structural features are load-bearing and about to move [[PEST §9]].',
    ],
  },
  case: {
    protagonist: 'Seretse Khama (Botswana’s first president), and today’s Botswana government preparing to renegotiate with De Beers [[Botswana]].',
    decision: 'How did Khama change the PEST for De Beers — and now, how hard should Botswana press its increased bargaining power versus protecting the relationship, and should it diversify away from diamonds or lean in? [[Botswana]] [[Canvas S3]]',
    timeline: [
      { when: '1966', what: 'Independence: <20 km paved road, fewer than a dozen graduates, aid-dependent [[Botswana]]' },
      { when: '1966–67', what: 'Khama consolidates mineral rights under the state before the wealth is known' },
      { when: '1967', what: 'Diamonds found at Orapa' },
      { when: '1969', what: 'Debswana formed: Botswana 15%, De Beers 85%, De Beers controls output and marketing' },
      { when: '1975', what: 'Botswana 25%' },
      { when: '1980s', what: 'Botswana 50%; higher taxes and royalties' },
      { when: '2019–25', what: 'Lab-grown share of US engagement rings 12% → 61%' },
      { when: '2020s', what: 'Time for a renegotiation?' },
    ],
    exhibits: Exhibits,
  },
  tool: {
    title: 'PEST at two points in time — for Botswana, across the table from De Beers',
    intro: 'Run the worksheet for the decision “how hard should Botswana press De Beers in the renegotiation?” Fill it in yourself before revealing each model row.',
    render: () => <PestTool id="S03-pest" rows={ROWS} forWhom="Botswana" />,
  },
  coldCalls: [
    { id: 'c1', level: 'Facts', q: 'What was Botswana’s position in 1966?', model: 'Among the poorest territories in southern Africa: under 20 km of paved road, fewer than a dozen university graduates, subsistence agriculture and cattle, dependent on foreign aid, between apartheid South Africa and Rhodesia [[Botswana]].', weak: 'It was poor.', whyWeak: 'No specifics; can’t support a PEST grid.' },
    { id: 'c2', level: 'Facts', q: 'What did Khama do with mineral rights, and when?', model: 'He consolidated fragmented tribal and private rights under the national government **before** the scale of the diamond wealth was known — a strategic gamble that made the state the sole counterparty for every future discovery [[Botswana]] [[PEST §2]].', weak: 'He nationalized the diamond mines.', whyWeak: 'Wrong act and wrong timing; no mines existed yet.' },
    { id: 'c3', level: 'Analysis', q: 'Why did Botswana accept only 15% in 1969? Wasn’t that weakness?', model: 'It was the price of access. Botswana’s outside option was leaving stones in the ground in a country that couldn’t feed itself without aid; De Beers could source elsewhere. “The split was 85/15 because the options were 85/15” [[PEST §6]].', weak: 'They didn’t know how to negotiate.', whyWeak: 'Ignores the outside-option logic.' },
    { id: 'c4', level: 'Analysis', q: 'How did the split get to 50/50 with no expropriation?', model: 'The outside options moved: by the 1980s Botswana had revenue, reserves, trained administrators and proof it could run the operation, while De Beers depended on Botswana for much of its supply. Botswana used its growing power gradually and predictably, so the relationship survived [[PEST §6]].', weak: 'Botswana threatened to take the mines.', whyWeak: 'The paper stresses the absence of expropriation.' },
    { id: 'c5', level: 'Analysis', q: 'How did Khama change the PEST *for De Beers*?', model: 'He turned Botswana from a political risk into a political asset: a single, stable counterparty with consolidated rights, a leadership norm against elite enrichment, and contracts honored through fiscal strain. That lowered De Beers’ political risk — the “low-risk counterparty” the paper says was built, not found [[PEST Ex.3]] [[Botswana]].', weak: 'He made the country richer.', whyWeak: 'Describes Botswana’s outcome, not De Beers’ environment.' },
    { id: 'c6', level: 'Analysis', q: 'Run the 2026 grid. Which quadrants moved which way?', model: 'Political and economic inverted in Botswana’s favor (capital, expertise, reserves, credibility, its own sales channel; De Beers loss-making and written down). Social and technological moved the other way (lab-grown, values shift). “A stronger claim on a shrinking asset” [[PEST §5]].', weak: 'Everything is better for Botswana now.', whyWeak: 'A snapshot that misses the adverse quadrants.' },
    { id: 'c7', level: 'Analysis', q: 'Is lab-grown diamond a trend or a discontinuity?', model: 'A discontinuity: chemically identical stones made outside the supply-control system don’t just undercut price, they dissolve the manufactured scarcity that set price. And it coincided with a social shift — the quadrants interacted [[PEST §8]].', weak: 'A trend, because prices fall gradually.', whyWeak: 'Confuses a trend with a discontinuity — a named failure mode.' },
    { id: 'c8', level: 'Judgment', q: 'What did Botswana miss, despite brilliant negotiating?', model: '“Scanning where you already look”: it built a formidable capability for reading the political and economic environment and was overtaken by a laboratory — the quadrant nobody in the room was qualified to assess [[PEST §8]].', weak: 'Nothing; it was a success.', whyWeak: 'Ignores the paper’s sobering lesson.' },
    { id: 'c9', level: 'Judgment', q: 'Should Botswana press hard now?', model: 'Press, but gradually and predictably — the same pattern that moved equity without breaking the relationship. Use the stronger P/E position to win terms that reduce dependence on a shrinking asset (sales share, downstream capability, diversification funding), because the S/T quadrants say the asset’s value is falling [[PEST §5-6]].', weak: 'Yes, take as much as possible.', whyWeak: 'Ignores the shrinking asset and the value of predictability.' },
    { id: 'c10', level: 'Action', q: 'One sentence: how did Khama change the PEST for De Beers?', model: 'Khama built Botswana’s political environment — consolidating mineral rights before their value was known and establishing a credible, incorruptible state — which turned a risky jurisdiction into De Beers’ most reliable partner and steadily improved Botswana’s outside option.', weak: 'He made Botswana better.', whyWeak: 'Not specific, not falsifiable.' },
  ],
  devil: {
    argument: 'Khama didn’t change the PEST; geology did. Orapa and Jwaneng made Botswana valuable, and any government would have captured more as revenue grew.',
    response: 'Deposits explain the size of the prize, not its distribution. Rights were consolidated **before** the wealth was known, which is why every discovery became a national negotiation instead of a tribal or private windfall [[Botswana]]. The resource-curse pattern (S3 slides) and Venezuela — output down 31% after 1970s nationalizations and 75% under later oil nationalism — show deposits plus weak institutions usually end badly [[S3 slides 12]]. The paper lists Botswana’s credibility as built, not found [[PEST Ex.3]].',
    probes: ['What would have happened if rights had stayed with the tribes?', 'Was signing away output control in 1969 a mistake?', 'Which factor could undo everything Botswana built?'],
  },
  pyramid: {
    prompt: 'Answer the Key Question: **How did Khama change the PEST for De Beers?** Use a combined or inductive pyramid.',
    model: {
      structure: 'inductive',
      s: 'In 1966 Botswana was among the poorest countries in Africa, and De Beers controlled the world’s diamond supply and sales [[Botswana]].',
      c: 'After diamonds were found, Botswana negotiated from almost no leverage — yet within two decades it moved from 15% to 50% of Debswana without expropriation [[Botswana Ex.2]].',
      q: 'How did Khama change the PEST for De Beers?',
      a: 'Khama rebuilt the political environment De Beers faced — making Botswana a single, credible, low-risk counterparty — which raised Botswana’s outside option over time and let it capture more of the value.',
      supports: [
        { label: 'Reason 1', point: 'He consolidated mineral rights under the state before their value was known.', evidence: ['Every discovery became a national negotiation [[PEST §2]]'] },
        { label: 'Reason 2', point: 'He made Botswana predictable and incorruptible.', evidence: ['“No palaces and no fancy cars”; contracts honored through fiscal strain [[Botswana]]'] },
        { label: 'Reason 3', point: 'He invested diamond revenue into capability that improved Botswana’s outside option.', evidence: ['Revenue, reserves, trained administrators by the 1980s → 50/50 [[PEST §6]]'] },
      ],
      competing: '“Geology, not Khama, changed the deal.” It fails on its own terms: geology set the size of the prize, but consolidation and credibility set who captured it — resource-rich states without them (Venezuela) captured far less.',
      memo: 'Inductive: three parallel ways the political/economic environment was built (rights, credibility, capability), each a “thing Khama built that raised Botswana’s bargaining power.”',
    },
  },
  checkIds: ['S03-q01', 'S03-q02', 'S03-q04', 'S03-q06', 'S03-q08', 'S03-q10', 'S03-q12', 'S03-q14', 'S03-q16', 'S03-q19'],
  bank: [
    Q({ id: 'S03-q01', kind: 'concept', src: 'PEST §4', stem: 'What is the one-line rule for the relevance discipline?', correct: 2, options: [
      { text: 'Include every true fact about each domain.', why: 'That produces the inventory.' },
      { text: 'Include factors that are changing fastest.', why: 'Speed isn’t the test.' },
      { text: 'A factor earns a place only if a plausible change in it would change the decision in front of you.', why: 'Direct from §4.' },
      { text: 'Include one factor per letter.', why: 'The paper says spend no time arguing about letters.' },
    ] }),
    Q({ id: 'S03-q02', kind: 'concept', src: 'PEST §5', stem: 'Why run PEST at two points in time?', correct: 0, options: [
      { text: 'Because the level tells you what your position is worth, but only the movement tells you whether to change it.', why: '§5: “only the delta tells you whether to change it.”' },
      { text: 'Because data is more accurate over time.', why: 'Not the argument.' },
      { text: 'To produce ten-year forecasts.', why: 'False precision is a named failure.' },
      { text: 'Because regulators require it.', why: 'Not discussed.' },
    ] }),
    Q({ id: 'S03-q03', kind: 'concept', src: 'PEST §3', stem: 'What does the paper say about PESTEL and STEEPLE’s extra letters?', correct: 3, options: [
      { text: 'They are essential; PEST alone is incomplete.', why: 'Mostly redundant, per the paper.' },
      { text: 'Legal deserves its own letter above all.', why: 'Legal = political factors with a court attached.' },
      { text: 'Ethical is the most important addition.', why: 'Ethical = social factors with a normative claim.' },
      { text: 'Mostly redundant; only Environmental has earned its own letter, and nothing turns on classification.', why: '§3.' },
    ] }),
    Q({ id: 'S03-q04', kind: 'apply', src: 'PEST §6', stem: '**Ridgeview Mall** (fictional) is renegotiating its anchor tenant’s lease. Online retail has gutted demand for mall space nearby; the tenant has three other sites ready. Who holds bargaining power, and why?', correct: 1, options: [
      { text: 'The mall, because it owns the property.', why: 'Ownership doesn’t set the split; outside options do.' },
      { text: 'The tenant, because its outside option (three ready sites) is better than the mall’s (an empty box in a weak market).', why: 'The bargaining-power discipline.' },
      { text: 'Neither — it depends on negotiating skill.', why: '“Regardless of what either side deserves or how skillfully either bargains.”' },
      { text: 'The mall, because it was there first.', why: 'Not a PEST argument.' },
    ] }),
    Q({ id: 'S03-q05', kind: 'concept', src: 'PEST §7', stem: 'What assumption does PEST get wrong, according to the paper?', correct: 2, options: [
      { text: 'That politics matters.', why: 'Politics matters.' },
      { text: 'That technology changes fast.', why: 'Not the assumption.' },
      { text: 'That the environment is exogenous — firms often build or shape it.', why: '§7: “Given and Built.”' },
      { text: 'That economics is cyclical.', why: 'Not the assumption.' },
    ] }),
    Q({ id: 'S03-q06', kind: 'case', src: 'PEST §6', stem: 'How did Debswana move from 15% to 50% Botswana ownership?', correct: 0, options: [
      { text: 'The outside options moved — Botswana gained revenue, reserves and capability while De Beers grew dependent on its supply — with no expropriation.', why: 'The paper’s reading.' },
      { text: 'Botswana nationalized the mines.', why: 'No expropriation occurred.' },
      { text: 'De Beers donated equity as goodwill.', why: 'Not supported.' },
      { text: 'The UN mandated it.', why: 'Not in the case.' },
    ] }),
    Q({ id: 'S03-q07', kind: 'concept', src: 'PEST §2', stem: 'Which domain changes discontinuously, “by announcement”?', correct: 3, options: [
      { text: 'Economic.', why: 'Cyclical, with long turns.' },
      { text: 'Socio-cultural.', why: 'Slowly, then all at once.' },
      { text: 'Technological.', why: 'Varies by infrastructure.' },
      { text: 'Political.', why: '§2 and Exhibit 1.' },
    ] }),
    Q({ id: 'S03-q08', kind: 'apply', src: 'PEST §2', stem: '**Solano Payments** (fictional) finds a country with weak bank branches but near-universal smartphones, and a large pool of engineers abroad who won’t relocate. Using the three infrastructures, which is the opening?', correct: 1, options: [
      { text: 'Build branches — physical infrastructure is low.', why: 'The paper says route around missing physical infrastructure.' },
      { text: 'A phone-based payments product in the gap between strong information and weak physical infrastructure (the M-Pesa pattern).', why: '“The missing physical infrastructure was never built; it was routed around.”' },
      { text: 'Wait until human capital improves.', why: 'Human capital is the slowest; waiting forfeits the gap.' },
      { text: 'Score the country “medium” and move on.', why: 'Reading technology as one number is a named failure.' },
    ] }),
    Q({ id: 'S03-q09', kind: 'concept', src: 'PEST §8', stem: 'A trend differs from a discontinuity because…', correct: 2, options: [
      { text: 'trends are political and discontinuities technological.', why: 'Either can occur in any domain.' },
      { text: 'trends are faster.', why: 'Speed isn’t the distinction.' },
      { text: 'a trend changes the rate at which value accrues; a discontinuity changes what creates value at all.', why: '§8.' },
      { text: 'discontinuities can be forecast precisely.', why: 'Opposite.' },
    ] }),
    Q({ id: 'S03-q10', kind: 'case', src: 'PEST §8', stem: 'Why does the paper say the lab-grown shock broke the diamond model when either half alone would have been survivable?', correct: 0, options: [
      { text: 'Technology destroyed manufactured supply scarcity at the same moment social change destroyed willingness to pay for scarcity — the quadrants interacted.', why: '“Treating the quadrants as independent” is the failure.' },
      { text: 'Because De Beers ran out of cash.', why: 'A consequence, not the mechanism.' },
      { text: 'Because Botswana raised taxes.', why: 'Not discussed.' },
      { text: 'Because of a recession.', why: 'Not the explanation.' },
    ] }),
    Q({ id: 'S03-q11', kind: 'concept', src: 'S3 slides 8', stem: 'A government seizes a foreign firm’s plant and pays fair-market compensation. This is…', correct: 1, options: [
      { text: 'Confiscation.', why: 'Confiscation is without compensation.' },
      { text: 'Expropriation.', why: 'Seizure of property with compensation.' },
      { text: 'A tariff.', why: 'Different instrument.' },
      { text: 'Creeping expropriation.', why: 'That’s gradual seizure via codes and claims.' },
    ] }),
    Q({ id: 'S03-q12', kind: 'apply', src: 'PEST Ex.3', stem: 'Which looks given but was actually built, per the paper?', correct: 3, options: [
      { text: 'Geology.', why: '“Given. Adapt.”' },
      { text: 'Demographics.', why: 'Listed as given.' },
      { text: 'The credit cycle.', why: 'Listed as given.' },
      { text: 'The diamond engagement ring as a social norm.', why: '“Manufactured by an advertising campaign from 1938 onward.”' },
    ] }),
    Q({ id: 'S03-q13', kind: 'concept', src: 'PEST §8', stem: 'What antidote does the paper give for “scanning where you already look”?', correct: 2, options: [
      { text: 'Hire more economists.', why: 'More of the same expertise reinforces the blind spot.' },
      { text: 'Run the grid annually.', why: 'Frequency doesn’t fix the blind spot.' },
      { text: 'Assign someone to the quadrant nobody in the room is qualified to assess, and take their report seriously.', why: '§8.' },
      { text: 'Use STEEPLE.', why: 'Extra letters don’t fix where you look.' },
    ] }),
    Q({ id: 'S03-q14', kind: 'apply', src: 'PEST §8', stem: 'A report forecasts a country’s inflation in 2036 to one decimal place. Which failure?', correct: 0, options: [
      { text: 'False precision — state directions and rates of change instead, with a falsifier if a number is unavoidable.', why: '§8.' },
      { text: 'The snapshot.', why: 'It’s a forecast, not a single-period description.' },
      { text: 'The inventory.', why: 'Not the main issue.' },
      { text: 'Treating quadrants as independent.', why: 'Not described.' },
    ] }),
    Q({ id: 'S03-q15', kind: 'case', src: 'Botswana', stem: 'What did Botswana give De Beers in the original 1969 deal, and why was it rational?', correct: 3, options: [
      { text: 'Full ownership, because Botswana didn’t want diamonds.', why: 'Botswana kept 15%.' },
      { text: 'Nothing — De Beers paid cash.', why: 'De Beers got 85% and control.' },
      { text: 'A monopoly on all Botswana exports.', why: 'Not in the case.' },
      { text: 'Majority ownership and control of output and marketing, in exchange for capital, expertise, price stability and a route to market Botswana couldn’t reach alone.', why: 'The case’s description of the trade.' },
    ] }),
    Q({ id: 'S03-q16', kind: 'concept', src: 'PEST §9', stem: 'Where does PEST sit relative to Five Forces?', correct: 1, options: [
      { text: 'After it, as a final check.', why: 'The paper says before.' },
      { text: 'Before it — PEST tells you which structural features are load-bearing and about to move.', why: '§9.' },
      { text: 'Instead of it.', why: 'They do different jobs.' },
      { text: 'Inside it, as a sixth force.', why: 'The Five Forces brief rejects a sixth box.' },
    ] }),
    Q({ id: 'S03-q17', kind: 'concept', src: 'S3 slides 18-20', stem: 'Which statement about the FCPA and the UK Bribery Act is correct?', correct: 2, options: [
      { text: 'The FCPA bans private-sector bribes; the UK Act does not.', why: 'Reversed — the UK Act bars private-sector bribes.' },
      { text: 'The FCPA applies only to US citizens living in the US.', why: 'It reaches subsidiaries, agents and issuers of US securities.' },
      { text: 'The UK Bribery Act is tougher: it bars private-sector bribes and applies to both parties.', why: 'S3 slide 20.' },
      { text: 'Neither has accounting provisions.', why: 'The FCPA has SEC accounting provisions.' },
    ] }),
    Q({ id: 'S03-q18', kind: 'quant', src: 'S3 slides 67-71', stem: 'A Big Mac costs 12.5 yuan in China and $3.54 in the US. The actual rate is 6.84 yuan per dollar. PPP implies…', correct: 0, options: [
      { text: '~3.53 yuan per dollar, so the yuan is undervalued (a dollar buys more yuan than PPP predicts).', why: '12.5 ÷ 3.54 = 3.53 < 6.84.' },
      { text: '~6.84 yuan per dollar — PPP holds.', why: 'That’s the actual rate.' },
      { text: '~0.28 yuan per dollar.', why: 'Inverted.' },
      { text: 'The yuan is overvalued.', why: 'The dollar buys more yuan than PPP implies, so the yuan is undervalued.' },
    ] }),
    Q({ id: 'S03-q19', kind: 'apply', src: 'PEST Ex.2', stem: 'Which PEST row is complete under the Exhibit 2 worksheet?', correct: 3, options: [
      { text: '“Technology is changing.”', why: 'Vague; can’t be analyzed or falsified.' },
      { text: '“Interest rates are rising.”', why: 'An assertion with no mechanism or decision.' },
      { text: '“Lab-grown diamonds are popular.”', why: 'No then/now, mechanism, decision or falsifier.' },
      { text: '“Lab-grown share of US rings 12% (2019) → 61% (2025), strongly adverse, dissolves manufactured scarcity, governs whether to accelerate or restrain extraction, largely given, falsified if the natural-to-lab price ratio stops narrowing.”', why: 'The exhibit’s own completed row.' },
    ] }),
    Q({ id: 'S03-q20', kind: 'concept', src: 'S3 slides 77-87', stem: 'In Erin Meyer’s Culture Map, a culture that wants theory and context before conclusions is…', correct: 1, options: [
      { text: 'applications-first.', why: 'Applications-first starts with practical examples.' },
      { text: 'principles-first.', why: 'France, Italy, Germany, Russia are examples.' },
      { text: 'low-context.', why: 'Low/high context is about communication explicitness.' },
      { text: 'egalitarian.', why: 'That’s the leading scale.' },
    ] }),
    Q({ id: 'S03-q21', kind: 'case', src: 'PEST §2', stem: 'Nvidia designing downgraded chips after US export controls (Oct 2022) illustrates…', correct: 2, options: [
      { text: 'a socio-cultural shift.', why: 'It’s a government action.' },
      { text: 'an economic cycle.', why: 'Not cyclical.' },
      { text: 'a political factor redrawing an addressable market in a single announcement.', why: '§2’s political examples.' },
      { text: 'human capital constraints.', why: 'Not the mechanism.' },
    ] }),
  ],
  shorts: [
    { id: 'S03-sa1', session: 'S03', src: 'PEST §6', prompt: 'Explain the bargaining-power discipline using Debswana.', model: 'Macro factors set each party’s outside option, and the better outside option takes the larger share. In 1969 Botswana could only leave stones in the ground while De Beers could source elsewhere → 85/15. By the 1980s Botswana had revenue, reserves and capability and De Beers depended on its supply → 50/50, with no expropriation.', points: ['Outside option defined', '1969 vs. 1980s', 'No expropriation'] },
    { id: 'S03-sa2', session: 'S03', src: 'PEST §7', prompt: 'Give one “given” and one “shaped” environmental factor and explain the strategic difference.', model: 'Given: geology, demographics, the credit cycle — adapt. Shaped: a standard opened to become the environment (Tesla’s connector), or a counterparty’s reputation (Botswana) — strategy lives here, because rivals can adapt to the same conditions but can’t copy an environment built for someone else.', points: ['One of each', 'Why shaped factors matter more'] },
    { id: 'S03-sa3', session: 'S03', src: 'PEST §5', prompt: 'Summarize Botswana’s 2026 PEST in one sentence.', model: 'Political and economic quadrants have moved in Botswana’s favor while social and technological ones have moved against diamonds — a stronger claim on a shrinking asset.', points: ['P/E favorable', 'S/T adverse', 'Stronger claim on shrinking asset'] },
    { id: 'S03-sa4', session: 'S03', src: 'S3 slides 8', prompt: 'Define confiscation, expropriation and nationalization with an example each.', model: 'Confiscation: seizure without compensation (Mugabe’s farms). Expropriation: seizure with compensation (ExxonMobil and ConocoPhillips in Venezuela). Nationalization: seizure of an industry with or without compensation (Chavez’s cement 2008; Morales’s airports 2013).', points: ['Three definitions', 'Examples'] },
  ],
  written: {
    prompt: '**Timed (20 min).** **Aurum Copper** (fictional) is renegotiating its mining concession with the government of a fictional country that has just built a national mining institute and a sovereign fund, while global demand for copper is rising with EV adoption. Use PEST’s three disciplines to tell Aurum what to expect and how to respond.',
    minutes: 20,
    model: '**Answer:** Aurum should expect to concede a larger share and should offer it gradually in exchange for stability, because the government’s outside option has improved while Aurum’s has not. **Supports:** (1) Relevance: the decision is the concession terms; only factors that move outside options matter (capability, capital, demand). (2) Direction: the government’s capability (institute) and capital (fund) moved up; demand moved up, raising the asset’s value to both sides. (3) Bargaining: the government can now operate more itself → better outside option → larger split (the Debswana pattern). Shaped vs. given: Aurum can shape its own counterparty value (training, local processing). **Falsifier:** if the government can’t operate without Aurum, its leverage is overstated.',
    rubric: ['Names the decision', 'Uses direction (then vs. now)', 'Reads both sides’ outside options', 'Given vs. shaped', 'Falsifier'],
  },
  oral: { prompt: 'How did Khama change the PEST for De Beers? Defend it.', probes: ['Wasn’t the 1969 deal a bad deal for Botswana?', 'What exactly is an outside option here?', 'What did Botswana fail to see coming?', 'Should Botswana press hard now?'] },
  summary: {
    answer: 'Khama built Botswana’s environment — consolidating mineral rights before their value was known and establishing a credible, incorruptible state — turning a risky jurisdiction into De Beers’ most reliable partner and steadily raising Botswana’s outside option, so its share rose from 15% to 50% without expropriation.',
    numbers: [
      { label: 'Debswana (Botswana share)', value: '15% (1969) → 25% (1975) → 50% (1980s)', src: 'Botswana Ex.2' },
      { label: 'Lab-grown share of US engagement rings', value: '12% (2019) → 61% (2025)', src: 'PEST §2' },
      { label: '1966 starting point', value: '<20 km paved road; < a dozen graduates (case) / 12 km, 22 grads (slides)', src: 'Botswana; S3 slides 111' },
    ],
    frameworkBullets: ['Four domains; how fast each moves', 'Relevance: factor → mechanism → decision', 'Direction: two points in time', 'Bargaining power: outside options', 'Given vs. built', 'Tech = physical / information / human capital', 'Seven failure modes'],
    caseBullets: ['Consolidated rights before value known', 'Credibility built, not found', 'Outside options moved → 50/50', 'Today: stronger claim on a shrinking asset'],
  },
  crossLinks402: [{ topic: 'PEST risks from 10-K Item 1A flowing into the five forces', note: 'STRAT 402’s Industry Analysis module reads PEST risks from 10-K filings (Meta example).', href: '#/learn/S04' }],
}
