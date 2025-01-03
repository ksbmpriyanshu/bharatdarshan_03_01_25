import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MyStatusBar from '../../../components/StatusBar'
import Header from '../../../components/Header'
import { Colors, Sizes, Fonts, SCREEN_WIDTH } from '../../../assests/style'

const RecentRechargeMetro = () => {
    return (
        <View style={styles.container}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
            <Header title={'Recent Rechage Metro'} tintColor={Colors.white} />
            <View style={{ paddingHorizontal: Sizes.fixHorizontalPadding, zIndex: -1 }}>
                {Recentrechagelist()}
            </View>
        </View>
    )
    function Recentrechagelist() {
        const rechargelist = [
            {
                id: 1,
                image: require('../../../assests/images/delhimetro.png'),
                refid: 72565648,
                price: '₹ 500'
            },
            {
                id: 2,
                image: require('../../../assests/images/delhimetro.png'),
                refid: 72565648,
                price: '₹ 500'
            },
            {
                id: 3,
                image: require('../../../assests/images/delhimetro.png'),
                refid: 72565648,
                price: '₹ 500'
            },
            {
                id: 4,
                image: require('../../../assests/images/delhimetro.png'),
                refid: 72565648,
                price: '₹ 500'
            }
        ]
        const renderItem = ({ item }) => {
            return (
                <View style={{ borderWidth: 1, borderColor: '#8C8686', borderRadius: 5, padding: Sizes.fixHorizontalPadding, marginBottom: Sizes.fixHorizontalPadding }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...Fonts._13MontserratMedium, color: '#00000080' }}>Paid ₹500</Text>
                        <Text style={{ ...Fonts._13MontserratMedium, color: '#00000080', marginHorizontal: Sizes.fixHorizontalPadding * 0.5 }}>On</Text>
                        <Text style={{ ...Fonts._13MontserratMedium, color: '#00000080' }}>02 Apr 2024</Text>
                    </View>

                    <TouchableOpacity style={{ width: SCREEN_WIDTH * 0.25, alignSelf: 'flex-end', borderRadius: 20, backgroundColor: '#FBBC0437', padding: Sizes.fixHorizontalPadding, justifyContent: 'center', alignItems: 'center' }}
                        activeOpacity={0.7}>
                        <Text style={{ ...Fonts._16MontserratMedium }}>₹ 500</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={item?.image} style={{ width: SCREEN_WIDTH * 0.12, height: SCREEN_WIDTH * 0.12 }} resizeMode='contain' />
                        <Text style={{ ...Fonts._16MontserratMedium, marginLeft: Sizes.fixPadding * 0.7 }}>{item?.refid} </Text>
                    </View>
                    <Text style={{ textAlign: 'right', textDecorationLine: 'underline' }}>Repeat</Text>
                </View>
            )
        }
        return (
            <View style={{ marginTop: Sizes.fixPadding * 1.5 }}>
                <FlatList data={rechargelist} renderItem={renderItem} />
            </View>
        )
    }
}

export default RecentRechargeMetro

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,


    }
})