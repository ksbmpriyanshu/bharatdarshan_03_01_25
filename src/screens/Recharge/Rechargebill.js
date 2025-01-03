import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors,Fonts, Sizes } from '../../assests/style'
import MyStatusBar from '../../components/StatusBar'
import Loader from '../../components/Loader'
import Header from '../../components/Header'
import { navigate } from '../../navigations/NavigationServices'

const Rechargebill = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
            <Loader />
            <Header title={'Mobile Recharge'} tintColor={Colors.white} />
            <View style={{ flex: 1 }}>
                {prepost()}
            </View>
        </SafeAreaView>
    )
    function prepost() {
        const data = [
            {
                name:'Prepaid ',
                value:'Recharge'
            },
            {
                name:'Postpaid ',
                value:'Postpaid'
            },
        ]
        const renderItem = ({item}) => {
            
            return(
                <TouchableOpacity style={{borderBottomWidth:1,padding:Sizes.fixPadding,borderColor:Colors.grayB}} onPress={() => navigate(item?.value,{item})}>
                    <Text style={{...Fonts._18MontserratMedium,color:Colors.black}}>{item?.name}</Text>
                   
                </TouchableOpacity>
            )
        }
        return(
            <View style={{flex:1,borderBottomWidth:1}}>
                <FlatList data={data} renderItem={renderItem}/>

            </View>
        )
    }
}

export default Rechargebill

const styles = StyleSheet.create({})