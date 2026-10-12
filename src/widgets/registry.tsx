import { lazy, Suspense, type ComponentType } from 'react'

/** Widgets are looked up by id from session content. Lazy so each module only loads its own. */
const registry: Record<string, React.LazyExoticComponent<ComponentType>> = {
  'elasticity-explorer': lazy(() => import('./ElasticityExplorer')),
  'revenue-drill': lazy(() => import('./RevenueDrill')),
  'cpe-classifier': lazy(() => import('./CpeClassifier')),
  'profit-max-lab': lazy(() => import('./ProfitMaxLab')),
  'regression-output': lazy(() => import('./RegressionOutput')),
  'sse-dragger': lazy(() => import('./SseDragger')),
  'interpret-drill': lazy(() => import('./InterpretDrill')),
  'wtp-builder': lazy(() => import('./WtpBuilder')),
  'cs-slider': lazy(() => import('./CsSlider')),
  'shift-sim': lazy(() => import('./ShiftSim')),
}

export function Widget({ id }: { id: string }) {
  const C = registry[id]
  if (!C) return <p className="muted">Widget “{id}” is coming in a later build.</p>
  return (
    <Suspense fallback={<p className="muted">Loading interactive…</p>}>
      <C />
    </Suspense>
  )
}

export const widgetIds = Object.keys(registry)
