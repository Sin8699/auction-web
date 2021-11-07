import {all} from 'redux-saga/effects'
import {exampleSaga} from './example'
import {userSaga} from './user'
import {categorySaga} from './category'
import {subCategorySaga} from './subcategory'
import {productSaga} from './product'
import {searchSaga} from './search'
import {biddingProductSaga} from './bidding-product'

function* rootSaga() {
  yield all([
    exampleSaga(),
    userSaga(),
    categorySaga(),
    subCategorySaga(),
    productSaga(),
    searchSaga(),
    biddingProductSaga()
  ])
}

export default rootSaga
