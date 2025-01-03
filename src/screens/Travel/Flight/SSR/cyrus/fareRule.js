import React from 'react';
import { StyleSheet, ScrollView, View, useWindowDimensions,Text } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { useSelector } from 'react-redux';

const FareRule = () => {
    const fareruleData = useSelector(state => state.flightReducer.fareruleData);
    const { width } = useWindowDimensions();
    if (!fareruleData?.data || !Array.isArray(fareruleData.data) || fareruleData.data.length === 0) {
        return (
            <View style={styles.container}>
                <Text>No fare rules available.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {fareruleData.data.map((item, index) => {
                console.log(item, "++++J+");
                return (
                    <View key={item?.id || index} style={styles.fareRuleContainer}> 
                        <RenderHTML contentWidth={width} source={{ html: item?.FareRuleDesc || '' }} />
                    </View>
                );
            })}
        </ScrollView>
    );
};

export default FareRule;

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    fareRuleContainer: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 10,
    },
});
