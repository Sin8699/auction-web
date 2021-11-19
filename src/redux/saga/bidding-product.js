import {all, takeLatest, put, call} from 'redux-saga/effects'
import {
  actionTypesBiddingProduct,
  setBiddingProductsData,
  setBiddingProduct,
  setListBiddingProductHasSold
} from '../actions/bidding-product'
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

function* requestListBiddingProductsHasSoldSaga() {
  const {data, status, error} = yield call(BiddingProductApi.getDocumentsHasSold)
  if (!error && status === 200) {
    yield put(setListBiddingProductHasSold(data))
  }
}

function* watchRequestListBiddingProductsHasSoldDashboard() {
  yield takeLatest(
    actionTypesBiddingProduct.REQUEST_LIST_BIDDING_PRODUCTS_HAS_SOLD,
    requestListBiddingProductsHasSoldSaga
  )
}

function* requestBiddingProductSaga(action) {
  const {data, status, error} = yield call(
    BiddingProductApi.getDocumentByIdProduct,
    action.idProduct
  )

  if (!error && status === 200) {
    yield put(setBiddingProduct(data))
  }
}

function* watchRequestBiddingProductDashboard() {
  yield takeLatest(actionTypesBiddingProduct.REQUEST_BIDDING_PRODUCT, requestBiddingProductSaga)
}

export function* biddingProductSaga() {
  yield all([
    watchRequestListBiddingProductsDashboard(),
    watchRequestBiddingProductDashboard(),
    watchRequestListBiddingProductsHasSoldDashboard()
  ])
}
