import {combineReducers} from 'redux'
import {exampleReducer} from './example'

const rootReducer = combineReducers({exampleSate: exampleReducer})

export default rootReducer
