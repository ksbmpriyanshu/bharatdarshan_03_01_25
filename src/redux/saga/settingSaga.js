import { put, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { getToken } from '../../config/token';
import { api_urls } from '../../utils/api-urls';
import { get_profile } from '../../utils/api-routes';
import { resetToScreen } from '../../navigations/NavigationServices';
import { postRequest } from '../../utils/apiRequests';
 
function* getSplash() {
    try {

        const response = yield postRequest({
            url: api_urls + get_profile,
            data: {}
        })

        console.log(response)

        if (response?.status) {
            yield put({ type: actionTypes.SET_PROFILE, payload: response?.result });
            resetToScreen('home')
        } else {
            resetToScreen('login')

        }

    } catch (e) {
        console.log(e);
    }
}

export default function* settingSaga() {
    yield takeLeading(actionTypes.GET_SPLASH, getSplash)
}