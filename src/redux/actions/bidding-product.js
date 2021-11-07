export const actionTypesBiddingProduct = {
  REQUEST_BIDDING_PRODUCTS_DATA: 'REQUEST_BIDDING_PRODUCTS_DATA',
  SET_BIDDING_PRODUCTS_DATA: 'SET_BIDDING_PRODUCTS_DATA'
}

export const requestBiddingProductsData = () => ({
  type: actionTypesBiddingProduct.REQUEST_BIDDING_PRODUCTS_DATA
})

export const setBiddingProductsData = data => ({
  type: actionTypesBiddingProduct.SET_BIDDING_PRODUCTS_DATA,
  data
})
