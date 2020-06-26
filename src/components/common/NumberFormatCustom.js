import React from 'react'
import NumberFormat from 'react-number-format'

const NumberFormatCustom = props => {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        })
      }}
      format={props.format || '######'}
    />
  )
}

export default NumberFormatCustom
