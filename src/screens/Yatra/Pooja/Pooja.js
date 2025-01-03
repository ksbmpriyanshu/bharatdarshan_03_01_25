import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../../../components/Header'
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../assests/style'
import MyStatusBar from '../../../components/StatusBar'
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import * as PoojaActions from "../../../redux/actions/PoojaActions"
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { imagneweurl } from '../../../utility/base'

const Pooja = ({ dispatch, poojadata }) => {
const navigation =useNavigation()
    useEffect(() => {
        dispatch(PoojaActions.getPooja());
    }, [dispatch]);
    console.log("poojadata>>>>>>", poojadata?.pooja)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
            <Header title={'Puja'} tintColor={Colors.white} />
            <View style={styles.banner}>

                <FlatList
                    data={poojadata?.pooja}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.poojaBox}>
                            <Image
                                source={{
                                    uri: `${imagneweurl}${item?.image}`
                                }}
                                style={styles.boxImage}
                            />
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 4, marginTop: 5 }}>
                                <View>
                                    <Text style={styles.pujaText}>{item?.pujaName}</Text>
                                    <Text style={styles.pujaPrice}>₹{item?.price}</Text>
                                </View>
                                <TouchableOpacity style={styles.btn} 
                                onPress={()=>{
                                    console.log(item)
                                    navigation.navigate('poojadetails' ,item)
                                }}
                                >
                                    <Text style={{ textAlign: "center", color: "#fff", fontSize: responsiveFontSize(1.5), fontWeight: "500" }}>View More</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />


         

            </View>
           
        </SafeAreaView>

    )
}

const mapStateToProps = state => ({
    poojadata: state.poojaReducer.poojadata,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Pooja)

const styles = StyleSheet.create({

    boxImage: {
        width: "100%",
        height: responsiveScreenHeight(20),
        resizeMode: "cover",
        borderRadius: 10,
    },
    poojaBox: {
        borderBottomWidth: 0.4,
        paddingBottom: 10,
        borderColor: "#bababa",
        marginBottom: 15,
    },
    banner: {
        padding: 10,
        // backgroundColor:"#000",
        marginBottom:40,
    },
    pujaText: {
        color: "#000",
        fontSize: responsiveFontSize(2),
        width: responsiveScreenWidth(50)

    },
    pujaPrice: {
        color: "#e05320",
        fontSize: responsiveFontSize(2),
        fontWeight: "800"

    },
    btn: {
        backgroundColor: "#e05320",
        paddingVertical: 10,
        borderRadius: 4,
        width: responsiveScreenWidth(40)
    }
})