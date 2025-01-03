import { FlatList, Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import MyStatusBar from '../../../components/StatusBar'
import { Colors, Fonts, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes } from '../../../assests/style'
import Header from '../../../components/Header'
import { songdata } from '../../../config/data'
import { Image } from 'react-native'
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers'
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SancharActions from '../../../redux/actions/SancharAction'
import { connect } from 'react-redux'
import { api_urls } from '../../../utils/api-urls'
import { navigate } from '../../../navigations/NavigationServices'
import Loader from '../../../components/Loader'
import { useNavigation } from '@react-navigation/native'
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";
import YoutubeIframe from 'react-native-youtube-iframe';
import { imageurl } from '../../../utility/base'

const VideoShow = ({ route, dispatch, subCategoryByCategoryIdData, videoCategoryByCategoryIdData }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const toggleExpand = (index) => {
    setExpandedItems((prevState) => ({
        ...prevState,
        [index]: !prevState[index], 
    }));
};
  console.log("videoCategoryByCategoryIdData-iojsdhfo-",videoCategoryByCategoryIdData)

  const navigation = useNavigation();
  console.log(subCategoryByCategoryIdData,"subCategoryByCategoryIdData")
  const video_category_id = route.params?._id;
  const sub_category_id = subCategoryByCategoryIdData[0]?._id

  const [pressedItem, setPressedItem] = useState();

  useEffect(() => {
    const payload = {
      data: { categoryId: video_category_id },
    }
   
    dispatch(SancharActions.getSubCategoryByCategoryId(payload))
  }, [])
  useEffect(() => {
    setPressedItem(subCategoryByCategoryIdData[0]?._id)
  },[subCategoryByCategoryIdData])

  useEffect(() => {
    const payloadVideo = {
      data: { videoSubCategoryId: sub_category_id },
    }

    dispatch(SancharActions.getVideoCategoryByCategoryId(payloadVideo));
  }, [sub_category_id])

  const click = async (id) => {
    const payloadVideo = {
      data: { videoSubCategoryId: id },
    }

    dispatch(SancharActions.getVideoCategoryByCategoryId(payloadVideo));
  }
  


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
      <Loader/>
      <Header title={route.params?.category_name}  tintColor={Colors.white} />
      {Horizontalitem()}
      {Verticalitem()}
      
    </SafeAreaView>
  )


  function Verticalitem() {
    const renderItem = ({ item,index }) => {
      console.log("verticalitem",item)
      return (
        <TouchableOpacity
            onPress={() => {
              if(item?.image){
                navigation.navigate('videoplay',{item})
              }
              }}

              disabled={item?.image?false:true}
          >
        <View style={styles.mainVideoView} key={index}>
           {item?.link ?(
            <YoutubeIframe
            height={150}
            width={SCREEN_WIDTH * 0.9}
            videoId={item?.link.split('v=')[1]?.split('&')[0]}
          />
           ):(
            <Image source={{uri:imageurl +item?.image}}
            height={150}
            width={SCREEN_WIDTH * 0.9}
            resizeMode="cover"
            />
           )} 

          <Text style={styles.videoTitle}>{item?.title}</Text>
          <Text 
          style={{
             ...Fonts._14MontserratRegular, marginBottom: Sizes.fixPadding * 0.5
             , paddingHorizontal: Sizes.fixHorizontalPadding * 2,
              color: Colors.white,
               }}
               numberOfLines={expandedItems[index] ? 0 : 2}
               >{item?.description} </Text>
               <TouchableOpacity onPress={() => toggleExpand(index)}>
                        <Text style={styles.linkText}>
                            {expandedItems[index] ? 'Read less' : 'Read more'}
                        </Text>
                    </TouchableOpacity>
        </View>
         </TouchableOpacity>
      )
    }
    return (
      <View style={{ marginHorizontal: Sizes.fixHorizontalPadding, flex: 0.8 }}>
        <FlatList data={videoCategoryByCategoryIdData} renderItem={renderItem} showsVerticalScrollIndicator={false} />
       <View style={{paddingVertical:5,}}></View>
      </View>
    )
  }
  function Horizontalitem() {
    const renderItems = ({ item }) => {
      const isPressed = pressedItem === item._id;
      return (
        <View style={{ alignItems: 'center',}}>

          <TouchableOpacity style={{ borderWidth: 2, borderRadius: 100, borderColor: isPressed ? '#FBBC04' :Colors.primaryTheme, marginHorizontal: Sizes.fixHorizontalPadding, marginTop: Sizes.fixPadding * 0.7, overflow: 'hidden',height: SCREEN_WIDTH * 0.23, width: SCREEN_WIDTH * 0.23 }}
            onPress={() => {
              setPressedItem(item._id);
              click(item?._id)
            
            }}
          >
            <Image source={{ uri: api_urls + item?.image }} style={{ height: SCREEN_WIDTH * 0.24, width: SCREEN_WIDTH * 0.24, resizeMode: 'cover',overflow:'hidden' }} />
            <View style={{ position: 'absolute', bottom: Sizes.fixPadding * 0.5, justifyContent: 'center', alignItems: 'center' }} >
              <Image source={require('../../../assests/icons/rectangle.png')} style={{ width: SCREEN_WIDTH * 0.2, tintColor: isPressed ? '#FBBC04' : Colors.primaryTheme }} />
              <Text style={{ position: 'absolute', ...Fonts._14MontserratRegular, color: Colors.white, height: SCREEN_HEIGHT * 0.03, textAlign: 'center' }}>{item.sub_category_name}</Text>
            </View>
          </TouchableOpacity>
          <Text style={{ ...Fonts._12MontserratRegular, marginTop: Sizes.fixPadding * 0.4, width: ScreenWidth * 0.2, textAlign: 'center', }}>{item.sub_category_name}</Text>
        </View>
      )
    }
    return (
      <View style={{ marginHorizontal: Sizes.fixHorizontalPadding, flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList data={subCategoryByCategoryIdData} renderItem={renderItems} horizontal={true} showsHorizontalScrollIndicator={false} />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  subCategoryByCategoryIdData: state.sancharReducer.subCategoryByCategoryIdData,
  videoCategoryByCategoryIdData: state.sancharReducer.videoCategoryByCategoryIdData
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(VideoShow);

const styles = StyleSheet.create({
  videoTitle:{
     ...Fonts._14MontserratRegular,
     marginTop: Sizes.fixPadding * 0.1,
    paddingHorizontal: Sizes.fixHorizontalPadding * 2,
    color: Colors.white,
    marginTop:10,
   },
   mainVideoView:{
    backgroundColor: Colors.primaryTheme,
     borderRadius: 10 ,
     padding:10,
     marginTop:20,
    },
    linkText:{
      color:"#fff",
      fontSize:12,
      marginLeft:responsiveScreenWidth(4.5)
    }
})