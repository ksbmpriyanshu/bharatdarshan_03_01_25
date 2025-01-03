import { View, Text, StatusBar, ImageBackground, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Fonts, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes } from '../../../assests/style'
import MyStatusBar from '../../../components/StatusBar'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RefundIcon from '../../../assests/svg/refund.svg'
import OnGoingTrip from './detailsComponents/OnGoingTrip'
import MaxPolicies from './detailsComponents/MaxPolicies'
import { DurationComponent, showNumber } from '../../../utils/services'
import * as FlightActions from '../../../redux/actions/FlightActions'
import { connect } from 'react-redux'

const FlightDetails = ({ navigation, route, bookedFlightDetailsData, dispatch }) => {
    console.log(JSON.stringify(bookedFlightDetailsData))
    const flightData = bookedFlightDetailsData?.flightData || null
    const returnFlightData = bookedFlightDetailsData?.returnFlightData || null
    const [state, setState] = useState({
        activeTab: false
    })

    useEffect(() => {
        dispatch(FlightActions.getFlightBookingDetails(route?.params?.flightData?._id))
    }, [])

    const updateState = data => {
        setState(prevStat => {
            const newData = { ...prevStat, ...data }
            return newData
        })
    }

    const { activeTab } = state

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar backgroundColor={'transparent'} barStyle={'light-content'} translucent />
            {backgroundInfo()}
            {headerInfo()}
            <View style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={<>
                        {flightData && tripInfo()}
                        {flightData && flightInfo()}
                        {returnFlightData && returnFlightInfo()}
                        {/* {flightActionsInfo()} */}
                        {/* {bookingInformation()} */}
                        {/* {tabsInfo()} */}
                        {/* {ongoingTripInfo()} */}
                        {ticketSharedInfo()}
                        {paymentDetailsInfo()}
                    </>}
                    contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding }}
                />
            </View>
        </View>
    )

    function paymentDetailsInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding }}>
                <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: 20, marginBottom: Sizes.fixPadding * 0.4 }}>Payment Details</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: 16, }}>Total amount paid</Text>
                    <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: 16, }}>{showNumber(flightData?.FlightItinerary?.InvoiceAmount)}</Text>
                </View>
            </View>
        )
    }

    function ticketSharedInfo() {
        return (
            <View>
                <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: 16, marginBottom: Sizes.fixPadding * 0.4 }}>Ticket  details Shared to</Text>
                {flightData?.FlightItinerary?.Passenger.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name='person' size={18} color={'grey'} />
                                <Text style={{ ...Fonts._13MontserratMedium, marginLeft: Sizes.fixPadding * 0.5, color: Colors.grayA }}> {item?.FirstName}{' '}{item?.LastName}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require('../../../assests/icons/email.png')} style={{ width: 22, height: 22 }} />
                                <Text style={{ ...Fonts._13MontserratMedium, marginLeft: Sizes.fixPadding * 0.5, color: Colors.grayA }}>{item?.Email}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Sizes.fixPadding * 0.3 }}>
                                <Image source={require('../../../assests/icons/phone.png')} style={{ width: 22, height: 22 }} />
                                <Text style={{ ...Fonts._13MontserratMedium, marginLeft: Sizes.fixPadding * 0.5, color: Colors.grayA }}>{item?.ContactNo}</Text>
                            </View>
                            {/* <View style={{flexDirection: 'row', alignItems:'center'}}>
                                <FontAwesome name='birthday-cake' size={18} color={'grey'} />
                                <Text style={{ ...Fonts._13MontserratMedium, marginLeft: Sizes.fixPadding * 0.5, color: Colors.grayA }}>{' '}{moment(item?.DateOfBirth).format('DD-MM-YYYY')}</Text>
                            </View> */}
                        </React.Fragment>
                    )
                })}


            </View>
        )
    }

    function ongoingTripInfo() {
        return (
            <>
                <OnGoingTrip />
                <MaxPolicies />
            </>

        )
    }

    function tabsInfo() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: Sizes.fixPadding }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => updateState({ activeTab: !activeTab })} style={[styles.tabButtons, { backgroundColor: activeTab ? Colors.primaryTheme : Colors.white }]}>
                    <Text style={{ ...Fonts._16MontserratMedium, textAlign: 'center', color: activeTab ? Colors.white : Colors.black }}>Onward</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => updateState({ activeTab: !activeTab })} style={[styles.tabButtons, { backgroundColor: !activeTab ? Colors.primaryTheme : Colors.white }]}>
                    <Text style={{ ...Fonts._16MontserratMedium, textAlign: 'center', color: !activeTab ? Colors.white : Colors.black }}>Return</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function bookingInformation() {
        return (
            <Text style={{ ...Fonts._14MontserratBold, fontSize: 20, textAlign: 'center', marginVertical: Sizes.fixPadding * 1.5, }}>Booking Information</Text>
        )
    }

    function flightActionsInfo() {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Sizes.fixPadding, paddingVertical: Sizes.fixPadding * 0.5 }}>
                <TouchableOpacity style={{ backgroundColor: Colors.blue, justifyContent: 'center', alignItems: 'center', borderRadius: Sizes.fixPadding }}>
                    <AntDesign name='closecircleo' color={'#C83232'} size={20} />
                    <Text style={{ ...Fonts._11MontserratMedium, color: '#C83232', marginTop: Sizes.fixPadding * 0.3 }}>Cancel Flights</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: Colors.gray, justifyContent: 'center', alignItems: 'center', borderRadius: Sizes.fixPadding }}>
                    <AntDesign name='calendar' color={'#22222250'} size={20} />
                    <Text style={{ ...Fonts._11MontserratMedium, color: Colors.black, marginTop: Sizes.fixPadding * 0.3 }}>Re-Schedule</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: Colors.gray, justifyContent: 'center', alignItems: 'center', borderRadius: Sizes.fixPadding }}>
                    <RefundIcon width={30} height={22} />
                    <Text style={{ ...Fonts._11MontserratMedium, color: Colors.black, marginTop: Sizes.fixPadding * 0.3 }}>Check Refund</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function returnFlightInfo() {
        return (
            <View style={styles.flightContainer}>
                <View style={{ backgroundColor: Colors.orange, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Sizes.fixPadding, paddingVertical: Sizes.fixPadding * 0.5 }}>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ backgroundColor: Colors.white, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: Sizes.fixPadding }}>
                            <Image source={require('../../../assests/images/airpot.png')} style={{ width: '90%', height: '90%' }} />
                        </View>

                        <View style={{ marginLeft: Sizes.fixPadding * 0.6 }}>
                            <Text style={{ ...Fonts._14MontserratMedium, color: Colors.white }}>Indigo <Text style={{ ...Fonts._13MontserratRegular, color: Colors.grayF }}>6E 353</Text></Text>
                            <Text style={{ ...Fonts._13MontserratRegular, color: Colors.grayF }}>Economy</Text>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: Sizes.fixPadding * 0.5, backgroundColor: '#962a00', paddingVertical: Sizes.fixPadding * 0.3 }}>
                        <Text style={{ ...Fonts._11MontserratMedium, color: Colors.white }}>PNR: JRSDDE</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: Sizes.fixPadding * 0.4 }}>
                    <View>
                        <Text style={{ ...Fonts._12MontserratRegular }}>{moment(new Date()).format('ddd, DD MMM')}</Text>
                        <Text style={{ ...Fonts._16MontserratMedium, color: Colors.grayA }}>DEL <Text style={{ color: Colors.black }}>05:25</Text></Text>
                        <Text style={{ ...Fonts._11MontserratRegular, fontSize: 9, color: Colors.grayA }}>Indira Gandhi Airport</Text>
                        <Text style={{ ...Fonts._11MontserratRegular, color: Colors.grayDark }}>Terminal 1</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ ...Fonts._11MontserratRegular }}>06h 0m</Text>
                        <Image source={require('../../../assests/icons/divider.png')} style={{ width: SCREEN_WIDTH * 0.24, resizeMode: 'contain' }} />
                        <Text style={{ ...Fonts._11MontserratRegular }}>1 Stop</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ ...Fonts._12MontserratRegular }}>{moment(new Date()).format('ddd, DD MMM')}</Text>
                        <Text style={{ ...Fonts._16MontserratMedium, color: Colors.grayA }}>DEL <Text style={{ color: Colors.black }}>05:25</Text></Text>
                        <Text style={{ ...Fonts._11MontserratRegular, fontSize: 9, color: Colors.grayA }}>Indira Gandhi Airport</Text>
                        <Text style={{ ...Fonts._11MontserratRegular, color: Colors.grayDark }}>Terminal 1</Text>
                    </View>
                </View>
                <View style={{ borderBottomWidth: 0.5, borderBlockColor: Colors.grayC, marginHorizontal: Sizes.fixPadding, marginTop: Sizes.fixPadding }}>
                    <Text style={{ ...Fonts._12MontserratMedium, color: '#0F6BFF', textAlign: 'center' }}>View Stops Informations <FontAwesome name='angle-down' size={14} /></Text>
                </View>
                {/* <View style={{ marginTop: Sizes.fixPadding * 1.5, marginHorizontal: Sizes.fixPadding * 0.5 }}>
                    <Text style={{ ...Fonts._14MontserratMedium }}>Clear Choice Max</Text>
                    <Text style={{ ...Fonts._11MontserratMedium, color: '#11A670' }}>Flexible Benefits valid till 13 Aug 05:25</Text>
                </View> */}
            </View>
        )
    }

    function flightInfo() {
        return (
            <View style={styles.flightContainer}>
                {flightData?.FlightItinerary?.Segments.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <View style={{ backgroundColor: Colors.orange, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Sizes.fixPadding, paddingVertical: Sizes.fixPadding * 0.5 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ backgroundColor: Colors.white, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: Sizes.fixPadding }}>
                                        <Image source={require('../../../assests/images/airpot.png')} style={{ width: '90%', height: '90%' }} />
                                    </View>
                                    <View style={{ marginLeft: Sizes.fixPadding * 0.6 }}>
                                        <Text style={{ ...Fonts._14MontserratMedium, color: Colors.white }}>
                                            {item?.Airline?.AirlineName}
                                            <Text style={{ ...Fonts._13MontserratRegular, color: Colors.grayF }}>{item?.Airline?.FlightNumber}</Text>
                                        </Text>
                                        <Text style={{ ...Fonts._13MontserratRegular, color: Colors.grayF }}>Economy</Text>
                                    </View>
                                </View>
                                <View style={{ paddingHorizontal: Sizes.fixPadding * 0.5, backgroundColor: '#962a00', paddingVertical: Sizes.fixPadding * 0.3 }}>
                                    <Text style={{ ...Fonts._11MontserratMedium, color: Colors.white }}>PNR: {item?.AirlinePNR}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', margin: Sizes.fixPadding * 0.4 }}>
                                <View style={{ width: '35%' }}>
                                    <Text style={{ ...Fonts._12MontserratRegular }}>{moment(item?.Origin?.DepTime).format('ddd, DD MMM')}</Text>
                                    <Text style={{ ...Fonts._16MontserratMedium, color: Colors.grayA }}>
                                        {item?.Origin?.Airport?.AirportCode} <Text style={{ color: Colors.black }}>{moment(item?.Origin?.DepTime).format('HH:mm:ss')}</Text>
                                    </Text>
                                    <Text style={{ ...Fonts._11MontserratRegular, fontSize: 9, color: Colors.grayA, width: '50%' }}>{item?.Origin?.Airport?.AirportName}</Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: "25%", marginRight: 10 }}>
                                    <Text style={{ ...Fonts._11MontserratRegular }}>
                                        <DurationComponent duration={item?.Duration} />
                                    </Text>
                                    <Image source={require('../../../assests/icons/divider.png')} style={{ width: SCREEN_WIDTH * 0.24, resizeMode: 'contain' }} />
                                    <Text style={{ ...Fonts._11MontserratRegular }}>
                                        {flightData?.FlightItinerary?.Segments && flightData?.FlightItinerary?.Segments.length === 1
                                            ? 'Non-Stop'
                                            : `${flightData?.FlightItinerary?.Segments.length} Stop${flightData?.FlightItinerary?.Segments.length > 1 ? 's' : ''}`}
                                    </Text>

                                </View>
                                <View style={{ width: '40%' }}>
                                    <Text style={{ ...Fonts._12MontserratRegular }}>{moment(item?.Destination?.ArrTime).format('ddd, DD MMM')}</Text>
                                    <Text style={{ ...Fonts._16MontserratMedium, color: Colors.grayA }}>
                                        {item?.Destination?.Airport?.AirportCode} <Text style={{ color: Colors.black }}>{moment(item?.Destination?.ArrTime).format('HH:mm:ss')}</Text>
                                    </Text>
                                    <Text style={{ ...Fonts._11MontserratRegular, fontSize: 9, color: Colors.grayA, width: '50%' }}>{item?.Destination?.Airport?.AirportName}</Text>
                                </View>
                            </View>
                        </React.Fragment>
                    );
                })}
            </View>

        )
    }

    function tripInfo() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ ...Fonts._14MontserratMedium, color: Colors.white }}>Trip ID : {flightData?.TraceId}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...Fonts._18MontserratMedium, color: Colors.white }}>{flightData?.FlightItinerary?.Segments?.[0]?.Origin?.Airport?.CityName}</Text>
                    <Image source={require('../../../assests/icons/switch.png')} style={{ width: 30, height: 30, marginHorizontal: Sizes.fixPadding }} />
                    <Text style={{ ...Fonts._18MontserratMedium, color: Colors.white }}>{flightData?.FlightItinerary?.Segments?.[flightData?.FlightItinerary?.Segments.length - 1]?.Destination?.Airport?.CityName}</Text>
                </View>
            </View>
        )
    }

    function headerInfo() {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('home')} style={{ marginTop: StatusBar.currentHeight, padding: Sizes.fixPadding }}>
                <Image source={require('../../../assests/icons/backarrow.png')} style={{ width: 40, height: 15, tintColor: Colors.white }} />
            </TouchableOpacity>
        )
    }

    function backgroundInfo() {
        return (
            <LinearGradient
                colors={['#EA7515', '#FDEBDC10']}
                style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH * 0.83, position: 'absolute', top: 0, zIndex: -1 }}
            >
                <Image
                    source={require('../../../assests/images/map_background.png')}
                    style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                />

            </LinearGradient>
        )
    }
}

const mapStateToProps = state => ({
    bookedFlightDetailsData: state.flightReducer.bookedFlightDetailsData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(FlightDetails)

const styles = StyleSheet.create({
    flightContainer: {
        backgroundColor: Colors.white,
        borderRadius: Sizes.fixPadding,
        overflow: 'hidden',
        elevation: 5,
        marginBottom: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 1.5,
        shadowColor: Colors.grayB,
        paddingBottom: Sizes.fixPadding
    },
    tabButtons: {
        width: '45%',
        borderWidth: 1,
        borderColor: Colors.primaryTheme,
        borderRadius: 1000,
        paddingVertical: Sizes.fixPadding * 0.3
    }
})