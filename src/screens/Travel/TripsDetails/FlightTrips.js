import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Colors, Fonts, SCREEN_WIDTH, Sizes } from "../../../assests/style";
import moment from "moment";
import { connect } from "react-redux";
import * as FlightActions from "../../../redux/actions/FlightActions"

const FlightTrips = ({ dispatch, bookedFlights, navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            {tabsInfo()}
            <FlatList ListHeaderComponent={<>{bookedFlights && flightsInfo()}</>} />
        </View>
    );

    function flightsInfo() {
        const renderItem = ({ item, index }) => {
            return <TouchableOpacity onPress={() => navigation.navigate('flightDetails', {flightData: item})} style={{ marginBottom: Sizes.fixPadding * 1.5, elevation: 5, shadowColor: Colors.grayB, borderRadius: Sizes.fixPadding, backgroundColor: Colors.white, overflow: 'hidden' }}>
                <View style={{ backgroundColor: Colors.primaryTheme, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Sizes.fixPadding, paddingVertical: Sizes.fixPadding * 0.5 }}>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ backgroundColor: Colors.white, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: Sizes.fixPadding }}>
                            <Image source={require('../../../assests/images/airpot.png')} style={{ width: '90%', height: '90%' }} />
                        </View>

                        <View style={{ marginLeft: Sizes.fixPadding * 0.6 }}>
                            <Text style={{ ...Fonts._14MontserratMedium, color: Colors.white }}>Indigo <Text style={{ ...Fonts._13MontserratRegular, color: Colors.grayF }}>6E 353</Text></Text>
                            <Text style={{ ...Fonts._13MontserratRegular, color: Colors.grayF }}>Economy</Text>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: Sizes.fixPadding * 0.5, backgroundColor: '#962a00', paddingVertical: Sizes.fixPadding * 0.3 }}>
                        <Text style={{ ...Fonts._11MontserratMedium, color: Colors.white }}>PNR: JRSDDE</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: Sizes.fixPadding * 0.4, paddingVertical: Sizes.fixPadding }}>
                    <View>
                        <Text style={{ ...Fonts._12MontserratRegular }}>{moment(new Date()).format('ddd, DD MMM')}</Text>
                        <Text style={{ ...Fonts._16MontserratMedium, color: Colors.grayA }}>DEL <Text style={{ color: Colors.black }}>05:25</Text></Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ ...Fonts._11MontserratRegular }}>06h 0m</Text>
                        <Image source={require('../../../assests/icons/divider.png')} style={{ width: SCREEN_WIDTH * 0.24, resizeMode: 'contain' }} />
                        <Text style={{ ...Fonts._11MontserratRegular }}>1 Stop</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ ...Fonts._12MontserratRegular }}>{moment(new Date()).format('ddd, DD MMM')}</Text>
                        <Text style={{ ...Fonts._16MontserratMedium, color: Colors.grayA }}>DEL <Text style={{ color: Colors.black }}>05:25</Text></Text>
                    </View>
                </View>
            </TouchableOpacity>;
        };
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding, paddingVertical: Sizes.fixPadding }}>
                <FlatList
                    data={bookedFlights}
                    renderItem={renderItem}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                />
            </View>
        );
    }

    function tabsInfo() {
        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity
                    style={{
                        marginLeft: Sizes.fixPadding,
                        backgroundColor: Colors.primaryTheme,
                        paddingVertical: Sizes.fixPadding * 0.3,
                        paddingHorizontal: Sizes.fixPadding,
                        borderRadius: 1000,
                    }}
                >
                    <Text style={{ ...Fonts._13MontserratMedium, color: Colors.white }}>
                        Active
                    </Text>
                </TouchableOpacity>
            );
        };
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 0.5 }}>
                <FlatList
                    data={Array.from({ length: 2 })}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        );
    }
};

const mapStateToProps = state => ({
    bookedFlights: state.flightReducer.bookedFlights
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(FlightTrips);
