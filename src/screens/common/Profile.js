import React, { useState } from 'react'
import { FlatList, Image, StyleSheet, Text,TouchableOpacity,View } from 'react-native'
import MyStatusBar from '../../components/StatusBar'
import { Colors, Fonts, SCREEN_WIDTH, Sizes } from '../../assests/style'
import Header from '../../components/Header'
import { imagePicker } from '../../utils/services'
import { BottomSheet } from '@rneui/themed'
import { connect } from 'react-redux'


const Profile = ({customerData}) => {
  const [imageVisible,setimageVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  console.log(profileImage,'Image ')
  return (
    <View style={{flex:1,backgroundColor:Colors.white}}>
       <MyStatusBar
        backgroundColor={Colors.primaryTheme}
        barStyle={"light-contnet"}
      />
      <Header title={'Profile'} tintColor={Colors.white}/>
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <>
              {ProfileImageInfo()}
         
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
  )
  function imagePickerVisible() {
    const onPicker = async (type) => {
      const response = await imagePicker({ type });
      // updateState({ imageVisible: false });
      setimageVisible(false)
      if (response) {
        // updateState({ profileImage: response[0].uri })
        setProfileImage(response[0].uri)
      }
    };
    return (
      <BottomSheet
        isVisible={imageVisible}
        onBackdropPress={() => setimageVisible(false)}
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
  function ProfileImageInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setimageVisible(true)}
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
            source={require("../../assests/icons/camera.png")}
            style={{
              width: "20%",
              height: "20%",
              resizeMode: "contain",
              position: "absolute",
              bottom: 10,
              right: 0,
            }}
          />
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
}
const mapStateToProps = (state) => ({
  countrydata: state.registrationReducer.countrydata,
  statedata: state.registrationReducer.statedata,
  customerData: state.registrationReducer.customerdata,
});
const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.white,
    padding: Sizes.fixHorizontalPadding * 3,
    borderTopRightRadius: Sizes.fixHorizontalPadding * 3,
    borderTopLeftRadius: Sizes.fixHorizontalPadding * 3,
    flexDirection: "row",
    flexWrap: "wrap",
  },
})
