import { Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, Sizes, Fonts, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../assests/style'
import MyStatusBar from '../../components/StatusBar'
import Header from '../../components/Header'
import { navigate } from '../../navigations/NavigationServices'
import { connect } from 'react-redux'
import * as RechargeActions from '../../redux/actions/RechargeActions'
import Loader from '../../components/Loader'
import AntDesign from 'react-native-vector-icons/AntDesign';

const Recharge = ({ customerdata,dispatch,route }) => {
    const [phone, setPhone] = useState('')
    const prepaid = route.params?.item
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
            <Loader/>
            <Header title={'Recharges'}  tintColor={Colors.white} />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 80}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ paddingVertical: Sizes.fixPadding, }}>
                        {InputField()}
                        {mynumber()}
                        {mynumberdetails()}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
    function mynumberdetails() {
   
        const handledata = () => {
            const mobile = customerdata?.phone?.replace(/\s+/g, '').replace('+91', '');
            const payload = {
                phoneNumber: mobile,
                contactdata: {name: customerdata?.name, image: customerdata?.image }
            }
           
           console.log("payload",payload)
          
            dispatch(RechargeActions.getMobilePlans(payload));
           
        }
   
        return (
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Sizes.fixHorizontalPadding * 2 ,}}
            onPress={() => handledata()}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: customerdata?.image }} style={{ height: SCREEN_WIDTH * 0.15, width: SCREEN_WIDTH * 0.15, resizeMode: 'cover', borderRadius: 100 }} />
                    <View style={{ marginLeft: Sizes.fixHorizontalPadding * 2 }}>
                        <Text style={{ ...Fonts._14MontserratRegular }}>{customerdata?.name}</Text>
                        <Text style={{ ...Fonts._14MontserratRegular }}>{customerdata?.phone}</Text>
                    </View>
                </View>
                <TouchableOpacity style={{ width: '30%', justifyContent: 'center', alignItems: 'center', paddingVertical: Sizes.fixPadding * 0.3, borderRadius: 100, backgroundColor: Colors?.primaryTheme }}
             onPress={() => handledata()}
             >
                    <Text style={{ ...Fonts._14MontserratRegular, color: Colors.white }}>Recharge</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
    function mynumber() {
        return (
            <View style={{ backgroundColor: '#F6F4F4', marginVertical: Sizes.fixPadding, paddingHorizontal: Sizes.fixHorizontalPadding * 2, paddingVertical: Sizes.fixPadding * 0.6 }}>
                <Text style={{ ...Fonts._14MontserratRegular }}>My Number</Text>
            </View>
        )
    }
    function InputField() {
        return (
            <TouchableOpacity style={styles.inputFieldContainer}
                onPress={() => navigate('contact',{prepaid: prepaid})}
            >
                <TextInput
                    style={styles.textInput}
                    maxLength={10}
                    keyboardType='number-pad'
                    placeholder='Enter Name or Mobile Number'
                    value={phone}
                    onChangeText={setPhone}
                    onFocus={() => navigate('contact')}
                    placeholderTextColor={Colors.grayA}
                />

                <TouchableOpacity>
                    {/* <Image source={require('../../assests/images/book.png')} style={styles.image} /> */}
                    <AntDesign
                  name="contacts"
                  color={Colors.grayA}
                  size={Sizes.fixHorizontalPadding * 4}
                />
                </TouchableOpacity>

            </TouchableOpacity>
        )
    }
    // function InputName() {
    //     return(
    //         <View style={styles.inputNameContainer}>
    //         <Text style={styles.inputNameText}>Enter name or Number</Text>
    //     </View>
    //     )
    // }
}

const mapStateToProps = state => ({
    customerdata: state.registrationReducer.customerdata
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Recharge);


const styles = StyleSheet.create({
    inputFieldContainer: {
        flex: 0.08,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixHorizontalPadding,
        borderRadius: 10,
        // marginTop: Sizes.fixPadding ,
        marginHorizontal: Sizes.fixHorizontalPadding,
        borderWidth: 1,
        borderColor: Colors.grayA
    },
    textInput: {
        width: '90%',
        ...Fonts._14MontserratRegular,
        color: '#3C3B3B',
    },
    image: {
        height: SCREEN_WIDTH * 0.07,
        width: SCREEN_WIDTH * 0.07,
        resizeMode: 'contain',
    },
    inputNameContainer: {
        flex: 0.05,
        justifyContent: 'center',
    },
    inputNameText: {
        ...Fonts._15MontserratRegular,
        color: Colors.black,
    },
})
