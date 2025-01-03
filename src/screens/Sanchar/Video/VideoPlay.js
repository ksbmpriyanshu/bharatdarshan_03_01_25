import React, { useRef } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import MyStatusBar from '../../../components/StatusBar';
import Header from '../../../components/Header';
import Loader from '../../../components/Loader';
import Video from 'react-native-video';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import { Text } from 'react-native-elements';
import { Colors, Fonts, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes } from '../../../assests/style'

const VideoPlay = ({ route }) => {

    const videoId = route.params?.item?.video;
    const videoUrl = `https://bharatdarshan.app/${videoId}`;
    console.log("VideoUrl", route.params?.item?.title);

    const videoRef = useRef(null);

    const onBuffer = (buffering) => {
        console.log("Buffering: ", buffering);
    };

    const onError = (error) => {
        console.log("Error: ", error);
        Alert.alert('Error', 'An error occurred while loading the video.');
    };

    return (
        <SafeAreaView style={styles.container}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
            <Header title='Video' tintColor={Colors.white} />

            <Loader />

            <View style={styles.videoContainer}>
                <Video
                    source={{ uri: videoUrl }}
                    ref={videoRef}
                    onBuffer={onBuffer}
                    onError={onError}
                    style={styles.backgroundVideo}
                    controls={true}
                    resizeMode="cover"
                   
                />
            </View>

            {/* <ScrollView style={{ padding: 13, }}>
                <Text style={styles.videoTitle}>What is Lorem Ipsum?
                </Text>
                <Text style={styles.videoDescription}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Text>
                <View style={{ paddingVertical: 30, }}></View>
            </ScrollView> */}
        </SafeAreaView>
    );
};

export default VideoPlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    videoContainer: {
        alignItems: 'center',
        flex:1,
    },
    backgroundVideo: {
        width: '100%',
        height: "100%",
    },
    videoTitle: {
        ...Fonts._12MontserratRegular,
        fontSize: 18,
    },
    videoDescription: {
        ...Fonts._12MontserratRegular,
        fontSize: 13,
        textAlign: "justify",
        marginTop: 20,
    }
});
