import { put, select, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { postRequest } from '../../utils/apiRequests'
import { app_api_url, get_customer_recharge_history } from '../../config/constants'

function* getRechargeHistory(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.registrationReducer.customerdata)

        const response = yield postRequest({
            url: app_api_url + get_customer_recharge_history,
            data:{
                userId: customerData?._id
            }
        })

        if(response?.status){
            yield put({type: actionTypes.SET_RECHARGE_HISTORY, payload: response?.data})
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

export default function* historySaga() {
    yield takeLeading(actionTypes.GET_RECHARGE_HISTORY, getRechargeHistory)
}