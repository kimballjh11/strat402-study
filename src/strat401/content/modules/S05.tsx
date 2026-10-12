import { useState } from 'react'
import { DataTable, HBar } from '../../components/Charts'
import { Cite, SiteBadge } from '../../components/Cite'
import { NoteBox } from '../../components/Note'
import { R } from '../../components/Rich'
import { HhiSim } from '../../widgets/HhiSim'
import type { Mcq, ModuleDef } from '../types'

function Diagram() {
  return (
    <figure className="card p-3 space-y-3">
      <figcaption className="font-semibold">
        Concentration, and how to break into it <Cite tag="HHI Fig.1-2" /> <Cite tag="Cracking Fig.1" />
      </figcaption>
      <div className="grid gap-2 md:grid-cols-2 text-sm">
        <div className="surface-2 rounded p-2">
          <strong>C4</strong> = sum of the top four shares. Blind to how share is split inside the four and to everything outside.
          <div className="text-xs mt-1">65/5/5/5 (+5×4) and 20/20/20/20 (+5×4) both have C4 = 80 — but HHI 4,400 vs. 1,700, 2,700 apart.</div>
        </div>
        <div className="surface-2 rounded p-2">
          <strong>HHI</strong> = Σ (share²), 0–10,000. Squaring weights big firms. <strong>ΔHHI = 2·s₁·s₂</strong>. 10,000 ÷ HHI = equivalent number of equal firms.
          <div className="text-xs mt-1">2023 Guidelines: &lt;1,000 · 1,000–1,800 · &gt;1,800. Presumption: post &gt; 1,800 AND Δ &gt; 100, OR share &gt; 30% AND Δ &gt; 100.</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5 text-xs text-center">
        <div className="card p-2"><strong>Leverage what you own</strong><br />capacity already paid for (T-Mobile 5G broadband, Amazon ads)</div>
        <div className="card p-2"><strong>Reconfigure the chain</strong><br />make the incumbent’s assets irrelevant (SpaceX reuse, Cost Plus Drugs)</div>
        <div className="card p-2"><strong>Create a niche</strong><br />one the incumbent can’t match without damaging what it sells (Athletic Brewing)</div>
      </div>
      <p className="text-xs muted">Combine at least two. The strongest pairing: reconfigured chain + niche (Hims & Hers). The entry buys time, not permanence.</p>
    </figure>
  )
}

function Exhibits() {
  return (
    <div className="space-y-4">
      <DataTable
        caption={<>Exhibit 2 — worked calculations <Cite tag="HHI Ex.2" /></>}
        head={['Market', 'C4', 'HHI', 'Merger', 'Δ', 'Post', 'Presumption?']}
        rows={[
          ['30/25/20/15/10', '90', '2,250', '20 + 15', '+600', '2,850', 'Yes — highly concentrated, Δ > 100'],
          ['35/30/20/15', '100', '2,750', '35 + 15', '+1,050', '3,800', 'Yes, both tests (50% share)'],
          ['20/20/20/20 + 5×4', '80', '1,700', '20 + 5', '+200', '1,900', 'Yes — crosses into highly concentrated'],
          ['Ten firms at 10', '40', '1,000', '10 + 10', '+200', '1,200', 'No — below 1,800, share 20%'],
          ['65 + 5×7', '80', '4,400', '5 + 5', '+50', '4,450', 'No presumption from the change'],
          ['12 and 8 in any market', '', '', '12 + 8', '+192', '', 'Depends on the pre-merger level'],
        ]}
      />
      <DataTable
        caption={<>Real cases: market definition did the work <Cite tag="HHI Ex.5" /></>}
        head={['Case', 'Market as defined', 'HHI evidence', 'Outcome']}
        rows={[
          ['Staples / Office Depot 1997', 'Consumable office supplies via office superstores, 42 metros', 'Pre 3,597–6,944; avg Δ 2,715', 'Enjoined; abandoned'],
          ['Staples / Office Depot 2016', 'Consumable supplies to large business customers (US)', '3,270 → 6,265', 'Enjoined; abandoned'],
          ['Sysco / US Foods 2015', 'Broadline foodservice to national customers', '5,836, Δ 2,800; San Diego 10,000', 'Enjoined; abandoned in 6 days'],
          ['AT&T / T-Mobile 2011', 'Mobile wireless; enterprise & government', 'National >3,100, Δ ~700', 'Abandoned, no merits ruling'],
          ['Tapestry / Capri 2024', 'Accessible luxury handbags', 'Δ 1,449; 59% share; 30% threshold adopted', 'Enjoined; abandoned'],
          ['Whole Foods / Wild Oats 2007–09', 'Premium natural/organic supermarkets (contested)', 'No HHI ever published', 'Settled; 32 stores + brand divested'],
          ['Kroger / Albertsons 2024', 'Supermarkets & supercenters, local', '1,922 markets presumptive (2023) vs. 1,574 (2010)', 'Enjoined; abandoned next day'],
        ]}
      />
      <HBar
        title="Two ways into running shoes (latest full year, billions)"
        rows={[{ label: 'Under Armour footwear (direct assault)', value: 1.1 }, { label: 'Hoka (indirect)', value: 2.59 }, { label: 'On (indirect, CHF)', value: 3.01 }]}
        digits={2}
        highlight="On (indirect, CHF)"
        note={<>Under Armour footwear −11%; Hoka +15.9%; On +30% <Cite tag="Cracking Ex.2" /></>}
      />
    </div>
  )
}

