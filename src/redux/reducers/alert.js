import {actionTypesAlert} from '../actions/alert'
import get from 'lodash/get'

const initialState = {
  openAlert: false,
  messageAlert: '',
  typeAlert: 'info'
}

export function AlertReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypesAlert.OPEN_ALERT: {
      const message = get(action, 'data.messageAlert')
      const type = get(action, 'data.typeAlert')
      return {
        ...state,
        openAlert: true,
        messageAlert: message,
        typeAlert: type
      }
    }
    case actionTypesAlert.CLOSE_ALERT: {
      return initialState
    }
    default:
      return state
  }
}
