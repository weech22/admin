import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Header } from './components'
import { Root as RootNavigator } from './navigators'
import configureStore from './configureStore'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`

const App = () => (
  <Root>
    <Provider store={configureStore}>
      <>
        <Header />
        <Router>
          <RootNavigator />
        </Router>
      </>
    </Provider>
  </Root>
)

export default App
