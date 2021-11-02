import {actionTypesSubCategory} from '../actions/subcategory'

const initialState = {
  dataSubCategory: [],
  loading: false
}

export function SubCategoryReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypesSubCategory.REQUEST_SUB_CATEGORY_DATA: {
      return {...state, loading: true}
    }
    case actionTypesSubCategory.SET_SUB_CATEGORY_DATA: {
      return {...state, dataSubCategory: action.data, loading: false}
    }
    default:
      return state
  }
}
