import * as actionTypes from '../actionTypes'

const initialState = {
    opt:null,
    circle:null,
    bill:null
}
const operatorCircle = (state = initialState, actions) => {
    const { payload, type } = actions
    switch (type) {

        case actionTypes.SET_OPT: {
            return {
                ...state,
                otpData: payload
            }
        }
        case actionTypes.SET_CIRCLE: {
            return {
               ...state,
                circleData: payload
            }
        }
        case actionTypes.SET_BILLDATA: {
            return {
               ...state,
                billData: payload
            }
        }
       
        default: {
            return state
        }
    }
}

export default operatorCircle;