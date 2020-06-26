import querystring from 'query-string'
import * as R from 'ramda'
import { ENDPOINTS } from '../../API'
import { handleStatuses } from '../../utils'

window.querystring = querystring

const productMapper = product => ({
  ...product,
  price: Number(product.price),
  discount: Math.round(Number(product.discount)),
  minCount: Number(product.minCount),
})

export const getProducts = filters =>
  fetch(
    ENDPOINTS.PRODUCTS(
      querystring.stringify(filters, { arrayFormat: 'bracket' }),
    ),
  )
    .then(handleStatuses())
    .then(res => res.json())
    .then(R.map(productMapper))

export const deleteProduct = ({ id, token }) =>
  fetch(ENDPOINTS.PRODUCT(id), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(handleStatuses())

export const updateProduct = ({ body, accessToken }) =>
  fetch(ENDPOINTS.PRODUCTS(), {
    method: 'PUT',
    headers: {
      //'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}`,
    },

    body,
  })
    .then(handleStatuses())
    .then(res => res.json())
    .then(productMapper)

export const createProduct = ({ body, accessToken }) =>
  fetch(ENDPOINTS.PRODUCTS(), {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}`,
    },
    body,
  })
    .then(handleStatuses())
    .then(res => res.json())
    .then(R.evolve({ product: productMapper }))

export const disableProduct = ({ id, token }) =>
  fetch(ENDPOINTS.TOGGLE_DISABLED_PRODUCT(id), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(handleStatuses())

export const getProductById = ({ id }) =>
  fetch(ENDPOINTS.PRODUCT(id))
    .then(handleStatuses())
    .then(res => res.json())
