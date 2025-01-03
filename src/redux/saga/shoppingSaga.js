import { put, select, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { getToken } from '../../config/token';
import { api_urls } from '../../utils/api-urls';
import { get_profile } from '../../utils/api-routes';
import { resetToScreen } from '../../navigations/NavigationServices';
import { getRequest, postRequest } from '../../utils/apiRequests';
import axios from 'axios';
import { navigate } from "../../navigations/NavigationServices";
import { razorpayPayment, razorpayPaymentOrder } from '../../utils/razorpay';
import { showToastMessage } from '../../utils/services';

function* getshoppingData() {
    try {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
       const response = yield getRequest({
            url: `${api_urls}api/e-commerce/get_product_category`,
      
        })
       yield put({ type: actionTypes.SET_SHOPPING_CATEGORY_DATA, payload: response?.productCategory });
       yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
      
    } catch (e) {
        console.log("something went wrong.....!",e);
    }
}
function* getshoppingproductData(actions) {
    try {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const { payload } = actions;
       const response = yield axios({
        method: 'post',
        url: `${api_urls}api/e-commerce/get_products`,
        data: payload,
      });
      console.log("++++++++++++++",response?.data?.products)
      yield put({
        type: actionTypes.SET_SHOPPING_PRODUCT_DATA,
        payload: response?.data?.products,
      });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    //   yield call(navigate, "products");
    
  
    } catch (error) {
      console.error('Error', error);
      showToastMessage({ message: 'Error' });
    }
  }
  function* getaddcartData(actions) {
    try {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const { payload } = actions;
       const response = yield axios({
        method: 'post',
        url: `${api_urls}api/e-commerce/add_to_cart`,
        data: payload,
      });
      console.log(response?.data,"add to cart response")
      yield put({
        type: actionTypes.SET_ADD_CART_DATA,
        payload: response?.data,
      
      });
      if(response) {
        yield put({ type: actionTypes.SET_ADD_TO_CART_DATA, payload: null});
      }
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
      } catch (error) {
      console.error('Error', error);
      showToastMessage({ message: 'Error' });
    }
  }

  function* getaddtocartData(actions) {
    try {
      const { payload } = actions;
     console.log("payload",payload)
     
       const response = yield axios({
        method: 'post',
        url: `${api_urls}api/e-commerce/get_customer_cart`,
        data: payload,
      });
      console.log("getcartdata", response)
    
      yield put({
        type: actionTypes.SET_ADD_TO_CART_DATA,
        payload: response?.data,
      
      });
      } catch (error) {
      console.error('Error', error);
    }
}

function* getdecreasecartData(actions) {
  try {
    const { payload } = actions;
     const response = yield axios({
      method: 'post',
      url: `${api_urls}api/e-commerce/update_cart_item_quantity`,
      data: payload,
    });
    console.log("decrease cart data", response?.data)
    yield put({
      type: actionTypes.SET_DECREASE_CART_DATA,
      payload: response?.data,
    
    });
    } catch (error) {
    console.error('Error', error);
    
  }
}
function* removeCartData(actions) {
  try {
    const { payload } = actions;
    console.log(payload)
     const response = yield axios({
      method: 'post',
      url: `${api_urls}api/e-commerce/remove_cart_item`,
      data: payload,
    });
    console.log("remove cart data", response?.data)
    yield put({
      type: actionTypes.SET_REMOVE_CART_DATA,
      payload: response?.data,
    
    });
    } catch (error) {
    console.error('Error', error);
  
  }
}


function* addAddress(actions) {
  try {
    const { payload } = actions;
     const response = yield axios({
      method: 'post',
      url: `${api_urls}api/e-commerce/add_address`,
      data: payload,
    });
    console.log("add address", response?.data)
    yield put({
      type: actionTypes.SET_ADD_ADDRESS_DATA,
      payload: response?.data,
    
    });

    if(response) {
      yield put({ type: actionTypes.ORDER_CART, payload: null});
    }
    } catch (error) {
    console.error('Error', error);
  
  }
}



function* orderCart(actions) {
  try {
    const { payload } = actions
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
    const customerData = yield select(state => state.registrationReducer.customerdata)
    const addtocartdata = yield select(state => state.shoppingReducer.addtocartdata)
    const addaddressdata = yield select(state => state.shoppingReducer.addaddressdata)
     const razorpayResponse = yield razorpayPaymentOrder({ amount: addtocartdata?.totalPrice, email: customerData?.email, contact: customerData?.phone, name: customerData?.name })
    console.log("razorpayResponse",razorpayResponse)
     if (razorpayResponse) {
        const response = yield postRequest({
            url: `${api_urls}api/e-commerce/order_product`,
            data: {
                customerId: customerData?._id,
                addressId:addaddressdata?.userAddress?._id
            }
        })
        console.log("response::::>>>>",response)
        if (response?.success) {
            showToastMessage({ message: response?.message })
            // yield put({ type: actionTypes.GET_ADD_TO_CART_DATA, payload: null })
            navigate('products')
        }
    } else {
        showToastMessage({ message: 'Payment Failed' })
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
} catch (e) {
    console.log(e)
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
}
}

function* orderData(actions) {
  try {
    const { payload } = actions;
     const response = yield axios({
      method: 'post',
      url: `${api_urls}api/user/getCustomerOrder`,
      data: payload,
    });
    console.log("order data", response?.data)
    yield put({
      type: actionTypes.SET_ORDER_DATA,
      payload: response?.data,
    
    });
    } catch (error) {
    console.error('Error', error);
  
  }
}


function* getconsultant(actions) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { payload } = actions;
     const response = yield axios({
      method: 'post',
      url: `${api_urls}api/app/customer/consultant_request`,
      data: payload,
    });
    console.log("consultant", response?.data)
    if(response?.data?.success){
      yield put({
        type: actionTypes.SET_CONSULTANT_DATA,
        payload: response?.data,
      
      });
  
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
      showToastMessage({message:"Thank you for connecting us!"})
    }
 
    } catch (error) {
    console.error('Error', error);
    
  }
}
export default function* settingSaga() {
    yield takeLeading(actionTypes.GET_SHOPPING_CATEGORY_DATA, getshoppingData)
    yield takeLeading(actionTypes.GET_SHOPPING_PRODUCT_DATA, getshoppingproductData)
    yield takeLeading(actionTypes.GET_ADD_CART_DATA, getaddcartData)
    yield takeLeading(actionTypes.GET_ADD_TO_CART_DATA, getaddtocartData)
    yield takeLeading(actionTypes.GET_DECREASE_CART_DATA, getdecreasecartData)
    yield takeLeading(actionTypes.GET_REMOVE_CART_DATA, removeCartData)
    yield takeLeading(actionTypes.GET_ADD_ADDRESS_DATA, addAddress)
    yield takeLeading(actionTypes.ORDER_CART, orderCart)
    yield takeLeading(actionTypes.GET_ORDER_DATA, orderData)
    yield takeLeading(actionTypes.GET_CONSULTANT_DATA, getconsultant)
   
}