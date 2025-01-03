import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { showNumber, showToastMessage } from "../../../../utils/services";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts, Sizes } from "../../../../assests/style";
import { navigate } from "../../../../navigations/NavigationServices";
import { connect } from "react-redux";
import * as FlightActions from "../../../../redux/actions/FlightActions";

const Footer = ({
  routeName,
  params = {},
  flightData,
  disabled = false,
  dispatch,
  primaryContact,
  returnFlightData,
  title = "Continue",
}) => {
  const getPrice = () => {
    let price = 0;
    if (flightData) {
      price +=
        flightData?.Results?.Fare?.BaseFare + flightData?.Results?.Fare?.Tax;
    }
    if (returnFlightData) {
      price +=
        returnFlightData?.Results?.Fare?.BaseFare +
        returnFlightData?.Results?.Fare?.Tax;
    }
    return price;
  };
  console.log("sdljfhouisdfo", flightData)

  const onContinue = () => {
    if (routeName == "addPassenger") {
      if (
        Object.keys(primaryContact).filter((ele) => primaryContact[ele] == "")
          .length != 0
      ) {
        showToastMessage({ message: "Please enter your contact details" });
        return;
      }
      navigate(routeName, params);
    } else if (routeName) {
      navigate(routeName, params);
    } else {
      dispatch(FlightActions.bookFlight());
    }
  };
  return (
    <View
      style={{
        elevation: 8,
        backgroundColor: Colors.white,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: Sizes.fixPadding,
      }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ ...Fonts._11MontserratMedium }}>Fare Breakup</Text>
        <Text style={{ ...Fonts._16MontserratMedium }}>
          {showNumber(getPrice())}{" "}
          {/* <Ionicons name="chevron-down" color={Colors.black} /> */}
        </Text>
      </View>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.8}
        onPress={() => onContinue()}
        style={{
          backgroundColor: disabled ? Colors.grayA : Colors.primaryTheme,
          width: "40%",
          paddingVertical: Sizes.fixPadding * 0.9,
          borderRadius: Sizes.fixPadding * 0.5,
        }}
      >
        <Text
          style={{
            ...Fonts._14MontserratMedium,
            textAlign: "center",
            color: Colors.white,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => ({
  flightData: state.flightReducer.flightData,
  returnFlightData: state.flightReducer.returnFlightData,
  primaryContact: state.flightReducer.primaryContact,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
