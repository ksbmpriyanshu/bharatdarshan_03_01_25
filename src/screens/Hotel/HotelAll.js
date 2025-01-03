import {
    FlatList, SafeAreaView, StyleSheet,
    Text, Button, TouchableOpacity,
    View, TextInput, Dimensions, Platform
} from 'react-native'
import React, { useCallback, useEffect, useState, useRef } from 'react'
import { Colors, Fonts, SCREEN_WIDTH, Sizes, getFontSize, } from '../../assests/style'
import MyStatusBar from '../../components/StatusBar'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../../components/Loader'
import { useNavigation } from '@react-navigation/native'
import Header from '../../components/Header'
import { Rating } from 'react-native-elements';
import { BottomSheet } from '@rneui/base'
import { ProgressBar } from 'react-native-paper';
import * as HotelActions from '../../redux/actions/HotelActions';
import { AutocompleteDropdown, AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { useHeaderHeight } from '@react-navigation/elements';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient'
import {
    responsiveScreenHeight,
    responsiveScreenWidth,
    responsiveScreenFontSize
} from "react-native-responsive-dimensions";



const HomeHotelAll = ({ navigation, dispatch, homeAll, hotelSearch, homeLoading, route,homeInput,homeHotel }) => {
    const [values, setValues] = useState([50, 150]);
    const [search, setSearch] = useState(null);
    const [loading, setLoading] = useState(false)
    const searchRef = useRef(null)

    const [suggestionsList, setSuggestionsList] = useState(null)
    const dropdownController = useRef(null)
  console.log("route?.params?.city>>>::>:",route?.params?.area)
    // console.log('home all ::::',homeHotel);

    const headerHeight = useHeaderHeight();

    const getSuggestions = useCallback(async q => {
        const filterToken = q.toLowerCase()
        console.log('getSuggestions', q)
        if (typeof q !== 'string' || q.length < 3) {
            setSuggestionsList(null)
            return
        }
        // setLoading(true)
        // search API
        // const payload = {
        //     search: q
        // };
        // dispatch(HotelActions.onHotelSearch(payload));

    }, [])

    const onClearPress = useCallback(() => {
        setSuggestionsList(null)
    }, [])

    const onOpenSuggestionsList = useCallback(isOpened => { }, [])

    console.log('suggestionsList :::', suggestionsList);

    const handleValuesChange = (newValues) => {
        setValues(newValues);
    };

    useEffect(() => {
        const payload = {
            homeInput
        };
        console.log(payload,"slkdfhsdl>>")
        dispatch(HotelActions.getHotelAll(payload));
    }, [route?.params]);

    useEffect(() => {
        setLoading(false);
        setSuggestionsList(hotelSearch?.data)
    }, [hotelSearch])


    console.log('Hotel  Data ::: ', hotelSearch?.data);

    const minPrice = values[0];
    const maxPrice = values[1];
    const progress = (maxPrice - minPrice) / 200;

    const handleSearch = (text) => {
        console.log('searc', text);
        setSearch(text);
    }


    return (
        <AutocompleteDropdownContextProvider headerOffset={headerHeight}>
            <SafeAreaView style={{ flex: 0, backgroundColor: Colors.primaryTheme }}>
                <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
                <Loader />
                <Header title={'All Hotel'} tintColor={Colors.white} />
                {/* {searchInfo()} */}
                
                {PopularInfo()}
            </SafeAreaView>
        </AutocompleteDropdownContextProvider>
    )

    function searchInfo() {

        return (

            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', marginTop: Sizes.fixHorizontalPadding,backgroundColor:'white', padding:10 }}>
                <View style={[
                    { flex: 1, flexDirection: 'row', alignItems: 'center',paddingHorizontal:10 },
                    Platform.select({ ios: { zIndex: 1 }, android: { zIndex: 1 } }),
                ]}>

                    <AutocompleteDropdown
                        ref={searchRef}
                        controller={controller => {
                            dropdownController.current = controller
                        }}
                        initialValue={'1'}
                        // direction={Platform.select({ ios: 'down' })}
                        // dataSet={suggestionsList}
                        // onChangeText={getSuggestions}
                        onSelectItem={item => {

                            const payload = {
                                city: item?.title
                            };
                            // dispatch(HotelActions.getHotelAll(payload));
                        }}
                        debounce={600}
                        suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
                        onClear={onClearPress}
                        //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
                        onOpenSuggestionsList={onOpenSuggestionsList}
                        loading={loading}
                        useFilter={false} // set false to prevent rerender twice
                        textInputProps={{
                            placeholder: 'Search Location ...',
                            autoCorrect: false,
                            autoCapitalize: 'none',
                            style: {
                                borderRadius: 25,
                                backgroundColor: '#eee',
                                color: '#000',
                                paddingLeft: 18,
                            },
                        }}
                        rightButtonsContainerStyle={{
                            right: 8,
                            height: 30,

                            alignSelf: 'center',
                        }}
                        inputContainerStyle={{
                            backgroundColor: '#eee',
                            borderRadius: 25,
                        }}
                        suggestionsListContainerStyle={{
                            backgroundColor: '#eee',

                        }}
                        containerStyle={{ flexGrow: 1, flexShrink: 1 }}
                        renderItem={(item, text) => <Text style={{ ...Fonts._14MontserratMedium,padding:10 }}>{item.title}</Text>}
                        //   ChevronIconComponent={<Feather name="chevron-down" size={20} color="#fff" />}
                        //   ClearIconComponent={<Feather name="x-circle" size={18} color="#fff" />}
                        inputHeight={50}
                        showChevron={false}
                        closeOnBlur={false}
                    //  showClear={false}
                    />
                </View>
                
            </View>
        )
    }

    function PopularInfo() {
        const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

        const renderItemHotelPopular = ({ item }) => (
             <TouchableOpacity
                 onPress={() => navigation.navigate('hotelDetail', { data: item })}
                 >
           <View style={styles.mainView}>
            {item?.Images?.[0] ? (
                <Image source={{ uri: item?.Images?.[0] }} style={styles.image1} />
            ) : (
                <Image source={require('../../assests/images/hotel.png')} style={styles.image1} />
            )}

            <View style={{ paddingHorizontal: 3, }}>
                <View style={styles.nameView}>
                    <View>
                        <Text style={styles.hotelname}>
                            {item.HotelName}
                        </Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: 'center', gap: 5, }}>
                        <Text style={[styles.hotelname, { fontSize: 12 }]}>{item?.star}</Text>
                        <Image source={require('../../assests/images/me/star.png')} style={{ width: 12, height: 12 }} />
                    </View>
                </View>
                <Text style={styles.addressText}>
                    {item.Address}
                </Text>
                <Text style={styles.addressText}>{item?.CityName}</Text>
                <Text style={styles.priceText}>₹ {Math.floor(item?.price).toLocaleString('en-IN')}</Text>

            </View>

        </View>
        </TouchableOpacity>
            // <View style={styles.item1}>
            //     <TouchableOpacity
            //         onPress={() => navigation.navigate('hotelDetail', { data: item })}
            //         style={styles.item2}>
            //         <Image source={{ uri: item?.Images?.[0] || No_image }} style={styles.image1} />
            //         <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5, alignItems: 'center' }}>
            //             <Text style={styles.hotelname}>
            //                 {item.HotelName}
            //             </Text>
            //             <Text style={{ color: 'black', marginHorizontal: 4, fontSize: 11 }}>{item?.star}</Text>
            //             <Image source={require('../../assests/images/me/star.png')}
            //                 style={{ width: 12, height: 12 }} />
            //         </View>
            //         <Text style={{ color: 'black', fontSize: 12, alignItems: 'flex-start', marginVertical: 8 }}>{item?.CityName}</Text>
            //         <View style={{ flexDirection: 'row' }}>
            //                 <Text style={{ color: 'black', fontSize: 14, fontWeight: '700' }}>₹ {item?.price}</Text>
                            
            //             </View>
            //     </TouchableOpacity>
            // </View>
        );

        const renderShimmerPlaceholder = () => (
            <View style={{ flexDirection: 'row' }}>
                <ShimmerPlaceholder
                    visible={false} // Set to true when loading
                    style={styles.shimmerPlaceholder}
                >
                    <View style={styles.shimmerTextContainer}>
                        <Text style={styles.shimmerText}>Wow, awesome here.</Text>
                    </View>
                </ShimmerPlaceholder>

            </View>

        );

        return (
            <View style={{backgroundColor:'white',padding:10}}>

                <FlatList
                    data={route?.params?.area==="popular"? homeHotel?.popularHotel: homeHotel?.nearby}
                    renderItem={({ item, index }) => (
                        <View style={styles.itemContainer}>
                            {!homeLoading && renderItemHotelPopular({ item, index })}
                        </View>
                    )}

                    keyExtractor={(item, index) => index.toString()}
                    
                    ListFooterComponent={() => (
                        <View style={styles.shimmerPlaceholderContainer1}>
                            {homeLoading && renderShimmerPlaceholder()}
                            {homeLoading && renderShimmerPlaceholder()}
                            {homeLoading && renderShimmerPlaceholder()}
                            {homeLoading && renderShimmerPlaceholder()}
                            {homeLoading && renderShimmerPlaceholder()}

                        </View>
                    )}
                />
            </View>
        );
    }
}


