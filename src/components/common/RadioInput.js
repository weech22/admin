import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const StyledRadio = withStyles({
  root: {
    padding: 0,
    color: '#F0640C',
    '&$checked': {
      color: '#F0640C',
      margin: 0,
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />)

const RadioInput = React.memo(
  ({ inputs = [], input: { value, onChange }, className }) => {
    const onChangeHandler = React.useCallback(event => {
      onChange(event.target.value)
    }, [])

    return (
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={value}
        onChange={onChangeHandler}
        className={className}
      >
        {inputs.map(input => (
          <FormControlLabel
            key={`radio.${input.value}`}
            control={<StyledRadio color="default" />}
            {...input}
          />
        ))}
      </RadioGroup>
    )
  },
)

export default RadioInput
