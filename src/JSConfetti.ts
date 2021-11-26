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
  private requestAnimationFrameRequested: boolean

  public constructor(jsConfettiConfig: IJSConfettiConfig = {}) {
    this.canvas = jsConfettiConfig.canvas || createCanvas()
    this.canvasContext = <CanvasRenderingContext2D>this.canvas.getContext('2d')
    this.requestAnimationFrameRequested = false
    this.shapes = []

    this.lastUpdated = new Date().getTime()
    this.iterationIndex = 0

    this.loop = this.loop.bind(this)

    requestAnimationFrame(this.loop)
  }

  private loop(): void {
    this.requestAnimationFrameRequested = false

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

    this.iterationIndex++

    this.queueAnimationFrameIfNeeded(currentTime)
  }

  private queueAnimationFrameIfNeeded(currentTime?: number): void {
    if (this.requestAnimationFrameRequested) {
      // We already have a pended animation frame, so there is no more work
      return
    }

    if (this.shapes.length < 1) {
      // No shapes to animate, so don't queue another frame
      return
    }

    this.requestAnimationFrameRequested = true

    // Capture the last updated time for animation
    this.lastUpdated = currentTime || new Date().getTime()
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

    const dpr = window.devicePixelRatio
    
    const canvasWidth = this.canvas.width / dpr
    const canvasHeight = this.canvas.height / dpr

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

    this.queueAnimationFrameIfNeeded()
  }
}

export { JSConfetti }
