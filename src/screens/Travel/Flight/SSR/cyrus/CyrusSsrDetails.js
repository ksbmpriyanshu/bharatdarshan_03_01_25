import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Colors, Sizes, Fonts } from "../../../../../assests/style";

const CyrusSsrDetails = () => {
    const ssrDetails = useSelector(state => state.flightReducer.ssrData);
    const newSsrDetails = ssrDetails?.data[0]?.SSRDetails;

    const [isRoundTrip, setIsRoundTrip] = useState(false);
    const mealDetails = newSsrDetails.filter(item => item.SSR_TypeName === "MEALS");
    const bagDetails = newSsrDetails.filter(item => item.SSR_TypeName === "BAGGAGE");

    return (
        <View style={{ backgroundColor: "#fff", flex: 1, padding: 20 }}>
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        !isRoundTrip && styles.activeToggleButton
                    ]}
                    onPress={() => setIsRoundTrip(false)}
                >
                    <Text style={!isRoundTrip ? styles.activeToggleText : styles.toggleText}>Meals</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        isRoundTrip && styles.activeToggleButton
                    ]}
                    onPress={() => setIsRoundTrip(true)}
                >
                    <Text style={isRoundTrip ? styles.activeToggleText : styles.toggleText}>Baggage</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.columnWrapper}
                data={isRoundTrip ? bagDetails : mealDetails}
                renderItem={({ item }) => (
                    <View style={styles.ssrView}>
                        <Text style={styles.labelText}>{item.SSR_TypeDesc}</Text>
                        <Text style={styles.labelPrice}>₹{item.Total_Amount}</Text>
                    </View>
                )}
            />
        </View>
    );
}

export default CyrusSsrDetails;

const styles = StyleSheet.create({
    label: {
        ...Fonts._14MontserratMedium,
        marginVertical: Sizes.fixPadding * 0.4,
    },
    ssrView: {
        borderWidth: 1,
        borderColor: "#bababa",
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 10,
        width: "46%",
        marginTop: 10,
        borderRadius:10,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    labelText: {
        fontSize: 8,
        textAlign: 'center',
        color: "#000"
    },
    labelPrice: {
        fontSize: 10,
        marginTop: 6,
        color: "#EA7515"
    },
    toggleContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        padding: Sizes.fixHorizontalPadding * 0.4,
        borderRadius: 5,
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
});
