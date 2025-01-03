import React, { useEffect, useState } from 'react';
import {Keyboard, Alert, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MyStatusBar from '../../components/StatusBar';
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes, getFontSize } from '../../assests/style';
import Header from '../../components/Header';
import { CodeField, useClearByFocusCell, Cursor } from 'react-native-confirmation-code-field';
import Button from '../../components/Button';
import { showToastMessage } from '../../utils/services';
import { connect } from 'react-redux';
import * as UserActions from '../../redux/actions/UserActions';
import * as AuthActions from '../../redux/actions/AuthActions'

const CELL_COUNT = 4;
const Otp = ({ route, dispatch }) => {
  // console.log(route.params)
  const [value, setValue] = useState('');
  const [otpprops, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });
  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          setResendEnabled(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Clear timer on component unmount
  }, []);

  const startTimer = () => {
    setResendEnabled(false);
    setTimer(90);
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          setResendEnabled(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  // Function to format timer in MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  const handleOtpChange = (text) => {
    setValue(text);
    if (text.length === CELL_COUNT) {
      Keyboard.dismiss();
    }
  };
  return (
    <ImageBackground source={require('../../assests/images/otpback.png')} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
          <View style={{ flex: 1 }}>
            {ImagePart()}
            {OtpTxt()}
            {OtpField()}
            {resendCode()}
            {OtpButton()}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );

  function OtpButton() {
    const validation = () => {
      const payload = {
        phone: route.params?.phoneNumber,
        otp: value
      };
      dispatch(UserActions.onOtpVerification(payload));
    };

    return (
      <View style={{ marginHorizontal: Sizes.fixHorizontalPadding * 2, marginTop: Sizes.fixPadding }}>
        <Button title={'Confirm'} onPress={validation} />
      </View>
    );
  }

  function resendCode() {
    const handleResend = () => {
      if (!resendEnabled) return;

      const payload = {
        phone: route.params?.phone,
        otp: value
      };

      startTimer();
      dispatch(UserActions.onResend(payload));
    };

    return (
      <View style={{ flex: 0.07, justifyContent: 'center', alignItems: 'center', marginTop: Sizes.fixPadding * 2 }}>
        <Text style={{ color: Colors.primaryTheme, fontSize: getFontSize(19), fontFamily: 'Montserrat-Medium' }}>
          {`Not received the code? `}
          <Text
            style={{ color: resendEnabled ? Colors.wine : Colors.grey, fontSize: getFontSize(20), fontFamily: 'Montserrat-Medium' }}
            onPress={handleResend}
          >
            Resend {timer > 0 && `(${formatTime(timer)})`}
          </Text>
        </Text>
      </View>
    );
  }

  function OtpField() {
    return (
      <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
        <CodeField
          {...otpprops}
          value={value}
          onChangeText={handleOtpChange}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>
    );
  }

  function OtpTxt() {
    return (
      <View style={{ flex: 0.15, marginHorizontal: Sizes.fixHorizontalPadding * 2, marginTop: Sizes.fixPadding }}>
        <Text style={{ ...styles.txt, fontSize: getFontSize(20) }}>
          A 4 digit code has been sent to your {'\n'}registered Mobile Number
        </Text>
        <Text style={{ textAlign: 'center', color: Colors.primaryTheme, fontSize: getFontSize(24), fontFamily: 'Montserrat-Regular', marginTop: Sizes.fixPadding * 1.5 }}>
          Enter Code To Verify
        </Text>
      </View>
    );
  }

  function ImagePart() {
    return (
      <View style={{ flex: 0.35, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../../assests/images/otp.png')} style={{ height: SCREEN_WIDTH * 0.7, width: SCREEN_WIDTH, resizeMode: 'contain', marginTop: -Sizes.fixPadding, bottom: Sizes.fixPadding }} />
      </View>
    );
  }
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(null, mapDispatchToProps)(Otp);

const styles = StyleSheet.create({
  txt: {
    color: Colors.primaryTheme,
    textAlign: 'center',
    fontFamily: 'Montserrat-Light'
  },
  codeFieldRoot: {
    alignSelf: 'center'
  },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 40,
    borderBottomWidth: 2,
    borderRadius: Sizes.fixPadding * 0.2,
    borderColor: Colors.primaryTheme,
    textAlign: 'center',
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    color: Colors.wine,
    fontSize: getFontSize(21)
  },
  focusCell: {
    borderColor: Colors.wine
  },
});