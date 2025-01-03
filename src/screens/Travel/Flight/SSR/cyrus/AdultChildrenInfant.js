import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Colors, Sizes, Fonts, SCREEN_WIDTH } from "../../../../../assests/style";

const AdultChildrenInfant = ({ setAdults, setChildren, setInfants }) => {
    const [localAdults, setLocalAdults] = useState(0); 
    const [localChildren, setLocalChildren] = useState(0); 
    const [localInfants, setLocalInfants] = useState(0); 

    const increment = (type) => {
        if (type === 'adult') {
            setLocalAdults(prev => {
                const newCount = prev + 1;
                setAdults(newCount); // Update parent state
                return newCount;
            });
        } else if (type === 'child') {
            setLocalChildren(prev => {
                const newCount = prev + 1;
                setChildren(newCount); // Update parent state
                return newCount;
            });
        } else if (type === 'infant') {
            setLocalInfants(prev => {
                const newCount = prev + 1;
                setInfants(newCount); // Update parent state
                return newCount;
            });
        }
    };

    const decrement = (type) => {
        if (type === 'adult' && localAdults > 0) {
            setLocalAdults(prev => {
                const newCount = prev - 1;
                setAdults(newCount);
                return newCount;
            });
        } else if (type === 'child' && localChildren > 0) {
            setLocalChildren(prev => {
                const newCount = prev - 1;
                setChildren(newCount);
                return newCount;
            });
        } else if (type === 'infant' && localInfants > 0) {
            setLocalInfants(prev => {
                const newCount = prev - 1;
                setInfants(newCount);
                return newCount;
            });
        }
    };

    return (
        <View style={styles.adultsView}>
             <View>
                <Text style={styles.label}>Adults</Text>
                <View style={styles.countContainerChildItem}>
                    <TouchableOpacity style={styles.countButton} onPress={() => decrement('adult')}>
                        <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>-</Text>
                    </TouchableOpacity>
                    <Text style={{ ...Fonts._13MontserratMedium }}>{localAdults}</Text>
                    <TouchableOpacity style={styles.countButton} onPress={() => increment('adult')}>
                        <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={styles.label}>Children</Text>
                <View style={styles.countContainerChildItem}>
                    <TouchableOpacity style={styles.countButton} onPress={() => decrement('child')}>
                        <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>-</Text>
                    </TouchableOpacity>
                    <Text style={{ ...Fonts._13MontserratMedium }}>{localChildren}</Text>
                    <TouchableOpacity style={styles.countButton} onPress={() => increment('child')}>
                        <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
           
            <View>
                <Text style={styles.label}>Infant</Text>
                <View style={styles.countContainerChildItem}>
                    <TouchableOpacity style={styles.countButton} onPress={() => decrement('infant')}>
                        <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>-</Text>
                    </TouchableOpacity>
                    <Text style={{ ...Fonts._13MontserratMedium }}>{localInfants}</Text>
                    <TouchableOpacity style={styles.countButton} onPress={() => increment('infant')}>
                        <Text style={{ ...Fonts._18MontserratRegular, color: '#222222', bottom: 2 }}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default AdultChildrenInfant;

const styles = StyleSheet.create({
    label: {
        fontSize: 8,
        fontWeight: "500",
        marginLeft: 4,
        marginTop: 10,
        ...Fonts._14MontserratMedium, 
    },
    adultsView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    countContainerChildItem: {
        width: SCREEN_WIDTH * 0.25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: Sizes.fixPadding * 0.5,
        backgroundColor: Colors.white,
        borderRadius: 10,
        elevation: 2,
        borderColor: '#00000025',
        borderWidth: 1,
        marginTop: Sizes.fixPadding * 0.5
    },
    countButton: {
        height: SCREEN_WIDTH * 0.07,
        width: SCREEN_WIDTH * 0.07,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderColor: Colors.grayA
    },
});
