// import axios from 'axios'
import {makeUseAxios} from 'axios-hooks'
import appAPI from './config'

export const useAxios = makeUseAxios({
  axios: appAPI
})
