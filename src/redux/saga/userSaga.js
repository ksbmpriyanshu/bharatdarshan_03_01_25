import { call, put, select, takeEvery, takeLatest, takeLeading, } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { get_banner, get_profile, get_terms_condition, user_login, verify_otp } from '../../utils/api-routes';
import { api_urls } from '../../utils/api-urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate, replace, resetToScreen } from '../../navigations/NavigationServices';
import { getFcmToken, showToastMessage } from '../../utils/services';
import { getToken } from '../../config/token';
import { app_api_url, get_wallet_recharge_offers, user_wallet_recharge } from '../../config/constants';
import { getRequest, postRequest } from '../../utils/apiRequests';
import { razorpayPayment } from '../../utils/razorpay';
function* getProfile() {
    try {
        const Token = yield getToken();
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        if (Token != null) {
            const response = yield axios({
                method: 'post',
                url: api_urls + get_profile,
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            });
            // const { data } = yield call(axios.post('url', payload))
            if (response?.data?.status) {
                yield put({ type: actionTypes.SET_PROFILE, payload: response?.data?.result });
                navigate('home')
            } else {
                navigate('login')
                // navigate('home')

            }
        } else {
            navigate('login')
        }




        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}
function* onLogin(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        console.log(payload, 'payload')
        const response = yield axios({
            method: 'post',
            url: api_urls + user_login,
            data: payload
        });



        if (response?.data?.status) {
            navigate('otp', { ...payload })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log('hii', e);
        showToastMessage(e)
    }
}
function* onOtpVerification(actions) {
    try {
        const { payload } = actions
        console.log(payload, 'payload otp  :::')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const response = yield axios({
            method: 'post',
            url: api_urls + verify_otp,
            data: payload
        });

        console.log(response.data, 'response::: ================= 1111111')

        if (response?.data?.userProfile === true) {

            // remove
            yield AsyncStorage.removeItem('token');
            // new token
            yield AsyncStorage.setItem('token', JSON.stringify(response?.data?.token))

            const Token = response?.data?.token;

            //get profile
            const response2 = yield axios({
                method: 'post',
                url: api_urls + get_profile,
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            });
            // const { data } = yield call(axios.post('url', payload))
            console.log('res2', response2?.data);
            if (response2?.data?.status) {
                yield put({ type: actionTypes.SET_PROFILE, payload: response2?.data?.result });
                yield call(resetToScreen, 'home')
            } else {
                navigate('login')
                // navigate('home')

            }


        }
        else if (response?.data?.success) {
            yield AsyncStorage.setItem('token', JSON.stringify(response?.data?.token))
            navigate('registration', { data: payload?.phone })
        } else {
            showToastMessage({ message: response.data?.message });

            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        }



        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log('hii otp', e);
    }
}

function* getTermsCondtion() {
    try {

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield axios({
            method: 'get',
            url: api_urls + get_terms_condition
        });
        if (response?.data?.status) {
            yield put({ type: actionTypes.SET_TERMS_CONDITION, payload: response?.data?.results });

        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* onresend(actions) {
    try {
        const { payload } = actions
        console.log(payload, ':::payload phone Number ')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield axios({
            method: 'post',
            url: api_urls + user_login,
            data: payload
        });

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log('hii', e);
        showToastMessage(e)
    }
}

function* getWalletRechargeOffers() {
    try {
        const response = yield postRequest({
            url: app_api_url + get_wallet_recharge_offers,
            data: {
                userId: yield select(state => state.registrationReducer.customerdata?._id),
            }
        });

        if (response?.status) {
            yield put({ type: actionTypes.SET_WALLET_RECHARGE_OFFERS, payload: response?.data });
        
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* onWalletRecharge(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { payload } = actions
        const customerData = yield select(state => state.registrationReducer.customerdata);
        let razorpayOrderId = ''
        const razorpayResponse = yield razorpayPayment({ amount: payload?.amount, name: 'Bharat Darshan', email: 'pr@bharatdarshan.today', contact: '9671902576', });
        if (!razorpayResponse?.razorpay_payment_id) {
            showToastMessage({ message: 'Transaction Failed' })
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
            return
        }
        razorpayOrderId = razorpayResponse?.razorpay_payment_id

        if(razorpayOrderId) {
            const response = yield postRequest({
                url: app_api_url + user_wallet_recharge,
                data: {
                    ...payload, userId: customerData?._id
                }
            });
    
            if (response?.status) {
                yield put({ type: actionTypes.SET_PROFILE, payload: response?.data });
                if(payload?.isFirstTime){
                    yield put({type: actionTypes.GET_WALLET_RECHARGE_OFFERS, payload: null})
                }
            
            }
    
        }
        
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getUserKyc(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { payload } = actions
        const customerData = yield select(state => state.registrationReducer.customerdata)
        const response = yield postRequest({
            url: app_api_url + user_wallet_recharge,
            data: {
                ...payload, userId: customerData?._id
            }
        });

        if (response?.status) {
            yield put({ type: actionTypes.SET_PROFILE, payload: response?.data });
            if(payload?.isFirstTime){
                yield put({type: actionTypes.GET_WALLET_RECHARGE_OFFERS, payload: null})
            }
        
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* updateUserKyc(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { payload } = actions
        const customerData = yield select(state => state.registrationReducer.customerdata)
        const response = yield postRequest({
            url: app_api_url + user_wallet_recharge,
            data: {
                ...payload, userId: customerData?._id
            }
        });

        if (response?.status) {
            yield put({ type: actionTypes.SET_PROFILE, payload: response?.data });
            if(payload?.isFirstTime){
                yield put({type: actionTypes.GET_WALLET_RECHARGE_OFFERS, payload: null})
            }
        
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* uploadUserKycImages(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { payload } = actions
        const customerData = yield select(state => state.registrationReducer.customerdata)
        const response = yield postRequest({
            url: app_api_url + user_wallet_recharge,
            data: {
                ...payload, userId: customerData?._id
            }
        });

        if (response?.status) {
            yield put({ type: actionTypes.SET_PROFILE, payload: response?.data });
            if(payload?.isFirstTime){
                yield put({type: actionTypes.GET_WALLET_RECHARGE_OFFERS, payload: null})
            }
        
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}


export default function* userSaga() {
    yield takeLatest(actionTypes.GET_PROFILE, getProfile);
    yield takeLatest(actionTypes.GET_TERMS_CONDITION, getTermsCondtion);
    yield takeLatest(actionTypes.ON_RESEND, onresend)
    yield takeLatest(actionTypes.GET_WALLET_RECHARGE_OFFERS, getWalletRechargeOffers)
    yield takeLatest(actionTypes.ON_WALLET_RECHARGE, onWalletRecharge)
    yield takeLatest(actionTypes.GET_USER_KYC, getUserKyc)
    yield takeLatest(actionTypes.UPDATE_USER_KYC, updateUserKyc)
    yield takeLatest(actionTypes.UPLOAD_USER_KYC_IMAGES, uploadUserKycImages)
}