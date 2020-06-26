import * as R from 'ramda'

const getPromotions = R.prop('promotions')

export const getIsLoadingPromotions = R.pipe(
  getPromotions,
  R.prop('isLoading'),
)

export const getById = R.pipe(
  getPromotions,
  R.prop('byId'),
)

export const getAllIds = R.pipe(
  getPromotions,
  R.prop('allIds'),
)

export const getPromotionsList = R.converge(
  (byId, allIds) => R.map(x => byId[x])(allIds),
  [getById, getAllIds],
)

export const getSelectedPromotion = R.pipe(
  getPromotions,
  R.prop('selectedPromotion'),
)

export const getSelectedPromotionEntity = R.converge((all, id) => all[id], [
  getById,
  getSelectedPromotion,
])

export const getIsCreatingPromotion = R.pipe(
  getPromotions,
  R.prop('isCreating'),
)

export const getPromotionProduct = R.pipe(
  getPromotions,
  R.prop('promotionProduct'),
)

export const getInitialPromotionValues = R.converge(
  (promotionId, allPromotions, isCreating) => {
    if (isCreating) {
      return { discount: 0 }
    }

    const selectedPromotion = R.evolve({ product: R.prop('id') })(
      allPromotions[promotionId],
    )

    return selectedPromotion || { discount: 0 }
  },
  [getSelectedPromotion, getById, getIsCreatingPromotion],
)
