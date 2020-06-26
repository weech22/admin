import * as R from 'ramda'

const getUsers = R.prop('users')

const getById = R.pipe(
  getUsers,
  R.prop('byId'),
)

const getAllIds = R.pipe(
  getUsers,
  R.prop('allIds'),
)

export const getUsersList = R.converge(
  (byId, allIds) => R.map(x => byId[x])(allIds),
  [getById, getAllIds],
)

export const getIsLoading = R.pipe(
  getUsers,
  R.prop('isLoading'),
)
