import { PermissionsAndroid, Text, ToastAndroid } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import messaging from '@react-native-firebase/messaging';

export const DurationComponent = ({ duration, style }) => {
  // Handle invalid duration
  if (isNaN(duration) || duration === null || duration === undefined) {
    return (
      <Text style={style}>
        00h 00m
      </Text>
    );
  }

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return (
    <Text style={style}>
      {`${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m`}
    </Text>
  );
};

export const getFcmToken = async () => {
  try {
    const hasPermission = await messaging().hasPermission();
    if (hasPermission) {
      const token = await messaging().getToken();
      return token;
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};
export const showToastMessage = ({ message = '' }) => {
  try {
    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravityAndOffset(message, 200, 20, 25, 10);
    } else {
    }
  } catch (e) {
    console.log(e);
  }
};

export const imagePicker = async ({ type }) => {
  console.log(type, 'type')
  try {
    const options = {
      mediaType: 'photo',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: false,
    };

    const cameraData = async () => {
      try {
        const response = await ImagePicker.launchCamera(options);
        if (response.didCancel) {
          console.log('user cancel');
          return null;
        } else if (response.errorCode) {
          console.log(response.errorCode);
          return null;
        } else if (response.errorMessage) {
          console.log(response.errorMessage);
          return null;
        } else {
          return response.assets;
        }
      } catch (e) {
        console.log(e)
        return null
      }

    }

    if (type == 'capture') {
      const result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)
      if (result) {
        return cameraData()
      } else {
        const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          return cameraData()
        }
      }

    } else {
      const response = await ImagePicker.launchImageLibrary(options);
      if (response.didCancel) {
        console.log('user cancel');
        return null;
      } else if (response.errorCode) {
        console.log(response.errorCode);
        return null;
      } else if (response.errorMessage) {
        console.log(response.errorMessage);
        return null;
      } else {
        return response.assets;
      }
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

const inidanNumber = Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  currencyDisplay: 'symbol',
  minimumFractionDigits: 1
});

export const showNumber = value => {
  return inidanNumber.format(value);
};

export const formatFlightTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}
