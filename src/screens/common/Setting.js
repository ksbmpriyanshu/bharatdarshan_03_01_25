import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import MyStatusBar from '../../components/StatusBar'
import Header from '../../components/Header'
import { Colors, SCREEN_WIDTH } from '../../assests/style'
import LinearGradient from 'react-native-linear-gradient'
import * as CommonActions from '../../redux/actions/CommonActions';
import { connect } from 'react-redux'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'

const Setting = ({ dispatch }) => {
    const navigation = useNavigation()
    const handledeleteaccont = () => {
        dispatch(CommonActions.deleteaccount())
    }
    const handledelete = () => {
        Alert.alert('Alert!', 'Are you sure you want to log out', [
            { text: 'Cancel', style: 'cancel', },
            { text: 'Yes', style: 'destructive', onPress: () => handledeleteaccont() }
        ])
    }
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
            <Header title={'Settings'} tintColor={Colors.white} />

            <View style={{ padding: 20, }}>
                <View style={{ marginBottom: 20, }}>
                    <Text style={{ textAlign: "center", color: "#000", fontFamily: 'Montserrat-Regular', }}>
                        Terms & Conditions
                    </Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('termscondition')
                    }}>
                        <LinearGradient
                            colors={['#E58634', '#BF6427', '#530201']}
                            style={[styles.button,]}
                            start={{ x: 0.5, y: 0.9 }}
                            end={{ x: 1, y: 0.8 }}
                        >
                            <Text style={styles.buttonText}>See Terms & Conditions</Text>
                            <Image source={require('../../assests/images/btndownimage.png')} style={{ height: SCREEN_WIDTH * 0.05, width: SCREEN_WIDTH, resizeMode: 'cover', position: 'absolute', bottom: 0 }} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 20, }}>
                    <Text style={{ textAlign: "center", color: "#000", fontFamily: 'Montserrat-Regular', }}>
                        Privacy Policy
                    </Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('privacy')
                    }}>
                        <LinearGradient
                            colors={['#E58634', '#BF6427', '#530201']}
                            style={[styles.button,]}
                            start={{ x: 0.5, y: 0.9 }}
                            end={{ x: 1, y: 0.8 }}
                        >
                            <Text style={styles.buttonText}>See Privacy Policy</Text>
                            <Image source={require('../../assests/images/btndownimage.png')} style={{ height: SCREEN_WIDTH * 0.05, width: SCREEN_WIDTH, resizeMode: 'cover', position: 'absolute', bottom: 0 }} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 20, }}>
                    <Text style={{ textAlign: "center", color: "#000", fontFamily: 'Montserrat-Regular', }}>
                        Refund Policy
                    </Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('refund')
                    }}>
                        <LinearGradient
                            colors={['#E58634', '#BF6427', '#530201']}
                            style={[styles.button,]}
                            start={{ x: 0.5, y: 0.9 }}
                            end={{ x: 1, y: 0.8 }}
                        >
                            <Text style={styles.buttonText}>See Refund Policy</Text>
                            <Image source={require('../../assests/images/btndownimage.png')} style={{ height: SCREEN_WIDTH * 0.05, width: SCREEN_WIDTH, resizeMode: 'cover', position: 'absolute', bottom: 0 }} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View>
                    <Image source={require('../../assests/images/delete-account.png')} style={styles.deleteImage} />
                    <Text style={{ textAlign: "center", color: "#000", fontFamily: 'Montserrat-Regular', }}>
                        Are you want to delete your account?
                    </Text>
                    <TouchableOpacity onPress={() => handledelete()}>
                        <LinearGradient
                            colors={['#E58634', '#BF6427', '#530201']}
                            style={[styles.button,]}
                            start={{ x: 0.5, y: 0.9 }}
                            end={{ x: 1, y: 0.8 }}
                        >
                            <Text style={styles.buttonText}>Delete Account</Text>
                            <Image source={require('../../assests/images/btndownimage.png')} style={{ height: SCREEN_WIDTH * 0.05, width: SCREEN_WIDTH, resizeMode: 'cover', position: 'absolute', bottom: 0 }} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Setting);
const styles = StyleSheet.create({
    buttonText: {
        color: Colors.white,
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        textAlign: "center",
        paddingVertical: 10,

    },
    button: {
        borderRadius: 100,
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    deleteImage: {
        width: responsiveScreenWidth(60),
        height: responsiveScreenWidth(60),
        alignSelf: "center",
        objectFit: "contain"
    }
})