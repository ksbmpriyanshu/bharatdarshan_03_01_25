import { SafeAreaView, StyleSheet, Text, View,FlatList, KeyboardAvoidingView, TextInput, Platform } from 'react-native'
import React, { useState } from 'react'
import MyStatusBar from '../../../components/StatusBar'
import { Colors, Fonts, SCREEN_WIDTH, Sizes } from '../../../assests/style'
import Header from '../../../components/Header'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import { navigate } from '../../../navigations/NavigationServices'

const Yatrabook = () => {
  const [tourCode, setTourCode] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [travelers, setTravelers] = useState('')
  const [address, setAddress] = useState('')
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
      <Header title={'Yatra Booking'}  tintColor={Colors.white} />
      <FlatList 
      ListHeaderComponent={
        <>
        {txtInput()}
        {Fulladdress()}
        {termscondition()}
        {Submitbutton()}
        </>
      }
      contentContainerStyle={{paddingBottom:Sizes.fixPadding}}
      />
      

    </SafeAreaView>
  )
  function Submitbutton() {
    return(
      <View style={{marginHorizontal:Sizes.fixHorizontalPadding * 1.4,marginTop:Sizes.fixPadding}}>
        <Button title={'Complete'} onPress={() => navigate('paymentscreen')}/>
      </View>
    )
  }
  function termscondition() {
    return(
      <View>
        
      </View>
    )
  }
  function Fulladdress() {
    return(
      <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ marginHorizontal: Sizes.fixHorizontalPadding * 1.5,marginTop:Sizes.fixPadding * 0.6}}>
        <Text style={{...Fonts._14MontserratRegular, fontWeight: '600'}}>Full Address</Text>
        <View style={{backgroundColor: '#F4F4F4', borderRadius: 10, marginTop: 5, paddingVertical: Sizes.fixPadding * 0.2, paddingHorizontal: Sizes.fixHorizontalPadding}}>
          <TextInput style={{ color: Colors.black, height:SCREEN_WIDTH * 0.3 }} selectionColor={Colors.black} value={address} onChangeText={(txt) => setAddress(txt)} placeholder='Enter Your Full Address' placeholderTextColor={'#A19B9B'}  multiline/>
        </View>
      </View>
     </KeyboardAvoidingView>
    )
  }
  function txtInput() {
    return (
      <View>
        <Input value={tourCode} onChangeText={(txt) => setTourCode(txt)} placeholder={'B4-1253'} title={'Tour Code'} />
        <Input value={name} onChangeText={(txt) => setName(txt)} placeholder={'Enter Your Name'} title={'Name'} />
        <Input value={phone} onChangeText={(txt) => setPhone(txt)} placeholder={'Enter Your Phone Number'} title={'Phone'} maxLength={10} />
        <Input value={email} onChangeText={(txt) => setEmail(txt)} placeholder={'Enter Your Email'} title={'Email'} />
        <Input value={travelers} onChangeText={(txt) => setTravelers(txt)} placeholder={'e.g, 4'} title={'No. of Travelers'}  />
      </View>
    )
  }
}

export default Yatrabook

const styles = StyleSheet.create({})