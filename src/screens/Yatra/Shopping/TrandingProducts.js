import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,FlatList } from 'react-native'
import React from 'react'
import { Colors, SCREEN_WIDTH, Sizes,Fonts } from '../../../assests/style'
import MyStatusBar from '../../../components/StatusBar'
import Header from '../../../components/Header'
import Ionicons from 'react-native-vector-icons/Ionicons';

const TrandingProducts = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
            <Header title={'New Products'}  tintColor={Colors.white} />
            <View style={{ flex: 1 }}>
                {trendingproductslisting()}
            </View>
        </SafeAreaView>
    )
    function trendingproductslisting() {
        const shoppingdata = [
            {
                image: require('../../../assests/images/trending.png'),
                rating: 3.4,
                title: 'Men Straight Jeans with 5-Pocket..'

            },
            {
                image: require('../../../assests/images/trending1.png'),
                rating: 3.4,
                title: 'Men Printed Slim Fit Shirt with Full.'
            },
            {
                image: require('../../../assests/images/trending1.png'),
                rating: 3.4,
                title: 'Men Printed Slim Fit Shirt with Full.'
            },
            {
                image: require('../../../assests/images/trending1.png'),
                rating: 3.4,
                title: 'Men Printed Slim Fit Shirt with Full.'
            },
            {
                image: require('../../../assests/images/trending1.png'),
                rating: 3.4,
                title: 'Men Printed Slim Fit Shirt with Full.'
            },
            {
                image: require('../../../assests/images/trending1.png'),
                rating: 3.4,
                title: 'Men Printed Slim Fit Shirt with Full.'
            },

            {
                image: require('../../../assests/images/trending1.png'),
                rating: 3.4,
                title: 'Men Printed Slim Fit Shirt with Full.'
            },
            {
                image: require('../../../assests/images/trending1.png'),
                rating: 3.4,
                title: 'Men Printed Slim Fit Shirt with Full.'
            },
            {
                image: require('../../../assests/images/trending1.png'),
                rating: 3.4,
                title: 'Men Printed Slim Fit Shirt with Full.'
            },
            {
                image: require('../../../assests/images/trending1.png'),
                rating: 3.4,
                title: 'Men Printed Slim Fit Shirt with Full.'
            },
            {
                image: require('../../../assests/images/trending1.png'),
                rating: 3.4,
                title: 'Men Printed Slim Fit Shirt with Full.'
            },

        ];
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity style={{ marginVertical: Sizes.fixPadding, width: SCREEN_WIDTH * 0.48 }} activeOpacity={0.7}>
                    <View style={{ marginHorizontal: Sizes.fixHorizontalPadding, position: 'relative', overflow: 'hidden' }}>
                        <Image source={item?.image} style={{ resizeMode: 'cover', height: SCREEN_WIDTH * 0.4, width: SCREEN_WIDTH * 0.45, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                        <View style={{ position: 'absolute', top: 0, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Sizes.fixHorizontalPadding, alignItems: 'center', width: '100%', marginTop: Sizes.fixPadding * 0.3 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', paddingHorizontal: Sizes.fixHorizontalPadding, paddingVertical: Sizes.fixPadding * 0.3, borderRadius: 10, }} >
                                <Text style={{ ...Fonts._12MontserratRegular, color: Colors.white }}>{item?.rating}</Text>
                                <Ionicons name='star' color={'#EEEAEA'} size={13} style={{ left: Sizes.fixPadding * 0.2 }} />
                            </View>
                            <TouchableOpacity style={{ backgroundColor: Colors.white, padding: 3, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Ionicons name='heart' color={'#EEEAEA'} size={13} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'center', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, elevation: 1 }}>
                        <Text style={{ ...Fonts._13MontserratRegular, marginHorizontal: Sizes.fixHorizontalPadding * 1.3, marginTop: Sizes.fixPadding * 0.2 }}>{item?.title?.slice(0, 22)}{'...'}</Text>
                        <View style={{ borderWidth: 1, borderStyle: 'dashed', marginHorizontal: Sizes.fixHorizontalPadding, marginVertical: Sizes.fixPadding * 0.7, borderColor: '#B1A9A9' }}>

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: Sizes.fixPadding }}>
                            <Text style={{ ...Fonts._18MontserratRegular, fontWeight: '800' }}>₹400</Text>
                            <Text style={{ paddingHorizontal: Sizes.fixHorizontalPadding * 0.4, ...Fonts._12MontserratRegular, color: '#5F5858', textDecorationLine: 'line-through' }}>₹1200</Text>
                            <Text style={{ ...Fonts._11MontserratRegular, color: '#BF9321', bottom: Sizes.fixPadding * 0.2 }}>(75% OFF)</Text>

                        </View>
                    </View>

                </TouchableOpacity>
            )
        }
        return (
            <View style={{marginHorizontal:Sizes.fixHorizontalPadding}}>
                <FlatList data={shoppingdata} renderItem={renderItem} numColumns={2}/>
            </View>
        )
    }
}

export default TrandingProducts

const styles = StyleSheet.create({})