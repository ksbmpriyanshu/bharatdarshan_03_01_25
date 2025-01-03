import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MyStatusBar from '../../../components/StatusBar'
import Header from '../../../components/Header'
import { Colors, Fonts } from '../../../assests/style'
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native'
import Button from '../../../components/Button'
import { showToastMessage } from '../../../utils/services'
import { connect, useSelector } from 'react-redux'
import * as ShoppingActions from "../../../redux/actions/ShoppingActions"

const Consultant = ({dispatch}) => {
  const customerdata = useSelector((state) => state.registrationReducer.customerdata);
  const [name ,setName] = useState();
  const [phone ,setPhone] = useState();
  const [email ,setEmail] = useState();
  const [address ,setAddress] = useState();
  const [description ,setDescription] = useState();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const submitConsultant = ()=>{
    const requestData = {
      name:name,
      email:email,
      phoneNo:phone,
      address:address,
      expertiseId:"67516ec514ec7e34374f483b",
      categoryId:"674ffaac11b21fc2362b10e3",
      description:description,
      customerId:customerdata?._id
  }
  dispatch(ShoppingActions.getConsultant(requestData));
  setName('')
  setPhone('')
  setEmail('')
  setAddress('')
  setDescription('')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white, }}>
      <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
      <Header title={'Consultancy'} tintColor={Colors.white} />
      <View style={{padding:15,paddingHorizontal:20,}}>
      <Text style={styles.consultantName}>Consultation Form: Guiding You Towards Success</Text>

      <View style={{marginTop:10,}}>
        <Text style={styles.inputName}>Name*</Text>
        <TextInput 
        Placeholder='enter your name'
        style={styles.input}
        value={name}
        onChangeText={setName}
        />
      </View>
      <View style={{marginTop:10,}}>
        <Text style={styles.inputName}>Email*</Text>
        <TextInput 
        Placeholder='enter your email'
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        />
      </View>
      <View style={{marginTop:10,}}>
        <Text style={styles.inputName}>Phone*</Text>
        <TextInput 
        Placeholder='enter your phone'
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType='numeric'
        maxLength={10}
        />
      </View>
      <View style={{marginTop:10,}}>
        <Text style={styles.inputName}>Address*</Text>
        <TextInput 
        Placeholder='enter your address'
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        />
      </View>
      <View style={{marginTop:10,}}>
        <Text style={styles.inputName}>Addressing Your Specific Needs*</Text>
        <TextInput 
        Placeholder='enter your name'
        style={[styles.input,{height:100,textAlignVertical:"top"}]}
        value={description}
        onChangeText={setDescription}
        />
      </View>
      <View style={{marginTop:20,}}>
      <Button title={"Submit"}  
      onPress={()=>{
        if(!name || !email || !phone || !address || !description){
          showToastMessage({message:"Enter the required field"})
        }else if(phone?.length < 10){
          showToastMessage({message:"Enter the correct phone"})
        }else if(!emailRegex.test(email)){
          showToastMessage({message:"Enter a valid email"})
        }else {
          submitConsultant()
        }
      }
    }
      />
      </View>
      </View>
    
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
 

});

const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Consultant);

const styles = StyleSheet.create({
  consultantName: {
    ...Fonts._16MontserratRegular,
    marginBottom: 3,
    
  },
  inputName: {
    ...Fonts._14MontserratRegular,
    marginBottom: 3,
    marginBottom:5,
    
  },
  input:{
    borderWidth:0.5,
    borderColor:"#bababa",
    ...Fonts._14MontserratRegular,
    paddingLeft:10,
  }
})