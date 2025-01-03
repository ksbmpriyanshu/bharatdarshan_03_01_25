import * as actionTypes from '../actionTypes';

export const getDeviceContacts = payload =>({
    type: actionTypes.GET_DEVICE_CONTACTS,
    payload
})

export const setDeviceContacts = payload => ({
    type: actionTypes.SET_DEVICE_CONTACTS,
    payload
})

export const setMasterDeviceContacts = payload => ({
    type: actionTypes.SET_MASTER_DEVICE_CONTACTS,
    payload
})

export const getMobilePlans = payload => ({
    type: actionTypes.GET_MOBILE_PLANS,
    payload
})

export const setMobilePlans = payload => ({
    type: actionTypes.SET_MOBILE_PLANS,
    payload
})

export const setMasterMobilePlans = payload => ({
    type: actionTypes.SET_MASTER_MOBILE_PLANS,
    payload
})

export const getrecharge = payload => ({
    type: actionTypes.GET_RECHARGE,
    payload,
});

export const setrecharge = payload => ({
    type: actionTypes.SET_RECHARGE,
    payload,
});

export const onRazorpay = payload => ({
    type: actionTypes.ON_RAZORPAY,
    payload,
});

export const getRechargeRequestFields = payload => ({
    type: actionTypes.GET_RECHARGE_REQUEST_FIELDS,
    payload,
})

export const setRechargeRequestFields = payload => ({
    type: actionTypes.SET_RECHARGE_REQUEST_FIELDS,
    payload,
})

export const getRechargeBillDetails = payload => ({
    type: actionTypes.GET_RECHARGE_BILL_DETAILS,
    payload,
})

export const setRechargeBillDetails = payload => ({
    type: actionTypes.SET_RECHARGE_BILL_DETAILS,
    payload,
});

export const getDthOperator = payload => ({
    type: actionTypes.GET_DTH_OPERATOR,
    payload,
});

export const setDthoperator = payload => ({
    type: actionTypes.SET_DTH_OPERATOR,
    payload,
});

export const getDthBillDetails = payload => ({
    type: actionTypes.GET_DTH_BILL_DETAILS,
    payload,
})

export const getoperator = payload => ({
    type: actionTypes.GET_OPERATOR,
    payload,
})
export const setoperator = payload => ({
    type: actionTypes.SET_OPERATOR,
    payload,
})
export const getbilldetails = payload => ({
    type: actionTypes.GET_BILL_DETAILS,
    payload,
})
export const setbilldetails = payload => ({
    type: actionTypes.SET_BILL_DETAILS,
    payload,
})
export const getpostpaidoperator = payload => ({
    type: actionTypes.GET_POSTPAID_OPERATOR,
    payload,
})
export const setpostpaidopertaor = payload => ({
    type: actionTypes.SET_POSTPAID_OPERATOR,
    payload,
})

export const onFastTagRecharge = payload => ({
    type: actionTypes.ON_FASTTAG_RECHARGE,
    payload,
})

export const getFastTagOperatior = payload => ({
    type: actionTypes.GET_FASTTAG_OPERATOR,
    payload,
})

export const setFastTagOperator = payload => ({
    type: actionTypes.SET_FASTTAG_OPERATOR,
    payload,
})

export const getElectricityOperator = payload => ({
    type: actionTypes.GET_ELECTRICITY_OPERATOR,
    payload
})

export const setElectricityOperator = payload => ({
    type: actionTypes.SET_ELECTRICITY_OPERATOR,
    payload
})

export const getMetroOperators = payload => ({
    type: actionTypes.GET_METRO_OPERATORS,
    payload
})

export const setMetroOperators = payload => ({
    type: actionTypes.SET_METRO_OPERATORS,
    payload
})

export const getGasOperator = payload => ({
    type: actionTypes.GET_GAS_OPERATOR,
    payload
})

export const setGasOperator = payload => ({
    type: actionTypes.SET_GAS_OPERATOR,
    payload
})


export const getDTHValdation = payload => ({
    type: actionTypes.GET_DTH_Validation,
    payload
});

export const onCyrusRecharge = payload => ({
    type: actionTypes.ON_CYRUS_RECHARGE,
    payload
})
