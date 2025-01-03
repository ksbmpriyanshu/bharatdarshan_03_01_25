import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import History from '../screens/common/History';
import Search from '../screens/common/Search';
import Profile from '../screens/common/Profile';
import StackNavigation from './StackNavigation';
import Icon from 'react-native-vector-icons/Ionicons';
import DrawerScreen from './DrawerScreen';
import Home from '../screens/home/Home';
import Registration from '../screens/auth/Registration';
const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home-outline';
        } else if (route.name === 'History') {
          iconName = 'newspaper-outline';
        } else if (route.name === 'Search') {
          iconName = 'search';
        } else if (route.name === 'Registration') {
          iconName = 'person-sharp';
        } 

        return <Icon name={iconName} size={size} color={color} />; 
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      headerShown: false, // Hides the header for all tabs
      tabBarStyle: {
        paddingVertical: 10, // Adjust the vertical padding for the tab bar
        height: 60, // Adjust the height to fit the padding and icons
      },
      tabBarIconStyle: {
        marginTop: 5, // Adjust the top margin for the icon
        marginBottom: 5, // Adjust the bottom margin for the icon
      },
      tabBarLabelStyle: {
        paddingBottom: 5, // Adjust the bottom padding for the label
      },
    })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Registration" component={Registration} />
    </Tab.Navigator>
  )
}

export default BottomTabNavigation

const styles = StyleSheet.create({})
// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import MyStatusBar from '../components/StatusBar';
// const Tab = createBottomTabNavigator();

// const BottomTabNavigation = () => {
//   return (
//     <View>
//              <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle='light-content' />
//              <Tab.Navigator
//                 // tabBar={props => <MyBottonTab {...props} />}
//                 screenOptions={{ headerShown: false, }}
//                 backBehavior='history'
//             >
//                 <Tab.Screen name='homeTab' component={Home} options={{ tabBarLabel: t('bottomtab.home') }} />
//                 <Tab.Screen name='mapTab' component={MyPostBookings} options={{ tabBarLabel: t('bottomtab.posted') }} />
//                 <Tab.Screen name='postBookingTab' component={PostBooking} />
//                 <Tab.Screen name='walletTab' component={Wallet} options={{ tabBarLabel: t('bottomtab.wallet') }} />
//                 <Tab.Screen name='profileTab' component={Profile} options={{ tabBarLabel: t('bottomtab.profile') }} />
//             </Tab.Navigator>
//     </View>
//   )
// }

// export default BottomTabNavigation

// const styles = StyleSheet.create({})