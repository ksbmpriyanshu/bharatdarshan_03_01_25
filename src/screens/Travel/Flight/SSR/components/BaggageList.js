import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes } from '../../../../../assests/style'
import { showNumber } from '../../../../../utils/services'

const BaggageList = () => {
    const renderItem = ({ item, index }) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Sizes.fixPadding*1.5 }}>
                <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: 13 }}>Excess Baggage 3 KG at {showNumber(1200)}</Text>
                <TouchableOpacity
                    style={{ paddingHorizontal: Sizes.fixPadding * 1.5, borderWidth: 1, paddingVertical: Sizes.fixPadding * 0.5, borderRadius: 1000, borderColor: Colors.primaryTheme, marginRight: Sizes.fixPadding * 0.3 }}
                >
                    <Text style={{ ...Fonts._13MontserratMedium, color: Colors.primaryTheme }}>+ Add</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={{ marginHorizontal: Sizes.fixPadding, marginVertical: Sizes.fixPadding }}>
            <FlatList
                data={Array.from({ length: 8 })}
                renderItem={renderItem}

            />
        </View>
    )
}

export default BaggageList