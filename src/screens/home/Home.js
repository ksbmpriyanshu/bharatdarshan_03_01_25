import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes, getFontSize, Fonts } from '../../assests/style'
import MyStatusBar from '../../components/StatusBar'
import { Recharge, ReligiosData, Sanchardata, Travel, YatraData } from '../../config/data'
import { navigate, resetToScreen } from '../../navigations/NavigationServices'
import Homeyrt from '../../components/Homeyrt'
import Carousel from 'react-native-reanimated-carousel'
import { SvgComponent } from '../../assests/svg'
import { connect } from 'react-redux'
import * as BannerActions from '../../redux/actions/BannerActions'
import { api_urls } from '../../utils/api-urls'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ShoppingActions from "../../redux/actions/ShoppingActions"

import Loader from '../../components/Loader'
import { useNavigation } from '@react-navigation/native'
import { showToastMessage } from '../../utils/services'
import WalletIcon from './icons/WalletIcons'
import NotificationIcon from './icons/NotificationIcon'
import CartIcon from './icons/CartIcon'
import Button from '../../components/Button'

const Home = ({ dispatch, bannerdata, customerdata, addtocartdata }) => {
    console.log(bannerdata?.Home, "addtocartdata")
    const navigation = useNavigation();
    useEffect(() => {
        dispatch(BannerActions.getbanner());
    }, [])
    // console.log(customerdata?.image)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryTheme }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
            <Loader />
            {headerinfo()}
            <FlatList
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <>
                        <View style={{ flex: 1, }}>
                            {Imagepart()}
                            <View style={{ backgroundColor: Colors.white, borderTopLeftRadius: Sizes.fixPadding * 1.5, borderTopRightRadius: Sizes.fixPadding * 1.5, }}>
                                {/* < SvgComponent /> */}
                                {/* {Imageline()} */}

                                {Slider()}
                                {TravelData()}
                                {RechargeData()}
                                {YatraItem()}
                                {sanchartxt()}
                                {sancharItems()}
                                {ReligiousTxt()}
                                {ReligiousItem()}
                                <View style={{
                                    backgroundColor: "#fff", paddingHorizontal: 20, paddingVertical: 20,
                                    display: "none",
                                    // flexDirection:"row",
                                }}>
                                    <View style={{ marginVertical: 10, }}>
                                        <Button title={'Flight Booking'} onPress={() => {
                                            navigation.navigate('flightbooking')
                                        }} />
                                    </View>
                                    
                                    <Button title={'Hotel Booking'}
                                        onPress={() => {
                                            navigation.navigate('hotelbooking')
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </>
                }

            />


        </SafeAreaView>

    )

    function Slider() {
        const renderItem = ({ item }) => {
            console.log(item, "dsf")
            return (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 13,
                        marginTop: Sizes.fixPadding,
                        paddingHorizontal: 10,

                        overflow: 'hidden',


                    }}

                >
                    {item?.image ? (
                        <Image
                            source={require('./../../assests/icons/svg/banner.png')}
                            style={{
                                width: SCREEN_WIDTH * 0.95,
                                height: SCREEN_WIDTH * 0.4,
                                borderRadius: 25,

                            }}
                            resizeMode="contain"
                        />
                    ) :
                        (
                            <Image
                                source={{ uri: api_urls + item?.image }}
                                style={{
                                    width: SCREEN_WIDTH * 0.9,
                                    height: SCREEN_WIDTH * 0.7,
                                    borderRadius: 25,
                                }}
                                resizeMode="contain"
                            />

                        )}

                </TouchableOpacity>
            )
        }
        return (
            <View style={{}}>
                <Carousel
                    // loop={true}
                    width={SCREEN_WIDTH}
                    height={SCREEN_WIDTH / 2.5}
                    autoPlay
                    data={bannerdata?.Home}
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

    function TravelData() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding }}>
                <Homeyrt title={'Travel'} data={Travel} />
                <TouchableOpacity>
                    <Image source={require('../../assests/images/travel.png')} style={{ width: '100%', resizeMode: 'contain', marginBottom: Sizes.fixPadding * 0.6 }} />
                </TouchableOpacity>
            </View>
        )
    }

    function RechargeData() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding }}>

                <Homeyrt title={'Recharge'} data={Recharge} />
                <TouchableOpacity>
                    <Image source={require('../../assests/images/rechargebanner.png')} style={{ width: '100%', resizeMode: 'contain', marginBottom: Sizes.fixPadding * 0.6 }} />
                </TouchableOpacity>
            </View>
        )
    }

    function YatraItem() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding }}>

                <Homeyrt title={'Yatra'} data={YatraData} />
                <TouchableOpacity>
                    <Image source={require('../../assests/images/yatranbenner.png')} style={{ width: '100%', resizeMode: 'contain', marginBottom: Sizes.fixPadding * 0.6 }} />
                </TouchableOpacity>
            </View>
        )
    }

    function ReligiousTxt() {
        return (
            <Text style={{ fontSize: getFontSize(20), color: Colors.black, fontFamily: 'Montserrat-Regular', marginTop: Sizes.fixPadding, paddingHorizontal: Sizes.fixPadding }}>Religious</Text>
        )
    }
    function ReligiousItem() {
        const renderItem = ({ item }) => {
            // console.log(item)
            return (
                <View style={{ width: "50%" }}>

                    <TouchableOpacity style={{
                        backgroundColor: '#FFF6F1', borderRadius: 100, marginHorizontal: Sizes.fixHorizontalPadding, marginTop: Sizes.fixPadding * 0.7, overflow: 'hidden', paddingHorizontal: Sizes.fixPadding * 0.6, paddingVertical: 7
                    }}
                        onPress={() => {
                            if (item?.value === 'VSSCT') {
                                Linking.openURL('https://vssct.com');
                            } else if (item?.value === 'Divya Vardhan') {
                                Linking.openURL('https://divyavardan.com');
                            } else {
                                navigate(item?.value);
                            }
                        }}
                    >
                        <Image source={item.icon} style={{
                            height: SCREEN_WIDTH * 0.13, width: SCREEN_WIDTH * 0.14, resizeMode: 'contain'

                        }} />
                    </TouchableOpacity>
                    <Text style={{ ...Fonts._12MontserratRegular, marginTop: Sizes.fixPadding * 0.4, textAlign: "center", }}>{item.name}</Text>
                    <View style={{ paddingBottom: 10, }}></View>
                </View>

            )
        }
        return (
            <View style={{ flex: 0.2, flexDirection: 'row', marginTop: Sizes.fixPadding, }}>
                <View style={{ flex: 0.5, paddingHorizontal: 10, alignItems: 'center' }}>
                    <FlatList data={ReligiosData} renderItem={renderItem} numColumns={2} keyExtractor={(item) => item.id} contentContainerStyle={styles.listContainer} />
                </View>
                <TouchableOpacity style={{ flex: 0.5, backgroundColor: 'white' }}>
                    <Image source={require('../../assests/images/sancharmain.png')} style={{ width: '95%', resizeMode: 'contain', right: 5 }} />
                </TouchableOpacity>

            </View>
        )
    }
    function sancharItems() {
        const renderItem = ({ item }) => {
            // console.log(item)
            return (
                <View>

                    <TouchableOpacity style={{
                        backgroundColor: '#FFF6F1', borderRadius: 100, marginHorizontal: Sizes.fixHorizontalPadding, marginTop: Sizes.fixPadding * 0.7, overflow: 'hidden', paddingHorizontal: Sizes.fixPadding * 0.6, paddingVertical: 7
                    }}
                        onPress={() => {

                            navigate(item.name)
                            console.log(item.name, 'hiiii')

                        }
                        }
                    >
                        <Image source={item.icon} style={{
                            height: SCREEN_WIDTH * 0.13, width: SCREEN_WIDTH * 0.14, resizeMode: 'contain'
                        }} />
                    </TouchableOpacity>
                    <Text style={{ ...Fonts._12MontserratRegular, marginTop: Sizes.fixPadding * 0.4, textAlign: "center" }}>{item.name}</Text>
                </View>
            )
        }
        return (
            <View style={{ flex: 0.2, flexDirection: 'row', marginTop: Sizes.fixPadding }}>
                <View style={{ flex: 0.5, paddingHorizontal: 10, alignItems: 'center' }}>
                    <FlatList data={Sanchardata} renderItem={renderItem} numColumns={2} keyExtractor={(item) => item.id} contentContainerStyle={styles.listContainer} />
                </View>
                <TouchableOpacity style={{ flex: 0.5, backgroundColor: 'white' }}>
                    <Image source={require('../../assests/images/sancharbanner.png')} style={{ width: '95%', resizeMode: 'contain', right: 5 }} />
                </TouchableOpacity>

            </View>
        )
    }

    function sanchartxt() {
        return (
            <Text style={{ fontSize: getFontSize(20), color: Colors.black, fontFamily: 'Montserrat-Regular', paddingHorizontal: Sizes.fixPadding }}>Sanchar</Text>
        )
    }

    function Imageline() {
        return (
            <View style={{ alignItems: 'center', marginTop: Sizes.fixPadding * 0.6 }}>
                <Image source={require('../../assests/images/homerectangle.png')} tintColor={'#E0DCDC'} />
            </View>
        )
    }
    function Imagepart() {
        return (
            <View style={{ height: SCREEN_WIDTH * 0.45 }}>
                <Image source={require('../../assests/images/homeimage.png')} style={{ resizeMode: 'contain', height: SCREEN_HEIGHT * 0.29, width: SCREEN_WIDTH }} />
            </View>
        )
    }
    function headerinfo() {
        const imageDimension = Math.min(SCREEN_HEIGHT, SCREEN_WIDTH) * 0.15;

        const clearAndGotoLogin = async () => {
            await AsyncStorage.clear()
            resetToScreen('login')
        }
        const onLogout = () => {
            Alert.alert('Alert!', 'Are you sure you want to log out', [
                { text: 'Cancel', style: 'cancel', },
                { text: 'Yes', style: 'destructive', onPress: () => clearAndGotoLogin() }
            ])
        }
        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Sizes.fixHorizontalPadding, paddingVertical: Sizes.fixPadding * 2, zIndex: 1, backgroundColor: Colors.primaryTheme }}>
                <View style={{ flex: 0.5, flexDirection: 'row', alignItems: 'center', }}>
                    <View style={{ flex: 0.3, }}>
                        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ height: SCREEN_WIDTH * 0.15, width: SCREEN_WIDTH * 0.15, borderWidth: 1, borderRadius: 100, overflow: 'hidden', borderColor: Colors.white }}>
                            <Image source={{ uri: customerdata?.image }} style={{ resizeMode: 'cover', height: SCREEN_WIDTH * 0.15, width: SCREEN_WIDTH * 0.15, borderRadius: 100, overflow: 'hidden' }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 8, height: SCREEN_HEIGHT * 0.06, flex: 0.7, justifyContent: 'center' }}>
                        <Text style={{ color: Colors.white, fontSize: getFontSize(16) }}>Welcome</Text>

                        <Text style={{ color: Colors.white, fontSize: getFontSize(13) }}> {customerdata?.name?.slice(0, 17) ?? 'Hello User'}</Text>
                    </View>
                </View>
                <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('wallet')}
                        style={{ flex: 0.8, justifyContent: 'flex-end', flexDirection: 'row' }}
                    >
                        <WalletIcon />

                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 0.1, paddingHorizontal: Sizes.fixHorizontalPadding * 2, right: 10 }}
                        onPress={() => {

                            navigation.navigate('Notification')
                        }}>
                        <NotificationIcon />

                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 0.1, paddingHorizontal: Sizes.fixHorizontalPadding * 2, right: 10, position: "relative" }}
                        onPress={() => {
                            const requestData = {
                                customerId: customerdata?._id
                            };
                            dispatch(ShoppingActions.getAddtocart(requestData));
                            navigation.navigate('shoppingcart')
                        }}>
                        {addtocartdata?.cart?.length > 0 ? (
                            <Text style={{
                                backgroundColor: "#530201",
                                color: "#fff",
                                position: "absolute",
                                right: 10,
                                top: -2,
                                zIndex: 99,
                                height: 14,
                                width: 14,
                                fontSize: 8,
                                textAlign: 'center',
                                borderRadius: 15
                            }}>{addtocartdata?.cart?.length}</Text>
                        ) : ""}

                        <CartIcon />


                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}
const mapStateToProps = state => ({
    bannerdata: state.bannerReducer.bannerdata,
    customerdata: state.registrationReducer.customerdata,
    addtocartdata: state.shoppingReducer.addtocartdata,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Home);



const styles = StyleSheet.create({
    listContainer: {
        justifyContent: 'space-between'
    }
})