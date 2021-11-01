import {combineReducers} from 'redux'
import {ExampleReducer} from './example'
import {UserReducer} from './user'
import {AlertReducer} from './alert'

const rootReducer = combineReducers({
  exampleSate: ExampleReducer,
  userState: UserReducer,
  alertState: AlertReducer
})

export default rootReducer
