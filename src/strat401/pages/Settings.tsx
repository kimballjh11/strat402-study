import { useRef, useState } from 'react'
import { exportProgress, importProgress, resetProgress, STORAGE_KEY } from '../lib/store'

export function Settings() {
  const [msg, setMsg] = useState('')
  const file = useRef<HTMLInputElement>(null)
  const download = () => {
    const blob = new Blob([exportProgress()], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `strat401-progress-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
    setMsg('Exported. Keep the file somewhere safe.')
  }
  return (
    <div className="space-y-4 max-w-2xl">
      <h1 className="text-2xl md:text-3xl font-semibold">Settings & backup</h1>
      <section className="card p-4 space-y-2">
        <h2 className="font-semibold">Back up your STRAT 401 progress</h2>
        <p className="text-sm muted">
          Progress is stored only in this browser under <code>{STORAGE_KEY}</code> — separate from STRAT 402. Export a JSON file to move it to another device.
        </p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-primary" onClick={download} data-testid="export-401">
            Export progress
          </button>
          <button type="button" className="btn" onClick={() => file.current?.click()}>
            Import progress
          </button>
          <input
            ref={file}
            type="file"
            accept="application/json"
            className="sr-only"
            data-testid="import-401"
            onChange={async (e) => {
              const f = e.target.files?.[0]
              if (!f) return
              const r = importProgress(await f.text())
              setMsg(r.ok ? 'Imported.' : `Import failed: ${r.error}`)
              e.target.value = ''
            }}
          />
        </div>
        <p role="status" className="text-sm">
          {msg}
        </p>
      </section>
      <section className="card p-4 space-y-2">
        <h2 className="font-semibold">Start over</h2>
        <button
          type="button"
          className="btn"
          onClick={() => {
            resetProgress()
            setMsg('STRAT 401 progress reset.')
          }}
        >
          Reset STRAT 401 progress
        </button>
      </section>
    </div>
  )
}
