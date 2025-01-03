import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes } from '../../../../assests/style'
import Entypo from 'react-native-vector-icons/Entypo'


const MaxPolicies = () => {
    return (
        <View style={{ marginBottom: Sizes.fixPadding, }}>
            <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: 18, marginBottom: Sizes.fixPadding * 0.4 }}>Clear Choice Max policies</Text>
            <View style={{ borderWidth: 1, borderRadius: Sizes.fixPadding, borderColor: Colors.primaryTheme, }}>
                {destinationsInfo()}
                {baggagePolicyInfo()}
                {cancellationPolicyInfo()}
                {dateChangePolicyInfo()}
            </View>
        </View>
    )

    function dateChangePolicyInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 0.5, paddingBottom: Sizes.fixPadding, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: 16, marginBottom: Sizes.fixPadding * 0.5 }}>Date Change Policy</Text>
                    <Entypo name='chevron-small-right' color={Colors.black} size={24} />
                </View>

                <Text style={{ ...Fonts._13MontserratMedium }}><Text style={{ color: Colors.orange }}>Free date change</Text> up to 24 hrs before departure</Text>
            </View>
        )
    }

    function cancellationPolicyInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 0.5, paddingBottom: Sizes.fixPadding, borderBottomWidth: 0.5, borderColor: Colors.grayC }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: 16, marginBottom: Sizes.fixPadding * 0.5 }}>Cancellation Policy</Text>
                    <Entypo name='chevron-small-right' color={Colors.black} size={24} />
                </View>

                <Text style={{ ...Fonts._13MontserratMedium }}><Text style={{ color: Colors.orange }}>Full refund on cancellation</Text> up to 24 hrs before departure</Text>
            </View>
        )
    }

    function baggagePolicyInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 0.5, paddingBottom: Sizes.fixPadding, borderBottomWidth: 0.5, borderColor: Colors.grayC }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: 16, marginBottom: Sizes.fixPadding * 0.5 }}>Baggage Policy</Text>
                    <Entypo name='chevron-small-right' color={Colors.black} size={24} />
                </View>
                <Text style={{ ...Fonts._13MontserratMedium }}><Text style={{ color: Colors.grayA }}>Check-in :</Text> 15kg (1 Piece ) / Adult</Text>
                <Text style={{ ...Fonts._13MontserratMedium, marginTop: Sizes.fixPadding * 0.2 }}><Text style={{ color: Colors.grayA }}>Cabin :</Text> 7kg/ Adult</Text>
            </View>
        )
    }

    function destinationsInfo() {
        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity style={{ marginLeft: Sizes.fixPadding, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Image
                            source={require('../../../../assests/images/airpot.png')}
                            style={{ width: 35, height: 35 }}
                        />
                        <Text style={{ ...Fonts._16MontserratMedium, marginLeft: Sizes.fixPadding * 0.5 }}>DEL {">>>"} BOM</Text>
                    </View>

                    <View style={{ width: '90%', height: 2, borderRadius: 100, backgroundColor: index == 0 ? Colors.black : 'transparent' }} />
                </TouchableOpacity>
            )
        }
        return (
            <View style={{ marginVertical: Sizes.fixPadding }}>
                <FlatList
                    data={Array.from({ length: 3 })}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>

        )
    }
}

export default MaxPolicies

const styles = StyleSheet.create({
    addonsItemContainer: {
        marginBottom: Sizes.fixPadding
    }
})