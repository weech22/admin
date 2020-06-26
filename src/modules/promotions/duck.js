import {
  createAction,
  combineActions,
  handleActions,
  handleAction,
} from 'redux-actions'
import * as R from 'ramda'
import { combineReducers } from 'redux'
import { MODULES } from '../../constants'

export const getPromotionsRequest = createAction(
  `${MODULES.PROMOTIONS}/GET_PROMOTIONS`,
)
export const getPromotionsSuccess = createAction(
  `${MODULES.PROMOTIONS}/GET_PROMOTIONS_SUCCESS`,
)

export const getPromotionsFailure = createAction(
  `${MODULES.PROMOTIONS}/GET_PROMOTIONS_FAILURE`,
)

export const createPromotionRequest = createAction(
  `${MODULES.PROMOTIONS}/CREATE_PROMOTION_REQUEST`,
)

export const createPromotionSuccess = createAction(
  `${MODULES.PROMOTIONS}/CREATE_PROMOTION_SUCCESS`,
)

export const createPromotionFailure = createAction(
  `${MODULES.PROMOTIONS}/CREATE_PROMOTION_FAILURE`,
)

export const updatePromotionRequest = createAction(
  `${MODULES.PROMOTIONS}/UPDATE_PROMOTION_REQUEST`,
)

export const updatePromotionSuccess = createAction(
  `${MODULES.PROMOTIONS}/UPDATE_PROMOTION_SUCCESS`,
)

export const updatePromotionFailure = createAction(
  `${MODULES.PROMOTIONS}/UPDATE_PROMOTION_FAILURE`,
)

export const deletePromotionRequest = createAction(
  `${MODULES.PROMOTIONS}/DELETE_PROMOTION_REQUEST`,
)

export const deletePromotionSuccess = createAction(
  `${MODULES.PROMOTIONS}/DELETE_PROMOTION_SUCCESS`,
)

export const deletePromotionFailure = createAction(
  `${MODULES.PROMOTIONS}/DELETE_PROMOTION_FAILURE`,
)

export const setSelectedPromotion = createAction(
  `${MODULES.PROMOTIONS}/SET_SELECTED_PROMOTION`,
)

export const togglePromotionDisable = createAction(
  `${MODULES.PROMOTIONS}/TOGGLE_PROMOTION_DISABLE`,
)

export const togglePromotionDisableFailure = createAction(
  `${MODULES.PROMOTIONS}/TOGGLE_PROMOTION_FAILURE`,
)

export const resetSelectedPromotion = createAction(
  `${MODULES.PROMOTIONS}/RESET_SELECTED_PROMOTION`,
)

export const setPromotionCreating = createAction(
  `${MODULES.PROMOTIONS}/SET_PROMOTION_CREATING`,
)

export const setPromotionProduct = createAction(
  `${MODULES.PROMOTIONS}/SET_PROMOTION_PRODUCT`,
)

const byId = handleActions(
  {
    [getPromotionsSuccess]: R.pipe(
      R.nthArg(1),
      R.prop('payload'),
      R.indexBy(R.prop('id')),
    ),
    [deletePromotionSuccess]: (state, { payload }) => R.dissoc(payload, state),
    [combineActions(togglePromotionDisable, togglePromotionDisableFailure)]: (
      state,
      { payload },
    ) => R.evolve({ [payload]: { disabled: R.not } })(state),
    [combineActions(updatePromotionSuccess, createPromotionSuccess)]: (
      state,
      { payload },
    ) => ({
      ...state,
      [payload.id]: payload,
    }),
  },
  [],
)

const allIds = handleActions(
  {
    [getPromotionsSuccess]: R.pipe(
      R.nthArg(1),
      R.prop('payload'),
      R.map(R.prop('id')),
    ),
    [deletePromotionSuccess]: (state, { payload }) =>
      state.filter(x => x !== payload),
    [createPromotionSuccess]: (state, { payload }) => [...state, payload.id],
  },
  [],
)

const isLoading = handleActions(
  {
    [getPromotionsRequest]: R.T,
    [getPromotionsSuccess]: R.F,
    [getPromotionsFailure]: R.F,
  },
  false,
)

const isUpdating = handleActions(
  {
    [updatePromotionRequest]: R.T,
    [updatePromotionSuccess]: R.F,
    [updatePromotionFailure]: R.F,
  },
  false,
)

const selectedPromotion = handleActions(
  {
    [setSelectedPromotion]: (_, { payload }) => payload,
    [resetSelectedPromotion]: R.always(null),
  },
  null,
)

const isCreating = handleAction(
  setPromotionCreating,
  (_, { payload }) => !!payload,
  false,
)

const promotionProduct = handleActions(
  {
    [setPromotionProduct]: (state, { payload }) => payload || state,
  },
  null,
)

const categoriesReducer = combineReducers({
  byId,
  allIds,
  isLoading,
  isUpdating,
  isCreating,
  selectedPromotion,
  promotionProduct,
})

export default categoriesReducer
