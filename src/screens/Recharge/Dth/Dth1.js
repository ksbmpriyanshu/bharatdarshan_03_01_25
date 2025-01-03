import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { Colors, SCREEN_WIDTH, Sizes, Fonts } from '../../../assests/style';
import MyStatusBar from '../../../components/StatusBar';
import Header from '../../../components/Header';
import { navigate } from '../../../navigations/NavigationServices';
import { connect } from 'react-redux';
import * as RechargeActions from '../../../redux/actions/RechargeActions'
import Loader from '../../../components/Loader';

const Dth1 = ({dispatch,dthOperatorData}) => {
    
    useEffect(() =>{
        dispatch(RechargeActions.getdthoperator());
    },[])

    

    // function getImageSource(operatorCode) {
    //     console.log(operatorCode)
    //     switch (operatorCode) {
    //         case "ATD":
    //             return require('../../../assests/images/airtel.png');
    //         case "DTD":
    //             return require('../../../assests/images/dishtv.png'); // Update with correct image path
    //         case "TSD":
    //             return require('../../../assests/images/tatasky.png'); // Update with correct image path
    //         case "VDD":
    //             return require('../../../assests/images/idea.png'); // Update with correct image path
    //         case "SD":
    //         case "IND11998":
    //             return require('../../../assests/images/sundirect.png'); // Assuming they use the same image
    //         default:
    //             return require('../../../assests/images/idea.png'); // Update with a default image
    //     }
    // }
    
    
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
            <Loader/>
            <Header title={'DTH Operator'} tintColor={Colors.white} />
            <View style={styles.mainView}>
                {rechargename()}
            </View>
        </SafeAreaView>
    );

    function rechargename() {
      

        const renderItem = ({ item }) => {
            
            // const imageSource = getImageSource(item?.OperatorCode);

            return (
                <TouchableOpacity
                    style={styles.touchableOpacity}
                    activeOpacity={0.5}
                    onPress={() => {
                        navigate('Dthoperator', { item });
                    }}
                >
                    <View style={styles.imageContainer}>
                        <Image source={{uri : item?.operatorImage}} style={styles.image} />
                    </View>
                    <Text style={styles.text}>{item?.OperatorName}</Text>
                   
                </TouchableOpacity>
            );
        };

        return (
            <View style={styles.flatListContainer}>
                <FlatList data={dthOperatorData} renderItem={renderItem} numColumns={2}   keyExtractor={(item) => item?.OperatorCode} />

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
        zIndex:-1
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
        textAlign:'center'
    },
    flatListContainer: {
        flex: 1,
        padding: Sizes.fixPadding * 0.5,
    },
});
