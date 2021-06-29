import { IAddConfettiConfig, INormalizedAddConfettiConfig } from './types'
import {
  INITIAL_SHAPE_RADIUS,
  INITIAL_EMOJI_SIZE,

  DEFAULT_CONFETTIES_NUMBER,
  DEFAULT_EMOJIS_NUMBER,
  DEFAULT_CONFETTI_COLORS,
} from './consts'

function normalizeConfettiConfig(confettiConfig: IAddConfettiConfig): INormalizedAddConfettiConfig {
  const {
    confettiRadius = INITIAL_SHAPE_RADIUS,
    confettiesNumber = confettiConfig.emojies ? DEFAULT_EMOJIS_NUMBER : DEFAULT_CONFETTIES_NUMBER,
    confettiColors = DEFAULT_CONFETTI_COLORS,

    emojis = confettiConfig.emojies || [],
    emojiSize = INITIAL_EMOJI_SIZE,
  } = confettiConfig

  // deprecate wrong plural forms, used in early releases
  if (confettiConfig.emojies) console.error(`emojies argument is deprecated, please use emojis instead`)

  return { confettiRadius, confettiesNumber, confettiColors, emojis, emojiSize }
} 

export { normalizeConfettiConfig }
