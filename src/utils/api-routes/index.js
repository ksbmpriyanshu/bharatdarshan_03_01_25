//! Sanchar 
//? Video 
export const get_video_category = 'api/admin/getSeparateCategories';
export const get_sub_category_by_category_Id = 'api/admin/getSubCategoryByCategoryId';
export const get_video_category_by_category_Id = 'api/admin/getVideosBySubCategoryId';
//? Live
export const get_live_video = 'api/admin/getLive';

// * News
export const get_breaking_news = 'api/user/getBreakingNews';
export const get_news_category = 'api/user/getNewscategory';
export const get_news_category_by_id = 'api/user/getNewsByCategory';

// ! Podcast
export const get_audio = 'api/user/getAudioscategory';
export const get_audio_by_id = 'api/user/getAudioByCategory';
export const get_favourite_audio = 'api/user/makeAudioFavourite';

// ? Banner
export const get_banner = 'api/admin/getAllBanners';

// * Registration
export const get_country = 'api/user/countries';
export const get_state = 'api/user/states';
export const user_register = 'api/user/signup'

//? user profile
export const get_profile = 'api/user/getProfile';
export const user_login = 'api/user/login';
export const verify_otp = 'api/user/verifyUser'

// ! common 
export const get_terms_condition = 'api/admin/getTermsAndCondition'

// * recharge
export const get_recharge = 'api/recharge/fetch-plan'
export const on_recharge_payment = 'api/recharge/recharge-request'
// export const dth_operator = 'api/recharge/getOperator'
export const dth_operator = 'api/operator/get-operator-data'
export const dth_circle = 'api/recharge/getCircle'

// ?Gas
export const gasbillDetails = 'api/recharge/fetch-bill-data'

// history data
export const getHistoryData = 'api/recharge/get-recharge-history'
// privacy data
 export const getPrivacyData = 'api/admin/getPrivacyPolicy'
 export const getRefundData = 'api/admin/getRefundPolicy'
  export const getAboutData = 'api/admin/getAboutUs'

 // flights
export const get_airpot_cities = 'api/flight/get-airport-cities'
export const get_flight_data = 'api/flight/search-flight'

// * delete

export const delete_account = 'api/user/deleteUser'

// Hotel
export const get_hotel_home = 'api/user/hotelHome'
export const search_home = 'api/user/searchCity'
export const get_hotel_details = 'api/user/HotelCodes'
export const get_hotelBook_search = 'api/user/hotelsearchBook';
export const book_confrim = 'api/user/confrimBook';
export const hotel_see_all = 'api/user/hotel_seeall';
export const Hotel_search = 'api/user/startSearchHotel';
export const Book_payment = 'api/user/hotelpaymentOrder';
export const preBookHotel = 'api/user/preBookHotel';
export const HotelAuthenicate = 'api/user/hotelAuth';
export const HotelListDetails = 'api/user/getHotelListDetails';
export const HotelCancel = 'api/user/HotelCancel';
export const HotelPaymentBook = 'api/user/hotelbookingsave';


