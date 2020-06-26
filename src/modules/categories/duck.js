import {
  createAction,
  handleAction,
  handleActions,
  combineActions,
} from 'redux-actions'
import * as R from 'ramda'
import { combineReducers } from 'redux'
import { MODULES } from '../../constants'

export const getCategoriesRequest = createAction(
  `${MODULES.CATEGORIES}/GET_CATEGORIES`,
)
export const getCategoriesSuccess = createAction(
  `${MODULES.CATEGORIES}/GET_CATEGORIES_SUCCESS`,
)

export const getCategoriesFailure = createAction(
  `${MODULES.CATEGORIES}/GET_CATEGORIES_FAILURE`,
)

export const createSubcategory = createAction(
  `${MODULES.CATEGORIES}/CREATE_SUBCATEGORY`,
)

export const createCategoryRequest = createAction(
  `${MODULES.CATEGORIES}/CREATE_CATEGORY_REQUEST`,
)

export const createCategorySuccess = createAction(
  `${MODULES.CATEGORIES}/CREATE_CATEGORY_SUCCESS`,
)

export const createCategoryFailure = createAction(
  `${MODULES.CATEGORIES}/CREATE_CATEGORY_FAILURE`,
)

export const updateCategoryRequest = createAction(
  `${MODULES.CATEGORIES}/UPDATE_CATEGORY_REQUEST`,
)

export const updateCategorySuccess = createAction(
  `${MODULES.CATEGORIES}/UPDATE_CATEGORY_SUCCESS`,
)

export const updateCategoryFailure = createAction(
  `${MODULES.CATEGORIES}/UPDATE_CATEGORY_FAILURE`,
)

export const appendNewSubcategory = createAction(
  `${MODULES.CATEGORIES}/APPEND_NEW_SUBCATEGORY`,
)

export const deleteSubcategoryRequest = createAction(
  `${MODULES.CATEGORIES}/DELETE_SUBCATEGORY_REQUEST`,
)

export const deleteSubcategorySuccess = createAction(
  `${MODULES.CATEGORIES}/DELETE_SUBCATEGORY_SUCCESS`,
)

export const deleteSubcategoryFailure = createAction(
  `${MODULES.CATEGORIES}/DELETE_SUBCATEGORY_FAILURE`,
)

export const setSelectedCategory = createAction(
  `${MODULES.CATEGORIES}/SET_SELECTED_CATEGORY`,
)

export const resetSelectedCategory = createAction(
  `${MODULES.CATEGORIES}/RESET_SELECTED_CATEGORY`,
)

export const updateCategories = createAction(
  `${MODULES.CATEGORIES}/UPDATE_CATEGOERIES`,
)

const byId = handleActions(
  {
    [combineActions(getCategoriesSuccess, updateCategories)]: R.pipe(
      R.nthArg(1),
      R.prop('payload'),
      R.indexBy(R.prop('id')),
    ),
    [createCategorySuccess]: (state, { payload }) =>
      R.evolve({
        [payload.parentId]: {
          subcategories: R.append(payload),
        },
      })(state),

    [deleteSubcategorySuccess]: (state, { payload }) =>
      R.evolve({
        [payload.parentId]: {
          subcategories: R.reject(category => category.id === payload.id),
        },
      })(state),
    [updateCategorySuccess]: (state, { payload }) =>
      R.evolve({
        [payload.parentId]: {
          subcategories: R.map(subcategory =>
            subcategory.id === payload.id
              ? { ...subcategory, ...payload }
              : subcategory,
          ),
        },
      })(state),
  },
  {},
)

const allIds = handleAction(
  getCategoriesSuccess,
  R.pipe(
    R.nthArg(1),
    R.prop('payload'),
    R.map(R.prop('id')),
  ),
  [],
)

const isLoading = handleActions(
  {
    [getCategoriesRequest]: R.T,
    [getCategoriesSuccess]: R.F,
    [getCategoriesFailure]: R.F,
  },
  false,
)

const isUpdating = handleActions(
  {
    [updateCategoryRequest]: R.T,
    [updateCategorySuccess]: R.F,
    [updateCategoryFailure]: R.F,
  },
  false,
)

const selectedCategory = handleActions(
  {
    [setSelectedCategory]: (_, { payload }) => payload,
    [resetSelectedCategory]: R.always(null),
  },
  null,
)

const categoriesReducer = combineReducers({
  byId,
  allIds,
  isLoading,
  isUpdating,
  selectedCategory,
})

export default categoriesReducer
