import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useCallback, useEffect } from "react";
import { Colors, Fonts, Sizes } from "../../../../../assests/style";
import { connect } from "react-redux";
import * as FlightActions from "../../../../../redux/actions/FlightActions";

const Persons = ({ passengers, selectedSsrData, dispatch }) => {
    useEffect(() => {
        try {
            dispatch(
                FlightActions.setFlightSsrSelectedData({
                    ...selectedSsrData,
                    person: { ...selectedSsrData.person, selectedPersion: passengers[0] },
                })
            );
        } catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(()=>{}, [passengers])

    const renderItem = useCallback(({ item, index }) => {
        // if(item?.type === 'Infant') return
        return (
            <TouchableOpacity
                onPress={() =>
                    dispatch(
                        FlightActions.setFlightSsrSelectedData({
                            ...selectedSsrData,
                            person: { ...selectedSsrData.person, selectedPersion: item },
                        })
                    )
                }
                style={{
                    borderWidth: 1,
                    paddingHorizontal: Sizes.fixPadding,
                    paddingVertical: Sizes.fixPadding * 0.3,
                    borderRadius: Sizes.fixPadding * 0.5,
                    marginLeft: Sizes.fixPadding,
                    borderColor:
                        selectedSsrData?.person?.selectedPersion?.indexValue == item?.indexValue
                            ? Colors.primaryTheme
                            : "transparent",
                }}
            >
                <Text
                    style={{ ...Fonts._11MontserratMedium }}
                >{`${item?.genderType} ${item?.firstName} ${item?.lastName}`}</Text>
                <Text
                    style={{
                        ...Fonts._11MontserratRegular,
                        color: Colors.grayA,
                        fontSize: 9,
                    }}
                >
                    Meal Added
                </Text>
            </TouchableOpacity>
        );
    }, [selectedSsrData, dispatch]);
    return (
        <View style={{ marginVertical: Sizes.fixPadding * 0.5 }}>
            <FlatList
                data={passengers}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: Sizes.fixPadding }}
                keyExtractor={(item) => item.indexValue.toString()}
            />
        </View>
    );
};

const mapStateToProps = (state) => ({
    passengers: state.flightReducer.passengers,
    selectedSsrData: state.flightReducer.selectedSsrData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
