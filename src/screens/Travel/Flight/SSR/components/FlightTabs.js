import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { Colors, Fonts, Sizes } from '../../../../../assests/style'
import { connect } from 'react-redux'
import * as FlightActions from '../../../../../redux/actions/FlightActions'

const FlightTabs = ({ flightSsrData, returnFlightSsrData, returnFlightData, flightData, dispatch, selectedSsrData }) => {
    const [flights, setFlights] = useState([])
    useEffect(() => {
        try {
            let flight = []
            let returnFlight = []
            if (flightData) {
                flight = flightData?.Results?.Segments[0].map(item => item)
            }
            if (returnFlightData) {
                returnFlight = flight.concat(returnFlightData?.Results?.Segments[0].map(item => item))
            }
            const data = [...flight, ...returnFlight]
            dispatch(FlightActions.setFlightSsrSelectedData({ ...selectedSsrData, flight: { ...selectedSsrData.flight, selectedSeat: data[0] } }))
            setFlights(data)
        } catch (e) {
            console.log(e)
        }
    }, [])
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => dispatch(FlightActions.setFlightSsrSelectedData({ ...selectedSsrData, flight: { ...selectedSsrData.flight, selectedSeat: item } }))}
                style={{ marginLeft: Sizes.fixPadding }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Image source={require('../../../../../assests/images/airpot.png')} style={{ width: 25, height: 25 }} />
                    <Text style={{ ...Fonts._11MontserratMedium, }}>{`${item?.Origin?.Airport?.AirportCode} - ${item?.Destination?.Airport?.AirportCode}`}</Text>
                </View>
                <View style={{ height: 1, backgroundColor: selectedSsrData?.flight?.selectedSeat?.Origin?.DepTime === item?.Origin?.DepTime ? Colors.orange : 'transparent', marginTop: Sizes.fixPadding * 0.3 }} />
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ backgroundColor: Colors.white, paddingVertical: Sizes.fixPadding * 0.7, borderBottomWidth: 1, borderBlockColor: Colors.grayE }}>
            <FlatList data={flights} renderItem={renderItem} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: Sizes.fixPadding }} />
        </View>
    )
}

const mapStateToProps = state => ({
    flightSsrData: state.flightReducer.flightSsrData,
    returnFlightSsrData: state.flightReducer.returnFlightSsrData,
    flightData: state.flightReducer.flightData,
    returnFlightData: state.flightReducer.returnFlightData,
    selectedSsrData: state.flightReducer.selectedSsrData,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(FlightTabs)