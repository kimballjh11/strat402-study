import { S01 } from './modules/S01'
import { S02 } from './modules/S02'
import { S03 } from './modules/S03'
import { S04 } from './modules/S04'
import { S05 } from './modules/S05'
import { S07 } from './modules/S07'
import type { ModuleDef, SessionId } from './types'

export const MODULES: Partial<Record<SessionId, ModuleDef>> = { S01, S02, S03, S04, S05, S07 }
export const allBank = () => Object.values(MODULES).flatMap((m) => m!.bank)
