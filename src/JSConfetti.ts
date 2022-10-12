import { fixDPR } from './fixDPR'
import { ConfettiShape } from './ConfettiShape'
import { createCanvas } from './createCanvas'
import { normalizeConfettiConfig } from './normalizeConfettiConfig'
import { IPosition, IJSConfettiConfig, IAddConfettiConfig } from './types'

class ConfettiBatch {
  private resolvePromise?: () => void
  private promise: Promise<void>
  private shapes: ConfettiShape[]

  constructor(private canvasContext: CanvasRenderingContext2D) {
    this.shapes = []
    this.promise = new Promise(
      (completionCallback) => this.resolvePromise = completionCallback)
  }

  getBatchCompletePromise(): Promise<void> {
    return this.promise
  }

  addShapes(...shapes: ConfettiShape[]): void {
    this.shapes.push(...shapes)
  }

  complete(): boolean {
    if (this.shapes.length) {
      return false
    }

    this.resolvePromise?.()

    return true
  }

  processShapes(
    time: { timeDelta: number, currentTime: number },
    canvasHeight: number,
    cleanupInvisibleShapes: boolean
  ): void {
    const { timeDelta, currentTime } = time

    this.shapes = this.shapes.filter((shape) => {
      // Render the shapes in this batch
      shape.updatePosition(timeDelta, currentTime)
      shape.draw(this.canvasContext)

      // Only cleanup the shapes if we're being asked to
      if (!cleanupInvisibleShapes) {
        return true
      }

      return shape.getIsVisibleOnCanvas(canvasHeight)
    })
  }
}

class JSConfetti {
  private readonly canvas: HTMLCanvasElement
  private readonly canvasContext: CanvasRenderingContext2D

  private activeConfettiBatches: ConfettiBatch[]
  private lastUpdated: number

  private iterationIndex: number
  private requestAnimationFrameRequested: boolean

  public constructor(jsConfettiConfig: IJSConfettiConfig = {}) {
    this.activeConfettiBatches = []
    this.canvas = jsConfettiConfig.canvas || createCanvas()
    this.canvasContext = <CanvasRenderingContext2D>this.canvas.getContext('2d')
    this.requestAnimationFrameRequested = false

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
    const cleanupInvisibleShapes = (this.iterationIndex % 10 === 0)

    this.activeConfettiBatches = this.activeConfettiBatches.filter((batch) => {
      batch.processShapes(
        { timeDelta, currentTime },
        canvasHeight,
        cleanupInvisibleShapes)

      // Do not remove invisible shapes on every iteration
      if (!cleanupInvisibleShapes) {
        return true
      }

      return !(batch.complete())
    })

    this.iterationIndex++

    this.queueAnimationFrameIfNeeded(currentTime)
  }

  private queueAnimationFrameIfNeeded(currentTime?: number): void {
    if (this.requestAnimationFrameRequested) {
      // We already have a pended animation frame, so there is no more work
      return
    }

    if (this.activeConfettiBatches.length < 1) {
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

    const confettiGroup = new ConfettiBatch(this.canvasContext)

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

      confettiGroup.addShapes(confettiOnTheRight, confettiOnTheLeft)
    }

    this.activeConfettiBatches.push(confettiGroup)

    this.queueAnimationFrameIfNeeded()

    return confettiGroup.getBatchCompletePromise()
  }

  public clearCanvas(): void {
    this.activeConfettiBatches = []
  }
}

export { JSConfetti }
