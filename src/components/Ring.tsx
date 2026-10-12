export function MasteryRing({ value, mastered, size = 48, label }: { value: number; mastered?: boolean; size?: number; label: string }) {
  const r = size / 2 - 5
  const c = 2 * Math.PI * r
  const v = Math.max(0, Math.min(1, value))
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${label}${mastered ? ', mastered' : ''}`} className="flex-none">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={6} className="ring-track" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        strokeWidth={6}
        className="ring-fill"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - v)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={mastered ? { stroke: 'var(--ok)' } : undefined}
      />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" style={{ fontSize: size * 0.26, fontWeight: 700, fill: 'var(--ink)' }}>
        {mastered ? '✓' : `${Math.round(v * 100)}%`}
      </text>
    </svg>
  )
}
