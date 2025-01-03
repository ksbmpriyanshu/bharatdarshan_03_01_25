import { call, put, takeLatest, } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { get_country, get_profile, get_state, user_register } from '../../utils/api-routes';
import { api_urls } from '../../utils/api-urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import { blobRequest } from '../../utils/apiRequests';
import { navigate } from '../../navigations/NavigationServices';
import { getToken } from '../../config/token';
import { configureLayoutAnimationBatch } from 'react-native-reanimated/lib/typescript/reanimated2/core';



function* getcountry() {

  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield axios({
      method: 'get',
      url: `${api_urls}${get_country}`
      // url: `${api_urls}${get_country}/IN`
    });

    yield put({ type: actionTypes.SET_COUNTRY, payload: response?.data });
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}
function* getstate(actions) {
  const { payload } = actions;
  try {

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield axios({
      method: 'get',
      url: `${api_urls}${get_state}/${payload?.data?.countrycode}`
      // url: `${api_urls}${get_country}/IN`
    });

    yield put({ type: actionTypes.SET_STATE, payload: response?.data });
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}
function* userregistrationdetailes(actions) {
  const { payload } = actions
  console.log(payload, 'patload ::: ', yield getToken())
  const Token = yield call(getToken);


  try {

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield blobRequest({
      url: api_urls + user_register,
      data: payload,
    });

    if (response?.status) {

      yield AsyncStorage.setItem(
        'userData',
        JSON.stringify(response?.result),
      );
      yield put({ type: actionTypes.SET_PROFILE, payload: response?.result });
      navigate('home')

    }
  } catch (e) {
    console.log('hii', e);
  }
}


export default function* registrationSaga() {
  yield takeLatest(actionTypes.GET_STATE, getstate);
  yield takeLatest(actionTypes.GET_COUNTRY, getcountry);
  yield takeLatest(actionTypes.USER_REGISTER, userregistrationdetailes);
}