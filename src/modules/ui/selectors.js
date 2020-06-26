import * as R from 'ramda'

const getUi = R.prop('ui')

export const getTaskModalVisible = R.pipe(
  getUi,
  R.prop('taskModalVisible'),
)
