import {all} from 'redux-saga/effects'
import {exampleSaga} from './example'
import {userSaga} from './user'
import {categorySaga} from './category'

function* rootSaga() {
  yield all([exampleSaga(), userSaga(), categorySaga()])
}

export default rootSaga
