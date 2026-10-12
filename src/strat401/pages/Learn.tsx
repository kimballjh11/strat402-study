import { COURSE_MAP, mapById } from '../content/map'
import { MODULES } from '../content/registry'
import { to } from '../lib/router'
import { useP } from '../lib/store'

export function Learn() {
  const mastery = useP((p) => p.mastery)
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-semibold">Learn</h1>
        <p className="muted">Organized by the course’s own map: where profit lives → what the firm brings → how it wins.</p>
      </header>
      {COURSE_MAP.map((g) => (
        <section key={g.title} className="space-y-2">
          <h2 className="text-lg font-semibold">{g.title}</h2>
          <p className="text-sm muted">{g.blurb}</p>
          <div className="grid gap-2 md:grid-cols-2">
            {g.ids.map((id) => {
              const s = mapById[id]
              return (
                <a key={id} href={to(`/learn/${id}`)} className="card p-4 space-y-1 block" data-testid={`learn-${id}`}>
                  <div className="flex items-center gap-2">
                    <span className="chip">{id}</span>
                    {mastery[id]?.passed && <span className="chip" style={{ color: 'var(--ok)' }}>✓ mastered</span>}
                    {!MODULES[id] && <span className="chip">coming next</span>}
                  </div>
                  <div className="font-semibold">{s.title}</div>
                  <div className="text-sm muted">{s.case.name}</div>
                </a>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
