import React, { useEffect, useState, } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, FlatList } from 'react-native';
import { Colors, Sizes, Fonts, SCREEN_WIDTH } from '../../../assests/style';
import MyStatusBar from '../../../components/StatusBar';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import * as RechargeActions from '../../../redux/actions/RechargeActions';
import { connect } from 'react-redux';
import Loader from '../../../components/Loader';
import { showToastMessage } from '../../../utils/services';

const Gas = ({ dispatch, gasOperatorData, dthCircleData, route, rechargeRequestFields }) => {
    const providerData = route?.params?.providerData
    console.log("providerData",providerData)
    const [fields, setFields] = useState(null);

    useEffect(() => {
        dispatch(RechargeActions.getRechargeRequestFields(route.params?.providerData?.OperatorCode))
    }, [dispatch]);

    useEffect(() => {
        setFields(rechargeRequestFields?.Request)
    }, [rechargeRequestFields])

    const handleProceedPayment = async () => {
        try {
            let isValid = true
            fields.forEach(element => {
                if ((element.Value.length === 0 || element?.Value === 'Enter Value') && element.isOptional != 'True') {
                    showToastMessage({ message: `${element?.Key} is required` })
                    isValid = false
                }
            });
            if (!isValid) return

            const RequestData = fields.map(element => {
                const data = { Key: element?.Key, Value: element?.Value }
                return data
            })
            
            const payload = {
                RequestData: { Request: RequestData },
                operator: providerData?.OperatorCode,
                providerData: {...providerData, number: fields[0]?.Value},
                navigateTo: 'GasAmount'
            }
        

            dispatch(RechargeActions.getRechargeBillDetails(payload))


        } catch (error) {
            console.log({ err: error });
        }

    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
            <Loader />
            <Header title={'Book Cylinder'} tintColor={Colors.white} />
            <View style={{ flex: 1, padding: Sizes.fixPadding }}>
            {fields && customerdetails()}
                {submitBtn()}
            </View>
        </SafeAreaView>
    );

    function customerdetails() {
        const handleInputChange = (index, newValue) => {
            const newDataArray = [...fields];
            newDataArray[index].Value = newValue;
            setFields(newDataArray);
        };

        const renderItem = ({ item, index }) => {
            return <View style={{
                borderRadius: 10,
                backgroundColor: "#FCF2F2",
                marginTop: Sizes.fixPadding * 1.5,
            }}>
                <TextInput
                    // value={''}
                    onChangeText={(newValue) => handleInputChange(index, newValue)}
                    placeholder={`${item?.Key} ${item?.isOptional === 'True' ? '(Optional)' : ''}`}
                    cursorColor={Colors.black}
                    placeholderTextColor={"#686464"}
                    keyboardType="number-pad"
                    multiline={false}
                    numberOfLines={1}
                    style={{
                        paddingHorizontal: Sizes.fixHorizontalPadding * 2,
                        color: Colors.black,
                    }}
                />
            </View>
        }
        return (
            <FlatList data={fields} renderItem={renderItem} />
        );
    }

    function submitBtn() {

        return (
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Button title={'Proceed'} onPress={handleProceedPayment} />
            </View>
        );
    }
};

const mapStateToProps = state => ({
    gasOperatorData: state.rechargeReducer.gasOperatorData,
    dthCircleData: state.rechargeReducer.dthCircleData,
    rechargeRequestFields: state.rechargeReducer.rechargeRequestFields,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Gas);

const styles = StyleSheet.create({
    heading: {
        ...Fonts._12MontserratMedium,
        bottom: -Sizes.fixPadding * 0.6,
        left: Sizes.fixHorizontalPadding * 3,
        backgroundColor: Colors.white,
        zIndex: 99,
        alignSelf: 'flex-start',
        paddingHorizontal: Sizes.fixHorizontalPadding,
        color: Colors.black
    },
    rightIcon: {
        ...Fonts._12MontserratRegular,
        color: Colors.primaryTheme
    },
    inputContainer: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderRadius: Sizes.fixPadding * 0.5,
        paddingHorizontal: Sizes.fixPadding,
        borderColor: Colors.grayA,
        backgroundColor: '#FFFFFF'
    },
    errorContainer: {
        // marginTop: Sizes.fixPadding * 0.3,
        paddingHorizontal: Sizes.fixPadding * 0.5,
   
        
    },
    errorText: {
      ...Fonts._11MontserratRegular,
      color: Colors.redA,
        bottom:5
    },
    modalContainer: {
        backgroundColor: Colors.white,
        padding: Sizes.fixHorizontalPadding * 3,
        borderTopRightRadius: Sizes.fixHorizontalPadding * 3,
        borderTopLeftRadius: Sizes.fixHorizontalPadding * 3,
    },
    modalHeader: {
        marginBottom: Sizes.fixPadding * 1.5,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 10,
    },
    listItem: {
        marginBottom: 10,
        borderBottomWidth: 1,
        paddingVertical: Sizes.fixPadding * 0.5,
        borderColor: '#00000030'
    },
    listText: {
        ...Fonts._14MontserratMedium,
        textAlign: 'center',
        textTransform: 'capitalize'
    }
});
