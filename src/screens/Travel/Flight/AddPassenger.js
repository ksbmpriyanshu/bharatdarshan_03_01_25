import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
    Platform,
    UIManager,
    LayoutAnimation,
  } from "react-native";
  import React, { useCallback, useEffect, useState } from "react";
  import { Colors, Fonts, Sizes, getFontSize } from "../../../assests/style";
  import MyStatusBar from "../../../components/StatusBar";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import { CheckBox, Input } from "@rneui/themed";
  import moment from "moment";
  import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
  import Footer from "./components/Footer";
  import { connect } from "react-redux";
  import * as FlightActions from "../../../redux/actions/FlightActions";
  import FlightOriginDestination from "./components/FlightOriginDestination";
  import { navigate } from "../../../navigations/NavigationServices";
  import { showToastMessage } from "../../../utils/services";
  
  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  
  const AdultTitle = ["Mr", "Mrs", "Ms"];
  const ChildInfantsTitle = ["Mstr", "Miss"];
  
  const AddPassenger = ({
    passengers,
    dispatch,
    flightData,
    returnFlightData,
    navigation
  }) => {
    const [localPassengers, setLocalPassengers] = useState(passengers);
    const [isPassportRequired, setIsPassportRequired] = useState(false);
    const [
      IsPassportFullDetailRequiredAtBook,
      setIsPassportFullDetailRequiredAtBook,
    ] = useState(false);
  
    useEffect(() => {
      checkIsPassportRequired();
    }, []);
  
    useEffect(() => {
      setLocalPassengers(passengers);
    }, [passengers]);
  
    const checkIsPassportRequired = () => {
      if (flightData) {
        if (
          flightData?.Results?.IsPassportRequiredAtBook ||
          flightData?.Results?.IsPassportRequiredAtTicket
        ) {
          setIsPassportRequired(true);
        }
        if (flightData?.Results?.IsPassportFullDetailRequiredAtBook) {
          setIsPassportFullDetailRequiredAtBook(true);
        }
      }
      if (returnFlightData) {
        if (
          returnFlightData?.Results?.IsPassportRequiredAtBook ||
          returnFlightData?.Results?.IsPassportRequiredAtTicket
        ) {
          setIsPassportRequired(true);
        }
        if (returnFlightData?.Results?.IsPassportFullDetailRequiredAtBook) {
          setIsPassportFullDetailRequiredAtBook(true);
        }
      }
    };
  
    const getTotalPassenger = () => passengers.length;
  
    const getFilledPassenger = () =>
      passengers.filter(
        (passenger) =>
          passenger.firstName &&
          passenger.lastName &&
          (passenger?.type != "Adult" ? !!passenger?.dob : true)
      ).length;
  
    const updatePassenger = (index, updatedField) => {
      const updatedPassengers = [...localPassengers];
      updatedPassengers[index] = { ...updatedPassengers[index], ...updatedField };
      setLocalPassengers(updatedPassengers);
      dispatch(FlightActions.setFilightPassenger(updatedPassengers));
    };
  
    const updateOpened = useCallback(
      (index, value) => {
        LayoutAnimation.configureNext({
          duration: 250,
          create: { type: "linear", property: "opacity" },
          update: { type: "linear", property: "scaleY" },
          delete: { type: "linear", property: "opacity" },
        });
        updatePassenger(index, { opened: value });
      },
      [localPassengers, dispatch]
    );
  
    const onDatePicker = (item, index) => {
      const today = new Date();
      let minDate = new Date(
        today.getFullYear() - 12,
        today.getMonth(),
        today.getDate()
      );
      let maxDate = new Date(
        today.getFullYear() - 3,
        today.getMonth(),
        today.getDate()
      );
  
      if (item?.type === "Infant") {
        minDate = new Date(
          today.getFullYear() - 3,
          today.getMonth(),
          today.getDate()
        );
        maxDate = new Date(
          today.getFullYear() - 0,
          today.getMonth(),
          today.getDate()
        );
      }
  
      if (item?.type === "Adult") {
        minDate = new Date(
          today.getFullYear() - 110,
          today.getMonth(),
          today.getDate()
        );
        maxDate = new Date(
          today.getFullYear() - 18,
          today.getMonth(),
          today.getDate()
        );
      }
  
      DateTimePickerAndroid.open({
        value: item?.dob ? item?.dob : new Date(),
        display: "calendar",
        mode: "date",
        minimumDate: minDate,
        maximumDate: maxDate,
        onChange: (event, selectedDate) => {
          if (event.type === "set") {
            updatePassenger(index, { dob: selectedDate });
          }
        },
      });
    };
  
    const onPassportExpiryDate = (item, index) => {
      DateTimePickerAndroid.open({
        value: item?.PassportExpiry ? item?.PassportExpiry : new Date(),
        display: "calendar",
        mode: "date",
        minimumDate: new Date(),
        onChange: (event, selectedDate) => {
          if (
            new Date(selectedDate) <= new Date(flightData.Results.LastTicketDate)
          ) {
            showToastMessage({
              message: "Passport can not be expired before ticket date.",
            });
          }
          if (event.type === "set") {
            updatePassenger(index, { PassportExpiry: selectedDate });
          }
        },
      });
    };
  
    const onPassportIssueDate = (item, index) => {
      DateTimePickerAndroid.open({
        value: item?.PassportIssueDate ? item?.PassportIssueDate : new Date(),
        display: "calendar",
        mode: "date",
        // minimumDate: new Date(),
        maximumDate: new Date(),
        onChange: (event, selectedDate) => {
          if (event.type === "set") {
            updatePassenger(index, { PassportIssueDate: selectedDate });
          }
        },
      });
    };
  
    const renderItem = useCallback(
      ({ item, index }) => (
        <View style={styles.itemContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => updateOpened(index, !item.opened)}
            style={styles.header}
          >
            <Text style={{ ...Fonts._14MontserratMedium }}>
              {item?.type} {item?.value}
            </Text>
            <Ionicons
              name={!item.opened ? "chevron-down" : "chevron-up"}
              color={Colors.grayDark}
              size={20}
            />
          </TouchableOpacity>
          {item?.opened && (
            <>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {item.type == "Adult"
                  ? AdultTitle.map((ele) => (
                      <CheckBox
                        key={ele}
                        title={`${ele}.`}
                        checked={item?.genderType === ele}
                        onPress={() =>
                          updatePassenger(index, { genderType: ele })
                        }
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                      />
                    ))
                  : ChildInfantsTitle.map((ele) => (
                      <CheckBox
                        key={ele}
                        title={`${ele}.`}
                        checked={item?.genderType === ele}
                        onPress={() =>
                          updatePassenger(index, { genderType: ele })
                        }
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                      />
                    ))}
              </View>
              <Input
                label={"First Name"}
                value={item?.firstName}
                placeholder="First Name and middle Name"
                inputStyle={styles.inputStyle}
                placeholderTextColor={Colors.grayA}
                inputContainerStyle={styles.inputContainerStyle}
                containerStyle={styles.containerStyle}
                labelStyle={styles.labelStyle}
                onChangeText={(text) =>
                  updatePassenger(index, { firstName: text })
                }
              />
              <Input
                label={"Last Name"}
                value={item?.lastName}
                placeholder="Last Name"
                inputStyle={styles.inputStyle}
                placeholderTextColor={Colors.grayA}
                inputContainerStyle={styles.inputContainerStyle}
                containerStyle={styles.containerStyle}
                labelStyle={styles.labelStyle}
                onChangeText={(text) =>
                  updatePassenger(index, { lastName: text })
                }
              />
              {(isPassportRequired || item?.type != "Adult") && (
                <TouchableOpacity
                  onPress={() => onDatePicker(item, index)}
                  activeOpacity={0.8}
                >
                  <Input
                    label={"Date Of Birth"}
                    value={item.dob ? moment(item?.dob).format("DD/MM/YYYY") : ""}
                    placeholder="Select Date"
                    editable={false}
                    inputStyle={styles.inputStyle}
                    placeholderTextColor={Colors.grayA}
                    inputContainerStyle={styles.inputContainerStyle}
                    containerStyle={styles.containerStyle}
                    labelStyle={styles.labelStyle}
                  />
                </TouchableOpacity>
              )}
  
              {isPassportRequired && item?.type != "Infant" && (
                <>
                  <Input
                    label={"Passport Number"}
                    value={item?.PassportNo}
                    placeholder="Passport Number"
                    inputStyle={styles.inputStyle}
                    placeholderTextColor={Colors.grayA}
                    inputContainerStyle={styles.inputContainerStyle}
                    containerStyle={styles.containerStyle}
                    labelStyle={styles.labelStyle}
                    onChangeText={(text) =>
                      updatePassenger(index, { PassportNo: text })
                    }
                  />
                  <TouchableOpacity
                    onPress={() => onPassportExpiryDate(item, index)}
                    activeOpacity={0.8}
                  >
                    <Input
                      label={"Passport Expiry Date"}
                      value={
                        item.PassportExpiry
                          ? moment(item?.PassportExpiry).format("DD/MM/YYYY")
                          : ""
                      }
                      placeholder="Select Date"
                      editable={false}
                      inputStyle={styles.inputStyle}
                      placeholderTextColor={Colors.grayA}
                      inputContainerStyle={styles.inputContainerStyle}
                      containerStyle={styles.containerStyle}
                      labelStyle={styles.labelStyle}
                    />
                  </TouchableOpacity>
                  {IsPassportFullDetailRequiredAtBook && (
                    <TouchableOpacity
                      onPress={() => onPassportIssueDate(item, index)}
                      activeOpacity={0.8}
                    >
                      <Input
                        label={"Passport Issue Date"}
                        value={
                          item.PassportIssueDate
                            ? moment(item?.PassportIssueDate).format("DD/MM/YYYY")
                            : ""
                        }
                        placeholder="Select Date"
                        editable={false}
                        inputStyle={styles.inputStyle}
                        placeholderTextColor={Colors.grayA}
                        inputContainerStyle={styles.inputContainerStyle}
                        containerStyle={styles.containerStyle}
                        labelStyle={styles.labelStyle}
                      />
                    </TouchableOpacity>
                  )}
                </>
              )}
  
              <TouchableOpacity style={styles.saveButtonStyle}>
                <Text
                  style={{
                    ...Fonts._14MontserratMedium,
                    textAlign: "center",
                    color: Colors.primaryTheme,
                  }}
                >
                  Save Details
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      ),
      [updateOpened, localPassengers, isPassportRequired, IsPassportFullDetailRequiredAtBook]
    );
  
    return (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <MyStatusBar
          backgroundColor={Colors.primaryTheme}
          barStyle="light-content"
        />
        <View style={{ flex: 1 }}>
          {headerInfo()}
          {warningInfo()}
          <FlatList
            ListHeaderComponent={
              <>
                <FlightOriginDestination />
                {/* <Text
                  onPress={() => navigate("flightSsr")}
                  style={{ ...Fonts._18MontserratMedium }}
                >
                  SSR
                </Text> */}
                {adultsPassengerInfo()}
              </>
            }
            contentContainerStyle={{ padding: Sizes.fixPadding }}
          />
        </View>
        <Footer
          disabled={!(getTotalPassenger() == getFilledPassenger())}
          routeName={"flightReview"}
        />
      </View>
    );
  
    function adultsPassengerInfo() {
      return <FlatList data={localPassengers} renderItem={renderItem} />;
    }
  
    function warningInfo() {
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: Sizes.fixHorizontalPadding,
            paddingVertical: Sizes.fixPadding * 0.2,
            backgroundColor: "#fff1e3",
          }}
        >
          <Ionicons
            name="information-circle-outline"
            color={Colors.black}
            size={20}
          />
          <Text
            style={{
              ...Fonts._11MontserratMedium,
              marginLeft: Sizes.fixPadding * 0.3,
            }}
          >
            Name must be as per Government ID Proof
          </Text>
        </View>
      );
    }
  
    function headerInfo() {
      return (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: Sizes.fixHorizontalPadding * 2,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity 
            onPress={() => navigation.goBack()}
            >
              <Image
                source={require("../../../assests/icons/back_arrow.png")}
                style={{ width: 24, height: 24, resizeMode: "contain" }}
              />
            </TouchableOpacity>
            <Text
              style={{
                ...Fonts._16MontserratMedium,
                marginLeft: Sizes.fixHorizontalPadding * 2,
              }}
            >
              Add Passenger Details
            </Text>
          </View>
          <View style={{ alignSelf: "flex-end" }}>
            <Text
              style={{ ...Fonts._13MontserratMedium, color: Colors.primaryTheme }}
            >{`${getFilledPassenger()}/${getTotalPassenger()} Added`}</Text>
          </View>
        </View>
      );
    }
  };
  
  const mapStateToProps = (state) => ({
    passengers: state.flightReducer.passengers,
    flightData: state.flightReducer.flightData,
    returnFlightData: state.flightReducer.returnFlightData,
  });
  
  const mapDispatchToProps = (dispatch) => ({ dispatch });
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddPassenger);
  
  const styles = StyleSheet.create({
    itemContainer: {
      marginTop: Sizes.fixPadding,
      borderWidth: 0.2,
      borderRadius: Sizes.fixPadding,
      elevation: 2,
      backgroundColor: Colors.white,
      shadowColor: Colors.grayB,
      borderColor: Colors.grayC,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#fff8f7",
      borderRadius: Sizes.fixPadding,
      padding: Sizes.fixPadding,
    },
    inputStyle: {
      ...Fonts._14MontserratMedium,
    },
    inputContainerStyle: {
      borderBottomWidth: 1,
      borderColor: Colors.grayC,
    },
    containerStyle: {},
    labelStyle: {
      ...Fonts._14MontserratMedium,
      color: Colors.primaryTheme,
    },
    saveButtonStyle: {
      borderWidth: 1,
      paddingVertical: Sizes.fixPadding,
      borderRadius: Sizes.fixPadding,
      marginHorizontal: Sizes.fixPadding,
      borderColor: Colors.primaryTheme,
      marginBottom: Sizes.fixPadding,
    },
  });
  