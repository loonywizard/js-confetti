import { generateRandomNumber } from './generateRandomNumber'

const RGBColors = [
  '#fcf403',
  '#62fc03',
  '#f4fc03',
  '#03e7fc',
  '#03fca5',
  '#a503fc',
  '#fc03ad',
  '#fc9003',
]

function generateRandomRGBColor(): string {
  return RGBColors[generateRandomNumber(0, RGBColors.length)]
}

export { generateRandomRGBColor }
