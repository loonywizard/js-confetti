import { IPosition, IRadius, ISpeed, TConfettiDirection } from './types'
import { generateRandomNumber } from './generateRandomNumber'
import { generateRandomRGBColor } from './generateRandomRGBColor'
import {
  FREE_FALLING_OBJECT_ACCELERATION,
  DRAG_FORCE_COEFFICIENT,
  ROTATION_SLOWDOWN_ACCELERATION,

  MIN_INITIAL_CONFETTI_SPEED,
  MAX_INITIAL_CONFETTI_SPEED,

  MIN_INITIAL_ROTATION_SPEED,
  MAX_INITIAL_ROTATION_SPEED,

  MIN_CONFETTI_ANGLE,
  MAX_CONFETTI_ANGLE,

  MAX_CONFETTI_POSITION_SHIFT,

  SHAPE_VISIBILITY_TRESHOLD,
} from './consts'


// For wide screens - fast confetties, for small screens - slow confetties
function getWindowWidthCoefficient() {
  const HD_SCREEN_WIDTH = 1920

  return Math.log(window.innerWidth) / Math.log(HD_SCREEN_WIDTH)
}

interface TConstructorArgs {
  initialPosition: IPosition, 
  direction: TConfettiDirection,
  confettiRadius: number
}

class ConfettiShape {
  private confettiSpeed: ISpeed
  private rotationSpeed: number

  private radius: IRadius
  private readonly initialRadius: number
  
  // We can calculate absolute cos and sin at shape init
  private readonly absCos: number
  private readonly absSin: number
  
  private initialPosition: IPosition
  private currentPosition: IPosition
  
  private readonly color: string

  private radiusYUpdateDirection: 'up' | 'down'

  private readonly createdAt: number
  
  private readonly direction: TConfettiDirection

  constructor({ initialPosition, direction, confettiRadius }: TConstructorArgs) {
    const randomConfettiSpeed = generateRandomNumber(MIN_INITIAL_CONFETTI_SPEED, MAX_INITIAL_CONFETTI_SPEED, 3)
    const initialSpeed = randomConfettiSpeed * getWindowWidthCoefficient()
    
    this.confettiSpeed = {
      x: initialSpeed,
      y: initialSpeed,
    }

    this.rotationSpeed = generateRandomNumber(MIN_INITIAL_ROTATION_SPEED, MAX_INITIAL_ROTATION_SPEED, 3)

    this.radius = {
      x: confettiRadius, y: confettiRadius
    }
    this.initialRadius = confettiRadius

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
      
      if (this.radius.y >= this.initialRadius) {
        this.radius.y = this.initialRadius
        this.radiusYUpdateDirection = 'down'
      }
    }
  }

  getIsVisibleOnCanvas(canvasHeight: number): boolean {
    return this.currentPosition.y < canvasHeight + SHAPE_VISIBILITY_TRESHOLD
  }
}

export { ConfettiShape }
