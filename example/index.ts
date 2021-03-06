import JSConfetti from '../src/index'
import { generateRandomArrayElement  } from '../src/generateRandomArrayElement'
import { IAddConfettiConfig } from '../src/types'


const CONFETTI_ARGS: IAddConfettiConfig[] = [
  {},
  { confettiRadius: 12, confettiNumber: 100 },
  { emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'] },
  { emojis: ['⚡️', '💥', '✨', '💫'] },
  { emojis: ['🦄'], confettiRadius: 100, confettiNumber: 30 },
  {
    confettiColors: ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff'],
    confettiRadius: 10,
    confettiNumber: 150,
  },
  {
    confettiColors: ['#9b5de5', '#f15bb5', '#fee440', '#00bbf9', '#00f5d4'],
    confettiRadius: 6,
    confettiNumber: 300,
  },
]

function init() {
  const jsConfetti = new JSConfetti()
  const button = document.getElementById('button')

  function onClickHandler() {
    jsConfetti.addConfetti(generateRandomArrayElement(CONFETTI_ARGS))
  }

  if (!button) return
  
  button.addEventListener('click', onClickHandler)

  setTimeout(() => {
    jsConfetti.addConfetti()
  }, 1000)
}


window.onload = init
