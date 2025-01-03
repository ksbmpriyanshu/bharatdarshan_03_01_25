import { call, put, select, takeEvery, takeLatest, takeLeading, } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { get_audio, get_audio_by_id, get_breaking_news, get_favourite_audio, get_live_video, get_news_category, get_news_category_by_id, get_sub_category_by_category_Id, get_video_category, get_video_category_by_category_Id } from '../../utils/api-routes';
import { api_urls } from '../../utils/api-urls';

// ! Video

function* getVideoCategory() {
    try {

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield axios({
            method: 'get',
            url: api_urls + get_video_category
        });
        console.log("Video response",response?.data?.results?.Videoclip)
        if (response?.data?.status) {
            yield put({ type: actionTypes.SET_VIDEO_CATEGORY, payload: response?.data?.results?.Videoclip });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getSubCategoryByCategoryId(action) {
    const { payload } = action;

    try {

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield axios({
            method: 'post',
            url: api_urls + get_sub_category_by_category_Id,
            data: payload.data
        });

        if (response?.data?.status) {
            yield put({ type: actionTypes.SET_SUB_CATEGORY_BY_CATEGORY_ID, payload: response?.data?.results });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}
function* getVideoCategoryByCategoryId(action) {
    const { payload } = action;

    try {

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield axios({
            method: 'post',
            url: api_urls + get_video_category_by_category_Id,
            data: payload.data
        });

        if (response?.data?.status) {
            yield put({ type: actionTypes.SET_VIDEO_CATEGORY_BY_CATEGORY_ID, payload: response?.data?.results });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

// * News

function* getBreakingNews() {
    try {

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield axios({
            method: 'get',
            url: api_urls + get_breaking_news
        });
        if (response?.data?.status) {
            yield put({ type: actionTypes.SET_BREAKING_NEWS, payload: response?.data?.results });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}
function* getNewsCategory() {
    try {

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield axios({
            method: 'get',
            url: api_urls + get_news_category
        });

        if (response?.data?.status) {
            yield put({ type: actionTypes.SET_NEWS_CATEGORY, payload: response?.data?.results });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}
function* getNewsCategoryById(action) {
    const { payload } = action;
    try {

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield axios({
            method: 'post',
            url: api_urls + get_news_category_by_id,
            data: payload.data
        });
        if (response?.data?.status) {
            yield put({ type: actionTypes.SET_NEWS_CATEGORY_BY_ID, payload: response?.data?.results });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

// !Podcast

function* getAudio() {
    try {

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield axios({
            method: 'get',
            url: api_urls + get_audio
        });
        if (response?.data?.status) {
            yield put({ type: actionTypes.SET_AUDIO, payload: response?.data?.results });
            // yield put({type: actionTypes.GET_AUDIO_BY_ID, payload: response?.data?.results[0]?._id})
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getAudioById(action) {
    const { payload } = action;
    try {

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield axios({
            method: 'post',
            url: api_urls + get_audio_by_id,
            data: payload?.data
        });

        if (response?.data?.status) {
            yield put({ type: actionTypes.SET_AUDIO_BY_ID, payload: response?.data?.results });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}
function* getFavouriteAudio(action) {
    const { payload } = action;
    console.log(payload, 'payload ::: ')
    try {

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield axios({
            method: 'post',
            url: api_urls + get_favourite_audio,
            data: payload?.data
        });
        console.log(response?.data, 'resssss :')
        if (response?.data?.status) {
            yield put({ type: actionTypes.GET_AUDIO_BY_ID, payload: { audioSubCategoryId: payload?.audioSubCategoryId } });

        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}
function* getLiveVideo() {
    try {

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield axios({
            method: 'get',
            url: api_urls + get_live_video
        });
        // console.log("Live Video response",response?.data)
        if (response) {
            yield put({ type: actionTypes.SET_LIVE_VIDEO_DATA, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

export default function* sancharSaga() {
    //  * Video
    yield takeLeading(actionTypes.GET_VIDEO_CATEGORY, getVideoCategory);
    yield takeLeading(actionTypes.GET_SUB_CATEGORY_BY_CATEGORY_ID, getSubCategoryByCategoryId);
    yield takeLeading(actionTypes.GET_VIDEO_CATEGORY_BY_CATEGORY_ID, getVideoCategoryByCategoryId);

    // * News

    yield takeLeading(actionTypes.GET_BREAKING_NEWS, getBreakingNews);
    yield takeLeading(actionTypes.GET_NEWS_CATEGORY, getNewsCategory);
    yield takeLeading(actionTypes.GET_NEWS_CATEGORY_BY_ID, getNewsCategoryById);

    // * Podcast
    yield takeLeading(actionTypes.GET_AUDIO, getAudio);
    yield takeLeading(actionTypes.GET_AUDIO_BY_ID, getAudioById);
    yield takeLeading(actionTypes.GET_FAVOURITE_AUDIO, getFavouriteAudio);

    // * Live
    yield takeLeading(actionTypes.GET_LIVE_VIDEO_DATA, getLiveVideo);

}