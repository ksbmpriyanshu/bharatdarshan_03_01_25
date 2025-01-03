import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Colors, Sizes, Fonts, SCREEN_WIDTH } from "../../../../../assests/style";
import {
    responsiveScreenHeight,
    responsiveScreenWidth,
    responsiveScreenFontSize
} from "react-native-responsive-dimensions";
import AsyncStorage from '@react-native-async-storage/async-storage';
const AllFlights = ({ route }) => {
    const refRBSheet = useRef();
    const flightListData = useSelector(state => state.flightReducer.cyrusFlightListData);
    const navigation = useNavigation();
    const search_key = flightListData?.Search_Key
    const [selectedFlight, setSelectedFlight] = useState(null);
    useEffect(async () => {
        const bookingRequestJson = await AsyncStorage.getItem('Booking_Request_Json')
        const parseBookingRequest = JSON.parse(bookingRequestJson);
        console.log("parseBookingRequest",parseBookingRequest?.TripInfo[0])
    }, [])
    

    return (
        <View style={styles.flightMainView}>
            <Text style={styles.flightHeading}>All Flights</Text>

            <ScrollView >
                <View>
                    {flightListData?.data?.length > 1 ? (
                        <>
                            <View style={styles.returnView}>
                                <View>
                                    <Text style={styles.returnHeading}>Simple Flights</Text>
                                    {flightListData?.data[0]?.Flights?.map((flight, flightIndex) => {
                                        return (
                                            <>

                                                <TouchableOpacity
                                                    key={flightIndex}
                                                    onPress={() => {
                                                        setSelectedFlight(flight);
                                                        refRBSheet.current.open();
                                                    }}
                                                >
                                                    <View key={flightIndex} style={styles.flightRetunSubView}>
                                                        <Text style={styles.leftText}>{flight.Fares[0]?.Seats_Available} Seat left</Text>
                                                        <Text style={styles.nameText}>{flight.Segments[0]?.Airline_Name}</Text>

                                                        <Text style={styles.timeText}>
                                                            {flight.Segments[0]?.Departure_DateTime.split(' ')[1]} <Text style={styles.pmText}>PM</Text> -
                                                            {flight.Segments[0]?.Arrival_DateTime.split(' ')[1]} <Text style={styles.pmText}>PM</Text>
                                                        </Text>
                                                        <Text style={styles.nonText}>
                                                            {flight.Segments[0]?.Duration} | Non-Stop
                                                        </Text>
                                                        <Text style={[styles.priceText, { marginTop: 10, }]}>₹{flight.Fares[0]?.FareDetails[0]?.Total_Amount}</Text>
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

                                                            <ScrollView style={{ backgroundColor: "#f7f7f7", flex: 1, borderRadius: 15, padding: 10, paddingVertical: 15, }}>
                                                                <Text style={styles.flightDetails}>Flight Details</Text>
                                                                <View style={styles.detailsMainView}>
                                                                    {selectedFlight?.Segments?.map((segmentItem) => {

                                                                        return (
                                                                            <View
                                                                                style={{
                                                                                    borderBottomWidth: 0.7,
                                                                                    borderStyle: "dashed",
                                                                                    borderBottomColor: "#bababa",
                                                                                    paddingBottom: 15,
                                                                                }}
                                                                            >
                                                                                <Text style={[styles.departureText, { marginTop: 10, }]}>Departing Flight: {segmentItem?.Arrival_DateTime}</Text>
                                                                                <Text style={styles.destinationText}>{segmentItem?.Origin_City}-{segmentItem?.Destination_City}</Text>
                                                                                <Text style={[styles.departureText, { marginTop: 5, fontSize: 12 }]}>{segmentItem?.Airline_Name} {segmentItem?.Airline_Code}-{segmentItem?.Aircraft_Type}</Text>
                                                                                <View style={styles.timeView}>
                                                                                    <View>
                                                                                        <Text style={[styles.departureText, { fontSize: 14 }]}>
                                                                                            {segmentItem?.Departure_DateTime?.split(" ")[1]} PM</Text>
                                                                                        <Text style={[styles.departureText, { fontSize: 9 }]}>{segmentItem?.Origin}</Text>
                                                                                    </View>
                                                                                    <Text style={[styles.departureText, { fontSize: 9, marginVertical: 10, color: "#bababa" }]}>Duration: {segmentItem?.Duration}</Text>
                                                                                    <View>
                                                                                        <Text style={[styles.departureText, { fontSize: 14 }]}>
                                                                                            {segmentItem?.Arrival_DateTime?.split(" ")[1]} PM</Text>
                                                                                        <Text style={[styles.departureText, { fontSize: 9 }]}>{segmentItem?.Destination}</Text>

                                                                                    </View>
                                                                                </View>
                                                                            </View>
                                                                        )
                                                                    })}
                                                                </View>
                                                                <View style={{ marginTop: 15, }}>
                                                                    <Text style={styles.flightDetails}>Upgrade Your booking</Text>
                                                                    <View>
                                                                        <FlatList
                                                                            data={selectedFlight?.Fares}
                                                                            horizontal
                                                                            showsHorizontalScrollIndicator={false}
                                                                            // keyExtractor={(item, index) => index.toString()}
                                                                            renderItem={({ item: fareItem }) => (
                                                                                <View style={styles.strechMainView}>
                                                                                    <View style={styles.strechView}>
                                                                                        <Text style={[styles.departureText, { marginTop: 5, fontSize: 12 }]}>Stretch</Text>
                                                                                        <Text style={styles.price}>₹{fareItem?.FareDetails[0]?.Total_Amount}</Text>
                                                                                    </View>
                                                                                    <View style={styles.strechView}>
                                                                                        <Text style={[styles.departureText, { marginTop: 5, fontSize: 12 }]}>Seat</Text>
                                                                                        <Text style={styles.price}>Include</Text>
                                                                                    </View>
                                                                                    <View style={styles.strechView}>
                                                                                        <Text style={[styles.departureText, { marginTop: 5, fontSize: 12 }]}>Meal</Text>
                                                                                        <Text style={styles.price}>Include</Text>
                                                                                    </View>
                                                                                    <View style={styles.strechView}>
                                                                                        <Text style={[styles.departureText, { marginTop: 5, fontSize: 12 }]}>Check-in-baggage</Text>
                                                                                        <Text style={styles.price}>{fareItem?.FareDetails[0]?.Free_Baggage?.Check_In_Baggage}/1 piece(s)</Text>
                                                                                    </View>
                                                                                    <View style={styles.strechView}>
                                                                                        <Text style={[styles.departureText, { marginTop: 5, fontSize: 12 }]}>Hand baggage</Text>
                                                                                        <Text style={styles.price}>{fareItem?.FareDetails[0]?.Free_Baggage?.Hand_Baggage}/1 piece(s)</Text>
                                                                                    </View>
                                                                                    <View style={styles.strechView}>
                                                                                        <TouchableOpacity
                                                                                            style={styles.selectBtn}
                                                                                            onPress={() => {
                                                                                                // console.log(JSON.stringify(selectedFlight));
                                                                                                // console.log(search_key);
                                                                                                // console.log(selectedFlight?.Flight_Key);
                                                                                                // console.log(fareItem?.Fare_Id);

                                                                                                navigation.navigate('cyrusflightdetails', {
                                                                                                    flightDetails: selectedFlight,
                                                                                                    searchKey: search_key,
                                                                                                    flightKey: selectedFlight?.Flight_Key,
                                                                                                    fareid: fareItem?.Fare_Id,
                                                                                                });
                                                                                            }}
                                                                                        >
                                                                                            <Text style={styles.selectText}>Select</Text>
                                                                                        </TouchableOpacity>
                                                                                    </View>
                                                                                </View>
                                                                            )}
                                                                        />



                                                                    </View>
                                                                </View>
                                                                <View style={{ paddingVertical: 30, }}></View>
                                                            </ScrollView>


                                                        </RBSheet>

                                                    </View>
                                                </TouchableOpacity>
                                            </>
                                        )
                                    })}

                                </View>
                                <View>
                                    <Text style={styles.returnHeading}>Return Flights</Text>
                                    {flightListData?.data[1]?.Flights?.map((flight, flightIndex) => {

                                        return (
                                            <>
                                                <TouchableOpacity
                                                    key={flightIndex}
                                                    onPress={() => {
                                                        setSelectedFlight(flight);
                                                        refRBSheet.current.open();
                                                    }}
                                                >
                                                    <View key={flightIndex} style={styles.flightRetunSubView}>
                                                        <Text style={styles.leftText}>{flight.Fares[0]?.Seats_Available} Seat left</Text>
                                                        <Text style={styles.nameText}>{flight.Segments[0]?.Airline_Name}</Text>

                                                        <Text style={styles.timeText}>
                                                            {flight.Segments[0]?.Departure_DateTime.split(' ')[1]} <Text style={styles.pmText}>PM</Text> -
                                                            {flight.Segments[0]?.Arrival_DateTime.split(' ')[1]} <Text style={styles.pmText}>PM</Text>
                                                        </Text>
                                                        <Text style={styles.nonText}>
                                                            {flight.Segments[0]?.Duration} | Non-Stop
                                                        </Text>
                                                        <Text style={[styles.priceText, { marginTop: 10, }]}>₹{flight.Fares[0]?.FareDetails[0]?.Total_Amount}</Text>
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

                                                            <ScrollView style={{ backgroundColor: "#f7f7f7", flex: 1, borderRadius: 15, padding: 10, paddingVertical: 15, }}>
                                                                <Text style={styles.flightDetails}>Flight Details</Text>
                                                                <View style={styles.detailsMainView}>
                                                                    {selectedFlight?.Segments?.map((segmentItem) => {

                                                                        return (
                                                                            <View
                                                                                style={{
                                                                                    borderBottomWidth: 0.7,
                                                                                    borderStyle: "dashed",
                                                                                    borderBottomColor: "#bababa",
                                                                                    paddingBottom: 15,
                                                                                }}
                                                                            >
                                                                                <Text style={[styles.departureText, { marginTop: 10, }]}>Departing Flight: {segmentItem?.Arrival_DateTime}</Text>
                                                                                <Text style={styles.destinationText}>{segmentItem?.Origin_City}-{segmentItem?.Destination_City}</Text>
                                                                                <Text style={[styles.departureText, { marginTop: 5, fontSize: 12 }]}>{segmentItem?.Airline_Name} {segmentItem?.Airline_Code}-{segmentItem?.Aircraft_Type}</Text>
                                                                                <View style={styles.timeView}>
                                                                                    <View>
                                                                                        <Text style={[styles.departureText, { fontSize: 14 }]}>
                                                                                            {segmentItem?.Departure_DateTime?.split(" ")[1]} PM</Text>
                                                                                        <Text style={[styles.departureText, { fontSize: 9 }]}>{segmentItem?.Origin}</Text>
                                                                                    </View>
                                                                                    <Text style={[styles.departureText, { fontSize: 9, marginVertical: 10, color: "#bababa" }]}>Duration: {segmentItem?.Duration}</Text>
                                                                                    <View>
                                                                                        <Text style={[styles.departureText, { fontSize: 14 }]}>
                                                                                            {segmentItem?.Arrival_DateTime?.split(" ")[1]} PM</Text>
                                                                                        <Text style={[styles.departureText, { fontSize: 9 }]}>{segmentItem?.Destination}</Text>

                                                                                    </View>
                                                                                </View>
                                                                            </View>
                                                                        )
                                                                    })}
                                                                </View>
                                                                <View style={{ marginTop: 15, }}>
                                                                    <Text style={styles.flightDetails}>Upgrade Your booking</Text>
                                                                    <View>
                                                                        <FlatList
                                                                            data={selectedFlight?.Fares}
                                                                            horizontal
                                                                            showsHorizontalScrollIndicator={false}
                                                                            // keyExtractor={(item, index) => index.toString()}
                                                                            renderItem={({ item: fareItem }) => (
                                                                                <View style={styles.strechMainView}>
                                                                                    <View style={styles.strechView}>
                                                                                        <Text style={[styles.departureText, { marginTop: 5, fontSize: 12 }]}>Stretch</Text>
                                                                                        <Text style={styles.price}>₹{fareItem?.FareDetails[0]?.Total_Amount}</Text>
                                                                                    </View>
                                                                                    <View style={styles.strechView}>
                                                                                        <Text style={[styles.departureText, { marginTop: 5, fontSize: 12 }]}>Seat</Text>
                                                                                        <Text style={styles.price}>Include</Text>
                                                                                    </View>
                                                                                    <View style={styles.strechView}>
                                                                                        <Text style={[styles.departureText, { marginTop: 5, fontSize: 12 }]}>Meal</Text>
                                                                                        <Text style={styles.price}>Include</Text>
                                                                                    </View>
                                                                                    <View style={styles.strechView}>
                                                                                        <Text style={[styles.departureText, { marginTop: 5, fontSize: 12 }]}>Check-in-baggage</Text>
                                                                                        <Text style={styles.price}>{fareItem?.FareDetails[0]?.Free_Baggage?.Check_In_Baggage}/1 piece(s)</Text>
                                                                                    </View>
                                                                                    <View style={styles.strechView}>
                                                                                        <Text style={[styles.departureText, { marginTop: 5, fontSize: 12 }]}>Hand baggage</Text>
                                                                                        <Text style={styles.price}>{fareItem?.FareDetails[0]?.Free_Baggage?.Hand_Baggage}/1 piece(s)</Text>
                                                                                    </View>
                                                                                    <View style={styles.strechView}>
                                                                                        <TouchableOpacity
                                                                                            style={styles.selectBtn}
                                                                                            onPress={() => {
                                                                                                console.log(JSON.stringify(selectedFlight));
                                                                                                console.log(search_key);
                                                                                                console.log(selectedFlight?.Flight_Key);
                                                                                                console.log(fareItem?.Fare_Id);

                                                                                                navigation.navigate('cyrusflightdetails', {
                                                                                                    flightDetails: selectedFlight,
                                                                                                    searchKey: search_key,
                                                                                                    flightKey: selectedFlight?.Flight_Key,
                                                                                                    fareid: fareItem?.Fare_Id,
                                                                                                });
                                                                                            }}
                                                                                        >
                                                                                            <Text style={styles.selectText}>Select</Text>
                                                                                        </TouchableOpacity>
                                                                                    </View>
                                                                                </View>
                                                                            )}
                                                                        />



                                                                    </View>
                                                                </View>
                                                                <View style={{ paddingVertical: 30, }}></View>
                                                            </ScrollView>


                                                        </RBSheet>

                                                    </View>
                                                </TouchableOpacity>
                                            </>
                                        )
                                    })}
                                </View>
                            </View>
                        </>
                    ) : (
                        flightListData?.data?.map((item, index) => {
                            return item?.Flights?.map((flight, flightIndex) => {
                                // console.log('Flight Details:', flight.Fares[0]?.FareDetails[0]?.Total_Amount);
                                return (
                                    <View style={{ paddingHorizontal: 10 }} key={flightIndex}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setSelectedFlight(flight);
                                                refRBSheet.current.open();
                                            }}
                                        >
                                            <View style={styles.flightSubView}>
                                                <Text style={styles.leftText}>{flight.Fares[0]?.Seats_Available} Seat left</Text>
                                                <View>
                                                    <Text style={styles.nameText}>{flight.Segments[0]?.Airline_Name}</Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.timeText}>
                                                        {flight.Segments[0]?.Departure_DateTime.split(' ')[1]} <Text style={styles.pmText}>PM</Text> -
                                                        {flight.Segments[0]?.Arrival_DateTime.split(' ')[1]} <Text style={styles.pmText}>PM</Text>
                                                    </Text>
                                                    <Text style={styles.nonText}>
                                                        {flight.Segments[0]?.Duration} | Non-Stop
                                                    </Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.priceText}>₹{flight.Fares[0]?.FareDetails[0]?.Total_Amount}</Text>
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
                                                }}
                                            >
                                                <ScrollView style={{ backgroundColor: "#f7f7f7", flex: 1, borderRadius: 15, padding: 10, paddingVertical: 15 }}>
                                                    <Text style={styles.flightDetails}>Flight Details</Text>
                                                    <View style={styles.detailsMainView}>
                                                        {selectedFlight?.Segments?.map((segmentItem) => (
                                                            <View
                                                                key={segmentItem?.Flight_Key} // Add a key for each segment
                                                                style={{
                                                                    borderBottomWidth: 0.7,
                                                                    borderStyle: "dashed",
                                                                    borderBottomColor: "#bababa",
                                                                    paddingBottom: 15,
                                                                }}
                                                            >
                                                                <Text style={[styles.departureText, { marginTop: 10 }]}>Departing Flight: {segmentItem?.Arrival_DateTime}</Text>
                                                                <Text style={styles.destinationText}>{segmentItem?.Origin_City}-{segmentItem?.Destination_City}</Text>
                                                                <Text style={[styles.departureText, { marginTop: 5, fontSize: 12 }]}>{segmentItem?.Airline_Name} {segmentItem?.Airline_Code}-{segmentItem?.Aircraft_Type}</Text>
                                                                <View style={styles.timeView}>
                                                                    <View>
                                                                        <Text style={[styles.departureText, { fontSize: 14 }]}>{segmentItem?.Departure_DateTime?.split(" ")[1]} PM</Text>
                                                                        <Text style={[styles.departureText, { fontSize: 9 }]}>{segmentItem?.Origin}</Text>
                                                                    </View>
                                                                    <Text style={[styles.departureText, { fontSize: 9, marginVertical: 10, color: "#bababa" }]}>Duration: {segmentItem?.Duration}</Text>
                                                                    <View>
                                                                        <Text style={[styles.departureText, { fontSize: 14 }]}>{segmentItem?.Arrival_DateTime?.split(" ")[1]} PM</Text>
                                                                        <Text style={[styles.departureText, { fontSize: 9 }]}>{segmentItem?.Destination}</Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        ))}
                                                    </View>
                                                    <View style={{ marginTop: 15, }}>
                                                        <Text style={styles.flightDetails}>Upgrade Your booking</Text>
                                                        <View>
                                                            <FlatList
                                                                data={selectedFlight?.Fares}
                                                                horizontal
                                                                showsHorizontalScrollIndicator={false}
                                                                // keyExtractor={(item, index) => index.toString()}
                                                                renderItem={({ item: fareItem }) => (
                                                                    <View style={styles.strechMainView}>
                                                                        <View style={styles.strechView}>
                                                                            <Text style={[styles.departureText, { marginTop: 5, fontSize: 12 }]}>Stretch</Text>
                                                                            <Text style={styles.price}>₹{fareItem?.FareDetails[0]?.Total_Amount}</Text>
                                                                        </View>
                                                                        <View style={styles.strechView}>
                                                                            <Text style={[styles.departureText, { marginTop: 5, fontSize: 12 }]}>Seat</Text>
                                                                            <Text style={styles.price}>Include</Text>
                                                                        </View>
                                                                        <View style={styles.strechView}>
                                                                            <Text style={[styles.departureText, { marginTop: 5, fontSize: 12 }]}>Meal</Text>
                                                                            <Text style={styles.price}>Include</Text>
                                                                        </View>
                                                                        <View style={styles.strechView}>
                                                                            <Text style={[styles.departureText, { marginTop: 5, fontSize: 12 }]}>Check-in-baggage</Text>
                                                                            <Text style={styles.price}>{fareItem?.FareDetails[0]?.Free_Baggage?.Check_In_Baggage}/1 piece(s)</Text>
                                                                        </View>
                                                                        <View style={styles.strechView}>
                                                                            <Text style={[styles.departureText, { marginTop: 5, fontSize: 12 }]}>Hand baggage</Text>
                                                                            <Text style={styles.price}>{fareItem?.FareDetails[0]?.Free_Baggage?.Hand_Baggage}/1 piece(s)</Text>
                                                                        </View>
                                                                        <View style={styles.strechView}>
                                                                            <TouchableOpacity
                                                                                style={styles.selectBtn}
                                                                                onPress={() => {
                                                                                    console.log(JSON.stringify(selectedFlight));
                                                                                    console.log(search_key);
                                                                                    console.log(selectedFlight?.Flight_Key);
                                                                                    console.log(fareItem?.Fare_Id);

                                                                                    navigation.navigate('cyrusflightdetails', {
                                                                                        flightDetails: selectedFlight,
                                                                                        searchKey: search_key,
                                                                                        flightKey: selectedFlight?.Flight_Key,
                                                                                        fareid: fareItem?.Fare_Id,
                                                                                    });
                                                                                }}
                                                                            >
                                                                                <Text style={styles.selectText}>Select</Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    </View>
                                                                )}
                                                            />



                                                        </View>
                                                    </View>
                                                    <View style={{paddingVertical:10}}></View>
                                                </ScrollView>
                                            </RBSheet>
                                        </TouchableOpacity>
                                    </View>
                                );
                            });

                        })

                    )}
                    <View style={{ paddingVertical: 35 }}></View>
                </View>
            </ScrollView>
        </View>
    );
};

