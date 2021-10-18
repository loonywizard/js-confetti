import ReactDOM from 'react-dom'
import React, { useCallback, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

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

// TODO: randomize default values
const defaultValues = {
  confettiNumber: 50,
  confettiRadius: 20,
  useEmoji: false,
}


function App(): JSX.Element {
  const jsConfettiRef = useRef<JSConfetti>()
  const { register, handleSubmit, watch } = useForm({ defaultValues })

  const watchUseEmoji = watch('useEmoji')

  useEffect(() => {
    jsConfettiRef.current = new JSConfetti()

    const timeoutId = setTimeout(() => {
      if (jsConfettiRef.current) {
        jsConfettiRef.current.addConfetti(generateRandomArrayElement(CONFETTI_ARGS))
      }
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [])

  const onSubmit = useCallback((formData) => {
    const { confettiNumber, confettiRadius, useEmoji } = formData
    if (jsConfettiRef.current) {
      const addConfettiArgs = {
        confettiNumber,
        confettiRadius,
      }

      // TODO: fix typescript
      if (useEmoji) {
        addConfettiArgs.emojis = ['🌈', '⚡️', '💥', '✨', '💫', '🌸']
      } else {
        addConfettiArgs.confettiColors = ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff']
      }
      
      jsConfettiRef.current.addConfetti(addConfettiArgs)
    }
  }, [jsConfettiRef])

  return (
    <form className="sandbox-form" onSubmit={handleSubmit(onSubmit)}>
      <button className="button" type="submit">Fire Confetti!</button>

      <div>
        <label htmlFor="confettiNumberSelect">Confetti Number: </label>
        <input
          id="confettiNumberSelect"
          type="number"
          min="1"
          max="1000"
          {...register('confettiNumber', { required: true })}
        />
      </div>

      <div>
        <label htmlFor="confettiRadiusSelect">Confetti Radius: </label>
        <input
          id="confettiRadiusSelect"
          type="number"
          min="1"
          max="1000"
          {...register('confettiRadius', { required: true })}
        />
      </div>

      <div>
        <label htmlFor="useEmojiCheckbox">Use Emoji: </label>
        <input
          id="useEmojiCheckbox"
          type="checkbox"
          {...register('useEmoji')}
        />
      </div>

      {watchUseEmoji ? (
        <div>
          EMOJI SELECT
        </div>
      ) : (
        <div>
          COLORS SELECT
        </div>
      )}

      {/* TODO: add emoji select */}
      {/* TODO: add confetti color select */}
    </form>
  )
}


const appContainer = document.getElementById('app')
ReactDOM.render(<App />, appContainer)
