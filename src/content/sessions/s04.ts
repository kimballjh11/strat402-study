import { num } from '../../lib/format'
import { solution } from '../data/fiveforces'
import type { SessionModule } from '../types'

const r = String.raw
const fs = solution.forces

export const s04: SessionModule = {
  id: 'S04',
  num: '4',
  title: 'Industry Analysis',
  spine: 'markets',
  minutes: 50,
  ready: true,
  takeaway: r`First **define the industry** (job-to-be-done, NAICS, self-descriptions). Then rate the **five forces** (rivalry, buyers, suppliers, new entrants, substitutes) from the incumbent's point of view, and watch the **general environment** (PEST, 10-K Item 1A) for trends that shift them.`,
  why: r`Strategy question 1, **Markets to Pursue**: which industries are attractive arenas? Average profitability differs enormously by industry: Internet software earned 33% ROIC in 2015–2024 while technology hardware lost 9%. The Five Forces explain why. [[S04 slides pp.26-28]]

Every tool later in the course plugs into a force [[S04 slides p.29]]:

- **Rivalry:** concentration (C4/HHI).
- **Buyer power:** concentration, own-price elasticity, backward integration.
- **Supplier power:** concentration, backward integration.
- **Substitutes:** cross-price elasticity, switching costs.
- **New entrants:** economies of scale, learning curves, network effects, limit pricing.

> Exam angle: definitions of the ten concepts, which diagnostic question belongs to which force, and the debrief lessons from your self-storage assignment (forward growth rate, segments ≠ buyers). [[S05 slides pp.5-9]]`,
  intuition: r`Imagine you're deciding whether to open a store in some industry. Five things can take your profit away:

1. **Rivals** fighting you on price.
2. **Buyers** strong enough to squeeze you (Walmart, Lowe's).
3. **Suppliers** strong enough to squeeze you (a must-have ingredient).
4. **Newcomers** who can easily copy you.
5. **Substitutes** that do the same job a different way (driving instead of flying).

An industry is **attractive** when all five are weak. That's why the tool scores each one from 1 (strong force, unattractive) to 5 (weak force, attractive). [[Five Forces Tool, Instructions]]

But first you need the right industry. Ask what job customers hire the company to do, check the government's NAICS code (which can lag: Netflix was “video tape rental” until 2022), and read how the company describes itself. [[Skills: Defining a Company’s Industry page]]`,
  los: [
    { id: 'S04-LO1', text: 'Know and understand the following concepts: rivalry, substitute, barriers to entry, buyer power, supplier power, attractiveness of an industry, switching costs, backward integration, forward integration, network effects', src: 'Canvas Session 4 module; S04 slides p.11' },
    { id: 'S04-LO2', text: "Know and understand how to correctly identify a firm's industries and markets", src: 'Canvas Session 4 module; S04 slides p.11' },
    { id: 'S04-LO3', text: 'Be able to identify and evaluate the five major forces that shape average industry profitability to evaluate the overall attractiveness of an industry', src: 'Canvas Session 4 module; S04 slides p.11' },
    { id: 'S04-LO4', text: 'Be able to identify the factors in the general environment that affect firm and industry profitability', src: 'Canvas Session 4 module; S04 slides p.11' },
    { id: 'S04-LO5', text: 'Know and understand where to find information necessary to perform industry analysis', src: 'Canvas Session 4 module; S04 slides p.11' },
  ],
  terms: [
    { id: 's04-t-rivalry', term: 'Rivalry', def: 'Competition between firms within the incumbent industry. Lower levels of rivalry tend to have a positive effect on industry profits.', src: 'Five Forces Tool, Glossary!B1' },
    { id: 's04-t-buyer', term: 'Buyer power', def: 'The relative power of companies and/or consumers who purchase from the incumbent industry. Powerful buyers negotiate lower prices or other concessions; high buyer power makes the industry less attractive.', src: 'Five Forces Tool, Glossary!B12' },
    { id: 's04-t-supplier', term: 'Supplier power', def: 'The relative power of firms that sell inputs to the incumbent industry. High supplier power has a negative effect on incumbent profitability.', src: 'Five Forces Tool, Glossary!B25' },
    { id: 's04-t-entry', term: 'Barriers to entry / threat of new entrants', def: 'The possibility of newcomers entering and capturing share. High barriers (scale economies, capital, patents, brand, switching costs, network effects, regulation) mean a low threat and a more attractive industry for incumbents.', src: 'Five Forces Tool, Glossary!B32; S04 slides p.22' },
    { id: 's04-t-sub', term: 'Substitute', def: 'A product or service that fulfills the same job but in a different way (driving instead of flying: Honda is not in direct rivalry with Delta).', src: 'S04 slides p.23; Five Forces Tool, Glossary!B47' },
    { id: 's04-t-switch', term: 'Switching costs', def: 'How hard it is for customers to switch from one incumbent to another (contracts, hassle, retraining). Higher switching costs → more attractive industry.', src: 'Five Forces Tool, Glossary!B7, B15' },
    { id: 's04-t-backward', term: 'Backward integration', def: 'A buyer entering the incumbent industry to become its own supplier. The easier this is, the more power buyers have.', src: 'Five Forces Tool, Glossary!B17' },
    { id: 's04-t-forward', term: 'Forward integration', def: 'A supplier entering the incumbent industry. The easier this is, the more power suppliers have.', src: 'Five Forces Tool, Glossary!B31' },
    { id: 's04-t-network', term: 'Network effects', def: 'A product becomes more valuable to each consumer as more consumers use it; this deters entry and makes the industry more attractive for incumbents.', src: 'Five Forces Tool, Glossary!B42' },
    { id: 's04-t-attract', term: 'Attractiveness of an industry', def: 'How profitable the average incumbent can be, given the five forces; scored 1 (least) to 5 (most attractive) from the incumbent’s point of view.', src: 'Five Forces Tool, Instructions!A2' },
    { id: 's04-t-define', term: 'Three ways to define an industry', def: '(1) “What job are your customers hiring you to do?” test; (2) industry classifications (NAICS: 2–6 digits, more digits = narrower); (3) organizational self-descriptions (About page, 10-K Item 1).', src: 'S04 slides p.13; Skills: Defining a Company’s Industry page' },
    { id: 's04-t-pest', term: 'PEST analysis', def: 'Political, Economic, Social and Technological trends in the general environment that can alter the five forces; find them in 10-K Item 1A (Risk Factors).', src: 'Skills: Analyzing the General Environment page' },
  ],
  mathIntro: r`Industry analysis is mostly judgement, but the professor's tool turns it into numbers. [[S04 Solution, Calculations Hub]]`,
  formulas: [
    { id: 's04-f-score', name: 'Force score', latex: r`\text{Force} = \frac{\sum_c w_c\,\bar r_c}{\sum_c w_c},\qquad \bar r_c = \frac{\sum_s v_s r_s}{\sum_s v_s}`, vars: [[r`r`, 'rating 1–5 (5 = most attractive)'], [r`w_c, v_s`, 'component weights and sub-weights']], words: 'Weighted average of ratings, sub-factors rolled up into components, components into the force.', src: 'S04 Solution, Calculations Hub!K21-K93' },
    { id: 's04-f-overall', name: 'Overall attractiveness', latex: r`\text{Overall} = \text{weighted average of the 5 force scores}`, vars: [[r`\text{bands}`, '1–2 very unattractive; 2–3 moderately unattractive; 3–4 moderately attractive; 4–5 very attractive']], words: 'Average the five forces (equal weights by default).', src: 'S04 Solution, Five Forces!G116, A23' },
  ],
  examples: [
    {
      id: 's04-ex-define',
      title: 'Defining Home Depot’s industry three ways',
      setup: 'In class: what industry are Home Depot and Lowe’s in? [[S04 slides pp.12-17]]',
      steps: [
        { ask: 'Job-to-be-done?', show: 'What “job” is a customer hiring Home Depot or Lowe’s to do? Improving, repairing and maintaining a home (and garden). [[S04 slides p.14]]' },
        { ask: 'NAICS?', show: 'Both are 444110 Home Centers (44 → 444 → 4441 → 44411 → 444110): establishments retailing a general line of home repair and improvement materials. [[S04 slides p.15]]' },
        { ask: 'Self-description?', show: '“The world’s largest home improvement retailer”: 2,347 stores in the US, Canada and Mexico; building materials, home improvement products, lawn and garden, installation services and tool rental, in stores and online. [[S04 slides pp.16-17]]' },
      ],
      takeaway: 'Three methods should converge. The definition tells you who the buyers, suppliers, rivals, entrants and substitutes are.',
      src: 'S04 slides pp.12-17',
    },
    {
      id: 's04-ex-netflix',
      title: 'Netflix: when the NAICS code lags',
      setup: 'What job do you hire Netflix to do? [[Skills: Defining a Company’s Industry page]]',
      steps: [
        { ask: 'NAICS today vs. before 2022?', show: '516210 Media Streaming Distribution Services… today; 532282 Video Tape and Disc Rental before 2022, though streaming overtook DVD-by-mail in 2011. Classifications lag in dynamic industries.' },
        { ask: 'Self-descriptions?', show: '“…one of the world’s leading entertainment services offering TV series, films, games and live programming…” (10-K Item 1); revenue comes primarily from streaming memberships.' },
        { ask: 'Conclusion?', show: 'Global streaming entertainment. Customers want immediate entertainment; suppliers are content creators; rivals are Prime, Hulu, Disney+; entrants HBO and Peacock; substitutes cable and social media.' },
      ],
      takeaway: 'Always cross-check the government code against how customers and the company see the business.',
      src: 'Skills: Defining a Company’s Industry page',
    },
    {
      id: 's04-ex-storage',
      title: 'Your Industry Analysis assignment: self-storage (professor’s solution)',
      setup: r`Storage & Warehouse Leasing: rents self-storage space to households and businesses; competition is local and driven by location and price. Evidence from the IBISWorld report. [[S04 Solution, Instructions!A6]]`,
      steps: [
        { ask: 'Rivalry: which facts drive it?', show: `Fragmented (top 4 ≈ 25–30%: rated 1), forecast growth −0.1% (rated 1, the forward rate!), high fixed costs, excess capacity → **${num(fs[0].score, 2)}** (moderately unattractive).` },
        { ask: 'Buyer power?', show: `Millions of households (buyer concentration rated 5; segments ≠ buyers), meaningful switching hassle, but price-sensitive buyers with low profitability → **${num(fs[1].score, 2)}** (moderately attractive).` },
        { ask: 'Supplier power?', show: `Fragmented, generic suppliers (construction, security, utilities) with no realistic forward integration → **${num(fs[2].score, 2)}** (very attractive).` },
        { ask: 'Threat of new entrants?', show: `Capital-heavy entry, but small scale economies, little marketing needed, <5% share to break even, and a 45% industry margin that attracts entry → **${num(fs[3].score, 2)}** (moderately unattractive).` },
        { ask: 'Substitutes and overall?', show: `DIY space and 3PLs are well known but scarce, pricier or worse for the main need → **${num(fs[4].score, 2)}**. Overall **${num(solution.overall, 2)}**: moderately attractive. [[S04 Solution, Five Forces!G116]]` },
      ],
      takeaway: 'Cite the evidence, make reasoned judgements where the report is silent, and rate from the incumbent’s point of view.',
      src: 'S04 Solution',
    },
    {
      id: 's04-ex-meta',
      title: 'General environment: Meta’s Item 1A risk factors',
      setup: 'What PEST trends face social media/digital advertising (Facebook, X, Snapchat, TikTok)? [[Skills: Analyzing the General Environment page]]',
      steps: [
        { ask: 'Name one of each P, E, S, T.', show: 'Political: content moderation, privacy law (GDPR), antitrust. Economic: slowdowns depress ad demand; advertisers shift budgets to Google, TikTok, Amazon. Social: younger users prefer TikTok/Snapchat; teen mental-health concerns. Technological: generative AI, security breaches, deepfakes.' },
        { ask: 'How could reputation loss change the forces?', show: 'Higher **rivalry** (users leave for other sites → ad price cuts), higher **buyer power** (advertisers value the platform less), more **substitutes** (other ways to connect and get news).' },
        { ask: 'August 2026 update?', show: '$18B settlement with 48 state AGs; default 2-hour daily limit for under-18s; the last $5.3B is owed only if TikTok and YouTube agree to similar limits. One firm’s costs now depend on its rivals.' },
      ],
      takeaway: 'PEST trends matter because they move the five forces for the whole industry.',
      src: 'Skills: Analyzing the General Environment page',
    },
  ],
  widgets: [
    {
      id: 'five-forces',
      title: 'Five Forces rater: self-storage vs. the professor’s solution',
      intro: 'Rate each sub-factor using the evidence. Force and overall scores are computed exactly like the Excel tool. Then compare with the professor’s ratings and read his notes.',
      questions: [],
      numeric: [{ id: 's04-w1', label: 'After comparing: what overall attractiveness score did the professor’s solution reach?', part: { type: 'num', label: 'Overall score', answer: solution.overall, tol: 0.003 }, hint: 'It is shown in the Overall box after you click Compare.', src: 'S04 Solution, Five Forces!G116' }],
    },
  ],
  checkIds: ['s04-c-define3', 's04-c-substitute', 's04-c-backward', 's04-c-q-entry', 's04-c-growth', 's04-c-segments'],
  applyGenerators: ['s04-force', 's04-score', 's04-growth'],
  traps: [
    { title: 'Ratings run toward attractiveness', body: 'In the tool, 5 = most attractive for incumbents. Strong buyer power → a LOW rating.', src: 'S04 Solution' },
    { title: 'Segments are not buyers', body: '52.5% “long-term residential” is millions of households, not one buyer. Buyer concentration is <40% → rated 5. “The most common error on this component.” [[S04 Solution, Five Forces!A29]]', src: 'S04 Solution A29' },
    { title: 'Using trailing growth', body: 'Rate on the forward-looking rate (−0.1%), not the 4.3% already captured. [[S04 Solution, Five Forces!A15]]', src: 'S04 Solution A15' },
    { title: 'Using the industry’s margin for the buyer’s', body: 'The 45% margin belongs to the storage operators. Households have no “profit.” [[S05 slides p.8]]', src: 'S05 slides p.8' },
    { title: 'Rival vs. substitute', body: 'A rival does the same job the same way (Lowe’s). A substitute does the same job a different way (hiring a contractor; driving vs. flying).', src: 'S04 slides p.23' },
    { title: 'Backward vs. forward', body: 'Buyers integrate *backward* (into our industry); suppliers integrate *forward* (into our industry).', src: 'Five Forces Tool, Glossary' },
    { title: 'Trusting NAICS blindly', body: 'Codes lag (Netflix = video tape rental until 2022). Cross-check with job-to-be-done and self-descriptions.', src: 'Skills page' },
  ],
  feynman: [
    {
      id: 's04-fey-1',
      prompt: 'Explain to a friend why a fragmented industry with high profit margins (like self-storage) can still score as only moderately attractive.',
      model: 'High margins today attract entrants. In self-storage, a single facility can break even with a tiny share, marketing is cheap, and there’s no technology moat, so the threat of entry is high. The industry is fragmented with near-identical units, demand is forecast to shrink, and new supply keeps adding capacity, so rivals compete on price. Suppliers are weak and substitutes are limited, which helps, but rivalry (2.36) and entry (2.83) drag the overall score to about 3.3: moderately attractive.',
      rubric: ['Linked high margins to entry', 'Identified rivalry drivers (fragmented, standardized, slow growth, capacity)', 'Mentioned strengths (supplier power, substitutes)', 'Used the professor’s scores'],
    },
    {
      id: 's04-fey-2',
      prompt: 'Why does defining the industry correctly matter before running the Five Forces?',
      model: 'The definition decides who counts as a buyer, supplier, rival, entrant or substitute. If you define Netflix as “DVD rental” (its old NAICS code), you’d list Redbox as a rival and miss Disney+, YouTube and TikTok. The job-to-be-done test, current NAICS, and the company’s own description together point to “global streaming entertainment,” which gives the right cast for each force.',
      rubric: ['Definition determines the players in each force', 'Example of a wrong definition', 'Three methods converge', 'Correct Netflix conclusion'],
    },
  ],
  deeper: [
    { title: 'Elasticity meets the Five Forces', kind: 'textbook', body: 'Own-price elasticity ↔ buyer power; cross-price elasticity between rivals ↔ rivalry; cross-price elasticity with outside products ↔ substitutes; supplier power and entry need other evidence. [[S08 slides p.32]]' },
    { title: 'Where to find data', kind: 'textbook', body: 'IBISWorld industry reports (market shares, growth, costs, buyer segments, key success factors) [[In-Class Exercise: Industry Analysis page]]; 10-K Item 1 (business), Item 1A (risk factors), Item 7 (MD&A operating data) and Item 8 (financials) [[CQ3 Q10]]; NAICS classification spreadsheet [[Skills page]].' },
    { title: 'Performance vs. improvement (the bike race)', kind: 'textbook', body: 'The professor’s “collaboration vs. competition” opener: in a race, rank changes always sum to zero (zero-sum), but improvements don’t (the team got 275 minutes faster). Industries can be the same: rivalry over share is zero-sum; growing the pie isn’t. [[S04 slides p.7]]' },
    { title: 'In a case interview: market attractiveness', kind: 'case-interview', body: 'Use the Five Forces as a structure for “should our client enter X?”, but quantify: market size and growth (forward!), concentration (C4/HHI), customer concentration and switching costs, supplier concentration, entry costs and time-to-breakeven, substitute price/performance. End with a verdict and the one or two forces that drive it.' },
  ],
  summary: r`**Define the industry:** job-to-be-done; NAICS (2–6 digits, more = narrower; can lag: Netflix 532282 → 516210); self-descriptions (About page, 10-K Item 1). [[S04 slides p.13]]

- **Five forces** (rate 1–5, 5 = most attractive for incumbents): rivalry, buyer power, supplier power, threat of new entrants, threat of substitutes. [[Five Forces Tool]]
- **Key terms:** switching costs, backward integration (buyers enter our industry), forward integration (suppliers enter), network effects, barriers to entry. [[Five Forces Tool, Glossary]]
- **Tool math:** weighted averages; bands 1–2 / 2–3 / 3–4 / 4–5. Self-storage: ${num(fs[0].score, 2)} / ${num(fs[1].score, 2)} / ${num(fs[2].score, 2)} / ${num(fs[3].score, 2)} / ${num(fs[4].score, 2)} → **${num(solution.overall, 2)}**. [[S04 Solution]]
- **Debrief:** forward growth rate; segments ≠ buyers; buyer profitability is the buyers’, not the industry’s. [[S05 slides pp.7-9]]
- **General environment:** PEST via 10-K Item 1A (Meta: reputation → rivalry, buyer power, substitutes). [[Skills: Analyzing the General Environment page]]
- **Data:** IBISWorld; 10-K Items 1, 1A, 7, 8. **ROIC:** Internet software 33% … tech hardware −9%. [[S04 slides pp.27-28]]`,
}
