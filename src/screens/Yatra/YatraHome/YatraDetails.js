import { SafeAreaView, StyleSheet, Text, View, Image, FlatList, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import MyStatusBar from '../../../components/StatusBar'
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes, Fonts, getFontSize } from '../../../assests/style'
import Header from '../../../components/Header'
import Button from '../../../components/Button'
import { navigate } from '../../../navigations/NavigationServices'
import { connect, useSelector } from 'react-redux'
import { imageurl } from '../../../utility/base'
import { showToastMessage } from '../../../utils/services'
import { BottomSheet, CheckBox } from '@rneui/base'
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient'
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import * as PoojaActions from "../../../redux/actions/PoojaActions"

const YatraDetails = ({dispatch}) => {

    const packagedata = useSelector(state => state.poojaReducer.packagedata);
    const customerData = useSelector(state => state.registrationReducer.customerdata);
    const basePrice = packagedata?.data?.price || 0;
    const includedData = packagedata?.data?.included || '';
    const includedArray = includedData.split(',');
    const notIncludedData = packagedata?.data?.not_included || '';
    const notIncludedArray = notIncludedData.split(',');
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [specialRequest, setSpecialRequest] = useState('');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [localAdults, setLocalAdults] = useState(1);
    const [localChildren, setLocalChildren] = useState(0);
    const [checked, setChecked] = useState(false);
    const calculateTotalPrice = () => {
        const adultPrice = localAdults * basePrice;
        const childrenPrice = localChildren * (basePrice * 0.7);
        return adultPrice + childrenPrice;
    };

    const increment = (type) => {
        if (type === 'adult') {
            setLocalAdults(prev => prev + 1);
        } else if (type === 'child') {
            setLocalChildren(prev => prev + 1);
        }
    };

    const decrement = (type) => {
        if (type === 'adult' && localAdults > 0) {
            setLocalAdults(prev => prev - 1);
        } else if (type === 'child' && localChildren > 0) {
            setLocalChildren(prev => prev - 1);
        }
    };

    const placeOrder = () => {
        const requestBody = {
            customerId:customerData?._id,
            name:name,
            email:email,
            phone:phone,
            yatraPackageId:packagedata?.data?._id,
            adults:localAdults,
            children:localChildren,
            spacialRequest:specialRequest,
            state:state,
            city:city,
            termsandCondition:checked,
            totalPrice:calculateTotalPrice(),
            tourCode:"B1931JJ"
            }
            dispatch(PoojaActions.orderYatra(requestBody));

    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View>
                {packagedata?.data?.image ? (
                    <Image source={{ uri: imageurl + packagedata?.data?.image }} style={{ width: SCREEN_WIDTH * 1, height: 200, resizeMode: 'cover', }} />
                ) : (
                    <Text style={{ color: 'black' }}>No Image Available</Text>
                )}
            </View>
            <View style={{ padding: 10, }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ ...Fonts._16MontserratRegular, fontSize: getFontSize(20), width: "70%" }}>{packagedata?.data?.title}</Text>
                    <Text style={{ ...Fonts._13MontserratRegular, color: '#378338', }}>₹ {basePrice}/<Text style={{ fontSize: 9 }}>Person</Text></Text>
                </View>
                <Text style={{ ...Fonts._13MontserratRegular, marginVertical: Sizes.fixPadding, letterSpacing: 0.20, lineHeight: 14, textAlign: "justify" }}>
                    {packagedata?.data?.description}
                </Text>
                <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: "#bababa" }}></View>
            </View>

            <View style={{ padding: 10, }}>
                <Text style={{ ...Fonts._16MontserratRegular, fontSize: getFontSize(15), width: "70%", marginBottom: 10, }}>What We Provide</Text>
                {includedArray.map((item, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 5 }}>
                        <Text style={{ fontSize: getFontSize(12) }}>• </Text>
                        <Text style={{ ...Fonts._16MontserratRegular, fontSize: getFontSize(12), flex: 1 }}>
                            {item.trim()}
                        </Text>
                    </View>
                ))}
                <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: "#bababa", marginTop: 10, }}></View>

                <Text style={{ ...Fonts._16MontserratRegular, fontSize: getFontSize(15), width: "70%", marginVertical: 10, }}>What We Not Provide</Text>
                {notIncludedArray.map((item, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 5 }}>
                        <Text style={{ fontSize: getFontSize(12) }}>• </Text>
                        <Text style={{ ...Fonts._16MontserratRegular, fontSize: getFontSize(12), flex: 1 }}>
                            {item.trim()}
                        </Text>
                    </View>
                ))}
                <View style={{ marginTop: 20, }}>
                    <Button title={"Book Yatra"} onPress={() => {
                        setBottomSheetVisible(true)
                    }} />
                </View>
                <BottomSheet
                    isVisible={isBottomSheetVisible}
                    onBackdropPress={() => setBottomSheetVisible(false)}
                >
                    <View style={styles.bottomSheetContainer}>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', alignItems: "center" }}>
                            <Text style={{ ...Fonts._16MontserratRegular, }}>Booking Details</Text>

                            <TouchableOpacity
                                onPress={() => {
                                    setBottomSheetVisible(false)
                                }}
                            >
                                <Entypo name="circle-with-cross" size={20} color="#530201" />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ ...Fonts._16MontserratRegular, }}>Price:
                            <Text style={{ ...Fonts._13MontserratRegular, color: '#378338', fontSize: 13 }}> ₹ {calculateTotalPrice()}</Text>

                        </Text>
                        <ScrollView>
                            <Text style={styles.labelText}>Package Name*</Text>
                            <TextInput

                                placeholder={packagedata?.data?.title}
                                style={styles.addressInput}
                                placeholderTextColor={"#530201"}
                                editable={false}
                            />
                            <Text style={styles.labelText}>Full Name*</Text>
                            <TextInput
                                placeholder='Enter your name'
                                style={styles.addressInput}
                                placeholderTextColor={"#530201"}
                                value={name}
                                onChangeText={(e) => setName(e)}
                            />
                            <Text style={styles.labelText}>Phone*</Text>
                            <TextInput
                                placeholder='Enter your phone'
                                keyboardType='numeric'
                                maxLength={10}
                                style={styles.addressInput}
                                placeholderTextColor={"#530201"}
                                value={phone}
                                onChangeText={(e) => setPhone(e)}
                            />
                            <Text style={styles.labelText}>Email Address*</Text>
                            <TextInput
                                placeholder='Enter your email'
                                style={styles.addressInput}
                                placeholderTextColor={"#530201"}
                                value={email}
                                onChangeText={(e) => setEmail(e)}
                            />
                            <View style={styles.flexView}>
                                <View style={styles.addressView}>
                                    <Text style={styles.labelText}>Adults*</Text>
                                    <View style={styles.countContainerChildItem}>
                                        <TouchableOpacity style={styles.countButton} onPress={() => decrement('adult')}>
                                            <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={{ ...Fonts._13MontserratMedium }}>{localAdults}</Text>
                                        <TouchableOpacity style={styles.countButton} onPress={() => increment('adult')}>
                                            <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.addressView}>
                                    <Text style={styles.labelText}>Children*</Text>
                                    <View style={styles.countContainerChildItem}>
                                        <TouchableOpacity style={styles.countButton} onPress={() => decrement('child')}>
                                            <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={{ ...Fonts._13MontserratMedium }}>{localChildren}</Text>
                                        <TouchableOpacity style={styles.countButton} onPress={() => increment('child')}>
                                            <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>


                            </View>
                            <Text style={styles.labelText}>Special Request</Text>
                            <TextInput
                                style={[styles.addressInput,{height:100,textAlignVertical: "top"}]}
                                placeholderTextColor={"#530201"}
                                value={specialRequest}
                                onChangeText={(e) => setSpecialRequest(e)}
                            />
                            <View style={styles.flexView}>


                                <View style={styles.addressView}>
                                    <Text style={styles.labelText}>State*</Text>
                                    <TextInput
                                        placeholder='Enter State'
                                        style={styles.addressInput}
                                        value={state}

                                        onChangeText={(e) => setState(e)}
                                        placeholderTextColor={"#530201"}
                                    />
                                </View>

                                <View style={styles.addressView}>
                                    <Text style={styles.labelText}>City*</Text>
                                    <TextInput
                                        placeholder='Enter City'
                                        style={styles.addressInput}
                                        value={city}
                                        onChangeText={(e) => setCity(e)}
                                        placeholderTextColor={"#530201"}
                                    />
                                </View>


                            </View>
                            <View>
                                <CheckBox size={20}
                                    checked={checked}
                                    title={<Text style={[styles.labelText,{marginTop:-2}]}>T&C APPLY</Text>}
                                    checkedColor={Colors.orange}
                                    onPress={() => setChecked(!checked)}
                                    containerStyle={styles.checkBoxContainer}
                                />

                            </View>

                        </ScrollView>
                        <TouchableOpacity activeOpacity={0.8}

                            onPress={() => {
                                if (!name || !email || !phone || !state || !city) {
                                    showToastMessage({ message: "please enter the require field" })
                                } else if (!emailRegex.test(email)) {
                                    showToastMessage({ message: "please enter correct email" })
                                } else if (phone.length < 10) {
                                    showToastMessage({ message: "please enter correct phone" })
                                } else if (!localAdults) {
                                    showToastMessage({ message: "please select adult" })
                                }else if(!checked){
                                    showToastMessage({ message: "please select T&C" })
                                } else {
                                    placeOrder()
                                }

                            }}


                        >
                            <LinearGradient
                                colors={['#E58634', '#BF6427', '#530201']}
                                style={[styles.button, { marginTop: 15, borderRadius: 6, }]}
                                start={{ x: 0.5, y: 0.9 }}
                                end={{ x: 1, y: 0.8 }}
                            >
                                <Text style={styles.buttonText}>Book Yatra</Text>
                                <Image source={require('../../../assests/images/btndownimage.png')} style={{ height: SCREEN_WIDTH * 0.05, width: SCREEN_WIDTH, resizeMode: 'cover', position: 'absolute', bottom: 0 }} />
                            </LinearGradient>
                        </TouchableOpacity>

                    </View>
                </BottomSheet>

            </View>
        </ScrollView>
    )
}
const mapStateToProps = state => ({
  });
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(YatraDetails)
const styles = StyleSheet.create({
    cartView: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: 1,

    },
    btnView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
        borderTopWidth: 0.4,
        borderColor: "#bababa",

    },
    button: {
        paddingVertical: Sizes.fixPadding * 1.1,
        borderRadius: 100,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    buttonText: {
        color: Colors.white,
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
    },
    priceText: {
        ...Fonts._18MontserratRegular,
        fontSize: 16
    },
    cartProductView: {
        display: "flex",
        flexDirection: "row",
        //    alignItems:"center",

        gap: 10,
        width: responsiveScreenWidth(93),

    },
    proImage: {
        width: responsiveScreenWidth(20),
        height: responsiveScreenHeight(12),
        resizeMode: "cover",
        borderRadius: 6,
        backgroundColor: "#f7f7f7",
    },
    priceView: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        gap: 5,
        marginTop: 10,
    },
    bottomSheetContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    labelText: {
        ...Fonts._12MontserratRegular,
        marginTop: 10,
    },
    addressView: {
        width: "49%"
    },
    addressInput: {
        borderWidth: 1,
        padding: 0,
        ...Fonts._12MontserratRegular,
        color: "#530201",
        paddingHorizontal: 10,
        borderColor: "#bababa",
        borderRadius: 6,
        paddingVertical: 8,
        marginTop: 6,
        width: "100%"
    },
    flexView: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
    },
    countContainerChildItem: {
        borderWidth: 1,
        padding: 0,
        ...Fonts._12MontserratRegular,
        color: "#530201",
        paddingHorizontal: 10,
        borderColor: "#bababa",
        borderRadius: 6,
        paddingVertical: 8,
        marginTop: 6,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    checkBoxContainer:{
        alignSelf:"center"
    }
})