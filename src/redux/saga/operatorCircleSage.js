// src/saga/rootSaga.js
import { takeEvery, put, call } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import { setOpt, setCircle } from '../actions';

function* handleGetOpt() {
  const data = yield call(fetchOptData); // Replace with your actual data fetching function
  yield put(setOpt(data));
}

function* handleGetCircle() {
  const data = yield call(fetchCircleData); // Replace with your actual data fetching function
  yield put(setCircle(data));
}
function* handleGetBillData() {
  const data = yield call(fetchBillData); // Replace with your actual data fetching function
  yield put(setBillData(data));
}

export default function* rootSaga() {
  yield takeEvery(actionTypes.GET_OPT, handleGetOpt);
  yield takeEvery(actionTypes.GET_CIRCLE, handleGetCircle);
  yield takeEvery(actionTypes.GET_BILLDATA, handleGetBillData);

}
