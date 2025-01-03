import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Fonts, SCREEN_WIDTH, Sizes } from '../../../assests/style'
import MyStatusBar from '../../../components/StatusBar'
import Header from '../../../components/Header'
import { Image } from 'react-native'

const Operator = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
            <Header title={'Select Your Prepaid Operator'}  tintColor={Colors.white} />
            <View style={{ flex: 1 }}>
                {simitems()}
                {textname()}
            </View>
        </SafeAreaView>
    )
    function textname() {
        return (
            <TouchableOpacity style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }} activeOpacity={0.7}>
                <Text style={{ ...Fonts._14MontserratRegular, color: Colors.primaryTheme, textDecorationLine: 'underline' }}>I am Postpaid User</Text>
            </TouchableOpacity>
        )
    }
    function simitems() {
        const simdata = [
            {
                image:require('../../../assests/icons/airtel.png'),
                name: 'Airtel Prepaid'
            },
            {
                image:require('../../../assests/icons/airtel.png'),
                name: 'Bsnl Prepaid' 
            },
        ]
        const renderItem = ({item}) => {
            return (
                <TouchableOpacity style={{borderBottomWidth:1,paddingVertical:Sizes.fixPadding ,marginHorizontal:Sizes.fixHorizontalPadding* 2,borderColor:'#9F9F9F',flexDirection:'row',alignItems:'center'}}
                activeOpacity={0.5}
                >
                    <Image source={item?.image} style={{height:SCREEN_WIDTH * 0.15,width:SCREEN_WIDTH * 0.15,resizeMode:'contain'}}/>
                    <Text style={{...Fonts._16MontserratMedium,marginLeft:Sizes.fixHorizontalPadding * 2}}>{item?.name}</Text>
                </TouchableOpacity>
            )
        }
        return (
            <View style={{ flex: 0.9,}}>
                <FlatList data={simdata} renderItem={renderItem} />
            </View>
        )
    }
}

export default Operator

const styles = StyleSheet.create({})