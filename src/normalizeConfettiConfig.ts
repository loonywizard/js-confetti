import { TAddConfettiConfig } from './types'
import { INITIAL_SHAPE_RADIUS, DEFAULT_CONFETTIES_NUMBER } from './consts'

function normalizeConfettiConfig(confettiConfig: TAddConfettiConfig): Required<TAddConfettiConfig> {
  const {
    confettiRadius = INITIAL_SHAPE_RADIUS,
    confettiesNumber = DEFAULT_CONFETTIES_NUMBER,
  } = confettiConfig

  return { confettiRadius, confettiesNumber }
} 

export { normalizeConfettiConfig }