function SearchPlanner() {
  const [shown, setShown] = useState(false)
  return (
    <section className="card p-4 space-y-3" data-testid="cracking-planner">
      <h3 className="font-semibold text-lg">In-class question: how would you crack internet search?</h3>
      <p className="text-sm">
        Work the Cracking Markets planning discipline <Cite tag="Cracking §8" />. Answer each prompt, then compare.
      </p>
      <NoteBox id="S05-search-1" label="1. What would the incumbent have to GIVE UP to respond to you? (booked revenue, channel conflict, cannibalized margin, organizational contradiction)" rows={2} />
      <NoteBox id="S05-search-2" label="2. What can you bring at less than full cost (assets you already own)?" rows={2} />
      <NoteBox id="S05-search-3" label="3. Which activity in the chain exists only because of a constraint that has since relaxed?" rows={2} />
      <NoteBox id="S05-search-4" label="4. Beachhead and path off it — and what will still hold when the incumbent responds in 3–5 years?" rows={2} />
      <button type="button" className="btn btn-sm" onClick={() => setShown((s) => !s)}>
        {shown ? 'Hide' : 'Show'} a model answer
      </button>
      {shown && (
        <div className="callout text-sm space-y-2">
          <R t="**Asymmetry:** the incumbent earns its money from ads placed beside a list of links. An entrant that answers the question directly — without the results page — attacks something the incumbent can only match by cannibalizing its own ad revenue (the Cost Plus Drugs / Athletic Brewing shape) [[Cracking §5, §8]]." />
          <R t="**Leverage owned assets:** an installed base the entrant already controls (devices, an operating system or browser default, a productivity suite, an AI assistant, commerce or social data) lowers the cost of reaching users — the T-Mobile / Amazon ads pattern [[Cracking §3]]." />
          <R t="**Reconfigure the chain:** the ten-blue-links step existed because machines couldn’t synthesize answers; that constraint has relaxed. Skip the page, charge by subscription or per answer [[Cracking §4]]." />
          <R t="**Niche first:** a segment the incumbent serves awkwardly — ad-free/private search, professional or vertical research — then expand [[Cracking §5]]." />
          <R t="**After entry:** assume the incumbent responds in 3–5 years (as Nike did in running); build what still holds — the user relationship and proprietary data from the niche [[Cracking §7]]." />
          <SiteBadge>Application of the framework — the materials give no model answer to this question</SiteBadge>
        </div>
      )}
      <h3 className="font-semibold text-lg pt-2">In-class question: Netflix or Paramount buying Warner Bros?</h3>
      <p className="text-sm">
        The materials give no shares for this deal. Load “Your own market” above, enter shares you can defend for a <strong>narrow</strong> market (premium subscription streaming) and a <strong>broad</strong> one (all TV and video, including YouTube and TikTok), and merge the bidder with Warner Bros in each. Then argue: which definition would the agency push, which would the parties push, and does the presumption bite? <Cite tag="HHI §5" />
      </p>
      <NoteBox id="S05-wb" label="Your answer: will the DOJ allow either merger? Which makes the most sense? Who should pay the most?" rows={4} />
      <details className="text-sm">
        <summary className="cursor-pointer font-semibold">How to structure the answer</summary>
        <R t="**Regulatory:** compute ΔHHI = 2·s₁·s₂ under both definitions; the narrow one likely crosses the 1,800/100 or 30% share tests, the broad one may not — so the fight is over market definition (Whole Foods/Wild Oats) [[HHI §4-5]]. **Strategic fit:** Netflix’s scale logic says a library is worth most to whoever amortizes it over the most subscribers (content cost per subscriber falls with N) [[Netflix Ex.5]]; Paramount’s logic is defensive scale. **Who should pay most:** the buyer with the highest value net of the regulatory risk discount — a buyer more likely to trigger the presumption must discount its bid." />
      </details>
    </section>
  )
}

const Q = (o: Omit<Mcq, 'session'>): Mcq => ({ ...o, session: 'S05' })

