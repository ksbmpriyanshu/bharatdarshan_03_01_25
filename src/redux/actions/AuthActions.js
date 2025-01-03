import * as actionTypes from '../actionTypes'

export const onLogin = payload =>({
    type: actionTypes.ON_LOGIN,
    payload,
})

export const onOtpVerification = payload => ({
    type: actionTypes.ON_OTP_VERIFICATION,
    payload
})

export const onProfileUpdate = payload => ({
    type: actionTypes.ON_PROFILE_UPDATE,
    payload
})