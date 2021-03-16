import { fixDPR } from './fixDPR'
import { ConfettiShape } from './ConfettiShape'
import { createCanvas } from './createCanvas'
import { normalizeConfettiConfig } from './normalizeConfettiConfig'
import { IPosition, IAddConfettiConfig } from './types'


class JSConfetti {
  private readonly canvas: HTMLCanvasElement
  private readonly canvasContext: CanvasRenderingContext2D

  private shapes: ConfettiShape[]
  private lastUpdated: number

  private iterationIndex: number

  public constructor() {
    this.canvas = createCanvas()
    this.canvasContext = <CanvasRenderingContext2D>this.canvas.getContext('2d')

    this.shapes = []

    this.lastUpdated = new Date().getTime()
    this.iterationIndex = 0

    this.loop = this.loop.bind(this)

    requestAnimationFrame(this.loop)
  }

  private loop(): void {
    fixDPR(this.canvas)

    const currentTime = new Date().getTime()
    const timeDelta = currentTime - this.lastUpdated
    
    const canvasHeight = this.canvas.offsetHeight
    const canvasWidth = this.canvas.offsetWidth

    this.shapes.forEach((shape) => {
      shape.updatePosition(timeDelta, currentTime, canvasWidth)

      shape.draw(this.canvasContext)
    })

    // Do not remove invisible shapes on every iteration
    if (this.iterationIndex % 100 === 0) {
      this.shapes = this.shapes.filter((shape) => shape.getIsVisibleOnCanvas(canvasHeight))
    }

    this.lastUpdated = currentTime
    this.iterationIndex++

    requestAnimationFrame(this.loop)
  }

  public addConfetti(confettiesConfig: IAddConfettiConfig = {}): void {
    const { confettiRadius, confettiesNumber, confettiColors } = normalizeConfettiConfig(confettiesConfig)

    const yPosition = window.innerHeight * 5 / 7
    
    const leftConfettiesPosition: IPosition = {
      x: 0,
      y: yPosition,
    }
    const rightConfettiesPosition: IPosition = {
      x: window.innerWidth,
      y: yPosition,
    }

    for (let i = 0; i < confettiesNumber / 2; i++) {
      this.shapes.push(new ConfettiShape({
        initialPosition: leftConfettiesPosition, 
        direction: 'right',
        confettiRadius,
        confettiColors,
      }))

      this.shapes.push(new ConfettiShape({
        initialPosition: rightConfettiesPosition, 
        direction: 'left',
        confettiRadius,
        confettiColors,
      }))
    }
  }
}

export { JSConfetti }
