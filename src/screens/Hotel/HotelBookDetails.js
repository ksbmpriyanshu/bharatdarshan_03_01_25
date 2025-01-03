import {
    FlatList, SafeAreaView, StyleSheet,
    Text, Button, TouchableOpacity,
    View, TextInput,
    ImageBackground,
    ProgressBar
} from 'react-native'
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import React, { useCallback, useEffect, useState } from 'react'
import { Colors, Fonts, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes, getFontSize, } from '../../assests/style'
import MyStatusBar from '../../components/StatusBar'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../../components/Loader'
import { useNavigation } from '@react-navigation/native'
import Header from '../../components/Header'
import { Rating } from 'react-native-elements'
import * as Progress from 'react-native-progress';
import { BottomSheet } from '@rneui/base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image, colors } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-reanimated-carousel'
import * as HotelActions from '../../redux/actions/HotelActions'
import moment from 'moment';
import { getToken } from '../../config/token';
import { fetchAndStoreIPv4Address } from '../../components/NetworkHelper';


const HotelBookDetails = ({ navigation, route, dispatch, hotelBookSearch, hotelDetailsData }) => {
    const [isVisible, setIsVisible] = useState(false);

    console.log('Book :::', route.params?.data,)

    const book = route.params?.data

    const handlePaymentBook = async () => {
        const netamount = parseFloat(hotelBookSearch?.HotelResult[0]?.Rooms[0].TotalTax) + parseFloat(hotelBookSearch?.HotelResult[0]?.Rooms[0].TotalFare);
        const ip = await fetchAndStoreIPv4Address();
        const payload = {
            booking_code: hotelBookSearch?.HotelResult[0]?.Rooms[0]?.BookingCode,
        };

        dispatch(HotelActions.getHotelPreBook(payload));
    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
            <Loader />
            <Header title={'Book Detail'} tintColor={Colors.white} />

            <FlatList

                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                ListHeaderComponent={
                    <>
                        <View style={{ flex: 1, }}>

                            <View style={{ backgroundColor: Colors.white }}>
                                {TopImageinfo()}
                            </View>

                        </View>

                    </>

                }

            />
            {buttonInfo()}
        </SafeAreaView>
    )

    function TopImageinfo() {
        return (
            <View style={{
                margin: 10,

            }}>

                <View style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 1,
                    borderWidth: 1,
                    borderColor: '#eee',
                    padding: 10,
                    borderRadius: 2
                }}>
                    <Text style={{ ...Fonts._14MontserratBold, textAlign: 'center' }}>Your Hotel Details </Text>
                    <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialIcons name="hotel" color={"black"} size={20} />
                            <Text style={{ ...Fonts._13MontserratMedium }}> {hotelDetailsData?.HotelName}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialIcons name="location-on" color={"black"} size={20} />
                            <Text style={{ ...Fonts._13MontserratMedium }}> {hotelDetailsData?.Address}</Text>
                        </View>

                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Text style={{ ...Fonts._14MontserratBold, textAlign: 'center' }}>Your Check Date: </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialIcons name="calendar-month" color={"black"} size={20} />
                            <Text style={{ ...Fonts._13MontserratMedium }}> Check IN : {book?.CheckIn}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                        <MaterialIcons name="calendar-month" color={"black"} size={20} />
                        <Text style={{ ...Fonts._13MontserratMedium }}> Check Out : {book?.CheckOut}</Text>
                        </View>
                       
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Text style={{ ...Fonts._14MontserratBold, textAlign: 'center' }}>Your Hotel Rooms </Text>
                        <Text style={{ ...Fonts._13MontserratMedium }}>No of Rooms : {book?.NoOfRooms}</Text>
                        <Text style={{ ...Fonts._13MontserratMedium }}>Name : {hotelBookSearch?.HotelResult[0]?.Rooms[0].Name[0]}</Text>
                        <Text style={{ ...Fonts._13MontserratMedium }}>Inclusion : {hotelBookSearch?.HotelResult[0]?.Rooms[0].Inclusion}</Text>
                    </View>
                    
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ ...Fonts._14MontserratBold, textAlign: 'center' }}>Your Guests </Text>
                        <Text style={{ ...Fonts._13MontserratMedium }}> Adult : {book?.Adults}</Text>
                        <Text style={{ ...Fonts._13MontserratMedium }}> Children : {book?.Children}</Text>
                    </View>
                    <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                        <Text style={{ ...Fonts._16MontserratMedium }}>Total Fare</Text>
                        <Text style={{ ...Fonts._13MontserratMedium }}>₹ {hotelBookSearch?.HotelResult[0]?.Rooms[0].TotalFare} </Text>
                    </View>
                    <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                        <Text style={{ ...Fonts._16MontserratMedium }}>Total Tax</Text>
                        <Text style={{ ...Fonts._13MontserratMedium }}>₹ {hotelBookSearch?.HotelResult[0]?.Rooms[0].TotalTax} </Text>
                    </View>
                    <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                        <Text style={{ ...Fonts._16MontserratMedium }}>Total Final</Text>
                        <Text style={{ ...Fonts._13MontserratMedium }}>₹ {parseFloat(hotelBookSearch?.HotelResult[0]?.Rooms[0].TotalTax) + parseFloat(hotelBookSearch?.HotelResult[0]?.Rooms[0].TotalFare)} </Text>
                    </View>
                </View>
            </View>
        )
    }



    function buttonInfo() {
        return (
            <TouchableOpacity onPress={() => handlePaymentBook()} style={{ bottom: SCREEN_WIDTH * 0.16, backgroundColor: Colors.primaryTheme, alignSelf: 'center', paddingHorizontal: SCREEN_WIDTH * 0.10, paddingVertical: 13, borderRadius: 15 }}>
                <View style={{ width: '80%' }}>
                    <Text style={{ ...Fonts._14MontserratLight, fontWeight: 'bold', color: 'white' }}>Book Confirmation</Text>
                </View>
            </TouchableOpacity>
        )
    }
}


const mapStateToProps = state => ({
    bannerdata: state.bannerReducer.bannerdata,
    customerdata: state.registrationReducer.customerdata,
    hotelDetailsData: state.hotelReducer.hotelDetailsData,
    hotelBookSearch: state.hotelReducer.hotelBookSearch,

});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(HotelBookDetails);



const styles = StyleSheet.create({

    calenderbutton: {
        borderWidth: 0.5,
        width: '100%',
        padding: 8,
        borderRadius: 5,
        marginVertical: 8
    },
    guestButton: {
        flexDirection: 'row',

        borderWidth: 0.5,
        height: SCREEN_HEIGHT * 0.06,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 5
    },
    bookbutton: {
        backgroundColor: Colors.primaryTheme,
        paddingHorizontal: 35,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 15,
        borderRadius: 10
    }

})