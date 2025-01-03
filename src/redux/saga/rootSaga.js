import { all } from "redux-saga/effects";
import sancharSaga from './sancharSaga'
import bannerSaga from "./bannerSaga";
import registrationSaga from "./registrationSaga";
import userSaga from "./userSaga";
import rechargeSaga from "./rechargeSaga";
import commonSaga from "./commonSaga";
import flightSaga from "./flightSaga";
import settingSaga from "./settingSaga";
import hotelSaga from "./HotelSaga";
import historySaga from "./historySaga";
import authSaga from "./authSaga";
import shoppingSaga from "./shoppingSaga"
import poojaSaga from "./poojaSaga"

export default function* rootSaga() {
    yield all([
        authSaga(),
        sancharSaga(),
        bannerSaga(),
        registrationSaga(),
        userSaga(),
        rechargeSaga(),
        commonSaga(),
        flightSaga(),
        settingSaga(),
        hotelSaga(),
        historySaga(),
        shoppingSaga(),
       poojaSaga(),
    ]);
}
