export const actionTypesBiddingProduct = {
  REQUEST_BIDDING_PRODUCTS_DATA: 'REQUEST_BIDDING_PRODUCTS_DATA',
  SET_BIDDING_PRODUCTS_DATA: 'SET_BIDDING_PRODUCTS_DATA',
  REQUEST_LIST_BIDDING_PRODUCTS_HAS_SOLD: 'REQUEST_LIST_BIDDING_PRODUCTS_HAS_SOLD',
  SET_LIST_BIDDING_PRODUCTS_HAS_SOLD: 'SET_LIST_BIDDING_PRODUCTS_HAS_SOLD',
  REQUEST_BIDDING_PRODUCT: 'REQUEST_BIDDING_PRODUCT',
  SET_BIDDING_PRODUCT: 'SET_BIDDING_PRODUCT'
}

export const requestBiddingProductsData = () => ({
  type: actionTypesBiddingProduct.REQUEST_BIDDING_PRODUCTS_DATA
})

export const setBiddingProductsData = data => ({
  type: actionTypesBiddingProduct.SET_BIDDING_PRODUCTS_DATA,
  data
})

export const requestListBiddingProductHasSold = () => ({
  type: actionTypesBiddingProduct.REQUEST_LIST_BIDDING_PRODUCTS_HAS_SOLD
})

export const setListBiddingProductHasSold = data => ({
  type: actionTypesBiddingProduct.SET_LIST_BIDDING_PRODUCTS_HAS_SOLD,
  data
})

export const requestBiddingProduct = id => ({
  type: actionTypesBiddingProduct.REQUEST_BIDDING_PRODUCT,
  idProduct: id
})

export const setBiddingProduct = data => ({
  type: actionTypesBiddingProduct.SET_BIDDING_PRODUCT,
  data
})
