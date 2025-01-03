import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Colors, Fonts, SCREEN_WIDTH } from '../../../assests/style';
import Header from '../../../components/Header';
import MyStatusBar from '../../../components/StatusBar';
import { useRoute } from '@react-navigation/native';
import { imageurl, imagneweurl } from '../../../utility/base';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import Button from '../../../components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { connect, useSelector } from 'react-redux';
import { showToastMessage } from '../../../utils/services';
import * as PoojaActions from "../../../redux/actions/PoojaActions"

const PoojaDetails = ({dispatch}) => {
    const route = useRoute();

    const poojaItem = route?.params;
    const [showIn, setShowIn] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkInTime, setCheckInTime] = useState('');

    const onChangeCheckIn = (event, selectedDate) => {
        const currentDate = selectedDate || new Date();
        setShowIn(false);
        const formattedDate = moment(currentDate).format('YYYY-MM-DD');
        setCheckInDate(formattedDate);
    };

    const onChangeCheckInTime = (event, selectedTime) => {
        const currentTime = new Date(); 
        const selectedDateTime = selectedTime || new Date();
    
        if (moment(selectedDateTime).isBefore(currentTime)) {
            showToastMessage({ message: "You cannot select a time earlier than the current time." });
            setShowTime(false);
            return;
        }
    
        setShowTime(false);
        const formattedTime = moment(selectedDateTime).format('HH:mm'); 
        setCheckInTime(formattedTime);
    };
    
    const showPickerIn = () => {
        setShowIn(true);
    };

    const showPickerTime = () => {
        setShowTime(true);
    };

    const bookPooja = (price) => {
       const requestBody={
            pujaId: poojaItem?._id,
            date: checkInDate,
            time: `${checkInDate} ${checkInTime}`,
            price
        
       }
       console.log(requestBody)
       dispatch(PoojaActions.orderPooja(requestBody));
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
            <Header title={'Puja Details'} tintColor={Colors.white} />
            <ScrollView style={{ paddingHorizontal: 10, paddingVertical: 15 }}>
                <Image
                    source={{ uri: imagneweurl + poojaItem?.image }}
                    style={styles.poojaImage}
                />
                <Text style={styles.poojaName}>{poojaItem?.pujaName}</Text>
                <Text style={styles.poojaPrice}>
                    Puja Price: <Text style={{ color: "#530201" }}>₹{poojaItem?.price}</Text>
                </Text>
                <Text style={styles.poojaDescription}>{poojaItem?.description}</Text>
                <Text style={styles.poojaName}>Please fill the details*</Text>
                <View style={styles.dateView}>
                    <View style={styles.dateSubView}>
                        <TouchableOpacity style={styles.inputDate} onPress={showPickerIn}>
                            <AntDesign name='calendar' color={"#E58634"} size={18} />
                            <Text style={{ ...Fonts._12MontserratMedium }}>
                                {checkInDate ? checkInDate : 'Select Date'}
                            </Text>
                        </TouchableOpacity>
                        {showIn && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={checkInDate instanceof Date ? checkInDate : new Date()}
                                mode="date"
                                display="default"
                                minimumDate={new Date()}
                                onChange={onChangeCheckIn}
                            />
                        )}
                    </View>
                    <View style={styles.dateSubView}>
                        <TouchableOpacity style={styles.inputDate} onPress={showPickerTime}>
                            <Ionicons name='time-outline' color={"#E58634"} size={18} />
                            <Text style={{ ...Fonts._12MontserratMedium }}>
                                {checkInTime ? checkInTime : 'Select Time'}
                            </Text>
                        </TouchableOpacity>
                        {showTime && (
                            <DateTimePicker
                                testID="timePicker"
                                value={new Date()}
                                mode="time"
                                display="default"
                                onChange={onChangeCheckInTime}
                            />
                        )}
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Button title={"Book Puja"} onPress={()=>{
                        if(!checkInDate){
                            showToastMessage({message:"Please select date"})
                        }else if(!checkInTime){
                            showToastMessage({message:"Please select time"})
                        }else{
                            bookPooja(poojaItem?.price)
                        }
                    }} />
                </View>
                <View style={{ paddingVertical: 20 }}></View>
            </ScrollView>
        </SafeAreaView>
    );
};


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(PoojaDetails);
const styles = StyleSheet.create({
    poojaName: {
        ...Fonts._16MontserratMedium,
        marginTop: 20
    },
    poojaImage: {
        width: "100%",
        height: responsiveScreenHeight(20),
        objectFit: "cover",
        borderRadius: 10
    },
    poojaDescription: {
        ...Fonts._12MontserratRegular,
        marginTop: 10,
        textAlign: "justify",
        letterSpacing: 0.3
    },
    poojaPrice: {
        ...Fonts._16MontserratMedium,
        marginTop: 10
    },
    dateView: {
        display: "flex",
        flexDirection: "row",
        gap: 10
    },
    dateSubView: {
        width: SCREEN_WIDTH * 0.45
    },
    inputDate: {
        width: "100%",
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        borderColor: "#bababa",
        borderRadius: 4,
        color: "#bababa",
        display: "flex",
        flexDirection: "row",
        gap: 4,
        alignItems: "center"
    }
});
