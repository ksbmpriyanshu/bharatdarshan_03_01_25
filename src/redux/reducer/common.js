import * as actionTypes from '../actionTypes'

const initialState = {
    isLoading: false,
    termsCondition:[],
    historyData:null,
    simmerVisible: false,
    aboutData:null,
    privacyData:null,
    refundData:null
}

const common = (state = initialState, actions) => {
    const { payload, type } = actions

    switch (type) {

        case actionTypes.SET_IS_LOADING: {
            return {
                ...state,
                isLoading: payload
            }
        }
        case actionTypes.SET_SIMMER_VISIBLE: {
            return {
                ...state,
                simmerVisible: payload
            }
        }
        case actionTypes.SET_TERMS_CONDITION: {
            return {
                ...state,
                termsCondition: payload
            }
        }
        case actionTypes.SET_HISTORY_DATA:{
            return{
                ...state,
                historyData: payload
            }
        }

        case actionTypes.SET_ABOUT_DATA:{
            return{
                ...state,
                aboutData: payload
            }
        }
        case actionTypes.SET_PRIVACY_DATA:{
            return{
                ...state,
                privacyData: payload
            }
        }
        case actionTypes.SET_REFUND_DATA:{
            return{
                ...state,
                refundData: payload
            }
        }
        default: {
            return state
        }
    }
}
 export default common;