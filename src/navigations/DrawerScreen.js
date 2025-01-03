import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import History from '../screens/common/History';
import Favourite from '../screens/Sanchar/podcast/Favourite';
import WalletBalance from '../screens/common/WalletBalance';
import CustomDrawerContent from './CustomDrawerContent';
import Home from '../screens/home/Home';
import BottomTabNavigation from './BottomTabNavigation';
import { SCREEN_WIDTH } from '../assests/style';

const Drawer = createDrawerNavigator();
const DrawerScreen = () => {
    return (
        <Drawer.Navigator 
        screenOptions={{ headerShown: false,drawerStyle: { width: SCREEN_WIDTH * 0.85 } }}
         drawerContent={(props) => <CustomDrawerContent {...props} />} 
         >
            
            <Drawer.Screen name='Main' component={BottomTabNavigation} />
            <Drawer.Screen name="Order History" component={History} />
            <Drawer.Screen name='Favourite' component={Favourite} />
            <Drawer.Screen name='wallet Balance' component={WalletBalance} />
        </Drawer.Navigator>
    )
}

export default DrawerScreen
