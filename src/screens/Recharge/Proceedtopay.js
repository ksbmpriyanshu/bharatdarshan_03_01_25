import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors, Sizes, Fonts, SCREEN_WIDTH, getFontSize } from '../../assests/style';
import MyStatusBar from '../../components/StatusBar';
import Button from '../../components/Button';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import * as RechargeActions from '../../redux/actions/RechargeActions'
import * as UserActions from '../../redux/actions/UserActions'

const Proceedtopay = ({ route, dispatch, navigation }) => {
    const { planData, mobileData, opertatorData } = route.params || {};
    const handlePayment = async (rechargeWith) => {
        const payload = {
            number: mobileData?.phoneNumber,
            operatorId: opertatorData?.providerData?._id,
            circle: opertatorData?.CircleCode,
            amount: planData?.recharge_amount,
            type: 'MOBILE RECHARGE',
            rechargeWith
        }
        dispatch(RechargeActions.onCyrusRecharge(payload))
    };

    const onPayment = ()=>{
        dispatch(UserActions.setPaymentType({visible: true, data: {amount: planData?.recharge_amount, type: 'MOBILE RECHARGE'}, onPress:handlePayment }))
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
            <Loader />
            {Header()}
            {amountData()}
            {proceedbtn()}
        </SafeAreaView>
    );

    function proceedbtn() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding, position: 'absolute', bottom: Sizes.fixPadding * 2, width: '93%' }}>
                <Button title={'Proceed to Pay'} onPress={onPayment} />
            </View>
        );
    }

    function amountData() {
        return (
            <View style={{ borderWidth: 1, margin: Sizes.fixPadding, borderRadius: 10, borderColor: '#00000025', backgroundColor: '#FEE9D8' }}>
                <View style={{ backgroundColor: Colors.white, padding: Sizes.fixPadding, overflow: 'hidden', marginTop: Sizes.fixPadding * 1.6, elevation: 2 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ ...Fonts._14MontserratRegular, color: '#8D7A7A' }}>Validity</Text>
                        <Text style={{ ...Fonts._14MontserratRegular, color: '#000000' }}>{planData?.recharge_validity}{' day'}</Text>
                    </View>
                    <View style={{ marginTop: Sizes.fixPadding * 0.7 }}>
                        <Text style={{ ...Fonts._14MontserratRegular, color: '#8D7A7A' }}>{planData?.recharge_long_desc}</Text>
                    </View>
                </View>
                <View style={{ paddingVertical: Sizes.fixPadding * 2 }}>
                    <Text style={{ ...Fonts._20MontserratMedium, textAlign: 'center', fontSize: getFontSize(23) }}>{'₹'}{planData?.recharge_amount}</Text>
                </View>
            </View>
        );
    }

    function Header() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    backgroundColor: Colors.primaryTheme,
                    alignItems: "center",
                    zIndex: 1,
                    paddingBottom: 2,
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Image
                        source={require("../../assests/icons/backarrow.png")}
                        style={[styles.backIcon]}
                    />
                </TouchableOpacity>
                <View
                    style={{ flex: 0.15, justifyContent: "center", alignItems: "center" }}
                >
                    {mobileData?.contactdata?.image ? (
                        <Image
                            source={{ uri: mobileData?.contactdata?.image }}
                            style={styles.contactImage}
                        />
                    ) : (
                        <View style={styles.contactImagePlaceholder}>
                            <Text style={styles.contactImagePlaceholderText}>
                                {mobileData?.contactdata?.name && mobileData?.contactdata?.name[0]}
                            </Text>
                        </View>
                    )}
                </View>
                <View style={{ flex: 0.5 }}>
                    {mobileData?.contactdata?.name && (
                        <Text
                            style={{ ...Fonts._14MontserratRegular, color: Colors.white }}
                        >
                            {mobileData?.contactdata?.name.slice(0, 18)}
                        </Text>
                    )}
                    <Text style={{ ...Fonts._13MontserratRegular, color: Colors.white }}>
                        {mobileData?.contactdata?.phoneNumber}
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 2,
                        }}
                    >
                        <Text
                            style={{ ...Fonts._12MontserratRegular, color: Colors.white }}
                        >
                            prepiad- {opertatorData?.OperatorCode}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
};

const mapStateToProps = state => ({
    customerdata: state.registrationReducer.customerdata,
    rechargeRazorpay: state.rechargeReducer.rechargeRazorpay
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Proceedtopay);

const styles = StyleSheet.create({
    backButton: {
        zIndex: 99,
        padding: Sizes.fixHorizontalPadding * 0.6,
        flex: 0.09,
    },
    backIcon: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
        tintColor: Colors.white,
    },
    contactImage: {
        width: SCREEN_WIDTH * 0.12,
        height: SCREEN_WIDTH * 0.12,
        borderRadius: 100,
        marginRight: Sizes.fixPadding,
    },
    contactImagePlaceholder: {
        width: SCREEN_WIDTH * 0.12,
        height: SCREEN_WIDTH * 0.12,
        borderRadius: 100,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Sizes.fixPadding,
    },
    contactImagePlaceholderText: {
        ...Fonts._18MontserratRegular,
        color: Colors.primaryTheme,
    },
});
