import {actionTypesExample} from '../actions/example'

const initialState = {
  dataExamples: [],
  loading: false
}

export function ExampleReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypesExample.REQUEST_EXAMPLE_DATA: {
      return {...state, loading: true}
    }
    case actionTypesExample.SET_EXAMPLE_DATA: {
      return {...state, dataExamples: action.data, loading: false}
    }
    default:
      return state
  }
}
