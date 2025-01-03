/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import TrackPlayer from 'react-native-track-player';
const RNRedux = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

TrackPlayer.registerPlaybackService(() => require('./src/service'));
AppRegistry.registerComponent(appName, () => RNRedux);
