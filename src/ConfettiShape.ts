import { IPosition, IRGBColor } from './types'
import { generateRandomRGBColor } from './generateRandomRGBColor'
import { generateCanvasFillStyle } from './generateCanvasFillStyle'


class ConfettiShape {
  speed: number
  radius: number
  // angle: number
  position: IPosition
  color: IRGBColor

  constructor(position: IPosition) {
    this.speed = 100
    this.radius = 10
    // this.angle = angle
    this.position = position
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

  // updatePosition() {}
}

export { ConfettiShape }