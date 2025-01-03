import { call, put, select, takeEvery, takeLatest, takeLeading, } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { get_banner } from '../../utils/api-routes';
import { api_urls } from '../../utils/api-urls';

function* getbanner() {


    try {

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield axios({
            method: 'get',
            url: api_urls + get_banner
        });
        // const { data } = yield call(axios.post('url', payload))

        if (response?.data?.status) {
            yield put({ type: actionTypes.SET_BANNER, payload: response?.data?.results });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}


export default function* bannerSaga() {
    yield takeLatest(actionTypes.GET_BANNER, getbanner);
}