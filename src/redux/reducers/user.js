import {actionTypesUser} from '../actions/user'

const initialState = {
  profile: {},
  loading: false
}

export function UserReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypesUser.REQUEST_PROFILE: {
      return {...state, loading: true}
    }
    case actionTypesUser.SET_PROFILE: {
      return {...state, profile: action.data, loading: false}
    }
    default:
      return state
  }
}
