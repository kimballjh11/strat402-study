import { allLos, cqLos, generators, mcqs, sessionById } from '../content'
import type { SessionId } from '../content/types'
import { setProgress, useProgress } from '../lib/store'

/** Mirrors the professor's study-guide idea: every LO with its lessons, practice, accuracy and confidence. */
export function Tracker() {
  const acc = useProgress((p) => p.loAccuracy)
  const conf = useProgress((p) => p.loConfidence)
  const cqCount = (lo: string) => Object.values(cqLos).filter((l) => l.includes(lo)).length
  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-3xl font-semibold">Learning Objective Tracker</h1>
        <p className="muted">
          “I use the Learning Objectives when deciding what questions to ask.” — Prof. Lewis (S10 slides p.8). Rate your confidence for each LO from 1 to 5. Accuracy comes from everything you answer on this site. When the official study guide posts, its rows replace these.
        </p>
      </header>
      <div className="scroll-x card w-full">
        <table className="data-table w-full min-w-[720px]" data-testid="lo-table">
          <thead>
            <tr>
              <th>LO</th>
              <th>Objective</th>
              <th>Lesson</th>
              <th>Practice</th>
              <th>Accuracy</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {allLos.map((lo) => {
              const [c, a] = acc[lo.id] ?? [0, 0]
              const nm = mcqs.filter((q) => q.los.includes(lo.id)).length
              const ng = generators.filter((g) => g.los.includes(lo.id)).length
              const nc = cqCount(lo.id)
              const m = sessionById[lo.session as SessionId]
              return (
                <tr key={lo.id}>
                  <td className="whitespace-nowrap font-semibold">{lo.id}</td>
                  <td className="text-sm">{lo.text}</td>
                  <td className="text-sm whitespace-nowrap">
                    <a className="underline" href={`#/learn/${lo.session}`}>
                      S{m.num}: {m.title}
                    </a>
                  </td>
                  <td className="text-sm whitespace-nowrap">
                    <a className="underline" href={`#/practice?session=${lo.session}&lo=${lo.id}`}>
                      {nm} MCQ · {ng} gen{nc ? ` · ${nc} CQ` : ''}
                    </a>
                  </td>
                  <td className="text-sm tabular-nums whitespace-nowrap">{a ? `${Math.round((c / a) * 100)}% (${c}/${a})` : '—'}</td>
                  <td>
                    <label className="sr-only" htmlFor={`conf-${lo.id}`}>
                      Confidence for {lo.id}
                    </label>
                    <select id={`conf-${lo.id}`} value={conf[lo.id] ?? ''} onChange={(e) => setProgress((p) => ({ ...p, loConfidence: { ...p.loConfidence, [lo.id]: Number(e.target.value) } }))}>
                      <option value="">–</option>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
