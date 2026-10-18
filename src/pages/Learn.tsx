import { useEffect } from 'react'
import { SPINES, sessions } from '../content'
import type { SessionId } from '../content/types'
import { useRoute } from '../lib/router'
import { setProgress } from '../lib/store'
import { SessionArticle } from './ModulePage'

/** Every Midterm 1 session, read in course order. Jump links land on a session or a section inside it. */
export function Learn({ focus }: { focus?: SessionId }) {
  const screen = useRoute().query.get('screen')
  useEffect(() => {
    const target = focus ? (screen && document.getElementById(`${focus}-${screen}`) ? `${focus}-${screen}` : focus) : null
    if (target) document.getElementById(target)?.scrollIntoView({ block: 'start' })
    setProgress((p) => ({ ...p, lastPath: focus ? `/learn/${focus}${screen ? `?screen=${screen}` : ''}` : '/learn' }))
  }, [focus, screen])

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold">Learn</h1>
        <p className="muted max-w-3xl">
          Midterm 1 in one pass, in course order. Read each session straight through, then flip through its questions at the end.
        </p>
        <nav aria-label="Sessions" className="card p-4">
          <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1">
            {sessions.map((s) => (
              <li key={s.id}>
                <a className="underline text-sm" href={`#/learn/${s.id}`}>
                  Session {s.num}. {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </header>
      {SPINES.filter((sp) => !sp.locked && sessions.some((s) => s.spine === sp.key)).map((sp) => (
        <section key={sp.key} className="space-y-10" aria-labelledby={`sp-${sp.key}`}>
          <header>
            <h2 id={`sp-${sp.key}`} className="text-xl font-semibold">
              {sp.title}
            </h2>
            <p className="muted text-sm">{sp.q}</p>
          </header>
          {sessions
            .filter((s) => s.spine === sp.key)
            .map((s) => (
              <SessionArticle key={s.id} m={s} />
            ))}
        </section>
      ))}
    </div>
  )
}
