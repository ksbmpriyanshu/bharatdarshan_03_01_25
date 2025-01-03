import * as actionTypes from '../actionTypes';

export const setIsLoading = payload => ({
  type: actionTypes.SET_IS_LOADING,
  payload,
});
export const getTermsCondition = payload => ({
  type: actionTypes.GET_TERMS_CONDITION,
  payload,
});
export const setTermsCondition = payload => ({
  type: actionTypes.SET_TERMS_CONDITION,
  payload,
});
export const gethistorydata = payload => ({
  type: actionTypes.GET_HISTORY_DATA,
  payload,
})
export const sethistortdata = payload => ({
  type: actionTypes.SET_HISTORY_DATA,
  payload,
})
export const deleteaccount = payload => ({
  type: actionTypes.DELETE_ACCOUNT,
  payload,
})
export const getAboutData = payload => ({
  type: actionTypes.GET_ABOUT_DATA,
  payload,
});
export const setAboutData = payload => ({
  type: actionTypes.SET_ABOUT_DATA,
  payload,
});
export const getPrivacyData = payload => ({
  type: actionTypes.GET_PRIVACY_DATA,
  payload,
});
export const setPrivacyData = payload => ({
  type: actionTypes.SET_PRIVACY_DATA,
  payload,
});
export const getRefundData = payload => ({
  type: actionTypes.GET_REFUND_DATA,
  payload,
});
export const setRefundData = payload => ({
  type: actionTypes.SET_REFUND_DATA,
  payload,
});