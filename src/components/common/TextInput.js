import React, { useState, useMemo, useCallback, useEffect } from 'react'
import * as R from 'ramda'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import assets from '../../assets'

const styles = () => ({
  notchedOutline: {
    borderRadius: '8px',
    borderWidth: '1px',
    borderColor: '#F49355  !important',
  },
  focused: {
    fontSize: 15,
    borderColor: '#F0640C !important',
  },
})

const labelStyle = {
  color: '#000000',
  opacity: 0.4,
  fontFamily: 'FuturaBookC',
  fontSize: 17,
}

const Container = styled.div`
  position: relative;
`

const InputWrapper = React.memo(props => (
  <TextField {...R.dissoc('isFocusedOrHasValue', props)} />
))

const StyledTextField = styled(InputWrapper)`
  width: 100%;

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  label {
    margin-top: ${({ isFocusedOrHasValue }) =>
      isFocusedOrHasValue ? 0 : -10}px;
  }

  input {
    padding: 9.5px;
  }

  .MuiInputBase-multiline {
    padding: 9.5px 15px;
  }

  .MuiFormHelperText-root {
    margin: 10px 43px 15px 0;
    font-family: FuturaBookC;
    font-size: 14px;
    line-height: 16px;
    color: #000000;
    opacity: 0.4;
  }
`

const ShowPasswordIcon = styled.img`
  position: absolute;
  margin: auto 0;
  right: 16px;
  top: 29px;
  cursor: pointer;
  fill: #000;
`

const Error = styled.span`
  font-family: FuturaBookC;
  font-size: 15px;
  line-height: 17px;

  color: #f55555;
`

const identity = val => val

const TextInputDump = ({
  classes,
  type,
  className,
  input: { onChange, ...input },
  meta: { touched, error },
  inputProps,
  labelPropsStyle,
  onChangeNormilizer = identity,
  errorLabelProps,
  ...props
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const [inputType] = useState(type)
  const [isFocused, setFocus] = useState(false)

  const onPasswordShowClick = useCallback(() => {
    setPasswordVisible(!isPasswordVisible)
  }, [isPasswordVisible])

  useEffect(
    () => () => {
      onChange(0)
    },
    [],
  )

  const calculatedInputType = useMemo(() => {
    if (inputType === 'password' && isPasswordVisible) {
      return 'text'
    } else if (inputType === 'password' && !isPasswordVisible) {
      return 'password'
    } else if (inputType === 'number') {
      return 'number'
    }

    return 'text'
  }, [inputType, isPasswordVisible])

  const onChangeHandler = useCallback(
    ({ target: { value } }) => {
      onChange(onChangeNormilizer(value))
    },
    [onChange, onChangeNormilizer],
  )

  return (
    <Container className={className}>
      <StyledTextField
        margin="normal"
        variant="outlined"
        color="#F0640C"
        type={calculatedInputType}
        isFocusedOrHasValue={isFocused || !!input.value.toString()}
        onFocusCapture={() => {
          setFocus(true)
        }}
        onBlurCapture={() => {
          setFocus(false)
        }}
        InputLabelProps={{ style: { ...labelStyle, ...labelPropsStyle } }}
        InputProps={{
          ...inputProps,
          classes: {
            notchedOutline: classes.notchedOutline,
            focused: classes.cssFocused,
          },
        }}
        onChange={onChangeHandler}
        {...input}
        {...props}
      ></StyledTextField>

      {touched && !!error && <Error>{error}</Error>}

      {type === 'password' && (
        <ShowPasswordIcon
          onClick={onPasswordShowClick}
          src={isPasswordVisible ? assets.img.showOpen : assets.img.showClose}
        />
      )}
    </Container>
  )
}

const TextInput = withStyles(styles)(TextInputDump)

export default TextInput
