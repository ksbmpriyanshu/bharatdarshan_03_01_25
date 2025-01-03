import {
    FlatList, SafeAreaView, StyleSheet,
    Text, Button, TouchableOpacity,
    View, TextInput, Dimensions, Platform,
    Alert
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


const HomeHotel = ({ navigation, dispatch, homeHotel, hotelSearch, homeLoading, route,homeInput }) => {
    console.log("homeHotel>>>>>:::",homeInput)
    // console.log(homeHotel?.popularHotel,"homeHotel?.popularHotel")
    const [isVisible, setIsVisible] = useState(false);
    const [values, setValues] = useState([50, 150]);
    const [search, setSearch] = useState(null);
    const [loading, setLoading] = useState(false)
    const searchRef = useRef(null)

    const [suggestionsList, setSuggestionsList] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)
    const dropdownController = useRef(null)

    const headerHeight = useHeaderHeight();

  


    const getSuggestions = useCallback(async q => {
        const filterToken = q.toLowerCase()
        if (typeof q !== 'string' || q.length < 3) {
            setSuggestionsList(null)
            return
        }
        setLoading(true)
        // search API
        const payload = {
            search: q
        };
        dispatch(HotelActions.onHotelSearch(payload));

    }, [])

    const onClearPress = useCallback(() => {
        setSuggestionsList(null)
    }, [])

    const onOpenSuggestionsList = useCallback(isOpened => { }, [])

    const handleValuesChange = (newValues) => {
        setValues(newValues);
    };

    useEffect(() => {
        setLoading(false);
        setSuggestionsList(hotelSearch?.data)
    }, [hotelSearch])




    const minPrice = values[0];
    const maxPrice = values[1];
    const progress = (maxPrice - minPrice) / 200;

    const data = [
        { id: '1', name: 'Delhi', image: require('../../assests/images/me/i1.png'), search: 'New Delhi,   DELHI' },
        { id: '2', name: 'Mumbai', image: require('../../assests/images/me/mumbai.png'), search: 'Mumbai,   Maharashtra' },
        { id: '3', name: 'Bangalore', image: require('../../assests/images/me/i3.png'), search: 'Bangalore,   Karnataka' },
        { id: '4', name: 'Chennai', image: require('../../assests/images/me/chennai.png'), search: 'Chennai,   Tamil Nadu' },
        { id: '5', name: 'Gurugram', image: require('../../assests/images/me/gurugram.png'), search: 'Gurgaon' },
        { id: '6', name: 'Noida', image: require('../../assests/images/me/noida.png'), search: 'Greater Noida' },
    ];

    const test = [
        { id: '1', name: 'Delhi' },
        { id: '2', name: 'Mumbai' },
        { id: '3', name: 'Chennei' },
        { id: '4', name: 'Pure' },
        { id: '5', name: 'Gurugram' },
        { id: '6', name: 'Noida' },

    ];

    const test1 = [
        { id: '1', name: 'Local id Accepted' },
        { id: '2', name: 'For Business' },
        { id: '3', name: 'For Family' },
        { id: '4', name: 'Welcom Couples' },


    ];

    const handleSearch = (text) => {
        setSearch(text);
    }

// console.log(homeHotel?.nearby)
    return (
        <AutocompleteDropdownContextProvider headerOffset={headerHeight}>
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
                <Loader />
                <Header title={'Hotel Booking'} tintColor={Colors.white} />

                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 2, paddingBottom: 1 }}
                    ListHeaderComponent={
                        <>
                            <View style={{ flex: 1 }}>

                                <View style={{ backgroundColor: Colors.white, marginVertical: 5 }}>
                                    {/* {searchInfo()} */}
                                    {/* {locationInfo()} */}
                                    {/* {homeHotel?.popularHotel.length > 0 && PopularInfo()} */}
                                    {homeHotel?.popularHotel?.length > 0 && PopularInfo()}
                                    {homeHotel?.nearby?.length > 0 ? NearbyInfo() : NearByEmpty()}
                                    {homeHotel?.popularHotel?.length == 0 && nofoundhotel()}
                                </View>
                            </View>
                            {FilterInfo()}
                        </>
                    }
                />


            </SafeAreaView>
        </AutocompleteDropdownContextProvider>
    )

    function nofoundhotel() {
        return (
            <View style={{ alignItems: 'center', paddingVertical: Sizes.fixPadding * 2.8 }}>
                <Text style={{ color: 'red' }}>No Hotel Available</Text>
            </View>
        )
    }

    function NearByEmpty() {
        return (
            <View style={{margin: Sizes.fixPadding * 4}}>
                <Text style={{color:'black',fontSize:14}}>No hotels found within a 50 km radius by Near Hotels.</Text>
            </View>
        )
    }

    function searchInfo() {


        return (

            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', marginTop: Sizes.fixHorizontalPadding }}>
                <View style={[
                    { flex: 1, flexDirection: 'row', alignItems: 'center' },
                    Platform.select({ ios: { zIndex: 1 }, android: { zIndex: 1 } }),
                ]}>

                    <AutocompleteDropdown
                        ref={searchRef}
                        controller={controller => {
                            dropdownController.current = controller
                        }}
                        initialValue={'1'}
                        // direction={Platform.select({ ios: 'down' })}
                        dataSet={suggestionsList}
                        onChangeText={getSuggestions}
                        onSelectItem={item => {
                            const payload = {

                                city: item?.title,
                                check_in_date: route.params?.data.check_in_date,
                                check_out_date: route.params?.data.check_out_date,
                                adults: route.params?.data.adults,
                                children: route.params?.data.children,
                                rooms: route.params?.data.rooms
                            }

                            // dispatch(HotelActions.getHotelSearchHome(payload));
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
                        renderItem={(item, text) => <Text style={{ ...Fonts._14MontserratMedium, padding: 10 }}>{item.title}</Text>}
                        //   ChevronIconComponent={<Feather name="chevron-down" size={20} color="#fff" />}
                        //   ClearIconComponent={<Feather name="x-circle" size={18} color="#fff" />}
                        inputHeight={50}
                        showChevron={false}
                        closeOnBlur={false}
                    //  showClear={false}
                    />
                </View>
                {/* <TouchableOpacity onPress={() => setIsVisible(true)}
                    style={styles.Imagecontain}>
                    <Image source={require('../../assests/images/me/Filter.png')}
                        style={{ width: 20, height: 20 }} />
                </TouchableOpacity> */}
            </View>
        )
    }

    function locationInfo() {
        const Item = ({ name, image, search }) => (
            <TouchableOpacity
                onPress={() => {
                    const payload = {

                        city: search,
                        check_in_date: route.params?.data.check_in_date,
                        check_out_date: route.params?.data.check_out_date,
                        adults: route.params?.data.adults,
                        children: route.params?.data.children,
                        rooms: route.params?.data.rooms
                    };
                    // dispatch(HotelActions.getHotelSearchHome(payload));
                }}
                style={{ ...styles.itemContainer, padding: 5 }}>
                <Image source={image} style={styles.image} />
                <Text style={styles.name}>{name}</Text>
            </TouchableOpacity>
        );
        return (
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <Item name={item.name} image={item.image} search={item.search} />}

                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }

    function PopularInfo() {
        const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

        const renderItemHotelPopular = ({ item, index }) => {
             console.log("Hotel Price:::>", item?.price); 
        
            return (
                <TouchableOpacity
                    onPress={() => navigation.navigate('hotelDetail', { data: item })}
                >
                    <View style={styles.mainView}>
                        {item?.Images?.[0] ? (
                            <Image source={{ uri: item?.Images?.[0] }} style={styles.image1} />
                        ) : (
                            <Image source={require('../../assests/images/hotel-dummy.png')} style={[styles.image1,{resizeMode:"contain",objectFit:"contain"}]} />
                        )}
        
                        <View style={{ paddingHorizontal: 3 }}>
                            <View style={styles.nameView}>
                                <View>
                                    <Text style={styles.hotelname}>
                                        {item?.HotelName?.length > 12 ? `${item.HotelName.slice(0, 12)}..` : item.HotelName}
                                    </Text>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", alignItems: 'center', gap: 5 }}>
                                    <Text style={[styles.hotelname, { fontSize: 12 }]}>{item?.star}</Text>
                                    <Image source={require('../../assests/images/me/star.png')} style={{ width: 12, height: 12 }} />
                                </View>
                            </View>
                            <Text style={styles.addressText}>
                                {item?.Address?.length > 24 ? `${item.Address.slice(0, 24)}...` : item.Address}
                            </Text>
                            <Text style={styles.addressText}>{item?.CityName}</Text>
                            <Text style={styles.priceText}>₹ {item?.price}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        };
        

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
            <View>
                <View style={styles.header}>
                    <Text style={[styles.headerText, { fontSize: 16, }]}>Popular Hotels</Text>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('homeAll', { city: homeHotel?.city ,area:"popular"})}>
                        <Text style={[styles.seeAllText, { fontSize: 14, }]}>See All</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={homeHotel?.popularHotel}
                    renderItem={({ item, index }) => (
                        <View style={styles.itemContainer}>
                            {!homeLoading && renderItemHotelPopular({ item, index })}
                        </View>
                    )}

                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
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

    function NearbyInfo() {
        const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
        const renderItemHotelNearBy = ({ item }) => (
            <TouchableOpacity
                onPress={() => navigation.navigate('hotelDetail', { data: item })} >
                <View style={styles.mainView}>
                    {item?.Images?.[0] ? (
                        <Image source={{ uri: item?.Images?.[0] }} style={styles.image1} />
                    ) : (
                        <Image source={require('../../assests/images/hotel-dummy.png')} style={[styles.image1,{objectFit:"contain"}]} />
                    )}
                    <View style={{ paddingHorizontal: 3, }}>
                        <View style={styles.nameView}>
                            <View>
                                <Text style={styles.hotelname}>
                                    {item?.HotelName?.length > 12 ? `${item.HotelName.slice(0, 12)}..` : item.HotelName}
                                </Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", alignItems: 'center', gap: 5, }}>
                                <Text style={[styles.hotelname, { fontSize: 12 }]}>{item?.star}</Text>
                                <Image source={require('../../assests/images/me/star.png')} style={{ width: 12, height: 12 }} />
                            </View>
                        </View>
                        <Text style={styles.addressText}>
                            {item?.Address?.length > 24 ? `${item.Address.slice(0, 24)}...` : item.Address}
                        </Text>
                        <Text style={styles.addressText}>{item?.CityName}</Text>
                        <Text style={styles.priceText}>₹ {Math.floor(item?.price).toLocaleString('en-IN')}</Text>


                    </View>

                </View>
            </TouchableOpacity>

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
            <View style={{ marginTop: 20 }}>

                <View style={styles.header}>
                    <Text style={[styles.headerText, { fontSize: 16, }]}>Nearby You</Text>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('homeAll', { city: homeHotel?.city,area:"near" })}>
                        <Text style={[styles.seeAllText, { fontSize: 14, }]}>
                            See All
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={homeHotel?.nearby}
                    renderItem={!homeLoading && renderItemHotelNearBy}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
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
        )
    }

    function FilterInfo() {
        const renderItem = ({ item }) => (
            <View style={{ justifyContent: 'space-around', alignContent: 'center', marginHorizontal: SCREEN_WIDTH * 0.08, marginTop: 10 }}>
                <Text style={{ backgroundColor: '#f5f6fa', ...Fonts._14MontserratLight, padding: 8, borderRadius: 15, textAlign: 'center' }}>{item.name}</Text>
            </View>
        );

        const renderItem1 = ({ item }) => (
            <View style={{ justifyContent: 'space-around', alignContent: 'center', marginHorizontal: SCREEN_WIDTH * 0.08, marginTop: 10 }}>
                <Text style={{ backgroundColor: '#f5f6fa', ...Fonts._14MontserratLight, padding: 8, borderRadius: 15, textAlign: 'center' }}>{item.name}</Text>
            </View>
        );
        return (
            <SafeAreaView style={styles.papper}>
                <BottomSheet
                    onBackdropPress={() => {
                        setIsVisible(false)
                    }}
                    containerStyle={{
                        height: 100
                    }}
                    modalProps={{

                    }} isVisible={isVisible}>
                    <View
                        // onPress={() => setIsVisible(false)}
                        style={{ backgroundColor: 'white', borderTopRightRadius: 25, borderTopLeftRadius: 25 }}
                    >
                        <View style={{ backgroundColor: 'white', height: SCREEN_WIDTH * 1.5, borderTopRightRadius: 25, borderTopLeftRadius: 25, }}>
                            <View style={{
                                alignSelf: 'center',
                                borderBottomColor: Colors.grayB,
                                borderBottomWidth: 2,
                                marginTop: SCREEN_WIDTH * 0.04,
                                width: SCREEN_WIDTH * 0.1,
                            }}></View>
                            <View>
                                <Text style={{ ...Fonts._20MontserratMedium, marginLeft: SCREEN_WIDTH * 0.08, textDecorationLine: 'underline' }}>Filters</Text>
                            </View>
                            <View style={{ marginHorizontal: SCREEN_WIDTH * 0.08 }}>
                                <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 18, color: 'black', }}>Price:</Text>
                                    <Text style={{ fontSize: 18, color: 'black', }}>Excluding Taxes & Fee</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.title}> {minPrice.toFixed(2)} - {maxPrice.toFixed(2)}</Text>

                                </View>
                                {/* <MultiSlider
                                    values={values}
                                    sliderLength={SCREEN_WIDTH * 0.84}
                                    onValuesChange={handleValuesChange}
                                    min={0}
                                    max={200}
                                    step={1}
                                    allowOverlap={false}
                                    snapped
                                /> */}
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 2 }}>
                                <Text style={styles.FilterText}>Low To High</Text>
                                <Text style={styles.FilterText}>High To Low</Text>
                                <Text style={styles.FilterText}>Top Rated</Text>

                            </View>
                            <View>
                                <Text style={{ ...Fonts._18MontserratRegular, marginTop: SCREEN_WIDTH * 0.04, marginLeft: SCREEN_WIDTH * 0.08 }}>Popular Localities In Delhi</Text>
                                <FlatList
                                    data={test}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.id}
                                    numColumns={3}
                                />
                            </View>
                            <View>
                                <Text style={{ ...Fonts._18MontserratRegular, marginTop: SCREEN_WIDTH * 0.04, marginLeft: SCREEN_WIDTH * 0.08 }}>Trending Filter</Text>
                                <FlatList
                                    data={test1}
                                    renderItem={renderItem1}
                                    keyExtractor={item => item.id}
                                    numColumns={2}
                                />
                            </View>


                        </View>
                    </View>
                </BottomSheet>

            </SafeAreaView>
        )
    }

}
const mapStateToProps = state => ({
    bannerdata: state.bannerReducer.bannerdata,
    customerdata: state.registrationReducer.customerdata,
    homeHotel: state.hotelReducer.hotelHome,
    hotelSearch: state.hotelReducer.hotelSearch,
    homeLoading: state.hotelReducer.homeLoading,
    homeInput: state.hotelReducer.homeInput

});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(HomeHotel);



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
        height: SCREEN_WIDTH * 0.65,
        marginBottom: 18,
        width: SCREEN_WIDTH * 0.42,
        borderRadius: 5,
        elevation: 1,
        shadowColor: 'white'
    },
    item2: {


        height: SCREEN_WIDTH * 0.68,
        marginBottom: 18,
        width: SCREEN_WIDTH * 0.42,
        alignItems: 'center',
        borderRadius: 5


    },

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
        ...Fonts._14MontserratLight,
        fontSize: 13
    },
    shimmerPlaceholderContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: -120
    },
    shimmerPlaceholderContainer1: {
        flexDirection: 'row',
        alignItems: 'flex-start',

    },
    shimmerPlaceholder: {
        width: SCREEN_WIDTH * 0.4,
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
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: 14,
        marginBottom: 10,
        marginTop: 10,

    },
    headerText: {
        color: 'black',
        ...Fonts._18MontserratBold,
    },
    seeAllText: {
        color: 'black',
        ...Fonts._18MontserratBold,
    },
    mainView: {
        paddingHorizontal: 10,
    },
    image1: {
        height: responsiveScreenHeight(18),
        width: responsiveScreenWidth(43.5),
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