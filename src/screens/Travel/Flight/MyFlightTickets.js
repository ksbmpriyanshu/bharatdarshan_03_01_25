import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Colors } from '../../../assests/style'
import MyStatusBar from '../../../components/StatusBar'
import Header from '../../../components/Header'

const MyFlightTickets = () => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle='light-content' />
            <Header title={'Flights'} tintColor={Colors.white} />
            <View style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={
                        <>
                            {flightTicketsInfo()}
                        </>
                    }
                />
            </View>
        </View>
    )

    function flightTicketsInfo() {
        return (
            <View>

            </View>
        )
    }

}

export default MyFlightTickets