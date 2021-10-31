import { useAxios } from '../useAxiosConfig'

export const useGetCategories = () => {
  return useAxios('/categories')
}
