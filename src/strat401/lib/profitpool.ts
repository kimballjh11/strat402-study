/** Profit pool presets and math. Width = share of revenue; height = margin; area = profit. */
export interface PoolBlock { label: string; revShare: number; margin: number }
export interface Pool { id: string; title: string; marginLabel: string; blocks: PoolBlock[]; src: string; note: string }

// AutoNation 2025: department shares of revenue and gross profit from the brief; margins derived (gross profit $4.9B on $27.6B).
const AN_GP_MARGIN = 4.9 / 27.6
const an = (label: string, rev: number, gp: number): PoolBlock => ({ label, revShare: rev, margin: (gp / rev) * AN_GP_MARGIN })
export const AUTONATION: Pool = {
  id: 'autonation',
  title: 'AutoNation 2025 — the profit pool inside a car dealership',
  marginLabel: 'gross margin',
  blocks: [an('New vehicles', 0.489, 0.134), an('Used vehicles', 0.283, 0.094), an('Parts & service', 0.175, 0.476), an('Finance & insurance', 0.053, 0.296)],
  src: 'VC Profit pools',
  note: 'From the brief: new vehicles 48.9% of revenue but 13.4% of gross profit; parts & service 17.5% / 47.6%; parts & service plus F&I 22.8% of sales → 77.2% of gross profit. Used and F&I split by subtraction; margins = (profit share ÷ revenue share) × company gross margin (4.9 ÷ 27.6).',
}

export const PC_1998: Pool = {
  id: 'pc',
  title: 'PC industry profit pool (Gadiesh & Gilbert, 1998)',
  marginLabel: 'operating margin',
  blocks: [
    { label: 'Microprocessors', revShare: 0.069, margin: 0.351 },
    { label: 'Other components', revShare: 0.235, margin: 0.059 },
    { label: 'Personal computers', revShare: 0.381, margin: 0.033 },
    { label: 'Software', revShare: 0.067, margin: 0.206 },
    { label: 'Peripherals', revShare: 0.146, margin: 0.1 },
    { label: 'Services', revShare: 0.102, margin: 0.146 },
  ],
  src: 'S6 slides 3',
  note: 'Values read off the chart (approximate). “Manufacturers compete in the largest but least-profitable segment of the chain.”',
}

export const profitShares = (p: Pool) => {
  const tot = p.blocks.reduce((a, b) => a + b.revShare * b.margin, 0)
  return p.blocks.map((b) => ({ ...b, profitShare: (b.revShare * b.margin) / tot }))
}
