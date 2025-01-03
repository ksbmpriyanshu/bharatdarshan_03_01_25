import {
    FlatList, SafeAreaView, StyleSheet,
    Text, Button, TouchableOpacity,
    View, TextInput,
    ImageBackground,
    ProgressBar,
    ToastAndroid,
    useWindowDimensions,
    ScrollView
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Colors, Fonts, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes, getFontSize, } from '../../assests/style'
import MyStatusBar from '../../components/StatusBar'
import { connect } from 'react-redux'
import Loader from '../../components/Loader'
import Header from '../../components/Header'
import { BottomSheet } from '@rneui/base'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image, colors } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import Carousel from 'react-native-reanimated-carousel'
import * as HotelActions from '../../redux/actions/HotelActions'
import moment from 'moment';
import RenderHtml from 'react-native-render-html';
import {
    responsiveScreenHeight,
    responsiveScreenWidth,
    responsiveScreenFontSize
} from "react-native-responsive-dimensions";
const HotelDetail = ({ navigation, route, dispatch, hotelDetailsData, homeInput }) => {
    const [isVisible, setIsVisible] = useState(false);

    const [CheckInDate, setCheckInDate] = useState(homeInput?.check_in_date);
    const [CheckOutDate, setCheckOutDate] = useState(homeInput?.check_out_date);
    const [showIn, setShowIn] = useState(false);
    const [showOut, setShowOut] = useState(false);
    const [adultNumber, setAdultNumber] = useState(homeInput?.adults);
    const [childNumber, setChildNumber] = useState(homeInput?.children);
    const [roomNumber, setRoomNumber] = useState(homeInput?.rooms);
    const [desciptionVisible, setDesciptionVisible] = useState(false);
    const { width } = useWindowDimensions();

    const data = route?.params?.data;

    console.log('data ::', homeInput);

    useEffect(() => {
        const payload = {
            HotelCodes: data?.HotelCode
        };
        dispatch(HotelActions.getHotelDetails(payload));
    }, [data]);



    const onChangeCheckIn = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowIn(false);
        console.log(currentDate);
        const checkDate = moment(currentDate).format('YYYY-MM-DD');
        console.log(checkDate);
        setCheckInDate(checkDate);
    };

    const onChangeCheckOut = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowOut(false);
        const checkDate = moment(currentDate).format('YYYY-MM-DD');
        setCheckOutDate(checkDate);
    };

    const showDatePickerIn = () => {
        setShowIn(true);
    };

    const showDatePickerOut = () => {
        setShowOut(true);
    }

    const decreaseRoom = () => {
        setRoomNumber(roomNumber > 0 ? roomNumber - 1 : 0);
    };

    const increaseRoom = () => {
        setRoomNumber(roomNumber + 1);
    };



    const increaseAdult = () => {
        setAdultNumber(adultNumber + 1);
    };

    const decreaseAdult = () => {
        setAdultNumber(adultNumber > 0 ? adultNumber - 1 : 0);
    };

    const decreaseChild = () => {
        setChildNumber(childNumber > 0 ? childNumber - 1 : 0);
    };

    const increaseChild = () => {
        setChildNumber(childNumber + 1);
    };

    const handleSubmitBook = () => {

        if (!CheckInDate) {
            ToastAndroid.showWithGravityAndOffset("Please Select Check In Date Required!", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 75);
            return false;
        } else if (!CheckOutDate) {
            ToastAndroid.showWithGravityAndOffset("Please Select Check Out Date Required!", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 75);
            return false;
        } else if (adultNumber == 0) {
            ToastAndroid.showWithGravityAndOffset("Please Adult Number", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 75);
            return false;
        } else if (roomNumber == 0) {
            ToastAndroid.showWithGravityAndOffset("Please Number of Rooms", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 24, 75);
            return false;
        } else {
            const payload = {
                CheckIn: CheckInDate,
                CheckOut: CheckOutDate,
                HotelCodes: data?.HotelCode,
                GuestNationality: "IN",
                Adults: adultNumber,
                Children: childNumber,
                ChildrenAges: null,
                ResponseTime: null,
                IsDetailedResponse: false,
                Refundable: false,
                NoOfRooms: roomNumber,
                MealType: 0,
                OrderBy: 0,
                StarRating: 0,
                HotelName: null
            };
            setIsVisible(false);

            dispatch(HotelActions.getHotelBookSearch(payload));
        }

    }

    const dummyReviews = [];

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    const capitalizeFirstLetteronly = (name) => {
        // Split the name into parts based on spaces
        const nameParts = name.split(' ');
        // Get the first letter of the first part and capitalize it
        if (nameParts.length > 0) {
            const firstLetter = nameParts[0].charAt(0).toUpperCase();
            return firstLetter;
        }
        return ''; // Return empty string if name is empty or has no spaces
    };

    const handlePreBook = () => {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>",data?.BookingCode)
        const payload = {
            booking_code: data?.BookingCode,
        };

        dispatch(HotelActions.getHotelPreBook(payload));
    }

    return (
        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.primaryTheme }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
            <Loader />
            <Header title={'Hotel Details'} tintColor={Colors.white} />

            <FlatList

                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                ListHeaderComponent={
                    <>
                        <View style={{ flex: 1, }}>

                            <View style={{ backgroundColor: Colors.white }}>
                                {TopImageinfo()}
                                {DiscriptonInfo()}

                                {/* {overallRevieInfo()} */}
                                {hotelDetailsData?.HotelFacilities && ProgressBarInfo()}
                                {ReviewsInfo()}


                            </View>

                        </View>
                        {BookNowInfo()}

                    </>
                }
            />
            {buttonInfo()}

        </SafeAreaView>
    )

    function TopImageinfo() {
        const image = data?.Images || ['https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg'];
        const renderItem = ({ item }) => {

            return (

                <Image
                    source={{ uri: item }}
                    style={{
                        width: '100%',
                        height: SCREEN_WIDTH / 2,
                    }}
                    resizeMode="cover"
                />
            )
        }
        return (
            <View>
                <Carousel
                    loop={true}
                    width={SCREEN_WIDTH}
                    height={SCREEN_WIDTH / 2}
                    autoPlay
                    data={image}
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

    function DiscriptonInfo() {
        const description = hotelDetailsData?.Description.slice(0, 400) + '...';
        const description2 = hotelDetailsData?.Description;

        return (
            <View style={{ padding: 20, }}>
                <View style={styles.nameView}>
                    <Text style={styles.hotelName}>{data?.HotelName}</Text>
                    <Text style={{ ...Fonts._12MontserratMedium, marginTop: 4, }}> ₹{Math.floor(data?.price).toLocaleString('en-IN')}/day</Text>
                </View>

                <View>
                    <View style={styles.locationView}>
                        <Image source={require('../../assests/images/me/Vector.png')} style={{ width: 12, height: 16 }} />
                        <Text style={{ ...Fonts._12MontserratMedium, marginLeft: 5,width:responsiveScreenWidth(80) }}>{data?.Address}</Text>
                    </View>


                    <View>
                        <Text style={styles.description}>
                            Description
                        </Text>
                        <View>
                            {desciptionVisible ? (
                                <>
                                    <RenderHtml
                                        contentWidth={width}
                                        source={{ html: description2 }}
                                        tagsStyles={{ p: { color: '#767070', fontSize: 12, margin: 0, marginTop: 5 }, li: { color: '#767070', fontSize: 12, margin: 0, marginTop: 5 }, ul: { color: '#767070', fontSize: 12, margin: 0, marginTop: 5 }, b: { color: '#767070', fontSize: 12, margin: 0, marginTop: 5 } }}
                                    />
                                </>
                            ) : (
                                <>
                                    <RenderHtml
                                        contentWidth={width}
                                        source={{ html: description }}
                                        tagsStyles={{ p: { color: '#767070', fontSize: 12, margin: 0, marginTop: 5 }, li: { color: '#767070', fontSize: 12, margin: 0, marginTop: 5 }, ul: { color: '#767070', fontSize: 12, margin: 0, marginTop: 5 }, b: { color: '#767070', fontSize: 12, margin: 0, marginTop: 5 } }}
                                    />
                                </>
                            )}

                            <TouchableOpacity onPress={() => setDesciptionVisible(!desciptionVisible)}>
                                <Text style={{ color: Colors.primaryTheme }}>{desciptionVisible ? 'Read Less' : 'Read more'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        )
    };



    function overallRevieInfo() {
        return (
            <View style={{ marginHorizontal: SCREEN_WIDTH * 0.05, flex: 1 }}>
                <Text style={{ ...Fonts._18MontserratMedium }}>Guest Reviews</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{
                        ...Fonts._13MontserratLight,
                        marginTop: SCREEN_WIDTH * 0.02,
                        padding: 10,
                        backgroundColor: Colors.primaryTheme,
                        marginRight: SCREEN_WIDTH * 0.023,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10
                    }}>
                        4.1</Text>
                    <View>
                        <Text style={{ ...Fonts._14MontserratMedium }}> Very Good Reviews</Text>
                        <Text style={{ ...Fonts._12MontserratRegular }}> See all 1064 reviews</Text>
                    </View>
                </View>
            </View>
        )
    }

    function ProgressBarInfo() {


        const matchingFacilities = [
            { name: 'Free WiFi', image: require('../../assests/images/hotel_icon/FreeWiFi.png') },
            { name: 'Elevator', image: require('../../assests/images/hotel_icon/elevator.png') },
            { name: 'Swimming pool', image: require('../../assests/images/hotel_icon/Swimmingpool.png') },
            { name: 'Dry cleaning/laundry service', image: require('../../assests/images/hotel_icon/laundaryicon.png') },
            { name: 'Pool umbrellas', image: require('../../assests/images/hotel_icon/Poolumbrella.png') },
            { name: 'Number of bars/lounges - 1', image: require('../../assests/images/hotel_icon/Number_of_barslounges.png') },
            { name: 'Designated smoking areas', image: require('../../assests/images/hotel_icon/Designated_smoking_areas.png') },
            { name: 'Wheelchair accessible parking', image: require('../../assests/images/hotel_icon/Wheelchair_accessible.png') },
            { name: 'Roll-in shower (in select rooms)', image: require('../../assests/images/hotel_icon/Roll_in_shower.png') },
            { name: 'Fitness', image: require('../../assests/images/hotel_icon/Fitness.png') },
            { name: 'Laundry facilities', image: require('../../assests/images/hotel_icon/laundaryicon.png') },
            { name: 'Spa', image: require('../../assests/images/hotel_icon/spa.png') },
            { name: 'Garden', image: require('../../assests/images/hotel_icon/Garden.png') },
            { name: 'Couples/private dining', image: require('../../assests/images/hotel_icon/Couplesprivate_dining.png') },
            { name: 'Playground on site', image: require('../../assests/images/hotel_icon/Playground_on_site.png') },
            { name: 'Steam room', image: require('../../assests/images/hotel_icon/Steam_room.png') },
            { name: 'parking', image: require('../../assests/images/hotel_icon/parking.png') },
            { name: 'Free valet parking', image: require('../../assests/images/hotel_icon/velvet.png') }];

        const filteredFacilities = hotelDetailsData?.HotelFacilities.filter(facility =>
            matchingFacilities.some(match => match.name === facility)
        );


        return (
            <SafeAreaView style={{ paddingHorizontal: 20, }}>
                {filteredFacilities && (
                    <>
                        <Text style={styles.description}>Facilities</Text>

                        <View>
                            <ScrollView style={{ alignSelf: 'flex-start' }}>
                                {filteredFacilities.map(facility => {
                                    const facilityData = matchingFacilities.find(match => match.name === facility);
                                    return (
                                        <View key={facility} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                                            <Image source={facilityData.image} style={{ width: 30, height: 30, marginRight: 10 }} />
                                            <Text style={{ fontSize: 13, fontFamily: 'Montserrat-Medium', textAlign: 'left', color: 'black' }}>{facility}</Text>
                                        </View>
                                    );
                                })}
                            </ScrollView>
                        </View>
                    </>
                )}



            </SafeAreaView>
        );
    }

    function ReviewsInfo() {
        const renderReviewItem = ({ item }) => (
            <View style={{ marginBottom: SCREEN_WIDTH * 0.07 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <View style={{ backgroundColor: Colors.primaryTheme, padding: 8, paddingHorizontal: 10, marginRight: 15 }}>
                        <Text style={{ ...Fonts._18MontserratRegular }}>{capitalizeFirstLetteronly(item.name)}</Text>
                    </View>
                    <View>
                        <Text style={{ ...Fonts._16MontserratMedium }}>{capitalizeFirstLetter(item.name)}</Text>
                        <Text style={{ ...Fonts._12MontserratMedium }}>{item.date}</Text>

                    </View>
                </View>
                <Text style={{ ...Fonts._12MontserratRegular, marginTop: SCREEN_WIDTH * 0.02 }}>{item.review}</Text>
                <View style={{ borderBottomWidth: 1, marginTop: 8, borderColor: 'grey' }}></View>

            </View>
        );
        return (
            <View style={{ padding: 20 }}>
                <Text style={styles.description}>Reviews</Text>
                <View>
                    <FlatList
                        data={dummyReviews}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderReviewItem}
                        ListEmptyComponent={() => {
                            return (
                                <View>
                                    <Text style={{ color: 'black' }}>No Reviews Found</Text>
                                </View>
                            )
                        }}
                    />
                </View>
                <View style={{ paddingVertical: 60, }}></View>
            </View>
        )
    }

    function buttonInfo() {
        return (
            <TouchableOpacity onPress={() => handlePreBook()} style={{ bottom: SCREEN_WIDTH * 0.3, backgroundColor: Colors.primaryTheme, alignSelf: 'center', paddingHorizontal: SCREEN_WIDTH * 0.28, paddingVertical: 13, borderRadius: 15 }}>
                <View style={{ width: '80%' }}>
                    <Text style={{ ...Fonts._16MontserratMedium, color: 'white' }}>Book</Text>
                </View>
            </TouchableOpacity> 
        )
    }

    function BookNowInfo() {

        return (
            <SafeAreaView style={styles.papper}>
                <BottomSheet
                    onBackdropPress={() => {
                        setIsVisible(false)
                    }}
                    containerStyle={{
                        height: 100
                    }}
                    modalProps={{

                    }} isVisible={isVisible}>
                    <View
                        // onPress={() => setIsVisible(false)}
                        style={{ backgroundColor: 'white', borderTopRightRadius: 25, borderTopLeftRadius: 25, height: SCREEN_HEIGHT * 0.65 }}
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
                                <Text style={{ ...Fonts._18MontserratMedium, textAlign: 'center' }}>Select Check-In and Check-Out {'\n'} Date & Time</Text>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderStyle: 'dashed', marginVertical: SCREEN_WIDTH * 0.05, flexDirection: 'row' }}></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <View style={{}}>
                                    <View>
                                        <Text style={{ ...Fonts._14MontserratMedium }}> Check In Date</Text>
                                    </View>
                                    <View>
                                        <TouchableOpacity style={styles.calenderbutton} onPress={showDatePickerIn}>
                                            <Text style={{ ...Fonts._13MontserratRegular }}>{CheckInDate ? CheckInDate : 'Select Date'}</Text>
                                        </TouchableOpacity>
                                        {showIn && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={CheckInDate instanceof Date ? CheckInDate : new Date()}
                                                mode="date"
                                                display="default"
                                                minimumDate={new Date()}
                                                onChange={onChangeCheckIn}
                                            />
                                        )}

                                    </View>
                                    <Text style={{ ...Fonts._13MontserratMedium, marginVertical: SCREEN_HEIGHT * 0.01, marginVertical: SCREEN_HEIGHT * 0.01 }}>Adult</Text>
                                    <View style={styles.guestButton}>
                                        <TouchableOpacity activeOpacity={1} onPress={decreaseAdult} style={{ padding: 10, backgroundColor: Colors.primaryTheme, borderRadius: 100 }}>
                                            <Icon name="minus" size={10} color="black" />
                                        </TouchableOpacity>
                                        <Text style={{ ...Fonts._11MontserratMedium }}>{adultNumber}</Text>
                                        <TouchableOpacity activeOpacity={1} onPress={increaseAdult} style={{ padding: 10, backgroundColor: Colors.primaryTheme, borderRadius: 100 }}>
                                            <Icon name="plus" size={10} color="black" />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                                <View style={{ marginLeft: 15 }}>
                                    <View>
                                        <Text style={{ ...Fonts._14MontserratMedium }}> Check Out Date</Text>
                                    </View>
                                    <View>
                                        <TouchableOpacity style={styles.calenderbutton} onPress={showDatePickerOut}>
                                            <Text style={{ ...Fonts._13MontserratRegular }}>{CheckOutDate ? CheckOutDate : 'Select Date'}</Text>
                                        </TouchableOpacity>
                                        {showOut && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={CheckOutDate instanceof Date ? CheckOutDate : new Date()}
                                                mode="date"
                                                display="default"
                                                minimumDate={new Date()}
                                                onChange={onChangeCheckOut}
                                            />
                                        )}

                                    </View>


                                    <Text style={{ ...Fonts._13MontserratMedium, marginVertical: SCREEN_HEIGHT * 0.01 }}>Child</Text>
                                    <View style={styles.guestButton}>
                                        <TouchableOpacity activeOpacity={1} onPress={decreaseChild} style={{ padding: 10, backgroundColor: Colors.primaryTheme, borderRadius: 100 }}>
                                            <Icon name="minus" size={10} color="black" />
                                        </TouchableOpacity>
                                        <Text style={{ ...Fonts._11MontserratMedium }}>{childNumber}</Text>
                                        <TouchableOpacity activeOpacity={1} onPress={increaseChild} style={{ padding: 10, backgroundColor: Colors.primaryTheme, borderRadius: 100 }}>
                                            <Icon name="plus" size={10} color="black" />
                                        </TouchableOpacity>
                                    </View>

                                </View>

                            </View>
                            <View style={{ marginHorizontal: 30 }}>
                                <Text style={{ ...Fonts._13MontserratMedium, marginVertical: SCREEN_HEIGHT * 0.01 }}>Number of Rooms</Text>
                                <View style={styles.guestButton}>
                                    <TouchableOpacity activeOpacity={1} onPress={decreaseRoom} style={{ padding: 10, backgroundColor: Colors.primaryTheme, borderRadius: 100 }}>
                                        <Icon name="minus" size={10} color="black" />
                                    </TouchableOpacity>
                                    <Text style={{ ...Fonts._11MontserratMedium }}>{roomNumber}</Text>
                                    <TouchableOpacity activeOpacity={1} onPress={increaseRoom} style={{ padding: 10, backgroundColor: Colors.primaryTheme, borderRadius: 100 }}>
                                        <Icon name="plus" size={10} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginHorizontal: 30, justifyContent: 'space-between' }}>
                                <TouchableOpacity style={styles.bookbutton} onPress={() => handleSubmitBook()}>
                                    <Text style={{ ...Fonts._13MontserratLight, color: 'white', fontWeight: 'bold' }}>Book Now</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ ...styles.bookbutton, backgroundColor: 'white', borderWidth: 1.5, borderColor: 'black' }}>
                                    <Text style={{ ...Fonts._13MontserratLight, color: 'black', fontWeight: 'bold' }}>Cancel</Text>
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
    bannerdata: state.bannerReducer.bannerdata,
    customerdata: state.registrationReducer.customerdata,
    hotelDetailsData: state.hotelReducer.hotelDetailsData,
    homeInput: state.hotelReducer.homeInput
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(HotelDetail);



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
    nameView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    hotelName: {
        ...Fonts._14MontserratBold,
        fontSize: 18,
        width: responsiveScreenWidth(60)
    },
    locationView: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        marginTop: 8,

    },
    description: {
        ...Fonts._16MontserratMedium,
        marginTop: SCREEN_WIDTH * 0.05,
        color: "#645D5D"
    }

})