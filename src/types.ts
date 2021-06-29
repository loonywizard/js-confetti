interface I2DCoordinates {
  x: number,
  y: number,
}

type IPosition = I2DCoordinates

type IRadius = I2DCoordinates

type ISpeed = I2DCoordinates

// Direction, in which confetti is moving
type TConfettiDirection = 'left' | 'right'

interface IAddConfettiConfig {
  confettiRadius?: number,
  confettiesNumber?: number,
  confettiColors?: string[],

  // emojis could be used as confetties
  // confettiColors will be ignored if emojis array provided
  emojis?: string[],
  emojiSize?: number,
  
  // @deprecated: wrong plural forms were used
  emojies?: string[],
}

type INormalizedAddConfettiConfig = Required<Omit<IAddConfettiConfig, 'emojies'>>

export {
  IPosition,
  IRadius,
  ISpeed,
  TConfettiDirection,
  IAddConfettiConfig,
  INormalizedAddConfettiConfig,
}
