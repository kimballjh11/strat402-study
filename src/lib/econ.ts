/** Pure economics functions. Golden tests check these against the professor's numbers. */

/**
 * C4 = sum of the four largest NAMED firms' shares. An aggregated "Other / remaining share" bucket is
 * NOT a firm for C4 (professor's convention: telecom C4 = 94% even though "other" = 6% > T-Mobile's 3%;
 * Allegiant workbook C4 = SUM of the first four listed airlines, excluding "Other").
 * The "remaining share as one firm" assumption applies to HHI only.
 */
export function c4(namedShares: number[]) {
  return [...namedShares].sort((a, b) => b - a).slice(0, 4).reduce((a, b) => a + b, 0)
}

/** HHI = 10,000 × Σ w² with shares given in PERCENT (42 = 42%). */
export function hhi(sharesPct: number[]) {
  return sharesPct.reduce((a, s) => a + (s / 100) ** 2, 0) * 10000
}

/** Algebraic (two-point) elasticity using old values as the base. */
export function arcElasticity(q0: number, q1: number, p0: number, p1: number) {
  return (q1 - q0) / q0 / ((p1 - p0) / p0)
}

/** Point elasticity: slope × (x / q). */
export function pointElasticity(slope: number, x: number, q: number) {
  return (slope * x) / q
}

/** Linear demand Q = a − bP. */
export const linearQ = (a: number, b: number, p: number) => a - b * p
export const linearOpe = (a: number, b: number, p: number) => (-b * p) / (a - b * p)
export const revMaxPriceLinear = (a: number, b: number) => a / (2 * b)

/** Fit y = A·x^B by OLS on logs (Excel power trendline). */
export function powerFit(x: number[], y: number[]) {
  const lx = x.map(Math.log)
  const ly = y.map(Math.log)
  const { b, a } = simpleOls(lx, ly)
  return { A: Math.exp(a), B: b }
}

export function simpleOls(x: number[], y: number[]) {
  const n = x.length
  const mx = x.reduce((s, v) => s + v, 0) / n
  const my = y.reduce((s, v) => s + v, 0) / n
  let sxy = 0
  let sxx = 0
  for (let i = 0; i < n; i++) {
    sxy += (x[i] - mx) * (y[i] - my)
    sxx += (x[i] - mx) ** 2
  }
  const b = sxy / sxx
  return { a: my - b * mx, b }
}

/** Solve A·x = b (Gaussian elimination with partial pivoting). */
export function solve(A: number[][], b: number[]) {
  const n = b.length
  const M = A.map((r, i) => [...r, b[i]])
  for (let c = 0; c < n; c++) {
    let p = c
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r
    ;[M[c], M[p]] = [M[p], M[c]]
    for (let r = 0; r < n; r++) {
      if (r === c) continue
      const f = M[r][c] / M[c][c]
      for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k]
    }
  }
  return M.map((r, i) => r[n] / r[i])
}

export function invert(A: number[][]) {
  const n = A.length
  return A.map((_, j) => solve(A, A.map((__, i) => (i === j ? 1 : 0)))).reduce<number[][]>(
    (acc, col, j) => {
      col.forEach((v, i) => (acc[i][j] = v))
      return acc
    },
    A.map(() => Array(n).fill(0)),
  )
}

