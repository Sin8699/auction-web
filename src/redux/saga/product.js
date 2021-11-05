import {all, takeLatest, put, call} from 'redux-saga/effects'
import {actionTypesProduct, setProductsData, setProduct} from '../actions/product'
import ProductJsonApi from 'apis/products/productJson'

function* requestListProductsSaga() {
  const {data, status, error} = yield call(ProductJsonApi.getDocuments)
  if (!error && status === 200) {
    yield put(setProductsData(data))
  }
}

function* watchRequestListProductsDashboard() {
  yield takeLatest(actionTypesProduct.REQUEST_PRODUCTS_DATA, requestListProductsSaga)
}

function* requestProductSaga(action) {
  const {data, status, error} = yield call(ProductJsonApi.getDocument, action.idProduct)
  if (!error && status === 200) {
    yield put(setProduct(data))
  }
}

function* watchRequestProductDashboard() {
  yield takeLatest(actionTypesProduct.REQUEST_PRODUCT, requestProductSaga)
}

export function* productSaga() {
  yield all([watchRequestListProductsDashboard(), watchRequestProductDashboard()])
}
