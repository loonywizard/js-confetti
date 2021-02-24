import JSConfetti from '../src/index'

function init() {
  const jsConfetti = new JSConfetti()

  function onClickHandler() {
    jsConfetti.addConfetti()
  }

  document.body.addEventListener('click', onClickHandler)
}


window.onload = init