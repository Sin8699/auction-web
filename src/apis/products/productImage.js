import get from 'lodash/get'
import {StatusApi} from '../constants'
import axios from 'axios'
import {loadFromStorage} from 'utils/storage'
import {BASE_URL} from '../../constants'

const baseHeaders = config => ({'Content-Type': 'multipart/form-data', ...config.headers})

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

const ProductImageApi = {
  updateImagePrimary: async formData => {
    try {
      const {data, status} = await appAPI.post('product/upload-image', formData)
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  },
  updateImageExtra: async formData => {
    try {
      const {data, status} = await appAPI.post('product/upload-extra-images', formData)
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  }
}

export default ProductImageApi
