import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image, Alert, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes, getFontSize, } from '../../../../assests/style'
import { navigate } from '../../../../navigations/NavigationServices'
import { connect } from 'react-redux'
import * as SancharAction from '../../../../redux/actions/SancharAction'
import { api_urls } from '../../../../utils/api-urls';
import { imageurl } from '../../../../utility/base';
import YoutubeIframe from 'react-native-youtube-iframe';

const ChildPodcastAudio = ({ dispatch, audioData, audioDataById, customerdata }) => {
    const [isFilled, setIsFilled] = useState(false);
    const [playing, setPlaying] = useState(false);
    const handlePlayPause = () => {
        setPlaying(!playing); 
    };

    const audio_id = audioData[0]?._id;
    const customer_id = customerdata?._id;

    const audioArray = audioDataById.filter(item => !item.link);
    const videoArray = audioDataById.filter(item => item.link);
    console.log("videoArray--", videoArray)
    useEffect(() => {
        const payload = {
            data: { audioSubCategoryId: audio_id },
        }
        dispatch(SancharAction.getAudioById(payload));
    }, [audio_id])
    const [audio, setAudio] = useState();

    return (
        <View>

            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setAudio(true)
                    }}
                    style={[styles.toggleButton, audio && styles.activeToggleButton]}>
                    <Text style={styles.toggleText}>Audio</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setAudio(false)
                    }}
                    style={[styles.toggleButton, !audio && styles.activeToggleButton]} >
                    <Text style={styles.toggleText}>Video</Text>
                </TouchableOpacity>
            </View>
            {audio ? audiosong() : videosong()}

        </View>
    )

    function audiosong() {

        const renderItem = ({ item }) => {
            const toggleIcon = () => {
                const payload = {
                    data: {
                        userId: customer_id,
                        audioId: item?._id,
                    },
                    audioSubCategoryId: audio_id
                }
                dispatch(SancharAction.getFavouriteAudio(payload));
            };

            const filled = isFilled[item?._id] || false;
            console.log("song item----", item?.artwork)
            // return false
            return (
                <TouchableOpacity style={{ paddingHorizontal: Sizes.fixHorizontalPadding, marginTop: Sizes.fixPadding, flexDirection: 'row', backgroundColor: '#06004706', paddingVertical: 10, borderRadius: 10, }} onPress={() => navigate('playsong', item)}>
                    <Image source={{ uri: `${imageurl}${item?.artwork}` }} style={{ width: SCREEN_WIDTH * 0.23, height: SCREEN_HEIGHT * 0.13, borderRadius: 10, resizeMode: "cover" }} />
                    <View style={{ marginLeft: Sizes.fixHorizontalPadding * 2, flexDirection: 'row', justifyContent: 'space-between', width: SCREEN_WIDTH * 0.5 }}>
                        <View>
                            <Text style={styles.txt}>{item?.title}</Text>
                            <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                                <Text style={{ ...Fonts._12MontserratMedium }}>{item?.artist}</Text>
                                {/* <View style={{ borderWidth: 0.8, width: 1, marginHorizontal: Sizes.fixHorizontalPadding, borderColor: Colors.black }}></View>
                                <Text style={{ ...Fonts._12MontserratMedium }}>25:30</Text> */}
                            </View>
                            <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: Colors.primaryTheme, justifyContent: 'center', padding: Sizes.fixPadding * 0.6, borderRadius: 20, alignItems: 'center', width: SCREEN_WIDTH * 0.25 }} onPress={() => navigate('playsong', item)}>
                                <Image source={require('../../../../assests/icons/play.png')} style={{ height: SCREEN_WIDTH * 0.06, resizeMode: 'contain', width: SCREEN_WIDTH * 0.05 }} />
                                <Text style={styles.txt3}>Play</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    {/* <TouchableOpacity style={{position:"absolute",right:5,top:10}} onPress={() => toggleIcon(item?._id)}>
                            {item?.favourite !== 'Unlike' ? (<Ionicons name='heart' color={Colors.redA} size={25} style={{ marginTop: Sizes.fixPadding }} />) : (<Ionicons name='heart-outline' color={Colors.black} size={25} style={{ marginTop: Sizes.fixPadding }} />)}
                        </TouchableOpacity> */}
                </TouchableOpacity>
            )
        }
        return (
            <View style={{ marginHorizontal: Sizes.fixHorizontalPadding * 2, padding: Sizes.fixPadding, marginTop: Sizes.fixPadding, borderRadius: 10, }}>
                <FlatList data={audioArray} renderItem={renderItem} />
            </View>
        )
    }
    function videosong() {

        const renderItem = ({ item }) => {
            const toggleIcon = () => {
                const payload = {
                    data: {
                        userId: customer_id,
                        audioId: item?._id,
                    },
                    audioSubCategoryId: audio_id
                }
                dispatch(SancharAction.getFavouriteAudio(payload));
            };

            const filled = isFilled[item?._id] || false;
            return (
                    <View style={{ paddingHorizontal: Sizes.fixHorizontalPadding, marginTop: Sizes.fixPadding, backgroundColor: '#06004706', paddingVertical: 10}}>
                        <YoutubeIframe
                            height={150}
                            width={SCREEN_WIDTH*0.8}
                            videoId={item?.link.split('v=')[1]?.split('&')[0]}
                            play={playing}
                        />


                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", paddingHorizontal: 10, }}>
                            <View>
                                <Text style={styles.txt}>{item?.title}</Text>
                                <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                                    <Text style={{ ...Fonts._12MontserratMedium }}>{item?.artist}</Text>

                                </View>
                            </View>
                            <View>
                                <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: Colors.primaryTheme, justifyContent: 'center', padding: Sizes.fixPadding * 0.6, borderRadius: 20, alignItems: 'center', width: SCREEN_WIDTH * 0.25 }}
                                 onPress={handlePlayPause}
                                >
                                    <Image source={require('../../../../assests/icons/play.png')} style={{ height: SCREEN_WIDTH * 0.06, resizeMode: 'contain', width: SCREEN_WIDTH * 0.05 }} />
                                    <Text style={styles.txt3}>Play</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>


            )
        }
        return (
            <View style={{ marginHorizontal: Sizes.fixHorizontalPadding * 2, padding: Sizes.fixPadding, marginTop: Sizes.fixPadding, borderRadius: 10, }}>
                <FlatList data={videoArray} renderItem={renderItem} />
            </View>
        )
    }
}
const mapStateToProps = state => ({
    audioData: state.sancharReducer.audioData,
    audioDataById: state.sancharReducer.audioDataById,
    customerdata: state.registrationReducer.customerdata
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ChildPodcastAudio);

const styles = StyleSheet.create({
    txt: {
        ...Fonts._14MontserratRegular
    },
    txt3: {
        fontSize: getFontSize(14),
        color: Colors.white,
        fontFamily: 'Montserrat-Medium',
        marginLeft: 5
    },
    toggleContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        padding: Sizes.fixHorizontalPadding * 0.4,
        borderRadius: 5,
        paddingHorizontal: 20,
        gap: 10,
        marginTop: 10,
    },
    toggleButton: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixHorizontalPadding,
        borderRadius: 5,
        backgroundColor: Colors.white,
    },
    activeToggleButton: {
        backgroundColor: '#FBBC04',
    },
    toggleText: {
        ...Fonts._16MontserratRegular,
    },
    activeToggleText: {
        ...Fonts._16MontserratRegular,
    },
    videoModal: {
        position: "absolute",
        flex: 1,
        backgroundColor: "#000"
    }

})