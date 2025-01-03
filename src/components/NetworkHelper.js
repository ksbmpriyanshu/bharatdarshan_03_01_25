
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NetworkInfo } from 'react-native-network-info';

const IP_KEY = 'IPv4_ADDRESS';

export const fetchAndStoreIPv4Address = async () => {
  try {
    const ipv4Address = await NetworkInfo.getIPV4Address();
    // await AsyncStorage.setItem(IP_KEY, ipv4Address);
    return ipv4Address;
  } catch (error) {
    console.error("Error fetching or storing IP address:", error);
    return null;
  }
};

export const getStoredIPv4Address = async () => {
  try {
    const ipv4Address = await AsyncStorage.getItem(IP_KEY);
    return ipv4Address;
  } catch (error) {
    console.error("Error retrieving IP address:", error);
    return null;
  }
};
