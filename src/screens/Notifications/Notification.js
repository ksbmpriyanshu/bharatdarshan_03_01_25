import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react';
import { Sizes,Colors,Fonts } from '../../assests/style';
import { useNavigation } from '@react-navigation/native';

const Notification = () => {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1 }}>
            {headerInfo()}
            <Text>Notification</Text>
        </View>
    )
    function headerInfo() {
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: Sizes.fixHorizontalPadding * 2, backgroundColor: Colors.primaryTheme }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../assests/icons/back_arrow.png')} style={{ width: 24, height: 24, resizeMode: 'contain' }} tintColor={Colors.white} />
            </TouchableOpacity>
            <Text style={{ ...Fonts._16MontserratMedium, marginLeft: Sizes.fixHorizontalPadding * 2 }}>Notification</Text>
          </View>
        )
      }
}

export default Notification

const styles = StyleSheet.create({})