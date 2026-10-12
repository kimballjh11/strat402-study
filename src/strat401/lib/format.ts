const MINUS = '−'

export function num(x: number, digits = 2): string {
  if (!Number.isFinite(x)) return '—'
  const s = Math.abs(x).toLocaleString('en-US', { maximumFractionDigits: digits })
  return (x < 0 && Number(s.replace(/,/g, '')) !== 0 ? MINUS : '') + s
}
export const money = (x: number, digits = 0) => (x < 0 ? MINUS : '') + '$' + num(Math.abs(x), digits)
export const pct = (x: number, digits = 1) => num(x * 100, digits) + '%'
export const round = (x: number, d = 2) => Math.round(x * 10 ** d) / 10 ** d

export const isoDay = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
export function parseIsoDay(s: string) {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}
export function daysBetween(a: Date, b: Date) {
  const da = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  const db = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
  return Math.round((db - da) / 86400000)
}
/** Stable small hash for seeding option shuffles. */
export function hash(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}
export function shuffled<T>(xs: T[], seed: number): T[] {
  const a = xs.slice()
  let t = seed || 1
  for (let i = a.length - 1; i > 0; i--) {
    t = (Math.imul(t ^ (t >>> 15), 2246822507) + 0x6d2b79f5) >>> 0
    const j = t % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
