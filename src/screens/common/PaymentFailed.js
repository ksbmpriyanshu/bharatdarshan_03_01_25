import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors,Fonts, SCREEN_WIDTH, Sizes, getFontSize } from '../../assests/style'
import MyStatusBar from '../../components/StatusBar'
import Button from '../../components/Button'

const PaymentFailed = ({route}) => {
  console.log(route.params,'data')
  return (
  <SafeAreaView style={{flex:1,backgroundColor:Colors.white}}>
    <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
    <View style={{flex:1,}}>
        {imagepart()}
        {paymenttext()}
        {tryagainbtn()}
        
    </View>
  </SafeAreaView>
  )
  function tryagainbtn() {
    return(
        <View style={{flex:0.2,justifyContent:'center',width:'90%',alignSelf:'center'}}>
            <Button title={'TRY AGAIN'} />
        </View>
    )
  }
 function paymenttext() {
    return(
        <View style={{flex:0.3,justifyContent:'flex-end',alignItems:'center'}}>
             <Text style={{fontSize:getFontSize(27),fontFamily:Fonts.bold,color:Colors.redA,marginBottom:Sizes.fixPadding * 3}}>{route.params}</Text>
            <Text style={{fontSize:getFontSize(20),fontFamily:Fonts.bold,color:Colors.black}}>Your payment Has failed</Text>
            <Text style={{fontSize:getFontSize(15),fontFamily:Fonts.regular,color:'#8F8F8F',marginTop:10,letterSpacing:0.5}}>You can retry the payment below to </Text>
            <Text style={{fontSize:getFontSize(15),fontFamily:Fonts.regular,color:'#8F8F8F',marginTop:1}}>Continue this </Text>
  
        </View>
    )
 
 }
  function imagepart() {
    return(
        <View style={{flex:0.5,justifyContent:'center',alignItems:'center'}}>
            <Image source={require('../../assests/icons/failed.png')} style={{width:SCREEN_WIDTH * 0.9,height:SCREEN_WIDTH,resizeMode:'contain' }}/>
        </View>
    )
  }
}

export default PaymentFailed

const styles = StyleSheet.create({})