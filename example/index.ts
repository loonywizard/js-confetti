import JSConfetti from '../src/index'

function init() {
  const jsConfetti = new JSConfetti()
  const button = document.getElementById('button')

  function onClickHandler() {
    jsConfetti.addConfetti()
  }

  if (!button) return
  
  button.addEventListener('click', onClickHandler)

  setTimeout(() => {
    jsConfetti.addConfetti()
  }, 1000)
}


window.onload = init