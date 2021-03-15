import { generateRandomNumber } from './generateRandomNumber'

function generateRandomArrayElement(confettiColors: string[]): string {
  return confettiColors[generateRandomNumber(0, confettiColors.length)]
}

export { generateRandomArrayElement }
