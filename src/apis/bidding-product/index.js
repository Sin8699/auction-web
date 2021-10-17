import { useAxios } from '../useAxiosConfig'

export const useGetBiddingProducts = () => {
  return useAxios('/bidding-product')
}
