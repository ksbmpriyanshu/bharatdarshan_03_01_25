
import { PermissionsAndroid, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import StackNavigation from './src/navigations/StackNavigation'
import { NavigationContainer } from '@react-navigation/native'
import { setTopLevelNavigator } from './src/navigations/NavigationServices'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Contactlist from './src/screens/Recharge/Contactlist'
import BottomTabNavigation from './src/navigations/BottomTabNavigation';
import PaymentType from './src/components/PaymentType'
import NetInfo from '@react-native-community/netinfo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    async function requestPermissions() {
      if (Platform.OS === 'android') {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ];
        // Calling the permission function
        const granted = await PermissionsAndroid.requestMultiple(permissions, {
          title: 'Example App Permissions',
          message: 'Example App needs access to certain features.',
        });

        if (
          granted[PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
          PermissionsAndroid.RESULTS.GRANTED
        ) {
          // Permission Granted
          console.log('permissions');
        } else {
          // Permission Denied
          console.log('CAMERA Permission Denied');
        }
        Notifee.requestPermission();
      } else {
        Notifee.requestPermission();
      }
    }

    requestPermissions();
  }, []);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
          console.log(state.isConnected, 'Net info :::::');
            setIsConnected(state.isConnected);
        });

        // Initial check
        NetInfo.fetch().then(state => {
          console.log(state.isConnected, 'Net info :::::');
            setIsConnected(state.isConnected);
        });

        // Cleanup subscription on unmount
        return () => {
            unsubscribe();
        };
    }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaView style={{ flex: 1, }}>
      <NavigationContainer ref={c => setTopLevelNavigator(c)}>
        <StackNavigation />
      </NavigationContainer>
      <PaymentType />
    </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({})