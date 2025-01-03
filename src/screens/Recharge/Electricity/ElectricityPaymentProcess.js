import React, { useEffect, useState } from 'react';
import {
    Image,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
} from 'react-native';
import { Colors, SCREEN_WIDTH, Sizes, Fonts, SCREEN_HEIGHT } from '../../../assests/style';
import { connect } from 'react-redux';
import Button from '../../../components/Button';
import { BottomSheet } from '@rneui/themed';
import MyStatusBar from '../../../components/StatusBar';
import { navigate } from '../../../navigations/NavigationServices';
import { createOrder, electricityOrGasRecharge, fastagOrCableRecharge, razorpayInialise } from '../../../utility/rechargeApi';
import Loader from '../../../components/Loader';
import { calendarFormat } from 'moment';
import { useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign'
import * as RechargeActions from '../../../redux/actions/RechargeActions'
import * as UserActions from '../../../redux/actions/UserActions'


const ElectricityPaymentProcess = ({ route, customerdata, dispatch }) => {
    const { billData, providerData } = route.params || {};
    const [detailModal, setDetailModal] = useState(false)

    const handlePaymentProcced = async (rechargeWith) => {
        const payload = {
            number: providerData?.number,
            operatorId: providerData?._id,
            circle: 1,
            amount: billData?.data?.DueAmount,
            type: 'ELECTRICITY',
            rechargeWith
        }
        dispatch(RechargeActions.onCyrusRecharge(payload))
    }

    const onPayment = ()=>{
        dispatch(UserActions.setPaymentType({visible: true, data: {amount: billData?.data?.DueAmount, type: 'MOBILE RECHARGE'}, onPress:handlePaymentProcced }))
    }

    

    return (
        <SafeAreaView style={styles.safeArea}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
            <Loader />
            <View style={styles.container}>
                <ImageBackground source={require('../../../assests/images/fasttagwallet.png')} style={styles.imageBackground} resizeMode='cover'>
                    <View style={styles.imageInnerContainer}>
                        {vehiclenumber()}
                        {addamount()}
                    </View>
                </ImageBackground>
                {Fasttagdetails()}
                {proceedbtn()}
                {viewDetails()}
            </View>
        </SafeAreaView>
    );

    function viewDetails() {
        return (
            <BottomSheet
                isVisible={detailModal}
                onBackdropPress={() =>
                    setDetailModal(false)
                }
            >
                <View style={styles.maincontainer}>
                    <View style={styles.bottomSheetHeader}>
                        <View></View>
                        <Text style={styles.bottomSheetTitle}>Electricity Bill Details</Text>
                        <TouchableOpacity onPress={() => setDetailModal(false)}>
                            <AntDesign name='closecircleo' color={Colors.black} size={26} />
                        </TouchableOpacity>
                    </View>
                    {renderDetailRow('Name', billData?.data?.CustomerName)}
                    {renderDetailRow('Bill Number', billData?.data?.BillNumber)}
                    {renderDetailRow('Due Ammount', `₹${billData?.data?.DueAmount}`)}
                    {renderDetailRow('Due Date', billData?.data?.DueDate)}
                    {renderDetailRow('Billing Date', billData?.data?.BillDate)}

                </View>
            </BottomSheet>
        )
    }

    function renderDetailRow(label, value) {
        return (
            <View style={styles.detailRow}>
                <Text style={{ ...styles.detailLabel, width: '50%' }}>{label}</Text>
                <Text style={styles.detailValue}>{value}</Text>
            </View>
        )
    }

    function proceedbtn() {
        return (
            <View style={styles.proceedButtonContainer}>
                <Button title={'PROCEED'} onPress={()=>onPayment()} />
            </View>
        )
    }

    function Fasttagdetails() {
        return (
            <TouchableOpacity style={styles.fasttagDetailsButton} onPress={() => setDetailModal(true)}>
                <Text style={styles.fasttagDetailsText}>View Electricity Details</Text>
            </TouchableOpacity>
        )
    }

    function addamount() {
        return (
            <View style={styles.addAmountContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder=""
                    keyboardType="numeric"
                    placeholderTextColor={Colors.grayA}
                    cursorColor={Colors.black}
                    editable={false}
                    value={billData.data?.DueAmount}
                />
            </View>
        );
    }

    function vehiclenumber() {
        return (
            <View style={styles.vehicleNumberContainer}>
                <View style={styles.vehicleTextContainer}>
                    <Text style={styles.vehicleOwnerName}>{billData.data?.CustomerName}</Text>
                    <Text style={styles.vehicleNumber}>Bill No. :- {billData.data?.BillNumber}</Text>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    customerdata: state.registrationReducer.customerdata,
    isLoading: state.common.isLoading
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ElectricityPaymentProcess);

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.white
    },
    container: {
        flex: 1
    },
    imageBackground: {
        height: SCREEN_HEIGHT * 0.4
    },
    imageInnerContainer: {
        flex: 1
    },
    proceedButtonContainer: {
        position: 'absolute',
        bottom: Sizes.fixPadding * 2,
        width: '90%',
        alignSelf: 'center'
    },
    fasttagDetailsButton: {
        alignSelf: 'center',
        marginTop: -Sizes.fixPadding,
        backgroundColor: Colors.white,
        paddingVertical: Sizes.fixPadding * 0.5,
        paddingHorizontal: Sizes.fixHorizontalPadding * 2,
        borderRadius: 100,
        elevation: 5
    },
    fasttagDetailsText: {
        ...Fonts._16MontserratMedium,
        color: '#00000090'
    },
    addAmountContainer: {
        backgroundColor: Colors.white,
        alignSelf: 'center',
        width: '40%',
        borderRadius: 10,
        padding: 5,
        marginTop: Sizes.fixPadding * 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        ...Fonts._18MontserratMedium,
        paddingHorizontal: 10
    },
    vehicleNumberContainer: {
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20
    },
    vehicleImageContainer: {
        flex: 0.2,
        paddingRight: Sizes.fixPadding * 0.5
    },
    vehicleImage: {
        height: SCREEN_WIDTH * 0.09,
        width: SCREEN_WIDTH * 0.09,
        alignSelf: 'flex-end'
    },
    vehicleTextContainer: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    vehicleOwnerName: {
        ...Fonts._14MontserratMedium,
        color: '#000000',
    },
    vehicleNumber: {
        ...Fonts._11MontserratMedium,
        color: '#A39C9C'
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
        alignItems: 'center'
    },
    bottomSheetTitle: {
        ...Fonts._16MontserratMedium,
        color: '#000000',
        marginLeft: 10
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding * 0.2
    },
    detailLabel: {
        ...Fonts._14MontserratMedium,
        color: Colors.black
    },
    detailValue: {
        ...Fonts._14MontserratMedium,
        color: Colors.grayA
    }
});
