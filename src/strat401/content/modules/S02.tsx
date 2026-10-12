import { DataTable } from '../../components/Charts'
import { Cite } from '../../components/Cite'
import { PyramidBuilder } from '../../components/PyramidBuilder'
import { LogicDrill } from '../../widgets/LogicDrill'
import type { Mcq, ModuleDef } from '../types'

function Hourglass() {
  return (
    <figure className="card p-3 space-y-2">
      <figcaption className="font-semibold">
        The two-pyramid (hourglass) model <Cite tag="Minto §2" />
      </figcaption>
      <div className="mx-auto max-w-md text-center text-sm space-y-1">
        <div className="rounded p-2 surface-2" style={{ clipPath: 'polygon(0 0,100% 0,92% 100%,8% 100%)' }}>SITUATION — what the reader already accepts</div>
        <div className="rounded p-2 surface-2 mx-[8%]" style={{ clipPath: 'polygon(0 0,100% 0,91% 100%,9% 100%)' }}>COMPLICATION — what changed</div>
        <div className="rounded p-2 surface-2 mx-[16%]" style={{ clipPath: 'polygon(0 0,100% 0,89% 100%,11% 100%)' }}>QUESTION — one, sharp</div>
        <div className="rounded p-2 font-bold mx-[22%]" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>
          ANSWER — the hinge: one declarative, falsifiable sentence
        </div>
        <div className="rounded p-2 surface-2 mx-[16%]" style={{ clipPath: 'polygon(11% 0,89% 0,100% 100%,0 100%)' }}>Key line: premises or parallel reasons</div>
        <div className="rounded p-2 surface-2 mx-[8%]" style={{ clipPath: 'polygon(9% 0,91% 0,100% 100%,0 100%)' }}>Evidence under each one</div>
        <div className="grid grid-cols-2 gap-1 text-xs pt-1">
          <div className="card p-2 text-left"><strong>Deductive:</strong> major premise → minor premise → therefore. The second point comments on the first. Reject one link and it all falls.</div>
          <div className="card p-2 text-left"><strong>Inductive:</strong> parallel, MECE reasons of the same kind. Drop one and the conclusion mostly stands.</div>
        </div>
      </div>
      <p className="text-xs muted">If the sentence that ends the introduction and the sentence that heads the support are not the same, the argument is broken.</p>
    </figure>
  )
}

function Exhibits() {
  return (
    <div className="space-y-4">
      <DataTable
        caption={<>The three worked examples <Cite tag="Minto §3" /></>}
        head={['Example', 'Structure', 'Answer', 'What it teaches']}
        rows={[
          ['Granite Peak Outfitters ($40M premium outdoor)', 'Deductive', 'Decline the 900-store big-box deal; reinvest in DTC', 'Two premises force the answer; evidence under each (DTC margin ~62% vs. wholesale ~31%; 68% repeat; ~35% premium); name the weakest link'],
          ['Aldridge Components ($600M, EBIT 14%→8%)', 'Inductive', 'Reject the activist’s break-up; operational turnaround', 'Three parallel reasons — scale, technology, timing — all “value destroyed by separating now”'],
          ['Helios Mobility ($2.5B telematics)', 'Combined + competing answer', 'Cannibalize hardware; become the OEM-neutral data-and-software platform', 'Deductive spine, inductive evidence under each premise; “defend hardware” dismantled on three pillars'],
        ]}
      />
      <DataTable
        caption={<>The grading rubric (100 points) <Cite tag="Minto Asg §5" /></>}
        head={['Criterion', 'What earns the points', 'Pts']}
        rows={[
          ['SCQA quality', 'Uncontested Situation; real tension; sharp, singular Question; one declarative, falsifiable Answer', '20'],
          ['Logical validity', 'Chains follow; groups are parallel; structure fits the problem', '20'],
          ['MECE groupings', 'No overlaps or gaps; same logical type', '15'],
          ['“So what” / synthesis', 'Every group rolls up; the Answer is the inevitable summary', '15'],
          ['Evidence', 'At least one level of concrete support; figures test the argument', '10'],
          ['Competing answer (C)', 'Strongest alternative stated fairly and dismantled on its own terms', '10'],
          ['Reasoning memo & writing', 'Justifies the structural choice; clear, labeled prose', '10'],
        ]}
      />
      <DataTable
        caption={<>What the Answer Key rewarded <Cite tag="Minto Key" /></>}
        head={['Scenario', 'Model answer', 'Full marks require', 'Red flags']}
        rows={[
          ['A · Tessera (deductive)', 'Yes — hybrid base + usage pricing, managed transition', 'Valid major → minor → therefore; weak premise named and defended; churn/predictability risk managed', 'Pros/cons list; ignoring transition risk; topic Answer; decorative evidence'],
          ['B · Verdant (inductive)', 'Stay in North America and deepen (Europe also defensible)', 'Three parallel, non-overlapping reasons + a summarizing thought; Europe answers must confront the capability gap and price war head-on', 'Mixed reason types; one reason restated; “do both”; no so-what'],
          ['C · Atlas (combined)', 'Build AI products on its corpora with a capability partner', 'Valid spine with inductive groups; fair teardown of the strongest faction (license for cash)', 'Ignoring factions; straw-man alternative; single-level argument; hedging across options'],
        ]}
      />
      <figure className="card p-3 space-y-2">
        <figcaption className="font-semibold">Logic trees from the slides <Cite tag="S2 slides 11-13" /></figcaption>
        <div className="grid gap-2 md:grid-cols-2 text-sm">
          <div className="surface-2 rounded p-2">
            <strong>Profitability tree:</strong> Profit = Sales − Costs. Sales = Σ products (unit price × unit volume). Costs = production (R&D, labor, COGS, plant) + distribution + SG&A (marketing, selling, overhead). Alternative cut: fixed vs. variable when the question is operating leverage.
          </div>
          <div className="surface-2 rounded p-2">
            <strong>Market sizing (US ice cream):</strong> Market = grocery/convenience channel + ice-cream shops/restaurants channel; each = price × volume; volume = population × % who buy × frequency × volume per purchase. Split by channel first when price and frequency differ.
          </div>
        </div>
        <p className="text-xs muted">Every join is an arithmetic operator; identities (price × volume) are always true, but “prices are dropping” is a hypothesis to test.</p>
      </figure>
    </div>
  )
}

