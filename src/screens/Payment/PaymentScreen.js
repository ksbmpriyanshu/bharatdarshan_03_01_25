import { FlatList, Image, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MyStatusBar from '../../components/StatusBar'
import { Colors, Sizes, Fonts, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../assests/style'
import Header from '../../components/Header'
import { cardData, paymentdata } from '../../config/data'

const PaymentScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
            <Header title={'Payment'}  tintColor={Colors.white} />
            <View style={{ flex: 1, marginVertical: Sizes.fixPadding }}>
                {Amounttext()}
                {paymethod()}
                {AddNewUpiid()}
                {othercard()}
            </View>
        </SafeAreaView>
    )
    function othercard() {
        const renderItem = ({item}) => {
            return(
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginTop:Sizes.fixPadding}}>
                    <Image source={item?.icon} style={{height:SCREEN_WIDTH*0.08,width:SCREEN_WIDTH * 0.08,resizeMode:'contain'}}/>
                    <Text style={{...Fonts._14MontserratRegular,marginLeft:Sizes.fixPadding}}>{item.name}</Text>
                </TouchableOpacity>
            )
        }
        return(
            <View style={{paddingHorizontal: Sizes.fixHorizontalPadding * 2,flex:0.58}}>
                <Text style={{flex:0.2,textAlignVertical:'center',...Fonts._14MontserratRegular,fontWeight:'600' }}>Other Options</Text>
                <FlatList data={cardData} renderItem={renderItem}/>
            </View>
        )
    }
    function AddNewUpiid() {
        return(
            <TouchableOpacity style={{flex:0.05,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                <Image source={require('../../assests/icons/plus.png')}/>
                <Text style={{marginLeft:Sizes.fixHorizontalPadding,...Fonts._14MontserratMedium,color:'#0B6ED2'}}>Add New Upi Id</Text>
            </TouchableOpacity>
        )
    }
    function paymethod() {
        const renderItem = ({item}) => {
            return(
                <TouchableOpacity style={{alignItems:'center',justifyContent:'center'}}>
                    <Image source={item?.icon} style={{resizeMode:'contain',height:SCREEN_HEIGHT*0.1,width:SCREEN_WIDTH*0.15}}/>
                    <Text style={{width:'70%',textAlign:'center',...Fonts._13MontserratMedium,color:'#090F4773'}}>{item?.name}</Text>
                </TouchableOpacity>
            )
        }
        return (
            <View style={{ flex: 0.28, borderBottomWidth: 2,borderColor:Colors.grayE, margin: Sizes.fixHorizontalPadding * 2 }}>
                <Text style={{...Fonts._14MontserratMedium,fontWeight:'700'}}>Pay by Any UPI app</Text>
                <FlatList data={paymentdata} renderItem={renderItem} horizontal showsHorizontalScrollIndicator={false}/>
            </View>
        )
    }
    function Amounttext() {
        return (
            <View style={{ flex: 0.08, backgroundColor: '#ADDCFF15', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Sizes.fixHorizontalPadding * 2, alignItems: 'center' }}>
                <Text style={styles.txt}>Amount Payable</Text>
                <Text style={styles.txt}>₹ 15000.40</Text>
            </View>
        )
    }
}

export default PaymentScreen

const styles = StyleSheet.create({
    txt: {
        ...Fonts._16MontserratMedium,
        color: '#090F47EB'
    }
})