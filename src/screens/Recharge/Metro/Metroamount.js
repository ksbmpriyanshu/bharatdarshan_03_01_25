import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, SCREEN_WIDTH, Sizes, Fonts } from '../../../assests/style'
import MyStatusBar from '../../../components/StatusBar'
import Header from '../../../components/Header'
import { Input } from '@rneui/themed'
import Button from '../../../components/Button'
import { showToastMessage } from '../../../utils/services'
import * as RechargeActions from '../../../redux/actions/RechargeActions'
import * as UserActions from '../../../redux/actions/UserActions'
import { connect } from 'react-redux'

const Metroamount = ({ route, dispatch }) => {
  console.log(route.params)
  const [cardNumber, setCardNumber] = useState('')
  const [amount, setAmount] = useState('')

  const handleProceddPayment = async (rechargeWith) => {

    const payload = {
      number: cardNumber,
      operatorId: route.params?._id,
      circle: 1,
      amount: amount,
      type: 'METRO CARD',
      rechargeWith
    }
    console.log(payload)
    dispatch(RechargeActions.onCyrusRecharge(payload))

  }


  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
      <Header title={route.params?.OperatorName} tintColor={Colors.white} />
      <View style={{ flex: 1, paddingHorizontal: Sizes.fixHorizontalPadding, }}>
        {cardDetails()}
        {CardNumber()}
        {ProceedButton()}
      </View>
    </View>
  )


  function ProceedButton() {
    const onPay = () => {
      if (cardNumber.length == 0) {
        showToastMessage({ message: 'Please enter card number' })
        return
      }

      if (cardNumber.length < 8 || cardNumber.length > 12) {
        showToastMessage({ message: 'Card number must be between 8 to 12 digits.' });
        return;
      }

      else if (amount.length == 0) {
        showToastMessage({ message: 'Please enter amount' })
        return
      } else if (amount % 100 !== 0) {
        showToastMessage({ message: 'Amount should be a multiple of 100' })
        return
      } else {
        dispatch(UserActions.setPaymentType({ visible: true, data: { amount: amount, type: 'METRO CARD' }, onPress: handleProceddPayment }))
      }

    }
    return (
      <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '100%' }}>
          <Button title={'Pay'} onPress={onPay} />
        </View>
      </View>
    )
  }

  function CardNumber() {
    return (
      <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>

        <Input
          value={cardNumber}
          inputContainerStyle={styles.inputContainer}
          containerStyle={{ height: 50, paddingHorizontal: 0 }}
          inputStyle={{ ...Fonts._14MontserratMedium,color:'#530201' }}
          placeholder='Smart Card Number'
          placeholderTextColor={'#530201'}
          onChangeText={setCardNumber}
            keyboardType='number-pad'
        />
        <Text style={{ width: '90 %', ...Fonts._11MontserratMedium, color: '#86858571', marginVertical: Sizes.fixHorizontalPadding }}>Please enter Your 8-12 digit metro smart Card Number to recharge</Text>
        <Input
          value={amount}
          keyboardType='number-pad'
          inputContainerStyle={styles.inputContainer}
          containerStyle={{ height: 50, paddingHorizontal: 0 }}
          inputStyle={{ ...Fonts._14MontserratMedium,color:'#530201' }}
          placeholder='Enter Valid Amount'
          placeholderTextColor={'#530201'}
          onChangeText={setAmount}
        />
        <Text style={{ width: '90%', ...Fonts._11MontserratMedium, color: '#86858571', marginTop: Sizes.fixHorizontalPadding }}>Amount should be at least 100 and should be a multiple of 50</Text>
      </View>
    )
  }

  function cardDetails() {
    return (
      <View style={{ flex: 0.25, justifyContent: 'flex-end', alignItems: 'center' }}>
        <Image source={{ uri: route.params?.operatorImage }} style={{ height: SCREEN_WIDTH * 0.2, width: SCREEN_WIDTH * 0.2 }} />
        <Text style={{ ...Fonts._16MontserratMedium, marginTop: Sizes.fixPadding }}>{route.params?.OperatorName}</Text>
      </View>
    )
  }

}

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(null, mapDispatchToProps)(Metroamount)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  inputContainer: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    marginHorizontal: Sizes.fixPadding,
    borderColor: Colors.grayA,
    backgroundColor: '#FFFFFF',
    borderColor: '#00000040',
  },
})