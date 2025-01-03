import { FlatList, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import MyStatusBar from '../../../components/StatusBar';
import { Colors, Fonts, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes } from '../../../assests/style';
import {
    responsiveScreenHeight,
    responsiveScreenWidth,
    responsiveScreenFontSize
} from "react-native-responsive-dimensions";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native-elements';
import * as SancharAction from '../../../redux/actions/SancharAction'
import { connect } from 'react-redux';
import { api_urls } from '../../../utils/api-urls';

const Live = ({ dispatch, liveVideo }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [isLongDescription, setIsLongDescription] = useState(false);

    useEffect(() => {
        dispatch(SancharAction.getLiveVideo())
    }, []);
    console.log("liveVideo", liveVideo)
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
            <Header title={"Live"} tintColor={Colors.white} />
            {liveVideo ? (
                 <ScrollView style={{ paddingHorizontal: 10 }}>
                 <FlatList
                     data={liveVideo?.data}
                     renderItem={({ item, index }) => (
                         <TouchableOpacity key={index} onPress={() => Linking.openURL(item?.Link)}>
                             <View style={styles.mainVideoView}>
                                 <Image
                                     source={{ uri: api_urls + item?.image }}
                                     style={{ width: "100%", height: 150, borderRadius: 10, resizeMode: "contain" }}
                                 />
                                 <Ionicons name="play-circle" color={Colors.primaryTheme} size={40} style={{
                                     position: "absolute",
                                     left: responsiveScreenWidth(40),
                                     top: responsiveScreenHeight(9)
                                 }} />
                                 <Text style={styles.videoTitle}>{item?.Title}</Text>

                                 <Text
                                     style={styles.videoDescription}
                                     numberOfLines={showFullDescription ? undefined : 2}
                                     onTextLayout={(e) => setIsLongDescription(e.nativeEvent.lines.length > 2)}
                                 >
                                     {item?.Description}
                                 </Text>

                                 {isLongDescription && (
                                     <TouchableOpacity onPress={() => setShowFullDescription(!showFullDescription)}>
                                         <Text style={styles.readMoreText}>
                                             {showFullDescription ? 'Read Less' : 'Read More'}
                                         </Text>
                                     </TouchableOpacity>
                                 )}
                             </View>
                         </TouchableOpacity>
                     )}
                 />

                 <View style={{ paddingVertical: 10 }}></View>
             </ScrollView>
            ) : (
                <View style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, }}>
                <Text>No data here!</Text>
            </View>


              
            )}


        </SafeAreaView>
    );
};

const mapStateToProps = state => ({
    liveVideo: state.sancharReducer.liveVideo,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Live);

const styles = StyleSheet.create({
    videoTitle: {
        ...Fonts._14MontserratRegular,
        marginTop: Sizes.fixPadding * 0.1,
        paddingHorizontal: Sizes.fixHorizontalPadding * 2,
        color: Colors.white,
        marginTop: 10,
        fontSize: 15,
    },
    mainVideoView: {
        backgroundColor: Colors.primaryTheme,
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
    },
    videoDescription: {
        ...Fonts._14MontserratRegular,
        marginBottom: Sizes.fixPadding * 0.5,
        paddingHorizontal: Sizes.fixHorizontalPadding * 2,
        color: Colors.white,
        fontSize: 10,
    },
    readMoreText: {
        ...Fonts._14MontserratRegular,
        marginBottom: Sizes.fixPadding * 0.5,
        paddingHorizontal: Sizes.fixHorizontalPadding * 2,
        color: Colors.black,
        fontSize: 10,
    },
});
