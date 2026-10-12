import { DataTable, HBar } from '../../components/Charts'
import { Cite } from '../../components/Cite'
import { VrioTool } from '../../widgets/VrioTool'
import type { Mcq, ModuleDef } from '../types'

function Diagram() {
  const steps = ['Valuable?', 'Rare?', 'Costly to imitate?', 'Organized to exploit?']
  const nos = ['Competitive disadvantage', 'Competitive parity', 'Temporary advantage', 'Unexploited advantage']
  return (
    <figure className="card p-3 space-y-2">
      <figcaption className="font-semibold">
        VRIO is a gate, not a scorecard <Cite tag="VRIO §3, §5" /> <Cite tag="Canvas S6" />
      </figcaption>
      <div className="grid grid-cols-5 gap-1 text-xs sm:text-sm text-center items-start">
        {steps.map((s, i) => (
          <div key={s} className="space-y-1">
            <div className="rounded p-2 font-semibold" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>
              {s}
            </div>
            <div className="muted">No ↓</div>
            <div className="surface-2 rounded p-1.5">{nos[i]}</div>
          </div>
        ))}
        <div className="space-y-1">
          <div className="rounded p-2 font-semibold" style={{ background: 'var(--ok)', color: '#fff' }}>
            All yes →
          </div>
          <div className="surface-2 rounded p-1.5">Sustained advantage</div>
        </div>
      </div>
      <div className="grid gap-1.5 md:grid-cols-2 text-xs">
        <div className="card p-2"><strong>Assumptions:</strong> resources are heterogeneous (firms hold different bundles) and imperfectly mobile (can’t be bought, copied or rebuilt quickly). If either fails, returns converge.</div>
        <div className="card p-2"><strong>Imitability is where advantages die.</strong> Four barriers: unique history, causal ambiguity, social complexity, legal/economic deterrents.</div>
      </div>
    </figure>
  )
}

function Exhibits() {
  return (
    <div className="space-y-4">
      <DataTable
        caption={<>The brief’s diagnoses at a glance <Cite tag="VRIO Ex.1" /></>}
        head={['Case', 'Focal resource', 'V', 'R', 'I', 'O', 'Verdict and the binding issue']}
        rows={[
          ['Visa', 'Four-party payment network', 'Y', 'Y', 'Y', 'Y', 'Sustained — exposure is substitution (instant rails) and interchange regulation'],
          ['Regional bank', 'Branch network in the home region', 'Y', 'N', 'NA', 'Y', 'Parity — every rival holds the same asset'],
          ['McKinsey', 'Reputation and alumni network', 'Y', 'Y', 'Y', '?', 'Sustained, with the pyramid that appropriates the value under pressure'],
          ['Intel', 'Leading-edge fabs and x86', 'Y', 'Y', 'Y', 'N', 'Unexploited — $23.6B foundry operating losses 2024–25'],
        ]}
      />
      <HBar
        title="How much does industry matter? Share of profit variance explained (McGahan & Porter 1997)"
        rows={[{ label: 'Business unit', value: 31.5 }, { label: 'Industry', value: 18.7 }, { label: 'Corporate parent', value: 4.3 }]}
        unit="%"
        highlight="Business unit"
        note={<>Across six studies (Schmalensee 1985 → Vanneste 2017 meta: BU 36%, industry 8%), “the business unit runs three to five times industry” <Cite tag="S6 slides 5" /></>}
      />
      <DataTable
        caption={<>Grading criteria for the VRIO assignment <Cite tag="VRIO Asg §3" /></>}
        head={['Criterion', 'What strong work looks like', 'Weight']}
        rows={[['Selection of resources', 'Plausibly explain the position; specific enough to test; no generic strengths', '20%'], ['Rigor of the four tests', 'Rarity vs. named competitors; imitability names the mechanism and time for a funded rival; substitutes considered', '30%'], ['Diagnosis', 'Names the one or two carrying resources; flags fragile verdicts', '20%'], ['Recommendations', 'Three, prioritized, each tied to a VRIO gap, within management’s control, with expected effect', '20%'], ['Evidence and clarity', 'Figures with sources and periods; assumptions stated', '10%']]}
      />
      <figure className="card p-3 text-sm space-y-1">
        <figcaption className="font-semibold">Knowledge-based view: where Chick-fil-A draws its boundary <Cite tag="S6 slides 10" /></figcaption>
        <p><strong>Inside the firm:</strong> the sauce, cooking chicken, in-store operations, moving cars through a drive-through, training employees.</p>
        <p><strong>Outside:</strong> raising chickens, making cups and forks, making soda.</p>
        <p className="muted text-xs">“Firm boundaries surround critical knowledge elements.”</p>
      </figure>
    </div>
  )
}

const Q = (o: Omit<Mcq, 'session'>): Mcq => ({ ...o, session: 'S06' })

