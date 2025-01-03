import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import CitySearch from './CitySearch';
import DepartureDate from './DepartureDate';
import AdultChildrenInfant from './AdultChildrenInfant';
import FlightClass from './FlightClass';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { showToastMessage } from '../../../../../utils/services';
import Loader2 from '../../../../../components/Loader2';
import { Colors, Sizes, Fonts, SCREEN_WIDTH } from "../../../../../assests/style";
import ReturnDate from './ReturnDate';
import * as FlightActions from "../../../../../redux/actions/FlightActions";
import { connect } from "react-redux";
import Button from '../../../../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cyrus = ({ dispatch }) => {
    const navigation = useNavigation();
    const [selectedFromCity, setSelectedFromCity] = useState();
    const [selectedToCity, setSelectedToCity] = useState();
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isRoundTrip, setIsRoundTrip] = useState(false);
    const formattedDepartureDate = departureDate
        ? `${(departureDate.getMonth() + 1).toString().padStart(2, '0')}/${departureDate.getDate().toString().padStart(2, '0')}/${departureDate.getFullYear()}`
        : null;
    const formattedReturnDate = returnDate
        ? `${(returnDate.getMonth() + 1).toString().padStart(2, '0')}/${returnDate.getDate().toString().padStart(2, '0')}/${returnDate.getFullYear()}`
        : null;
     
    const searchFlight = async () => {
     const flightSearchData = {
            "Travel_Type": 0,
            TripInfo: [
                {
                    Origin: selectedFromCity,
                    Destination: selectedToCity,
                    TravelDate: formattedDepartureDate,
                    Trip_Id: "0"
                },
                ...(isRoundTrip ? [{
                    Origin: selectedToCity,
                    Destination: selectedFromCity,
                    TravelDate: formattedReturnDate,
                    Trip_Id: "0"
                }] : []),
            ],
            Booking_Type: isRoundTrip ? "1" : "0",
            Adult_Count: adults,
            Child_Count: children,
            Infant_Count: infants,
            Class_Of_Travel: selectedClassId,
            InventoryType: "0",
            AIRLINE_CODE: "",
            Trip_Id: null,
        }
        const requestBody = {
            methodname: "FLIGHTSEARCH",
            opid: "559",
            txnid: "638002211934374672",
            requestdata: {
                Travel_Type: "0",
                TripInfo: [
                    {
                        Origin: selectedFromCity,
                        Destination: selectedToCity,
                        TravelDate: formattedDepartureDate,
                        Trip_Id: "0"
                    },
                    ...(isRoundTrip ? [{
                        Origin: selectedToCity,
                        Destination: selectedFromCity,
                        TravelDate: formattedReturnDate,
                        Trip_Id: "0"
                    }] : []),
                ],
                Booking_Type: isRoundTrip ? "1" : "0",
                Adult_Count: adults,
                Child_Count: children,
                Infant_Count: infants,
                Class_Of_Travel: selectedClassId,
                InventoryType: "0",
                AIRLINE_CODE: "",
                Trip_Id: null,
                Filtered_Airline: [
                    {
                        "Airline_Code": ""
                    }
                ]
            }
        };


        try {

            await AsyncStorage.setItem('Booking_Request_Json', JSON.stringify(flightSearchData));

        } catch (error) {

        }
        dispatch(FlightActions.getCyrusFlightListData(requestBody));
    };

    return (
        <View style={styles.container}>
            {loading && <Loader2 />}
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        !isRoundTrip && styles.activeToggleButton
                    ]}
                    onPress={() => setIsRoundTrip(false)}
                >
                    <Text style={!isRoundTrip ? styles.activeToggleText : styles.toggleText}>One Way</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        isRoundTrip && styles.activeToggleButton
                    ]}
                    onPress={() => setIsRoundTrip(true)}
                >
                    <Text style={isRoundTrip ? styles.activeToggleText : styles.toggleText}>Round Trip</Text>
                </TouchableOpacity>
            </View>

            <CitySearch setSelectedFromCity={setSelectedFromCity} setSelectedToCity={setSelectedToCity} />
            <DepartureDate departureDate={departureDate} setDepartureDate={setDepartureDate} />

            {/* Conditionally render ReturnDate */}
            {isRoundTrip && (
                <ReturnDate departureDate={departureDate} returnDate={returnDate} setReturnDate={setReturnDate} />
            )}

            <AdultChildrenInfant setAdults={setAdults} setChildren={setChildren} setInfants={setInfants} />
            <FlightClass setSelectedClassId={setSelectedClassId} />


            <View style={{ marginTop: Sizes.fixPadding }}>
                <Button title={'Search'} onPress={() => {
                    if (!selectedFromCity) {
                        showToastMessage({ message: 'Please enter origin' });
                    } else if (!selectedToCity) {
                        showToastMessage({ message: 'Please enter destination' });
                    } else if (!departureDate) {
                        showToastMessage({ message: 'Please select date' });
                    } else if (!adults) {
                        showToastMessage({ message: 'Please select adult' });
                    } else if (selectedClassId === null || selectedClassId === undefined) {
                        showToastMessage({ message: 'Please select class' });
                    } else {
                        searchFlight();
                    }
                }} />
            </View>
        </View>
    );
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapDispatchToProps)(Cyrus);

const styles = StyleSheet.create({
    container: {},
    toggleContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        padding: Sizes.fixHorizontalPadding * 0.4,
        borderRadius: 5,
    },
    toggleButton: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixHorizontalPadding,
        borderRadius: 5,
        backgroundColor: Colors.white,
    },
    activeToggleButton: {
        backgroundColor: '#FBBC04',
    },
    toggleText: {
        ...Fonts._16MontserratRegular,
    },
    activeToggleText: {
        ...Fonts._16MontserratRegular,
    },
    searchBtn: {
        backgroundColor: "#EA7515",
        padding: 10,
        borderRadius: 7,
        marginTop: 20,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
});
