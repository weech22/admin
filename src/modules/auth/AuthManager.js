import { handleStatuses } from '../../utils'
import { ENDPOINTS } from '../../API'

export const login = ({ body }) =>
  fetch(ENDPOINTS.LOGIN(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then(handleStatuses())
    .then(res => res.json())
    .then(({ accessToken }) => accessToken)
    .catch(ex => {
      throw ex
    })
