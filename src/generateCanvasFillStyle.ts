import { IRGBColor } from './types'

function generateCanvasFillStyle(color: IRGBColor): string {
  const { red, green, blue } = color
  
  return `rgb(${red}, ${green}, ${blue})`
}

export { generateCanvasFillStyle }
