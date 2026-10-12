/** Value-stick and consumer-surplus arithmetic. */
export interface Stick { wtp: number; price: number; cost: number; supplier: number }
export const split = (s: Stick) => ({
  valueCreated: s.wtp - s.supplier,
  customerSurplus: s.wtp - s.price,
  firmMargin: s.price - s.cost,
  supplierSurplus: s.cost - s.supplier,
})
/** Differentiation pays only if it adds more WTP than cost. */
export const differentiationPays = (dWtp: number, dCost: number) => dWtp > dCost
/** Linear demand Q = a − bP: choke price a/b; consumer surplus = ½ (choke − P) Q. */
export function consumerSurplus(a: number, b: number, p: number) {
  const q = Math.max(0, a - b * p)
  const choke = a / b
  return { q, choke, cs: 0.5 * (choke - p) * q }
}
