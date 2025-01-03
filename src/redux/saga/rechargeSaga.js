import axios from 'axios';
import { api_urls } from '../../utils/api-urls';
import * as actionTypes from '../actionTypes';
import { call, put, select, takeLatest, takeLeading, } from 'redux-saga/effects';
import { dth_circle, dth_operator, gasbillDetails, get_recharge } from '../../utils/api-routes';
import { navigate, replace } from '../../navigations/NavigationServices';
import { getToken } from '../../config/token';
import { Alert } from 'react-native';
import { showToastMessage } from '../../utils/services';
import { razorpayPayment, walletPayment } from '../../utils/razorpay';
import { postRequest } from '../../utils/apiRequests';
import { api_url, app_api_url, cyrus_recharge, get_dth_data, get_dth_operators, get_electric_city_operator, get_fastag_operator, get_gas_operator, get_metro_operators, get_mobile_plans, get_operator_bill_info, get_operators_fields, recharge_fastag_recharge } from '../../config/constants';
import Contacts from 'react-native-contacts';

function* getDeviceContacts() {
    try {
        const response = yield Contacts.getAll()
        // console.log(response)
        if (response) {
            const contacts = [];
            response.forEach(item => {
                const number = item.phoneNumbers[0]?.number
                if (number) {
                    contacts.push({
                        phoneNumber: item.phoneNumbers[0]?.number,
                        name: item?.displayName,
                        image: item?.thumbnailPath
                    });

                    const data = item.phoneNumbers.filter(ele => ele.number != number)

                    data.forEach(ele => {
                        contacts.push({
                            phoneNumber: ele.number,
                            name: item?.displayName,
                            image: item?.thumbnailPath
                        });
                    });
                }

            });

            contacts.sort((a, b) => {
                const nameA = a.name?.toUpperCase() || ''; // ignore upper and lowercase
                const nameB = b.name?.toUpperCase() || ''; // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });

            yield put({ type: actionTypes.SET_DEVICE_CONTACTS, payload: contacts.reverse() })
            yield put({ type: actionTypes.SET_MASTER_DEVICE_CONTACTS, payload: contacts.reverse() })
        }
    } catch (e) {
        console.log(e)
    }
}

function* getMobilePlans(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { payload } = actions
        const response = yield postRequest({
            url: app_api_url + get_mobile_plans,
            data: {
                phoneNumber: payload?.phoneNumber
            }
        })
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>",response)
        if (response?.status) {
            yield put({ type: actionTypes.SET_MOBILE_PLANS, payload: response?.data?.operatorData?.PlanDescription })
            yield put({ type: actionTypes.SET_MASTER_MOBILE_PLANS, payload: response?.data?.operatorData?.PlanDescription })
            navigate('rechargeplans', { mobileData: payload, planData: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (e) {
        console.log(e, 'error')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getrecharge(actions) {
    const { payload } = actions;
    try {
        const Token = yield getToken();
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield axios({
            method: 'get',
            url: `${api_urls}${get_recharge}?mob=${payload?.data?.mob}`,
            headers: {
                'Authorization': `Bearer ${Token}`
            }

        });
      console.log("single plan data",response?.data)
        yield put({ type: actionTypes.SET_RECHARGE, payload: response?.data });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // yield call(navigate, 'rechargeplans', { data: payload?.data?.contactdata, phone: payload?.data?.mob, name: payload?.data?.name, prepiad: payload?.data?.perpaid })
        yield call(navigate, 'rechargeplans', {adminNumber:"admin",adminMobile:payload?.data?.mob,adminName:payload?.data?.name})

    } catch (e) {
        console.log(e, 'error')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* onRazorpay(actions) {
    try {
        const { payload } = actions
        const Token = yield getToken();
        console.log(payload, 'payload :::')
        const response = yield axios({
            method: 'post',
            url: 'https://bharatdarshan.app/api/recharge/create-recharge-order',
            headers: { 'Authorization': `Bearer ${Token}` },
            data: payload,
        });
        console.log('===> :::', response?.data);
        if (response?.data?.success) {
            // true
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
            yield put({ type: actionTypes.SET_RAZORPAY, payload: response?.data });

        } else {
            // false
            yield put({ type: actionTypes.SET_RAZORPAY, payload: null });
        }

    } catch (e) {
        console.log(e, 'error')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getRechargeRequestFields(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield postRequest({
            url: app_api_url + get_operators_fields,
            data: {
                operator: payload
            }
        })

        if (response?.status) {
            yield put({ type: actionTypes.SET_RECHARGE_REQUEST_FIELDS, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (e) {
        console.log(e, 'error')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getRechargeBillDetails(actions) {
    try {
        const { payload } = actions
        console.log("lsadkhfioas j98wqjoiwqj", payload)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield postRequest({
            url: app_api_url + get_operator_bill_info,
            data: payload
        })

        console.log(">>>>>>>>>>>>",response?.data)

        if (response?.status) {
            if (response?.data?.statuscode === 'ERR' || response?.data?.statuscode === '') {
                showToastMessage({ message: response?.data?.status })
            } else {
                navigate(payload?.navigateTo, { billData: response?.data, providerData: payload?.providerData })
            }

        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (e) {
        console.log(e, 'error')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getDthOperator(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield postRequest({
            url: app_api_url + get_dth_operators,
            data: {}
        })


        if (response?.status) {
            yield put({ type: actionTypes.SET_DTH_OPERATOR, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (e) {
        console.log(e, 'error')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getElectricityOperator(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield postRequest({
            url: app_api_url + get_electric_city_operator,
            data: {}
        })


        if (response?.status) {
            yield put({ type: actionTypes.SET_ELECTRICITY_OPERATOR, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (e) {
        console.log(e, 'error')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getGasOperator(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield axios({
            method: 'get',
            url: app_api_url + get_gas_operator,
            data: {}


        });
         console.log("get operator data",JSON.stringify(response?.data))

        if (response?.status) {
            yield put({ type: actionTypes.SET_GAS_OPERATOR, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (e) {
        console.log(e, 'error')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getFastagOperator(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield postRequest({
            url: app_api_url + get_fastag_operator,
            data: {}
        })

        if (response?.status) {
            yield put({ type: actionTypes.SET_FASTTAG_OPERATOR, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (e) {
        console.log(e, 'error')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getDthBillDetails(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield postRequest({
            url: app_api_url + get_dth_data,
            data: payload?.data
        })

        if (response?.status) {
            if (response?.data?.status == "1") {
                navigate('dthRecharge', { billData: response?.data, dthData: payload?.dthData })
            } else {
                showToastMessage({ message: response?.data?.records?.desc })
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (e) {
        console.log(e, 'error')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* onCyrusRecharge(actions) {
    try {
        const { payload } = actions;
        console.log("DTH Payload", payload)
        const customerData = yield select(state => state.registrationReducer.customerdata)
        yield put({ type: actionTypes.SET_PAYMENT_TYPE, payload: { visible: false, data: null, onPress: () => { } } })
        let razorpayOrderId = ''
        if (payload?.rechargeWith === 'WALLET') {
            const walletResponse = yield walletPayment({ amount: payload?.amount, type: payload?.type, userId: customerData?._id })
            if (!walletResponse.status) {
                showToastMessage({ message: 'Transaction Failed' })
                return
            }
            yield put({ type: actionTypes.SET_PROFILE, payload: walletResponse?.data })
            razorpayOrderId = walletResponse?.order_id
        } else if (payload?.rechargeWith === 'RAZORPAY') {
            const razorpayResponse = yield razorpayPayment({ amount: payload?.amount, name: 'Bharat Darshan', email: 'pr@bharatdarshan.today', contact: '9671902576', });
            if (!razorpayResponse?.razorpay_payment_id) {
                showToastMessage({ message: 'Transaction Failed' })
                return
            }
            razorpayOrderId = razorpayResponse?.razorpay_payment_id
        }
        console.log(razorpayOrderId,"razorpayOrderId")
        const data= { ...payload, userId: customerData?._id, razorpayOrderId }
        console.log("fasttag data", data)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield postRequest({
            url: app_api_url + cyrus_recharge,
            data: { ...payload, userId: customerData?._id, razorpayOrderId }
        })

        console.log(response)

        if (response?.status) {
            replace('paymentsuccess', { invoiceData: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })


    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
    }


}

function* getbilldetails(actions) {
    const { payload } = actions;

    try {
        const Token = yield getToken();
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        console.log(``)
        const response = yield axios({
            method: 'get',
            url: `${api_urls}${gasbillDetails}?operatorCode=${payload.data?.operatorCode}&phone=${payload.data?.phone}&number=${payload.data?.number}`,
            headers: {
                'Authorization': `Bearer ${Token}`
            },
            data: payload


        });
        if (response.data?.data?.statuscode == 'TXN') {
            yield put({ type: actionTypes.SET_BILL_DETAILS, payload: response?.data });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
            yield call(navigate, 'GasAmount', { data: payload, billDetails: response.data?.data?.data })
        } else {
            showToastMessage({ message: response.data?.data?.status });
            Alert.alert(response.data?.data?.status);
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        }


    } catch (e) {
        console.log(e, 'error')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getpostpaidoperator(actions) {
    const { payload } = actions;
    try {
        const Token = yield getToken();
      
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield axios({
            method: 'get',
            url: `${api_urls}${dth_operator}?operatorType=Postpaid-Mobile`,
            headers: {
                'Authorization': `Bearer ${Token}`
            }


        });
        console.log(">lsdkjfdsjsd",response)
        yield put({ type: actionTypes.SET_POSTPAID_OPERATOR, payload: response?.data?.data });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (e) {
        console.log(e, 'error')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* onFastTagRecharge(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const customerData = yield select(state => state.registrationReducer.customerdata)
        const { payload } = actions
        const razorPayResponse = yield razorpayPayment({
            amount: payload?.amount,
            email: customerData?.email,
            contact: `+91${customerData?.phone}`,
            name: customerData?.name
        })

        // console.log(razorPayResponse)

        if (razorPayResponse) {
            const response = yield postRequest({
                url: api_url + recharge_fastag_recharge,
                data: { ...payload, }
            })

            if (response) {
                navigate('paymentsuccess', { orderId: 'dsfsdfsdf' })
            }
        }


        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getMetroOperators(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield postRequest({
            url: app_api_url + get_metro_operators,
            data: {

            }
        })

        console.log(response)

        if (response?.status) {
            yield put({ type: actionTypes.SET_METRO_OPERATORS, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (e) {
        console.log(e, 'error')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* onDthValidation(actions) {
    try {
        const { payload } = actions
        console.log('payload :::', payload);
        const response = yield axios.get(`https://cyrusrecharge.in/services_cyapi/recharge_cyapi.aspx?memberid=AP414749&pin=B312294BDF&number=${payload?.data.customerid}&operator=${payload?.data.OperatorCode}&circle=1&amount=250&usertx=${payload?.data.userTax}&format=json&RechargeMode=1`);
        console.log('resonse ::::::', response.data);
        if (response.data.Status == 'Success') {
            yield call(payload?.onComplete);
        } else if (response.data.Status == 'Failure') {
            yield call(payload?.onLoadingComplete);
            yield call(payload?.onError);
        }
    } catch (e) {
        console.log(e, 'error');
    }
}


export default function* rechargeSaga() {
    yield takeLatest(actionTypes.GET_DEVICE_CONTACTS, getDeviceContacts);
    yield takeLatest(actionTypes.GET_MOBILE_PLANS, getMobilePlans);
    yield takeLatest(actionTypes.GET_RECHARGE, getrecharge);
    yield takeLatest(actionTypes.GET_RECHARGE_REQUEST_FIELDS, getRechargeRequestFields);
    yield takeLatest(actionTypes.GET_RECHARGE_BILL_DETAILS, getRechargeBillDetails);
    yield takeLatest(actionTypes.ON_RAZORPAY, onRazorpay);
    yield takeLeading(actionTypes.GET_DTH_OPERATOR, getDthOperator);
    yield takeLeading(actionTypes.GET_DTH_BILL_DETAILS, getDthBillDetails);
    yield takeLeading(actionTypes.GET_ELECTRICITY_OPERATOR, getElectricityOperator);
    yield takeLatest(actionTypes.GET_GAS_OPERATOR, getGasOperator);
    yield takeLatest(actionTypes.GET_BILL_DETAILS, getbilldetails);
    yield takeLatest(actionTypes.GET_POSTPAID_OPERATOR, getpostpaidoperator);
    yield takeLatest(actionTypes.GET_FASTTAG_OPERATOR, getFastagOperator);
    yield takeLatest(actionTypes.ON_FASTTAG_RECHARGE, onFastTagRecharge);
    yield takeLatest(actionTypes.GET_METRO_OPERATORS, getMetroOperators);
    yield takeLatest(actionTypes.GET_DTH_Validation, onDthValidation);
    yield takeLatest(actionTypes.ON_CYRUS_RECHARGE, onCyrusRecharge);
}