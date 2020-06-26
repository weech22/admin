import { handleStatuses } from '../../utils'
import { ENDPOINTS } from '../../API'

export const getCategories = () =>
  fetch(ENDPOINTS.CATEGORIES())
    .then(handleStatuses())
    .then(res => res.json())
    .catch(ex => {
      throw ex
    })

export const createCategory = ({ token, body }) =>
  fetch(ENDPOINTS.SUBCATEGORY(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
    .then(handleStatuses())
    .then(res => res.json())
    .catch(ex => {
      throw ex
    })

export const deleteSubcategory = ({ token, id }) =>
  fetch(`${ENDPOINTS.SUBCATEGORY()}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(handleStatuses())
    .catch(ex => {
      throw ex
    })

export const updateSubcategory = ({ token, body }) =>
  fetch(`${ENDPOINTS.SUBCATEGORY()}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  }).then(handleStatuses())
