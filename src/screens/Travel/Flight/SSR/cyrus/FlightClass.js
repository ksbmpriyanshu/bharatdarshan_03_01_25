import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { BottomSheet } from "@rneui/themed";
import { Colors, Sizes, Fonts, SCREEN_WIDTH } from "../../../../../assests/style";

const FlightClass = ({ setSelectedClassId }) => {
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [selectedClass, setSelectedClass] = useState(''); 
    const [localSelectedClassId, setLocalSelectedClassId] = useState(null); 

    const travelClasses = [
        { id: 0, name: 'Economy' },
        { id: 1, name: 'Business' },
        { id: 2, name: 'First' },
        { id: 3, name: 'Premium Economy' },
    ];

    const renderClassItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                console.log(`Selected class: ${item.name}`);
                setSelectedClass(item.name);
                setLocalSelectedClassId(item.id);
                setSelectedClassId(item.id); 
                setBottomSheetVisible(false);
            }}
            style={styles.classItem}
        >
            <Text style={styles.classItemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View>
            <View style={styles.cyrusSubView}>
                <Text style={styles.label}>Select Class</Text>
                <TouchableOpacity
                    style={styles.selectedCityContainer}
                    onPress={() => setBottomSheetVisible(true)}
                >
                    <Text style={styles.selectedCityText}>
                        {selectedClass || 'Select Travel Class'}
                    </Text>
                </TouchableOpacity>
            </View>

            <BottomSheet
                isVisible={isBottomSheetVisible}
                onBackdropPress={() => setBottomSheetVisible(false)}
            >
                <View style={styles.bottomSheetContainer}>
                    <FlatList
                        data={travelClasses}
                        renderItem={renderClassItem}
                        keyExtractor={(item) => item.id.toString()} 
                    />
                </View>
            </BottomSheet>
        </View>
    );
};

export default FlightClass;

const styles = StyleSheet.create({
    cyrusSubView: {
        width: "100%",
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        marginLeft: 4,
        marginTop: 10,
        ...Fonts._14MontserratMedium, 
    },
    selectedCityContainer: {
        backgroundColor: "#ffffff",
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 7,
        marginTop: 5,
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
    },
    selectedCityText: {
        fontSize: 16,
        color: "#BABABA",
        ...Fonts._14MontserratMedium, 
        
    },
    bottomSheetContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    classItem: {
        paddingVertical: 10,
    },
    classItemText: {
        fontSize: 16,
        color: '#222222',
    },
});
