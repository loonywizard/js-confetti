import { IAddConfettiConfig } from './types'
import {
  INITIAL_SHAPE_RADIUS,
  DEFAULT_CONFETTIES_NUMBER,
  DEFAULT_CONFETTI_COLORS,
} from './consts'

function normalizeConfettiConfig(confettiConfig: IAddConfettiConfig): Required<IAddConfettiConfig> {
  const {
    // TODO: refactor these constants!
    confettiRadius = confettiConfig.emojies ? 80 : INITIAL_SHAPE_RADIUS,
    confettiesNumber = confettiConfig.emojies ? 80 : DEFAULT_CONFETTIES_NUMBER,
    confettiColors = DEFAULT_CONFETTI_COLORS,
    emojies = [],
  } = confettiConfig

  return { confettiRadius, confettiesNumber, confettiColors, emojies }
} 

export { normalizeConfettiConfig }
