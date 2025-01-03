import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Colors,
  Fonts,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  Sizes,
  getFontSize,
} from "../../../assests/style";
import MyStatusBar from "../../../components/StatusBar";
import Header from "../../../components/Header";
import { navigate } from "../../../navigations/NavigationServices";
import axios from "axios";
import { getToken } from "../../../config/token";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect, useDispatch } from "react-redux";
import { setOpt } from "../../../redux/actions/operatorCircleAction";
import * as RechargeActions from '../../../redux/actions/RechargeActions'

const Fasttag = ({ dispatch, fastagOperators, navigation }) => {
  const [masterOptData, setMasterOptData] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(RechargeActions.getFastTagOperatior())
    return () => setMasterOptData(null)
  }, [])

  useEffect(() => {
    if (!masterOptData) {
      setMasterOptData(fastagOperators)
    }
  }, [fastagOperators])


  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (!masterOptData) {
      return;
    }

    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterOptData.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.OperatorName
          ? item.OperatorName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      dispatch(RechargeActions.setFastTagOperator(newData))
      setSearch(text);
    } else {
      dispatch(RechargeActions.setFastTagOperator(masterOptData))
      setSearch(text);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar
        backgroundColor={Colors.primaryTheme}
        barStyle={"light-contnet"}
      />

      <Header title={"FASTag"} tintColor={Colors.white} />
      <View style={{ flex: 1, paddingVertical: Sizes.fixPadding * 0.5 }}>
        {SearchBar()}
        {banktitle()}
        {banklist()}
      </View>
    </SafeAreaView>
  );
  function banklist() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('Fastagvechicle', { providerData: item })}
          activeOpacity={0.8}
          style={{
            borderBottomWidth: 1,
            borderColor: "#C1C1C1",
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: Sizes.fixPadding,
            paddingHorizontal: Sizes.fixHorizontalPadding * 1,
          }}
        >
          <View
            style={{
              height: SCREEN_WIDTH * 0.15,
              width: SCREEN_WIDTH * 0.15,
              resizeMode: "cover",
              // backgroundColor: "#EA7515",
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              overflow: 'hidden'
            }}
          >
            <Image source={{ uri: item?.operatorImage }} style={{ height: SCREEN_WIDTH * 0.13, width: SCREEN_WIDTH * 0.13, resizeMode: 'cover', borderRadius: 1000 }} />
          </View>


          <Text
            style={{
              ...Fonts._16MontserratMedium,
              color: "#00000080",
              marginLeft: Sizes.fixHorizontalPadding * 2,
              fontSize: 16,
              width:SCREEN_WIDTH*0.6
            }}
          >
            {item.OperatorName}
          </Text>

        </TouchableOpacity>
      );
    };
    return (
      <View style={{ marginHorizontal: Sizes.fixHorizontalPadding * 1.8 }}>
        <FlatList
          data={fastagOperators}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginBottom: Sizes.fixPadding * 3 }}
        />
      </View>
    );
  }
  function banktitle() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding,
          marginHorizontal: Sizes.fixHorizontalPadding * 1.5,
          zIndex: 1,
          backgroundColor: Colors.white,
        }}
      >
        <Text style={{ ...Fonts._16MontserratMedium, color: "#00000080" }}>
          FASTag issuing Bank list
        </Text>
      </View>
    );
  }

  function SearchBar() {
    return (
      <View
        style={{
          borderWidth: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          // justifyContent:'space-between',
          borderRadius: Sizes.fixPadding * 2,
          borderColor: "#81818190",
          marginTop: Sizes.fixPadding * 0.8,
          marginHorizontal: Sizes.fixHorizontalPadding * 3,
        }}
      >
        <TextInput
          value={search}
          onChangeText={(text) => searchFilterFunction(text)}
          style={{
            width: "85%",
            // width:'100%',
            // flex:1,
            color: Colors.black,
            fontSize: getFontSize(12),
            height: SCREEN_WIDTH * 0.12,
          }}
          placeholder="Search FASTag issuing Bank "
          placeholderTextColor={"#81818190"}
        //  value={searchQuery}
        // onChangeText={handleSearch}
        />
        <Image
          source={require("../../../assests/icons/search.png")}
          style={{
            height: SCREEN_HEIGHT * 0.04,
            width: SCREEN_WIDTH * 0.04,
            resizeMode: "contain",
          }}
        />
      </View>
    );
  }

  function title() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center',  }}>
        <Text style={{ ...Fonts._20MontserratMedium,color: "#00000080" }}>FastTag Recharge</Text>
      </View>
    )
  }
};

const mapStateToProps = state => ({
  fastagOperators: state.rechargeReducer.fastagOperators
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Fasttag);

const styles = StyleSheet.create({});
