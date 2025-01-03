import { View, Text, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'

const MyStatusBar = ({ backgroundColor, barStyle = 'light-content', translucent = false }) => {
    return (
        <View style={{backgroundColor: backgroundColor}}>
            <StatusBar backgroundColor={backgroundColor} barStyle={barStyle} translucent={translucent} />
        </View>

    )
}

export default MyStatusBar