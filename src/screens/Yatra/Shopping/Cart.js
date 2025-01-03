import { Alert, FlatList, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes, Fonts } from '../../../assests/style'
import MyStatusBar from '../../../components/StatusBar'
import LinearGradient from 'react-native-linear-gradient';
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { connect, useSelector } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as ShoppingActions from "../../../redux/actions/ShoppingActions"
import { useNavigation } from '@react-navigation/native'
import { BottomSheet } from "@rneui/themed";
import Entypo from 'react-native-vector-icons/Entypo';
import { showToastMessage } from '../../../utils/services'
import Loader from '../../../components/Loader'
import Loader2 from '../../../components/Loader2'

const Cart = ({ dispatch, addtocartdata, decreasecartquantity, removecartdata, customerData,addaddressdata }) => {
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
    useEffect(() => {
        console.log("Updated addtocartdata", addtocartdata);
    }, [addtocartdata]);
    const navigation = useNavigation()
    useEffect(() => {
        const requestData = {
            customerId: customerData?._id
        };
        dispatch(ShoppingActions.getAddtocart(requestData));
    }, [decreasecartquantity, removecartdata, dispatch]);
    const decreaseQuantity = (id) => {
        const requestBody = {
            cartItemId: id,
            type: "REMOVE"
        }
        dispatch(ShoppingActions.getDecreaseQuantity(requestBody));
    }
    const increaseQuantity = (id) => {
        const requestBody = {
            cartItemId: id,
            type: "ADD"
        }
        dispatch(ShoppingActions.getDecreaseQuantity(requestBody));
    }
    const removeCartData = (id) => {
        const requestBody = {
            cartId: id,
        }
        dispatch(ShoppingActions.getRemoveCartData(requestBody));

    }

    


    //Billing Address

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


   const placeOrder=()=>{
    const requestBody ={
        userId:customerData?._id,
        email:email,
        address:address,
        phone:phone,
        city:city,
        state:state,
        pincode:pincode,
        country:country,
    }
    dispatch(ShoppingActions.getAddAddress(requestBody));
    setEmail('')
    setPhone('')
    setAddress('')
    setCountry('')
    setState('')
    setCity('')
    setPincode('')
   }
 

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
            <Header title={'Product Cart'} tintColor={Colors.white} />

            {addtocartdata?.cart?.length != 0 ? (
                <View style={styles.cartView}>
                    <ScrollView style={{ padding: 10, }}>
                        <FlatList data={addtocartdata?.cart}
                            renderItem={(item, index) => {
                                console.log("item?.item?.quantity", item?.item?.quantity)
                                return (
                                    <View key={index} style={{
                                        borderWidth: 0.3,
                                        borderColor: "#bababa",
                                        borderRadius: 10,
                                        padding: 10,
                                        marginBottom: 10,
                                    }}>
                                        <View style={styles.cartProductView}>
                                            <View>
                                                <Image
                                                    source={{ uri: `https://bharatdarshan.app/uploads/${item?.item?.productId?.image}` }}
                                                    style={styles.proImage}
                                                />

                                            </View>
                                            <View style={{ display: "flex", flexDirection: "column" }}>
                                                <Text style={[styles.priceText, { color: '#8B8888', width: responsiveScreenWidth(65), fontSize: 14, }]}>{item?.item?.productId?.productName}</Text>
                                                <View style={styles.priceView}>
                                                    <Text style={{ color: Colors.black, ...Fonts._20MontserratMedium, fontSize: 18 }}>₹ {item?.item?.productId?.price}</Text>
                                                    <Text style={{ ...Fonts._16MontserratRegular, color: Colors.grayA, textDecorationLine: 'line-through', fontSize: 12 }}>₹ {item?.item?.productId?.mrp}</Text>
                                                    <Text style={{ ...Fonts._13MontserratRegular, color: '#BF9321' }}>
                                                        ({Math.round(((item?.item?.productId?.mrp - item?.item?.productId?.price) / item?.item?.productId?.mrp) * 100)}% OFF)
                                                    </Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'flex-end',
                                                    marginTop: 10,
                                                }}>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            decreaseQuantity(item?.item?._id);
                                                        }}
                                                        style={{
                                                            backgroundColor: Colors.primaryTheme, borderRadius: 10, padding: Sizes.fixPadding * 0.4
                                                        }}>
                                                        <AntDesign name="minus" size={20} color={Colors.white} />
                                                    </TouchableOpacity>
                                                    <Text style={{ ...Fonts._16MontserratRegular, color: Colors.black, paddingHorizontal: Sizes.fixHorizontalPadding * 2 }}>
                                                        {item?.item?.quantity}
                                                    </Text>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            increaseQuantity(item?.item?._id);
                                                        }}
                                                        style={{
                                                            backgroundColor: Colors.primaryTheme, borderRadius: 10, padding: Sizes.fixPadding * 0.4
                                                        }}>
                                                        <AntDesign name="plus" size={20} color={Colors.white} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                        </View>
                                        <View style={{ borderTopWidth: 0.3, marginTop: 15, borderColor: "#B8B8B8", paddingTop: 4, }}>
                                            <TouchableOpacity onPress={() => {
                                                removeCartData(item?.item?._id);
                                            }}>
                                                <Text style={[styles.priceText, { textAlign: "center", fontSize: 13 }]}>Remove</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }}
                        />


                        <View style={{ paddingVertical: 10, }}></View>


                    </ScrollView>
                    <View style={styles.btnView}>
                        <Text style={styles.priceText}>₹ {addtocartdata?.totalPrice}</Text>
                        <TouchableOpacity activeOpacity={0.8}
                            // onPress={() => dispatch(ShoppingActions.orderCart())}
                            onPress={() => {
                                setBottomSheetVisible(true)
                            }}
                        >
                            <LinearGradient
                                colors={['#E58634', '#BF6427', '#530201']}
                                style={[styles.button,]}
                                start={{ x: 0.5, y: 0.9 }}
                                end={{ x: 1, y: 0.8 }}
                            >
                                <Text style={styles.buttonText}>Procced To Payment</Text>
                                <Image source={require('../../../assests/images/btndownimage.png')} style={{ height: SCREEN_WIDTH * 0.05, width: SCREEN_WIDTH, resizeMode: 'cover', position: 'absolute', bottom: 0 }} />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignSelf: 'center',
                    flex: 1
                }}>
                    <Text style={[styles.priceText, { textAlign: "center", marginBottom: 20, }]}>Cart is Empty</Text>
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={() => {
                            navigation.navigate('Shopping')
                        }}
                    >
                        <LinearGradient
                            colors={['#E58634', '#BF6427', '#530201']}
                            style={[styles.button,]}
                            start={{ x: 0.5, y: 0.9 }}
                            end={{ x: 1, y: 0.8 }}
                        >
                            <Text style={styles.buttonText}>Add Product</Text>
                            <Image source={require('../../../assests/images/btndownimage.png')} style={{ height: SCREEN_WIDTH * 0.05, width: SCREEN_WIDTH, resizeMode: 'cover', position: 'absolute', bottom: 0 }} />
                        </LinearGradient>
                    </TouchableOpacity>

                </View>
            )}
            <BottomSheet
                isVisible={isBottomSheetVisible}
                onBackdropPress={() => setBottomSheetVisible(false)}
            >
                <View style={styles.bottomSheetContainer}>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', alignItems: "center" }}>
                        <Text style={{ ...Fonts._16MontserratRegular, }}>Billing Address</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetVisible(false)
                            }}
                        >
                            <Entypo name="circle-with-cross" size={20} color="#530201" />
                        </TouchableOpacity>
                    </View>

                    {/* <View style={{ marginTop: 10, }}>
                    <Text style={{ ...Fonts._16MontserratRegular, }}>Saved Address</Text>
                         
                    </View> */}
                    <ScrollView>
                        <View style={styles.flexView}>
                            <View style={styles.addressView}>
                                <Text style={styles.labelText}>Email Address*</Text>
                                <TextInput
                                    placeholder='Enter your email'
                                    style={styles.addressInput}
                                    placeholderTextColor={"#530201"}
                                    value={email}
                                    onChangeText={(e) => setEmail(e)}
                                />
                            </View>
                            <View style={styles.addressView}>
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
                            </View>
                        </View>
                        <View style={styles.flexView}>
                            
                            <View style={styles.addressView}>
                                <Text style={styles.labelText}>Street Address*</Text>
                                <TextInput
                                    placeholder='Enter your address'
                                    style={styles.addressInput}
                                    placeholderTextColor={"#530201"}
                                    value={address}
                                    onChangeText={(e) => setAddress(e)}
                                />
                            </View>
                            <View style={styles.addressView}>
                                <Text style={styles.labelText}>Enter Country*</Text>
                                <TextInput
                                    placeholder='Enter Country'
                                    style={styles.addressInput}
                                    value={country}
                                    onChangeText={(e) => setCountry(e)}
                                    placeholderTextColor={"#530201"}
                                />

                            </View>
                        </View>
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
                        <View style={styles.flexView}>
                            
                            <View style={styles.addressView}>
                                <Text style={styles.labelText}>Pincode*</Text>
                                <TextInput
                                    placeholder='Enter Pincode'
                                    keyboardType='numeric'
                                    value={pincode}
                                    onChangeText={(e) => setPincode(e)}
                                    style={styles.addressInput}
                                    placeholderTextColor={"#530201"}
                                />
                            </View>
                        </View>
                    </ScrollView>
                    <TouchableOpacity activeOpacity={0.8}

                    onPress={()=>{
                        if(!email || !phone || !address || !country || !state || !city || !pincode){
                            showToastMessage({message:"please enter the require field"})
                        }else if(!emailRegex.test(email)){
                            showToastMessage({message:"please enter correct email"})
                        }else if(phone.length<10){
                            showToastMessage({message:"please enter correct phone"})
                        }else if(pincode.length>6 ||pincode.length<6 ){
                            showToastMessage({message:"please enter 6 digit pin code"})
                        }else{
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
                            <Text style={styles.buttonText}>Place Order</Text>
                            <Image source={require('../../../assests/images/btndownimage.png')} style={{ height: SCREEN_WIDTH * 0.05, width: SCREEN_WIDTH, resizeMode: 'cover', position: 'absolute', bottom: 0 }} />
                        </LinearGradient>
                    </TouchableOpacity>

                </View>
            </BottomSheet>



        </SafeAreaView>
    )
}

const mapStateToProps = state => ({
    addtocartdata: state.shoppingReducer.addtocartdata,
    decreasecartquantity: state.shoppingReducer.decreasecartquantity,
    removecartdata: state.shoppingReducer.removecartdata,
    customerData: state.registrationReducer.customerdata,
    addaddressdata: state.registrationReducer.addaddressdata,

});

const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
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

    },
    addressView: {
        marginTop: 10,
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
    }

})