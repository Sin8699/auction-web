import {actionTypesProduct} from '../actions/product'

const initialState = {
  listProducts: [],
  loadingListProduct: false,
  product: {},
  loadingProduct: false
}

export function ProductReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypesProduct.REQUEST_PRODUCTS_DATA: {
      return {...state, loadingListProduct: true}
    }
    case actionTypesProduct.SET_PRODUCTS_DATA: {
      return {...state, listProducts: action.data, loadingListProduct: false}
    }
    case actionTypesProduct.REQUEST_PRODUCT: {
      return {...state, loadingProduct: true}
    }
    case actionTypesProduct.SET_PRODUCT: {
      return {...state, product: action.data, loadingProduct: false}
    }
    default:
      return state
  }
}
