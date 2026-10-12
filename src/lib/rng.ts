/** Seeded PRNG (mulberry32) so every generated problem is reproducible from its seed. */
export function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export class Rng {
  private next: () => number
  constructor(public seed: number) {
    this.next = mulberry32(seed)
  }
  float(min = 0, max = 1) {
    return min + (max - min) * this.next()
  }
  /** Integer in [min, max] inclusive. */
  int(min: number, max: number) {
    return Math.floor(this.float(min, max + 1))
  }
  /** Integer in [min, max] that is a multiple of step. */
  step(min: number, max: number, step: number) {
    return min + step * this.int(0, Math.floor((max - min) / step))
  }
  pick<T>(xs: readonly T[]): T {
    return xs[Math.floor(this.next() * xs.length)]
  }
  bool(p = 0.5) {
    return this.next() < p
  }
  shuffle<T>(xs: readonly T[]): T[] {
    const a = [...xs]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }
}

export const newSeed = () => Math.floor(Math.random() * 2 ** 31)