export const S06: ModuleDef = {
  id: 'S06',
  short: 'VRIO · Theories of the Firm',
  framework: {
    oneLiner: 'Firms facing the same industry earn differently because they control **different, hard-to-move resources**. Test ONE resource at a time with four sequential questions — **Valuable? Rare? Costly to imitate? Organized?** — and the **first “no” fixes the verdict** [[VRIO §1, §3]].',
    analogy: 'Every team in the league has a stadium and coaches — that’s parity. A franchise wins for a decade only with something rivals can’t get even with money (a culture built over 30 years, a player-development system nobody fully understands) AND a front office that actually uses it. Great talent sitting on the bench is an unexploited advantage [[VRIO §4-5]].',
    intuition: [
      'Five Forces looks outward; the RBV asks why two firms in the **same** industry out-earn each other. Business-unit effects explain 3–5× more profit variance than industry effects [[VRIO §1]] [[S6 slides 5]].',
      'It rests on two assumptions: resources are **heterogeneous** and **imperfectly mobile**. Where either fails, returns converge [[VRIO §1]].',
      '**Resources** are stocks (tangible or intangible); **capabilities** are flows — what the firm is repeatedly good at, held in routines and people. Capabilities are often more defensible: you can buy a building, not fifteen years of underwriting judgment [[VRIO §2]].',
      'The framework’s value is that it **disqualifies** most strengths. Every team can list strengths; few survive all four gates [[VRIO §1]].',
      '**Imitability is where most advantages die.** Four barriers: unique history (path dependence), causal ambiguity, social complexity, legal/economic deterrents (patents; scale, switching costs, network effects — NVIDIA’s 7.5M CUDA developers) [[VRIO §4]].',
      '**Organization** converts potential into earnings. Intel held a V-R-I resource and lost $23.6B in its foundry — “the resource was never the binding constraint; the organization was” [[VRIO §7]].',
      '**VRIN vs. VRIO:** VRIN’s “non-substitutable” is folded into imitability; VRIO adds Organization. Still name substitutes — substitution most often ends an advantage imitation couldn’t touch [[VRIO §6]].',
      '**Why do firms exist?** Transaction cost economics (Williamson): firms exist where governing an activity internally is cheaper than the market. The knowledge-based view: firm boundaries surround critical knowledge [[S6 slides 9-10]].',
    ],
    howToRun: [
      '**1. Inventory** 5+ resources and capabilities, stated specifically; label resource/capability and tangible/intangible [[VRIO Asg §1]].',
      '**2. Value:** if it disappeared tomorrow, would revenue fall or cost rise? [[VRIO §3]]',
      '**3. Rarity:** against NAMED competitors — if every serious rival has it, stop: parity [[VRIO §3]].',
      '**4. Imitability:** name the barrier (history, ambiguity, complexity, legal/economic) and estimate how long a funded rival would take [[VRIO §4]] [[VRIO Asg §3]].',
      '**5. Organization:** is the firm structured, incentivized and staffed to capture the value? [[VRIO §3]]',
      '**6. Check substitutes** (VRIN’s fourth test) [[VRIO §6]].',
      '**7. Diagnose** the one or two resources that carry the position, date the verdict, say what would break it [[VRIO Asg §2]].',
      '**8. Recommend** three actions tied to VRIO gaps: protect, close an organization gap, build/acquire, or neutralize an imitation/substitution threat [[VRIO Asg §1]].',
    ],
    recall: [
      { id: 'S06-vrio', title: 'VRIO verdicts in order', prompt: 'What does a “no” at each gate mean?', items: [{ name: 'Not valuable → competitive disadvantage' }, { name: 'Valuable, not rare → competitive parity' }, { name: 'V, R, not costly to imitate → temporary advantage' }, { name: 'V, R, I, not organized → unexploited advantage' }, { name: 'All four → sustained advantage' }], src: 'VRIO §5' },
      { id: 'S06-barriers', title: 'Four barriers to imitation', prompt: 'Why some resources resist copying.', items: [{ name: 'Unique history / path dependence' }, { name: 'Causal ambiguity' }, { name: 'Social complexity' }, { name: 'Legal and economic deterrents' }], src: 'VRIO §4' },
      { id: 'S06-cases', title: 'The brief’s examples and verdicts', prompt: 'Firm → resource → verdict.', items: [{ name: 'Visa — payment network — sustained' }, { name: 'Regional bank — branches — parity' }, { name: 'McKinsey — reputation & alumni — sustained, O under strain' }, { name: 'Intel — fabs & x86 — unexploited' }], src: 'VRIO Ex.1' },
      { id: 'S06-assume', title: 'RBV assumptions + firm theories', prompt: 'Two assumptions, two theories of why firms exist.', items: [{ name: 'Heterogeneous resources' }, { name: 'Imperfect mobility' }, { name: 'Transaction cost economics (Williamson)' }, { name: 'Knowledge-based view (boundaries surround critical knowledge)' }], src: 'VRIO §1; S6 slides 9-10' },
      { id: 'S06-recs', title: 'Four kinds of VRIO recommendation', prompt: 'What management can do.', items: [{ name: 'Protect and reinforce a genuine advantage' }, { name: 'Close an organization gap on a resource you own' }, { name: 'Build or acquire something missing' }, { name: 'Neutralize an approaching imitation threat' }], src: 'VRIO Asg §1' },
    ],
    diagram: Diagram,
    variants: [
      {
        title: 'The VRIO verdict table',
        brief: '**V = no** → disadvantage · **R = no** → parity · **I = no** → temporary advantage · **O = no** (after V, R, I yes) → **unexploited** advantage · all yes → sustained. The Canvas Session 6 graphic matches this [[VRIO §5]] [[Canvas S6]].',
        slides: 'The S6 slides show an older table: competitive failure (N, N, N, N) · parity (Y, N, N, N) · **competitive advantage** (Y, Y, N, N) · **durable competitive advantage** (Y, Y, Y, N) · sustained (Y, Y, Y, Y), with the column “Is the resource **imitable**?” [[S6 slides 24, 28]].',
        differ: 'Two real differences. (1) Labels: the slide’s “competitive advantage” = the brief’s **temporary** advantage, and the slide’s “durable competitive advantage” = the brief’s **unexploited** advantage. (2) The slide marks every later column “No” after the first no, and phrases the third test as “imitable?” (where “No” is good), while the brief asks “costly to imitate?” (where “Yes” is good) and leaves later columns blank because the first no ends the analysis.',
        guess: '**Guess:** the slide is a textbook table from an older Barney & Hesterly edition carried over from a previous version of the course; the brief was written recently and updated to Barney’s 1995 labels, which stress that a V-R-I resource without organization is “value left on the table,” not durable. On the exam, use the brief’s labels — and if you see “durable competitive advantage,” read it as V-R-I but not organized.',
      },
    ],
    newScenarios: [
      { prompt: '**Cascade Insurance** (fictional) has forty years of claims data no rival can buy — but its underwriters ignore the models and price by gut. Verdict?', answer: 'Valuable, rare, costly to imitate (path dependence — the data took 40 years) but NOT organized → **unexploited advantage**. The most actionable case: fix incentives and processes so underwriting uses the data [[VRIO §5]].' },
      { prompt: '**Brightline Logistics** (fictional) touts its new warehouse-management software — the same package five rivals bought last year. Verdict?', answer: 'Valuable but **not rare** → competitive parity; stop the analysis. “If every serious rival has it, it is a requirement to compete” [[VRIO §3]].' },
      { prompt: 'A startup’s edge is a viral marketing trick competitors could copy in a month. Verdict, and what should it do?', answer: 'Valuable and rare (for now) but not costly to imitate → **temporary advantage**. Use the window to build something with a real barrier — accumulated data, switching costs, a socially complex culture [[VRIO §4-5]].' },
    ],
  },
  argument: {
    intro: 'The brief’s argument: the inward look explains more of the persistent gap in returns than the industry does — and VRIO’s job is to throw out most claimed strengths and find the few that carry the position.',
    propositions: [
      '**Two firms in the same industry differ because they are not resource-equivalent** [[VRIO §1]].',
      '**VRIO is a gate — the first no fixes the verdict** [[VRIO §3]].',
      '**Value and rarity are easy; imitability is where most advantages die** [[VRIO §4]].',
      '**An expensive, hard-won asset can still be only parity** (branches) [[VRIO §7]].',
      '**Organization converts potential into captured earnings;** an unexploited advantage is the most actionable case because the constraint is internal [[VRIO §5]].',
      '**Buying a rare resource and being organized to exploit it are separate achievements** (Capital One/Discover) [[VRIO §7]].',
      '**Sustained ≠ permanent** — the substitution check (Visa vs. Pix and UPI) [[VRIO §7]].',
    ],
  },
  case: {
    protagonist: 'You, diagnosing one firm for its management team (your team chose In-N-Out) [[VRIO Asg]].',
    decision: 'What is a firm, why does it exist, and does AI offer a firm a sustainable competitive advantage? Apply VRIO to answer — then diagnose a firm and recommend three actions [[Canvas S6]].',
    timeline: [
      { when: '1991 / 1995', what: 'Barney’s VRIN, then VRIO (“Looking Inside for Competitive Advantage”) [[VRIO §3, §5]]' },
      { when: '2009', what: 'Oliver Williamson’s Nobel for the analysis of governance and the boundaries of the firm [[S6 slides 9]]' },
      { when: '2024–25', what: 'Intel loses $23.6B in its foundry; McKinsey settlements; Capital One buys Discover [[VRIO §7]]' },
      { when: 'Jun 2026', what: 'Merchant interchange settlement; Intel’s organization begins to fix — Q2 operating income $1.8B' },
    ],
    exhibits: Exhibits,
  },
  tool: {
    title: 'The VRIO assignment, as an interactive tool',
    intro: 'Worksheet 1 inventory → Worksheet 2 VRIO grid (later tests lock after a “no”; the verdict computes itself, with the slide label alongside) → Worksheet 3 diagnosis → Worksheet 4 recommendations. Load the brief’s four examples to practice, then do a new firm.',
    render: () => <VrioTool />,
  },
  coldCalls: [
    { id: 'c1', level: 'Facts', q: 'What are the RBV’s two assumptions?', model: 'Resources are **heterogeneous** (firms hold different bundles) and **imperfectly mobile** (they can’t be bought, copied or rebuilt quickly). Where both hold, advantage can persist; where either fails, returns converge [[VRIO §1]].', weak: 'Firms have resources.', whyWeak: 'Doesn’t say why returns differ or persist.' },
    { id: 'c2', level: 'Facts', q: 'Resource or capability: a bank’s branch network? Its ability to price risk?', model: 'Branches are a **resource** (a tangible stock). Pricing risk accurately is a **capability** (a flow, held in routines and people) — and usually more defensible [[VRIO §2]].', weak: 'Both are resources.', whyWeak: 'Misses the stock/flow distinction.' },
    { id: 'c3', level: 'Analysis', q: 'Why is the regional bank’s branch network only parity if it gathers cheap deposits?', model: 'It’s valuable (FDIC savings rate 0.38% vs. online >4%) but **not rare** — every competing bank in the region has branches, so the analysis stops: “a requirement to compete” [[VRIO §7]].', weak: 'Because branches are expensive.', whyWeak: 'Cost isn’t a VRIO test.' },
    { id: 'c4', level: 'Analysis', q: 'Intel has leading-edge fabs. Why isn’t that an advantage?', model: 'The resource passes V, R and I — tens of billions in capital, a decade of learning, a single EUV supplier — but fails **Organization**: $18.8B net loss in 2024, $23.6B foundry operating losses over 2024–25. Unexploited advantage [[VRIO §7]].', weak: 'Because TSMC is better.', whyWeak: 'Ignores the brief’s point — the organization was the constraint.' },
    { id: 'c5', level: 'Analysis', q: 'What is a firm, and why does it exist?', model: 'Transaction cost economics: a firm exists where organizing activities internally is cheaper than contracting in the market (Williamson). The knowledge-based view: its boundaries surround critical knowledge (Chick-fil-A keeps its sauce and operations, buys cups and soda). The RBV: a bundle of heterogeneous, hard-to-move resources — which is why firms in one industry earn differently [[S6 slides 8-10]] [[VRIO §1]].', weak: 'A firm is a company that makes money.', whyWeak: 'No theory of boundaries or of differences in returns.' },
    { id: 'c6', level: 'Analysis', q: 'Why does the brief keep naming substitutes if VRIO dropped “non-substitutable”?', model: 'VRIO folds substitutes into imitability (another path to the same benefit), but substitution is “the mechanism that most often ends an advantage that imitation could not touch” — Visa vs. instant account-to-account rails [[VRIO §6-7]].', weak: 'It’s left over from VRIN.', whyWeak: 'Misses why it still matters.' },
    { id: 'c7', level: 'Judgment', q: 'Does AI offer a firm a sustainable competitive advantage?', model: 'Run VRIO on it. Generic AI is valuable but not rare (every rival can rent frontier models) and not costly to imitate → parity, or a temporary edge for early movers. It becomes sustained only when bundled with something rare and hard to copy — proprietary data accumulated over time (path dependence), workflow lock-in (switching costs), socially complex routines — and an organization built to use it. AI can also erode Organization, as with McKinsey’s pyramid [[VRIO §3-7]].', weak: 'Yes, AI is the future.', whyWeak: 'Never applies the tests.' },
    { id: 'c8', level: 'Judgment', q: 'Is McKinsey’s advantage sustained?', model: 'The resources still pass V, R and I (reputation and a 50,000-person alumni network — path-dependent, socially complex). The open question is Organization: the up-or-out pyramid that converts them into rent is strained by settlements, frozen salaries, smaller intake and AI — marked “?” deliberately [[VRIO §7, Ex.1]].', weak: 'Yes — it’s McKinsey.', whyWeak: 'Ignores the Organization test the brief highlights.' },
    { id: 'c9', level: 'Action', q: 'Your VRIO page shows four of six resources as all-yes. What do you do?', model: 'Re-test rarity against named competitors and imitability with a mechanism and a time estimate. The assignment warns “most resources are parity; a page of yes answers usually means the tests were not applied.” (In the In-N-Out paper, the employee model was called rare while the paper itself noted Chipotle promotes 85% of managers from within.) [[VRIO Asg §2]] [[my-work VRIO]]', weak: 'Great — the firm is very strong.', whyWeak: 'The rubric rewards rigor, not enthusiasm.' },
    { id: 'c10', level: 'Action', q: 'Intel’s board asks you for one recommendation. What is it, in VRIO terms?', model: 'Close the organization gap — the resource is already valuable, rare and costly to imitate; fix structure, incentives and the segment reporting that buried foundry losses. The brief notes that when the fourth test was fixed under new leadership, “the same resources begin to earn” (Q2 2026 operating income $1.8B) [[VRIO §7]].', weak: 'Build more fabs.', whyWeak: 'Adds resources when the constraint is organization.' },
  ],
  devil: {
    argument: 'VRIO is circular: we call resources “valuable” because the firm is successful, so it explains success after the fact and predicts nothing.',
    response: 'The brief makes each test operational and falsifiable: value = would revenue fall or cost rise if it disappeared; rarity = against named rivals; imitability = which barrier and how long for a funded rival; organization = is the potential converted into earnings. Used as a gate on one resource at a time it mostly says “no” — that’s its value. And verdicts are dated and move (branches repositioned; Intel’s organization fixed) [[VRIO §3-7]] [[VRIO Asg §2]].',
    probes: ['Give an example where VRIO predicted something.', 'How would you test causal ambiguity?', 'Isn’t organization just “management quality”?'],
  },
  pyramid: {
    prompt: 'Answer: **Does AI offer a firm a sustainable competitive advantage?** Use VRIO as your major premise.',
    model: {
      structure: 'combined',
      s: 'Firms are investing heavily in AI, and many claim it as their competitive edge.',
      c: 'Frontier AI models are available to every competitor through APIs, so AI spending alone may not separate one firm from another.',
      q: 'Does AI give a firm a sustainable competitive advantage?',
      a: 'Not by itself — AI yields a sustained advantage only when it is bundled with a rare, hard-to-copy resource such as proprietary data or embedded workflows and the firm is organized to use it, because generic AI fails VRIO’s rarity and imitability tests.',
      supports: [
        { label: 'Major premise', point: 'A resource yields sustained advantage only if it is valuable, rare, costly to imitate and organized [[VRIO §3, §5]].', evidence: ['First “no” fixes the verdict'] },
        { label: 'Minor premise', point: 'Generic AI is valuable but neither rare nor costly to imitate; proprietary data, workflow integration and socially complex routines can be.', evidence: ['Models are rentable by all rivals', 'Path dependence: data accumulated over years', 'Economic deterrents: switching costs (NVIDIA’s CUDA developers) [[VRIO §4]]'] },
        { label: 'Therefore', point: 'Invest in the complementary resources and the organization to exploit them; treat AI capability itself as parity.', evidence: ['Intel shows rare resources earn nothing without organization [[VRIO §7]]'] },
      ],
      competing: '“AI is a sustainable advantage for early movers.” Early adoption is at best a temporary advantage — the tools diffuse — unless the lead is converted into data or switching costs rivals can’t buy.',
      memo: 'Deductive spine: VRIO is the theory (major premise); the analysis is whether AI meets each test (minor premise).',
    },
  },
  checkIds: ['S06-q01', 'S06-q02', 'S06-q04', 'S06-q06', 'S06-q08', 'S06-q10', 'S06-q12', 'S06-q14', 'S06-q16', 'S06-q19'],
  bank: [
    Q({ id: 'S06-q01', kind: 'concept', src: 'VRIO §5', stem: 'A resource is valuable, rare and costly to imitate, but the firm is not organized to exploit it. The brief’s verdict?', correct: 2, options: [
      { text: 'Sustained competitive advantage.', why: 'Requires all four.' },
      { text: 'Temporary competitive advantage.', why: 'That’s V, R, not I.' },
      { text: 'Unexploited competitive advantage — value left on the table.', why: '§5 (Intel).' },
      { text: 'Competitive parity.', why: 'That’s V, not R.' },
    ] }),
    Q({ id: 'S06-q02', kind: 'concept', src: 'VRIO §3', stem: 'Why is VRIO “a gate rather than a scorecard”?', correct: 0, options: [
      { text: 'The tests are sequential; a “no” at any stage stops the analysis and fixes the verdict.', why: '§3.' },
      { text: 'Each test is scored 1–5 and summed.', why: 'That’s a scorecard.' },
      { text: 'Only Organization matters.', why: 'All four matter, in order.' },
      { text: 'Gates are easier to draw.', why: 'Not the reason.' },
    ] }),
    Q({ id: 'S06-q03', kind: 'concept', src: 'VRIO §2', stem: 'Which is a CAPABILITY rather than a resource?', correct: 3, options: [
      { text: 'A patent portfolio.', why: 'A resource (intangible stock).' },
      { text: 'Cash reserves.', why: 'A resource (tangible stock).' },
      { text: 'A brand.', why: 'A resource (intangible stock).' },
      { text: 'Opening a hundred restaurants a quarter without diluting throughput.', why: 'A flow — what the firm is repeatedly good at.' },
    ] }),
    Q({ id: 'S06-q04', kind: 'apply', src: 'VRIO §3', stem: '**Orion Hospital** (fictional) highlights its MRI machines. Every hospital in the region has the same machines. Verdict?', correct: 1, options: [
      { text: 'Sustained advantage — MRIs are expensive.', why: 'Expense isn’t rarity.' },
      { text: 'Competitive parity — valuable but not rare; stop there.', why: 'The branch-network logic.' },
      { text: 'Temporary advantage.', why: 'Requires rarity.' },
      { text: 'Unexploited advantage.', why: 'Requires V, R, I.' },
    ] }),
    Q({ id: 'S06-q05', kind: 'concept', src: 'VRIO §4', stem: 'Even insiders can’t fully specify why a capability works, so outsiders can’t copy the recipe. This barrier is…', correct: 2, options: [
      { text: 'Path dependence.', why: 'That’s about history that can’t be recreated.' },
      { text: 'Social complexity.', why: 'That’s about relationships and norms.' },
      { text: 'Causal ambiguity.', why: '§4.' },
      { text: 'A legal deterrent.', why: 'Patents/contracts.' },
    ] }),
    Q({ id: 'S06-q06', kind: 'case', src: 'VRIO §4', stem: 'NVIDIA’s 7.5M CUDA developers illustrate which barrier?', correct: 0, options: [
      { text: 'An economic deterrent — switching costs and network effects make imitation uneconomic even where lawful.', why: '§4: “Persuading 7.5 million developers to rewrite their code is impossible.”' },
      { text: 'Causal ambiguity.', why: 'The mechanism is well understood.' },
      { text: 'A patent.', why: 'The point is that imitation is lawful but uneconomic.' },
      { text: 'Organization.', why: 'Not a barrier to imitation.' },
    ] }),
    Q({ id: 'S06-q07', kind: 'concept', src: 'VRIO §6', stem: 'How does VRIO differ from VRIN?', correct: 3, options: [
      { text: 'VRIO drops rarity.', why: 'Both keep rarity.' },
      { text: 'VRIN adds organization.', why: 'Reversed.' },
      { text: 'They are identical.', why: 'They differ in the fourth letter.' },
      { text: 'VRIO folds non-substitutability into imitability and adds Organization.', why: '§6.' },
    ] }),
    Q({ id: 'S06-q08', kind: 'case', src: 'VRIO §7', stem: 'Capital One bought Discover’s network — one of only four US card networks — yet legacy Discover volume grew under 2% a year later. The lesson?', correct: 1, options: [
      { text: 'Card networks aren’t valuable.', why: 'Visa’s case shows they are.' },
      { text: 'Buying a rare resource and being organized to exploit it are separate achievements; only the second pays.', why: '§7.' },
      { text: 'Rarity doesn’t matter.', why: 'Rarity is necessary, not sufficient.' },
      { text: 'Acquisitions always fail.', why: 'Too broad.' },
    ] }),
    Q({ id: 'S06-q09', kind: 'concept', src: 'S6 slides 9', stem: 'Transaction cost economics explains the existence of firms by…', correct: 2, options: [
      { text: 'economies of scale.', why: 'Not TCE’s mechanism.' },
      { text: 'patents.', why: 'No.' },
      { text: 'comparing the cost of organizing a transaction inside the firm vs. in the market — firms exist where internal governance is cheaper.', why: 'Williamson’s “economic governance, especially the boundaries of the firm.”' },
      { text: 'shareholder value.', why: 'No.' },
    ] }),
    Q({ id: 'S06-q10', kind: 'apply', src: 'S6 slides 10', stem: 'Under the knowledge-based view, which should Chick-fil-A keep inside the firm?', correct: 0, options: [
      { text: 'Its sauce recipe and in-store operations.', why: 'Critical knowledge elements.' },
      { text: 'Making paper cups.', why: 'Outside.' },
      { text: 'Raising chickens.', why: 'Outside on the slide.' },
      { text: 'Making soda.', why: 'Outside.' },
    ] }),
    Q({ id: 'S06-q11', kind: 'quant', src: 'S6 slides 5', stem: 'McGahan & Porter (1997): industry 18.7%, corporate 4.3%, business unit 31.5% of profit variance. In THIS study the business-unit effect is about how many times the industry effect?', correct: 1, options: [
      { text: '0.6×', why: 'Inverted (18.7 ÷ 31.5).' },
      { text: '1.7×', why: '31.5 ÷ 18.7 = 1.68. The slide’s “three to five times” summarizes the whole set of studies (e.g., Vanneste: 36 ÷ 8 = 4.5).' },
      { text: '7×', why: 'That’s the Five Forces ROIC spread.' },
      { text: '4.5×', why: 'That’s the Vanneste 2017 meta-analysis (36 ÷ 8), not McGahan & Porter.' },
    ] }),
    Q({ id: 'S06-q12', kind: 'apply', src: 'VRIO §4', stem: '**Ridge & Vale** (fictional), a 120-year-old winery, owns hillside vineyards planted before the region was developed. A rival with billions can buy land nearby but not those vines. The barrier?', correct: 1, options: [
      { text: 'Causal ambiguity.', why: 'The source is clear.' },
      { text: 'Unique history / path dependence — “money can buy the same category of asset today; it cannot buy the same asset.”', why: '§4.' },
      { text: 'Social complexity.', why: 'Not relationships.' },
      { text: 'A network effect.', why: 'No.' },
    ] }),
    Q({ id: 'S06-q13', kind: 'case', src: 'VRIO §7', stem: 'Why does the brief mark McKinsey’s Organization test “?”', correct: 2, options: [
      { text: 'Because McKinsey’s resources aren’t rare.', why: 'They pass V, R, I.' },
      { text: 'Because McKinsey is losing money.', why: 'It still earns premium fees.' },
      { text: 'Because the up-or-out pyramid that converts reputation into rent is under pressure (settlements, frozen salaries, smaller intake, AI).', why: '§7 and Ex.1 note.' },
      { text: 'Because data was unavailable.', why: 'Deliberately unresolved, not missing.' },
    ] }),
    Q({ id: 'S06-q14', kind: 'apply', src: 'VRIO §3', stem: 'Your team marks a firm’s customer-service culture “rare” because “it’s really good.” What is missing?', correct: 0, options: [
      { text: 'A comparison against named competitors — rarity means few rivals control it, not that it’s impressive.', why: 'Rubric: don’t conflate “rare” with “impressive.”' },
      { text: 'A dollar value.', why: 'Value isn’t the rarity test.' },
      { text: 'A patent.', why: 'Not required.' },
      { text: 'Nothing.', why: 'The test wasn’t applied.' },
    ] }),
    Q({ id: 'S06-q15', kind: 'case', src: 'VRIO §7', stem: 'Why doesn’t Visa’s sustained verdict mean permanent?', correct: 3, options: [
      { text: 'Visa’s network isn’t rare.', why: 'Only Mastercard is comparable.' },
      { text: 'Visa isn’t organized.', why: 'Organization is its whole operating model.' },
      { text: 'Visa’s margins are falling to zero.', why: 'Not stated.' },
      { text: 'Substitutes (Pix, UPI) and regulation (interchange settlement) press on it.', why: '“The verdict holds. The margin that sits on top of it is being negotiated.”' },
    ] }),
    Q({ id: 'S06-q16', kind: 'concept', src: 'VRIO §5', stem: 'Why is an unexploited advantage called the most actionable case?', correct: 1, options: [
      { text: 'Because it’s the most common.', why: 'Parity is most common.' },
      { text: 'Because the constraint is internal and therefore inside management’s control.', why: '§5.' },
      { text: 'Because it requires buying a new resource.', why: 'The resource already exists.' },
      { text: 'Because regulators can fix it.', why: 'No.' },
    ] }),
    Q({ id: 'S06-q17', kind: 'apply', src: 'VRIO §4', stem: '**Harbor Bistro** (fictional) is famous for a team culture where servers anticipate guests’ needs; it grew from 25 years of the same staff working together. Barrier?', correct: 2, options: [
      { text: 'Legal deterrent.', why: 'No law prevents copying.' },
      { text: 'Scale.', why: 'Not scale.' },
      { text: 'Social complexity (and path dependence) — rooted in relationships and norms; it can be described but not engineered on demand.', why: '§4.' },
      { text: 'Network effects.', why: 'No.' },
    ] }),
    Q({ id: 'S06-q18', kind: 'case', src: 'VRIO Asg §2', stem: 'Which is a ground rule of the VRIO assignment?', correct: 0, options: [
      { text: 'Date every verdict and note where it is fragile and what would break it.', why: 'Ground rules table.' },
      { text: 'Use as many resources as possible.', why: '“Quality beats quantity.”' },
      { text: 'Assume inside data.', why: '“Public facts only.”' },
      { text: 'Mark every test yes to show strength.', why: 'The opposite.' },
    ] }),
    Q({ id: 'S06-q19', kind: 'apply', src: 'VRIO §3-5', stem: 'A firm’s generative-AI customer chatbot runs on the same commercial model every rival can license. VRIO verdict for the chatbot alone?', correct: 3, options: [
      { text: 'Sustained advantage.', why: 'Fails rarity/imitability.' },
      { text: 'Unexploited advantage.', why: 'That requires V, R, I.' },
      { text: 'Competitive disadvantage.', why: 'It’s valuable.' },
      { text: 'Parity at best (or a short temporary edge) — valuable but available to every rival.', why: 'Apply the gate: not rare/not costly to imitate.' },
    ] }),
    Q({ id: 'S06-q20', kind: 'concept', src: 'S6 slides 24', stem: 'On the S6 slide’s older table, “durable competitive advantage” (Y, Y, Y, N) corresponds to which verdict in the brief?', correct: 1, options: [
      { text: 'Sustained competitive advantage.', why: 'Sustained requires O = yes.' },
      { text: 'Unexploited competitive advantage.', why: 'Same answer pattern (V, R, I yes; O no) — different label.' },
      { text: 'Temporary competitive advantage.', why: 'That’s Y, Y, N.' },
      { text: 'Parity.', why: 'That’s Y, N.' },
    ] }),
  ],
  shorts: [
    { id: 'S06-sa1', session: 'S06', src: 'VRIO §4', prompt: 'Name the four barriers to imitation with an example of each.', model: 'Unique history (a century-old brand; a site secured before development), causal ambiguity (cultures benchmarked but not matched), social complexity (trust and norms across many people), legal/economic deterrents (patents; scale, switching costs, network effects — NVIDIA’s CUDA developers).', points: ['All four', 'An example each'] },
    { id: 'S06-sa2', session: 'S06', src: 'VRIO §7', prompt: 'Explain Intel’s verdict and the lesson.', model: 'Leading-edge fabs and x86 pass V, R and I but fail Organization: $23.6B of foundry operating losses in 2024–25. Unexploited advantage — the constraint was organization, and fixing it let the same resources begin to earn.', points: ['V, R, I yes; O no', 'Loss evidence', 'Lesson'] },
    { id: 'S06-sa3', session: 'S06', src: 'S6 slides 9-10', prompt: 'Why do firms exist? Give two theories from class.', model: 'Transaction cost economics: firms exist where governing activities internally is cheaper than market contracting. Knowledge-based view: boundaries surround critical knowledge (Chick-fil-A keeps sauce and operations, buys cups and soda).', points: ['TCE', 'KBV with example'] },
    { id: 'S06-sa4', session: 'S06', src: 'VRIO §3-7', prompt: 'In three sentences, does AI offer a sustainable advantage?', model: 'Generic AI is valuable but not rare and not costly to imitate, so it’s parity or a temporary edge. It becomes sustained only when bundled with rare, hard-to-copy resources (proprietary data, embedded workflows, socially complex routines). And the firm must be organized to exploit it — Intel shows rare resources earn nothing otherwise.', points: ['Applies V/R/I', 'Complementary resources', 'Organization'] },
  ],
  written: {
    prompt: '**Timed (20 min).** Diagnose a fictional regional airline, **Skylark**, whose resources are: a modern fleet (same model rivals fly), exclusive slots at a congested downtown airport, a beloved crew culture built over 20 years, and a new revenue-management system bought from a vendor. Run VRIO on each, give the overall diagnosis, and two recommendations.',
    minutes: 20,
    model: 'Fleet: valuable, not rare → parity. Downtown slots: valuable, rare, costly to imitate (legal/regulatory deterrent, path dependence) → sustained if organized (check schedule use). Crew culture: valuable, rare, costly to imitate (social complexity, path dependence) → sustained if incentives support it. Vendor RM system: valuable, not rare → parity. Diagnosis: the slots and the culture carry the position; fragile if slot rules change or the culture erodes with growth. Recs: protect slot utilization (organization), protect culture through hiring/promotion (defend imitability).',
    rubric: ['Each resource gated correctly', 'Named barrier for imitability', 'Diagnosis names carrying resources + fragility', 'Recommendations tied to VRIO logic'],
  },
  oral: { prompt: 'Does AI offer a firm a sustainable competitive advantage? Use VRIO.', probes: ['Which test does generic AI fail?', 'What would make AI rare?', 'Give a firm where AI could be sustained.', 'How could AI weaken a firm’s organization?'] },
  summary: {
    answer: 'A firm is a bundle of heterogeneous, hard-to-move resources and capabilities (and exists where internal governance beats the market). AI alone fails VRIO’s rarity and imitability tests — it’s parity or a temporary edge — and becomes sustained only when bundled with rare, hard-to-copy resources and an organization built to exploit them.',
    numbers: [
      { label: 'Business unit vs. industry (variance)', value: '3–5× across studies', src: 'S6 slides 5' },
      { label: 'Intel foundry losses', value: '$23.6B (2024–25)', src: 'VRIO §7' },
      { label: 'Visa', value: '$40.0B revenue, ~60% operating margin', src: 'VRIO §7' },
      { label: 'CUDA developers', value: '7.5M+', src: 'VRIO §4' },
    ],
    frameworkBullets: ['Heterogeneous + imperfectly mobile', 'Resources (stocks) vs. capabilities (flows)', 'V → R → I → O; first no fixes it', 'Four barriers; imitability is where advantages die', 'VRIN vs. VRIO; check substitutes', 'TCE and knowledge-based view of the firm'],
    caseBullets: ['Visa sustained; branches parity; McKinsey O “?”; Intel unexploited', 'Assignment: specific resources, named rivals, time-to-imitate, dated verdicts', 'Calibrate: avoid all-yes pages'],
  },
}
