import { Image, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View, ActivityIndicator, } from 'react-native'
import React, { useEffect, useState } from 'react'
import MyStatusBar from '../../../components/StatusBar'
import { Colors, Fonts, SCREEN_WIDTH, Sizes } from '../../../assests/style'
import Header from '../../../components/Header'
import LinearGradient from 'react-native-linear-gradient'
import { ScreenHeight } from 'react-native-elements/dist/helpers'
import Slider from '@react-native-community/slider'
import TrackPlayer, { Capability, usePlaybackState, useProgress, State } from 'react-native-track-player';
import { api_urls } from '../../../utils/api-urls'
import PauseIcon from './svgicon/PauseIcon'
import PreviousTenIcon from './svgicon/PreviousTenIcon'
import NextTenIcon from './svgicon/NextTenIcon'
import NextIcon from './svgicon/NextIcon'
import PreviousIcon from './svgicon/PreviousIcon'
import PlayIcon from './svgicon/PlayIcon'
import DisableNextBtn from './svgicon/DisableNextBtn'
import DisablePreviousBtn from './svgicon/DisablePreviousBtn'
import AsyncStorage from '@react-native-async-storage/async-storage'
import playbackService from './../../../playbackService';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";
import { connect } from 'react-redux'
import { imageurl } from '../../../utility/base'
const Playsong = ({ route, audioDataById }) => {
  const chooseSong = route.params;
  console.log("chooseSong", chooseSong)
  console.log(audioDataById?.url, "audioDataById")
  console.log("selected son-g", chooseSong?.id)
  const playbackState = usePlaybackState();
  const { position, duration } = useProgress();
  const handleSliderChange = async (value) => {
    await TrackPlayer.seekTo(value);
  };
 
  const [currentIndex, setCurrentIndex] = useState(audioDataById.findIndex(song => song.id === chooseSong.id));
  console.log("currentIndex", currentIndex)
  const [isPlayerSetup, setIsPlayerSetup] = useState(false);
  useEffect(() => {
    if (!isPlayerSetup) {
      setupPlayer();
    }
    playbackService();
  }, [isPlayerSetup]);

  useEffect(() => {
    const onTrackChange = TrackPlayer.addEventListener('playback-track-changed', async ({ nextTrack }) => {
      console.log('Next Track Index:', nextTrack);
      setCurrentIndex(nextTrack);
    });

    return () => {
      onTrackChange.remove();
    };
  }, []);
  useEffect(() => {
    const setupNewSong = async () => {
      await TrackPlayer.reset();
      const newIndex = audioDataById.findIndex(song => song.id === chooseSong.id);
      setCurrentIndex(newIndex);
      await TrackPlayer.add(audioDataById);
      await TrackPlayer.skip(newIndex);
      await TrackPlayer.play();
    };

    setupNewSong();
  }, [chooseSong]);


  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer()
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
      });

      await TrackPlayer.add(audioDataById)
      setIsPlayerSetup(true);
      await TrackPlayer.skip(currentIndex);
      await TrackPlayer.play();
    } catch (e) {
      console.log(e)
    }


  }

  const togglePlayBack = async (playbackState) => {
    console.log("playbackState", playbackState);

    if (playbackState.state === State.Paused ||
      playbackState.state === State.Ready ||
      playbackState.state === State.Buffering ||
      playbackState.state === State.Connecting
    ) {
      await TrackPlayer.play();
    } else if (playbackState.state === State.Playing) {
      await TrackPlayer.pause();
    }
  };

  const playNextSong = async () => {
    const nextIndex = (currentIndex + 1) % audioDataById.length;
    console.log('Next Song Index:', nextIndex);
    setCurrentIndex(nextIndex);
    await TrackPlayer.skipToNext();
    togglePlayBack();
  };

  const playPreviousSong = async () => {
    const previousIndex = (currentIndex - 1 + audioDataById.length) % audioDataById.length;
    console.log('Previous Song Index:', previousIndex);
    setCurrentIndex(previousIndex);

    await TrackPlayer.skipToPrevious();
    togglePlayBack();
  };
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);


    const formattedTime = `${hrs > 0 ? `${hrs}:` : ""}${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`;

    return formattedTime;
  };
  const currentSong = audioDataById[currentIndex];
  console.log("currentSong", currentSong)
  return (
    <SafeAreaView style={{ flex: 1, }}>
      <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-contnet'} />
      <LinearGradient colors={[Colors.primaryTheme, '#FFFFFF', '#FFFFFF']} style={styles.linearGradient}
        start={{ x: 0, y: 0 }} end={{ x: 0, y: 0.7 }}
      >
        <Header title={'Podcast Details'} tintColor={Colors.white} />
        {text()}
        {Imagpart(currentSong)}
        {incdec(currentSong)}
        {Sliders()}
        {downpart()}
      </LinearGradient>
    </SafeAreaView>
  )


  function downpart() {
    return (
      <View style={{ flex: 0.25, width: '92%', alignSelf: 'center', justifyContent: 'center' }}>
        <View style={{ alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
          <TouchableOpacity activeOpacity={0.5} onPress={async () => playPreviousSong()} disabled={currentIndex === 0} >

            {currentIndex === 0 ? <DisablePreviousBtn /> : <PreviousIcon />}
          </TouchableOpacity>
          {/* <TouchableOpacity activeOpacity={0.5}>
            <PreviousTenIcon />
           
          </TouchableOpacity> */}
          <TouchableOpacity activeOpacity={0.5} onPress={async () => {
            togglePlayBack(playbackState)
          }}>
            {playbackState.state === State.Paused || playbackState.state === State.Ready ? <PauseIcon /> : <PlayIcon />}

          </TouchableOpacity>
          {/* <TouchableOpacity activeOpacity={0.5}>
            <NextTenIcon />
          </TouchableOpacity> */}
          <TouchableOpacity activeOpacity={0.5} onPress={async () => playNextSong()} disabled={currentIndex === audioDataById.length - 1} >



            {currentIndex === audioDataById.length - 1 ? <DisableNextBtn /> : <NextIcon />}
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  function Sliders() {
    return (
      <View style={{ width: '95%', alignSelf: 'center' }}>
        <Slider
          value={position}
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor={Colors.primaryTheme}
          maximumTrackTintColor={Colors.primaryTheme}
          thumbTintColor={Colors.primaryTheme}
          onValueChange={handleSliderChange}
        />
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: responsiveScreenWidth(5) }}>
          <Text style={{ fontSize: 11 }}>{formatTime(position)}</Text>
          <Text style={{ fontSize: 11 }}>{formatTime(duration)}</Text>
        </View>
      </View>
    )
  }
  function incdec(currentSong) {

    return (
      <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center', top: Sizes.fixPadding }}>

        <Text style={{ ...Fonts._16MontserratMedium, marginTop: Sizes.fixPadding * 2, }}>{currentSong.title}</Text>
        <Text style={{ ...Fonts._13MontserratMedium, color: Colors.grey, flex: 0.35, textAlignVertical: 'center' }}> {currentSong.artist}</Text>

      </View>
    )
  }
  function Imagpart(currentSong) {
    console.log(currentSong, "currentSong")
    return (
      <View style={{ flex: 0.25, }}>
        <Image
          source={{ uri: imageurl + currentSong.artwork }}
          style={{ width: '100%', height: ScreenHeight * 0.3, resizeMode: 'contain' }}
        />
      </View>
    )
  }
  function text() {
    return (
      <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ ...Fonts._18MontserratRegular, color: Colors.white }}>
          Podcast Detail
        </Text>
      </View>
    )
  }
}


const mapStateToProps = state => ({
  audioDataById: state.sancharReducer.audioDataById,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Playsong);
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1
  }
})