interface IPosition {
  x: number,
  y: number,
}

interface IRGBColor {
  red: number,
  green: number,
  blue: number,
}

function generateCanvasFillStyle(color: IRGBColor): string {
  const { red, green, blue } = color
  
  return `rgb(${red}, ${green}, ${blue})`
}

function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) ) + min
}

function generateRandomRGBColor(): IRGBColor {
  const red = generateRandomNumber(0, 255)
  const green = generateRandomNumber(0, 255)
  const blue = generateRandomNumber(0, 255)

  return { red, green, blue }
}

function normalizeComputedStyleValue(string: string): number {
  // "250px" --> 250
  return +string.replace(/px/, '')
} 

function fixDPR(canvas: HTMLCanvasElement): void {
  const dpr = window.devicePixelRatio
  const computedStyles = getComputedStyle(canvas)
  
  const width = normalizeComputedStyleValue(computedStyles.getPropertyValue('width'))
  const height = normalizeComputedStyleValue(computedStyles.getPropertyValue('height'))

  canvas.setAttribute('width', (width * dpr).toString())
  canvas.setAttribute('height', (height * dpr).toString())
}

class ConfettiShape {
  speed: number
  radius: number
  // angle: number
  position: IPosition
  color: IRGBColor

  constructor(position: IPosition) {
    this.speed = 100
    this.radius = 10
    // this.angle = angle
    this.position = position
    this.color = generateRandomRGBColor()
  }

  draw(canvasContext: CanvasRenderingContext2D) {
    const { position, radius, color } = this
    const dpr = window.devicePixelRatio

    canvasContext.fillStyle = generateCanvasFillStyle(color)
    
    canvasContext.beginPath()
    canvasContext.arc(
      position.x * dpr, position.y * dpr, radius * dpr, 0, 2 * Math.PI, true
    )
    canvasContext.fill()
  }

  updatePosition() {}
}

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
    shapes.forEach((shape) => shape.draw(canvasContext))
    setTimeout(drawShapes, 0)
  }

  setTimeout(drawShapes, 0)
}

window.onload = init