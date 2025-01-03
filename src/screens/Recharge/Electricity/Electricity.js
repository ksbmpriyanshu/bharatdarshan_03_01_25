import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Fonts, SCREEN_WIDTH, Sizes } from '../../../assests/style'
import MyStatusBar from '../../../components/StatusBar'
import Header from '../../../components/Header'
import { navigate } from '../../../navigations/NavigationServices'
import axios from 'axios'
import { connect, useDispatch, useSelector } from 'react-redux'
import { setOpt } from '../../../redux/actions/operatorCircleAction'
import Loader from '../../../components/Loader'
import * as RechargeActions from '../../../redux/actions/RechargeActions'

const Electricity = ({ dispatch, electricityOperators }) => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredOperators, setFilteredOperators] = useState(electricityOperators);

    const handleSelectOperator = (item) => {
        navigate('ElectricityPayment', { providerData: item });
    };

    useEffect(() => {
        dispatch(RechargeActions.getElectricityOperator());
    }, []);

    useEffect(() => {
        if (searchKeyword.trim() === '') {
            setFilteredOperators(electricityOperators);
        } else {
            const filteredData = {};
            Object.keys(electricityOperators).forEach((category) => {
                const operators = electricityOperators[category].filter((operator) =>
                    operator.OperatorName.toLowerCase().includes(searchKeyword.toLowerCase())
                );
                if (operators.length > 0) {
                    filteredData[category] = operators;
                }
            });
            setFilteredOperators(filteredData);
        }
    }, [searchKeyword, electricityOperators]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
            <Loader />
         
            <Header title={'Electricity Bill'} tintColor={Colors.white} />
            <View style={{ paddingHorizontal: 5, paddingTop: 10 }}>
                <TextInput
                    placeholder='Search Here....'
                    style={styles.searchElectricity}
                    value={searchKeyword}
                    onChangeText={setSearchKeyword}
                />
            </View>
            <View style={{ flex: 1 }}>
                {filteredOperators && electricitylist()}
            </View>
        </SafeAreaView>
    );

    function electricitylist() {
        const renderItem2 = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: Sizes.fixHorizontalPadding * 2,
                        paddingVertical: Sizes.fixPadding * 0.5,
                        borderBottomWidth: 1,
                        borderColor: '#7C7676',
                    }}
                    onPress={() => handleSelectOperator(item)}
                >
                    <View
                        style={{
                            height: SCREEN_WIDTH * 0.11,
                            width: SCREEN_WIDTH * 0.11,
                            backgroundColor: Colors.white,
                            borderWidth: 0.5,
                            borderRadius: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderColor: '#7C7676',
                            overflow: 'hidden',
                        }}
                    >
                        <Image
                            source={{ uri: item?.operatorImage }}
                            style={{ height: SCREEN_WIDTH * 0.1, width: SCREEN_WIDTH * 0.1, resizeMode: 'contain' }}
                        />
                    </View>
                    <Text
                        style={{
                            ...Fonts._16MontserratMedium,
                            marginLeft: Sizes.fixHorizontalPadding,
                            color: '#7C7676',
                            flex: 1,
                        }}
                    >
                        {item?.OperatorName}
                    </Text>
                </TouchableOpacity>
            );
        };

        const renderItem = ({ item }) => {
            return (
                <View style={{}}>
                    <View
                        style={{
                            paddingVertical: Sizes.fixPadding,
                            justifyContent: 'center',
                            backgroundColor: '#B0D5FF42',
                            marginTop: Sizes.fixPadding,
                            paddingHorizontal: Sizes.fixHorizontalPadding * 2,
                        }}
                    >
                        <Text style={{ ...Fonts._16MontserratMedium, textTransform: 'capitalize' }}>{item}</Text>
                    </View>
                    <FlatList data={filteredOperators[item]} renderItem={renderItem2} />
                </View>
            );
        };

        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={Object.keys(filteredOperators)}
                    renderItem={renderItem}
                    initialNumToRender={5}
                    maxToRenderPerBatch={5}
                />
            </View>
        );
    }
};

const mapStateToProps = (state) => ({
    electricityOperators: state.rechargeReducer.electricityOperators,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Electricity);

const styles = StyleSheet.create({
    searchElectricity: {
        borderWidth: 1,
        paddingLeft: 10,
        borderColor: '#bababa',
        borderRadius: 5,
        ...Fonts._16MontserratMedium,
        fontSize: 13,
    },
});
