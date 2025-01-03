import { View, Text } from 'react-native'
import React from 'react'
import { Sizes, Colors, Fonts } from '../../../../../assests/style'

const Header = ({ title }) => {
    return (
        <View style={{ paddingVertical: Sizes.fixPadding * 0.5, paddingBottom: Sizes.fixPadding, paddingHorizontal: Sizes.fixPadding, backgroundColor: Colors.white, borderBottomWidth: 1, borderBlockColor: Colors.grayE }}>
            <Text style={{ ...Fonts._14MontserratSemiBold, }}>{title}</Text>
        </View>
    )
}

export default Header