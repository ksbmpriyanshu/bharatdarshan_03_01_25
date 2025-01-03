import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async() => {
    const authToken1 = await AsyncStorage.getItem('token');
    const authToken = JSON.parse(authToken1)
    console.log('token cinfig',authToken);
    return authToken;
};