import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes } from '../../../../assests/style'


const OnGoingTrip = () => {
    return (
        <View style={{ marginBottom: Sizes.fixPadding, }}>
            <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: 18, marginBottom: Sizes.fixPadding * 0.4 }}>Booking</Text>
            <View style={{ borderWidth: 1, borderRadius: Sizes.fixPadding, borderColor: Colors.primaryTheme, }}>
                {destinationsInfo()}
                {travellerInfo()}
                {addonsInfo()}
            </View>
        </View>
    )

    function addonsInfo() {
        return (
            <View style={{ paddingVertical: Sizes.fixPadding }}>
                <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: 18, textAlign: 'center', marginBottom: Sizes.fixPadding }}>Add - ons</Text>
                <View style={{ marginHorizontal: Sizes.fixPadding }}>
                    <View style={styles.addonsItemContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row', flex: 0.5 }}>
                                <Image source={require('../../../../assests/icons/seats.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                                <Text style={{ ...Fonts._16MontserratMedium, marginLeft: Sizes.fixPadding * 0.5 }}>Seats</Text>
                            </View>
                            <Text style={{ ...Fonts._16MontserratMedium }}>30F, 30E</Text>
                        </View>
                        <View style={{ width: '90%', height: 1, backgroundColor: Colors.grayC, alignSelf: 'center', marginTop: Sizes.fixPadding * 0.5 }} />
                    </View>
                    <View style={styles.addonsItemContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row', flex: 0.5 }}>
                                <Image source={require('../../../../assests/icons/meals.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                                <Text style={{ ...Fonts._16MontserratMedium, marginLeft: Sizes.fixPadding * 0.5 }}>Meals</Text>
                            </View>
                            <Text style={{ ...Fonts._16MontserratMedium }}>30F, 30E</Text>
                        </View>
                        <View style={{ width: '90%', height: 1, backgroundColor: Colors.grayC, alignSelf: 'center', marginTop: Sizes.fixPadding * 0.5 }} />
                    </View>
                    <View style={styles.addonsItemContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row', flex: 0.5 }}>
                                <Image source={require('../../../../assests/icons/bagage.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                                <Text style={{ ...Fonts._16MontserratMedium, marginLeft: Sizes.fixPadding * 0.5 }}>Baggage</Text>
                            </View>
                            <Text style={{ ...Fonts._16MontserratMedium }}>30F, 30E</Text>
                        </View>
                        <View style={{ width: '90%', height: 1, backgroundColor: Colors.grayC, alignSelf: 'center', marginTop: Sizes.fixPadding * 0.5 }} />
                    </View>
                    <View style={styles.addonsItemContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row', flex: 0.5 }}>
                                <Image source={require('../../../../assests/icons/insurance.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                                <Text style={{ ...Fonts._16MontserratMedium, marginLeft: Sizes.fixPadding * 0.5 }}>Insurance</Text>
                            </View>
                            <Text style={{ ...Fonts._16MontserratMedium }}>30F, 30E</Text>
                        </View>
                        <View style={{ width: '90%', height: 1, backgroundColor: Colors.grayC, alignSelf: 'center', marginTop: Sizes.fixPadding * 0.5 }} />
                    </View>
                </View>
            </View>
        )
    }

    function travellerInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 0.5, padding: Sizes.fixPadding, borderBottomWidth: 0.5, borderColor: Colors.grayC }}>
                <Text style={{ ...Fonts._14MontserratSemiBold, fontSize: 18, }}>Travellers</Text>
                <View style={{ margin: Sizes.fixPadding * 0.5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Sizes.fixPadding * 0.5 }}>
                        <Text style={{ ...Fonts._14MontserratSemiBold, color: Colors.grayA }}>Name</Text>
                        <Text style={{ ...Fonts._14MontserratSemiBold, color: Colors.grayA }}>PNR</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Sizes.fixPadding * 0.5 }}>
                        <Text style={{ ...Fonts._14MontserratSemiBold }}>Sahil Yadav</Text>
                        <Text style={{ ...Fonts._14MontserratSemiBold, }}>JPRF6Y</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                        <Text style={{ ...Fonts._14MontserratSemiBold, }}>Sahil Yadav</Text>
                        <Text style={{ ...Fonts._14MontserratSemiBold, }}>JPRF6Y</Text>
                    </View>
                </View>
            </View>
        )
    }

    function destinationsInfo() {
        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity style={{ marginLeft: Sizes.fixPadding, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Image
                            source={require('../../../../assests/images/airpot.png')}
                            style={{ width: 35, height: 35 }}
                        />
                        <Text style={{ ...Fonts._16MontserratMedium, marginLeft: Sizes.fixPadding * 0.5 }}>DEL {">>>"} BOM</Text>
                    </View>

                    <View style={{ width: '90%', height: 2, borderRadius: 100, backgroundColor: index == 0 ? Colors.black : 'transparent' }} />
                </TouchableOpacity>
            )
        }
        return (
            <View style={{ marginVertical: Sizes.fixPadding }}>
                <FlatList
                    data={Array.from({ length: 3 })}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>

        )
    }

}

export default OnGoingTrip

const styles = StyleSheet.create({
    addonsItemContainer: {
        marginBottom: Sizes.fixPadding
    }
})