import { IPosition, IRGBColor } from './types'
import { generateRandomNumber } from './generateRandomNumber'
import { generateRandomRGBColor } from './generateRandomRGBColor'
import { generateCanvasFillStyle } from './generateCanvasFillStyle'


class ConfettiShape {
  speedX: number
  speedY: number

  radius: number
  angle: number
  position: IPosition
  color: IRGBColor

  constructor(position: IPosition, direction: 'left' | 'right') {
    this.speedX = 0.1 * generateRandomNumber(500, 900) / 100
    this.speedY = 0.1 * generateRandomNumber(500, 900) / 100
    this.radius = 10
    this.angle = direction === 'left' 
      ? generateRandomNumber(-140, 0) * Math.PI / 180
      : generateRandomNumber(0, -140) * Math.PI / 180
    this.position = { ...position }
    this.color = generateRandomRGBColor()
  }

  draw(canvasContext: CanvasRenderingContext2D): void {
    const { position, radius, color } = this
    const dpr = window.devicePixelRatio

    canvasContext.fillStyle = generateCanvasFillStyle(color)
    
    canvasContext.beginPath()
    canvasContext.arc(
      position.x * dpr, position.y * dpr, radius * dpr, 0, 2 * Math.PI, true
    )
    canvasContext.fill()
  }

  updatePosition(timeDelta: number): void {
    const { speedX, speedY, angle } = this
    
    this.position.x += Math.cos(angle) * timeDelta * speedX
    this.position.y += Math.sin(angle) * timeDelta * speedY

    this.speedY -= 0.005
  }
}

export { ConfettiShape }
