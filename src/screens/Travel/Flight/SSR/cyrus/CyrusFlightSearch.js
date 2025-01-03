import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as FlightActions from '../../../../../redux/actions/FlightActions';
import { connect } from 'react-redux';
import { Colors, Sizes, Fonts } from '../../../../../assests/style';
import MyStatusBar from '../../../../../components/StatusBar';
import Header from '../../../../../components/Header';
import Input from '../../../../../components/Input';
import axios from 'axios';
import { showToastMessage } from '../../../../../utils/services';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';

const CyrusFlightSearch = ({ dispatch, cyrusairpotCities }) => { 
    const navigation = useNavigation(); 
    const [cities, setCities] = useState([]);
    const [displayedCities, setDisplayedCities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const API_URL = 'https://apitest.cyrusrecharge.in/cy_api/cy_flight.aspx';

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
                showToastMessage('Error fetching city data. Please try again.');
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
            setDisplayedCities(cities.slice(0, 20));
        }
    };

    const renderCityItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.listItem}
            onPress={() => {
                navigation.navigate('citysearch', {
                    selectedFromCity: item.AIRPORTNAME, 
                    selectedFromCode: item.AIRPORTCODE,
                });
            }}
        >
            <EvilIcons
                name="location"
                color={Colors.primaryTheme}
                size={Sizes.fixPadding * 1.4}
            />
            <Text style={styles.cityText}>{item.AIRPORTNAME} ({item.AIRPORTCODE})</Text>
        </TouchableOpacity>
    );
    

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle='light-content' />
            <Header title={'Flight'} tintColor={Colors.white} />
            <Input
                value={searchQuery}
                onChangeText={handleSearch}
                inputContainerStyle={styles.inputContainer}
                containerStyle={{ height: 50, paddingHorizontal: 0, borderBottomWidth: 0 }}
                style={{ height: 50, paddingHorizontal: 0, borderWidth: 1, paddingHorizontal: Sizes.fixPadding, borderRadius: 30, borderColor: '#E2E2E2' }}
                inputStyle={{ ...Fonts._14MontserratMedium, marginLeft: 10 }}
                placeholder='Search City / Airport'
                placeholderTextColor={'#B6B2B2'}
            />
            <FlatList
                data={displayedCities}
                renderItem={renderCityItem}
                keyExtractor={(item) => item.AIRPORTCODE}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};

const mapStateToProps = state => ({
    cyrusairpotCities: state.flightReducer.airpotCyrusCities,
});

export default connect(mapStateToProps)(CyrusFlightSearch);

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
        paddingVertical: Sizes.fixPadding * 0.8,
        borderBottomWidth: 1,
        borderColor: '#00000030',
        paddingHorizontal: Sizes.fixPadding,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    cityText: {
        fontSize: 16,
        color: '#222222',
    },
});
