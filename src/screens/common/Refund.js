import { StyleSheet, Text, View,SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import MyStatusBar from '../../components/StatusBar'
import { Colors, Fonts } from '../../assests/style'
import Header from '../../components/Header'
import * as CommonActions from '../../redux/actions/CommonActions';
import { connect } from 'react-redux'
import RenderHtml from 'react-native-render-html';

const Refund = ({dispatch,refundData}) => {
  useEffect(()=>{
    dispatch(CommonActions.getRefundData())
  },[])
  const content = refundData?.results?.refundPolicy || '';

  const tagsStyles = {
    p: {
        ...Fonts._14MontserratRegular,
        marginBottom: 10, 
 },
 li: {
  ...Fonts._14MontserratRegular,
  marginBottom: 10, 
},
};
const preprocessHtml = (html) => {
    return html.replace(/<p>(&nbsp;|\s)*<\/p>/g, ''); 
};
  return (
    <SafeAreaView style={{ flex: 1, }}>
    <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
    <Header title={'Refund'} tintColor={Colors.white} />
    <ScrollView style={{padding:10}}>
    <RenderHtml contentWidth={300} source={{ html: preprocessHtml(content)}} tagsStyles={tagsStyles}/>
    <View style={{paddingVertical:20,}}></View>
    </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
  refundData: state.common.refundData,

});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Refund);
const styles = StyleSheet.create({})