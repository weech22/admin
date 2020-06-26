import { createAction, handleActions } from 'redux-actions'
import * as R from 'ramda'
import { combineReducers } from 'redux'
import { MODULES } from '../../constants'

export const startInitialize = createAction(`${MODULES.AUTH}/INITIALIZE`)
export const stopInitialize = createAction(`${MODULES.AUTH}/STOP_INITIALIZE`)
export const sendLogin = createAction(`${MODULES.AUTH}/SEND_LOGIN`)
export const setToken = createAction(`${MODULES.AUTH}/SET_TOKEN`)
export const logout = createAction(`${MODULES.AUTH}/LOGOUT`)

const token = handleActions(
  {
    [setToken]: (_, { payload }) => payload,
    [logout]: R.always(null),
  },
  null,
)

const isInitializing = handleActions(
  {
    [startInitialize]: R.T,
    [stopInitialize]: R.F,
  },
  true,
)

const authReducer = combineReducers({
  token,
  isInitializing,
})

export default authReducer
