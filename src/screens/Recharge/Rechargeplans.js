import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
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
} from "../../assests/style";
import MyStatusBar from "../../components/StatusBar";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { BottomSheet, Input } from "@rneui/themed";
import { navigate } from "../../navigations/NavigationServices";
import { connect } from "react-redux";
import Loader from "../../components/Loader";

const Rechargeplans = ({ route, rechargeData, navigation }) => {
  const { mobileData, planData, adminNumber, adminMobile, adminName } = route.params || {};
  console.log("adminNumber", adminName)
  const [filterTabs, setFilterTabs] = useState(["ALL"]);

  const userdata = route.params?.data;
  const [rechargePlan, setRechargePlan] = useState(
    adminNumber === 'admin' ? rechargeData?.data?.PlanData : planData?.operatorData?.PlanDescription
  );

  const rechargeOperatorCode = rechargeData?.data?.operatorData?.OperatorCode;
  const rechargeCircleCode = rechargeData?.data?.CircleName?.circlecode;
  const rechargephonenumber = route.params?.phone;
  const [pressedItem, setPressedItem] = useState("All");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  console.log('contact :::', mobileData);

  useEffect(() => {
    getFilters();
  }, []);

  const handleFliter = (data) => {
    setPressedItem(data);
    setLoading(true);
    if (data == "All") {
      setRechargePlan(planData?.operatorData?.PlanDescription);
    } else {
      const filteredData = planData?.operatorData?.PlanDescription.filter(function (item) {
        return item.recharge_type === data;
      });

      setRechargePlan(filteredData);
    }
  };

  const handleSearch = (text) => {
    setSearchTerm(text);

    if (!text) {
      // If search text is empty, show all plans
      setRechargePlan(planData?.operatorData?.PlanDescription);
      return;
    }

    const lowerCaseText = text.toLowerCase();
    const filteredData = planData?.operatorData?.PlanDescription.filter((item) => {
      return (
        item.recharge_amount.toString().includes(text) || // Match recharge amount
        (item.data && item.data.toLowerCase().includes(lowerCaseText)) || // Match data description
        (item.recharge_long_desc &&
          item.recharge_long_desc.toLowerCase().includes(lowerCaseText)) // Match long description
      );
    });

    setRechargePlan(filteredData);
  };

  const getFilters = () => {
    if (planData?.operatorData?.PlanDescription) {
      const rechargeMap = planData?.operatorData?.PlanDescription.map((item) => {
        const data = item.recharge_type;
        return data;
      });
      const uniqueValuesSet = new Set(rechargeMap);
      const result = Array.from(uniqueValuesSet);
      setFilterTabs(["All", ...result]);
    }

  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar
        backgroundColor={Colors.primaryTheme}
        barStyle={"light-content"}
      />
      <Loader isVisible={loading} />
      {Header()}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <FlatList
            ListHeaderComponent={
              <>
                {InputField()}
                {datapacklist()}
                {/* {items()} */}
                {packsdetails()}
              </>
            }
            showsVerticalScrollIndicator={false}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

  function packsdetails() {
    const renderItems = ({ item }) => {
      // console.log(item,'rechargeplans ')

      return (
        <TouchableOpacity
          style={{
            borderBottomWidth: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: 100,
            marginHorizontal: Sizes.fixHorizontalPadding * 1.5,
            borderColor: Colors.grayC,
          }}
          onPress={() =>
            navigate("payment", {
              planData: item,
              mobileData,
              opertatorData: planData?.mobileOperator
            })
          }
        >
          <View
            style={{
              width: "15%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ ...Fonts._16MontserratRegular }}>
              {"₹"}
              {item?.recharge_amount}
            </Text>
          </View>
          <View style={{ width: "70%" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: Sizes.fixHorizontalPadding * 2,
              }}
            >
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text
                  style={{ ...Fonts._13MontserratRegular, color: Colors.grayA }}
                >
                  Validity
                </Text>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                {/* <Text style={{ ...Fonts._13MontserratRegular, color: Colors.grayA }}>Data</Text>
                                <Text style={{ ...Fonts._13MontserratRegular }}>{item?.data}</Text> */}
                <Text
                  style={{
                    ...Fonts._13MontserratRegular,
                    color: Colors.primaryTheme,
                  }}
                >
                  {item?.recharge_validity}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: Sizes.fixPadding * 0.4 }}>
              <Text
                style={{
                  ...Fonts._13MontserratRegular,
                  color: Colors.grayA,
                  textAlign: "left",
                }}
                numberOfLines={2}
              >
                {item?.recharge_long_desc}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "10%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assests/icons/rightarrow.png")}
              style={{
                height: SCREEN_WIDTH * 0.05,
                width: SCREEN_WIDTH * 0.05,
                resizeMode: "contain",
              }}
            />
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View style={{ marginTop: Sizes.fixPadding * 0.2 }}>
        <FlatList
          data={rechargePlan}
          renderItem={renderItems}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}
          ListEmptyComponent={() => {
            return (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{
                    ...Fonts._14MontserratRegular,
                    color: Colors.grayA,
                    marginTop: Sizes.fixPadding * 0.5,
                  }}
                >
                  No Data Found
                </Text>
              </View>
            );
          }}
        />
      </View>
    );
  }

  function datapacklist() {
    const renderItems = ({ item }) => {
      const isPressed = pressedItem === item;
      return (
        <TouchableOpacity
          style={{
            marginHorizontal: Sizes.fixPadding * 0.2,
            marginRight: Sizes.fixPadding,
            marginVertical: Sizes.fixPadding * 0.5,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: isPressed ? 1 : 1,
            borderColor: isPressed ? Colors.primaryTheme : Colors.black,
            borderRadius: 10,
            padding: Sizes.fixHorizontalPadding,
            backgroundColor: isPressed ? Colors.white : Colors.white,
          }}
          activeOpacity={0.7}
          onPress={() => {
            handleFliter(item);
          }}
        >
          <Text
            style={{
              color: isPressed ? Colors.primaryTheme : Colors.black,
              fontSize: getFontSize(12),
              textTransform: "uppercase",
            }}
          >
            {item}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding * 0.4,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: Sizes.fixHorizontalPadding,
        }}
      >
        <FlatList
          data={filterTabs}
          renderItem={renderItems}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  function InputField() {
    return (
      <View style={styles.inputFieldContainer}>
        <TouchableOpacity>
          <Image
            source={require("../../assests/icons/search.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          maxLength={10}
          keyboardType="number-pad"
          placeholder="Search a Plan,e.g.239 or 28 days"
          placeholderTextColor={Colors.grayA}
          value={searchTerm}
          onChangeText={handleSearch}
          cursorColor={Colors.black}
        />
      </View>
    );
  }

  function Header() {
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: Colors.primaryTheme,
          alignItems: "center",
          zIndex: 1,
          paddingBottom: 2,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image
            source={require("../../assests/icons/backarrow.png")}
            style={[styles.backIcon]}
          />
        </TouchableOpacity>
        <View
          style={{ flex: 0.15, justifyContent: "center", alignItems: "center" }}
        >
          {mobileData?.contactdata?.image ? (
            <Image
              source={{ uri: mobileData?.contactdata?.image }}
              style={styles.contactImage}
            />
          ) : (
            <View style={styles.contactImagePlaceholder}>
              <Text style={styles.contactImagePlaceholderText}>
                {mobileData?.contactdata?.name && mobileData?.contactdata?.name[0]}
              </Text>
            </View>
          )}
        </View>
        <View style={{ flex: 0.5 }}>

          {adminNumber === 'admin' ? (
            <Text
              style={{ ...Fonts._14MontserratRegular, color: Colors.white }}
            >
              {adminName}
            </Text>
          ) : (
            mobileData?.contactdata?.name && (
              <Text
                style={{ ...Fonts._14MontserratRegular, color: Colors.white }}
              >
                {mobileData.contactdata.name.slice(0, 18)}
              </Text>
            )
          )}
{adminNumber === 'admin' ? (
            <Text
              style={{ ...Fonts._14MontserratRegular, color: Colors.white }}
            >
              {adminMobile}
            </Text>
          ) : (
            mobileData?.phoneNumber ? (
              <Text
                style={{ ...Fonts._14MontserratRegular, color: Colors.white }}
              >
                {mobileData?.phoneNumber}
              </Text>
            ) : (<Text style={{ ...Fonts._13MontserratRegular, color: Colors.white }}>
              {mobileData?.contactdata?.phoneNumber}
            </Text>
            )
          )}




        

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Text
              style={{ ...Fonts._12MontserratRegular, color: Colors.white }}
            >
              prepaid- {adminNumber === 'admin' ? rechargeData?.data?.operatorData?.OperatorCode : planData?.mobileOperator?.OperatorCode}
            </Text>
          </View>
        </View>
      </View>
    );
  }
};
const mapStateToProps = (state) => ({
  rechargeData: state.rechargeReducer.rechargeData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Rechargeplans);

const styles = StyleSheet.create({
  backButton: {
    zIndex: 99,
    padding: Sizes.fixHorizontalPadding * 0.6,
    flex: 0.09,
  },
  backIcon: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    tintColor: Colors.white,
  },
  contactImage: {
    width: SCREEN_WIDTH * 0.12,
    height: SCREEN_WIDTH * 0.12,
    borderRadius: 100,
    marginRight: Sizes.fixPadding,
  },
  contactImagePlaceholder: {
    width: SCREEN_WIDTH * 0.12,
    height: SCREEN_WIDTH * 0.12,
    borderRadius: 100,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Sizes.fixPadding,
  },
  contactImagePlaceholderText: {
    ...Fonts._18MontserratRegular,
    color: Colors.primaryTheme,
  },
  textInput: {
    width: "90%",
    ...Fonts._14MontserratRegular,
    color: "#3C3B3B",
  },
  inputFieldContainer: {
    marginTop: Sizes.fixPadding,
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Sizes.fixHorizontalPadding,
    borderRadius: 10,
    marginHorizontal: Sizes.fixHorizontalPadding,
    borderWidth: 1,
  },
  image: {
    height: SCREEN_WIDTH * 0.05,
    width: SCREEN_WIDTH * 0.05,
    resizeMode: "contain",
  },
  modalContainer: {
    backgroundColor: Colors.white,
    padding: Sizes.fixHorizontalPadding * 3,
    borderTopRightRadius: Sizes.fixHorizontalPadding * 3,
    borderTopLeftRadius: Sizes.fixHorizontalPadding * 3,
  },
  inputContainer: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#E5DEDE",
    borderRadius: Sizes.fixPadding * 0.5,
    paddingHorizontal: Sizes.fixPadding,
    // marginTop: Sizes.fixPadding * 2,
    borderColor: Colors.grayA,
    backgroundColor: "#FAFAFA",
  },
  heading: {
    ...Fonts._12MontserratMedium,
    bottom: -Sizes.fixPadding * 0.6,
    left: Sizes.fixHorizontalPadding * 3,
    backgroundColor: Colors.white,
    zIndex: 99,
    alignSelf: "flex-start",
    paddingHorizontal: Sizes.fixHorizontalPadding,
    color: "#8B8989",
  },
  rightIcon: {
    ...Fonts._12MontserratRegular,
    color: Colors.primaryTheme,
  },
});
