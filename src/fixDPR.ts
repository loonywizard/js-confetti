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

export { fixDPR }
