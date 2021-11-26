import { fixDPR } from './fixDPR'
import { ConfettiShape } from './ConfettiShape'
import { createCanvas } from './createCanvas'
import { normalizeConfettiConfig } from './normalizeConfettiConfig'
import { IPosition, IJSConfettiConfig, IAddConfettiConfig } from './types'

class ConfettiBatch {
  private promiseCompletion?: () => void
  private promise: Promise<void>
  private shapes: ConfettiShape[]

  constructor() {
    this.shapes = []
    this.promise = new Promise((completionCallback) => this.promiseCompletion = completionCallback);
  }

  getPromise(): Promise<void> {
    return this.promise
  }

  addShapes(...shapes: ConfettiShape[]): void {
    this.shapes.push(...shapes)
  }

  complete(): boolean {
    if (this.shapes.length) {
      return false
    }
    
    this.promiseCompletion?.()

    return true
  }

  filterShapes(height: number): void {
    if (this.shapes.length < 1) {
      return
    }

    this.shapes = this.shapes.filter((shape) => shape.getIsVisibleOnCanvas(height))
  }
}

class JSConfetti {
  private readonly canvas: HTMLCanvasElement
  private readonly canvasContext: CanvasRenderingContext2D

  private shapes: ConfettiShape[]
  private activeConfettiBatches: ConfettiBatch[]
  private lastUpdated: number

  private iterationIndex: number
  private requestAnimationFrameRequested: boolean

  public constructor(jsConfettiConfig: IJSConfettiConfig = {}) {
    this.activeConfettiBatches = []
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

      // Remove shapes so we don't paint them any more
      this.shapes = this.shapes.filter((shape) => shape.getIsVisibleOnCanvas(canvasHeight))

      // Complete any confetti groups, and remove them if they're completed
      this.activeConfettiBatches.filter((batch) => {
        batch.filterShapes(canvasHeight)
        return !batch.complete()
      })
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

  public addConfetti(confettiConfig: IAddConfettiConfig = {}): Promise<void> {
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

    const confettiGroup = new ConfettiBatch()

    for (let i = 0; i < confettiNumber / 2; i++) {
      const confettiOnTheRight = new ConfettiShape({
        initialPosition: leftConfettiPosition, 
        direction: 'right',
        confettiRadius,
        confettiColors,
        confettiNumber,
        emojis,
        emojiSize,
        canvasWidth,
      })

      const confettiOnTheLeft = new ConfettiShape({
        initialPosition: rightConfettiPosition, 
        direction: 'left',
        confettiRadius,
        confettiColors,
        confettiNumber,
        emojis,
        emojiSize,
        canvasWidth,
      })

      this.shapes.push(confettiOnTheRight, confettiOnTheLeft)
      confettiGroup.addShapes(confettiOnTheRight, confettiOnTheLeft)
    }

    this.activeConfettiBatches.push(confettiGroup)

    this.queueAnimationFrameIfNeeded()

    return confettiGroup.getPromise()
  }
}

export { JSConfetti }
