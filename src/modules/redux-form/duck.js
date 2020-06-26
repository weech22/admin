import { getFormSubmitErrors, getFormValues } from 'redux-form'
import * as R from 'ramda'
import { FORMS } from '../../constants'

export const getLoginErrors = getFormSubmitErrors(FORMS.LOGIN)

export const getPromotionFormValues = state =>
  getFormValues(FORMS.PROMOTION_EDITOR)(state)

export const getPromotionFormProduct = R.pipe(
  getPromotionFormValues,
  R.prop('product'),
)

export const getPromotionDiscount = R.pipe(
  getPromotionFormValues,
  R.prop('discount'),
)
