import { View, Text, FlatList, TouchableOpacity, Image, Platform, UIManager, LayoutAnimation } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Fonts, SCREEN_WIDTH, Sizes, getFontSize } from '../../../assests/style'
import MyStatusBar from '../../../components/StatusBar'
import Footer from './components/Footer'
import PrimaryContacts from './components/PrimaryContacts'
import BaggageCancellation from './components/BagageCancellation'
import { connect } from 'react-redux'
import * as FlightActions from '../../../redux/actions/FlightActions'
import moment from 'moment'
import FlightOriginDestination from './components/FlightOriginDestination'
import { BottomSheet } from '@rneui/themed'
import LottieView from 'lottie-react-native';
import Loader from '../../../components/Loader'

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FlightReview = ({ dispatch, route, passengers, requestingTicketVisible,navigation }) => {
    console.log(passengers)
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle='light-content' />
            <Loader />
            <View style={{ flex: 1 }}>
                {headerInfo()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            <FlightOriginDestination />
                            <BaggageCancellation />
                            <PrimaryContacts type='review' />
                            {passengersInfo()}
                        </>
                    }
                    contentContainerStyle={{ padding: Sizes.fixPadding }}
                />
            </View>
            <Footer title='Book Now' />
            {bookingRequestModalInfo()}
        </View>
    )

    function bookingRequestModalInfo() {
        return (
            <BottomSheet
                isVisible={requestingTicketVisible}
            >
                <View style={{ height: 300, backgroundColor: Colors.white, borderTopRightRadius: Sizes.fixPadding, borderTopLeftRadius: Sizes.fixPadding, justifyContent: 'center', alignItems: 'center' }}>
                    <LottieView source={require('../../../assests/svg/flight.json')} autoPlay loop style={{ width: SCREEN_WIDTH * 0.8, height: SCREEN_WIDTH * 0.8 }} />
                    <Text style={{ ...Fonts._18MontserratMedium, position: 'relative', bottom: 60 }}>Requesting Ticket...</Text>
                </View>
            </BottomSheet>
        )
    }

    function passengersInfo() {
        const renderItem = ({ item, index }) => {
            return (
                <View style={{ marginBottom: Sizes.fixPadding * 0.5 }}>
                    <Text style={{ ...Fonts._13MontserratMedium, color: Colors.grayA }}>{item?.type} {item.value}</Text>
                    <Text style={{ ...Fonts._13MontserratMedium, color: Colors.grayA }}>{item.firstName} {item.lastName}</Text>
                    {item?.dob &&  <Text style={{ ...Fonts._13MontserratMedium, color: Colors.grayA }}>{moment(item.dob).format('DD-MMM-YYYY')}</Text>}
                   
                    
                </View>
            )
        }
        return (
            <View style={{ backgroundColor: Colors.grayG, marginTop: Sizes.fixPadding, borderRadius: Sizes.fixPadding * 0.5, paddingHorizontal: Sizes.fixHorizontalPadding, paddingVertical: Sizes.fixPadding }}>
                <Text style={{ ...Fonts._16MontserratMedium, marginBottom: Sizes.fixPadding }}>Passengers</Text>
                <FlatList
                    data={passengers}
                    renderItem={renderItem}
                />
            </View>
        )
    }

    function headerInfo() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: Sizes.fixHorizontalPadding * 2 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../../assests/icons/back_arrow.png')} style={{ width: 24, height: 24, resizeMode: 'contain' }} />
                </TouchableOpacity>
                <Text style={{ ...Fonts._16MontserratMedium, marginLeft: Sizes.fixHorizontalPadding * 2 }}>Flight Review</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    flightData: state.flightReducer.flightData,
    passengers: state.flightReducer.passengers,
    requestingTicketVisible: state.flightReducer.requestingTicketVisible
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(FlightReview)