import React, { useEffect } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import MyStatusBar from '../../components/StatusBar';
import { Colors, Sizes, Fonts } from '../../assests/style';
import { color } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import * as CommonActions from '../../redux/actions/CommonActions';
import RenderHtml from 'react-native-render-html';
import { connect } from 'react-redux';

const AboutUs = ({aboutData,dispatch}) => {
  const navigation = useNavigation()
  useEffect(() => {
    dispatch(CommonActions.getAboutData())
  }, [])
console.log("aboutData",aboutData)
  const content = aboutData?.results?.aboutUs || '';

  const tagsStyles = {
    p: {
      ...Fonts._14MontserratMedium,
      marginBottom: 10,
    },
    li: {
      ...Fonts._14MontserratRegular,
      marginBottom: 10,
    },
    h2: {
      ...Fonts._14MontserratRegular,
      marginBottom: 10,
      fontSize:20,
    },
  };
  const preprocessHtml = (html) => {
    return html.replace(/<p>(&nbsp;|\s)*<\/p>/g, '');
  };
  return (
    <View style={{ flex: 1 }}>
      {headerInfo()}
      <View style={{ flex: 1,padding:10,}}>
        {/* <Text style={{ color: 'black', fontFamily: 'Montserrat-Regular' }}>About Us is Comming Soon..</Text> */}
        <RenderHtml contentWidth={300} source={{ html: preprocessHtml(content) }}
          tagsStyles={tagsStyles} />
      </View>
    </View>
  )
  
  function headerInfo() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: Sizes.fixHorizontalPadding * 2, backgroundColor: Colors.primaryTheme }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assests/icons/back_arrow.png')} style={{ width: 24, height: 24, resizeMode: 'contain' }} tintColor={Colors.white} />
        </TouchableOpacity>
        <Text style={{ ...Fonts._16MontserratMedium, marginLeft: Sizes.fixHorizontalPadding * 2,color:"#fff" }}>About Us</Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  aboutData: state.common.aboutData,

});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
