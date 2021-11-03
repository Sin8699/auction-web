import {all} from 'redux-saga/effects'
import {exampleSaga} from './example'
import {userSaga} from './user'
import {categorySaga} from './category'
import {subCategorySaga} from './subcategory'

function* rootSaga() {
  yield all([exampleSaga(), userSaga(), categorySaga(), subCategorySaga()])
}

export default rootSaga
