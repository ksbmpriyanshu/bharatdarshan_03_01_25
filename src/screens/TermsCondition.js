import { FlatList,ScrollView, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import MyStatusBar from '../components/StatusBar'
import { Colors, Fonts, Sizes, getFontSize } from '../assests/style'
import Header from '../components/Header'
import { connect } from 'react-redux'
import * as CommonActions from '../redux/actions/CommonActions'
import RenderHtml from 'react-native-render-html';

const TermsCondition = ({ dispatch, termsCondition }) => {

    useEffect(() => {
        dispatch(CommonActions.getTermsCondition());
    }, [])
    console.log(termsCondition?.termsAndCondition, 'data termsAndCondition')
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
            <Header title={'Terms & Condition'} tintColor={Colors.white} />
            <ScrollView style={{padding:10}}>
            <RenderHtml
    contentWidth={300}
    source={{ html: preprocessHtml(termsCondition?.termsAndCondition || '') }}
    tagsStyles={tagsStyles}
/>
    <View style={{paddingVertical:20,}}></View>
    </ScrollView>
        </SafeAreaView>
    )
}
const mapStateToProps = state => ({
    termsCondition: state.common.termsCondition,

});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(TermsCondition);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Sizes.fixPadding,
        backgroundColor: '#fff',
    },
    heading: {
        ...Fonts._18MontserratRegular
    },
    bullet: {
        fontSize: 16,
        lineHeight: 24,
    },
})