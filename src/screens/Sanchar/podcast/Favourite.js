import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MyStatusBar from '../../../components/StatusBar'
import { Colors,Fonts, SCREEN_WIDTH, Sizes, getFontSize } from '../../../assests/style'
import Header from '../../../components/Header'
import { songdata } from '../../../config/data'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { navigate } from '../../../navigations/NavigationServices'


const Favourite = () => {
    const [isFilled, setIsFilled] = useState(false);
  return (
<SafeAreaView style={{flex:1}}>
<MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
      <Header title={'Favourite'}  tintColor={Colors.white} />
      <View style={{flex:1}}>
        {favouriteitem()}
      </View>
</SafeAreaView>
  )
  function favouriteitem() {
    const toggleIcon = (id) => {
      setIsFilled(prevStates => ({
        ...prevStates,
        [id]: !prevStates[id]
      }));
    };
    const renderItem = ({ item }) => {
      const filled = isFilled[item.id] || false;
      return (
        <TouchableOpacity style={{ paddingHorizontal: Sizes.fixHorizontalPadding, marginTop: Sizes.fixPadding, flexDirection: 'row' }} onPress={() => navigate('playsong')}>
          <Image source={require('../../../assests/images/krishanbhajan.png')} />
          <View style={{ marginLeft: Sizes.fixHorizontalPadding * 2, flexDirection: 'row', justifyContent: 'space-between', width: SCREEN_WIDTH * 0.5 }}>
            <View>
              <Text style={styles.txt}>Ram Bhajan</Text>
              <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                <Text style={{ ...Fonts._12MontserratMedium }}>Bhajan</Text>
                <View style={{ borderWidth: 0.8, width: 1, marginHorizontal: Sizes.fixHorizontalPadding, borderColor: Colors.black }}></View>
                <Text style={{ ...Fonts._12MontserratMedium }}>25:30</Text>
              </View>
              <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: Colors.primaryTheme, justifyContent: 'center', padding: Sizes.fixPadding * 0.6, borderRadius: 20, alignItems: 'center' }} >
                <Image source={require('../../../assests/icons/shareb.png')} style={{ height: SCREEN_WIDTH * 0.06, resizeMode: 'contain', width: SCREEN_WIDTH * 0.05,tintColor:Colors.white }} />
                <Text style={styles.txt3}>Share</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => toggleIcon(item?.id)}>
              {filled ? (<Ionicons name='heart' color={Colors.redA} size={25} style={{ marginTop: Sizes.fixPadding }} />) : (<Ionicons name='heart-outline' color={Colors.black} size={25} style={{ marginTop: Sizes.fixPadding }} />)}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )
    }
    return (
      <View style={{ marginHorizontal: Sizes.fixHorizontalPadding * 0.2 , padding: Sizes.fixPadding, marginTop: Sizes.fixPadding, }}>
        <FlatList data={songdata} renderItem={renderItem}  showsVerticalScrollIndicator={false}/>
      </View>
    )
  }
}

export default Favourite

const styles = StyleSheet.create({
    txt: {
        ...Fonts._14MontserratRegular
      },
      txt3: {
        fontSize: getFontSize(14),
        color: Colors.white,
        fontFamily: 'Montserrat-Medium',
        marginLeft: 5
      },
})