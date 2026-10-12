import { DataTable, HBar } from '../../components/Charts'
import { Cite } from '../../components/Cite'
import { StrategyCanvas } from '../../widgets/StrategyCanvas'
import { ValueStick } from '../../widgets/ValueStick'
import type { Mcq, ModuleDef } from '../types'

function Diagram() {
  return (
    <figure className="card p-3 space-y-2">
      <figcaption className="font-semibold">
        Being different is not differentiation <Cite tag="Diff §1-3, §7" />
      </figcaption>
      <div className="grid gap-2 md:grid-cols-[180px_1fr] items-start">
        <div className="text-xs text-center space-y-0.5">
          <div className="rounded p-1" style={{ background: '#2563eb', color: '#fff' }}>WTP ↑ differentiation raises the top</div>
          <div className="rounded p-1 surface-2">customer surplus</div>
          <div className="rounded p-1" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>price → firm margin → cost</div>
          <div className="rounded p-1 surface-2">supplier surplus</div>
          <div className="rounded p-1" style={{ background: '#b45309', color: '#fff' }}>supplier opp. cost ↓ cost leadership lowers the bottom</div>
        </div>
        <div className="grid gap-1.5 sm:grid-cols-2 text-xs">
          <div className="card p-2"><strong>Six sources of WTP:</strong> performance · risk reduction · time & convenience · switching & integration · identity & signal · trust where the buyer can’t verify.</div>
          <div className="card p-2"><strong>Proof is in the accounts:</strong> profit share {'>'} volume share, or price up without volume down. Six tests: price, volume at parity, elasticity, retention, mix, where the gain lands.</div>
          <div className="card p-2"><strong>It decays:</strong> average ROIC fade 0.21/yr (staples 0.10 … utilities 0.30).</div>
          <div className="card p-2"><strong>What makes it last:</strong> path dependence · causal ambiguity · social complexity · credible commitment.</div>
        </div>
      </div>
    </figure>
  )
}

function Exhibits() {
  return (
    <div className="space-y-4">
      <DataTable
        caption={<>Chipotle results over time <Cite tag="Chipotle Ex.1" /></>}
        head={['Metric', '2015', '2016', '2019', '2023', '2024', '2025']}
        rows={[
          ['Revenue ($B)', '4.50', '3.90', '5.59', '9.87', '11.31', '11.92'],
          ['Comparable sales', '+0.2%', '−20.4%', '+11.1%', '+7.9%', '+7.4%', '−1.7%'],
          ['Food, bev & packaging (% rev)', '33.4%', '35.1%', '33.1%', '29.5%', '29.8%', '29.6%'],
          ['Restaurant-level margin', '26.1%', '12.8%', '20.5%', '26.2%', '26.7%', '25.4%'],
          ['Operating margin', '17.3%', '0.9%', '7.9%', '15.8%', '16.9%', '16.2%'],
          ['Net income ($M)', '476', '23', '350', '1,229', '1,534', '1,540'],
          ['Restaurants', '2,010', '2,250', '2,580', '3,437', '3,726', '4,056'],
        ]}
      />
      <DataTable
        caption={<>Boatwright’s corner-cutting menu <Cite tag="Chipotle Ex.6" /></>}
        head={['Lever', 'Est. annual savings', 'Visible at counter?', 'Risk']}
        rows={[
          ['Relax responsibly-raised sourcing', '$150–300M', 'No', 'Brand contradiction; audits, media, employees; trust spent'],
          ['Commissary prep, keep visible line', '$100–200M', 'Mostly no', 'Taste drift; “fresh in store” claim dies'],
          ['Trim portions ~5%', '~$175M', 'YES, immediately', 'Highest detection risk (2024 skimpflation)'],
          ['Substitute ingredients at the margin', '$50–150M', 'Rarely', 'Cumulative taste erosion'],
          ['Hold standards; cut elsewhere', '$50–100M', 'No', 'Smaller prize'],
          ['Hold standards; market the invisible', 'Negative (spend)', 'Makes the invisible visible', 'Deepens the moat — or margin falls for nothing'],
        ]}
      />
      <HBar title="Operating margin, FY2024: is the ingredient claim rewarded?" rows={[{ label: 'Chipotle (company-owned)', value: 16.9 }, { label: 'Domino’s (franchised)', value: 18.7 }, { label: 'Papa John’s', value: 5 }]} unit="%" highlight="Chipotle (company-owned)" note={<>Both Chipotle and Papa John’s claim ingredient superiority; only one earns a premium. McDonald’s ~45% is a landlord-franchisor margin, not restaurant economics <Cite tag="Chipotle Ex.3" /></>} />
      <DataTable
        caption={<>Premiums that show up in the accounts <Cite tag="Diff Ex.1" /></>}
        head={['Firm', 'Evidence']}
        rows={[['Hermès', '41.0% recurring operating margin vs. Kering 12.8% (H1 2026)'], ['Ferrari', 'Shipments −3.7%, car & parts revenue +8.0%; ~€484k per car'], ['Apple', '~21% of smartphone units, ~49% of revenue'], ['Old Dominion', '$29.71 per cwt vs. $20.94 and $26.09 at rivals; operating ratio 10–17 pts better'], ['Lululemon (counter case)', 'Gross margin 59.2% → 56.6% → 54.2%']]}
      />
    </div>
  )
}

