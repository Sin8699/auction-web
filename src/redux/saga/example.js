import {all, takeLatest, put, call} from 'redux-saga/effects'
import {actionTypesExample, setExampleData} from '../actions/example'
import appAPI from 'apis/config'

const getExampleData = async () => {
  try {
    const response = await appAPI.get('https://jsonplaceholder.typicode.com/todos')
    return response
  } catch (error) {
    console.error(error)
    return {}
  }
}

function* requestExampleSaga() {
  try {
    const response = yield call(getExampleData)
    yield put(setExampleData(response?.data || []))
  } catch (error) {
    console.error(error)
  }
}

function* watchRequestDataDashboard() {
  yield takeLatest(actionTypesExample.REQUEST_EXAMPLE_DATA, requestExampleSaga)
}

export function* exampleSaga() {
  yield all([watchRequestDataDashboard()])
}
