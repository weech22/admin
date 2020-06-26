import { handleStatuses } from '../../utils'
import { ENDPOINTS } from '../../API'

export const getUsers = ({ filters, token }) =>
  fetch(ENDPOINTS.USERS(filters), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(handleStatuses())
    .then(res => res.json())
    .catch(ex => {
      throw ex
    })

export const setUserStatus = ({ userId, status, token }) =>
  fetch(ENDPOINTS.SET_USER_STATUS(userId, status, token), {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(handleStatuses().then(res => res.json()))
    .catch(ex => {
      throw ex
    })
