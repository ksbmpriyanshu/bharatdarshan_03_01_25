import * as actionTypes from '../actionTypes'

const initialState = {
    customerdata: [],
    getToken: null,
    walletRechargeOfferData: null,
    paymentType: { visible: false, data: null, onPress: ()=>{} },
    kycData: null
}

const userReducer = (state = initialState, actions) => {
    const { payload, type } = actions

    switch (type) {
        case actionTypes.SET_PROFILE: {
            return {
                ...state,
                customerdata: payload
            }
        }

        case actionTypes.SET_TOKEN: {
            return {
                ...state,
                getToken: payload
            }
        }

        case actionTypes.SET_WALLET_RECHARGE_OFFERS: {
            return {
                ...state,
                walletRechargeOfferData: payload
            }
        }

        case actionTypes.SET_PAYMENT_TYPE: {
            return {
                ...state,
                paymentType: payload
            }
        }
        case actionTypes.SET_USER_KYC: {
            return {
                ...state,
                kycData: payload
            }
        }

        default: {
            return state
        }
    }
}
export default userReducer;