export default AllFlights;

const styles = StyleSheet.create({
    flightItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    flightMainView: {
        backgroundColor: "#fff"
    },
    flightHeading: {
        fontSize: 16,
        fontWeight: '600',
        color: "#000",
        marginVertical: 20,
        marginLeft: 10,

    },
    flightSubView: {
        width: "100%",
        marginTop: 10,
        borderRadius: 5,
        borderWidth: 0.3,
        borderColor: "#e05320",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        paddingVertical: 20,
    },
    nameText: {
        fontSize: 9,
    },
    timeText: {
        fontSize: 11,
        color: "#000",
        fontWeight: "500"
    },
    pmText: {
        fontSize: 7,
        color: "#000",
        fontWeight: "500"
    },
    priceText: {
        fontSize: 12,
        color: "#000",
        fontWeight: "500"
    },
    nonText: {
        fontSize: 9,
        marginTop: 5,
    },
    leftText: {
        color: "#e05320",
        fontSize: 10,
        borderWidth: 0.3,
        textAlign: "center",
        borderColor: "#b3b3b3",
        backgroundColor: "#fff",
        width: 80,
        borderRadius: 3,
        position: "absolute",
        top: -7,
        left: 7,
    },
    flightDetails: {
        ...Fonts._14MontserratMedium,
        color: "#000",
        fontWeight: "700",
        fontSize: 16,
    },
    detailsMainView: {
        width: "100%",
        backgroundColor: "#fff",
        marginTop: 15,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#bababa",
        paddingHorizontal: 14,
        paddingBottom: 10,
    },
    departureText: {
        ...Fonts._14MontserratMedium,
        color: "#000",
        fontSize: 9,
    },
    destinationText: {
        ...Fonts._14MontserratMedium,
        color: "#000",
        fontSize: 11,
        marginVertical: 4,

    },
    timeView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    strechMainView: {
        borderWidth: 0.6,
        borderColor: '#EA7515',
        // width: "48%",
        marginTop: 10,
        padding: 10,
        borderRadius: 14,
        marginRight: 10,
    },
    price: {
        ...Fonts._14MontserratMedium,
        color: "#bababa",
        fontSize: 12,

    },
    strechView: {
        marginTop: 8,
    },
    selectBtn: {
        backgroundColor: '#EA7515',
        padding: 6,
        borderRadius: 100,
        marginTop: 10,
    },
    selectText: {
        color: "#fff",
        textAlign: "center",
    },
    flightItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    flightRetunSubView: {
        marginTop: 10,
        borderRadius: 5,
        borderWidth: 0.3,
        borderColor: "#e05320",
        padding: 10,
        paddingVertical: 20,
        paddingBottom: 10,
        flex: 1,
        width: responsiveScreenWidth(45)
    },
    returnView: {
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 10,
        gap: 10,
        justifyContent: "space-between"
    },
    headerView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
        marginBottom: 10,
        backgroundColor: "#ffa50029"
    },
    location: {
        ...Fonts._14MontserratMedium,
        color: "#000",
        fontSize: 14,
        textAlign: "center"
    },
    date: {
        ...Fonts._14MontserratMedium,
        color: "#000",
        fontSize: 10,
        textAlign: "center"
    },
    returnHeading: {
        fontSize: 16,
        ...Fonts._14MontserratMedium,
        color: "#000",
    }
});