export const S05: ModuleDef = {
  id: 'S05',
  short: 'HHI & C4 · Cracking Markets',
  framework: {
    oneLiner: 'Measure concentration with **HHI** (sum of squared shares), not just C4; a merger adds **ΔHHI = 2·s₁·s₂**; the agencies presume harm above **1,800 with Δ > 100** (or a **30%+ share**) — but **market definition** decides the answer. To break into a concentrated market, attack **indirectly**: leverage what you own, reconfigure the chain, build a niche — combined [[HHI §3-5]] [[Cracking §1]].',
    analogy: 'C4 is like saying “the top four kids ate 80% of the pizza” — it can’t tell you whether one kid ate 65% or four kids ate 20% each. HHI squares the slices, so the one greedy kid shows up. And if you want some pizza, don’t fight the biggest kid for his slice; bring a dessert he isn’t guarding [[HHI §2-3]] [[Cracking §2]].',
    intuition: [
      'Concentration is the most-used proxy for **rivalry** — and the same arithmetic drives antitrust review of any big merger [[HHI §1]].',
      '**C4** is easy and public but blind to distribution inside the top four and to everything outside. **HHI** squares shares so asymmetry shows; it’s what the DOJ/FTC use. DOJ example: 30/30/20/20 → 2,600 [[HHI §2-3]].',
      'Invert it: **10,000 ÷ HHI** = the number of equal firms that would score the same (2,600 ≈ 3.8 firms) [[HHI §3]].',
      'For a merger, **ΔHHI = 2 × s₁ × s₂** regardless of the rest of the market (12% + 8% → +192) [[HHI §3]].',
      'The **2023 Guidelines** (retained in 2025): above 1,800 is highly concentrated; Δ > 100 is significant; either the concentration test or a merged share above 30% (with Δ > 100) triggers a **rebuttable presumption** — tighter than 2010’s 2,500/200 [[HHI §4]].',
      '**Market definition decides it** (hypothetical monopolist / SSNIP test). Staples/Office Depot was blocked twice under two different definitions; Whole Foods/Wild Oats never reached an HHI at all [[HHI §5]].',
      'Concentration doesn’t show entry conditions, buyer power, capacity, potential competition or non-price competition [[HHI §6]].',
      '**Cracking well-guarded markets:** attractive markets are attractive because they’re defensible — entrants to the best markets earn ~30% less. Don’t duplicate the incumbent; attack where it has decided not to defend, using at least two of the three moves — and plan for the incumbent’s eventual response [[Cracking §1, §7, §9]].',
    ],
    howToRun: [
      '**1. Define the market** two ways (narrow and broad), product and geography [[HHI §5]].',
      '**2. Compute C4 and HHI** for each; translate HHI to a numbers-equivalent [[HHI §2-3]].',
      '**3. For a merger, compute ΔHHI = 2·s₁·s₂,** post-merger HHI, and merged share; test against 1,800/100 and 30%/100 [[HHI Ex.3]].',
      '**4. List rebuttals:** entry, failing firm, no real overlap, too-narrow market; and what HHI misses (buyer power, capacity, potential entrants, labor markets) [[HHI §4, §6]].',
      '**5. If you’re the entrant:** ask what the incumbent must give up to respond; inventory assets you can bring at less than full cost; find the activity that exists only because of a relaxed constraint; name the beachhead and the path off it [[Cracking §8]].',
      '**6. Plan for year 3–5:** what will still hold when the incumbent fights back? [[Cracking §8-9]]',
    ],
    recall: [
      { id: 'S05-thresh', title: '2023 Merger Guidelines numbers', prompt: 'Bands and the two presumption tests.', items: [{ name: 'Unconcentrated below 1,000' }, { name: 'Moderately concentrated 1,000–1,800' }, { name: 'Highly concentrated above 1,800' }, { name: 'Concentration test: post > 1,800 AND Δ > 100' }, { name: 'Share test: merged share > 30% AND Δ > 100' }, { name: '2010 lines were 2,500 and 200' }], src: 'HHI Ex.3' },
      { id: 'S05-blind', title: 'What concentration does NOT tell you', prompt: 'Five blind spots.', items: [{ name: 'Entry conditions (contestability)' }, { name: 'Buyer power' }, { name: 'Capacity and cost position' }, { name: 'Dynamic and potential competition' }, { name: 'Non-price dimensions (quality, innovation, privacy, labor)' }], src: 'HHI §6' },
      { id: 'S05-moves', title: 'Three ways to crack a well-guarded market', prompt: 'Bryce & Dyer.', items: [{ name: 'Leverage existing assets' }, { name: 'Reconfigure the value chain' }, { name: 'Create a niche the incumbent can’t match cheaply' }, { name: 'Combine at least two (strongest: chain + niche)' }], src: 'Cracking §1, §6' },
      { id: 'S05-after', title: 'Three things the 2007 article couldn’t see', prompt: 'What happens after entry.', items: [{ name: 'The incumbent buys — and the acquisition often destroys what it bought' }, { name: 'Niches decay faster than they used to' }, { name: 'The incumbent eventually responds, and can win ground back' }], src: 'Cracking §7' },
      { id: 'S05-props', title: 'Cracking’s three propositions', prompt: 'Name them.', items: [{ name: 'Attractiveness and accessibility are inversely related (30% penalty is about structure)' }, { name: 'The entrant’s advantage is a lower cost of competing, not a bigger budget' }, { name: 'Indirect entry buys time, not permanence' }], src: 'Cracking §9' },
    ],
    diagram: Diagram,
    variants: [
      {
        title: 'Capital One + Discover: the slide’s ΔHHI vs. the formula',
        brief: 'The brief: ΔHHI is **always 2 × s₁ × s₂**, “regardless of what the rest of the market looks like” [[HHI §3, Ex.2]].',
        slides: 'The S7 slide: Capital One 13.1% + Discover 9.1% → post-merger share **22.1%**, HHI 1,085.49 → 1,319.48, **change 233.99**; C4 55.5% → 64.5% [[S7 slides 2]].',
        differ: 'By formula, 2 × 13.1 × 9.1 = **238.42**, and 13.1 + 9.1 = 22.2, not 22.1. Using 22.2 gives post-merger HHI 1,323.91 and post-merger C4 64.6 (the slide’s 64.5 also reflects 22.1). Pre-merger HHI and C4 match.',
        guess: '**Guess:** a rounding or typo in the combined share on the slide (22.1 instead of 22.2) carried into the HHI. Use the formula on the exam; either way the deal is moderately concentrated with Δ > 100 but post-HHI under 1,800 and share under 30% — no structural presumption.',
      },
    ],
    newScenarios: [
      { prompt: 'Two regional airlines with 18% and 15% of a city-pair market propose to merge. The market’s HHI is 1,650. Is it presumed unlawful?', answer: 'ΔHHI = 2 × 18 × 15 = 540; post = 2,190 > 1,800 with Δ > 100 → concentration test met; merged share 33% > 30% → share test met too. Presumed (rebuttable) [[HHI §3-4]].' },
      { prompt: 'A market has HHI 4,300 and a 4% firm buys a 3% firm. Presumption?', answer: 'ΔHHI = 2 × 4 × 3 = 24, below 100 → no presumption from the change, even though the market is highly concentrated — “though the market invites other theories” [[HHI Ex.2]].' },
      { prompt: '**Greenleaf Yogurt** (fictional) wants into a grocery dairy aisle dominated by two giants. Using Cracking Markets, design an entry.', answer: 'Avoid the incumbents’ strongest ground (national supermarket shelf, mass advertising). Combine a niche they can’t match without cannibalizing (e.g., a functional or high-protein format) with a reconfigured chain (direct-to-consumer, gyms, specialty stores). Plan for an incumbent response and for the risk that being acquired kills the channel that made it work [[Cracking §5-8]].' },
    ],
  },
  argument: {
    intro: 'Two briefs, one session: how to measure concentration properly (and what it can’t tell you), and how a newcomer gets into a concentrated, attractive market at all.',
    propositions: [
      '**Concentration proxies rivalry;** HHI, not C4, is what the agencies apply [[HHI §1-2]].',
      '**ΔHHI = 2·s₁·s₂** tells a team before any adviser whether a deal is inside the presumption zone [[HHI §3]].',
      '**A presumption is not a verdict** — it shifts who must prove what, which shapes the length, cost and odds of review [[HHI §4]].',
      '**Market definition decides the answer;** report two definitions [[HHI §5]].',
      '**Concentration misses entry, buyer power, capacity, potential competition and non-price competition** [[HHI §6]].',
      '**Attractiveness and accessibility are inversely related;** the way around the 30% penalty is to enter where the incumbent has chosen not to defend [[Cracking §9]].',
      '**The entrant’s edge is a lower cost of competing, not a larger budget** (Under Armour had the bigger budget) [[Cracking §9]].',
      '**Indirect entry buys time, not permanence;** build what survives the incumbent’s response [[Cracking §9]].',
    ],
  },
  case: {
    protagonist: 'No case document — the session runs on the two briefs plus in-class questions: crack internet search; will the DOJ allow Netflix or Paramount to buy Warner Bros; which merger makes the most sense; who should pay the most [[Canvas S5]].',
    decision: 'How does concentration affect strategy, and how do you break into concentrated markets? [[Canvas S5]]',
    timeline: [
      { when: '2007', what: 'Bryce & Dyer (BYU) publish “Strategies to Crack Well-Guarded Markets” (HBR) [[Cracking Ex.4]]' },
      { when: '2010', what: 'Horizontal Merger Guidelines: 2,500 / 200 [[HHI §4]]' },
      { when: 'Dec 2023', what: '2023 Merger Guidelines: 1,800 / 100, plus 30% share test' },
      { when: 'Oct 2024', what: 'Tapestry/Capri enjoined; court adopts the 30% threshold' },
      { when: 'Dec 2024', what: 'Kroger/Albertsons enjoined' },
      { when: 'Feb 2025', what: 'Agencies retain the 2023 Guidelines' },
      { when: '2025–26', what: 'PepsiCo buys poppi; Nike rebuilds running; Hims & Hers distributes Wegovy [[Cracking §6-7]]' },
    ],
    exhibits: Exhibits,
  },
  tool: {
    title: 'HHI and merger simulator + the cracking-markets planner',
    intro: 'Load the brief’s worked examples (the simulator reproduces every Exhibit 2 number), then build your own markets. Below it, work the in-class questions.',
    render: () => (
      <div className="space-y-8">
        <HhiSim />
        <SearchPlanner />
      </div>
    ),
  },
  coldCalls: [
    { id: 'c1', level: 'Facts', q: 'Compute the HHI for 30/30/20/20.', model: '30² + 30² + 20² + 20² = 900 + 900 + 400 + 400 = **2,600** — the DOJ’s own example; highly concentrated under 2023 lines; ~3.8 equal firms [[HHI §3]].', weak: '100, because the shares add to 100.', whyWeak: 'That’s C4-style addition; HHI squares.' },
    { id: 'c2', level: 'Facts', q: 'A 12% firm buys an 8% firm. ΔHHI?', model: '2 × 12 × 8 = **192**, regardless of the rest of the market. Whether that’s presumed depends on the post-merger level [[HHI §3, Ex.2]].', weak: '20, the combined share.', whyWeak: 'Confuses share with index change.' },
    { id: 'c3', level: 'Analysis', q: 'Why don’t the agencies rely on C4?', model: 'It’s blind to how share is distributed inside the top four and to everyone outside. 65/5/5/5 and 20/20/20/20 (each plus four 5% firms) both have C4 = 80, but HHIs of 4,400 and 1,700 — one highly concentrated, one not [[HHI §2, Fig.1]].', weak: 'C4 is old.', whyWeak: 'No mechanism.' },
    { id: 'c4', level: 'Analysis', q: 'What changed in 2023, and why does it matter?', model: 'The thresholds dropped from 2,500/200 to 1,800/100 (restoring pre-2010 figures) and a 30% share test was made explicit, bringing many more deals inside the presumption — Kroger/Albertsons: 1,922 presumptive local markets vs. 1,574 under 2010 [[HHI §4, Ex.5]].', weak: 'Mergers are now illegal.', whyWeak: 'The presumption is rebuttable.' },
    { id: 'c5', level: 'Analysis', q: 'How does concentration affect strategy?', model: 'Fewer, larger rivals can avoid price wars (milder rivalry, higher returns), but growth by acquisition gets harder — compute ΔHHI first; and concentrated, profitable markets attract indirect entrants who attack where incumbents don’t defend [[HHI §1, §3]] [[Cracking §1]].', weak: 'More concentration means more profit.', whyWeak: 'Ignores the dimension of rivalry, contestability and regulatory limits.' },
    { id: 'c6', level: 'Analysis', q: 'Why did Red Bull succeed where Virgin Cola failed?', model: 'Virgin attacked the colas where they were strongest (shelf, brand) and finished under 1%. Red Bull created a new category through bars and nightclubs the incumbents didn’t serve, taking ~65% of it — an indirect assault [[Cracking §2]].', weak: 'Red Bull had better marketing.', whyWeak: 'Misses where and how it entered.' },
    { id: 'c7', level: 'Analysis', q: 'Why couldn’t PBMs just match Cost Plus Drugs?', model: 'Matching its published cost-plus price would destroy the rebate and spread economics that fund their own margin — self-cannibalization. The asymmetry, not secrecy, buys the entrant time [[Cracking §4, §8]].', weak: 'They didn’t think of it.', whyWeak: 'Ignores the incumbent’s cost of responding.' },
    { id: 'c8', level: 'Judgment', q: 'Is being acquired by the incumbent a win for the entrant?', model: 'Often value-destroying for the asset: poppi declined after moving onto PepsiCo’s distribution — the channel the incumbent didn’t serve was what made it work. “Price the channel, not only the brand” [[Cracking §7, Ex.3]].', weak: 'Yes, the founders got paid $1.95B.', whyWeak: 'Answers for the founders, not for the strategy.' },
    { id: 'c9', level: 'Judgment', q: 'Will the DOJ allow Netflix to buy Warner Bros?', model: 'Depends on market definition. In a narrow premium-SVOD market, combining large shares likely exceeds 1,800/100 or 30% → presumption; in a broad all-video market including YouTube and TikTok, shares are small → no presumption. Netflix would argue broad; the agency narrow. State your share assumptions and compute ΔHHI = 2·s₁·s₂ both ways [[HHI §5]].', weak: 'Yes, Netflix is a tech company.', whyWeak: 'No market, no numbers, no test.' },
    { id: 'c10', level: 'Action', q: 'You’re launching a challenger to a dominant incumbent. What do you ask first?', model: '“What would a competent incumbent have to give up to respond to me?” — booked revenue, channel conflict, cannibalized margin, organizational contradiction. Then: what can I bring at less than full cost, what activity exists only because of a relaxed constraint, and what will I have built by the time it responds [[Cracking §8]].', weak: 'How big is the market?', whyWeak: 'Size says where the money is — and where you’re least likely to get any.' },
  ],
  devil: {
    argument: 'High concentration means low competition and should be blocked — HHI thresholds are a sound bright-line rule.',
    response: 'Concentration describes supply-side shares at one moment. A concentrated but contestable market can discipline price better than a fragmented, protected one; buyer power, spare capacity and potential entrants — like the laboratory that undid the diamond cartel’s near-maximum concentration — all constrain price [[HHI §6]]. That’s why the presumption is rebuttable and why cases are won on market definition [[HHI §4-5]].',
    probes: ['Name a concentrated market that is still competitive.', 'What evidence would rebut a presumption?', 'Why is market definition where cases are won?'],
  },
  pyramid: {
    prompt: 'Answer: **How do you break into a concentrated, attractive market?** (Inductive works well.)',
    model: {
      structure: 'inductive',
      s: 'The most attractive industries are concentrated and profitable [[5F §1]].',
      c: 'Those same conditions make them defensible: newcomers to the most attractive markets earn ~30% lower returns, and direct assaults (Virgin Cola, Under Armour in running) fail [[Cracking §1-2]].',
      q: 'How should an entrant break into a concentrated market?',
      a: 'Enter indirectly — at a point the incumbent has chosen not to defend, using at least two of the three moves — because an attack the incumbent can only answer by damaging its own business buys the time to build an advantage.',
      supports: [
        { label: 'Reason 1', point: 'Leverage assets you already own to lower your cost of competing.', evidence: ['T-Mobile: 8.5M broadband customers on spare 5G capacity'] },
        { label: 'Reason 2', point: 'Reconfigure the chain so the incumbent’s assets become irrelevant.', evidence: ['SpaceX ~$3,000/kg vs. Shuttle $54,000; Cost Plus Drugs removes the PBM'] },
        { label: 'Reason 3', point: 'Build a niche the incumbent can’t match without cannibalizing.', evidence: ['Athletic Brewing >19% of US NA beer'] },
      ],
      competing: '“Outspend the incumbent.” Under Armour had the bigger budget and lost; incumbents are organized and funded to defend exactly where you’d attack.',
      memo: 'Inductive: three parallel entry levers, each a “way to lower the cost of competing”; the plan must also survive the incumbent’s eventual response.',
    },
  },
  checkIds: ['S05-q01', 'S05-q02', 'S05-q04', 'S05-q06', 'S05-q08', 'S05-q10', 'S05-q12', 'S05-q14', 'S05-q17', 'S05-q20'],
  bank: [
    Q({ id: 'S05-q01', kind: 'quant', src: 'HHI §3', stem: 'Four firms hold 30, 30, 20 and 20 percent. The HHI is…', correct: 2, options: [
      { text: '100', why: 'That’s the sum of shares.' },
      { text: '1,000', why: 'Arithmetic slip.' },
      { text: '2,600', why: '900 + 900 + 400 + 400.' },
      { text: '3,400', why: 'Arithmetic slip.' },
    ] }),
    Q({ id: 'S05-q02', kind: 'quant', src: 'HHI §3', stem: 'Firms with 12% and 8% merge. ΔHHI is…', correct: 0, options: [
      { text: '192', why: '2 × 12 × 8.' },
      { text: '96', why: 'Forgot the 2.' },
      { text: '400', why: 'That’s 20², not the change.' },
      { text: 'Impossible to know without the other shares.', why: 'The change depends only on the two merging shares.' },
    ] }),
    Q({ id: 'S05-q03', kind: 'concept', src: 'HHI §2', stem: 'Why can two markets with C4 = 80 have HHIs 2,700 apart?', correct: 3, options: [
      { text: 'Because HHI uses more data.', why: 'Partly, but the key is squaring.' },
      { text: 'Because C4 includes small firms.', why: 'It excludes them.' },
      { text: 'Because one market is larger.', why: 'Size doesn’t enter either measure.' },
      { text: 'Because HHI squares shares, registering asymmetry (65/5/5/5 vs. 20/20/20/20) that C4’s simple sum hides.', why: '§2-3 and Fig.1.' },
    ] }),
    Q({ id: 'S05-q04', kind: 'quant', src: 'HHI Ex.3', stem: 'A market has HHI 1,650. Firms with 15% and 10% merge. Under the 2023 Guidelines…', correct: 1, options: [
      { text: 'not presumed — Δ is 25.', why: 'Δ = 2 × 15 × 10 = 300.' },
      { text: 'presumed — post-merger HHI 1,950 > 1,800 and Δ = 300 > 100.', why: 'Concentration test met.' },
      { text: 'presumed only by the share test.', why: 'Merged share is 25% (< 30%).' },
      { text: 'automatically blocked.', why: 'A presumption is rebuttable.' },
    ] }),
    Q({ id: 'S05-q05', kind: 'concept', src: 'HHI §3', stem: 'An HHI of 2,000 is equivalent to how many equal-sized firms?', correct: 2, options: [
      { text: '2', why: 'That would be HHI 5,000.' },
      { text: '20', why: 'That would be HHI 500.' },
      { text: '5', why: '10,000 ÷ 2,000.' },
      { text: '4', why: 'That would be HHI 2,500.' },
    ] }),
    Q({ id: 'S05-q06', kind: 'concept', src: 'HHI §4', stem: 'What does a structural presumption DO in merger review?', correct: 0, options: [
      { text: 'It shifts the burden to the merging parties to rebut it, shaping the length, cost and odds of review.', why: '§4.' },
      { text: 'It blocks the deal automatically.', why: 'It’s rebuttable.' },
      { text: 'It only applies to deals over $133.9M.', why: 'That’s the HSR filing threshold — separate.' },
      { text: 'It approves the deal if HHI falls.', why: 'Not how it works.' },
    ] }),
    Q({ id: 'S05-q07', kind: 'concept', src: 'HHI §4', stem: 'Hart-Scott-Rodino notification (size of transaction > $133.9M in 2026) is triggered…', correct: 3, options: [
      { text: 'only when HHI exceeds 1,800.', why: 'Notification is separate from analysis.' },
      { text: 'only for horizontal mergers.', why: 'Not stated.' },
      { text: 'only if the agency asks.', why: 'It’s mandatory above the threshold.' },
      { text: 'regardless of whether concentration raises any concern.', why: '§4: “Notification is separate from analysis.”' },
    ] }),
    Q({ id: 'S05-q08', kind: 'case', src: 'HHI §5', stem: 'What does Staples/Office Depot (blocked in 1997 and 2016) show?', correct: 1, options: [
      { text: 'That office supplies are a monopoly.', why: 'Not the lesson.' },
      { text: 'That market definition drives the answer — two different definitions, the same outcome.', why: '“Same parties, two different market definitions, the same outcome.”' },
      { text: 'That C4 is what courts use.', why: 'Courts relied on HHI.' },
      { text: 'That presumptions can’t be rebutted.', why: 'Not shown.' },
    ] }),
    Q({ id: 'S05-q09', kind: 'case', src: 'HHI §5', stem: 'Why did Whole Foods/Wild Oats never produce a published HHI?', correct: 2, options: [
      { text: 'The data was secret.', why: 'Not the reason given.' },
      { text: 'The deal was too small.', why: 'Not the reason.' },
      { text: 'The market boundary itself was contested (premium natural/organic vs. all supermarkets), so the case turned on customer behavior, not an index.', why: '§5.' },
      { text: 'HHI didn’t exist in 2007.', why: 'It did.' },
    ] }),
    Q({ id: 'S05-q10', kind: 'concept', src: 'HHI §6', stem: 'Which is NOT something concentration measures capture?', correct: 0, options: [
      { text: 'Potential entrants and technologies that haven’t arrived yet.', why: 'One of the five blind spots (the lab-grown diamond example).' },
      { text: 'The squared shares of firms.', why: 'That’s HHI.' },
      { text: 'The top four shares.', why: 'That’s C4.' },
      { text: 'How share is distributed among large firms.', why: 'HHI captures this.' },
    ] }),
    Q({ id: 'S05-q11', kind: 'quant', src: 'HHI Ex.2', stem: 'In a market of ten equal firms (10% each), two merge. Presumption?', correct: 3, options: [
      { text: 'Yes — Δ = 200 > 100.', why: 'The concentration test also needs post > 1,800.' },
      { text: 'Yes — share test.', why: 'Merged share 20% < 30%.' },
      { text: 'Yes — C4 rises.', why: 'C4 has no legal force.' },
      { text: 'No — HHI goes 1,000 → 1,200 (below 1,800) and the merged share is 20%.', why: 'Exhibit 2 row 4.' },
    ] }),
    Q({ id: 'S05-q12', kind: 'concept', src: 'Cracking §1', stem: 'Bryce and Dyer found newcomers to the most attractive markets earn returns about…', correct: 1, options: [
      { text: '30% above newcomers to less attractive markets.', why: 'Reversed.' },
      { text: '30% below newcomers to less attractive markets — the conditions that make an industry profitable make it defensible.', why: '§1.' },
      { text: 'the same as incumbents.', why: 'Not the finding.' },
      { text: 'seven times lower.', why: 'Seven-fold is the Five Forces ROIC spread.' },
    ] }),
    Q({ id: 'S05-q13', kind: 'apply', src: 'Cracking §3', stem: 'A rideshare company uses its existing drivers and app to launch grocery delivery at low marginal cost. Which move?', correct: 0, options: [
      { text: 'Leverage existing assets — capacity already paid for.', why: 'The T-Mobile / Amazon ads pattern.' },
      { text: 'Reconfigure the chain.', why: 'It’s reusing assets, not reordering activities.' },
      { text: 'Create a niche.', why: 'Not described as a niche.' },
      { text: 'Direct assault.', why: 'Not the framing.' },
    ] }),
    Q({ id: 'S05-q14', kind: 'apply', src: 'Cracking §8', stem: 'The single most important planning question for an entrant, per the redux?', correct: 2, options: [
      { text: 'How big is the market?', why: 'Size is where the money AND the defense are.' },
      { text: 'Can the incumbent respond?', why: '“It almost always could.”' },
      { text: 'What would a competent incumbent have to give up in order to respond?', why: '§8: that asymmetry buys time.' },
      { text: 'How much funding can we raise?', why: 'The edge is a lower cost of competing, not a bigger budget.' },
    ] }),
    Q({ id: 'S05-q15', kind: 'case', src: 'Cracking §7', stem: 'Nike grew 35.4% in run specialty while On fell 19.7% and Hoka 7.4% in that channel. Which finding does this support?', correct: 3, options: [
      { text: 'Niches never decay.', why: 'Opposite.' },
      { text: 'Acquisitions destroy value.', why: 'Different finding.' },
      { text: 'Direct assault beats indirect assault.', why: 'Nike was the incumbent responding.' },
      { text: 'The incumbent eventually responds and can win ground back — the head start is finite.', why: '§7 third finding.' },
    ] }),
    Q({ id: 'S05-q16', kind: 'case', src: 'Cracking §6', stem: 'Why couldn’t Novo Nordisk dislodge Hims & Hers?', correct: 1, options: [
      { text: 'Hims had patents on Wegovy.', why: 'Novo owns Wegovy.' },
      { text: 'Hims controlled the patient relationship and acquisition funnel; Novo needed the channel more than the fight.', why: '§6.' },
      { text: 'Regulators protected Hims.', why: 'Not stated.' },
      { text: 'Hims had lower costs only.', why: 'The point is the channel control.' },
    ] }),
    Q({ id: 'S05-q17', kind: 'concept', src: 'Cracking §6', stem: 'Which combination did Bryce and Dyer identify as strongest?', correct: 0, options: [
      { text: 'Reconfigured value chain + niche offering.', why: '§6.' },
      { text: 'Leverage assets + bigger budget.', why: 'Budget isn’t a move.' },
      { text: 'Niche + acquisition.', why: 'Not one of the three moves.' },
      { text: 'Any single move executed well.', why: 'A single move is usually answerable.' },
    ] }),
    Q({ id: 'S05-q18', kind: 'quant', src: 'HHI Ex.2', stem: 'Market 65% + seven 5% firms; two 5% firms merge. Result?', correct: 2, options: [
      { text: 'Presumed — the market is highly concentrated.', why: 'The change is only 50.' },
      { text: 'Presumed by the share test.', why: 'Merged share 10%.' },
      { text: 'Δ = 50, post 4,450 — no presumption from the change, though the market invites other theories.', why: 'Exhibit 2 row 5.' },
      { text: 'Δ = 100.', why: '2 × 5 × 5 = 50.' },
    ] }),
    Q({ id: 'S05-q19', kind: 'apply', src: 'HHI §6', stem: 'Three sellers face three giant buyers. A seller-side HHI of 3,300 suggests high seller power. What’s missing?', correct: 1, options: [
      { text: 'Nothing; HHI is conclusive.', why: 'The brief warns otherwise.' },
      { text: 'Buyer power — compute concentration on both sides before concluding.', why: '§6.' },
      { text: 'C4.', why: 'C4 adds nothing here.' },
      { text: 'The HSR threshold.', why: 'Irrelevant.' },
    ] }),
    Q({ id: 'S05-q20', kind: 'case', src: 'Cracking §2', stem: 'What is the brief’s point about Under Armour in running?', correct: 3, options: [
      { text: 'It executed badly.', why: '“The point is not that Under Armour executed badly.”' },
      { text: 'Basketball is a bad market.', why: 'Not the point.' },
      { text: 'Connected fitness was a good bet.', why: 'It sold MyFitnessPal off.' },
      { text: 'It aimed big strengths where the incumbent was organized to fight, while smaller entrants used doors Nike didn’t defend.', why: '§2.' },
    ] }),
  ],
  shorts: [
    { id: 'S05-sa1', session: 'S05', src: 'HHI §2-3', prompt: 'Explain why HHI is better than C4 for antitrust, with a numerical example.', model: 'C4 only sums the top four. 65/5/5/5 (+5×4) and 20×4 (+5×4) both give C4 = 80, but HHI = 4,400 vs. 1,700 because squaring weights large firms — only the first is highly concentrated.', points: ['C4 blind to distribution', 'Squaring', 'Numerical example'] },
    { id: 'S05-sa2', session: 'S05', src: 'HHI Ex.3', prompt: 'State both 2023 presumption tests.', model: 'Concentration: post-merger HHI > 1,800 and ΔHHI > 100. Share: merged firm’s share > 30% and ΔHHI > 100. Both rebuttable.', points: ['Both tests', 'Δ > 100 in both', 'Rebuttable'] },
    { id: 'S05-sa3', session: 'S05', src: 'Cracking §1', prompt: 'Why do attractive markets punish entrants, and what’s the answer?', model: 'The conditions that make an industry profitable (barriers, brands, distribution) make it defensible, so entrants to the best markets earn ~30% less. The answer is indirect assault: enter where the incumbent has decided not to defend, combining at least two moves.', points: ['Profitability = defensibility', '30% penalty', 'Indirect assault'] },
    { id: 'S05-sa4', session: 'S05', src: 'Cracking §7', prompt: 'Why can being acquired by the incumbent destroy an entrant’s value?', model: 'The entrant won through a channel the incumbent didn’t serve well; moving it onto the incumbent’s distribution removes the very thing that made it work (poppi’s declines after PepsiCo).', points: ['Channel was the advantage', 'Example'] },
  ],
  written: {
    prompt: '**Timed (20 min).** Two fictional regional grocers, **Maple Market (22%)** and **Harvest Hall (14%)**, propose to merge in a metro area where the other firms hold 20, 18, 12, 8 and 6 percent. (a) Compute C4 and HHI before and after, and test against the 2023 Guidelines. (b) Give the strongest rebuttal the parties could make, and say whether you’d expect it to work.',
    minutes: 20,
    model: '**(a)** Pre-HHI = 22² + 14² + 20² + 18² + 12² + 8² + 6² = 484 + 196 + 400 + 324 + 144 + 64 + 36 = 1,648. ΔHHI = 2 × 22 × 14 = 616. Post = 2,264 (> 1,800, Δ > 100 → concentration test met); merged share 36% > 30% → share test met. C4 pre = 22 + 20 + 18 + 14 = 74 → post = 36 + 20 + 18 + 12 = 86. Presumed. **(b)** Rebuttal: the market is wider than “supermarkets” (Walmart supercenters, Costco, Aldi, online) — the Whole Foods/Wild Oats argument; or easy entry by discounters. Likely to be contested on market definition; Kroger/Albertsons shows courts accept local supermarket markets under the 2023 Guidelines.',
    rubric: ['Correct HHI, Δ and post', 'Both tests applied', 'C4 computed', 'Rebuttal tied to market definition/entry', 'Judgment with precedent'],
  },
  oral: { prompt: 'How does concentration affect strategy, and how would you break into a concentrated market?', probes: ['Why HHI and not C4?', 'What does the presumption actually do?', 'Give me an indirect entry that worked and why.', 'What happens after you succeed?'] },
  summary: {
    answer: 'Concentration shapes rivalry and limits growth by merger (compute ΔHHI = 2·s₁·s₂ against 1,800/100 and 30%), but market definition decides the answer and HHI misses entry, buyer power and potential competition. To break in, attack indirectly — leverage owned assets, reconfigure the chain, build a niche, combined — and build what survives the incumbent’s response.',
    numbers: [
      { label: 'DOJ example HHI', value: '30/30/20/20 → 2,600', src: 'HHI §3' },
      { label: 'Merger shortcut', value: '12% + 8% → ΔHHI 192', src: 'HHI §3' },
      { label: 'Same C4, different HHI', value: '4,400 vs. 1,700 (2,700 apart)', src: 'HHI Fig.1' },
      { label: '2023 thresholds', value: '>1,800 & Δ>100; or share >30% & Δ>100', src: 'HHI Ex.3' },
      { label: 'Entrant penalty', value: '~30% lower returns in attractive markets', src: 'Cracking §1' },
    ],
    frameworkBullets: ['C4 vs. HHI; numbers-equivalent', 'ΔHHI = 2·s₁·s₂', 'Bands and two presumption tests; rebuttable', 'Market definition decides', 'Five blind spots', 'Three entry moves; combine; buys time'],
    caseBullets: ['Exhibit 2 golden numbers', 'Real cases turned on definition', 'Search: attack the ad-funded results page', 'WB: compute under narrow and broad definitions'],
  },
  crossLinks402: [{ topic: 'C4 and HHI calculations', note: 'STRAT 402 computes HHI from decimal shares × 10,000; 401 squares percentage points. Same number, different notation.', href: '#/learn/S03' }],
}
