import { DataTable, HBar } from '../../components/Charts'
import { Cite } from '../../components/Cite'
import { LearningCalc } from '../../widgets/LearningCalc'
import { ScaleCurve } from '../../widgets/ScaleCurve'
import type { Mcq, ModuleDef } from '../types'

function Diagram() {
  return (
    <figure className="card p-3 space-y-2">
      <figcaption className="font-semibold">
        Scale is about a RATE. Learning is about a HISTORY. Experience bundles both <Cite tag="Scale Ex.1-2" />
      </figcaption>
      <div className="scroll-x">
        <table className="data-table w-full min-w-[520px]">
          <thead>
            <tr><th scope="col"></th><th scope="col">Scale</th><th scope="col">Learning</th><th scope="col">Experience</th></tr>
          </thead>
          <tbody>
            <tr><th scope="row">Cost falls with…</th><td>Output per period</td><td>Cumulative output</td><td>Cumulative output</td></tr>
            <tr><th scope="row">Which costs?</th><td>Whatever the fixed asset / indivisible input touches</td><td>Direct labor (Wright)</td><td>All costs “of every kind,” constant dollars</td></tr>
            <tr><th scope="row">Origin</th><td>Classical; Chamberlin 1948</td><td>T. P. Wright 1936</td><td>Henderson / BCG 1966</td></tr>
            <tr><th scope="row">Typical magnitude</th><td>~24% per doubling of plant capacity (geometry)</td><td>80% airframe-labor curve; wide range</td><td>20–30% per doubling</td></tr>
            <tr><th scope="row">Reversible?</th><td><strong>Yes — cut the rate, it’s gone the same day</strong></td><td>Largely no (but decays)</td><td>Mixed</td></tr>
            <tr><th scope="row">Description or prescription?</th><td>Description</td><td>Description</td><td>Prescription — buy share, price ahead of cost</td></tr>
          </tbody>
        </table>
      </div>
      <div className="grid gap-1.5 md:grid-cols-3 text-xs">
        <div className="card p-2"><strong>Test 1:</strong> falling because of how much I make this period, or how much I have ever made?</div>
        <div className="card p-2"><strong>Test 2:</strong> would it survive a year at half the volume? Scale wouldn’t; learning largely would.</div>
        <div className="card p-2"><strong>Test 3:</strong> can my competitor read about it? If a third leaks, it’s a third smaller.</div>
      </div>
    </figure>
  )
}

function Exhibits() {
  return (
    <div className="space-y-4">
      <DataTable
        caption={<>Netflix paid subscribers and revenue <Cite tag="Netflix Ex.1" /></>}
        head={['Year', 'Subs (M)', 'Revenue ($B)', 'Era']}
        rows={[['2001', '0.4', '0.08', 'DVD by mail'], ['2005', '4.0', '0.68', 'DVD by mail'], ['2007', '7.3', '1.2', 'Streaming launches'], ['2011', '24.3', '3.2', 'Qwikster'], ['2013', '41.4', '4.4', 'First originals'], ['2016–17', '110.6', '11.7', 'Global (190+ countries)'], ['2019', '167.1', '20.2', 'Streaming wars'], ['2021', '221.8', '29.7', 'Pandemic surge'], ['2024', '~302', '39.0', ''], ['2025', '300+ (est.)', '~45', 'Stopped reporting subs']]}
      />
      <DataTable
        caption={<>Content cost per subscriber at a $17B library <Cite tag="Netflix Ex.5" /></>}
        head={['Subscribers', 'Per year', 'Per month']}
        rows={[['10M', '$1,700', '$142'], ['25M', '$680', '$57'], ['50M', '$340', '$28'], ['100M', '$170', '$14'], ['200M', '$85', '$7.10'], ['300M', '$57', '$4.70']]}
      />
      <DataTable
        caption={<>The repricing of licensed content <Cite tag="Netflix Ex.3" /></>}
        head={['Year', 'Deal', 'Terms']}
        rows={[['2008', 'Starz (~2,500 films)', '~$30M/yr'], ['2011', 'Starz renewal', 'Netflix offers $300M+/yr (10×); Starz walks'], ['2019', 'Disney', 'Pulls content for Disney+'], ['2019', 'The Office', '$500M over 5 yrs to Peacock'], ['2019', 'Friends', '$425M over 5 yrs to HBO Max (Netflix had paid ~$100M for one year)']]}
      />
      <HBar title="Quarterly streaming operating profit, Q3 2025 ($M)" rows={[{ label: 'Netflix', value: 2550 }, { label: 'Disney+ (+Hulu)', value: 352 }, { label: 'HBO Max', value: 345 }, { label: 'Paramount+', value: 340 }, { label: 'Peacock', value: -217 }]} digits={0} highlight="Netflix" note={<>Netflix Ex.7</>} />
      <DataTable
        caption={<>EVs in the US, 2025 — the Tesla question <Cite tag="S8 slides 31-32" /></>}
        head={['Maker', 'Cumulative', 'Cost per vehicle', 'Learning rate', 'Doublings to reach Tesla']}
        rows={[['Tesla', '9.0M', '$46,978', '7.4%', '—'], ['Rivian', '174k', '$123,995', '18.5%', '4.7 → 27× its output to date'], ['Lucid', '43k', '$146,300', '16.4%', '6.4 → 82× its output to date'], ['Ford (Model e)', '84,113 US units', '$32k–57k LOSS per vehicle (computed)', '—', '$4.8B EBIT loss on $6.7B revenue'], ['GM', '169,887 units', '$12k–18k loss (estimated)', '—', 'No EV segment disclosed']]}
      />
      <HBar title="Pizza shop scale example: cost per pizza" rows={[{ label: 'Small shop (1,000/month)', value: 20 }, { label: 'Large shop (10,000/month)', value: 5.7 }]} unit="$" digits={2} highlight="Large shop (10,000/month)" note={<>Rent $10k and equipment $5k fixed for both; ingredients −10%, labor −20% per pizza at scale → 71.5% lower <Cite tag="S8 slides 9" /></>} />
    </div>
  )
}

