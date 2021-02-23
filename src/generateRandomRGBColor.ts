import { IRGBColor } from './types'
import { generateRandomNumber } from './generateRandomNumber'

function generateRandomRGBColor(): IRGBColor {
  const red = generateRandomNumber(0, 255)
  const green = generateRandomNumber(0, 255)
  const blue = generateRandomNumber(0, 255)

  return { red, green, blue }
}

export { generateRandomRGBColor }
