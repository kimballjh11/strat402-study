/**
 * Answer parsing and checking.
 * Accepts: 0.25, 25%, $25, 1,631.47, -2, −2 (unicode minus), (2.5) accounting negatives, 1.2e3.
 */
export type NumKind = 'number' | 'percent' | 'money'

export interface ParsedNumber {
  value: number
  hadPercent: boolean
}

export function parseNumber(raw: string): ParsedNumber | null {
  let s = raw.trim().replace(/[−‒–—]/g, '-').replace(/\s+/g, '')
  if (!s) return null
  let neg = false
  if (/^\(.*\)$/.test(s)) {
    neg = true
    s = s.slice(1, -1)
  }
  const hadPercent = s.endsWith('%')
  s = s.replace(/%$/, '').replace(/^\$|^-\$/, (m) => (m === '-$' ? '-' : '')).replace(/\$/g, '')
  s = s.replace(/,(?=\d{3}(\D|$))/g, '')
  if (!/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(s)) return null
  const v = Number(s)
  if (!Number.isFinite(v)) return null
  return { value: neg ? -v : v, hadPercent }
}

export interface NumericSpec {
  answer: number
  kind?: NumKind
  /** Relative tolerance (default 1%). */
  tol?: number
  /** Absolute tolerance floor (default: tiny). */
  abs?: number
}

export function isClose(got: number, want: number, tol = 0.01, abs = 1e-9) {
  return Math.abs(got - want) <= Math.max(Math.abs(want) * tol, abs)
}

/**
 * Percent answers are stored as decimals (0.25). Accept "25%", "25", or "0.25".
 */
export function checkNumeric(input: string, spec: NumericSpec): boolean {
  const p = parseNumber(input)
  if (!p) return false
  const tol = spec.tol ?? 0.01
  const abs = spec.abs ?? 1e-9
  if (spec.kind === 'percent') {
    const candidates = p.hadPercent ? [p.value / 100] : [p.value, p.value / 100]
    return candidates.some((c) => isClose(c, spec.answer, tol, abs))
  }
  return isClose(p.value, spec.answer, tol, abs)
}
