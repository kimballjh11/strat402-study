import { COURSE_MAP, mapById } from '../content/map'
import { MODULES } from '../content/registry'
import { SCREENS } from './Module'
import { daysBetween, parseIsoDay } from '../lib/format'
import { to } from '../lib/router'
import { setProgress, useP } from '../lib/store'

export function Dashboard() {
  const p = useP((x) => x)
  const left = p.examDate ? daysBetween(new Date(), parseIsoDay(p.examDate)) : null
  const built = COURSE_MAP.flatMap((g) => g.ids).filter((id) => MODULES[id])
  const next = built.find((id) => !p.mastery[id]?.passed)
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-semibold">STRAT 401 · Foundations of Strategy</h1>
        <p className="muted">Learn each framework, run it on the case, then apply it to new scenarios — the way the exam will ask.</p>
      </header>
      <section className="card p-4 space-y-2">
        <h2 className="font-semibold">Exam date</h2>
        <label className="flex flex-wrap items-center gap-2 text-sm">
          <span>Midterm (Sessions 1–11):</span>
          <input type="date" value={p.examDate} onChange={(e) => setProgress((x) => ({ ...x, examDate: e.target.value }))} />
        </label>
        <p className="text-sm" role="status">
          {left === null ? 'Set the date to get a countdown.' : left > 0 ? `${left} day${left === 1 ? '' : 's'} to go.` : left === 0 ? 'Exam day — skim the one-page summaries.' : 'Exam is past.'}
        </p>
        {next && (
          <a className="btn btn-primary" href={to(`/learn/${next}`)}>
            Next up: {next} · {MODULES[next]!.short} →
          </a>
        )}
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Every Key Question</h2>
        {COURSE_MAP.map((g) => (
          <div key={g.title} className="space-y-2">
            <h3 className="font-semibold text-sm uppercase tracking-wide muted">{g.title}</h3>
            {g.ids.map((id) => {
              const s = mapById[id]
              const seen = (p.visited[id] ?? []).length
              const mast = p.mastery[id]
              return (
                <a key={id} href={to(`/learn/${id}`)} className="card p-3 flex flex-wrap items-center gap-3 hover:border-[color:var(--accent)]">
                  <span className="chip">{id}</span>
                  <span className="flex-1 min-w-[12rem]">
                    <span className="font-semibold block">{s.framework.name}</span>
                    <span className="text-sm muted">{s.keyQuestion}</span>
                  </span>
                  <span className="text-xs muted">
                    {MODULES[id] ? `${seen}/${SCREENS.length} screens` : 'map ready · module coming'}
                    {mast && ` · check ${Math.round(mast.best * 100)}%${mast.passed ? ' ✓' : ''}`}
                  </span>
                </a>
              )
            })}
          </div>
        ))}
      </section>
    </div>
  )
}
