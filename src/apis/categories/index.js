import appAPI from '../config'
import get from 'lodash/get'
import {StatusApi} from '../constants'

const CategoryApi = {
  getDocuments: async () => {
    try {
      const {data, status} = await appAPI.get('categories')
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  },
  getDocument: async id => {
    try {
      const {data, status} = await appAPI.get(`categories/${id}`)
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  },
  createDocument: async (payload = {}) => {
    try {
      const {data, status} = await appAPI.post('categories', payload)
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  },
  updateDocument: async (payload = {}, id) => {
    try {
      const {data, status} = await appAPI.patch(`categories/${id}`, payload)
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  },
  deleteDocument: async id => {
    try {
      const {data, status} = await appAPI.delete(`categories/${id}`)
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  }
}

export default CategoryApi
