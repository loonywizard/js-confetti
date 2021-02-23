import { IPosition, IRGBColor } from './types'
import { generateRandomNumber } from './generateRandomNumber'
import { generateRandomRGBColor } from './generateRandomRGBColor'
import { generateCanvasFillStyle } from './generateCanvasFillStyle'


class ConfettiShape {
  speed: number
  radius: number
  angle: number
  position: IPosition
  color: IRGBColor
  lastUpdated: number

  constructor(position: IPosition) {
    this.speed = 0.1 * generateRandomNumber(300, 500) / 100
    this.radius = 10
    this.angle = generateRandomNumber(-120, -60) * Math.PI / 180
    this.position = position
    this.color = generateRandomRGBColor()
    this.lastUpdated = new Date().getTime()
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

  updatePosition(): void {
    const { lastUpdated, speed, angle } = this
    const currentTime = new Date().getTime()
    const timeDelta = currentTime - lastUpdated
    
    this.position.x += Math.cos(angle) * timeDelta * speed
    this.position.y += Math.sin(angle) * timeDelta * speed

    this.lastUpdated = currentTime
  }
}

export { ConfettiShape }
