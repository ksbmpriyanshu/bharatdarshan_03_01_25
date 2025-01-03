import * as actionTypes from '../actionTypes';


export const getbanner = payload => ({
    type: actionTypes.GET_BANNER,
    payload,
});

export const setbanner = payload => ({
    type: actionTypes.SET_BANNER,
    payload,
});