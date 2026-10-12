import { S01 } from './modules/S01'
import { S02 } from './modules/S02'
import { S03 } from './modules/S03'
import { S04 } from './modules/S04'
import { S05 } from './modules/S05'
import { S06 } from './modules/S06'
import { S07 } from './modules/S07'
import { S08 } from './modules/S08'
import { S09 } from './modules/S09'
import { S10 } from './modules/S10'
import { S11 } from './modules/S11'
import type { ModuleDef, SessionId } from './types'

export const MODULES: Partial<Record<SessionId, ModuleDef>> = { S01, S02, S03, S04, S05, S06, S07, S08, S09, S10, S11 }
export const allBank = () => Object.values(MODULES).flatMap((m) => m!.bank)
