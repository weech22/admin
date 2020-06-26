import { ENDPOINTS } from '../../API'
import { handleStatuses } from '../../utils'

export const getDrivers = () =>
  fetch(ENDPOINTS.DRIVERS())
    .then(handleStatuses())
    .then(res => res.json())

export const createDriver = ({ body, accessToken }) =>
  fetch(ENDPOINTS.DRIVERS(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  })
    .then(handleStatuses())
    .then(res => res.json())

export const updateDriver = ({ body, accessToken }) =>
  fetch(ENDPOINTS.DRIVERS(), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  }).then(handleStatuses())
