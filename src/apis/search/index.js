import appAPI from '../config'
import get from 'lodash/get'
import {StatusApi} from '../constants'

const SearchApi = {
  searchGlobals: async query => {
    try {
      const {data, status} = await appAPI.get(`bidding-product/search?name=${query}`)
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  }
}

export default SearchApi
