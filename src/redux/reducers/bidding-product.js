import {actionTypesBiddingProduct} from '../actions/bidding-product'

const initialState = {
  listBiddingProducts: [],
  loadingListBiddingProduct: false,
  listBiddingProductsHasSold: [],
  loadingListBiddingProductsHasSold: false,
  biddingProduct: {},
  loadingBiddingProduct: false
}

export function BiddingProductReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypesBiddingProduct.REQUEST_BIDDING_PRODUCTS_DATA: {
      return {...state, loadingListBiddingProduct: true}
    }
    case actionTypesBiddingProduct.SET_BIDDING_PRODUCTS_DATA: {
      return {...state, listBiddingProducts: action.data, loadingListBiddingProduct: false}
    }
    case actionTypesBiddingProduct.REQUEST_LIST_BIDDING_PRODUCTS_HAS_SOLD: {
      return {...state, loadingListBiddingProductsHasSold: true}
    }
    case actionTypesBiddingProduct.SET_LIST_BIDDING_PRODUCTS_HAS_SOLD: {
      return {
        ...state,
        listBiddingProductsHasSold: action.data,
        loadingListBiddingProductsHasSold: false
      }
    }
    case actionTypesBiddingProduct.REQUEST_BIDDING_PRODUCT: {
      return {...state, loadingBiddingProduct: true}
    }
    case actionTypesBiddingProduct.SET_BIDDING_PRODUCT: {
      return {...state, biddingProduct: action.data, loadingBiddingProduct: false}
    }
    default:
      return state
  }
}
