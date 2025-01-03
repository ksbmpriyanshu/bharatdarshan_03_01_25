import * as actionTypes from '../actionTypes';

export const getProfile = payload => ({
    type: actionTypes.GET_PROFILE,
    payload,
});
export const getWalletRechargeOffers = payload => ({
    type: actionTypes.GET_WALLET_RECHARGE_OFFERS,
    payload,
})

export const setWalletRechargeOffers = payload => ({
    type: actionTypes.SET_WALLET_RECHARGE_OFFERS,
    payload,
})

export const onWalletRecharge = payload => ({
    type: actionTypes.ON_WALLET_RECHARGE,
    payload
})

export const onLogin = payload => ({
    type: actionTypes.ON_LOGIN,
    payload,
});
export const onOtpVerification = payload => ({
    type: actionTypes.ON_OTP_VERIFICATION,
    payload
})
export const onResend = payload => ({
    type: actionTypes.ON_RESEND,
    payload
})

export const setPaymentType = payload => ({
    type: actionTypes.SET_PAYMENT_TYPE,
    payload,
})


export const getUserKyc = payload => ({
    type: actionTypes.GET_USER_KYC,
    payload,
})

export const setUserKyc = payload => ({
    type: actionTypes.SET_USER_KYC,
    payload,
})

export const updateUserKyc = payload => ({
    type: actionTypes.UPDATE_USER_KYC,
    payload,
})

export const uploadUserKycImages = payload => ({
    type: actionTypes.UPLOAD_USER_KYC_IMAGES,
    payload,
})
