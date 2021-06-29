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
  confettiNumber?: number,
  confettiColors?: string[],

  // emojis could be used as confetti
  // confettiColors will be ignored if emojis array provided
  emojis?: string[],
  emojiSize?: number,
  
  // @deprecated: wrong plural forms were used
  emojies?: string[],
  confettiesNumber?: number,
}

type INormalizedAddConfettiConfig = Required<Omit<IAddConfettiConfig, 'emojies' | 'confettiesNumber'>>

export {
  IPosition,
  IRadius,
  ISpeed,
  TConfettiDirection,
  IAddConfettiConfig,
  INormalizedAddConfettiConfig,
}
