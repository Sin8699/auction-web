import appAPI from '../config'
import get from 'lodash/get'
import {StatusApi} from '../constants'

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
