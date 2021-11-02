import {combineReducers} from 'redux'
import {ExampleReducer} from './example'
import {UserReducer} from './user'
import {AlertReducer} from './alert'
import {CategoryReducer} from './category'

const rootReducer = combineReducers({
  exampleSate: ExampleReducer,
  userState: UserReducer,
  alertState: AlertReducer,
  categoryState: CategoryReducer
})

export default rootReducer
