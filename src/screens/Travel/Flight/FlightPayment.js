import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Colors, SCREEN_WIDTH } from '../../../assests/style'
import MyStatusBar from '../../../components/StatusBar'
import LottieView from 'lottie-react-native'
import { resetToScreen } from '../../../navigations/NavigationServices'

const FlightPayment = () => {
    useEffect(() => {
        setTimeout(() => {
            resetToScreen('home')
        }, 3000);
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle='light-content' />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <LottieView source={require('../../../assests/svg/ticket_success.json')} loop={false} autoPlay style={{ width: SCREEN_WIDTH * 0.8, height: SCREEN_WIDTH * 0.8 }} />
            </View>
        </View>
    )
}

export default FlightPayment