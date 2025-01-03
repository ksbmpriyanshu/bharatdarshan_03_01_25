import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../../../assests/style'
import MyStatusBar from '../../../../components/StatusBar'
import Tabs from './components/Tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Seats from './Seats'
import Meals from './Meals'
import Baggage from './Baggage'
import { connect } from 'react-redux'

const Stack = createNativeStackNavigator();

const FlightSsr = ({ flightSsrData, returnFlightSsrData }) => {
  const [state, setState] = useState()
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle='light-content' />
      <Tabs />
      <View style={{ flex: 1 }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name='seats' component={Seats} />
          <Stack.Screen name='meals' component={Meals} />
          <Stack.Screen name='baggage' component={Baggage} />
        </Stack.Navigator>

      </View>
    </View>
  )

}

const mapStateToProps = state => ({
  flightSsrData: state.flightReducer.flightSsrData,
  returnFlightSsrData: state.flightReducer.returnFlightSsrData,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(FlightSsr)