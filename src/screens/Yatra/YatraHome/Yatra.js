

import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MyStatusBar from '../../../components/StatusBar'
import { Colors, SCREEN_WIDTH, Sizes, Fonts, getFontSize, SCREEN_HEIGHT } from '../../../assests/style'
import Header from '../../../components/Header'
import { TouchableOpacity } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { yatraDetails } from '../../../config/data'
import { navigate } from '../../../navigations/NavigationServices'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { BottomSheet } from '@rneui/themed'
import Button from '../../../components/Button'
import * as PoojaActions from "../../../redux/actions/PoojaActions"
import { connect } from 'react-redux'
import { imageurl } from '../../../utility/base'

const Yatra = ({ dispatch, yatradata }) => {
  const [circleModal, setCircleModal] = useState(false);
  const [data, setData] = useState('')
  // console.log(yatradata, "yatradata----")

  useEffect(() => {
    dispatch(PoojaActions.getYatra());
  }, [dispatch]);

  const getYatraDetails = (yatraId) => {
    const requestBody = {
      subCategoryId: yatraId
    }
    console.log("requestBody",requestBody)
    dispatch(PoojaActions.getPackage(requestBody));
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
      <Header title={'Yatra'} tintColor={Colors.white} />
      <FlatList
        ListHeaderComponent={
          <>
            {Slider()}
            {YatraItem()}
          </>
        }
      />
      {/* {premium()} */}
    </SafeAreaView>
  )
  // function premium() {

  //   return(
  //          <BottomSheet
  //               isVisible={circleModal}
  //               onBackdropPress={() =>
  //                   setCircleModal(false)
  //               }

  //           >
  //               <View style={[styles.modalContainer,{height:300}]}>
  //                   <View style={{ alignItems: 'center', }}>
  //                       <Image source={require('../../../assests/images/homerectangle.png')} tintColor={'#E0DCDC'} />
  //                   </View>
  //                   <View style={{flex:1,justifyContent:'center'}}>
  //                     <Button title={'Basic'} onPress={() => navigate('yatradetails', {data,type:'basic'})}/>
  //                     <View style={{marginTop:Sizes.fixPadding}}>
  //                     <Button title={'Premium'} onPress={() => navigate('yatradetails', {data,type:'premium'})}/>
  //                     </View>
  //                   </View>
  //               </View>
  //           </BottomSheet>
  //   )

  // }
  function YatraItem() {
    const handlePress = (item) => {
      setCircleModal(true);
      setData(item)

    }
    const renderItem2 = ({ item }) => {
      return (
        <TouchableOpacity
          onPress={() => {
            getYatraDetails(item?._id);
          }}

          style={{ height: SCREEN_HEIGHT * 0.12, width: SCREEN_WIDTH * 0.26, justifyContent: 'center', alignItems: 'center', marginRight: Sizes.fixHorizontalPadding * 2, borderRadius: 5, marginTop: Sizes.fixPadding * 0.9, backgroundColor: '#FFDC75' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', top: 5 }}>
            <Text style={{ ...Fonts._20MontserratMedium, fontSize: getFontSize(33) }}>{item?.sub_category_name}</Text>
            <View style={{ alignSelf: 'flex-end', alignItems: 'center', marginLeft: Sizes.fixHorizontalPadding * 0.2 }}>
              <Text style={{ ...Fonts._14MontserratRegular, bottom: 5 }}>Days</Text>
            </View>

          </View>
          <Text style={{ width: SCREEN_WIDTH * 0.25, textAlign: 'center', ...Fonts._13MontserratMedium, top: 5 }}>Package</Text>
          <Text>

          </Text>
        </TouchableOpacity>
      )
    }
    const renderItem = ({ item }) => {
      const starimage = require('../../../assests/icons/Star.png')
      return (
        <View style={{ marginTop: Sizes.fixPadding, backgroundColor: Colors.white, marginHorizontal: Sizes.fixHorizontalPadding * 2, borderRadius: 10 }}>
          <View style={{ paddingHorizontal: Sizes.fixPadding, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Sizes.fixPadding }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Text style={{ ...Fonts._16MontserratRegular, fontWeight: '700' }}>4.0 / 5</Text>
              <View>
                <Rating
                  type='custom'
                  ratingImage={starimage}
                  ratingColor='#FFFFFF'
                  ratingBackgroundColor='#FFFFFF'
                  ratingCount={5}
                  imageSize={20}
                  // onFinishRating={console.log('rating')}
                  style={{ marginLeft: Sizes.fixHorizontalPadding }}
                />
              </View>
            </View>
            <Text style={{ ...Fonts._12MontserratRegular, }}>169 Reviews</Text>
          </View>
          <View style={{ backgroundColor: Colors.primaryTheme, marginVertical: Sizes.fixPadding, paddingVertical: Sizes.fixPadding * 0.3 }}>
            <Text style={{ ...Fonts._18MontserratRegular, fontSize: getFontSize(20), textAlign: 'center', fontWeight: '700', color: Colors.white }}>{item?.categoryName}</Text>
          </View>
          <View style={{ paddingHorizontal: Sizes.fixPadding, bottom: 5 }}>

            <Image
              source={{
                uri: item?.categoryImage ? `${imageurl}${item.categoryImage}` : null,
              }}
              style={{
                width: '100%',
                height: 120,
                borderRadius: 10,
                marginTop: Sizes.fixPadding * 0.5,
              }}
              resizeMode="cover"
            />
            <Text style={{ ...Fonts._12MontserratRegular,marginTop:10, }}>Please select the package*</Text>
            <FlatList data={item?.subCategoriesData} renderItem={renderItem2} horizontal={true} showsHorizontalScrollIndicator={false} />
          </View>
          {/* <TouchableOpacity style={{alignSelf:'center', borderBottomWidth:1 , borderColor:Colors.black,marginVertical:Sizes.fixPadding * 0.5,bottom:Sizes.fixPadding * 0.2}} activeOpacity={0.5}>
          <Text stle={{color:Colors.black}}>See all reviews</Text>
          </TouchableOpacity> */}
        </View>
      )
    }
    return (
      <View style={{ flex: 0.8, zIndex: -1, paddingBottom: Sizes.fixPadding, }}>
        <FlatList data={yatradata?.data} renderItem={renderItem} showsVerticalScrollIndicator={false} />
      </View>
    )
  }
  function Slider() {
    const SliderData = [
      { icon: require('../../../assests/images/yatra1.png'), }
    ]

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
            marginHorizontal: Sizes.fixHorizontalPadding * 2

          }}>

          <Image
            source={item.icon}
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
          width={SCREEN_WIDTH}
          height={SCREEN_WIDTH / 2.5}
          autoPlay
          data={SliderData}
          scrollAnimationDuration={1000}
          autoPlayInterval={5000}
          mode="parallax"
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
  yatradata: state.poojaReducer.yatradata,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Yatra)
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.white,
    padding: Sizes.fixHorizontalPadding * 3,
    borderTopRightRadius: Sizes.fixHorizontalPadding * 3,
    borderTopLeftRadius: Sizes.fixHorizontalPadding * 3,

  },
})
