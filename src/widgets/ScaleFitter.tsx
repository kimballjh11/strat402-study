import { useMemo, useState } from 'react'
import { Cite } from '../components/Cite'
import { Frame, fnPath, scales, shortNum, useWidth, type Axes } from '../components/Plot'
import { Tex } from '../components/Rich'
import { powerFit } from '../lib/econ'
import { num, pct } from '../lib/format'

const R = [83209, 107000, 124263, 141788, 166190, 202618, 390000, 435000, 472809, 492913, 520201]
const TC = [5441.216, 5344.601, 5308.445, 6016.505, 6607.969, 6959.884, 11437.542, 9866.034, 9366, 11618, 9804]
const NF = { s: [23410, 23938, 25101, 27146, 29174, 29807, 31092, 33420, 35674, 36224, 37219, 39114, 41397, 42300, 43181, 44738, 46967, 47129], c: [434181, 445306, 460321, 476051, 507299, 519775, 534602, 566932, 597352, 610950, 626296, 660616, 672080, 686118, 719749, 726892, 748488, 793912] }
const RB = { r: [196226, 179231, 176367, 187937, 197543, 186684, 199480, 192035, 199972, 169322, 172172, 181279, 173047, 146047, 132645, 135815, 137701, 123593], c: [394124, 361248, 358335, 408313, 415746, 371325, 400728, 359343, 412737, 361969, 352372, 348074, 381495, 340046, 304990, 336030, 334854, 306975] }

const SETS = {
  guest: { name: 'Guest-Tek CPRPD (2004–2007)', x: R, y: R.map((r, i) => (TC[i] * 1000) / ((r * 365) / 4)), xl: 'Hotel rooms', yl: 'Cost per room per day ($)', src: 'S06 workbook, Solution!G37:G47' },
  redbox: { name: 'Redbox cost per rental (2012–2016)', x: RB.r, y: RB.r.map((r, i) => RB.c[i] / r), xl: 'Rentals (000s)', yl: 'Cost per rental ($)', src: 'your Cost Advantage, Part 1; S07 slides p.6' },
  netflix: { name: 'Netflix CPSPM (2012–2016)', x: NF.s, y: NF.s.map((s, i) => NF.c[i] / s / 3), xl: 'Subscribers (000s)', yl: 'Cost per subscriber per month ($)', src: 'your Cost Advantage, Part 1 step 2' },
}
type K = keyof typeof SETS

/** Points in → Excel-style power trendline out → exponent read as “% cost change per doubling.” */
export default function ScaleFitter() {
  const [k, setK] = useState<K>('guest')
  const [drop, setDrop] = useState<Set<number>>(new Set())
  const [boxRef, W] = useWidth()
  const d = SETS[k]
  const keep = d.x.map((_, i) => i).filter((i) => !drop.has(i))
  const fit = useMemo(() => powerFit(keep.map((i) => d.x[i]), keep.map((i) => d.y[i])), [k, drop]) // eslint-disable-line react-hooks/exhaustive-deps
  const slope = 2 ** fit.B
  const xmin = Math.min(...d.x) * 0.85
  const xmax = Math.max(...d.x) * 1.08
  const ax: Axes = { w: W, h: Math.max(250, Math.round(W * 0.52)), pad: { l: 56, r: 12, t: 12, b: 36 }, x: [xmin, xmax], y: [0, Math.max(...d.y) * 1.15] }
  const { sx, sy } = scales(ax)
  return (
    <div className="space-y-3" data-testid="scale-fitter">
      <div className="flex flex-wrap gap-2 items-center">
        {(Object.keys(SETS) as K[]).map((key) => (
          <button key={key} type="button" className={`btn btn-sm ${k === key ? 'btn-primary' : ''}`} aria-pressed={k === key} onClick={() => (setK(key), setDrop(new Set()))}>
            {SETS[key].name}
          </button>
        ))}
        <Cite tag={d.src} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm" aria-live="polite">
        <div className="rounded-xl border line px-3 py-2 col-span-2">
          <div className="text-xs muted">Power trendline</div>
          <div className="font-semibold">
            <Tex>{`y = ${fit.A.toPrecision(5)}\\,x^{${fit.B.toFixed(4)}}`}</Tex>
          </div>
        </div>
        <div className="rounded-xl border line px-3 py-2">
          <div className="text-xs muted">Slope 2^b</div>
          <div className="font-bold tabular-nums">{pct(slope, 1)} curve</div>
        </div>
        <div className="rounded-xl border line px-3 py-2">
          <div className="text-xs muted">Each doubling of scale</div>
          <div className="font-bold tabular-nums">{pct(slope - 1, 1)} unit cost</div>
        </div>
      </div>
      <div ref={boxRef} className="max-w-[680px]">
        <Frame ax={ax} title={`${d.name}: power fit y = ${fit.A.toPrecision(4)} x^${fit.B.toFixed(3)}`} xLabel={d.xl} yLabel={d.yl} fmtX={shortNum} fmtY={(v) => '$' + num(v, 2)}>
          <path d={fnPath((x) => fit.A * x ** fit.B, xmin, xmax, sx, sy, 120)} stroke="var(--color-g-atc)" strokeWidth={2.5} strokeDasharray="6 4" fill="none" />
          {d.x.map((x, i) => (
            <circle
              key={i}
              cx={sx(x)}
              cy={sy(d.y[i])}
              r={7}
              fill={drop.has(i) ? 'transparent' : 'var(--color-g-demand)'}
              stroke="var(--color-g-demand)"
              strokeWidth={2}
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              aria-label={`Point ${i + 1}: ${num(x, 0)}, ${num(d.y[i], 3)} — ${drop.has(i) ? 'excluded' : 'included'}. Toggle.`}
              onClick={() => setDrop((s) => (s.has(i) ? new Set([...s].filter((v) => v !== i)) : new Set([...s, i])))}
              onKeyDown={(e) => e.key === 'Enter' && setDrop((s) => (s.has(i) ? new Set([...s].filter((v) => v !== i)) : new Set([...s, i])))}
            />
          ))}
        </Frame>
      </div>
      <p className="text-xs muted">
        Click a point to drop it from the fit and see how sensitive the exponent is. Reading the exponent: cost multiplier per doubling = 2<sup>b</sup>. Guest-Tek’s b ≈ −0.5705 → 67% curve (−33% per doubling). Redbox −0.476 → −28%. Netflix −0.182 → −12%: flatter, because it is already far out on its curve. <Cite tag="S06 workbook, Solution!E83" />
      </p>
    </div>
  )
}
