import React from 'react'
import * as R from 'ramda'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getToken } from '../../modules/auth'
import { ROUTES } from '../../constants'

const AuthRouteDump = ({
  token,
  component: Component = () => null,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      token ? (
        <Component {...rest} {...props} />
      ) : (
        <Redirect to={ROUTES.LOGIN} />
      )
    }
  />
)

const AuthRoute = connect(R.applySpec({ token: getToken }))(AuthRouteDump)

export default AuthRoute
