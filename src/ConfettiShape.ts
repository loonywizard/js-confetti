import { IPosition, ISpeed, IRadius } from './types'
import { generateRandomNumber } from './generateRandomNumber'
import { generateRandomRGBColor } from './generateRandomRGBColor'


class ConfettiShape {
  speed: ISpeed
  rotationSpeed: number

  radius: IRadius

  angle: number
  position: IPosition
  color: string

  radiusYUpdateDirection: 'up' | 'down'

  constructor(position: IPosition, direction: 'left' | 'right') {
    this.speed = {
      x: 0.1 * generateRandomNumber(500, 900) / 100,
      y: 0.1 * generateRandomNumber(500, 900) / 100,
    }

    this.rotationSpeed = 0.1 * generateRandomNumber(20, 1000) / 100

    this.radius = {
      x: 10, y: 10
    }

    this.radiusYUpdateDirection = 'down'
    this.angle = direction === 'left' 
      ? generateRandomNumber(-140, 0) * Math.PI / 180
      : generateRandomNumber(0, -140) * Math.PI / 180
      
    this.position = { ...position }
    this.color = generateRandomRGBColor()
  }

  draw(canvasContext: CanvasRenderingContext2D): void {
    const { position, radius, color } = this
    const dpr = window.devicePixelRatio

    canvasContext.fillStyle = color
    
    canvasContext.beginPath()

    canvasContext.ellipse(
      position.x * dpr, position.y * dpr, radius.x * dpr, radius.y * dpr,
      0, 0, 2 * Math.PI,
    )
    canvasContext.fill()
  }

  updatePosition(timeDelta: number): void {
    const { speed, angle, radiusYUpdateDirection, rotationSpeed } = this
    
    this.position.x += Math.cos(angle) * timeDelta * speed.x
    this.position.y += Math.sin(angle) * timeDelta * speed.y

    if (radiusYUpdateDirection === 'down') {
      this.radius.y -= timeDelta * rotationSpeed * 0.1
      if (this.radius.y <= 0) {
        this.radius.y = 0
        this.radiusYUpdateDirection = 'up'
      }
    } else {
      this.radius.y += timeDelta * rotationSpeed * 0.1
      if (this.radius.y >= 10) {
        this.radius.y = 10
        this.radiusYUpdateDirection = 'down'
      }
    }

    this.speed.y -= 0.0005 * timeDelta
  }
}

export { ConfettiShape }
