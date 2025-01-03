import axios from "axios";
import { api_urls } from "../../utils/api-urls";
import { book_confrim, get_hotel_details, get_hotel_home, get_hotelBook_search, Hotel_search, hotel_see_all, HotelAuthenicate, HotelCancel, HotelListDetails, HotelPaymentBook, preBookHotel, search_home } from "../../utils/api-routes";
import { put, select, takeLatest } from "redux-saga/effects";
import * as actionTypes from '../actionTypes';
import { navigate, resetToScreen } from "../../navigations/NavigationServices";
import { ToastAndroid } from "react-native";
import { getToken } from '../../config/token';
import { showToastMessage } from "../../utils/services";
import { razorpayPaymentHotel } from "../../utils/razorpay";

function* getHotelHome(actions) {
    try {
        const { payload } = actions
        console.log('Payload :::',payload);
        yield put({ type: actionTypes.SET_HOTEL_HOME_LOADING, payload: true});
        const response = yield axios.post(api_urls + get_hotel_home,payload);
        console.log('Hotel Response :::',response?.data);
        if(response) {
            yield put({ type: actionTypes.SET_HOTEL_HOME,payload: response.data });
            yield put({ type: actionTypes.SET_HOTEL_HOME_LOADING, payload: false});
        }
    } catch(e) {
        yield put({ type: actionTypes.SET_HOTEL_HOME_LOADING, payload: false});
        console.log(e);
    }
}

function* getHomeSearch(actions) {
    try {
        const { payload } = actions
        console.log('Payload Search :::', payload);
      
        const response = yield axios.post(api_urls + search_home,payload);
        console.log('Hotel Search Response :::',response?.data);
        if(response?.data?.success) {
            yield put({ type: actionTypes.SET_HOTEL_SEARCH,payload: response.data });
        } else {
            ToastAndroid.showWithGravityAndOffset(response.data.message,ToastAndroid.BOTTOM,ToastAndroid.SHORT,25,75);
        }
    } catch(e) {
        console.log(e);
    }
}

function* getHotelDetail(actions) {
    try {
        const { payload } = actions;
        console.log('Payload :::', payload);

        const response = yield axios.post( api_urls + get_hotel_details,payload);
        if(response.data.success) {
            yield put({ type: actionTypes.SET_HOTEL_DETAILS, payload: response.data.hotels });
        }
    } catch(e) {
        console.log(e);
    }
}

function* getHotelBookSearch(actions) {
    try {
        const { payload } = actions
        console.log('payload :::', payload);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true});
        const response = yield axios.post(api_urls + get_hotelBook_search,payload);
        console.log('Response :::',response.data.data);
        if(response.data.data.Status.Code === 200) {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false});
            yield put({ type: actionTypes.SET_HOTEL_BOOK_SEARCH, payload: response.data.data});
            navigate('hotelDetailsBook',{data: payload});
        } else {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false});
            ToastAndroid.showWithGravityAndOffset(response.data.data.Status.Description,ToastAndroid.SHORT,ToastAndroid.BOTTOM,75,25);
        }

    } catch(e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false});
        console.log(e);
    }
}

