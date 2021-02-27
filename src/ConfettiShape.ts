import { IPosition, IRadius } from './types'
import { generateRandomNumber } from './generateRandomNumber'
import { generateRandomRGBColor } from './generateRandomRGBColor'


const FREE_FALLING_OBJECT_ACCELERATION = 0.0006

class ConfettiShape {
  initialSpeed: number
  rotationSpeed: number

  radius: IRadius

  angle: number
  
  currentPosition: IPosition
  initialPosition: IPosition
  
  color: string

  radiusYUpdateDirection: 'up' | 'down'

  createdAt: number

  constructor(position: IPosition, direction: 'left' | 'right') {
    this.initialSpeed = 0.1 * generateRandomNumber(500, 900) / 100

    this.rotationSpeed = 0.0001 * generateRandomNumber(3, 10)

    this.radius = {
      x: 10, y: 10
    }

    this.radiusYUpdateDirection = 'down'
    this.angle = direction === 'left' 
      ? generateRandomNumber(-140, 0) * Math.PI / 180
      : generateRandomNumber(0, -140) * Math.PI / 180

    this.currentPosition = { ...position }
    this.initialPosition = { ...position }
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

  updatePosition(currentTime: number): void {
    const { 
      initialSpeed, 
      initialPosition,
      angle, 
      radiusYUpdateDirection, 
      rotationSpeed,
      createdAt, 
    } = this

    const timeDelta = currentTime - createdAt
    
    this.currentPosition.x = (
      initialPosition.x
      + initialSpeed * Math.cos(angle) * timeDelta
    )
    this.currentPosition.y = (
      initialPosition.y 
      + initialSpeed * Math.sin(angle) * timeDelta
      + FREE_FALLING_OBJECT_ACCELERATION * (timeDelta ** 2) / 2
    )

    if (radiusYUpdateDirection === 'down') {
      this.radius.y -= timeDelta * rotationSpeed
      if (this.radius.y <= 0) {
        this.radius.y = 0
        this.radiusYUpdateDirection = 'up'
      }
    } else {
      this.radius.y += timeDelta * rotationSpeed
      if (this.radius.y >= 10) {
        this.radius.y = 10
        this.radiusYUpdateDirection = 'down'
      }
    }
  }
}

export { ConfettiShape }
