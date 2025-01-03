// CustomDrawerContent.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, Alert } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes, Fonts } from '../assests/style';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate, resetToScreen } from './NavigationServices';
import * as CommonActions from '../redux/actions/CommonActions';
import Feather from 'react-native-vector-icons/Feather'

const drawerScreens = [
  // { name: 'Wallet', value: 'walletTab', title: 'wallet Balance ' },
  { name: 'Wallet', value: 'wallet', title: 'wallet Balance ' },


  { name: 'Order History', value: 'Order History', title: 'Order History' },
  { name: 'Shopping Order History', value: 'shoppingorder', title: 'Shopping Order History' },
  { name: 'My Trips', value: 'myTrips', title: 'myTrips' },
  // { name: 'Refer & Earn', value: 'referAndEarn', title: 'refer&Earn' }, 
  // { name: 'Refund Policy', value: 'refundPolicy', title: 'refundPolicy' },
  // { name: 'Kyc Details', value: 'kycDetails', title: 'kycDetails' },
  // { name: 'Privacy Policy', value: 'privacyPolicy', title: 'privacyPolicy' },
  // { name: 'Terms & Conditions', value: 'termscondition', title: 'termCondition' },
  { name: 'About Us', value: 'About Us', title: 'About Us' },
  { name: 'Help & Support', value: 'Help And Support', title: 'help&Support' },
  { name: 'Rate Us', value: 'RateUs', title: 'rate Us' },
];


const CustomDrawerContent = ({ navigation, customerdata, dispatch }) => {
  return (
    <DrawerContentScrollView
      showsVerticalScrollIndicator={false}
      style={{ top: -10, backgroundColor: Colors.white }}
    >
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        {profileinfo()}
        {drawerdata()}
        {setting()}
        {logout()}
      </View>

    </DrawerContentScrollView>
  )

  function logout() {
    const clearAndGotoLogin = async () => {
      await AsyncStorage.clear()
      resetToScreen('login')
    }
    const onLogout = () => {
      Alert.alert('Alert!', 'Are you sure you want to log out', [
        { text: 'Cancel', style: 'cancel', },
        { text: 'Yes', style: 'destructive', onPress: () => clearAndGotoLogin() }
      ])
    }
    return (

      <TouchableOpacity style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: Sizes.fixPadding * 0.8,
        marginHorizontal: Sizes.fixHorizontalPadding * 3
      }}
        onPress={() => onLogout()}
      >
        <Text style={{ ...Fonts._16MontserratRegular }}>Logout</Text>
        <AntDesign
          name="right"
          color={Colors.black}
          size={Sizes.fixHorizontalPadding * 2}
        />
      </TouchableOpacity>

    )
  }
  function setting() {
   
    return (
      <TouchableOpacity style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: Sizes.fixPadding * 0.8,
        marginHorizontal: Sizes.fixHorizontalPadding * 3
      }}
      onPress={()=>{
      navigate('setting')
      }}
      >
        <Text style={{ ...Fonts._16MontserratRegular }}>Settings & Privacy</Text>
        <AntDesign
          name="right"
          color={Colors.black}
          size={Sizes.fixHorizontalPadding * 2}
        />
      </TouchableOpacity>
    )
  }

  function deleteaccount() {
    const handledeleteaccont = () => {
      dispatch(CommonActions.deleteaccount())
    }
    const handledelete = () => {
      Alert.alert('Alert!', 'Are you sure you want to log out', [
        { text: 'Cancel', style: 'cancel', },
        { text: 'Yes', style: 'destructive', onPress: () => handledeleteaccont() }
      ])
    }
    return (
      <TouchableOpacity style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: Sizes.fixPadding * 0.8,
        marginHorizontal: Sizes.fixHorizontalPadding * 3
      }}
        onPress={() => handledelete()}
      >
        <Text style={{ ...Fonts._16MontserratRegular }}>Delete Account</Text>
        <AntDesign
          name="right"
          color={Colors.black}
          size={Sizes.fixHorizontalPadding * 2}
        />
      </TouchableOpacity>
    )
  }

  function drawerdata() {
    return (
      <View style={{ marginHorizontal: Sizes.fixHorizontalPadding * 3 }}>
        {drawerScreens.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={item.name}
            onPress={() => navigate(item.value)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: Sizes.fixPadding * 0.8,
            }}>
            <Text style={{ ...Fonts._16MontserratRegular }}>{item.name}</Text>
            <AntDesign
              name="right"
              color={Colors.black}
              size={Sizes.fixHorizontalPadding * 2}
            />
          </TouchableOpacity>
        ))}
      </View>
    )
  }

  function profileinfo() {
    return (
      <View style={{ height: SCREEN_HEIGHT * 0.25 }}>
        <ImageBackground source={require('../assests/images/drawerimg.png')} style={{ height: SCREEN_HEIGHT * 0.23, width: SCREEN_WIDTH * 0.85, }}>
          <View style={{ flexDirection: 'row', gap: SCREEN_WIDTH * 0.1, alignItems: 'center', height: SCREEN_HEIGHT * 0.2, paddingHorizontal: Sizes.fixHorizontalPadding * 2 }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('registration', { skip: false })} style={{ height: SCREEN_WIDTH * 0.23, width: SCREEN_WIDTH * 0.23, overflow: 'hidden', borderRadius: 100, borderWidth: 1, borderColor: Colors.white }}>
              {customerdata?.image ? (
                <Image source={{ uri: customerdata?.image }} style={{ height: '100%', width: '100%', resizeMode: 'cover' }} />
              ) : (
                <Image source={require('../assests/images/user.png')} style={{ height: '100%', width: '100%', resizeMode: 'cover' }} />
              )}

            </TouchableOpacity>
            <View style={{ right: 20, flex: 1 }}>
              <Text style={{ ...Fonts._20MontserratMedium, color: Colors.white, }}>{customerdata?.name}</Text>
              <Text style={{ ...Fonts._16MontserratMedium, color: Colors.white, marginTop: Sizes.fixHorizontalPadding * 0.5 }}>{customerdata?.phone}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('registration')}>
              <Feather name='edit' color={Colors.grayA} size={20} />
            </TouchableOpacity>

          </View>

        </ImageBackground>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1
  }
});
const mapStateToProps = state => ({
  customerdata: state.registrationReducer.customerdata
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContent);

