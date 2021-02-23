import { fixDPR } from './fixDPR'
import { ConfettiShape } from './ConfettiShape'
import { IPosition } from './types'


class JSConfetti {
  canvas: HTMLCanvasElement
  canvasContext: CanvasRenderingContext2D

  shapes: ConfettiShape[]
  lastUpdated: number

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.canvasContext = <CanvasRenderingContext2D>canvas.getContext('2d')

    this.shapes = []

    this.lastUpdated = new Date().getTime()

    setTimeout(() => this.loop.call(this), 0)
  }

  loop(): void {
    fixDPR(this.canvas)

    const currentTime = new Date().getTime()
    const timeDelta = currentTime - this.lastUpdated

    this.shapes.forEach((shape) => {
      shape.updatePosition(timeDelta)
      shape.draw(this.canvasContext)
    })

    this.lastUpdated = currentTime

    setTimeout(() => this.loop.call(this), 0)
  }

  addConfetti(): void {
    const yPosition = window.innerHeight * 5 / 7
    const leftConfettiesPosition: IPosition = {
      x: 0,
      y: yPosition,
    }
    const rightConfettiesPosition: IPosition = {
      x: window.innerWidth,
      y: yPosition,
    }

    for (let i = 0; i < 50; i++) {
      this.shapes.push(new ConfettiShape(leftConfettiesPosition, 'right'))
      this.shapes.push(new ConfettiShape(rightConfettiesPosition, 'left'))
    }
  }
}

export default JSConfetti

