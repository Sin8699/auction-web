import {all} from 'redux-saga/effects'
import {exampleSaga} from './example'
import {userSaga} from './user'

function* rootSaga() {
  yield all([exampleSaga(), userSaga()])
}

export default rootSaga
