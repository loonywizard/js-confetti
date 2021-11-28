import { fixDPR } from './fixDPR'
import { ConfettiShape } from './ConfettiShape'
import { createCanvas } from './createCanvas'
import { normalizeConfettiConfig } from './normalizeConfettiConfig'
import { IPosition, IJSConfettiConfig, IAddConfettiConfig } from './types'


class JSConfetti {
  private readonly canvas: HTMLCanvasElement
  private readonly canvasContext: CanvasRenderingContext2D

  private shapes: ConfettiShape[]
  private lastUpdated: number

  private iterationIndex: number

  public constructor(jsConfettiConfig: IJSConfettiConfig = {}) {
    this.canvas = jsConfettiConfig.canvas || createCanvas()
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

    this.shapes.forEach((shape) => {
      shape.updatePosition(timeDelta, currentTime)

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

  public addConfetti(confettiConfig: IAddConfettiConfig = {}): void {
    const {
      confettiRadius,
      confettiNumber,
      confettiColors,
      emojis,
      emojiSize,
    } = normalizeConfettiConfig(confettiConfig)

    // Use the bounding rect rather tahn the canvas width / height, because
    // .width / .height are unset until a layout pass has been completed. Upon
    // confetti being immediately queued on a page load, this hasn't happened so
    // the default of 300x150 will be returned, causing an improper source point
    // for the confetti animation.
    const canvasRect = this.canvas.getBoundingClientRect()
    const canvasWidth = canvasRect.width
    const canvasHeight = canvasRect.height

    const yPosition = canvasHeight * 5 / 7
    
    const leftConfettiPosition: IPosition = {
      x: 0,
      y: yPosition,
    }
    const rightConfettiPosition: IPosition = {
      x: canvasWidth,
      y: yPosition,
    }

    for (let i = 0; i < confettiNumber / 2; i++) {
      this.shapes.push(new ConfettiShape({
        initialPosition: leftConfettiPosition, 
        direction: 'right',
        confettiRadius,
        confettiColors,
        confettiNumber,
        emojis,
        emojiSize,
        canvasWidth,
      }))

      this.shapes.push(new ConfettiShape({
        initialPosition: rightConfettiPosition, 
        direction: 'left',
        confettiRadius,
        confettiColors,
        confettiNumber,
        emojis,
        emojiSize,
        canvasWidth,
      }))
    }
  }
}

export { JSConfetti }
