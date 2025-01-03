import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { Colors, Fonts } from '../../../assests/style'
import MyStatusBar from '../../../components/StatusBar'
import Header from '../../../components/Header'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FlightTrips from './FlightTrips'
import BusTrips from './BusTrips'
import { connect } from 'react-redux'
import * as FlightActions from '../../../redux/actions/FlightActions'

const Tab = createMaterialTopTabNavigator();

const MyTrips = ({ dispatch }) => {
    useEffect(()=>{
        dispatch(FlightActions.getBookedFlight())
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle='light-content' />
            <Header title={'My Trips '} tintColor={Colors.white} />
            <View style={{ flex: 1 }}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarStyle: {
                            backgroundColor: Colors.primaryTheme,
                        },
                        tabBarIndicatorStyle: { backgroundColor: Colors.white, height: 3, borderRadius: 1000 }
                    }}
                >
                    <Tab.Screen name="flightTrips" component={FlightTrips} options={{ tabBarLabelStyle: { ...Fonts._14MontserratMedium, color: Colors.white, textTransform: 'capitalize' }, tabBarLabel: 'Flight' }} />
                    <Tab.Screen name="busTrips" component={BusTrips} options={{ tabBarLabelStyle: { ...Fonts._14MontserratMedium, color: Colors.white, textTransform: 'capitalize' }, tabBarLabel: 'Bus' }} />
                </Tab.Navigator>
            </View>
        </View>
    )
}

const mapStateToProps = state => ({
    isLoading: state.common.isLoading
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(MyTrips)