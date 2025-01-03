import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Sizes } from '../assests/style';

const Comingsoon = ({tintColor}) => {
    const navigation = useNavigation();
  return (
    <ImageBackground source={require('../assests/images/bdcomingsoon.png')} style={{flex:1}}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../assests/icons/backarrow.png')} style={[styles.backIcon,{tintColor}]} />
      </TouchableOpacity>
    </ImageBackground>
  )
}

export default Comingsoon

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        zIndex: 99,
        padding: Sizes.fixHorizontalPadding,
      },
      backIcon: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
    
      },
})