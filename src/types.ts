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

  // emojies could be used as confetties
  // confettiColors will be ignored if emojies array provided
  emojies?: string[],
}

export { IPosition, IRadius, ISpeed, TConfettiDirection, IAddConfettiConfig }
