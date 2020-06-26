import { all, call } from 'redux-saga/effects'
import { categoriesSaga } from './categories'
import { authSaga } from './auth'
import { productsSaga } from './products'
import { promotionsSaga } from './promotions'
import { usersSaga } from './users'
import { driversSaga } from './drivers'

function* rootSaga() {
  yield all([
    call(authSaga),
    call(productsSaga),
    call(promotionsSaga),
    call(usersSaga),
    call(categoriesSaga),
    call(driversSaga),
  ])
}

export default rootSaga
