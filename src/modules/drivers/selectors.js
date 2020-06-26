import * as R from 'ramda'

export const getDrivers = R.prop('drivers')

export const getIsLoading = R.pipe(
  getDrivers,
  R.prop('isLoading'),
)

const getById = R.pipe(
  getDrivers,
  R.prop('byId'),
)

const getAllIds = R.pipe(
  getDrivers,
  R.prop('allIds'),
)

export const getDriverList = R.converge(
  (byId, allIds) => R.map(x => byId[x])(allIds),
  [getById, getAllIds],
)

export const getIsCreatingDriver = R.pipe(
  getDrivers,
  R.prop('isCreatingDriver'),
)

export const getIsPostingDriver = R.pipe(
  getDrivers,
  R.prop('isPostingDriver'),
)

export const getSelectedDriver = R.pipe(
  getDrivers,
  R.prop('selectedDriver'),
)

export const getDriverError = R.pipe(
  getDrivers,
  R.prop('driverError'),
)

export const getFormInitialValues = state => {
  const selectedDriver = getSelectedDriver(state)
  const isCreating = getIsCreatingDriver(state)

  if (selectedDriver) {
    return getById(state)[selectedDriver]
  }

  if (isCreating) {
    return {}
  }
}
