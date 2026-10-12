import { useEffect, useRef, useState, type ReactNode } from 'react'

export interface Axes {
  w: number
  h: number
  pad: { l: number; r: number; t: number; b: number }
  x: [number, number]
  y: [number, number]
}

export function scales(ax: Axes) {
  const iw = ax.w - ax.pad.l - ax.pad.r
  const ih = ax.h - ax.pad.t - ax.pad.b
  const sx = (v: number) => ax.pad.l + ((v - ax.x[0]) / (ax.x[1] - ax.x[0])) * iw
  const sy = (v: number) => ax.pad.t + ih - ((v - ax.y[0]) / (ax.y[1] - ax.y[0])) * ih
  const ix = (px: number) => ax.x[0] + ((px - ax.pad.l) / iw) * (ax.x[1] - ax.x[0])
  const iy = (py: number) => ax.y[0] + ((ax.pad.t + ih - py) / ih) * (ax.y[1] - ax.y[0])
  return { sx, sy, ix, iy, iw, ih }
}

export function niceTicks(min: number, max: number, count = 5) {
  const span = max - min
  const raw = span / count
  const mag = 10 ** Math.floor(Math.log10(raw))
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => span / s <= count + 0.5) ?? 10 * mag
  const out: number[] = []
  for (let v = Math.ceil(min / step) * step; v <= max + 1e-9; v += step) out.push(Number(v.toFixed(10)))
  return out
}

export function shortNum(v: number) {
  const a = Math.abs(v)
  if (a >= 1e6) return (v / 1e6).toLocaleString('en-US', { maximumFractionDigits: 1 }) + 'M'
  if (a >= 1e4) return (v / 1e3).toLocaleString('en-US', { maximumFractionDigits: 1 }) + 'k'
  return v.toLocaleString('en-US', { maximumFractionDigits: 2 })
}

interface FrameProps {
  ax: Axes
  xLabel: string
  yLabel: string
  fmtX?: (v: number) => string
  fmtY?: (v: number) => string
  children: ReactNode
  title: string
  desc?: string
  svgRef?: React.Ref<SVGSVGElement>
  onPointerDown?: React.PointerEventHandler<SVGSVGElement>
  onPointerMove?: React.PointerEventHandler<SVGSVGElement>
  onPointerUp?: React.PointerEventHandler<SVGSVGElement>
}

/** Responsive SVG chart frame with grid, axes, ticks and labels. */
export function Frame({ ax, xLabel, yLabel, fmtX = shortNum, fmtY = shortNum, children, title, desc, svgRef, ...ev }: FrameProps) {
  const { sx, sy } = scales(ax)
  const xt = niceTicks(ax.x[0], ax.x[1], 5)
  const yt = niceTicks(ax.y[0], ax.y[1], 4)
  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${ax.w} ${ax.h}`}
      className="graph w-full h-auto select-none"
      role="group"
      aria-label={title}
      style={{ touchAction: 'none' }}
      {...ev}
    >
      <title>{title}</title>
      {desc && <desc>{desc}</desc>}
      {xt.map((v) => (
        <g key={'x' + v}>
          <line className="grid" x1={sx(v)} x2={sx(v)} y1={sy(ax.y[0])} y2={sy(ax.y[1])} />
          <text x={sx(v)} y={sy(ax.y[0]) + 14} textAnchor="middle">
            {fmtX(v)}
          </text>
        </g>
      ))}
      {yt.map((v) => (
        <g key={'y' + v}>
          <line className="grid" x1={sx(ax.x[0])} x2={sx(ax.x[1])} y1={sy(v)} y2={sy(v)} />
          <text x={sx(ax.x[0]) - 6} y={sy(v) + 4} textAnchor="end">
            {fmtY(v)}
          </text>
        </g>
      ))}
      <line className="axis" x1={sx(ax.x[0])} x2={sx(ax.x[1])} y1={sy(ax.y[0])} y2={sy(ax.y[0])} />
      <line className="axis" x1={sx(ax.x[0])} x2={sx(ax.x[0])} y1={sy(ax.y[0])} y2={sy(ax.y[1])} />
      <text x={(sx(ax.x[0]) + sx(ax.x[1])) / 2} y={ax.h - 4} textAnchor="middle" style={{ fontWeight: 600 }}>
        {xLabel}
      </text>
      <text transform={`translate(12 ${(sy(ax.y[0]) + sy(ax.y[1])) / 2}) rotate(-90)`} textAnchor="middle" style={{ fontWeight: 600 }}>
        {yLabel}
      </text>
      {children}
    </svg>
  )
}

/** SVG path from a function over [x0, x1]. */
export function fnPath(f: (x: number) => number, x0: number, x1: number, sx: (v: number) => number, sy: (v: number) => number, n = 80) {
  let d = ''
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n
    const y = f(x)
    if (!Number.isFinite(y)) continue
    d += (d ? 'L' : 'M') + sx(x).toFixed(2) + ' ' + sy(y).toFixed(2)
  }
  return d
}

export function svgPoint(svg: SVGSVGElement, clientX: number, clientY: number) {
  const pt = svg.createSVGPoint()
  pt.x = clientX
  pt.y = clientY
  const m = svg.getScreenCTM()
  if (!m) return { x: 0, y: 0 }
  const p = pt.matrixTransform(m.inverse())
  return { x: p.x, y: p.y }
}

/** Track a container's width so charts render at true pixel size (readable text on phones). */
export function useWidth(min = 300, max = 680) {
  const [w, setW] = useState(560)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setW(Math.max(min, Math.min(max, Math.floor(e.contentRect.width)))))
    ro.observe(el)
    return () => ro.disconnect()
  }, [min, max])
  return [ref, w] as const
}
