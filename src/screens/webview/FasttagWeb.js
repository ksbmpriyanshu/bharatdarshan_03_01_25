import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import Header from '../../components/Header';
import { Colors, SCREEN_WIDTH } from '../../assests/style';
import { useNavigation } from '@react-navigation/native';


const FasttagWeb = () => {
  const navigation = useNavigation();

  return (
      <View style={styles.container}>
        <Header title={'Welcome to BharatDharshan'} tintColor={Colors.white} />
        <WebView
          source={{ uri: 'https://www.patialamart.com/billpay?type=Fastag' }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={true}
          startInLoadingState={true}
          renderLoading={() => <ActivityIndicator size="large" color="orange" />}
        />

          <View style={[styles.floatingButton]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assests/images/HomeIcon.png')}
                style={{ height: 40, width: 40 }}
              />
            </TouchableOpacity>
          </View>

      </View>
  );
};

export default FasttagWeb;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    bottom: SCREEN_WIDTH * 0.2,
    right: SCREEN_WIDTH * 0.1,
  },
  innerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'orange',
  },
});
