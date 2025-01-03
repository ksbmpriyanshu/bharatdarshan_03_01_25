import { StyleSheet, Text, View,TextInput,KeyboardAvoidingView, Platform  } from 'react-native'
import React from 'react'
import { Colors,Fonts, Sizes } from '../assests/style'

const Input = ({value,onChangeText,placeholder,keyboardType,secureTextEntry,title,title2,maxLength,editable}) => {
  return (
    <KeyboardAvoidingView 
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    <View style={{ marginHorizontal: Sizes.fixHorizontalPadding * 1.5,marginTop:Sizes.fixPadding * 0.6}}>
      <View style={{flexDirection:'row'}}>
      <Text style={{...Fonts._14MontserratRegular, fontWeight: '600'}}>{title}</Text>
      <Text style={{color:Colors.redA,left:Sizes.fixHorizontalPadding}}>{title2}</Text>
      </View>
      <View style={{backgroundColor: '#F4F4F4', borderRadius: 10, marginTop: 5, paddingVertical: Sizes.fixPadding * 0.2, paddingHorizontal: Sizes.fixHorizontalPadding}}>
        <TextInput style={{ color: Colors.black }} selectionColor={Colors.black} value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={'#A19B9B'} keyboardType={keyboardType} secureTextEntry={secureTextEntry} maxLength={maxLength} editable={editable}/>
      </View>
    </View>
  </KeyboardAvoidingView>
  )
}

export default Input

const styles = StyleSheet.create({})