const Q = (o: Omit<Mcq, 'session'>): Mcq => ({ ...o, session: 'S09' })

export const S09: ModuleDef = {
  id: 'S09',
  short: 'Differentiation · Chipotle',
  framework: {
    oneLiner: 'Differentiation is **raising what a buyer will pay by more than it costs** to create the reason — and it only counts if the buyer **perceives it AND pays** for it. Prove it in the accounts, know which of six sources produces it, and know which mechanism stops rivals copying it [[Diff §1, §3, §7]].',
    analogy: 'Two coffee shops. One installs gold-plated espresso machines behind a wall — different, expensive, invisible. The other grinds beans in front of you and remembers your name — customers see it and happily pay a dollar more. Only the second is differentiation [[Diff §1]] [[Porter §4]].',
    intuition: [
      '**Being different is not differentiation.** Most features are distinctive and earn nothing; some near-identical products command a premium anyway [[Diff §1]].',
      'On the **value stick**, differentiation moves the top (WTP); cost leadership moves the bottom. Only raising WTP creates the option to charge more [[Diff Fig.1]].',
      '**Six sources** of real premiums: performance, risk reduction, time/convenience, switching/integration, identity/signal, trust. In **credence** markets (medical, legal, repair) quality can’t be demonstrated — only **signaled** [[Diff §2]].',
      'The definitive test is a **realized price premium**, with a signature: profit share larger than volume share, or raising price without losing volume. A gain that shows up only in cost is an operating improvement [[Diff §3]].',
      'Use field evidence, not surveys: the same fair-trade label held an 8% price rise on one coffee and lost 30% of volume on another. A WTP number without a product and price point is “close to meaningless” [[Diff §4]].',
      'Differentiation **decays** (average fade 0.21/yr) and **fails** in five patterned ways: buyer didn’t want it, copied before it paid, matching a rival broke the profit formula, nobody would pay, premium didn’t survive normalization [[Diff §5-6]].',
      'Premiums **last** only through path dependence, causal ambiguity, social complexity or **credible commitment** — a promise rivals won’t sign. A differentiator resting on none of the four is a routine, and routines travel [[Diff §7]].',
    ],
    howToRun: [
      '**1. Name the buyer and the alternative** (a specific substitute for a specific person) [[Diff §8]].',
      '**2. State the premium as a realized number** against that alternative — if you can’t measure it, assume it doesn’t exist [[Diff §8]].',
      '**3. Name the source** (one of six) and whether the buyer can verify it or must be given a signal [[Diff §2, §8]].',
      '**4. Name the durability mechanism** — if none, estimate how long you have [[Diff §7-8]].',
      '**5. Check where the gain lands** — price (differentiation) or cost (operating improvement) [[Diff §3, §8]].',
      '**6. Ask what would kill it in five years** and look for early evidence — falling gross margin at constant mix comes first [[Diff §8]].',
      '**Tools to find new sources (slides):** strategy canvas + four actions, jobs to be done, consumption chain, segmentation [[S9 slides 4]].',
    ],
    recall: [
      { id: 'S09-six', title: 'Six sources of willingness to pay', prompt: 'With an example each.', items: [{ name: 'Performance', hint: 'TSMC node lead' }, { name: 'Risk reduction', hint: 'Old Dominion' }, { name: 'Time and convenience', hint: '+1.45% sales per day of delivery cut' }, { name: 'Switching and integration', hint: 'NVIDIA CUDA' }, { name: 'Identity and signal', hint: 'Hermès' }, { name: 'Trust in a market the buyer can’t verify', hint: 'auto repair' }], src: 'Diff §2' },
      { id: 'S09-tests', title: 'Six tests that prove a premium', prompt: 'What to measure.', items: [{ name: 'Price (realized vs. matched competitor)' }, { name: 'Volume at parity' }, { name: 'Elasticity' }, { name: 'Retention' }, { name: 'Mix' }, { name: 'Where it lands (price vs. cost)' }], src: 'Diff §3' },
      { id: 'S09-fail', title: 'Five ways differentiation fails', prompt: 'With the case for each.', items: [{ name: 'The buyer didn’t want it (JCPenney)' }, { name: 'Copied before it could pay (Casper)' }, { name: 'Matching a rival broke the profit formula (Blockbuster late fees)' }, { name: 'Nobody would pay for the feature (Fire Phone)' }, { name: 'Premium didn’t survive normalization (Peloton)' }], src: 'Diff §6' },
      { id: 'S09-last', title: 'Four durability mechanisms', prompt: 'Why a competitor can’t supply the same attribute at the same cost.', items: [{ name: 'Path dependence' }, { name: 'Causal ambiguity' }, { name: 'Social complexity' }, { name: 'Credible commitment' }], src: 'Diff §7' },
      { id: 'S09-four', title: 'Four actions (blue ocean)', prompt: 'Questions for a new value curve.', items: [{ name: 'Eliminate — factors the industry takes for granted' }, { name: 'Reduce — well below the standard' }, { name: 'Raise — well above the standard' }, { name: 'Create — never offered before' }], src: 'S9 slides 8' },
      { id: 'S09-diag', title: 'The six-step diagnostic', prompt: 'In order.', items: [{ name: 'Name the buyer and the alternative' }, { name: 'State the premium as a realized number' }, { name: 'Name the source; verifiable or signaled?' }, { name: 'Name the durability mechanism' }, { name: 'Check where the gain lands' }, { name: 'What would kill it in five years — look for early signs' }], src: 'Diff §8' },
    ],
    diagram: Diagram,
    variants: [
      {
        title: 'Defining differentiation',
        brief: '“The ability to raise what a buyer will pay by more than it costs to create the reason they will pay a premium” — and it counts only if the buyer **perceives AND pays** [[Diff §1]].',
        slides: '“A strategy whereby companies attempt to gain a competitive advantage by **offering value that is not available** in other products or services or that others don’t do as well,” and “providing unique value that allows a firm to command a premium price” [[S9 slides 2, 15]].',
        differ: 'The slide defines differentiation by **uniqueness**; the brief insists uniqueness isn’t enough — the premium must exceed the cost of creating it and the buyer must actually pay. The slide’s sources (better job, more jobs, unique job, quality, convenience, brand/image) overlap the brief’s six (performance, risk reduction, time, switching, identity, trust).',
        guess: '**Guess:** the slide deck is an older one (its title slide still says “STRAT 392”) using a textbook definition; the brief was written later to sharpen it with “being different is not differentiation.” Lead with the brief’s definition on the exam.',
      },
    ],
    newScenarios: [
      { prompt: '**Tallis Tires** (fictional) adds a sensor that reports tread depth to an app. Survey respondents say they’d pay $40 more; in a store test, a $15 premium cut volume by a third. Differentiated?', answer: 'No evidence of a premium yet: stated WTP (survey, no budget constraint) isn’t realized WTP, and the elasticity test failed at the shelf. “A price rise that customers accept in a survey and refuse at the shelf” is a failing answer [[Diff §3-4]].' },
      { prompt: '**Northgate Legal** (fictional) can’t prove its contracts are better — clients can’t evaluate legal work. How should it differentiate?', answer: 'Legal advice is a credence good: quality can’t be demonstrated, only **signaled** — reputation, credentials, guarantees, visible process. Make the invisible legible [[Diff §2]] [[Porter §4]].' },
      { prompt: '**Bloom Mattress** (fictional) launches an online “bed-in-a-box” with free returns. Two years later 100 copycats exist and its price has fallen 40%. Which failure, and what was missing?', answer: '“Copied before it could pay” (the Casper pattern): the barrier to copying was a website. None of the four durability mechanisms protected it [[Diff §6-7]].' },
    ],
  },
  argument: {
    intro: 'The brief: differentiation must be proven in the accounts, traced to a real source of willingness to pay, protected by a mechanism rivals can’t match, and watched for decay.',
    propositions: [
      '**Being different is not differentiation** [[Diff §1]].',
      '**It counts only if the buyer perceives it and pays** [[Diff §1]].',
      '**The accounts show the signature:** profit share beyond volume share, or price up without volume down (Apple, Ferrari) [[Diff §3]].',
      '**Act on field evidence, not surveys** [[Diff §4]].',
      '**Part of brand equity is a rent on buyer ignorance**, and erodes as information improves (pharmacists buy national brands 9% vs. 26%) [[Diff §4]].',
      '**Advantage fades** (0.21/yr on average) [[Diff §5]].',
      '**Durability comes from why a rival can’t supply the attribute at the same cost** — not from the attribute [[Diff §7]].',
      '**If profits rose with no price move, it was a cost achievement — and those diffuse** [[Diff §8]].',
    ],
  },
  case: {
    protagonist: 'CEO Scott Boatwright (since late 2024), after comparable sales fell 1.7% in 2025 [[Chipotle]].',
    decision: 'Food, beverage and packaging consume 29.6% of revenue (~$3.5B); each point cut is ~$120M of profit. Should Chipotle, for the first time, cut its food costs — and is what it sees as value-add actually recognized and rewarded by customers? [[Chipotle]] [[Canvas S9]]',
    timeline: [
      { when: '1993', what: 'Steve Ells opens the first Chipotle near the University of Denver [[Chipotle]]' },
      { when: '1998–2006', what: 'McDonald’s invests at 16 stores, divests at the 2006 IPO (~500 stores)' },
      { when: '2015', what: 'Pulls carnitas from a third of stores rather than buy from a supplier that failed an animal-welfare audit' },
      { when: '2015–16', what: 'Food-safety outbreaks: comps −20.4%, net income $476M → $23M' },
      { when: '2018–24', what: 'Brian Niccol rebuilds operations and digital; prices up ~20% cumulative (2021–24) with traffic growing' },
      { when: '2024', what: '“Skimpflation” backlash; recommits to generous portions' },
      { when: '2025', what: 'Comps −1.7%; margins 25.4%; guidance flat for 2026' },
    ],
    exhibits: Exhibits,
  },
  tool: {
    title: 'Value stick + strategy canvas',
    intro: 'First, move the four levels of the value stick and run Chipotle’s “cut a cost customers can’t see” experiment. Then compare value curves — is Chipotle’s peak on factors customers can see?',
    render: () => (
      <div className="space-y-8">
        <ValueStick />
        <section className="space-y-2">
          <h3 className="text-lg font-semibold">Strategy canvas builder</h3>
          <StrategyCanvas />
        </section>
      </div>
    ),
  },
  coldCalls: [
    { id: 'c1', level: 'Facts', q: 'What does Chipotle spend on food, and how does that compare?', model: 'Food, beverage and packaging run 29.6% of revenue (~$3.5B in 2025) — among the highest in fast food, by deliberate choice; each 100 bps ≈ $120M of operating profit [[Chipotle]] [[Chipotle Ex.6]].', weak: 'A lot.', whyWeak: 'No number, no comparison.' },
    { id: 'c2', level: 'Facts', q: 'What is the cleanest evidence customers paid for Chipotle’s value-add?', model: 'Between 2021 and 2024 it raised menu prices ~20% cumulatively while transactions kept growing — price up without volume down, the brief’s signature of a premium [[Chipotle Ex.4]] [[Diff §3]].', weak: 'People love Chipotle.', whyWeak: 'Affection isn’t a realized premium.' },
    { id: 'c3', level: 'Analysis', q: 'Which of Chipotle’s value-adds are visible at purchase, and which must be taken on faith?', model: 'Visible: fresh prep in the open kitchen, the assembly line, portion size, speed. On faith: responsibly raised proteins, the 53-ingredient purity, no-franchise quality control. Rivals invest in what customers can SEE and skip what they must believe [[Chipotle Ex.2, Ex.5]].', weak: 'Everything is visible because you watch them make it.', whyWeak: 'Misses the sourcing half — the heart of the dilemma.' },
    { id: 'c4', level: 'Analysis', q: 'Why does Papa John’s matter to this case?', model: 'It’s the like-for-like control: both claim ingredient superiority, only Chipotle earns a premium (16.9% vs. ~5% operating margin). A claim alone isn’t differentiation — the buyer must perceive and pay [[Chipotle Ex.3]] [[Diff §1]].', weak: 'It’s a competitor.', whyWeak: 'Misses why the case includes it.' },
    { id: 'c5', level: 'Analysis', q: 'Which source of willingness to pay is Chipotle selling?', model: 'Mainly performance (taste, freshness) and **trust** — food integrity is partly a credence attribute customers can’t verify, so it’s signaled by the open kitchen and the brand promise. The 2015–16 crisis shows how much that trust was worth when breached [[Diff §2]] [[Chipotle]].', weak: 'Low prices.', whyWeak: 'Chipotle prices above fast-food norms.' },
    { id: 'c6', level: 'Analysis', q: 'What did the 2024 skimpflation episode teach?', model: 'It cut both ways: customers policed the visible offer instantly and brutally (perceived value is fragile) — and what they watched was the size of the bowl, not the certification of the chicken. That’s evidence the visible attributes carry much of the WTP [[Chipotle]].', weak: 'Customers are unreasonable.', whyWeak: 'Misses the WTP evidence.' },
    { id: 'c7', level: 'Judgment', q: 'So — is what Chipotle sees as value-add recognized and rewarded by customers?', model: 'Partly. The visible half (fresh prep, line, portions) clearly is — price rose 20% with traffic growing, and customers punish visible cuts. The invisible half (sourcing standards) is rewarded only through brand trust; rivals with conventional sourcing grow, suggesting it carries less WTP directly, but it underwrites the trust claim [[Chipotle]] [[Diff §2-3]].', weak: 'Yes, completely.', whyWeak: 'Ignores the rivals’ market test and the 2025 counter-evidence.' },
    { id: 'c8', level: 'Judgment', q: 'Which lever is most dangerous on the Exhibit 6 menu?', model: 'Trimming portions (~$175M): visible immediately with the highest detection risk — customers already film the line. Relaxing sourcing is invisible but risks the brand contradiction and the trust asset the crisis showed is fragile [[Chipotle Ex.6]].', weak: 'Sourcing, because it’s the biggest.', whyWeak: 'Size isn’t the risk dimension; visibility is.' },
    { id: 'c9', level: 'Action', q: 'You’re Boatwright. Cut food costs or not?', model: 'Don’t cut what customers see (portions, visible prep); don’t quietly harvest the sourcing premium — Porter’s “premium harvest” works beautifully until it doesn’t. Prefer making the invisible visible (market the standards) and cutting elsewhere; accept that 2025 may be where WTP hit its ceiling and stop leaning on price [[Chipotle Ex.6]] [[Porter §4]].', weak: 'Cut everywhere customers won’t notice.', whyWeak: 'The definition of the premium harvest.' },
    { id: 'c10', level: 'Action', q: 'Give me the six-step diagnostic for Chipotle in 30 seconds.', model: 'Buyer: fast-casual diner choosing vs. Qdoba/Cava. Premium: higher realized menu price, proven 2021–24. Sources: performance + trust (partly credence → signaled). Durability: social complexity and credible commitment (company-owned execution, public standards). Where it lands: price. Five-year risk: rivals’ visible freshness at lower cost, value wars resetting reference prices — watch margin at constant mix [[Diff §8]].', weak: 'It’s differentiated because it’s fresh.', whyWeak: 'Skips the diagnostic.' },
  ],
  devil: {
    argument: 'Customers can’t see sourcing, rivals prove they won’t pay for it, and each 100 bps is $120M. Cutting invisible costs is just good management — perception lives at the counter, and it would survive.',
    response: 'Concede the split is real. But Chipotle’s premium rests on a credible commitment to food integrity; for a credence-like attribute the commitment IS the signal. The 2015–16 crisis (net income $476M → $23M) shows the downside when the claim breaks, and audits, employees and media make quiet cuts discoverable. The premium harvest produces excellent years, then erosion that is very hard to reverse [[Porter §4]] [[Diff §7]]. Test first: run the premium tests and watch gross margin at constant mix.',
    probes: ['If customers can’t see it, how could cutting it hurt?', 'Why did Qdoba grow with conventional sourcing?', 'What evidence would change your mind?'],
  },
  pyramid: {
    prompt: 'Answer the Key Question: **Is what Chipotle sees as value-add recognized and rewarded by customers?** Then say whether Boatwright should cut food costs.',
    model: {
      structure: 'inductive',
      s: 'Chipotle spends ~30% of revenue on food by choice and earned 25–27% restaurant margins on that strategy [[Chipotle Ex.1]].',
      c: 'In 2025 comps fell 1.7%, cheaper rivals that look just as fresh are growing, and each point of food cost is ~$120M of profit [[Chipotle]].',
      q: 'Is Chipotle’s value-add recognized and rewarded — and should it cut food costs?',
      a: 'Customers reward the value-add they can see and only indirectly the value-add they must take on faith, so Chipotle should protect visible quality and its credible sourcing commitment rather than harvest the invisible costs.',
      supports: [
        { label: 'Reason 1', point: 'The visible value-add is clearly rewarded.', evidence: ['~20% price increases 2021–24 with traffic growing', 'Skimpflation backlash: customers police the bowl'] },
        { label: 'Reason 2', point: 'The invisible value-add is rewarded only through trust.', evidence: ['Rivals with conventional sourcing grow', 'Crisis: net income $476M → $23M when trust broke'] },
        { label: 'Reason 3', point: 'Harvesting the invisible spend risks the commitment that makes the premium last.', evidence: ['Premium harvest → slow, hard-to-reverse erosion [[Porter §4]]', 'Credible commitment = durability [[Diff §7]]'] },
      ],
      competing: '“Cut what customers can’t see.” It fails on its own terms: for a credence attribute, being discoverable is the risk — and the savings are small against the trust asset.',
      memo: 'Inductive: three parallel claims about how each kind of value-add is (or isn’t) rewarded, rolling up to the recommendation.',
    },
  },
  checkIds: ['S09-q01', 'S09-q02', 'S09-q04', 'S09-q06', 'S09-q08', 'S09-q10', 'S09-q12', 'S09-q14', 'S09-q17', 'S09-q19'],
  bank: [
    Q({ id: 'S09-q01', kind: 'concept', src: 'Diff §1', stem: 'Which statement best captures “being different is not differentiation”?', correct: 3, options: [
      { text: 'Differentiation requires a patent.', why: 'Not required.' },
      { text: 'Only luxury goods can differentiate.', why: 'Old Dominion is freight.' },
      { text: 'Every unique feature earns a premium.', why: 'The opposite.' },
      { text: 'A firm can be distinctive and earn nothing; differentiation requires raising WTP by more than the cost of creating it, perceived and paid for by buyers.', why: '§1.' },
    ] }),
    Q({ id: 'S09-q02', kind: 'concept', src: 'Diff §3', stem: 'What is the “signature” of a real premium in the accounts?', correct: 0, options: [
      { text: 'A share of profit that share of volume doesn’t explain, or raising price without losing volume.', why: 'Apple, Ferrari.' },
      { text: 'High advertising spend.', why: 'Spending isn’t a premium.' },
      { text: 'High customer satisfaction scores.', why: 'Not a realized premium.' },
      { text: 'Low costs.', why: 'That’s cost leadership.' },
    ] }),
    Q({ id: 'S09-q03', kind: 'quant', src: 'Diff §3', stem: 'Ferrari: shipments −3.7%, car and parts revenue +8.0%. Revenue per car rose roughly from €440k to…', correct: 2, options: [
      { text: '€424k', why: 'That would be a fall.' },
      { text: '€440k', why: 'Unchanged — inconsistent with the numbers.' },
      { text: '€484k', why: 'The brief: “about 484,000 euros in the quarter.” (≈ 1.08/0.963 × 440)' },
      { text: '€600k', why: 'Too high.' },
    ] }),
    Q({ id: 'S09-q04', kind: 'apply', src: 'Diff §3, §8', stem: '**Aster Software** (fictional) improved profits 12% last year with no price change — all from lower hosting costs. The brief would call this…', correct: 1, options: [
      { text: 'differentiation, because profit rose.', why: 'Where the gain lands matters.' },
      { text: 'a cost achievement (operating improvement), not differentiation — and cost achievements diffuse.', why: '§3 and §8.' },
      { text: 'a network effect.', why: 'No.' },
      { text: 'a premium harvest.', why: 'Nothing was trimmed from what customers buy.' },
    ] }),
    Q({ id: 'S09-q05', kind: 'concept', src: 'Diff §2', stem: 'A credence good is one where quality…', correct: 3, options: [
      { text: 'is known before purchase.', why: 'That’s a search good.' },
      { text: 'is known only after purchase.', why: 'That’s an experience good.' },
      { text: 'is guaranteed by law.', why: 'No.' },
      { text: 'is never known — so differentiation can’t be demonstrated, only signaled.', why: 'Medical, legal, repair.' },
    ] }),
    Q({ id: 'S09-q06', kind: 'concept', src: 'Diff §4', stem: 'The fair-trade label experiment showed…', correct: 0, options: [
      { text: 'the same attribute held an 8% price rise on one coffee and lost ~30% of volume on another for 9% — WTP figures without a product and price point are close to meaningless.', why: '§4.' },
      { text: 'fair-trade labels always raise WTP.', why: 'Opposite results on two products.' },
      { text: 'surveys predict behavior well.', why: 'The brief excludes surveys.' },
      { text: 'labels reduce sales.', why: 'Sales rose ~10% with the label.' },
    ] }),
    Q({ id: 'S09-q07', kind: 'case', src: 'Diff §4', stem: 'Pharmacists buy national-brand headache remedies 9% of the time vs. 26% for average consumers. What does the brief conclude?', correct: 2, options: [
      { text: 'Pharmacists are cheap.', why: 'Not the point.' },
      { text: 'National brands are better.', why: 'The products are chemically identical.' },
      { text: 'Part of brand equity is a rent on buyer ignorance, and it erodes as information improves.', why: '§4.' },
      { text: 'Store brands are differentiated.', why: 'Not the conclusion.' },
    ] }),
    Q({ id: 'S09-q08', kind: 'apply', src: 'Diff §6', stem: '**Glide Scooters** (fictional) drops its $500 premium bike to $300 within a year as rivals catch up, but its $25/month subscription keeps 70% gross margins. Which failure — and what survived?', correct: 1, options: [
      { text: 'Fire Phone pattern — nobody would pay.', why: 'People did pay for the subscription.' },
      { text: 'Peloton pattern — the hardware premium didn’t survive normalization; the relationship (subscription) did.', why: '§6 Peloton.' },
      { text: 'JCPenney pattern.', why: 'Not removing something buyers enjoyed.' },
      { text: 'Blockbuster pattern.', why: 'Not matching a rival’s feature.' },
    ] }),
    Q({ id: 'S09-q09', kind: 'case', src: 'Diff §6', stem: 'Why did Blockbuster’s elimination of late fees fail?', correct: 3, options: [
      { text: 'Customers wanted late fees.', why: 'Customers liked no late fees.' },
      { text: 'Netflix copied it.', why: 'Blockbuster copied Netflix.' },
      { text: 'Nobody noticed.', why: 'It drew a settlement with 48 attorneys general.' },
      { text: 'Matching a rival’s feature destroyed its own profit formula (late fees were $250–300M of operating income).', why: '§6.' },
    ] }),
    Q({ id: 'S09-q10', kind: 'concept', src: 'Diff §7', stem: 'Which durability mechanism is “the least discussed and often the most powerful”?', correct: 0, options: [
      { text: 'Credible commitment — a promise rivals could match in words but won’t sign, because it requires surrendering an option.', why: '§7.' },
      { text: 'Advertising.', why: 'Not one of the four.' },
      { text: 'Path dependence.', why: 'One of four, not the one singled out.' },
      { text: 'Low cost.', why: 'Not a differentiation durability mechanism.' },
    ] }),
    Q({ id: 'S09-q11', kind: 'quant', src: 'Diff §5', stem: 'Average annual ROIC fade is 0.21; utilities 0.30, consumer staples 0.10. What does a higher fade rate mean?', correct: 2, options: [
      { text: 'Advantages last longer.', why: 'Reversed.' },
      { text: 'Returns rise over time.', why: 'Fade means converging to the mean.' },
      { text: 'Superior returns erode toward the mean faster.', why: 'Fade = 1 − persistence.' },
      { text: 'Nothing about advantage.', why: 'It’s the measure of decay.' },
    ] }),
    Q({ id: 'S09-q12', kind: 'case', src: 'Chipotle Ex.5', stem: 'What do Qdoba, Cafe Rio and Costa Vida have in common, per the case?', correct: 1, options: [
      { text: 'They match Chipotle’s sourcing standards.', why: 'None do.' },
      { text: 'They invest in freshness customers can SEE and skip the sourcing standards customers must take on faith — a market test of the invisible standards.', why: 'Exhibit 5 note.' },
      { text: 'They are all company-owned.', why: 'Qdoba and Costa Vida are franchised.' },
      { text: 'They charge more than Chipotle.', why: 'Not stated; Qdoba includes extras free.' },
    ] }),
    Q({ id: 'S09-q13', kind: 'quant', src: 'Chipotle Ex.6', stem: 'Food costs are ~$3.5B (29.6% of ~$11.9B revenue). Cutting food cost by 150 basis points saves about…', correct: 3, options: [
      { text: '$35M', why: 'Too small.' },
      { text: '$525M', why: 'That’s 15% of food cost, not 150 bps of revenue.' },
      { text: '$1.2B', why: 'That’s 10 points.' },
      { text: '$180M (1.5 × ~$120M)', why: 'Each 100 bps ≈ $120M.' },
    ] }),
    Q({ id: 'S09-q14', kind: 'case', src: 'Chipotle', stem: 'Which Chipotle evidence is the cleanest test of willingness to pay?', correct: 0, options: [
      { text: '~20% cumulative price increases (2021–24) while transaction counts kept growing.', why: 'Price up, volume not down.' },
      { text: '4,056 restaurants.', why: 'Scale, not WTP.' },
      { text: 'Digital at 36.7% of sales.', why: 'Convenience, not proof of a premium.' },
      { text: 'No franchising.', why: 'A structural choice.' },
    ] }),
    Q({ id: 'S09-q15', kind: 'concept', src: 'S9 slides 8', stem: 'In the four actions framework, Cirque du Soleil removing animal shows is…', correct: 2, options: [
      { text: 'Reduce.', why: 'It was removed entirely.' },
      { text: 'Create.', why: 'Create is new factors.' },
      { text: 'Eliminate.', why: 'A factor the industry took for granted.' },
      { text: 'Raise.', why: 'No.' },
    ] }),
    Q({ id: 'S09-q16', kind: 'quant', src: 'S9 slides 36-37', stem: 'Demand Q = 30,000 − 20,000P. At P = $0.75, consumer surplus is…', correct: 1, options: [
      { text: '$11,250', why: 'Forgot the ½.' },
      { text: '$5,625', why: 'Q = 15,000; choke $1.50; ½ × 0.75 × 15,000.' },
      { text: '$22,500', why: 'That’s total area to the choke price × Q.' },
      { text: '$7,500', why: 'Arithmetic slip.' },
    ] }),
    Q({ id: 'S09-q17', kind: 'concept', src: 'S9 slides 38', stem: 'Student and senior discounts are which kind of price discrimination?', correct: 3, options: [
      { text: 'First degree.', why: 'That’s each customer’s reservation price (auctions).' },
      { text: 'Second degree.', why: 'That’s by quantity (bulk discounts).' },
      { text: 'Predatory pricing.', why: 'Not price discrimination.' },
      { text: 'Third degree — different prices to distinct groups.', why: 'Slide 38.' },
    ] }),
    Q({ id: 'S09-q18', kind: 'quant', src: 'S9 slides 34', stem: 'A survey: 55% score 9–10, 25% score 7–8, 20% score 1–6. Net Promoter Score?', correct: 0, options: [
      { text: '35', why: '55 − 20.' },
      { text: '80', why: 'Added promoters and passives.' },
      { text: '55', why: 'Ignored detractors.' },
      { text: '30', why: 'Arithmetic slip.' },
    ] }),
    Q({ id: 'S09-q19', kind: 'apply', src: 'Diff §2', stem: '**Summit Freight** (fictional) charges 30% more than rivals and wins because it delivers on time 99% of the time with almost no damage claims. Source of WTP?', correct: 2, options: [
      { text: 'Identity and signal.', why: 'Not about what owning it says.' },
      { text: 'Switching and integration.', why: 'Not described.' },
      { text: 'Risk reduction — “what most industrial premiums actually are” (the Old Dominion pattern).', why: '§2.' },
      { text: 'Performance only.', why: 'Lower probability of failure is risk reduction.' },
    ] }),
    Q({ id: 'S09-q20', kind: 'apply', src: 'Porter §4', stem: 'A premium restaurant chain (fictional) quietly switches to cheaper ingredients customers can’t detect, keeps prices, and posts record margins for three years. Porter’s name for this?', correct: 1, options: [
      { text: 'Over-serving.', why: 'Opposite.' },
      { text: 'The premium harvest — excellent years, then erosion that is very hard to reverse.', why: 'Porter §4.' },
      { text: 'Operational effectiveness.', why: 'It’s trimming what buyers pay for.' },
      { text: 'Focus.', why: 'No.' },
    ] }),
    Q({ id: 'S09-q21', kind: 'concept', src: 'S9 slides 18-29', stem: 'Mapping the consumption chain means…', correct: 3, options: [
      { text: 'mapping your suppliers.', why: 'That’s the supply chain.' },
      { text: 'mapping your cost drivers.', why: 'That’s the value chain.' },
      { text: 'surveying WTP.', why: 'No.' },
      { text: 'looking for differentiation at every step of the customer’s experience — awareness, finding, choosing, buying, delivery, payment, storage, use, returns, repair/disposal.', why: 'Listerine → Patagonia examples.' },
    ] }),
  ],
  shorts: [
    { id: 'S09-sa1', session: 'S09', src: 'Diff §1, Fig.1', prompt: 'Use the value stick to explain the difference between differentiation and cost leadership.', model: 'Value created = WTP − supplier opportunity cost. Differentiation raises WTP (the top) by more than it raises cost; cost leadership lowers cost (the bottom) by more than it lowers WTP. Only differentiation creates the option to charge more.', points: ['Four levels', 'Top vs. bottom', 'Option to charge more'] },
    { id: 'S09-sa2', session: 'S09', src: 'Diff §8', prompt: 'Run the six-step diagnostic on any differentiated firm (2–4 sentences).', model: 'Buyer and alternative; realized premium number; source (one of six) and verifiable vs. signaled; durability mechanism; where the gain lands; what would kill it in five years and its early signal (gross margin at constant mix).', points: ['All six steps', 'Specific firm'] },
    { id: 'S09-sa3', session: 'S09', src: 'Chipotle', prompt: 'Should Chipotle cut food costs? Give your answer and one reason.', model: 'Not the visible ones (portions — highest detection risk) and not by quietly harvesting the sourcing commitment, because trust in a partly credence attribute underwrites the premium and the 2015–16 crisis shows its value; cut elsewhere or make the invisible visible.', points: ['Clear answer', 'Visibility/trust reasoning'] },
    { id: 'S09-sa4', session: 'S09', src: 'Diff §7', prompt: 'Explain credible commitment with an example.', model: 'A promise structured so the firm can’t walk it back — guarantees, irrevocable governance, published pricing rules — which rivals won’t match because it means giving up an option (e.g., Costco’s $1.50 hot dog; Cost Plus Drugs’ published formula).', points: ['Definition', 'Why rivals won’t copy', 'Example'] },
  ],
  written: {
    prompt: '**Timed (20 min).** **Peak Outfitters** (fictional) wants to add a lifetime repair guarantee and a 20% price premium on its jackets. Use the Differentiation Brief to advise whether this will create real differentiation and how to tell within a year.',
    minutes: 20,
    model: 'Buyer/alternative: outdoor buyers choosing vs. comparable mid-price brands. Source: risk reduction (and identity) — a guarantee is a credible commitment if it’s structural and costly to walk back. Durability: credible commitment (rivals won’t sign the liability). Tests within a year: realized price vs. matched competitor, volume at parity, elasticity at the shelf (not a survey), retention/repeat, where the gain lands. Risk: cost of repairs exceeding the premium (premium must exceed the cost of the uniqueness).',
    rubric: ['Identifies source(s) of WTP', 'Durability mechanism', 'Names concrete tests', 'Checks premium > cost', 'Clear recommendation'],
  },
  oral: { prompt: 'Is what Chipotle sees as value-add recognized and rewarded by customers? Defend your answer.', probes: ['What’s your evidence of a premium?', 'Why do Qdoba and Cafe Rio succeed?', 'Is sourcing a credence attribute?', 'Would you cut portions? Sourcing?'] },
  summary: {
    answer: 'Partly: customers clearly reward what they can see (fresh prep, the line, portions — prices rose ~20% with traffic growing), and reward the invisible sourcing only through trust. Chipotle should protect visible quality and its credible sourcing commitment rather than harvest invisible costs.',
    numbers: [
      { label: 'Food, beverage & packaging', value: '29.6% of revenue (~$3.5B); 100 bps ≈ $120M', src: 'Chipotle Ex.6' },
      { label: 'Price increases 2021–24', value: '~20% with traffic growing', src: 'Chipotle Ex.4' },
      { label: 'Crisis', value: 'Comps −20.4%; net income $476M → $23M', src: 'Chipotle Ex.1' },
      { label: 'Operating margin FY2024', value: 'Chipotle 16.9% vs. Papa John’s ~5%', src: 'Chipotle Ex.3' },
      { label: 'Average ROIC fade', value: '0.21 per year', src: 'Diff §5' },
      { label: 'Consumer surplus example', value: '$5,625', src: 'S9 slides 37' },
    ],
    frameworkBullets: ['Different ≠ differentiated; perceive AND pay', 'Value stick: WTP / price / cost / supplier', 'Six sources; credence → signal', 'Six premium tests; field not surveys', 'Five failures; four durability mechanisms', 'Canvas, four actions, JTBD, consumption chain'],
    caseBullets: ['Visible vs. invisible value-add', 'Rivals = market test of invisible standards', 'Skimpflation: customers watch the bowl', 'Don’t harvest the commitment'],
  },
  crossLinks402: [{ topic: 'Demand, consumer surplus, elasticity and price discrimination', note: 'STRAT 402 computes consumer surplus, elasticities and revenue-maximizing prices with calculus.', href: '#/learn/S07' }],
}
