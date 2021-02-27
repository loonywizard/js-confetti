import { fixDPR } from './fixDPR'
import { ConfettiShape } from './ConfettiShape'
import { createCanvas } from './createCanvas'
import { IPosition } from './types'


class JSConfetti {
  canvas: HTMLCanvasElement
  canvasContext: CanvasRenderingContext2D

  shapes: ConfettiShape[]
  lastUpdated: number

  constructor() {
    this.canvas = createCanvas()
    this.canvasContext = <CanvasRenderingContext2D>this.canvas.getContext('2d')

    this.shapes = []

    this.lastUpdated = new Date().getTime()

    setTimeout(() => this.loop.call(this, 0), 0)
  }

  loop(iterationIndex: number): void {
    fixDPR(this.canvas)

    const currentTime = new Date().getTime()
    const timeDelta = currentTime - this.lastUpdated
    const canvasHeight = this.canvas.offsetHeight
    const canvasWidth = this.canvas.offsetWidth

    this.shapes.forEach((shape) => {
      shape.updatePosition(timeDelta, currentTime, canvasWidth)
      shape.draw(this.canvasContext)
    })

    if (iterationIndex % 100 === 0) {
      this.shapes = this.shapes.filter((shape) => shape.getIsVisibleOnCanvas(canvasHeight))
    }

    this.lastUpdated = currentTime

    setTimeout(() => this.loop.call(this, ++iterationIndex), 0)
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

    for (let i = 0; i < 100; i++) {
      this.shapes.push(new ConfettiShape(leftConfettiesPosition, 'right'))
      this.shapes.push(new ConfettiShape(rightConfettiesPosition, 'left'))
    }
  }
}

export default JSConfetti
