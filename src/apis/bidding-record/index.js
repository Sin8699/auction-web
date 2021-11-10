import appAPI from '../config'
import get from 'lodash/get'
import {StatusApi} from '../constants'

const BiddingRecordApi = {
  getDocuments: async idProduct => {
    try {
      const {data, status} = await appAPI.get(`bidding-record/product/${idProduct}`)
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  }
}

export default BiddingRecordApi
