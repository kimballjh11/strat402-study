import { useState } from 'react'
import { Cite, SiteBadge } from '../components/Cite'

interface Canvas { factors: string[]; offers: { name: string; scores: number[] }[]; src: string; note: string }
export const CANVASES: Record<string, Canvas> = {
  cirque: {
    factors: ['Star performers', 'Animal shows', 'Multiple arenas', 'Aisle concessions', 'Humor & thrills', 'Artistic music & dance', 'Unique venue', 'Refined theme'],
    offers: [
      { name: 'Traditional circus', scores: [8, 9, 8, 8, 8, 2, 3, 2] },
      { name: 'Cirque du Soleil', scores: [3, 0, 0, 0, 4, 9, 9, 9] },
    ],
    src: 'S9 slides 7',
    note: 'Scores read approximately from the slide’s chart (0–10).',
  },
  chipotle: {
    factors: ['Sourcing standards', 'Visible fresh prep', 'Low price', 'Free extras (queso/guac)', 'Menu breadth', 'Digital & speed', 'Generous portions'],
    offers: [
      { name: 'Chipotle', scores: [9, 9, 3, 1, 3, 8, 7] },
      { name: 'Qdoba', scores: [4, 6, 5, 9, 6, 5, 6] },
      { name: 'Cafe Rio', scores: [4, 8, 5, 4, 8, 3, 7] },
    ],
    src: 'Chipotle Ex.5',
    note: 'A site construction from the case’s qualitative comparison — scores are judgments, not data.',
  },
}

/** Build and compare value curves; the four actions fall out of the comparison. */
export function StrategyCanvas() {
  const [key, setKey] = useState<'cirque' | 'chipotle'>('chipotle')
  const [c, setC] = useState<Canvas>(CANVASES.chipotle)
  const load = (k: 'cirque' | 'chipotle') => (setKey(k), setC(CANVASES[k]))
  const W = 600, H = 230, L = 30, B = 70
  const x = (i: number) => L + ((W - L - 20) * i) / Math.max(1, c.factors.length - 1)
  const y = (v: number) => 10 + (H - B - 10) * (1 - v / 10)
  const colors = ['#6b7280', '#0f5b5f', '#b45309', '#2563eb']
  const base = c.offers[0], focus = c.offers[1]
  const acts = c.factors.map((f, i) => {
    const d = focus.scores[i] - base.scores[i]
    return { f, act: focus.scores[i] <= 1 && base.scores[i] >= 4 ? 'Eliminate' : d <= -3 ? 'Reduce' : d >= 3 && base.scores[i] <= 2 ? 'Create' : d >= 3 ? 'Raise' : '—' }
  })
  return (
    <div className="space-y-3" data-testid="strategy-canvas">
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn btn-sm" aria-pressed={key === 'chipotle'} onClick={() => load('chipotle')}>Fast-casual Mexican</button>
        <button type="button" className="btn btn-sm" aria-pressed={key === 'cirque'} onClick={() => load('cirque')}>Cirque du Soleil vs. circus</button>
      </div>
      <figure className="card p-3">
        <figcaption className="text-sm font-semibold">
          Strategy canvas <Cite tag={c.src} /> {key === 'chipotle' && <SiteBadge>Site construction</SiteBadge>}
        </figcaption>
        <div className="scroll-x">
          <svg viewBox={`0 0 ${W} ${H}`} className="graph w-full min-w-[480px]" role="img" aria-label={`Value curves: ${c.offers.map((o) => `${o.name}: ${o.scores.join(', ')}`).join('; ')} across ${c.factors.join(', ')}`}>
            {[0, 5, 10].map((v) => (
              <g key={v}>
                <line className="grid" x1={L} x2={W - 10} y1={y(v)} y2={y(v)} />
                <text x={L - 4} y={y(v) + 4} textAnchor="end">{v}</text>
              </g>
            ))}
            {c.offers.map((o, k) => (
              <g key={o.name}>
                <polyline points={o.scores.map((s, i) => `${x(i)},${y(s)}`).join(' ')} fill="none" stroke={colors[k]} strokeWidth={2.5} strokeDasharray={k === 0 ? '6 4' : undefined} />
                {o.scores.map((s, i) => <circle key={i} cx={x(i)} cy={y(s)} r={3.5} fill={colors[k]} />)}
              </g>
            ))}
            {c.factors.map((f, i) => (
              <text key={f} transform={`translate(${x(i)},${H - B + 12}) rotate(35)`} style={{ fontSize: 10 }}>
                {f}
              </text>
            ))}
          </svg>
        </div>
        <div className="flex flex-wrap gap-3 text-xs">
          {c.offers.map((o, k) => (
            <span key={o.name}>
              <span aria-hidden className="inline-block w-4 h-0.5 align-middle mr-1" style={{ background: colors[k] }} />
              {o.name}{k === 0 ? ' (dashed)' : ''}
            </span>
          ))}
        </div>
        <p className="text-xs muted">{c.note}</p>
      </figure>
      <div className="scroll-x">
        <table className="data-table w-full min-w-[520px]">
          <thead>
            <tr>
              <th scope="col">Factor</th>
              {c.offers.map((o) => <th key={o.name} scope="col">{o.name}</th>)}
              <th scope="col">Four actions ({focus.name} vs. {base.name})</th>
            </tr>
          </thead>
          <tbody>
            {c.factors.map((f, i) => (
              <tr key={f}>
                <th scope="row">{f}</th>
                {c.offers.map((o, k) => (
                  <td key={o.name}>
                    <label>
                      <span className="sr-only">{`${o.name} ${f}`}</span>
                      <input type="number" min={0} max={10} value={o.scores[i]} onChange={(e) => setC({ ...c, offers: c.offers.map((x2, kk) => (kk === k ? { ...x2, scores: x2.scores.map((s, ii) => (ii === i ? Math.max(0, Math.min(10, Number(e.target.value) || 0)) : s)) } : x2)) })} style={{ width: '4.2rem' }} />
                    </label>
                  </td>
                ))}
                <td>{acts[i].act}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm">
        A clear strategy has <strong>peaks and valleys</strong>, not a flat line; blue-ocean players <strong>diverge</strong> by raising/creating some factors and eliminating/reducing others <Cite tag="S9 slides 6" />. The question for Chipotle: are its peaks on factors customers can SEE?
      </p>
    </div>
  )
}
