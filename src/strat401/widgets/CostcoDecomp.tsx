import { useState } from 'react'
import { DataTable, HBar } from '../components/Charts'
import { Cite, SiteBadge } from '../components/Cite'
import { num, pct as fpct } from '../lib/format'
import { COSTCO_FY25, costcoFeeShareOfOI, costcoGrossMargin, costcoMerchSpread, costcoSgaRate, decompose, perUnit, SAMS_FY26, samsMerchSpread } from '../lib/costco'

/** Assignment Q1-Q2 and the Key Question: how much of Costco's lead is cost, how much differentiation? */
export function CostcoDecomp() {
  const [volToDiff, setVolToDiff] = useState(0.5)
  const [marToCost, setMarToCost] = useState(0.6)
  const [samsGM, setSamsGM] = useState(0.14)
  const u = perUnit()
  const d = decompose(volToDiff, marToCost)
  const feeShare = COSTCO_FY25.fees / COSTCO_FY25.totalRevenue
  const cNet = u.costcoRevPerUnit * (1 - feeShare)
  const sNet = SAMS_FY26.netSales / SAMS_FY26.clubs
  return (
    <div className="space-y-6" data-testid="costco-decomp">
      <section className="space-y-2">
        <h3 className="font-semibold">1 · Where each company earns its profit (Assignment Q2)</h3>
        <p className="text-sm">
          Costco FY2025: gross margin {fpct(costcoGrossMargin(), 2)} − SG&A {fpct(costcoSgaRate(), 2)} = merchandise spread <strong>${num(costcoMerchSpread(), 0)}M</strong>; membership fees ${num(COSTCO_FY25.fees, 0)}M = <strong>{fpct(costcoFeeShareOfOI(), 0)}</strong> of operating income (${num(COSTCO_FY25.opIncome, 0)}M) <Cite tag="Costco Ex.1" />.
        </p>
        <p className="text-sm">
          Sam’s FY2026: operating income ${num(SAMS_FY26.opIncome, 0)}M − membership & other income ${num(SAMS_FY26.membershipOther, 0)}M = <strong>${num(samsMerchSpread(), 0)}M</strong>. So Sam’s gross margin minus operating expenses is about <strong>{fpct(samsMerchSpread() / SAMS_FY26.netSales, 2)}</strong> of net sales — essentially all its profit comes from fees and other income <Cite tag="Costco Ex.3" />.
        </p>
        <HBar title="Operating income split ($M)" rows={[{ label: 'Costco: merchandise spread', value: costcoMerchSpread() }, { label: 'Costco: membership fees', value: COSTCO_FY25.fees }, { label: 'Sam’s: merchandise spread', value: samsMerchSpread() }, { label: 'Sam’s: membership & other', value: SAMS_FY26.membershipOther }]} digits={0} />
      </section>
      <section className="space-y-2">
        <h3 className="font-semibold">2 · One average box, side by side (Assignment Q1)</h3>
        <label className="block text-sm">
          Your assumption — Sam’s gross margin (undisclosed): {fpct(samsGM, 1)}
          <input type="range" min={0.08} max={0.2} step={0.005} value={samsGM} onChange={(e) => setSamsGM(Number(e.target.value))} className="w-full" />
        </label>
        <DataTable
          head={['$M per box', 'Costco US warehouse', 'Sam’s Club', 'Disclosed or assumed?']}
          rows={[
            ['Total revenue', num(u.costcoRevPerUnit, 1), num(u.samsRevPerUnit, 1), 'Computed from disclosed totals ÷ units (Ex.4)'],
            ['Membership fees / membership & other', num(u.costcoRevPerUnit * feeShare, 2), num(SAMS_FY26.membershipOther / SAMS_FY26.clubs, 2), 'Costco: consolidated fee share applied to US (assumption)'],
            ['Net sales', num(cNet, 1), num(sNet, 1), 'Derived'],
            ['Gross profit', num(cNet * costcoGrossMargin(), 2), num(sNet * samsGM, 2), 'Costco: consolidated 11.12% (assumption for US); Sam’s: your slider'],
            ['SG&A / operating expenses', num(cNet * costcoSgaRate(), 2), num(sNet * samsGM - samsMerchSpread() / SAMS_FY26.clubs, 2), 'Costco: 9.25%; Sam’s: implied so that GP − opex = disclosed −$83M'],
            ['Operating income (built)', num(u.costcoRevPerUnit * feeShare + cNet * (costcoGrossMargin() - costcoSgaRate()), 2), num(u.samsOIPerUnit, 2), 'Built from the lines above'],
            ['Operating income (disclosed ÷ units)', num(u.costcoOIPerUnit, 2), num(u.samsOIPerUnit, 2), 'Costco US segment Ex.2; Sam’s Ex.3'],
          ]}
          caption={<>Per-box income statements <Cite tag="Costco Ex.1-4" /></>}
        />
        <p className="text-xs muted">
          Costco’s built US figure ({num(u.costcoRevPerUnit * feeShare + cNet * (costcoGrossMargin() - costcoSgaRate()), 1)}) exceeds the disclosed US segment ({num(u.costcoOIPerUnit, 1)}) because consolidated ratios include Canada and international, which earn more per dollar — a reconciliation item to state, not hide. Fiscal years differ (Costco Aug 2025, Sam’s Jan 2026); Costco’s square footage is approximated <Cite tag="Costco Ex.4" />.
        </p>
        <DataTable
          head={['Per unit', 'Costco US', 'Sam’s']}
          rows={[
            ['Revenue per sq ft', `$${num(u.costcoRevPerSqft, 0)}`, `$${num(u.samsRevPerSqft, 0)}`],
            ['Employees per unit', num(u.costcoEmpPerUnit, 0), num(u.samsEmpPerUnit, 0)],
            ['Revenue per employee', `$${num(u.costcoRevPerEmpK, 0)}k`, `$${num(u.samsRevPerEmpK, 0)}k`],
            ['Average hourly wage', '~$32.00', '>$19'],
          ]}
          caption={<>Exhibit 4 computations, reproduced <Cite tag="Costco Ex.4" /></>}
        />
      </section>
      <section className="space-y-3">
        <h3 className="font-semibold">3 · The Key Question: what share is cost, what share differentiation?</h3>
        <p className="text-sm">
          Costco US earns <strong>${num(u.costcoOIPerUnit, 2)}M</strong> of operating income per warehouse vs. Sam’s <strong>${num(u.samsOIPerUnit, 2)}M</strong> per club — a gap of <strong>${num(d.gap, 2)}M</strong>. That gap splits exactly into:
        </p>
        <ul className="text-sm list-disc pl-5">
          <li>
            <strong>Volume effect ${num(d.volume, 2)}M</strong> — Costco sells ${num(u.costcoRevPerUnit, 0)}M per box vs. ${num(u.samsRevPerUnit, 0)}M, valued at Sam’s {fpct(d.sM, 2)} margin.
          </li>
          <li>
            <strong>Margin effect ${num(d.margin, 2)}M</strong> — Costco’s {fpct(d.cM, 2)} margin vs. Sam’s {fpct(d.sM, 2)}, on Costco’s own revenue.
          </li>
        </ul>
        <p className="text-sm">Now make your assumptions explicit:</p>
        <label className="block text-sm">
          Share of the <strong>volume</strong> effect you attribute to <strong>differentiation</strong> (members choosing to spend more — trust, Kirkland quality, renewal) rather than to <strong>cost</strong> (low prices funded by low costs): {Math.round(volToDiff * 100)}%
          <input type="range" min={0} max={1} step={0.05} value={volToDiff} onChange={(e) => setVolToDiff(Number(e.target.value))} className="w-full" />
        </label>
        <label className="block text-sm">
          Share of the <strong>margin</strong> effect you attribute to <strong>cost</strong> (SG&A efficiency, productivity, purchasing) rather than to <strong>differentiation</strong> (the higher fee members pay and renew): {Math.round(marToCost * 100)}%
          <input type="range" min={0} max={1} step={0.05} value={marToCost} onChange={(e) => setMarToCost(Number(e.target.value))} className="w-full" />
        </label>
        <HBar title="Your decomposition of Costco’s per-box lead ($M)" rows={[{ label: 'From cost', value: d.cost }, { label: 'From differentiation', value: d.diff }]} digits={2} />
        <p role="status" className="font-semibold">
          On your assumptions: {Math.round(d.costShare * 100)}% cost, {Math.round(d.diffShare * 100)}% differentiation.
        </p>
        <p className="text-xs muted">
          The split is an identity, but assigning each effect to cost or differentiation is a judgment — defend your sliders with evidence: fee premium ($65/$130 vs. $60/$120), 92.3% renewal, Executive members ~73.6% of sales (WTP); SG&A 9.25% with $32/hr wages, 94% retention, fewer than 4,000 SKUs (cost) <Cite tag="Costco" /> <SiteBadge>Decomposition is a site construction; the case gives no split</SiteBadge>
        </p>
      </section>
    </div>
  )
}
