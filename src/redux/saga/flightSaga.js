import {
  call,
  put,
  select,
  takeEvery,
  takeLatest,
  takeLeading,
} from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { get_airpot_cities, get_banner } from "../../utils/api-routes";
import { api_urls } from "../../utils/api-urls";
import { showToastMessage } from "../../utils/services";
import { navigate, resetToScreen } from "../../navigations/NavigationServices";
import { getRequest, postRequest } from "../../utils/apiRequests";
import { fetchAndStoreIPv4Address } from "../../components/NetworkHelper";
import moment from "moment";
import { razorpayPayment } from "../../utils/razorpay";
import {
  app_api_url,
  book_flight,
  get_booked_flight,
  get_calendar_fare,
  get_fare_quote,
  get_fare_rule,
  get_flight_data,
  get_flight_details,
  get_flight_search,
  ticket_flight,
} from "../../config/constants";
import axios from "axios";

function* getairpotcities(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield getRequest({
      url: `${api_urls}${get_airpot_cities}?searchKey=${payload}`,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_AIRPOT_CITEST,
        payload: response?.data,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, "error");
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getFlightListData(actions) {
  try {
    const { payload } = actions;
    console.log("flight search data::::>>>>",payload)
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const tokenResponse = yield getRequest({
      url: "https://bharatdarshan.app/api/flight/get-flight-token",
    });

    console.log(" Response Token ::::", tokenResponse);

    // console.log("searchPayload", JSON.stringify(payload));

    const data = {
      ...payload, TokenId: tokenResponse?.data?.TokenId
    }
    console.log(data,"skrfhsaoiew>>>")
    const response = yield postRequest({
      url: app_api_url + get_flight_search,
      data: data,
    });
   console.log("my response",response)
    if (payload?.JourneyType === 1) {
      const flightDates = {
        TokenId: tokenResponse?.data?.TokenId,
        EndUserIp: payload?.EndUserIp,
        JourneyType: 1,
        PreferredAirlines: null,
        Segments: payload?.Segments,
      };

      const dateResponse = yield postRequest({
        url: app_api_url + get_calendar_fare,
        data: flightDates,
      });
      console.log('Date Response ::::', dateResponse)
      if (dateResponse?.data?.Response?.Error?.ErrorCode === 0) {
        yield put({
          type: actionTypes.SET_FLIGHTS_DATE_DATA,
          payload: dateResponse?.data?.Response?.SearchResults,
        });
      }
    }

    // console.log("searchResponse", JSON.stringify(response));

    if (response?.status) {
      if (response?.data?.Response?.Error?.ErrorCode === 0) {
        yield put({
          type: actionTypes.SET_FLIGHT_LIST_DATA,
          payload: response?.data?.Response,
        });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        yield call(navigate, "flightinfo", { payload });
      } else {
        showToastMessage({
          message: response?.data?.Response?.Error?.ErrorMessage,
        });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
      }
    } else {
      showToastMessage({ message: "NO Flights Founds  in that Destination" });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
  } catch (e) {
    console.log(e, "error");
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getFlightData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_SIMMER_VISIBLE, payload: true });
    const ip = yield fetchAndStoreIPv4Address();
    const tokenResponse = yield getRequest({
      url: 'https://bharatdarshan.app/api/flight/get-flight-token'
    })
    console.log("tokenResponse",tokenResponse)
    console.log({
      EndUserIp: ip,
      TokenId: tokenResponse?.data?.TokenId,
      TraceId: payload?.TraceId,
      ResultIndex1: payload?.ResultIndex1,
      ResultIndex2: payload?.ResultIndex2,
      type: payload?.ResultIndex2 ? 2 : 1,
    },"token check>>>>>>");

    const response = yield postRequest({
      url: app_api_url + get_flight_data,
      data: {
        EndUserIp: ip,
        TokenId: tokenResponse?.data?.TokenId,
        TraceId: payload?.TraceId,
        ResultIndex1: payload?.ResultIndex1,
        ResultIndex2: payload?.ResultIndex2,
        type: payload?.ResultIndex2 ? 2 : 1,
      },
    });

    console.log("flighDataResponse", JSON.stringify(response));

    if (response?.status) {
      yield put({
        type: actionTypes.SET_FLIGHT_DATA,
        payload: response?.data?.fareResponse?.Response,
      });
      yield put({
        type: actionTypes.SET_FLIGHT_FARE_RULES,
        payload: response?.data?.fareRuleResponse?.Response,
      });
      yield put({
        type: actionTypes.SET_RETURN_FLIGHT_DATA,
        payload: response?.data?.returnFareResponse?.Response,
      });

      yield put({
        type: actionTypes.SET_FLIGHT_SSR_DATA,
        payload: response?.data?.ssrResponse?.Response,
      });
      yield put({
        type: actionTypes.SET_RETURN_FLIGHT_SSR_DATA,
        payload: response?.data?.returnSsrResponse?.Response,
      });
      // yield put({ type: actionTypes.SET_FLIGHT_FARE_RULES, payload:  response?.data?.fareRuleResponse })
      // yield put({ type: actionTypes.SET_FLIGHT_FARE_RULES, payload:  response?.data?.fareRuleResponse })
    }

    yield put({ type: actionTypes.SET_SIMMER_VISIBLE, payload: false });
  } catch (e) {
    console.log(e, "error");
    yield put({ type: actionTypes.SET_SIMMER_VISIBLE, payload: false });
  }
}

function* getFlightAndReturnData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_SIMMER_VISIBLE, payload: true });
    const ip = yield fetchAndStoreIPv4Address();
    const tokenResponse = yield getRequest({
      url: "https://bharatdarshan.app/api/flight/get-flight-token",
    });

    const flightData = {
      EndUserIp: ip,
      TokenId: tokenResponse?.data?.TokenId,
      TraceId: payload?.TraceId,
      ResultIndex: payload?.Flight,
    };

    const returnFlightData = {
      EndUserIp: ip,
      TokenId: tokenResponse?.data?.TokenId,
      TraceId: payload?.TraceId,
      ResultIndex: payload?.ReturnFlight,
    };

    console.log(
      "flightData Payload",
      JSON.stringify(JSON.stringify(flightData))
    );
    console.log(
      "returnFlightData Payload",
      JSON.stringify(JSON.stringify(returnFlightData))
    );

    const flightResponse = yield postRequest({
      url: app_api_url + get_fare_quote,
      data: flightData,
    });

    const returnFlightResponse = yield postRequest({
      url: app_api_url + get_fare_quote,
      data: returnFlightData,
    });

    const flightFareRuleResponse = yield postRequest({
      url: app_api_url + get_fare_rule,
      data: flightData,
    });

    const returnFlightFareRuleResponse = yield postRequest({
      url: app_api_url + get_fare_rule,
      data: returnFlightData,
    });

    console.log("flightResponseFareQuate", JSON.stringify(flightResponse));
    console.log(
      "returnFlightResponseFareQuate",
      JSON.stringify(returnFlightResponse)
    );
    console.log(
      "flightFareRuleResponse",
      JSON.stringify(flightFareRuleResponse)
    );
    console.log(
      "returnFlightFareRuleResponse",
      JSON.stringify(returnFlightFareRuleResponse)
    );

    if (flightResponse && returnFlightResponse) {
      yield put({
        type: actionTypes.SET_FLIGHT_DATA,
        payload: flightResponse?.Response,
      });
      yield put({
        type: actionTypes.SET_RETURN_FLIGHT_DATA,
        payload: returnFlightResponse?.Response,
      });
    }

    yield put({ type: actionTypes.SET_SIMMER_VISIBLE, payload: false });
  } catch (e) {
    console.log(e, "error");
    yield put({ type: actionTypes.SET_SIMMER_VISIBLE, payload: false });
  }
}

