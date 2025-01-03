import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors, Sizes, Fonts, SCREEN_WIDTH } from '../../../assests/style'
import MyStatusBar from '../../../components/StatusBar'
import Header from '../../../components/Header'
import { connect } from 'react-redux'
import { DurationComponent } from '../../../utils/services'
import moment from 'moment'
import { ColorProperties } from 'react-native-reanimated/lib/typescript/reanimated2/Colors'

const FlightReviewDetails = ({ route, departureFrom, departureTo }) => {
    const FlightSearchParameter = route.params?.FlightSearchParameter;
    const flightSelectData = route.params?.item;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F2EAEA' }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
            <Header title={'Reivew Flight Details'} tintColor={Colors.white} />
            <View style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={
                        <>
                            {departureflightdetails()}

                        </>
                    }
                />
            </View>
            {continueInfo()}
        </SafeAreaView>
    )

    function continueInfo() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                <TouchableOpacity style={{ backgroundColor: Colors.primaryTheme, width: '100%', paddingVertical: Sizes.fixHorizontalPadding }}>
                    <Text style={{ ...Fonts._16MontserratMedium, color: Colors.white, textAlign: 'center' }}>Continue</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function departureflightdetails() {
        return (
            <View style={{ padding: Sizes.fixHorizontalPadding, backgroundColor: Colors.white }}>
                <View style={{ marginVertical: Sizes.fixPadding }}>
                    <Text style={{ ...Fonts._16MontserratRegular }}>
                        Departing Flight
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: Sizes.fixHorizontalPadding * 0.5 }}>
                        <Text style={{ ...Fonts._20MontserratMedium }}>{departureFrom?.CITYNAME}</Text>
                        <Image source={require('../../../assests/images/righarrow.png')} style={{ height: SCREEN_WIDTH * 0.07, width: SCREEN_WIDTH * 0.07, marginHorizontal: Sizes.fixHorizontalPadding * 0.6 }} />
                        <Text style={{ ...Fonts._20MontserratMedium }}>{departureTo?.CITYNAME}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.flighttxt2}>{moment(FlightSearchParameter?.PreferredDepartureTime).format('ddd, MMMM D, YYYY')} .</Text>
                        <Text style={styles.flighttxt2}> {flightSelectData?.Segments[0][0]?.StopOver ? 'Stopage' : 'Non-Stop'}. </Text>
                        <DurationComponent
                            duration={flightSelectData?.Segments[0][0]?.Duration}
                            style={styles.flighttxt2}
                        />

                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', paddingTop: Sizes.fixPadding, borderTopWidth: 1, borderColor: '#C7C3C3' }}>
                    <View><Text>Image</Text></View>
                    <View style={{ marginHorizontal: Sizes.fixHorizontalPadding * 1.5 }}>
                        <Text style={{ ...Fonts._18MontserratRegular }}>
                            {flightSelectData?.Segments[0][0]?.Airline?.AirlineName}
                        </Text>
                        <Text style={{ ...Fonts._14MontserratRegular, color: '' }}>
                            {FlightSearchParameter?.classdata?.name}
                        </Text>

                    </View>
                    <View style={{}}>
                        <Text style={{
                            ...Fonts._14MontserratMedium, color: '#00000080'
                        }}>
                            {flightSelectData?.Segments[0][0]?.Airline?.FlightNumber}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}
const mapStateToProps = state => ({
    flightData: state.flightReducer.flightData,
    departureFrom: state.flightReducer.departureFrom,
    departureTo: state.flightReducer.departureTo
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(FlightReviewDetails);


const styles = StyleSheet.create({
    flighttxt2: {
        ...Fonts._13MontserratRegular,
    },
})