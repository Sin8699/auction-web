import { useAxios } from '../useAxiosConfig'

export const useGetSubCategories = () => {
  return useAxios('/sub-category')
}
