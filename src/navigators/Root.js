import React, { useEffect } from 'react'
import styled from 'styled-components'
import * as R from 'ramda'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { ROUTES } from '../constants'
import { getIsInitializing, startInitialize } from '../modules/auth'
import { NavigationService } from '../services'
import { Login } from '../screens'
import { Loader, TaskLoader } from '../components'

import Main from './Main'

const LoaderContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`

const StyledLoader = styled(Loader)`
  margin: auto;
`

const RootDump = ({ history, startInitialize, isInitializing }) => {
  const [currentLocation, setCurrentLocation] = React.useState(
    history.location.pathname,
  )

  useEffect(() => {
    startInitialize()
    NavigationService.setHistory(history)
  }, [history, startInitialize])

  useEffect(() => {
    history.listen(location => setCurrentLocation(location.pathname))
  }, [])

  return isInitializing ? (
    <LoaderContainer>
      <StyledLoader />
    </LoaderContainer>
  ) : (
    <>
      <TaskLoader />
      <Switch>
        <Route path={ROUTES.LOGIN} component={Login} />
        <Main currentLocation={currentLocation} />
      </Switch>
    </>
  )
}

const Root = R.compose(
  withRouter,
  connect(
    R.applySpec({ isInitializing: getIsInitializing }),
    { startInitialize },
  ),
)(RootDump)

export default Root
