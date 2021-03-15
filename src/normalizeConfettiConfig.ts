import { TAddConfettiConfig } from './types'
import {
  INITIAL_SHAPE_RADIUS,
  DEFAULT_CONFETTIES_NUMBER,
  DEFAULT_CONFETTI_COLORS,
} from './consts'

function normalizeConfettiConfig(confettiConfig: TAddConfettiConfig): Required<TAddConfettiConfig> {
  const {
    confettiRadius = INITIAL_SHAPE_RADIUS,
    confettiesNumber = DEFAULT_CONFETTIES_NUMBER,
    confettiColors = DEFAULT_CONFETTI_COLORS,
  } = confettiConfig

  return { confettiRadius, confettiesNumber, confettiColors }
} 

export { normalizeConfettiConfig }
