import * as R from 'ramda'
import { createAction, handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { MODULES } from '../../constants'

export const createDriverRequest = createAction(
  `${MODULES.DRIVERS}/CREATE_DRIVER_REQUEST`,
)

export const createDriverSuccess = createAction(
  `${MODULES.DRIVERS}/CREATE_DRIVER_SUCCESS`,
)

export const createDriverFailure = createAction(
  `${MODULES.DRIVERS}/CREATE_DRIVER_FAILURE`,
)

export const getDriversRequest = createAction(
  `${MODULES.DRIVERS}/GET_DRIVERS_REQUEST`,
)

export const getDriversSuccess = createAction(
  `${MODULES.DRIVERS}/GET_DRIVERS_SUCCESS`,
)

export const getDriversFailure = createAction(
  `${MODULES.DRIVERS}/GET_DRIVERS_FAILURE`,
)

export const updateDriverRequest = createAction(
  `${MODULES.DRIVERS}/UPDATE_DRIVER_REQUEST`,
)

export const updateDriverSuccess = createAction(
  `${MODULES.DRIVERS}/UPDATE_DRIVER_SUCCESS`,
)

export const updateDriverFailure = createAction(
  `${MODULES.DRIVERS}/UPDATE_DRIVER_FAILURE`,
)

export const selectDriver = createAction(`${MODULES.DRIVERS}/SELECT_DRIVER`)

export const startCreatingDriver = createAction(
  `${MODULES.DRIVERS}/START_CREATING_DRIVER`,
)

export const sendCredsSuccess = createAction(
  `${MODULES.DRIVERS}/SEND_CREDS_SUCCESS`,
)

export const sendCredsFailure = createAction(
  `${MODULES.DRIVERS}/SEND_CREDS_FAILURE`,
)

const byId = handleActions(
  {
    [getDriversSuccess]: (state, { payload }) => ({
      ...state,
      ...R.indexBy(R.prop('id'))(payload),
    }),
  },
  {},
)

const allIds = handleActions(
  {
    [getDriversSuccess]: (state, { payload }) =>
      R.uniq([...state, ...R.map(R.prop('id'))(payload)]),
  },
  [],
)

const isCreatingDriver = handleActions(
  {
    [startCreatingDriver]: R.T,
    [createDriverSuccess]: R.F,
    [selectDriver]: R.F,
  },
  null,
)

const isPostingDriver = handleActions(
  {
    [createDriverRequest]: R.T,
    [createDriverSuccess]: R.F,
    [createDriverFailure]: R.F,
  },
  null,
)

const driverError = handleActions(
  {
    [createDriverFailure]: R.T,
    [createDriverSuccess]: R.F,
    [createDriverRequest]: R.F,
  },
  false,
)

const selectedDriver = handleActions(
  {
    [selectDriver]: (_, { payload }) => payload,
    [startCreatingDriver]: R.always(null),
    [updateDriverSuccess]: R.always(null),
  },
  null,
)

const isLoading = handleActions(
  {
    [getDriversRequest]: R.T,
    [getDriversSuccess]: R.F,
    [getDriversFailure]: R.F,
  },
  false,
)

const driversReducer = combineReducers({
  selectedDriver,
  isLoading,
  isCreatingDriver,
  isPostingDriver,
  byId,
  allIds,
  driverError,
})

export default driversReducer