function* bookFlight(actions) {
  try {
    const { payload } = actions;
    const customerData = yield select(
      (state) => state.registrationReducer.customerdata
    );

    const tokenResponse = yield getRequest({
      url: "https://bharatdarshan.app/api/flight/get-flight-token",
    });

    const ip = yield fetchAndStoreIPv4Address();
    const passenger = yield select((state) => state.flightReducer.passengers);
    const primaryContact = yield select(
      (state) => state.flightReducer.primaryContact
    );
    const flightData = yield select((state) => state.flightReducer.flightData);
    const returnFlightData = yield select(
      (state) => state.flightReducer.returnFlightData
    );
    const flightListData = yield select(
      (state) => state.flightReducer.flightListData
    );

    const Passengers = [];

    const titles = ["Mrs", "Ms", "Mr"];

    const AdultFare = flightData?.Results?.FareBreakdown.filter(
      (item) => item?.PassengerType === 1
    );
    const ChildFare = flightData?.Results?.FareBreakdown.filter(
      (item) => item?.PassengerType === 2
    );
    const InFantsFare = flightData?.Results?.FareBreakdown.filter(
      (item) => item?.PassengerType === 3
    );

    const totalAdults = passenger.filter((ele) => ele.type === "Adult").length;
    const totalChild = passenger.filter((ele) => ele.type === "Child").length;
    const totalInfant = passenger.filter((ele) => ele.type === "Infant").length;

    let leadPax = true;
    passenger.forEach((element) => {
      let Fare = null;
      let Seat = null;
      if (element?.type == "Adult") {
        Fare = {
          BaseFare: AdultFare[0]?.BaseFare / totalAdults,
          Tax: AdultFare[0]?.Tax / totalAdults,
          YQTax: AdultFare[0]?.YQTax,
          AdditionalTxnFeeOfrd: AdultFare[0]?.AdditionalTxnFeeOfrd,
          AdditionalTxnFeePub: AdultFare[0]?.AdditionalTxnFeePub,
          PGCharge: AdultFare[0]?.PGCharge,
        };
        if (element?.seatCode) {
          Seat = [element?.seatCode];
        }
      } else if (element?.type === "Child") {
        Fare = {
          BaseFare: ChildFare[0]?.BaseFare / totalChild,
          Tax: ChildFare[0]?.Tax / totalChild,
          YQTax: ChildFare[0]?.YQTax,
          AdditionalTxnFeeOfrd: ChildFare[0]?.AdditionalTxnFeeOfrd,
          AdditionalTxnFeePub: ChildFare[0]?.AdditionalTxnFeePub,
          PGCharge: ChildFare[0]?.PGCharge,
        };
        if (element?.seatCode) {
          Seat = [element?.seatCode];
        }
      } else {
        Fare = {
          BaseFare: InFantsFare[0]?.BaseFare / totalInfant,
          Tax: InFantsFare[0]?.Tax / totalInfant,
          YQTax: InFantsFare[0]?.YQTax,
          AdditionalTxnFeeOfrd: InFantsFare[0]?.AdditionalTxnFeeOfrd,
          AdditionalTxnFeePub: InFantsFare[0]?.AdditionalTxnFeePub,
          PGCharge: InFantsFare[0]?.PGCharge,
        };
      }

      const yatri = {
        Title: element.genderType,
        FirstName: element?.firstName,
        LastName: element?.lastName,
        PaxType:
          element?.type === "Adult" ? 1 : element?.type === "Child" ? 2 : 3,
        DateOfBirth: element?.dob
          ? moment(element.dob).format("YYYY-MM-DDTHH:MM:SS")
          : null,
        Gender: titles.includes("Mr") || titles.includes("Mrs") ? 1 : 2,
        AddressLine1: primaryContact?.address,
        AddressLine2: "",
        City: primaryContact?.city,
        CountryCode: "IN",
        CountryName: "India",
        ContactNo: primaryContact?.phoneNumber,
        Email: primaryContact?.email,
        IsLeadPax: leadPax,
        FFAirline: "",
        FFNumber: "",
        Nationality: "IN",
        Fare: Fare,
        SeatDynamic: Seat,
        PassportNo: "",
        PassportExpiry: null,
        PassportIssueDate: null,
      };
      if (element?.type !== "Infant") {
        yatri.PassportNo = element.PassportNo;
        yatri.PassportExpiry = element.PassportExpiry
          ? moment(element.PassportExpiry).format("YYYY-MM-DDTHH:MM:SS")
          : null;
        yatri.PassportIssueDate = element.PassportIssueDate
          ? moment(element.PassportIssueDate).format("YYYY-MM-DDTHH:MM:SS")
          : null;
      }

      Passengers.push(yatri);
      if (leadPax) {
        if (element?.type === "Adult") {
          leadPax = false;
        }
      }
    });

    const data = {
      userId: customerData?._id,
      PreferredCurrency: "INR",
      IsBaseCurrencyRequired: "true",
      EndUserIp: ip,
      TokenId: tokenResponse?.data?.TokenId,
      TraceId: flightListData?.TraceId,
      ResultIndex1: flightData?.Results?.ResultIndex,
      Passengers1: Passengers,
      ResultIndex2: "",
      Passengers2: "",
      type: 1,
      isLLC1: flightData?.Results?.IsLCC,
      isLLC2: false,
    };

    if (returnFlightData) {
      const returnPassengers = [];
      const AdultFare = returnFlightData?.Results?.FareBreakdown.filter(
        (item) => item?.PassengerType === 1
      );
      const ChildFare = returnFlightData?.Results?.FareBreakdown.filter(
        (item) => item?.PassengerType === 2
      );
      const InFantsFare = returnFlightData?.Results?.FareBreakdown.filter(
        (item) => item?.PassengerType === 3
      );
      let leadPax = true;

      passenger.forEach((element) => {
        let Fare = null;

        if (element?.type == "Adult") {
          Fare = {
            BaseFare: AdultFare[0]?.BaseFare / totalAdults,
            Tax: AdultFare[0]?.Tax / totalAdults,
            YQTax: AdultFare[0]?.YQTax,
            AdditionalTxnFeeOfrd: AdultFare[0]?.AdditionalTxnFeeOfrd,
            AdditionalTxnFeePub: AdultFare[0]?.AdditionalTxnFeePub,
            PGCharge: AdultFare[0]?.PGCharge,
          };
        } else if (element?.type === "Child") {
          Fare = {
            BaseFare: ChildFare[0]?.BaseFare / totalChild,
            Tax: ChildFare[0]?.Tax / totalChild,
            YQTax: ChildFare[0]?.YQTax,
            AdditionalTxnFeeOfrd: ChildFare[0]?.AdditionalTxnFeeOfrd,
            AdditionalTxnFeePub: ChildFare[0]?.AdditionalTxnFeePub,
            PGCharge: ChildFare[0]?.PGCharge,
          };
        } else {
          Fare = {
            BaseFare: InFantsFare[0]?.BaseFare / totalInfant,
            Tax: InFantsFare[0]?.Tax / totalInfant,
            YQTax: InFantsFare[0]?.YQTax,
            AdditionalTxnFeeOfrd: InFantsFare[0]?.AdditionalTxnFeeOfrd,
            AdditionalTxnFeePub: InFantsFare[0]?.AdditionalTxnFeePub,
            PGCharge: InFantsFare[0]?.PGCharge,
          };
        }

        const yatri = {
          Title: element.genderType,
          FirstName: element?.firstName,
          LastName: element?.lastName,
          PaxType:
            element?.type === "Adult" ? 1 : element?.type === "Child" ? 2 : 3,
          DateOfBirth: moment(element.dob).format("YYYY-MM-DDTHH:MM:SS"),
          Gender: titles.includes("Mr") || titles.includes("Mrs") ? 1 : 2,
          AddressLine1: primaryContact?.address,
          AddressLine2: "",
          City: primaryContact?.city,
          CountryCode: "IN",
          CountryName: "India",
          ContactNo: primaryContact?.phoneNumber,
          Email: primaryContact?.email,
          IsLeadPax: leadPax,
          FFAirline: "",
          FFNumber: "",
          Nationality: "IN",
          Fare: Fare,
          PassportNo: "",
          PassportExpiry: null,
          PassportIssueDate: null,
          // IsPassportRequiredAtBook: returnFlightData?.Results?.IsPassportRequiredAtBook,
          // IsPassportRequiredAtTicket: returnFlightData?.Results?.IsPassportRequiredAtTicket,
          // IsPassportFullDetailRequiredAtBook: returnFlightData?.Results?.IsPassportFullDetailRequiredAtBook
        };

        if (element?.type !== "Infant") {
          yatri.PassportNo = element.PassportNo;
          yatri.PassportExpiry = element.PassportExpiry
            ? moment(element.PassportExpiry).format("YYYY-MM-DDTHH:MM:SS")
            : null;
          yatri.PassportIssueDate = element.PassportIssueDate
            ? moment(element.PassportIssueDate).format("YYYY-MM-DDTHH:MM:SS")
            : null;
        }

        returnPassengers.push(yatri);

        if (leadPax) {
          if (element?.type === "Adult") {
            leadPax = false;
          }
        }
      });

      data.Passengers2 = returnPassengers;
      data.ResultIndex2 = returnFlightData?.Results?.ResultIndex;
      data.type = 2;
      data.isLLC2 = returnFlightData?.Results?.IsLCC;
    }

    let amount = 0;

    if (flightData) {
      amount +=
        flightData?.Results?.Fare?.BaseFare + flightData?.Results?.Fare?.Tax;
    }
    if (returnFlightData) {
      amount +=
        returnFlightData?.Results?.Fare?.BaseFare +
        returnFlightData?.Results?.Fare?.Tax;
    }

    console.log("requestData", JSON.stringify(data));

    const razorpayResponse = yield razorpayPayment({
      amount,
      name: customerData?.name,
      email: customerData?.email,
      contact: customerData?.phone,
    });

    if (razorpayResponse?.razorpay_payment_id) {
      yield put({
        type: actionTypes.SET_REQUESTING_TICKET_VISIBLE,
        payload: true,
      });
      const response = yield postRequest({
        url: app_api_url + book_flight,
        data,
      });
      console.log(JSON.stringify(response));
      if (response?.status) {
        resetToScreen("flightDetails", {
          flightData: { _id: response?.data?._id, type: response?.data?.type },
        });
      }
    }

    yield put({
      type: actionTypes.SET_REQUESTING_TICKET_VISIBLE,
      payload: false,
    });
    // console.log("bookResponse", JSON.stringify(response));
    // if (response?.status) {
    //     const razorpayResponse = yield razorpayPayment({
    //         amount: 100,
    //         name: "Ranjeet",
    //         email: "ksonpay@gmail.com",
    //         contact: "9860116872",
    //     });
    //     if (razorpayResponse) {
    //         yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    //         const dataTicket = {
    //             type: 1,
    //             PNR1: response?.data?.bookResponse?.Response?.Response?.PNR,
    //             BookingId1: response?.data?.bookResponse?.Response?.Response?.BookingId,
    //             PNR2: null,
    //             BookingId2: null,
    //             TraceId: response?.data?.bookResponse?.Response?.TraceId,
    //             EndUserIp: ip,
    //         };

    //         console.log(response?.data?.retunrnBookResponse)

    //         if (!!response?.data?.retunrnBookResponse) {
    //             dataTicket.type = 2
    //             dataTicket.PNR2 = response?.data?.retunrnBookResponse?.Response?.Response?.PNR;
    //             dataTicket.BookingId2 = response?.data?.retunrnBookResponse?.Response?.Response?.BookingId;
    //         }

    //         console.log('ticket payload', JSON.stringify(dataTicket));

    //         const ticketResponse = yield postRequest({
    //             url: app_api_url + ticket_flight,
    //             data: dataTicket,
    //         });

    //         console.log("ticketResponse", JSON.stringify(ticketResponse));

    //         yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    //         yield put({ type: actionTypes.SET_RETURN_FLIGHT_DATA, payload: null });
    //         yield put({ type: actionTypes.SET_FLIGHT_DATA, payload: null });
    //         resetToScreen("flightPayment");
    //     }
    // }
  } catch (e) {
    console.log(e, "error");
    yield put({
      type: actionTypes.SET_REQUESTING_TICKET_VISIBLE,
      payload: false,
    });
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getBookedFlight(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const customerData = yield select(
      (state) => state.registrationReducer.customerdata
    );
    const ip = yield fetchAndStoreIPv4Address();
    const response = yield postRequest({
      url: app_api_url + get_booked_flight,
      data: {
        userId: customerData?._id,
      },
    });

    if (response?.status) {
      yield put({
        type: actionTypes.SET_BOOKED_FLIGHT,
        payload: response?.data,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, "error");
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getBookedFlightDetails(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const ip = yield fetchAndStoreIPv4Address();
    const response = yield postRequest({
      url: app_api_url + get_flight_details,
      data: {
        EndUserIp: ip,
        bookingId: payload,
      },
    });

    if (response?.status) {
      yield put({
        type: actionTypes.SET_FLIGHT_BOOKING_DETAILS,
        payload: response?.data,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, "error");
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getCyrusFlightListData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });


    const response = yield axios({
      method: 'post',
      url: 'https://apitest.cyrusrecharge.in/cy_api/cy_flight.aspx',
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': 'A745D44D-90AA-4FAA-8E6D-7E0F666E387D'
      }
    });

    yield put({
      type: actionTypes.SET_CYRUS_FLIGHT_LIST_DATA,
      payload: response?.data,
    });
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    yield call(navigate, "allflights", { searchData: response?.data });

  } catch (error) {
    console.error('Error searching flights:', error);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    showToastMessage({ message: 'Error fetching flights, please try again.' });
  }
}

function* getFareruleData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    console.log("farerule:", payload);


    const response = yield axios({
      method: 'post',
      url: 'https://apitest.cyrusrecharge.in/cy_api/cy_flight.aspx',
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': 'A745D44D-90AA-4FAA-8E6D-7E0F666E387D'
      }
    });

    console.log(response?.data, "fare rule data");
    yield put({
      type: actionTypes.SET_FARERULE_DATA,
      payload: response?.data,
    });
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    yield call(navigate, "farerule", { fareRuleData: response?.data });

  } catch (error) {
    console.error('Error searching flights:', error);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    showToastMessage({ message: 'Error' });
  }
}

