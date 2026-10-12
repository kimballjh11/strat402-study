import { useState } from 'react'
import { Cite } from '../components/Cite'
import { num } from '../lib/format'

/** Group project points × participation score. */
export default function PointsCalc() {
  const [prova, setProva] = useState(44)
  const [analysis, setAnalysis] = useState(34)
  const [cps, setCps] = useState(4)
  const [show, setShow] = useState(true)
  const [n, setN] = useState(5)
  const [actual, setActual] = useState(20)
  const ideal = 100 / n
  const part = Math.min(1, actual / ideal)
  const project = prova + analysis + 2 * cps + (show ? 2 : 0)
  const S = ({ label, v, set, max, step = 1 }: { label: string; v: number; set: (n: number) => void; max: number; step?: number }) => (
    <label className="flex flex-col gap-1 text-sm font-medium">
      {label}: {v}
      <input type="range" min={0} max={max} step={step} value={v} onChange={(e) => set(Number(e.target.value))} />
    </label>
  )
  return (
    <div className="space-y-3" data-testid="points-calc">
      <div className="grid sm:grid-cols-3 gap-3">
        <S label="Prova (of 50)" v={prova} set={setProva} max={50} />
        <S label="Analysis (of 40)" v={analysis} set={setAnalysis} max={40} />
        <S label="Checkpoints on time (of 4)" v={cps} set={setCps} max={4} />
        <S label="Group size" v={n} set={(x) => setN(Math.max(2, x))} max={7} />
        <S label="Your share of the work (%)" v={actual} set={setActual} max={60} step={0.5} />
        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" className="size-4" checked={show} onChange={(e) => setShow(e.target.checked)} /> Attended showcase (+2)
        </label>
      </div>
      <div className="grid grid-cols-3 gap-2 text-sm" aria-live="polite">
        <div className="rounded-xl border line px-3 py-2">
          <div className="text-xs muted">Project score</div>
          <div className="text-xl font-bold">{project}/100</div>
        </div>
        <div className="rounded-xl border line px-3 py-2">
          <div className="text-xs muted">Participation ({num(actual, 1)}% ÷ {num(ideal, 1)}%)</div>
          <div className="text-xl font-bold">{num(part * 100, 0)}%</div>
        </div>
        <div className="rounded-xl border line px-3 py-2">
          <div className="text-xs muted">Your grade</div>
          <div className="text-xl font-bold">{num(part * project, 1)}</div>
        </div>
      </div>
      <p className="text-xs muted">
        The participation score ranges from 0 to 100% (capped). <Cite tag="Group Project Instructions page" />
      </p>
    </div>
  )
}
