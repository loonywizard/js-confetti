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

  loop() {
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

  addConfetti(position: IPosition) {
    for (let i = 0; i < 50; i++) {
      this.shapes.push(new ConfettiShape(position))
    }
  }
}

export default JSConfetti

// function init() {
//   const canvas = <HTMLCanvasElement | null>document.getElementById('canvas')
  
//   if (canvas === null) return

//   const jsConfetti = new JSConfetti(canvas)

//   function onClickHandler(event: MouseEvent) {
//     console.log(`Cliked on ${event.pageX} ${event.pageY}`)
    
//     const position = { x: event.pageX, y: event.pageY }
    
//     jsConfetti.addConfetti(position)
//   }

//   document.body.addEventListener('click', onClickHandler)
// }


// window.onload = init