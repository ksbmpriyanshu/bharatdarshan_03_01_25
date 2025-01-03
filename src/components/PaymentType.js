import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { BottomSheet, CheckBox } from '@rneui/themed'
import * as UserActions from '../redux/actions/UserActions'
import { connect } from 'react-redux'
import { Colors, Fonts, Sizes } from '../assests/style'
import Button from './Button'

const PaymentType = ({ paymentType, dispatch, customerData }) => {
    const [selecetedPaymentType, setSelecetedPaymentType] = useState(null)
    // console.log(" payment Type ::: ",paymentType);
    const onPayment = () => {
        if (selecetedPaymentType === 'WALLET') {
            if (customerData?.wallet >= paymentType?.data?.amount) {
                dispatch(UserActions.setPaymentType({ visible: false, data: null }))
                paymentType?.onPress('WALLET');
            } else {
                alert('Insufficient amount in wallet')
            }
        } else if (selecetedPaymentType === 'RAZORPAY') {
            paymentType?.onPress('RAZORPAY');
        }
    }
    return (
        <BottomSheet
            isVisible={paymentType.visible}
            onBackdropPress={() => dispatch(UserActions.setPaymentType({ visible: false, data: null }))}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Select Payment Type</Text>
                <CheckBox
                    disabled={customerData?.wallet < paymentType?.data?.amount}
                    checked={selecetedPaymentType === 'WALLET'}
                    title={<Text style={{ ...Fonts._14MontserratMedium, color: customerData?.wallet < paymentType?.data?.amount ? Colors.grayB : Colors.black }}> Wallet Payment <Text style={{ ...Fonts._11MontserratMedium, color: Colors.redA }}>{(customerData?.wallet < paymentType?.data?.amount) ? '(Insufficient Amount)' : ''}</Text></Text>}
                    size={24}
                    onPress={() => setSelecetedPaymentType('WALLET')}
                    checkedColor={Colors.orange}
                />
                <CheckBox
                    checked={selecetedPaymentType === 'RAZORPAY'}
                    title={<Text style={{ ...Fonts._14MontserratMedium, }}> Razorpay Payment</Text>}
                    size={24}
                    checkedColor={Colors.orange}
                    onPress={() => setSelecetedPaymentType('RAZORPAY')}

                />
                <Button title={'Payment'} onPress={onPayment} style={{ marginTop: Sizes.fixPadding * 3 }} />
            </View>
        </BottomSheet>
    )
}

const mapStateToProps = state => ({
    paymentType: state.userReducer.paymentType,
    customerData: state.registrationReducer.customerdata
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(PaymentType)

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        borderTopRightRadius: Sizes.fixPadding,
        borderTopLeftRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding
    },
    title: {
        ...Fonts._16MontserratMedium
    }
})