const Q = (o: Omit<Mcq, 'session'>): Mcq => ({ ...o, session: 'S02' })

export const S02: ModuleDef = {
  id: 'S02',
  short: 'Minto Pyramid',
  framework: {
    oneLiner: 'Lead with **one answer** — a complete, declarative, falsifiable sentence — introduced by **SCQA** and proved underneath by a **deductive chain** or an **inductive MECE group**, with the strongest competing answer defeated [[Minto §1-2]].',
    analogy: 'Think of a GPS. It doesn’t narrate every street before telling you where you’re going; it states the destination, then the turns. SCQA is “here’s where we are and why we have to move”; the Answer is the destination; the pyramid is the turn-by-turn route that proves you’ll get there.',
    intuition: [
      'Readers hold only a few ideas at once, so **lead with the conclusion** and then give support — never the reverse [[Minto intro]].',
      'The **top pyramid is inverted**: Situation (uncontested), Complication (what changed), Question (one, sharp), Answer. Its job isn’t to prove anything — it makes the reader feel the question is the right one [[Minto §2]].',
      'The **bottom pyramid is upright**: the same Answer becomes the governing thought, proved by premises or reasons with evidence beneath [[Minto §2]].',
      '**Deduction** (major premise → minor premise → therefore) is powerful but fragile: reject one link and it all falls — so name and defend the weakest link. **Induction** (parallel MECE reasons) is robust: drop one and it mostly stands [[Minto §2]].',
      'Complex problems use a **deductive spine with inductive evidence under each premise** — and must beat the strongest **competing answer** on its own terms [[Minto §2-3]].',
      '**What is a theory?** In this course, a testable causal claim — a major premise about the world (“durable SaaS growth requires a value-aligned price metric”). Every framework you learn is a theory you apply deductively to a case [[Minto Key A]].',
    ],
    howToRun: [
      '**1. Name the decision** and write the Question narrowly — one question mark, no “if so…” [[Minto §2]] [[Minto Asg §5]].',
      '**2. Write the Answer first** as one sentence that a skeptic could prove wrong; include “because…” [[Minto Key]].',
      '**3. Choose the structure:** one causal crux → deductive; several independent considerations → inductive; contested, high-stakes → combined + competing answer [[Minto Key]].',
      '**4. Build the supports:** deductive — major, minor, therefore; inductive — 3 reasons of the same kind, then the summarizing “so what” [[Minto §2]].',
      '**5. Put evidence under every support** — numbers that test the claim, not decorate it [[Minto Asg §6]].',
      '**6. Run the four tests:** single governing thought; MECE; valid logic; so what [[Minto §2]].',
      '**7. State the strongest competing answer** fairly and dismantle it on its own terms [[Minto §3]].',
    ],
    recall: [
      { id: 'S02-scqa', title: 'SCQA', prompt: 'Name the four parts and the job of each.', items: [{ name: 'Situation', hint: 'common ground nobody disputes' }, { name: 'Complication', hint: 'what changed; creates the need to act' }, { name: 'Question', hint: 'explicit and narrow' }, { name: 'Answer', hint: 'one complete, declarative, falsifiable sentence' }], src: 'Minto §2' },
      { id: 'S02-tests', title: 'The four quality tests', prompt: 'Every pyramid must pass…', items: [{ name: 'Single governing thought' }, { name: 'MECE groupings' }, { name: 'Valid logic' }, { name: '“So what?”' }], src: 'Minto §2' },
      { id: 'S02-pitfalls', title: 'Six common pitfalls', prompt: 'From the assignment.', items: [{ name: 'Topic instead of thought' }, { name: 'Complication with no tension' }, { name: 'Mixed groups' }, { name: 'Deduction with a hidden weak link' }, { name: 'Ignoring the alternative' }, { name: 'Evidence as decoration' }], src: 'Minto Asg §6' },
      { id: 'S02-rubric', title: 'The rubric (7 criteria)', prompt: 'What the graders score.', items: [{ name: 'SCQA quality (20)' }, { name: 'Logical validity (20)' }, { name: 'MECE groupings (15)' }, { name: '“So what” / synthesis (15)' }, { name: 'Evidence (10)' }, { name: 'Competing answer (10)' }, { name: 'Reasoning memo & writing (10)' }], src: 'Minto Asg §5' },
    ],
    diagram: Hourglass,
    variants: [
      {
        title: 'How the deduction/induction rule of thumb is stated',
        brief: 'The reading defines deduction as major premise → minor premise → “therefore,” and induction as parallel arguments of the same kind that must be **MECE** [[Minto §2]].',
        slides: 'The slide (from Minto’s book) gives a rule of thumb: “in deduction the second point comments on the first; in induction the points are separate but of the same kind,” with “Birds fly. I am a bird. Therefore I fly.” and a Poland-tourism example [[S2 slides 10]].',
        differ: 'Consistent, not contradictory. The slide’s version is a quick diagnostic for spotting which logic you’re reading; the reading adds the MECE discipline and the weakest-link warning.',
        guess: '**Guess:** the slide reproduces Minto’s original book figure; the reading is the professor’s own teaching note that layers on the course’s quality tests and rubric. Use the slide rule to diagnose, the reading’s tests to grade.',
      },
    ],
    newScenarios: [
      { prompt: '**Harbor Ferries** (fictional) asks: “Should we replace our oldest two boats now or in three years?” Which structure fits, and why?', answer: 'Probably **deductive**: the decision turns on one causal claim (e.g., “replacing boats pays when maintenance and downtime cost exceed the financing cost of new hulls”). Major premise = that rule; minor = Harbor’s numbers meet it; therefore = replace now. Name the weak link (maintenance forecast) and defend it [[Minto Key A]].' },
      { prompt: 'A teammate’s answer reads: “We should enter Canada for three reasons: the market is big, demand is large, and there are many customers.” What’s wrong?', answer: '**Not MECE** — three restatements of one idea (market size), and it ignores the real entry requirements (partner, price, approval). Exactly the in-class “Brazil (b)” error [[S2 slides 16]].' },
      { prompt: 'Your Question reads: “Should Pine Labs raise prices? If so, by how much and when?” Fix it.', answer: 'Make it **singular**: “Should Pine Labs raise list prices 8% at the January renewal?” — one question, one decision; how much and when belong in the Answer or the supports [[Minto §2]] [[Minto Asg §5]].' },
    ],
  },
  argument: {
    intro: 'Minto’s argument: clear writing is a by-product of clear thinking, and forcing an argument into pyramid form exposes gaps in logic, thin evidence and muddled conclusions before a reader sees them.',
    propositions: [
      '**Conclusion first, then support** — readers hold only a few ideas at once [[Minto intro]].',
      '**The Answer is the hinge:** the conclusion of SCQA and the apex of the support must be the same sentence [[Minto §2]].',
      '**A sharp question disciplines everything downstream;** a vague one produces vague analysis [[Minto §2]].',
      '**Choose the logic to fit the problem:** deductive for one causal crux, inductive for independent considerations, combined for contested decisions [[Minto Key]].',
      '**Deduction is only as strong as its most disputable premise** — name and defend it [[Minto Ex.1]].',
      '**Inductive groups must be the same type of claim** — slipping in a different type (“the CEO is new”) breaks parallelism [[Minto Ex.2]].',
      '**Beat the best alternative, not a straw man** [[Minto §3]].',
      '**You’re graded on structure and rigor, not on matching the key’s conclusion** [[Minto Key]].',
    ],
  },
  case: {
    protagonist: 'You, as the analyst writing for a board with “less time and more skepticism” than you [[Minto §1]].',
    decision: 'Three escalating scenarios — Tessera (pricing, deductive), Verdant (where to deploy $90M, inductive), Atlas (license, build or litigate against AI, combined + competing answer) — graded with the posted Answer Key [[Minto Asg §4]].',
    timeline: [
      { when: '1963', what: 'Barbara Minto, one of ~8 women in a 600-person HBS class, becomes McKinsey’s first female MBA consultant [[Minto intro]]' },
      { when: 'Later', what: 'Appointed McKinsey’s first specialist in writing and structured thinking (Europe)' },
      { when: '1973', what: 'Founds Minto International' },
      { when: '1985 / 1996', what: '*The Pyramid Principle* published; expanded as *The Minto Pyramid Principle*; coins MECE' },
    ],
    exhibits: Exhibits,
  },
  tool: {
    title: 'Pyramid Builder on fresh scenarios',
    intro: 'Two drills. First, sort arguments by logic and pick the best-built support (the professor’s in-class exercise plus new items). Then build full pyramids for three new scenarios written in the style of Tessera, Verdant and Atlas — your graded answers are never used as models.',
    render: () => (
      <div className="space-y-8">
        <LogicDrill
          items={[
            { id: 'S02-l1', text: 'Companies that depend on a single supplier are vulnerable to disruption. NorthBay depends on a single supplier. NorthBay is vulnerable to disruption.', answer: 'Deductive', why: 'A general rule plus a specific case forces the conclusion — a classic syllogism.', src: 'S2 slides 14-16' },
            { id: 'S02-l2', text: 'We should acquire the startup: it gives us the AI talent we lack, it removes a fast-growing competitor, and it adds a product our enterprise customers keep requesting.', answer: 'Inductive', why: 'Three independent, parallel reasons; drop one and the case mostly stands.', src: 'S2 slides 14-16' },
            { id: 'S02-l3', text: 'Our last four successful launches each began with a closed beta, a design-partner cohort, and a flagship reference customer. Our next launch should follow that same playbook.', answer: 'Inductive', why: 'Generalizes from observed instances to a rule — the signature of induction.', src: 'S2 slides 14-16' },
            { id: 'S02-l4', text: 'A price increase raises profit only if the added margin per unit outweighs the volume lost. Our 10% increase adds more margin than the forecast volume loss. Profits will increase.', answer: 'Deductive', why: 'A conditional rule plus a stated fact that the condition holds.', src: 'S2 slides 14-16' },
            { id: 'S02-l5', text: 'Three signs favor entering Germany now: demand is growing 20% a year, no incumbent dominates, and our existing EU distribution can serve it. On balance, Germany is the right next market.', answer: 'Inductive', why: 'Weight of evidence (“on balance”), not a forced chain.', src: 'S2 slides 14-16' },
            { id: 'S02-l6', text: 'Every premium brand that entered warehouse clubs lost pricing power within three years. Aurelia is a premium brand. If Aurelia enters warehouse clubs, it will lose pricing power.', answer: 'Deductive', why: 'Major premise (a claim about all premium brands), minor premise (Aurelia is one), therefore. Its weak link is the major premise.', src: 'Site' },
            { id: 'S02-l7', text: 'Customers praise our support team, our renewal rate rose eight points, and support tickets resolve 30% faster than last year. Our support investment is working.', answer: 'Inductive', why: 'Three parallel pieces of evidence summarized into one conclusion.', src: 'Site' },
          ]}
          best={[
            { id: 'S02-b1', claim: 'Discontinue MapleCo’s low-end product line.', src: 'S2 slides 15-16', options: [
              { text: 'It is unprofitable, it loses money, and its margins are negative.', tag: 'Not MECE', why: 'One point said three ways; ignores capacity and support effects.' },
              { text: 'It loses money per unit, ties up a third of factory capacity, and pulls support staff away from premium customers.', tag: 'Best', why: 'Three distinct, parallel, non-overlapping reasons.' },
              { text: 'Low-margin lines always hurt brands; this one is low-margin, so it hurts the brand — plus it annoys sales and uses a lot of plastic.', tag: 'Mixed logic', why: 'Opens deductively, then bolts on unrelated gripes.' },
            ] },
            { id: 'S02-b2', claim: 'Yes, enter the Brazilian market.', src: 'S2 slides 15-16', options: [
              { text: 'Firms with local partners succeed, and we have a partner. Demand is rising and our brand is known.', tag: 'Mixed logic', why: 'A deductive chain with inductive observations tacked on.' },
              { text: 'Brazil is a complex market with lots of segments, the market is large, and it has many customers.', tag: 'Not MECE', why: '“Big / large / many customers” restate one idea and miss the entry requirements.' },
              { text: 'Entry needs a local partner, price competitiveness and regulatory approval; we have all three; therefore we are well positioned.', tag: 'Best', why: 'Clean deductive chain.' },
            ] },
            { id: 'S02-b3', claim: 'Recurring revenue is worth more than one-time sales.', src: 'S2 slides 15-16', options: [
              { text: 'Investors pay more for predictable cash flows; recurring revenue is more predictable; therefore it is worth more.', tag: 'Best', why: 'Clean deductive syllogism.' },
              { text: 'Predictable cash flow is worth more, so recurring revenue is worth more — and customers like subscriptions because they’re modern.', tag: 'Mixed logic', why: 'Deductive core fused with inductive fluff.' },
              { text: 'Because it recurs, it repeats, and customers keep paying even if the amount is less.', tag: 'Not MECE', why: 'Restates one fact three ways.' },
            ] },
            { id: 'S02-b4', claim: 'Reject the proposed merger.', src: 'S2 slides 15-16', options: [
              { text: 'It’s a bad deal, the price is too high, and we would overpay.', tag: 'Not MECE', why: '“Price too high” and “overpay” are the same point; “bad deal” overlaps both.' },
              { text: 'The cultures are incompatible, the cost synergies are unproven, and regulators are likely to block it.', tag: 'Best', why: 'Three distinct lenses — culture, synergies, regulation.' },
              { text: 'Overpaying destroys value and we’d overpay, so it destroys value — besides, the CEO dislikes their headquarters city.', tag: 'Mixed logic', why: 'A syllogism plus an irrelevant, different-type claim.' },
            ] },
          ]}
        />
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">Practice scenario A — Corvid Analytics (deductive)</h3>
          <PyramidBuilder
            id="S02-pA"
            prompt="**Corvid Analytics** (fictional) sells a fraud-detection API priced per transaction. Its largest customers are bundling fraud tools into their own checkout software and want a flat annual license; gross margin per transaction has fallen from 70% to 52% over four quarters as customers negotiate volume discounts. **Should Corvid move its largest accounts to flat annual licenses?** Build a deductive pyramid."
            model={{
              structure: 'deductive',
              s: 'Corvid prices its fraud API per transaction and grew with its customers’ volumes.',
              c: 'Its largest customers now negotiate steep volume discounts and want flat licenses; margin per transaction fell from 70% to 52% in four quarters.',
              q: 'Should Corvid move its largest accounts to flat annual licenses?',
              a: 'Yes — Corvid should move its largest accounts to tiered annual licenses with usage bands, because pricing must follow the unit of value customers buy, and for large accounts that unit is now coverage, not transactions.',
              supports: [
                { label: 'Major premise', point: 'Durable pricing charges for the metric that tracks the value the customer receives.', evidence: ['A mismatch shows up as discounting pressure and margin erosion'] },
                { label: 'Minor premise', point: 'For Corvid’s largest accounts, value is protection across their whole checkout — a coverage unit — not individual transactions, which is why they push per-transaction prices down.', evidence: ['Margin per transaction 70% → 52%', 'Customers bundling fraud tools into their own software'] },
                { label: 'Therefore', point: 'Price large accounts on coverage (annual license with usage bands), keeping per-transaction pricing for small accounts.', evidence: ['Bands protect against unlimited usage at a flat fee'] },
              ],
              competing: '“Hold per-transaction pricing and fight on discounts.” It fails on its own terms: it concedes margin every renewal without fixing the mismatch that drives the pressure.',
              memo: 'Deductive because one causal claim — price follows the value metric — decides it; the weak link is whether large accounts really value coverage, defended with their bundling behavior.',
            }}
          />
          <h3 className="text-lg font-semibold">Practice scenario B — Larchmont Bakeries (inductive)</h3>
          <PyramidBuilder
            id="S02-pB"
            prompt="**Larchmont Bakeries** (fictional, $210M) has $40M to deploy. Option 1: open 30 new cafés in two new states. Option 2: build a central bakery to supply its existing 120 cafés plus wholesale accounts. Same-café sales are flat; ingredient costs are up 12%. **Recommend one option with an inductive pyramid.**"
            model={{
              structure: 'inductive',
              s: 'Larchmont runs 120 cafés and has $40M to deploy.',
              c: 'Same-café sales are flat and ingredient costs are up 12%, squeezing margins in the existing base.',
              q: 'Should Larchmont spend its $40M on 30 new cafés or a central bakery?',
              a: 'Larchmont should build the central bakery, because it strengthens the economics of the 120 cafés it already owns before it adds new ones.',
              supports: [
                { label: 'Reason 1', point: 'It attacks the immediate problem: cost.', evidence: ['Ingredient costs +12%; centralized purchasing and production spread fixed cost'] },
                { label: 'Reason 2', point: 'It improves every existing café at once.', evidence: ['120 cafés benefit vs. 30 new ones that start unproven'] },
                { label: 'Reason 3', point: 'It creates a second revenue stream with lower risk.', evidence: ['Wholesale accounts use spare capacity'] },
              ],
              competing: '“Expand to grow.” Expansion multiplies a café model whose margins are already under pressure; fix the unit economics first.',
              memo: 'Inductive because several independent considerations (cost, reach, risk) bear on the choice; each is a “reason the bakery creates more value now,” so the group is parallel.',
            }}
          />
        </section>
      </div>
    ),
  },
  coldCalls: [
    { id: 'c1', level: 'Facts', q: 'What are the four parts of SCQA, and what is each one’s job?', model: 'Situation: common ground the reader won’t dispute. Complication: what changed and makes the situation untenable. Question: the one sharp question it provokes. Answer: a complete, declarative, falsifiable sentence that answers it [[Minto §2]].', weak: 'Situation, Complication, Question, Answer — background, problem, question, solution.', whyWeak: 'Lists labels without the disciplines (uncontested, tension, singular, falsifiable).' },
    { id: 'c2', level: 'Facts', q: 'What does “falsifiable” mean for an Answer?', model: 'A skeptic could, in principle, show it’s wrong — it asserts something specific (“Decline the deal and reinvest in DTC”), unlike a topic (“the distribution decision”) [[Minto §2]].', weak: 'That it’s true.', whyWeak: 'Falsifiable means testable, not proven.' },
    { id: 'c3', level: 'Analysis', q: 'When would you choose deductive over inductive support?', model: 'Deductive when the decision turns on a single causal claim the reader will follow (Tessera: price must track the value metric); inductive when several independent considerations bear on the choice (Verdant: threat, capability, capital). Combined when it’s contested and high-stakes (Atlas) [[Minto Key]].', weak: 'Deductive is more logical, so use it when you can.', whyWeak: 'Ignores deduction’s fragility and the fit-to-problem criterion.' },
    { id: 'c4', level: 'Analysis', q: 'What makes an inductive group MECE?', model: 'The items don’t overlap (mutually exclusive), together they cover the major considerations (collectively exhaustive), and each is the same logical type — Aldridge’s scale, technology and timing are all “forms of value a break-up would destroy” [[Minto Ex.2]].', weak: 'Having three bullet points.', whyWeak: 'Count isn’t the test; parallelism and no overlap/gaps are.' },
    { id: 'c5', level: 'Analysis', q: 'Granite Peak’s argument is deductive. Where is it most vulnerable?', model: 'The **major premise** — that its advantage is brand and the direct relationship. An executive could argue “at $40M the real advantage is manufacturing cost, and big-box volume lowers unit costs enough to fund the brand.” Strong deductive writing anticipates and defends its weakest link [[Minto Ex.1]].', weak: 'The numbers might be wrong.', whyWeak: 'Vague; doesn’t identify which link breaks the chain.' },
    { id: 'c6', level: 'Analysis', q: 'What is a theory, in this course?', model: 'A causal claim about how the world works that can be tested and applied to a case — the major premise of a deductive argument. Five Forces, VRIO and the value chain are theories; applying them to Aldi or Coke is deduction [[Minto §2]].', weak: 'A guess.', whyWeak: 'Misses testability and the role as major premise.' },
    { id: 'c7', level: 'Judgment', q: 'Two students give opposite answers to Verdant. Can both get full marks?', model: 'Yes. The key grades structure and rigor, not the conclusion. “Expand to Europe” can earn full marks if it confronts the capability gap and the price war head-on; “Stay” must keep three parallel, non-overlapping reasons [[Minto Key B]].', weak: 'No, the key says stay in North America.', whyWeak: 'The key explicitly says it is “one of several defensible” answers.' },
    { id: 'c8', level: 'Judgment', q: 'Your teammate writes the Question as two questions joined by “If so…”. Why does it matter?', model: 'The rubric wants a Question that is “sharp and singular.” Two questions split the pyramid — the Answer can’t be one governing thought if it answers two things. Put “how” and “when” inside the Answer or supports [[Minto Asg §5]].', weak: 'It doesn’t matter if both are answered.', whyWeak: 'Loses SCQA points and breaks the hinge.' },
    { id: 'c9', level: 'Action', q: 'You have 60 seconds with a CEO. How do you open?', model: 'One line of situation, one of complication, then the Answer immediately — “We should decline the deal, because it trades our pricing power for low-margin volume” — then the three supports by name. Conclusion first [[Minto intro]].', weak: 'Walk through the analysis, then share the recommendation.', whyWeak: 'The reverse of the pyramid; the CEO may leave before the answer.' },
    { id: 'c10', level: 'Action', q: 'How do you handle the board faction that disagrees with you?', model: 'State its strongest version fairly, then dismantle it on its own terms — the way Helios takes apart “defend hardware” pillar by pillar and the Atlas key takes apart “license for cash” (one-time sale of a depreciating asset that funds your own disintermediation) [[Minto Ex.3]] [[Minto Key C]].', weak: 'Explain why they’re wrong.', whyWeak: 'Risks a straw man; doesn’t engage the strongest version.' },
  ],
  devil: {
    argument: 'Pyramids oversimplify. Real strategy problems are messy, and forcing them into three neat boxes hides uncertainty; leading with the answer looks arrogant, especially to principles-first audiences.',
    response: 'The pyramid doesn’t hide uncertainty — it exposes it: deductive chains must name their weakest premise, inductive groups must be MECE, and the competing answer must be beaten fairly [[Minto §2-3]]. Leading with the answer respects the reader’s limited attention; the SCQA introduction still walks them to it. For a principles-first audience (the S3 Culture Map), spend more of the introduction on the governing premise — the structural disciplines don’t change [[S3 slides 81]].',
    probes: ['How would you show uncertainty inside a pyramid?', 'When is an inductive structure dishonest?', 'What do you do if the evidence supports two answers?'],
  },
  pyramid: {
    prompt: 'Answer the session’s Key Question as a pyramid: **How should you organize a compelling case for a recommendation?** (Inductive or combined.)',
    model: {
      structure: 'inductive',
      s: 'Executives must decide under time pressure and skepticism, and analysts are paid to reach defensible conclusions, not to gather facts [[Minto §1]].',
      c: 'Good analysis often gets buried in disorganized prose, so the reader never sees the answer or the logic that should persuade them [[Minto intro]].',
      q: 'How should an analyst organize a compelling case?',
      a: 'Lead with one falsifiable answer framed by SCQA, prove it with a structure that fits the problem, and defeat the strongest alternative, because that is what lets a skeptical reader accept the conclusion quickly.',
      supports: [
        { label: 'Reason 1', point: 'Frame first: SCQA makes the reader accept the question before the answer.', evidence: ['Uncontested situation, real tension, one sharp question'] },
        { label: 'Reason 2', point: 'Prove with the right logic: deductive for one causal crux, inductive for independent considerations.', evidence: ['Granite Peak vs. Aldridge', 'Four quality tests'] },
        { label: 'Reason 3', point: 'Defeat the alternative on its own terms.', evidence: ['Helios dismantles “defend hardware” on three pillars'] },
      ],
      competing: '“Show all the analysis and let the reader decide.” It fails because readers hold few ideas at once and executives have less time than analysts — the conclusion gets lost.',
      memo: 'Inductive: three parallel steps (frame, prove, defend) — each a “thing a compelling case must do.”',
    },
  },
  checkIds: ['S02-q01', 'S02-q02', 'S02-q04', 'S02-q06', 'S02-q08', 'S02-q10', 'S02-q12', 'S02-q14', 'S02-q16', 'S02-q19'],
  bank: [
    Q({ id: 'S02-q01', kind: 'concept', src: 'Minto §2', stem: 'In the hourglass model, what is the “hinge”?', correct: 1, options: [
      { text: 'The Complication.', why: 'The Complication creates tension; it isn’t the hinge.' },
      { text: 'The Answer — the conclusion of the SCQA and the apex of the supporting pyramid, which must be the same sentence.', why: '“If those two are not the same sentence, the argument is broken.”' },
      { text: 'The major premise.', why: 'That sits in the bottom pyramid.' },
      { text: 'The evidence.', why: 'Evidence supports premises.' },
    ] }),
    Q({ id: 'S02-q02', kind: 'concept', src: 'Minto §2', stem: 'Which is a valid Answer under Minto’s rules?', correct: 3, options: [
      { text: '“The distribution decision.”', why: 'A topic, not a thought.' },
      { text: '“Should we accept the deal?”', why: 'A question, not a declarative answer.' },
      { text: '“There are pros and cons to the deal.”', why: 'Not falsifiable; doesn’t answer.' },
      { text: '“Decline the big-box deal and reinvest in direct-to-consumer.”', why: 'Complete, declarative, falsifiable.' },
    ] }),
    Q({ id: 'S02-q03', kind: 'concept', src: 'Minto §2', stem: 'What is the main weakness of deductive support?', correct: 0, options: [
      { text: 'A reader who rejects any single link rejects the whole chain.', why: 'Direct from the reading.' },
      { text: 'It can’t include evidence.', why: 'Evidence sits beneath each premise.' },
      { text: 'It is harder to read than induction.', why: 'Induction is “usually easier to absorb,” but the weakness named is fragility.' },
      { text: 'It requires exactly three reasons.', why: 'That’s not a rule of deduction.' },
    ] }),
    Q({ id: 'S02-q04', kind: 'apply', src: 'Minto Ex.2', stem: 'A memo argues “Keep the plant open because (1) it supplies 40% of output, (2) closing it would cost $30M in severance, and (3) the plant manager is very popular.” What’s the structural flaw?', correct: 2, options: [
      { text: 'It should be deductive.', why: 'Induction is fine here; the issue is the group’s content.' },
      { text: 'It has too few reasons.', why: 'Three is fine.' },
      { text: 'Reason 3 is a different type of claim (about a person, not about value), breaking parallelism.', why: 'Mirrors Aldridge’s “the CEO is new and needs time” example.' },
      { text: 'Reasons 1 and 2 overlap.', why: 'Output share and severance cost are distinct.' },
    ] }),
    Q({ id: 'S02-q05', kind: 'concept', src: 'Minto §2', stem: 'The “so what” test is failed when…', correct: 1, options: [
      { text: 'the Answer is too long.', why: 'Length isn’t the test.' },
      { text: 'you can read a group of supports and still ask “so what?” — the summarizing thought is missing.', why: 'Definition of the fourth test.' },
      { text: 'there is no competing answer.', why: 'Separate criterion.' },
      { text: 'the evidence lacks numbers.', why: 'That’s the evidence criterion.' },
    ] }),
    Q({ id: 'S02-q06', kind: 'apply', src: 'Minto §2', stem: 'Which Question is sharpest?', correct: 0, options: [
      { text: '“Should Pellam close its Ohio distribution center by Q3?”', why: 'One decision, explicit and narrow.' },
      { text: '“What should Pellam do about logistics?”', why: 'Vague — “what should we do?” produces vague analysis.' },
      { text: '“Should Pellam close Ohio? If so, where should volume go, and when?”', why: 'Three questions; not singular.' },
      { text: '“How is Pellam’s logistics network performing?”', why: 'A description request, not a decision.' },
    ] }),
    Q({ id: 'S02-q07', kind: 'case', src: 'Minto Ex.3', stem: 'Why does the Helios example use a tight deductive spine?', correct: 2, options: [
      { text: 'Because the board asked for it.', why: 'Not stated.' },
      { text: 'Because induction can’t handle three complications.', why: 'Not the reasoning given.' },
      { text: 'Because the Answer is counterintuitive (destroy the largest revenue line), raising the burden of proof.', why: 'The note: the counterintuitive answer “is exactly why the tight deductive form is appropriate.”' },
      { text: 'Because there was no evidence.', why: 'Evidence sits under each premise.' },
    ] }),
    Q({ id: 'S02-q08', kind: 'case', src: 'Minto Key B', stem: 'According to the Answer Key, a student who recommends Verdant expand to Europe…', correct: 3, options: [
      { text: 'automatically loses points for disagreeing with the key.', why: 'The key grades structure, not conclusion.' },
      { text: 'should use deductive logic instead.', why: 'Scenario B rewards induction.' },
      { text: 'can only earn partial credit.', why: 'Full marks are possible.' },
      { text: 'can earn full marks if they confront the capability gap and the price war head-on rather than wave them away.', why: 'The key’s “defensible alternative.”' },
    ] }),
    Q({ id: 'S02-q09', kind: 'case', src: 'Minto Key C', stem: 'In the Atlas key, how is “withhold and litigate” treated?', correct: 1, options: [
      { text: 'As the recommended answer.', why: 'The model answer is to build.' },
      { text: 'As a tactic, not a strategy — it may buy time and leverage but creates no growth; at most it runs alongside building.', why: 'Direct from the key.' },
      { text: 'As the strongest competing answer.', why: 'The key names “license for cash” as strongest.' },
      { text: 'As illegal.', why: 'Not claimed.' },
    ] }),
    Q({ id: 'S02-q10', kind: 'concept', src: 'Minto Asg §6', stem: '“Evidence as decoration” means…', correct: 0, options: [
      { text: 'figures that don’t test or prove a premise — and should be cut.', why: 'Direct from the pitfalls.' },
      { text: 'using charts instead of text.', why: 'Format isn’t the issue.' },
      { text: 'citing too many sources.', why: 'Not the pitfall.' },
      { text: 'putting evidence at the top of the pyramid.', why: 'Not the definition.' },
    ] }),
    Q({ id: 'S02-q11', kind: 'concept', src: 'Minto intro', stem: 'Who coined “MECE”?', correct: 2, options: [
      { text: 'Michael Porter.', why: 'Porter’s frameworks are elsewhere in the course.' },
      { text: 'Jay Barney.', why: 'VRIO.' },
      { text: 'Barbara Minto.', why: 'The reading credits her.' },
      { text: 'Bruce Henderson.', why: 'BCG’s experience curve.' },
    ] }),
    Q({ id: 'S02-q12', kind: 'apply', src: 'S2 slides 16', stem: '“Reject the acquisition: the price is too high, we would overpay, and it’s a bad deal.” This support is…', correct: 3, options: [
      { text: 'well-structured inductive support.', why: 'The three items overlap.' },
      { text: 'mixed logic.', why: 'No deductive chain is mixed in.' },
      { text: 'a valid syllogism.', why: 'No major/minor premise.' },
      { text: 'not MECE — the items restate the same point.', why: 'Exactly the in-class merger (a) example.' },
    ] }),
    Q({ id: 'S02-q13', kind: 'quant', src: 'S2 slides 12', stem: 'A market-sizing tree: 10M adults, 30% buy, 4 purchases a year, $5 per purchase. What is the market?', correct: 1, options: [
      { text: '$12M', why: 'Multiply all four drivers: 10M × 0.3 × 4 × $5.' },
      { text: '$60M', why: '10,000,000 × 0.30 × 4 × 5 = $60M.' },
      { text: '$200M', why: 'Omitted the 30% penetration.' },
      { text: '$6M', why: 'Arithmetic slip.' },
    ] }),
    Q({ id: 'S02-q14', kind: 'concept', src: 'S2 slides 13', stem: 'In a driver tree, “Sales = average price × unit volume” is ____, while “market share is declining” is ____.', correct: 0, options: [
      { text: 'an identity (always true); a hypothesis that must be checked against evidence', why: 'The slide’s “change of kind.”' },
      { text: 'a hypothesis; an identity', why: 'Reversed.' },
      { text: 'both identities', why: 'The second can be false.' },
      { text: 'both hypotheses', why: 'The first is true by construction.' },
    ] }),
    Q({ id: 'S02-q15', kind: 'apply', src: 'Minto §2', stem: 'Your situation reads: “Rivals are cutting prices and our margins are collapsing.” What’s wrong?', correct: 2, options: [
      { text: 'Nothing — it’s a good situation.', why: 'It contains tension.' },
      { text: 'It’s too short.', why: 'Length isn’t the test.' },
      { text: 'It belongs in the Complication; the Situation should be uncontested, stable common ground.', why: 'Situation = no tension; Complication = what changed.' },
      { text: 'It needs a number.', why: 'The issue is its role, not evidence.' },
    ] }),
    Q({ id: 'S02-q16', kind: 'case', src: 'Minto Key A', stem: 'Per the key, what earns full marks on Tessera?', correct: 1, options: [
      { text: 'Recommending “No, keep per-seat pricing.”', why: 'Can earn marks only if it defeats the decoupling premise (“hard”).' },
      { text: 'A valid major → minor → therefore chain, the weak premise named and defended, and predictability/churn risk managed (hybrid, grandfathering).', why: 'The key’s full-marks description.' },
      { text: 'A list of pros and cons.', why: 'A red flag.' },
      { text: 'An Answer of “revisit pricing.”', why: 'A topic, a red flag.' },
    ] }),
    Q({ id: 'S02-q17', kind: 'concept', src: 'Minto §2', stem: 'Complex arguments often combine both logics. How?', correct: 3, options: [
      { text: 'Inductive spine with deductive evidence.', why: 'Reversed.' },
      { text: 'Alternate deductive and inductive sentences.', why: 'Mixing within a group is the error to avoid.' },
      { text: 'Two separate pyramids for two answers.', why: 'One governing thought.' },
      { text: 'A deductive spine at the top with each premise supported by an inductive group of evidence.', why: 'Direct from the reading (Helios).' },
    ] }),
    Q({ id: 'S02-q18', kind: 'apply', src: 'Minto Key C', stem: 'A student’s Atlas paper argues against “sell the corpora outright,” but the board faction proposed licensing for one-time, non-exclusive fees. The risk?', correct: 0, options: [
      { text: 'A straw man — the alternative must be stated fairly and dismantled on its own terms.', why: 'The key penalizes a missing or straw-man competing answer.' },
      { text: 'Too much evidence.', why: 'Not the issue.' },
      { text: 'Using deductive logic.', why: 'Scenario C requires a deductive spine.' },
      { text: 'None — selling and licensing are the same.', why: 'Licensing is non-exclusive and repeatable; misstating it weakens the teardown.' },
    ] }),
    Q({ id: 'S02-q19', kind: 'concept', src: 'Minto §2', stem: 'Inductive support is more robust than deductive because…', correct: 2, options: [
      { text: 'it uses more evidence.', why: 'Not necessarily.' },
      { text: 'it is always MECE.', why: 'It must be made MECE; it isn’t automatically.' },
      { text: 'the reasons are independent, so losing one weakens but doesn’t collapse the case.', why: 'Direct from the reading.' },
      { text: 'readers trust lists.', why: 'Not the argument.' },
    ] }),
    Q({ id: 'S02-q20', kind: 'apply', src: 'Minto §2', stem: 'Your Complication: “The company has a new logo.” The Situation and this Complication could both be true with no problem to solve. What should you do?', correct: 1, options: [
      { text: 'Keep it — every SCQA needs a complication.', why: 'It must create real tension.' },
      { text: 'Find the real Complication — the change that makes the Situation untenable.', why: '“A Complication with no tension” is a named pitfall.' },
      { text: 'Move it to the Answer.', why: 'Not an answer.' },
      { text: 'Turn it into a question.', why: 'Doesn’t fix the missing tension.' },
    ] }),
  ],
  shorts: [
    { id: 'S02-sa1', session: 'S02', src: 'Minto §2', prompt: 'Explain deductive vs. inductive support and when to use each.', model: 'Deductive: major premise → minor premise → therefore; forceful but fragile (one bad link collapses it) — use when one causal claim decides the question. Inductive: parallel, MECE reasons of one type; robust — use when several independent considerations bear on the choice.', points: ['Define both', 'Fragility vs. robustness', 'When to use each'] },
    { id: 'S02-sa2', session: 'S02', src: 'Minto Asg §5', prompt: 'Rewrite this Question to be sharp and singular: “What should we do about rising costs, and should we raise prices?”', model: '“Should we raise list prices 6% at the next contract renewal?” — one decision; cost actions belong in the supports or a separate pyramid.', points: ['One question mark', 'A specific decision'] },
    { id: 'S02-sa3', session: 'S02', src: 'Minto §3', prompt: 'What makes a competing-answer teardown strong rather than a straw man?', model: 'It states the strongest version of the alternative fairly (its real logic and appeal) and shows it fails on its own terms, often inductively — each pillar knocked down (Helios’s “defend hardware”).', points: ['Strongest version', 'Fails on its own terms'] },
    { id: 'S02-sa4', session: 'S02', src: 'Minto Key', prompt: 'Why can two opposite Answers both earn full marks?', model: 'The key grades structure and rigor — SCQA, logical validity, MECE, so-what, evidence, the competing answer — not whether the conclusion matches the model.', points: ['Graded on structure', 'Names criteria'] },
  ],
  written: {
    prompt: '**Timed (25 min).** **Fernhill Clinics** (fictional, 40 urgent-care clinics) must decide whether to add telehealth visits. Write a full two-pyramid answer: SCQA, a combined structure, and a paragraph defeating the strongest alternative.',
    minutes: 25,
    model: 'A strong answer: **Q** “Should Fernhill launch telehealth for minor-acuity visits this year?” **A** “Yes — Fernhill should launch telehealth for minor-acuity visits, because it captures low-cost demand its clinics can’t serve profitably while freeing clinic capacity for higher-acuity care.” **Spine:** major premise (capacity should go where it earns most), minor premise (minor visits crowd clinics and earn least), therefore (shift them online). Inductive evidence under each. **Competing answer:** “Telehealth cannibalizes in-person visits” — dismantled: the visits it takes are the lowest-margin ones, and patients lost to national telehealth apps are lost anyway.',
    rubric: ['Singular Question', 'One-sentence Answer with “because”', 'Valid spine with evidence', 'Fair, on-its-own-terms teardown', 'Clear labels'],
  },
  oral: { prompt: 'Walk me through how you’d structure a recommendation for a skeptical board.', probes: ['Why lead with the answer?', 'When does deduction beat induction?', 'How do you know your groups are MECE?', 'What do you do with the board member who disagrees?'] },
  summary: {
    answer: 'A compelling case leads with one falsifiable answer framed by SCQA, proves it with the logic that fits the problem (deductive for one causal crux, inductive for independent considerations, combined when contested), puts evidence under every support, and defeats the strongest alternative on its own terms.',
    numbers: [
      { label: 'Rubric weights', value: 'SCQA 20 · validity 20 · MECE 15 · so-what 15 · evidence 10 · competing 10 · memo 10', src: 'Minto Asg §5' },
      { label: 'Key point split', value: 'A 30 · B 30 · C 40', src: 'Minto Key' },
      { label: 'Granite Peak evidence', value: 'DTC ~62% vs. wholesale ~31% margin; 68% repeat; ~35% premium', src: 'Minto Ex.1' },
    ],
    frameworkBullets: ['Hourglass: SCQA → Answer (hinge) → support', 'Deductive (fragile, forceful) vs. inductive (robust, MECE)', 'Four tests: single thought, MECE, valid logic, so what', 'Beat the strongest alternative', 'Logic trees: MECE decomposition; identity vs. hypothesis'],
    caseBullets: ['Granite Peak = deductive', 'Aldridge = inductive', 'Helios = combined + competing answer', 'Graded on structure, not conclusion'],
  },
}
