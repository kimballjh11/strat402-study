import { useState } from 'react'

/** Explain where a source tag lives in Kimball's materials. */
export function describeSource(tag: string): string {
  const t = tag.trim()
  const deck: Record<string, string> = {
    S01: 'Course Introduction',
    S03: 'Industry Structure',
    S04: 'Industry Analysis',
    S05: 'Math & Excel Review',
    S06: 'Cost & Economies of Scale',
    S07: 'Demand & Consumer Surplus',
    S08: 'Elasticity & Price Discrimination',
    S09: 'Forecasting Demand Using Linear Regression',
    S10: 'Profit Maximization Across Market Structures',
  }
  let m = t.match(/^(S\d\d) (video )?slides?/i)
  if (m) {
    if (m[2]) return 'Canvas › Session 6 › Watch: Economic Costs (S06 Video Slides - Economic Costs.pptx)'
    return `Canvas › Class Materials › ${m[1]} Slides - ${deck[m[1]] ?? ''}.pdf`
  }
  m = t.match(/^(S\d\d) workbook/i)
  if (m) return `Canvas › ${m[1]} In-Class Exercise workbook (.xlsx). Cell references point to the Solution tab unless noted.`
  if (/^CQ\d/i.test(t)) return 'Your Comprehension Quiz results page on Canvas (professor’s answer and feedback, verbatim).'
  if (/Math Review/i.test(t)) return 'Canvas › Session 5 › Read: STRAT 402 Math Review (PDF by Prof. Lewis).'
  if (/Practice Problems|Optional Practice/i.test(t)) return 'Canvas › Session 5 › Optional Practice: Math Review Problems (PDF).'
  if (/HSIA/i.test(t)) return 'Canvas › Session 6 › HSIA Wars: iBahn and Guest-Tek (case PDF).'
  if (/S04 Solution/i.test(t)) return 'Canvas › Session 4 › Solution: Industry Analysis (Five Forces Tool, self-storage).'
  if (/Five Forces Tool/i.test(t)) return 'Canvas › In-Class Exercises › Five Forces Strategy Excel Tool 3.1.'
  if (/your|Kimball/i.test(t)) return 'Your own submitted spreadsheet — your work, not an official answer key. Numbers recomputed by this site.'
  if (/course-data|module page|Canvas/i.test(t)) return 'Canvas module page (learning objectives and instructions).'
  if (/B&P/i.test(t)) return 'Baye & Prince, Managerial Economics and Business Strategy (topic reference; textbook not provided).'
  if (/GENERAL|General econ/i.test(t)) return 'Standard managerial economics — not from Prof. Lewis’s materials. Will be replaced if course materials cover it.'
  return 'STRAT 402 course materials.'
}

export function Cite({ tag }: { tag: string }) {
  const [open, setOpen] = useState(false)
  return (
    <span className="cite-wrap">
      <button
        type="button"
        className="cite"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation()
          setOpen((o) => !o)
        }}
        title="Show source"
      >
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

export function GeneralBadge() {
  return (
    <span className="gen-badge" title="Standard managerial economics, not from the professor's materials">
      General econ (not from course materials)
    </span>
  )
}
