import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Colors, Fonts, getFontSize, Sizes } from '../../../assests/style'
import MyStatusBar from '../../../components/StatusBar'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import IDProof from './IDProof';
import BankDetails from './BankDetails';

const Tab = createMaterialTopTabNavigator();

const KycDetails = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#FBFBFB'}}>
            <MyStatusBar backgroundColor={Colors.white} barStyle='dark-content' />
            {headerInfo()}
            {titleInfo()}
            <View style={{ flex: 1 }}>
                <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: Colors.primaryTheme,
                    tabBarInactiveTintColor: Colors.black,
                    tabBarLabelStyle: {fontFamily: Fonts._14MontserratBold.fontFamily, fontSize: getFontSize(16), textTransform: 'none'},
                    tabBarIndicatorStyle: {height: 4, borderRadius: 1000, backgroundColor: Colors.primaryTheme,},
                    tabBarContentContainerStyle:{backgroundColor: '#FBFBFB'},
                    tabBarStyle: {elevation: 0}
                }}
                >
                    <Tab.Screen name="iDProof" component={IDProof} options={{tabBarLabel: 'ID Proof'}} />
                    <Tab.Screen name="bankDetails" component={BankDetails} options={{tabBarLabel: 'Bank Details'}} />
                </Tab.Navigator>
            </View>
        </View>
    )

    function titleInfo() {
        return (
            <Text style={{ ...Fonts._18MontserratMedium, fontSize: getFontSize(22), marginHorizontal: Sizes.fixPadding, marginBottom: Sizes.fixPadding }}>Update KYC</Text>
        )
    }

    function headerInfo() {
        return (
            <TouchableOpacity
                style={{ padding: Sizes.fixPadding }}
            >
                <Image source={require('../../../assests/icons/backarrow.png')} style={{ width: 45, height: 30 }} />
            </TouchableOpacity>
        )
    }

}

export default KycDetails