function* getRepriceData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    console.log("REPRICE:", payload);


    const response = yield axios({
      method: 'post',
      url: 'https://apitest.cyrusrecharge.in/cy_api/cy_flight.aspx',
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': 'A745D44D-90AA-4FAA-8E6D-7E0F666E387D'
      }
    });
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", response)
    yield put({
      type: actionTypes.SET_REPRICE_DATA,
      payload: response?.data,
    });
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

  } catch (error) {
    console.error('Error', error);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    showToastMessage({ message: 'Error' });
  }
}

function* getSeatmapData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    console.log("Seatmap:", payload);


    const response = yield axios({
      method: 'post',
      url: 'https://apitest.cyrusrecharge.in/cy_api/cy_flight.aspx',
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': 'A745D44D-90AA-4FAA-8E6D-7E0F666E387D'
      }
    });
    console.log(response, "response")
    yield put({
      type: actionTypes.SET_SEATMAP_DATA,
      payload: response,
    });
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    yield call(navigate, "selectseat",);
  } catch (error) {
    console.error('Error', error);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    showToastMessage({ message: 'Error' });
  }
}
function* getSsrData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield axios({
      method: 'post',
      url: 'https://apitest.cyrusrecharge.in/cy_api/cy_flight.aspx',
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': 'A745D44D-90AA-4FAA-8E6D-7E0F666E387D'
      }
    });
    console.log("response>>>>>>>>>>>>>>>>>>>>>>>>>>>", response)
    yield put({
      type: actionTypes.SET_SSR_DATA,
      payload: response?.data,
    });
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    yield call(navigate, "ssrdetails",);
  } catch (error) {
    console.error('Error', error);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    showToastMessage({ message: 'Error' });
  }
}
function* getFlightBookingData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    // console.log("flightbooking:", payload);


    const response = yield axios({
      method: 'post',
      url: 'https://apitest.cyrusrecharge.in/cy_api/cy_flight.aspx',
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': 'A745D44D-90AA-4FAA-8E6D-7E0F666E387D'
      }
    });
    // console.log(response?.data, "flight booking response")
    yield put({
      type: actionTypes.SET_FLIGHT_BOOKING_DATA,
      payload:response?.data,
    });
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    // yield call(navigate, "selectseat",);
  } catch (error) {
    console.error('Error', error);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    showToastMessage({ message: 'Error' });
  }
}
function* getAirReprintData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield axios({
      method: 'post',
      url: 'https://apitest.cyrusrecharge.in/cy_api/cy_flight.aspx',
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': 'A745D44D-90AA-4FAA-8E6D-7E0F666E387D'
      }
    });
    console.log(">>>>>>>>>>>>>>>>reprint data",response?.data)
    yield put({
      type: actionTypes.SET_REPRINT_DATA,
      payload:response?.data,
    });
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (error) {
    console.error('Error', error);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    showToastMessage({ message: 'Error' });
  }
}
export default function* flightSaga() {
  yield takeLatest(actionTypes.GET_AIRPOT_CITEST, getairpotcities);
  yield takeLatest(actionTypes.GET_REPRICE_DATA, getRepriceData);
  yield takeLatest(actionTypes.GET_SEATMAP_DATA, getSeatmapData);
  yield takeLatest(actionTypes.GET_FLIGHT_BOOKING_DATA, getFlightBookingData);
  yield takeLatest(actionTypes.GET_REPRINT_DATA, getAirReprintData);
  yield takeLatest(actionTypes.GET_SSR_DATA, getSsrData);
  yield takeLatest(actionTypes.GET_FLIGHT_LIST_DATA, getFlightListData);
  yield takeLatest(actionTypes.GET_CYRUS_FLIGHT_LIST_DATA, getCyrusFlightListData);
  yield takeLatest(actionTypes.GET_FARERULE_DATA, getFareruleData);
  yield takeLatest(actionTypes.GET_FLIGHT_DATA, getFlightData);
  yield takeLatest(actionTypes.GET_RETURN_FLIGHT_DATA, getFlightAndReturnData);
  yield takeLatest(actionTypes.BOOK_FLIGHT, bookFlight);
  yield takeLatest(actionTypes.GET_BOOKED_FLIGHT, getBookedFlight);
  yield takeLatest(actionTypes.GET_FLIGHT_BOOKING_DETAILS,getBookedFlightDetails);
}
