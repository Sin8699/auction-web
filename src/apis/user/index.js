import appAPI from '../config'
import get from 'lodash/get'
import {StatusApi} from '../constants'

const UserApi = {
  login: async dataLogin => {
    try {
      const {data, status} = await appAPI.post('auth/login', dataLogin)
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  },
  register: async dataRegister => {
    try {
      const {data, status} = await appAPI.post('auth/register', dataRegister)
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  }
}

export default UserApi
