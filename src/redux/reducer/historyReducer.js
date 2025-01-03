import * as actionTypes from '../actionTypes'

const initialState = {
    rechargeHistoryData: null
}

const historyReducer = (state = initialState, actions) =>{
    const { payload, type } = actions

    switch(type){
        case actionTypes.SET_RECHARGE_HISTORY: {
            return {
                ...state,
                rechargeHistoryData: payload
            }
        }
        default: {
            return state
        }
    }
 
}

export default historyReducer;