import {
    FlatList, SafeAreaView, StyleSheet,
    Text, Button, TouchableOpacity,
    View, TextInput,
    ImageBackground,
    ProgressBar,
    ToastAndroid,
    Dimensions
} from 'react-native'
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import React, { useCallback, useEffect, useState, useRef } from 'react'
import { Colors, Fonts, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes, getFontSize, } from '../../assests/style'
import MyStatusBar from '../../components/StatusBar'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../../components/Loader'
import { useNavigation } from '@react-navigation/native'
import Header from '../../components/Header'
import * as HotelActions from '../../redux/actions/HotelActions'
import moment from 'moment';
import { getToken } from '../../config/token';
import { fetchAndStoreIPv4Address } from '../../components/NetworkHelper';
import { Dropdown } from 'react-native-element-dropdown';
import { resetToScreen } from '../../navigations/NavigationServices';
import { BottomSheet } from '@rneui/base'


const HotelListData = ({ dispatch, HotelListDetails,hotelAuth,route }) => {
    // console.log('booking code ===',route?.params?.data?.booking_code)
    const [remarks, setRemarks] = useState(null);
    const [isVisible,setIsVisible] = useState(false);

    useEffect(() => {
        async function fetchHotelListData() {

            const ip = await fetchAndStoreIPv4Address();
            const payload = {
                EndUserIp: ip,
                // TokenId: hotelAuth?.data?.TokenId,
                TokenId: hotelAuth?.data?.TokenId,
                TraceId: route?.params?.data?.TraceId
            };

            console.log('payload :::', payload);
            dispatch(HotelActions.getHotelListDetails(payload));
        };

        fetchHotelListData();

    }, [dispatch]);

    const data = HotelListDetails?.message;

    console.log('data :::', hotelAuth)


    const handleCancel = async () => {
        console.log(remarks)
        if(!remarks) {
            ToastAndroid.showWithGravityAndOffset('Please Enter Remarks', ToastAndroid.BOTTOM, ToastAndroid.SHORT, 25, 75);
        } else {
            const ip = await fetchAndStoreIPv4Address();
            const payload = {
                EndUserIp: ip,
                TokenId:  hotelAuth?.data?.TokenId,
                BookingId: data?.GetBookingDetailResult?.BookingId,
                RequestType: 4,
                Remarks: remarks
            }
            dispatch(HotelActions.onHotelCancel(payload));
        }       
    }

    const handleHome = async() => {
        resetToScreen('home')
    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
            <Loader />
            <Header title={'Hotel List Details'} tintColor={Colors.white} />

            <FlatList

                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                ListHeaderComponent={
                    <>
                        <View style={{ flex: 1, }}>

                            <View style={{ backgroundColor: Colors.white }}>
                                {HotelListData()}
                                {buttonCancel()}
                            </View>

                        </View>
                        {BookCancelInfo()}
                    </>

                }

            />

        </SafeAreaView>
    );

    function buttonCancel() {
        return (
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                <TouchableOpacity onPress={() => setIsVisible(true)} style={{ marginBottom: SCREEN_WIDTH * 0.16, backgroundColor: Colors.primaryTheme, alignSelf: 'center', paddingHorizontal: SCREEN_WIDTH * 0.10, paddingVertical: 13, borderRadius: 15 }}>
                        <View style={{ }}>
                            <Text style={{ ...Fonts._14MontserratLight, fontWeight: 'bold', color: 'white' }}>Cancel</Text>
                        </View>
                    </TouchableOpacity>
            <TouchableOpacity onPress={() => handleHome()} style={{ marginBottom: SCREEN_WIDTH * 0.16, backgroundColor: Colors.primaryTheme, alignSelf: 'center', paddingHorizontal: SCREEN_WIDTH * 0.10, paddingVertical: 13, borderRadius: 15 }}>
                        <View style={{ }}>
                            <Text style={{ ...Fonts._14MontserratLight, fontWeight: 'bold', color: 'white' }}>Home</Text>
                        </View>
                    </TouchableOpacity>
            </View>
            
        )
    }

    function HotelListData() {
        return (
            <View style={styles.box}>
                <Text style={{ ...Fonts._14MontserratBold, textAlign: 'center', padding: 10 }}>Hotel Book Details</Text>
                <View style={styles.text}>
                    <Text style={{ ...Fonts._13MontserratMedium }}>Trace Id:</Text>
                    <Text style={{ ...Fonts._12MontserratMedium }}> {data?.GetBookingDetailResult?.TraceId}</Text>
                </View>
                <View style={styles.text}>
                    <Text style={{ ...Fonts._13MontserratMedium }}>Booking Status:</Text>
                    <Text style={{ ...Fonts._12MontserratMedium }}> {data?.GetBookingDetailResult?.HotelBookingStatus}</Text>
                </View>
                <View style={styles.text}>
                    <Text style={{ ...Fonts._13MontserratMedium }}>Confirmation No:</Text>
                    <Text style={{ ...Fonts._12MontserratMedium }}> {data?.GetBookingDetailResult?.ConfirmationNo}</Text>
                </View>
                <View style={styles.text}>
                    <Text style={{ ...Fonts._13MontserratMedium }}>Booking Ref No:</Text>
                    <Text style={{ ...Fonts._12MontserratMedium }}> {data?.GetBookingDetailResult?.BookingRefNo}</Text>
                </View>
                <View style={styles.text}>
                    <Text style={{ ...Fonts._13MontserratMedium }}>Booking Id:</Text>
                    <Text style={{ ...Fonts._12MontserratMedium }}> {data?.GetBookingDetailResult?.BookingId}</Text>
                </View>
                <View style={styles.text}>
                    <Text style={{ ...Fonts._13MontserratMedium }}>Booking Date:</Text>
                    <Text style={{ ...Fonts._12MontserratMedium }}> {moment(data?.GetBookingDetailResult?.BookingDate).format('DD-MM-YYYY HH:mm:ss')}</Text>
                </View>
                <View style={styles.text}>
                    <Text style={{ ...Fonts._13MontserratMedium }}>Check In Date:</Text>
                    <Text style={{ ...Fonts._12MontserratMedium }}> {moment(data?.GetBookingDetailResult?.CheckInDate).format('DD-MM-YYYY')}</Text>
                </View>
                <View style={styles.text}>
                    <Text style={{ ...Fonts._13MontserratMedium }}>Check Out Date:</Text>
                    <Text style={{ ...Fonts._12MontserratMedium }}> {moment(data?.GetBookingDetailResult?.CheckOutDate).format('DD-MM-YYYY')}</Text>
                </View>
                <Text style={{ ...Fonts._14MontserratBold, textAlign: 'center', padding: 10 }}>Hotel Details</Text>
                <View style={styles.text}>
                    <Text style={{ ...Fonts._13MontserratMedium }}>Home Name:</Text>
                    <Text style={{ ...Fonts._12MontserratMedium }}> {data?.GetBookingDetailResult?.HotelName}</Text>
                </View>
                <View style={styles.text}>
                    <Text style={{ ...Fonts._13MontserratMedium }}>Address Line 1:</Text>
                    <Text style={{ ...Fonts._12MontserratMedium,width:'50%',textAlign:'right' }}>{data?.GetBookingDetailResult?.AddressLine1}</Text>
                </View>
                <View style={styles.text}>
                    <Text style={{ ...Fonts._13MontserratMedium }}>City:</Text>
                    <Text style={{ ...Fonts._12MontserratMedium,width:'50%',textAlign:'right' }}>{data?.GetBookingDetailResult?.City}</Text>
                </View>
                {data?.GetBookingDetailResult?.Rooms.map((item, index) => (


                    <View key={index} style={{}}>
                        {/*  Hotel Passenger */}
                        {item?.HotelPassenger.map((item, index) => (
                            <View key={index}>
                                <Text style={{ ...Fonts._14MontserratBold, textAlign: 'center' }}>Person {index + 1}</Text>
                                <View style={styles.text}>
                                    <Text style={{ ...Fonts._13MontserratMedium }}>Title :</Text>
                                    <Text style={{ ...Fonts._12MontserratMedium }}> {item?.Title}</Text>
                                </View>
                                <View style={styles.text}>
                                    <Text style={{ ...Fonts._13MontserratMedium }}>First Name:</Text>
                                    <Text style={{ ...Fonts._12MontserratMedium }}> {item?.FirstName}</Text>
                                </View>
                                <View style={styles.text}>
                                    <Text style={{ ...Fonts._13MontserratMedium }}>Last Name:</Text>
                                    <Text style={{ ...Fonts._12MontserratMedium }}> {item?.LastName}</Text>
                                </View>
                                <View style={styles.text}>
                                    <Text style={{ ...Fonts._13MontserratMedium }}>Mobile Number:</Text>
                                    <Text style={{ ...Fonts._12MontserratMedium }}> {item?.Phoneno}</Text>
                                </View>
                                <View style={styles.text}>
                                    <Text style={{ ...Fonts._13MontserratMedium }}>Email Id:</Text>
                                    <Text style={{ ...Fonts._12MontserratMedium }}> {item?.Email}</Text>
                                </View>
                                <View style={styles.text}>
                                    <Text style={{ ...Fonts._13MontserratMedium }}>Pan Card:</Text>
                                    <Text style={{ ...Fonts._12MontserratMedium }}> {item?.PAN}</Text>
                                </View>
                                <View style={styles.text}>
                                    <Text style={{ ...Fonts._13MontserratMedium }}>Pax Id:</Text>
                                    <Text style={{ ...Fonts._12MontserratMedium }}> {item?.PaxId}</Text>
                                </View>
                                <View style={styles.text}>
                                    <Text style={{ ...Fonts._13MontserratMedium }}>Pax Type:</Text>
                                    <Text style={{ ...Fonts._12MontserratMedium }}> {item?.PaxType}</Text>
                                </View>
                            </View>
                        ))}
                        <Text style={{ ...Fonts._14MontserratBold, textAlign: 'center', padding: 10 }}>Room Details</Text>
                        <View style={styles.text}>
                            <Text style={{ ...Fonts._13MontserratMedium }}>Adult Count:</Text>
                            <Text style={{ ...Fonts._12MontserratMedium }}> {item?.AdultCount}</Text>
                        </View>

                        <View style={styles.text}>
                            <Text style={{ ...Fonts._13MontserratMedium }}>Child Count:</Text>
                            <Text style={{ ...Fonts._12MontserratMedium }}> {item?.ChildCount}</Text>
                        </View>

                        <View style={styles.text}>
                            <Text style={{ ...Fonts._13MontserratMedium }}>Room Id:</Text>
                            <Text style={{ ...Fonts._12MontserratMedium }}> {item?.RoomId}</Text>
                        </View>

                        <View style={styles.text}>
                            <Text style={{ ...Fonts._13MontserratMedium }}>Smoking Preference:</Text>
                            <Text style={{ ...Fonts._12MontserratMedium }}>{item?.SmokingPreference}</Text>

                        </View>
                        <View style={styles.text}>
                            <Text style={{ ...Fonts._13MontserratMedium }}>CurrencyCode:</Text>
                            <Text style={{ ...Fonts._12MontserratMedium }}>{item?.PriceBreakUp?.CurrencyCode}</Text>
                        </View>
                        <Text style={{ ...Fonts._14MontserratBold, textAlign: 'center', padding: 10 }}>Room Price & Tax</Text>
                        <View style={styles.text}>
                            <Text style={{ ...Fonts._13MontserratMedium }}>Room Rate:</Text>
                            <Text style={{ ...Fonts._12MontserratMedium }}> ₹ {item?.PriceBreakUp?.RoomRate}</Text>
                        </View>
                        <View style={styles.text}>
                            <Text style={{ ...Fonts._13MontserratMedium }}>Room Tax:</Text>
                            <Text style={{ ...Fonts._12MontserratMedium }}> ₹ {item?.PriceBreakUp?.RoomTax}</Text>
                        </View>
                        <View style={styles.text}>
                            <Text style={{ ...Fonts._13MontserratMedium }}>Room Extra Guest Charges:</Text>
                            <Text style={{ ...Fonts._12MontserratMedium }}> ₹ {item?.PriceBreakUp?.RoomExtraGuestCharges}</Text>
                        </View>
                        <View style={styles.text}>
                            <Text style={{ ...Fonts._13MontserratMedium }}>Room Child Charges:</Text>
                            <Text style={{ ...Fonts._12MontserratMedium }}> ₹ {item?.PriceBreakUp?.RoomChildCharges}</Text>
                        </View>
                        <View style={styles.text}>
                            <Text style={{ ...Fonts._13MontserratMedium }}>Service Fee:</Text>
                            <Text style={{ ...Fonts._12MontserratMedium }}> ₹ {item?.PriceBreakUp?.ServiceFee}</Text>
                        </View>
                        {/* <View style={styles.text}>
                            <Text style={{...Fonts._13MontserratMedium}}>Agent Commission:</Text>
                            <Text style={{...Fonts._12MontserratMedium}}> {item?.PriceBreakUp?.AgentCommission}</Text>
                        </View> */}
                        <Text style={{ ...Fonts._14MontserratBold, textAlign: 'center', padding: 10 }}>GST Tax</Text>

                        <View style={styles.text}>
                            <Text style={{ ...Fonts._13MontserratMedium }}>{item?.PriceBreakUp.TaxBreakup[0]?.TaxType == 'Tax_CGST' ? 'CGST' : ''}:</Text>
                            <Text style={{ ...Fonts._12MontserratMedium }}> ₹ {item?.PriceBreakUp.TaxBreakup[0]?.TaxAmount}</Text>
                        </View>
                        <View style={styles.text}>
                            <Text style={{ ...Fonts._13MontserratMedium }}>{item?.PriceBreakUp.TaxBreakup[1]?.TaxType == 'Tax_IGST' ? 'IGST' : ''}:</Text>
                            <Text style={{ ...Fonts._12MontserratMedium }}> ₹ {item?.PriceBreakUp?.TaxBreakup[1]?.TaxAmount}</Text>
                        </View>
                        <View style={styles.text}>
                            <Text style={{ ...Fonts._13MontserratMedium }}>{item?.PriceBreakUp.TaxBreakup[2]?.TaxType == 'Tax_SGST' ? 'SGST' : ''}:</Text>
                            <Text style={{ ...Fonts._12MontserratMedium }}> ₹ {item?.PriceBreakUp?.TaxBreakup[2]?.TaxAmount}</Text>
                        </View>
                        <View style={styles.text}>
                            <Text style={{ ...Fonts._13MontserratMedium }}>{item?.PriceBreakUp.TaxBreakup[3]?.TaxType == 'Tax_TCS' ? 'TCS' : ''}:</Text>
                            <Text style={{ ...Fonts._12MontserratMedium }}> ₹ {item?.PriceBreakUp?.TaxBreakup[3]?.TaxAmount}</Text>
                        </View>
                        <View style={styles.text}>
                            <Text style={{ ...Fonts._13MontserratMedium }}>{item?.PriceBreakUp.TaxBreakup[4]?.TaxType == 'Tax_TDS' ? 'TDS' : ''}:</Text>
                            <Text style={{ ...Fonts._12MontserratMedium }}> ₹ {item?.PriceBreakUp?.TaxBreakup[4]?.TaxAmount}</Text>
                        </View>

                    </View>

                ))}
                <Text style={{ ...Fonts._14MontserratBold, textAlign: 'center', padding: 10 }}>Final Amount</Text>
                <View style={styles.text}>
                    <Text style={{ ...Fonts._13MontserratMedium }}>Net Amount:</Text>
                    <Text style={{ ...Fonts._12MontserratMedium }}> ₹ {data?.GetBookingDetailResult?.NetAmount}</Text>
                </View>
                <View style={styles.text}>
                    <Text style={{ ...Fonts._13MontserratMedium }}>Net Tax:</Text>
                    <Text style={{ ...Fonts._12MontserratMedium }}> ₹ {data?.GetBookingDetailResult?.NetTax}</Text>
                </View>
            </View>
        )
    }

    function BookCancelInfo() {

        return (
            <SafeAreaView style={styles.papper}>
                <BottomSheet
                    onBackdropPress={() => {
                        setIsVisible(false)
                    }}
                    containerStyle={{
                        height: 80
                    }}
                    modalProps={{

                    }} isVisible={isVisible}>
                    <View
                        // onPress={() => setIsVisible(false)}
                        style={{ backgroundColor: 'white', borderTopRightRadius: 25, borderTopLeftRadius: 25, height: SCREEN_HEIGHT * 0.55 }}
                    >
                        <View style={{
                            alignSelf: 'center',
                            borderBottomColor: Colors.grayB,
                            borderBottomWidth: 2,
                            marginTop: SCREEN_WIDTH * 0.04,
                            width: SCREEN_WIDTH * 0.2,
                        }}></View>
                        <View style={{ borderBottomWidth: 0.5, borderStyle: 'dashed', marginVertical: SCREEN_WIDTH * 0.05 }}></View>

                        <View>
                            <View style={{}}>
                                <Text style={{ ...Fonts._18MontserratMedium, textAlign: 'center' }}>Hotel Cancel</Text>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderStyle: 'dashed', marginVertical: SCREEN_WIDTH * 0.05, flexDirection: 'row' }}></View>
                            <View style={{margin:10}}>
                            <Text style={{...Fonts._13MontserratMedium,paddingBottom:10}}>Remarks</Text>
                            <TextInput 
                            onChangeText={setRemarks}
                            value={remarks}
                            style={{color:'black',borderWidth:1,borderColor:'black',borderRadius:10}}
                            multiline={true}
                            numberOfLines={8} 
                            textAlignVertical='top'
                            placeholder='Enter Your Remarks'
                            placeholderTextColor={'#ddd'}
                            />
                            </View>
                            <View>
                            <TouchableOpacity onPress={() => handleCancel(true)} style={{ marginBottom: SCREEN_WIDTH * 0.16, backgroundColor: Colors.primaryTheme, alignSelf: 'center', paddingHorizontal: SCREEN_WIDTH * 0.10, paddingVertical: 13, borderRadius: 15 }}>
                        <View style={{ }}>
                            <Text style={{ ...Fonts._14MontserratLight, fontWeight: 'bold', color: 'white' }}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </BottomSheet>

            </SafeAreaView>
        )
    }
}


const mapStateToProps = state => ({
    HotelListDetails: state.hotelReducer.HotelListDetails,
    hotelAuth: state.hotelReducer.hotelAuth
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(HotelListData);



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
    },
    box: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        color: 'black',
        margin: 10,
        padding: 10
    },
    inputstyles: {
        margin: 5
    },
    text: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
    }

})