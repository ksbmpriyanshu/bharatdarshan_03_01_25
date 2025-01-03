import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Fonts, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes, getFontSize } from '../../../assests/style'
import MyStatusBar from '../../../components/StatusBar'
import Header from '../../../components/Header'
import { navigate } from '../../../navigations/NavigationServices'
import axios from 'axios'
import { getToken } from '../../../config/token'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../../../components/Loader'
import { setCircle } from '../../../redux/actions/operatorCircleAction'
import { useDispatch } from 'react-redux'
import { api_url, base_url } from '../../../config/constants'


const ChooseCircle = ({ route }) => {
  const dispatch=useDispatch()
  const [optData, setOptData] = useState([])
  const [token, setToken] = useState(null);


  const getOperatorData = async () => {
    await axios.get(`${api_url}/recharge/getCircle`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      setOptData(res?.data?.data)
      // console.log({ res:res.data.data.data });
    }).catch((err) => {
      console.log({ err });
    })
  }
  const getAcessToken = async () => {
    try {
      const authToken1 = await AsyncStorage.getItem('token');
      const authToken = JSON.parse(authToken1)
      // console.log({ authToken });
      setToken(authToken)
    } catch (error) {
      console.log({ error });
    }

  }
  const handleSetCircleData = (item) => {
    dispatch(setCircle(item))
    navigate('Fastagvechicle')
  }
  useEffect(() => {
    getOperatorData()
  }, [token])
  useEffect(() => {

    getAcessToken()


  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
      <Loader />
      <Header title={'Circle'} tintColor={Colors.white} />
      <View style={{ flex: 1, paddingVertical: 16 }}>
        {title()}
        {/* {SearchBar()} */}
        {/* {banktitle()} */}
        {banklist()}
      </View>
    </SafeAreaView>
  )
  function banklist() {

    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity style={{ borderBottomWidth: 1, borderColor: '#C1C1C1', flexDirection: 'row', alignItems: 'center', paddingVertical: Sizes.fixPadding, paddingHorizontal: Sizes.fixHorizontalPadding, alignItems: 'center' }}
          onPress={() => handleSetCircleData(item)}
        >
          <View style={{ height: SCREEN_WIDTH * 0.15, width: SCREEN_WIDTH * 0.15, resizeMode: 'cover', backgroundColor: "#EA7515", borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 15, paddingVertical: 10 }} >{item.circlename[0]}</Text>
          </View>

          {/* <Image source={item.image} style={{ height: SCREEN_WIDTH * 0.13, width: SCREEN_WIDTH * 0.13, resizeMode: 'cover' }} /> */}
          <Text style={{ ...Fonts._16MontserratMedium, color: '#00000080', marginLeft: Sizes.fixHorizontalPadding * 2, fontSize: 15, textTransform: 'capitalize' }}>{item.circlename}</Text>
        </TouchableOpacity>
      )
    }
    return (
      <View style={{ marginHorizontal: Sizes.fixHorizontalPadding * 1.8 }}>
        <FlatList data={optData} renderItem={renderItem} showsVerticalScrollIndicator={false} contentContainerStyle={{ marginBottom: Sizes.fixPadding * 3 }} />
      </View>
    )
  }
  // function banktitle() {
  //   return (
  //     <View style={{ marginTop: Sizes.fixPadding, marginHorizontal: Sizes.fixHorizontalPadding * 1.5 }}>
  //       <Text style={{ ...Fonts._16MontserratMedium, color: '#00000080' }}>FASTag issuing Bank list</Text>
  //     </View>
  //   )
  // }
  // function SearchBar() {
  //   return (
  //     <View style={{ borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: Sizes.fixPadding * 2, borderColor: '#81818190', marginTop: Sizes.fixPadding, marginHorizontal: Sizes.fixHorizontalPadding * 3 }}>
  //       <TextInput style={{ width: '85%', color: Colors.black, fontSize: getFontSize(15) }} placeholder='Search FASTag issuing Bank ' placeholderTextColor={'#81818190'}
  //       //  value={searchQuery}
  //       // onChangeText={handleSearch}
  //       />
  //       <Image source={require('../../../assests/icons/search.png')} style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.05, resizeMode: 'contain' }} />
  //     </View>
  //   )
  // }
  function title() {
    return (
      <>
        <View style={{ borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: Sizes.fixPadding * 2, borderColor: '#81818190', marginTop: Sizes.fixPadding, marginHorizontal: Sizes.fixHorizontalPadding * 3 }} >
          <TextInput style={{ width: '85%', color: Colors.black, fontSize: getFontSize(15) }} placeholder='Search FASTag issuing Bank ' placeholderTextColor={'#81818190'}
            value={route.params?.OperatorName}
          // onChangeText={handleSearch}
          />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: Sizes.fixPadding, backgroundColor: Colors.white, zIndex: 1 }}>
          <Text style={{ ...Fonts._20MontserratMedium }}>Choose Circle</Text>
        </View>
      </>

    )
  }
}

export default ChooseCircle

const styles = StyleSheet.create({})