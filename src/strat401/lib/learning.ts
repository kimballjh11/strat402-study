/** Learning/experience-curve and scale arithmetic from the Economies of Scale Brief, Appendix A. */
export const exponent = (s: number) => -Math.log2(s) // b = −log₂ s
export const unitCost = (first: number, x: number, s: number) => first * Math.pow(x, -exponent(s)) // Y = a·X^−b
export const afterDoublings = (s: number, d: number) => Math.pow(s, d) // cost ratio after d doublings
export const doublings = (x1: number, x2: number) => Math.log2(x2 / x1)
export const fitRate = (y1: number, y2: number, x1: number, x2: number) => Math.pow(y2 / y1, 1 / doublings(x1, x2)) // s = (Y₂/Y₁)^(1/d)
export const doublingsToClose = (follower: number, leader: number, s: number) => Math.log(follower / leader) / -Math.log(s)
export const volumeMultiple = (d: number) => Math.pow(2, d)
/** Six-tenths rule: C₂/C₁ = (Q₂/Q₁)^k */
export const plantCost = (c1: number, ratio: number, k = 0.6) => c1 * Math.pow(ratio, k)
export const unitCapitalRatio = (ratio: number, k = 0.6) => Math.pow(ratio, k - 1)
/** Square-root law: pooling n independent locations leaves safety stock at 1/√n. */
export const pooledSafetyStock = (n: number) => 1 / Math.sqrt(n)
/** Streaming: average content cost per subscriber = F / N. */
export const contentPerSub = (fixed: number, subs: number) => fixed / subs
export const breakevenSubs = (fixed: number, arpuMonthly: number) => fixed / (arpuMonthly * 12)
/** Brooks: n(n−1)/2 communication channels. */
export const channels = (n: number) => (n * (n - 1)) / 2
