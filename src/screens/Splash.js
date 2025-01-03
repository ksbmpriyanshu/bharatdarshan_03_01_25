import { Image, ImageBackground, PermissionsAndroid, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MyStatusBar from '../components/StatusBar'
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../assests/style'
import * as SettingActions from '../redux/actions/settingActions'
import { connect } from 'react-redux'

const Splash = ({dispatch}) => {

  useEffect(() => {
    setTimeout(() => {
      dispatch(SettingActions.getSplash());
      // navigate('login')
    }, 2000)
}, [])

useEffect(() => {
  requestCameraPermission()
},[])

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message:
          'App needs access to your camera ' +
          'so you can take pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

  return (
    <ImageBackground source={require('../assests/images/bdsplash.png')} style={{flex:1}}>
    <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
      <Image source={require('../assests/images/bharatDarshanMainlogo.png')} style={{height:SCREEN_HEIGHT * 0.3,width:SCREEN_WIDTH * 0.6, }} />
    </SafeAreaView>
    </ImageBackground>
  )
}
const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(null, mapDispatchToProps)(Splash)

const styles = StyleSheet.create({})