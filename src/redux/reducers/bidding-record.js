import {actionTypesBiddingRecord} from '../actions/bidding-record'

const initialState = {
  listBiddingRecord: [],
  loadingListBiddingRecord: false
}

export function BiddingRecordReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypesBiddingRecord.REQUEST_BIDDING_RECORDS_DATA: {
      return {...state, loadingListBiddingRecord: true}
    }
    case actionTypesBiddingRecord.SET_BIDDING_RECORDS_DATA: {
      return {...state, listBiddingRecord: action.data, loadingListBiddingRecord: false}
    }
    default:
      return state
  }
}
