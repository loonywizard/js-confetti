import { IPosition, IRGBColor } from './types'
import { generateRandomRGBColor } from './generateRandomRGBColor'
import { generateCanvasFillStyle } from './generateCanvasFillStyle'
import { fixDPR } from './fixDPR'
import { ConfettiShape } from './ConfettiShape'

function init() {
  const canvas = <HTMLCanvasElement | null>document.getElementById('canvas')
  const shapes: ConfettiShape[] = []
  
  if (canvas === null) return

  const canvasContext = <CanvasRenderingContext2D>canvas.getContext('2d')

  document.body.addEventListener('click', (event: MouseEvent) => {
    console.log(`Cliked on ${event.pageX} ${event.pageY}`)
    const position = { x: event.pageX, y: event.pageY }
    
    shapes.push(new ConfettiShape(position))
  })

  fixDPR(canvas)

  function drawShapes() {
    // TODO: remove cast
    fixDPR(<HTMLCanvasElement>canvas)
    shapes.forEach((shape) => {
      shape.updatePosition()
      shape.draw(canvasContext)
    })
    setTimeout(drawShapes, 0)
  }

  setTimeout(drawShapes, 0)
}

window.onload = init