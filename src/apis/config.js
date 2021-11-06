import axios from 'axios'
import {loadFromStorage} from 'utils/storage'

const BASE_URL = 'http://localhost:5001/v1'

const baseHeaders = config => ({
  'Content-Type': 'application/json, multipart/form-data',
  ...config.headers
})

const appAPI = axios.create()
appAPI.defaults.baseURL = BASE_URL
appAPI.interceptors.request.use(config => {
  const {accessToken} = loadFromStorage('user') || ''
  return {
    ...config,
    headers: {
      ...baseHeaders(config),
      ...(accessToken ? {Authorization: `Bearer ${accessToken}`} : {})
    }
  }
})

export default appAPI
