import { handleStatuses } from '../../utils'
import { ENDPOINTS } from '../../API'
import * as R from 'ramda'

const promotionMapper = R.evolve({
  discount: R.pipe(
    Number,
    Math.round,
  ),
})

export const getPromotions = () =>
  fetch(`${ENDPOINTS.PROMOTIONS()}?filterDisabled=0`)
    .then(handleStatuses())
    .then(res => res.json())
    .then(R.map(promotionMapper))

export const deletePromotion = ({ id, token }) =>
  fetch(ENDPOINTS.PROMOTIONS(id), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(handleStatuses())

export const togglePromotionDisabled = ({ id, token }) =>
  fetch(`${ENDPOINTS.PROMOTIONS(id)}/toggleDisabled`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(handleStatuses())

export const updatePromotion = ({ token, body }) =>
  fetch(ENDPOINTS.PROMOTIONS(), {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  })
    .then(handleStatuses())
    .then(res => res.json())
    .then(R.evolve({ promotion: promotionMapper }))

export const createPromotion = ({ token, body }) =>
  fetch(ENDPOINTS.PROMOTIONS(), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  })
    .then(handleStatuses())
    .then(res => res.json())
    .then(R.evolve({ promotion: promotionMapper }))
