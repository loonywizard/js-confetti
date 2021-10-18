import ReactDOM from 'react-dom'
import React, { useCallback, useEffect, useRef } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'

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


interface IColorInputProps {
  color: string,
  onChange: (color: string) => void,
}

function ColorInput(props: IColorInputProps): JSX.Element {
  const { color, onChange } = props
  const colorPreviewStyles = { backgroundColor: color }
  
  return (
    <div className="color-input-wrapper">
      <span className="color-input-color-preview" style={colorPreviewStyles} />
      {color}
      <span>DELETE BUTTON (TODO)</span>
    </div>
  )
}


interface IColorSelectProps {
  // TODO add typings
  fields: any,
  register: any,
  colors: string[],
}

function ColorsSelect(props: IColorSelectProps): JSX.Element {
  const { fields, register, colors } = props

  return (
    <div>
      {fields.map((field, index) => (
        <div className="color-input-wrapper">
          <span className="color-input-color-preview" style={{ backgroundColor: colors[index] }} />
          <input {...register(`colors.${index}`)} key={field.id} />
        </div>
      ))}
    </div>
  )
}



// TODO: randomize default values
const defaultValues = {
  confettiNumber: 50,
  confettiRadius: 20,
  useEmoji: false,
  emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🦄'].join(' '),
  colors: ['#9b5de5', '#f15bb5', '#fee440', '#00bbf9', '#00f5d4'],
}


function App(): JSX.Element {
  const jsConfettiRef = useRef<JSConfetti>()
  const { register, handleSubmit, watch, control } = useForm({ defaultValues })

  // TODO implement add / remove
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "colors", // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  })

  const watchUseEmoji = watch('useEmoji')
  const watchColors = watch('colors')

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
    const { confettiNumber, confettiRadius, useEmoji, emojis, colors } = formData
    if (jsConfettiRef.current) {
      const addConfettiArgs = {
        confettiNumber,
        confettiRadius,
      }

      // TODO: fix typescript
      if (useEmoji) {
        addConfettiArgs.emojis = emojis.split(' ')
      } else {
        addConfettiArgs.confettiColors = colors
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
          <label htmlFor="emojisSelect">Add emojies separeted by space: </label>
          <input
            id="emojisSelect"
            type="string"
            {...register('emojis', { required: true })}
          />
        </div>
      ) : (
        // TODO rename fields
        <ColorsSelect register={register} fields={fields} colors={watchColors} />
      )}
    </form>
  )
}


const appContainer = document.getElementById('app')
ReactDOM.render(<App />, appContainer)
