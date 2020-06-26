import React from 'react'
import { TextFieldProps } from '@material-ui/core/TextField'
import { CircularProgressProps } from '@material-ui/core/CircularProgress'

export interface ButtonProps {
  className: string
  title: string
  onClick: () => undefined
  isLoading?: boolean
  input: {
    value: any
    onChange: (value: any) => undefined
  }
}

declare const TextInput: React.SFC<TextFieldProps>
declare const Button: React.SFC<ButtonProps>
declare const Loader: React.SFC<CircularProgressProps>
declare const Menu: React.SFC<>
