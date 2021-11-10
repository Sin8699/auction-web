import {actionTypesUser} from '../actions/user'

const initialState = {
  profile: {},
  loading: false,
  listUserForAdmin: [],
  loadingListUserForAdmin: false
}

export function UserReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypesUser.REQUEST_PROFILE: {
      return {...state, loading: true}
    }
    case actionTypesUser.SET_PROFILE: {
      return {...state, profile: action.data, loading: false}
    }
    case actionTypesUser.REQUEST_LIST_USER_BY_ADMIN: {
      return {...state, loadingListUserForAdmin: true}
    }
    case actionTypesUser.SET_LIST_USER_FOR_ADMIN: {
      return {...state, listUserForAdmin: action.data, loadingListUserForAdmin: false}
    }
    default:
      return state
  }
}
