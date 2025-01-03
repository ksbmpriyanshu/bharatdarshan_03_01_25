import HotelListData from '../../screens/Hotel/HotelListData';
import * as actionTypes from '../actionTypes';

const initialState = {
    hotelHome: null,
    hotelSearch: null,
    hotelDetailsData: null,
    hotelBookSearch: null,
    bookConfirm: null,
    homeLoading: null,
    homeAll: null,
    homeInput: null,
    preBook: null,
    hotelAuth: null,
    HotelListDetails: null,
    hotelCancel: null,
    hotelBookPayment: null,
};

const hotelReducer = (state = initialState, actions) => {
    const {payload, type } = actions
    switch(type) {
        case actionTypes.SET_HOTEL_HOME : 
            return {
                ...state,
                hotelHome: payload
            }
        case actionTypes.SET_HOTEL_SEARCH: 
            return {
                ...state,
                hotelSearch: payload
            }
        case actionTypes.SET_HOTEL_DETAILS: 
            return {
                ...state,
                hotelDetailsData: payload 
            }
        case actionTypes.SET_HOTEL_BOOK_SEARCH: 
            return {
                ...state,
                hotelBookSearch: payload
            }
        case actionTypes.SET_BOOK_CONFIRM:
            return {
                ...state,
                bookConfirm: payload
            }
        case actionTypes.SET_HOTEL_HOME_LOADING:
            return {
                ...state,
                homeLoading: payload
            }
        case actionTypes.SET_HOTEL_ALL:
            return {
                ...state,
                homeAll: payload
            }
        case actionTypes.SET_HOTEL_HOME_INPUT:
            return {
                ...state,
                homeInput: payload
            }
        case actionTypes.SET_HOTEL_PRE_BOOK:
            return {
                ...state,
                preBook: payload
            }
        case actionTypes.SET_HOTEL_AUTH:
            return {
                ...state,
                hotelAuth: payload
            }
        case actionTypes.SET_HOTEL_LIST_DETAILS: 
            return {
                ...state,
                HotelListDetails: payload
            }
        case actionTypes.SET_HOTEL_CANCEL:
            return {
                ...state,
                hotelCancel: payload
            }
        case actionTypes.SET_HOTEL_PAYMENT:
            return {
                ...state,
                hotelBookPayment: payload
            }
        default: {
            return state
        }
    }
}

export default hotelReducer
