

import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { Colors, Sizes, Fonts, SCREEN_WIDTH } from '../../../assests/style'
import MyStatusBar from '../../../components/StatusBar'
import Header from '../../../components/Header'
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers'
import { navigate } from '../../../navigations/NavigationServices'
import Carousel from 'react-native-reanimated-carousel'
import * as BannerActions from '../../../redux/actions/BannerActions'
import * as SancharAction from '../../../redux/actions/SancharAction'
import { connect } from 'react-redux'
import { api_urls } from '../../../utils/api-urls'
import Loader from '../../../components/Loader'


const VideoCategory = ({ dispatch, bannerdata, videoCategoryData }) => {
  console.log("videoCategoryData",videoCategoryData)
  // const payload = {
  //   data: { categoryId: "111"},
  //   onClose: () => console.log("API CCompleted")
  // }
  useEffect(() => {
    dispatch(BannerActions.getbanner());
    dispatch(SancharAction.getVideoCategory())
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white, }}>
      <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
      <Loader/>
      <Header title={'Video'}  tintColor={Colors.white} />
      {Slider()}
      {VideoCategory()}

    </SafeAreaView>
  )

  function VideoCategory() {
    const renderItem = ({ item }) => {
      // console.log("item",item)
      return (
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity style={{ borderWidth: 2, borderRadius: 100, borderColor: '#D9D9D990', marginHorizontal: Sizes.fixHorizontalPadding * 1.5, marginTop: Sizes.fixPadding * 0.7, overflow: 'hidden' }}
            onPress={() => navigate('videoshow', item)}
          >
            <Image source={{ uri: api_urls + item?.image }} style={{ height: SCREEN_WIDTH * 0.26, width: SCREEN_WIDTH * 0.26, resizeMode: 'cover' }} />
          </TouchableOpacity>
          <Text style={{ ...Fonts._12MontserratRegular, marginTop: Sizes.fixPadding * 0.4,width:100,textAlign:"center" }}>{item?.category_name}</Text>
        </View>
      )
    }
    return (
      <View style={{ flex: 1, paddingVertical: Sizes.fixPadding }}>
        <FlatList data={videoCategoryData} renderItem={renderItem} numColumns={3} keyExtractor={(item) => item.id} />

      </View>
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
      <View style={{ flex: 0.3, overflow: 'hidden' }}>
        <Carousel
          // loop={true}
          width={SCREEN_WIDTH}
          height={SCREEN_WIDTH / 2.5}
          autoPlay
          data={bannerdata?.Videoclip}
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
}

const mapStateToProps = state => ({
  bannerdata: state.bannerReducer.bannerdata,
  videoCategoryData: state.sancharReducer.videoCategoryData,

});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(VideoCategory);


const styles = StyleSheet.create({})