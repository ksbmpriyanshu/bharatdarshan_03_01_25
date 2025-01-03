import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import MyStatusBar from '../../../components/StatusBar';
import { Colors, Fonts, SCREEN_WIDTH, Sizes, getFontSize } from '../../../assests/style';
import Header from '../../../components/Header';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import Button from '../../../components/Button';
import { navigate } from '../../../navigations/NavigationServices';
import { connect } from 'react-redux';
import { createOrder, phoneDTHRecharge, razorpayInialise } from '../../../utility/rechargeApi';
import { BottomSheet, Input } from '@rneui/themed';
import Loader2 from '../../../components/Loader2';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { showNumber, showToastMessage } from '../../../utils/services';
import * as RechargeActions from '../../../redux/actions/RechargeActions'
import * as UserActions from '../../../redux/actions/UserActions'

const DthRecharge = ({ route, customerdata, dispatch }) => {
    const { billData, dthData } = route?.params || {}
    console.log(billData)
    const [amount, setAmount] = useState(billData?.records[0]?.MonthlyRecharge);
    const [loading, setLoading] = useState(false);
    const [detailModal, setDetailModal] = useState(false);
    const dthnumber = route?.params?.customerid;
    const customerdetails = route?.params?.dth_details;
    const [tatavalid, setTataValid] = useState(false);
    const [DTDvalid, setDTDValid] = useState(false);
    const [SunFlexi, setSunFlexi] = useState(false);

    const handleProceddPayment = async (rechargeWith) => {
        if(amount.length === 0){
            showToastMessage({message: 'Please enter an amount'})
        }
        const payload = {
            number: billData?.tel,
            operatorId: dthData?._id,
            circle: 1,
            amount: amount,
            type: 'DTH',
            rechargeWith
        }

        console.log("razorpayOrderId>>>>>",payload)

        dispatch(RechargeActions.onCyrusRecharge(payload))
    };

    const onPayment = ()=>{
        dispatch(UserActions.setPaymentType({visible: true, data: {amount: amount, type: 'DTH RECHARGE'}, onPress:handleProceddPayment }))
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
                <Loader2 isLoading={loading} />
                <Header title={'DTH Recharge'} tintColor={Colors.white} />
                <View style={{ flex: 1 }}>
                    {dthinfo()}
                    {operatename()}
                    {addamount()}
                    {validationPriceText()}
                    {Viewdetails()}
                    {proceedbtn()}
                </View>
                {dthcustomerdetails()}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );

    function validationPriceText() {
        return (
            <View style={styles.validationPriceText}>
                {tatavalid && <Text style={styles.validationPriceTextSuccess}>( 200 to 49999 )</Text>}
                {DTDvalid && <Text style={styles.validationPriceTextSuccess}>( 100 to 49999 )</Text>}
                {SunFlexi && <Text style={styles.validationPriceTextSuccess}>( 1 to 49999 )</Text>}
            </View>
        )
    }

    function dthcustomerdetails() {
        return (
            <BottomSheet
                isVisible={detailModal}
                onBackdropPress={() =>
                    setDetailModal(false)
                }
            >
                <View style={styles.maincontainer}>
                    <View style={styles.bottomSheetHeader}>
                        <Text style={styles.bottomSheetTitle}>Connection Details</Text>
                        <View></View>
                        <TouchableOpacity onPress={() => setDetailModal(false)}>
                            <AntDesign
                                name="closecircleo"
                                color={Colors.black}
                                size={Sizes.fixPadding * 1.7}
                            />
                        </TouchableOpacity>
                    </View>
                    {renderDetailRow('Name', billData?.records[0]?.customerName || 'N/A')}
                    {renderDetailRow('Balance', billData?.records[0]?.Balance || 'N/A')}
                    {renderDetailRow('Monthly Recharge', `${showNumber(billData?.records[0]?.MonthlyRecharge)}`)}
                    {renderDetailRow('Next Recharge Date', billData?.records[0]?.NextRechargeDate || 'N/A')}
                    {renderDetailRow('Plan Name', billData?.records[0]?.planname || 'N/A')}
                </View>
            </BottomSheet>
        )
    }

    function renderDetailRow(label, value) {
        return (
            <View style={styles.detailRow}>
                <Text style={{ ...styles.detailLabel, width: '50%' }}>{label}</Text>
                <Text numberOfLines={1} style={{ ...styles.detailValue, width: '50%', textAlign: 'right' }}>{value}</Text>
            </View>
        )
    }

    function Viewdetails() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: Sizes.fixPadding }}>
                <Text style={{ color: Colors.primaryTheme }}
                    onPress={() => setDetailModal(true)}
                >
                    View Details
                </Text>
            </View>
        )
    }

    function proceedbtn() {
        return (
            <View style={styles.proceedButtonContainer}>
                <Button title={'PROCEED'} onPress={() => onPayment()} />
            </View>
        )
    }

    function addamount() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2, }}>
                <Input
                    value={amount}
                    maxLength={10}
                    onChangeText={(txt) => setAmount(txt)}
                    inputContainerStyle={styles.inputContainer}
                    containerStyle={{ height: 50, paddingHorizontal: 0 }}
                    inputStyle={{ ...Fonts._18MontserratMedium, marginLeft: 10, }}
                    placeholderTextColor={Colors.grayA}
                    keyboardType='number-pad'
                    cursorColor={Colors.black}

                    leftIcon={
                        <View>
                            <Text style={{ ...Fonts._18MontserratMedium }}>₹</Text>
                        </View>
                    }
                />
            </View>
        );
    }

    function operatename() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={{ uri: dthData?.operatorImage }} style={{ height: SCREEN_WIDTH * 0.3, width: SCREEN_WIDTH * 0.3, marginVertical: Sizes.fixPadding }} />
                <Text style={{ ...Fonts._16MontserratRegular }}>
                    {dthData?.OperatorName}
                </Text>
                {/* <Text style={{ ...Fonts._16MontserratRegular }}>
                    {route.params?.circle?.circlename}
                </Text> */}
            </View>
        )
    }

    function dthinfo() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: Sizes.fixPadding }}>
                <Text style={{ ...Fonts._16MontserratRegular, marginVertical: Sizes.fixPadding * 0.5, fontWeight: '700' }}>{billData?.tel}</Text>
                <Text style={{ ...Fonts._11MontserratRegular, top: -Sizes.fixPadding * 0.3 }}>{billData?.records[0]?.customerName}</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    customerdata: state.registrationReducer.customerdata
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DthRecharge);

