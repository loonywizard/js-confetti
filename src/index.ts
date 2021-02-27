import { fixDPR } from './fixDPR'
import { ConfettiShape } from './ConfettiShape'
import { createCanvas } from './createCanvas'
import { IPosition } from './types'


class JSConfetti {
  canvas: HTMLCanvasElement
  canvasContext: CanvasRenderingContext2D

  shapes: ConfettiShape[]

  constructor() {
    this.canvas = createCanvas()
    this.canvasContext = <CanvasRenderingContext2D>this.canvas.getContext('2d')

    this.shapes = []

    setTimeout(() => this.loop.call(this), 0)
  }

  loop(): void {
    fixDPR(this.canvas)

    const currentTime = new Date().getTime()

    this.shapes.forEach((shape) => {
      shape.updatePosition(currentTime)
      shape.draw(this.canvasContext)
    })

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
