import {all, takeLatest, put, call} from 'redux-saga/effects'
import {actionTypesSearch, setSearch} from '../actions/search'
import SearchApi from '../../apis/search'

function* requestSearchSaga({query}) {
  const res = yield call(SearchApi.searchGlobals, query)
  const {data, error} = res
  if (!error) {
    yield put(setSearch(data))
  }
}

function* watchRequestDataDashboard() {
  yield takeLatest(actionTypesSearch.SEARCHING, requestSearchSaga)
}

export function* searchSaga() {
  yield all([watchRequestDataDashboard()])
}
