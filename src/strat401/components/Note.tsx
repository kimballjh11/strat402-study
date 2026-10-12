import { setNote, useP } from '../lib/store'

/** A text box whose contents persist in progress (and export with it). */
export function NoteBox({ id, label, rows = 3, placeholder }: { id: string; label: string; rows?: number; placeholder?: string }) {
  const v = useP((p) => p.notes[id] ?? '')
  return (
    <label className="block space-y-1">
      <span className="text-sm font-semibold">{label}</span>
      <textarea className="w-full" rows={rows} value={v} placeholder={placeholder} onChange={(e) => setNote(id, e.target.value)} />
    </label>
  )
}
