function createCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas')

  canvas.style.position = 'fixed'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.zIndex = '1000'
  canvas.style.pointerEvents = 'none'

  document.body.appendChild(canvas)

  return canvas
}

export { createCanvas }
