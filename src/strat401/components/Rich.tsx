import { Fragment, type ReactNode } from 'react'
import { Cite } from './Cite'

/** Inline renderer: **bold**, *italic*, [[Source tag]] → Cite. */
export function R({ t }: { t: string }) {
  const parts = t.split(/(\[\[[^\]]+\]\]|\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/g)
  return (
    <>
      {parts.map((p, i) => {
        if (!p) return null
        if (p.startsWith('[[')) return <Cite key={i} tag={p.slice(2, -2)} />
        if (p.startsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>
        if (p.startsWith('*') && p.endsWith('*') && p.length > 2) return <em key={i}>{p.slice(1, -1)}</em>
        return <Fragment key={i}>{p}</Fragment>
      })}
    </>
  )
}

/** Block renderer: paragraphs split on blank lines; lines starting with "- " become a list. */
export function Rich({ t, className = '' }: { t: string; className?: string }) {
  const blocks = t.split(/\n\s*\n/)
  return (
    <div className={`rich ${className}`}>
      {blocks.map((b, i) => {
        const lines = b.split('\n')
        if (lines.every((l) => l.trim().startsWith('- ')))
          return (
            <ul key={i} className="list-disc pl-5 space-y-1 my-2">
              {lines.map((l, j) => (
                <li key={j}>
                  <R t={l.trim().slice(2)} />
                </li>
              ))}
            </ul>
          )
        return (
          <p key={i}>
            <R t={b} />
          </p>
        )
      })}
    </div>
  )
}

export function Callout({ title, children, tone = 'accent' }: { title?: string; children: ReactNode; tone?: 'accent' | 'warn' }) {
  return (
    <div className="callout" style={tone === 'warn' ? { borderLeftColor: 'var(--warn-ink)', background: 'var(--warn-bg)' } : undefined}>
      {title && <div className="font-semibold mb-1">{title}</div>}
      {children}
    </div>
  )
}
