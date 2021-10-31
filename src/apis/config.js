import axios from 'axios'
import { loadFromStorage } from 'utils/storage'

const BASE_URL = 'http://localhost:5001/v1'

const baseHeaders = (config) => ({ 'Content-Type': 'application/json', ...config.headers })

// Config App Axios
const appAPI = axios.create()
appAPI.defaults.baseURL = BASE_URL
appAPI.interceptors.request.use((config) => {
  const { token } = loadFromStorage('user') || ''
  return {
    ...config,
    headers: {
      ...baseHeaders(config),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  }
})

export default appAPI
