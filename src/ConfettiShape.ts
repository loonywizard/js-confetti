import { IPosition, IRadius, ISpeed, TConfettiDirection } from './types'
import { generateRandomNumber } from './generateRandomNumber'
import { generateRandomRGBColor } from './generateRandomRGBColor'


const FREE_FALLING_OBJECT_ACCELERATION = 0.00125
const DRAG_FORCE_COEFFICIENT = 0.0008
const ROTATION_SLOWDOWN_ACCELERATION = 0.00001

const INITIAL_SHAPE_RADIUS = 10

const MIN_INITIAL_CONFETTI_SPEED = 0.9
const MAX_INITIAL_CONFETTI_SPEED = 1.7

const MIN_INITIAL_ROTATION_SPEED = 0.03
const MAX_INITIAL_ROTATION_SPEED = 0.10

const MIN_CONFETTI_ANGLE = 15
const MAX_CONFETTI_ANGLE = 82

const MAX_CONFETTI_POSITION_SHIFT = 150

const SHAPE_VISIBILITY_TRESHOLD = 100

// For wide screens - fast confetties, for small screens - slow confetties
function getWindowWidthCoefficient() {
  const HD_SCREEN_WIDTH = 1920

  return Math.log(window.innerWidth) / Math.log(HD_SCREEN_WIDTH)
}

class ConfettiShape {
  confettiSpeed: ISpeed
  rotationSpeed: number

  radius: IRadius
  
  // We can calculate absolute cos and sin at shape init
  absCos: number
  absSin: number
  
  initialPosition: IPosition
  currentPosition: IPosition
  
  color: string

  radiusYUpdateDirection: 'up' | 'down'

  createdAt: number
  
  direction: TConfettiDirection

  constructor(initialPosition: IPosition, direction: TConfettiDirection) {
    const randomConfettiSpeed = generateRandomNumber(MIN_INITIAL_CONFETTI_SPEED, MAX_INITIAL_CONFETTI_SPEED, 3)
    const initialSpeed = randomConfettiSpeed * getWindowWidthCoefficient()
    
    this.confettiSpeed = {
      x: initialSpeed,
      y: initialSpeed,
    }

    this.rotationSpeed = generateRandomNumber(MIN_INITIAL_ROTATION_SPEED, MAX_INITIAL_ROTATION_SPEED, 3)

    this.radius = {
      x: INITIAL_SHAPE_RADIUS, y: INITIAL_SHAPE_RADIUS
    }

    this.radiusYUpdateDirection = 'down'
    
    const angle = direction === 'left' 
      ? generateRandomNumber(MAX_CONFETTI_ANGLE, MIN_CONFETTI_ANGLE) * Math.PI / 180
      : generateRandomNumber(-MIN_CONFETTI_ANGLE, -MAX_CONFETTI_ANGLE) * Math.PI / 180

    this.absCos = Math.abs(Math.cos(angle))
    this.absSin = Math.abs(Math.sin(angle))

    const positionShift = generateRandomNumber(-MAX_CONFETTI_POSITION_SHIFT, 0)

    const shiftedInitialPosition = {
      x: initialPosition.x + (direction === 'left' ? -positionShift : positionShift) * this.absCos,
      y: initialPosition.y - positionShift * this.absSin,
    }

    this.currentPosition = { ...shiftedInitialPosition }
    this.initialPosition = { ...shiftedInitialPosition }

    this.color = generateRandomRGBColor()

    this.createdAt = new Date().getTime()
    this.direction = direction
  }

  draw(canvasContext: CanvasRenderingContext2D): void {
    const { currentPosition, radius, color } = this
    const dpr = window.devicePixelRatio

    canvasContext.fillStyle = color
    
    canvasContext.beginPath()

    canvasContext.ellipse(
      currentPosition.x * dpr, currentPosition.y * dpr, radius.x * dpr, radius.y * dpr,
      0, 0, 2 * Math.PI,
    )
    canvasContext.fill()
  }

  updatePosition(iterationTimeDelta: number, currentTime: number, canvasWidth: number): void {
    const { 
      confettiSpeed, 
      radiusYUpdateDirection, 
      rotationSpeed,
      createdAt,
      direction,
    } = this

    const timeDeltaSinceCreation = currentTime - createdAt
    this.rotationSpeed -= ROTATION_SLOWDOWN_ACCELERATION * iterationTimeDelta

    if (this.rotationSpeed < 0) this.rotationSpeed = 0
    
    // Do not update confettiSpeed while confetti is invisible
    const needUpdateSpeed = (
      direction === 'left' ? this.currentPosition.x >= 0 : this.currentPosition.x <= canvasWidth
    )
    
    if (needUpdateSpeed && confettiSpeed.x > 0.0001) this.confettiSpeed.x -= DRAG_FORCE_COEFFICIENT * iterationTimeDelta
    
    this.currentPosition.x += confettiSpeed.x * (direction === 'left' ? -this.absCos : this.absCos) * iterationTimeDelta

    this.currentPosition.y = (
      this.initialPosition.y
      - confettiSpeed.y * this.absSin * timeDeltaSinceCreation
      + (needUpdateSpeed ? FREE_FALLING_OBJECT_ACCELERATION * (timeDeltaSinceCreation ** 2) / 2 : 0)
    )

    if (radiusYUpdateDirection === 'down') {
      this.radius.y -= iterationTimeDelta * rotationSpeed
      
      if (this.radius.y <= 0) {
        this.radius.y = 0
        this.radiusYUpdateDirection = 'up'
      }
    } else {
      this.radius.y += iterationTimeDelta * rotationSpeed
      
      if (this.radius.y >= INITIAL_SHAPE_RADIUS) {
        this.radius.y = INITIAL_SHAPE_RADIUS
        this.radiusYUpdateDirection = 'down'
      }
    }
  }

  getIsVisibleOnCanvas(canvasHeight: number): boolean {
    return this.currentPosition.y < canvasHeight + SHAPE_VISIBILITY_TRESHOLD
  }
}

export { ConfettiShape }
