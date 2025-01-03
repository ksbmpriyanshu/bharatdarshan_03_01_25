import * as actionTypes from '../actionTypes'

export const getSplash = payload =>({
    type: actionTypes.GET_SPLASH,
    payload,
})

export const setSimmerVisible = payload =>({
    type: actionTypes.SET_SIMMER_VISIBLE,
    payload,
})

export const setIsLoading = payload =>({
    type: actionTypes.SET_IS_LOADING,
    payload,
})

