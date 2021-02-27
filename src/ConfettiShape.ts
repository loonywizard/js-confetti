import { IPosition, IRadius, ISpeed } from './types'
import { generateRandomNumber } from './generateRandomNumber'
import { generateRandomRGBColor } from './generateRandomRGBColor'


const FREE_FALLING_OBJECT_ACCELERATION = 0.0006
const DRAG_FORCE_COEFFICIENT = 0.00025

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

  constructor(initialPosition: IPosition, direction: 'left' | 'right') {
    const initialSpeed = 0.1 * generateRandomNumber(500, 900) / 100
    
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
      ? generateRandomNumber(-140, 0) * Math.PI / 180
      : generateRandomNumber(0, -140) * Math.PI / 180

    this.currentPosition = { ...initialPosition }
    this.initialPosition = { ...initialPosition }

    this.color = generateRandomRGBColor()

    this.createdAt = new Date().getTime()
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

  updatePosition(iterationTimeDelta: number, currentTime: number): void {
    const { 
      speed, 
      angle, 
      radiusYUpdateDirection, 
      rotationSpeed,
      createdAt,
    } = this

    const timeDeltaSinceCreation = currentTime - createdAt
    
    if (speed.x > 0.0001) this.speed.x -= DRAG_FORCE_COEFFICIENT * iterationTimeDelta
    this.currentPosition.x += speed.x * Math.cos(angle) * iterationTimeDelta

    this.currentPosition.y = (
      this.initialPosition.y
      + speed.y * Math.sin(angle) * timeDeltaSinceCreation
      + FREE_FALLING_OBJECT_ACCELERATION * (timeDeltaSinceCreation ** 2) / 2
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
}

export { ConfettiShape }
