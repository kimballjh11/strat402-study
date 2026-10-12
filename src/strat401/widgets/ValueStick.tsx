import { useState } from 'react'
import { Cite, SiteBadge } from '../components/Cite'
import { money, num } from '../lib/format'
import { consumerSurplus, split } from '../lib/value'

/** Interactive value stick, plus the Chipotle “cut invisible cost” experiment. */
export function ValueStick() {
  const [wtp, setWtp] = useState(16)
  const [price, setPrice] = useState(12)
  const [cost, setCost] = useState(9)
  const [sup, setSup] = useState(5)
  const [cut, setCut] = useState(0.4) // $ cost cut per meal from relaxing invisible standards
  const [wtpLoss, setWtpLoss] = useState(0) // perceived WTP loss per meal if customers notice
  const s = split({ wtp, price, cost, supplier: sup })
  const H = 260, top = 18
  const maxV = 20
  const y = (v: number) => top + (H - top - 10) * (1 - v / maxV)
  const seg = (a: number, b: number, fill: string, label: string) => (
    <g>
      <rect x={70} y={y(b)} width={110} height={Math.max(0, y(a) - y(b))} fill={fill} opacity={0.85} />
      {y(a) - y(b) > 16 && (
        <text x={125} y={(y(a) + y(b)) / 2 + 4} textAnchor="middle" style={{ fontSize: 11, fill: '#fff', fontWeight: 700 }}>
          {label}
        </text>
      )}
    </g>
  )
  const after = split({ wtp: wtp - wtpLoss, price, cost: cost - cut, supplier: sup })
  const cs = consumerSurplus(30000, 20000, 0.75)
  return (
    <div className="space-y-5" data-testid="value-stick">
      <div className="grid gap-4 md:grid-cols-[220px_1fr]">
        <svg viewBox={`0 0 220 ${H}`} className="graph w-full max-w-[220px]" role="img" aria-label={`Value stick: willingness to pay ${money(wtp, 2)}, price ${money(price, 2)}, cost ${money(cost, 2)}, supplier opportunity cost ${money(sup, 2)}`}>
          {seg(price, wtp, '#2563eb', 'Customer surplus')}
          {seg(cost, price, '#0f5b5f', 'Firm margin')}
          {seg(sup, cost, '#b45309', 'Supplier surplus')}
          {[['WTP', wtp], ['Price', price], ['Cost', cost], ['Supplier opp. cost', sup]].map(([l, v]) => (
            <g key={l as string}>
              <line x1={60} x2={190} y1={y(v as number)} y2={y(v as number)} stroke="var(--ink)" />
              <text x={56} y={y(v as number) + 4} textAnchor="end" style={{ fontSize: 10 }}>
                {money(v as number, 2)}
              </text>
              <text x={194} y={y(v as number) + 4} style={{ fontSize: 9 }}>
                {(l as string).split(' ')[0]}
              </text>
            </g>
          ))}
        </svg>
        <div className="space-y-2 text-sm">
          {([['Willingness to pay', wtp, setWtp], ['Price', price, setPrice], ['Cost', cost, setCost], ['Supplier opportunity cost', sup, setSup]] as const).map(([l, v, f]) => (
            <label key={l} className="block">
              {l}: {money(v, 2)}
              <input type="range" min={0} max={maxV} step={0.25} value={v} onChange={(e) => f(Number(e.target.value))} className="w-full" />
            </label>
          ))}
          <p role="status">
            Value created {money(s.valueCreated, 2)} = customer surplus {money(s.customerSurplus, 2)} + firm margin {money(s.firmMargin, 2)} + supplier surplus {money(s.supplierSurplus, 2)}.
            {(price > wtp || cost > price || sup > cost) && <strong className="verdict-bad"> The levels must stack: supplier cost ≤ cost ≤ price ≤ WTP.</strong>}
          </p>
          <p className="muted">
            Differentiation moves the top; cost leadership moves the bottom; both create value, but only the first creates the option to charge more <Cite tag="Diff Fig.1" />.
          </p>
        </div>
      </div>
      <section className="card p-4 space-y-2">
        <h3 className="font-semibold">Chipotle’s question: cut a cost customers can’t see?</h3>
        <p className="text-sm">
          Relaxing sourcing lowers cost per meal. If customers never notice, margin rises. If trust erodes, WTP falls — and once WTP falls below price, customers leave. Set your assumptions <SiteBadge>Illustrative per-meal numbers, not case data</SiteBadge>
        </p>
        <div className="grid gap-3 sm:grid-cols-2 text-sm">
          <label>
            Cost saved per meal: {money(cut, 2)}
            <input type="range" min={0} max={1.5} step={0.05} value={cut} onChange={(e) => setCut(Number(e.target.value))} className="w-full" />
          </label>
          <label>
            WTP lost per meal if trust erodes: {money(wtpLoss, 2)}
            <input type="range" min={0} max={6} step={0.25} value={wtpLoss} onChange={(e) => setWtpLoss(Number(e.target.value))} className="w-full" />
          </label>
        </div>
        <p role="status" className="text-sm">
          Firm margin {money(s.firmMargin, 2)} → <strong>{money(after.firmMargin, 2)}</strong> per meal; customer surplus {money(s.customerSurplus, 2)} → <strong>{money(after.customerSurplus, 2)}</strong>.{' '}
          {after.customerSurplus < 0 ? <span className="verdict-bad">WTP is now below price — customers stop buying; the margin gain is on meals nobody orders.</span> : after.customerSurplus < s.customerSurplus * 0.5 ? <span>Customer surplus has halved — a thinner reason to choose Chipotle over Qdoba.</span> : <span>Customers still come; this is the “premium harvest” zone — it works until it doesn’t <Cite tag="Porter §4" />.</span>}
        </p>
        <p className="text-xs muted">
          Scale: each 100 bps of food cost ≈ $120M of operating profit on ~$11.9B of revenue <Cite tag="Chipotle Ex.6" />.
        </p>
      </section>
      <section className="card p-4 space-y-1 text-sm">
        <h3 className="font-semibold">Consumer surplus (slide example)</h3>
        <p>
          Dr Pepper on campus: Q = 30,000 − 20,000P. At P = $0.75: Q = {num(cs.q, 0)}, choke price {money(cs.choke, 2)}, CS = ½ × ({money(cs.choke, 2)} − $0.75) × {num(cs.q, 0)} = <strong>{money(cs.cs, 0)}</strong> <Cite tag="S9 slides 36-37" />.
        </p>
      </section>
    </div>
  )
}
