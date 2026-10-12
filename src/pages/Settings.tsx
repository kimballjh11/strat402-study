import { useRef, useState } from 'react'
import { exportProgress, importProgress, resetProgress, setProgress, useProgress } from '../lib/store'

export function Settings() {
  const examDate = useProgress((p) => p.examDate)
  const [msg, setMsg] = useState<string | null>(null)
  const [confirmReset, setConfirmReset] = useState('')
  const file = useRef<HTMLInputElement>(null)

  const download = () => {
    const blob = new Blob([exportProgress()], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `strat402-progress-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    setTimeout(() => URL.revokeObjectURL(a.href), 1000)
    setMsg('Progress exported. Move the file to your other device and import it there.')
  }

  return (
    <div className="space-y-5 max-w-2xl">
      <h1 className="text-3xl font-semibold">Settings & backup</h1>
      <section className="card p-4 space-y-2">
        <h2 className="font-semibold">Exam date</h2>
        <p className="text-sm muted">The Testing Center window is Mon Oct 19, 8:00 AM – Fri Oct 23, 9:00 PM. A late fee starts Friday. The default is Thursday, Oct 22, which leaves Friday as a buffer.</p>
        <label className="text-sm font-medium" htmlFor="exam-date">
          My exam day
        </label>
        <input id="exam-date" type="date" min="2026-10-19" max="2026-10-23" value={examDate} onChange={(e) => e.target.value && setProgress((p) => ({ ...p, examDate: e.target.value }))} className="block" />
      </section>
      <section className="card p-4 space-y-2">
        <h2 className="font-semibold">Back up / move progress</h2>
        <p className="text-sm muted">Everything is saved in this browser only (one localStorage key). Export a JSON file to move between laptop and phone.</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-primary" onClick={download} data-testid="export">
            Export progress
          </button>
          <button type="button" className="btn" onClick={() => file.current?.click()} data-testid="import">
            Import progress
          </button>
          <input
            ref={file}
            type="file"
            accept="application/json,.json"
            className="hidden"
            data-testid="import-file"
            onChange={async (e) => {
              const f = e.target.files?.[0]
              if (!f) return
              const res = importProgress(await f.text())
              setMsg(res.ok ? 'Progress imported.' : `Import failed: ${res.error}`)
              e.target.value = ''
            }}
          />
        </div>
        {msg && (
          <p className="text-sm" role="status">
            {msg}
          </p>
        )}
      </section>
      <section className="card p-4 space-y-2">
        <h2 className="font-semibold">Reset</h2>
        <label className="text-sm" htmlFor="reset">
          Type RESET to erase all progress in this browser:
        </label>
        <div className="flex gap-2">
          <input id="reset" type="text" value={confirmReset} onChange={(e) => setConfirmReset(e.target.value)} />
          <button
            type="button"
            className="btn"
            disabled={confirmReset !== 'RESET'}
            onClick={() => {
              resetProgress()
              setConfirmReset('')
              setMsg('Progress reset.')
            }}
          >
            Erase
          </button>
        </div>
      </section>
      <section className="text-sm muted">
        <p>
          Built from Prof. Ben Lewis's STRAT 402 (Fall 2026) materials, shared with permission. No accounts, no tracking, no AI calls. Content tagged <span className="gen-badge">General econ (not from course materials)</span> is standard managerial economics, used where the course files didn't cover a topic.
        </p>
      </section>
    </div>
  )
}
