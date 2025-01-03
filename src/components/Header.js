import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Sizes, Fonts, getFontSize } from '../assests/style';

const Header = ({ title, backgroundColor, tintColor }) => {
  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../assests/images/bdheader.png')} >
      <View style={[styles.headerContainer, { backgroundColor }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assests/icons/backarrow.png')} style={[styles.backIcon, { tintColor }]} />
        </TouchableOpacity>
        <Text style={[styles.title,]}>{title}</Text>
      </View>
    </ImageBackground>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    padding: Sizes.fixHorizontalPadding * 2,
    zIndex: 99,
  },
  backButton: {
    position: 'absolute',
    zIndex: 99,
    padding: Sizes.fixHorizontalPadding,
  },
  backIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',

  },
  title: {
    color: Colors.white,
    paddingHorizontal: Sizes.fixHorizontalPadding * 4,
    fontSize: getFontSize(15),
    fontWeight: '600',
  },
});
