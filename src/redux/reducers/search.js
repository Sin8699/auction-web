import { actionTypesSearch } from '../actions/search'

const initialState = {
  loading: false,
  results: {}
}

export function SearchReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypesSearch.SEARCHING: {
      return { ...state, loading: true }
    }
    case actionTypesSearch.SET_SEARCH: {
      return {
        ...state,
        loading: false,
        results: { ...state.results, [action.query]: action.data }
      }
    }
    default:
      return state
  }
}
