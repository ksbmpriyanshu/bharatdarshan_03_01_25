import * as actionTypes from '../actionTypes'

const initialState = {
    shoppingdata:null,
    shoppingproductdata:null,
    addcartdata:null,
    addtocartdata:null,
    decreasecartquantity:null,
    removecartdata:null,
    addaddressdata:null,
    orderdata:null,
}

const registrationReducer = (state = initialState, actions) => {
    const { payload, type } = actions

    switch (type) {
        case actionTypes.SET_SHOPPING_CATEGORY_DATA: {
            return {
                ...state,
                shoppingdata: payload
            }
        }
    
        case actionTypes.SET_SHOPPING_PRODUCT_DATA: {
            return {
                ...state,
                shoppingproductdata: payload
            }
        } 
        case actionTypes.SET_ADD_CART_DATA: {
            return {
                ...state,
                addcartdata: payload
            }
        } 
        case actionTypes.SET_ADD_TO_CART_DATA: {
            return {
                ...state,
                addtocartdata: payload
            }
        }
        case actionTypes.SET_DECREASE_CART_DATA: {
            return {
                ...state,
                decreasecartquantity: payload
            }
        }
        case actionTypes.SET_REMOVE_CART_DATA: {
            return {
                ...state,
                removecartdata: payload
            }
        }
        case actionTypes.SET_ADD_ADDRESS_DATA: {
            return {
                ...state,
                addaddressdata: payload
            }
        }
        case actionTypes.SET_ORDER_DATA: {
            return {
                ...state,
                orderdata: payload
            }
        }
        default: {
            return state
        }
    }
}
export default registrationReducer;