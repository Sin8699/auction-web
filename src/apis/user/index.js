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
  },
  changePassword: async changePassword => {
    try {
      const {data, status} = await appAPI.post('auth/change-password', changePassword)
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  },
  getProfile: async () => {
    try {
      const {data, status} = await appAPI.get('auth')
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  },
  updateProfile: async payload => {
    try {
      const {data, status} = await appAPI.patch('auth', payload)
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  },
  resetPassword: async email => {
    try {
      const {data, status} = await appAPI.post('auth/reset-password', {email})
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  },
  getUsersByAdmin: async () => {
    try {
      const {data, status} = await appAPI.get('auth/admin/all')
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  },
  updateUsersByAdmin: async (id, payload) => {
    try {
      const {data, status} = await appAPI.patch(`auth/admin/${id}`, payload)
      return {data, status}
    } catch (error) {
      const errorMessage = get(error, 'response.data.message')
      return {error: errorMessage ? errorMessage : StatusApi.NETWORK_ERROR}
    }
  }
}

export default UserApi
