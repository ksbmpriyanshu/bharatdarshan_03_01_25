import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../../../components/Header'
import { Colors, Sizes, Fonts, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../assests/style'
import MyStatusBar from '../../../components/StatusBar'
import { navigate } from '../../../navigations/NavigationServices'
import * as RechargeActions from '../../../redux/actions/RechargeActions'
import { connect } from 'react-redux'

const Metro = ({ dispatch, metroOperators }) => {
    console.log(metroOperators, 'metroOperators')
    useEffect(() => {
        dispatch(RechargeActions.getMetroOperators())
    }, [])

    return (
        <View style={styles.container}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
            <Header title={'Metro'} tintColor={Colors.white} />
            <View style={{}}>
                <FlatList
                    ListHeaderComponent={
                        <>
                            <View style={{ flex: 1, margin: Sizes.fixHorizontalPadding, zIndex: -1 }}>
                                {title()}
                                {metroOperators && metrolist()}
                                {/* {RecentCardRecharge()}
                                {Recentrechagelist()} */}
                            </View>
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                />
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
                id: 4,
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
    function RecentCardRecharge() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ ...Fonts._18MontserratMedium }}>Recent Card Recharge</Text>
                <Text style={{ ...Fonts._11MontserratMedium, color: Colors.primaryTheme }}
                    onPress={() => navigate('recentRechargemetro')}
                >Viewall</Text>
            </View>
        )
    }
    function title() {
        return (
            <View style={{ paddingBottom: Sizes.fixPadding }}>
                <Text style={{ ...Fonts._20MontserratMedium,  }}>Select Your Metro</Text>
            </View>
        )
    }
    function metrolist() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, paddingVertical: Sizes.fixPadding, borderColor: '#00000053' }}
                    onPress={() => navigate('metroamount', item)}
                >
                    <Image source={{ uri: item?.operatorImage }} style={{ width: SCREEN_WIDTH * 0.07, height: SCREEN_WIDTH * 0.07 }} resizeMode='contain' />
                    <Text style={{ ...Fonts._16MontserratMedium, marginLeft: Sizes.fixHorizontalPadding * 2 }}>{item.OperatorName}</Text>
                </TouchableOpacity>
            )
        }
        return (
            <FlatList data={metroOperators} renderItem={renderItem} />
        )
    }
}

const mapStateToProps = state => ({
    metroOperators: state.rechargeReducer.metroOperators
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Metro)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    }
})