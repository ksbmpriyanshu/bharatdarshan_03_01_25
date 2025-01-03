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
import { connect, useSelector } from 'react-redux';
import Button from '../../../components/Button';
import { BottomSheet } from '@rneui/themed';
import MyStatusBar from '../../../components/StatusBar';
import { navigate } from '../../../navigations/NavigationServices';
import { createOrder, fastagOrCableRecharge, razorpayInialise } from '../../../utility/rechargeApi';
import Loader from '../../../components/Loader';
import * as RechargeActions from '../../../redux/actions/RechargeActions'
import * as UserActions from '../../../redux/actions/UserActions';
import Header from '../../../components/Header';
import { showNumber, showToastMessage } from '../../../utils/services';


const FasttagPayment = ({ route, customerdata, dispatch }) => {
    const { billData, providerData } = route.params || {};
    console.log("providerData",providerData)
    const optData = useSelector((state) => state.optCircleReducer.otpData);
    const getCircleData = useSelector((state) => state.optCircleReducer.circleData);
    const [amount, setAmount] = useState('')
    const [detailModal, setDetailModal] = useState(false)

    const handleProceddPayment = async (rechargeWith) => {
        if(amount.length == 0){
            showToastMessage({message: 'Please enter an amount'})
            return
        }
        const payload = {
            number: providerData?.number,
            operatorId: providerData?._id,
            circle: 1,
            amount: amount,
            type: 'FASTAG',
            rechargeWith
        }
        console.log('payload :::',payload);
       
       
        dispatch(RechargeActions.onCyrusRecharge(payload))
    }

    // const onPayment = ()=>{
    //     console.log(amount)
    //     if(amount != '') {
    //         dispatch(UserActions.setPaymentType({visible: true, data: {amount: amount, type: 'FASTAG'}, onPress:handleProceddPayment }))
    //     } else {
    //         showToastMessage({ message: "Please Enter Amount."});
    //     }
        
    // }
    const onPayment = () => {
        
        if (amount !== '') {
            const numericAmount = parseFloat(amount);
            if (numericAmount >= 500 && numericAmount % 100 === 0) {
                if (numericAmount <= 25000) {
                    dispatch(UserActions.setPaymentType({
                        visible: true,
                        data: { amount: amount, type: 'FASTAG' },
                        onPress: handleProceddPayment
                    }));
                } else {
                    showToastMessage({ message: "Amount should not exceed ₹25,000." });
                }
            } else {
                showToastMessage({ message: "Amount must be 500 and multiple of ₹100." });
            }
        } else {
            showToastMessage({ message: "Please Enter Amount." });
        }
    };
    

    return (
        <SafeAreaView style={styles.safeArea}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
            <Header title={'FASTag Payment'} tintColor={Colors.white} />
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
        console.log("billData",billData)
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
                        <Text style={styles.bottomSheetTitle}>FASTag Details</Text>
                        <TouchableOpacity onPress={() => setDetailModal(false)}>
                            <Image source={require('../../../assests/images/detailclose.png')} />
                        </TouchableOpacity>
                    </View>


                    {renderDetailRow('Name', billData?.data?.CustomerName)}
                    {/* {renderDetailRow('Bill Number', billData?.data?.BillNumber)} */}
                    {/* {renderDetailRow('Amount Before Due Date', billData?.data?.BillNumber)} */}
                    {/* {renderDetailRow('Late Payment Amount', billData?.data?.BillNumber)} */}
                    {/* {renderDetailRow('Fast Tag Balance', '₹300')} */}
                    {/* {renderDetailRow('Minimum Amount for Top-up', showNumber(billData?.data?.DueAmount))} */}
                    {renderDetailRow('Minimum Amount for Top-up', 500)}
                    {/* {renderDetailRow('Tag Status', 'Active')} */}
                    {/* {renderDetailRow('Vehicle Model', 'Model X')} */}
                    {renderDetailRow('Maximum Permissible Recharge Amount', '₹10000')}
                </View>
            </BottomSheet>
        )
    }

    function renderDetailRow(label, value) {
        return (
            <View style={styles.detailRow}>
                <Text style={{ ...styles.detailLabel, flex: 0.8 }}>{label}</Text>
                <Text style={styles.detailValue}>{value}</Text>
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

    function Fasttagdetails() {
        return (
            <TouchableOpacity style={styles.fasttagDetailsButton} onPress={() => setDetailModal(true)}>
                <Text style={styles.fasttagDetailsText}>View Fastag Details</Text>
            </TouchableOpacity>
        )
    }

    function addamount() {
        return (
            <View>
                <View style={styles.addAmountContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter amount"
                        keyboardType="numeric"
                        placeholderTextColor={Colors.grayA}
                        cursorColor={Colors.black}
                        value={amount}
                        onChangeText={(txt) => setAmount(txt)}
                    />
                </View>
                <Text style={{ ...Fonts._13MontserratMedium, textAlign: 'center', marginTop: Sizes.fixPadding }}>Minimum amount: 500</Text>
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
                    <Text style={styles.vehicleNumber}>{providerData?.OperatorName}</Text>
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
        borderRadius: 100
    },
    fasttagDetailsText: {
        ...Fonts._16MontserratMedium,
        color: '#00000090'
    },
    addAmountContainer: {
        backgroundColor: Colors.white,
        alignSelf: 'center',
        width: '70%',
        borderRadius: 10,
        padding: 5,
        marginTop: Sizes.fixPadding * 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        ...Fonts._18MontserratMedium,
        paddingHorizontal: 10,
        width: '100%',
        textAlign: 'center'
    },
    vehicleNumberContainer: {
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 40,

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
        ...Fonts._18MontserratMedium,
        color: '#000000',
    },
    vehicleNumber: {
        ...Fonts._16MontserratMedium,
        color: '#000',

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
        color: Colors.black
    }
});
