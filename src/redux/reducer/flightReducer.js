import * as actionTypes from '../actionTypes'

const initialState = {
    flightApiType: 'CYRUS',
    airpotCities: null,
    repriceData:null,
    seatmapData:null,
    ssrData:null,
    reprintData:null,
    flightBookingData:null,
    ssrDetailsData:null,
    airpotCryusCities: null,
    departureFrom: null,
    departureTo: null,
    flightListData: null,
    cyrusFlightListData:null,
    fareruleData:null,
    flightData: null,
    returnFlightData: null,
    internationlReturnFlightData: null,
    passengers: [],
    primaryContact: {
        phoneNumber: '',
        email: '',
        city: '',
        address: ''
    },
    flightRules: null,
    selectedFlight: null,
    selectedReturnFlight: null,
    requestingTicketVisible: false,
    flightsDateData: null,
    bookedFlights: null,
    bookedFlightDetailsData: null,
    activeSsrTab: 'seats',
    flightSsrData: null,
    returnFlightSsrData: null,
    selectedSsrData: {
        flight: {
            selectedSeat: null,
            selectedData: null
        },
        person: {
            selectedPersion: null,
            selectedData: null
        },
        baggage: {
            selectedBaggage: null,
            selectedData: null
        }
    }
}

const flightReducer = (state = initialState, actions) => {
    const { payload, type } = actions

    switch (type) {
        case actionTypes.SET_FLIGHT_API_TYPE: {
            return {
                ...state,
                flightApiType: payload
            }
        }
        case actionTypes.SET_AIRPOT_CITEST: {
            return {
                ...state,
                airpotCities: payload
            }
        }
        case actionTypes.SET_FLIGHT_LIST_DATA: {
            return {
                ...state,
                flightListData: payload
            }
        }
        case actionTypes.SET_FLIGHT_DATA: {
            return {
                ...state,
                flightData: payload
            }
        }

        case actionTypes.SET_RETURN_FLIGHT_DATA: {
            return {
                ...state,
                returnFlightData: payload
            }
        }

        case actionTypes.SET_INTERNATIONAL_RETURN_FLIGHTS: {
            return {
                ...state,
                internationlReturnFlightData: payload
            }
        }

        case actionTypes.SET_DEPARTURE_FROM: {
            return {
                ...state,
                departureFrom: payload
            }
        }

        case actionTypes.SET_DEPARTURE_TO: {
            return {
                ...state,
                departureTo: payload
            }
        }
        case actionTypes.SET_FLIGHT_CONTACT_DETAILS: {
            return {
                ...state,
                primaryContact: payload
            }
        }
        case actionTypes.SET_FLIGHT_PASSENGER: {
            return {
                ...state,
                passengers: payload
            }
        }
        case actionTypes.SET_SELECTED_FLIGHT: {
            return {
                ...state,
                selectedFlight: payload
            }
        }
        case actionTypes.SET_SELECTED_RETURN_FLIGHT: {
            return {
                ...state,
                selectedReturnFlight: payload
            }
        }
        case actionTypes.SET_FLIGHT_FARE_RULES: {
            return {
                ...state,
                flightRules: payload
            }
        }
        case actionTypes.SET_REQUESTING_TICKET_VISIBLE: {
            return {
                ...state,
                requestingTicketVisible: payload
            }
        }
        case actionTypes.SET_FLIGHTS_DATE_DATA: {
            return {
                ...state,
                flightsDateData: payload
            }
        }
        case actionTypes.SET_BOOKED_FLIGHT: {
            return {
                ...state,
                bookedFlights: payload
            }
        }

        case actionTypes.SET_FLIGHT_BOOKING_DETAILS: {
            return {
                ...state,
                bookedFlightDetailsData: payload
            }
        }
        case actionTypes.SET_ACTIVE_SSR_TAB: {
            return {
                ...state,
                activeSsrTab: payload
            }
        }

        case actionTypes.SET_FLIGHT_SSR_DATA: {
            return {
                ...state,
                flightSsrData: payload
            }
        }

        case actionTypes.SET_RETURN_FLIGHT_SSR_DATA: {
            return {
                ...state,
                returnFlightSsrData: payload
            }
        }

        case actionTypes.SET_FLIGHT_SSR_SELECTED_DATA: {
            return {
                ...state,
                selectedSsrData: payload
            }
        }
        case actionTypes.SET_CYRUS_FLIGHT_LIST_DATA: {
            return {
                ...state,
                cyrusFlightListData: payload,
            }
        }
        case actionTypes.SET_FARERULE_DATA: {
            return {
                ...state,
                fareruleData: payload,
            }
        }
        case actionTypes.SET_REPRICE_DATA: {
            return {
                ...state,
                repriceData: payload,
            }
        }
        case actionTypes.SET_SEATMAP_DATA: {
            return {
                ...state,
                seatmapData: payload,
            }
        }
        case actionTypes.SET_SSR_DATA: {
            return {
                ...state,
                ssrData: payload,
            }
        }
        case actionTypes.SET_FLIGHT_BOOKING_DATA: {
            return {
                ...state,
                flightBookingData: payload,
            }
        }
        case actionTypes.SET_REPRINT_DATA: {
            return {
                ...state,
               reprintData: payload,
            }
        }
        default: {
            return state
        }
    }
}

export default flightReducer