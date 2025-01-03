import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Colors, Fonts, SCREEN_WIDTH, Sizes } from "../../../../assests/style";
import Footer from "../components/Footer";
import Header from "./components/Header";
import FlightTabs from "./components/FlightTabs";
import { RowSeats } from "../../../../config/data";
import { connect } from "react-redux";
import * as FlightActions from '../../../../redux/actions/FlightActions'
import FlightSeats from "./components/FlightSeats";
import Persons from "./components/Persons";

const Seats = ({ route, dispatch, flightSsrData }) => {
  useEffect(() => {
    dispatch(FlightActions.setActiveSsrTab(route.name))
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: Colors.grayF }}>
      <Header title={"Select your seats"} />
      <FlightTabs />
      <Persons />
      <View style={{ flex: 1 }}>
        <FlightSeats />
      </View>
      <Footer routeName={'meals'} />
    </View>
  );

};

const mapStateToProps = state => ({
  flightSsrData: state.flightReducer.flightSsrData,
  returnFlightSsrData: state.flightReducer.returnFlightSsrData,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Seats);
