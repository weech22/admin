import { call, all, put, takeLatest, select, delay } from 'redux-saga/effects'
import {
  getProductsRequest,
  getProductsSuccess,
  getProductsFailure,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,
  clearProducts,
  updateProduct,
  createProductRequest,
  createProductFailure,
  createProductSuccess,
  updateProductSuccess,
  disabledProductRequest,
  disabledProductSuccess,
  disabledProductFailure,
} from './duck'
import {
  getCategoriesList,
  setSelectedCategory,
  resetSelectedCategory,
  getSelectedCategory,
  getSelectedCategoryEntity,
  CategoriesManager,
  updateCategories,
} from '../categories'
import { setTaskModalVisible } from '../ui'
import * as ProductsManager from './ProductsManager'
import { getToken } from '../auth'
import { getSelectedProductInfo } from './selectors'
import { createBody, destructById } from '../../utils/functions'

const getCategoriesForLoadingProducts = (categories, categoryForLoading) => {
  const allCategoriesById = destructById(categories)

  const selectedCategory = allCategoriesById[categoryForLoading]

  if (!selectedCategory) {
    return []
  }

  return selectedCategory.subcategories && selectedCategory.subcategories.length
    ? selectedCategory.subcategories.map(x => x.id)
    : [selectedCategory.id]
}

function* selectCategorySaga() {
  yield put(getProductsRequest({ discountType: 'simple' }))
}

function* getProductsSaga({
  payload: { searchLine, discountType, withoutPromotion },
}) {
  try {
    if (searchLine === '') {
      yield put(clearProducts())
      return
    }

    const categories = yield select(getCategoriesList)
    const selectedCategory = yield select(getSelectedCategory)
    const categoriesToShow = getCategoriesForLoadingProducts(
      categories,
      selectedCategory,
    )

    const [loadedProducts] = yield all([
      call(ProductsManager.getProducts, {
        categories: searchLine ? undefined : categoriesToShow,
        search: searchLine || undefined,
        discountType,
        withoutPromotion,
        filterDisabled: '0',
      }),
      delay(500),
    ])

    yield put(getProductsSuccess(loadedProducts))
  } catch (ex) {
    yield put(getProductsFailure(ex.localeMessage))
  }
}

function* deleteProductSaga({ payload: id }) {
  try {
    const accessToken = yield select(getToken)

    yield call(ProductsManager.deleteProduct, {
      token: accessToken,
      id,
    })
    yield put(deleteProductSuccess(id))
    const categories = yield call(CategoriesManager.getCategories)
    yield put(updateCategories(categories))
  } catch (ex) {
    //
    yield put(deleteProductFailure())
  }
}

function* updateProductSaga({ payload }) {
  yield put(setTaskModalVisible(true))

  try {
    const accessToken = yield select(getToken)
    const body = createBody(payload)

    const newProduct = yield call(ProductsManager.updateProduct, {
      body,
      accessToken,
    })

    const selectedCategory = yield select(getSelectedCategoryEntity)
    const isMainCategory =
      selectedCategory && selectedCategory.subcategories !== undefined
    const selectedProduct = yield select(getSelectedProductInfo)

    if (!isMainCategory && selectedProduct.categoryId !== payload.categoryId) {
      const categories = yield call(CategoriesManager.getCategories)
      yield put(updateCategories(categories))
      yield put(resetSelectedCategory())
      yield put(clearProducts())
    }

    yield put(updateProductSuccess(newProduct))
  } catch (ex) {
    //
  }

  yield put(setTaskModalVisible(false))
}

function* createProductSaga({ payload }) {
  yield put(setTaskModalVisible(true))

  try {
    const accessToken = yield select(getToken)
    const body = yield call(createBody, payload)

    const { product: newProduct } = yield call(ProductsManager.createProduct, {
      body,
      accessToken,
    })

    const categories = yield call(CategoriesManager.getCategories)
    yield put(updateCategories(categories))

    const selectedCategoryId = yield select(getSelectedCategory)
    const selectedCategory = yield select(getSelectedCategoryEntity)

    if (
      selectedCategoryId === newProduct.categoryId ||
      (selectedCategory && selectedCategory.subcategories)
    ) {
      yield put(createProductSuccess(newProduct))
    } else {
      yield put(createProductSuccess())
    }
  } catch (ex) {
    yield put(createProductFailure(ex))
  }

  yield put(setTaskModalVisible(false))
}

function* disableProductSaga({ payload: id }) {
  try {
    const accessToken = yield select(getToken)

    yield call(ProductsManager.disableProduct, {
      token: accessToken,
      id,
    })
    yield put(disabledProductSuccess(id))
  } catch (ex) {
    //
    yield put(disabledProductFailure(id))
  }
}

function* productsSaga() {
  yield all([
    takeLatest(setSelectedCategory, selectCategorySaga),
    takeLatest(getProductsRequest, getProductsSaga),
    takeLatest(deleteProductRequest, deleteProductSaga),
    takeLatest(updateProduct, updateProductSaga),
    takeLatest(createProductRequest, createProductSaga),
    takeLatest(disabledProductRequest, disableProductSaga),
  ])
}

export default productsSaga
