import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { BottomSheet, Input } from '@rneui/themed'
import { Colors, Sizes, Fonts } from '../../../../assests/style'
import * as FlightActions from '../../../../redux/actions/FlightActions'

const PrimaryContatctEdit = ({ visible, updateState, dispatch, customerData }) => {
    const [email, setEmail] = useState(customerData?.email || '')
    const [mobileNumber, setMobileNumber] = useState(customerData?.phone || '')
    const [city, setCity] = useState(customerData?.city || '')
    const [address, setAddress] = useState(customerData?.address || '')

    const onSaveDetails = () => {
        updateState({ primaryContactEditVisible: false })
        dispatch(FlightActions.setFlightContactDetails({
            phoneNumber: mobileNumber,
            email,
            city,
            address
        }))
    }

    return (
        <BottomSheet
            isVisible={visible}
            onBackdropPress={() => updateState({ primaryContactEditVisible: false })}
        >
            <View style={{ backgroundColor: Colors.white, borderTopRightRadius: Sizes.fixPadding, borderTopLeftRadius: Sizes.fixPadding, padding: Sizes.fixPadding }}>
                <Input
                    label={'Mobile Number'}
                    value={mobileNumber}
                    keyboardType='number-pad'
                    maxLength={10}
                    placeholder='Enter Mobile Number'
                    inputStyle={styles.inputStyle}
                    placeholderTextColor={Colors.grayA}
                    inputContainerStyle={styles.inputContainerStyle}
                    containerStyle={styles.containerStyle}
                    labelStyle={styles.labelStyle}
                    onChangeText={setMobileNumber}
                />
                <Input
                    label={'Email'}
                    value={email}
                    keyboardType='email-address'
                    placeholder='Enter email address'
                    inputStyle={styles.inputStyle}
                    placeholderTextColor={Colors.grayA}
                    inputContainerStyle={styles.inputContainerStyle}
                    containerStyle={styles.containerStyle}
                    labelStyle={styles.labelStyle}
                    onChangeText={setEmail}
                />

                <Input
                    label={'City'}
                    value={city}
                    placeholder='Enter your city'
                    maxLength={25}
                    inputStyle={styles.inputStyle}
                    placeholderTextColor={Colors.grayA}
                    inputContainerStyle={styles.inputContainerStyle}
                    containerStyle={styles.containerStyle}
                    labelStyle={styles.labelStyle}
                    onChangeText={setCity}
                />

                <Input
                    label={'Address'}
                    value={address}
                    placeholder='Enter your full address'
                    maxLength={60}
                    inputStyle={styles.inputStyle}
                    placeholderTextColor={Colors.grayA}
                    inputContainerStyle={styles.inputContainerStyle}
                    containerStyle={styles.containerStyle}
                    labelStyle={styles.labelStyle}
                    onChangeText={setAddress}
                />

                <TouchableOpacity activeOpacity={0.8} onPress={() => onSaveDetails()} style={styles.saveButtonStyle}>
                    <Text style={{ ...Fonts._14MontserratMedium, textAlign: 'center', color: Colors.primaryTheme }}>Save Details</Text>
                </TouchableOpacity>
            </View>
        </BottomSheet>
    )
}

const mapStateToProps = state => ({
    customerData: state.registrationReducer.customerdata
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryContatctEdit)

const styles = StyleSheet.create({
    itemContainer: {
        marginTop: Sizes.fixPadding,
        borderWidth: 0.2,
        borderRadius: Sizes.fixPadding,
        elevation: 2,
        backgroundColor: Colors.white,
        shadowColor: Colors.grayB,
        borderColor: Colors.grayC
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff8f7',
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding
    },
    inputStyle: {
        ...Fonts._14MontserratMedium
    },
    inputContainerStyle: {
        borderBottomWidth: 1,
        borderColor: Colors.grayC,
    },
    containerStyle: {},
    labelStyle: {
        ...Fonts._14MontserratMedium,
        color: Colors.primaryTheme
    },
    saveButtonStyle: {
        borderWidth: 1,
        paddingVertical: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding,
        borderColor: Colors.primaryTheme,
        marginBottom: Sizes.fixPadding
    }
});
