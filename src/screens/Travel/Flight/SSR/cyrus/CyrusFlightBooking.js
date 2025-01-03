import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import { Colors, Sizes, Fonts, SCREEN_WIDTH } from "../../../../../assests/style";
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect, useSelector } from 'react-redux';
import * as FlightActions from "../../../../../redux/actions/FlightActions";
import RBSheet from 'react-native-raw-bottom-sheet';

const CyrusFlightBooking = ({ dispatch }) => {
    const refRBSheet = useRef();
    const [disabled, setDisabled] = useState(true);
    const { control, handleSubmit, formState: { errors },reset  } = useForm();
    const newSearchKey = useSelector(state => state.flightReducer.cyrusFlightListData);
    const newFlightKey = useSelector(state => state.flightReducer.repriceData);
    const flightKey = newFlightKey?.data[0]?.Flight?.Flight_Key
    const searchKey = newSearchKey?.Search_Key

    const airReprintData = useSelector(state => state.flightReducer.flightBookingData);
    // console.log("air reprint data>>>>>>>>>>>>>>",airReprintData)

    const bookFlight = async (data) => {
        const bookingRequestJson = await AsyncStorage.getItem('Booking_Request_Json')
        const fareId = await AsyncStorage.getItem('fareid')

        const parseBookingRequest = JSON.parse(bookingRequestJson);
        const paxDetails = await AsyncStorage.getItem('Pax_details')
        const parsePaxDetails = JSON.parse(paxDetails);
        const requestData = {
            "methodname": "Air_TempBooking",
            "opid": "570",
            "txnid": "638024714893102751",
            "requestdata": {
                "Customer_Mobile": data?.passengermobile,
                "Passenger_Mobile": data?.passengermobile,
                "WhatsAPP_Mobile": data?.passengerwhatsapp,
                "Passenger_Email": data?.passengeremail,
                "PAX_Details": parsePaxDetails?.requestdata?.PAX_Details,
                "Fare_Id": fareId,
                "GST": false,
                "GST_Number": null,
                "GST_HolderName": null,
                "GST_Address": null,
                "BookingFlightDetails": [
                    {
                        "Search_Key": searchKey,
                        "Flight_Key": flightKey,
                        "BookingSSRDetails": null
                    }
                ],
                "BookingRemark": null,
                "Booking_Request_Json": parseBookingRequest
            }
        }
        dispatch(FlightActions.getFlightBookingData(requestData))
        reset()
        setDisabled(false)
    }

    return (
        <View style={{ padding: 20, backgroundColor: "#fff", flex: 1 }}>
            <ScrollView >
                <Text style={styles.labelText}>CyrusFlightBooking</Text>
                <View style={{ marginTop: 10 }}>

                    <Text style={styles.label}>Passenger Mobile*</Text>
                    <Controller
                        control={control}
                        name="passengermobile"
                        rules={{
                            required: 'Passenger Mobile is required',
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: 'Enter a valid 10-digit mobile number',
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                placeholder="Passenger Mobile"
                                style={[styles.mobileTextInput, errors.passengermobile && { borderColor: '#EA7515' }]}
                                onChangeText={onChange}
                                value={value}
                                keyboardType="numeric"
                            />
                        )}
                    />
                    {errors.passengermobile && <Text style={styles.errorText}>{errors.passengermobile.message}</Text>}

                    <Text style={styles.label}>Whatsapp Number*</Text>
                    <Controller
                        control={control}
                        name="passengerwhatsapp"
                        rules={{
                            required: 'Whatsapp Number is required',
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: 'Enter a valid 10-digit Whatsapp number',
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                placeholder="Whatsapp Number"
                                style={[styles.mobileTextInput, errors.passengerwhatsapp && { borderColor: '#EA7515' }]}
                                onChangeText={onChange}
                                value={value}
                                keyboardType="numeric"
                            />
                        )}
                    />
                    {errors.passengerwhatsapp && <Text style={styles.errorText}>{errors.passengerwhatsapp.message}</Text>}

                    <Text style={styles.label}>Passenger Email*</Text>
                    <Controller
                        control={control}
                        name="passengeremail"
                        rules={{
                            required: 'Passenger Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'Enter a valid email address',
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                placeholder="Passenger Email"
                                style={[styles.mobileTextInput, errors.passengeremail && { borderColor: '#EA7515' }]}
                                onChangeText={onChange}
                                value={value}
                                keyboardType="email-address"
                            />
                        )}
                    />
                    {errors.passengeremail && <Text style={styles.errorText}>{errors.passengeremail.message}</Text>}
                </View>

                <TouchableOpacity
                     onPress={handleSubmit(bookFlight)}

                    style={styles.continueBtn}>
                    <Text style={styles.btnText}>Continue</Text>
                </TouchableOpacity>

            </ScrollView>
            <View>
                <TouchableOpacity
                    style={[styles.continueBtn, { opacity: disabled ? 0.5 : 1 }]}
                    disabled={disabled}
                    onPress={() => {
                       refRBSheet.current.open();
                    }}
                >
                    <Text style={styles.btnText}>Proceed To Payment</Text>
                </TouchableOpacity>
                <RBSheet
                    ref={refRBSheet}
                    useNativeDriver={false}
                    customStyles={{
                        wrapper: {
                            backgroundColor: 'transparent',
                        },
                        container: {
                            height: 500,

                        },
                        draggableIcon: {
                            backgroundColor: '#000',

                        },
                    }}
                    customModalProps={{
                        animationType: 'slide',
                        statusBarTranslucent: true,
                    }}
                    customAvoidingViewProps={{
                        enabled: false,
                    }}>

                    <View style={styles.paymentView}>
                        <View style={{ flex: 0.85 }}>
                            <ScrollView>
                                <Text>Hello</Text>

                            </ScrollView>
                        </View>
                        <View style={{ flex: 0.15 }}>
                            <TouchableOpacity style={styles.continueBtn}>
                                <Text style={[styles.btnText, { fontSize: 12 }]}>Proceed To Pay ₹13,976</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </RBSheet>
            </View>

        </View>
    )
}


const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapDispatchToProps)(CyrusFlightBooking);
const styles = StyleSheet.create({
    label: {
        ...Fonts._14MontserratMedium,
        marginVertical: Sizes.fixPadding * 0.4,
    },
    inputView: {
        marginTop: 10,
    },
    labelText: {
        ...Fonts._13MontserratMedium,
        fontSize: 15,
    },
    mobileTextInput: {
        borderWidth: 1,
        marginTop: 5,
        paddingLeft: 10,
        borderRadius: 8,
        borderColor: "#bababa",
        height: 50,
    },
    continueBtn: {
        backgroundColor: '#EA7515',
        paddingHorizontal: 60,
        borderRadius: 5,
        paddingVertical: 12,
        marginTop: 10,
    },
    disableContinueBtn: {
        paddingHorizontal: 60,
        borderRadius: 5,
        paddingVertical: 12,
        marginTop: 10,
    },
    btnText: {
        color: "#fff",
        fontSize: 15,
        textAlign: 'center',
        fontWeight: "600",
    },
    errorText: {
        color: '#EA7515',
        fontSize: 9,
        marginTop: 3,
    },
    paymentView: {
        padding: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: 1,
        backgroundColor: "#f7f7f7",
        borderRadius: 20,
    }
});
