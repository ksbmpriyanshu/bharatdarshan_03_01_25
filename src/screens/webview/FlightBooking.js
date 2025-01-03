import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';
import Header from '../../components/Header';
import { Colors, SCREEN_WIDTH } from '../../assests/style';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const FlightBooking = () => {
  const navigation = useNavigation();

  const x = useSharedValue(SCREEN_WIDTH * 0.1); // Initial X position in the Application
  const y = useSharedValue(SCREEN_WIDTH * 0.4); // Initial Y position in the Application 

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }));

  const onGestureEvent = (event) => {
    x.value = event.nativeEvent.translationX;
    y.value = event.nativeEvent.translationY;
  };

  const onGestureEnd = () => {
    x.value = withSpring(x.value);
    y.value = withSpring(y.value);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header title={'Welcome to BharatDharshan'} tintColor={Colors.white} />
        <WebView
          source={{ uri: 'https://www.patialamart.com/flight-booking' }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={true}
          startInLoadingState={true}
          renderLoading={() => <ActivityIndicator size="large" color="orange" />}
        />

        <PanGestureHandler onGestureEvent={onGestureEvent} onEnded={onGestureEnd}>
          <Animated.View style={[styles.floatingButton, animatedStyle]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assests/images/HomeIcon.png')}
                style={{ height: 40, width: 40 }}
              />
            </TouchableOpacity>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

export default FlightBooking;

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
    bottom: SCREEN_WIDTH * 0.72,
    right: SCREEN_WIDTH * 0.16,
  },
});
