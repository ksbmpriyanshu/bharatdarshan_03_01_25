import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors, Sizes, Fonts, SCREEN_WIDTH } from "../../../../../assests/style";
import { CheckBox } from '@rneui/themed';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Input } from "@rneui/themed";
import { showToastMessage } from '../../../../../utils/services';
import * as FlightActions from "../../../../../redux/actions/FlightActions";
import { connect, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
const SeatmapBookingDetails = ({ dispatch }) => {
    const navigation = useNavigation();
    const route = useRoute();
    const { farePrice } = route.params;
    const newSearchKey = useSelector(state => state.flightReducer.cyrusFlightListData);
    const newFlightKey = useSelector(state => state.flightReducer.repriceData);
    const flightKey = newFlightKey?.data[0]?.Flight?.Flight_Key
    const searchKey = newSearchKey?.Search_Key
//     console.log(newFlightKey,"form field flight key-----------------------------")
//    console.log(newSearchKey?.Search_Key,"form field search key================")

    const [selectedTitle, setSelectedTitle] = useState('Mr');
    const [firstName, setFirstName] = useState('Priyanshu');
    const [lastName, setLastName] = useState('Kushwaha');
    const [selectedGender, setSelectedGender] = useState('0');
    const [dateText, setDateText] = useState();
    const [passportNumber, setPassportNumber] = useState('A12345678');
    const [passportCountry, setPassportCountry] = useState('India');
    const [passportExpiryDate, setPassportExpiryDate] = useState('12/31/2024');
    const [nationality, setNationality] = useState('Indian')
    const [age, setAge] = useState('');
    const calculateAge = (dob) => {
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        setAge(age.toString());
    };
    const seatmapData = {
        "Pax_Id": "0",
        "Pax_type": "0",
        "Title": selectedTitle,
        "First_Name": firstName,
        "Last_Name": lastName,
        "Gender": selectedGender,
        "Age": age,
        "DOB": dateText,
        "Passport_Number": passportNumber,
        "Passport_Issuing_Country":passportCountry,
        "Passport_Expiry": passportExpiryDate,
        "Nationality": nationality,
        "FrequentFlyerDetails": ""
    }

    const getSeatMaps= async()=>{
     console.log(seatmapData,"seatmap>>>>>>>>>>")
     const requestBody = {
        methodname: "AirSeatMaps",
        opid: "567",
        txnid: "6380022247134564211",
        requestdata: {
            Search_Key: searchKey,
            Flight_Keys: [flightKey],
            PAX_Details: [
                {
                    Pax_Id: 1,
                    Pax_type: 0,
                    Title: selectedTitle,
                    First_Name: firstName,
                    Last_Name: lastName,
                    Gender: selectedGender,
                    Age: age,
                    DOB: dateText, 
                    Passport_Number: passportNumber,
                    Passport_Issuing_Country: passportCountry,
                    Passport_Expiry: passportExpiryDate,
                    Nationality: nationality,
                    FrequentFlyerDetails: ""
                }
            ]
        }
    };
    try {

        await AsyncStorage.setItem('Pax_details', JSON.stringify(requestBody));

    } catch (error) {

    }
        dispatch(FlightActions.getSeatmapData(requestBody));
        // navigation.navigate('selectseat');
    }
   
    const handleTitleSelect = (title) => {
        setSelectedTitle(title);
    };
    const handleGender = (title) => {
        setSelectedGender(title);
    };
    const onDatePick = () => {
        DateTimePickerAndroid.open({
            value: new Date(),
            onChange: (event, selectedDate) => {
                if (event.type === 'set' && selectedDate) {
                    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
                    const day = selectedDate.getDate().toString().padStart(2, '0');
                    const year = selectedDate.getFullYear();
                    const formattedDate = `${day}/${month}/${year}`;
                    setDateText(formattedDate);
                    calculateAge(selectedDate);
                }
            },
            mode: 'date',
            is24Hour: true,
        });
    };
    const onExpiryDatePick = () => {
        DateTimePickerAndroid.open({
            value: new Date(),
            onChange: (event, selectedDate) => {
                if (event.type === 'set' && selectedDate) {
                    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
                    const day = selectedDate.getDate().toString().padStart(2, '0');
                    const year = selectedDate.getFullYear();
                    const formattedDate = `${day}/${month}/${year}`;
                    setPassportExpiryDate(formattedDate);
                }
            },
            mode: 'date',
            is24Hour: true,
        });
    };
    return (
        <View style={styles.container}>
            <View style={styles.mainView}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.userDetails}>Passenger Details</Text>
                    <View>
                        <Text style={styles.labelText}>Title*</Text>
                        <View style={styles.checkbox}>
                            <CheckBox
                                checked={selectedTitle === 'Mr'}
                                iconType="material-community"
                                checkedIcon="radiobox-marked"
                                uncheckedIcon="radiobox-blank"
                                onPress={() => handleTitleSelect('Mr')}
                                containerStyle={{
                                    marginLeft: -10,

                                }}

                            />
                            <Text style={{ ...Fonts._13MontserratMedium }}>Mr.</Text>

                            <CheckBox
                                checked={selectedTitle === 'Mrs'}
                                iconType="material-community"
                                checkedIcon="radiobox-marked"
                                uncheckedIcon="radiobox-blank"
                                onPress={() => handleTitleSelect('Mrs')}
                            />
                            <Text style={{ ...Fonts._13MontserratMedium }}>Mrs.</Text>

                            <CheckBox
                                checked={selectedTitle === 'Miss'}
                                iconType="material-community"
                                checkedIcon="radiobox-marked"
                                uncheckedIcon="radiobox-blank"
                                onPress={() => handleTitleSelect('Miss')}
                            />
                            <Text style={{ ...Fonts._13MontserratMedium }}>Miss.</Text>
                        </View>
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.labelText}>First Name*</Text>
                        <TextInput
                            placeholder='Enter your first name'
                            style={styles.mobileTextInput}
                            value={firstName}
                            onChangeText={(e) => setFirstName(e)}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.labelText}>Last Name*</Text>
                        <TextInput
                            placeholder='Enter your last name'
                            style={styles.mobileTextInput}
                            value={lastName}
                            onChangeText={(e) => setLastName(e)}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <View>
                            <Text style={styles.labelText}>Gender*</Text>
                            <View style={styles.checkbox}>
                                <CheckBox
                                    checked={selectedGender === '0'}
                                    iconType="material-community"
                                    checkedIcon="radiobox-marked"
                                    uncheckedIcon="radiobox-blank"
                                    onPress={() => handleGender('0')}
                                    containerStyle={{
                                        marginLeft: -10,

                                    }}

                                />
                                <Text style={{ ...Fonts._13MontserratMedium }}>Male</Text>

                                <CheckBox
                                    checked={selectedGender === '1'}
                                    iconType="material-community"
                                    checkedIcon="radiobox-marked"
                                    uncheckedIcon="radiobox-blank"
                                    onPress={() => handleGender('1')}
                                />
                                <Text style={{ ...Fonts._13MontserratMedium }}>Female</Text>
                            </View>
                        </View>

                    </View>

                    <View style={styles.inputView}>
                        <Text style={styles.labelText}>DOB*</Text>
                        <TouchableOpacity onPress={onDatePick}>
                            <Input
                                inputContainerStyle={styles.dateInput}
                                containerStyle={styles.mobileTextInput}
                                inputStyle={{ ...Fonts._14MontserratMedium }}
                                value={dateText}
                                placeholder={'Select Date'}
                                placeholderTextColor={'#BABABA'}
                                editable={false}
                                rightIcon={
                                    <Image source={require('../../../../../assests/images/calender.png')} style={{ height: SCREEN_WIDTH * 0.1, width: SCREEN_WIDTH * 0.1 }} />
                                }
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.labelText}>Passport Number*</Text>
                        <TextInput
                            placeholder='Enter your password no.'
                            style={styles.mobileTextInput}
                            value={passportNumber}
                            onChangeText={(e) => setPassportNumber(e)}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.labelText}>Passport Issuing Country*</Text>
                        <TextInput
                            placeholder='Enter your country'
                            style={styles.mobileTextInput}
                            value={passportCountry}
                            onChangeText={(e) => setPassportCountry(e)}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.labelText}>Passport Expiry*</Text>
                        <TouchableOpacity onPress={onExpiryDatePick}>
                            <Input
                                inputContainerStyle={styles.dateInput}
                                containerStyle={styles.mobileTextInput}
                                inputStyle={{ ...Fonts._14MontserratMedium, }}
                                value={passportExpiryDate}
                                placeholder={'Select Date'}
                                placeholderTextColor={'#BABABA'}
                                editable={false}
                                rightIcon={
                                    <Image source={require('../../../../../assests/images/calender.png')} style={{ height: SCREEN_WIDTH * 0.1, width: SCREEN_WIDTH * 0.1 }} />
                                }
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.labelText}>Nationality*</Text>
                        <TextInput
                            placeholder='Enter your nationality'
                            style={styles.mobileTextInput}
                            value={nationality}
                            onChangeText={(e) => setNationality(e)}
                        />
                    </View>
                    
                    <View style={{ paddingVertical: 20, }}></View>
                </ScrollView>
            </View>
            <View style={styles.bottomView}>
                <View>
                    <Text style={styles.nonPrice}>Fare Breakup</Text>
                    <Text style={styles.Price}>{`₹${farePrice || 'N/A'}`}</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.continueBtn} accessibilityLabel="Continue to booking" accessible
                    onPress={()=>{
                        if (!selectedTitle) {
                            showToastMessage({ message: 'Please select title' });
                        } else if (!firstName) {
                            showToastMessage({ message: 'Please enter name' });
                        } else if (!lastName) {
                            showToastMessage({ message: 'Please last name' });
                        }else if (!selectedGender) {
                            showToastMessage({ message: 'Please select gender' });
                        }else if (!dateText) {
                            showToastMessage({ message: 'Please select dob' });
                        } else if (!passportNumber) {
                            showToastMessage({ message: 'Please enter passport no.' });
                        }else if (!passportCountry) {
                            showToastMessage({ message: 'Please enter passport coutry' });
                        }else if (!passportExpiryDate) {
                            showToastMessage({ message: 'Please enter passport expiry date' });
                        }else if (!nationality) {
                            showToastMessage({ message: 'Please enter nationality' });
                        }else{
                            getSeatMaps();
                        }
                    
                    }}
                    >
                        <Text style={styles.btnText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapDispatchToProps)(SeatmapBookingDetails);



