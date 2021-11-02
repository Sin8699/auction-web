import {actionTypesCategory} from '../actions/category'

const initialState = {
  dataCategory: [],
  loading: false
}

export function CategoryReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypesCategory.REQUEST_CATEGORY_DATA: {
      return {...state, loading: true}
    }
    case actionTypesCategory.SET_CATEGORY_DATA: {
      return {...state, dataCategory: action.data, loading: false}
    }
    default:
      return state
  }
}
