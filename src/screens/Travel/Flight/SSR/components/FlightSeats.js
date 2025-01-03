import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  StyleSheet,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  Sizes,
  Colors,
  Fonts,
  SCREEN_WIDTH,
} from "../../../../../assests/style";
import { Path, Svg } from "react-native-svg";
import SvgSeat from "./SvgSeat";
import FlightLayout from "../../../../../assests/svg/flight_layout.svg";
import { connect } from "react-redux";
import * as FlightActions from "../../../../../redux/actions/FlightActions";
import { showNumber } from "../../../../../utils/services";

const FlightSeats = ({
  flightSsrData,
  selectedSsrData,
  passengers,
  dispatch,
}) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef(null);

  const itemHeight = 50; // Approximate height of each item. Adjust as necessary.
  const totalHeight =
    itemHeight *
    flightSsrData?.SeatDynamic?.[0]?.SegmentSeat?.[0]?.RowSeats?.length;
  const visibleHeight = SCREEN_WIDTH;

  const handleScroll = (event) => {
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
      useNativeDriver: false,
    })(event);
  };

  const handleScrollBeginDrag = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsScrolling(true);
  };

  const handleScrollEndDrag = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1500);
  };

  const indicatorTranslateX = scrollY.interpolate({
    inputRange: [0, totalHeight - visibleHeight],
    outputRange: [
      SCREEN_WIDTH * 0.18,
      SCREEN_WIDTH - SCREEN_WIDTH * 0.04 - SCREEN_WIDTH * 0.18,
    ], // Adjust the output range as needed
    extrapolate: "clamp",
  });


  const onSelect = useCallback(
    (item) => {
      if (item?.AvailablityType === 1) {
        const currentIndex = passengers.findIndex(passenger => passenger.indexValue === selectedSsrData?.person?.selectedPersion?.indexValue)
        const updatedPassengers = passengers.map((passenger, index) => {
          if (passenger.indexValue === selectedSsrData?.person?.selectedPersion?.indexValue && index == currentIndex) {
            if(passenger.seatCode?.Code === item?.Code){

              return {
               ...passenger,
                seatCode: null,
              };
            }
            if (currentIndex + 1 === passengers.length) {
            } else {
              dispatch(FlightActions.setFlightSsrSelectedData({ ...selectedSsrData, person: { selectedPersion: passengers[currentIndex + 1] } }));
            }
            return {
              ...passenger,
              seatCode: passenger.seatCode?.Code === item?.Code ? null : item,
            };
          }
          return passenger;
        });

        dispatch(FlightActions.setFilightPassenger(updatedPassengers));

      }
    },
    [dispatch, passengers, selectedSsrData]
  );

  const isSelected = useCallback(
    (item) => {
      return passengers.some((pax) => pax.seatCode?.Code === item?.Code);
    },
    [passengers]
  );

  const seatColor = useCallback(
    (item) => {
      if (isSelected(item)) {
        return "green";
      }
      switch (item?.AvailablityType) {
        case 0:
          return "#4CAF50";
        case 1:
          return "#d8f3dc";
        case 3:
          return "#f8edeb";
        case 4:
          return "#F44336";
        case 5:
          return "#F44336";
        default:
          return "#9E9E9E";
      }
    },
    [isSelected]
  );

  const getText = (item) => {
    if (item.AvailablityType === 3) return "";
    else if (item?.Price === 0) return "Free";
    else return showNumber(item?.Price);
  };

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <View style={styles.row}>
          {item?.Seats.map((ele, j) => (
            <View key={index + j} style={styles.seatContainer}>
              {(item?.Seats.length == 6 && j === 3) ||
                (item?.Seats.length == 4 && j === 2) ? (
                <View style={styles.row}>
                  <Text style={styles.rowNumber}>{index + 1}</Text>
                  <SvgSeat
                    item={ele}
                    onSelect={onSelect}
                    isSelected={isSelected}
                    seatColor={seatColor}
                    getText={getText}
                  />
                </View>
              ) : (
                <SvgSeat
                  item={ele}
                  onSelect={onSelect}
                  isSelected={isSelected}
                  seatColor={seatColor}
                  getText={getText}
                />
              )}
            </View>
          ))}
        </View>
      );
    },
    [onSelect, passengers]
  );

  return (
    <View style={{}}>
      {flightSsrData?.SeatDynamic?.[0]?.SegmentSeat?.[0]?.RowSeats && (
        <FlatList
          data={flightSsrData?.SeatDynamic?.[0]?.SegmentSeat?.[0]?.RowSeats}
          renderItem={renderItem}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => index.toString()}
          onScrollBeginDrag={handleScrollBeginDrag}
          onScrollEndDrag={handleScrollEndDrag}
          contentContainerStyle={{
            paddingHorizontal: Sizes.fixPadding,
            paddingVertical: Sizes.fixPadding,
          }}
        />
      )}

      {isScrolling && (
        <View style={styles.indicator}>
          <FlightLayout width={SCREEN_WIDTH} />
          <Animated.View
            style={[
              {
                width: SCREEN_WIDTH * 0.18,
                borderColor: Colors.primaryTheme,
                borderRadius: Sizes.fixPadding * 0.5,
                height: SCREEN_WIDTH * 0.15,
                borderWidth: 1,
                position: "absolute",
                marginTop: Sizes.fixPadding * 0.4,
              },
              { transform: [{ translateX: indicatorTranslateX }] },
            ]}
          />
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  flightSsrData: state.flightReducer.flightSsrData,
  passengers: state.flightReducer.passengers,
  selectedSsrData: state.flightReducer.selectedSsrData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(FlightSeats);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    // flex: 1,
    marginBottom: Sizes.fixPadding,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  indicator: {
    position: "absolute",
    top: 10,
  },
  seatContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowNumber: {
    ...Fonts._11MontserratMedium,
    marginRight: Sizes.fixPadding,
  },
  listContent: {
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
  },

  indicatorBox: {
    width: SCREEN_WIDTH * 0.18,
    borderColor: Colors.primaryTheme,
    borderRadius: Sizes.fixPadding * 0.5,
    height: SCREEN_WIDTH * 0.15,
    borderWidth: 1,
    position: "absolute",
    marginTop: Sizes.fixPadding * 0.4,
  },
});
