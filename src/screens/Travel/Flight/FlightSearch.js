import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as FlightActions from '../../../redux/actions/FlightActions'
import { connect } from 'react-redux'
import { Colors, Sizes, Fonts } from '../../../assests/style'
import MyStatusBar from '../../../components/StatusBar'
import Header from '../../../components/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Input from '../../../components/Input'
import Entypo from 'react-native-vector-icons/Entypo'
import { showToastMessage } from '../../../utils/services'

let timeout;

const FlightSearch = ({ dispatch, navigation, airpotCities, route, departureFrom, departureTo }) => {
    const [search, setSearch] = useState('')
    useEffect(() => {
        dispatch(FlightActions.getairpotcities(''))
    }, [])
    console.log(">>>>>>>>>>>>>>>>>>>>>>",airpotCities?.length)

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle='light-content' />
            <Header title={'Flight'} tintColor={Colors.white} />
            <View style={{ flex: 1 }}>
                {searchInfo()}
                <FlatList
                    ListHeaderComponent={<>
                        {airpotCities && listInfo()}
                    </>}
                />
            </View>
        </View>
    )

    function listInfo() {
        const onSelectCity = data => {
            if (route?.params?.type === 'departureFrom') {
                if(data?.AIRPORTCODE === departureTo?.AIRPORTCODE){
                    showToastMessage({ message: 'Origin and destination can not be same.' })
                    return
                }
                dispatch(FlightActions.setDepartureFrom(data))
            } else {
                if(data?.AIRPORTCODE === departureFrom?.AIRPORTCODE){
                    showToastMessage({ message: 'Origin and destination can not be same.' })
                    return
                }
                dispatch(FlightActions.setDepartureTo(data))
            }
            navigation.goBack()
        }
        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity
                    key={index}
                    style={styles.listItem}
                    onPress={() => onSelectCity(item)}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%', overflow: 'hidden' }}>
                            <Entypo
                                name="location-pin"
                                color={Colors.primaryTheme}
                                size={20}
                              
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
            )
        }
        const indianAirports = airpotCities.filter(item => item.COUNTRYNAME === 'India');
        const otherAirports = airpotCities.filter(item =>
            item.COUNTRYNAME.toLowerCase().includes(search.toLowerCase()) ||
            item.CITYNAME.toLowerCase().includes(search.toLowerCase())
        );
        return (
            <View style={{ margin: Sizes.fixHorizontalPadding * 2 }}>
                <FlatList
                   data={[...indianAirports, ...otherAirports]}
                    renderItem={renderItem}
                    initialNumToRender={10}
                />
            </View>

        )
    }

    function searchInfo() {
        const onChangeText = text => {
            clearTimeout(timeout)
            setSearch(text)
            timeout = setTimeout(() => {
                dispatch(FlightActions.getairpotcities(text))
            }, 1000)
        }
        return (
            <Input
                value={search}
                onChangeText={onChangeText}
                inputContainerStyle={styles.inputContainer}
                containerStyle={{ height: 50, paddingHorizontal: 0, borderBottomWidth: 0 }}
                style={{ height: 50, paddingHorizontal: 0, borderWidth: 1, paddingHorizontal: Sizes.fixPadding, borderRadius: 30, borderColor: '#E2E2E2' }}
                inputStyle={{ ...Fonts._14MontserratMedium, marginLeft: 10 }}
                placeholder='Search City / Airport'
                placeholderTextColor={'#B6B2B2'}
            />
        )
    }

}

const mapStateToProps = state => ({
    airpotCities: state.flightReducer.airpotCities,
    departureFrom: state.flightReducer.departureFrom,
    departureTo: state.flightReducer.departureTo,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(FlightSearch)

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        height: 50,
        borderRadius: Sizes.fixPadding * 0.5,
        paddingHorizontal: Sizes.fixPadding * 0.3,
        borderColor: Colors.grayA,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 0,
    },
    listItem: {
        marginBottom: 10,
        borderBottomWidth: 1,
        paddingVertical: Sizes.fixPadding * 0.5,
        borderColor: '#00000030'
    },
})