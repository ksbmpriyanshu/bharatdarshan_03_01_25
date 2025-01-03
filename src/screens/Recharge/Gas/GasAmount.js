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
import { Colors, SCREEN_WIDTH, Sizes, Fonts, SCREEN_HEIGHT, getFontSize } from '../../../assests/style';
import { connect } from 'react-redux';
import Button from '../../../components/Button';
import { BottomSheet } from '@rneui/themed';
import MyStatusBar from '../../../components/StatusBar';
import { navigate } from '../../../navigations/NavigationServices';
import { createOrder, electricityOrGasRecharge, fastagOrCableRecharge, gasCylinder, razorpayInialise } from '../../../utility/rechargeApi';
import Loader from '../../../components/Loader';
import { calendarFormat } from 'moment';
import { showToastMessage } from '../../../utils/services';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../../components/Header';
import * as RechargeActions from '../../../redux/actions/RechargeActions'
import * as UserActions from '../../../redux/actions/UserActions'

const FasttagPayment = ({ route, customerdata, dispatch }) => {
    const { billData, providerData } = route.params || {};
    const [amount, setAmount] = useState(route.params?.billDetails?.DueAmount)
    const [detailModal, setDetailModal] = useState(false)
    const [orderId, setOrderId] = useState(null)

    const handleProceedPayment = async (rechargeWith) => {
        const payload = {
            number: providerData?.number,
            operatorId: providerData?._id,
            circle: 1,
            amount: billData?.data?.DueAmount,
            type: 'ELECTRICITY',
            rechargeWith
        }
        dispatch(RechargeActions.onCyrusRecharge(payload))
    };

    const onPayment = () => {
        dispatch(UserActions.setPaymentType({ visible: true, data: { amount: billData?.data?.DueAmount, type: 'ELECTRICITY' }, onPress: handleProceedPayment }))
    }

    const isAmountValid = (amount) => {
        return amount && !isNaN(amount) && parseFloat(amount) > 0;
    };
    return (

        <SafeAreaView style={styles.safeArea}>

            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
            <Header title={'Gas Bill'} tintColor={Colors.white} />
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
                    {renderDetailRow('Name', billData?.data?.CustomerName)}
                    {renderDetailRow('Bill Number', billData?.data?.BillNumber)}
                    {renderDetailRow('Amount Before Due Date', billData?.data?.DueDate)}
                    {/* {renderDetailRow('Late Payment Amount', '₹50')} */}
                    {renderDetailRow('Consumer Name', billData?.data?.CustomerName)}
                    {renderDetailRow('Gas Number', providerData?.number)}
                    {renderDetailRow('Operator Name', providerData?.OperatorName)}
                    {/* {renderDetailRow('Vehicle Model', 'Model X')}
                    {renderDetailRow('Maximum Permissible Recharge Amount', '₹1000')} */}
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
                <Button title={'PROCEED'} onPress={() => onPayment()} disabled={!isAmountValid(amount)} />
            </View>
        )
    }

    function Fasttagdetails() {
        return (
            <TouchableOpacity style={styles.fasttagDetailsButton} onPress={() => setDetailModal(true)}>
                <Text style={styles.fasttagDetailsText}>View Gas Details</Text>
            </TouchableOpacity>
        )
    }

    function addamount() {
        return (
            <View style={styles.addAmountContainer}>
                <Text style={{ ...Fonts._20MontserratMedium }}>₹</Text>
                <TextInput
                    editable={false}
                    style={styles.textInput}
                    placeholder="500"
                    keyboardType="numeric"
                    placeholderTextColor={Colors.grayA}
                    cursorColor={Colors.black}
                    value={billData?.data?.DueAmount}
                    onChangeText={(txt) => setAmount(txt)}

                />
            </View>
        );
    }

    function vehiclenumber() {
        return (
            <View style={styles.vehicleNumberContainer}>
                <View style={styles.vehicleImageContainer}>
                    <Image
                        source={{ uri: providerData?.operatorImage }}
                        style={styles.vehicleImage}
                    />
                </View>
                <View style={styles.vehicleTextContainer}>
                    <Text style={styles.vehicleOwnerName}>{billData?.data?.CustomerName}</Text>
                    <Text style={styles.vehicleNumber}>{providerData?.number}</Text>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    customerdata: state.registrationReducer.customerdata
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(FasttagPayment);

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
        elevation: 2
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
        justifyContent: 'center',
        flexDirection: 'row'
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
        alignItems: 'center',
        marginBottom: Sizes.fixPadding * 0.5
    },
    bottomSheetTitle: {
        ...Fonts._20MontserratMedium,
        color: '#000000',
        fontSize: getFontSize(22)
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
        color: Colors.grayA
    }
});
