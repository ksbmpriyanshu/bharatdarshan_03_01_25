import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Colors } from '../../../assests/style'

const BankDetails = () => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <FlatList
                ListHeaderComponent={<>
                    {documentsTypeInfo()}
                </>}
            />
        </View>
    )

    function documentsTypeInfo() {
        return (
            <View>
                <Text>Choose Document Type</Text>
            </View>
        )
    }

}

export default BankDetails