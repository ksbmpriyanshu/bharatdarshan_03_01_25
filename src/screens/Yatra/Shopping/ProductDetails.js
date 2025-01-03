import { Alert, FlatList, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes, Fonts } from '../../../assests/style'
import MyStatusBar from '../../../components/StatusBar'
import Header from '../../../components/Header'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../../../components/Button'
import Swiper from 'react-native-swiper'
import ImageViewer from 'react-native-image-zoom-viewer'
import {
    responsiveScreenHeight,
    responsiveScreenWidth,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions";
import { useNavigation } from '@react-navigation/native'
import * as ShoppingActions from "../../../redux/actions/ShoppingActions"
import { connect } from 'react-redux'

const data = [
    {
        image: require('../../../assests/images/trendingd.png')
    },
    {
        image: require('../../../assests/images/trending.png')
    }]

const ProductDetails = ({ route,dispatch,customerData }) => {
    console.log(
        customerData?._id,"customerData"
    )
    const navigation = useNavigation()
    const img_url = 'https://bharatdarshan.app/';
    const productDetails = route.params.productDetails
    console.log(productDetails?.bannerImages)


    const addToCart = () => {
        const requestBody = {
            productId: productDetails?._id,
            customerId: customerData?._id
        }
        console.log(requestBody)
        dispatch(ShoppingActions.getAddcart(requestBody));
        navigation.navigate('shoppingcart')
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
            <Header title={'Product Details'} tintColor={Colors.white} />
            <View style={{ flex: 1,paddingHorizontal:10,}}>

                <FlatList
                    ListHeaderComponent={<>
                        {Slider()}
                        {Itemname()}
                        {ProductDetail()}
                    </>}
                    contentContainerStyle={{
                        paddingVertical: Sizes.fixHorizontalPadding * 2
                    }}
                    showsVerticalScrollIndicator={false}
                />
                {cartbtn()}
            
            </View>
        </SafeAreaView>
    )
  
    function cartbtn() {
        return (
            <View style={{ width: '70%', alignSelf: 'center', marginBottom: 10 }}>
                <Button  title={'Add to Cart'} onPress={()=>{
                    addToCart()
            
                }}/>
            </View>
        )
    }
    function ProductDetail() {
        return (
            <View style={{ backgroundColor: Colors.white,}}>
                <Text style={{ ...Fonts._20MontserratMedium, marginTop: 20, }}>Product Description</Text>
                <View style={{ marginVertical: Sizes.fixPadding * 0.5 }}>
                    <Text style={[Fonts._14MontserratMedium, { color: '#6F6363' }]}>
                        {productDetails?.description}
                    </Text>
                </View>
            </View >
        )
    }
 

    function Itemname() {
        return (
            <View style={{marginTop:10,}}>
                <Text style={{ ...Fonts._18MontserratRegular,fontSize:16}}>
                    {productDetails?.productName}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: Sizes.fixPadding * 0.5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: Colors.black, ...Fonts._20MontserratMedium }}> ₹{productDetails?.price} /-</Text>
                        <Text style={{ marginLeft: Sizes.fixHorizontalPadding, ...Fonts._16MontserratRegular, color: Colors.grayA, textDecorationLine: 'line-through' }}>₹{productDetails?.mrp}</Text>
                    </View>
                    <Text style={{ ...Fonts._13MontserratRegular, color: '#BF9321' }}>
                        (₹{Math.round(((productDetails.mrp - productDetails.price) / productDetails.mrp) * 100)}% off)
                    </Text>
                </View>
            </View>
        )
    }
    function Slider() {
     return (
            <View style={styles.swiperContainer}>
                   
                <Swiper
                    autoplay
                    bounces
                    animated
                    loadMinimal
                    pagingEnabled
                    autoplayTimeout={3}
                    dotColor={Colors.grayDark}
                    activeDotColor={Colors.white}
                >
                    {productDetails?.bannerImages?.map((item, index) => {
                        console.log("productDetails?.image----",item)
                        return (
                            <TouchableOpacity
                                activeOpacity={1}
                                key={index}
                                style={styles.slide}
                            >
                             <Image source={{uri:img_url + item}} style={styles.image}/>
                               
                            </TouchableOpacity>
                        );
                    })}
                </Swiper>
            </View>

        )
    }
}


const mapStateToProps = state => ({
    addcartdata: state.shoppingReducer.addcartdata,
    customerData: state.registrationReducer.customerdata,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
const styles = StyleSheet.create({
    swiperContainer: {
        height:150,
    },
    
    image: {
        height:150,
        width: responsiveScreenWidth(100),
        resizeMode:"contain"
    },
})