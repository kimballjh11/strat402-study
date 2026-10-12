import { ProblemCard } from '../components/ProblemCard'
import { generatorById } from '../content'

/** Fresh fake dataset → real OLS output → questions on signs, significance, R², forecasts, elasticity. */
export default function InterpretDrill() {
  return <ProblemCard gen={generatorById['s09-interpret']} />
}
