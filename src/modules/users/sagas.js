import { takeLatest, call, all, put, select, delay } from 'redux-saga/effects'
import {
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
  setUserStatusRequest,
  setUserStatusSuccess,
  setUserStatusFailure,
} from './duck'
import { getToken } from '../auth'
import * as UsersManager from './UsersManager'

function* getUsersSaga({ payload: { direction, page } }) {
  try {
    const documentHeight = document.body.clientHeight
    const filters = `sortBy=registrationTime${
      page || page === 0
        ? `&countOnPage=${Math.round(documentHeight / 47)}&page=` + page
        : ''
    }${direction ? '&direction=' + direction : ''}`

    const token = yield select(getToken)
    const data = {
      filters,
      token,
    }

    const users = yield call(UsersManager.getUsers, data)

    const userList = users.results ? users.results : users

    yield put(getUsersSuccess(userList))
  } catch (ex) {
    yield put(getUsersFailure(ex))
  }
}

function* setUserStatusSaga({ payload: { userId, status } }) {
  try {
    const token = yield select(getToken)
    yield call(UsersManager.setUserStatus, { userId, status, token })
    yield put(setUserStatusSuccess)
  } catch (ex) {
    yield put(setUserStatusFailure(ex))
  }
}

function* usersSaga() {
  yield all([
    takeLatest(getUsersRequest, getUsersSaga),
    takeLatest(setUserStatusRequest, setUserStatusSaga),
  ])
}

export default usersSaga
