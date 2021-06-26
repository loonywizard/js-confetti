import { generateRandomNumber } from './generateRandomNumber'

function generateRandomArrayElement<T>(arr: T[]): T {
  return arr[generateRandomNumber(0, arr.length)]
}

export { generateRandomArrayElement }
