import {all, takeLatest, put, call} from 'redux-saga/effects'
import {actionTypesCategory, setCategoryData} from '../actions/category'
import CategoryApi from '../../apis/categories'

function* requestCategorySaga() {
  const {data, status, error} = yield call(CategoryApi.getDocuments)
  if (!error && status === 200) {
    yield put(setCategoryData(data))
  }
}

function* watchRequestDataDashboard() {
  yield takeLatest(actionTypesCategory.REQUEST_CATEGORY_DATA, requestCategorySaga)
}

export function* categorySaga() {
  yield all([watchRequestDataDashboard()])
}
