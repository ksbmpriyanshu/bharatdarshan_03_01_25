import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import MyStatusBar from '../../../components/StatusBar'
import Loader from '../../../components/Loader'
import Header from '../../../components/Header'
import * as RechargeActions from '../../../redux/actions/RechargeActions'
import { connect } from 'react-redux'
import { Colors, Sizes, Fonts, SCREEN_WIDTH } from '../../../assests/style';

const GasOperators = ({dispatch, gasOperators, navigation}) => {
    const [searchTerm, setSearchTerm] = useState('');
  console.log("gasOperators",gasOperators?.data[0]?.data)
    useEffect(() => {
        dispatch(RechargeActions.getGasOperator());
    }, []);
    const filteredOperators = gasOperators?.data[0]?.data?.filter((operator) => 
        operator.OperatorName.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
            <Loader />
            <Header title={'Gas Operators'} tintColor={Colors.white} />
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    cursorColor={Colors.black}
                    placeholder='Search Operator'
                    value={searchTerm}
                    onChangeText={text => setSearchTerm(text)}
                />
            </View>
            <FlatList
                data={filteredOperators}
                renderItem={renderItem}
                contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2 }}
                keyExtractor={(item) => item.OperatorCode.toString()}
            />
        </View>
    );

    function renderItem({ item }) {
        console.log(item?.OperatorCode)
        
        return (
            <TouchableOpacity 
                activeOpacity={0.8} 
                onPress={() => navigation.navigate('gas', { providerData: item })}
                style={styles.operatorContainer}
            >
                <Image 
                source={
                    item?.OperatorCode === 'HGC' 
                        ? require('../../../assests/images/hpcl.png') 
                        : item?.OperatorCode === 'PGC' 
                        ? require('../../../assests/images/bpcl.png') 
                        : item?.OperatorCode === 'IGIOL' 
                        ? require('../../../assests/images/indane.jpg') 
                        : require('../../../assests/images/indane.jpg') 
                } 
                style={styles.operatorImage} 
            />
                <Text style={styles.operatorText}>{item?.OperatorName}</Text>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = state => ({
    gasOperators: state.rechargeReducer.gasOperators
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(GasOperators);

const styles = StyleSheet.create({
    searchContainer: {
        marginHorizontal: 10,
        marginTop: 15,
    },
    searchInput: {
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: Sizes.fixHorizontalPadding * 2,
        borderColor: '#ccc',
        ...Fonts._14MontserratRegular,
    },
    operatorContainer: {
        paddingHorizontal: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        paddingVertical: Sizes.fixPadding,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grayC,
        gap:10,
    },
    operatorImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        borderRadius:40,
    },
    operatorText: {
        ...Fonts._13MontserratMedium,
    },
});
