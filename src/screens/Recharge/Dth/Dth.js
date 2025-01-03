import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { Colors, SCREEN_WIDTH, Sizes, Fonts } from '../../../assests/style';
import MyStatusBar from '../../../components/StatusBar';
import Header from '../../../components/Header';
import { navigate } from '../../../navigations/NavigationServices';
import { connect } from 'react-redux';
import * as RechargeActions from '../../../redux/actions/RechargeActions'
import Loader from '../../../components/Loader';

const Dth1 = ({ dispatch, dthOperatorData }) => {
    useEffect(() => {
        dispatch(RechargeActions.getDthOperator());
    }, [])

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
            <Loader />
            <Header title={'DTH Operator'} tintColor={Colors.white} />
            <View style={styles.mainView}>
                {rechargename()}
            </View>
        </SafeAreaView>
    );

    function rechargename() {


        const renderItem = ({ item }) => {

            return (
                <TouchableOpacity
                    style={styles.touchableOpacity}
                    activeOpacity={0.5}
                    onPress={() => {
                        navigate('dthForm', { ...item });
                    }}
                >
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: item?.operatorImage }} style={styles.image} />
                    </View>
                    <Text style={styles.text}>{item?.OperatorName}</Text>

                </TouchableOpacity>
            );
        };

        return (
            <View style={styles.flatListContainer}>
                <FlatList data={dthOperatorData} renderItem={renderItem} numColumns={2} keyExtractor={(item) => item?.OperatorCode} />

            </View>
        );
    }
};
const mapStateToProps = state => ({

    dthOperatorData: state.rechargeReducer.dthOperatorData

});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Dth1);


const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    mainView: {
        flex: 1,
        zIndex: -1
    },
    touchableOpacity: {
        alignItems: 'center',
        width: '50%',
        marginTop: Sizes.fixPadding * 2,
        gap: Sizes.fixPadding * 0.3,
    },
    imageContainer: {
        width: SCREEN_WIDTH * 0.27,
        height: SCREEN_WIDTH * 0.27,
        borderRadius: 100,
        overflow: 'hidden',

    },
    image: {
        width: SCREEN_WIDTH * 0.27,
        height: SCREEN_WIDTH * 0.27,
        borderRadius: Sizes.fixPadding,

    },
    text: {
        ...Fonts._16MontserratRegular,
        textAlign: 'center'
    },
    flatListContainer: {
        flex: 1,
        padding: Sizes.fixPadding * 0.5,
    },
});
