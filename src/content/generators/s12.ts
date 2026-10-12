import { num } from '../../lib/format'
import { Rng } from '../../lib/rng'
import type { Generator } from '../types'

const r = String.raw

/** Participation score × project score (Group Project Instructions, Evaluation). */
export const pointsGen: Generator = {
  id: 's12-points',
  session: 'S12',
  los: ['S12-LO3'],
  title: 'Group project points and the participation score',
  skill: 'Participation = actual % ÷ ideal % (100%/group size); grade = participation × (Prova + analysis + checkpoints + showcase)',
  screen: 'widgets',
  make(seed) {
    const g = new Rng(seed)
    const n = g.pick([4, 5, 6])
    const ideal = 100 / n
    const actual = Number((ideal * g.pick([0.5, 0.75, 0.9, 1, 1])).toFixed(1))
    const prova = g.int(36, 50)
    const analysis = g.int(28, 40)
    const cps = 2 * g.int(3, 4)
    const show = g.pick([0, 2, 2])
    const project = prova + analysis + cps + show
    const part = Math.min(1, actual / ideal)
    return {
      title: 'Project points',
      prompt: `In a group of **${n}**, your teammates say on average you did **${actual}%** of the work. The group earned Prova ${prova}/50, analysis ${analysis}/40, ${cps / 2} of 4 checkpoints on time, and you ${show ? 'attended' : 'missed (no notice by the CP2 deadline)'} the showcase.`,
      parts: [
        { type: 'num', label: 'Ideal % of workload', answer: ideal / 100, kind: 'percent', tol: 0.005 },
        { type: 'num', label: 'Project score (out of 100)', answer: project, tol: 0.001 },
        { type: 'num', label: 'Your participation score', answer: part, kind: 'percent', tol: 0.01 },
        { type: 'num', label: 'Your group project grade (points)', answer: part * project, tol: 0.01 },
      ],
      steps: [
        r`Ideal share = 100% ÷ ${n} = ${num(ideal, 1)}%. Participation = ${actual}% ÷ ${num(ideal, 1)}% = ${num(part * 100, 1)}%. [[Group Project Instructions page]]`,
        r`Project score = Prova ${prova} + analysis ${analysis} + checkpoints ${cps} (2 each) + showcase ${show} = ${project}.`,
        r`Grade = ${num(part * 100, 1)}% × ${project} = ${num(part * project, 1)} points.`,
      ],
      src: 'Group Project Instructions page',
    }
  },
}

export const s12Generators = [pointsGen]
