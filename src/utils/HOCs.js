import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { ROUTES } from '../constants'
import { getToken } from '../modules/auth'

export const withRediretToMain = () => WrapperComponent =>
  connect(R.applySpec({ token: getToken }))(({ token, ...props }) =>
    token ? <Redirect to={ROUTES.MAIN} /> : <WrapperComponent {...props} />,
  )