const styles = StyleSheet.create({
    userDetails: {
        ...Fonts._16MontserratRegular,
        marginBottom: 20,
    },
    checkbox: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
    },
    labelText: {
        ...Fonts._13MontserratMedium,
        fontSize: 15,
    },
    inputView: {
        marginTop: 10,
    },
    mobileTextInput: {
        borderWidth: 1,
        marginTop: 10,
        paddingLeft: 10,
        borderRadius: 8,
        borderColor: "#bababa",
        height: 50,
    },
    bottomView: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 0.3,
        padding: 10,
        borderColor: "#4d4f5c",
        alignItems: "center",
    },
    nonPrice: {
        fontSize: 9,
    },
    Price: {
        fontSize: 15,
        fontWeight: "600",
        color: "#000",
    },
    continueBtn: {
        backgroundColor: '#EA7515',
        paddingHorizontal: 60,
        borderRadius: 5,
        paddingVertical: 12,
    },
    btnText: {
        color: "#fff",
        fontSize: 15,
        textAlign: 'center',
        fontWeight: "600",
    },
    container: {
        backgroundColor: "#fff",
        flex: 1,
    },
    mainView: {
        flex: 1,
        padding: 15,
    },
    dateInput: {

        marginTop: 0,
        width: "100%",
    },

});
