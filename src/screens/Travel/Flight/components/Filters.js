import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as FlightActions from '../../../../redux/actions/FlightActions'
import { Colors, Fonts, Sizes } from '../../../../assests/style'

const Filters = ({ payload, dispatch }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: Colors.grayC, paddingVertical: Sizes.fixPadding * 0.2 }}>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>dispatch(FlightActions.getFlightListData({...payload, DirectFlight: !payload?.DirectFlight}))} style={[styles.container, {backgroundColor: payload?.DirectFlight ? Colors.grayC : Colors.primaryTheme}]}>
                <Text style={{ ...Fonts._13MontserratMedium, color: !payload?.DirectFlight ? Colors.white : Colors.black  }}>Non-Stop</Text>
            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Filters)

const styles = StyleSheet.create({
    container: {
        paddingVertical: Sizes.fixPadding * 0.5,
        paddingHorizontal: Sizes.fixPadding,
        borderRadius: 1000,
        backgroundColor: Colors.grayC
    }
})