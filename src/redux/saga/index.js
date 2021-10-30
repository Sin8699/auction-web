import {all} from 'redux-saga/effects'
import {exampleSaga} from './example'

function* rootSaga() {
  yield all([exampleSaga()])
}

export default rootSaga
