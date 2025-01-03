import * as actionTypes from '../actionTypes'

const initialState = {
    bannerdata: [],
}

const bannerReducer = (state = initialState, actions) => {
    const { payload, type } = actions

    switch (type) {
        case actionTypes.SET_BANNER: {
            return {
                ...state,
                bannerdata: payload
            }
        }
        default: {
            return state
        }
    }
}
export default bannerReducer;