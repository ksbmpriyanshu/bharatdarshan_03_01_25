import * as actionTypes from '../actionTypes'

export const getShopping = payload => ({
    type: actionTypes.GET_SHOPPING_CATEGORY_DATA,
    payload,
});

export const setShopping = payload => ({
    type: actionTypes.SET_SHOPPING_CATEGORY_DATA,
    payload,
});
export const getShoppingProduct = payload => ({
    type: actionTypes.GET_SHOPPING_PRODUCT_DATA,
    payload,
});

export const setShoppingProduct = payload => ({
    type: actionTypes.SET_SHOPPING_PRODUCT_DATA,
    payload,
});

export const getAddcart = payload => ({
    type: actionTypes.GET_ADD_CART_DATA,
    payload,
});

export const setAddcart = payload => ({
    type: actionTypes.SET_ADD_CART_DATA,
    payload,
});
export const getAddtocart = payload => ({
    type: actionTypes.GET_ADD_TO_CART_DATA,
    payload,
});

export const setAddtocart = payload => ({
    type: actionTypes.SET_ADD_TO_CART_DATA,
    payload,
});
export const getDecreaseQuantity = payload => ({
    type: actionTypes.GET_DECREASE_CART_DATA,
    payload,
});

export const setDecreaseQuantity = payload => ({
    type: actionTypes.SET_DECREASE_CART_DATA,
    payload,
});

export const getRemoveCartData = payload => ({
    type: actionTypes.GET_REMOVE_CART_DATA,
    payload,
});

export const setRemoveCartData = payload => ({
    type: actionTypes.SET_REMOVE_CART_DATA,
    payload,
});
export const orderCart = payload => ({
    type: actionTypes.ORDER_CART,
    payload,
});

export const getAddAddress = payload => ({
    type: actionTypes.GET_ADD_ADDRESS_DATA,
    payload,
});

export const setAddAddress = payload => ({
    type: actionTypes.SET_ADD_ADDRESS_DATA,
    payload,
});
export const getorderData = payload => ({
    type: actionTypes.GET_ORDER_DATA,
    payload,
});

export const setOrderData = payload => ({
    type: actionTypes.SET_ORDER_DATA,
    payload,
});



export const getConsultant = payload => ({
    type: actionTypes.GET_CONSULTANT_DATA,
    payload,
});

export const setConsultant = payload => ({
    type: actionTypes.SET_CONSULTANT_DATA,
    payload,
});