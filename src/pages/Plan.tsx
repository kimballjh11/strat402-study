import { isoDay, parseIsoDay } from '../lib/format'
import { buildPlan } from '../lib/plan'
import { useProgress } from '../lib/store'
import { minutes, titles } from './Home'

export function Plan() {
  const p = useProgress((x) => x)
  const plan = buildPlan(p, titles, minutes)
  const today = isoDay()
  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-3xl font-semibold">Study plan</h1>
        <p className="muted">
          From today to your exam date ({p.examDate}): new modules first (weakest first once you've taken the diagnostic), then mixed practice, two full practice exams, and a final review day on your Mistake Log and flashcards. It re-plans automatically as you master modules.{' '}
          <a className="underline" href="#/settings">
            Change exam date
          </a>
        </p>
      </header>
      <ol className="space-y-3">
        {plan.map((b) => (
          <li key={b.day} className={`card p-4 ${b.day === today ? 'ring-2' : ''}`} style={b.day === today ? { borderColor: 'var(--accent)' } : undefined}>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="font-semibold">{parseIsoDay(b.day).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
              {b.day === today && <span className="chip">today</span>}
              <span className="chip">{b.kind}</span>
              {b.minutes > 0 && <span className="text-sm muted">~{b.minutes} min</span>}
            </div>
            <p className="font-medium mt-1">{b.title}</p>
            <ul className="text-sm mt-1 space-y-0.5">
              {b.items.map((it) => (
                <li key={it.label}>
                  <a className="underline" href={it.href}>
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}
