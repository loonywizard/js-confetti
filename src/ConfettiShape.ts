import { IPosition, IRadius, ISpeed } from './types'
import { generateRandomNumber } from './generateRandomNumber'
import { generateRandomRGBColor } from './generateRandomRGBColor'


const FREE_FALLING_OBJECT_ACCELERATION = 0.00125
const DRAG_FORCE_COEFFICIENT = 0.0008
const ROTATION_SLOWDOWN_ACCELERATION = 0.00001

class ConfettiShape {
  speed: ISpeed
  rotationSpeed: number

  radius: IRadius

  angle: number
  
  initialPosition: IPosition
  currentPosition: IPosition
  
  color: string

  radiusYUpdateDirection: 'up' | 'down'

  createdAt: number
  
  direction: 'left' | 'right'

  constructor(initialPosition: IPosition, direction: 'left' | 'right') {
    const initialSpeed = 0.2 * generateRandomNumber(500, 900) / 100
    
    this.speed = {
      x: initialSpeed,
      y: initialSpeed,
    }

    this.rotationSpeed = 0.01 * generateRandomNumber(3, 10)

    this.radius = {
      x: 10, y: 10
    }

    this.radiusYUpdateDirection = 'down'
    this.angle = direction === 'left' 
      ? generateRandomNumber(82, 15) * Math.PI / 180
      : generateRandomNumber(-15, -82) * Math.PI / 180

    const positionShift = generateRandomNumber(-150, 0)

    const shiftedInitialPosition = {
      x: initialPosition.x + (direction === 'right' ? positionShift : -positionShift) * Math.abs(Math.cos(this.angle)),
      y: initialPosition.y - positionShift * Math.abs(Math.sin(this.angle)),
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
      speed, 
      angle, 
      radiusYUpdateDirection, 
      rotationSpeed,
      createdAt,
      direction,
    } = this

    const timeDeltaSinceCreation = currentTime - createdAt
    this.rotationSpeed -= ROTATION_SLOWDOWN_ACCELERATION * iterationTimeDelta

    if (this.rotationSpeed < 0) this.rotationSpeed = 0
    
    // Do not update speed while confetti is invisible
    const needUpdateSpeed = (
      direction === 'left' ? this.currentPosition.x >= 0 : this.currentPosition.x <= canvasWidth
    )
    
    if (needUpdateSpeed && speed.x > 0.0001) this.speed.x -= DRAG_FORCE_COEFFICIENT * iterationTimeDelta
    this.currentPosition.x += speed.x * (direction === 'right' ? Math.abs(Math.cos(angle)) : -Math.abs(Math.cos(angle))) * iterationTimeDelta

    this.currentPosition.y = (
      this.initialPosition.y
      - speed.y * Math.abs(Math.sin(angle)) * timeDeltaSinceCreation
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
      if (this.radius.y >= 10) {
        this.radius.y = 10
        this.radiusYUpdateDirection = 'down'
      }
    }
  }

  getIsVisibleOnCanvas(canvasHeight: number): boolean {
    return this.currentPosition.y < canvasHeight + 100
  }
}

export { ConfettiShape }
