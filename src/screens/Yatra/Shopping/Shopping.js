import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes, getFontSize, Fonts } from '../../../assests/style'
import MyStatusBar from '../../../components/StatusBar'
import Header from '../../../components/Header'
import Carousel from 'react-native-reanimated-carousel'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { navigate } from '../../../navigations/NavigationServices'
// import * as BannerActions from '../../redux/actions/BannerActions'
import * as ShoppingActions from "../../../redux/actions/ShoppingActions"
import { connect } from 'react-redux'
import {
    responsiveScreenHeight,
    responsiveScreenWidth,
    responsiveScreenFontSize
} from "react-native-responsive-dimensions";
import { useNavigation } from '@react-navigation/native'

const Shopping = ({ dispatch, shoppingdata }) => {
    const navigation = useNavigation();
    
    const [searchQuery, setSearchQuery] = useState('');  
    const [filteredData, setFilteredData] = useState(shoppingdata); 
    console.log(">>>>>>>>",filteredData)

    useEffect(() => {
        dispatch(ShoppingActions.getShopping());
    }, [dispatch]);

    useEffect(() => {
        filterData(searchQuery);
    }, [shoppingdata]);

    const getCategoryProduct = (id) => {
        const requestBody = {
            categoryId: id
        };
        dispatch(ShoppingActions.getShoppingProduct(requestBody));
        navigation.navigate('products');
    }

    const filterData = (query) => {
        if (!query) {
            setFilteredData(shoppingdata);  // If no query, show all products
        } else {
            const lowerCaseQuery = query.toLowerCase();
            const filtered = shoppingdata.filter(item =>
                item.categoryName.toLowerCase().includes(lowerCaseQuery)
            );
            setFilteredData(filtered);
        }
    }

    const img_url = "https://bharatdarshan.app/uploads/";

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
            <Header title={'Shopping'} tintColor={Colors.white} />

            <View style={{ paddingHorizontal: Sizes.fixHorizontalPadding }}>
                <FlatList
                    ListHeaderComponent={
                        <>
                            {/* {SearchBar()} */}
                            {Slider()}
                            
                        </>
                    }
                    contentContainerStyle={{
                        paddingVertical: Sizes.fixHorizontalPadding * 2
                    }}
                    showsVerticalScrollIndicator={false}
                />
                
              
             
                
              
            </View>

            
            <FlatList
                    data={filteredData}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <>
                        <TouchableOpacity
                            style={{
                                marginTop: 10,
                                marginHorizontal:responsiveScreenWidth(2.3),
                                 alignItems: 'center',
                                 
                             
                            }}
                            onPress={() => getCategoryProduct(item?._id)}
                        >
                            <Image
                                source={{ uri: img_url + item.image }}
                                style={{
                                    height: responsiveScreenHeight(10),
                                    width: responsiveScreenWidth(23),
                                    resizeMode: 'contain',
                                    borderRadius: 200,
                                    borderWidth: 2,
                                    borderColor: "orange"
                                }}
                            />
                            <Text
                                style={{
                                    ...Fonts._12MontserratRegular,
                                    color: Colors.black,
                                    textAlign: "center",
                                    marginTop: 5,
                                    width: responsiveScreenWidth(27),
                                }}
                            >
                                {item.categoryName}
                            </Text>
                        </TouchableOpacity>
                        </>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
        </SafeAreaView>
    );

    function Slider() {
        const bannerData = [
            { icon: { uri: ' https://vssct.com/wp-content/uploads/2024/10/ram-katha-1536x399.jpeg' } }, 
        ];
       
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 13,
                        overflow: 'hidden',
                    }}>
                    <Image
                        source={{ uri: 'https://vssct.com/wp-content/uploads/2024/10/ram-katha-1536x399.jpeg' }}
                        style={{
                            width: '100%',
                            height:100,
                            borderRadius: 10,
                        }}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            );
        };

        return (
            <View>
                <Carousel
                    width={SCREEN_WIDTH*0.95}
                    height={SCREEN_WIDTH / 2.5}
                    autoPlay
                    data={bannerData}
                    scrollAnimationDuration={1000}
                    autoPlayInterval={5000}
                    mode="parallax"
                    modeConfig={{
                        parallaxScrollingScale: 1,
                        parallaxScrollingOffset: 0,
                    }}
                    pagingEnabled={true}
                    snapEnabled={true}
                    renderItem={renderItem}
                />
            </View>
        );
    }

    function SearchBar() {
        return (
            <View style={{
                borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                borderRadius: Sizes.fixPadding * 2, borderColor: '#81818190',
            }}>
                <TextInput
                    style={{
                        width: '85%', color: Colors.black, fontSize: getFontSize(15),
                    }}
                    placeholder='Search Product...'
                    placeholderTextColor={'#81818190'}
                    value={searchQuery}
                    onChangeText={(text) => {
                        setSearchQuery(text);
                        filterData(text);  
                    }}
                />
                <Image
                    source={require('../../../assests/icons/search.png')}
                    style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.05, resizeMode: 'contain' }}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    shoppingdata: state.shoppingReducer.shoppingdata,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Shopping);

const styles = StyleSheet.create({});
