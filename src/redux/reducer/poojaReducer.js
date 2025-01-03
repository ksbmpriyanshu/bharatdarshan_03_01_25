import * as actionTypes from '../actionTypes'

const initialState = {
    poojadata:null,
    dailydarshandata:null,
    yatradata:null,
    packagedata:null,
}

const registrationReducer = (state = initialState, actions) => {
    const { payload, type } = actions

    switch (type) {
        case actionTypes.SET_POOJA_DATA: {
            return {
                ...state,
                poojadata: payload
            }
        }
        case actionTypes.SET_DAILY_DARSHAN_DATA: {
            return {
                ...state,
                dailydarshandata: payload
            }
        }
        case actionTypes.SET_YATRA_DATA: {
            return {
                ...state,
                yatradata: payload
            }
        }
        case actionTypes.SET_PACKAGE_DATA: {
            return {
                ...state,
               packagedata: payload
            }
        }
        default: {
            return state
        }
    }
}
export default registrationReducer;