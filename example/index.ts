import JSConfetti from '../src/index'

function init() {
  const canvas = <HTMLCanvasElement | null>document.getElementById('canvas')
  
  if (canvas === null) return

  const jsConfetti = new JSConfetti(canvas)

  function onClickHandler() {
    jsConfetti.addConfetti()
  }

  document.body.addEventListener('click', onClickHandler)
}


window.onload = init