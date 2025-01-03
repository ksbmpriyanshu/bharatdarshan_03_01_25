import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Sizes, Fonts } from '../../../../assests/style'
import { formatFlightTime, showNumber } from '../../../../utils/services'
import moment from 'moment'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import * as FlightActions from '../../../../redux/actions/FlightActions'

const ReturnFlights = ({ data, type, dispatch, selectedFlight, selectedReturnFlight }) => {
  const onSelect = () => {
    if (type == 'return') {
      dispatch(FlightActions.setSelectedReturnFlight(data))
    } else {
      dispatch(FlightActions.setSelectedFlight(data))
    }
  }

  const isActive = () => {
    if (type == 'return') {
      return selectedReturnFlight?.ResultIndex === data?.ResultIndex
    }
    return selectedFlight?.ResultIndex === data?.ResultIndex
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onSelect()} style={[styles.container, { backgroundColor: isActive() ? '#fff8f7' : Colors.white }]}>
      <View style={styles.childContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../../../assests/images/airpot.png')} style={{ width: 18, height: 18 }} />
          <Text style={{ ...Fonts._11MontserratMedium, marginLeft: Sizes.fixHorizontalPadding * 0.5, fontSize: 9 }}>{data?.Segments[0][0]?.Airline?.AirlineName}</Text>
        </View>
        <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: 12 }}>{showNumber(data?.Fare?.BaseFare + data?.Fare?.Tax)}</Text>
      </View>
      <View style={[styles.childContainer, { marginVertical: Sizes.fixPadding }]}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: 12 }}>{moment(data?.Segments[0][0]?.Origin?.DepTime).format('hh:mm')}</Text>
          <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: 12 }}>{moment(data?.Segments[0][0]?.Origin?.DepTime).format('A')}</Text>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ ...Fonts._11MontserratMedium }}>{formatFlightTime(data?.Segments[0][0]?.Duration)}</Text>
          <MaterialIcons name='flight-takeoff' color={Colors.black} size={20} />
          <Text style={{ ...Fonts._11MontserratMedium }}>Non Stop</Text>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: 12 }}>{moment(data?.Segments[0][0]?.Destination?.ArrTime).format('hh:mm')}</Text>
          <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: 12 }}>{moment(data?.Segments[0][0]?.Destination?.ArrTime).format('A')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const mapStateToProps = state => ({
  selectedFlight: state.flightReducer.selectedFlight,
  selectedReturnFlight: state.flightReducer.selectedReturnFlight,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ReturnFlights)

const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'center',
    borderWidth: 1,
    marginBottom: Sizes.fixPadding,
    borderColor: Colors.primaryTheme,
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding * 0.5,
    paddingHorizontal: Sizes.fixPadding * 0.2
  },
  childContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})