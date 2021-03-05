interface I2DCoordinates {
  x: number,
  y: number,
}

type IPosition = I2DCoordinates

type IRadius = I2DCoordinates

type ISpeed = I2DCoordinates

// Direction, in which confetti is moving
type TConfettiDirection = 'left' | 'right'

interface TAddConfettiConfig {
  confettiRadius?: number,
  confettiesNumber?: number,
}

export { IPosition, IRadius, ISpeed, TConfettiDirection, TAddConfettiConfig }
