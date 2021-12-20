import { IAddConfettiConfig, INormalizedAddConfettiConfig } from './types'
import {
  INITIAL_SHAPE_RADIUS,
  INITIAL_EMOJI_SIZE,

  DEFAULT_CONFETTI_NUMBER,
  DEFAULT_EMOJIS_NUMBER,
  DEFAULT_CONFETTI_COLORS,
} from './consts'

function normalizeConfettiConfig(confettiConfig: IAddConfettiConfig): INormalizedAddConfettiConfig {
  const {
    confettiRadius = INITIAL_SHAPE_RADIUS,
    confettiNumber = confettiConfig.confettiesNumber || (confettiConfig.emojis ? DEFAULT_EMOJIS_NUMBER : DEFAULT_CONFETTI_NUMBER),
    confettiColors = DEFAULT_CONFETTI_COLORS,

    emojis = confettiConfig.emojies || [],
    emojiSize = INITIAL_EMOJI_SIZE,
  } = confettiConfig

  // deprecate wrong plural forms, used in early releases
  if (confettiConfig.emojies) console.error(`emojies argument is deprecated, please use emojis instead`)
  if (confettiConfig.confettiesNumber) console.error(`confettiesNumber argument is deprecated, please use confettiNumber instead`)

  return { confettiRadius, confettiNumber, confettiColors, emojis, emojiSize }
}

export { normalizeConfettiConfig }
