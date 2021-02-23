import JSConfetti from '../src/index'

function init() {
  const canvas = <HTMLCanvasElement | null>document.getElementById('canvas')
  
  if (canvas === null) return

  const jsConfetti = new JSConfetti(canvas)

  function onClickHandler(event: MouseEvent) {
    console.log(`Cliked on ${event.pageX} ${event.pageY}`)
    
    const position = { x: event.pageX, y: event.pageY }
    
    jsConfetti.addConfetti(position)
  }

  document.body.addEventListener('click', onClickHandler)
}


window.onload = init