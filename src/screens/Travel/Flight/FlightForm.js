import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MyStatusBar from "../../../components/StatusBar";
import { Colors, Sizes, Fonts, SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../assests/style";
import Loader2 from "../../../components/Loader2";
import Header from "../../../components/Header";
import { FlatList } from "react-native";
import { BottomSheet, Input } from "@rneui/themed";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import moment from "moment";
import { cabinclass } from "../../../config/data";
import { ScrollView } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { CheckBox } from "react-native-elements";
import Button from "../../../components/Button";
import { connect } from "react-redux";
import { fetchAndStoreIPv4Address } from "../../../components/NetworkHelper";
import { showToastMessage } from "../../../utils/services";
import * as FlightActions from "../../../redux/actions/FlightActions"
import axios from 'axios';
import CitySearch from "./SSR/cyrus/CitySearch";
import Cyrus from "./SSR/cyrus/Cyrus";
import { responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";

const FlightForm = ({ navigation, departureTo, departureFrom, dispatch, passengers }) => {

    // console.log(departureFrom)
    const [delhiDepartureFrom, setDelhiDepartureFrom] = useState({
        AIRPORTCODE: "DEL",
        AIRPORTNAME: "Indira Gandhi Airport",
        CITYCODE: "DEL",
        CITYNAME: "Delhi",
        COUNTRYCODE: "IN",
        COUNTRYNAME: "India",
    });
    console.log(delhiDepartureFrom, departureFrom, ">>>>")

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
        searchTerm: "",
        ipv4Address: "",
    });
    useEffect(() => {
        const initializeIPv4Address = async () => {
            const ip = await fetchAndStoreIPv4Address();
            updateState({ ipv4Address: ip })
        };

        initializeIPv4Address();
    }, []);
    const getTotalAdults = () => {
        return passengers.filter(item => item.type === 'Adult').length
    }

    const getTotalLength = () => {
        return passengers.length;
    }


    const getTotalChildren = () => {
        return passengers.filter(item => item.type === 'Child').length
    }

    const getTotalInfant = () => {
        return passengers.filter(item => item.type === 'Infant').length
    }

    const updateState = (data) => {
        setState((prevState) => {
            const newData = { ...prevState, ...data };
            return newData;
        });
    };

    const {
        toggle,

        date,
        returnDate,
        selectedId,
        adults,
        children,
        infants,
        classModalVisible,
        directChecked,
        classdata,
        ipv4Address,
    } = state;
    const [newToggle, setNewToggle] = useState(false);


    const [rotateDepartureFrom, setRotateDepartureFrom] = useState(departureFrom == null ? delhiDepartureFrom?.CITYNAME : departureFrom?.CITYNAME);

    useEffect(() => {
        setRotateDepartureFrom(departureFrom == null ? delhiDepartureFrom?.CITYNAME : departureFrom?.CITYNAME);
    }, [departureFrom, delhiDepartureFrom]);
    const [rotateDepartureTo, setRotateDepartureTo] = useState(departureTo === null ? 'Search Origin' : departureTo?.CITYNAME);

    const [originCode, setOriginCode] = useState(departureFrom === null ? delhiDepartureFrom?.AIRPORTCODE : departureFrom?.AIRPORTCODE || '');
    useEffect(() => {
        setOriginCode(departureFrom === null ? delhiDepartureFrom?.AIRPORTCODE : departureFrom?.AIRPORTCODE || '');
    }, [departureFrom, delhiDepartureFrom]);
    const [destinationCode, setDestinationCode] = useState(departureTo?.AIRPORTCODE || '');

    const [rotated, setRotated] = useState(false);
    const rotation = useRef(new Animated.Value(0)).current;

    const rotateImage = () => {
        const toValue = rotated ? 0 : 1;

        Animated.timing(rotation, {
            toValue,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            setRotated(!rotated);
        });

        // Swap the values (optional)
        setRotateDepartureFrom((prev) => {
            const newFrom = rotateDepartureTo;
            setRotateDepartureTo(rotateDepartureFrom);
            return newFrom;
        });

        setOriginCode((prev) => {
            const newFrom = destinationCode;
            setDestinationCode(originCode);
            return newFrom;
        });
    };

    useEffect(() => {
        console.log("Updated Origin Code:", originCode);
        console.log("Updated Destination Code:", destinationCode);
    }, [originCode, destinationCode]);

    // Update destinationCode when departureTo changes
    useEffect(() => {
        if (departureTo) {
            setRotateDepartureTo(departureTo?.CITYNAME);
            setDestinationCode(departureTo?.AIRPORTCODE || '');
        } else {
            setDestinationCode(''); // Fallback if departureTo is null
        }
    }, [departureTo]);

    const rotateInterpolate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const animatedStyle = {
        transform: [{ rotate: rotateInterpolate }],
    };


    return (
        <View style={styles.container}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
            {/* <Loader2 isLoading={loading} /> */}
            <Header title={'Flight'} tintColor={Colors.white} />
            {/* {toggleMainButtonInfo()} */}
            <View style={styles.contentContainer}>
                <FlatList
                    ListHeaderComponent={
                        newToggle ? (
                            <>
                                {cyrusApi()}
                            </>

                        ) : (
                            <>
                                {togglebuttonInfo()}
                                <View style={{ flex: 1 }}>
                                    {locationflightoneway()}
                                    {departureDateInfo()}
                                    {toggle && returnDateInfo()}
                                    {classflightInfo()}
                                    {/* {faredetails()} */}
                                    {personCountInfo()}
                                    {directFlightsoption()}
                                    {proceedButtonInfo()}
                                </View>
                            </>
                        )
                    }
                    showsVerticalScrollIndicator={false}
                />
                {classModalInfo()}
            </View>

        </View>
    );


    function classModalInfo() {
        return (
            <BottomSheet
                isVisible={classModalVisible}
                onBackdropPress={() => updateState({ classModalVisible: false })}
            >
                <View style={[styles.modalContainer, { height: 350 }]}>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={require('../../../assests/images/homerectangle.png')} tintColor={'#E0DCDC'} />
                    </View>
                    <View style={styles.modalHeader}>
                        <Text style={{ ...Fonts._20MontserratMedium, letterSpacing: 0.6 }}>
                            Select Your Cabin Class
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => updateState({ classModalVisible: false })}
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
                                    key={index}
                                    style={styles.listItem}
                                    onPress={() => updateState({ classModalVisible: false, classdata: item })}
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

    function proceedButtonInfo() {
        const flightSearch = () => {
            if (!departureTo) {
                showToastMessage({ message: 'Please select arrival location' })
                return
            } else if (!date) {
                showToastMessage({ message: 'Please select departure date' })
                return
                // } else if (!classdata) {
                //     showToastMessage({ message: 'Please select cabin class' })
                //     return
                // } else if (getTotalAdults() == 0) {
                //     showToastMessage({ message: 'Please select an adults' })
                //     return
            } else {
                const payload = {
                    EndUserIp: "192.168.29.120",
                    AdultCount: getTotalAdults() + 1 || 1,
                    ChildCount: getTotalChildren(),
                    InfantCount: getTotalInfant(),
                    DirectFlight: directChecked,
                    OneStopFlight: false,
                    JourneyType: !toggle ? 1 : 2,
                    PreferredAirlines: null,
                    // isInternational: departureFrom?.COUNTRYCODE !== departureTo?.COUNTRYCODE,
                    isInternational:
                        (departureFrom === null ? delhiDepartureFrom?.COUNTRYCODE : departureFrom?.COUNTRYCODE) !==
                        departureTo?.COUNTRYCODE,
                    Segments: [
                        {
                            Origin: originCode,
                            Destination: destinationCode,
                            FlightCabinClass: classdata?.id || 2,
                            PreferredDepartureTime: moment(date).format('YYYY-MM-DD'),
                            PreferredArrivalTime: '',
                        }
                    ],
                    Sources: null,
                }
                if (toggle) {
                    payload.Segments = [
                        {
                            Origin: originCode,
                            Destination: destinationCode,
                            FlightCabinClass: classdata?.id || 2,
                            PreferredDepartureTime: moment(date).format('YYYY-MM-DD'),
                            PreferredArrivalTime: '',
                        },
                        {
                            Origin: destinationCode,
                            Destination: originCode,
                            FlightCabinClass: classdata?.id || 2,
                            PreferredDepartureTime: moment(returnDate).format('YYYY-MM-DD'),
                            PreferredArrivalTime: '',
                        }
                    ]
                }
                console.log("flight input", payload)
                dispatch(FlightActions.getFlightListData(payload));
            }

        }


        return (
            <View style={{ marginTop: Sizes.fixPadding }}>
                <Button title={'Search'} onPress={() => flightSearch()} />
            </View>
        )
    }

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
                    onPress={() => updateState({ directChecked: !directChecked })}
                    checkedColor={Colors.primaryTheme}
                />
                <Text style={{ ...Fonts._13MontserratRegular }}>
                    Non Stop Flight
                </Text>
            </View>
        )
    }

    function personCountInfo() {
        const addRemoveAdults = (type) => {
            if (type === 'ADD') {
                if (getTotalLength() >= 9) {
                    showToastMessage({ message: 'Maximum of 9 passengers allowed' });
                    return;
                }
                const data = {
                    type: 'Adult',
                    value: getTotalAdults() + 1,
                    indexValue: getTotalLength(),
                    genderType: 'Mr',
                    firstName: '',
                    lastName: '',
                    opened: false,
                    seatCode: null,
                    mealCode: null,
                    PassportNo: '',
                    PassportExpiry: null,
                    PassportIssueDate: null
                }
                if (passengers.length == 0) {
                    data.opened = true
                }
                const payload = [
                    ...passengers,
                    data
                ];

                dispatch(FlightActions.setFilightPassenger(payload));
            } else if (type === 'REMOVE') {
                const lastAdultIndex = passengers.map(p => p.type).lastIndexOf('Adult');
                if (lastAdultIndex !== -1) {
                    const payload = passengers.filter((_, index) => index !== lastAdultIndex);
                    dispatch(FlightActions.setFilightPassenger(payload));
                }
            }
        };

        const addRemoveChild = (type) => {
            if (type === 'ADD') {
                if (getTotalLength() >= 9) {
                    showToastMessage({ message: 'Maximum of 9 passengers allowed' });
                    return;
                }
                const payload = [
                    ...passengers,
                    {
                        type: 'Child',
                        value: getTotalChildren() + 1,
                        indexValue: getTotalLength(),
                        genderType: 'Mstr',
                        firstName: '',
                        lastName: '',
                        opened: false,
                        dob: null,
                        PassportNo: '',
                        PassportExpiry: null,
                        PassportIssueDate: null
                    }
                ];
                dispatch(FlightActions.setFilightPassenger(payload));
            } else if (type === 'REMOVE') {
                const lastChildIndex = passengers.map(p => p.type).lastIndexOf('Child');
                if (lastChildIndex !== -1) {
                    const payload = passengers.filter((_, index) => index !== lastChildIndex);
                    dispatch(FlightActions.setFilightPassenger(payload));
                }
            }
        };

        const addRemoveInfant = (type) => {
            if (type === 'ADD') {
                if (getTotalLength() >= 9) {
                    showToastMessage({ message: 'Maximum of 9 passengers allowed' });
                    return;
                }
                const payload = [
                    ...passengers,
                    {
                        type: 'Infant',
                        value: getTotalInfant() + 1,
                        indexValue: getTotalLength(),
                        genderType: 'Mstr',
                        firstName: '',
                        lastName: '',
                        opened: false,
                        dob: null,
                        PassportNo: '',
                        PassportExpiry: null,
                        PassportIssueDate: null
                    }
                ];
                dispatch(FlightActions.setFilightPassenger(payload));
            } else if (type === 'REMOVE') {
                const lastInfantIndex = passengers.map(p => p.type).lastIndexOf('Infant');
                if (lastInfantIndex !== -1) {
                    const payload = passengers.filter((_, index) => index !== lastInfantIndex);
                    dispatch(FlightActions.setFilightPassenger(payload));
                }
            }
        };

        return (
            <View style={styles.countContainer}>

                <View style={styles.countContainerChild}>
                    <Text style={{ ...Fonts._13MontserratRegular }}>Adults</Text>
                    <View style={styles.countContainerChildItem}>
                        <TouchableOpacity style={[styles.countButton, { borderColor: getTotalAdults() === 0 ? Colors.grayC : Colors.grayA }]}
                            onPress={() => addRemoveAdults('REMOVE')}
                            disabled={getTotalAdults() === 0}
                        >
                            <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>-</Text>
                        </TouchableOpacity>
                        <Text style={{ ...Fonts._13MontserratMedium, color: '#530201' }}>{getTotalAdults() ? getTotalAdults() + 1 : 1}</Text>
                        <TouchableOpacity style={styles.countButton}
                            onPress={() => addRemoveAdults('ADD')}
                        >
                            <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>



                <View style={styles.countContainerChild}>
                    <Text style={{ ...Fonts._13MontserratRegular }}>Children</Text>
                    <View style={styles.countContainerChildItem}

                    >
                        <TouchableOpacity style={[styles.countButton, { borderColor: getTotalChildren() === 0 ? Colors.grayC : Colors.grayA }]}
                            onPress={() => addRemoveChild('REMOVE')}
                            disabled={getTotalChildren() === 0}>
                            <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>-</Text>
                        </TouchableOpacity>
                        <Text style={{ ...Fonts._13MontserratMedium, color: '#530201' }}>{getTotalChildren()}</Text>
                        <TouchableOpacity style={[styles.countButton]}
                            onPress={() => addRemoveChild('ADD')}
                        >
                            <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>



                <View style={styles.countContainerChild}>
                    <Text style={{ ...Fonts._13MontserratRegular }}>Infant</Text>
                    <View style={styles.countContainerChildItem}>
                        <TouchableOpacity style={[styles.countButton, { borderColor: getTotalInfant() === 0 ? Colors.grayC : Colors.grayA }]}
                            onPress={() => addRemoveInfant('REMOVE')}
                            disabled={getTotalInfant() === 0}
                        >
                            <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>-</Text>
                        </TouchableOpacity>
                        <Text style={{ ...Fonts._13MontserratMedium, color: '#530201' }}>{getTotalInfant()}</Text>
                        <TouchableOpacity style={[styles.countButton, { borderColor: getTotalInfant() === getTotalAdults() ? Colors.grayC : Colors.grayA }]}
                            onPress={() => addRemoveInfant('ADD')}
                            disabled={getTotalInfant() === getTotalAdults()}
                        >
                            <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        )
    }

    function classflightInfo() {

        return (
            <TouchableOpacity style={{ marginBottom: Sizes.fixPadding * 0.6 }} onPress={() => updateState({ classModalVisible: true })} >
                <Text style={styles.heading}>Select Class</Text>
                <Input
                    value={classdata === null ? 'Economy' : classdata?.name}
                    disabled
                    inputContainerStyle={styles.inputContainer}
                    containerStyle={{ height: 50, paddingHorizontal: 0, opacity: 1, }}
                    inputStyle={{ ...Fonts._14MontserratMedium, marginLeft: 10, color: "#530201", }}
                    placeholder='Economy'
                    placeholderTextColor={'#530201'}

                />
            </TouchableOpacity>
        )
    }

    function returnDateInfo() {
        const onChange = (event, date) => {
            if (event.type === 'set') {
                updateState({ returnDate: date })
            }
        }
        const onDatePick = () => {
            DateTimePickerAndroid.open({
                value: returnDate ?? new Date(),
                display: 'calendar',
                mode: 'date',
                minimumDate: date ?? new Date(),
                onChange
            })
        }
        return (
            <View>
                <TouchableOpacity onPress={onDatePick}>
                    <Text style={styles.heading}>Return Date</Text>
                    <Input
                        inputContainerStyle={styles.inputContainer}
                        containerStyle={{ height: 50, paddingHorizontal: 0, borderBottomWidth: 0 }}
                        style={{ height: 50, paddingHorizontal: 0, opacity: 1 }}
                        inputStyle={{ ...Fonts._14MontserratMedium, marginLeft: 10, color: '#530201' }}
                        placeholder='Select Return Date'
                        placeholderTextColor={'#530201'}
                        // value={returnDate.toDateString()}
                        value={!returnDate ? '' : moment(returnDate).format('DD-MM-YYYY')}
                        editable={false}
                        rightIcon={
                            <Image source={require('../../../assests/images/calender.png')} style={{ height: SCREEN_WIDTH * 0.1, width: SCREEN_WIDTH * 0.1 }} />
                        }
                    />
                </TouchableOpacity>
            </View>
        );
    }

    function departureDateInfo() {
        const onChange = (event, date) => {
            if (event.type === 'set') {
                updateState({ date })
            }
        }
        const onDatePick = () => {
            DateTimePickerAndroid.open({
                value: date ?? new Date(),
                display: 'calendar',
                mode: 'date',
                minimumDate: new Date(),
                onChange
            })
        }

        return (
            <View>
                <TouchableOpacity onPress={onDatePick} style={{}}>
                    <Text style={styles.heading}>Departure Date</Text>
                    <Input
                        inputContainerStyle={styles.inputContainer}
                        containerStyle={{ height: 50, paddingHorizontal: 0, borderBottomWidth: 0 }}
                        style={{ height: 50, paddingHorizontal: 0, opacity: 1 }}
                        inputStyle={{ ...Fonts._14MontserratMedium, marginLeft: 10, color: '#530201' }}
                        placeholder='Select Date'
                        placeholderTextColor={'#530201'}
                        // value={date.toDateString()}
                        value={!date ? '' : moment(date).format('DD-MM-YYYY')}
                        editable={false}
                        rightIcon={
                            <Image source={require('../../../assests/images/calender.png')} style={{ height: SCREEN_WIDTH * 0.1, width: SCREEN_WIDTH * 0.1 }} />
                        }
                    />
                </TouchableOpacity>
            </View>
        );
    }

    function locationflightoneway() {
        return (
            <View>
                <TouchableOpacity style={{ marginVertical: Sizes.fixPadding * 0.5, marginBottom: Sizes.fixPadding * 2 }} onPress={() => navigation.navigate('flightSearch', { type: 'departureFrom' })}>
                    <Text style={styles.heading}>From</Text>
                    <Input
                        // value={departureFrom === null ? 'Search Origin' : departureFrom?.AIRPORTNAME}
                        value={rotateDepartureFrom}
                        disabled={true}
                        inputContainerStyle={styles.inputContainer}
                        containerStyle={{ height: 50, paddingHorizontal: 0, borderBottomWidth: 0 }}
                        style={{ height: 50, paddingHorizontal: 0, opacity: 1, }}
                        inputStyle={{ ...Fonts._14MontserratMedium, marginLeft: 10, color: "#530201", }}
                        placeholder='Enter Origin'
                        placeholderTextColor={'#530201'}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginBottom: 25 }} onPress={rotateImage}>
                    <Animated.Image
                        source={require('../../../assests/images/switcher.png')}
                        style={[styles.image, animatedStyle]}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{ bottom: Sizes.fixPadding }} onPress={() => navigation.navigate('flightSearch', { type: 'departureTo' })}>
                    <Text style={{ ...styles.heading, marginVertical: 0, marginBottom: Sizes.fixPadding * 0.5 }}>
                        To
                    </Text>
                    <Input
                        disabled={true}
                        value={rotateDepartureTo}
                        inputContainerStyle={styles.inputContainer}
                        containerStyle={{ height: 50, paddingHorizontal: 0, borderBottomWidth: 0 }}
                        style={{ height: 50, paddingHorizontal: 0, opacity: 1 }}
                        inputStyle={{ ...Fonts._14MontserratMedium, marginLeft: 10, color: '#530201' }}
                        placeholder='Enter Destination'
                        placeholderTextColor={'#530201'}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    function togglebuttonInfo() {
        return (
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[
                        styles.toggleButton,

                        !toggle && styles.activeToggleButton
                    ]}
                    onPress={() => updateState({ toggle: false })}
                >
                    <Text style={!toggle ? styles.activeToggleText : styles.toggleText}>One Way</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        toggle && styles.activeToggleButton
                    ]}
                    onPress={() => updateState({ toggle: true })}
                >
                    <Text style={toggle ? styles.activeToggleText : styles.toggleText}>Round Way</Text>
                </TouchableOpacity>
            </View>
        );
    }
    function toggleMainButtonInfo() {
        return (
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[
                        styles.toggleButton,

                        !newToggle && styles.activeToggleButton
                    ]}
                    onPress={() => setNewToggle(false)}
                >
                    <Text style={!newToggle ? styles.activeToggleText : styles.toggleText}>TBO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        newToggle && styles.activeToggleButton
                    ]}
                    onPress={() => setNewToggle(true)}
                >
                    <Text style={newToggle ? styles.activeToggleText : styles.toggleText}>Cyrus</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function cyrusApi() {
        return (
            <>
                <Cyrus />
            </>

        )
    }

};

