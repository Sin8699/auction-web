import appAPI from '../config'
import get from 'lodash/get'
import {StatusApi} from '../constants'

const ProductJsonApi = {
  getDocuments: async () => {
    try {
      const {data, status} = await appAPI.get('product')
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  },
  getDocument: async id => {
    try {
      const {data, status} = await appAPI.get(`product/${id}`)
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  },
  createDocument: async (payload = {}) => {
    try {
      const {data, status} = await appAPI.post('product', payload)
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  },
  updateDocument: async (payload = {}, id) => {
    try {
      const {data, status} = await appAPI.patch(`product/${id}`, payload)
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  },
  deleteDocument: async id => {
    try {
      const {data, status} = await appAPI.delete(`product/${id}`)
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  }
}

export default ProductJsonApi
