import * as actionTypes from '../actionTypes';

export const setOpt = payload => ({
    type: actionTypes.SET_OPT,
    payload,
});
export const getOpt = payload => ({
    type: actionTypes.GET_OPT,
    payload,
});
export const setCircle = payload => ({
    type: actionTypes.SET_CIRCLE,
    payload,
});
export const getCircle = payload => ({
    type: actionTypes.GET_CIRCLE,
    payload,
});
export const setBillData = payload => ({
    type: actionTypes.SET_BILLDATA,
    payload,
});
export const getBillData = payload => ({
    type: actionTypes.GET_BILLDATA,
    payload,
});