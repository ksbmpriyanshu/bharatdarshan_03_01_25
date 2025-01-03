import { View, Text, Modal, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SCREEN_WIDTH } from '../assests/style';


const CustomerLoader = () => {
    const rotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {

        const rotate = Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 1500, // Adjust duration as needed
                useNativeDriver: true,
            })
        );

        rotate.start();

        return () => {
            rotate.stop();
        };
    }, []);

    
    const interpolatedRotateAnimation = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
        extrapolate: 'clamp', // Ensure smooth transition from 360 to 0
        extrapolateLeft: 'extend', // Ensure smooth transition from 0 to 360
    });

    return (
        <Animated.Image
            source={require('../assests/images/loader.png')}
            style={{ transform: [{ rotate: interpolatedRotateAnimation }], width: SCREEN_WIDTH * 0.3, height: SCREEN_WIDTH * 0.3, resizeMode: 'contain' }}
        />
    )
}

export default CustomerLoader