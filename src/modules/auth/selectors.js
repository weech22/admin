import * as R from 'ramda'

const getAuth = R.prop('auth')

export const getToken = R.pipe(
  getAuth,
  R.prop('token'),
)

export const getIsInitializing = R.pipe(
  getAuth,
  R.prop('isInitializing'),
)
