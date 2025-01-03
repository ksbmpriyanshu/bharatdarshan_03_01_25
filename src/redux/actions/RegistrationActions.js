import * as actionTypes from '../actionTypes'

export const getcountry = payload => ({
    type: actionTypes.GET_COUNTRY,
    payload,
});
export const setcountry = payload => ({
    type: actionTypes.SET_COUNTRY,
    payload,
});
export const getstate = payload => ({
    type: actionTypes.GET_STATE,
    payload,
});
export const setstate = payload => ({
    type: actionTypes.SET_STATE,
    payload,
});
export const getprofile = payload => ({
    type: actionTypes.GET_PROFILE,
    payload,
});
export const setprofile = payload => ({
    type: actionTypes.SET_PROFILE,
    payload,
});
export const userregister = payload => ({
    type: actionTypes.USER_REGISTER,
    payload,
});
