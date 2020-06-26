import { call, all, put, takeLatest, select } from 'redux-saga/effects'
import * as emailjs from 'emailjs-com'
import {
  getDriversRequest,
  getDriversSuccess,
  getDriversFailure,
  createDriverRequest,
  createDriverFailure,
  createDriverSuccess,
  updateDriverRequest,
  updateDriverFailure,
  updateDriverSuccess,
  sendCredsSuccess,
  sendCredsFailure,
} from './duck'

import { setTaskModalVisible } from '../ui'
import * as DriversManager from './DriversManager'
import { getToken } from '../auth'
import { EMAILJS_USER_ID, EMAILJS_TEMPLATE_ID } from '../../constants'

function* getDriversSaga() {
  try {
    const drivers = yield call(DriversManager.getDrivers)

    yield put(getDriversSuccess(drivers))
  } catch (ex) {
    yield put(getDriversFailure(ex.localeMessage))
  }
}

function* createDriverSaga({ payload: { name, password, phone, login } }) {
  try {
    const accessToken = yield select(getToken)
    const body = { name, password, phone, login }

    yield call(DriversManager.createDriver, {
      body,
      accessToken,
    })

    yield put(createDriverSuccess({ password, login }))
  } catch (ex) {
    yield put(createDriverFailure(ex))
  }

  yield put(setTaskModalVisible(false))
}

function* sendCredsSaga({ payload: { password, login } }) {
  try {
    emailjs.send(
      'mailgun',
      EMAILJS_TEMPLATE_ID,
      {
        password,
        login,
      },
      EMAILJS_USER_ID,
    )

    yield put(sendCredsSuccess())
  } catch (ex) {
    yield put(sendCredsFailure(ex))
  }
}

function* updateDriverSaga({ payload: { id, name, password, phone, login } }) {
  try {
    const accessToken = yield select(getToken)
    const body = { id, name, password, phone, login }

    const newDriver = yield call(DriversManager.updateDriver, {
      body,
      accessToken,
    })

    yield put(updateDriverSuccess(newDriver))
  } catch (ex) {
    yield put(updateDriverFailure(ex))
  }

  yield put(setTaskModalVisible(false))
}

function* driversSaga() {
  yield all([
    takeLatest(createDriverRequest, createDriverSaga),
    takeLatest(updateDriverRequest, updateDriverSaga),
    takeLatest(createDriverSuccess, sendCredsSaga),
    takeLatest(
      [getDriversRequest, updateDriverSuccess, createDriverSuccess],
      getDriversSaga,
    ),
  ])
}

export default driversSaga
