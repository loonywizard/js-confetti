import ReactDOM from 'react-dom'
import React, {useCallback, useEffect, useRef} from 'react'

import JSConfetti from '../src/index'
import { generateRandomArrayElement  } from '../src/generateRandomArrayElement'
import { IAddConfettiConfig } from '../src/types'


const CONFETTI_ARGS: IAddConfettiConfig[] = [
  // empty object is for default values
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

function App(): JSX.Element {
  const jsConfettiRef = useRef<JSConfetti>()
  const clickMeButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    jsConfettiRef.current = new JSConfetti()

    const timeoutId = setTimeout(() => {
      if (jsConfettiRef.current) {
        jsConfettiRef.current.addConfetti(generateRandomArrayElement(CONFETTI_ARGS)).then(() => console.log("Initial batch completed"))
      }
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [])

  const onButtonClick = useCallback(() => {
    if (jsConfettiRef.current) {
      jsConfettiRef.current.addConfetti(generateRandomArrayElement(CONFETTI_ARGS)).then(() => console.log("Manual batch completed"))
    }
  }, [jsConfettiRef])

  // early prototype, only to be used for testing for now in DEV mode
  const onContainerClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target !== clickMeButtonRef.current) {
      jsConfettiRef.current?.addConfettiAtPosition({
        ...generateRandomArrayElement(CONFETTI_ARGS),
        confettiDispatchPosition: {
          x: event.clientX,
          y: event.clientY
        }
      })
    }
  }, [jsConfettiRef])

  return (
    <div className="container" onClick={onContainerClick}>
      <button className="button" onClick={onButtonClick} ref={clickMeButtonRef}>Click me!</button>
    </div>
  )
}


const appContainer = document.getElementById('app')
ReactDOM.render(<App />, appContainer)
