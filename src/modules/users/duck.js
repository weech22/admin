import { createAction, handleAction, handleActions } from 'redux-actions'
import * as R from 'ramda'
import { combineReducers } from 'redux'
import { MODULES } from '../../constants'

export const getUsersRequest = createAction(
  `${MODULES.USERS}/GET_USERS_REQUEST`,
)
export const getUsersSuccess = createAction(
  `${MODULES.USERS}/GET_USERS_SUCCESS`,
)
export const getUsersFailure = createAction(
  `${MODULES.USERS}/GET_USERS_FAILURE`,
)

export const setUserStatusRequest = createAction(
  `${MODULES.USERS}/SET_USER_STATUS_REQUEST`,
)
export const setUserStatusSuccess = createAction(
  `${MODULES.USERS}/SET_USER_STATUS_SUCCESS`,
)
export const setUserStatusFailure = createAction(
  `${MODULES.USERS}/SET_USER_STATUS_FAILURE`,
)

export const clearUsers = createAction(`${MODULES.USERS}/CLEAR_USERS`)

const byId = handleActions(
  {
    [getUsersSuccess]: (state, { payload }) => ({
      ...state,
      ...R.indexBy(R.prop('id'))(payload),
    }),
    [clearUsers]: R.always({}),
  },
  {},
)

const allIds = handleActions(
  {
    [getUsersSuccess]: (state, { payload }) =>
      R.uniq([...state, ...R.map(R.prop('id'))(payload)]),
    [clearUsers]: R.always([]),
  },
  [],
)

const isLoading = handleActions(
  {
    [getUsersRequest]: R.T,
    [getUsersSuccess]: R.F,
    [getUsersFailure]: R.F,
  },
  false,
)

const usersReducer = combineReducers({
  byId,
  allIds,
  isLoading,
})

export default usersReducer
