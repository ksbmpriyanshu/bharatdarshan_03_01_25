import { View, Text } from 'react-native'
import React from 'react'
import MyStatusBar from '../../../components/StatusBar';
import { Colors } from '../../../assests/style';

const BusTrips = () => {
  return (
    <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
       <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle='light-content' />

      <Text style={{color:'black',fontFamily: 'Montserrat-Regular',}}>BusTrips is Comming Soon</Text>
    </View>
  )
 
}

export default BusTrips