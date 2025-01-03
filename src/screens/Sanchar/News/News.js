
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MyStatusBar from '../../../components/StatusBar'
import Header from '../../../components/Header'
import { Colors, Fonts, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes, getFontSize } from '../../../assests/style'
import { navigate } from '../../../navigations/NavigationServices'
import { BottomSheet } from 'react-native-elements'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux'
import * as SancharAction from '../../../redux/actions/SancharAction'
import { api_urls } from '../../../utils/api-urls'
import Share from 'react-native-share';
import Loader from '../../../components/Loader'
import moment from 'moment';

const News = ({ dispatch, breakingNews, newsCategory, newsCategoryByid }) => {
  console.log(newsCategoryByid,"newsCategory")
  const [filterModal, setFilterModal] = useState(false)
  const [selected, setselected] = useState(1)
  const [pressedItem, setPressedItem] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNews, setFilteredNews] = useState(newsCategoryByid);

  const news_category_id = newsCategory[0]?._id

  useEffect(() => {
    setFilteredNews(newsCategoryByid);
  }, [newsCategoryByid]);
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredNews(newsCategoryByid);
    } else {
      const filteredData = newsCategoryByid.filter(item => 
        item.details.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNews(filteredData);
    }
  };
  

  useEffect(() => {
    const payload = {
      data: { newsubCategoryId: news_category_id },
    }
    setPressedItem(newsCategory[0]?._id)
    dispatch(SancharAction.getNewsCategoryById(payload))
  }, [news_category_id])


  useEffect(() => {
    dispatch(SancharAction.getBreakingNews())
    dispatch(SancharAction.getNewsCategory())
  }, [])

  const click = async (id) => {
    const payload = {
      data: { newsubCategoryId: id },
    }

    dispatch(SancharAction.getNewsCategoryById(payload))
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
      <Loader/>
      <Header title={'News'}  tintColor={Colors.white} />
      {Search()}
      {items()}
      <View style={{ flex: 1, paddingHorizontal: Sizes.fixPadding * 0.8 }}>
        <FlatList
          ListHeaderComponent={
            <>
              {BreakingNews()}
              {newsData()}
            </>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
      {filterMOdal()}
    </SafeAreaView>
  )
  function BreakingNews() {
    const shareNews = (item) => {
      const shareOptions = {
        title: 'Breaking News',
        message: item?.title,
        image: item.image,
        url: api_urls + item?.image,
      };

      Share.open(shareOptions)
        .then((res) => console.log(res))
        .catch((err) => console.log('Error sharing news:', err));
    };
    const renderItem = ({ item }) => {
    
      return (
        <TouchableOpacity style={{ paddingHorizontal: Sizes.fixHorizontalPadding, marginVertical: Sizes.fixPadding * 0.2 }} onPress={() => navigate('NewsDetailes', item)}>
          <Image source={{ uri: api_urls + item?.image }} style={{ borderRadius: 10,height:SCREEN_WIDTH * 0.3,width:SCREEN_WIDTH * 0.9,resizeMode:"cover" }} />
          <View>
            <View style={{marginTop:10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Sizes.fixHorizontalPadding, marginTop: Sizes.fixPadding * 0.3 }}>
              <Text style={{
                 ...Fonts._13MontserratRegular,
                  width: SCREEN_WIDTH * 0.5,
                  fontSize:12

                   }}>{moment(item?.created).format('DD-MM-YYYY')}</Text>

              <TouchableOpacity onPress={() => shareNews(item)}>
                <Image source={require('../../../assests/icons/shareb.png')} style={{width:12,height:12}}/>
              </TouchableOpacity>
            </View>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{
                marginTop: 7,
                width: SCREEN_WIDTH * 0.9,
                ...Fonts._18MontserratRegular
                , fontSize: 12,

              }}> {item?.title}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    return (
      <View style={{marginBottom:10,}}>
        <Image source={require('../../../assests/images/breakingnews.png')} />
        <FlatList data={breakingNews} renderItem={renderItem} horizontal showsHorizontalScrollIndicator={false} />
      </View>
    )
  }
  function filterMOdal() {
    return (
      <BottomSheet
        isVisible={filterModal}
        onBackdropPress={() =>
          setFilterModal(false)
        }
      >
        <View style={[styles.modalContainer]}>
          <View style={{ alignItems: 'center', }}>
            <Image source={require('../../../assests/images/homerectangle.png')} tintColor={'#E0DCDC'} />
          </View>

          <View style={{ marginBottom: Sizes.fixPadding * 1.5, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text style={{ ...Fonts._20MontserratMedium, letterSpacing: 0.6 }}>
              Filter
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  setFilterModal(false)
                }
                style={{ marginRight: 5 }}>
                <AntDesign
                  name="delete"
                  color={Colors.black}
                  size={Sizes.fixPadding * 1.1}
                />
              </TouchableOpacity>
              <Text style={{ ...Fonts._16MontserratMedium }}>Reset</Text>
            </View>
          </View>
          <View>
            <Text style={{ ...Fonts._14MontserratMedium }}>Sort BY</Text>
            <View style={{ marginTop: Sizes.fixPadding * 0.5, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
              <Text style={{ ...Fonts._14MontserratMedium }}>Recommended</Text>
              <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity style={{ borderWidth: 2, borderColor: '#F0F1FA', padding: 7, borderRadius: 100, backgroundColor: selected === 2 ? Colors.primaryTheme : Colors.white }} onPress={() => setselected(2)}>
                  <Text style={{ ...styles.modaltxt, color: selected === 2 ? Colors.white : Colors.black }}>Latest</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderWidth: 2, borderColor: '#F0F1FA', marginLeft: 5, padding: 7, borderRadius: 100, backgroundColor: selected === 1 ? Colors.primaryTheme : Colors.white, }} onPress={() => setselected(1)}>
                  <Text style={{ ...styles.modaltxt, color: selected === 1 ? Colors.white : Colors.black }}>Most Viewed</Text>
                </TouchableOpacity>
              </View>
              <View>

              </View>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}

            style={styles.button}>
            <Text
              style={{
                ...Fonts._18MontserratMedium,
                color: Colors.white,
                textAlign: 'center',
              }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    )
  }
  function newsData() {

    const renderItem = ({ item }) => {
      console.log(item,'data')
      const shareNews = (item) => {
        const shareOptions = {
          title: item?.title,
          message: item?.title,
          url: api_urls + item?.image,
        };
  
        Share.open(shareOptions)
          .then((res) => console.log(res))
          .catch((err) => console.log('Error sharing news:', err));
      };
      return (
        <TouchableOpacity style={{ paddingHorizontal: Sizes.fixHorizontalPadding, marginVertical: Sizes.fixPadding * 0.2 }} onPress={() => navigate('NewsDetailes', item)}
        >
          <Image source={{ uri: api_urls + item?.image }} style={{  resizeMode: 'cover', height:SCREEN_WIDTH * 0.3,width:SCREEN_WIDTH * 0.9, borderRadius: Sizes.fixPadding }} />
          <View style={{flexDirection:'row' ,alignItems:'center',justifyContent:'space-between',marginTop:10,}}>
          <Text style={{
                 ...Fonts._13MontserratRegular,
                  width: SCREEN_WIDTH * 0.5,
                  fontSize:12

                   }}> {moment(item?.created).format('DD-MM-YYYY')}</Text>
          <TouchableOpacity onPress={() => shareNews(item)}>
          <Image source={require('../../../assests/icons/shareb.png')} style={{width:12,height:12}}/>
          </TouchableOpacity>
          </View>
           <Text 
           numberOfLines={2}
           ellipsizeMode="tail"
           style={{
             marginTop: 7,
             width: SCREEN_WIDTH * 0.9,
             ...Fonts._18MontserratRegular
             , fontSize: 12,
             fontWeight:"800"

           }}
           >{item?.title}</Text>
          <Text 
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{
            marginTop: 7,
            width: SCREEN_WIDTH * 0.9,
            ...Fonts._18MontserratRegular
            , fontSize: 12,
             marginBottom:20,
          }}
          >{item?.details}</Text>
        </TouchableOpacity>)
    }
    return (
      <View>
        <FlatList data={filteredNews} renderItem={renderItem} showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 70 }} />
      </View>
    )
  }
  function items() {
    const renderItems = ({ item }) => {
      console.log(item,'category data')
      const isPressed = pressedItem === item._id;
      return (
        <TouchableOpacity style={{ marginHorizontal: Sizes.fixPadding, marginRight: Sizes.fixPadding, marginVertical: Sizes.fixPadding * 0.5, alignItems: 'center', justifyContent: 'center', borderBottomWidth: isPressed ? 2 : 0, borderColor: isPressed ? Colors.black : null, }}
          activeOpacity={0.7}
          onPress={() => {
            setPressedItem(item._id);
            click(item._id);
          }}
        >
          <Text style={{ color: isPressed ? Colors.black : Colors.black, fontSize: getFontSize(17) }}>{item.sub_category_name}</Text>
        </TouchableOpacity>
      )
    }
    return (
      <View style={{ height: SCREEN_HEIGHT * 0.07, marginTop: Sizes.fixPadding * 0.6 }}>
        <FlatList data={newsCategory} renderItem={renderItems} horizontal={true} showsHorizontalScrollIndicator={false} />
      </View>
    )
  }
  function Search() {
    return (
      <View style={{ borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: Sizes.fixPadding * 2, borderColor: '#81818190', marginTop: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 0.8 }}>
        <TextInput style={{ width: '80%', color: Colors.black, fontSize: getFontSize(15) }} placeholder='Search News' placeholderTextColor={'#81818190'}   value={searchQuery}
        onChangeText={handleSearch}/>
        <Image source={require('../../../assests/icons/search.png')} style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.05, resizeMode: 'contain' }} />
      </View>
    )
  }
}
const mapStateToProps = state => ({
  breakingNews: state.sancharReducer.breakingNews,
  newsCategory: state.sancharReducer.newsCategory,
  newsCategoryByid: state.sancharReducer.newsCategoryByid

});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(News);

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.white,
    padding: Sizes.fixHorizontalPadding * 3,
    borderTopRightRadius: Sizes.fixHorizontalPadding * 3,
    borderTopLeftRadius: Sizes.fixHorizontalPadding * 3,

  },
  button: {
    backgroundColor: Colors.black,
    marginVertical: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding * 0.8,
    borderRadius: 1000,

  },
  modaltxt: {
    ...Fonts._14MontserratMedium,

  }
})