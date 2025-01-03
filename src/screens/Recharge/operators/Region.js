import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, FlatList } from 'react-native'
import { Colors, Sizes, Fonts, SCREEN_WIDTH } from '../../../assests/style'
import Header from '../../../components/Header'
import MyStatusBar from '../../../components/StatusBar'

const Region = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
      <Header title={'Select Your Circle'}  tintColor={Colors.white} />
      <KeyboardAvoidingView
        style={{ flex: 1, marginVertical: Sizes.fixPadding }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        {textname()}
        {SearchBar()}
        {RegionItem()}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
  function RegionItem() {
    const simdata = [
        {
            name: 'Haryana'
        },
        {
            name: 'Assam' 
        },
        {
            name: 'Uttar Pradesh'
        },
        {
            name: 'Himanchal' 
        },
         {
            name: 'uttrakhand'
        },
        {
            name: 'Madhay Pradesh' 
        },
    ]
    const renderItem = ({item}) => {
        return (
            <TouchableOpacity style={{borderBottomWidth:1,paddingVertical:Sizes.fixPadding * 1.5 ,marginHorizontal:Sizes.fixHorizontalPadding* 2,borderColor:'#9F9F9F',justifyContent:'center'}}
            activeOpacity={0.5}
            >
                <Text style={{...Fonts._16MontserratMedium,textTransform:'capitalize'}}>{item?.name}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ flex: 0.9,}}>
            <FlatList data={simdata} renderItem={renderItem} />
        </View>
    )
}
  function SearchBar() {
    return (
      <View style={styles.inputFieldContainer}>
        <TouchableOpacity>
          <Image source={require('../../../assests/icons/search.png')} style={styles.image} />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          maxLength={10}
          placeholder='Search Your Region'
          placeholderTextColor={Colors.grayA}
        />
      </View>
    )
  }

  function textname() {
    return (
      <View style={{  backgroundColor: '#EA751527', justifyContent: 'center', paddingHorizontal: Sizes.fixHorizontalPadding * 2,paddingVertical: Sizes.fixHorizontalPadding  }}>
        <Text style={{ ...Fonts._12MontserratRegular }}>Do not know your circle ?</Text>
        <Text style={{ ...Fonts._12MontserratRegular, color: '#665F5F', marginTop: Sizes.fixPadding * 0.3 }}>Select State/Area From where Your Purchased the SIM Card</Text>
      </View>
    )
  }
}

export default Region

const styles = StyleSheet.create({
  textInput: {
    width: '90%',
    ...Fonts._14MontserratRegular,
    color: '#3C3B3B',
  },
  inputFieldContainer: {
    marginTop: Sizes.fixPadding,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Sizes.fixHorizontalPadding,
    borderRadius: 10,
    marginHorizontal: Sizes.fixHorizontalPadding,
    borderWidth: 1,
    borderColor: '#D0D0D0'
  },
  image: {
    height: SCREEN_WIDTH * 0.05,
    width: SCREEN_WIDTH * 0.05,
    resizeMode: 'contain',
    tintColor: '#222222'
  },
})
