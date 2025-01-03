import { StyleSheet, Text, View,SafeAreaView, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import MyStatusBar from '../../../components/StatusBar'
import Header from '../../../components/Header'
import { Colors, Fonts, SCREEN_WIDTH, Sizes } from '../../../assests/style'
import Loader from '../../../components/Loader'
import * as ShoppingActions from "../../../redux/actions/ShoppingActions"
import { connect } from 'react-redux'
import moment from 'moment'
import { Image } from 'react-native-elements'
import { imageurl } from '../../../utility/base'

const ShoppingOrderHistory = ({dispatch,customerData,orderdata}) => {
    console.log(orderdata,"orderdata")
    useEffect(()=>{
        const requestBody = {
            customerId: customerData?._id
        }
        dispatch(ShoppingActions.getorderData(requestBody));
    },[])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFBF8' }}>
      <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
      <Loader />
      <Header title={'Shopping Order History'} tintColor={Colors.white} />

        <FlatList data={orderdata?.data} renderItem={((item)=>{
            console.log("item?.products[0]?.productId?.productNam-e",item?.item?.products[0]?.productId?.image)
            return(
                <View style={{ margin: Sizes.fixHorizontalPadding, backgroundColor: Colors.white, elevation: 2, flexDirection: 'row', alignItems: 'center', padding: Sizes.fixHorizontalPadding, borderRadius: 10, overflow: 'hidden' }}>
                <View style={{ height: SCREEN_WIDTH * 0.15, width: SCREEN_WIDTH * 0.15, borderWidth: 1, borderRadius: 100, justifyContent: 'center', alignItems: 'center', borderColor: Colors.primaryTheme, backgroundColor: '#E974157', }}>
                  <Image source={{ uri: `${imageurl}${item?.item?.products[0]?.productId?.image}` }} style={{ height: SCREEN_WIDTH * 0.1, width: SCREEN_WIDTH * 0.1, resizeMode: 'contain' }} />
                </View>
                <View style={{ width: SCREEN_WIDTH * 0.45, marginHorizontal: Sizes.fixHorizontalPadding * 2 }}>
                  <Text numberOfLines={2} style={{ ...Fonts._16MontserratRegular, textTransform: 'capitalize' }}>{item?.item?.products[0]?.productId?.productName}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: Sizes.fixHorizontalPadding * 0.6, width: SCREEN_WIDTH * 0.5 }}>
                    <Text style={{ ...Fonts._14MontserratRegular, color: '#18487F' }}>₹{item?.item?.products[0]?.productId?.price}</Text>
                    <Text style={{ ...Fonts._14MontserratRegular, width: SCREEN_WIDTH * 0.4, left: Sizes.fixHorizontalPadding, color: "green" }}>
                     Success
                    </Text>
                  </View>
                </View>
                <View style={{ width: SCREEN_WIDTH * 0.25 }}>
      
                  <Text style={{ ...Fonts._11MontserratMedium, color: '#837E7E' }}>{moment(item?.item?.createdAt).format('DD/MM/YYYY')}</Text>
                  <Text style={{ ...Fonts._11MontserratMedium, color: '#837E7E' }}>{moment(item?.item?.createdAt).format('hh:mm A')}</Text>
               
                </View>
              </View>
            )
        })}/>
     
      </SafeAreaView>

  )
}


const mapStateToProps = state => ({
    orderdata: state.shoppingReducer.orderdata,
    customerData: state.registrationReducer.customerdata,

});

const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingOrderHistory);
const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      emptyText: {
        justifyContent: 'center',
        fontSize: 18,
        color: '#666',
      },
})