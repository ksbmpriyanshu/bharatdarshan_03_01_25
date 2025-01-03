import { call, put, select, takeEvery, takeLatest, takeLeading, } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { delete_account, getAboutData, getHistoryData, getPrivacyData, getRefundData, get_banner } from '../../utils/api-routes';
import { api_urls } from '../../utils/api-urls';
import { getToken } from '../../config/token';
import { showToastMessage } from '../../utils/services';
import { navigate } from '../../navigations/NavigationServices';

function* gethistorydata() {
    try {
        const Token = yield getToken();
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield axios({
            method: 'get',
            url: api_urls + getHistoryData,
            headers:{
                'Authorization': `Bearer ${Token}`
            }
        });
       
        if (response?.data?.success) {
            yield put({ type: actionTypes.SET_HISTORY_DATA, payload: response?.data?.orderId });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* deleteAccount(actions) {
    const { payload } = actions;
    try {
        const Token = yield getToken();
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield axios({
            method: 'post',
            url: api_urls + delete_account,
            headers:{
                'Authorization': `Bearer ${Token}`
            }
        });
        console.log(response.data,'dsd')
        if (response?.data?.status) {

                showToastMessage({message: response?.data?.message})
                yield call(navigate,'login')
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
      
}

function* getaboutData() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield axios({
            method: 'get',
            url: api_urls + getAboutData,
           
        })
        if (response?.data?.status) {
            yield put({ type: actionTypes.SET_ABOUT_DATA, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}
function* getprivacydata() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield axios({
            method: 'get',
            url: api_urls + getPrivacyData,
           
        });
        console.log("privacy  response",response?.data)
       
        if (response?.data?.status) {
            yield put({ type: actionTypes.SET_PRIVACY_DATA, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}
function* getrefunddata() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield axios({
            method: 'get',
            url: api_urls + getRefundData,
           
        })
        if (response?.data?.status) {
            yield put({ type: actionTypes.SET_REFUND_DATA, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

export default function* commonSaga() {
    yield takeLatest(actionTypes.GET_HISTORY_DATA, gethistorydata);
    yield takeLatest(actionTypes.GET_ABOUT_DATA, getaboutData);
    yield takeLatest(actionTypes.GET_PRIVACY_DATA, getprivacydata);
    yield takeLatest(actionTypes.GET_REFUND_DATA, getrefunddata);

    yield takeLatest(actionTypes.DELETE_ACCOUNT, deleteAccount);
}