const mapStateToProps = state => ({
    bannerdata: state.bannerReducer.bannerdata,
    customerdata: state.registrationReducer.customerdata,
    homeHotel: state.hotelReducer.hotelHome,
    hotelSearch: state.hotelReducer.hotelSearch,
    homeLoading: state.hotelReducer.homeLoading,
    homeAll: state.hotelReducer.homeAll,
    homeInput: state.hotelReducer.homeInput
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(HomeHotelAll);

const styles = StyleSheet.create({
    searchbar: {
        // marginTop: SCREEN_WIDTH * 0.05,

    },
    input: {
        flex: 1,
    },
    icon: {
        marginHorizontal: 15
    },
    Imagecontain: {
        padding: 7,
        backgroundColor: '#EA7515',
        paddingHorizontal: 11,
        borderRadius: 25,
        marginTop: 3
    },
    container: {
        padding: 15,
    },
    itemContainer: {
        alignItems: 'center',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    name: {
        marginTop: 5,
        textAlign: 'center',
        color: 'black'
    },

    item1: {
        marginHorizontal: 12,
        borderWidth: 0.3,
        height: SCREEN_WIDTH * 0.60,
        marginBottom: 18,
        width: SCREEN_WIDTH * 0.9,
        borderRadius: 5,
        elevation: 1,
        shadowColor: 'white'
    },
    item2: {
        height: SCREEN_WIDTH * 0.58,
        marginBottom: 18,
        width: SCREEN_WIDTH * 0.9,
        alignItems: 'center',
        borderRadius: 10
    },
    // image1: {
    //     width: SCREEN_WIDTH * 0.8,
    //     height: SCREEN_WIDTH * 0.38,
    //     marginTop: 5,
    //     borderRadius:2
    //     // Rectangle shape

    // },
    title1: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    papper: {
        backgroundColor: 'white',
        borderTopLeftRadius: Sizes.fixPadding * 3,
        borderTopRightRadius: Sizes.fixPadding * 3
    },
    title: {
        fontSize: 16,
        color: 'black',

    },
    progressBar: {
        width: '100%',
        height: 8,
        marginTop: 16,
    },
    slider: {
        width: SCREEN_WIDTH * 1,
        height: 8,
        marginTop: SCREEN_WIDTH * 0.06
    },
    FilterText: {
        ...Fonts._14MontserratLight,
        backgroundColor: '#f5f6fa',
        padding: 8,
        width: '30%',
        borderRadius: 15
    },
    hotelname: {
        color: 'black',
        fontSize: 14,
        fontWeight: '700',
        
    },
    shimmerPlaceholderContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: -120
    },
    shimmerPlaceholderContainer1: {
        alignItems: 'flex-start',
      
    },
    shimmerPlaceholder: {
        width: SCREEN_WIDTH * 0.9,
        height: SCREEN_WIDTH * 0.5,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 10,
        margin: 10
    },
    shimmerTextContainer: {
        padding: 10,
    },
    shimmerText: {
        color: '#ccc',
    },
    header: {
        flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, alignItems: 'center', marginHorizontal: 10 

    },
    headerText: {
        color: 'black',
        fontSize: 20,
    },
    seeAllText: {
        color: 'black',
    },
    mainView: {
        paddingHorizontal: 10,
        marginBottom:10,
    },
    image1: {
        height: responsiveScreenHeight(18),
        width: responsiveScreenWidth(90),
        marginTop: 5,
        borderRadius: 10,
        objectFit: "cover"

    },
    nameView: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        marginTop: 5,
    },
    star: {
        height: responsiveScreenHeight(1),
        width: responsiveScreenWidth(1),
    },
    addressText: {
        color: 'black',
        ...Fonts._18MontserratRegular,
        fontSize: 9,
    },
    priceText: {
        color: 'black',
        ...Fonts._18MontserratRegular,
        fontSize: 14,
        marginTop: 8,
    }
})