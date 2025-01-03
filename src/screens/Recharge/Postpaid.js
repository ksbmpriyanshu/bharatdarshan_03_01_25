import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { Colors, SCREEN_WIDTH, Sizes, Fonts } from '../../assests/style'
import MyStatusBar from '../../components/StatusBar'
import Loader from '../../components/Loader'
import Header from '../../components/Header'
import { connect } from 'react-redux'
import * as RechargeActions from '../../redux/actions/RechargeActions';
import { colors } from 'react-native-elements'

const Postpaid = ({ route, dispatch, postpaidOPerator, navigation }) => {
    console.log("postpaidOPerator",postpaidOPerator)
    useEffect(() => {
        dispatch(RechargeActions.getpostpaidoperator());
    }, [dispatch]);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
            <Loader />
            <Header title={'Postpaid Recharge'} tintColor={Colors.white} />
            <View style={{ flex: 1 }}>
                {OperatorData()}
            </View>
        </SafeAreaView>
    )
    function OperatorData() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={styles.touchableOpacity}
                    activeOpacity={0.5}
                    onPress={() => {
                        navigation.navigate('postpaidInput', {providerData: item });
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
                <FlatList data={postpaidOPerator} renderItem={renderItem} numColumns={2} keyExtractor={(item) => item?.OperatorCode} showsVerticalScrollIndicator={false} />

            </View>
        )
    }
}
const mapStateToProps = state => ({
    postpaidOPerator: state.rechargeReducer.postpaidOPerator,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Postpaid);

const styles = StyleSheet.create({
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
        // borderRadius: Sizes.fixPadding,

    },
    text: {
        ...Fonts._16MontserratRegular,
        textAlign: 'center'
    },
    flatListContainer: {
        flex: 1,
        padding: Sizes.fixPadding * 0.5,
    },
})