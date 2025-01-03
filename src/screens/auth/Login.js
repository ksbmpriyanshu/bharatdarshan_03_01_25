import { Keyboard,Image, ImageBackground, KeyboardAvoidingView, Linking, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MyStatusBar from '../../components/StatusBar'
import { Colors, Fonts, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes, getFontSize } from '../../assests/style'
import Button from '../../components/Button'
import { navigate } from '../../navigations/NavigationServices'
import { showToastMessage } from '../../utils/services'
import { connect } from 'react-redux'
import Loader from '../../components/Loader'
import * as AuthActions from '../../redux/actions/AuthActions'
import { Input } from '@rneui/themed'
import CountryPicker from 'rn-country-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Login = ({ dispatch }) => {
    const [phone, setPhone] = useState('')
    const [state, setState] = useState({
        callingCode: '91',
        cca2: 'IN',
        phoneNumber: '',
        errorMessage: '',
    });

    const updateState = data => {
        setState(prevState => {
            const newData = { ...prevState, ...data };
            return newData;
        });
    };

    const { callingCode, cca2, phoneNumber, errorMessage } = state;

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
            <ImageBackground source={require('../../assests/images/bdsplash.png')} style={{ flex: 1 }}>
                <Loader />
                <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ flex: 0 }}>
                        {ImagePart()}
                        {WelcomeText()}
                        {Inputtxt()}
                    </View>

                    <View style={{ flex: 1, justifyContent: 'flex-end', }}>
                        {ButtonLogin()}
                        {LowerPart()}
                    </View>
                </KeyboardAwareScrollView>
            </ImageBackground>
        </SafeAreaView>
    )

    function LowerPart() {
        return (
            <View style={{ flex: 0, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: Sizes.fixPadding }} >

                <Text style={{ ...Fonts._12MontserratMedium, textDecorationLine: 'underline', textDecorationColor: Colors.black }} onPress={() => Linking.openURL('https://www.bharatdarshan.today/privacy-policy-2/')}>Privacy Policy Or Terms And Conditions</Text>
            </View>
        )
    }

    function ButtonLogin() {
        const onLogin = () => {
            const phoneNumberRegex = /^\d{10}$/;
            if (phoneNumber.length == 0) {
                showToastMessage({ message: 'Please Enter Your Phone Number' });
            } else if (!phoneNumberRegex.test(phoneNumber)) {
                showToastMessage({ message: 'Please Enter Valid Phone Number' });
            } else {

                dispatch(AuthActions.onLogin(phoneNumber))
            }
        }
        return (
            <View style={{ marginHorizontal: Sizes.fixHorizontalPadding * 2, marginVertical: Sizes.fixPadding }}>
                <Button title={'Login'} onPress={() => onLogin()} />
            </View>
        )
    }

    function Inputtxt() {
        const handlePhoneNumberChange = text => {
            updateState({ phoneNumber: text, errorMessage: '' });
            if (text.length === 10) {
                Keyboard.dismiss();     
            }
        };
        return (
            <Input
                placeholder="000000000"
                maxLength={10}
                keyboardType="numeric"
                inputContainerStyle={styles.inputContainer}
                containerStyle={{ height: 50, paddingHorizontal: 0 }}
                style={{ height: 50, paddingHorizontal: 0 }}
                placeholderTextColor={Colors.grayA}
                // onChangeText={text =>
                //     updateState({ phoneNumber: text, errorMessage: '' })
                // }
                onChangeText={handlePhoneNumberChange}
                inputStyle={{ ...Fonts._16MontserratMedium }}
                errorMessage={errorMessage}
                errorStyle={{ ...Fonts._12MontserratRegular, color: 'red' }}
                leftIcon={
                    <View style={styles.flagContainer}>
                        <CountryPicker
                            countryCode={callingCode}
                            dropDownImageStyle={{ height: 20, width: 0 }}
                            selectedCountryTextStyle={{ ...Fonts._16MontserratMedium }}
                            pickerContainerStyle={{ borderWidth: 0, backgroundColor: 'transparent', justifyContent: 'flex-start' }}
                            countryFlagStyle={{
                                borderRadius: 5,
                                width: 30,
                                height: 20,
                                marginRight: 10,
                                resizeMode: 'contain',
                            }}
                            withCallingCode={true}
                            withFilter={true}
                            withEmoji={true}
                            containerButtonStyle={{}}
                            selectedValue={text => {
                                updateState({ callingCode: text.callingCode, cca2: text.cca2 });
                            }}
                        />
                    </View>
                }
            />
        )
    }

    function WelcomeText() {
        return (
            <View style={{ height: SCREEN_HEIGHT * 0.07, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ ...styles.txt, color: Colors.primaryTheme, fontWeight: '700', letterSpacing: 0.1 }}>Welcome</Text>
            </View>
        )
    }
    function ImagePart() {
        return (
            <View style={{ height: SCREEN_HEIGHT * 0.3, justifyContent: 'center', alignItems: 'center', top: Sizes.fixPadding }}>
                <Image source={require('../../assests/images/bharatDarshanMainlogo.png')} style={{ height: SCREEN_HEIGHT * 0.3, width: SCREEN_WIDTH * 0.5, resizeMode: 'contain' }} />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.common.isLoading
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    txt: {
        ...Fonts._18MontserratRegular
    },
    inputContainer: {
        width: '90%',
        alignSelf: 'center',
        height: 50,
        borderWidth: 1,
        borderColor: Colors.black,
        borderRadius: Sizes.fixPadding * 0.5,
        // paddingHorizontal: Sizes.fixPadding,
        // marginTop: Sizes.fixPadding * 2,
    },
    flagContainer: {
        flex: 0,
        // flexDirection: 'row',
        alignItems: 'center',
        paddingRight: Sizes.fixPadding * 0.1,
        // backgroundColor:'red'
        // borderColor: Colors.grayLight,
    },
})