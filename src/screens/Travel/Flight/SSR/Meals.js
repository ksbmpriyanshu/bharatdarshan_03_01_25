import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Colors, Fonts, Sizes } from '../../../../assests/style'
import FlightTabs from './components/FlightTabs'
import Persons from './components/Persons'
import MealLists from './components/MealLists'
import Footer from '../components/Footer'
import { connect } from 'react-redux'
import * as FlightActions from '../../../../redux/actions/FlightActions'

const Meals = ({ route, dispatch }) => {
  useEffect(() => {
    dispatch(FlightActions.setActiveSsrTab(route.name))
  }, [])
  return (
    <View style={{ flex: 1, backgroundColor: Colors.grayF }}>
      <FlightTabs />
      <Persons />
      <MealLists />
      <Footer routeName={'baggage'} />
    </View>
  )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Meals)