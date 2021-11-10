import {all, takeLatest, put, call} from 'redux-saga/effects'
import {actionTypesUser, setProfile, setListUserForAdmin} from '../actions/user'
import UserApi from 'apis/user'

function* requestProfile() {
  const {data, status, error} = yield call(UserApi.getProfile)
  if (!error && status === 200) {
    yield put(setProfile(data))
  }
}
function* watchRequestDataDashboard() {
  yield takeLatest(actionTypesUser.REQUEST_PROFILE, requestProfile)
}

function* requestLítUserForAdmin() {
  const {data, status, error} = yield call(UserApi.getUsersByAdmin)
  if (!error && status === 200) {
    yield put(setListUserForAdmin(data))
  }
}
function* watchRequestDataUsersDashboard() {
  yield takeLatest(actionTypesUser.REQUEST_LIST_USER_BY_ADMIN, requestLítUserForAdmin)
}

export function* userSaga() {
  yield all([watchRequestDataDashboard(), watchRequestDataUsersDashboard()])
}
