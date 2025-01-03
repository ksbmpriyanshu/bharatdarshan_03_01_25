import { View, Text, Image } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'
import { Colors, Fonts, Sizes, getFontSize } from '../../../../assests/style'
import moment from 'moment'

const FlightOriginDestination = ({ flightData, returnFlightData }) => {
    return (
        <>
            {
                flightData && flightData?.Results?.Segments[0].map((item, index) => {
                    return (
                        <View key={index} style={{ backgroundColor: Colors.grayG, flexDirection: 'row', alignItems: 'center', paddingHorizontal: Sizes.fixHorizontalPadding * 0.5, borderRadius: Sizes.fixHorizontalPadding, paddingVertical: Sizes.fixHorizontalPadding, marginBottom: Sizes.fixPadding }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../../../assests/images/airpot.png')} style={{ width: 34, height: 34, resizeMode: 'contain' }} />
                                <Text style={{ ...Fonts._11MontserratMedium }}>
                                    {item.Airline?.AirlineName}
                                </Text>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginLeft: Sizes.fixHorizontalPadding }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: getFontSize(20) }}>{item?.Origin?.Airport?.AirportCode}</Text>
                                    <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: getFontSize(11) }}>{moment(item?.Origin?.DepTime).format('hh:mm A')}</Text>
                                    <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: getFontSize(9), color: Colors.grayA }}>{moment(item?.Origin?.DepTime).format('Do MMM YYYY')}</Text>
                                </View>
                                <Image source={require('../../../../assests/icons/arrow_right.png')} style={{ resizeMode: 'contain', width: 24, height: 24 }} />
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: getFontSize(20) }}>{item?.Destination?.Airport?.AirportCode}</Text>
                                    <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: getFontSize(11) }}>{moment(item?.Destination?.ArrTime).format('hh:mm A')}</Text>
                                    <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: getFontSize(9), color: Colors.grayA }}>{moment(item?.Destination?.ArrTime).format('Do MMM YYYY')}</Text>
                                </View>
                            </View>
                        </View>
                    )
                })
            }
            {
                (flightData && flightData?.Results?.Segments?.[1]) && <View>
                    <Text style={{ ...Fonts._14MontserratMedium }}>Return Flight</Text>
                    {flightData?.Results?.Segments?.[1].map((item, index) => {
                        return (
                            <View key={index} style={{ backgroundColor: Colors.grayG, flexDirection: 'row', alignItems: 'center', paddingHorizontal: Sizes.fixHorizontalPadding * 0.5, borderRadius: Sizes.fixHorizontalPadding, paddingVertical: Sizes.fixHorizontalPadding, marginBottom: Sizes.fixPadding }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../../../assests/images/airpot.png')} style={{ width: 34, height: 34, resizeMode: 'contain' }} />
                                    <Text style={{ ...Fonts._11MontserratMedium }}>
                                        {item.Airline?.AirlineName}
                                    </Text>
                                </View>

                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginLeft: Sizes.fixHorizontalPadding }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: getFontSize(20) }}>{item?.Origin?.Airport?.AirportCode}</Text>
                                        <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: getFontSize(11) }}>{moment(item?.Origin?.DepTime).format('hh:mm A')}</Text>
                                        <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: getFontSize(9), color: Colors.grayA }}>{moment(item?.Origin?.DepTime).format('Do MMM YYYY')}</Text>
                                    </View>
                                    <Image source={require('../../../../assests/icons/arrow_right.png')} style={{ resizeMode: 'contain', width: 24, height: 24 }} />
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: getFontSize(20) }}>{item?.Destination?.Airport?.AirportCode}</Text>
                                        <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: getFontSize(11) }}>{moment(item?.Destination?.ArrTime).format('hh:mm A')}</Text>
                                        <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: getFontSize(9), color: Colors.grayA }}>{moment(item?.Destination?.ArrTime).format('Do MMM YYYY')}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
            }
            {
                returnFlightData && <View>
                    <Text style={{ ...Fonts._14MontserratMedium }}>Return Flight</Text>
                    {returnFlightData?.Results.Segments[0].map((item, index) => {
                        return (
                            <View key={index} style={{ backgroundColor: Colors.grayG, flexDirection: 'row', alignItems: 'center', paddingHorizontal: Sizes.fixHorizontalPadding * 0.5, borderRadius: Sizes.fixHorizontalPadding, paddingVertical: Sizes.fixHorizontalPadding, marginBottom: Sizes.fixPadding }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../../../assests/images/airpot.png')} style={{ width: 34, height: 34, resizeMode: 'contain' }} />
                                    <Text style={{ ...Fonts._11MontserratMedium }}>
                                        {item.Airline?.AirlineName}
                                    </Text>
                                </View>

                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginLeft: Sizes.fixHorizontalPadding }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: getFontSize(20) }}>{item?.Origin?.Airport?.AirportCode}</Text>
                                        <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: getFontSize(11) }}>{moment(item?.Origin?.DepTime).format('hh:mm A')}</Text>
                                        <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: getFontSize(9), color: Colors.grayA }}>{moment(item?.Origin?.DepTime).format('Do MMM YYYY')}</Text>
                                    </View>
                                    <Image source={require('../../../../assests/icons/arrow_right.png')} style={{ resizeMode: 'contain', width: 24, height: 24 }} />
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: getFontSize(20) }}>{item?.Destination?.Airport?.AirportCode}</Text>
                                        <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: getFontSize(11) }}>{moment(item?.Destination?.ArrTime).format('hh:mm A')}</Text>
                                        <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: getFontSize(9), color: Colors.grayA }}>{moment(item?.Destination?.ArrTime).format('Do MMM YYYY')}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
            }
        </>

    )
}

const mapStateToProps = state => ({
    flightData: state.flightReducer.flightData,
    returnFlightData: state.flightReducer.returnFlightData,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(FlightOriginDestination)