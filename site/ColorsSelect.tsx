import React from 'react'


interface IProps {
  // TODO add typings
  fields: any,
  register: any,
  append: any,
  remove: any,
  colors: string[],
}

function ColorsSelect(props: IProps): JSX.Element {
  const { fields, register, append, remove, colors } = props

  function onAddColorClick(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault()

    // TODO: randomize new color!
    append({ value: '#ff12ab' })
  }

  function onDeleteButtonClick(event: React.MouseEvent<HTMLButtonElement>, colorIndex: number) {
    event.preventDefault()

    remove(colorIndex)
  }

  return (
    <div>
      {fields.map((field, index: number) => (
        <div className="color-input-wrapper">
          <span className="color-input-color-preview" style={{ backgroundColor: colors[index].value }} />
          <input {...register(`colors.${index}.value`)} key={field.id} />
          <button onClick={(event) => onDeleteButtonClick(event, index)}>DELETE</button>
        </div>
      ))}
      
      <button onClick={onAddColorClick}>Add More Colors!</button>
    </div>
  )
}

export default ColorsSelect
