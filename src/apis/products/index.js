import { useAxios } from '../useAxiosConfig'

export const useGetProducts = () => {
  return useAxios('/products')
}
