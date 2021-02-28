function generateRandomNumber(min: number, max: number, fractionDigits = 0): number {
  const randomNumber = Math.random() * (max - min) + min

  return Math.floor(randomNumber * (10 ** fractionDigits)) / (10 ** fractionDigits)
}

export { generateRandomNumber }
