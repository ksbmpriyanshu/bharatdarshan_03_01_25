import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes, getFontSize } from '../assests/style';

const Button = ({onPress,title,style,styletxt}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{...style}} activeOpacity={0.8}>
    <LinearGradient
      colors={['#E58634', '#BF6427','#530201']}
      style={[styles.button, ]}
      start={{ x: 0.5, y: 0.9 }}
      end={{ x: 1, y: 0.8 }}
    >
      <Text style={[styles.buttonText,styletxt]}>{title}</Text>
      <Image source={require('../assests/images/btndownimage.png')} style={{height:SCREEN_WIDTH *0.05,width:SCREEN_WIDTH,resizeMode:'cover',position:'absolute',bottom:0}}/>
    </LinearGradient>
  </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    button: {
        paddingVertical:Sizes.fixPadding *1.1,
        borderRadius: Sizes.fixPadding * 0.4,
        alignItems: 'center',
      },
      buttonText: {
        color: Colors.white,
        fontSize: getFontSize(20),
        fontFamily: 'Montserrat-Regular'
      },
})