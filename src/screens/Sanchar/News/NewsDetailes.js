import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MyStatusBar from '../../../components/StatusBar'
import { Colors,Fonts,  SCREEN_HEIGHT, SCREEN_WIDTH, Sizes, getFontSize } from '../../../assests/style'
import { useNavigation } from '@react-navigation/native'
import { api_urls } from '../../../utils/api-urls'
import Loader from '../../../components/Loader'
import moment from 'moment';

const NewsDetailes = ({ route }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
      <Loader/>
    <ScrollView showsVerticalScrollIndicator={false}>

      {Imagepart()}
      {nextbox()}
      <View style={{paddingVertical:60,}}>

  </View>
    </ScrollView>
  
    
    </SafeAreaView>
  )
  function nextbox() {
    return (
      <View style={{  }}>
        <View style={{ width: '70%', alignSelf: 'center', position: 'absolute', top: -Sizes.fixPadding * 4.5, backgroundColor: 'rgba(245, 245, 245, 0.9)', borderRadius: 20, padding: Sizes.fixPadding, justifyContent: 'center' }}>
          <Text style={{ fontSize: getFontSize(13), color: Colors.black, marginTop: 5, }}>
             {moment(route?.params?.created).format('DD-MM-YYYY')}
          </Text>
          <Text style={{ fontSize: getFontSize(12), color: Colors.black, textAlign: 'left' }}>{route?.params?.title}</Text>

          <Text style={{ fontSize: getFontSize(9), color: Colors.black, marginTop: 5}}>Powered By {route?.params?.author}</Text>
        </View>


        <View style={{ paddingHorizontal: Sizes.fixPadding, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ top: SCREEN_HEIGHT * 0.11, color: Colors.black, fontSize: getFontSize(12),textAlign:"justify",color:"gray" ,...Fonts._14PoppinsSemiBold, }}>{route?.params?.details}</Text>
        </View>


      </View>
    )
  }
  function Imagepart() {
    return (
      <View style={{ height: SCREEN_HEIGHT * 0.5, }}>
        <ImageBackground source={{ uri: api_urls + route?.params?.image }} style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: Sizes.fixPadding }}>
            <Image source={require('../../../assests/icons/backarrow.png')} style={{ height: SCREEN_HEIGHT * 0.06, width: SCREEN_WIDTH * 0.08, tintColor: Colors.white }} />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    )
  }
}

export default NewsDetailes

const styles = StyleSheet.create({})