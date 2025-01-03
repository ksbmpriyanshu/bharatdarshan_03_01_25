import { View, Text, FlatList, TouchableOpacity, Image, Platform, UIManager, LayoutAnimation } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Fonts, Sizes, getFontSize } from '../../../assests/style'
import MyStatusBar from '../../../components/StatusBar'
import Footer from './components/Footer'
import PrimaryContacts from './components/PrimaryContacts'
import BaggageCancellation from './components/BagageCancellation'
import PrimaryContatctEdit from './components/PrimaryContatctEdit'
import { connect } from 'react-redux'
import * as FlightActions from '../../../redux/actions/FlightActions'
import moment from 'moment'
import FlightOriginDestination from './components/FlightOriginDestination'
import TravellerDetailsSimmer from './components/TravellerDetailsSimmer'
import { navigate } from '../../../navigations/NavigationServices'

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FlightTravelDetails = ({ dispatch, route, flightData, simmerVisible, navigation }) => {
  const [state, setState] = useState({
    primaryContactEditVisible: false,
  })

  useEffect(() => {
    dispatch(FlightActions.getFlightData(route.params))
    return () => {
      dispatch(FlightActions.setFlightData(null))
      dispatch(FlightActions.setFlightReturnData(null))
    }

  }, [])

  useEffect(()=>{
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [simmerVisible])

  const updateState = data => {
    setState(prevState => {
      const newData = { ...prevState, ...data }
      return newData
    })
  }

  const { primaryContactEditVisible } = state

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle='light-content' />
      <View style={{ flex: 1 }}>
        {headerInfo()}
        <FlatList
          ListHeaderComponent={
            <>
              <FlightOriginDestination />
              <BaggageCancellation />
              <PrimaryContacts updateState={updateState} />
             
            </>
          }
          contentContainerStyle={{ padding: Sizes.fixPadding }}
        />
      </View>
      <Footer routeName={'addPassenger'} />
      <PrimaryContatctEdit visible={primaryContactEditVisible} updateState={updateState} />
      <TravellerDetailsSimmer visible={simmerVisible} />
    </View>
  )

  function headerInfo() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: Sizes.fixHorizontalPadding * 2 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assests/icons/back_arrow.png')} style={{ width: 24, height: 24, resizeMode: 'contain' }} />
        </TouchableOpacity>
        <Text style={{ ...Fonts._16MontserratMedium, marginLeft: Sizes.fixHorizontalPadding * 2 }}>Traveller details</Text>
      </View>
    )
  }

}

const mapStateToProps = state => ({
  flightData: state.flightReducer.flightData,
  simmerVisible: state.common.simmerVisible,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(FlightTravelDetails)