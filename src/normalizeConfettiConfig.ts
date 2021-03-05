import { TAddConfettiConfig } from './types'
import { INITIAL_SHAPE_RADIUS } from './consts'

function normalizeConfettiConfig(confettiConfig: TAddConfettiConfig): Required<TAddConfettiConfig> {
  const { confettiRadius = INITIAL_SHAPE_RADIUS } = confettiConfig

  return {
    confettiRadius
  }
} 

export { normalizeConfettiConfig }
