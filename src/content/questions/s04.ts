import type { Mcq } from '../types'

const L1 = 'S04-LO1'
const L2 = 'S04-LO2'
const L3 = 'S04-LO3'
const L4 = 'S04-LO4'
const L5 = 'S04-LO5'
const S = 'S04' as const

export const s04Mcqs: Mcq[] = [
  {
    id: 's04-c-define3', session: S, los: [L2], origin: 'course', src: 'S04 slides p.13; Skills: Defining a Company’s Industry page', screen: 'examples',
    stem: 'What are the professor’s three ways to correctly identify a firm’s industry?',
    options: [
      { text: 'The “job-to-be-done” test, industry classifications (NAICS), and organizational self-descriptions', why: 'Correct. [[S04 slides p.13]]' },
      { text: 'C4, HHI and ROIC', why: 'Those measure structure/profitability, not industry definition.' },
      { text: 'Stock ticker, headquarters city and CEO', why: 'No.' },
      { text: 'PEST, Five Forces and SWOT', why: 'Those are analysis frameworks applied after defining the industry.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-naics', session: S, los: [L2, L5], origin: 'course', src: 'Skills: Defining a Company’s Industry page', screen: 'examples',
    stem: 'NAICS codes range from 2 to 6 digits. More digits means…',
    options: [
      { text: 'a more narrowly defined industry', why: 'Correct — Netflix: 51 Information → 516210 Media Streaming Distribution Services… [[Skills: Defining a Company’s Industry page]]' },
      { text: 'a larger industry', why: 'More digits = narrower, not larger.' },
      { text: 'a more profitable industry', why: 'Codes don’t measure profit.' },
      { text: 'a newer company', why: 'No.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-netflix-naics', session: S, los: [L2], origin: 'course', src: 'Skills: Defining a Company’s Industry page', screen: 'examples',
    stem: 'Before 2022, Netflix’s NAICS code was 532282 “Video Tape and Disc Rental,” even though streaming overtook DVD-by-mail in 2011. What lesson does the professor draw?',
    options: [
      { text: 'Government classifications lag in dynamic industries, so cross-check with job-to-be-done and self-descriptions', why: 'Correct. [[Skills: Defining a Company’s Industry page]]' },
      { text: 'NAICS codes are always wrong', why: 'Today’s code (516210) fits Netflix well; they just lag.' },
      { text: 'Netflix is a DVD company', why: 'Its revenue is primarily streaming.' },
      { text: 'Industry definition doesn’t matter', why: 'It determines customers, suppliers, rivals, entrants and substitutes.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-netflix-industry', session: S, los: [L2], origin: 'course', src: 'Skills: Defining a Company’s Industry page', screen: 'examples',
    stem: 'After applying all three methods, what industry does the professor conclude Netflix competes in?',
    options: [
      { text: 'Global streaming entertainment', why: 'Correct — which identifies customers (people who want to be entertained immediately), suppliers (content creators), rivals (Prime, Hulu, Disney+), entrants (HBO, Peacock) and substitutes (cable, social media). [[Skills page]]' },
      { text: 'Video tape and disc rental', why: 'That was the outdated NAICS code.' },
      { text: 'Software publishing', why: 'Not the conclusion.' },
      { text: 'Telecommunications', why: 'Netflix doesn’t provide the network.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-selfdesc', session: S, los: [L2, L5], origin: 'course', src: 'Skills page; S04 slides pp.16-17', screen: 'examples',
    stem: 'Where would you find a company’s organizational self-description?',
    options: [
      { text: 'Its website “About” page and Item 1 (Business) of its 10-K', why: 'Correct — e.g., Home Depot: “the world’s largest home improvement retailer.” [[S04 slides pp.16-17]]' },
      { text: 'Item 1A (Risk Factors)', why: 'That’s for PEST-type risks.' },
      { text: 'Item 8 (Financial Statements)', why: 'Numbers, not self-description.' },
      { text: 'The NAICS spreadsheet', why: 'That’s the government classification.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-rivalry', session: S, los: [L1], origin: 'course', src: 'Five Forces Tool, Glossary!B1', screen: 'terms',
    stem: 'Rivalry refers to…',
    options: [
      { text: 'competition between firms within the incumbent industry; lower rivalry tends to raise industry profits', why: 'Correct. [[Five Forces Tool, Glossary]]' },
      { text: 'competition from products in other industries', why: 'That is the threat of substitutes.' },
      { text: 'the power of suppliers', why: 'Separate force.' },
      { text: 'new firms entering', why: 'Threat of entry.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-substitute', session: S, los: [L1], origin: 'course', src: 'Five Forces Tool, Glossary!B47; S04 slides p.23', screen: 'terms',
    stem: 'Which is a substitute (not a rival) for Delta Air Lines on a 300-mile trip?',
    options: [
      { text: 'Driving a Honda', why: 'Correct — the tool’s own example: driving instead of flying, where Honda is not in direct rivalry with Delta. Same job, different way. [[Five Forces Tool, Glossary]]' },
      { text: 'United Airlines', why: 'That’s a direct rival.' },
      { text: 'Boeing', why: 'A supplier.' },
      { text: 'A travel agency', why: 'A buyer/channel.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-barriers', session: S, los: [L1], origin: 'course', src: 'Five Forces Tool, Glossary!B32', screen: 'terms',
    stem: 'High barriers to entry make an industry ___ for incumbents because ___.',
    options: [
      { text: 'more attractive; the threat of new entrants is low', why: 'Correct. [[Five Forces Tool, Glossary]]' },
      { text: 'less attractive; incumbents must spend more', why: 'Barriers protect incumbents.' },
      { text: 'more attractive; buyers have more power', why: 'Barriers don’t raise buyer power.' },
      { text: 'irrelevant; only rivalry matters', why: 'Entry is one of the five forces.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-backward', session: S, los: [L1], origin: 'course', src: 'Five Forces Tool, Glossary!B17', screen: 'terms',
    stem: 'Backward integration by a buyer means…',
    options: [
      { text: 'the buyer enters the incumbent industry and becomes its own supplier — the easier this is, the more buyer power', why: 'Correct. [[Five Forces Tool, Glossary]]' },
      { text: 'a supplier enters the incumbent industry', why: 'That is forward integration.' },
      { text: 'the buyer stops buying', why: 'Not integration.' },
      { text: 'the incumbent buys its customers', why: 'Not how the tool defines it.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-forward', session: S, los: [L1], origin: 'course', src: 'Five Forces Tool, Glossary!B31', screen: 'terms',
    stem: 'If suppliers can easily forward integrate into the incumbent industry…',
    options: [
      { text: 'supplier power is higher — they can enter if they don’t like the terms', why: 'Correct. [[Five Forces Tool, Glossary]]' },
      { text: 'buyer power is higher', why: 'It’s a supplier-power factor.' },
      { text: 'the threat of substitutes falls', why: 'Unrelated.' },
      { text: 'rivalry disappears', why: 'No.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-switching', session: S, los: [L1], origin: 'course', src: 'Five Forces Tool, Glossary!B7, B15', screen: 'terms',
    stem: 'High buyer switching costs…',
    options: [
      { text: 'reduce rivalry and buyer power, making the industry more attractive', why: 'Correct — “the harder it is to replace one company’s products for another’s, the more attractive.” [[Five Forces Tool, Glossary]]' },
      { text: 'increase buyer power', why: 'Locked-in buyers have less power.' },
      { text: 'make the industry less attractive', why: 'Opposite.' },
      { text: 'only affect suppliers', why: 'They’re a buyer/rivalry factor.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-network', session: S, los: [L1], origin: 'course', src: 'Five Forces Tool, Glossary!B42', screen: 'terms',
    stem: 'Network effects exist when…',
    options: [
      { text: 'a product becomes more valuable to consumers as more consumers use it — lowering the threat of new entrants', why: 'Correct. [[Five Forces Tool, Glossary]]' },
      { text: 'a firm has many offices', why: 'Not the meaning.' },
      { text: 'costs fall with scale', why: 'That’s economies of scale.' },
      { text: 'suppliers network with each other', why: 'No.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-q-rivalry', session: S, los: [L3], origin: 'course', src: 'S04 slides p.19', screen: 'examples',
    stem: 'Which question belongs to the professor’s list for evaluating RIVALRY?',
    options: [
      { text: 'Does the industry have high fixed costs?', why: 'Correct — along with: competitors, fragmentation, standardization, switching costs, demand growth, asset utilization. [[S04 slides p.19]]' },
      { text: 'Can buyers backward integrate?', why: 'Buyer power.' },
      { text: 'Can suppliers forward integrate?', why: 'Supplier power.' },
      { text: 'Are customers aware of substitute products?', why: 'Substitutes.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-q-buyer', session: S, los: [L3], origin: 'course', src: 'S04 slides p.20', screen: 'examples',
    stem: '“Are the industry’s products a significant proportion of the buyer’s costs?” is a question about…',
    options: [
      { text: 'Buyer power', why: 'Correct — big-ticket inputs make buyers bargain harder. [[S04 slides p.20]]' },
      { text: 'Supplier power', why: 'It’s about our buyers.' },
      { text: 'Rivalry', why: 'Not on the rivalry list.' },
      { text: 'Threat of entry', why: 'No.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-q-entry', session: S, los: [L3], origin: 'course', src: 'S04 slides p.22', screen: 'examples',
    stem: 'Which is NOT one of the professor’s threat-of-entry questions?',
    options: [
      { text: 'Are products in the industry standardized?', why: 'Correct — that is a rivalry question. Entry questions: scale/experience/learning, patents, preferential access to resources, capital, network effects, government policy. [[S04 slides p.22]]' },
      { text: 'Do economies of scale, experience or learning exist?', why: 'That IS an entry question.' },
      { text: 'Does entry require high capital investments?', why: 'That IS an entry question.' },
      { text: 'Do government policies make entry harder?', why: 'That IS an entry question.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-q-subs', session: S, los: [L3], origin: 'course', src: 'S04 slides p.23', screen: 'examples',
    stem: 'For a home-improvement retailer, which is a substitute that “fulfills the same job but in a different way”?',
    options: [
      { text: 'Hiring a contractor or handyman to do the project', why: 'Correct — the job (a home improvement) gets done without buying from a retailer. [[S04 slides p.23]]' },
      { text: 'Lowe’s', why: 'A direct rival.' },
      { text: 'A lumber mill', why: 'A supplier.' },
      { text: 'A homeowner', why: 'A buyer.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-tariffs', session: S, los: [L3], origin: 'course', src: 'S04 slides pp.8-10', screen: 'why',
    stem: 'Theory Meets Practice (WSJ, Aug 2025): Thompson Traders’ costs rose with tariffs, but Lowe’s agreed to only a 4–5% price increase on some sinks. Which force does this illustrate?',
    options: [
      { text: 'Buyer power — big-box retailers have the leverage, so the supplier likely eats much of the tariff cost', why: 'Correct. [[S04 slides p.10]]' },
      { text: 'Threat of substitutes', why: 'The issue is bargaining between supplier and buyer.' },
      { text: 'Threat of entry', why: 'No entry involved.' },
      { text: 'Rivalry among sink makers only', why: 'The slide asks who has leverage in the exchange.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-pest', session: S, los: [L4], origin: 'course', src: 'Skills: Analyzing the General Environment page', screen: 'terms',
    stem: 'PEST analysis looks at…',
    options: [
      { text: 'Political, Economic, Social and Technological trends in the general environment that can alter the five forces', why: 'Correct. [[Skills: Analyzing the General Environment page]]' },
      { text: 'Price, Elasticity, Supply, Taxes', why: 'Not the acronym.' },
      { text: 'Profit, Equity, Sales, Turnover', why: 'Not the acronym.' },
      { text: 'Only competitors’ actions', why: 'General-environment trends, not just rivals.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-1a', session: S, los: [L4, L5], origin: 'course', src: 'Skills: Analyzing the General Environment page', screen: 'examples',
    stem: 'Where does the professor suggest finding the political, economic, social and technological trends facing an industry?',
    options: [
      { text: 'Item 1A (Risk Factors) of industry members’ 10-Ks', why: 'Correct — e.g., Meta’s 10-K. [[Skills: Analyzing the General Environment page]]' },
      { text: 'Item 7 MD&A only', why: 'MD&A is for operational data (scale curves).' },
      { text: 'The NAICS spreadsheet', why: 'That classifies industries.' },
      { text: 'Glassdoor reviews', why: 'Not the suggested source.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-meta', session: S, los: [L4, L3], origin: 'course', src: 'Skills: Analyzing the General Environment page', screen: 'examples',
    stem: 'How could a loss of reputation for Meta affect the social media industry, according to the professor?',
    options: [
      { text: 'Increase rivalry (users shift to other sites), increase buyer power (advertisers value the platform less), and increase use of substitutes', why: 'Correct — all three lower industry attractiveness. [[Skills page]]' },
      { text: 'Increase supplier power only', why: 'The page discusses rivalry, buyers and substitutes.' },
      { text: 'Make the industry more attractive', why: 'Reputation loss lowers attractiveness.' },
      { text: 'No effect beyond Meta', why: 'The page argues effects spread industry-wide.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-meta-settle', session: S, los: [L4], origin: 'course', src: 'Skills: Analyzing the General Environment page (Update: August 2026)', screen: 'deeper',
    stem: 'In the August 2026 update, what made Meta’s $18 billion settlement strategically interesting?',
    options: [
      { text: 'Meta owes the last $5.3B only if TikTok and YouTube agree to similar limits — one company’s costs now depend on what its rivals do', why: 'Correct. Limits for under-18s could reduce engagement across the whole industry. [[Skills page]]' },
      { text: 'It was paid entirely by advertisers', why: 'No.' },
      { text: 'It ended all regulation of social media', why: 'No.' },
      { text: 'It required Meta to sell Instagram', why: 'That was the separate FTC case (Meta won in 2025).' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-ibis', session: S, los: [L5], origin: 'course', src: 'S04 slides pp.24-25; In-Class Exercise: Industry Analysis page', screen: 'examples',
    stem: 'What source did the class use as evidence for rating the Five Forces of home-improvement retailing?',
    options: [
      { text: 'The IBISWorld industry report (44411 Home Improvement Stores in the US)', why: 'Correct. [[In-Class Exercise: Industry Analysis page]]' },
      { text: 'Glassdoor', why: 'No.' },
      { text: 'Only Home Depot’s press releases', why: 'One-sided.' },
      { text: 'Wikipedia', why: 'Not the assigned source.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-scale', session: S, los: [L3], origin: 'course', src: 'Five Forces Tool, Instructions!A2; S04 Solution', screen: 'widgets',
    stem: 'In the Five Forces Strategy Excel Tool, a rating of 5 means…',
    options: [
      { text: 'most attractive for incumbents (e.g., weak buyer power)', why: 'Correct — the tool evaluates attractiveness from the incumbent’s point of view; 1 = least attractive. [[S04 Solution, Five Forces!A22]]' },
      { text: 'the force is strongest', why: 'A strong force is UNattractive → low rating.' },
      { text: 'there are five competitors', why: 'No.' },
      { text: 'the data source is reliable', why: 'No.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-growth', session: S, los: [L3], origin: 'course', src: 'S04 Solution, Five Forces!A15; S05 slides p.9', screen: 'examples',
    stem: 'Self-storage: trailing 2021–26 CAGR +4.3%, current 2026 growth +0.3%, forecast 2026–31 CAGR −0.1%. Which rate does the professor’s solution use for “industry growth rate,” and why?',
    options: [
      { text: 'The forward-looking −0.1%, because industry analysis asks whether the industry will be attractive from now on, not what growth has already been captured', why: 'Correct. [[S04 Solution, Five Forces!A15]]' },
      { text: 'The trailing 4.3%, because it’s based on actual data', why: 'Growth already captured doesn’t help an entrant or incumbent going forward.' },
      { text: 'The current 0.3%', why: 'Accepted only as an alternative for one buyer-power item; the solution rates on the forecast.' },
      { text: 'An average of all three', why: 'Not the professor’s approach.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-segments', session: S, los: [L3], origin: 'course', src: 'S04 Solution, Five Forces!A29; S05 slides p.7', screen: 'traps',
    stem: 'Three groups rated self-storage buyer concentration as 1 (>70%) by adding long-term residential (52.5%), short-term residential (22.5%), commercial (18.7%) and students (3.2%). What was wrong?',
    options: [
      { text: 'Those are market segments, not buyers — millions of households and small firms, so the top four buyers are far below 40% (rating 5)', why: 'Correct — “the most common error on this component.” [[S04 Solution, Five Forces!A29]]' },
      { text: 'They should have used the top-4 sellers (PSA, Extra Space…)', why: 'Also wrong: those are incumbents, not buyers.' },
      { text: 'Nothing — 96.9% is correct', why: 'Segments aren’t buyers.' },
      { text: 'They should have used 52.5% alone', why: 'Still a segment.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-buyerprofit', session: S, los: [L3], origin: 'course', src: 'S04 Solution, Five Forces!A44; S05 slides p.8', screen: 'traps',
    stem: 'How should you rate “profitability of the average buyer” for self-storage?',
    options: [
      { text: 'Low (0–5%): most buyers are households with no profit, and commercial buyers are thin-margin retailers', why: 'Correct — the solution rates it 2. Two error modes: parking in the middle, or using the industry’s own 45% margin as the buyer’s. [[S05 slides p.8]]' },
      { text: '>15%, using the industry’s 45% profit margin', why: 'That’s the incumbents’ margin, not the buyers’.' },
      { text: 'Skip it', why: 'Make a reasoned judgement and document it.' },
      { text: 'Medium, because the report doesn’t say', why: 'A common error mode; reason from who the buyers are.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-roic', session: S, los: [L3], origin: 'course', src: 'S04 slides pp.27-28', screen: 'deeper',
    stem: 'From the professor’s ROIC ranking (2015–2024), which is among the most profitable industries?',
    options: [
      { text: 'Specialty Retail (Home Depot, Lowe’s, Best Buy) at 19%', why: 'Correct — top 5: Internet Software & Services 33%, Interactive Media 27%, Software 22%, Specialty Retail 19%, Household Products 17%. [[S04 slides p.27]]' },
      { text: 'Banks at 2%', why: 'Bottom 5.' },
      { text: 'Technology Hardware at −9%', why: 'The least profitable.' },
      { text: 'Insurance at 1%', why: 'Bottom 5.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-ss-overall', session: S, los: [L3], origin: 'course', src: 'S04 Solution, Five Forces!G116', screen: 'widgets',
    stem: 'The professor’s self-storage analysis gives: rivalry 2.36, buyer power 3.33, supplier power 4.78, new entrants 2.83, substitutes 3.40. Overall?',
    options: [
      { text: '3.34 — moderately attractive (supplier power is the bright spot; rivalry and entry are the weak spots)', why: 'Correct. Equal-weighted average of the five forces. [[S04 Solution, Five Forces!G116]]' },
      { text: '4.78 — very attractive', why: 'That’s only supplier power.' },
      { text: '2.36 — moderately unattractive', why: 'That’s only rivalry.' },
      { text: '16.7', why: 'That’s the sum, not the average.' },
    ],
    correct: 0,
  },
  {
    id: 's04-c-neighbor', session: S, los: [L1, L3], origin: 'course', src: 'Watch: Neighbor, The Airbnb of Storage page', screen: 'deeper',
    stem: 'Neighbor (“the Airbnb of storage”) lets homeowners rent out garage and basement space. For traditional self-storage operators, Neighbor is best seen as…',
    options: [
      { text: 'A new entrant / substitute that turns DIY space into a marketplace — raising competitive pressure', why: 'Correct — it makes the “DIY storage” substitute more available and organized.' },
      { text: 'A supplier', why: 'It doesn’t supply storage operators.' },
      { text: 'A buyer', why: 'It doesn’t buy from them.' },
      { text: 'Irrelevant', why: 'It competes for the same job.' },
    ],
    correct: 0,
  },
]
