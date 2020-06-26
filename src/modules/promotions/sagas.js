import { call, put, all, takeLatest, delay, select } from 'redux-saga/effects'
import {
  getPromotionsRequest,
  getPromotionsSuccess,
  getPromotionsFailure,
  deletePromotionRequest,
  deletePromotionSuccess,
  deletePromotionFailure,
  setSelectedPromotion,
  togglePromotionDisable,
  togglePromotionDisableFailure,
  updatePromotionRequest,
  updatePromotionSuccess,
  updatePromotionFailure,
  setPromotionProduct,
  createPromotionRequest,
  createPromotionSuccess,
  createPromotionFailure,
  setPromotionCreating,
} from './duck'
import { startSubmit, stopSubmit } from 'redux-form'
import { getSelectedPromotionEntity } from './selectors'
import { setTaskModalVisible } from '../ui'
import * as PromotionsManager from './PromotionsManager'
import { getToken } from '../auth'
import { FORMS } from '../../constants'

const createPromotionBody = obj => {
  const body = new FormData()

  Object.keys(obj).forEach(key => {
    if (key !== 'background') {
      body.append(key, obj[key])
    } else {
      obj[key] instanceof File && body.append('file', obj[key])
    }
  })

  return body
}

function* getPromotionsSaga() {
  try {
    const [promotions] = yield all([
      call(PromotionsManager.getPromotions),
      delay(1000),
    ])

    yield put(getPromotionsSuccess(promotions))
  } catch (ex) {
    //
    yield put(getPromotionsFailure())
  }
}

function* deletePromotionSaga({ payload: id }) {
  try {
    const token = yield select(getToken)
    yield call(PromotionsManager.deletePromotion, { token, id })
    yield put(deletePromotionSuccess(id))
    yield put(setSelectedPromotion(null))
  } catch (ex) {
    //
    yield put(deletePromotionFailure())
  }
}

function* togglePromotionDisableSaga({ payload: id }) {
  try {
    const token = yield select(getToken)
    yield call(PromotionsManager.togglePromotionDisabled, { token, id })
  } catch (ex) {
    //
    yield put(togglePromotionDisableFailure(id))
  }
}

function* updatePromotionSaga({ payload }) {
  yield put(setTaskModalVisible(true))
  try {
    const accessToken = yield select(getToken)
    const body = yield call(createPromotionBody, payload)
    const { promotion } = yield call(PromotionsManager.updatePromotion, {
      body,
      token: accessToken,
    })

    yield put(updatePromotionSuccess(promotion))
  } catch (ex) {
    yield put(updatePromotionFailure(ex))
  }
  yield put(setTaskModalVisible(false))
}

function* selectPromotionSaga() {
  const currentPromotion = yield select(getSelectedPromotionEntity)
  if (currentPromotion) {
    yield put(setPromotionProduct(currentPromotion.product))
  }
}

function* createPromotionSaga({ payload }) {
  yield put(setTaskModalVisible(true))

  try {
    const accessToken = yield select(getToken)
    const body = yield call(createPromotionBody, payload)

    const { promotion } = yield call(PromotionsManager.createPromotion, {
      body,
      token: accessToken,
    })
    yield put(createPromotionSuccess(promotion))
    yield put(setPromotionCreating(false))
  } catch (ex) {
    yield put(createPromotionFailure(ex))
  }
  yield put(setTaskModalVisible(false))
}

function* promotionsSaga() {
  yield all([
    takeLatest(getPromotionsRequest, getPromotionsSaga),
    takeLatest(deletePromotionRequest, deletePromotionSaga),
    takeLatest(togglePromotionDisable, togglePromotionDisableSaga),
    takeLatest(updatePromotionRequest, updatePromotionSaga),
    takeLatest(setSelectedPromotion, selectPromotionSaga),
    takeLatest(createPromotionRequest, createPromotionSaga),
  ])
}

export default promotionsSaga
