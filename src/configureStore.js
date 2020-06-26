import { createStore, applyMiddleware, compose } from 'redux'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import createSagaMiddleware from 'redux-saga'

import { rootSaga } from './modules'

import auth from './modules/auth'
import drivers from './modules/drivers'
import categories from './modules/categories'
import products from './modules/products'
import users from './modules/users'
import ui from './modules/ui'
import promotions from './modules/promotions'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  form: formReducer,
  auth,
  users,
  categories,
  products,
  ui,
  promotions,
  drivers,
})

export const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
)

sagaMiddleware.run(rootSaga)

export default store
