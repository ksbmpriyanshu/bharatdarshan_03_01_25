import { View, Text, TouchableOpacity } from 'react-native'
import React, { memo, useEffect } from 'react'
import { Path, Svg } from 'react-native-svg'
import { Fonts, SCREEN_WIDTH, Sizes } from '../../../../../assests/style'

const SvgSeat = memo(({ item, onSelect, seatColor, getText }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onSelect(item)}
            style={{
                width: SCREEN_WIDTH * 0.12,
                height: SCREEN_WIDTH * 0.13,
                borderRadius: Sizes.fixPadding * 0.3,
            }}
        >
            <Svg width={SCREEN_WIDTH * 0.12} height={SCREEN_WIDTH * 0.13} viewBox="0 0 37 37" fill="none">
                <Path d="M3 6C3 2.6863 5.68629 0 9 0H28C31.3137 0 34 2.68629 34 6V27.8131C34 28.2594 33.7041 28.6518 33.275 28.7745L20.9747 32.2923C19.3573 32.7548 17.6427 32.7548 16.0253 32.2923L3.72503 28.7745C3.29585 28.6518 3 28.2594 3 27.8131V6Z" fill={seatColor(item)} />
                <Path d="M1 13C1 13.4 1 25.5 1 31.5L18.5 36L36 31.5V13" stroke={seatColor(item)} strokeWidth="1.5" fill="none" />
            </Svg>
            <View style={{ width: SCREEN_WIDTH * 0.12, height: SCREEN_WIDTH * 0.13, position: 'absolute', justifyContent: 'center', alignItems: "center" }}>
                <Text style={{ ...Fonts._11MontserratMedium, fontSize: 9 }}>{getText(item)}</Text>
            </View>
        </TouchableOpacity>

    )
})

export default SvgSeat