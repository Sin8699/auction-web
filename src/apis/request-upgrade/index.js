import appAPI from '../config'
import get from 'lodash/get'
import {StatusApi} from '../constants'

const RequestUpgradeApi = {
  getDocuments: async () => {
    try {
      const {data, status} = await appAPI.get('request-upgrade')
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  },
  createDocument: async (payload = {}) => {
    try {
      const {data, status} = await appAPI.post('request-upgrade', payload)
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  }
}

export default RequestUpgradeApi
