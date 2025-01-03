import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import { Colors, Fonts, SCREEN_WIDTH, Sizes } from '../../../../../assests/style'
import { showNumber } from '../../../../../utils/services'

const MealLists = () => {
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', paddingTop: Sizes.fixPadding, marginLeft: Sizes.fixPadding }}
            >
                <View style={{width: SCREEN_WIDTH*0.18, height: SCREEN_WIDTH*0.18, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: Colors.grayE, borderRadius: Sizes.fixPadding}}>
                    <Image source={require('../../../../../assests/icons/meals.png')} />
                </View>
                <View style={{flex: 1,  marginLeft: Sizes.fixPadding}}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: Sizes.fixPadding*0.5, }}>
                        <View>
                            <Text style={{ ...Fonts._12MontserratMedium }}>Popcorn</Text>
                            <Text style={{ ...Fonts._11MontserratMedium, color: Colors.grayA, marginTop: Sizes.fixPadding*0.4 }}>{showNumber(10)}</Text>
                        </View>
                        <TouchableOpacity
                        style={{paddingHorizontal: Sizes.fixPadding*1.5, borderWidth: 1, paddingVertical: Sizes.fixPadding*0.5, borderRadius: 1000, borderColor:Colors.primaryTheme, marginRight: Sizes.fixPadding*0.3}}
                        >
                            <Text style={{ ...Fonts._13MontserratMedium, color: Colors.primaryTheme }}>+ Add</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height: 1, backgroundColor: Colors.grayE}} />
                </View>

            </TouchableOpacity>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.grayE }}>
            <FlatList data={Array.from({ length: 10 })} renderItem={renderItem} initialNumToRender={5} maxToRenderPerBatch={5} />
        </View>
    )
}

export default MealLists