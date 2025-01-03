import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Platform, UIManager, LayoutAnimation } from 'react-native';
import { Colors, Sizes, Fonts } from '../../../../assests/style';
import { showNumber } from '../../../../utils/services';
import { connect } from 'react-redux';

const tabs = [
    { name: 'Baggage', id: 1 },
    { name: 'Cancellation Fee', id: 2 },
    { name: 'Reschedule Fee', id: 3 },
];

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const BaggageCancellation = ({ flightData, passengers }) => {
    const [selectedTab, setSelectedTab] = useState(1);


    const onSelect = useCallback((id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setSelectedTab(id);
    }, [flightData]);

    const tabsInfo = useCallback(() => (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            {tabs.map((item) => (
                <TouchableOpacity key={item.name} activeOpacity={0.8} onPress={() => onSelect(item.id)} style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ ...Fonts._14MontserratSemiBold, fontFamily: item.id === selectedTab ? Fonts._14MontserratSemiBold.fontFamily : Fonts._14MontserratMedium.fontFamily, marginBottom: Sizes.fixPadding * 0.5, fontSize: 13 }}>{item.name}</Text>
                    <View style={{ width: '110%', height: 2, borderRadius: 100, backgroundColor: item.id === selectedTab ? Colors.primaryTheme : 'transparent' }} />
                </TouchableOpacity>
            ))}
        </View>
    ), [selectedTab, onSelect]);

    const baggageInfo = useCallback(() => (
        <View style={{ marginTop: Sizes.fixPadding }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: Sizes.fixPadding * 0.5 }}>
                <Text style={{ ...Fonts._11MontserratMedium, color: Colors.grayA, flex: 0.33 }}>PASSENGER</Text>
                <Text style={{ ...Fonts._11MontserratMedium, color: Colors.grayA, flex: 0.33 }}>CABIN</Text>
                <Text style={{ ...Fonts._11MontserratMedium, color: Colors.grayA, flex: 0.33 }}>CHECK-IN</Text>
            </View>
            {[...new Set(passengers.map(item => item.type))].map((type) => (
                <View key={type} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: Sizes.fixPadding * 0.3 }}>
                    <Text style={{ ...Fonts._11MontserratMedium, flex: 0.33 }}>{type}</Text>
                    <Text style={{ ...Fonts._11MontserratMedium, flex: 0.33 }}>{type != 'Infant' ? `${flightData?.Results?.Segments[0][0]?.CabinBaggage}` : 'Not Applicable'} </Text>
                    <Text style={{ ...Fonts._11MontserratMedium, flex: 0.33 }}>{type != 'Infant' ? `${flightData?.Results?.Segments[0][0]?.Baggage} (1 Piece)` : 'Not Applicable'}</Text>
                </View>
            ))}

        </View>
    ), [flightData]);

    const cancellationFeeInfo = useCallback(() => (
        <View style={{ marginTop: Sizes.fixPadding }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: Sizes.fixPadding * 0.5 }}>
                <Text style={{ ...Fonts._11MontserratMedium, color: Colors.grayA, flex: 0.5 }}>TIME FRAME</Text>
                <Text style={{ ...Fonts._11MontserratMedium, color: Colors.grayA, flex: 0.5 }}>AIRLINE FEE + BHARATDARSHAN FEE</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: Sizes.fixPadding * 0.3 }}>
                <Text style={{ ...Fonts._11MontserratMedium, flex: 0.5 }}>More than 2 hours </Text>
                <Text style={{ ...Fonts._11MontserratMedium, flex: 0.5 }}>{showNumber(3500)} + {showNumber(250)}</Text>
            </View>
        </View>
    ), [flightData]);

    const rescheduleFeeInfo = useCallback(() => (
        <View style={{ marginTop: Sizes.fixPadding }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: Sizes.fixPadding * 0.5 }}>
                <Text style={{ ...Fonts._11MontserratMedium, color: Colors.grayA, flex: 0.5 }}>TIME FRAME</Text>
                <Text style={{ ...Fonts._11MontserratMedium, color: Colors.grayA, flex: 0.5 }}>AIRLINE FEE + BHARATDARSHAN FEE</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: Sizes.fixPadding * 0.3 }}>
                <Text style={{ ...Fonts._11MontserratMedium, flex: 0.5 }}>More than 2 hours </Text>
                <Text style={{ ...Fonts._11MontserratMedium, flex: 0.5 }}>{showNumber(3500)} + {showNumber(250)} + FARE DIFFERENCE</Text>
            </View>
        </View>
    ), [flightData]);

    return (
        <View style={{ backgroundColor: Colors.grayG, marginTop: Sizes.fixPadding, borderRadius: Sizes.fixPadding * 0.5, paddingHorizontal: Sizes.fixHorizontalPadding, paddingVertical: Sizes.fixPadding }}>
            {tabsInfo()}
            {selectedTab === 1 ? baggageInfo() : selectedTab === 2 ? cancellationFeeInfo() : rescheduleFeeInfo()}
        </View>
    );
};

const mapStateToProps = state => ({
    flightData: state.flightReducer.flightData,
    passengers: state.flightReducer.passengers,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(BaggageCancellation);
