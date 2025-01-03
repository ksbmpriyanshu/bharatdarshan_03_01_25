import { combineReducers } from "redux";
import { CLEAN_STORE } from "../actionTypes";
import common from "./common";
import sancharReducer from "./sancharReducer";
import bannerReducer from "./bannerReducer";
import registrationReducer from "./registrationReducer";
import userReducer from "./userReducer";
import rechargeReducer from "./rechargeReducer";
import optCircleReducer from './operatorCircle'
import flightReducer from "./flightReducer";
import hotelReducer from "./hotelReducer";
import historyReducer from "./historyReducer";
import shoppingReducer from "./shoppingReducer"
import poojaReducer from "./poojaReducer"
const rootreducer = combineReducers({
    common,
    sancharReducer,
    bannerReducer,
    registrationReducer,
    userReducer,
    rechargeReducer,
    optCircleReducer,
    flightReducer,
    hotelReducer,
    historyReducer,
    shoppingReducer,
    poojaReducer,
})

const appReducer = (state, action) => {
    if (action.type == CLEAN_STORE) {
        state = undefined;
    }
    return rootreducer(state, action)
}
export default appReducer;