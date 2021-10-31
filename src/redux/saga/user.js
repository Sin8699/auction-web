import {all, takeLatest, put, call} from 'redux-saga/effects'
import {actionTypesUser, setProfile} from '../actions/user'
import appAPI from 'apis/config'

const getProfile = async () => {
  try {
    const response = await appAPI.get('http://localhost:5001/v1/auth')
    return response
  } catch (error) {
    console.error(error)
    return {}
  }
}

function* requestProfile() {
  try {
    const response = yield call(getProfile)
    yield put(setProfile(response?.data || {}))
  } catch (error) {
    console.error(error)
  }
}

function* watchRequestDataDashboard() {
  yield takeLatest(actionTypesUser.REQUEST_PROFILE, requestProfile)
}

export function* userSaga() {
  yield all([watchRequestDataDashboard()])
}
