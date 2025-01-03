import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, FlatList, Linking } from 'react-native';
import Header from '../../components/Header';
import { Colors, Fonts, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../assests/style';
import MyStatusBar from '../../components/StatusBar';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import * as PoojaActions from "../../redux/actions/PoojaActions";
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { imageurl } from '../../utility/base';

const DailyDarshan = ({ dispatch, dailydarshandata }) => {
    useEffect(() => {
        dispatch(PoojaActions.getDailyDarshan());
    }, [dispatch]);

    const [expandedItems, setExpandedItems] = useState({});

    const toggleExpand = (id) => {
        setExpandedItems((prev) => ({
            ...prev,
            [id]: !prev[id], 
        }));
    };

    const MAX_LINES = 3; 
    const formatTime = (dateTime) => {
        if (!dateTime) return ""; 
        const date = new Date(dateTime); 
        const hours = date.getHours().toString().padStart(2, '0'); 
        const minutes = date.getMinutes().toString().padStart(2, '0'); 
        return `${hours}:${minutes}`; 
      };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
            <Header title={'Daily Darshan'} tintColor={Colors.white} />
            <View style={styles.banner}>
                <FlatList
                    data={dailydarshandata}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        const isExpanded = expandedItems[item._id] || false; 

                        return (
                            <View style={styles.poojaBox}>
                                <Image
                                    source={{ uri: `${imageurl}${item?.image}` }}
                                    style={styles.boxImage}
                                />
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 4, marginTop: 5 }}>
                                    <View>
                                        <Text style={styles.pujaText}>{item?.title}</Text>
                                        <Text style={styles.pujaPrice}>{item?.city}</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.btn}
                                        onPress={() => {
                                            Linking.openURL(item?.link);
                                        }}
                                    >
                                        <Text style={styles.liveText}>Live Darshan</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ paddingHorizontal: 4 }}>
                                    <Text
                                        style={styles.poojaDescription}
                                        numberOfLines={isExpanded ? null : MAX_LINES}
                                        ellipsizeMode="tail"
                                    >
                                        {item?.description}
                                    </Text>
                                    {item?.description?.length > 100 && (
                                        <TouchableOpacity onPress={() => toggleExpand(item._id)}>
                                            <Text style={styles.readMore}>
                                                {isExpanded ? 'Read Less' : 'Read More'}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                    <View style={styles.timings}>
                                        <Ionicons name="time-outline" size={18} color="#e05320" />
                                        <Text style={styles.timingText}>{formatTime(item?.startDateTime)} AM - {formatTime(item?.endDateTime)} PM</Text>
                                    </View>
                                </View>
                            </View>
                        );
                    }}
                    keyExtractor={(item) => item._id.toString()} // Use unique key for each item
                />
            </View>
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => ({
    dailydarshandata: state.poojaReducer.dailydarshandata,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DailyDarshan);

const styles = StyleSheet.create({
    boxImage: {
        width: '100%',
        height: responsiveScreenHeight(20),
        resizeMode: 'cover',
        borderRadius: 10,
    },
    poojaBox: {
        borderBottomWidth: 0.4,
        paddingBottom: 10,
        borderColor: '#bababa',
        marginBottom: 15,
    },
    banner: {
        padding: 10,
        marginBottom: 40,
    },
    pujaText: {
        color: '#000',
        fontSize: responsiveFontSize(2),
        width: responsiveScreenWidth(50),
        
    },
    pujaPrice: {
        fontSize: responsiveFontSize(2),
        width: responsiveScreenWidth(50),
        ...Fonts._13MontserratRegular,
    },
    btn: {
        backgroundColor: '#e05320',
        paddingVertical: 10,
        borderRadius: 4,
        width: responsiveScreenWidth(40),
    },
    liveText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: responsiveFontSize(1.5),
        fontWeight: '500',
    },
    poojaDescription: {
        ...Fonts._13MontserratLight,
        fontSize: 12,
        marginTop: 10,
        textAlign: 'justify',
        letterSpacing: 0.1,
    },
    readMore: {
        color: '#e05320',
        fontSize: responsiveFontSize(1.6),
        marginTop: 5,
        fontFamily: 'Montserrat-Medium',
    },
    timings: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 5,
    },
    timingText: {
        color: '#e05320',
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
    },
});
