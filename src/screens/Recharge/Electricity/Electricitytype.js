import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors, Sizes, Fonts } from '../../../assests/style';
import MyStatusBar from '../../../components/StatusBar';
import Header from '../../../components/Header';
import { navigate } from '../../../navigations/NavigationServices';
import Loader from '../../../components/Loader';

const Electricitytype = ({ route }) => {
    const elctricitystatedata = route.params;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
            <Loader/>
            <Header title={'Select District / Type'} tintColor={Colors.white} />
            <View style={{ flex: 1 }}>
                {Electricitytypedata()}
            </View>
        </SafeAreaView>
    )
    function Electricitytypedata() {
        const electricitytypedata = [
            {
                id: 1,
                name: 'Bill Payment',
            },
            {
                id: 2,
                name: 'Prepaid meter Recharge',
            }
        ];
        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity style={{ borderBottomWidth: index === electricitytypedata.length - 1 ? 0 : 1, paddingVertical: Sizes.fixPadding }} activeOpacity={0.6} onPress={() => navigate('ElectricityPayment', { item, elctricitystatedata })}>
                    <Text style={{ paddingHorizontal: Sizes.fixHorizontalPadding, ...Fonts._16MontserratMedium, color: '#282525' }}>{item.name}</Text>
                </TouchableOpacity>
            )
        }
        return (
            <View style={{ padding: Sizes.fixPadding }}>
                <FlatList data={electricitytypedata} renderItem={renderItem} keyExtractor={(item) => item?.id.toString()} />

            </View>
        )
    }
}

export default Electricitytype

const styles = StyleSheet.create({})