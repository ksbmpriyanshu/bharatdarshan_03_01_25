import { View, Text, FlatList, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Fonts, getFontSize, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes } from '../../assests/style'
import MyStatusBar from '../../components/StatusBar'
import Header from '../../components/Header'
import WalletBackground from '../../assests/svg/wallet_background.svg'
import WalletArrow from '../../assests/svg/wallet_arrow.svg'
import { showNumber, showToastMessage } from '../../utils/services'
import LinearGradient from 'react-native-linear-gradient'
import { BottomSheet } from '@rneui/themed'
import * as UserActions from '../../redux/actions/UserActions'
import { connect } from 'react-redux'

const Wallet = ({ dispatch, walletRechargeOfferData, customerData }) => {
    const [state, setState] = useState({
        billData: {
            amount: '',
            offerData: null
        },
        isFirstTime: false,
        showBillDetails: false
    })

    useEffect(() => {
        dispatch(UserActions.getWalletRechargeOffers())
    }, [])

    const updateState = state => {
        setState(prevState => {
            return { ...prevState, ...state }
        })
    }

    const { billData, showBillDetails, isFirstTime } = state

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar barStyle='light-content' />
            <Header title={'Wallet'} tintColor={Colors.white} />
            <View style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={<>
                        {inputInfo()}
                        {walletRechargeOfferData?.isFirstTime && walletBannerInfo()}
                        {walletRechargeOfferData && amountsInfo()}
                        {footerInfo()}
                    </>}
                />
            </View>
            {billDetailsInfo()}
        </View>
    )

    function billDetailsInfo() {
        const onPayment = () => {
            const amount = parseFloat(billData.amount / 100 * 18) + parseFloat(billData.amount)
            const payload = {
                amount: billData.offerData ? '' : amount,
                offerId: billData?.offerData?._id ?? '',
                isFirstTime
            }
            console.log('payload ::::', payload, amount)
            dispatch(UserActions.onWalletRecharge(payload))
            updateState({ billData: { amount: '', offerData: null }, showBillDetails: false, isFirstTime: false })
        }
        return (
            <BottomSheet
                isVisible={showBillDetails}
                onBackdropPress={() => updateState({ showBillDetails: false, billData: { amount: '', offerData: null } })}
            >
                <View style={{ backgroundColor: Colors.white, borderTopRightRadius: Sizes.fixPadding, borderTopLeftRadius: Sizes.fixPadding, padding: Sizes.fixPadding }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: Sizes.fixPadding * 0.5 }}>
                        <Text style={{ ...Fonts._16MontserratMedium }}>Amount</Text>
                        <Text style={{ ...Fonts._16MontserratMedium }}>{showNumber(billData.amount)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: Sizes.fixPadding * 0.5 }}>
                        <Text style={{ ...Fonts._16MontserratMedium, }}>GST @18%</Text>
                        <Text style={{ ...Fonts._16MontserratMedium, }}>{showNumber(billData.amount / 100 * 18)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ ...Fonts._16MontserratMedium, }}>Total Amount</Text>
                        <Text style={{ ...Fonts._16MontserratMedium, }}>{showNumber(parseFloat(billData.amount / 100 * 18) + parseFloat(billData.amount))}</Text>
                    </View>
                    {billData.offerData && <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: Sizes.fixPadding * 0.5 }}>
                        <Text style={{ ...Fonts._14MontserratBold, fontSize: getFontSize(16) }}>You get in Wallet</Text>
                        <Text style={{ ...Fonts._14MontserratBold, fontSize: getFontSize(16) }}>{showNumber(parseFloat(billData.amount / 100 * billData.offerData.offerPercentage) + parseFloat(billData.amount))}</Text>
                    </View>}
                    <TouchableOpacity onPress={() => onPayment()} activeOpacity={0.8} style={{ backgroundColor: Colors.orange, alignItems: 'center', alignSelf: 'center', width: '60%', marginTop: Sizes.fixPadding * 2, borderRadius: 1000, paddingVertical: Sizes.fixPadding * 0.5, elevation: 5, shadowColor: Colors.grayA }}><Text style={{ ...Fonts._16MontserratMedium, color: Colors.white }}>Add</Text></TouchableOpacity>
                </View>
            </BottomSheet>
        )
    };

    function footerInfo() {
        return (
            <View>
                <Text style={{ ...Fonts._16MontserratMedium, textAlign: 'center' }}>Gst excluded</Text>
                <Text style={{ ...Fonts._13MontserratMedium, color: '#424040', textAlign: 'center', }}>For Payment 3rd party service going to be used.Refresh Your Network Connection if it is slow. if you face any issue please contact us.</Text>
            </View>
        )
    }

    function amountsInfo() {
        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity activeOpacity={0.8} onPress={() => updateState({ billData: { amount: item?.amount, offerData: item }, showBillDetails: true })} style={{ width: SCREEN_WIDTH * 0.28, borderWidth: 2, borderColor: '#AAE09C', borderRadius: Sizes.fixPadding * 0.5, marginLeft: SCREEN_WIDTH * 0.04, marginBottom: SCREEN_WIDTH * 0.04 }}>
                    <View style={{ paddingVertical: Sizes.fixPadding, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ ...Fonts._18MontserratMedium, color: Colors.grayDark, textAlign: 'center' }}>{showNumber(item?.amount)}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#24B00150', borderRadius: Sizes.fixPadding * 0.3 }}>
                        <Text style={{ ...Fonts._13MontserratMedium, color: '#1B6C06' }}>{item?.offerPercentage}% Extra</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2 }}>
                <FlatList
                    data={walletRechargeOfferData?.data ?? []}
                    renderItem={renderItem}
                    numColumns={3}
                />
            </View>
        )
    }

    function walletBannerInfo() {
        return (
            <LinearGradient
                colors={['#FFFFFF', '#FFE2C3']}
                style={{ paddingVertical: Sizes.fixPadding * 1.5, marginVertical: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding, borderRadius: Sizes.fixPadding * 0.7, elevation: 2, shadowColor: Colors.grayA, paddingLeft: Sizes.fixPadding, alignItems: 'flex-start' }}
            >
                <Text style={{ ...Fonts._14MontserratBold, fontSize: getFontSize(22), color: Colors.orange }}>Get {showNumber(50)}</Text>
                <Text style={{ ...Fonts._18MontserratMedium, color: Colors.grayDark, marginTop: Sizes.fixPadding * 0.3 }}>First Add MoneyOffer{'\n'}Recharge with {showNumber(1000)}</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => updateState({ billData: { amount: '1000', offerData: null }, isFirstTime: true, showBillDetails: true })}
                    style={{ marginTop: Sizes.fixPadding, backgroundColor: Colors.black, paddingHorizontal: Sizes.fixPadding * 0.8, paddingVertical: Sizes.fixPadding * 0.3, borderRadius: 1000 }}
                >
                    <Text style={{ ...Fonts._14MontserratBold, fontSize: getFontSize(13), color: Colors.white }}>{"Add Money to Wallet >"}</Text>
                </TouchableOpacity>
            </LinearGradient>
        )
    }

    function inputInfo() {

        const addAmount = () => {
            if (billData.amount.length == 0) {
                showToastMessage({ message: 'Please enter amount' })
                return
            } else if (billData.amount < 50) {
                showToastMessage({ message: 'Amount should be greater than or equal to 50' })
                return
            } else {
                updateState({ showBillDetails: true })
            }
        }

        return (
            <View
                style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH * 0.735 }}
            >
                <WalletBackground
                    width={'100%'}
                    height={'100%'}
                />

                <View
                    style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, justifyContent: 'space-between' }}
                >
                    <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ ...Fonts._18MontserratMedium, fontSize: getFontSize(20), marginBottom: Sizes.fixPadding * 0.5 }}>Available Balance</Text>
                        <Text style={{ ...Fonts._18MontserratMedium, fontSize: getFontSize(28), color: Colors.orange }}>{showNumber(customerData?.wallet)}</Text>
                    </View>

                    <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput
                            value={billData?.amount}
                            placeholder='₹ ENTER AMOUNT'
                            placeholderTextColor={Colors.white}
                            textAlign='center'
                            maxLength={8}
                            keyboardType='number-pad'
                            cursorColor={Colors.white}
                            onChangeText={text => updateState({ billData: { ...billData, amount: text } })}
                            style={{ ...Fonts._18MontserratMedium, color: Colors.white, width: '70%', textAlign: 'center', marginTop: Sizes.fixPadding,height:70,textAlignVertical:"bottom" }}
                        />
                        <WalletArrow width={SCREEN_WIDTH * 0.8} height={10} />
                    </View>
                    <TouchableOpacity onPress={() => addAmount()} activeOpacity={0.8} style={{ backgroundColor: Colors.orange, alignItems: 'center', alignSelf: 'center', width: '60%', marginBottom: Sizes.fixPadding * 2, borderRadius: 1000, paddingVertical: Sizes.fixPadding * 0.5, elevation: 5, shadowColor: Colors.grayA ,marginTop:5,}}><Text style={{ ...Fonts._16MontserratMedium, color: Colors.white }}>Add</Text></TouchableOpacity>
                </View>

            </View>
        )
    }

}

const mapStateToProps = (state) => ({
    walletRechargeOfferData: state.userReducer.walletRechargeOfferData,
    customerData: state.registrationReducer.customerdata
})

const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Wallet)