/** Regularized incomplete beta via continued fraction (for t-distribution p-values). */
function betacf(a: number, b: number, x: number) {
  const MAXIT = 200
  const EPS = 3e-14
  const qab = a + b
  const qap = a + 1
  const qam = a - 1
  let c = 1
  let d = 1 - (qab * x) / qap
  if (Math.abs(d) < 1e-300) d = 1e-300
  d = 1 / d
  let h = d
  for (let m = 1; m <= MAXIT; m++) {
    const m2 = 2 * m
    let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2))
    d = 1 + aa * d
    if (Math.abs(d) < 1e-300) d = 1e-300
    c = 1 + aa / c
    if (Math.abs(c) < 1e-300) c = 1e-300
    d = 1 / d
    h *= d * c
    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2))
    d = 1 + aa * d
    if (Math.abs(d) < 1e-300) d = 1e-300
    c = 1 + aa / c
    if (Math.abs(c) < 1e-300) c = 1e-300
    d = 1 / d
    const del = d * c
    h *= del
    if (Math.abs(del - 1) < EPS) break
  }
  return h
}
function lgamma(x: number): number {
  const g = 7
  const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7]
  if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x)
  x -= 1
  let a = c[0]
  const t = x + g + 0.5
  for (let i = 1; i < g + 2; i++) a += c[i] / (x + i)
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a)
}
function ibeta(a: number, b: number, x: number) {
  if (x <= 0) return 0
  if (x >= 1) return 1
  const bt = Math.exp(lgamma(a + b) - lgamma(a) - lgamma(b) + a * Math.log(x) + b * Math.log(1 - x))
  return x < (a + 1) / (a + b + 2) ? (bt * betacf(a, b, x)) / a : 1 - (bt * betacf(b, a, 1 - x)) / b
}
/** Two-tailed p-value for t with df degrees of freedom (matches Excel T.DIST.2T). */
export function tPValue(t: number, df: number) {
  return ibeta(df / 2, 0.5, df / (df + t * t))
}
/** Upper-tail p-value for F (matches Excel Significance F). */
export function fPValue(f: number, d1: number, d2: number) {
  return ibeta(d2 / 2, d1 / 2, d2 / (d2 + d1 * f))
}
/** Two-tailed critical t (bisection), for 95% confidence intervals. */
export function tCrit(df: number, alpha = 0.05) {
  let lo = 0
  let hi = 100
  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2
    if (tPValue(mid, df) > alpha) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}

export interface RegressionOutput {
  n: number
  k: number
  coef: number[] // intercept first
  se: number[]
  t: number[]
  p: number[]
  lower: number[]
  upper: number[]
  r2: number
  adjR2: number
  multipleR: number
  seReg: number
  ssr: number // regression SS
  sse: number // residual SS
  sst: number
  f: number
  sigF: number
}

/** Multiple OLS regression reproducing Excel's Analysis ToolPak SUMMARY OUTPUT. xs: rows of predictors. */
export function ols(y: number[], xs: number[][]): RegressionOutput {
  const n = y.length
  const X = xs.map((r) => [1, ...r])
  const k = X[0].length - 1
  const XtX = X[0].map((_, i) => X[0].map((__, j) => X.reduce((s, r) => s + r[i] * r[j], 0)))
  const Xty = X[0].map((_, i) => X.reduce((s, r, idx) => s + r[i] * y[idx], 0))
  const coef = solve(XtX, Xty)
  const yhat = X.map((r) => r.reduce((s, v, i) => s + v * coef[i], 0))
  const my = y.reduce((s, v) => s + v, 0) / n
  const sse = y.reduce((s, v, i) => s + (v - yhat[i]) ** 2, 0)
  const sst = y.reduce((s, v) => s + (v - my) ** 2, 0)
  const ssr = sst - sse
  const dfRes = n - k - 1
  const mse = sse / dfRes
  const inv = invert(XtX)
  const se = coef.map((_, i) => Math.sqrt(mse * inv[i][i]))
  const t = coef.map((c, i) => c / se[i])
  const p = t.map((tv) => tPValue(Math.abs(tv), dfRes))
  const tc = tCrit(dfRes)
  const r2 = ssr / sst
  const f = ssr / k / mse
  return {
    n,
    k,
    coef,
    se,
    t,
    p,
    lower: coef.map((c, i) => c - tc * se[i]),
    upper: coef.map((c, i) => c + tc * se[i]),
    r2,
    adjR2: 1 - ((1 - r2) * (n - 1)) / dfRes,
    multipleR: Math.sqrt(r2),
    seReg: Math.sqrt(mse),
    ssr,
    sse,
    sst,
    f,
    sigF: fPValue(f, k, dfRes),
  }
}