const styles = StyleSheet.create({
    textInput: {
        ...Fonts._18MontserratMedium,
        paddingHorizontal: 10,
        width: '100%',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    addAmountContainer: {
        backgroundColor: '#F5F8FD',
        alignSelf: 'center',
        width: '40%',
        borderRadius: 10,
        padding: 5,
        marginTop: Sizes.fixPadding * 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    proceedButtonContainer: {
        position: 'absolute',
        bottom: Sizes.fixPadding,
        width: '100%',
        paddingHorizontal: Sizes.fixHorizontalPadding * 2
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: Sizes.fixPadding * 0.4
    },
    detailLabel: {
        ...Fonts._14MontserratMedium,
        color: Colors.black
    },
    detailValue: {
        ...Fonts._14MontserratMedium,
        color: Colors.grayA,
    },
    maincontainer: {
        backgroundColor: Colors.white,
        padding: Sizes.fixPadding,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    bottomSheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Sizes.fixPadding * 0.5
    },
    bottomSheetTitle: {
        ...Fonts._20MontserratMedium,
        color: '#000000',
        fontSize: getFontSize(22)
    },
    inputContainer: {
        width: '40%',
        height: 50,
        borderRadius: Sizes.fixPadding * 0.5,
        paddingHorizontal: Sizes.fixPadding,
        borderColor: Colors.grayA,
        backgroundColor: '#F5F8FD',
        alignSelf: 'center',
        borderBottomWidth: 0
    },
    validationPriceTextSuccess: {
        color: Colors.primaryTheme,
        textAlign: 'center',
        marginTop: 10
    }
});
