import { setRating, useP, type Rating } from '../lib/store'

const OPTS: { r: Rating; label: string }[] = [
  { r: 'nailed', label: '✓ Nailed it' },
  { r: 'partial', label: '◐ Partly' },
  { r: 'missed', label: '✗ Missed it' },
]

export function SelfRate({ id }: { id: string }) {
  const cur = useP((p) => p.ratings[id])
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Rate your answer">
      {OPTS.map((o) => (
        <button key={o.r} type="button" className="btn btn-sm" aria-pressed={cur === o.r} onClick={() => setRating(id, o.r)} style={cur === o.r ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : undefined}>
          {o.label}
        </button>
      ))}
    </div>
  )
}
