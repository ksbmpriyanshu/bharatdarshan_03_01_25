import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Sizes, Fonts, SCREEN_WIDTH } from '../../../assests/style'
import Header from '../../../components/Header'
import { BottomSheet, Input } from '@rneui/themed'
import { Image } from 'react-native'
import { navigate } from '../../../navigations/NavigationServices'
import Button from '../../../components/Button'
import Loader from '../../../components/Loader'
import { connect, useSelector } from 'react-redux'
import * as RechargeActions from '../../../redux/actions/RechargeActions'
import MyStatusBar from '../../../components/StatusBar'
import { showToastMessage } from '../../../utils/services'
const PostpaidInput = ({ route, dispatch, rechargeRequestFields }) => {
    console.log('::::: ',rechargeRequestFields);
    const providerData = route.params?.providerData
    console.log(" provider Data :::", providerData);
    console.log(providerData)
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
            // console.log("=-=-=-=-=-=-=-=-",RequestData)
            const payload = {
                RequestData: { Request: RequestData },
                operator: providerData?.OperatorCode,
                providerData: { ...providerData, number: fields[0]?.Value },
                navigateTo: 'postpaidBillInfo'
            }
    
            console.log(">?>?>>??>>",payload)
         
            dispatch(RechargeActions.getRechargeBillDetails(payload))


        } catch (error) {
            console.log({ err: error });
        }

    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
            <Loader />
            <Header title={'Postpaid Recharg'} tintColor={Colors.white} />
            <View style={{ flex: 1, }}>
                <FlatList
                    ListHeaderComponent={<>
                        {postpaidDeatils()}
                        {fields && customerdetails()}
                        {/* {vehicletext()} */}

                    </>}

                    contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding, paddingVertical: Sizes.fixPadding }}
                />
                {proceedbtn()}
            </View>
        </SafeAreaView>
    )

    function vehicletext() {
        return (
            <View style={{ paddingVertical: Sizes.fixPadding, borderColor: '#848484' }}>
                <Text style={{ ...Fonts._11MontserratMedium, }}>
                    Please enter vehicle number (Linked to FASTag ) without spaces E.g UP01AB12374/For ICICI Bank, minimum amount is 500
                </Text>

            </View>
        )
    }

    function proceedbtn() {
        return (
            <View style={{ width: '100%', alignSelf: 'center', padding: Sizes.fixPadding }}>
                <Button title={'PROCEED'} onPress={() => handleProceedPayment()} />
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
                    onChangeText={(newValue) => handleInputChange(index, newValue.toUpperCase())}
                    placeholder={`${item?.Key} ${item?.isOptional === 'True' ? '(Optional)' : ''}`}
                    cursorColor={Colors.black}
                    placeholderTextColor={"#686464"}
                  keyboardType="numeric"
                    autoCapitalize='characters'
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


    function postpaidDeatils() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 0.6 }}>
                <Text style={styles.heading}>Postpaid Bill Payment</Text>
                <Input
                    disabled
                    value={providerData?.OperatorName}
                    inputContainerStyle={styles.inputContainer}
                    containerStyle={{ height: 50, paddingHorizontal: 0 }}
                    style={{ height: 50, paddingHorizontal: 0 }}
                    inputStyle={{ ...Fonts._14MontserratMedium, marginLeft: 10 }}
                    keyboardType='numeric'
                    // rightIcon={
                    //     <TouchableOpacity
                    //         onPress={() => navigate('Fasttag')}
                    //         activeOpacity={0.7}
                    //     >
                    //         <Text style={styles.rightIcon}>Change</Text>
                    //     </TouchableOpacity>
                    // }
                    leftIcon={
                        <Image source={{uri: providerData?.operatorImage}} style={{ height: SCREEN_WIDTH * 0.06, width: SCREEN_WIDTH * 0.06, resizeMode: 'cover' }} />
                    }
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    rechargeRequestFields: state.rechargeReducer.rechargeRequestFields,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(PostpaidInput)

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
    maincontainer: {
        backgroundColor: Colors.white,

        borderTopLeftRadius: 20,
        borderTopRightRadius: 20

    }
})