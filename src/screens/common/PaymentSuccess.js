import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Colors,
  Fonts,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  Sizes,
  getFontSize,
} from "../../assests/style";
import MyStatusBar from "../../components/StatusBar";
import Button from "../../components/Button";
import { navigate } from "../../navigations/NavigationServices";
import Loader from "../../components/Loader";
import PaymentSuccessBackground from "../../assests/svg/payment_background.svg";
import LottieView from "lottie-react-native";
import { showNumber } from "../../utils/services";
import moment from "moment";

const PaymentSuccess = ({ route }) => {
  const invoiceData = route?.params?.invoiceData;
  console.log("invoiceData",invoiceData)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar
        backgroundColor={Colors.primaryTheme}
        barStyle={"light-contnet"}
      />
      <Loader />
      <View style={{ flex: 1 }}>
        {imagepart()}
        {imagepart2()}
        {sbmtbtn()}
      </View>
    </SafeAreaView>
  );

  function sbmtbtn() {
    return (
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: Sizes.fixHorizontalPadding * 3,
        }}
      >
        <View style={{ width: "45%", paddingVertical: Sizes.fixPadding }}>
          <Button title={"Home"} onPress={() => navigate("home")} />
        </View>
        <View style={{ width: "45%", paddingVertical: Sizes.fixPadding }}>
          <Button title={"back"} onPress={() => navigate("home")} />
        </View>
      </View>
    );
  }

  function imagepart2() {
    return (
      <View style={{ flex: 0.74 }}>
        <View
          style={{
            flex: 1,
            bottom: Sizes.fixPadding * 7.5,
            backgroundColor: Colors.white,
          }}
        >
          <PaymentSuccessBackground
            width={SCREEN_WIDTH}
            height={SCREEN_HEIGHT * 0.8}
          />
          {/* <Image source={require('../../assests/images/payments.png')} style={{ resizeMode: 'cover', height: '118%', width: '100%', }} /> */}
        </View>
        <View
          style={{
            position: "absolute",
            top: 0,
            width: "95%",
            alignSelf:'center',
            paddingVertical: Sizes.fixPadding,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: Sizes.fixPadding*0.5
          }}
        >
          <Text style={{ ...Fonts._20MontserratMedium }}>
            {invoiceData?.newRechargeData?.status === "SUCCESS" ? "Payment Success" : "Payment Failed"}
          </Text>
          <Text
            style={{
              ...Fonts._14MontserratMedium,
              paddingVertical: Sizes.fixPadding,
              marginHorizontal: Sizes.fixPadding,
              textAlign: 'center'
            }}
          >
            {invoiceData?.newRechargeData?.status === "SUCCESS"
              ? "Your payment has been successfully done."
              : 'It will refund within 3-4 days.'}
          </Text>
          <View
            style={{
              borderBottomWidth: 0.5,
              borderColor: Colors.black,
              width: "80%",
              alignSelf: "center",
              bottom: 10,
            }}
          >
            <Text style={{ color: Colors.black }}></Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                ...Fonts._16MontserratLight,
                paddingVertical: Sizes.fixPadding * 0.7,
              }}
            >
              Total Payment
            </Text>
            <Text
              style={{ ...Fonts._11MontserratLight, fontSize: getFontSize(23) }}
            >
              {showNumber(invoiceData?.newRechargeData?.amount)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: Sizes.fixHorizontalPadding * 0.7,
              marginVertical: Sizes.fixPadding,
            }}
          >
            <View
              style={{
                width: "45%",
                borderWidth: 0.5,
                borderColor: Colors.black,
                marginHorizontal: 5,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: Sizes.fixPadding,
                borderRadius: 5,
              }}
            >
              <Text style={{ ...Fonts._13MontserratRegular }}>Ref Number</Text>
              <Text
                style={{
                  ...Fonts._13MontserratRegular,
                  marginTop: 3,
                  fontSize: getFontSize(10),
                }}
              >
                {invoiceData?.newRechargeData?.transactionId}
              </Text>
            </View>
            <View
              style={{
                width: "45%",
                borderWidth: 0.5,
                borderColor: Colors.black,
                marginHorizontal: 5,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: Sizes.fixPadding,
                borderRadius: 5,
              }}
            >
              <Text style={{ ...Fonts._13MontserratRegular }}>
                Payment Time
              </Text>
              <Text style={{ ...Fonts._11MontserratRegular, marginTop: 3 }}>
                {moment(invoiceData?.newRechargeData?.createdAt).format('Do MMM YYYY HH:mm A')}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: Sizes.fixHorizontalPadding * 0.7,
              marginVertical: Sizes.fixPadding * 0.1,
            }}
          >
            <View
              style={{
                width: "45%",
                borderWidth: 0.5,
                borderColor: Colors.black,
                marginHorizontal: 5,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: Sizes.fixPadding,
                borderRadius: 5,
              }}
            >
              <Text style={{ ...Fonts._13MontserratRegular }}>
                Payment Method
              </Text>
              <Text style={{ ...Fonts._13MontserratRegular, marginTop: 3 }}>
                Online
              </Text>
            </View>
            <View
              style={{
                width: "45%",
                borderWidth: 0.5,
                borderColor: Colors.black,
                marginHorizontal: 5,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: Sizes.fixPadding,
                borderRadius: 5,
              }}
            >
              <Text style={{ ...Fonts._13MontserratRegular }}>Order Id</Text>
              <Text style={{ ...Fonts._11MontserratRegular, marginTop: 3 }}>
                {invoiceData?.newRechargeData?.razorpayOrderId}
              </Text>
            </View>
          </View>

          {/* <View style={{ marginTop: Sizes.fixPadding * 2 }}>
            <Text style={{ ...Fonts._16MontserratMedium }}>
              Get PDF Receipt
            </Text>
          </View> */}
        </View>
      </View>
    );
  }

  function imagepart() {
    return (
      <View
        style={{
          flex: 0.2,
          justifyContent: "flex-end",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        {/* {(historyShow ==='Success') ? (<FastImage source={require('../../assests/images/pays.gif')} style={{ height: SCREEN_HEIGHT * 0.25, width: SCREEN_WIDTH, top: 30 }} />) : (<FastImage source={require('../../assests/images/payfail.gif')} style={{ height: SCREEN_HEIGHT * 0.25, width: SCREEN_WIDTH, top: 30 }} />)} */}
        <LottieView
          source={
            invoiceData?.newRechargeData?.status === "SUCCESS"
              ? require("../../assests/svg/payment_success.json")
              : require("../../assests/svg/payment_failed.json")
          }
          style={{ width: SCREEN_WIDTH * 0.4, height: SCREEN_WIDTH * 0.4 }}
          autoPlay
          loop={false}
        />
      </View>
    );
  }
};

export default PaymentSuccess;

const styles = StyleSheet.create({});
