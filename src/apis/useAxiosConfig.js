import axios from 'axios'
import { makeUseAxios } from 'axios-hooks'

export const useAxios = makeUseAxios({
  axios: axios.create({ baseURL: 'https://616ba5c416c3fa0017171783.mockapi.io/' })
})
