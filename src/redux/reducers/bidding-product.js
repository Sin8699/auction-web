import {actionTypesBiddingProduct} from '../actions/bidding-product'

const initialState = {
  listBiddingProducts: [],
  loadingListBiddingProduct: false
}

export function BiddingProductReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypesBiddingProduct.REQUEST_BIDDING_PRODUCTS_DATA: {
      return {...state, loadingListBiddingProduct: true}
    }
    case actionTypesBiddingProduct.SET_BIDDING_PRODUCTS_DATA: {
      return {...state, listBiddingProducts: action.data, loadingListBiddingProduct: false}
    }
    default:
      return state
  }
}
