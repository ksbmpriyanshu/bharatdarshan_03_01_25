import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Fonts, Colors, Sizes } from '../../../../../assests/style'
import { useNavigation, useRoute } from '@react-navigation/native'
import { connect } from 'react-redux'
import * as FlightActions from '../../../../../redux/actions/FlightActions'
import { goBack } from '../../../../../navigations/NavigationServices'

const Tabs = ({ activeSsrTab, dispatch }) => {
    const navigation = useNavigation()
    const onTabClick = (tab) => {
        dispatch(FlightActions.setActiveSsrTab(tab))
        navigation.navigate(tab)
    }
    return (
        <View style={styles.tabContainer}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => goBack()}>
                <Image source={require('../../../../../assests/icons/backarrow.png')} style={{ width: 30, height: 10 }} />
            </TouchableOpacity>
            <View style={{ flex: 0, width: '70%', padding: Sizes.fixPadding * 0.2, borderRadius: Sizes.fixPadding * 0.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: Colors.grayE + '80' }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => onTabClick('seats')} style={[styles.tabs, { backgroundColor: activeSsrTab === 'seats' ? '#ffaf96' : 'transparent' }]}>
                    <Text style={{ ...Fonts._12MontserratMedium }}>Seat</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => onTabClick('meals')} style={[styles.tabs, { backgroundColor: activeSsrTab === 'meals' ? '#ffaf96' : 'transparent' }]}>
                    <Text style={{ ...Fonts._12MontserratMedium }}>Meal</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => onTabClick('baggage')} style={[styles.tabs, { backgroundColor: activeSsrTab === 'baggage' ? '#ffaf96' : 'transparent' }]}>
                    <Text style={{ ...Fonts._12MontserratMedium }}>Baggage</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity>
                <Text style={{ ...Fonts._13MontserratMedium }}>Skip</Text>
            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = (state) => ({
    activeSsrTab: state.flightReducer.activeSsrTab
})

const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: Sizes.fixPadding,
        marginTop: Sizes.fixPadding,

    },
    tabs: {
        flex: 0.33,
        flexGrow: 1,
        paddingVertical: Sizes.fixPadding * 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.orange,
        borderRadius: Sizes.fixPadding * 0.5
    }
})