import * as actionTypes from '../actionTypes'

export const getPooja = payload => ({
    type: actionTypes.GET_POOJA_DATA,
    payload,
});

export const setPooja = payload => ({
    type: actionTypes.SET_POOJA_DATA,
    payload,
});
export const orderPooja = payload => ({
    type: actionTypes.ORDER_POOJA,
    payload,
});
export const getDailyDarshan = payload => ({
    type: actionTypes.GET_DAILY_DARSHAN_DATA,
    payload,
});

export const setDailyDarshan = payload => ({
    type: actionTypes.SET_DAILY_DARSHAN_DATA,
    payload,
});



// Yatra Module

export const getYatra = payload => ({
    type: actionTypes.GET_YATRA_DATA,
    payload,
});

export const setYatra = payload => ({
    type: actionTypes.SET_YATRA_DATA,
    payload,
});


export const getPackage = payload => ({
    type: actionTypes.GET_PACKAGE_DATA,
    payload,
});

export const setPackage = payload => ({
    type: actionTypes.SET_PACKAGE_DATA,
    payload,
});
export const orderYatra = payload => ({
    type: actionTypes.ORDER_YATRA,
    payload,
});