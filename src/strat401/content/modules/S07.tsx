import { DataTable, HBar } from '../../components/Charts'
import { Cite } from '../../components/Cite'
import { PRICE_INDEX } from '../../lib/aldi'
import { AldiGapTool } from '../../widgets/AldiGap'
import { ProfitPoolMapper } from '../../widgets/ProfitPool'
import type { ModuleDef } from '../types'

function ValueChainDiagram() {
  const support = ['Firm infrastructure', 'Human resource management', 'Technology development', 'Procurement']
  const primary = ['Inbound logistics', 'Operations', 'Outbound logistics', 'Marketing & sales', 'Service']
  return (
    <figure className="card p-3 space-y-2">
      <figcaption className="font-semibold">
        Porter’s generic value chain <Cite tag="VC Ex.1" />
      </figcaption>
      <div className="grid grid-cols-[1fr_3.2rem] gap-1 text-xs sm:text-sm">
        <div className="space-y-1">
          <div className="text-xs muted uppercase tracking-wide">Support activities — run across all primary activities</div>
          {support.map((s) => (
            <div key={s} className="rounded px-2 py-1.5 surface-2 border line font-semibold">
              {s}
            </div>
          ))}
          <div className="text-xs muted uppercase tracking-wide pt-1">Primary activities — touch the product on its way to the buyer</div>
          <div className="grid grid-cols-5 gap-1">
            {primary.map((p) => (
              <div key={p} className="rounded px-1 py-3 text-center font-semibold border line" style={{ background: 'var(--surface-2)' }}>
                {p}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded grid place-items-center font-bold text-xs" style={{ background: 'var(--accent)', color: 'var(--accent-ink)', writingMode: 'vertical-rl' }}>
          MARGIN = WTP − cost of everything to the left
        </div>
      </div>
      <p className="text-xs muted">Advantage lives in the boxes AND in the linkages between them — which activity is subsidizing which.</p>
    </figure>
  )
}

function Exhibits() {
  return (
    <div className="space-y-4">
      <HBar
        title="The anchor: grocery price index (Walmart = 100)"
        rows={PRICE_INDEX}
        highlight="Aldi"
        max={140}
        note={
          <>
            Consumer Reports with Strategic Resource Group; prices collected in person at 40+ chains in six cities, late 2025, published April 2026. Aldi ÷ Kroger = 79.9 → a ~20-point gap <Cite tag="S8 slides 2-3" />
          </>
        }
      />
      <DataTable
        caption={
          <>
            Aldi vs. a conventional supermarket <Cite tag="Aldi Ex.4" /> <span className="muted font-normal">(“directional, for discussion only”)</span>
          </>
        }
        head={['Dimension', 'Aldi', 'Conventional']}
        rows={[
          ['Items stocked (SKUs)', '~1,400–2,000', '30,000–40,000+'],
          ['Private label share of sales', '~90%', '~20–25%'],
          ['Selling area', '~12,000 sq ft', '40,000–60,000 sq ft'],
          ['Staff per store (typical shift)', '3–5', '15–50+'],
          ['Displays', 'Cut-case cardboard on pallets', 'Shelved, faced, merchandised'],
          ['Advertising', 'Weekly flyer, social media', 'Heavy weekly promotion cycles'],
          ['Carts / bagging', 'Quarter deposit; self-bagging', 'Free carts; staff bagging'],
          ['Services (pharmacy, deli, floral)', 'None', 'Extensive'],
          ['Price level (typical basket)', 'Often ~15–40% below', 'Baseline'],
          ['Margin model', 'Very low cost, low price, high turns', '1–3% net on full-assortment volume'],
        ]}
      />
      <DataTable
        caption={
          <>
            Will it scale? The case’s evidence, sorted <Cite tag="Aldi Ex.6" />
          </>
        }
        head={['Signs breadth will strain the model', 'Signs the model will scale']}
        rows={[
          ['~1,400–2,000 SKUs; refuses most of the grocery universe', '~2,800 stores across 40 states; national footprint by the 2028 plan'],
          ['No pharmacy, deli, floral, or one-stop completeness', 'One in three US households shopped Aldi in the past year'],
          ['Small-format stores cannot host broad demand', 'Assortment now spans organic, premium, gluten-free, general merchandise'],
          ['Target customer defined by price-first behavior', 'Award-winning private labels attract affluent shoppers by choice'],
          ['Often a secondary, split-basket stop', 'Converting full-service supermarkets (Winn-Dixie) to its format'],
          ['Every added SKU or service taxes the cost machine', 'Limited SKUs cover ~90% of a household’s annual purchases'],
          ['Discipline of subtraction is the historic source of advantage', 'Delivery via Instacart, DoorDash, Uber Eats; new digital storefront'],
          ['Growth risk: drift into “stuck in the middle”', 'Contest with Walmart for the mainstream is already underway'],
        ]}
      />
      <HBar
        title="Little Caesars vs. rivals: the brief’s numbers"
        rows={[
          { label: 'Avg sales/restaurant — Little Caesars (est.)', value: 950 },
          { label: 'Avg sales/restaurant — Domino’s', value: 1385 },
          { label: 'Avg sales/restaurant — Pizza Hut', value: 808 },
        ]}
        unit="k"
        digits={0}
        note={
          <>
            Fee load (royalty + ad fund): Little Caesars 11%, Domino’s 9.5%, Pizza Hut 10.75%. Lowest initial investment: $446.5k vs. $107.5k vs. $777.0k <Cite tag="VC Ex.3" />
          </>
        }
      />
    </div>
  )
}

const Q = (o: Omit<ModuleDef['bank'][number], 'session'>) => ({ ...o, session: 'S07' as const })

export const S07: ModuleDef = {
  id: 'S07',
  short: 'Value Chain · Aldi',
  framework: {
    oneLiner:
      'A firm has no costs — **activities** have costs. Take the firm apart into what it actually does, ask what each activity costs and what drives that cost, and look for the advantage both **inside the boxes** and **between them** (linkages) [[VC]].',
    analogy:
      'Think of a restaurant bill you want to cut. “Spend less” is useless; you have to go line by line — rent, food, staff, delivery — and ask which lines you could shrink, which you could delete, and which ones only exist because of another line. A five-dollar pizza is that exercise done ruthlessly: Little Caesars didn’t find cheap cheese; it **deleted the delivery driver, the order-taker and the counter** [[VC]].',
    intuition: [
      'Porter’s radical claim (1985) was that competitive advantage is not a property of the firm (“well run”) but of **activities**: a firm wins or loses in each activity separately [[VC]].',
      'There are **nine generic categories**: five **primary** activities that touch the product on its way to the buyer, and four **support** activities that make them possible. Margin is what’s left when willingness to pay exceeds the cost of everything to its left [[VC Ex.1]].',
      'The boxes are only a starting point. **Split until the parts have different economics** — “operations” at an airline is gate turnaround AND engine overhaul, which have nothing in common [[VC]].',
      '**Linkages** are where chains become hard to copy: a rival can see every activity, but not which activity is subsidizing which (Amazon’s regionalization cut $0.45+/unit without any single activity getting cheaper) [[VC]].',
      'The most reliable cost cut is **deleting** an activity: performing it more cheaply invites the rival to respond; not performing it at all doesn’t [[VC]].',
      'Then ask the question most analyses skip: the chain tells you **where cost went out — not who kept it** (Little Caesars’ franchisor captured a big share through fees and a mandatory supplier) [[VC]].',
    ],
    howToRun: [
      '**1. Disaggregate** until activities have different cost drivers, assets or effects on what the buyer will pay [[VC How to run]].',
      '**2. Put a cost AND an asset** against every box — cheap to run but heavy in working capital is not cheap.',
      '**3. Find the driver** of each box using Porter’s ten: scale, learning, capacity utilization, linkages, interrelationships, vertical integration, timing, discretionary policy, location, institutional factors.',
      '**4. Work the linkages, not the boxes** — where does spending more here save more there? Look outward to suppliers’ and channels’ chains too.',
      '**5. Decide what to own, buy, or let someone else’s brand ride on** — most make-or-buy choices were made by accident.',
      '**Then for cost strategy:** classify each source as **scale/process** (travels as you grow) vs. **refusal** (disappears the moment breadth forces you to perform the activity) [[Aldi]].',
      '**Finally:** ask who keeps the savings, and — with a profit pool — whether you’re standing in the right part of the industry chain at all [[VC Profit pools]].',
    ],
    recall: [
      {
        id: 'S07-vc9',
        title: 'The nine activities',
        prompt: 'Write Porter’s five primary and four support activities from memory.',
        items: [
          { name: 'Inbound logistics', hint: 'primary' },
          { name: 'Operations', hint: 'primary' },
          { name: 'Outbound logistics', hint: 'primary' },
          { name: 'Marketing & sales', hint: 'primary' },
          { name: 'Service', hint: 'primary' },
          { name: 'Procurement', hint: 'support' },
          { name: 'Technology development', hint: 'support' },
          { name: 'Human resource management', hint: 'support' },
          { name: 'Firm infrastructure', hint: 'support' },
        ],
        src: 'VC Ex.1',
      },
      {
        id: 'S07-steps',
        title: 'Five steps of a value chain analysis',
        prompt: 'The diagram is descriptive; the analysis isn’t. Name the five steps.',
        items: [
          { name: 'Disaggregate until activities have different economics' },
          { name: 'Put a cost and an asset against every box' },
          { name: 'Ask what drives cost in each box' },
          { name: 'Work the linkages, not the boxes' },
          { name: 'Decide what to own, what to buy, and what to let someone else’s brand ride on' },
        ],
        src: 'VC How to run',
      },
      {
        id: 'S07-drivers',
        title: 'Porter’s ten cost drivers',
        prompt: 'Don’t assume scale is the answer. Name all ten drivers.',
        items: [
          { name: 'Scale' },
          { name: 'Learning' },
          { name: 'Capacity utilization' },
          { name: 'Linkages' },
          { name: 'Interrelationships across business units' },
          { name: 'Vertical integration' },
          { name: 'Timing of entry' },
          { name: 'Discretionary policy choices' },
          { name: 'Location' },
          { name: 'Institutional factors (regulation, union status)' },
        ],
        src: 'VC How to run',
      },
      {
        id: 'S07-sources',
        title: 'Five sources of cost advantage (slides)',
        prompt: 'The S7 deck’s list. Name all five.',
        items: [
          { name: 'Lower input costs', hint: 'bargaining (Walmart), cooperation (Toyota), location (Nike), preferred access (Saudi oil $5.40 vs. Alberta $72)' },
          { name: 'Economies of scale or scope' },
          { name: 'Learning and experience' },
          { name: 'Proprietary knowledge', hint: 'patents; hard-to-replicate processes' },
          { name: 'Different business models', hint: 'eliminate steps (Zara, Warby Parker) or perform new ones (Aldi customers bag their own)' },
        ],
        src: 'S7 slides 4',
      },
      {
        id: 'S07-pool',
        title: 'Mapping a profit pool (Gadiesh & Gilbert)',
        prompt: 'Four steps.',
        items: [
          { name: 'Define the pool’s boundaries', hint: 'this step determines the answer' },
          { name: 'Estimate the pool’s overall size', hint: 'total PROFIT, not revenue' },
          { name: 'Estimate each activity’s share', hint: 'reconstructed from pure-play comparables' },
          { name: 'Check and reconcile the calculations' },
        ],
        src: 'VC Profit pools',
      },
    ],
    diagram: ValueChainDiagram,
    variants: [
      {
        title: 'Two lists for “where cost advantage comes from”',
        brief: 'The brief gives **Porter’s ten cost drivers** (scale, learning, capacity utilization, linkages, interrelationships, vertical integration, timing, discretionary policy, location, institutional factors) as the question to ask of every activity [[VC How to run]].',
        slides: 'The S7 deck gives **five sources of cost advantage**: lower input costs, economies of scale or scope, learning and experience, proprietary knowledge, different business models [[S7 slides 4]].',
        differ: 'Not a contradiction — two different cuts. The ten drivers explain *why a single activity costs what it does*; the five sources classify *where a firm-level cost advantage comes from*. “Different business models” on the slide is the brief’s “structure” (deleting or redesigning activities); the slide also adds “scope” and “proprietary knowledge,” which the brief folds into interrelationships and technology development.',
        guess: '**Guess:** the slide list is the professor’s teaching summary for the whole cost module (it reappears in the S8 deck), while the brief quotes Porter’s original activity-level drivers. Use the five sources to name the advantage, the ten drivers to diagnose an activity.',
      },
    ],
    newScenarios: [
      {
        prompt: '**FreshCart** (fictional) is a regional grocer that copies Aldi’s private-label share but keeps its 35,000-SKU stores and full-service deli. Its costs barely move. Using the value chain, why?',
        answer: 'Private label’s cost power comes from **volume per SKU**, which comes from the **narrow assortment**; with 35,000 SKUs FreshCart’s volume per item stays small. And the biggest bars in Aldi’s gap (private label, store labor) are **linked** to assortment — copying one element of a linked system gets you nothing [[VC Little Caesars]] [[Porter §3]] [[S8 slides 3]].',
      },
      {
        prompt: '**SwiftDough** (fictional pizza chain) cuts its drivers’ wages 10%. A rival instead switches to carryout-only with heated pickup lockers. Which move builds a more defensible cost position, and why?',
        answer: 'The locker/carryout move **deletes activities** (drivers, counter transaction) — the brief’s most reliable cost reduction, because performing an activity more cheaply (wage cuts) invites the rival to match, while deleting it changes the system [[VC Little Caesars]].',
      },
      {
        prompt: '**Ridgeway Motors** (fictional dealer group) earns 60% of revenue from new cars at razor-thin margins and is considering a price war to win share. What does a profit pool map tell its CEO?',
        answer: 'In dealerships, new vehicles are the widest but poorest block; parts & service and finance & insurance are small revenue but most of the gross profit (AutoNation: 22.8% of sales → 77.2% of gross profit). A price war fights over the poorest part of the pool; the positioning question is how to win the service and F&I relationship [[VC Profit pools]].',
      },
    ],
  },
  argument: {
    intro:
      'The brief argues that cost position is **built, activity by activity**, not announced — and that the analysis must also ask who keeps the savings and whether you stand in the right part of the industry chain.',
    propositions: [
      '**A firm has no costs; activities do.** Advantage is won or lost activity by activity [[VC]].',
      '**Split until the economics differ.** If every activity has the same cost driver, you haven’t cut finely enough [[VC]].',
      '**Linkages make chains hard to copy:** rivals can observe activities, not which one subsidizes which [[VC]].',
      '**Deleting an activity beats doing it cheaper** — the rival can match cheaper; it can’t easily match a different system [[VC Little Caesars]].',
      '**Where the cost went out ≠ who kept it** — Little Caesars’ savings were partly captured by the franchisor (11% fee load, $446.5k buildout floor, mandatory Blue Line supply) [[VC Ex.3]].',
      '**Low cost without volume is fragile** — Little Caesars (~$950k per store) pairs low cost with LOW throughput, the opposite of Walmart [[VC Little Caesars]].',
      '**You can win by owning one link** so completely the industry must come to you (ASML, TSMC, YKK, Amazon logistics, Ritz-Carlton) [[VC Own one link]].',
      '**Profit concentration ≠ revenue concentration** — the profit pool is a positioning instrument, the value chain an efficiency instrument [[VC Profit pools]].',
    ],
  },
  case: {
    protagonist: 'Aldi Süd’s US leadership, at the January 2026 planning review — after a strategy professor asks: “Which one are you trying to be: a focused discounter or a broad cost leader?” [[Aldi]]',
    decision:
      'Where does Aldi’s cost advantage actually come from, link by link — and how much of it survives each step toward breadth (delivery, a digital storefront, Winn-Dixie conversions, a second size in 20 categories, 10 more states)? The next $9 billion will be spent as if they knew [[Aldi]].',
    timeline: [
      { when: '1946', what: 'Karl and Theo Albrecht take over the family store in Essen; win by refusing almost everything a grocer was expected to do [[Aldi Ex.5]]' },
      { when: '1961–62', what: 'Split into Aldi Nord and Aldi Süd; “Aldi” (Albrecht Discount) name adopted' },
      { when: '1976', what: 'Aldi Süd opens its first US store (Iowa); grows quietly as a focused, cost-focus player' },
      { when: '2008–09', what: 'Recession sends middle-class shoppers to discounters; many stay' },
      { when: '2017', what: '$3.4B remodel and expansion program; Lidl enters the US' },
      { when: '2024', what: 'Acquires ~400 Winn-Dixie / Harveys supermarkets; 200+ to convert by 2027' },
      { when: '2026', what: '180+ new stores; Maine is the 40th state; Colorado entry; ~2,800 stores; $9B plan to reach 3,200 by 2028' },
    ],
    exhibits: Exhibits,
  },
  tool: {
    title: 'Where does Aldi’s price gap come from?',
    intro:
      'The case asks you to “commit to an estimate: where in the value chain does the firm get its cost advantage, and how much survives each step toward breadth?” [[Aldi Ex.3]]. Do it yourself first; then compare with the professor’s waterfall from the S8 deck [[S8 slides 3]].',
    render: () => (
      <div className="space-y-8">
        <AldiGapTool />
        <section className="space-y-2">
          <h3 className="text-lg font-semibold">Profit pool mapper</h3>
          <ProfitPoolMapper />
        </section>
      </div>
    ),
  },
  coldCalls: [
    {
      id: 'c1',
      level: 'Facts',
      q: 'Kimball, give me the numbers. How far below a conventional grocer is Aldi, and how do you know?',
      model: 'About **20 points**: Consumer Reports’ in-person price study puts Aldi at 91.7 and Kroger at 114.8 (Walmart = 100), so Aldi is ~79.9 if Kroger is 100 [[S8 slides 2-3]]. The case gives a wider, directional range (“often ~15–40% below”) [[Aldi Ex.4]]. I’d anchor on the like-for-like study, not Aldi’s own 36%, which compares its private label to national brands [[S8 slides 2 notes]].',
      weak: 'Aldi is like 40% cheaper.',
      whyWeak: 'Picks the top of a directional range, ignores the like-for-like anchor, and can’t say what it’s compared against.',
    },
    {
      id: 'c2',
      level: 'Facts',
      q: 'What is the one decision in the Aldi model that most of the other choices cascade from?',
      model: '**The limited assortment** — ~1,400–2,000 items vs. 30,000–40,000. It creates volume per item (bargaining power), smaller stores, less labor to stock, faster turns, faster choosing, and tractable quality control [[Aldi]]. On the professor’s waterfall, the two biggest bars — private label (5) and store labor (5) — both trace to it [[S8 slides 3 notes]].',
      weak: 'Their private label.',
      whyWeak: 'Private label is big, but it’s downstream of assortment — the answer misses the linkage that makes the system hard to copy.',
    },
    {
      id: 'c3',
      level: 'Analysis',
      q: 'Walk me down the value chain. Where is Aldi’s advantage scale, where is it process, and where is it refusal?',
      model: '**Scale:** procurement — huge volume on few SKUs, single-spec private label. **Process:** inbound logistics and store operations — cut-case pallets, multi-face barcodes, quarter carts, cross-trained crews. **Refusal:** marketing & sales (no promotion cycles), service (no deli, pharmacy, bagging), and until recently outbound/delivery and technology. **Structure/culture:** thin HQ, private, debt-light [[Aldi Ex.3]].',
      weak: 'Everything is cheaper at Aldi because they’re efficient.',
      whyWeak: '“Efficient” is operational effectiveness talk; the question asks you to classify by link, which is the whole point of the value chain.',
    },
    {
      id: 'c4',
      level: 'Analysis',
      q: 'Why does it matter whether a cost advantage comes from scale or from refusal?',
      model: 'Because they behave oppositely as scope widens. Scale/process advantages **travel and even compound** with breadth (more stores → more volume per SKU). Refusal advantages **disappear the moment breadth obliges the firm to perform the activity** — delivery, digital, service departments re-add the costs the model was built to escape [[Aldi]].',
      weak: 'Because refusal is cheaper.',
      whyWeak: 'Doesn’t connect the distinction to the decision — the scaling question.',
    },
    {
      id: 'c5',
      level: 'Analysis',
      q: 'Lidl copies the format. Walmart is bigger. Why haven’t incumbents just copied Aldi?',
      model: 'Because the advantage is a **linked system of trade-offs**, not a single practice. To match it, Kroger would have to cut 30,000 SKUs, its services and its promotions — destroying the willingness to pay its own customers come for. The barrier is the **incumbents’ unwillingness to accept the model’s trade-offs** [[S8 slides 37]] [[Porter §3]]. Lidl, which copied it with slightly larger, fancier stores, grew far slower than promised [[Aldi]].',
      weak: 'Aldi has better suppliers.',
      whyWeak: 'Names one link; ignores linkages and the trade-offs that make copying unattractive.',
    },
    {
      id: 'c6',
      level: 'Analysis',
      q: 'So what kind of advantage is it — scale, or something else?',
      model: '**A structural (business-model) cost advantage.** Its scale-dependence is modest — “a single store embodies most of the advantage” — unlike Netflix, where the advantage IS the subscriber base [[S8 slides 37]]. That matches the Porter paper: structure is where the most durable cost positions come from, because rivals who copy one element get nothing [[Porter §3]].',
      weak: 'Economies of scale, because they have thousands of stores.',
      whyWeak: 'Size isn’t scale (Walmart is bigger and pricier); misses the structural source.',
    },
    {
      id: 'c7',
      level: 'Judgment',
      q: 'Is Aldi a cost-focus player or a broad cost leader today?',
      model: 'It **began unambiguously as cost focus** and is now **broad in footprint but still narrow in assortment** — 40 states, a third of households, but ~1,400–2,000 SKUs [[Aldi]]. Porter’s trade-off test still passes (it refuses most of the grocery universe, services, promotions), so it hasn’t drifted into the middle yet. The live risk is the one-reasonable-addition-at-a-time drift the case and Porter warn about [[Porter §6]].',
      weak: 'It’s a broad cost leader now because it’s everywhere.',
      whyWeak: 'Confuses geographic scope with competitive scope; doesn’t apply the trade-off test.',
    },
    {
      id: 'c8',
      level: 'Judgment',
      q: 'The buyers want a second size in twenty high-velocity categories. Yes or no?',
      model: '**No, or only with proof.** It attacks the link everything rests on: assortment (2.5), and it slows checkout and stocking — store labor (5) and front end (0.75) depend on the narrow range. That’s ~8 of ~20 points at risk to lift basket size [[S8 slides 3]] [[Aldi]]. If tested, measure checkout speed and labor per dollar before rolling out.',
      weak: 'Yes, customers want choice and it will increase sales.',
      whyWeak: 'Optimizes one box (revenue) and pushes cost into others — the local-optimization trap the brief warns about [[VC How to run]].',
    },
    {
      id: 'c9',
      level: 'Action',
      q: 'You’re Aldi’s CEO. Which of the three proposals do you fund — in-house delivery, the second size, or density vs. ten new states?',
      model: 'Fund **density in existing trade areas** first: it feeds the scale links (volume per SKU, DC density) without adding refusal costs. Keep delivery with intermediaries for now — in-house delivery “makes obvious sense for a broad leader and dubious sense for a focused one.” Reject the second size [[Aldi]]. Principle: **broad in footprint, narrow in assortment and refusals**.',
      weak: 'Do all three — they all grow the business.',
      whyWeak: 'A strategy that refuses nothing isn’t a position (Porter’s trade-off test); it’s how firms drift into the middle [[Porter §7]].',
    },
    {
      id: 'c10',
      level: 'Action',
      q: 'Little Caesars cut costs everywhere. Would you buy a Little Caesars franchise?',
      model: 'Not on cost alone. The chain deleted drivers, order-taking and counter labor, but **the franchisor kept much of the saving**: 11% fee load vs. Domino’s 9.5%, a $446.5k minimum buildout vs. $107.5k, and a mandatory distributor with no disclosed profit share — on ~$950k sales per store vs. Domino’s $1,385k [[VC Ex.3]]. “A value chain analysis tells you where the cost went out. It does not tell you who kept it.”',
      weak: 'Yes — they’re the value leader with the lowest costs.',
      whyWeak: 'Answers “where did cost go out” and skips “who kept it.”',
    },
  ],
  devil: {
    argument:
      'Aldi’s advantage is really just scale and buying power. With ~12,000–13,000 stores worldwide and huge volume per SKU, any big enough grocer — Walmart — could match it, so it isn’t structural at all.',
    response:
      'Three facts break that. (1) **Walmart is far bigger and still prices above Aldi** (100 vs. 91.7) [[S8 slides 2]]. (2) Aldi’s volume per SKU comes from the **assortment decision**, not company size — the same reason Costco wins with <4,000 SKUs. (3) The biggest bars in the professor’s waterfall are **private label and store labor**, both downstream of the narrow range and no-frills operating system, not of total size [[S8 slides 3]]. Concede the part that’s true: procurement leverage is a scale effect and it grows with breadth — which is exactly why footprint expansion is safe and assortment expansion isn’t.',
    probes: [
      'If it’s structural, why did Lidl struggle when it copied the format?',
      'Which bars would a Walmart-sized grocer capture just by being big?',
      'What evidence would prove the advantage is mostly scale after all?',
    ],
  },
  pyramid: {
    prompt:
      'Aldi’s board asks: **Should Aldi pursue broad cost leadership or stay a focused discounter?** Write the SCQA and a supporting pyramid (inductive or combined). Use the value chain as your major premise or your grouping logic.',
    model: {
      structure: 'combined',
      s: 'Aldi built the US’s lowest-price grocer on a narrow, interlocking cost system — ~1,400–2,000 SKUs, ~90% private label, small boxes, lean crews — and now reaches a third of US households across 40 states [[Aldi]].',
      c: 'Growth is pulling it toward breadth — Winn-Dixie conversions, delivery partnerships, a digital storefront, and a proposed second size in 20 categories — and every addition re-adds cost the model was built to delete [[Aldi]].',
      q: 'Should Aldi become a broad cost leader or stay a focused discounter?',
      a: 'Aldi should go broad in footprint but stay narrow in assortment and service, because most of its ~20-point cost gap sits in links that scale with stores but collapse if the range widens.',
      supports: [
        { label: 'Major premise', point: 'A cost advantage survives growth only if it lives in links that scale (procurement, process) rather than in activities breadth forces back in (refusals) [[Aldi]].', evidence: ['Scale/process links travel; refusals vanish when the activity returns [[Aldi]]'] },
        { label: 'Minor premise', point: 'Aldi’s gap is mostly scale/process links that depend on the narrow range, with only a small share in pure refusals [[S8 slides 3]].', evidence: ['Private label 5 + store labor 5 of ~20 points', 'Refusals (marketing, customer-borne) ≈ 1.2 points', 'Assortment, labor, front end ≈ 8.25 points depend on staying narrow'] },
        { label: 'Therefore', point: 'Add stores and density (they feed volume per SKU) but refuse range expansion and in-house delivery (they attack the links the gap rests on).', evidence: ['Fund density; keep intermediaries for delivery; reject the second size [[Aldi]]'] },
      ],
      competing:
        '“Go fully broad to beat Walmart for the weekly shop.” It fails on its own terms: winning the full basket requires national brands, one-stop completeness and service — exactly the activities whose absence creates the gap; and in a price war fought on Walmart’s terms (breadth), Walmart wins [[Aldi]].',
      memo: 'A combined structure fits because the decision turns on one causal premise — where the cost advantage lives — which needs a deductive spine; each premise needs evidence from the waterfall and the case to be believed.',
    },
  },
  checkIds: ['S07-q01', 'S07-q02', 'S07-q04', 'S07-q06', 'S07-q08', 'S07-q10', 'S07-q12', 'S07-q14', 'S07-q17', 'S07-q20'],
  bank: [
    Q({ id: 'S07-q01', kind: 'concept', src: 'VC', stem: 'According to the Value Chain brief, what was radical about Porter’s 1985 proposal?', correct: 1, options: [
      { text: 'That firms should outsource all support activities.', why: 'The brief never says this; make-or-buy is step 5, decided deliberately, not a blanket rule.' },
      { text: 'That a firm has no costs — activities have costs — so advantage is won or lost activity by activity.', why: 'This is the brief’s core claim: “a firm has no costs. Activities the firm does have costs.”' },
      { text: 'That margin is determined by industry structure, not by the firm.', why: 'That’s closer to Five Forces; the value chain looks inside the firm.' },
      { text: 'That cost advantage always comes from scale.', why: 'The brief warns against assuming scale — go through all ten drivers.' },
    ] }),
    Q({ id: 'S07-q02', kind: 'concept', src: 'VC', stem: 'When should you STOP splitting an activity into smaller pieces?', correct: 2, options: [
      { text: 'When you reach Porter’s nine generic categories.', why: 'The nine are “a starting point, not an answer.”' },
      { text: 'When each piece has its own manager.', why: 'Org charts aren’t the test; economics are.' },
      { text: 'When the parts no longer differ in cost drivers, assets, or effect on what the buyer will pay.', why: 'Keep splitting while parts have different economics; stop when they don’t.' },
      { text: 'When the activity is less than 5% of total cost.', why: 'Small but fast-growing or buyer-visible activities can matter; there’s no size cutoff in the brief.' },
    ] }),
    Q({ id: 'S07-q03', kind: 'concept', src: 'VC', stem: 'Which statement BEST describes a “linkage”?', correct: 0, options: [
      { text: 'The cost or effectiveness of one activity depends on how another is performed.', why: 'That’s the brief’s definition (more inspection → less rework).' },
      { text: 'Two firms sharing a supplier.', why: 'That’s a shared input, not an internal dependency between activities.' },
      { text: 'A contract between a firm and its distributor.', why: 'Vertical linkages to channels exist, but the concept is the cost dependency, not the contract.' },
      { text: 'The margin wedge at the end of the chain.', why: 'Margin is the result, not a linkage.' },
    ] }),
    Q({ id: 'S07-q04', kind: 'apply', src: 'VC', stem: '**Harbor Dental** (fictional) cuts hygienist hours 15% to save money. Six months later, rework appointments and patient complaints have risen, and front-desk overtime is up. In value chain terms, what happened?', correct: 3, options: [
      { text: 'The firm hit minimum efficient scale.', why: 'Nothing here is about volume and average cost.' },
      { text: 'Supplier power increased.', why: 'No supplier is involved.' },
      { text: 'The firm deleted an activity, the most reliable cost cut.', why: 'It performed an activity more cheaply, not deleted it — and the savings leaked elsewhere.' },
      { text: 'A local optimization pushed cost into linked activities (rework, front desk).', why: 'Step 4: look for “local optimizations that push cost downstream.” The cut saved in one box and cost more in linked boxes.' },
    ] }),
    Q({ id: 'S07-q05', kind: 'concept', src: 'VC Little Caesars', stem: 'Why does the brief call DELETING an activity the most reliable cost reduction?', correct: 1, options: [
      { text: 'Because deleted activities never had any value to buyers.', why: 'Deletion can remove something buyers valued (Aldi’s ~3% share is the price of deleted conveniences) — the point is about rivals.' },
      { text: 'Because performing an activity more cheaply invites the rival to respond, while removing it changes the system.', why: 'Direct from the brief: “the alternative — performing it more cheaply than a rival — invites the rival to respond.”' },
      { text: 'Because it always raises willingness to pay.', why: 'Deletion usually lowers WTP somewhat; that’s the trade-off.' },
      { text: 'Because it shifts cost to suppliers.', why: 'That’s a different move (and not what deletion means).' },
    ] }),
    Q({ id: 'S07-q06', kind: 'case', src: 'VC Little Caesars', stem: 'Little Caesars’ made-ahead pizza works only with a narrow menu, a narrow menu only works at a low price, and a low price only works with high throughput per labor hour. This is an example of…', correct: 2, options: [
      { text: 'Economies of scope.', why: 'Scope is about producing more DIFFERENT products; this is about fewer.' },
      { text: 'Supplier bargaining power.', why: 'The chain described is internal activities, not suppliers.' },
      { text: 'Linkages — pull out any one and the others stop making sense, which is why “just sell a cheaper pizza” fails for rivals.', why: 'The brief: “That is a chain in Porter’s sense.”' },
      { text: 'Operational effectiveness.', why: 'OE is imitable best practice; this is a set of mutually reinforcing choices.' },
    ] }),
    Q({ id: 'S07-q07', kind: 'case', src: 'VC Ex.3', stem: 'Which fact BEST supports the brief’s claim that “a value chain analysis tells you where the cost went out; it does not tell you who kept it”?', correct: 0, options: [
      { text: 'Little Caesars franchisees pay an 11% fee load and a $446.5k minimum buildout (vs. Domino’s 9.5% and $107.5k), with a mandatory supplier.', why: 'The savings were partly captured by the franchisor through fees and mandatory supply.' },
      { text: 'Little Caesars launched a $9.99 online-only value menu.', why: 'That’s about the price advantage narrowing, not who kept the savings.' },
      { text: 'The Pizza Portal lets customers skip the counter.', why: 'That’s where cost went out, not who kept it.' },
      { text: 'Little Caesars scored 78 on the ACSI.', why: 'Satisfaction data, not savings capture.' },
    ] }),
    Q({ id: 'S07-q08', kind: 'concept', src: 'Aldi', stem: 'In the Aldi case, a “refusal-based” cost advantage is one that…', correct: 3, options: [
      { text: 'grows as the firm adds stores.', why: 'That describes scale-based links like procurement.' },
      { text: 'comes from paying suppliers less.', why: 'That’s bargaining power.' },
      { text: 'comes from superior labor productivity.', why: 'That’s a process advantage.' },
      { text: 'comes from not performing an activity at all, and disappears the moment breadth obliges the firm to perform it.', why: 'The case: refusals (no services, no advertising, no delivery) vanish when breadth forces the activity back in.' },
    ] }),
    Q({ id: 'S07-q09', kind: 'case', src: 'Aldi Ex.3', stem: 'Which Aldi value-chain link does the case classify as SCALE/bargaining power?', correct: 0, options: [
      { text: 'Procurement — huge volume per SKU concentrated on few suppliers.', why: 'Exhibit 3: procurement = scale / bargaining power; it grows with breadth.' },
      { text: 'Marketing & sales — weekly flyer only.', why: 'Classified as refusal.' },
      { text: 'Service — no pharmacy, deli or bagging.', why: 'Refusal.' },
      { text: 'Technology — minimal historically.', why: 'Refusal, now partly re-added.' },
    ] }),
    Q({ id: 'S07-q10', kind: 'quant', src: 'S8 slides 3', stem: 'On the professor’s waterfall (conventional = 100), assortment 2.5, private label 5, logistics 1.5, real estate 1.5, store labor 5, replenishment 0.75, front end 0.75, shrink 1.25, marketing 0.75, overhead 0.75, customer-borne 0.45. What is the built total, and how does it compare with the observed gap?', correct: 1, options: [
      { text: '18.5 — below the observed 20.1, so part of the gap is unexplained.', why: 'Re-add: the eleven segments sum to 20.2.' },
      { text: '20.2 vs. an observed 20.1 — a plausibility check, not an independent validation.', why: 'Correct sum; the slide’s own caveat is that agreement isn’t validation.' },
      { text: '22.0 — Aldi’s like-for-like gap vs. competitor private label.', why: '22% is the speaker-note figure for Aldi’s own like-for-like study, not the waterfall total.' },
      { text: '36 — the gap in Aldi’s commissioned study.', why: '36% compares Aldi private label to national brands — an assortment comparison, per the notes.' },
    ] }),
    Q({ id: 'S07-q11', kind: 'quant', src: 'S8 slides 2-3', stem: 'Consumer Reports puts Aldi at 91.7 and Kroger at 114.8 (Walmart = 100). Re-indexed so Kroger = 100, Aldi is about…', correct: 2, options: [
      { text: '91.7', why: 'That’s Aldi relative to Walmart, not Kroger.' },
      { text: '85.2', why: 'Check: 91.7 ÷ 114.8 = 0.799.' },
      { text: '79.9', why: '91.7 ÷ 114.8 × 100 = 79.9 — the slide’s “Aldi at 79.9 with Kroger at 100.”' },
      { text: '76.9', why: 'Arithmetic slip — recompute 91.7/114.8.' },
    ] }),
    Q({ id: 'S07-q12', kind: 'apply', src: 'Aldi', stem: '**PennyMart** (fictional hard discounter) wants to add home delivery, a pharmacy and a 2,000-item expansion to “win the weekly shop.” Using the Aldi logic, the biggest risk is that…', correct: 0, options: [
      { text: 'each addition re-adds cost from activities its model was built to refuse, eroding the gap one reasonable step at a time.', why: 'The case: “what looks like scaling up is actually the slow disassembly of the machine, one reasonable-sounding addition at a time.”' },
      { text: 'it will lose supplier bargaining power as volume rises.', why: 'Volume growth increases, not decreases, bargaining power.' },
      { text: 'regulators will block it.', why: 'Nothing in the scenario raises antitrust issues.' },
      { text: 'it will hit diseconomies of scope immediately.', why: 'Not the mechanism the case emphasizes; the issue is refusals reversing.' },
    ] }),
    Q({ id: 'S07-q13', kind: 'case', src: 'Porter §3', stem: 'The Porter paper notes Aldi has held the lowest US grocery prices for decades yet holds only ~3% of grocery spending. What does the paper say that number measures?', correct: 3, options: [
      { text: 'Aldi’s failure to advertise.', why: 'The paper’s point is broader than advertising.' },
      { text: 'Walmart’s retaliation.', why: 'Not the paper’s interpretation.' },
      { text: 'Aldi’s scale ceiling.', why: 'A scale ceiling is a different failure mode.' },
      { text: 'The market’s estimate of what the deleted conveniences were worth — cost leadership cutting into willingness to pay.', why: 'Exactly the paper’s framing of the fourth (most insidious) cost-leadership failure.' },
    ] }),
    Q({ id: 'S07-q14', kind: 'concept', src: 'VC Profit pools', stem: 'How does a profit pool map differ from a value chain analysis?', correct: 2, options: [
      { text: 'It uses revenue instead of cost.', why: 'It explicitly uses PROFIT, and warns profit concentration differs from revenue concentration.' },
      { text: 'It is built from the firm’s own general ledger.', why: 'That’s the value chain; the pool is built from industry filings.' },
      { text: 'It shows where everyone’s profits sit along the industry chain — a positioning instrument, asking whether you stand in the right part of the chain at all.', why: 'The brief: value chain = efficiency instrument; profit pool = positioning instrument.' },
      { text: 'It only applies to manufacturing industries.', why: 'Examples include dealerships, airlines, hotels and coffee.' },
    ] }),
    Q({ id: 'S07-q15', kind: 'quant', src: 'VC Profit pools', stem: 'AutoNation 2025: new vehicles are 48.9% of revenue and 13.4% of gross profit; parts & service are 17.5% of revenue and 47.6% of gross profit. Which conclusion follows?', correct: 1, options: [
      { text: 'New vehicles are the dealership’s profit engine.', why: 'They’re the largest revenue line but a small share of profit.' },
      { text: 'Parts & service earns ~2.7x its revenue share in profit; new cars are a wide, flat (big but poor) block.', why: '47.6 ÷ 17.5 ≈ 2.7; that’s the profit-pool insight.' },
      { text: 'The dealership should exit parts & service.', why: 'The opposite — that’s where the money is.' },
      { text: 'Revenue share and profit share are roughly proportional.', why: 'They diverge sharply — the point of the example.' },
    ] }),
    Q({ id: 'S07-q16', kind: 'case', src: 'VC Profit pools', stem: 'Delta’s 2025 American Express remuneration was $8.2B — 12.9% of revenue and 141% of operating income. What does the brief use this to show?', correct: 0, options: [
      { text: 'That an airline’s profit pool sits largely in a card partnership, not in flying airplanes.', why: '“A company that flies airplanes… took in more from a card partnership than it earned, net, from everything it does.”' },
      { text: 'That Delta has supplier power over Amex.', why: 'The point is where profit sits, not bargaining power.' },
      { text: 'That Delta is stuck in the middle.', why: 'Not the brief’s claim.' },
      { text: 'That loyalty programs reduce cost.', why: 'They generate revenue/profit; not a cost claim.' },
    ] }),
    Q({ id: 'S07-q17', kind: 'apply', src: 'VC Own one link', stem: '**LensWorks** (fictional) makes a coating machine every smartphone-camera maker needs; it is the only supplier and has bought a stake in its key optics supplier. Which value-chain strategy is this?', correct: 3, options: [
      { text: 'Cost leadership through deletion.', why: 'Nothing is deleted; it dominates a single activity.' },
      { text: 'Refusal-based advantage.', why: 'Refusal means not performing an activity.' },
      { text: 'A profit pool positioned in the widest block.', why: 'Owning one chokepoint is usually a narrow, rich block, not the widest.' },
      { text: 'Owning one link — performing one activity so far beyond anyone that the industry must come to you (the ASML pattern, including buying “the chokepoint inside the chokepoint”).', why: 'Mirrors ASML’s 24.9% Zeiss SMT stake.' },
    ] }),
    Q({ id: 'S07-q18', kind: 'case', src: 'VC Own one link', stem: 'What created TSMC’s position, according to the brief?', correct: 2, options: [
      { text: 'Lower labor costs in Taiwan.', why: 'Not the brief’s mechanism.' },
      { text: 'Patents on EUV lithography.', why: 'That’s ASML.' },
      { text: 'A promise — never to compete with its customers — which let chip designers shed their fabs and concentrated leading-edge demand in one queue.', why: '“What created the position was a promise rather than a technology.”' },
      { text: 'Government subsidies.', why: 'Not cited.' },
    ] }),
    Q({ id: 'S07-q19', kind: 'concept', src: 'VC How to run', stem: 'An analyst concludes a bakery’s high delivery cost is “because of scale.” Which step of the brief’s method did she skip?', correct: 1, options: [
      { text: 'Disaggregating activities.', why: 'She may have disaggregated; the error is assuming the driver.' },
      { text: 'Asking what drives cost in each box using all ten drivers — it might be location, capacity utilization, or a policy someone set in 1998.', why: 'Step 3: “go through them one at a time rather than assuming scale is the answer.”' },
      { text: 'Deciding make vs. buy.', why: 'That comes after diagnosing the driver.' },
      { text: 'Mapping the profit pool.', why: 'A different instrument.' },
    ] }),
    Q({ id: 'S07-q20', kind: 'apply', src: 'S8 slides 37', stem: 'Which comparison is right?', correct: 0, options: [
      { text: 'Aldi’s advantage is structural (a single store embodies most of it); Netflix’s is scale (the advantage IS the subscriber base).', why: 'The S8 synthesis slide contrasts them exactly this way.' },
      { text: 'Both are scale advantages.', why: 'Aldi’s scale-dependence is “modest.”' },
      { text: 'Aldi’s is a network effect; Netflix’s is structural.', why: 'Neither is a network effect, per the slide.' },
      { text: 'Both leak mainly through suppliers repricing inputs.', why: 'That’s Netflix; Aldi leaks through model drift and format copying.' },
    ] }),
    Q({ id: 'S07-q21', kind: 'case', src: 'Aldi', stem: 'Proponents of scaling cite Costco and Southwest. What is their argument?', correct: 3, options: [
      { text: 'Both expanded into premium services.', why: 'The argument is about staying limited.' },
      { text: 'Both acquired competitors to grow.', why: 'Not the argument.' },
      { text: 'Both are focus strategies.', why: 'The argument is that they are NOT niche players.' },
      { text: 'A limited range is not narrow scope but the mechanism of cost leadership — you can serve broad demand while declining to serve broad variety.', why: 'The case: “nobody calls Costco a niche player.”' },
    ] }),
    Q({ id: 'S07-q22', kind: 'concept', src: 'S7 slides 4', stem: 'Saudi conventional crude costs about $5.40 a barrel to produce vs. about $72 for Alberta oil sands. In the S7 deck this illustrates which source of cost advantage?', correct: 2, options: [
      { text: 'Learning and experience.', why: 'No cumulative-volume effect is involved.' },
      { text: 'Proprietary knowledge.', why: 'It’s geology, not secret know-how.' },
      { text: 'Lower input costs — preferred access to inputs.', why: 'Slide 20: “Preferred Access to Inputs (Conventional Drilling vs. Oil Sands).”' },
      { text: 'Different business model.', why: 'Same business, different resource access.' },
    ] }),
  ],
  shorts: [
    { id: 'S07-sa1', session: 'S07', src: 'VC', prompt: 'In two or three sentences: why are value chains hard to copy even though most activities are observable?', model: 'Rivals can observe any single activity — layouts, prices, job postings — but not the **linkages**: which activity is subsidizing which. A system of mutually reinforcing choices can’t be copied piecemeal, so copying one element gets you nothing.', points: ['Activities are observable', 'Linkages are not', 'Piecemeal copying fails'] },
    { id: 'S07-sa2', session: 'S07', src: 'Aldi', prompt: 'Explain the difference between a scale/process cost advantage and a refusal-based one, and why it matters for a growing firm.', model: 'Scale/process advantages (procurement leverage, labor productivity) travel and often compound as the firm grows; refusal advantages come from not performing an activity and disappear when breadth forces the activity back in. For a growing firm, the composition of the gap decides whether growth extends the advantage or dismantles it.', points: ['Scale/process travels or compounds', 'Refusal disappears with breadth', 'Composition decides whether growth is safe'] },
    { id: 'S07-sa3', session: 'S07', src: 'VC Ex.3', prompt: 'Little Caesars removed drivers, order-taking and counter labor. Give one piece of evidence that the savings did not all reach the franchisee or customer.', model: 'Franchisees pay an 11% fee load (6% royalty + 5% ad fund) vs. 9.5% at Domino’s, face a $446.5k minimum buildout vs. $107.5k, and must buy from Blue Line with no disclosed profit share — the franchisor captured part of the saving.', points: ['Names a fee/buildout/mandatory-supply number', 'Connects it to who kept the savings'] },
    { id: 'S07-sa4', session: 'S07', src: 'VC Profit pools', prompt: 'What is a profit pool, and why is it a positioning tool rather than an efficiency tool?', model: 'The total profit earned at every point along an industry’s value chain. It’s built from industry filings and shows where everyone’s profits sit — so it asks whether you’re standing in the right part of the chain, not how to perform your activity better.', points: ['Profit at every point in the industry chain', 'Built from industry data', 'Asks where to stand, not how to perform'] },
  ],
  written: {
    prompt: '**Timed case write-up (20 min).** Aldi’s CFO says: “Our cost advantage is just buying power — so expanding the assortment to win the weekly shop is safe.” Write a structured response (SCQA + three supports) that uses the value chain to accept or reject her claim.',
    minutes: 20,
    model: 'Reject the claim. **Answer:** Expanding the assortment is unsafe because most of Aldi’s ~20-point gap rests on links that depend on the narrow range, not on buying power alone. **Supports:** (1) Buying power is real but downstream of assortment — volume per SKU exists because there are few SKUs; Walmart is bigger and still prices above Aldi (100 vs. 91.7). (2) The two largest bars, private label (5) and store labor (5), plus assortment (2.5) and front end (0.75), weaken as the range widens — ~13 of ~20 points. (3) The refusals are small (~1.2 points), so footprint growth is affordable — grow stores, not SKUs. **Competing view:** a fuller range lifts basket size — true, but it trades a structural advantage for revenue Walmart can contest on its own terms.',
    rubric: ['One-sentence Answer that accepts or rejects the claim', 'Uses link-by-link evidence (waterfall numbers)', 'Distinguishes scale/process vs. refusal vs. assortment-dependent', 'Addresses the competing view fairly', 'Clean SCQA + MECE supports'],
  },
  oral: {
    prompt: 'Explain where Aldi’s price gap comes from and what kind of advantage it creates — then defend it.',
    probes: [
      'What evidence supports that split across links?',
      'Is that structural, or just operational effectiveness a rival could copy?',
      'Walmart is bigger. Why can’t it match Aldi?',
      'Which part of the advantage would breadth destroy first?',
      'Who keeps the savings — Aldi, its customers, or its suppliers?',
    ],
  },
  summary: {
    answer:
      'A structural cost advantage comes from a linked system of activity choices — what you delete, simplify and link — that rivals can see but can’t copy piecemeal. Aldi’s ~20-point gap is mostly private label and store labor, both downstream of a narrow assortment, so Aldi can go broad in footprint but not in range.',
    numbers: [
      { label: 'Aldi vs. Kroger (Kroger = 100)', value: '79.9', src: 'S8 slides 3' },
      { label: 'Professor’s built gap vs. observed', value: '20.2 vs. 20.1', src: 'S8 slides 3' },
      { label: 'Private label + store labor', value: '10 of 20.2 points', src: 'S8 slides 3' },
      { label: 'SKUs: Aldi vs. conventional', value: '~1,400–2,000 vs. 30,000–40,000+', src: 'Aldi Ex.4' },
      { label: 'Private label share', value: '~90% vs. ~20–25%', src: 'Aldi Ex.4' },
      { label: 'Little Caesars fee load', value: '11% vs. Domino’s 9.5%', src: 'VC Ex.3' },
      { label: 'AutoNation P&S + F&I', value: '22.8% of sales → 77.2% of gross profit', src: 'VC Profit pools' },
    ],
    frameworkBullets: [
      'Nine activities: 5 primary + 4 support; margin = WTP − cost of all activities',
      'Split until economics differ; cost + asset per box; ten drivers; work the linkages; own/buy/ride',
      'Deleting beats doing cheaper; ask who kept the savings',
      'Own one link (ASML, TSMC, YKK, Amazon, Ritz-Carlton)',
      'Profit pool: where profit sits ≠ where revenue sits',
    ],
    caseBullets: [
      'Aldi began as cost focus; now broad in footprint, narrow in assortment',
      'Scale/process links travel; refusals vanish with breadth',
      'Biggest bars depend on the narrow range → protect assortment, add density',
    ],
  },
  crossLinks402: [{ topic: 'Cost structure and per-unit cost', note: 'STRAT 402 treats fixed/variable cost and average cost curves quantitatively (S06 Cost & Economies of Scale). 401 locates cost in activities.', href: '#/learn/S06' }],
}
