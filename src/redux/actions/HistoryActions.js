import * as actionTypes from '../actionTypes'

export const getRechargeHistory = payload =>({
    type: actionTypes.GET_RECHARGE_HISTORY,
    payload,
})

export const setRechargeHistory = payload => ({
    type: actionTypes.SET_RECHARGE_HISTORY,
    payload,
})