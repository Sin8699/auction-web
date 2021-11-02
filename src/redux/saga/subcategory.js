import {all, takeLatest, put, call} from 'redux-saga/effects'
import {actionTypesSubCategory, setSubCategoryData} from '../actions/subcategory'
import SubCategoryApi from '../../apis/sub-categories'

function* requestSubCategorySaga() {
  const {data, status, error} = yield call(SubCategoryApi.getDocuments)
  if (!error && status === 200) {
    yield put(setSubCategoryData(data))
  }
}

function* watchRequestDataDashboard() {
  yield takeLatest(actionTypesSubCategory.REQUEST_SUB_CATEGORY_DATA, requestSubCategorySaga)
}

export function* subCategorySaga() {
  yield all([watchRequestDataDashboard()])
}
