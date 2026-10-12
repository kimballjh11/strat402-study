import { S07 } from './modules/S07'
import type { ModuleDef, SessionId } from './types'

export const MODULES: Partial<Record<SessionId, ModuleDef>> = { S07 }
export const allBank = () => Object.values(MODULES).flatMap((m) => m!.bank)
