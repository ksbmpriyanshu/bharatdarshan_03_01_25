import * as actionTypes from '../actionTypes'

const initialState = {
    videoCategoryData: [],
    subCategoryByCategoryIdData: [],
    videoCategoryByCategoryIdData: [],
    breakingNews: [],
    newsCategory: [],
    newsCategoryByid: [],
    audioData: [],
    audioDataById: [],
    liveVideo:[],

}

const sancharReducer = (state = initialState, actions) => {
    const { payload, type } = actions
    switch (type) {

        // !  Video
        case actionTypes.SET_VIDEO_CATEGORY: {
            return {
                ...state,
                videoCategoryData: payload
            }
        }
        case actionTypes.SET_SUB_CATEGORY_BY_CATEGORY_ID: {
            return {
                ...state,
                subCategoryByCategoryIdData: payload
            }
        }
        case actionTypes.SET_VIDEO_CATEGORY_BY_CATEGORY_ID: {
            return {
                ...state,
                videoCategoryByCategoryIdData: payload
            }
        }

        // ! News
        case actionTypes.SET_BREAKING_NEWS: {
            return {
                ...state,
                breakingNews: payload
            }
        }
        case actionTypes.SET_NEWS_CATEGORY: {
            return {
                ...state,
                newsCategory: payload
            }
        }
        case actionTypes.SET_NEWS_CATEGORY_BY_ID: {
            return {
                ...state,
                newsCategoryByid: payload
            }
        }

        // ! PodCast

        case actionTypes.SET_AUDIO: {
            return {
                ...state,
                audioData: payload
            }
        }
        case actionTypes.SET_AUDIO_BY_ID: {
            return {
                ...state,
                audioDataById: payload
            }
        }
        case actionTypes.SET_LIVE_VIDEO_DATA: {
            return {
                ...state,
                liveVideo: payload
            }
        }
        default: {
            return state
        }
    }
}
export default sancharReducer;