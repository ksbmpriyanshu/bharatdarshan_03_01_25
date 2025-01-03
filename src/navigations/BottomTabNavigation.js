import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import History from '../screens/common/History';
import Search from '../screens/common/Search';
import Profile from '../screens/common/Profile';
import StackNavigation from './StackNavigation';
import Icon from 'react-native-vector-icons/Ionicons';
import DrawerScreen from './DrawerScreen';
import Home from '../screens/home/Home';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const navigation = useNavigation(); // Use navigation hook

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
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
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      {/* <Tab.Screen name="History" component={History} /> */}
      <Tab.Screen
        name="History"
        component={View} 
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); 
            navigation.navigate('historyweb');
          },
        }}
      />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen
        name="Registration"
        component={View} 
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); 
            navigation.navigate('registrationweb');
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({});
