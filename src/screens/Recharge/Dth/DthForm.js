import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Colors,
  SCREEN_WIDTH,
  Sizes,
  Fonts,
  getFontSize,
  SCREEN_HEIGHT,
} from "../../../assests/style";
import MyStatusBar from "../../../components/StatusBar";
import Header from "../../../components/Header";
import Button from "../../../components/Button";
import { navigate } from "../../../navigations/NavigationServices";

import AntDesign from "react-native-vector-icons/AntDesign";
import { connect } from "react-redux";
import * as RechargeActions from "../../../redux/actions/RechargeActions";
import { BottomSheet } from "@rneui/themed";
import Loader2 from "../../../components/Loader2";
import { showToastMessage } from "../../../utils/services";



const DthForm = ({ route, dispatch, dthCircleData, rechargeRequestFields }) => {
  console.log(route.params)
  const [customerid, setCustomerId] = useState("");
  const [circle, setCircle] = useState("");
  const [circleModal, setCircleModal] = useState(false);
  const [dthModal, setDthModal] = useState(false);
  const [dthModalactive, setDthModalactive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ValidNumber, setValidNumber] = useState(false);
  const [fields, setFields] = useState(null);
  const dthdata = route.params;

  useEffect(() => {
    dispatch(RechargeActions.getRechargeRequestFields(dthdata?.OperatorCode))
  }, [])

  useEffect(() => {
    setFields(rechargeRequestFields?.Request)
  }, [rechargeRequestFields])


  const determineMaxLength = (OperatorCode) => {
    switch (OperatorCode) {
      case "DTD":
      case "ATD":
      case "TSD":
        return 10;
      case "SD":
        return 11;
      case "VDD":
        return 14;
      default:
        return 12;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar
        backgroundColor={Colors.primaryTheme}
        barStyle={"light-content"}
      />
      <Loader2 isLoading={loading} />
      <Header title={"DTH Customer "} tintColor={Colors.white} />
      <View style={{ padding: Sizes.fixPadding }}>
        {operatorname()}
        {fields && customerdetails()}
        {infotext()}
      </View>
      {filterMOdal()}
      {wrongDthNumber()}
      {ActiveDthNumber()}
      {proceedbtn()}
    </SafeAreaView>
  );
  function wrongDthNumber() {
    return (
      <BottomSheet
        isVisible={dthModal}
        onBackdropPress={() => setDthModal(false)}
      >
        <View style={styles.maincontainer}>
          <Image
            source={require("../../../assests/images/vehiclenumber.png")}
            style={{
              height: SCREEN_WIDTH * 0.5,
              width: SCREEN_WIDTH * 0.65,
              resizeMode: "contain",
              alignSelf: "center",
            }}
          />
          <View
            style={{
              paddingVertical: Sizes.fixPadding,
              borderBottomWidth: 1,
              borderColor: "#848484",
            }}
          >
            <Text
              style={{
                ...Fonts._16MontserratMedium,
                textAlign: "center",
                bottom: Sizes.fixPadding * 0.7,
              }}
            >
              Invalid Customer ID
            </Text>
          </View>
          <Text
            style={{
              textAlign: "center",
              ...Fonts._18MontserratRegular,
              color: "#378338",
              paddingVertical: Sizes.fixPadding,
            }}
            onPress={() => setDthModal(false)}
          >
            Try again
          </Text>
        </View>
      </BottomSheet>
    );
  }

  function ActiveDthNumber() {
    return (
      <BottomSheet
        isVisible={dthModalactive}
        onBackdropPress={() => setDthModalactive(false)}
      >
        <View style={styles.maincontainer}>
          <Image
            source={require("../../../assests/images/vehiclenumber.png")}
            style={{
              height: SCREEN_WIDTH * 0.5,
              width: SCREEN_WIDTH * 0.65,
              resizeMode: "contain",
              alignSelf: "center",
            }}
          />
          <View
            style={{
              paddingVertical: Sizes.fixPadding,
              borderBottomWidth: 1,
              borderColor: "#848484",
            }}
          >
            <Text
              style={{
                ...Fonts._16MontserratMedium,
                textAlign: "center",
                bottom: Sizes.fixPadding * 0.7,
              }}
            >
              InActive Customer ID
            </Text>
          </View>
          <Text
            style={{
              textAlign: "center",
              ...Fonts._18MontserratRegular,
              color: "#378338",
              paddingVertical: Sizes.fixPadding,
            }}
            onPress={() => setDthModalactive(false)}
          >
            Try again
          </Text>
        </View>
      </BottomSheet>
    );
  }

  function filterMOdal() {
    const handlepress = (item) => {
      setCircle(item);

      setCircleModal(false);
    };

    return (
      <BottomSheet
        isVisible={circleModal}
        onBackdropPress={() => setCircleModal(false)}
      >
        <View style={[styles.modalContainer, { height: 400 }]}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../../../assests/images/homerectangle.png")}
              tintColor={"#E0DCDC"}
            />
          </View>

          <View
            style={{
              marginBottom: Sizes.fixPadding * 1.5,
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <Text style={{ ...Fonts._20MontserratMedium, letterSpacing: 0.6 }}>
              Select Your State
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setCircleModal(false)}
              style={{ marginRight: 5 }}
            >
              <AntDesign
                name="closecircleo"
                color={Colors.black}
                size={Sizes.fixPadding * 1.3}
              />
            </TouchableOpacity>
          </View>

          <ScrollView>
            <View style={{}}>
              {dthCircleData?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    marginBottom: 10,
                    borderBottomWidth: 1,
                    paddingVertical: Sizes.fixPadding * 0.5,
                    borderColor: "#00000030",
                  }}
                  onPress={() => handlepress(item)}
                >
                  <Text
                    style={{
                      ...Fonts._14MontserratMedium,
                      textAlign: "center",
                      textTransform: "capitalize",
                    }}
                  >
                    {item.circlename}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </BottomSheet>
    );
  }

  function proceedbtn() {
    const handlesubmit = () => {
      if (fields[0]?.Value.length === 0 || fields[0]?.Value === 'Enter Value') {
        showToastMessage({ message: `${fields[0]?.Key} is required` })
        return
      }

      const payload = {
        number: fields[0]?.Value ,
        operator: dthdata?.OperatorCode
      }
      console.log({data: payload, dthdata})
      dispatch(RechargeActions.getDthBillDetails({data: payload, dthData: dthdata}))

    };
    return (
      <View style={styles.proceedButtonContainer}>
        <Button
          title={"PROCEED"}
          // onPress={() => navigate('Dthrecharge',{customerid,dthdata,circle})}
          onPress={() => handlesubmit()}
        />
      </View>
    );
  }

  function infotext() {
    const maxLength = determineMaxLength(dthdata?.OperatorCode);
    return (
      !ValidNumber && (
        <View style={{ alignSelf: "flex-end", marginTop: 5 }}>
          <Text
            style={{
              ...Fonts._11MontserratRegular,
              color:
                customerid && (customerid.length < 10 || customerid.length > 12)
                  ? Colors.redA
                  : "#686464",
            }}
          >
            Customer Id (2-14 digits)
          </Text>
        </View>
      )

    );
  }

  function customerdetails() {

    const handleInputChange = (index, newValue) => {
      const newDataArray = [...fields];
      newDataArray[index].Value = newValue;
      setFields(newDataArray);
    };

    const renderItem = ({ item, index }) => {
      return <View style={{
        borderRadius: 10,
        backgroundColor: "#FCF2F2",
        marginTop: Sizes.fixPadding * 1.5,
      }}>
        <TextInput
          // value={''}
          onChangeText={(newValue) => handleInputChange(index, newValue)}
          placeholder={`${item?.Key} ${item?.isOptional === 'True' ? '(Optional)' : ''}`}
          cursorColor={Colors.black}
          placeholderTextColor={"#686464"}
          keyboardType="number-pad"
          multiline={false}
          numberOfLines={1}
          style={{
            paddingHorizontal: Sizes.fixHorizontalPadding * 2,
            color: Colors.black,
          }}
        />
      </View>
    }
    return (
      <FlatList data={[fields[0]]} renderItem={renderItem} />
    );
  }

  function operatorname() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              ...Fonts._14MontserratMedium,
              color: "#686464",
              fontSize: getFontSize(15),
            }}
          >
            Operator Details 1
          </Text>
          <Text style={{ ...Fonts._18MontserratRegular }}>
            {dthdata?.OperatorName}
          </Text>
        </View>
        <Image
          source={{ uri: dthdata?.operatorImage }}
          style={{ height: SCREEN_WIDTH * 0.2, width: SCREEN_WIDTH * 0.2 }}
        />
      </View>
    );
  }
};
const mapStateToProps = (state) => ({
  dthCircleData: state.rechargeReducer.dthCircleData,
  rechargeRequestFields: state.rechargeReducer.rechargeRequestFields,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DthForm);

const styles = StyleSheet.create({
  proceedButtonContainer: {
    position: "absolute",
    bottom: Sizes.fixPadding,
    width: "100%",
    paddingHorizontal: Sizes.fixHorizontalPadding * 2,
  },
  modalContainer: {
    backgroundColor: Colors.white,
    padding: Sizes.fixHorizontalPadding * 3,
    borderTopRightRadius: Sizes.fixHorizontalPadding * 3,
    borderTopLeftRadius: Sizes.fixHorizontalPadding * 3,
  },
  maincontainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  rightIcon: {
    ...Fonts._12MontserratRegular,
    color: Colors.primaryTheme,
  },
});
