import {
    FlatList, SafeAreaView, StyleSheet,
    Text, Button, TouchableOpacity,
    View, TextInput,
    ImageBackground,
    ProgressBar,
    ToastAndroid,
    Dimensions,
    Animated
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { CheckBox } from '@rneui/themed';
import { showToastMessage } from '../../utils/services';


const HotelPayment = ({ navigation, route, dispatch, hotelBookSearch, preBook, bookConfirm, homeInput }) => {

    const [paxType, setPaxType] = useState(1);

    console.log('Home Input ::: ', homeInput);
    // const [adultInput, setAdultInput] = useState(1);

    const [adultTitles, setAdultTitles] = useState(
        homeInput?.paxRooms?.map(() => [])
    );

    const [adultFirstNames, setAdultFirstNames] = useState([[]]);  // Store first names
    const [adultLastNames, setAdultLastNames] = useState([[]]);   // Store last names

    const [childFirstNames, setChildFirstNames] = useState([[]]);  // Store children's first names
    const [childLastNames, setChildLastNames] = useState([[]]);    // Store children's last names

    const [childAges, setChildAges] = useState([[]]);    // State to store child ages
    const [adultInput, setAdultInput] = useState(null);   // For toggling adult input visibility
    const [childInput, setChildInput] = useState(null);   // For toggling child input visibility
    const [adultPhone, setAdultPhone] = useState([[]]);   // State to store phone numbers of adults
    const [adultEmail, setAdultEmail] = useState([[]]);   // State to store email addresses of adults
    const [adultPAN, setAdultPAN] = useState([[]]);       // State to store PAN numbers of adults
    const [adultPassport, setAdultPassport] = useState([[]]);
    const [adultAges, setAdultAges] = useState([[]]);

    // Handle first name input for adults
    const handleAdultFirstName = (text, roomIndex, adultIndex) => {
        const updatedFirstNames = [...adultFirstNames];
        if (!updatedFirstNames[roomIndex]) updatedFirstNames[roomIndex] = [];
        updatedFirstNames[roomIndex][adultIndex] = text;
        setAdultFirstNames(updatedFirstNames);
    };

    // Handle last name input for adults
    const handleAdultLastName = (text, roomIndex, adultIndex) => {
        const updatedLastNames = [...adultLastNames];
        if (!updatedLastNames[roomIndex]) updatedLastNames[roomIndex] = [];
        updatedLastNames[roomIndex][adultIndex] = text;
        setAdultLastNames(updatedLastNames);
    };


    // Handle phone number input for adults
    const handleAdultPhone = (text, roomIndex, adultIndex) => {
        const updatedPhone = [...adultPhone];
        if (!updatedPhone[roomIndex]) updatedPhone[roomIndex] = [];
        updatedPhone[roomIndex][adultIndex] = text;
        setAdultPhone(updatedPhone);
    };

    // Handle email input for adults
    const handleAdultEmail = (text, roomIndex, adultIndex) => {
        const updatedEmail = [...adultEmail];
        if (!updatedEmail[roomIndex]) updatedEmail[roomIndex] = [];
        updatedEmail[roomIndex][adultIndex] = text;
        setAdultEmail(updatedEmail);
    };

    // Handle PAN number input for adults
    const handleAdultPAN = (text, roomIndex, adultIndex) => {
        const updatedPAN = [...adultPAN];
        if (!updatedPAN[roomIndex]) updatedPAN[roomIndex] = [];
        updatedPAN[roomIndex][adultIndex] = text;
        setAdultPAN(updatedPAN);
    };

    // Handle passport number input for adults
    const handleAdultPassport = (text, roomIndex, adultIndex) => {
        const updatedPassport = [...adultPassport];
        if (!updatedPassport[roomIndex]) updatedPassport[roomIndex] = [];
        updatedPassport[roomIndex][adultIndex] = text;
        setAdultPassport(updatedPassport);
    };

    const handleAdultAges = (text, roomIndex, adultIndex) => {
        const updatedAges = [...adultAges];
        if (!updatedAges[roomIndex]) updatedAges[roomIndex] = [];
        updatedAges[roomIndex][adultIndex] = text;
        setAdultAges(updatedAges);
    }

    // Toggle visibility of adult input fields for a room
    const handleAdultVisible = (roomIndex) => {
        setAdultInput(adultInput === roomIndex ? null : roomIndex);
    };

    // Toggle visibility of child input fields for a room
    const handleChildVisible = (roomIndex) => {
        setChildInput(childInput === roomIndex ? null : roomIndex);
    };

    const handleAdultTitle = (title, roomIndex, adultIndex) => {
        console.log('title')
        const updatedTitles = [...adultTitles];
        if (!updatedTitles[roomIndex]) {
            updatedTitles[roomIndex] = [];
        }
        updatedTitles[roomIndex][adultIndex] = title;
        setAdultTitles(updatedTitles);
    };

    // Handle first name input for children
    const handleChildFirstName = (text, roomIndex, childIndex) => {
        const updatedFirstNames = [...childFirstNames];
        if (!updatedFirstNames[roomIndex]) updatedFirstNames[roomIndex] = [];
        updatedFirstNames[roomIndex][childIndex] = text;
        setChildFirstNames(updatedFirstNames);
    };

    // Handle last name input for children
    const handleChildLastName = (text, roomIndex, childIndex) => {
        const updatedLastNames = [...childLastNames];
        if (!updatedLastNames[roomIndex]) updatedLastNames[roomIndex] = [];
        updatedLastNames[roomIndex][childIndex] = text;
        setChildLastNames(updatedLastNames);
    };

    const handleChildAge = (text, roomIndex, childIndex) => {

    }



    const bookPayment = preBook?.data?.HotelResult[0]?.Rooms[0];

    const validationInfo = preBook?.data?.ValidationInfo;

    const validateHotelPassengers = (hotelPassengerPerRoom) => {
        const errors = [];

        if (!Array.isArray(hotelPassengerPerRoom)) {
            errors.push("hotelPassengerPerRoom must be an array.");
            return errors;
        }

        hotelPassengerPerRoom.forEach((room, roomIndex) => {
            if (!Array.isArray(room.HotelPassenger)) {
                errors.push(`Room ${roomIndex + 1}: HotelPassenger must be an array.`);
                return;
            }

            room.HotelPassenger.forEach((passenger, passengerIndex) => {
                if (!passenger.Title && passenger.PaxType === 1) {
                    errors.push(`Room ${roomIndex + 1}, Passenger ${passengerIndex + 1}: Title is required for adults.`);
                }
                if (!passenger.FirstName) {
                    errors.push(`Room ${roomIndex + 1}, Passenger ${passengerIndex + 1}: FirstName is required.`);
                }
                if (!passenger.LastName) {
                    errors.push(`Room ${roomIndex + 1}, Passenger ${passengerIndex + 1}: LastName is required.`);
                }
                if (passenger.PaxType === 1 && !passenger.Email) {
                    errors.push(`Room ${roomIndex + 1}, Passenger ${passengerIndex + 1}: Email is required for adults.`);
                }
                if (passenger.PaxType === 2 && !passenger.Age) {
                    errors.push(`Room ${roomIndex + 1}, Passenger ${passengerIndex + 1}: Age is required for children.`);
                }
                if (passenger.LeadPassenger && !passenger.Phoneno) {
                    errors.push(`Room ${roomIndex + 1}, Passenger ${passengerIndex + 1}: Phoneno is required for lead passengers.`);
                }
                // console.log('passenger.Age' ,passenger.Phoneno.length);
                if (!passenger.Age && passenger.PaxType === 1) {
                    errors.push(`Room ${roomIndex + 1}, Passenger ${passengerIndex + 1}: Ages is required for Adutls`);
                }
                if (passenger.Age && passenger.PaxType === 1 && passenger.Age < 18) {
                    errors.push(`Room ${roomIndex + 1}, Passenger ${passengerIndex + 1}: Adults must be 18 years or older.`);
                }
                if (passenger.Phoneno && passenger.PaxType === 1 && passenger.Phoneno.length !== 10) {
                    errors.push(`Room ${roomIndex + 1}, Passenger ${passengerIndex + 1}: Phone number for adults must be exactly 10 digits.`);
                }
            });
        });

        return errors;
    };

    const handlePaymentBook = async () => {

        console.log('adult Titles ::: ', !Array.isArray(adultTitles));
        const ip = await fetchAndStoreIPv4Address();
        const hotelPassengerPerRoom = homeInput.paxRooms?.map((room, roomIndex) => {
            const passengers = [];
            console.log('rooms', room)
            for (let adultIndex = 0; adultIndex < room.Adults; adultIndex++) {
                passengers.push({
                    Title: adultTitles[roomIndex]?.[adultIndex] || '',
                    FirstName: adultFirstNames[roomIndex]?.[adultIndex] || '',
                    MiddleName: '',
                    LastName: adultLastNames[roomIndex]?.[adultIndex] || '',
                    Email: adultEmail[roomIndex]?.[adultIndex] || '',
                    PaxType: 1,
                    LeadPassenger: true,
                    Age: adultAges[roomIndex]?.[adultIndex] || 0,
                    PassportNo: adultPassport[roomIndex]?.[adultIndex] || null,
                    Phoneno: adultPhone[roomIndex]?.[adultIndex] || '',
                    PaxId: 0,
                    PAN: adultPAN[roomIndex]?.[adultIndex] || null,
                });
            }


            for (let childIndex = 0; childIndex < room.Children; childIndex++) {
                passengers.push({
                    Title: 'Ms',
                    FirstName: childFirstNames[roomIndex]?.[childIndex] || '',
                    MiddleName: '',
                    LastName: childLastNames[roomIndex]?.[childIndex] || '',
                    Email: '',
                    PaxType: 2,
                    LeadPassenger: false,
                    Age: room.ChildrenAges[childIndex] || '',
                    PassportNo: null,
                    Phoneno: null,
                    PaxId: 0,
                    PAN: undefined,

                });
            }

            return {
                HotelPassenger: passengers
            };
        });

        console.log(JSON.stringify(hotelPassengerPerRoom, null, 2));

        const errors = validateHotelPassengers(hotelPassengerPerRoom);
        if (errors.length > 0) {
            console.log("Validation Errors:", errors);
            showToastMessage({ message: 'Enter the require Fields' });
            return false;
        } else {
            console.log("All passengers validated successfully.");
        }

        const payload = {
            BookingCode: route?.params?.data?.booking_code,
            EndUserIp: ip,
            NetAmount: (bookPayment?.NetAmount).toFixed(2),
            hotelpassenger: hotelPassengerPerRoom
        };

        console.log('payload :::', JSON.stringify(payload));
        // Dispatch actions for booking
        dispatch(HotelActions.onHotelBookPayment(payload));
        // dispatch(HotelActions.onBookConfrim(payload));
        // ToastAndroid.showWithGravityAndOffset('Coming Soon...', ToastAndroid.BOTTOM, ToastAndroid.SHORT, 25, 75);
    };



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
            <Loader />
            <Header title={'Hotel Book'} tintColor={Colors.white} />
            <FlatList
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                ListHeaderComponent={
                    <>
                        <View style={{ flex: 1, }}>
                            <View style={{ backgroundColor: Colors.white }}>
                                {adultForm()}

                                {TopImageinfo()}
                                {buttonInfo()}
                            </View>
                        </View>
                    </>
                }
            />
        </SafeAreaView>
    );

    function adultForm() {
        return (
            <View style={{ marginHorizontal: 20 }}>
                {/* Iterate over each room */}
                
                {homeInput.paxRooms?.map((room, roomIndex) => (
                    <View key={roomIndex} style={{ margin: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                            Room {roomIndex + 1}
                        </Text>

                        {/* Adult Inputs */}
                        {Array.from({ length: room.Adults })?.map((_, adultIndex) => (
                            <View key={`adult-${adultIndex}`} style={{ marginVertical: 5 }}>
                                {/* <TouchableOpacity
                                    onPress={() => handleAdultVisible(roomIndex)}
                                    style={{ padding: 5, flexDirection: 'row', alignItems: 'center',justifyContent:'space-between' }}
                                > */}
                                <Text style={{ fontSize: 13, color: 'black' }}>Adult {adultIndex + 1}</Text>
                                {/* {adultInput === roomIndex ? (
                                        <AntDesign name="down" color={'black'} size={14} />
                                    ) : (
                                        <AntDesign name="up" color={'black'} size={14} />
                                    )}
                                </TouchableOpacity> */}

                                {/* {adultInput === roomIndex && ( */}
                                <>
                                    {/* Title Selection for Adult */}
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 12, color: 'black' }}>Title: </Text>
                                        <CheckBox
                                            checked={adultTitles[roomIndex]?.[adultIndex] === 'Mr.'}
                                            onPress={() => handleAdultTitle('Mr.', roomIndex, adultIndex)}
                                        />
                                        <Text style={{ color: 'black', fontSize: 14,marginLeft:-15 }}>Mr.</Text>
                                        <CheckBox
                                            checked={adultTitles[roomIndex]?.[adultIndex] === 'Mrs.'}
                                            onPress={() => handleAdultTitle('Mrs.', roomIndex, adultIndex)}
                                        />
                                        <Text style={{ color: 'black', fontSize: 14,marginLeft:-15  }}>Mrs.</Text>
                                        <CheckBox
                                            checked={adultTitles[roomIndex]?.[adultIndex] === 'Miss'}
                                            onPress={() => handleAdultTitle('Miss', roomIndex, adultIndex)}
                                        />
                                        <Text style={{ color: 'black', fontSize: 14,marginLeft:-15  }}>Miss</Text>
                                    </View>

                                    {/* First Name Input for Adult */}
                                    <TextInput
                                        placeholder={`Enter Adult ${adultIndex + 1} First Name`}
                                        value={adultFirstNames[roomIndex]?.[adultIndex] || ''}  // Access first name
                                        onChangeText={(text) => handleAdultFirstName(text, roomIndex, adultIndex)}
                                        placeholderTextColor={'grey'}
                                        style={styles.textInput}
                                    />

                                    {/* Last Name Input for Adult */}
                                    <TextInput
                                        placeholder={`Enter Adult ${adultIndex + 1} Last Name`}
                                        value={adultLastNames[roomIndex]?.[adultIndex] || ''}  // Access last name
                                        onChangeText={(text) => handleAdultLastName(text, roomIndex, adultIndex)}
                                        placeholderTextColor={'grey'}
                                        style={styles.textInput}
                                    />

                                    {/* Phone Input for Adult */}
                                    <TextInput
                                        placeholder={`Enter Adult ${adultIndex + 1} Phone`}
                                        value={adultPhone[roomIndex]?.[adultIndex] || ''}
                                        onChangeText={(text) => handleAdultPhone(text, roomIndex, adultIndex)}
                                        placeholderTextColor={'grey'}
                                        style={styles.textInput}
                                        maxLength={10}
                                        keyboardType='numeric'
                                        onEndEditing={(e) => {
                                            if (e.nativeEvent.text.length < 10) {
                                                showToastMessage({ message: 'Phone number must be at least 10 digits' });
                                            }
                                        }}
                                    />
                                    {/* Email Input for Adult */}
                                    <TextInput
                                        placeholder={`Enter Adult ${adultIndex + 1} Email`}
                                        value={adultEmail[roomIndex]?.[adultIndex] || ''}
                                        onChangeText={(text) => handleAdultEmail(text, roomIndex, adultIndex)}
                                        placeholderTextColor={'grey'}
                                        style={styles.textInput}
                                        keyboardType='email-address'
                                        onEndEditing={(e) => {
                                            const email = e.nativeEvent.text;
                                            if (email && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {

                                               showToastMessage({message:'Please enter a valid email address'});
                                            }
                                        }}
                                    />

                                    {/* Ages Input for Adult */}
                                    <TextInput
                                        placeholder={`Enter Adult ${adultIndex + 1} Age`}
                                        value={adultAges[roomIndex]?.[adultIndex] || ''}
                                        onChangeText={(text) => handleAdultAges(text, roomIndex, adultIndex)}
                                        placeholderTextColor={'grey'}
                                        style={styles.textInput}
                                    />
                                    {/* PAN Input for Adult */}
                                    {validationInfo?.PanMandatory && (
                                        <TextInput
                                            placeholder={`Enter Adult ${adultIndex + 1} PAN`}
                                            value={adultPAN[roomIndex]?.[adultIndex] || ''}
                                            onChangeText={(text) => handleAdultPAN(text, roomIndex, adultIndex)}
                                            placeholderTextColor={'grey'}
                                            style={styles.textInput}
                                        />
                                    )}

                                    {/* Passport Number Input for Adult */}
                                    {validationInfo?.PassportMandatory && (
                                        <TextInput
                                            placeholder={`Enter Adult ${adultIndex + 1} Passport Number`}
                                            value={adultPassport[roomIndex]?.[adultIndex] || ''}
                                            onChangeText={(text) => handleAdultPassport(text, roomIndex, adultIndex)}
                                            placeholderTextColor={'grey'}
                                            style={styles.textInput}
                                        />
                                    )}
                                </>
                                {/* )} */}
                            </View>
                        ))}

                        {/* Children Inputs */}
                        {Array.from({ length: room.Children })?.map((_, childIndex) => (
                            <View key={`child-${childIndex}`} style={{ marginVertical: 5 }}>
                                {/* <TouchableOpacity
                                    onPress={() => handleChildVisible(roomIndex)}
                                    style={{ padding: 5, flexDirection: 'row', alignItems: 'center',justifyContent:'space-between' }}
                                > */}
                                <Text style={{ fontSize: 13, color: 'black' }}>Child {childIndex + 1}</Text>
                                {/* {childInput === roomIndex ? (
                                        <AntDesign name="down" color={'black'} size={14} />
                                    ) : (
                                        <AntDesign name="up" color={'black'} size={14} />
                                    )} */}
                                {/* </TouchableOpacity> */}

                                {/* {childInput === roomIndex && ( */}
                                <>
                                    {/* First Name Input for Child */}
                                    <TextInput
                                        placeholder={`Enter Child ${childIndex + 1} First Name`}
                                        value={childFirstNames[roomIndex]?.[childIndex] || ''}  // Access child's first name
                                        onChangeText={(text) => handleChildFirstName(text, roomIndex, childIndex)}
                                        placeholderTextColor={'grey'}
                                        style={styles.textInput}
                                    />

                                    {/* Last Name Input for Child */}
                                    <TextInput
                                        placeholder={`Enter Child ${childIndex + 1} Last Name`}
                                        value={childLastNames[roomIndex]?.[childIndex] || ''}  // Access child's last name
                                        onChangeText={(text) => handleChildLastName(text, roomIndex, childIndex)}
                                        placeholderTextColor={'grey'}
                                        style={styles.textInput}
                                    />

                                    {/* Age Input for Child */}
                                    <TextInput
                                        editable={false}
                                        placeholder={`Enter Child ${childIndex + 1} Age`}
                                        value={childAges[roomIndex]?.[childIndex] || room.ChildrenAges[childIndex]}
                                        onChangeText={(text) => handleChildAge(text, roomIndex, childIndex)}
                                        placeholderTextColor={'grey'}
                                        style={styles.textInput}
                                    />
                                </>
                                {/* )} */}
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        );
    }

    function TopImageinfo() {
        return (
            <View style={{ paddingHorizontal: 20, marginTop: 20, }}>
                {bookPayment && (
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ ...Fonts._14MontserratBold, fontSize: 18, }}>Payment Details </Text>
                        <Text style={{ ...Fonts._13MontserratMedium }}>₹{(bookPayment?.NetAmount).toFixed(2)}</Text>
                    </View>
                )}

            </View>
        )
    }



    function buttonInfo() {
        return (
            <View style={{ paddingHorizontal: 20 }}>
                <TouchableOpacity
                    onPress={() => {
                        
                            handlePaymentBook()
                       



                    }}
                    style={{
                        backgroundColor: Colors.primaryTheme,
                        borderRadius: 5,
                        paddingVertical: 10,
                        marginTop: 10,
                        width: responsiveScreenWidth(88),
                        alignSelf: "center"
                    }}>
                    <View >
                        <Text style={{ ...Fonts._14MontserratLight, fontWeight: 'bold', textAlign: "center", color: 'white' }}>Book</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ paddingVertical: 10 }}></View>
            </View>
        )
    }
}


const mapStateToProps = state => ({
    bannerdata: state.bannerReducer.bannerdata,
    customerdata: state.registrationReducer.customerdata,
    hotelDetailsData: state.hotelReducer.hotelDetailsData,
    hotelBookSearch: state.hotelReducer.hotelBookSearch,
    preBook: state.hotelReducer.preBook,
    bookConfirm: state.hotelReducer.bookConfirm,
    homeInput: state.hotelReducer.homeInput

});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(HotelPayment);



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
    inputBox: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        color: 'black',
        paddingLeft: 10,
        fontSize: 13,
    },
    inputstyles: {
        margin: 5
    },
    shodaw: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 7,
        elevation: 2,
        backgroundColor: '#eee',
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    animatedView: {



    },

    textInput: {
        borderWidth: 1,
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,  // Adds rounded corners
        backgroundColor: '#f8f8f8',  // Light background color
        shadowColor: '#000',  // Shadow color for iOS and Android
        shadowOffset: { width: 0, height: 2 },  // Shadow offset
        shadowOpacity: 0.3,  // Shadow opacity for iOS
        shadowRadius: 5,  // Shadow blur radius for iOS
        elevation: 3,  // Elevation for Android shadow effect
    },
})