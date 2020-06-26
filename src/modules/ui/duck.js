import { combineReducers } from 'redux'
import { createAction, handleAction } from 'redux-actions'
import { MODULES } from '../../constants'

export const setTaskModalVisible = createAction(
  `${MODULES}/SET_TASK_MODAL_VISIBLE`,
)

const taskModalVisible = handleAction(
  setTaskModalVisible,
  (_, { payload }) => !!payload,
  false,
)

const uiReducer = combineReducers({
  taskModalVisible,
})

export default uiReducer
