
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Fonts, SCREEN_WIDTH, Sizes, getFontSize } from '../../../assests/style'
import MyStatusBar from '../../../components/StatusBar'
import Carousel from 'react-native-reanimated-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { navigate } from '../../../navigations/NavigationServices'
import { connect } from 'react-redux'
import * as BannerActions from '../../../redux/actions/BannerActions'
import { api_urls } from '../../../utils/api-urls'
import { useNavigation } from '@react-navigation/native'
import PodcastAudio from './components/PodcastAudio'
import ChildPodcastAudio from './components/ChildPodcastAudio';

const Podcastmain = ({ dispatch, bannerdata  }) => {
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(BannerActions.getbanner()); 

  }, [dispatch])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
      {Header()}
      <View style={{ flex: 1 }}>
        <View></View>
        <FlatList
          ListHeaderComponent={
            <>
              {Slider()}
              { horizontalsongpart()}
              {Verticalsongpart()}
            </>
          }
        //   contentContainerStyle={{ paddingBottom: 70 }}
        />
      </View>
    </SafeAreaView>
  )
function Verticalsongpart() {
  return(
    <ChildPodcastAudio/>
    
  )
}
  function horizontalsongpart() {
    return(
      <PodcastAudio/>
    )
  }
  function Slider() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.8}

          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 13,
            marginTop: Sizes.fixPadding,


            overflow: 'hidden',
            marginHorizontal: 5

          }}>
          <Image
            source={{ uri: api_urls + item.image }}
            style={{
              width: SCREEN_WIDTH,
              height: SCREEN_WIDTH * 0.7,
              borderRadius: 25,

            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )
    }
    return (
      <View style={{ flex: 0.2, }}>
        <Carousel
          // loop={true}
          width={SCREEN_WIDTH}
          height={SCREEN_WIDTH / 2.5}
          autoPlay
          data={bannerdata?.Podcast}
          scrollAnimationDuration={1000}
          autoPlayInterval={5000}
          mode="parallax"
          // onProgressChange={(_, absoluteProgress) =>
          //   (progressValue.value = absoluteProgress)
          // }
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 0,
          }}
          pagingEnabled={true}
          snapEnabled={true}
          renderItem={renderItem}
        />
      </View>
    )
  }

  function Header() {
    return (
      <View style={styles.container1}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flex: 0.1 }}>
          <Image source={require('../../../assests/icons/backarrow.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Podcast</Text>
        <TouchableOpacity style={styles.skip} onPress={() => navigate('favourite')}>
          <Ionicons name='heart-outline' color={Colors.white} size={25} />
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  bannerdata: state.bannerReducer.bannerdata,
  audioData: state.sancharReducer.audioData,
  audioDataById: state.sancharReducer.audioDataById,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Podcastmain);

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
  container1: {
    flex: 0.08,
    backgroundColor: Colors.primaryTheme,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 99,
    paddingHorizontal: Sizes.fixHorizontalPadding
  },
  backIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    tintColor: Colors.white

  },
  title: {
    flex: 0.7,
    color: Colors.white,
    paddingHorizontal: Sizes.fixHorizontalPadding,
    fontSize: getFontSize(15),
    fontWeight: '600',
  },
  skip: {
    flex: 0.2,
    alignItems: 'center',
    paddingVertical: Sizes.fixPadding * 0.2,
  },
})