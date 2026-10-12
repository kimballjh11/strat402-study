import { useMemo, useState } from 'react'
import { allLos, generators, mcqs, sessions } from '../content'
import { McqCard } from '../components/McqCard'
import { ProblemCard } from '../components/ProblemCard'
import { useRoute } from '../lib/router'
import { Rng, newSeed } from '../lib/rng'
import { getProgress } from '../lib/store'

type Mode = 'mixed' | 'mcq' | 'calc'

/** Unlimited practice, filterable by session and learning objective. Weak LOs are weighted up. */
export function Practice() {
  const route = useRoute()
  const [session, setSession] = useState(route.query.get('session') ?? 'all')
  const [lo, setLo] = useState(route.query.get('lo') ?? 'all')
  const [mode, setMode] = useState<Mode>('mixed')
  const [n, setN] = useState(newSeed)

  const pool = useMemo(() => {
    const keep = (s: string, los: string[]) => (session === 'all' || s === session) && (lo === 'all' || los.includes(lo))
    return {
      m: mcqs.filter((q) => keep(q.session, q.los)),
      g: generators.filter((g) => keep(g.session, g.los)),
    }
  }, [session, lo])

  const item = useMemo(() => {
    const g = new Rng(n)
    const useGen = mode === 'calc' || (mode === 'mixed' && pool.g.length > 0 && g.bool(0.4)) || pool.m.length === 0
    if (useGen && pool.g.length) return { kind: 'gen' as const, gen: g.pick(pool.g), seed: g.int(1, 2 ** 30) }
    if (!pool.m.length) return null
    // weight toward questions not yet answered correctly
    const ans = getProgress().answers
    const weighted = pool.m.flatMap((q) => (ans[q.id]?.last ? [q] : [q, q, q]))
    return { kind: 'mcq' as const, q: g.pick(weighted) }
  }, [n, mode, pool])

  const losForSession = allLos.filter((l) => session === 'all' || l.session === session)

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-3xl font-semibold">Practice</h1>
        <p className="muted">Unlimited questions. Calculation problems regenerate with fresh numbers every time. Questions you've missed come up more often.</p>
      </header>
      <div className="card p-4 grid sm:grid-cols-3 gap-3">
        <label className="text-sm font-medium flex flex-col gap-1">
          Session
          <select
            value={session}
            onChange={(e) => {
              setSession(e.target.value)
              setLo('all')
              setN(newSeed())
            }}
          >
            <option value="all">All sessions</option>
            {sessions.map((s) => (
              <option key={s.id} value={s.id}>
                {s.num}. {s.title}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium flex flex-col gap-1">
          Learning objective
          <select
            value={lo}
            onChange={(e) => {
              setLo(e.target.value)
              setN(newSeed())
            }}
          >
            <option value="all">All LOs</option>
            {losForSession.map((l) => (
              <option key={l.id} value={l.id}>
                {l.id}: {l.text.slice(0, 60)}
                {l.text.length > 60 ? '…' : ''}
              </option>
            ))}
          </select>
        </label>
        <fieldset className="text-sm font-medium flex flex-col gap-1">
          <legend>Type</legend>
          <div className="flex gap-1">
            {(['mixed', 'mcq', 'calc'] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                className={`btn btn-sm flex-1 ${mode === m ? 'btn-primary' : ''}`}
                aria-pressed={mode === m}
                onClick={() => {
                  setMode(m)
                  setN(newSeed())
                }}
              >
                {m === 'mixed' ? 'Mixed' : m === 'mcq' ? 'Concepts' : 'Calculations'}
              </button>
            ))}
          </div>
        </fieldset>
        <p className="text-xs muted sm:col-span-3">
          Pool: {pool.m.length} multiple-choice questions · {pool.g.length} problem generators (unlimited variations)
        </p>
      </div>
      {item === null ? (
        <p className="card p-5 muted">No questions match these filters yet. That session is still being built.</p>
      ) : item.kind === 'mcq' ? (
        <McqCard key={`${n}-${item.q.id}`} q={item.q} shuffleSeed={n} autoFocus />
      ) : (
        <ProblemCard key={`${n}`} gen={item.gen} seed={item.seed} allowNew={false} />
      )}
      <button type="button" className="btn btn-primary" onClick={() => setN(newSeed())} data-testid="next-practice">
        Next question →
      </button>
    </div>
  )
}
