import { put, takeLeading } from 'redux-saga/effects'
import { app_api_url, otp_verify, user_login, user_signup } from '../../config/constants'
import { navigate, replace, resetToScreen } from '../../navigations/NavigationServices'
import { blobRequest, postRequest, withoutTokenPostRequest } from '../../utils/apiRequests'
import * as actionTypes from '../actionTypes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showToastMessage } from '../../utils/services'
import { Alert } from 'react-native'

function* onLogin(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        console.log('payload ::', payload);
        const response = yield withoutTokenPostRequest({
            url: app_api_url + user_login,
            data: {
                phoneNumber: payload,
                password:payload
            }
        })

        if (response?.status) {
            // Alert.alert('OTP',response?.otp.toString());
            navigate('otp', { phoneNumber: payload })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* onOtpVerification(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        console.log(app_api_url + otp_verify, payload)
        const response = yield withoutTokenPostRequest({
            url: app_api_url + otp_verify,
            data: payload
        });

        if (response?.status) {
            yield AsyncStorage.setItem('token', JSON.stringify(response?.data?.accessToken))
            yield AsyncStorage.setItem('userData', JSON.stringify(response?.data))
            yield put({ type: actionTypes.SET_PROFILE, payload: response?.data });
            if(response?.data?.name){
                resetToScreen('home')
            }else{
                replace('registration', {skip: true})
            }

        }else{
            showToastMessage({message: response?.message})
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log('hii otp', e);
    }
}

function* onProfileUpdate(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield blobRequest({
            url: app_api_url + user_signup,
            data: payload?.data
        })
        if (response?.status) {
            yield AsyncStorage.setItem('token', JSON.stringify(response?.data?.accessToken))
            yield AsyncStorage.setItem('userData', JSON.stringify(response?.data))
            yield put({ type: actionTypes.SET_PROFILE, payload: response?.data });
            if(payload?.isSkip){
                showToastMessage({message: 'Registered successfully'})
                resetToScreen('home')
            }else{
                showToastMessage({message: 'Profile updated successfully'})
            }
        }else{
            showToastMessage({message: response?.message})
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

export default function* authSaga() {
    yield takeLeading(actionTypes.ON_LOGIN, onLogin)
    yield takeLeading(actionTypes.ON_OTP_VERIFICATION, onOtpVerification)
    yield takeLeading(actionTypes.ON_PROFILE_UPDATE, onProfileUpdate)
}