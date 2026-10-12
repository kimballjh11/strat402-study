import katex from 'katex'
import { Fragment, type ReactNode, useMemo } from 'react'
import { Cite, GeneralBadge } from './Cite'

const mathCache = new Map<string, string>()
export function texHtml(latex: string, display = false) {
  const key = (display ? 'D:' : 'I:') + latex
  let html = mathCache.get(key)
  if (html === undefined) {
    html = katex.renderToString(latex, { throwOnError: false, displayMode: display, strict: false })
    mathCache.set(key, html)
  }
  return html
}

export function Tex({ children, display = false }: { children: string; display?: boolean }) {
  return (
    <span
      className={display ? 'block overflow-x-auto overflow-y-hidden py-1' : ''}
      dangerouslySetInnerHTML={{ __html: texHtml(children, display) }}
    />
  )
}

const INLINE = /\\\((.+?)\\\)|\\\[(.+?)\\\]|\*\*(.+?)\*\*|(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])|\[\[(.+?)\]\]/gs

function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = []
  let last = 0
  let i = 0
  for (const m of text.matchAll(INLINE)) {
    if (m.index! > last) out.push(text.slice(last, m.index))
    const k = `${keyBase}-${i++}`
    if (m[1] !== undefined) out.push(<Tex key={k}>{m[1]}</Tex>)
    else if (m[2] !== undefined) out.push(<Tex key={k} display>{m[2]}</Tex>)
    else if (m[3] !== undefined) out.push(<strong key={k}>{inline(m[3], k)}</strong>)
    else if (m[4] !== undefined) out.push(<em key={k}>{inline(m[4], k)}</em>)
    else if (m[5] !== undefined) out.push(m[5] === 'GEN' ? <GeneralBadge key={k} /> : <Cite key={k} tag={m[5]} />)
    last = m.index! + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

function table(lines: string[], key: string) {
  const rows = lines
    .filter((l) => !/^\|\s*-/.test(l))
    .map((l) =>
      l
        .replace(/^\||\|$/g, '')
        .split('|')
        .map((c) => c.trim()),
    )
  const [head, ...body] = rows
  return (
    <div key={key} className="overflow-x-auto my-3">
      <table className="data-table">
        <thead>
          <tr>
            {head.map((c, i) => (
              <th key={i}>{inline(c, `${key}h${i}`)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((r, ri) => (
            <tr key={ri}>
              {r.map((c, ci) => (
                <td key={ci}>{inline(c, `${key}r${ri}c${ci}`)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Render the site's mini-markup (see content/types.ts). */
export function Rich({ children, className = '' }: { children: string; className?: string }) {
  const nodes = useMemo(() => {
    const blocks = children.trim().split(/\n\s*\n/)
    return blocks.map((b, bi) => {
      const lines = b.split('\n').map((l) => l.trimEnd())
      const key = `b${bi}`
      if (lines.every((l) => l.trim().startsWith('|'))) return table(lines.map((l) => l.trim()), key)
      if (lines.every((l) => /^\s*- /.test(l)))
        return (
          <ul key={key} className="list-disc pl-6 space-y-1 my-2">
            {lines.map((l, li) => (
              <li key={li}>{inline(l.replace(/^\s*- /, ''), `${key}-${li}`)}</li>
            ))}
          </ul>
        )
      if (lines.every((l) => /^\s*\d+\. /.test(l)))
        return (
          <ol key={key} className="list-decimal pl-6 space-y-1 my-2">
            {lines.map((l, li) => (
              <li key={li}>{inline(l.replace(/^\s*\d+\. /, ''), `${key}-${li}`)}</li>
            ))}
          </ol>
        )
      if (lines[0].startsWith('> '))
        return (
          <div key={key} className="callout">
            {inline(lines.map((l) => l.replace(/^> ?/, '')).join(' '), key)}
          </div>
        )
      const joined = lines.join(' ').trim()
      if (/^\\\[.*\\\]$/s.test(joined)) return <Fragment key={key}>{inline(joined, key)}</Fragment>
      return (
        <p key={key} className="my-2">
          {inline(joined, key)}
        </p>
      )
    })
  }, [children])
  return <div className={`rich ${className}`}>{nodes}</div>
}

/** Inline-only rich text (no paragraphs), for labels and options. */
export function RichInline({ children }: { children: string }) {
  return <>{inline(children, 'i')}</>
}

/** Pre-sanitized HTML from the professor's quizzes (built by scripts/parse_quizzes.py). */
export function QuizHtml({ html, className = '' }: { html: string; className?: string }) {
  return <div className={`rich quiz-html ${className}`} dangerouslySetInnerHTML={{ __html: html }} />
}