const Q = (o: Omit<Mcq, 'session'>): Mcq => ({ ...o, session: 'S08' })

export const S08: ModuleDef = {
  id: 'S08',
  short: 'Scale & Learning · Netflix',
  framework: {
    oneLiner: '“Economies of scale” names three different things: **scale** (cost vs. output **per period** — reversible), **learning** (cost vs. **cumulative** output — your history), and BCG’s **experience curve** (everything bundled, plus a doctrine to buy share). Find the fixed costs, find the unit of scale, measure the slope, and ask **who keeps the gains** [[Scale]] [[S8 slides 37]].',
    analogy: 'A bakery’s big oven makes each loaf cheaper only while it runs full — bake half as much tomorrow and the advantage vanishes (scale). The baker who has made 10,000 loaves knows tricks the new hire doesn’t, and keeps them on a slow day (learning). And if the whole town’s bakeries get cheaper because everyone copies the best tricks, that’s experience you’re paying for that rivals get for free (leakage) [[Scale]].',
    intuition: [
      '**Scale = rate.** Average cost vs. output per period; a property of your current configuration. Cut production in half and scale advantage is gone the same day [[Scale box]].',
      '**Six scale mechanisms:** geometry (0.6 rule → ~24% lower capital per unit per doubling), indivisibility, specialization (limited by the extent of the market), bargaining (the weakest), statistics (square-root law), demand-side scale (network effects raise WTP, don’t lower cost, and markets tip) [[Scale]].',
      'What shapes industry structure is the **ratio of minimum efficient scale to market size** (autos at 21–30% of demand → 3–5 producers; shoes at 0.2% → fragmented) [[Scale Ex.3]].',
      '**Plant ≠ firm.** Real scale economies are mostly inside a plant; firm-level claims in merger memos are thin (1–2%) and diseconomies are well documented [[Scale]].',
      '**Learning = history.** Wright’s 80% curve was direct labor only; measured rates range 55–108%; learning **decays** (~7% retained per year on the Super Hornet) and **leaks** (~1/3 in nuclear) [[Scale]].',
      '**The experience doctrine goes wrong** when the curve isn’t yours: Texas Instruments priced the TI-99/4A to $99 while Commodore, integrated into its own chips, sat on a lower curve. Ghemawat’s conditions: wrong technology, slow doubling, forced output, substitution [[Scale]].',
      '**Netflix:** each pivot (store → mail → streaming) moved cost from variable to fixed, making the curve steeper: AC = F/N + c. Blockbuster had **size without scale**; Netflix had scale before it had size [[Netflix]] [[S8 slides 15-17]].',
      '**Tesla:** EV cost falls with cumulative **EV** output (batteries, software, architecture). Tesla’s 9M units put it far down a new curve; Ford and GM have volume of the wrong kind [[S8 slides 31-32]].',
    ],
    howToRun: [
      '**1. Locate the fixed costs** and the unit at which cost is incurred (the store? the nation?) [[S8 slides 15, 37]].',
      '**2. Classify the mechanism:** scale (rate), learning (history), or experience (bundle). Use the three tests [[Scale]].',
      '**3. Measure the slope:** fit a progress ratio, or compute F/N across volumes [[Scale App.A]] [[Netflix Ex.5]].',
      '**4. Find MES and compare to market size** — how many viable producers? [[Scale Ex.3]]',
      '**5. Convert any catch-up claim into volume:** doublings → 2^d × cumulative output [[Scale App.A]].',
      '**6. Check Ghemawat’s conditions, decay and leakage** before betting on the curve [[Scale]].',
      '**7. Ask who appropriates the gains** — suppliers with hold-up power can reprice them away [[Netflix]] [[S8 slides 21]].',
    ],
    recall: [
      { id: 'S08-three', title: 'Scale vs. learning vs. experience', prompt: 'What does cost fall with in each, and is it reversible?', items: [{ name: 'Scale — output per period; reversible the same day' }, { name: 'Learning — cumulative output; largely irreversible but decays' }, { name: 'Experience — accumulated volume, all costs; a prescription (buy share)' }], src: 'Scale Ex.2' },
      { id: 'S08-six', title: 'Six scale mechanisms', prompt: 'Name all six.', items: [{ name: 'Geometry (0.6 rule)' }, { name: 'Indivisibility' }, { name: 'Specialization' }, { name: 'Bargaining (weakest)' }, { name: 'Statistics (square-root law)' }, { name: 'Demand-side scale (network effects)' }], src: 'Scale' },
      { id: 'S08-tests', title: 'The three diagnostic questions', prompt: 'Before you build strategy on a falling cost curve.', items: [{ name: 'Rate this period, or everything ever made?' }, { name: 'Would it survive a year at half the volume?' }, { name: 'Can my competitor read about it (does it leak)?' }], src: 'Scale (closing)' },
      { id: 'S08-gh', title: 'Ghemawat’s conditions (where the doctrine fails)', prompt: 'Four ways.', items: [{ name: 'Betting on the wrong technology' }, { name: 'Slow-doubling industries (beer, cement)' }, { name: 'Forcing output up can raise cost (TriStar)' }, { name: 'Substitution destroys the accumulated base (cellophane)' }], src: 'Scale Ghemawat' },
      { id: 'S08-math', title: 'Learning-curve formulas', prompt: 'Write them.', items: [{ name: 'Y = a·X^−b' }, { name: 's = 2^−b, so b = −log₂ s' }, { name: 'd = log₂(X₂/X₁); cost ratio = s^d' }, { name: 's = (Y₂/Y₁)^(1/d)' }, { name: 'Catch-up: d = ln(C_f/C_l) ÷ (−ln s); volume = 2^d × today' }], src: 'Scale App.A' },
      { id: 'S08-synth', title: 'The analytical habit (S8 synthesis)', prompt: 'Four steps.', items: [{ name: 'Locate the fixed costs' }, { name: 'Find the unit of scale' }, { name: 'Measure the slope' }, { name: 'Ask who appropriates the gains' }], src: 'S8 slides 37' },
    ],
    diagram: Diagram,
    variants: [
      {
        title: 'Learning vs. experience — whose cumulative volume?',
        brief: 'Exhibit 2 gives **both** learning and experience as cost vs. **cumulative output**; learning is “a property of one organization’s cumulative history,” while Appendix B notes the experience curve “often” runs on **an industry’s** volume (semiconductors, solar) [[Scale Ex.2]] [[Scale App.A]].',
        slides: 'The S8 table states it flatly: learning = cumulative output **at firm level**; experience = cumulative output **at industry level** [[S8 slides 30]].',
        differ: 'The slide sharpens the brief’s “often” into a rule. The brief is more cautious: BCG’s curve can be a firm’s or an industry’s; what defines it is that it bundles all costs.',
        guess: '**Guess:** the slide compresses the brief’s Appendix B diagnostic into one row for teaching. On the exam: learning = your own cumulative output; experience = all costs, often the industry’s accumulated volume — “the curve can be descending on someone else’s output.”',
      },
      {
        title: 'Types of economies of scale',
        brief: 'Six mechanisms: **geometry, indivisibility, specialization, bargaining, statistics, demand-side** [[Scale]].',
        slides: 'Four types: **technical** (automation/digital systems), **managerial** (streamlined oversight), **financial and marketing** (cheaper borrowing and promotion), **network** (each user enhances others’ experience) [[S8 slides 6]].',
        differ: 'Different taxonomies. Slide “technical” ≈ geometry/indivisibility; “financial & marketing” ≈ bargaining/indivisibility (a Super Bowl ad); “network” = the brief’s demand-side scale — which the brief insists is NOT really a cost economy (it raises WTP).',
        guess: '**Guess:** the four types are a standard textbook list from an earlier version of the deck; the brief was written to be more mechanism-precise. Use the brief’s six in analysis, and know the slide’s four by name.',
      },
    ],
    newScenarios: [
      { prompt: '**Pallas Steel** (fictional) cut output 50% in a recession and its unit costs jumped 30%. A rival that has produced for 40 years held its costs. What does that tell you about each firm’s advantage?', answer: 'Pallas’s advantage was **scale** (a property of its rate) — it vanished when the rate fell. The rival’s looks like **learning** (cumulative history), which survives lower volume. “Most firms discover which one they had involuntarily, in a recession” [[Scale box]].' },
      { prompt: 'A merger memo for two fictional regional hospital chains promises “massive economies of scale.” What should you ask?', answer: 'Are the savings plant-level or firm-level? Real scale economies are mostly inside a plant; firm-level economies are small (1–2%) and diseconomies are documented — hospital acquisitions made patient experience worse with no mortality improvement. Ask which specific fixed costs get spread [[Scale A warning]] [[Scale]].' },
      { prompt: '**Volta Drones** (fictional) is at $9,000/unit with an 85% curve; the leader is at $3,000. How far away is it?', answer: 'd = ln(9,000/3,000) ÷ (−ln 0.85) = 1.099 ÷ 0.1625 ≈ 6.8 doublings → ~110× its cumulative output to date. Unless it can change curves (new process), the catch-up claim is a wish [[Scale App.A]].' },
    ],
  },
  argument: {
    intro: 'The brief separates three mechanisms that produce near-identical cost curves, gives the math for each, and warns that most real data can’t tell them apart — then the case shows how a firm can build scale economies before it has size.',
    propositions: [
      '**Scale is about a rate; learning is about a history;** experience is BCG’s deliberate bundle [[Scale]].',
      '**The test that separates them:** cut output in half — scale disappears that day; learning largely survives [[Scale box]].',
      '**Structure depends on MES relative to the market,** and on the cost penalty below it [[Scale Ex.3]].',
      '**Firm-level scale claims are weak;** real economies are mostly inside plants [[Scale]].',
      '**Learning decays and leaks** — cumulative experience can be an industry public good you finance [[Scale]].',
      '**The doctrine fails when the curve isn’t yours** (TI) or Ghemawat’s conditions are violated [[Scale]].',
      '**Size is not economies of scale** — Blockbuster’s MES was one store [[Netflix]].',
      '**Scale tells you average cost falls, not who captures the surplus;** rented inputs from concentrated suppliers leak the value [[S8 slides 21]].',
    ],
  },
  case: {
    protagonist: 'Reed Hastings and Netflix’s leadership — now at the bottom of a flattening scale curve [[Netflix]].',
    decision: 'How does a firm get a scale cost advantage — and what should Netflix do as its curve flattens and the basis of competition shifts toward YouTube and TikTok? Also: what is the real reason Tesla beats Ford and GM? [[Netflix]] [[Canvas S8]]',
    timeline: [
      { when: '2000', what: 'Netflix offers itself to Blockbuster for $50M; declined [[Netflix Ex.2]]' },
      { when: '2004', what: 'Blockbuster peak: 9,000+ stores, ~$6B revenue; price war begins' },
      { when: '2007', what: 'Watch Instantly launches; Blockbuster’s Total Access losing up to $400M/yr' },
      { when: '2008', what: 'Starz deal ~$30M/yr' },
      { when: '2010', what: 'Blockbuster files Chapter 11' },
      { when: '2011–13', what: 'Qwikster fiasco; Starz walks at $300M+; House of Cards (~$100M for 26 episodes)' },
      { when: '2016', what: 'Launches in 130 more countries at once' },
      { when: '2019', what: 'Studios reclaim libraries; FCF bottoms at −$3.3B' },
      { when: '2022–25', what: 'First subscriber decline; ad tier; paid sharing; ~$45B revenue at ~29.5% margin' },
    ],
    exhibits: Exhibits,
  },
  tool: {
    title: 'Learning-curve calculator + the streaming scale curve',
    intro: 'First the learning-curve arithmetic (load the brief’s worked problem and the Tesla/Rivian/Lucid numbers). Then the fixed-cost-spreading chart: move the content budget and see where each streamer sits on Netflix’s curve.',
    render: () => (
      <div className="space-y-8">
        <LearningCalc />
        <section className="space-y-2">
          <h3 className="text-lg font-semibold">Content spend per subscriber</h3>
          <ScaleCurve />
        </section>
      </div>
    ),
  },
  coldCalls: [
    { id: 'c1', level: 'Facts', q: 'Blockbuster was ten times Netflix’s size in 2004. Why didn’t scale protect it?', model: 'Size isn’t economies of scale. Blockbuster’s unit of cost was the store — lease, labor and local inventory replicated 9,000 times — so average cost per rental was flat in chain size; MES was one well-run store, which is why independents survived alongside it [[Netflix]] [[S8 slides 15]].', weak: 'Because Netflix had better technology.', whyWeak: 'Misses the cost-structure point the slide makes.' },
    { id: 'c2', level: 'Facts', q: 'What is fixed and what is variable for the store, DVD-by-mail and streaming?', model: 'Store: almost nothing fixed at chain level; lease, labor, inventory are per store → flat curve. DVD-by-mail: DC network, Cinematch, website fixed; postage and handling (~$1/shipment floor) variable → declining curve with a floor. Streaming: content budget fixed; a few cents per viewing hour → AC = F/N + c, halving with each doubling of N [[S8 slides 17]].', weak: 'Streaming is all digital so it’s cheaper.', whyWeak: 'No fixed/variable logic.' },
    { id: 'c3', level: 'Analysis', q: 'Why does the steepness of the curve matter?', model: 'At small N, small differences in N make enormous differences in unit cost, so early share leads compound; and MES is set by F — the bigger the library needed to compete, the bigger the subscriber base needed. At $17B, breakeven on content alone is ~118M subscribers; only Netflix clears it [[S8 slides 17-18]].', weak: 'Steeper is better.', whyWeak: 'Doesn’t explain why.' },
    { id: 'c4', level: 'Analysis', q: 'If streaming scale was so attractive, why did so much value flow to content owners?', model: 'Netflix rented its key input from concentrated suppliers whose opportunity cost rose as Netflix succeeded — classic hold-up. Starz went from ~$30M to “walk away at $300M+” in three years; in 2019 studios integrated forward. Scale economies tell you cost falls, not who captures the surplus [[Netflix Ex.3]] [[S8 slides 21]].', weak: 'Because content got more expensive.', whyWeak: 'Names the symptom, not the mechanism (supplier power).' },
    { id: 'c5', level: 'Analysis', q: 'How could Netflix outspend HBO seven-fold and still have lower content cost per subscriber?', model: '$17B ÷ 200M = $85 per subscriber vs. HBO’s $2.5B ÷ 40M = $63 — about the same unit cost for twenty times the programming in every market; at 300M Netflix is at ~$57. HBO couldn’t match because cable intermediaries owned its customers, its parent protected HBO’s profit, and its organization was built for a linear schedule [[S8 slides 23]] [[Netflix]].', weak: 'Netflix had more money.', whyWeak: 'Misses the per-subscriber arithmetic.' },
    { id: 'c6', level: 'Analysis', q: 'Is Netflix’s advantage a network effect?', model: 'No. One subscriber’s utility doesn’t rise because another joins. It’s supply-side scale: more subscribers buy a bigger budget at the same unit cost → better catalog → more subscribers. Supply-side scale is contestable by a rival willing to finance years of losses — as Netflix proved; network effects tip harder [[S8 slides 37]].', weak: 'Yes, more users make it better.', whyWeak: 'Confuses supply-side scale with demand-side network effects.' },
    { id: 'c7', level: 'Analysis', q: 'What is the real reason Tesla beats Ford and GM?', model: 'It’s further down a NEW curve. EV cost falls with cumulative EV output — battery packs, software, electrical architecture. Tesla has 9.0M cumulative EVs at $46,978 cost per vehicle; Ford’s Model e loses $32k–57k per vehicle. The incumbents’ scale sits in stamping, assembly and distribution — volume of the wrong kind [[S8 slides 31-32]].', weak: 'Elon Musk and better technology.', whyWeak: 'No cost-curve mechanism.' },
    { id: 'c8', level: 'Judgment', q: 'Rivian learns faster than Tesla (18.5% vs. 7.4%). Can it catch up?', model: 'A steeper curve doesn’t rescue the position: it needs ~4.7 doublings — 27× its output to date — and each doubling takes twice the volume of the last; at 2025 output that runs past a century. Defensible escapes: stop competing on a dimension decided by cumulative volume, or reset the curve with a different process [[S8 slides 31 notes]].', weak: 'Yes, it’s learning faster.', whyWeak: 'Ignores that doublings require exponentially more volume.' },
    { id: 'c9', level: 'Judgment', q: 'Is Netflix’s advantage durable?', model: 'For: a rising fixed-cost ante (live sports), new layers on the same base (ads, games, live), consolidation, studios licensing to Netflix again. Against: content is fixed but must be re-bought every year; talent and rights holders capture rents; international ARPU ~1/3 of US; and YouTube/TikTok shift the basis of competition — scale in commissioned content is worthless if the battleground moves [[S8 slides 25]].', weak: 'Yes, it’s the biggest.', whyWeak: 'Blockbuster was the biggest too.' },
    { id: 'c10', level: 'Action', q: 'You’re a rival at 50M subscribers. What do you do?', model: 'Don’t try to match a $17B library — at 50M it’s $340 per subscriber per year, more than your revenue. Compete on a dimension not decided by Netflix’s fixed-cost scale: a niche library, bundling, sports or live rights you can own, or merge to reach scale — accepting the antitrust test [[Netflix Ex.5]] [[HHI §4]].', weak: 'Spend more on content to compete.', whyWeak: 'Walks up the cost curve into losses (Disney’s $11B+ streaming losses).' },
  ],
  devil: {
    argument: 'Netflix’s advantage is differentiation, not cost — people subscribe for Squid Game and Stranger Things, not because of an average-cost curve.',
    response: 'Originals are the differentiation, but the reason Netflix can afford them is cost per subscriber: the same budget costs a 41M-subscriber rival seven times as much per head. Exclusivity and recommendations sit on top of a scale cost advantage — Squid Game cost ~$21.4M and was valued at ~$900M because a fixed-cost hit pays back absurdly at scale [[S8 slides 21, 23]] [[Netflix]]. Both sides of the wedge are moving — a preview of dual advantage (S11).',
    probes: ['If scale is the advantage, why did Netflix lose subscribers in 2022?', 'What would make the curve stop mattering?', 'Is password-sharing enforcement a scale move or a pricing move?'],
  },
  pyramid: {
    prompt: 'Answer: **How does a firm get a scale cost advantage?** Use Netflix vs. Blockbuster as evidence.',
    model: {
      structure: 'combined',
      s: 'Blockbuster was ten times Netflix’s size in 2004 and had national advertising and purchasing clout [[Netflix]].',
      c: 'Netflix still drove it into bankruptcy and later outspent HBO seven-fold at about the same cost per subscriber [[Netflix]] [[S8 slides 23]].',
      q: 'How does a firm get a scale cost advantage?',
      a: 'A firm gets a scale cost advantage by moving its costs from variable to fixed and then spreading those fixed costs over more volume than rivals, because average cost then falls steeply with every doubling while rivals with per-unit costs stay flat.',
      supports: [
        { label: 'Major premise', point: 'Scale economies exist only where cost is fixed relative to the unit of volume; average cost = F/N + c falls as N grows [[S8 slides 17]].', evidence: ['Scale is about the rate, not size [[Scale]]'] },
        { label: 'Minor premise', point: 'Netflix’s pivots made content and technology fixed and served a national, then global, base; Blockbuster replicated full cost in every store.', evidence: ['Blockbuster MES = one store', 'Streaming c ≈ cents; $17B ÷ 300M ≈ $57/yr', 'Breakeven ~118M subscribers'] },
        { label: 'Therefore', point: 'Netflix sat at the bottom of a steep curve rivals couldn’t reach without years of losses — but must own its inputs to keep the gains.', evidence: ['Starz $30M → $300M+; originals = vertical integration [[S8 slides 21]]'] },
      ],
      competing: '“Scale = being big.” Blockbuster was big with a flat curve; size without fixed-cost leverage is not an advantage.',
      memo: 'Deductive spine: the cost-structure theory is the major premise; the case supplies the minor premise.',
    },
  },
  checkIds: ['S08-q01', 'S08-q02', 'S08-q04', 'S08-q06', 'S08-q08', 'S08-q10', 'S08-q12', 'S08-q14', 'S08-q17', 'S08-q20'],
  bank: [
    Q({ id: 'S08-q01', kind: 'concept', src: 'Scale box', stem: 'A firm halves its output for a year. Which advantage disappears immediately?', correct: 0, options: [
      { text: 'Scale — it’s a property of the current rate of output.', why: '“Cut production in half tomorrow and any scale advantage is gone the same day.”' },
      { text: 'Learning — cumulative output falls.', why: 'Cumulative output can’t fall.' },
      { text: 'Both equally.', why: 'Learning largely survives.' },
      { text: 'Neither.', why: 'Scale disappears.' },
    ] }),
    Q({ id: 'S08-q02', kind: 'quant', src: 'Scale App.A', stem: 'Unit cost is $100 at 1,000 cumulative units and $64 at 4,000. The progress ratio is…', correct: 2, options: [
      { text: '64%', why: 'That’s the cost ratio over TWO doublings.' },
      { text: '90%', why: 'Arithmetic slip.' },
      { text: '80% (two doublings: √0.64)', why: 'd = 2; s = 0.64^(1/2) = 0.80.' },
      { text: '36%', why: 'That’s the total reduction.' },
    ] }),
    Q({ id: 'S08-q03', kind: 'quant', src: 'Scale App.A', stem: 'On an 85% unit curve with a $500,000 first unit, the 64th unit costs about…', correct: 1, options: [
      { text: '$425,000', why: 'That’s one doubling.' },
      { text: '$188,600', why: '64 = 2⁶; 0.85⁶ = 0.3771; × $500,000.' },
      { text: '$75,000', why: 'Arithmetic slip.' },
      { text: '$320,000', why: 'Wrong exponent.' },
    ] }),
    Q({ id: 'S08-q04', kind: 'quant', src: 'Scale App.A', stem: 'A 500,000-ton plant costs $200M. Using the six-tenths rule, a 1,000,000-ton plant costs about…', correct: 3, options: [
      { text: '$400M', why: 'That assumes cost scales 1:1 (k = 1).' },
      { text: '$200M', why: 'Assumes no extra cost.' },
      { text: '$240M', why: 'Arithmetic slip.' },
      { text: '$303M — capital per ton falls from $400 to ~$303 (−24%)', why: '2^0.6 = 1.516.' },
    ] }),
    Q({ id: 'S08-q05', kind: 'concept', src: 'Scale Bargaining', stem: 'Per Wright’s data, which scale mechanism is the WEAKEST?', correct: 0, options: [
      { text: 'Bargaining — purchased material 88% and raw material 95% curves vs. labor’s 80%.', why: '“A firm that justifies a merger on purchasing power is focused on the weakest of the six.”' },
      { text: 'Geometry.', why: '~24% per doubling.' },
      { text: 'Specialization.', why: 'Smith’s 240-fold gain.' },
      { text: 'Statistics.', why: 'Square-root law can cut safety stock 75%.' },
    ] }),
    Q({ id: 'S08-q06', kind: 'concept', src: 'Scale Demand-side', stem: 'Why does the brief say network effects are “a different animal” from scale economies?', correct: 2, options: [
      { text: 'They are illegal.', why: 'No.' },
      { text: 'They only apply to hardware.', why: 'No.' },
      { text: 'They raise willingness to pay rather than lower supplier cost, don’t run out at MES, and make markets tip.', why: 'Demand-side scale.' },
      { text: 'They reverse instantly.', why: 'Not the distinction.' },
    ] }),
    Q({ id: 'S08-q07', kind: 'quant', src: 'Scale App.A', stem: 'Consolidating nine independent warehouses into one cuts total safety stock by about…', correct: 1, options: [
      { text: '89%', why: 'That would be 1/9.' },
      { text: '67% (to 1/√9 = 1/3)', why: 'Square-root law.' },
      { text: '33%', why: 'That’s what remains, not the cut.' },
      { text: '0%', why: 'Only if demands move together.' },
    ] }),
    Q({ id: 'S08-q08', kind: 'concept', src: 'Scale Ex.3', stem: 'What determines industry structure, per the brief?', correct: 3, options: [
      { text: 'Whether scale economies exist.', why: 'They nearly always exist.' },
      { text: 'Total market size alone.', why: 'Needs MES too.' },
      { text: 'The largest firm’s share.', why: 'That’s a result.' },
      { text: 'The ratio of minimum efficient scale to market size (and the cost penalty below MES).', why: 'Autos 21–30% → 3–5 producers.' },
    ] }),
    Q({ id: 'S08-q09', kind: 'concept', src: 'Scale Learning', stem: 'Which is TRUE of Wright’s 1936 80% curve?', correct: 0, options: [
      { text: 'It applied to direct labor only and was a cumulative-average curve.', why: 'The brief’s corrections to the textbook version.' },
      { text: 'It applied to the whole airplane.', why: 'The whole airplane flattened from 83% to 90%.' },
      { text: 'It is a law that holds for all industries.', why: 'Rates range 55–108%.' },
      { text: 'It measured scale, not learning.', why: 'It measured learning.' },
    ] }),
    Q({ id: 'S08-q10', kind: 'case', src: 'Scale (TI)', stem: 'Why did Texas Instruments lose money pricing the TI-99/4A down to $99?', correct: 2, options: [
      { text: 'Demand never materialized.', why: '“The volume came.”' },
      { text: 'It had no learning at all.', why: 'Not the argument.' },
      { text: 'It priced down an experience curve it didn’t own — Commodore, integrated into its own chips, sat on a lower curve.', why: '“The curve it was riding belonged to its competitor.”' },
      { text: 'It was forced by regulators.', why: 'No.' },
    ] }),
    Q({ id: 'S08-q11', kind: 'apply', src: 'Scale Ghemawat', stem: 'A cement firm (fictional) plans to underprice rivals for years to “ride the experience curve.” Ghemawat’s main objection?', correct: 1, options: [
      { text: 'Cement has no costs.', why: 'No.' },
      { text: 'In slow-doubling industries like cement, cumulative output doubles so rarely the strategy can’t pay.', why: 'One of Ghemawat’s conditions.' },
      { text: 'Cement has network effects.', why: 'No.' },
      { text: 'Cement can’t be patented.', why: 'Irrelevant.' },
    ] }),
    Q({ id: 'S08-q12', kind: 'case', src: 'Netflix', stem: 'Blockbuster’s minimum efficient scale was effectively…', correct: 0, options: [
      { text: 'one well-run neighborhood store — why independents survived alongside it.', why: 'The case.' },
      { text: '9,000 stores.', why: 'Size ≠ MES.' },
      { text: 'one national distribution center.', why: 'That’s Netflix’s model.' },
      { text: 'unknowable.', why: 'The case states it.' },
    ] }),
    Q({ id: 'S08-q13', kind: 'quant', src: 'Netflix Ex.5', stem: 'A $17B content library spread over 50M subscribers costs per subscriber per year…', correct: 3, options: [
      { text: '$57', why: 'That’s at 300M.' },
      { text: '$85', why: 'That’s at 200M.' },
      { text: '$170', why: 'That’s at 100M.' },
      { text: '$340', why: '$17,000M ÷ 50M.' },
    ] }),
    Q({ id: 'S08-q14', kind: 'quant', src: 'S8 slides 18', stem: 'At $17B content and $12/month revenue per member, breakeven on content alone needs about…', correct: 2, options: [
      { text: '17M subscribers', why: 'Forgot to multiply ARPU by 12.' },
      { text: '1.4B subscribers', why: 'Arithmetic slip.' },
      { text: '118M subscribers ($17B ÷ $144)', why: 'S8 slide 18.' },
      { text: '300M subscribers', why: 'That’s Netflix’s count, not breakeven.' },
    ] }),
    Q({ id: 'S08-q15', kind: 'case', src: 'S8 slides 21', stem: 'What did Netflix originals change economically?', correct: 1, options: [
      { text: 'They lowered production cost per episode.', why: 'Not the point.' },
      { text: 'Vertical integration into the input: cost certainty (no renewals), global perpetual rights, exclusivity.', why: 'Slide 21.' },
      { text: 'They created network effects.', why: 'No.' },
      { text: 'They replaced recommendations.', why: 'No.' },
    ] }),
    Q({ id: 'S08-q16', kind: 'quant', src: 'S8 slides 31', stem: 'Rivian ($123,995 per vehicle, 18.5% learning rate) vs. Tesla ($46,978). How many times its cumulative output must Rivian produce to reach Tesla’s cost?', correct: 0, options: [
      { text: '~27× (≈4.7 doublings)', why: 'ln(2.64) ÷ −ln(0.815) ≈ 4.7; 2^4.7 ≈ 27.' },
      { text: '~2.6×', why: 'That’s the cost ratio, not the volume needed.' },
      { text: '~4.7×', why: 'That’s the number of doublings.' },
      { text: '~100×', why: 'Too high.' },
    ] }),
    Q({ id: 'S08-q17', kind: 'case', src: 'S8 slides 32', stem: 'Why don’t Ford and GM’s huge production volumes give them an EV cost advantage?', correct: 3, options: [
      { text: 'They have no volume.', why: 'They have plenty of ICE volume.' },
      { text: 'Their workers are less skilled.', why: 'Not the slide’s argument.' },
      { text: 'Tariffs.', why: 'Not the argument.' },
      { text: 'Their scale sits in stamping, assembly and distribution; the battery, software and architecture are a new curve measured in cumulative EV output.', why: 'Slide 32 notes.' },
    ] }),
    Q({ id: 'S08-q18', kind: 'concept', src: 'Scale Diseconomies', stem: 'Brooks’s law: with 50 people, how many pairwise communication channels?', correct: 1, options: [
      { text: '50', why: 'Channels grow faster than headcount.' },
      { text: '1,225', why: 'n(n−1)/2 = 50 × 49 / 2.' },
      { text: '2,500', why: 'That’s n², not n(n−1)/2.' },
      { text: '100', why: 'No.' },
    ] }),
    Q({ id: 'S08-q19', kind: 'apply', src: 'Scale Learning leaks', stem: 'A nuclear builder (fictional) learns how to cut construction costs, but rivals copy about a third of each improvement. The brief’s implication?', correct: 2, options: [
      { text: 'The advantage is unchanged.', why: 'Leakage shrinks it.' },
      { text: 'It should stop building.', why: 'Too strong.' },
      { text: 'Its accumulated-volume advantage is about a third smaller than the model says; if most leaks, it’s an industry public good it’s paying for.', why: '“Learning leaks.”' },
      { text: 'It now has a network effect.', why: 'No.' },
    ] }),
    Q({ id: 'S08-q20', kind: 'concept', src: 'S8 slides 37', stem: 'How does the S8 synthesis contrast Aldi and Netflix?', correct: 0, options: [
      { text: 'Aldi: structural cost advantage with modest scale-dependence; Netflix: economies of scale where the subscriber base IS the advantage.', why: 'Slide 37.' },
      { text: 'Both are network effects.', why: 'Neither.' },
      { text: 'Aldi is learning; Netflix is experience.', why: 'Not the slide’s framing.' },
      { text: 'Both leak through rivals copying the format.', why: 'Netflix leaks through suppliers repricing inputs.' },
    ] }),
    Q({ id: 'S08-q21', kind: 'quant', src: 'S8 slides 9', stem: 'Small pizza shop: $20,000/month for 1,000 pizzas. Large shop: $57,000 for 10,000. Unit cost falls by…', correct: 3, options: [
      { text: '65%', why: 'Arithmetic slip.' },
      { text: '28.5%', why: 'That’s 5.70/20.' },
      { text: '90%', why: 'That assumes all costs are fixed.' },
      { text: '71.5% ($20.00 → $5.70)', why: '1 − 5.70/20.' },
    ] }),
  ],
  shorts: [
    { id: 'S08-sa1', session: 'S08', src: 'Scale', prompt: 'Distinguish scale, learning and experience in three sentences, and give the test that separates scale from learning.', model: 'Scale: average cost vs. output per period — a property of current configuration. Learning: cost vs. cumulative output — a property of history. Experience: BCG’s bundle of all costs vs. accumulated volume, with a doctrine to buy share. Test: halve output — scale advantage vanishes that day; learning largely survives.', points: ['Three definitions', 'The halving test'] },
    { id: 'S08-sa2', session: 'S08', src: 'Netflix', prompt: 'Why did Netflix have scale economies before it had size, and Blockbuster size without scale?', model: 'Netflix’s costs were fixed at the national level (one inventory, one recommendation system, then a content budget) and spread over every subscriber; Blockbuster’s costs were replicated per store, so average cost per rental stayed flat as it grew.', points: ['Netflix fixed at national level', 'Blockbuster per-store costs'] },
    { id: 'S08-sa3', session: 'S08', src: 'S8 slides 31-32', prompt: 'What is the real reason Tesla beats Ford and GM?', model: 'Cumulative volume on a new cost curve: EV costs (batteries, software, architecture) fall with cumulative EV output; Tesla has 9M cumulative EVs at ~$47k cost per vehicle while Ford loses $32k–57k per EV. Incumbents’ scale is in the old curve.', points: ['New curve', 'Cumulative EV output', 'Numbers'] },
    { id: 'S08-sa4', session: 'S08', src: 'Scale Ghemawat', prompt: 'Give two conditions under which riding the experience curve fails.', model: 'Any two of: betting on the wrong technology; slow-doubling industries; forcing output up raises costs (TriStar); substitution destroys the base (cellophane); and learning leaks or decays.', points: ['Two valid conditions with examples'] },
  ],
  written: {
    prompt: '**Timed (20 min).** **Arcadia Solar** (fictional) is at $0.30/watt with an 80% progress ratio and 2 GW cumulative output; the leader is at $0.12/watt with 50 GW. Arcadia’s CEO plans to price at $0.12 now “because we’ll ride the curve down.” Advise, with numbers.',
    minutes: 20,
    model: 'd = ln(0.30/0.12) ÷ (−ln 0.80) = 0.916 ÷ 0.223 ≈ 4.1 doublings → ~17× cumulative output (to roughly 35 GW) before reaching $0.12, while the leader keeps descending. Pricing at $0.12 now is the TI error — pricing down a curve you don’t own. Check Ghemawat’s conditions (technology resets, leakage: solar’s experience is industry-wide, so learning is largely a public good). Recommend: compete on a niche or a process that resets the curve rather than a price war.',
    rubric: ['Correct doublings and volume multiple', 'Names the TI / doctrine error', 'Ghemawat conditions / leakage', 'Clear recommendation'],
  },
  oral: { prompt: 'How does a firm get a scale cost advantage? Use Netflix — then tell me why Tesla beats Ford and GM.', probes: ['Isn’t Blockbuster proof that scale doesn’t matter?', 'Is that scale or learning? How do you know?', 'Why didn’t scale protect Netflix from Starz?', 'Can Rivian catch Tesla?'] },
  summary: {
    answer: 'A firm gets a scale cost advantage by making its key costs fixed and spreading them over more volume than rivals — Netflix moved from per-store to national to global fixed costs, so AC = F/N fell steeply while Blockbuster’s stayed flat. Tesla beats Ford and GM because it is far down the new EV cost curve (9M cumulative units), where incumbents’ old-curve scale doesn’t count.',
    numbers: [
      { label: '$17B library per subscriber', value: '$1,700 (10M) → $57 (300M) per year', src: 'Netflix Ex.5' },
      { label: 'Content breakeven', value: '~118M subscribers at $12 ARPU', src: 'S8 slides 18' },
      { label: 'Starz license', value: '~$30M (2008) → $300M+ refused (2011)', src: 'Netflix Ex.3' },
      { label: 'Netflix margin', value: '1.4% (2012) → ~29.5% (2025)', src: 'Netflix Ex.6' },
      { label: 'Tesla vs. Rivian', value: '$46,978 vs. $123,995; Rivian needs ~27× output', src: 'S8 slides 31' },
      { label: 'Six-tenths rule', value: '2× capacity → 1.52× cost → −24% capital per unit', src: 'Scale App.A' },
    ],
    frameworkBullets: ['Scale = rate; learning = history; experience = bundle + doctrine', 'Six scale mechanisms; MES ÷ market size', 'Plant vs. firm scale', 'Y = aX^−b; s = 2^−b; catch-up = 2^d', 'Decay, leakage, Ghemawat, diseconomies'],
    caseBullets: ['Size ≠ scale (Blockbuster)', 'Each pivot made cost more fixed and the curve steeper', 'Rented inputs leak value; originals integrate', 'Durability threatened by a shift in the basis of competition'],
  },
  crossLinks402: [{ topic: 'Fitting cost curves and Netflix break-even', note: 'STRAT 402 fits ATC = aQ^b (b negative) and computes cost change per doubling = 2^b − 1; 401’s brief writes Y = aX^−b (b positive) with s = 2^−b. Same math, opposite sign convention.', href: '#/learn/S06' }],
}