function* onBookConfrim(actions) {
    try {
        const { payload} = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true});
        const Token = yield getToken();
        console.log('payload :::', payload);
        const headers  ={
            'Authorization': `Bearer ${Token}`
        }
        const response = yield axios.post(api_urls + book_confrim,payload,{ headers }); 

        console.log('response book :::',response.data);

        if(response.data.data.BookResult.ResponseStatus == 1) {
            
            yield put({ type: actionTypes.SET_BOOK_CONFIRM,  payload: response.data.data});
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false});
            ToastAndroid.showWithGravityAndOffset("Book Confirm",ToastAndroid.SHORT,ToastAndroid.BOTTOM,75,25);
            navigate('HotelListData',{data: response.data.data.BookResult});
        } else if(response.data.data.BookResult.ResponseStatus == 0) {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false});
            ToastAndroid.showWithGravityAndOffset(response.data.data.BookResult.Error.ErrorMessage,ToastAndroid.SHORT,ToastAndroid.BOTTOM,75,25);
        } else if(response.data.data.BookResult.ResponseStatus == 2) {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false});
            ToastAndroid.showWithGravityAndOffset(response.data.data.BookResult.Error.ErrorMessage,ToastAndroid.SHORT,ToastAndroid.BOTTOM,75,25);
        } else if(response.data.data.BookResult.ResponseStatus == 3) {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false});
            ToastAndroid.showWithGravityAndOffset(response.data.data.BookResult.Error.ErrorMessage,ToastAndroid.SHORT,ToastAndroid.BOTTOM,75,25);
        } else if(response.data.data.BookResult.ResponseStatus == 4) {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false});
            ToastAndroid.showWithGravityAndOffset(response.data.data.BookResult.Error.ErrorMessage,ToastAndroid.SHORT,ToastAndroid.BOTTOM,75,25);
        } else if(response.data.data.BookResult.ResponseStatus == 5) {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false});
            ToastAndroid.showWithGravityAndOffset(response.data.data.BookResult.Error.ErrorMessage,ToastAndroid.SHORT,ToastAndroid.BOTTOM,75,25);
        } else if(!response.data.success) {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false});
            ToastAndroid.showWithGravityAndOffset(response.data.message,ToastAndroid.SHORT,ToastAndroid.BOTTOM,75,25);
        }
    } catch(e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false});
        console.log(e);
    }
}


function* getHomeAll(actions) {
    try {
        const { payload } = actions
        console.log('Payload ::::---', payload);
        yield put({ type: actionTypes.SET_HOTEL_HOME_INPUT, payload: payload?.homeInput});
        yield put({ type: actionTypes.SET_HOTEL_HOME_LOADING, payload: true });

        const response = yield axios.post(api_urls + Hotel_search,payload?.homeInput);
        console.log("response>>>",response?.data)
        if(response) {
            yield put({ type: actionTypes.SET_HOTEL_HOME, payload: response?.data });

            yield put({ type: actionTypes.SET_HOTEL_HOME_LOADING, payload: false});
            
        }
    } catch(e) {
        yield put({ type: actionTypes.SET_HOTEL_HOME_LOADING, payload: false});
        console.log(e);
    }
}

function* onHotelHomeSearch(actions) {
    try {
        const { payload } = actions
        console.log('Payload ::::--', payload);
        yield put({ type: actionTypes.SET_HOTEL_HOME_INPUT, payload: payload});
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });


        const response = yield axios.post(api_urls + Hotel_search,payload);
       
        if(response.data.success) {
            yield put({ type: actionTypes.SET_HOTEL_HOME, payload: response.data });
       
                showToastMessage({message: response?.data?.message})
            
           
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false});
            navigate('Hotel',{data: payload});
        } else {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false});
           
            ToastAndroid.showWithGravityAndOffset(response.data.message,ToastAndroid.BOTTOM,ToastAndroid.SHORT,25,75);
        }

        

    } catch(e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false});
    }
}

function* onHotelBookPayment(actions) {
    try {

    } catch(e) {
        console.log(e);
    }
};

function* getHotelPreBook(actions) {
    try {
        const { payload } = actions

        console.log('payload Pre Book :::', payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield axios.post(api_urls + preBookHotel,payload);

        console.log('Hotel Response Pre book :::',response.data);

        if(response.data.data.Status.Code == 200) {
            yield put({ type: actionTypes.SET_HOTEL_PRE_BOOK, payload: response.data });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false});
            navigate('HotelPayment',{data: payload});
        } else {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false});
            ToastAndroid.showWithGravityAndOffset(response.data.data.Status.Description,ToastAndroid.BOTTOM,ToastAndroid.SHORT,25,75);
        }

    } catch(e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false});
    }
}

