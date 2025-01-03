    import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
    import React, { useRef, useState, useEffect } from 'react';
    import { useNavigation, useRoute } from '@react-navigation/native';
    import { Colors, Sizes, Fonts, SCREEN_WIDTH } from "../../../../../assests/style";
    import { useSelector } from 'react-redux';
    import SeatIcon from '../../../../../svgicons/SeatIcon';
    import OrangeSeatIcon from '../../../../../svgicons/OrangeSeatIcon';
    import { connect } from "react-redux";
    import * as FlightActions from "../../../../../redux/actions/FlightActions";
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import RBSheet from 'react-native-raw-bottom-sheet';
    import Entypo from 'react-native-vector-icons/Entypo';
    import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
    import {
        responsiveScreenHeight,
        responsiveScreenWidth,
        responsiveScreenFontSize
    } from "react-native-responsive-dimensions";
    const CyrusSeatSelect = ({ dispatch }) => {
        const refRBSheet = useRef();
        const navigation = useNavigation();
        const seatmapData = useSelector(state => state.flightReducer.seatmapData);
        const seatData = seatmapData?.data?.data?.AirSeatMaps[0]?.Seat_Segments[0]?.Seat_Row;
        const newSearchKey = useSelector(state => state.flightReducer.cyrusFlightListData);
        const newFlightKey = useSelector(state => state.flightReducer.repriceData);
        const flightKey = newFlightKey?.data[0]?.Flight?.Flight_Key
        const searchKey = newSearchKey?.Search_Key
        // console.log(newFlightKey?.data[0]?.Flight?.Flight_Key, "=============")
        // console.log(newSearchKey?.Search_Key, "-----")

        // Get SSR Detaisl
        const getSssrDetails = () => {
            const requestData = {
                methodname: "Air_GetSSR",
                opid: "569",
                txnid: "6380023470328828221",
                requestdata: {
                    Search_Key: searchKey,
                    AirSSRRequestDetails: [
                        {
                            Flight_Key: flightKey
                        }
                    ]
                }
            };
            dispatch(FlightActions.getSsrData(requestData));

        };

        //Get Booking No.

        const airReprintData = useSelector(state => state.flightReducer.flightBookingData);
    console.log("air reprint data----------------------", airReprintData)

        const bookFlight = async () => {
            try {

                const fareId = await AsyncStorage.getItem('fareid')
                const bookingRequestJson = await AsyncStorage.getItem('Booking_Request_Json')
                const parseBookingRequest = JSON.parse(bookingRequestJson);
                const paxDetails = await AsyncStorage.getItem('Pax_details')
                const parsePaxDetails = JSON.parse(paxDetails);
                const passengerDetails = await AsyncStorage.getItem('passengerdata')
                const parsePassengerDetails = JSON.parse(passengerDetails);
                console.log(">>>>>>>>>>>>>>>>>", parsePassengerDetails)
                const requestData = {
                    "methodname": "Air_TempBooking",
                    "opid": "570",
                    "txnid": "638024714893102751",
                    "requestdata": {
                        "Customer_Mobile": parsePassengerDetails?.phone,
                        "Passenger_Mobile": parsePassengerDetails?.phone,
                        "WhatsAPP_Mobile": parsePassengerDetails?.phone,
                        "Passenger_Email": parsePassengerDetails?.email,
                        "PAX_Details": parsePaxDetails?.requestdata?.PAX_Details,
                        "Fare_Id": fareId,
                        "GST": false,
                        "GST_Number": null,
                        "GST_HolderName": null,
                        "GST_Address": null,
                        "BookingFlightDetails": [
                            {
                                "Search_Key": searchKey,
                                "Flight_Key": flightKey,
                                "BookingSSRDetails": null
                            }
                        ],
                        "BookingRemark": null,
                        "Booking_Request_Json": parseBookingRequest
                    }
                }
                dispatch(FlightActions.getFlightBookingData(requestData))

            } catch (error) {
                console.error("Error fetching data from AsyncStorage:", error);
            }
        }


        //Get Reprint
        const airReprint = () => {
            try {
                const requestData = {
                    methodname: "Air_Reprint",
                    opid: "573",
                    txnid: "638133592690049375",
                    requestdata: {
                        Booking_RefNo: airReprintData?.Booking_RefNo,
                        Airline_PNR: ""
                    }
                }
                dispatch(FlightActions.getAirReprintData(requestData))
                refRBSheet.current.open();
            } catch (e) {
                console.log(e)
            }
        }
        useEffect(() => {
            const handleBookingAndReprint = async () => {
                await bookFlight();

            };

            handleBookingAndReprint();
        }, []);
        const airReprinShowtData = useSelector(state => state.flightReducer.reprintData);
        // console.log("air reprint data>>>>>>>>>>>>>>", airReprinShowtData)

        const airfare = airReprinShowtData?.data?.AirPNRDetails?.[0]?.Flights?.[0]?.Fares?.[0]?.FareDetails?.[0]?.Basic_Amount || 0;
        const convenienceFee = airReprinShowtData?.data?.AirPNRDetails?.[0]?.Flights?.[0]?.Fares?.[0]?.FareDetails?.[0]?.AirportTax_Amount || 0;
        const totalAmout = airfare + convenienceFee;
        
        const duration = airReprinShowtData?.data?.AirPNRDetails?.[0]?.Flights?.[0]?.Segments?.[0]?.Duration || "N/A";
        const origin = airReprinShowtData?.data?.AirPNRDetails?.[0]?.Flights?.[0]?.Segments?.[0]?.Origin || "Unknown";
        const destination = airReprinShowtData?.data?.AirPNRDetails?.[0]?.Flights?.[0]?.Segments?.[0]?.Destination || "Unknown";
        const flight = airReprinShowtData?.data?.AirPNRDetails?.[0]?.Flights?.[0]?.Segments?.[0]?.Airline_Name || "Unknown Airline";
        
        const departureTime = airReprinShowtData?.data?.AirPNRDetails?.[0]?.Flights?.[0]?.Segments?.[0]?.Departure_DateTime
            ?.split(" ")[1]?.split(":")?.slice(0, 2).join(":") || "Unknown";
        const arrivalTime = airReprinShowtData?.data?.AirPNRDetails?.[0]?.Flights?.[0]?.Segments?.[0]?.Arrival_DateTime
            ?.split(" ")[1]?.split(":")?.slice(0, 2).join(":") || "Unknown";
        
        const businessClass = airReprinShowtData?.data?.Class_of_Travel || "Unknown";
        
        const getClassName = (businessClass) => {
            switch (businessClass) {
                case 0:
                    return "Economy";
                case 1:
                    return "Business";
                case 2:
                    return "Economy";
                case 3:
                    return "Premium Economy";
                default:
                    return "Unknown Class";
            }
        };
        return (
            <View style={styles.container}>
                <View style={styles.mainView}>
                    <View>
                        <Image source={require('../../../../../assests/images/seat-map.png')} style={styles.seatbBanner} />
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>

                        {seatData?.map((item) => {
                            return (
                                <>
                                    <View style={styles.rowView}>
                                        {item?.Seat_Details?.map((subitem) => {
                                            return (
                                                <View style={styles.seatView}>
                                                    {subitem?.SSR_TypeName ? (
                                                        <>
                                                            <TouchableOpacity onPress={() => {
                                                                Alert.alert(subitem?.SSR_TypeName)
                                                            }}>
                                                                <SeatIcon />
                                                            </TouchableOpacity>
                                                        </>
                                                    ) : (

                                                        <View></View>
                                                    )}
                                                    <Text style={styles.seatText}> {subitem?.SSR_TypeName}</Text>
                                                </View>
                                            )
                                        })}

                                    </View>
                                </>
                            )
                        })}
                    </ScrollView>
                </View>
                <View style={styles.bottomView}>
                    <View>
                        <TouchableOpacity style={styles.continueBtn} accessibilityLabel="Continue to booking" accessible
                            onPress={() => {
                                getSssrDetails();
                            }}
                        >
                            <Text style={styles.btnText}>Add Meals</Text>
                        </TouchableOpacity>


                    </View>
                    <View>
                        <TouchableOpacity style={styles.continueBtn} accessibilityLabel="Continue to booking" accessible
                            onPress={() => {

                                airReprint();
                            }}
                        >
                            <Text style={styles.btnText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <RBSheet
                    ref={refRBSheet}
                    useNativeDriver={false}
                    customStyles={{
                        wrapper: {
                            backgroundColor: 'transparent',
                        },
                        container: {
                            height: 500,

                        },
                        draggableIcon: {
                            backgroundColor: '#000',

                        },
                    }}
                    customModalProps={{
                        animationType: 'slide',
                        statusBarTranslucent: true,
                    }}
                    customAvoidingViewProps={{
                        enabled: false,
                    }}>

                    <View style={styles.paymentView}>
                        <View style={{ flex: 0.85 }}>
                            <ScrollView>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                                    <Text style={styles.reviewText}>Review Your Trip Details</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            refRBSheet.current.close();
                                        }}
                                    >
                                        <Entypo name="circle-with-cross" size={20} color="#EA7515" />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.paymentSecondView}>
                                    <View style={styles.fareView}>
                                        <Text style={styles.fareText}>Air Fare</Text>
                                        <Text style={styles.farePrice}>₹{airfare}</Text>
                                    </View>
                                    <View style={styles.fareView}>
                                        <Text style={styles.fareText}>Convenience Fee</Text>
                                        <Text style={styles.farePrice}>₹{convenienceFee}</Text>
                                    </View>
                                    <View style={{
                                        marginTop: 5,
                                        borderBottomWidth: 0.6,
                                        borderBottomColor: "#EA7515",
                                        marginBottom: 6,
                                    }}></View>
                                    <View style={styles.fareView}>
                                        <Text style={[styles.fareText, { fontWeight: "700" }]}>Grand Total</Text>
                                        <Text style={[styles.farePrice, { fontWeight: "700" }]}>
                                            ₹{totalAmout}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.paymentSecondView}>
                                    <Text style={[styles.flightDetailsText, { fontWeight: "700" }]}>{airReprinShowtData?.data?.AirPNRDetails[0]?.PAXTicketDetails[0]?.First_Name} {airReprinShowtData?.data?.AirPNRDetails[0]?.PAXTicketDetails[0]?.Last_Name}</Text>
                                    {/* <Text style={styles.flightDetailsText}>Onward: Sat, 11 Jan</Text> */}
                                    <Text style={[styles.flightDetailsText, { fontWeight: "700" }]}>
                                        {origin}   <FontAwesome5 name="plane-departure" size={12} color="#EA7515" />   {destination}</Text>
                                    <Text style={styles.flightDetailsText}>{departureTime} Pm -- {arrivalTime} Pm</Text>
                                    <Text style={styles.flightDetailsText}><FontAwesome5 name="plane" size={12} color="#EA7515" />  {flight}</Text>
                                    <Text style={styles.flightDetailsText}><FontAwesome5 name="address-card" size={12} color="#EA7515" />  {getClassName(businessClass)} Class</Text>
                                    <Text style={styles.flightDetailsText}><FontAwesome5 name="clock" size={12} color="#EA7515" />  {duration}</Text>
                                </View>

                            </ScrollView>
                        </View>
                        <View style={{ flex: 0.15 }}>
                            <TouchableOpacity style={styles.continueBtn}>
                                <Text style={[styles.btnText, { fontSize: 12 }]}>Proceed To Pay
                                    ₹{totalAmout}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </RBSheet>
            </View>
        )
    }


    const mapDispatchToProps = dispatch => ({ dispatch });

    export default connect(mapDispatchToProps)(CyrusSeatSelect);

    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#fff",
            flex: 1,
        },
        mainView: {
            flex: 1,
            padding: 15,
        },
        bottomView: {
            flexDirection: "row",
            justifyContent: "space-between",
            borderTopWidth: 0.3,
            padding: 10,
            borderColor: "#4d4f5c",
            alignItems: "center",
        },
        nonPrice: {
            fontSize: 9,
        },
        Price: {
            fontSize: 15,
            fontWeight: "600",
            color: "#000",
        },
        continueBtn: {
            backgroundColor: '#EA7515',
            paddingHorizontal: 30,
            borderRadius: 5,
            paddingVertical: 12,
        },
        btnText: {
            color: "#fff",
            fontSize: 15,
            textAlign: 'center',
            fontWeight: "600",
        },
        seatbBanner: {
            width: "100%",
            resizeMode: "cover",
            height: 100,

        },
        rowView: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
        },
        subView: {
            display: "flex",
            flexDirection: "row",
            gap: 5,
        },
        seatView: {
            display: "flex",
            flexDirection: "column"
        },
        seatText: {
            fontSize: 6,
            color: "#000",
            textAlign: "center"
        },
        paymentView: {
            padding: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            backgroundColor: "#f7f7f7",
            borderRadius: 20,
        },
        reviewText: {
            ...Fonts._14MontserratRegular,
            fontSize: responsiveScreenFontSize(3),
            fontWeight: "800",
        },
        paymentSecondView: {
            width: "100%",
            backgroundColor: "#fff",
            marginTop: 10,
            borderRadius: 10,
            padding: 10,
        },
        fareView: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 5,
        },
        fareText: {
            ...Fonts._12MontserratRegular,
            color: "#000",
        },
        farePrice: {
            ...Fonts._12MontserratRegular,
            color: "#000",
        },
        flightDetailsText: {
            ...Fonts._12MontserratRegular,
            color: "#000",
            marginBottom: 5,
        }
    })