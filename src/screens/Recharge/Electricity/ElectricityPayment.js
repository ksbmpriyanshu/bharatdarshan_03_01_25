import { Alert, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Fonts, Sizes } from '../../../assests/style'
import MyStatusBar from '../../../components/StatusBar'
import Header from '../../../components/Header'
import { BottomSheet, Input } from '@rneui/themed'
import { navigate } from '../../../navigations/NavigationServices'
import Button from '../../../components/Button'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect, useSelector } from 'react-redux'
import * as RechargeActions from '../../../redux/actions/RechargeActions'
import { setCircle, setBillData } from '../../../redux/actions/operatorCircleAction'
import axios from 'axios'
import Loader from '../../../components/Loader'
import { showToastMessage } from '../../../utils/services'
import * as SettingActions from '../../../redux/actions/settingActions'

const ElectricityPayment = ({ route, dispatch, rechargeRequestFields, navigation }) => {
    console.log(rechargeRequestFields);
    const providerData = route.params?.providerData
    const [number, setNumber] = useState('')
    const [fields, setFields] = useState(null);

    useEffect(() => {
        dispatch(RechargeActions.getRechargeRequestFields(providerData?.OperatorCode))
    }, [])

    useEffect(() => {
        setFields(rechargeRequestFields?.Request)
    }, [rechargeRequestFields])


    const handleProceedPayment = async () => {
        try {
            let isValid = true
            fields.forEach(element => {
                if (element.Value.length === 0 || element?.Value === 'Enter Value') {
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
                providerData: { ...providerData, number: fields[0]?.Value },
                navigateTo: 'electricityPaymentProcess'
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
            <Header title={`${providerData.city} - ${providerData.OperatorName}`} tintColor={Colors.white} />
            <View style={{ flex: 1, padding: Sizes.fixPadding }}>
                {fields && customerdetails()}
                {proceedbtn()}
            </View>
        </SafeAreaView>
    )

    function proceedbtn() {
        return (
            <View style={{ width: '100%', alignSelf: 'center', flex: 1, justifyContent: 'flex-end' }}>
                <Button title={'Proceed to Pay'} onPress={() => handleProceedPayment()} />
            </View>
        )
    }

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

    function billElectricity() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 0.6 }}>
                <Text style={styles.heading}>Electricity Bill No.</Text>
                <Input
                    // disabled
                    cursorColor={Colors.black}
                    keyboardType='numeric'
                    value={route.params?.item?.name}
                    inputContainerStyle={styles.inputContainer}
                    containerStyle={{ height: 50, paddingHorizontal: 0 }}
                    style={{ height: 50, paddingHorizontal: 0 }}
                    inputStyle={{ ...Fonts._14MontserratMedium, marginLeft: 10 }}
                    onChangeText={(txt) => setNumber(txt)}
                // rightIcon={
                //     <TouchableOpacity
                //         onPress={() => navigate('Electricitytype',{name:route.params?.elctricitystatedata?.name})}
                //         activeOpacity={0.7}
                //     >
                //         <Text style={styles.rightIcon}>Change</Text>
                //     </TouchableOpacity>
                // }

                />
            </View>
        )
    }

}

const mapStateToProps = state => ({
    rechargeRequestFields: state.rechargeReducer.rechargeRequestFields,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ElectricityPayment);


const styles = StyleSheet.create({
    heading: {
        ...Fonts._12MontserratMedium,
        bottom: -Sizes.fixPadding * 0.6,
        left: Sizes.fixHorizontalPadding * 3,
        backgroundColor: Colors.white,
        zIndex: 99,
        alignSelf: 'flex-start',
        paddingHorizontal: Sizes.fixHorizontalPadding,
        color: '#8B8989'
    },
    rightIcon: {
        ...Fonts._12MontserratRegular,
        color: Colors.primaryTheme
    },
    inputContainer: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#F3F3F3',
        borderRadius: Sizes.fixPadding * 0.5,
        paddingHorizontal: Sizes.fixPadding,
        // marginTop: Sizes.fixPadding * 2,
        borderColor: Colors.grayA,
        backgroundColor: '#FAFAFA'
    },
    modalContainer: {
        backgroundColor: Colors.white,
        padding: Sizes.fixHorizontalPadding * 3,
        borderTopRightRadius: Sizes.fixHorizontalPadding * 3,
        borderTopLeftRadius: Sizes.fixHorizontalPadding * 3,
    },
})