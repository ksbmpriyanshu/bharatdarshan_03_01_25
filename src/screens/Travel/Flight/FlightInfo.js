import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
    Colors,
    Sizes,
    Fonts,
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
} from "../../../assests/style";
import MyStatusBar from "../../../components/StatusBar";
import { goBack, navigate } from "../../../navigations/NavigationServices";
import { connect } from "react-redux";
import { DurationComponent, formatFlightTime, showNumber } from "../../../utils/services";
import moment from "moment";
import Loader2 from "../../../components/Loader2";
import * as FlightActions from "../../../redux/actions/FlightActions";
import ReturnFlights from "./components/ReturnFlights";
import ReturnFlightFooter from "./components/ReturnFlightFooter";
import DateFilters from "./components/DateFilters";
import Filters from "./components/Filters";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const FlightInfo = ({
    route,
    flightListData,
    dispatch,
    departureFrom,
    departureTo,
    customerData
}) => {
    const FlightSearchParameter = route.params?.payload;
    const [selectedid, setSelectedId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isNonStop, setIsNonStop] = useState(
        FlightSearchParameter?.DirectFlight ?? false
    );
  console.log("flightListData",flightListData)
    useEffect(() => {
        return () => {
            dispatch(FlightActions.setFlightData(null));
            dispatch(FlightActions.setFlightReturnData(null));
            dispatch(FlightActions.getFlightListData(null));
            dispatch(FlightActions.setSelectedFlight(null));
            dispatch(FlightActions.setSelectedReturnFlight(null));
        };
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar
                backgroundColor={Colors.primaryTheme}
                barStyle={"light-content"}
            />
            {/* <Header title={'Flights Details'} tintColor={Colors.white} /> */}
            <Loader2 isLoading={loading} />
            <View style={{ flex: 1, padding: Sizes.fixHorizontalPadding }}>
                {placeshow()}
                {FlightSearchParameter?.JourneyType == 1 && (
                    <DateFilters payload={route?.params?.payload} />
                )}
                <Filters payload={route?.params?.payload} />
                {/* {fliteralldata()} */}
                {FlightSearchParameter?.JourneyType == 2 && flightDestinationInfo()}
                {FlightSearchParameter?.JourneyType == 2
                    ? FlightSearchParameter?.isInternational
                        ? internationalReturnFlightsInfo()
                        : returnFlightInfo()
                    : flightsPlans()}
            </View>
            {FlightSearchParameter?.JourneyType == 2 &&
                !FlightSearchParameter?.isInternational && <ReturnFlightFooter />}
        </SafeAreaView>
    );

    function internationalReturnFlightsInfo() {
        const onPress = (item) => {
            console.log(item)
            navigate("flightTravelDetails", {
                TraceId: flightListData?.TraceId,
                ResultIndex1: item?.ResultIndex,
                ResultIndex2: null,
                type: "normal",
            });
        };

        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>onPress(item)}
                    style={{
                        borderColor: "#E0DFDF",
                        marginBottom: Sizes.fixPadding,
                        elevation: 5,
                        backgroundColor: Colors.white,
                        borderRadius: Sizes.fixPadding,
                        marginHorizontal: Sizes.fixPadding * 0.5,
                        shadowColor: Colors.grayA,
                        overflow: 'hidden',
                        paddingTop: Sizes.fixPadding * 0.5
                    }}
                >
                    {item?.Segments &&
                        item?.Segments.map((ele, j) => {
                            return (
                                <View key={j} style={{ paddingHorizontal: Sizes.fixPadding, }}>
                                    <View style={styles.childContainer}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image source={require('../../../assests/images/airpot.png')} style={{ width: 18, height: 18 }} />
                                            <Text style={{ ...Fonts._11MontserratMedium, marginLeft: Sizes.fixHorizontalPadding * 0.5, fontSize: 9 }}>{ele[0]?.Airline?.AirlineName}</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.childContainer, {}]}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: 12 }}>{moment(ele[0]?.Origin?.DepTime).format('hh:mm')}</Text>
                                            <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: 12 }}>{moment(ele[0]?.Origin?.DepTime).format('A')}</Text>
                                        </View>

                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ ...Fonts._11MontserratMedium }}>{formatFlightTime(ele[0]?.Duration)}</Text>
                                            <MaterialIcons name='flight-takeoff' color={Colors.black} size={20} />
                                            <Text style={{ ...Fonts._11MontserratMedium }}>Non Stop</Text>
                                        </View>

                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: 12 }}>{moment(ele[0]?.Destination?.ArrTime).format('hh:mm')}</Text>
                                            <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: 12 }}>{moment(ele[0]?.Destination?.ArrTime).format('A')}</Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                    <View
                        style={{
                            alignItems: "flex-end",
                            backgroundColor: Colors.orange,
                            padding: Sizes.fixPadding*0.5
                        }}
                    >
                        <Text style={{ ...Fonts._14MontserratMedium, color: Colors.white }}>
                            {showNumber(item?.Fare?.BaseFare + item?.Fare?.Tax)}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        };
        return (
            <View
                style={{
                    marginVertical: Sizes.fixPadding,
                    height: SCREEN_HEIGHT * 0.85,
                }}
            >
                <FlatList
                    data={flightListData?.Results[0]}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={10}
                    contentContainerStyle={{
                        paddingBottom: 60,
                        paddingTop: Sizes.fixPadding,
                    }}
                />
            </View>
        );
    }

    function returnFlightInfo() {
        const renderFlights = ({ item, index }) => {
            return <ReturnFlights data={item} type={"normal"} />;
        };

        const renderReturnFlights = ({ item, index }) => {
            return <ReturnFlights data={item} type={"return"} />;
        };

        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <View style={{ flex: 0.5, height: SCREEN_HEIGHT * 0.75 }}>
                    <FlatList
                        data={flightListData?.Results[0]}
                        renderItem={renderFlights}
                        initialNumToRender={5}
                        maxToRenderPerBatch={5}
                        contentContainerStyle={{
                            paddingTop: Sizes.fixPadding,
                            paddingBottom: 70,
                        }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <View style={{ flex: 0.5, height: SCREEN_HEIGHT * 0.75 }}>
                    <FlatList
                        data={flightListData?.Results[1]}
                        renderItem={renderReturnFlights}
                        initialNumToRender={5}
                        maxToRenderPerBatch={5}
                        contentContainerStyle={{
                            paddingTop: Sizes.fixPadding,
                            paddingBottom: 70,
                        }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        );
    }

    function flightDestinationInfo() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#fff8f7",
                    width: "96%",
                    alignSelf: "center",
                    padding: Sizes.fixPadding * 0.5,
                    borderRadius: Sizes.fixPadding * 0.5,
                }}
            >
                <View
                    style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}
                >
                    <Text style={{ ...Fonts._14MontserratBold }}> 
                        {flightListData?.Origin} - {flightListData?.Destination}
                    </Text>
                    <Text style={{ ...Fonts._12MontserratMedium, color: Colors.grayA }}>
                        {moment(new Date()).format("DD-MM YYYY")}
                    </Text>
                </View>
                <View
                    style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}
                >
                    <Text style={{ ...Fonts._14MontserratBold }}>
                        {flightListData?.Destination} - {flightListData?.Origin}
                    </Text>
                    <Text style={{ ...Fonts._12MontserratMedium, color: Colors.grayA }}>
                        {moment(new Date()).format("DD-MM YYYY")}
                    </Text>
                </View>
            </View>
        );
    }

    function flightsPlans() {
        const onPress = (item) => {
            dispatch(FlightActions.setFlightContactDetails({
                phoneNumber: customerData?.phone,
                email : customerData?.email,
                city : customerData?.city,
                address : customerData?.address
            }))
            navigate("flightTravelDetails", {
                TraceId: flightListData?.TraceId,
                ResultIndex1: item?.ResultIndex,
                ResultIndex2: null,
                type: "normal",
            });
        };

        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottomWidth: 1,
                        borderColor: "#E0DFDF",
                        paddingBottom: Sizes.fixHorizontalPadding * 1.5,
                        paddingTop: Sizes.fixHorizontalPadding * 0.6,
                    }}
                    onPress={() => onPress(item)}
                >
                    <View
                        style={{
                            width: SCREEN_WIDTH * 0.25,
                            overflow: "hidden",
                            alignItems: "center",
                            overflow: "hidden",
                        }}
                    >
                        {/* <Image source={item?.image}/> */}
                        <Text
                            numberOfLines={2}
                            style={{ ...Fonts._12MontserratRegular, color: "#636363" }}
                        >
                            {item?.Segments[0][0]?.Airline?.AirlineName}
                        </Text>
                    </View>
                    <View
                        style={{
                            width: SCREEN_WIDTH * 0.5,
                            overflow: "hidden",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ ...Fonts._14MontserratRegular }}>
                                {moment(item?.Segments[0][0]?.Origin?.DepTime).format("HH:mm")}
                            </Text>
                            <Text
                                style={{
                                    ...Fonts._18MontserratRegular,
                                    marginHorizontal: Sizes.fixHorizontalPadding * 0.6,
                                }}
                            >
                                -
                            </Text>
                            <Text style={{ ...Fonts._14MontserratRegular }}>
                                {moment(item?.Segments[0][0]?.Destination?.ArrTime).format(
                                    "HH:mm"
                                )}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <DurationComponent
                                duration={item?.Segments[0][0]?.Duration}
                                style={{ ...Fonts._13MontserratRegular, color: "#636363" }}
                            />
                            <Text
                                style={{
                                    ...Fonts._13MontserratRegular,
                                    color: "#636363",
                                    marginHorizontal: Sizes.fixHorizontalPadding,
                                }}
                            >
                                |
                            </Text>
                            <Text style={{ ...Fonts._13MontserratRegular, color: "#636363" }}>
                                {item?.Segments[0].length == 2 ? "Stopage" : "Non-Stop"}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            width: SCREEN_WIDTH * 0.25,
                            overflow: "hidden",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text style={{ ...Fonts._14MontserratMedium }}>
                            {showNumber(item?.Fare?.BaseFare + item?.Fare?.Tax)}
                        </Text>
                        {item?.Segments[0][0]?.NoOfSeatAvailable <= 8 &&
                            item?.Segments[0][0]?.NoOfSeatAvailable >= 2 ? (
                            <Text style={{ ...Fonts._11MontserratRegular, color: "#FF0000" }}>
                                {item?.Segments[0][0]?.NoOfSeatAvailable} seats left
                            </Text>
                        ) : item?.Segments[0][0]?.NoOfSeatAvailable == 1 ? (
                            <Text style={{ ...Fonts._11MontserratRegular, color: "#FF0000" }}>
                                {item?.Segments[0][0]?.NoOfSeatAvailable} seat left
                            </Text>
                        ) : null}
                        {/* <Text style={{...Fonts._14MontserratRegular,color:'#FF0000'}}>
                    {item?.Segments[0][0]?.NoOfSeatAvailable} seat left
                </Text> */}
                    </View>
                </TouchableOpacity>
            );
        };
        return (
            <View
                style={{
                    marginVertical: Sizes.fixPadding,
                    height: SCREEN_HEIGHT * 0.85,
                }}
            >
                <FlatList
                    data={flightListData?.Results[0]}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={10}
                    contentContainerStyle={{ paddingBottom: 60 }}
                />
            </View>
        );
    }

    function fliteralldata() {
        const handleStoppage = () => {
            const payload = {
                EndUserIp: FlightSearchParameter?.EndUserIp,
                AdultCount: FlightSearchParameter?.AdultCount,
                ChildCount: FlightSearchParameter?.ChildCount,
                InfantCount: FlightSearchParameter?.InfantCount,
                DirectFlight: false,
                OneStopFlight: true,
                JourneyType: FlightSearchParameter?.JourneyType,
                PreferredAirlines: null,
                Origin: FlightSearchParameter?.Origin,
                Destination: FlightSearchParameter?.Destination,
                FlightCabinClass: FlightSearchParameter?.FlightCabinClass,
                PreferredDepartureTime: FlightSearchParameter?.PreferredDepartureTime,
                PreferredArrivalTime: FlightSearchParameter?.PreferredArrivalTime,
                Sources: null,
                departureData: FlightSearchParameter?.departureData,
                arrivalData: FlightSearchParameter?.arrivalData,
                classdata: FlightSearchParameter?.classdata,
            };
            dispatch(FlightActions.getFlightListData(payload));
        };

        const handleDirect = () => {
            const payload = {
                EndUserIp: FlightSearchParameter?.EndUserIp,
                AdultCount: FlightSearchParameter?.AdultCount,
                ChildCount: FlightSearchParameter?.ChildCount,
                InfantCount: FlightSearchParameter?.InfantCount,
                DirectFlight: true,
                OneStopFlight: false,
                JourneyType: FlightSearchParameter?.JourneyType,
                PreferredAirlines: null,
                Origin: FlightSearchParameter?.Origin,
                Destination: FlightSearchParameter?.Destination,
                FlightCabinClass: FlightSearchParameter?.FlightCabinClass,
                PreferredDepartureTime: FlightSearchParameter?.PreferredDepartureTime,
                PreferredArrivalTime: FlightSearchParameter?.PreferredArrivalTime,
                Sources: null,
                departureData: FlightSearchParameter?.departureData,
                arrivalData: FlightSearchParameter?.arrivalData,
                classdata: FlightSearchParameter?.classdata,
            };
            dispatch(FlightActions.getFlightListData(payload));
        };

        const handlePress = () => {
            if (isNonStop) {
                handleStoppage();
            } else {
                handleDirect();
            }
            setIsNonStop(!isNonStop);
        };
        return (
            <View style={{ marginBottom: Sizes.fixPadding }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: "#F1F1F1",
                        width: SCREEN_WIDTH * 0.3,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: Sizes.fixPadding * 0.7,
                        borderRadius: 50,
                    }}
                    activeOpacity={0.5}
                    onPress={handlePress}
                >
                    <Text style={{ ...Fonts._13MontserratRegular }}>
                        {isNonStop ? "Stoppage" : "Non-stop"}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    function datewiseFlights() {
        data = [
            {
                id: 1,
                name: "Tue,Jun 18",
                amount: "₹ 4,064",
            },
            {
                id: 2,
                name: "Tue,Jun 18",
                amount: "₹ 4,064",
            },
            {
                id: 3,
                name: "Tue,Jun 18",
                amount: "₹ 4,064",
            },
            {
                id: 4,
                name: "Tue,Jun 18",
                amount: "₹ 4,064",
            },
            {
                id: 5,
                name: "Tue,Jun 18",
                amount: "₹ 4,064",
            },
        ];
        renderItem = ({ item }) => {
            const isSelected = item?.id == selectedid;
            return (
                <TouchableOpacity
                    style={{ alignItems: "center", marginRight: Sizes.fixPadding }}
                    onPress={() => {
                        setSelectedId(item?.id);
                    }}
                >
                    <Text
                        style={{
                            ...Fonts._12MontserratRegular,
                            color: isSelected ? Colors.black : "#00000060",
                        }}
                    >
                        {item?.name}
                    </Text>
                    <Text
                        style={{
                            ...Fonts._12MontserratRegular,
                            color: isSelected ? Colors.black : "#00000060",
                        }}
                    >
                        {item?.amount}
                    </Text>
                </TouchableOpacity>
            );
        };
        return (
            <View style={{ marginVertical: Sizes.fixPadding }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item?.id.toString()}
                />
            </View>
        );
    }

    function placeshow() {
        return (
            <View
                style={{
                    borderWidth: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: 100,
                    borderColor: "#E6E6E6",
                    padding: Sizes.fixPadding * 0.6,
                    marginBottom: Sizes.fixHorizontalPadding,
                    backgroundColor: Colors.white,
                    zIndex: 1,
                }}
            >
                <TouchableOpacity onPress={() => goBack()}>
                    <Image
                        source={require("../../../assests/icons/backarrow.png")}
                        style={{ height: SCREEN_WIDTH * 0.1, width: SCREEN_WIDTH * 0.1 }}
                    />
                </TouchableOpacity>
                <View style={{ alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={styles.flighttxt}>
                            {flightListData?.Origin}
                            
                           </Text>
                        <Image
                            source={require("../../../assests/images/righarrow.png")}
                            style={{
                                height: SCREEN_WIDTH * 0.07,
                                width: SCREEN_WIDTH * 0.07,
                                marginHorizontal: Sizes.fixHorizontalPadding,
                            }}
                        />
                        <Text style={styles.flighttxt}>{flightListData?.Destination}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={styles.flighttxt2}>
                            {moment(route?.params?.payload?.PreferredDepartureTime).format(
                                "ddd, MMMM D, YYYY"
                            )}{" "}
                            .
                        </Text>
                        <Text style={styles.flighttxt2}>
                            {FlightSearchParameter?.AdultCount +
                                FlightSearchParameter?.ChildCount +
                                FlightSearchParameter?.InfantCount}{" "}
                            Traveller .{" "}
                        </Text>
                        <Text style={styles.flighttxt2}>
                            {FlightSearchParameter?.classdata?.name}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        height: SCREEN_WIDTH * 0.12,
                        width: SCREEN_WIDTH * 0.12,
                        backgroundColor: "#F1F1F1",
                        borderRadius: 100,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onPress={() => goBack()}
                >
                    <Image source={require("../../../assests/images/pencil.png")} />
                </TouchableOpacity>
            </View>
        );
    }
};
const mapStateToProps = (state) => ({
    flightListData: state.flightReducer.flightListData,
    departureFrom: state.flightReducer.departureFrom,
    departureTo: state.flightReducer.departureTo,
    customerData: state.registrationReducer.customerdata
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(FlightInfo);

const styles = StyleSheet.create({
    flighttxt: {
        ...Fonts._16MontserratRegular,
    },
    flighttxt2: {
        ...Fonts._12MontserratRegular,
    },
    flighttxt3: {
        ...Fonts._12MontserratRegular,
    },
    container: {
        width: '95%',
        alignSelf: 'center',
        borderWidth: 1,
        // marginBottom: Sizes.fixPadding,
        borderColor: Colors.primaryTheme,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding * 0.5,
        paddingHorizontal: Sizes.fixPadding * 0.2
    },
    childContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});
