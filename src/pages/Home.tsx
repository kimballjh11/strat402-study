import { allLos, sessions } from '../content'
import { MasteryRing } from '../components/Ring'
import { daysBetween, isoDay, parseIsoDay } from '../lib/format'
import { buildPlan } from '../lib/plan'
import { getProgress, streak, useProgress } from '../lib/store'
import { SCREENS } from './ModulePage'

export const titles = Object.fromEntries(sessions.map((s) => [s.id, s.title]))
export const minutes = Object.fromEntries(sessions.map((s) => [s.id, s.minutes]))

export function moduleProgress(id: string) {
  const p = getProgress()
  const v = (p.visited[id] ?? []).length / SCREENS.length
  const m = p.mastery[id]
  return m?.passed ? 1 : Math.min(0.95, v * 0.6 + (m?.best ?? 0) * 0.4)
}

export function Home() {
  const p = useProgress((x) => x)
  const left = daysBetween(new Date(), parseIsoDay(p.examDate))
  const plan = buildPlan(p, titles, minutes)
  const today = plan.find((b) => b.day === isoDay()) ?? plan[0]
  const overall = sessions.reduce((a, s) => a + moduleProgress(s.id), 0) / sessions.length
  const weakest = allLos
    .map((lo) => {
      const [c, a] = p.loAccuracy[lo.id] ?? [0, 0]
      const conf = p.loConfidence[lo.id]
      const score = a ? c / a : conf ? (conf - 1) / 4 : null
      return { lo, score, a }
    })
    .filter((x) => x.score !== null)
    .sort((x, y) => x.score! - y.score!)
    .slice(0, 5)
  const nextLesson = plan.find((b) => b.kind === 'learn')?.items[0]

  return (
    <div className="space-y-6">
      <section className="card p-5 md:p-6 flex flex-wrap gap-6 items-center">
        <div className="flex-1 min-w-60">
          <p className="muted text-sm">Hi Kimball 👋</p>
          <h1 className="text-3xl font-semibold mt-1">Midterm 1 is {left > 0 ? `in ${left} day${left === 1 ? '' : 's'}` : left === 0 ? 'today' : 'done'}.</h1>
          <p className="muted mt-1">
            Your exam date: <strong>{parseIsoDay(p.examDate).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</strong> · Window: Mon Oct 19, 8:00 AM – Fri Oct 23, 9:00 PM (late fee starts Friday) ·{' '}
            <a className="underline" href="#/settings">
              change
            </a>
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <a className="btn btn-primary" href={'#' + (p.lastPath ?? '/learn/S08')} data-testid="continue">
              Continue {p.lastPath ? '' : '— start with Elasticity'} →
            </a>
            {!p.diagnostic && (
              <a className="btn" href="#/exam?mode=diagnostic">
                Take the 15-min diagnostic
              </a>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <MasteryRing value={overall} size={96} label="Overall mastery" />
          <div className="text-sm">
            <div className="font-semibold">Overall mastery</div>
            <div className="muted">{sessions.filter((s) => p.mastery[s.id]?.passed).length} of {sessions.length} modules mastered</div>
            <div className="muted">🔥 {streak(p.studyDays)}-day streak</div>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-4">
        <section className="card p-5">
          <h2 className="text-xl font-semibold">Today's study block</h2>
          {today ? (
            <>
              <p className="mt-1">
                <strong>{today.title}</strong> {today.minutes > 0 && <span className="muted">· ~{today.minutes} min</span>}
              </p>
              <ul className="mt-2 space-y-1">
                {today.items.map((it) => (
                  <li key={it.label}>
                    <a className="underline" href={it.href}>
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="muted">No plan — set your exam date in Settings.</p>
          )}
          <a className="btn btn-sm mt-3" href="#/plan">
            Full study plan
          </a>
        </section>
        <section className="card p-5">
          <h2 className="text-xl font-semibold">Weakest learning objectives</h2>
          {weakest.length === 0 ? (
            <p className="muted mt-1">Answer some questions (or take the diagnostic) and your weakest LOs will show up here.</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {weakest.map(({ lo, score, a }) => (
                <li key={lo.id} className="text-sm">
                  <span className="chip mr-1">{lo.id}</span> {lo.text.slice(0, 90)}
                  {lo.text.length > 90 ? '…' : ''} <span className="muted">— {a ? `${Math.round(score! * 100)}% correct` : `confidence ${p.loConfidence[lo.id]}/5`}</span>
                </li>
              ))}
            </ul>
          )}
          {nextLesson && (
            <p className="mt-3 text-sm">
              Next recommended lesson:{' '}
              <a className="underline font-semibold" href={nextLesson.href}>
                {nextLesson.label}
              </a>
            </p>
          )}
        </section>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-2">Modules</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sessions.map((s) => (
            <a key={s.id} href={`#/learn/${s.id}`} className="card p-4 flex gap-3 items-center hover:shadow-sm">
              <MasteryRing value={moduleProgress(s.id)} mastered={p.mastery[s.id]?.passed} size={44} label={`${s.title} progress`} />
              <div className="min-w-0">
                <div className="text-xs muted">Session {s.num}</div>
                <div className="font-semibold truncate">{s.title}</div>
                {!s.ready && <div className="text-xs muted">being built</div>}
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
