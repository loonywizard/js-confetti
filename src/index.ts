import { fixDPR } from './fixDPR'
import { ConfettiShape } from './ConfettiShape'
import { IPosition } from './types'


class JSConfetti {
  canvas: HTMLCanvasElement
  canvasContext: CanvasRenderingContext2D

  shapes: ConfettiShape[]
  lastUpdated: number

  constructor() {
    
    this.canvas = document.createElement('canvas')
    
    this.canvas.style.position = 'absolute'
    this.canvas.style.width = '100%'
    this.canvas.style.height = '100%'
    this.canvas.style.top = '0'
    this.canvas.style.left = '0'
    this.canvas.style.zIndex = '1000'
    this.canvas.style.pointerEvents = 'none'
    
    document.body.appendChild(this.canvas)

    this.canvasContext = <CanvasRenderingContext2D>this.canvas.getContext('2d')

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
