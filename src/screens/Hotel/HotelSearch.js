import { View, Text, SafeAreaView, FlatList, StyleSheet, TextInput, Dimensions, TouchableOpacity, ToastAndroid, ScrollView, Platform, PermissionsAndroid } from 'react-native'
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { connect } from 'react-redux';
import { AutocompleteDropdown, AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import MyStatusBar from '../../components/StatusBar';
import Loader from '../../components/Loader';
import Header from '../../components/Header';
import { useHeaderHeight } from '@react-navigation/elements';
import { Colors, Fonts, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes } from '../../assests/style';
// import { Button } from 'react-native-elements';
import * as HotelActions from '../../redux/actions/HotelActions'
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { BottomSheet, fonts } from '@rneui/base';
import { Dropdown } from 'react-native-element-dropdown';
import { fetchAndStoreIPv4Address } from '../../components/NetworkHelper';
import { navigate } from '../../navigations/NavigationServices';
// import Button from "../../../components/Button";
import Button from '../../components/Button'
import { showToastMessage } from '../../utils/services';
import Geolocation from '@react-native-community/geolocation';




const HotelSearch = ({ hotelSearch, dispatch }) => {

    const headerHeight = useHeaderHeight();

    const [city, setCity] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [showCheckInDate, setShowCheckInDate] = useState('');
    const [showCheckOutDate, setShowCheckOutDate] = useState('');
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState(0);
    const [showIn, setShowIn] = useState(false);
    const [showOut, setShowOut] = useState(false);

    const [ages, setAges] = useState([]);

    useEffect(() => {
        async function fetchAuth() {
            const ip = await fetchAndStoreIPv4Address();
            const payload = {
                IpAddress: ip
            };

            dispatch(HotelActions.onHotelAuth(payload));
        };

        fetchAuth();

    }, [dispatch]);

    const handleAgeChange = (text, index) => {
        const newAges = [...ages];
        newAges[index] = text;
        setAges(newAges);
    };

    const [adutlVisible, setAdultVisible] = useState(false);


    // search city
    const [loading, setLoading] = useState(false)
    const searchRef = useRef(null)

    const [suggestionsList, setSuggestionsList] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)
    const dropdownController = useRef(null)

    const getSuggestions = useCallback(async q => {
        const filterToken = q.toLowerCase()
        console.log('getSuggestions', q)
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

    const onOpenSuggestionsList = useCallback(isOpened => { }, []);

    useEffect(() => {
        setLoading(false);
        setSuggestionsList(hotelSearch?.data)
    }, [hotelSearch])

    // date picker
    const showPickerIn = () => {
        setShowIn(true);
    }

    const onChangeCheckIn = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowIn(false);
        console.log(currentDate);
        const checkDate = moment(currentDate).format('YYYY-MM-DD');
        const showCheckInDate = moment(currentDate).format('DD-MM-YYYY');
        setCheckInDate(checkDate);
        setShowCheckInDate(showCheckInDate)
    };

    const showPickerOut = () => {
        setShowOut(true);
    }

    const onChangeCheckOut = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowOut(false);
        console.log(currentDate);
        const checkDate = moment(currentDate).format('YYYY-MM-DD');
        const showCheckOutDate = moment(currentDate).format('DD-MM-YYYY');
        console.log(checkDate, 'pp');
        setCheckOutDate(checkDate);
        setShowCheckOutDate(showCheckOutDate)
    };

    console.log('rest', checkInDate);

    const done = () => {
        let isValid = true;
        let isValidRooms = false;
        // vaild ages children
        ages.forEach((age) => {
            const parsedAge = parseInt(age, 10);
            if (!(parsedAge >= 1 && parsedAge <= 17)) {
                isValid = false;
            }
        });

       

        
        
    };

    const permissionRequest = async() => {
        // permission location

        if (Platform.OS === 'android') {
            const permissions = [
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            ];
            // Calling the permission function
            const granted = await PermissionsAndroid.requestMultiple(permissions, {
              title: 'Example App Permissions',
              message: 'Example App needs access to certain features.',
            });
    
            if (
              granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
              PermissionsAndroid.RESULTS.GRANTED
            ) {
              // Permission Granted
              return true;

            } else {
              // Permission Denied
              showToastMessage({ message: 'Please check Location Permission..'});
              return false;
            }
            
          } else {
           console.log(' OS Other');
          }
    }

    const handleSearch = async () => {
        // navigate('HotelPayment');
        permissionRequest();
        if (!city) {
            ToastAndroid.showWithGravityAndOffset('Please enter city', ToastAndroid.BOTTOM, ToastAndroid.SHORT, 25, 75);
        }else if(!checkInDate){
            ToastAndroid.showWithGravityAndOffset('Please enter checkin date', ToastAndroid.BOTTOM, ToastAndroid.SHORT, 25, 75);

        }else if( !checkOutDate){
            ToastAndroid.showWithGravityAndOffset('Please enter checkout date', ToastAndroid.BOTTOM, ToastAndroid.SHORT, 25, 75);

        }else if(!adults){
            ToastAndroid.showWithGravityAndOffset('Please enter adults', ToastAndroid.BOTTOM, ToastAndroid.SHORT, 25, 75);

        }else if(!rooms){
            ToastAndroid.showWithGravityAndOffset('Please enter room', ToastAndroid.BOTTOM, ToastAndroid.SHORT, 25, 75);

        } else if (adults == 0) {
            ToastAndroid.showWithGravityAndOffset('adults is required', ToastAndroid.BOTTOM, ToastAndroid.SHORT, 25, 75);
            return;
        } else if (rooms == 0) {
            ToastAndroid.showWithGravityAndOffset('Rooms is required', ToastAndroid.BOTTOM, ToastAndroid.SHORT, 25, 75);
            return;
        }else{
            const location = Geolocation.getCurrentPosition(info => {
                console.log('Location ::: ',info)
                console.log('asdfa' , adults,children,rooms,ages);
                const newadults = adults;
                const newchildren = children;
                const newrooms = rooms;
                const childrenages = ages;

                const paxRooms = [];
                let remainingAdults = newadults;
                let remainingChildren = newchildren;
                let childAgeIndex = 0;

                const validAdults = rooms * 2 >= adults;
               console.log('asdfas',validAdults)
                
                if(!validAdults) {
                    showToastMessage({ message: 'Valid Adults'});
                    return false;
                } 

                const validChildren = rooms * 2 >= children;
                if(!validChildren)
                {
                    showToastMessage({ message: 'Valid Children'});
                    return false;
                }

                const validChildrenAge = children == childrenages.length;
                if(!validChildrenAge) {
                    showToastMessage({ message: 'Valid Children Age'});
                    return false;
                }

                const validChildrenAgeValid = childrenages.every((item) => parseInt(item) < 18);

                    console.log(validChildrenAgeValid, 'children');

                    // Check if any child is 18 or older
                    if (!validChildrenAgeValid) {
                    showToastMessage({ message: 'Valid Children Age is 18 or Below' });
                    return false;
                    }

                for (let i = 0; i < rooms; i++) {
                    const roomAdults = Math.min(2, remainingAdults); // Each room gets max 2 adults
                    const roomChildren = Math.min(2, remainingChildren); // Each room gets max 2 children
                    const roomChildrenAges = childrenages.slice(childAgeIndex, childAgeIndex + roomChildren);
                  
                    paxRooms.push({
                      Adults: roomAdults,
                      Children: roomChildren,
                      ChildrenAges: roomChildrenAges,
                    });
                  
                    // Update remaining counts
                    remainingAdults -= roomAdults;
                    remainingChildren -= roomChildren;
                    childAgeIndex += roomChildren;
                  }

                  
                  const validRooms = paxRooms.every((item) => item.Adults !== 0);

                  if(validRooms) {
                    console.log(paxRooms);


                
                    const payload = {
                        city: city,
                        check_in_date: checkInDate,
                        check_out_date: checkOutDate,
                        paxRooms: paxRooms,
                        rooms: rooms.toString(),
                        latitude: info?.coords?.latitude,
                        longitude: info?.coords?.longitude
            
                    }
                    console.log(payload, 'City ::');
                    // return false
                    dispatch(HotelActions.getHotelSearchHome(payload));
                  } else {
                    showToastMessage({ message: 'Valid Rooms'})
                  }

                  
                

            });
        }

       
    };

    const decreaseRoom = () => {
        setRooms(rooms > 0 ? rooms - 1 : 0);
    };

    const increaseRoom = () => {
        setRooms(rooms + 1);
    };



    const increaseAdult = () => {
        setAdults(adults + 1);
    };

    const decreaseAdult = () => {
        setAdults(adults > 0 ? adults - 1 : 0);
    };

    const decreaseChild = () => {
        setChildren(children > 0 ? children - 1 : 0);
    };

    const increaseChild = () => {
        setChildren(children + 1);
    };




    return (
        <AutocompleteDropdownContextProvider headerOffset={headerHeight}>
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
                <Loader />
                <Header title={'Hotel Search'} tintColor={Colors.white} />

                <FlatList
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <>
                            <View style={{ flex: 1, }}>

                                <View style={{ backgroundColor: Colors.white, marginVertical: 5 }}>
                                    {searchInfo()}
                                    {bottomsheetAdults()}

                                </View>

                            </View>
                        </>
                    }
                />


            </SafeAreaView>
        </AutocompleteDropdownContextProvider>
    );


    function bottomsheetAdults() {
        return (
            <SafeAreaView>
                <BottomSheet
                    onBackdropPress={() => setAdultVisible(false)}
                    containerStyle={{
                        height: SCREEN_HEIGHT * 2
                    }}
                    modalProps={{

                    }}
                    isVisible={adutlVisible}>
                    <View
                        // onPress={() => setIsVisible(false)}
                        style={{ backgroundColor: 'white', borderTopRightRadius: 25, borderTopLeftRadius: 25, height: SCREEN_HEIGHT * 0.65 }}
                    >
                        <View style={{
                            alignSelf: 'center',
                            borderBottomColor: Colors.grayB,
                            borderBottomWidth: 2,
                            marginTop: SCREEN_WIDTH * 0.04,
                            width: SCREEN_WIDTH * 0.2,
                        }}></View>
                        <View style={{ borderBottomWidth: 0.5, borderStyle: 'dashed', marginVertical: SCREEN_WIDTH * 0.05 }}></View>
                        <View style={{}}>
                            <Text style={{ ...Fonts._18MontserratMedium, textAlign: 'center' }}>Select Adult, Children and Room</Text>
                        </View>
                        <ScrollView>

                            <View style={{ borderBottomWidth: 0.5, borderStyle: 'dashed', marginVertical: SCREEN_WIDTH * 0.02, flexDirection: 'row' }}></View>

                            <View style={{ margin: Sizes.fixPadding * 1 }}>
                                <>
                                    <Text style={{ ...Fonts._13MontserratMedium, marginVertical: SCREEN_HEIGHT * 0.01, marginVertical: SCREEN_HEIGHT * 0.01 }}>Adult</Text>
                                    <View style={styles.guestButton}>
                                        <TouchableOpacity activeOpacity={1} disabled={adults == 0} onPress={decreaseAdult} style={{ padding: 10, backgroundColor: adults == 0 ? 'grey' : Colors.primaryTheme, borderRadius: 100 }}>
                                            <Icon name="minus" size={10} color="black" />
                                        </TouchableOpacity>
                                        <Text style={{ ...Fonts._11MontserratMedium }}>{adults}</Text>
                                        <TouchableOpacity activeOpacity={1} disabled={adults == 30} onPress={increaseAdult} style={{ padding: 10, backgroundColor: adults == 30 ? 'grey' : Colors.primaryTheme, borderRadius: 100 }}>
                                            <Icon name="plus" size={10} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </>
                                <>

                                    <Text style={{ ...Fonts._13MontserratMedium, marginVertical: SCREEN_HEIGHT * 0.01, marginVertical: SCREEN_HEIGHT * 0.01 }}>Children</Text>
                                    <View style={styles.guestButton}>
                                        <TouchableOpacity activeOpacity={1} disabled={children == 0} onPress={decreaseChild} style={{ padding: 10, backgroundColor: children == 0 ? 'grey' : Colors.primaryTheme, borderRadius: 100 }}>
                                            <Icon name="minus" size={10} color="black" />
                                        </TouchableOpacity>
                                        <Text style={{ ...Fonts._11MontserratMedium }}>{children}</Text>
                                        <TouchableOpacity activeOpacity={1} disabled={children == 30} onPress={increaseChild} style={{ padding: 10, backgroundColor: children == 30 ? 'grey' : Colors.primaryTheme, borderRadius: 100 }}>
                                            <Icon name="plus" size={10} color="black" />
                                        </TouchableOpacity>
                                    </View>

                                    {children !== 0 && (
                                        <View style={{ margin: 10 }}>
                                            <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Ages of children at check-out</Text>
                                            <Text style={{ color: 'black' }}>Add the age for each child to get the best match in beds, room size and special prices.</Text>
                                            {[...Array(children)].map((_, index) => (
                                                <TextInput
                                                    key={index}
                                                    style={styles.input3}
                                                    onChangeText={(text) => handleAgeChange(text, index)}
                                                    value={ages[index] || ''}
                                                    placeholderTextColor={'grey'}
                                                    placeholder={`Child ${index + 1} Age`}
                                                    keyboardType="numeric"
                                                />
                                            ))}
                                        </View>
                                    )}


                                </>
                                <>

                                    <Text style={{ ...Fonts._13MontserratMedium, marginVertical: SCREEN_HEIGHT * 0.01, marginVertical: SCREEN_HEIGHT * 0.01 }}>Room</Text>
                                    <View style={styles.guestButton}>
                                        <TouchableOpacity activeOpacity={1} disabled={rooms == 0} onPress={decreaseRoom} style={{ padding: 10, backgroundColor: rooms == 0 ? 'grey' : Colors.primaryTheme, borderRadius: 100 }}>
                                            <Icon name="minus" size={10} color="black" />
                                        </TouchableOpacity>
                                        <Text style={{ ...Fonts._11MontserratMedium }}>{rooms}</Text>
                                        <TouchableOpacity activeOpacity={1} disabled={rooms == 30} onPress={increaseRoom} style={{ padding: 10, backgroundColor: rooms == 30 ? 'grey' : Colors.primaryTheme, borderRadius: 100 }}>
                                            <Icon name="plus" size={10} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </>
                            </View>
                            <View style={{ marginVertical: Sizes.fixPadding }}>
                                <TouchableOpacity style={{ backgroundColor: "#EA7515", alignSelf: 'center', paddingHorizontal: Sizes.fixPadding, paddingVertical: Sizes.fixPadding * 0.5, borderRadius: 10 }} onPress={() => done()}>
                                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Done</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>

                    </View>
                </BottomSheet>
            </SafeAreaView>
        )
    }




    function searchInfo() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>City</Text>
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
                        console.log(item?.id);
                        setCity(item?.id);
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
                        placeholderTextColor: '#530201',
                        autoCapitalize: 'none',
                        style: {
                            borderRadius: 5,
                            backgroundColor: '#fff',
                            color: '#530201',
                            paddingLeft: 18,
                            // borderWidth: 1,
                            // borderColor: '#ccc',
                        },
                    }}
                    rightButtonsContainerStyle={{
                        right: 2,
                        height: 30,

                        alignSelf: 'center',
                    }}
                    inputContainerStyle={{
                        backgroundColor: '#fff',
                        // backgroundColor:'red',
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

                <Text style={styles.label}>Check-In Date</Text>


                <TouchableOpacity style={styles.input} onPress={showPickerIn}>
                    <Text style={{ ...Fonts._12MontserratMedium, padding: 10, fontSize: 16, color: '#530201',opacity:1 }}>{showCheckInDate ? showCheckInDate : 'Select Check In Date'}</Text>
                </TouchableOpacity>

                {showIn && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={checkInDate instanceof Date ? checkInDate : new Date()}
                        mode="date"
                        display="default"
                        minimumDate={new Date()}
                        onChange={onChangeCheckIn}
                    />
                )}

                <Text style={styles.label}>Check-Out Date</Text>
                <TouchableOpacity style={styles.input} onPress={showPickerOut}>
                    <Text style={{ ...Fonts._12MontserratMedium, padding: 10, fontSize: 16, color: '#530201' }}>{showCheckOutDate ? showCheckOutDate : 'Select Check Out Date'}</Text>
                </TouchableOpacity>

                {showOut && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        placeholderText=''
                        value={checkOutDate instanceof Date ? checkOutDate : new Date()}
                        mode="date"
                        display="default"
                        minimumDate={new Date(checkInDate)}
                        onChange={onChangeCheckOut}
                    />
                )}

                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                    <Text style={styles.label}>Adults</Text>

                    <Text style={styles.label}>Children</Text>


                    <Text style={styles.label}>Rooms</Text>

                </View> */}

                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.input2} onPress={() => setAdultVisible(true)}>
                        <Text style={{ color: 'black', padding: 10, fontSize: 18, fontWeight: 'bold' }}>{adults}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.input2} onPress={() => setAdultVisible(true)}>
                        <Text style={{ color: 'black', padding: 10, fontSize: 18, fontWeight: 'bold' }}>{children}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.input2} onPress={() => setAdultVisible(true)}>
                        <Text style={{ color: 'black', padding: 10, fontSize: 18, fontWeight: 'bold' }}>{rooms}</Text>
                    </TouchableOpacity>

                </View> */}

                {/* Here is Section of Gender Preferance */}
                <View>
                <View style={[styles.countContainerChild,{width:"100%"}]}>
                        <Text style={{ ...Fonts._13MontserratRegular, }}>Room</Text>
                        <View style={styles.countContainerChildItem}

                        >
                            <TouchableOpacity style={[styles.countButton,]}
                                activeOpacity={1} disabled={rooms == 0} onPress={decreaseRoom}
                            >
                                <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>-</Text>
                            </TouchableOpacity>
                            <Text style={{ ...Fonts._13MontserratMedium,color: '#530201' }}>{rooms}</Text>
                            <TouchableOpacity style={[styles.countButton]}
                                activeOpacity={1} disabled={rooms == 30} onPress={increaseRoom}
                            >
                                <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>+</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                 </View>
                <View style={styles.countContainer}>

                    <View style={styles.countContainerChild}>
                        <Text style={{ ...Fonts._13MontserratRegular }}>Adults</Text>
                        <View style={styles.countContainerChildItem}>

                            <TouchableOpacity style={[styles.countButton,]}

                                disabled={adults == 0} onPress={decreaseAdult}
                            >
                                <Text style={{ ...Fonts._18MontserratRegular, color: 'black', bottom: 2 }}>-</Text>
                            </TouchableOpacity>

                            <Text style={{ ...Fonts._11MontserratMedium,color: '#530201' }}>{adults}</Text>
                            <TouchableOpacity style={styles.countButton}
                                activeOpacity={1} disabled={adults == 30} onPress={increaseAdult}
                            >
                                <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.countContainerChild}>
                        <Text style={{ ...Fonts._13MontserratRegular }}>Children</Text>
                        <View style={styles.countContainerChildItem}

                        >
                            <TouchableOpacity style={[styles.countButton,]}
                                activeOpacity={1} disabled={children == 0} onPress={decreaseChild}
                            >
                                <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>-</Text>
                            </TouchableOpacity>
                            <Text style={{ ...Fonts._13MontserratMedium,color: '#530201' }}>{children}</Text>
                            <TouchableOpacity style={[styles.countButton]}
                                activeOpacity={1} disabled={children == 30} onPress={increaseChild}
                            >
                                <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>+</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                 


                </View>

                <View>
                    {children !== 0 && (
                        <View style={{ gap: 10 }}>
                            <Text style={{ ...Fonts._16MontserratMedium,marginTop:10, }}>Ages of children at check-out</Text>
                            <Text style={{ ...Fonts._12MontserratMedium }}>Add the age for each child to get the best match in beds, room size and special prices.</Text>
                            <View style={{ flex: 1, width: '100%', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
                                {[...Array(children)].map((_, index) => (
                                    <TextInput
                                        key={index}
                                        style={styles.input3}
                                        onChangeText={(text) => handleAgeChange(text, index)}
                                        value={ages[index] || ''}
                                        placeholderTextColor={'grey'}
                                        placeholder={`Child ${index + 1} Age`}
                                        keyboardType="numeric"
                                    />
                                ))}
                            </View>
                        </View>
                    )}
                </View>

                <View style={styles.buttonContainer}>
                    {/* <Button title="Search" onPress={handleSearch} color="#fff" /> */}
                    <Button title="Search" onPress={handleSearch} />
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFF6F1',
        padding: 8,
        borderRadius: 8,
        // backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 15,
        gap: 8
    },
    label: {
        // fontSize: 16,
        marginBottom: 8,
        color: 'black',
        // fontFamily:fonts._11MontserratMedium,
        ...Fonts._16MontserratMedium,
    },
    input: {
        width: '100%',
        height: 50,
        borderRadius: 5,
        paddingHorizontal: Sizes.fixPadding * 0.3,
        borderColor: Colors.grayA,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 0,
        color:'#530201',
        opacity:1

    },
    input2: {
        height: SCREEN_HEIGHT * 0.06,
        borderColor: '#ccc',
        borderWidth: 2,
        marginBottom: 16,
        width: '30%',
        color: 'black',
        borderRadius: 5
    },
    input3: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        width: '30%',
        color: 'black',
        borderRadius: 5,
        paddingLeft:10,
        fontSize:12,
    },
    buttonContainer: {
        marginTop: 16,
        backgroundColor: '#007BFF',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    guestButton: {
        flexDirection: 'row',
        width: SCREEN_WIDTH * 0.4,
        borderWidth: 0.5,
        height: SCREEN_HEIGHT * 0.06,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 5
    },

    countContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden'
    },
    countContainerChild: {
        justifyContent: 'center', alignItems: '',  width: "49%",
    },
    countContainerChildItem: {
        width: "100%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: Sizes.fixPadding * 0.5, backgroundColor: Colors.white, borderRadius: 5, elevation: 2, borderColor: '#00000025', borderWidth: 1, marginTop: Sizes.fixPadding * 0.5
    },
    countButton: {
        height: SCREEN_WIDTH * 0.07, width: SCREEN_WIDTH * 0.07, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 100, borderColor: Colors.grayA
    }
});

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
    hotelSearch: state.hotelReducer.hotelSearch,
});

export default connect(mapStateToProps, mapDispatchToProps)(HotelSearch)