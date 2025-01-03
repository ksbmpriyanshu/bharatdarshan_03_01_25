import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BottomSheet } from "@rneui/themed";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as FlightActions from '../../../../../redux/actions/FlightActions';
import { connect } from 'react-redux'
import { Colors, Sizes, Fonts, SCREEN_WIDTH } from "../../../../../assests/style";

const CitySearch = ({ setSelectedFromCity, setSelectedToCity }) => {



    const API_URL = 'https://apitest.cyrusrecharge.in/cy_api/cy_flight.aspx';
    const [cities, setCities] = useState([]);
    const [displayedCities, setDisplayedCities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFromCity, setLocalFromCity] = useState('');
    const [selectedToCity, setLocalToCity] = useState('');
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [isSelectingFrom, setIsSelectingFrom] = useState(true);

    useEffect(() => {
        const getFlightCities = async () => {
            const requestBody = {
                methodname: 'FLIGHTCITY',
                opid: 558,
                txnid: '638002206548711332'
            };

            try {
                const response = await axios.post(API_URL, requestBody, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Token': 'A745D44D-90AA-4FAA-8E6D-7E0F666E387D'
                    }
                });

                const indianCities = response.data.data.filter(city => city.COUNTRYNAME === "India" || city.COUNTRYCODE === "IN");
                setCities(indianCities);
                setDisplayedCities(indianCities.slice(0, 20));
            } catch (error) {
                console.error('Error fetching flight cities:', error.response ? error.response.data : error.message);
            }
        };

        getFlightCities();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query) {

            const filtered = cities.filter(city =>
                city.AIRPORTNAME.toLowerCase().includes(query.toLowerCase()) ||
                city.AIRPORTCODE.toLowerCase().includes(query.toLowerCase())
            );
            setDisplayedCities(filtered);
        } else {

            setDisplayedCities(cities.slice(0, 10));
        }
    };

    const renderCityItem = ({ item,index }) => (
        <TouchableOpacity
            onPress={() => {
                if (isSelectingFrom) {
                    setLocalFromCity(item.AIRPORTNAME);
                    setSelectedFromCity(item.AIRPORTCODE);
                } else {
                    setLocalToCity(item.AIRPORTNAME);
                    setSelectedToCity(item.AIRPORTCODE);
                }
                setBottomSheetVisible(false);
            }}
            style={styles.cityItem}
            key={index}
        >
            <Icon name="map-marker" size={20} color="#e05320" style={styles.icon} />
            <Text style={styles.cityText}>{item.AIRPORTNAME}</Text>
        </TouchableOpacity>
    );

    return (
        <>
            <View style={styles.cyrusSubView}>
                <Text style={styles.label}>From</Text>
                <TouchableOpacity
                    style={styles.selectedCityContainer}
                    onPress={() => {
                        setIsSelectingFrom(true);
                        setBottomSheetVisible(true);
                    }}
                >
                    <Text style={styles.selectedCityText}>
                        {selectedFromCity || "Select Origin"}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cyrusSubView}>
                <Text style={styles.label}>To</Text>
                <TouchableOpacity
                    style={styles.selectedCityContainer}
                    onPress={() => {
                        setIsSelectingFrom(false);
                        setBottomSheetVisible(true);
                    }}
                >
                    <Text style={styles.selectedCityText}>
                        {selectedToCity || "Select Destination"}
                    </Text>
                </TouchableOpacity>
            </View>

            <BottomSheet
                isVisible={isBottomSheetVisible}
                onBackdropPress={() => setBottomSheetVisible(false)}
                containerStyle={styles.fullScreenContainer}
            >
                <View style={styles.bottomSheetContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search City"
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                    <FlatList
                        data={displayedCities}
                        renderItem={renderCityItem}
                        keyExtractor={(item) => item.AIRPORTCODE}
                        onEndReachedThreshold={0.5}
                    />
                </View>
            </BottomSheet>
        </>
    );
};
const mapStateToProps = state => ({
    airpotCyrusCities: state.flightReducer.airpotCyrusCities,
})

const mapDispatchToProps = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(CitySearch)



const styles = StyleSheet.create({
    cyrusSubView: {
        width: "100%"
    },
    label: {
        ...Fonts._14MontserratMedium,
        marginVertical: Sizes.fixPadding * 0.4,
    },
    selectedCityContainer: {
        backgroundColor: "#ffffff",
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 7,
        marginTop: 5,
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
    },
    selectedCityText: {
     color:"BABABA",
  ...Fonts._14MontserratMedium, 
  marginLeft: 10 
    },
  
    fullScreenContainer: {
        justifyContent: 'flex-end',
        height: '100%',
    },
    bottomSheetContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 0,
        flex: 1,
    },
    cityItem: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
    cityText: {
        fontSize: 16,
        color: '#222222',
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#e05320',
        borderRadius: 5,
        padding: 5,
        paddingHorizontal:10,
        marginBottom: 10,
    },
    
});
