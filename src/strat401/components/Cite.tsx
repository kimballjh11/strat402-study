import { useState } from 'react'
import { describeSource } from '../content/sources'

/** Small expandable source tag. */
export function Cite({ tag }: { tag: string }) {
  const [open, setOpen] = useState(false)
  return (
    <span className="cite-wrap">
      <button type="button" className="cite" aria-expanded={open} onClick={(e) => (e.stopPropagation(), setOpen((o) => !o))} title="Show source">
        {tag}
      </button>
      {open && (
        <span className="cite-pop" role="note">
          {describeSource(tag)}
        </span>
      )}
    </span>
  )
}

export function SiteBadge({ children = 'Applies the course frameworks (not a quote from the materials)' }: { children?: string }) {
  return <span className="gen-badge">{children}</span>
}
export function GeneralBadge() {
  return <span className="gen-badge">General strategy (not from course materials)</span>
}
