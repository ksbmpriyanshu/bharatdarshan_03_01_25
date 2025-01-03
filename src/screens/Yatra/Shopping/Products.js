import { Image, SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
import { Colors, SCREEN_WIDTH, Sizes, Fonts } from '../../../assests/style';
import MyStatusBar from '../../../components/StatusBar';
import Header from '../../../components/Header';
import {
    responsiveScreenHeight,
    responsiveScreenWidth,
    responsiveScreenFontSize
} from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as ShoppingActions from "../../../redux/actions/ShoppingActions"

const Products = ({ shoppingproductdata, customerData, dispatch }) => {
    console.log("shoppingproductdata>>", shoppingproductdata)
    const navigation = useNavigation();
    const img_url = 'https://bharatdarshan.app/uploads/';

    const addToCart = (item) => {
        const requestBody = {
            productId: item,
            customerId: customerData?._id
        }
        console.log("requestBody", requestBody)
        dispatch(ShoppingActions.getAddcart(requestBody));
        navigation.navigate('shoppingcart')
    }

    const renderProduct = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                //console.log("dfsfsdfsdf",item?.price)
                navigation.navigate('productDetails', { productDetails: item });
            }}
        >
            <View style={styles.productContainer}>
                <Image source={{ uri: img_url + item.image }} style={styles.productImage} />
                <ImageBackground
                    source={require('../../../assests/icons/off.png')}
                    style={styles.imageBg}
                >
                    <Text style={{ ...Fonts._13MontserratRegular, color: '#fff', fontSize: 10, textAlign: "center" }}>
                        {Math.round(((item?.mrp - item?.price) / item?.mrp) * 100)}%{'\n'} OFF
                    </Text>
                </ImageBackground>
                <View style={styles.productDetails}>
                    <Text style={styles.productText}>{item.productName}</Text>
                    <View style={styles.separator} />
                    <View style={[styles.priceContainer, { justifyContent: "space-between" }]}>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>₹{item.price}</Text>
                            <Text style={styles.mrp}>₹{item.mrp}</Text>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.cartBtn}
                                onPress={() => {
                                    // console.log(item?._id,"item")
                                    addToCart(item?._id)
                                }}
                            >
                                <Text style={[styles.priceCart, { color: "#fff" }]}>Add</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle="light-content" />
            <Header title="New Products" tintColor={Colors.white} />
            {shoppingproductdata?.length == 0 ? (
                <View style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                    <Text style={{ ...Fonts._16MontserratRegular,}}>No Product Found !</Text>
                </View>
            ) : (
                <FlatList
                    data={shoppingproductdata}
                    renderItem={renderProduct}
                    numColumns={2}
                    contentContainerStyle={styles.listContent}
                    columnWrapperStyle={styles.row}
                />
            )}

        </SafeAreaView>
    );
};

const mapStateToProps = (state) => ({
    shoppingproductdata: state.shoppingReducer.shoppingproductdata,
    customerData: state.registrationReducer.customerdata,
});
const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Products);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    listContent: {
        padding: 10,
    },
    row: {
        justifyContent: 'space-between',
    },
    productContainer: {
        width: responsiveScreenWidth(45),
        borderRadius: 8,
        backgroundColor: Colors.white,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginRight: 10,

    },
    productImage: {
        width: '100%',
        height: responsiveScreenHeight(15),
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        resizeMode: 'cover',
    },
    productDetails: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    productText: {
        fontSize: responsiveScreenFontSize(1.6),
        textAlign: 'center',
        color: '#000',
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    separator: {
        borderTopWidth: 1,
        borderTopColor: 'gray',
        borderStyle: 'dashed',
        marginVertical: 10,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
    },
    price: {
        fontSize: responsiveScreenFontSize(2),
        color: '#000',
        fontWeight: '700',
    },
    mrp: {
        fontSize: responsiveScreenFontSize(1.5),
        color: '#5F5858',
        textDecorationLine: 'line-through',
    },
    priceCart: {
        fontSize: responsiveScreenFontSize(1.5),
        color: '#000',
        fontWeight: '700',
    },
    cartBtn: {
        backgroundColor: '#E58634',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    imageBg: {
        width: responsiveScreenWidth(11),
        height: responsiveScreenHeight(6),
        resizeMode: "contain",
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
});
