import { DataTable, HBar } from '../../components/Charts'
import { Cite } from '../../components/Cite'
import { GenericMap, ThreeTests } from '../../widgets/GenericMap'
import type { Mcq, ModuleDef } from '../types'

function Diagram() {
  return (
    <figure className="card p-3 space-y-2">
      <figcaption className="font-semibold">
        Two questions, four answers <Cite tag="Porter Fig.1" />
      </figcaption>
      <div className="grid grid-cols-[2rem_1fr_1fr] gap-1.5 text-sm">
        <div />
        <div className="text-center text-xs muted font-semibold">SOURCE: LOWER COST</div>
        <div className="text-center text-xs muted font-semibold">SOURCE: DIFFERENTIATION</div>
        <div className="grid place-items-center text-xs muted font-semibold" style={{ writingMode: 'vertical-rl' }}>BROAD</div>
        <div className="surface-2 rounded p-2"><strong>Cost leadership</strong><div className="text-xs">Lowest cost in the industry, whole market. Aldi · Ryanair · Walmart · Nucor · Vanguard</div></div>
        <div className="surface-2 rounded p-2"><strong>Differentiation</strong><div className="text-xs">Uniqueness customers pay for, whole market. Apple · Nvidia · Disney · Chipotle</div></div>
        <div className="grid place-items-center text-xs muted font-semibold" style={{ writingMode: 'vertical-rl' }}>NARROW</div>
        <div className="surface-2 rounded p-2"><strong>Cost focus</strong><div className="text-xs">Lowest cost within one segment. Aravind · Dollar General · Spirit · Grameen</div></div>
        <div className="surface-2 rounded p-2"><strong>Differentiation focus</strong><div className="text-xs">Uniqueness within one segment. Ferrari · In-N-Out · USAA · Patagonia</div></div>
      </div>
      <div className="grid gap-2 md:grid-cols-2 text-xs">
        <div className="card p-2"><strong>The wedge:</strong> value created = WTP − cost. Cost leadership pushes cost down faster than it deletes WTP; differentiation pulls WTP up faster than it adds cost <Cite tag="Porter Fig.2" />.</div>
        <div className="card p-2"><strong>The frontier:</strong> operational effectiveness moves you UP to the frontier; strategy is choosing WHERE on it to sit <Cite tag="Porter Fig.4" />.</div>
      </div>
    </figure>
  )
}

function Exhibits() {
  return (
    <div className="space-y-4">
      <DataTable
        caption={<>The revenue gap the fix was designed to close <Cite tag="Southwest Ex.2" /></>}
        head={['Revenue source', 'Industry practice (pre-2025)', 'Southwest (pre-2025)']}
        rows={[
          ['Checked bags', 'Fees at all major carriers; billions annually', 'Two free bags; est. $1B+/yr foregone'],
          ['Seat selection', 'Paid seat assignment', 'None — open seating'],
          ['Premium seating', 'Extra-legroom / premium economy (fastest-growing pool)', 'None — single cabin'],
          ['Basic economy', 'Segmented fares', 'One fare family'],
          ['Overnight utilization', 'Red-eyes spread fixed cost', 'No red-eyes'],
          ['International', 'Alliances and partnerships', 'No real presence'],
        ]}
      />
      <DataTable
        caption={<>The fix and early results (through Q1 2026) <Cite tag="Southwest Ex.3" /></>}
        head={['Initiative', 'Target', 'Early evidence']}
        rows={[
          ['Full plan', '~$4B cumulative incremental EBIT by 2027; $500M annual cost savings', '2026 guidance ≥ $4.00 adj. EPS vs. $0.93 in 2025'],
          ['Assigned + extra-legroom seating', '2–3 pts annual unit-revenue lift', '60% pay for seat products vs. 20% baseline; Q1 RASM guided +9.5%'],
          ['Bag fees (May 2025)', 'Fee revenue; steer to status/card', 'Fee revenue building'],
          ['Red-eyes, turns, partnerships', 'More flying from same fleet', 'Q4 2025 revenue +7.4% to $7.44B; operating income +41% to $391M'],
          ['Capital discipline', 'Flat management headcount cost', '$2.9B returned in 2025; stock +23% YTD vs. Delta +6%'],
        ]}
      />
      <HBar title="Passengers paying for seat products" rows={[{ label: 'Old model baseline', value: 20 }, { label: 'After assigned seating', value: 60 }]} unit="%" digits={0} max={100} highlight="After assigned seating" note={<>Southwest Ex.3</>} />
      <HBar
        title="The seven-to-one ceiling the case sits inside: airlines vs. the average"
        rows={[{ label: 'Airlines', value: 5.9 }, { label: 'All US industries', value: 14.9 }, { label: 'Soft drinks', value: 37.6 }]}
        unit="% ROIC"
        highlight="Airlines"
        note={<>Porter’s 1992–2006 data, from the Five Forces Brief — a reminder that airline structure is brutal for everyone <Cite tag="5F §1" /></>}
      />
    </div>
  )
}

const Q = (o: Omit<Mcq, 'session'>): Mcq => ({ ...o, session: 'S01' })

