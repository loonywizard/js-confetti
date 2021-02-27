import { IPosition } from './types'
import { generateRandomNumber } from './generateRandomNumber'
import { generateRandomRGBColor } from './generateRandomRGBColor'


class ConfettiShape {
  speedX: number
  speedY: number
  rotationSpeed: number

  radiusX: number
  radiusY: number
  angle: number
  position: IPosition
  color: string

  radiusYUpdateDirection: 'up' | 'down'

  constructor(position: IPosition, direction: 'left' | 'right') {
    this.speedX = 0.1 * generateRandomNumber(500, 900) / 100
    this.speedY = 0.1 * generateRandomNumber(500, 900) / 100
    this.rotationSpeed = 0.1 * generateRandomNumber(20, 1000) / 100
    this.radiusX = 10
    this.radiusY = 10
    this.radiusYUpdateDirection = 'down'
    this.angle = direction === 'left' 
      ? generateRandomNumber(-140, 0) * Math.PI / 180
      : generateRandomNumber(0, -140) * Math.PI / 180
    this.position = { ...position }
    this.color = generateRandomRGBColor()
  }

  draw(canvasContext: CanvasRenderingContext2D): void {
    const { position, radiusX, radiusY, color } = this
    const dpr = window.devicePixelRatio

    canvasContext.fillStyle = color
    
    canvasContext.beginPath()

    canvasContext.ellipse(
      position.x * dpr, position.y * dpr, radiusX * dpr, radiusY * dpr,
      0, 0, 2 * Math.PI,
    )
    canvasContext.fill()
  }

  updatePosition(timeDelta: number): void {
    const { speedX, speedY, angle, radiusYUpdateDirection, rotationSpeed } = this
    
    this.position.x += Math.cos(angle) * timeDelta * speedX
    this.position.y += Math.sin(angle) * timeDelta * speedY

    if (radiusYUpdateDirection === 'down') {
      this.radiusY -= timeDelta * rotationSpeed * 0.1
      if (this.radiusY <= 0) {
        this.radiusY = 0
        this.radiusYUpdateDirection = 'up'
      }
    } else {
      this.radiusY += timeDelta * rotationSpeed * 0.1
      if (this.radiusY >= 10) {
        this.radiusY = 10
        this.radiusYUpdateDirection = 'down'
      }
    }

    this.speedY -= 0.0005 * timeDelta
  }
}

export { ConfettiShape }
