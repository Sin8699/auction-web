import axios from 'axios'
import get from 'lodash/get'
import {loadFromStorage, saveToStorage} from 'utils/storage'
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
  const jwtRefreshToken = get(loadFromStorage('user'), 'refreshToken', '')
  const roleUser = get(loadFromStorage('user'), 'role', '')
  if (jwtToken) {
    try {
      const res = await axios.get(BASE_URL_NOT_VERSION, {
        headers: {Authorization: `Bearer ${jwtToken}`}
      })
      if (res.status === 200) return false
      return true
    } catch (error) {
      if (get(error, 'response.status', '') === 400) {
        try {
          const res_refresh = await appAPI.post('auth/refresh-token', {
            refresh_token: jwtRefreshToken
          })
          console.log('res_refresh: ', res_refresh)
          if (res_refresh.status === 200) {
            saveToStorage('user', {
              accessToken: res_refresh.data.access_token,
              refreshToken: res_refresh.data.refresh_token,
              role: roleUser
            })
            return false
          }
          return true
        } catch (err) {
          return true
        }
      }
      return true
    }
  }
  return true
}

export default appAPI
