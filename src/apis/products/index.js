//TEMP
import {makeUseAxios} from 'axios-hooks'
import axios from 'axios'

const BASE_URL = 'https://616ba5c416c3fa0017171783.mockapi.io/'

const appAPI = axios.create()
appAPI.defaults.baseURL = BASE_URL

const useAxios = makeUseAxios({
  axios: appAPI
})

export const useGetProducts = () => {
  return useAxios('/products')
}

export const useGetProductId = id => {
  return useAxios(`/products/${id}`)
}
