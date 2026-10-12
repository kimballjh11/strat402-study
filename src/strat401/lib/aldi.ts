/** Aldi cost-gap data and math. Every number here is from S8 slides 2-3 (professor's estimates) unless marked. */
export const PRICE_INDEX = [
  { label: 'Aldi', value: 91.7 },
  { label: 'Walmart', value: 100.0 },
  { label: 'Kroger', value: 114.8 },
  { label: "Trader Joe's", value: 124.6 },
  { label: 'Whole Foods', value: 139.7 },
] // Consumer Reports with Strategic Resource Group, late 2025, published April 2026 [S8 slides 2]

export type Nature = 'Scale / process' | 'Structure (assortment & format)' | 'Refusal'
export type Breadth = 'Travels with breadth' | 'At risk from breadth' | 'Depends on staying narrow'

export interface Bucket {
  id: string
  label: string
  points: number // professor's estimate, index points out of a conventional 100
  link: string // Porter value-chain link it lives in (site mapping)
  nature: Nature // site's model classification using the case's Exhibit 3 logic
  breadth: Breadth
  why: string
}

export const BUCKETS: Bucket[] = [
  { id: 'assort', label: 'Assortment', points: 2.5, link: 'Procurement / operations', nature: 'Structure (assortment & format)', breadth: 'Depends on staying narrow', why: '1,400–2,000 SKUs vs. 30,000–40,000: fewer items to buy, stock, track and price. Survives a bigger footprint, not a wider range (the “second size in 20 categories” proposal attacks it directly).' },
  { id: 'pl', label: 'Private label', points: 5, link: 'Procurement', nature: 'Scale / process', breadth: 'Travels with breadth', why: '~90% private label removes the manufacturer’s marketing margin and gives Aldi the spec; volume per SKU grows with every store added — breadth feeds it (case: “What Will Scale”).' },
  { id: 'logi', label: 'Logistics', points: 1.5, link: 'Inbound logistics', nature: 'Scale / process', breadth: 'Travels with breadth', why: 'Cut-case pallets direct to floor, dense DCs, fast turns — a process advantage replicated in every new store.' },
  { id: 're', label: 'Real estate', points: 1.5, link: 'Firm infrastructure / operations', nature: 'Structure (assortment & format)', breadth: 'At risk from breadth', why: '~12,000 sq ft vs. 40,000–60,000. Converting Winn-Dixie supermarkets pushes the format toward larger boxes.' },
  { id: 'labor', label: 'Store labor', points: 5, link: 'Operations / HR', nature: 'Scale / process', breadth: 'Depends on staying narrow', why: '3–5 cross-trained staff per shift, highest labor productivity in food retail — but the productivity rests on the narrow assortment (a second size slows checkout).' },
  { id: 'repl', label: 'Replenishment', points: 0.75, link: 'Inbound logistics / operations', nature: 'Scale / process', breadth: 'Travels with breadth', why: 'Products sold from the shipping carton; a forklift places a pallet in seconds.' },
  { id: 'front', label: 'Front end', points: 0.75, link: 'Operations', nature: 'Scale / process', breadth: 'Depends on staying narrow', why: 'Multi-face barcodes make checkout an “industry legend”; more SKUs and sizes slow it.' },
  { id: 'shrink', label: 'Shrink', points: 1.25, link: 'Operations', nature: 'Scale / process', breadth: 'Travels with breadth', why: 'Fewer, faster-turning items mean less spoilage and loss (site inference from the case’s fast-turns point).' },
  { id: 'mkt', label: 'Marketing', points: 0.75, link: 'Marketing & sales', nature: 'Refusal', breadth: 'At risk from breadth', why: 'Weekly flyer and social media only, no promotion cycles or loyalty analytics — a refusal that a digital storefront with personalization starts to reverse.' },
  { id: 'ovh', label: 'Overhead', points: 0.75, link: 'Firm infrastructure', nature: 'Structure (assortment & format)', breadth: 'Travels with breadth', why: 'Thin HQ, private family ownership, little debt, no quarterly-earnings pressure.' },
  { id: 'cust', label: 'Customer-borne', points: 0.45, link: 'Service / outbound', nature: 'Refusal', breadth: 'At risk from breadth', why: 'Customers bag groceries, return carts for a quarter, no service departments. Delivery through Instacart/DoorDash/Uber Eats re-adds what the customer used to do.' },
]

export const OBSERVED_GAP = 20.1 // 100 − 79.9 (Aldi at 79.9 with Kroger at 100) [S8 slides 3]

export const sumPoints = (xs: { points: number }[]) => Math.round(xs.reduce((a, b) => a + b.points, 0) * 100) / 100

/** Aldi indexed to Kroger = 100, from the Consumer Reports anchor. */
export const aldiVsKroger = () => Math.round((PRICE_INDEX[0].value / PRICE_INDEX[2].value) * 1000) / 10

/** Broad-scope moves from the case, with ILLUSTRATIVE erosion assumptions (fraction of a bucket lost). Student-adjustable. */
export const BREADTH_MOVES = [
  { id: 'delivery', label: 'Delivery via Instacart / DoorDash / Uber Eats', hits: { cust: 0.6, mkt: 0.2 } },
  { id: 'digital', label: '2026 digital storefront with personalization', hits: { mkt: 0.5, ovh: 0.3 } },
  { id: 'boxes', label: 'Converting full-size Winn-Dixie supermarkets', hits: { re: 0.5, labor: 0.15 } },
  { id: 'sizes', label: 'Second size in 20 high-velocity categories', hits: { assort: 0.3, labor: 0.1, front: 0.3 } },
] as const

export function remainingGap(active: Record<string, boolean>, scale = 1) {
  const loss: Record<string, number> = {}
  for (const m of BREADTH_MOVES) if (active[m.id]) for (const [k, f] of Object.entries(m.hits)) loss[k] = Math.min(1, (loss[k] ?? 0) + f * scale)
  return BUCKETS.map((b) => ({ ...b, points: Math.round(b.points * (1 - (loss[b.id] ?? 0)) * 100) / 100 }))
}
