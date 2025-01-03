import * as actionTypes from '../actionTypes'

const initialState = {
    deviceContacts: null,
    masterDeviceContacts: null,
    mobilePlansData: null,
    masterMobilePlans: null,
    rechargeData: [],
    rechargeRequestFields: null,
    rechargeBillDetailsData: null,
    rechargeRazorpay: null,
    dthOperatorData: null,
    electricityOperators: null,
    gasOperators: null,
    fastagOperators: null,
    dthCircleData: null,
    gasOperatorData: null,
    gasbillDetails: null,
    postpaidOPerator: null,
    electricCityOperators: null,
    metroOperators: null
}

const rechargeReducer = (state = initialState, actions) => {
    const { payload, type } = actions

    switch (type) {

        case actionTypes.SET_DEVICE_CONTACTS: {
            return {
                ...state,
                deviceContacts: payload
            }
        }
        case actionTypes.SET_MASTER_DEVICE_CONTACTS: {
            return {
                ...state,
                masterDeviceContacts: payload
            }
        }
        case actionTypes.SET_MOBILE_PLANS: {
            return {
                ...state,
                mobilePlansData: payload
            }
        }
        case actionTypes.SET_MASTER_MOBILE_PLANS: {
            return {
                ...state,
                masterMobilePlans: payload
            }
        }
        case actionTypes.SET_RECHARGE: {
            return {
                ...state,
                rechargeData: payload
            }
        }
        case actionTypes.SET_RECHARGE_REQUEST_FIELDS: {
            return {
                ...state,
                rechargeRequestFields: payload
            }
        }
        case actionTypes.SET_RECHARGE_BILL_DETAILS: {
            return {
                ...state,
                rechargeBillDetailsData: payload
            }
        }
        case actionTypes.SET_RAZORPAY: {
            return {
                ...state,
                rechargeRazorpay: payload
            }
        }
        case actionTypes.SET_DTH_OPERATOR: {
            return {
                ...state,
                dthOperatorData: payload
            }
        }
        case actionTypes.SET_ELECTRICITY_OPERATOR: {
            return {
                ...state,
                electricityOperators: payload
            }
        }
        case actionTypes.SET_GAS_OPERATOR: {
            return {
                ...state,
                gasOperators: payload
            }
        }
        case actionTypes.SET_FASTTAG_OPERATOR: {
            return {
                ...state,
                fastagOperators: payload
            }
        }
        case actionTypes.SET_OPERATOR: {
            return {
                ...state,
                gasOperatorData: payload
            }
        }
        case actionTypes.SET_BILL_DETAILS: {
            return {
                ...state,
                gasbillDetails: payload
            }
        }
        case actionTypes.SET_POSTPAID_OPERATOR: {
            return {
                ...state,
                postpaidOPerator: payload
            }
        }

        case actionTypes.SET_METRO_OPERATORS: {
            return {
                ...state,
                metroOperators: payload
            }
        }

        default: {
            return state
        }
    }
}
export default rechargeReducer;
