import { takeLatest, call, all, put } from 'redux-saga/effects'
import { stopSubmit, startSubmit } from 'redux-form'
import {
  sendLogin,
  setToken,
  startInitialize,
  stopInitialize,
  logout,
} from './duck'
import * as AuthRepository from './AuthRepository'
import * as AuthManager from './AuthManager'
import { FORMS, ROUTES } from '../../constants'
import { NavigationService } from '../../services'

function* loginSaga({ payload }) {
  try {
    yield put(startSubmit(FORMS.LOGIN))
    const token = yield call(AuthManager.login, { body: payload })
    yield call(AuthRepository.setToken, token)
    yield put(setToken(token))
    yield put(stopSubmit(FORMS.LOGIN))
    yield call(NavigationService.navigate, ROUTES.MAIN)
  } catch (ex) {
    yield put(
      stopSubmit(FORMS.LOGIN, {
        description: ex.localeMessage,
      }),
    )
  }
}

function* initialSaga() {
  const token = yield call(AuthRepository.getToken)
  yield put(setToken(token || null))
  yield put(stopInitialize())
}

function* logoutSaga() {
  try {
    yield call(AuthRepository.clearToken)
  } catch (ex) {
    //
  }
}

function* authSaga() {
  yield all([
    takeLatest(sendLogin, loginSaga),
    takeLatest(startInitialize, initialSaga),
    takeLatest(logout, logoutSaga),
  ])
}

export default authSaga
