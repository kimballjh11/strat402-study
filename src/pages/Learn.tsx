import { SPINES, sessions } from '../content'
import { MasteryRing } from '../components/Ring'
import { useProgress } from '../lib/store'
import { moduleProgress } from './Home'

export function Learn() {
  const mastery = useProgress((p) => p.mastery)
  useProgress((p) => p.visited)
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold">Learn</h1>
        <p className="muted mt-1">
          The course is organized around four strategy questions. Midterm 1 covers the first two. Every module has the same 13 screens: why it matters → intuition → terms → math → worked examples → interactives → checks → practice → traps → explain it back → go deeper → mastery check → summary.
        </p>
      </header>
      {SPINES.map((sp) => {
        const mods = sessions.filter((s) => s.spine === sp.key)
        return (
          <section key={sp.key} aria-labelledby={`sp-${sp.key}`} className={sp.locked ? 'opacity-60' : ''}>
            <h2 id={`sp-${sp.key}`} className="text-xl font-semibold">
              {sp.title} {sp.locked && <span className="chip ml-1">🔒 coming later</span>}
            </h2>
            <p className="muted text-sm mb-3">{sp.q}</p>
            {mods.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-3">
                {mods.map((s) => (
                  <a key={s.id} href={`#/learn/${s.id}`} className="card p-4 flex gap-3 items-start" data-testid={`module-${s.id}`}>
                    <MasteryRing value={moduleProgress(s.id)} mastered={mastery[s.id]?.passed} size={48} label={`${s.title} progress`} />
                    <div className="min-w-0">
                      <div className="text-xs muted">
                        Session {s.num} · ~{s.minutes} min
                      </div>
                      <div className="font-semibold">{s.title}</div>
                      <div className="text-xs muted mt-1">{s.los.length} learning objectives{s.ready ? '' : ' · being built'}</div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}
