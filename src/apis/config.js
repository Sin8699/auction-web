import axios from 'axios'
import get from 'lodash/get'
import {loadFromStorage} from 'utils/storage'
import {BASE_URL, BASE_URL_NOT_VERSION} from '../constants'

const baseHeaders = config => ({'Content-Type': 'application/json', ...config.headers})

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

export async function isExpiredToken() {
  const jwtToken = get(loadFromStorage('user'), 'accessToken', '')
  if (jwtToken) {
    try {
      const res = await axios.get(BASE_URL_NOT_VERSION, {
        headers: {Authorization: `Bearer ${jwtToken}`}
      })
      if (res.status !== 200) return true
      else return false
    } catch (error) {
      return true
    }
  }
  return true
}

export default appAPI
