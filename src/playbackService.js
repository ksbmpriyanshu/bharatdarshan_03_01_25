// playbackService.js
import TrackPlayer, { Capability, Event, State, usePlaybackState } from 'react-native-track-player';
import { Platform } from 'react-native';

module.exports = async function() {
  TrackPlayer.addEventListener(Event.PlaybackState, async (state) => {
    const playbackState = await TrackPlayer.getState();
    // Handle any state change here and notify your app if necessary
    console.log('Playback State Changed:', playbackState);
  });

  TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async ({ track }) => {
    console.log('Track Changed:', track);
  });

  TrackPlayer.addEventListener(Event.PlaybackError, async (error) => {
    console.log('Playback Error:', error);
  });

  // Set capabilities when the track starts playing
  TrackPlayer.updateOptions({
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
    playIcon: Platform.OS === 'ios' ? 'play' : 'play_arrow',
    pauseIcon: Platform.OS === 'ios' ? 'pause' : 'pause_circle_filled',
  });

  // Register the events you'd like to handle (play, pause, etc.)
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.stop());
  TrackPlayer.addEventListener(Event.RemoteNext, () => TrackPlayer.skipToNext());
  TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.skipToPrevious());
};
