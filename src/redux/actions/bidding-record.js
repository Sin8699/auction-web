export const actionTypesBiddingRecord = {
  REQUEST_BIDDING_RECORDS_DATA: 'REQUEST_BIDDING_RECORDS_DATA',
  SET_BIDDING_RECORDS_DATA: 'SET_BIDDING_RECORDS_DATA'
}

export const requestBiddingRecordsData = idProduct => ({
  type: actionTypesBiddingRecord.REQUEST_BIDDING_RECORDS_DATA,
  idProduct
})

export const setBiddingRecordsData = data => ({
  type: actionTypesBiddingRecord.SET_BIDDING_RECORDS_DATA,
  data
})
