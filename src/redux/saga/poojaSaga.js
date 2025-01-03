import { put, select, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { getToken } from '../../config/token';
import { api_urls } from '../../utils/api-urls';
import { get_profile } from '../../utils/api-routes';
import { resetToScreen } from '../../navigations/NavigationServices';
import { getRequest, postRequest } from '../../utils/apiRequests';
import axios from 'axios';
import { navigate } from "../../navigations/NavigationServices";
import { razorpayPaymentOrder } from '../../utils/razorpay';
import { showToastMessage } from '../../utils/services';

function* getpoojaData() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield getRequest({
            url: `${api_urls}api/e-commerce/get_puja`,

        })
        console.log("pooja response", response)
        if (response?.success) {
            yield put({ type: actionTypes.SET_POOJA_DATA, payload: response })
        }
        //    yield put({ type: actionTypes.SET_POOJA_DATA, payload: response });
        //    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (e) {
        console.log("something went wrong.....!", e);
    }
}
function* orderPooja(actions) {
    try {
        const { payload } = actions
        console.log("payload", payload)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.registrationReducer.registrationReducer)
        const data = {
            userId: customerData?._id,
            pujaId: payload?.pujaId,
            date: payload?.date,
            time: payload?.time,
            mode: "online"
        }
        console.log(data, "sldhjoh")
        const razorpayResponse = yield razorpayPaymentOrder({ amount: payload?.price, email: customerData?.email, contact: customerData?.phone, name: customerData?.name })
        if (razorpayResponse) {
            const response = yield postRequest({
                url: `${api_urls}api/e-commerce/book_puja`,
                data: {
                    userId: customerData?._id,
                    pujaId: payload?.pujaId,
                    date: payload?.date,
                    time: payload?.time,
                    mode: "online"
                }
            })
            console.log("response::::>>>>", response)
            if (response?.success) {
                navigate('Home')
                showToastMessage({ message: response?.message })
            }
        } else {
            showToastMessage({ message: 'Payment Failed' })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getdailyData() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield getRequest({
            url: `${api_urls}api/admin/getDailyDarshan`,

        })
        if (response?.success) {
            yield put({ type: actionTypes.SET_DAILY_DARSHAN_DATA, payload: response?.data })
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (e) {
        console.log("something went wrong.....!", e);
    }
}




// Yatra
function* getyatraData() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield getRequest({
            url: `${api_urls}api/app/customer/get_all_yatra`,

        })
        if (response?.status) {
            yield put({ type: actionTypes.SET_YATRA_DATA, payload: response })
        }

        //    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (e) {
        console.log("something went wrong.....!", e);
    }
}
function* getPackageData(actions) {
    try {
        const { payload } = actions;
        console.log("payload", payload)

        const response = yield axios({
            method: 'post',
            url: `${api_urls}api/app/customer/yatra_details_by_id`,
            data: payload,
        });
        console.log("getyatrata", response?.data)
        if (response?.status) {
            yield put({
                type: actionTypes.SET_PACKAGE_DATA,
                payload: response?.data,

            });
            navigate('yatradetails')
            showToastMessage({ message: response?.data?.message })
        }

    } catch (error) {
        console.error('Error', error);
    }
}
function* orderYatra(actions) {
    try {
        const { payload } = actions
        const data= {
            adults: payload?.adults,
            children: payload?.children,
            city: payload?.city,
            customerId: payload?.customerId,
            email:payload?.email,
            name: payload?.name,
            phone:payload?.phone,
            spacialRequest: payload?.spacialRequest,
            state: payload?.state,
            termsandCondition:payload?.termsandCondition,
            totalPrice:payload?.totalPrice,
            yatraPackageId: payload?.yatraPackageId,
            tourCode: payload?.tourCode
        }
        console.log("filled data",data)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const razorpayResponse = yield razorpayPaymentOrder({ amount: payload?.totalPrice, email: payload?.email, contact: payload?.phone, name: payload?.name })
        if (razorpayResponse) {
            const response = yield postRequest({
                url: `${api_urls}api/user/bookyatra`,
                data: {
                    adults: payload?.adults,
                    children: payload?.children,
                    city: payload?.city,
                    customerId: payload?.customerId,
                    email:payload?.email,
                    name: payload?.name,
                    phone:payload?.phone,
                    spacialRequest: payload?.spacialRequest,
                    state: payload?.state,
                    termsandCondition:payload?.termsandCondition,
                    totalPrice:payload?.totalPrice,
                    yatraPackageId: payload?.yatraPackageId,
                    tourCode: payload?.tourCode
                }
            })
            console.log("response::::>>>>", response)
            if (response?.success) {
                navigate('Home')
                showToastMessage({ message: response?.message })
            }
        } else {
            showToastMessage({ message: 'Payment Failed' })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}
export default function* settingSaga() {
    yield takeLeading(actionTypes.GET_POOJA_DATA, getpoojaData)
    yield takeLeading(actionTypes.GET_DAILY_DARSHAN_DATA, getdailyData)
    yield takeLeading(actionTypes.ORDER_POOJA, orderPooja)
    yield takeLeading(actionTypes.GET_YATRA_DATA, getyatraData)
    yield takeLeading(actionTypes.GET_PACKAGE_DATA, getPackageData)
    yield takeLeading(actionTypes.ORDER_YATRA, orderYatra)

}