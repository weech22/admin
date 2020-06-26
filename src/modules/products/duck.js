import * as R from 'ramda'
import { createAction, handleActions, combineActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { MODULES } from '../../constants'
import { setSelectedCategory } from '../categories'

export const selectProduct = createAction(`${MODULES.PRODUCTS}/SELECT_PRODUCT`)

export const updateProduct = createAction(`${MODULES.PRODUCTS}/UPDATE_PRODUCT`)

export const createProduct = createAction(`${MODULES.PRODUCTS}/CREATE_PRODUCT`)

export const stopCreating = createAction(`${MODULES.PRODUCTS}/STOP_CREATING`)

export const updateProductSuccess = createAction(
  `${MODULES.PRODUCTS}/UPDATE_PRODUCT_SUCCESS`,
)

export const createProductRequest = createAction(
  `${MODULES.PRODUCTS}/CREATE_PRODUCT_REQUEST`,
)

export const createProductSuccess = createAction(
  `${MODULES.PRODUCTS}/CREATE_PRODUCT_SUCCESS`,
)

export const createProductFailure = createAction(
  `${MODULES.PRODUCTS}/CREATE_PRODUCT_FAILURE`,
)

export const getProductsRequest = createAction(
  `${MODULES.PRODUCTS}/GET_PRODUCTS_REQUEST`,
)

export const getProductsSuccess = createAction(
  `${MODULES.PRODUCTS}/GET_PRODUCTS_SUCCESS`,
)

export const getProductsFailure = createAction(
  `${MODULES.PRODUCTS}/GET_PRODUCTS_FAILURE`,
)

export const cancelProductsLoading = createAction(
  `${MODULES.PRODUCTS}/CANCEL_PRODUCTS_LOADING`,
)

export const clearProducts = createAction(`${MODULES.PRODUCTS}/CLEAR_PRODUCTS`)

export const deleteProductRequest = createAction(
  `${MODULES.PRODUCTS}/DELETE_PRODUCT_REQUEST`,
)

export const deleteProductSuccess = createAction(
  `${MODULES.PRODUCTS}/DELETE_PRODUCT_SUCCESS`,
)

export const deleteProductFailure = createAction(
  `${MODULES.PRODUCTS}/DELETE_PRODUCT_FAILURE`,
)

export const disabledProductRequest = createAction(
  `${MODULES.PRODUCTS}/DISABLE_PRODUCT_REQUEST`,
)

export const disabledProductSuccess = createAction(
  `${MODULES.PRODUCTS}/DISABLE_PRODUCT_SUCCESS`,
)

export const disabledProductFailure = createAction(
  `${MODULES.PRODUCTS}/DISABLE_PRODUCT_FAILURE`,
)

const selectedProduct = handleActions(
  {
    [selectProduct]: (_, { payload }) => payload,
    [createProduct]: R.always(null),
    [clearProducts]: R.always(null),
  },
  null,
)

const byId = handleActions(
  {
    [getProductsFailure]: R.always({}),
    [getProductsSuccess]: R.pipe(
      R.nthArg(1),
      R.prop('payload'),
      R.indexBy(R.prop('id')),
    ),
    [createProductSuccess]: (state, { payload }) =>
      payload
        ? {
            ...state,
            [payload.id]: payload,
          }
        : state,
    [updateProductSuccess]: (state, { payload }) => ({
      ...state,
      [payload.id]: payload,
    }),
    [clearProducts]: R.always({}),
    [deleteProductSuccess]: (state, { payload }) => R.dissoc(payload, state),
    [combineActions(disabledProductRequest, disabledProductFailure)]: (
      state,
      { payload },
    ) =>
      R.evolve({
        [payload]: {
          disabled: R.not,
        },
      })(state),
  },
  {},
)

const allIds = handleActions(
  {
    [getProductsFailure]: R.always([]),
    [getProductsSuccess]: R.pipe(
      R.nthArg(1),
      R.prop('payload'),
      R.map(R.prop('id')),
    ),
    [createProductSuccess]: (state, { payload }) =>
      payload ? [...state, payload.id] : state,
    [clearProducts]: R.always([]),
    [deleteProductSuccess]: (state, { payload }) =>
      state.filter(x => x !== payload),
  },
  [],
)

const isLoading = handleActions(
  {
    [setSelectedCategory]: R.T,
    [getProductsRequest]: R.T,
    [cancelProductsLoading]: R.F,
    [getProductsSuccess]: R.F,
    [getProductsFailure]: R.F,
    [clearProducts]: R.F,
  },
  false,
)

const isCreatingProduct = handleActions(
  {
    [selectProduct]: R.F,
    [createProduct]: R.T,
    [createProductRequest]: R.T,
    [createProductSuccess]: R.F,
    [createProductFailure]: R.F,
    [updateProductSuccess]: R.F,
    [stopCreating]: R.F,
  },
  false,
)

const productsReducer = combineReducers({
  selectedProduct,
  byId,
  allIds,
  isLoading,
  isCreatingProduct,
})

export default productsReducer
