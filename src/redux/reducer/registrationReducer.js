import * as actionTypes from '../actionTypes'

const initialState = {
    countrydata: [],
    statedata:[],
    customerdata:[],
    
}

const registrationReducer = (state = initialState, actions) => {
    const { payload, type } = actions

    switch (type) {
        case actionTypes.SET_COUNTRY: {
            return {
                ...state,
                countrydata: payload
            }
        }
        case actionTypes.SET_STATE: {
            return {
                ...state,
                statedata: payload
            }
        }
           case actionTypes.SET_PROFILE: {
            return {
                ...state,
                customerdata: payload
            }
        }
        default: {
            return state
        }
    }
}
export default registrationReducer;