import type { ReactNode } from 'react'
import { num } from '../lib/format'

/** Horizontal bar chart with a visually-hidden data table for screen readers. */
export function HBar({ title, rows, unit = '', max, digits = 1, highlight, note }: {
  title: string
  rows: { label: string; value: number }[]
  unit?: string
  max?: number
  digits?: number
  highlight?: string
  note?: ReactNode
}) {
  const m = max ?? Math.max(...rows.map((r) => Math.abs(r.value)), 1)
  return (
    <figure className="card p-4 space-y-2 relative">
      <figcaption className="font-semibold">{title}</figcaption>
      <div className="space-y-1.5" aria-hidden>
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[7.5rem_1fr_auto] sm:grid-cols-[10rem_1fr_auto] items-center gap-2 text-sm">
            <span className="truncate" title={r.label}>
              {r.label}
            </span>
            <span className="h-4 rounded" style={{ width: `${(100 * Math.abs(r.value)) / m}%`, background: r.label === highlight ? 'var(--accent)' : 'var(--ink-2)', opacity: r.label === highlight ? 1 : 0.55 }} />
            <span className="tabular-nums">
              {num(r.value, digits)}
              {unit}
            </span>
          </div>
        ))}
      </div>
      <div className="sr-only">
      <table>
        <caption>{title}</caption>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              <td>
                {num(r.value, digits)}
                {unit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {note && <div className="text-xs muted">{note}</div>}
    </figure>
  )
}

export interface WStep { label: string; value: number; compare?: number }

/** Waterfall from a starting total down by steps; optional second series (e.g. your estimate vs. the professor's). */
export function Waterfall({ start, startLabel, endLabel, steps, observed, title, seriesA = 'Estimate', seriesB, floor = 0 }: {
  floor?: number
  start: number
  startLabel: string
  endLabel: string
  steps: WStep[]
  observed?: number
  title: string
  seriesA?: string
  seriesB?: string
}) {
  const W = 640, H = 300, pad = { l: 34, r: 8, t: 18, b: 92 }
  const n = steps.length + 2
  const bw = (W - pad.l - pad.r) / n
  const y = (v: number) => pad.t + (H - pad.t - pad.b) * (1 - (Math.max(v, floor) - floor) / (start - floor))
  let level = start
  const bars = steps.map((s) => {
    const top = level
    level -= s.value
    return { ...s, top, bottom: level }
  })
  let lvlB = start
  const barsB = seriesB ? steps.map((s) => { const top = lvlB; lvlB -= s.compare ?? 0; return { top, bottom: lvlB } }) : []
  return (
    <figure className="card p-3 space-y-2">
      <figcaption className="font-semibold">{title}</figcaption>
      <div className="scroll-x">
        <svg viewBox={`0 0 ${W} ${H}`} className="graph w-full min-w-[520px]" role="img" aria-label={`${title}. ${startLabel} ${start}; ${steps.map((s) => `${s.label} minus ${num(s.value, 2)}`).join('; ')}; ${endLabel} ${num(level, 2)}.`}>
          {[0, 0.25, 0.5, 0.75, 1].map((f) => {
            const v = floor + (start - floor) * f
            return (
              <g key={f}>
                <line className="grid" x1={pad.l} x2={W - pad.r} y1={y(v)} y2={y(v)} />
                <text x={pad.l - 4} y={y(v) + 4} textAnchor="end">
                  {num(v, 1)}
                </text>
              </g>
            )
          })}
          <rect x={pad.l + 4} y={y(start)} width={bw - 8} height={y(0) - y(start)} fill="var(--accent)" opacity={0.85} />
          {bars.map((b, i) => {
            const x = pad.l + bw * (i + 1)
            return (
              <g key={b.label}>
                <rect x={x + 4} y={y(b.top)} width={seriesB ? (bw - 8) / 2 : bw - 8} height={Math.max(1, y(b.bottom) - y(b.top))} fill="#b45309" />
                {seriesB && <rect x={x + 4 + (bw - 8) / 2} y={y(barsB[i].top)} width={(bw - 8) / 2} height={Math.max(1, y(barsB[i].bottom) - y(barsB[i].top))} fill="#2563eb" opacity={0.8} />}
                <text x={x + bw / 2} y={y(b.bottom) + 12} textAnchor="middle" style={{ fontSize: 9 }}>
                  −{num(b.value, 2)}
                </text>
                <text transform={`translate(${x + bw / 2},${H - pad.b + 8}) rotate(50)`} style={{ fontSize: 10 }}>
                  {b.label}
                </text>
              </g>
            )
          })}
          <rect x={pad.l + bw * (n - 1) + 4} y={y(level)} width={bw - 8} height={y(0) - y(level)} fill="var(--ok)" />
          <text x={pad.l + bw * (n - 1) + bw / 2} y={y(level) - 4} textAnchor="middle">
            {num(level, 1)}
          </text>
          <text transform={`translate(${pad.l + bw / 2},${H - pad.b + 8}) rotate(50)`} style={{ fontSize: 10 }}>
            {startLabel}
          </text>
          <text transform={`translate(${pad.l + bw * (n - 1) + bw / 2},${H - pad.b + 8}) rotate(50)`} style={{ fontSize: 10 }}>
            {endLabel}
          </text>
          {observed !== undefined && (
            <g>
              <line x1={pad.l} x2={W - pad.r} y1={y(observed)} y2={y(observed)} stroke="var(--ink)" strokeDasharray="5 4" />
              <text x={pad.l + bw + 4} y={y(observed) + 14} textAnchor="start" style={{ fontWeight: 700 }}>
                observed {num(observed, 1)}
              </text>
            </g>
          )}
        </svg>
      </div>
      <div className="flex flex-wrap gap-3 text-xs muted">
        <span>
          <span aria-hidden className="inline-block w-3 h-3 align-middle mr-1" style={{ background: '#b45309' }} />
          {seriesA} (orange, left)
        </span>
        {seriesB && (
          <span>
            <span aria-hidden className="inline-block w-3 h-3 align-middle mr-1" style={{ background: '#2563eb' }} />
            {seriesB} (blue, right)
          </span>
        )}
        {observed !== undefined && <span>dashed line = observed price level{floor > 0 ? ` · axis starts at ${floor}` : ''}</span>}
      </div>
    </figure>
  )
}

export function DataTable({ head, rows, caption }: { head: string[]; rows: (string | number | ReactNode)[][]; caption?: ReactNode }) {
  return (
    <div className="scroll-x">
      <table className="data-table w-full">
        {caption && <caption className="text-left text-sm font-semibold mb-1">{caption}</caption>}
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (j === 0 ? <th key={j} scope="row">{c}</th> : <td key={j}>{c}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
