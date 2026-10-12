import raw from './s04-solution.json'

export interface Sub {
  label: string
  rating: number
  weight: number
  scale: (string | number | null)[]
  note: string | null
}
export interface Component {
  label: string
  rating: number | null
  weight: number
  scale: (string | number | null)[]
  subs: Sub[]
  note: string | null
}
export interface Force {
  name: string
  components: Component[]
  score: number
  verdict: string
}

/** Professor's S04 Solution (Storage & Warehouse Leasing), extracted from the workbook by scripts. */
export const solution = raw as unknown as { industry: string; overall: number; forces: Force[] }

/** Key for a rateable item: f-c or f-c-s. */
export const itemKey = (f: number, c: number, s?: number) => (s === undefined ? `${f}-${c}` : `${f}-${c}-${s}`)

/** Same arithmetic as the tool's Calculations Hub: weighted averages at each level. Unrated items are skipped. */
export function forceScore(f: Force, fi: number, ratings: Record<string, number>) {
  let num = 0
  let den = 0
  f.components.forEach((c, ci) => {
    let val: number | null = null
    if (c.subs.length) {
      let n = 0
      let d = 0
      c.subs.forEach((s, si) => {
        const r = ratings[itemKey(fi, ci, si)]
        if (r) (n += r * s.weight), (d += s.weight)
      })
      if (d) val = n / d
    } else {
      val = ratings[itemKey(fi, ci)] ?? null
    }
    if (val !== null) (num += val * c.weight), (den += c.weight)
  })
  return den ? num / den : null
}

export function professorRatings() {
  const r: Record<string, number> = {}
  solution.forces.forEach((f, fi) =>
    f.components.forEach((c, ci) => {
      if (c.subs.length) c.subs.forEach((s, si) => (r[itemKey(fi, ci, si)] = s.rating))
      else if (c.rating) r[itemKey(fi, ci)] = c.rating
    }),
  )
  return r
}

export const band = (x: number) => (x < 2 ? 'very unattractive' : x < 3 ? 'moderately unattractive' : x < 4 ? 'moderately attractive' : 'very attractive')

/** Case facts for the self-storage rater (IBISWorld figures as cited in the professor's notes; no ratings given away). */
export const caseFacts: Record<string, string[]> = {
  Rivalry: [
    'Largest companies hold less than one-quarter of revenue: Public Storage 11.5%, Extra Space 8.8%, U-Haul and CubeSmart 2.5–5% each; “other companies” 79.7%.',
    'Rental prices have declined three years in a row as lessors discount to attract new tenants; operators “compete mainly on location and price.”',
    'Big national chains use steep move-in discounts; the residential segment (75% of revenue) is protected mainly through rate increases on existing customers.',
    'Most customers know the storage companies in their area; units are “functionally identical.”',
    'Tenants rarely shop around once settled; average stay 19.3 months; leases are month-to-month.',
    'Revenue CAGR: 2021–26 +4.3% (trailing); 2026 +0.3% (current year); 2026–31 −0.1% (forecast).',
    'New construction added 292.9M sq ft over five years, pushing vacancy higher; occupancy “broadly flat.”',
    'Depreciation is the largest cost (11.2% of revenue): an asset-heavy industry. Wages are 8.9% and purchases under 2%. An empty unit earns nothing that month.',
    'Facilities are specialized real estate, but there is an active acquisition market (PSA bought Simply Self Storage for $2.2B; a $10.5B deal for National Storage Affiliates).',
  ],
  'Buyer Power': [
    'Buyers: long-term residential 52.5% and short-term residential 22.5% of revenue, commercial operators 18.7%, students 3.2%, military 3.1%. Small businesses and households sign most leases.',
    'Switching is a hassle (moving belongings), but leases are month-to-month and buyers can negotiate terms.',
    'Forecast growth −0.1%/yr; a frozen housing market has slowed relocations.',
    'Households can’t build storage facilities; some large businesses keep their own storage networks.',
    'Most buyers are households (no “profit”); commercial buyers are thin-margin retailers and wholesalers.',
    'Discounts go mainly to new move-ins, military, and commercial volume leases.',
    'Storage is a small line item for most households and businesses; few high-volume purchasers.',
    'Top reason to rent is “a lack of space at home”; storage is cost-effective vs. bigger homes or warehouses.',
  ],
  'Supplier Power': [
    'First-tier suppliers: alarm/signal equipment, electric power, building construction, security services, each fragmented with hundreds of firms. IBISWorld rates supplier power Low.',
    'Purchases under 2%, rent under 2%, marketing under 1% of revenue; many operators use long-term supplier contracts.',
    'Construction bids vary with steel and aluminum tariffs; security and utility prices vary less.',
    'Customers choose on location and price, not on who built the facility.',
    'Suppliers would need land, zoning approval and property management to enter. No forward integration is reported.',
  ],
  'Threat of New Entrants': [
    'Large REITs gain from AI-driven pricing and digital channels, but 206.3k businesses average about one employee each and local familiarity keeps small providers competitive.',
    '“Capital, not labor, is the binding constraint for new entrants.” Land and buildings are expensive; tariffs raised construction costs.',
    'Marketing is under 1% of revenue; local search is a low-cost acquisition channel; new operators win through referrals and local reputation.',
    'Units are functionally identical; innovation rated Low. Zoning and land-use approval is the binding regulatory constraint.',
    'Highly fragmented: even Public Storage has only 11.5%. A single facility can break even serving local demand.',
    'Brands matter some, but loyalty goes to the closest, most familiar location.',
    'Network effects: customers choose on location and price, not on how many others use a company.',
    'Industry profit margin about 45%, “well above the sector average.” Forecast revenue growth −0.1%/yr.',
  ],
  'Threat of Substitutes': [
    'Substitutes: DIY storage in a basement, garage or spare room; businesses converting office space; third-party logistics (3PL) providers.',
    '“There aren’t that many substitutes in this industry.” IBISWorld rates substitutes Low; urban renters lack DIY space.',
    'DIY saves rent only if you already have space; otherwise the alternative is a bigger home or office, which costs more. 3PLs bundle more services at a higher price.',
    'DIY offers 24/7 access but suits short-term needs; 3PLs outperform for fulfillment but households just need space.',
    'Month-to-month leases; moving belongings home costs little for buyers who have space.',
  ],
}
