import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, SCREEN_WIDTH, Sizes } from '../../../../assests/style'
import moment from 'moment'
import { showNumber } from '../../../../utils/services'
import { connect } from 'react-redux'
import * as FlightActions from '../../../../redux/actions/FlightActions'

const DateFilters = ({ dispatch, flightsDateData, payload }) => {
    // console.log(payload)
    const [selectedDate, setSelectedDate] = useState(null)

    const onChangeDate = (date) => {

        const data = {
            ...payload,
            Segments: [{
                ...payload?.Segments[0],
                PreferredDepartureTime: moment(date).format('YYYY-MM-DD')
            }
            ]
        }
        dispatch(FlightActions.getFlightListData(data))

    }

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => onChangeDate(item?.DepartureDate)} style={{ width: SCREEN_WIDTH * 0.2, paddingVertical: Sizes.fixPadding * 0.5, justifyContent: 'center', alignItems: 'center', backgroundColor: payload?.Segments[0]?.PreferredDepartureTime == moment(item?.DepartureDate).format('YYYY-MM-DD') ? '#fff8f7' : Colors.white }}>
                <Text style={{ ...Fonts._11MontserratMedium }}>{moment(item?.DepartureDate).format('DD MMM')}</Text>
                <Text style={{ ...Fonts._11MontserratMedium }}>{showNumber(item?.Fare)}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <>
            {flightsDateData && <View
                style={{ backgroundColor: Colors.white, borderTopWidth: 1, borderBottomWidth: 1, borderColor: Colors.grayC }}
            >
                <FlatList data={flightsDateData} renderItem={renderItem} horizontal showsHorizontalScrollIndicator={false} scrollEnabled={flightsDateData.length > 4} />
            </View>}
        </>

    )
}

const mapStateToProps = state => ({
    flightsDateData: state.flightReducer.flightsDateData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(DateFilters)