const mapStateToProps = state => ({
    departureFrom: state.flightReducer.departureFrom,
    departureTo: state.flightReducer.departureTo,
    passengers: state.flightReducer.passengers
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(FlightForm);

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
        // borderWidth:2,
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
    },
    countContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden'
    },
    countContainerChild: {
        justifyContent: 'center', alignItems: 'center', width: SCREEN_WIDTH * 0.25,
    },
    countContainerChildItem: {
        width: SCREEN_WIDTH * 0.25, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: Sizes.fixPadding * 0.5, backgroundColor: Colors.white, borderRadius: 10, elevation: 2, borderColor: '#00000025', borderWidth: 1, marginTop: Sizes.fixPadding * 0.5
    },
    countButton: {
        height: SCREEN_WIDTH * 0.07, width: SCREEN_WIDTH * 0.07, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 100, borderColor: Colors.grayA
    },
    cyrusInput: {
        backgroundColor: "#ffffff",
        paddingHorizontal: 20,
        borderRadius: 7,
        marginTop: 5,
        width: "100%"
    },
    cyrusView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    cyrusSubView: {
        width: "48%"
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        marginLeft: 4,

    },
    modalView: {
        flex: 1,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    airportItem: {
        padding: 10,
        fontSize: 16,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
    image: {
        width: 30,
        height: 30,
        alignSelf: 'center',
        objectFit: "contain"
    },
});
