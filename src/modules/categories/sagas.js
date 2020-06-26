import { takeLatest, call, all, put, select, delay } from 'redux-saga/effects'
import {
  getCategoriesRequest,
  getCategoriesSuccess,
  getCategoriesFailure,
  createCategoryRequest,
  createCategorySuccess,
  createCategoryFailure,
  deleteSubcategoryRequest,
  deleteSubcategorySuccess,
  deleteSubcategoryFailure,
  updateCategoryRequest,
  updateCategorySuccess,
  updateCategoryFailure,
  setSelectedCategory,
} from './duck'
import * as Manager from './Manager'
import { getToken } from '../auth'

function* getCategoriesSaga() {
  try {
    const [categories] = yield all([call(Manager.getCategories), delay(1000)])
    yield put(getCategoriesSuccess(categories))
  } catch (ex) {
    yield put(getCategoriesFailure(ex.localeMessage))
  }
}

function* createSubcategorySaga({ payload: { parentId, title } }) {
  try {
    const accessToken = yield select(getToken)
    const newCategory = yield call(Manager.createCategory, {
      token: accessToken,
      body: { title, parentId },
    })

    yield put(createCategorySuccess(newCategory))
  } catch (ex) {
    yield put(createCategoryFailure(ex.localeMessage))
  }
}

function* deleteSubcategorySaga({ payload: { id }, payload }) {
  try {
    const accessToken = yield select(getToken)
    yield call(Manager.deleteSubcategory, { token: accessToken, id })

    yield put(deleteSubcategorySuccess(payload))
    yield put(setSelectedCategory(payload.parentId))
  } catch (ex) {
    yield put(deleteSubcategoryFailure(ex.localeMessage))
  }
}

function* updateCategorySaga({ payload: { id, title }, payload }) {
  try {
    const accessToken = yield select(getToken)

    yield call(Manager.updateSubcategory, {
      token: accessToken,
      body: { id, title },
    })
    yield put(updateCategorySuccess(payload))
  } catch (ex) {
    //
    yield put(updateCategoryFailure())
  }
}

function* categoriesSaga() {
  yield all([
    takeLatest(getCategoriesRequest, getCategoriesSaga),
    takeLatest(createCategoryRequest, createSubcategorySaga),
    takeLatest(deleteSubcategoryRequest, deleteSubcategorySaga),
    takeLatest(updateCategoryRequest, updateCategorySaga),
  ])
}

export default categoriesSaga
