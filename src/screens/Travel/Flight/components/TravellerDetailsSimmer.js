import { View, Text, Modal, ScrollView } from 'react-native'
import React from 'react'
import { Skeleton } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, SCREEN_WIDTH, Sizes } from '../../../../assests/style';

const CustomLinearGradient = (props) => {
    return (
        <LinearGradient
            {...props}
            colors={[Colors.grayG, Colors.grayC,]} // Customize your colors here
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        />
    );
};

const TravellerDetailsSimmer = ({ visible }) => {
    console.log(visible)
    return (
        <Modal
            visible={visible}
        >

            <View style={{ flex: 1, backgroundColor: Colors.white, paddingVertical: Sizes.fixPadding, alignItems: 'center' }}>
                <ScrollView>
                    <Skeleton
                        LinearGradientComponent={CustomLinearGradient}
                        animation='wave'
                        width={SCREEN_WIDTH * 0.95}
                        height={10}
                        style={{ borderRadius: 10, marginBottom: Sizes.fixPadding * 2, backgroundColor: Colors.grayG }}
                    />

                    <Skeleton
                        LinearGradientComponent={CustomLinearGradient}
                        animation="wave"
                        width={SCREEN_WIDTH * 0.95}
                        height={50}
                        style={{ borderRadius: Sizes.fixPadding * 0.5, marginBottom: Sizes.fixPadding, backgroundColor: Colors.grayG }}
                    />

                    <Skeleton
                        LinearGradientComponent={CustomLinearGradient}
                        animation="wave"
                        width={SCREEN_WIDTH * 0.95}
                        height={50}
                        style={{ borderRadius: Sizes.fixPadding * 0.5, marginBottom: Sizes.fixPadding * 3, backgroundColor: Colors.grayG }}
                    />
                    <View style={{ width: SCREEN_WIDTH * 0.95, marginBottom: Sizes.fixPadding }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                            <Skeleton
                                LinearGradientComponent={CustomLinearGradient}
                                animation="wave"
                                width={SCREEN_WIDTH * 0.28}
                                height={10}
                                style={{ borderRadius: Sizes.fixPadding * 0.5, backgroundColor: Colors.grayG }}

                            />
                            <Skeleton
                                LinearGradientComponent={CustomLinearGradient}
                                animation="wave"
                                width={SCREEN_WIDTH * 0.28}
                                height={10}
                                style={{ borderRadius: Sizes.fixPadding * 0.5, backgroundColor: Colors.grayG }}

                            />
                            <Skeleton
                                LinearGradientComponent={CustomLinearGradient}
                                animation="wave"
                                width={SCREEN_WIDTH * 0.28}
                                height={10}
                                style={{ borderRadius: Sizes.fixPadding * 0.5, backgroundColor: Colors.grayG }}

                            />

                        </View>
                    </View>
                    <Skeleton
                        LinearGradientComponent={CustomLinearGradient}
                        animation="wave"
                        width={SCREEN_WIDTH * 0.95}
                        height={SCREEN_WIDTH * 0.4}
                        style={{ borderRadius: Sizes.fixPadding * 0.5, marginBottom: Sizes.fixPadding * 2, backgroundColor: Colors.grayG }}
                    />
                    <View style={{ width: SCREEN_WIDTH * 0.95, marginBottom: Sizes.fixPadding }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                            <Skeleton
                                LinearGradientComponent={CustomLinearGradient}
                                animation="wave"
                                width={SCREEN_WIDTH * 0.5}
                                height={10}
                                style={{ borderRadius: Sizes.fixPadding * 0.5, backgroundColor: Colors.grayG }}

                            />
                            <Skeleton
                                LinearGradientComponent={CustomLinearGradient}
                                animation="wave"
                                width={SCREEN_WIDTH * 0.2}
                                height={10}
                                style={{ borderRadius: Sizes.fixPadding * 0.5, backgroundColor: Colors.grayG }}

                            />

                        </View>
                    </View>
                    <Skeleton
                        LinearGradientComponent={CustomLinearGradient}
                        animation="wave"
                        width={SCREEN_WIDTH * 0.95}
                        height={SCREEN_WIDTH * 0.5}
                        style={{ borderRadius: Sizes.fixPadding * 0.5, marginBottom: Sizes.fixPadding * 2, backgroundColor: Colors.grayG }}
                    />
                    <Skeleton
                        LinearGradientComponent={CustomLinearGradient}
                        animation="wave"
                        width={SCREEN_WIDTH * 0.95}
                        height={SCREEN_WIDTH * 0.5}
                        style={{ borderRadius: Sizes.fixPadding * 0.5, marginBottom: Sizes.fixPadding * 2, backgroundColor: Colors.grayG }}
                    />
                </ScrollView>
                <View style={{ width: SCREEN_WIDTH * 0.95, marginBottom: Sizes.fixPadding }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                        <Skeleton
                            LinearGradientComponent={CustomLinearGradient}
                            animation='pulse'
                            width={SCREEN_WIDTH * 0.35}
                            height={50}
                            style={{ borderRadius: Sizes.fixPadding * 0.5, backgroundColor: Colors.grayG }}

                        />
                        <Skeleton
                            LinearGradientComponent={CustomLinearGradient}
                            animation="wave"
                            width={SCREEN_WIDTH * 0.4}
                            height={50}
                            style={{ borderRadius: Sizes.fixPadding * 0.5, backgroundColor: Colors.grayG }}

                        />

                    </View>
                </View>
            </View>

        </Modal>
    )
}

export default TravellerDetailsSimmer