export const S01: ModuleDef = {
  id: 'S01',
  short: 'Generic Strategies · Southwest',
  framework: {
    oneLiner: 'There are only **two kinds of advantage** — lower cost or higher willingness to pay — and **two scopes** — broad or narrow. That gives four positions, and every real position requires **a sacrifice**: “a position that requires no such sacrifice is not a position; it is a wish” [[Porter §1]].',
    analogy: 'A restaurant can be the cheapest place in town or the one people drive across town for — and it can do either for everyone or for one crowd. Try to be the cheapest AND the fanciest for everyone and you end up the mediocre diner in the middle: too pricey for bargain hunters, too plain for special occasions [[Porter §6]].',
    intuition: [
      'Brand, service, technology, culture, scale — all are **means** to one of the two ends, not a third kind of advantage [[Porter §1]].',
      'Both strategies widen the same gap: value created = **WTP − cost**. Cost leadership works it from below; differentiation from above. Neither is allowed to ignore the other side: a cost leader must stay at **parity on what buyers care about**; a differentiator must stay at **cost proximity** [[Porter §2]].',
      'Cost leadership has room for **exactly one** firm — a shared cost advantage ends in a price war. Its most durable source is **structure** (business-model design), because rivals copying one element get nothing [[Porter §3]].',
      'Differentiation lives in buyers’ heads and can’t be audited; “spending customers cannot perceive is philanthropy toward suppliers” [[Porter §4]].',
      '**Focus** is not a third kind of advantage — it is one of the two, inside a narrow segment, beating broad rivals who are compromised by serving everyone [[Porter §5]].',
      'The danger is the **middle** — and firms drift there through individually reasonable decisions. The real enemy is **drift**, not a competitor [[Porter §6, §9]].',
      'The **hybrid objection** (Toyota, IKEA, Southwest…) is answered three ways: many hybrids are **operational effectiveness** (nearer a frontier everyone can reach); some are real **frontier shifts** that last a while; most are **one strategy with fortunate side effects**. The test: **what does this firm refuse to do?** [[Porter §7]]',
    ],
    howToRun: [
      '**1. Classify:** source of advantage (cost or WTP?) × scope (broad or narrow?). Place the firm on the 2×2 [[Porter §1]].',
      '**2. Check the other side of the wedge:** cost leader at parity on what buyers value? Differentiator at cost proximity? [[Porter §2, Ex.1]]',
      '**3. Price test:** is realized price deliberately above/below average, and can the firm explain why? [[Porter Ex.3]]',
      '**4. Trade-off test:** name three things rivals do that this firm refuses. A pause = no position [[Porter Ex.3]].',
      '**5. Consistency test:** do cost structure, hiring, metrics, incentives and capital allocation point the same way? [[Porter Ex.3]]',
      '**6. If it claims to be both:** is it operational effectiveness, a frontier shift, or one strategy with side effects? [[Porter §7]]',
      '**7. Predict how it fails:** use the failure list for its cell (imitation, tech reset, scale ceiling, cutting WTP; invisible spend, treadmill, over-serving, premium harvest; segment convergence, broadening, sub-segmenting) [[Porter §3-5]].',
    ],
    recall: [
      { id: 'S01-four', title: 'The two questions and four positions', prompt: 'Name the two questions, then the four positions.', items: [{ name: 'Source of advantage: lower cost or higher WTP' }, { name: 'Scope: broad market or narrow segment' }, { name: 'Cost leadership' }, { name: 'Differentiation' }, { name: 'Cost focus' }, { name: 'Differentiation focus' }], src: 'Porter §1, Fig.1' },
      { id: 'S01-tests', title: 'The three tests (in order)', prompt: 'Which strategy is a firm actually running?', items: [{ name: 'Price test', hint: 'deliberately above/below average, and explainable' }, { name: 'Trade-off test', hint: 'three things rivals do that you refuse' }, { name: 'Consistency test', hint: 'cost, hiring, metrics, incentives, capital point one way' }], src: 'Porter Ex.3' },
      { id: 'S01-hybrid', title: 'Resolving the hybrid objection', prompt: 'Three parts.', items: [{ name: 'Many hybrids are operational effectiveness misread as position' }, { name: 'Genuine dual advantage = a business-model innovation that shifts the frontier (real while it lasts)' }, { name: 'Most apparent hybrids are one strategy whose trade-offs happen to please customers' }], src: 'Porter §7' },
      { id: 'S01-costfail', title: 'How cost leadership fails', prompt: 'Four ways.', items: [{ name: 'Imitation' }, { name: 'Technological reset' }, { name: 'Scale ceiling' }, { name: 'Cutting into willingness to pay' }], src: 'Porter §3' },
      { id: 'S01-difffail', title: 'How differentiation fails', prompt: 'Four ways.', items: [{ name: 'Spending customers cannot perceive' }, { name: 'The treadmill' }, { name: 'Over-serving' }, { name: 'The premium harvest' }], src: 'Porter §4' },
      { id: 'S01-props', title: 'The three propositions', prompt: 'What the paper says to carry forward.', items: [{ name: 'Advantage comes in only two forms' }, { name: 'Scope is a genuine choice, not a description of size' }, { name: 'The enemy is drift, not a competitor' }], src: 'Porter §9' },
    ],
    diagram: Diagram,
    variants: [
      {
        title: 'Labels on the 2×2 and the value stick',
        brief: 'The paper labels the axes **lower cost vs. differentiation** and scope **broad vs. narrow**; the value stick’s bottom is **supplier opportunity cost** (Differentiation Brief) [[Porter Fig.1]] [[Diff Fig.1]].',
        slides: 'The S1 deck labels the source axis **Cost vs. Perceived Uniqueness**, scope as **breadth of competitive scope (within industry)**, the narrow cells **Focused Low Cost / Focused Differentiation**, and the stick’s bottom **Willingness to Sell** [[S1 slides 8-9]].',
        differ: 'Same framework, different words. “Perceived uniqueness” stresses that differentiation must be perceived by the buyer; “willingness to sell” and “supplier opportunity cost” both mean the lowest price a supplier would accept.',
        guess: '**Guess:** the slide labels come from an older version of the deck (Porter’s original 1980s wording); the white paper was written later in the course’s newer vocabulary. Either wording is fine on the exam — know they mean the same thing.',
      },
    ],
    newScenarios: [
      { prompt: '**Northline Fitness** (fictional) charges $10/month, has no classes, no towels, no personal trainers, and opens only 24/7 self-serve gyms in suburbs. Where does it sit, and what does it refuse?', answer: 'Cost leadership (if national) or cost focus (if it deliberately serves one price-first segment). It passes the trade-off test: it refuses classes, towels and trainers. Watch the parity requirement — clean, working machines are what its buyers still care about [[Porter §2-3]].' },
      { prompt: '**Brightway Bank** (fictional) says its strategy is “premium service for everyone at the lowest fees,” but pays branch managers on cost per transaction. Diagnose it.', answer: 'It fails the consistency test — “a differentiator whose store managers are compensated on labor cost per transaction is running one strategy on the slide and another on the floor” — and likely the trade-off test (refuses nothing). It’s drifting toward the middle [[Porter §8, Ex.3]].' },
      { prompt: '**Summit Coffee** (fictional), a 40-store specialty roaster loved in one region, plans to go national and add breakfast sandwiches and a value menu to fund growth. What failure is it risking?', answer: 'Differentiation focus’s most common death: growth pressure forces broadening and the firm becomes a mediocre broad player. Also checks: the value menu undercuts the premium (price test) [[Porter §5]].' },
    ],
  },
  argument: {
    intro: 'Porter’s claim is deliberately austere: advantage comes in two forms, scope is a choice, and a position is defined by what you give up. The paper defends that against the strongest objection — firms that seem to be both.',
    propositions: [
      '**Only two kinds of advantage:** lower cost or higher WTP; everything else is a means [[Porter §1]].',
      '**A position requires sacrifice** — “a position that requires no such sacrifice is not a position; it is a wish” [[Porter §1]].',
      '**Neither side of the wedge can be ignored** — parity for cost leaders, proximity for differentiators [[Porter §2]].',
      '**Structure is the most durable cost source;** copying one element gets you nothing [[Porter §3]].',
      '**Focus is not a third advantage** — it’s cost or differentiation in a narrow segment [[Porter §5]].',
      '**Firms drift into the middle;** airlines-within-airlines (Song, Ted) were *built* there and failed [[Porter §6]].',
      '**Operational effectiveness is not strategy** — moving toward the frontier is necessary and imitable; strategy is choosing where on it to sit [[Porter §7, Fig.4]].',
      '**“What does this firm refuse to do?”** is the practical test for any hybrid claim [[Porter §7]].',
    ],
  },
  case: {
    protagonist: 'CEO Bob Jordan and COO Andrew Watterson, after Elliott’s $1.9B (~11%) activist stake forced a strategic overhaul [[Southwest]].',
    decision: 'Southwest has added assigned and extra-legroom seating, bag fees, basic economy, red-eyes and partnerships. Can it move toward differentiation-style revenue without destroying the low-cost advantage that produced 47 straight profitable years? [[Southwest]] [[Canvas S1]]',
    timeline: [
      { when: '1971', what: 'First flights (Dallas–Houston–San Antonio); open seating from day one [[Southwest Ex.1]]' },
      { when: '1973–2019', what: '47 consecutive profitable years' },
      { when: '2008', what: 'Rivals add bag fees; Southwest trademarks “Bags Fly Free”' },
      { when: 'Dec 2022', what: 'Winter meltdown: 16,000+ cancellations, $1B+ cost, $140M settlement' },
      { when: 'Jun 2024', what: 'Elliott discloses ~11% stake; demands overhaul' },
      { when: 'Sep 2024', what: '“Southwest. Even Better.”: ~$4B incremental EBIT by 2027; $500M cost savings' },
      { when: 'May 2025', what: 'Bags Fly Free ends for most; basic economy introduced' },
      { when: 'Jan 27, 2026', what: 'Assigned seating and extra-legroom cabin fleetwide' },
      { when: 'Feb 2026', what: 'Stock +23% YTD; 2026 guidance ≥ $4.00 adjusted EPS' },
    ],
    exhibits: Exhibits,
  },
  tool: {
    title: 'Generic strategy map + the three tests',
    intro: 'First place real firms from the course on Porter’s 2×2 and check against where the materials put them. Then run the three tests on Southwest before and after the fix.',
    render: () => (
      <div className="space-y-8">
        <GenericMap />
        <section className="space-y-2">
          <h3 className="text-lg font-semibold">The three tests: Southwest, then and now</h3>
          <ThreeTests
            firms={[
              {
                id: 'swold',
                name: 'Southwest before 2025',
                model: {
                  price: 'Below average, deliberately — low fares grew the market; Southwest “competed with the automobile.” Explainable by its cost structure [[Southwest]].',
                  tradeoff: 'Passes easily: one aircraft type, no assigned seats, no meals, no first class, no interlining/global booking, no bag or change fees, point-to-point not hub-and-spoke [[Southwest]] [[Porter §7]].',
                  consistency: 'Passes: simplicity in fleet, routes, turns and culture all served low cost; Herb Kelleher’s irreverent, frugal culture reinforced it [[Southwest]].',
                },
              },
              {
                id: 'swnew',
                name: 'Southwest in 2026',
                model: {
                  price: 'Now a spread: basic economy at the bottom, extra-legroom at a premium; 60% pay for seat products. Is the average deliberately above or below rivals? The case doesn’t say — a warning sign if management can’t either [[Southwest Ex.3]].',
                  tradeoff: 'Weaker: it now does most of what rivals do (assigned seats, premium seats, bag fees, basic economy, red-eyes, partnerships). Remaining refusals: two free carry-ons, no change fees, no wide-body long-haul [[Southwest]].',
                  consistency: 'Mixed: the fix adds complexity (seat maps, cabin retrofits, fare families) to a system designed for simplicity, while cutting 1,750 corporate jobs. The case’s open questions — reliability, holding costs flat while adding complexity, keeping customers who chose it for being different — are consistency questions [[Southwest]].',
                },
              },
            ]}
          />
        </section>
      </div>
    ),
  },
  coldCalls: [
    { id: 'c1', level: 'Facts', q: 'What made Southwest’s cost advantage? Give me the activity choices.', model: 'One aircraft type (737) for maintenance and training, point-to-point routes, fast gate turns, no meals, no first class, open seating, no interlining or global booking system — simplicity kept costs low, low costs kept fares low, and low fares grew the market [[Southwest]].', weak: 'They were just really efficient and had a great culture.', whyWeak: '“Efficient” is operational-effectiveness language; the answer needs the specific trade-offs that make it a position.' },
    { id: 'c2', level: 'Facts', q: 'What problem was the fix designed to solve — cost or revenue?', model: '**Revenue.** The case is titled “Fixing the Revenue Problem”: Southwest gave away what rivals charged for — free bags (est. $1B+/yr foregone), no seat selection, no premium seating, no basic economy, no red-eyes, little international [[Southwest Ex.2]]. Cost had also narrowed (labor contracts, Boeing delays, the 2022 meltdown) [[Southwest]].', weak: 'Costs were too high.', whyWeak: 'Misses the case’s framing and the revenue gap exhibit.' },
    { id: 'c3', level: 'Analysis', q: 'Porter says Southwest is a cost leader, not a hybrid. Make his argument.', model: 'Its choices were made **for cost**, and several happen to produce things customers like (simplicity, friendliness, no bag fees). “That is not two strategies. It is one strategy with a fortunate side effect, and the proof is that Southwest said no to the things a full-service carrier says yes to” [[Porter §7]].', weak: 'Because it was cheap.', whyWeak: 'Doesn’t engage the hybrid objection or the trade-off proof.' },
    { id: 'c4', level: 'Analysis', q: 'Is assigned seating differentiation?', model: 'Not by the paper’s definition. Differentiation means being **unique** on dimensions buyers value and charging a premium above the cost of the uniqueness [[Porter §4]]. Assigned and premium seats are what every network carrier already sells — closing a gap to **industry practice** [[Southwest Ex.2]]. It’s monetization (and arguably operational/revenue effectiveness), not a unique position.', weak: 'Yes, because customers pay more for it.', whyWeak: 'Paying for a feature everyone offers isn’t uniqueness; confuses a price increase with a differentiated position.' },
    { id: 'c5', level: 'Analysis', q: 'Which of the three tests does the new Southwest most risk failing?', model: '**Consistency.** A system designed for simplicity now carries seat maps, cabin retrofits at 50–100 aircraft a month, fare families, red-eyes and partnerships. The case’s own questions — can it hold reliability and costs flat while adding complexity — are consistency questions [[Southwest]] [[Porter Ex.3]].', weak: 'Price test, because prices went up.', whyWeak: 'A higher realized price is fine if deliberate and explained; the bigger risk is internal contradiction.' },
    { id: 'c6', level: 'Analysis', q: 'What does airline history say about running two strategies in one company?', model: 'Continental Lite, MetroJet, Song and Ted — low-cost carriers launched inside full-service airlines — all failed because the parent’s cost structure, union agreements, hub-and-spoke routing and service commitments came along. They were **built** in the middle; it’s the best evidence trade-offs are real constraints [[Porter §6]].', weak: 'It usually works if you execute well.', whyWeak: 'Contradicts the paper’s evidence; “execute well” is the failure-of-nerve view Porter rejects.' },
    { id: 'c7', level: 'Judgment', q: 'The early results are great — EPS guidance up 4x, seat products at 60%. Doesn’t that settle it?', model: 'No. Those numbers measure **revenue**; the Key Question is about the **cost** side. Watch unit costs, turn times and on-time performance. Porter’s JCPenney and premium-harvest warnings: a move can look excellent for a few years before the position erodes [[Porter §4, §6]] [[Southwest Ex.3]].', weak: 'Yes, the numbers prove it worked.', whyWeak: 'Measures the wrong side of the wedge over too short a period.' },
    { id: 'c8', level: 'Judgment', q: 'Is Southwest stuck in the middle now?', model: 'Not yet, but drifting. It still has a cost structure below network carriers and refuses some things (change fees, a second carry-on charge, wide-body long-haul). The paper’s warning is drift through individually reasonable decisions — each fix is sensible, the sum could leave it with no cost advantage against Spirit/Ryanair-style carriers and no premium against Delta [[Porter §6, §9]].', weak: 'Yes, definitely.', whyWeak: 'Overclaims; the honest answer weighs evidence on both sides and names what to watch.' },
    { id: 'c9', level: 'Action', q: 'You’re Bob Jordan. What do you refuse to do next?', model: 'Name three refusals that protect the cost system: (1) no hub-and-spoke restructuring, (2) no wide-body or long-haul fleet — keep the single 737 family, (3) keep no change fees and two free carry-ons as the visible “still different” promise. Grow international through partners, not aircraft [[Southwest]] [[Porter §7]].', weak: 'Keep adding whatever customers will pay for.', whyWeak: 'A strategy that refuses nothing isn’t a position.' },
    { id: 'c10', level: 'Action', q: 'Answer the Key Question in one sentence.', model: 'Southwest can add revenue the market already pays for, but only while it refuses the moves that would import full-service costs — so it should monetize seats and bags without leaving the single-fleet, point-to-point system that its cost advantage rests on.', weak: 'It depends on execution.', whyWeak: 'Not declarative or falsifiable (Minto); dodges the trade-off.' },
  ],
  devil: {
    argument: 'Porter is outdated. Delta and United earn record profits on premium cabins and credit cards, Southwest’s pure low-cost model made it an underperformer with an activist in the boardroom, and the early numbers prove customers will pay. Refusing to move would have been choosing decline.',
    response: 'Concede the revenue gap was real and closing it was necessary. But (1) adding what every rival already sells is closing a gap to industry practice, not building a unique position — it raises revenue without creating a defensible premium [[Southwest Ex.2]] [[Porter §4]]. (2) The risk is on the cost side the counterargument doesn’t measure; airlines-within-airlines show complexity imports cost [[Porter §6]]. (3) Porter’s test isn’t “never change,” it’s “know what you refuse.” The strongest version of the fix keeps the refusals that protect the cost system.',
    probes: ['If customers pay for seats at Delta, why can’t Southwest capture the same premium?', 'What number would tell you the cost advantage is eroding?', 'Name the moment Southwest would become stuck in the middle.'],
  },
  pyramid: {
    prompt: 'The board asks: **Can Southwest move to differentiation without destroying its low-cost advantage?** Build the SCQA and a pyramid. Hint: a deductive spine works — the major premise is about what makes a cost position durable.',
    model: {
      structure: 'combined',
      s: 'Southwest built 47 straight profitable years as a cost leader on a simple system: one aircraft type, point-to-point routes, fast turns, open seating, free bags [[Southwest]].',
      c: 'Post-pandemic its margins shrank while Delta and United profited from premium cabins and fees; Elliott took ~11% and management launched assigned and premium seating, bag fees, basic economy and red-eyes [[Southwest]].',
      q: 'Can Southwest add these revenue products without destroying its low-cost advantage?',
      a: 'Yes, but only if it monetizes within its existing system — because its cost advantage lives in the single-fleet, point-to-point, fast-turn structure, not in giving things away.',
      supports: [
        { label: 'Major premise', point: 'A cost position is durable when it comes from structure — a system of choices — and destroyed when additions import the costs the system deleted [[Porter §3, §6]].', evidence: ['Airlines-within-airlines failed when parent costs came along', 'Structure is hardest to copy'] },
        { label: 'Minor premise', point: 'Seat fees, bag fees and basic economy are pricing changes that ride on the same fleet, routes and turns; hub-and-spoke, wide-bodies or full service would import cost [[Southwest]].', evidence: ['60% pay for seat products vs. 20%', 'Red-eyes spread fixed cost over more seats', 'Retrofits at 50–100 aircraft/month add complexity'] },
        { label: 'Therefore', point: 'Southwest should keep the revenue moves and refuse the structural ones — single 737 fleet, point-to-point, partners not aircraft for international.', evidence: ['Watch unit cost, turn time, on-time performance as falsifiers'] },
      ],
      competing: '“Go fully premium like Delta.” It fails on its own terms: Southwest lacks the hubs, international network and premium cabin base that make Delta’s premium work, and building them would import exactly the costs that sank Song and Ted [[Porter §6]].',
      memo: 'Deductive spine because the decision turns on one causal claim (where the cost advantage lives); each premise needs case evidence; the alternative is beaten on its own terms.',
    },
  },
  checkIds: ['S01-q01', 'S01-q03', 'S01-q05', 'S01-q07', 'S01-q09', 'S01-q11', 'S01-q13', 'S01-q15', 'S01-q18', 'S01-q21'],
  bank: [
    Q({ id: 'S01-q01', kind: 'concept', src: 'Porter §1', stem: 'According to the Porter paper, how many kinds of competitive advantage are there?', correct: 2, options: [
      { text: 'Four — one for each cell of the 2×2.', why: 'The 2×2 has four POSITIONS, produced by two kinds of advantage × two scopes.' },
      { text: 'Three — cost, differentiation and focus.', why: 'The 1980 formulation had three strategies, but focus is not a third kind of advantage.' },
      { text: 'Two — lower cost or higher willingness to pay; everything else is a means to one of them.', why: 'The paper’s “deliberately austere” claim.' },
      { text: 'Unlimited — brand, scale, technology and culture are each separate advantages.', why: 'The paper says these are means to one of the two ends, not alternatives.' },
    ] }),
    Q({ id: 'S01-q02', kind: 'concept', src: 'Porter §5', stem: 'Which statement about focus is correct?', correct: 0, options: [
      { text: 'Focus is cost leadership or differentiation pursued inside a deliberately narrow segment.', why: 'Direct from §5.' },
      { text: 'Focus is a third kind of advantage alongside cost and differentiation.', why: 'Explicitly rejected by the paper.' },
      { text: 'Focus means being small.', why: 'Scope is a choice, not a description of current size (Proposition 2).' },
      { text: 'Focus firms win because they have more resources than broad rivals.', why: 'They win because broad rivals are compromised by serving everybody.' },
    ] }),
    Q({ id: 'S01-q03', kind: 'apply', src: 'Porter Ex.3', stem: '**Larkspur Hotels** (fictional) says it is a premium brand, but its general managers’ bonuses depend entirely on labor cost per occupied room. Which test does it fail?', correct: 3, options: [
      { text: 'The price test.', why: 'Nothing here concerns whether realized price is deliberately above average.' },
      { text: 'The trade-off test.', why: 'Possibly, but the stated facts are about incentives.' },
      { text: 'None — incentives are separate from strategy.', why: 'The paper says the consistency test is exactly what connects strategy to organization.' },
      { text: 'The consistency test — “running one strategy on the slide and another on the floor.”', why: 'Exhibit 3’s failing example is nearly identical (premium strategy, managers paid on labor cost per transaction).' },
    ] }),
    Q({ id: 'S01-q04', kind: 'concept', src: 'Porter §3', stem: 'Why does Porter say there is room for exactly ONE cost leader?', correct: 1, options: [
      { text: 'Because antitrust law prohibits two.', why: 'No legal argument is made.' },
      { text: 'Because a cost advantage several firms share is not an advantage and typically ends in a price war that transfers the benefit to customers.', why: 'The paper’s reasoning (§3).' },
      { text: 'Because only one firm can reach minimum efficient scale.', why: 'MES is a scale concept from S8, not the paper’s reason.' },
      { text: 'Because customers only remember one low-price brand.', why: 'Not the paper’s argument.' },
    ] }),
    Q({ id: 'S01-q05', kind: 'concept', src: 'Porter §7', stem: 'In Porter’s productivity frontier picture, what is operational effectiveness?', correct: 2, options: [
      { text: 'Choosing where on the frontier to sit.', why: 'That is strategy.' },
      { text: 'Shifting the frontier outward with a new business model.', why: 'That’s a genuine frontier shift, part 2 of the resolution.' },
      { text: 'Moving toward the frontier through quality programs, lean operations and better systems — necessary, imitable, not strategy.', why: '§7: “moving toward it… is operational effectiveness, not strategy.”' },
      { text: 'Being stuck in the middle.', why: 'Different concept; OE can happen in any position.' },
    ] }),
    Q({ id: 'S01-q06', kind: 'apply', src: 'Porter §7', stem: '**Quill Office Supply** (fictional) adopts lean warehousing that cuts costs 8% and raises on-time delivery. Within two years, every major rival has done the same. What happened?', correct: 0, options: [
      { text: 'Operational effectiveness: everyone’s absolute performance rose while nobody’s relative position changed.', why: 'Exactly the frontier logic: best practice diffuses.' },
      { text: 'Quill achieved a sustainable dual advantage.', why: 'It was imitated within two years — not sustained.' },
      { text: 'Quill shifted the frontier permanently.', why: 'The frontier shifted for everyone once the practice diffused.' },
      { text: 'Quill became a differentiation focuser.', why: 'Nothing about scope or uniqueness changed.' },
    ] }),
    Q({ id: 'S01-q07', kind: 'case', src: 'Porter §7', stem: 'How does the Porter paper classify (pre-fix) Southwest?', correct: 1, options: [
      { text: 'As a genuine hybrid that disproves Porter.', why: 'The paper argues the opposite.' },
      { text: 'As a cost leader whose cost-driven choices happen to please customers — one strategy with a fortunate side effect.', why: '§7: “Southwest is a cost leader.”' },
      { text: 'As stuck in the middle.', why: 'It held the lowest cost structure and high customer affection for decades.' },
      { text: 'As a differentiation focuser.', why: 'It served a broad market on cost.' },
    ] }),
    Q({ id: 'S01-q08', kind: 'concept', src: 'Porter §7', stem: 'What does Porter offer as the practical test of any “we’re both” claim?', correct: 3, options: [
      { text: '“Is the firm more profitable than average?”', why: 'Profitability doesn’t reveal position.' },
      { text: '“Does the firm have a strong brand?”', why: 'Brand is a means, not a test of position.' },
      { text: '“Can the firm be both?”', why: '“The question is never ‘can a firm be both?’”' },
      { text: '“What does this firm refuse to do?”', why: 'A firm naming three refusals has a position.' },
    ] }),
    Q({ id: 'S01-q09', kind: 'concept', src: 'Porter §2', stem: 'A cost leader must still hold ________; a differentiator must still hold ________.', correct: 0, options: [
      { text: 'parity/proximity on attributes buyers care about; cost proximity', why: '§2 and Exhibit 1’s “must hold parity on” row (the row students most often omit).' },
      { text: 'the largest market share; the highest price', why: 'Neither is required.' },
      { text: 'patents; low prices', why: 'Not the paper’s requirements.' },
      { text: 'focus; scale', why: 'Mixes up concepts.' },
    ] }),
    Q({ id: 'S01-q10', kind: 'apply', src: 'Porter §3', stem: '**ValueAir** (fictional) removed seat pitch, carry-on bags and drinks to cut cost 12%; load factors then collapsed because travelers found the product unusable. Which cost-leadership failure is this?', correct: 2, options: [
      { text: 'Imitation.', why: 'No rival copied anything.' },
      { text: 'Technological reset.', why: 'No new process rebased the cost curve.' },
      { text: 'Cutting into willingness to pay — removing something customers were actually buying.', why: 'The paper’s “most insidious” failure.' },
      { text: 'Scale ceiling.', why: 'Demand fell because of the product, not a volume limit.' },
    ] }),
    Q({ id: 'S01-q11', kind: 'apply', src: 'Porter §4', stem: '**Lumen Skincare** (fictional) quietly switches to cheaper ingredients customers can’t detect, keeps its premium price, and posts three record years before sales slide sharply. Which failure is this?', correct: 1, options: [
      { text: 'Over-serving.', why: 'Over-serving adds features nobody wanted.' },
      { text: 'The premium harvest.', why: '“Quietly trims the invisible spending, keeps the price, and enjoys several excellent years before the position erodes.”' },
      { text: 'The treadmill.', why: 'The treadmill is having to keep spending each product cycle.' },
      { text: 'Imitation.', why: 'No rival copying is described.' },
    ] }),
    Q({ id: 'S01-q12', kind: 'concept', src: 'Porter §5', stem: 'What is the MOST common way a focus strategy dies, according to the paper?', correct: 3, options: [
      { text: 'The segment converges with the broad market.', why: 'A failure mode, but not the most common.' },
      { text: 'A broad player sub-segments into the niche.', why: 'A failure mode, but not the most common.' },
      { text: 'A technological reset.', why: 'That’s a cost-leadership failure.' },
      { text: 'Growth pressure forces broadening and the firm becomes a mediocre broad player.', why: '“This is the most common death.”' },
    ] }),
    Q({ id: 'S01-q13', kind: 'case', src: 'Southwest Ex.2', stem: 'Which item from the Southwest case is BEST described as closing a gap to industry practice rather than creating a unique position?', correct: 0, options: [
      { text: 'Charging for checked bags and selling seat assignments.', why: 'Exhibit 2 lists these as what every major carrier already did.' },
      { text: 'Keeping two free carry-ons and no change fees.', why: 'Those are remaining points of difference.' },
      { text: 'Flying a single aircraft type.', why: 'That’s a structural cost choice.' },
      { text: 'Point-to-point routing.', why: 'A structural cost choice that rivals don’t share.' },
    ] }),
    Q({ id: 'S01-q14', kind: 'case', src: 'Porter §6', stem: 'Song, Ted, MetroJet and Continental Lite are evidence that…', correct: 2, options: [
      { text: 'low-cost carriers can’t make money.', why: 'Southwest and Ryanair did for decades.' },
      { text: 'full-service carriers should exit.', why: 'Not the lesson.' },
      { text: 'trade-offs are real constraints — the parent’s costs, unions, hubs and service commitments came along, building the new brands in the middle.', why: '§6: “They were built there.”' },
      { text: 'brand names determine success.', why: 'Each had capital, aircraft and gates; brand wasn’t the problem.' },
    ] }),
    Q({ id: 'S01-q15', kind: 'concept', src: 'Porter §9', stem: 'Which is one of the paper’s three propositions?', correct: 1, options: [
      { text: 'The biggest threat is a new entrant.', why: 'The paper says the enemy is almost never a competitor.' },
      { text: 'The enemy is drift — individually defensible decisions that add capability without adding position.', why: 'Proposition 3.' },
      { text: 'Scope should match current size.', why: 'Proposition 2 says the opposite: scope is a choice, not a description of size.' },
      { text: 'Hybrids are impossible.', why: 'The paper allows genuine frontier shifts.' },
    ] }),
    Q({ id: 'S01-q16', kind: 'case', src: 'Porter §6', stem: 'JCPenney’s 2012 shift to everyday fair pricing lost ~a quarter of revenue in a year. What does the Porter paper say it demonstrates?', correct: 3, options: [
      { text: 'That differentiation never works in department stores.', why: 'Too broad.' },
      { text: 'That coupons are a source of advantage.', why: 'Not the paper’s point.' },
      { text: 'That cost leadership fails through imitation.', why: 'Wrong failure mode.' },
      { text: 'That even a coherent destination is unreachable if the transition abandons the existing position before the new one is credible.', why: 'Direct from §6.' },
    ] }),
    Q({ id: 'S01-q17', kind: 'concept', src: 'Porter §4', stem: 'Why is a credible proxy (seal, brand, visible process, warranty) often worth more than the underlying quality?', correct: 0, options: [
      { text: 'Because differentiation lives in buyers’ heads; spending customers cannot perceive earns nothing, so making invisible spending legible is where the premium is captured.', why: '§4’s visibility point.' },
      { text: 'Because proxies are cheaper than quality.', why: 'Cost isn’t the argument.' },
      { text: 'Because regulators require them.', why: 'Not discussed.' },
      { text: 'Because proxies create switching costs.', why: 'Not the mechanism given.' },
    ] }),
    Q({ id: 'S01-q18', kind: 'apply', src: 'Porter §7', stem: '**Kestrel Motors** (fictional) introduces a production system that cuts defects and costs at once; rivals take 15 years to match it. In Porter’s resolution of the hybrid objection, this is…', correct: 2, options: [
      { text: 'operational effectiveness misread as position.', why: 'Possible in general, but 15 years of unmatched advantage points to a frontier shift.' },
      { text: 'proof that stuck-in-the-middle is false.', why: 'The paper doesn’t conclude that.' },
      { text: 'a genuine dual advantage from a business-model innovation that shifts the frontier — real while it lasts (the Toyota pattern).', why: 'Part 2 of the resolution.' },
      { text: 'a focus strategy.', why: 'Scope isn’t described as narrow.' },
    ] }),
    Q({ id: 'S01-q19', kind: 'concept', src: 'Porter Ex.2', stem: 'What is the purpose of Exhibit 2 (all four positions in one industry)?', correct: 1, options: [
      { text: 'To show that only cost leaders are profitable.', why: 'Opposite.' },
      { text: 'To show all four positions are usually available at once, and profitability tracks the coherence of a position more than which one was chosen.', why: 'The exhibit’s source note.' },
      { text: 'To rank industries by attractiveness.', why: 'That’s Five Forces.' },
      { text: 'To prove focus strategies dominate.', why: 'Not claimed.' },
    ] }),
    Q({ id: 'S01-q20', kind: 'case', src: 'Southwest Ex.3', stem: 'Which early-results number is the strongest evidence customers will pay for the new seat products?', correct: 3, options: [
      { text: 'The stock rose 23% year to date.', why: 'Investors’ view, not customer behavior.' },
      { text: '$2.9B returned to shareholders.', why: 'Capital allocation, unrelated to WTP.' },
      { text: 'Management cut 1,750 corporate jobs.', why: 'A cost measure.' },
      { text: '60% of passengers pay for seat products, vs. a 20% baseline.', why: 'Direct customer purchase behavior.' },
    ] }),
    Q({ id: 'S01-q21', kind: 'concept', src: 'Porter §3', stem: 'Which is the MOST durable source of a cost position, according to the paper?', correct: 0, options: [
      { text: 'Structure — the design of the business model, a system of choices rivals can’t copy piecemeal.', why: '“Structure is where the most durable cost positions come from.”' },
      { text: 'Scale.', why: 'A source, but not the most durable; it can be matched.' },
      { text: 'A cost-cutting program.', why: 'The paper contrasts systems of choices with cost-cutting programs.' },
      { text: 'Advertising.', why: 'Unrelated.' },
    ] }),
    Q({ id: 'S01-q22', kind: 'apply', src: 'Porter §4', stem: '**ProSnap** (fictional) adds a 14th camera mode and 200-megapixel sensor nobody asked for; a cheaper rival with “good enough” cameras takes its mass-market share. Which differentiation failure?', correct: 2, options: [
      { text: 'The premium harvest.', why: 'ProSnap added, not trimmed, spending.' },
      { text: 'Invisible spending.', why: 'The features are visible; they just exceed what buyers want.' },
      { text: 'Over-serving — exceeding what anybody wanted and opening the door to an attacker from below.', why: '“The fourth blade and the eleventh megapixel.”' },
      { text: 'Imitation.', why: 'The rival didn’t copy; it undercut.' },
    ] }),
  ],
  shorts: [
    { id: 'S01-sa1', session: 'S01', src: 'Porter §7', prompt: 'Explain the difference between operational effectiveness and strategy in two sentences.', model: 'Operational effectiveness is moving toward the productivity frontier with best practice — necessary but imitable, so absolute performance rises while relative position doesn’t. Strategy is choosing where on the frontier to sit, which always involves giving something up.', points: ['OE = toward the frontier, imitable', 'Strategy = position on the frontier', 'Requires trade-offs'] },
    { id: 'S01-sa2', session: 'S01', src: 'Porter Ex.3', prompt: 'Name the three tests and what a failing answer sounds like for each.', model: 'Price: “we’re competitively priced” (a description of the market, not a decision). Trade-off: a pause, or things you’d like to do but haven’t funded. Consistency: “our strategy is premium and our managers are paid on labor cost per transaction.”', points: ['All three named in order', 'A failing example for each'] },
    { id: 'S01-sa3', session: 'S01', src: 'Porter §6', prompt: 'How do firms end up stuck in the middle?', model: 'They rarely choose it; they drift there through a sequence of individually reasonable decisions that add capability without adding position (Sears, JCPenney), or are built there by carrying two strategies in one company (Song, Ted).', points: ['Drift through reasonable decisions', 'An example'] },
    { id: 'S01-sa4', session: 'S01', src: 'Porter §2', prompt: 'Why can’t a cost leader ignore willingness to pay?', model: 'Because value created is WTP minus cost; a cost leader must stay at parity or proximity on the attributes buyers care about — “a cheap product nobody wants is not a strategy but a liquidation.”', points: ['Wedge logic', 'Parity requirement'] },
  ],
  written: {
    prompt: '**Timed (20 min).** A fictional discount retailer, **Thrift Lane**, plans to add a premium private-label line, in-store cafés and a loyalty app “to become both the cheapest and the nicest.” Use Porter’s framework to advise the board.',
    minutes: 20,
    model: '**Answer:** Thrift Lane should reject the plan as framed and keep its cost position, adding only moves that ride on the existing system, because a position requires trade-offs and “both” without a frontier shift is drift. **Supports:** (1) Classify: it is a cost leader/cost focuser; its value comes from deleting cost faster than WTP. (2) Trade-off and consistency tests: cafés and premium lines add cost and complexity that contradict lean, standardized operations — the airlines-within-airlines lesson. (3) Hybrid test: unless the plan shifts the frontier, it is operational effectiveness or drift; “what will you refuse?” has no answer. **Competing view:** Trader Joe’s-style hybrids exist — but they are one strategy whose trade-offs please customers, not cost leaders that bolt on premium services.',
    rubric: ['Places the firm on the 2×2 with reasons', 'Applies trade-off and consistency tests', 'Uses the hybrid resolution correctly', 'Names a failure mode', 'Clear SCQA + recommendation'],
  },
  oral: { prompt: 'Is Southwest still a cost leader after the fix? Defend your answer.', probes: ['What would Porter say about assigned seating?', 'Which test does it now fail, if any?', 'Isn’t this just what customers want?', 'What would make you change your mind?'] },
  summary: {
    answer: 'Yes — conditionally. Southwest can add revenue products rivals already sell, but its low-cost advantage lives in a structural system (one fleet, point-to-point, fast turns); it survives only if Southwest refuses the moves that would import full-service costs.',
    numbers: [
      { label: 'Consecutive profitable years', value: '47 (1973–2019)', src: 'Southwest Ex.1' },
      { label: 'Free bags foregone', value: '$1B+ per year (est.)', src: 'Southwest Ex.2' },
      { label: 'Plan', value: '~$4B incremental EBIT by 2027; $500M cost savings', src: 'Southwest Ex.3' },
      { label: 'Seat-product take rate', value: '60% vs. 20% baseline', src: 'Southwest Ex.3' },
      { label: 'EPS', value: '$0.93 (2025) → ≥ $4.00 guided (2026)', src: 'Southwest Ex.3' },
      { label: 'Airline ROIC vs. average', value: '5.9% vs. 14.9%', src: '5F §1' },
    ],
    frameworkBullets: ['Two advantages × two scopes = four positions; focus is not a third advantage', 'Parity (cost leaders) and proximity (differentiators)', 'Stuck in the middle via drift', 'OE ≠ strategy; hybrid resolution in three parts', 'Three tests: price → trade-off → consistency'],
    caseBullets: ['Old Southwest = cost leader with fortunate side effects', 'Fix = monetization of industry-standard products', 'Risk = consistency/complexity on the cost side', 'Answer = keep the structural refusals'],
  },
  crossLinks402: [{ topic: 'Cost vs. differentiation advantage, WTP and consumer surplus', note: 'STRAT 402 quantifies willingness to pay with demand curves and consumer surplus.', href: '#/learn/S07' }],
}