function* onHotelAuth(actions) {
    try {

        const { payload } = actions
        console.log("payload :::", payload);
        const response = yield axios.post(api_urls + HotelAuthenicate,payload);
        console.log('response Auth :::', response.data);
        if(response.data.success) {
            yield put({type: actionTypes.SET_HOTEL_AUTH, payload: response.data});
        }

    } catch(e) {
         console.log(e);

    }
}

function* getHotelListDetails(actions) {
    try {
        const { payload } = actions;
        console.log('payload :::', payload);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield axios.post(api_urls + HotelListDetails, payload);
        console.log('response data :::',response.data);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false});
        if(response.data.success) {
            yield put({ type: actionTypes.SET_HOTEL_LIST_DETAILS, payload: response.data });
        }
    } catch(e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false});
    }
}

function* onHotelCancel(actions) {
    try {
        const { payload } = actions;
        console.log('payload :::',payload);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true});
        const response = yield axios.post(api_urls + HotelCancel, payload);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log('Response Cancel :::',response.data);
        if(response?.data?.success) {
            ToastAndroid.showWithGravityAndOffset(response.data.message,ToastAndroid.BOTTOM,ToastAndroid.SHORT,25,75);
            yield put({ type: actionTypes.SET_HOTEL_CANCEL, payload: response.data});
            resetToScreen('home');
        }
    } catch(e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* onHotelPayment(actions) {
    try {
        const { payload } = actions;
        const customerData = yield select(
            (state) => state.registrationReducer.customerdata
          );
        
        const response = yield axios.post(api_urls + HotelPaymentBook, payload);
          console.log("response ::: ",response?.data);

          console.log('Razorpay ::: ',response?.data?.razorpay)
        if(response?.data?.status) {
                showToastMessage({ message: 'Payment Failed' })
                return null
        } else {
            const razorpayTest = yield razorpayPaymentHotel({
                amount: response?.data?.razorpay?.amount,
                email: customerData?.email,
                contact: customerData?.phone,
                name: customerData?.name,
                orderId: response?.data?.razorpay?.id
            });

            console.log('Razorpay :::: ',razorpayTest);

            if(razorpayTest?.razorpay_payment_id) {
                showToastMessage({ message: "Successfully!"});
                yield put({ type: actionTypes.ON_BOOK_CONFIRM, payload: payload});
                // resetToScreen('home');
            }

        }
    } catch(e) {
        console.log(">>>>>>",e);
    }
}

export default function* hotelSaga() {
    yield takeLatest(actionTypes.ON_HOTEL_HOME,getHotelHome);
    yield takeLatest(actionTypes.ON_HOTEL_SEARCH,getHomeSearch);
    yield takeLatest(actionTypes.GET_HOTEL_DETAILS, getHotelDetail);
    yield takeLatest(actionTypes.GET_HOTEL_BOOK_SEARCH, getHotelBookSearch);
    yield takeLatest(actionTypes.ON_BOOK_CONFIRM,onBookConfrim);
    yield takeLatest(actionTypes.GET_HOTEL_ALL,getHomeAll);
    yield takeLatest(actionTypes.ON_HOTEL_HOME_SEARCH,onHotelHomeSearch);
    yield takeLatest(actionTypes.ON_HOTEL_BOOK_PAYMENT, onHotelBookPayment);
    yield takeLatest(actionTypes.GET_HOTEL_PRE_BOOK, getHotelPreBook);
    yield takeLatest(actionTypes.ON_HOTEL_AUTH, onHotelAuth);
    yield takeLatest(actionTypes.GET_HOTEL_LIST_DETAILS, getHotelListDetails);
    yield takeLatest(actionTypes.ON_HOTEL_CANCEL, onHotelCancel);
    yield takeLatest(actionTypes.ON_HOTEL_PAYMENT, onHotelPayment);
}