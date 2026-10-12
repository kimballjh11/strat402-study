import { useMemo, useState } from 'react'
import { allLos, generators, mcqs } from '../content'
import { QuizRunner } from '../components/QuizRunner'
import { buildDiagnostic, buildExam } from '../lib/exam'
import { newSeed } from '../lib/rng'
import { useRoute } from '../lib/router'
import { setProgress, useProgress } from '../lib/store'

export function Exam() {
  const route = useRoute()
  const diagnostic = route.query.get('mode') === 'diagnostic'
  return diagnostic ? <Diagnostic /> : <PracticeExam />
}

function PracticeExam() {
  const [nMc, setNMc] = useState(30)
  const [nSa, setNSa] = useState(6)
  const [mins, setMins] = useState(90)
  const [seed, setSeed] = useState<number | null>(null)
  const history = useProgress((p) => p.exams)
  const items = useMemo(() => (seed === null ? [] : buildExam(seed, nMc, nSa)), [seed, nMc, nSa])

  if (seed !== null)
    return (
      <div className="space-y-4">
        <QuizRunner
          key={seed}
          items={items}
          title="Practice exam"
          timeLimit={mins}
          reviewLinks
          onFinish={(r) =>
            setProgress((p) => ({ ...p, exams: [{ id: String(seed), at: Date.now(), score: r.score, total: r.total, bySession: r.bySession, minutes: r.minutes }, ...p.exams].slice(0, 50) }))
          }
        />
        <div className="flex gap-2">
          <button type="button" className="btn" onClick={() => setSeed(newSeed())}>
            Regenerate with new numbers
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => setSeed(null)}>
            Back to setup
          </button>
        </div>
      </div>
    )

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-3xl font-semibold">Exam Mode</h1>
        <p className="muted">
          A <strong>practice format, not the official one.</strong> The professor says the midterm is “most likely a series of multiple-choice questions and short-answer questions. Multiple choice will focus on conceptual understanding (quizzes). Short-answer will be based on application (spreadsheets, calculations, analysis).” <span className="chip">S10 slides p.7</span>
        </p>
      </header>
      <div className="card p-4 grid sm:grid-cols-3 gap-3">
        <Num label="Multiple choice" value={nMc} set={setNMc} max={60} />
        <Num label="Short answer" value={nSa} set={setNSa} max={15} />
        <Num label="Minutes" value={mins} set={setMins} max={180} />
        <p className="text-xs muted sm:col-span-3">
          Bank today: {mcqs.length} MC questions, {generators.length} generators. If the bank is smaller than requested, the exam uses what's available (it grows as modules are built). No hints or feedback during the exam. You can flag questions for review. Results break down by session and LO, and every miss goes to your Mistake Log.
        </p>
        <button type="button" className="btn btn-primary sm:col-span-3" onClick={() => setSeed(newSeed())} data-testid="start-exam">
          Start practice exam
        </button>
      </div>
      <div className="card p-4">
        <h2 className="font-semibold">Diagnostic</h2>
        <p className="text-sm muted">A 15-minute pre-test across learning objectives. Results set your starting confidence and reorder your study plan.</p>
        <a className="btn btn-sm mt-2" href="#/exam?mode=diagnostic">
          Take the diagnostic
        </a>
      </div>
      {history.length > 0 && (
        <div className="card p-4">
          <h2 className="font-semibold">Past practice exams</h2>
          <ul className="text-sm mt-2 space-y-1">
            {history.map((h) => (
              <li key={h.id + h.at}>
                {new Date(h.at).toLocaleString()} — {h.score}/{h.total} ({Math.round((h.score / h.total) * 100)}%) in {h.minutes} min
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function Num({ label, value, set, max }: { label: string; value: number; set: (n: number) => void; max: number }) {
  return (
    <label className="text-sm font-medium flex flex-col gap-1">
      {label}
      <input type="text" inputMode="numeric" value={value} onChange={(e) => set(Math.max(0, Math.min(max, Number(e.target.value.replace(/\D/g, '')) || 0)))} />
    </label>
  )
}

function Diagnostic() {
  const [seed, setSeed] = useState<number | null>(null)
  const items = useMemo(() => (seed === null ? [] : buildDiagnostic(seed)), [seed])
  if (seed === null)
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">Diagnostic</h1>
        <p className="muted">
          About 15 questions, 15 minutes, one per learning objective where the site has questions so far ({allLos.length} LOs total). It isn't graded for anything. It just tells the site where to start you.
        </p>
        <button type="button" className="btn btn-primary" onClick={() => setSeed(newSeed())} data-testid="start-diagnostic">
          Start diagnostic
        </button>
      </div>
    )
  return (
    <QuizRunner
      items={items}
      title="Diagnostic"
      timeLimit={15}
      reviewLinks
      onFinish={(r) =>
        setProgress((p) => {
          const loConfidence = { ...p.loConfidence }
          for (const [lo, [c, t]] of Object.entries(r.byLo)) if (!p.loConfidence[lo]) loConfidence[lo] = c === t ? 3 : c > 0 ? 2 : 1
          return { ...p, diagnostic: { at: Date.now(), score: r.score, total: r.total }, loConfidence }
        })
      }
    />
  )
}
