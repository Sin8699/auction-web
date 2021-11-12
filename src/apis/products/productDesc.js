import appAPI from '../config'
import get from 'lodash/get'
import {StatusApi} from '../constants'

const ProductDescApi = {
  getDocuments: async query => {
    try {
      const {data, status} = await appAPI.get(`product-description${query}`)
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  },
  createDocument: async (payload = {}) => {
    try {
      const {data, status} = await appAPI.post('product-description', payload)
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  }
}

export default ProductDescApi
