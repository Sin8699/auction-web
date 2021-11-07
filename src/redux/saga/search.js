import { all, takeEvery, put, call } from 'redux-saga/effects'
import { actionTypesSearch, setSearch } from '../actions/search'
import SearchApi from '../../apis/search'

function* requestSearchSaga({ query }) {
  const res = yield call(SearchApi.searchGlobals, { query })
  const { data, error } = res
  if (!error) {
    yield put(setSearch({ data, query: query }))
  }
}

function* watchRequestDataDashboard() {
  yield takeEvery(actionTypesSearch.SEARCHING, requestSearchSaga)
}

export function* searchSaga() {
  yield all([watchRequestDataDashboard()])
}
