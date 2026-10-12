import data from '../../../content/strat401/content-map.json'
import type { MapSession, SessionId } from './types'

export const SESSIONS = (data as { sessions: MapSession[] }).sessions
export const mapById = Object.fromEntries(SESSIONS.map((s) => [s.id, s])) as Record<SessionId, MapSession>

/** The course's own map, as each brief describes it. */
export const COURSE_MAP: { title: string; blurb: string; ids: SessionId[] }[] = [
  { title: 'Frame: generic strategy', blurb: 'Two kinds of advantage, two scopes — the frame around everything.', ids: ['S01'] },
  { title: 'Communicate: structured reasoning', blurb: 'How every answer in this course gets argued.', ids: ['S02'] },
  { title: 'Where profit lives: industry & environment', blurb: 'Is this game worth winning — and who takes the value?', ids: ['S03', 'S04', 'S05'] },
  { title: 'What the firm brings: resources', blurb: 'Why two firms in one industry earn differently.', ids: ['S06'] },
  { title: 'How it wins: cost', blurb: 'Structure, scale and learning.', ids: ['S07', 'S08'] },
  { title: 'How it wins: differentiation', blurb: 'Raising what buyers will pay by more than it costs.', ids: ['S09', 'S10'] },
  { title: 'How it wins: both', blurb: 'Dual advantage and the hybrid objection.', ids: ['S11'] },
]
