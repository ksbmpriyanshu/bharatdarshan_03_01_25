import * as actionTypes from '../actionTypes';

//* Video

export const getVideoCategory = payload => ({
    type: actionTypes.GET_VIDEO_CATEGORY,
    payload,
});

export const setVideoCategory = payload => ({
    type: actionTypes.SET_VIDEO_CATEGORY,
    payload,
});

export const getSubCategoryByCategoryId = payload => ({
    type: actionTypes.GET_SUB_CATEGORY_BY_CATEGORY_ID,
    payload,
});

export const setSubCategoryByCategoryId = payload => ({
    type: actionTypes.SET_SUB_CATEGORY_BY_CATEGORY_ID,
    payload,
});
export const getVideoCategoryByCategoryId = payload => ({
    type: actionTypes.GET_VIDEO_CATEGORY_BY_CATEGORY_ID,
    payload,
});

export const setVideoCategoryByCategoryId = payload => ({
    type: actionTypes.SET_VIDEO_CATEGORY_BY_CATEGORY_ID,
    payload,
});

// * News
export const getBreakingNews = payload => ({
    type: actionTypes.GET_BREAKING_NEWS,
    payload,
});

export const setBreakingNews = payload => ({
    type: actionTypes.SET_BREAKING_NEWS,
    payload,
});
export const getNewsCategory = payload => ({
    type: actionTypes.GET_NEWS_CATEGORY,
    payload,
});

export const setNewsCategory = payload => ({
    type: actionTypes.SET_NEWS_CATEGORY,
    payload,
});
export const getNewsCategoryById = payload => ({
    type: actionTypes.GET_NEWS_CATEGORY_BY_ID,
    payload,
});

export const setNewsCategoryById = payload => ({
    type: actionTypes.SET_NEWS_CATEGORY_BY_ID,
    payload,
});

// ! Podcast 

export const getAudio = payload => ({
    type: actionTypes.GET_AUDIO,
    payload,
});

export const setAudio = payload => ({
    type: actionTypes.SET_AUDIO,
    payload,
});
export const getAudioById = payload => ({
    type: actionTypes.GET_AUDIO_BY_ID,
    payload,
});

export const setAudioById = payload => ({
    type: actionTypes.SET_AUDIO_BY_ID,
    payload,
});
export const getFavouriteAudio = payload => ({
    type: actionTypes.GET_FAVOURITE_AUDIO,
    payload,
});

// ! Live

export const getLiveVideo = payload => ({
    type: actionTypes.GET_LIVE_VIDEO_DATA,
    payload,
});

export const setLiveVideo = payload => ({
    type: actionTypes.SET_LIVE_VIDEO_DATA,
    payload,
});