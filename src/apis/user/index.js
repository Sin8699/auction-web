import {useAxios} from '../useAxiosConfig'

export const useLogin = () => {
  return useAxios({url: 'auth/login', method: 'POST'}, false)
}

export const useSignUp = () => {
  return useAxios('auth/register')
}
