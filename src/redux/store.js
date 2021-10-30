import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootSaga from './saga'
import rootReducer from './reducers'
import appAPI from 'apis/config'

const createAxiosMiddleware = axios => () => {
  axios.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
  )
  return next => action => next(action)
}

const sagaMiddleware = createSagaMiddleware()
const axiosMiddleware = createAxiosMiddleware(appAPI)

const bindMiddleware = middleware => {
  if (process?.env?.NODE_ENV !== 'production')
    return composeWithDevTools(applyMiddleware(...middleware))

  return applyMiddleware(...middleware)
}

const reduxCompose = compose(bindMiddleware([sagaMiddleware, axiosMiddleware]))

const appStore = createStore(rootReducer, reduxCompose)

sagaMiddleware.run(rootSaga)

export default appStore
