import {all, takeLatest, put, call} from 'redux-saga/effects'
import {actionTypesBiddingRecord, setBiddingRecordsData} from '../actions/bidding-record'
import BiddingRecordApi from '../../apis/bidding-record'

function* requestBiddingRecordSaga(action) {
  const {data, status, error} = yield call(BiddingRecordApi.getDocuments, action.idProduct)

  if (!error && status === 200) {
    yield put(setBiddingRecordsData(data))
  }
}

function* watchRequestDataDashboard() {
  yield takeLatest(actionTypesBiddingRecord.REQUEST_BIDDING_RECORDS_DATA, requestBiddingRecordSaga)
}

export function* BiddingRecordSaga() {
  yield all([watchRequestDataDashboard()])
}
