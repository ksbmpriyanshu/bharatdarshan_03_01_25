import React, { useEffect, useState } from 'react';
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
    FlatList,
    ScrollView,
    TextInput
} from 'react-native';
import { Colors, Fonts, SCREEN_WIDTH, Sizes } from '../../../assests/style';
import MyStatusBar from '../../../components/StatusBar';
import Header from '../../../components/Header';
import { BottomSheet, Input } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from '../../../components/Button';
import { navigate } from '../../../navigations/NavigationServices';
import * as FlightActions from '../../../redux/actions/FlightActions';
import { connect } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Loader2 from '../../../components/Loader2';
import { cabinclass } from '../../../config/data';
import { fetchAndStoreIPv4Address } from '../../../components/NetworkHelper';
import { CheckBox } from 'react-native-elements';
import moment from 'moment';

const Flight1 = ({ dispatch, airpotCities, customerdata, flightData }) => {
    const [state, setState] = useState({
        toggle: false,
        date: null,
        returnDate: null,
        selectedId: null,
        adults: 0,
        children: 0,
        infants: 0,
        classModalVisible: false,
        directChecked: false,
        departureModalVisible: false,
        arrivalModalVisible: false,
        classdata: null,
        departureData: null,
        arrivalData: null,
        searchTerm: '',
        ipv4Address: ''
    })
    const [loading, setloading] = useState(false)
    const [toggle, setToggle] = useState(1);
    const [date, setDate] = useState('');
    const [show, setShow] = useState(false);
    const [returnDate, setReturnDate] = useState('');
    const [returnShow, setReturnShow] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [classModal, setClassModal] = useState(false);
    const [directChecked, setDirectChecked] = useState(false)
    const [departureModal, setDepartureModal] = useState(false)
    const [arrivalModal, setArrivalModal] = useState(false)
    const [classdata, setClassData] = useState(null);
    const [departureData, setDepartureData] = useState(null)
    const [arrivalData, setArrivalData] = useState(null)
    const [ipv4Address, setIPv4Address] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const payload = {
            data: {
                searchKey: customerdata?.country
            },
        };
        dispatch(FlightActions.getairpotcities(payload));
    }, [])

    useEffect(() => {
        const initializeIPv4Address = async () => {
            const ip = await fetchAndStoreIPv4Address();
            setIPv4Address(ip);
            setloading(false);
        };

        initializeIPv4Address();
    }, []);

    const updateState = data => {
        setState(prevState => {
            const newData = { ...prevState, ...data }
            return newData
        })
    }

    const { } = state;

    return (
        <SafeAreaView style={styles.container}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
            <Loader2 isLoading={loading} />
            <Header title={'Flight'} tintColor={Colors.white} />
            <View style={styles.contentContainer}>
                <FlatList
                    ListHeaderComponent={
                        <>
                            {togglebtn()}
                            <View style={{ flex: 1 }}>
                                {locationflightoneway()}
                                {Departuredate()}
                                {toggle === 2 && ReturnDate()}
                                {classflight()}
                                {/* {faredetails()} */}
                                {selectquantity()}
                                {directFlightsoption()}
                                {proceedbtn()}
                            </View>
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                />

                {classModal1()}
                {DepartureMOdal()}
                {ArrivalModal()}
            </View>
        </SafeAreaView>
    );
    
    function directFlightsoption() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Sizes.fixPadding * 0.6, right: 5 }}>

                <CheckBox
                    checked={directChecked}
                    iconType="material-community"
                    checkedIcon="checkbox-outline"
                    uncheckedIcon={'checkbox-blank-outline'}
                    style={{ margin: 0, padding: 0, width: 10, height: 10, }}
                    containerStyle={{ padding: 0, }}
                    size={Sizes.fixPadding * 1.3}
                    onPress={() => setDirectChecked(!directChecked)}
                    checkedColor={Colors.primaryTheme}
                />
                <Text style={{ ...Fonts._13MontserratRegular }}>
                    Direct Flights Show

                </Text>
            </View>
        )
    }

    function ArrivalModal() {
        const handlepress = (item) => {
            setArrivalData(item);
            setArrivalModal(false);
        };



        return (
            <BottomSheet
                isVisible={arrivalModal}
                onBackdropPress={() => setArrivalModal(false)}
            >
                <View style={[styles.modalContainer, { height: 400 }]}>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={require('../../../assests/images/homerectangle.png')} tintColor={'#E0DCDC'} />
                    </View>
                    <View style={styles.modalHeader}>
                        <Text style={{ ...Fonts._20MontserratMedium, letterSpacing: 0.6 }}>
                            Select Your Origin
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setArrivalModal(false)}
                            style={{ marginRight: 5 }}
                        >
                            <AntDesign
                                name="close"
                                color={Colors.black}
                                size={Sizes.fixPadding * 1.3}
                            />
                        </TouchableOpacity>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            {airpotCities?.map((item, index) => (
                                <TouchableOpacity
                                    key={index
                                    }
                                    style={styles.listItem}
                                    onPress={() => handlepress(item)}
                                >
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%', overflow: 'hidden' }}>
                                            <EvilIcons
                                                name="location"
                                                color={Colors.primaryTheme}
                                                size={Sizes.fixPadding * 2}
                                            />
                                            <View style={{ marginLeft: Sizes.fixHorizontalPadding * 1.6 }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                                    <Text style={{ ...Fonts._14MontserratRegular, color: Colors.black }}>{item?.CITYNAME}</Text>
                                                    <Text style={{ ...Fonts._14MontserratRegular, color: Colors.black }}>,{item?.COUNTRYNAME}</Text>

                                                </View>
                                                <Text style={{ ...Fonts._12MontserratRegular, color: '#959595', }} numberOfLines={1}>{item?.AIRPORTNAME}</Text>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={{ ...Fonts._14MontserratRegular, color: '#959595' }}>{item?.CITYCODE}</Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </BottomSheet>
        );
    }

    function DepartureMOdal() {
        const handlepress = (item) => {
            setDepartureData(item);
            setDepartureModal(false);
        };

        const filteredCities = airpotCities?.filter(
            (city) =>
                city?.CITYNAME.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                city?.AIRPORTNAME.toLowerCase()?.includes(searchTerm?.toLowerCase())
        );

        return (
            <BottomSheet
                isVisible={departureModal}
                onBackdropPress={() => setDepartureModal(false)}
            >
                <View style={[styles.modalContainer, { height: 500 }]}>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={require('../../../assests/images/homerectangle.png')} tintColor={'#E0DCDC'} />
                    </View>
                    <View style={styles.modalHeader}>
                        <Text style={{ ...Fonts._20MontserratMedium, letterSpacing: 0.6 }}>
                            Select Your Origin
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setDepartureModal(false)}
                            style={{ marginRight: 5 }}
                        >
                            <AntDesign
                                name="close"
                                color={Colors.black}
                                size={Sizes.fixPadding * 1.3}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ zIndex: 1, marginBottom: Sizes.fixPadding * 0.5 }} >
                        <Input
                            value={searchTerm}
                            onChangeText={(text) => setSearchTerm(text)}
                            inputContainerStyle={styles.inputContainer}
                            containerStyle={{ height: 50, paddingHorizontal: 0, borderBottomWidth: 0 }}
                            style={{ height: 50, paddingHorizontal: 0, borderWidth: 1, paddingHorizontal: Sizes.fixPadding, borderRadius: 30, borderColor: '#E2E2E2' }}
                            inputStyle={{ ...Fonts._14MontserratMedium, marginLeft: 10 }}
                            placeholder='Search City / Airport'
                            placeholderTextColor={'#B6B2B2'}
                        />
                    </TouchableOpacity>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            {filteredCities && filteredCities.length > 0 ? (
                                filteredCities.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.listItem}
                                        onPress={() => handlepress(item)}
                                    >
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%', overflow: 'hidden' }}>
                                                <EvilIcons
                                                    name="location"
                                                    color={Colors.primaryTheme}
                                                    size={Sizes.fixPadding * 2}
                                                />
                                                <View style={{ marginLeft: Sizes.fixHorizontalPadding * 1.6 }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text style={{ ...Fonts._14MontserratRegular, color: Colors.black }}>{item?.CITYNAME}</Text>
                                                        <Text style={{ ...Fonts._14MontserratRegular, color: Colors.black }}>, {item?.COUNTRYNAME}</Text>
                                                    </View>
                                                    <Text style={{ ...Fonts._12MontserratRegular, color: '#959595' }} numberOfLines={1}>{item?.AIRPORTNAME}</Text>
                                                </View>
                                            </View>
                                            <View>
                                                <Text style={{ ...Fonts._14MontserratRegular, color: '#959595' }}>{item?.CITYCODE}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            ) : (
                                <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                                    <Text style={{ ...Fonts._14MontserratRegular, color: Colors.black }}>No data found</Text>
                                </View>
                            )}
                        </View>
                    </ScrollView>
                </View>
            </BottomSheet>
        );
    }

    function proceedbtn() {
        const flightSearch = () => {
            const payload = {
                EndUserIp: ipv4Address,
                AdultCount: adults,
                ChildCount: children,
                InfantCount: infants,
                DirectFlight: directChecked,
                OneStopFlight: false,
                JourneyType: toggle,
                PreferredAirlines: null,
                Origin: departureData?.AIRPORTCODE,
                Destination: arrivalData?.AIRPORTCODE,
                FlightCabinClass: classdata?.id,
                PreferredDepartureTime: moment(date).format('YYYY-MM-DD'),
                PreferredArrivalTime: returnDate == '' ? '' : moment(returnDate).format('YYYY-MM-DD'),
                Sources: null,
                departureData: departureData,
                arrivalData: arrivalData,
                classdata: classdata,
            }
            console.log(payload, 'full payloaf')
            dispatch(FlightActions.getflightdata(payload));
        }


        return (
            <View style={{ marginTop: Sizes.fixPadding }}>
                <Button title={'Search'} onPress={() => flightSearch()} />
            </View>
        )
    }

    function classModal1() {
        const handlepress = (item) => {
            setClassData(item);
            setClassModal(false);
        };

        return (
            <BottomSheet
                isVisible={classModal}
                onBackdropPress={() => setClassModal(false)}
            >
                <View style={[styles.modalContainer, { height: 400 }]}>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={require('../../../assests/images/homerectangle.png')} tintColor={'#E0DCDC'} />
                    </View>
                    <View style={styles.modalHeader}>
                        <Text style={{ ...Fonts._20MontserratMedium, letterSpacing: 0.6 }}>
                            Select Your Cabin Class
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setClassModal(false)}
                            style={{ marginRight: 5 }}
                        >
                            <AntDesign
                                name="close"
                                color={Colors.black}
                                size={Sizes.fixPadding * 1.3}
                            />
                        </TouchableOpacity>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            {cabinclass?.map((item, index) => (
                                <TouchableOpacity
                                    key={index

                                    }
                                    style={styles.listItem}
                                    onPress={() => handlepress(item)}
                                >
                                    <Text style={styles.listText}>
                                        {item?.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </BottomSheet>
        );
    }

    function classflight() {
        return (
            <TouchableOpacity style={{ marginBottom: Sizes.fixPadding * 0.6 }} onPress={() => setClassModal(true)} >
                <Text style={styles.heading}>Select Class</Text>
                <Input
                    value={classdata === null ? 'Select Class' : classdata?.name}
                    disabled
                    inputContainerStyle={styles.inputContainer}
                    containerStyle={{ height: 50, paddingHorizontal: 0 }}
                    inputStyle={{ ...Fonts._14MontserratMedium, marginLeft: 10 }}
                    placeholder='Select Class'
                    placeholderTextColor={'#BABABA'}

                />
            </TouchableOpacity>
        )
    }

    function selectquantity() {
        const decreaseAdults = () => {
            if (adults > 0) {
                setAdults(adults - 1);
            }
        };

        const increaseAdults = () => {
            setAdults(adults + 1);
        };

        const decreaseChildren = () => {
            if (children > 0) {
                setChildren(children - 1);
            }
        };

        const increaseChildren = () => {
            setChildren(children + 1);
        };

        const decreaseInfants = () => {
            if (infants > 0) {
                setInfants(infants - 1);
            }
        };

        const increaseInfants = () => {
            setInfants(infants + 1);
        };
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: SCREEN_WIDTH * 0.25, }}>
                    <Text style={{ ...Fonts._13MontserratRegular }}>Adults</Text>
                    <View style={{ width: SCREEN_WIDTH * 0.25, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: Sizes.fixPadding * 0.5, backgroundColor: Colors.white, borderRadius: 10, elevation: 2, borderColor: '#00000025', borderWidth: 1, marginTop: Sizes.fixPadding * 0.5 }}>
                        <TouchableOpacity style={{ height: SCREEN_WIDTH * 0.07, width: SCREEN_WIDTH * 0.07, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 100, borderColor: '#00000025' }}
                            onPress={decreaseAdults}
                            disabled={adults === 0}
                        >
                            <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>-</Text>
                        </TouchableOpacity>
                        <Text>{adults}</Text>
                        <TouchableOpacity style={{ height: SCREEN_WIDTH * 0.07, width: SCREEN_WIDTH * 0.07, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 100, borderColor: '#00000025' }}
                            onPress={increaseAdults}
                        >
                            <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: SCREEN_WIDTH * 0.25 }}>
                    <Text style={{ ...Fonts._13MontserratRegular }}>Children</Text>
                    <View style={{ width: SCREEN_WIDTH * 0.25, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: Sizes.fixPadding * 0.5, backgroundColor: Colors.white, borderRadius: 10, elevation: 2, borderColor: '#00000025', borderWidth: 1, marginTop: Sizes.fixPadding * 0.5 }}

                    >
                        <TouchableOpacity style={{ height: SCREEN_WIDTH * 0.07, width: SCREEN_WIDTH * 0.07, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 100, borderColor: '#00000025' }}
                            onPress={decreaseChildren}
                            disabled={children === 0}>
                            <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>-</Text>
                        </TouchableOpacity>
                        <Text>{children}</Text>
                        <TouchableOpacity style={{ height: SCREEN_WIDTH * 0.07, width: SCREEN_WIDTH * 0.07, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 100, borderColor: '#00000025' }}
                            onPress={increaseChildren}
                        >
                            <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: SCREEN_WIDTH * 0.25 }}>
                    <Text style={{ ...Fonts._13MontserratRegular }}>Infant</Text>
                    <View style={{ width: SCREEN_WIDTH * 0.25, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: Sizes.fixPadding * 0.5, backgroundColor: Colors.white, borderRadius: 10, elevation: 2, borderColor: '#00000025', borderWidth: 1, marginTop: Sizes.fixPadding * 0.5 }}>
                        <TouchableOpacity style={{ height: SCREEN_WIDTH * 0.07, width: SCREEN_WIDTH * 0.07, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 100, borderColor: '#00000025' }}
                            onPress={decreaseInfants}
                            disabled={infants === 0}
                        >
                            <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>-</Text>
                        </TouchableOpacity>
                        <Text>{infants}</Text>
                        <TouchableOpacity style={{ height: SCREEN_WIDTH * 0.07, width: SCREEN_WIDTH * 0.07, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 100, borderColor: '#00000025' }}
                            onPress={increaseInfants}
                        >
                            <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    function faredetails() {

        const faredata = [
            {
                id: 1,
                name: 'Regular Fares'
            },
            {
                id: 2,
                name: 'Student Fares'
            },
            {
                id: 3,
                name: 'Marine Fares'
            },
        ]
        const renderItem = ({ item }) => {
            const isSelected = item?.name === selectedId;
            return (
                <TouchableOpacity style={{
                    marginHorizontal: Sizes.fixPadding * 0.5, padding: Sizes.fixPadding * 0.5, borderRadius: 5,
                    backgroundColor: isSelected ? '#FBBC04' : null,
                    borderWidth: isSelected ? 0 : 1,
                    borderColor: '#D6D6D6',
                    paddingHorizontal: Sizes.fixPadding
                }}
                    onPress={() => setSelectedId(item?.name)}>
                    <Text style={{ ...Fonts._13MontserratRegular }}>{item?.name}</Text>
                </TouchableOpacity>
            )
        }
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 0.5 }}>
                <Text style={{ ...Fonts._14MontserratRegular, textAlign: 'center' }}>Select a fare Type</Text>
                <View style={{ marginVertical: Sizes.fixHorizontalPadding * 2 }}>
                    <FlatList data={faredata} renderItem={renderItem} horizontal showsHorizontalScrollIndicator={false} />
                </View>
            </View>
        )
    }

    function ReturnDate() {
        const showReturnDatePicker = () => {
            setReturnShow(true);
        };

        const onReturnDateChange = (event, selectedDate) => {
            if (event.type === 'set') {
                setReturnDate(selectedDate);
            }
            setReturnShow(false);
        }
        return (
            <View>
                <TouchableOpacity onPress={showReturnDatePicker}>
                    <Text style={styles.heading}>Return Date</Text>
                    <Input
                        inputContainerStyle={styles.inputContainer}
                        containerStyle={{ height: 50, paddingHorizontal: 0, borderBottomWidth: 0 }}
                        style={{ height: 50, paddingHorizontal: 0 }}
                        inputStyle={{ ...Fonts._14MontserratMedium, marginLeft: 10 }}
                        placeholder='Select Return Date'
                        placeholderTextColor={'#BABABA'}
                        // value={returnDate.toDateString()}
                        value={returnDate == '' ? '' : moment(returnDate).format('YYYY-MM-DD')}
                        editable={false}
                        rightIcon={
                            <Image source={require('../../../assests/images/calender.png')} style={{ height: SCREEN_WIDTH * 0.1, width: SCREEN_WIDTH * 0.1 }} />
                        }
                    />
                </TouchableOpacity>
                {returnShow && (
                    <DateTimePicker
                        value={returnDate instanceof Date ? returnDate : new Date()}
                        mode='date'
                        display='default'
                        onChange={onReturnDateChange}
                    />
                )}
            </View>
        );
    }

    function togglebtn() {
        return (
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        toggle === 1 && styles.activeToggleButton
                    ]}
                    onPress={() => setToggle(1)}
                >
                    <Text style={toggle === 1 ? styles.activeToggleText : styles.toggleText}>One Way</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        toggle === 2 && styles.activeToggleButton
                    ]}
                    onPress={() => setToggle(2)}
                >
                    <Text style={toggle === 2 ? styles.activeToggleText : styles.toggleText}>Round Way</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function locationflightoneway() {
        return (
            <View>
                <TouchableOpacity style={{ marginVertical: Sizes.fixPadding * 0.5 }} onPress={() => setDepartureModal(true)}>
                    <Text style={styles.heading}>Departure</Text>
                    <Input
                        value={departureData === null ? 'Search Origin' : departureData?.AIRPORTNAME}
                        disabled={true}
                        inputContainerStyle={styles.inputContainer}
                        containerStyle={{ height: 50, paddingHorizontal: 0, borderBottomWidth: 0 }}
                        style={{ height: 50, paddingHorizontal: 0 }}
                        inputStyle={{ ...Fonts._14MontserratMedium, marginLeft: 10 }}
                        placeholder='Enter Origin'
                        placeholderTextColor={'#BABABA'}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.arrowButton}
                >
                    <Image
                        source={require('../../../assests/images/flightarrow.png')}
                        style={styles.arrowImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{ bottom: Sizes.fixPadding }} onPress={() => setArrivalModal(true)}>
                    <Text style={{ ...styles.heading, marginVertical: 0, marginBottom: Sizes.fixPadding * 0.5 }}>
                        Arrival
                    </Text>
                    <Input
                        disabled={true}
                        value={arrivalData === null ? 'Search Origin' : arrivalData?.AIRPORTNAME}
                        inputContainerStyle={styles.inputContainer}
                        containerStyle={{ height: 50, paddingHorizontal: 0, borderBottomWidth: 0 }}
                        style={{ height: 50, paddingHorizontal: 0 }}
                        inputStyle={{ ...Fonts._14MontserratMedium, marginLeft: 10 }}
                        placeholder='Enter Destination'
                        placeholderTextColor={'#BABABA'}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    function Departuredate() {
        const showDatePicker = () => {
            setShow(true);
        };
        const onDateChange = (event, selectedDate) => {
            setShow(false);
            if (event.type === 'set') {
                console.log('adfasasa', selectedDate);
                setDate(selectedDate);
            }

        };
        return (
            <View>
                <TouchableOpacity onPress={showDatePicker} style={{}}>
                    <Text style={styles.heading}>Departure Date</Text>
                    <Input
                        inputContainerStyle={styles.inputContainer}
                        containerStyle={{ height: 50, paddingHorizontal: 0, borderBottomWidth: 0 }}
                        style={{ height: 50, paddingHorizontal: 0 }}
                        inputStyle={{ ...Fonts._14MontserratMedium, marginLeft: 10 }}
                        placeholder='Select Date'
                        placeholderTextColor={'#BABABA'}
                        // value={date.toDateString()}
                        value={date == '' ? '' : moment(date).format('YYYY-MM-DD')}
                        editable={false}
                        rightIcon={
                            <Image source={require('../../../assests/images/calender.png')} style={{ height: SCREEN_WIDTH * 0.1, width: SCREEN_WIDTH * 0.1 }} />
                        }
                    />
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        value={date instanceof Date ? date : new Date()}
                        mode='date'
                        display='default'
                        onChange={onDateChange}
                    />
                )}
            </View>
        );
    }
};
const mapStateToProps = state => ({
    airpotCities: state.flightReducer.airpotCities,
    customerdata: state.registrationReducer.customerdata,
    flightData: state.flightReducer.flightData
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Flight1);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    heading: {
        ...Fonts._14MontserratMedium,
        marginVertical: Sizes.fixPadding * 0.4,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#FFF6F1',
        marginHorizontal: Sizes.fixHorizontalPadding * 1.3,
        marginVertical: Sizes.fixPadding * 1.8,
        borderRadius: 20,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        overflow: 'hidden'
    },
    toggleContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        padding: Sizes.fixHorizontalPadding * 0.4,
        borderRadius: 5,
    },
    toggleButton: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixHorizontalPadding,
        borderRadius: 5,
        backgroundColor: Colors.white,
    },
    activeToggleButton: {
        backgroundColor: '#FBBC04',
    },
    toggleText: {
        ...Fonts._16MontserratRegular,
    },
    activeToggleText: {
        ...Fonts._16MontserratRegular,
    },
    inputContainer: {
        width: '100%',
        height: 50,
        borderRadius: Sizes.fixPadding * 0.5,
        paddingHorizontal: Sizes.fixPadding * 0.3,
        borderColor: Colors.grayA,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 0,
    },
    arrowButton: {
        height: SCREEN_WIDTH * 0.07,
        width: SCREEN_WIDTH * 0.07,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 100,
        borderColor: '#00000025',
        alignSelf: 'flex-end',
    },
    arrowImage: {
        height: SCREEN_WIDTH * 0.05,
        width: SCREEN_WIDTH * 0.05,
        resizeMode: 'contain',
    },
    modalContainer: {
        backgroundColor: Colors.white,
        padding: Sizes.fixHorizontalPadding * 3,
        borderTopRightRadius: Sizes.fixHorizontalPadding * 3,
        borderTopLeftRadius: Sizes.fixHorizontalPadding * 3,
    },
    modalHeader: {
        marginBottom: Sizes.fixPadding * 1.5,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 10,
    },
    listItem: {
        marginBottom: 10,
        borderBottomWidth: 1,
        paddingVertical: Sizes.fixPadding * 0.5,
        borderColor: '#00000030'
    },
    listText: {
        ...Fonts._14MontserratMedium,
        textAlign: 'center',
        textTransform: 'capitalize'
    }
});
