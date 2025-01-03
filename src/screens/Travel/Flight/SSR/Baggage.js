import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import Header from './components/Header'
import * as FlightActions from '../../../../redux/actions/FlightActions'
import { connect } from 'react-redux'
import FlightTabs from './components/FlightTabs'
import Persons from './components/Persons'
import { Colors, Fonts, Sizes } from '../../../../assests/style'
import { showNumber } from '../../../../utils/services'
import BaggageList from './components/BaggageList'

const Baggage = ({ route, dispatch }) => {
  useEffect(() => {
    dispatch(FlightActions.setActiveSsrTab(route.name))
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <Header title={'Excess Baggage'} />
      <FlightTabs />
      <Persons />
      <View style={{ flex: 1, backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.grayE }}>
        <FlatList
          ListHeaderComponent={<>
            <BaggageList />
          </>}
        />
      </View>
      <Footer />
    </View>
  )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Baggage)