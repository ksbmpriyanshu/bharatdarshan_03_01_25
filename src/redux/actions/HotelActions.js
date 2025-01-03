import * as actionTypes from '../actionTypes'

export const getHotelHome = payload => ({
    type: actionTypes.ON_HOTEL_HOME,
    payload
});

export const onHotelSearch = payload => ({
    type: actionTypes.ON_HOTEL_SEARCH,
    payload
});

export const getHotelDetails = payload => ({
    type: actionTypes.GET_HOTEL_DETAILS,
    payload
});

export const getHotelBookSearch = payload => ({
    type: actionTypes.GET_HOTEL_BOOK_SEARCH,
    payload
});

export const onBookConfrim = payload => ({
    type: actionTypes.ON_BOOK_CONFIRM,
    payload
});

export const getHotelAll = payload => ({
    type: actionTypes.GET_HOTEL_ALL,
    payload
});

export const getHotelSearchHome = payload => ({
    type: actionTypes.ON_HOTEL_HOME_SEARCH,
    payload
});

export const onHotelPayment = payload => ({
    type: actionTypes.ON_HOTEL_BOOK_PAYMENT,
    payload
});

export const getHotelPreBook = payload => ({
    type: actionTypes.GET_HOTEL_PRE_BOOK,
    payload
});

export const onHotelAuth = payload => ({
    type: actionTypes.ON_HOTEL_AUTH,
    payload
});

export const getHotelListDetails = payload => ({
    type: actionTypes.GET_HOTEL_LIST_DETAILS,
    payload
});

export const onHotelCancel = payload => ({
    type: actionTypes.ON_HOTEL_CANCEL,
    payload
});

export const onHotelBookPayment = payload => ({
    type: actionTypes.ON_HOTEL_PAYMENT,
    payload
})
