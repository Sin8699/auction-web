import {all, takeLatest, put, call} from 'redux-saga/effects'
import {actionTypesBiddingProduct, setBiddingProductsData} from '../actions/bidding-product'
import BiddingProductApi from 'apis/bidding-product/apiObject'

function* requestListBiddingProductsSaga() {
  const {data, status, error} = yield call(BiddingProductApi.getDocuments)
  if (!error && status === 200) {
    yield put(setBiddingProductsData(data))
  }
}

function* watchRequestListBiddingProductsDashboard() {
  yield takeLatest(
    actionTypesBiddingProduct.REQUEST_BIDDING_PRODUCTS_DATA,
    requestListBiddingProductsSaga
  )
}

export function* biddingProductSaga() {
  yield all([watchRequestListBiddingProductsDashboard()])
}
