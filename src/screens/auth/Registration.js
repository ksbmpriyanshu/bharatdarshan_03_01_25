import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import MyStatusBar from "../../components/StatusBar";
import AntDesign from 'react-native-vector-icons/AntDesign'
import {
  Colors,
  Sizes,
  getFontSize,
  Fonts,
  SCREEN_WIDTH,
} from "../../assests/style";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { CheckBox } from "react-native-elements";
import Button from "../../components/Button";
import { navigate } from "../../navigations/NavigationServices";
import { imagePicker, showToastMessage } from "../../utils/services";
import { connect } from "react-redux";
import * as RegistrationActions from "../../redux/actions/RegistrationActions";
import RNFetchBlob from "rn-fetch-blob";
import { BottomSheet, Input } from "@rneui/themed";
import { validations } from "../../config/data";
import * as AuthActions from "../../redux/actions/AuthActions"

const Registration = ({ dispatch, countrydata, statedata, route, customerData }) => {
  console.log("customerData",customerData)
  const isSkip = route?.params?.skip
  const navigation = useNavigation();
  const [focus, setFocus] = useState(false);

  const [state, setState] = useState({
    name: customerData?.name,
    nameError: "",
    mobile: customerData?.phone,
    mobileError: "",
    email: customerData?.email,
    emailError: "",
    address: customerData?.address,
    addressError: "",
    city: customerData?.city,
    cityError: "",
    country: customerData?.country,
    countryError: "",
    countryState: customerData?.state,
    countryStateError: "",
    checked: false,
    profileImage: null,
    imageVisible: false
  });

  useEffect(() => {
    dispatch(RegistrationActions.getcountry());
    loadStatesForIndia();
  }, []);

  const loadStatesForIndia = () => {
    const payload = {
      data: { countrycode: "IN" }, // Assuming 'IN' is the ISO code for India
    };
    dispatch(RegistrationActions.getstate(payload));
  };

  const updateState = (data) => {
    setState((prevState) => {
      const newData = { ...prevState, ...data };
      return newData;
    });
  };

  const {
    name,
    nameError,
    mobile,
    mobileError,
    email,
    emailError,
    country,
    countryError,
    countryState,
    countryStateError,
    city,
    cityError,
    checked,
    address,
    addressError,
    profileImage,
    imageVisible
  } = state;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar
        backgroundColor={Colors.primaryTheme}
        barStyle={"light-contnet"}
      />
      {Header()}
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <>
              {ProfileImageInfo()}
              {username()}
              {MobileNo()}
              {useremail()}
              {fulladress()}
              {Country()}
              {State()}
              {City()}
              {isSkip && terms_condition()}
              {Submitbtn()}
            </>
          }
          contentContainerStyle={{
            paddingHorizontal: Sizes.fixHorizontalPadding * 2,
            paddingVertical: Sizes.fixPadding,
          }}
        />
      </View>
      {imagePickerVisible()}
    </View>
  );
  
  function Submitbtn() {
    const validation = () => {
      let isValid = true
      if (!validations.name.test(name)) {
        updateState({ nameError: 'Please enter your correct name' })
        isValid = false
      }
      if (name.length == 0) {
        updateState({ nameError: 'Please enter your name' })
        isValid = false
      }
      if (!validations.phoneNumber.test(mobile)) {
        updateState({ mobileError: 'Please enter your correct mobile number' })
        isValid = false
      }
      if (mobile.length == 0) {
        updateState({ mobileError: 'Please enter your mobile number' })
        isValid = false
      }
      if (!validations.email.test(email)) {
        updateState({ emailError: 'Please enter your correct email address' })
        isValid = false
      }
      if (email.length == 0) {
        updateState({ emailError: 'Please enter your email' })
        isValid = false
      }
      // if (!validations.address.test(address)) {
      //   updateState({ addressError: 'Please enter your correct address' })
      //   isValid = false
      // }
      if (address.length == 0) {
        updateState({ addressError: 'Please enter your address' })
        isValid = false
      }
      if (!validations.city.test(city)) {
        updateState({ cityError: 'Please enter your correct city name' })
        isValid = false
      }
      if (city.length == 0) {
        updateState({ cityError: 'Please enter your city name' })
        isValid = false
      }
      if (countryState.length == 0) {
        updateState({ countryStateError: 'Please select your country state' })
        isValid = false
      }
      if (country.length == 0) {
        updateState({ countryError: 'Please select your country' })
        isValid = false
      }
      if (isSkip && !checked) {
        showToastMessage({ message: 'Please checked the terms and condition' })
        isValid = false
      }
      if (isValid) {
        updateState({ nameError: '', mobileError: '', emailError: '', addressError: '', cityError: '', countryError: '', countryStateError: '' })
        const data = [
          { name: 'userId', data: customerData?._id },
          { name: "name", data: name },
          { name: "email", data: email },
          { name: "address", data: address },
          { name: "country", data: country },
          { name: "state", data: countryState },
          { name: "city", data: city },
        ];

        if (profileImage) {
          data.push({
            name: "images",
            filename: "profileImage.png",
            type: "file/image",
            data: RNFetchBlob.wrap(profileImage),
          });
        }

        console.log(data)

        const payload = {
          data,
          isSkip
        }

        dispatch(AuthActions.onProfileUpdate(payload));
        navigation.navigate('Home')

      }
    };
    return (
      <View
        style={{
          paddingHorizontal: Sizes.fixHorizontalPadding * 2,
          marginTop: Sizes.fixPadding,
        }}
      >
        <Button title={isSkip ? "Submit" : 'Update'} onPress={() => validation()} />
      </View>
    );
  }

  function imagePickerVisible() {
    const onPicker = async (type) => {
      const response = await imagePicker({ type });
      updateState({ imageVisible: false });
      if (response) {
        updateState({ profileImage: response[0].uri })
      }
    };
    return (
      <BottomSheet
        isVisible={imageVisible}
        onBackdropPress={() => updateState({ imageVisible: false })}
      >
        <View
          style={[
            styles.modalContainer,
            { justifyContent: "space-around", flexDirection: "row" },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPicker("gallary")}
            style={{
              width: "40%",
              marginBottom: Sizes.fixPadding,
              padding: Sizes.fixHorizontalPadding * 1.5,
              backgroundColor: "#CFECE1",
              borderRadius: Sizes.fixHorizontalPadding * 0.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assests/icons/gallary.png")}
              style={{ width: 30, height: 30, resizeMode: "contain" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPicker("capture")}
            style={{
              width: "40%",
              marginBottom: Sizes.fixPadding,
              padding: Sizes.fixHorizontalPadding * 1.5,
              backgroundColor: "#CFECE1",
              borderRadius: Sizes.fixHorizontalPadding * 0.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assests/icons/camera.png")}
              style={{
                width: 30,
                height: 30,
                resizeMode: "contain",
                tintColor: Colors.primaryTheme,
              }}
            />
          </TouchableOpacity>
        </View>
      </BottomSheet>
    );
  }

  function terms_condition() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: Sizes.fixPadding * 0.6,
          paddingHorizontal: Sizes.fixHorizontalPadding,
        }}
      >
        <CheckBox
          checked={checked}
          iconType="material-community"
          checkedIcon="checkbox-outline"
          uncheckedIcon={"checkbox-blank-outline"}
          style={{ margin: 0, padding: 0, width: 10, height: 10 }}
          containerStyle={{ padding: 0 }}
          size={Sizes.fixPadding * 1.3}
          onPress={() => updateState({ checked: !checked })}
          checkedColor={Colors.primaryTheme}
        />
        <Text style={{ ...Fonts._13MontserratRegular, flex: 1 }}>
          I agree to the{" "}
          <Text
            style={{ textDecorationLine: "underline" }}
            onPress={() => navigate("termscondition")}
          >
            Terms of Service
          </Text>{" "}
          &{" "}
          <Text style={{ textDecorationLine: "underline" }}>
            Privacy Policy
          </Text>
        </Text>
      </View>
    );
  }

  function City() {
    return (
      <Input
        shake={true}
        label={
          <Text style={styles.lableStyle}>
            City <Text style={{ color: Colors.redA }}>*</Text>
          </Text>
        }
        value={city}
        placeholder={"Enter your city"}
        errorMessage={cityError}
        onChangeText={(text) => updateState({ city: text })}
        inputStyle={styles.inputStyle}
        inputContainerStyle={{
          borderBottomWidth: 0,
          backgroundColor: Colors.grayF,
        }}
      />
    );
  }

  function Country() {
    const handleCountry = (item) => {
      updateState({ country: item.name });
      setFocus(false);
      const payload = {
        data: { countrycode: item?.isoCode },
      };
      dispatch(RegistrationActions.getstate(payload));
    };

    return (
      <View
        style={{
          width: "93%",
          height: 80,
          marginBottom: Sizes.fixPadding * 1,
          alignSelf: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ ...Fonts._14MontserratMedium, }}>
            Country
          </Text>
          <Text
            style={{ color: Colors.redA, left: Sizes.fixHorizontalPadding }}
          >
            *
          </Text>
        </View>
        <Dropdown
          data={countrydata}
          value={country}
          valueField={"name"}
          labelField={"name"}
          onChange={(item) => handleCountry(item)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={styles.inputContainer}
          itemTextStyle={{ ...Fonts._13MontserratMedium, textAlign: "center" }}
          selectedTextStyle={{ ...Fonts._13MontserratMedium }}
          placeholderStyle={{
            ...Fonts._13MontserratMedium,
            color: Colors.grayA,
          }}
          placeholder=" Enter Your Country"
          containerStyle={{
            backgroundColor: Colors.grayF,
            // borderRadius: Sizes.fixHorizontalPadding,
            elevation: 5,
            shadowColor: Colors.grayF,
          }}

        />
        {countryError && <Text style={{ ...Fonts._11MontserratMedium, color: 'red' }}>{countryError}</Text>}
      </View>
    );
  }

  function State() {
    return (
      <View
        style={{
          width: "93%",
          height: 80,
          marginBottom: Sizes.fixPadding,
          alignSelf: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ ...Fonts._14MontserratMedium, }}>
            State
          </Text>
          <Text
            style={{ color: Colors.redA, left: Sizes.fixHorizontalPadding }}
          >
            *
          </Text>
        </View>
        <Dropdown
          data={statedata}
          value={countryState}
          valueField={"name"}
          labelField={"name"}
          onChange={(item) => updateState({ countryState: item.name })}
          style={styles.inputContainer}
          itemTextStyle={{
            ...Fonts._13MontserratMedium,
            textAlign: "center",
          }}
          selectedTextStyle={{ ...Fonts._13MontserratMedium }}
          placeholderStyle={{
            ...Fonts._13MontserratMedium,
            color: Colors.grayA,
          }}
          placeholder="Enter Your State"
          containerStyle={{
            backgroundColor: Colors.white,
            borderRadius: Sizes.fixHorizontalPadding,
            elevation: 5,
            shadowColor: Colors.grayB,
          }}
        />
        {countryStateError && <Text style={{ ...Fonts._11MontserratMedium, color: 'red' }}>{countryStateError}</Text>}
      </View>
    );
  }

  function fulladress() {
    const onChangeText = (text) => {
      updateState({ address: text })
      // if (text.length > 3 && !validations.address.test(text)) {
      //   updateState({ addressError: 'Invalid address' })
      // } else {
      //   updateState({ addressError: '' })
      // }
    }
    return (
      <Input
        shake={true}
        label={
          <Text style={styles.lableStyle}>
            Address <Text style={{ color: Colors.redA }}>*</Text>
          </Text>
        }
        value={address}
        placeholder={"Enter your full address"}
        errorMessage={addressError}
        onChangeText={onChangeText}
        inputStyle={styles.inputStyle}
        inputContainerStyle={{
          borderBottomWidth: 0,
          backgroundColor: Colors.grayF,
        }}
      />
    );
  }

  function useremail() {
    const onChangeText = (text) => {
      updateState({ email: text })
      if (text.length > 3 && !validations.email.test(text)) {
        updateState({ emailError: 'Invalid email address' })
      } else {
        updateState({ emailError: '' })
      }
    }
    return (
      <Input
        shake={true}
        label={
          <Text style={styles.lableStyle}>
            Email <Text style={{ color: Colors.redA }}>*</Text>
          </Text>
        }
        value={email}
        placeholder={"Enter your email address"}
        errorMessage={emailError}
        onChangeText={onChangeText}
        inputStyle={styles.inputStyle}
        inputContainerStyle={{
          borderBottomWidth: 0,
          backgroundColor: Colors.grayF,
        }}
      />
    );
  }

  function MobileNo() {
    return (
      <Input
        shake={true}
        label={
          <Text style={styles.lableStyle}>
            Phone Number <Text style={{ color: Colors.redA }}>*</Text>
          </Text>
        }
        editable={false}
        value={mobile}
        placeholder={"Enter your mobile number"}
        onChangeText={(text) => updateState({ name: text })}
        inputStyle={styles.inputStyle}
        inputContainerStyle={{
          borderBottomWidth: 0,
          backgroundColor: Colors.grayF,
        }}
      />
    );
  }

  function username() {
    const onChangeText = (text) => {
      updateState({ name: text })
      if (text.length > 3 && !validations.name.test(text)) {
        updateState({ nameError: 'Invalid name' })
      } else {
        updateState({ nameError: '' })
      }
    }
    return (
      <Input
        shake
        label={
          <Text style={styles.lableStyle}>
            Full Name <Text style={{ color: Colors.redA }}>*</Text>
          </Text>
        }
        value={name}
        errorMessage={nameError}
        onFocus={() => updateState({ nameError: '' })}
        placeholder={"Enter your full name"}
        onChangeText={onChangeText}
        inputStyle={styles.inputStyle}
        inputContainerStyle={{
          borderBottomWidth: 0,
          backgroundColor: Colors.grayF,
        }}
      />
      // <Input value={name} onChangeText={(txt) => setName(txt)} placeholder={'Enter Your Name'} title={'Username'} title2={'*'} />
    );
  }

  function ProfileImageInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => updateState({ imageVisible: true })}
        style={{ alignSelf: "center", marginVertical: Sizes.fixPadding }}
      >
        <View
          style={{
            width: SCREEN_WIDTH * 0.3,
            height: SCREEN_WIDTH * 0.3,
            borderRadius: 1000,
            backgroundColor: Colors.grayC,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: profileImage ? profileImage : customerData?.image }}
            style={{
              width: "95%",
              height: "95%",
              resizeMode: "cover",
              borderRadius: 1000,
            }}
          />
          <Image
            source={require("../../assests/images/camera1.png")}
            style={{
              width: "20%",
              height: "20%",
              resizeMode: "contain",
              position: "absolute",
              bottom: 10,
              right: 0,
            }}
          />

          {/* <AntDesign name="camera" size={20} color={'black'}/> */}
        </View>
        <Text
          style={{
            textAlign: "center",
            ...Fonts._14MontserratRegular,
            marginTop: Sizes.fixPadding * 0.6,
          }}
        >
          Upload Photo
        </Text>
      </TouchableOpacity>
    );
  }

  function Header() {
    return (
      <View style={styles.container1}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ flex: 0.1 }}
        >
          <Image
            source={require("../../assests/icons/backarrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{isSkip ? 'Registration' : "Profile"}</Text>
        {isSkip && <TouchableOpacity style={styles.skip} onPress={() => navigate("home")}>
          <Text style={{ ...Fonts._13MontserratMedium, color: Colors.white }}>
            Skip
          </Text>
        </TouchableOpacity>}
      </View>
    );
  }
};
const mapStateToProps = (state) => ({
  countrydata: state.registrationReducer.countrydata,
  statedata: state.registrationReducer.statedata,
  customerData: state.registrationReducer.customerdata,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Registration);

const styles = StyleSheet.create({
  lableStyle: {
    fontWeight: "normal",
    ...Fonts._14MontserratMedium,
  },

  inputStyle: {
    ...Fonts._13MontserratMedium,
    paddingLeft: Sizes.fixPadding,
  },
  container1: {
    flex: 0.08,
    backgroundColor: Colors.primaryTheme,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 99,
    paddingHorizontal: Sizes.fixHorizontalPadding,
  },
  backIcon: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    tintColor: Colors.white,
  },
  title: {
    flex: 0.7,
    color: Colors.white,
    paddingHorizontal: Sizes.fixHorizontalPadding,
    fontSize: getFontSize(15),
    fontWeight: "600",
  },
  skip: {
    flex: 0.2,
    borderWidth: 1,
    alignItems: "center",
    paddingVertical: Sizes.fixPadding * 0.2,
    borderColor: Colors.white,
    borderRadius: 5,
  },
  inputContainer: {
    width: "100%",
    height: SCREEN_WIDTH * 0.14,
    borderColor: Colors.grayB,
    // borderRadius: Sizes.fixPadding * 0.5,
    paddingHorizontal: Sizes.fixPadding,
    backgroundColor: Colors.grayF,
    // marginTop: Sizes.fixPadding * 0.3,
  },
  modalContainer: {
    backgroundColor: Colors.white,
    padding: Sizes.fixHorizontalPadding * 3,
    borderTopRightRadius: Sizes.fixHorizontalPadding * 3,
    borderTopLeftRadius: Sizes.fixHorizontalPadding * 3,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
