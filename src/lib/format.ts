/** Display helpers. Numbers in worked steps are always produced by code through these. */
const MINUS = '−'

export function num(x: number, digits = 2, opts: { trim?: boolean } = {}): string {
  if (!Number.isFinite(x)) return x > 0 ? '∞' : `${MINUS}∞`
  const fixed = Math.abs(x).toLocaleString('en-US', {
    minimumFractionDigits: opts.trim === false ? digits : 0,
    maximumFractionDigits: digits,
  })
  const isZero = Number(fixed.replace(/,/g, '')) === 0
  return (x < 0 && !isZero ? MINUS : '') + fixed
}

/** Number for use inside KaTeX (uses {,} so commas don't add space). */
export function tex(x: number, digits = 2): string {
  return num(x, digits).replace(/,/g, '{,}').replace(MINUS, '-')
}

export function money(x: number, digits = 2): string {
  const s = num(Math.abs(x), digits, { trim: digits === 0 })
  return (x < 0 ? MINUS : '') + '$' + s
}

/** Money with exactly 2 decimals. */
export function dollars(x: number): string {
  const s = Math.abs(x).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return (x < 0 ? MINUS : '') + '$' + s
}

export function pct(x: number, digits = 1): string {
  return num(x * 100, digits) + '%'
}

export function signed(x: number, digits = 2): string {
  return (x > 0 ? '+' : '') + num(x, digits)
}

export const round = (x: number, d = 2) => Math.round(x * 10 ** d) / 10 ** d

export function daysBetween(a: Date, b: Date) {
  const da = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  const db = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
  return Math.round((db - da) / 86400000)
}

export const isoDay = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export function parseIsoDay(s: string) {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}
