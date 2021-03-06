import appAPI from '../config'
import get from 'lodash/get'
import {StatusApi} from '../constants'

const BiddingProductApi = {
  getDocuments: async () => {
    try {
      const {data, status} = await appAPI.get('bidding-product')
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  },
  getDocumentsHasSold: async () => {
    try {
      const {data, status} = await appAPI.get('bidding-product/has-sold')
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  },
  getDocument: async id => {
    try {
      const {data, status} = await appAPI.get(`bidding-product/${id}`)
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  },
  getDocumentByIdProduct: async id => {
    try {
      const {data, status} = await appAPI.get(`bidding-product/product/${id}`)
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  },
  createDocument: async (payload = {}) => {
    try {
      const {data, status} = await appAPI.post('bidding-product', payload)
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  },
  updateDocument: async (id, payload = {}) => {
    try {
      const {data, status} = await appAPI.patch(`bidding-product/${id}`, payload)
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  },
  blockUserBid: async (id, payload) => {
    try {
      const {data, status} = await appAPI.post(`bidding-product/${id}/ban-user`, payload)
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  }
}

export default BiddingProductApi
