import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Colors, Fonts, getFontSize, Sizes } from '../../../assests/style'

const IDProof = () => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <FlatList
                ListHeaderComponent={<>
                    {documentsTypeInfo()}
                </>
                }
                contentContainerStyle={{padding: Sizes.fixPadding}}
            />
        </View>
    )

    function documentsTypeInfo() {
        return (
            <View>
                <Text style={{...Fonts._14MontserratSemiBold, fontSize: getFontSize(18), color: '#363636'}}>Choose Document Type</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: Sizes.fixPadding}}>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Aadhar Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Aadhar Card</Text>
                </TouchableOpacity>
                </View>

            </View>
        )
    }
}

export default IDProof

const styles = StyleSheet.create({
    buttonContainer: {
        width: '45%',
        backgroundColor: Colors.primaryTheme
    },
    buttonText: {
        ...Fonts._14MontserratMedium,
        textAlign: 'center'
    }
})