import {combineReducers} from 'redux'
import {exampleReducer} from './example'
import {userReducer} from './user'

const rootReducer = combineReducers({exampleSate: exampleReducer, userState: userReducer})

export default rootReducer
