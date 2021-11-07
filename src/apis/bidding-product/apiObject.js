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
  getDocument: async id => {
    try {
      const {data, status} = await appAPI.get(`bidding-product/${id}`)
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
  }
}

export default BiddingProductApi
