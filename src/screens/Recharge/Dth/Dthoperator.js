import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, SCREEN_WIDTH, Sizes,Fonts, getFontSize, SCREEN_HEIGHT } from '../../../assests/style'
import MyStatusBar from '../../../components/StatusBar'
import Header from '../../../components/Header'
import Button from '../../../components/Button'
import { navigate } from '../../../navigations/NavigationServices'

import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux'
import * as RechargeActions from '../../../redux/actions/RechargeActions'
import { BottomSheet } from '@rneui/themed'
import Loader from '../../../components/Loader'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { baseUrl } from '../../../utility/base'
import axios from 'axios'
import { setIsLoading } from '../../../redux/actions/CommonActions'
import { select } from 'redux-saga/effects'
import Loader2 from '../../../components/Loader2'
import { showToastMessage } from '../../../utils/services'


const Dthoperator = ({route,dispatch,dthCircleData}) => {
    const[customerid,setCustomerId] = useState('')
    const [mobile,setMobile] = useState(null)
    const [dthdetails,setDthDetails] = useState(null)
    const [token, setToken] = useState(null);
    const [circle,setCircle] = useState('')
    const [circleModal,setCircleModal] = useState(false)
    const [dthModal, setDthModal] = useState(false)
    const [loading,setLoading] = useState(false)
    const dthdata = route.params?.item;
    const dthimage = route.params?.item?.operatorImage;
    
    useEffect(() =>{
        dispatch(RechargeActions.getdthcircle());
    },[])

    const getOperatorData = async () => {
        setLoading(true)
        console.log('sds',token)
        await axios.get(`${baseUrl}/recharge/fetch-dth-info?mobile=${customerid}&operator=${dthdata?.OperatorCode}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then((res) => {
            setLoading(false)
            setDthDetails(res.data?.data,'details')
            if (res.data?.data?.records[0]?.status === "Active") {   
                navigate('Dthrecharge',{customerid, dthdetails, circle,dthimage,dthdata})
             
            } else {
               showToastMessage({message: res?.data?.data?.records?.customerName})
            }
        }).catch((err) => {
          console.log({ err });
          setLoading(false)
        })
        
      }
      const getAcessToken = async () => {
        try {
          const authToken1 = await AsyncStorage.getItem('token');
          const authToken = JSON.parse(authToken1)
          // console.log({ authToken });
          setToken(authToken)
        } catch (error) {
          console.log({ error });
        }
    
      }
      useEffect(() => {
        getAcessToken()
      }, [])
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
            <Loader2 isLoading={loading}/>
            <Header title={'DTH Customer'} tintColor={Colors.white} />
            <View style={{ padding:Sizes.fixPadding}}>
                {operatorname()}
                {circleregion()}
                {/* {phoneNumber()} */}
                {customerdetails()}
                {infotext()}
            </View>
            {filterMOdal()}
            {wrongDthNumber()}
                {proceedbtn()}

        </SafeAreaView>
    )
    function phoneNumber() {
        return(
            <View style={{borderRadius:10,backgroundColor:'#FCF2F2',marginTop:Sizes.fixPadding * 1.5}}>
            <TextInput value={mobile} onChangeText={(txt) => setMobile(txt)} placeholder='Mobile Number... ' cursorColor={Colors.black} placeholderTextColor={'#686464'} keyboardType='number-pad' maxLength={10}  style={{paddingHorizontal:Sizes.fixHorizontalPadding * 2,color:Colors.black}}/>
          </View>
        )
    }
    function wrongDthNumber() {
        return (
            <BottomSheet
                isVisible={dthModal}
                onBackdropPress={() =>
                    setDthModal(false)
                }

            >
                <View style={styles.maincontainer}>
                    <Image source={require('../../../assests/images/vehiclenumber.png')} style={{ height: SCREEN_WIDTH * 0.5, width: SCREEN_WIDTH * 0.65, resizeMode: 'contain', alignSelf: 'center' }} />
                    <View style={{ paddingVertical: Sizes.fixPadding, borderBottomWidth: 1, borderColor: '#848484' }}>
                        <Text style={{ ...Fonts._16MontserratMedium, textAlign: 'center', bottom: Sizes.fixPadding * 0.7 }}>
                            Invalid Customer ID
                        </Text>
                    </View>
                    <Text style={{ textAlign: 'center', ...Fonts._18MontserratRegular, color: '#378338', paddingVertical: Sizes.fixPadding }} onPress={() => setDthModal(false)}>
                        Try again
                    </Text>
                </View>


            </BottomSheet>
        )
    }
    function filterMOdal() {
     
    const handlepress = (item) => {
        setCircle(item)
        
        setCircleModal(false)
    }
      
        return (
            <BottomSheet
                isVisible={circleModal}
                onBackdropPress={() =>
                    setCircleModal(false)
                }

            >
                <View style={[styles.modalContainer,{height:300}]}>
                    <View style={{ alignItems: 'center', }}>
                        <Image source={require('../../../assests/images/homerectangle.png')} tintColor={'#E0DCDC'} />
                    </View>

                    <View style={{ marginBottom: Sizes.fixPadding * 1.5, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row',marginTop:10 }}>
                        <Text style={{ ...Fonts._20MontserratMedium, letterSpacing: 0.6 }}>
                           Select Your Circle
                        </Text>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() =>
                                setCircleModal(false)
                            }
                            style={{ marginRight: 5 }}>
                            <AntDesign
                                name="close"
                                color={Colors.black}
                                size={Sizes.fixPadding * 1.3}
                            />
                        </TouchableOpacity>

                    </View>
                    

                 <ScrollView>
                    <View style={{}}>
                    {dthCircleData?.map((item,index) => (
                        <TouchableOpacity key={index} style={{ marginBottom: 10,borderBottomWidth:1,paddingVertical:Sizes.fixPadding * 0.5,borderColor:'#00000030' }} onPress={() => handlepress(item)}>
                            <Text style={{ ...Fonts._14MontserratMedium,textAlign:'center',textTransform:'capitalize' }}>
                                {item.circlename}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                </ScrollView>
                

                </View>
            </BottomSheet>
        )
    }
    function circleregion() {
        return(
            <TouchableOpacity style={{borderRadius:10,backgroundColor:'#FCF2F2',marginTop:Sizes.fixPadding * 1.5,paddingVertical:Sizes.fixHorizontalPadding * 2,flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:Sizes.fixHorizontalPadding * 2}} activeOpacity={0.6} onPress={() => setCircleModal(true)}>
              <Text style={{color:'#686464',}}>{circle ? circle.circlename : 'Select Your Circle'}</Text>
              {
               circle == null ? (<Image source={require('../../../assests/icons/downarrow.png')} style={{ height: SCREEN_WIDTH * 0.04, width: SCREEN_WIDTH * 0.04, resizeMode: 'contain' }} />) : (<Text style={styles.rightIcon}>Change</Text>) 
              }
              
            </TouchableOpacity>
        )
    }
    function proceedbtn() {
        const handlesubmit = () => {
            if (customerid.length <= 1) {
                setDthModal(true);
                return;
            } else {
                // navigate('Dthrecharge', { customerid, dthdata, circle,dthimage });
                getOperatorData();
                // navigate('Dthrecharge', { customerid, dthdata, circle,dthimage });
            }
          
        }
        return (
            <View style={styles.proceedButtonContainer}>
                <Button title={'PROCEED'} 
                // onPress={() => navigate('Dthrecharge',{customerid,dthdata,circle})}
                onPress={() => handlesubmit()}
                 />
            </View>
        )
    }

    function infotext() {
        return(
         <View style={{alignSelf:'flex-end',marginTop:5}}>
            <Text style={{...Fonts._11MontserratRegular,color: customerid && (customerid.length < 10 || customerid.length > 12) ? Colors.redA : '#686464'}}>Customer Id (10 - 12 digits)</Text>
         </View>
        )
    }
    function customerdetails() {
        return(
            <View style={{borderRadius:10,backgroundColor:'#FCF2F2',marginTop:Sizes.fixPadding * 1.5}}>
              <TextInput value={customerid} onChangeText={(txt) => setCustomerId(txt)} placeholder='Customer Id ' cursorColor={Colors.black} placeholderTextColor={'#686464'} keyboardType='number-pad' maxLength={12}  style={{paddingHorizontal:Sizes.fixHorizontalPadding * 2,color:Colors.black}}/>
            </View>
        )
    }
    function operatorname() {
        return(
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <View>
                <Text style={{...Fonts._14MontserratMedium,color:'#686464',fontSize:getFontSize(15)}}>Operator Details</Text>
                <Text style={{...Fonts._18MontserratRegular}}>{dthdata?.OperatorName}</Text>
                </View>
                <Image source={{uri : dthdata?.operatorImage}} style={{height:SCREEN_WIDTH * 0.2,width:SCREEN_WIDTH * 0.2}}/>
            </View>
        )
}
}
const mapStateToProps = state => ({
  
    dthCircleData: state.rechargeReducer.dthCircleData
  
  });
  
  const mapDispatchToProps = dispatch => ({ dispatch });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Dthoperator);


const styles = StyleSheet.create({
    proceedButtonContainer: {
    position:'absolute',
    bottom:Sizes.fixPadding,
    width:'100%',
    paddingHorizontal:Sizes.fixHorizontalPadding * 2
    },
    modalContainer: {
        backgroundColor: Colors.white,
        padding: Sizes.fixHorizontalPadding * 3,
        borderTopRightRadius: Sizes.fixHorizontalPadding * 3,
        borderTopLeftRadius: Sizes.fixHorizontalPadding * 3,
        
    },
    maincontainer: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },  rightIcon: {
        ...Fonts._12MontserratRegular,
        color: Colors.primaryTheme
    },
})