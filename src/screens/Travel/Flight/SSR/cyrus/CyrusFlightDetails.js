import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import PrimaryContacts from '../../components/PrimaryContacts';
import axios from 'axios';
import Loader2 from '../../../../../components/Loader2';
import * as FlightActions from "../../../../../redux/actions/FlightActions"
import { connect, useSelector } from "react-redux";
import { showToastMessage } from '../../../../../utils/services'
import AsyncStorage from '@react-native-async-storage/async-storage';

const CyrusFlightDetails = ({ dispatch }) => {
  const repricedData = useSelector(state => state.flightReducer.repriceData);
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const { searchKey } = route.params;
  const { flightDetails } = route.params;
  const { flightKey } = route.params;
  //console.log(">>>>>>old flight key",flightKey)
  const { fareid } = route.params;
  //console.log("fareId>>>",fareid)
  useEffect(() => {
    const retrieveFareId = async () => {
      try {

        await AsyncStorage.setItem('fareid', route.params.fareid);


      } catch (error) {
        console.error('Error retrieving fareid:', error);
      }
    };

    retrieveFareId();
  }, [route.params.fareid]);
  const repricedValue = flightDetails?.Repriced;
  const flightRepriceData = async () => {
    const requestData = {
      methodname: "Air_Reprice",
      opid: "568",
      txnid: "638002219701368365",
      "requestdata": {
        "Search_Key": searchKey,
        "AirRepriceRequests": [
          {
            "Fare_Id": fareid,
            "Flight_Key": flightKey
          }
        ],
        "Customer_Mobile": phone
      }
    };
   
    setPhone('')
    setEmail('')
    dispatch(FlightActions.getRepriceData(requestData));
  }

  const fareRule = async () => {
    const requestData = {
      methodname: "FARERULE",
      opid: "561",
      txnid: "638002216409387597",
      requestdata: {
        Search_Key: searchKey,
        Flight_Key: flightKey,
        Fare_Id: fareid
      }
    };

    dispatch(FlightActions.getFareruleData(requestData));
  }
  const segment = flightDetails.Segments[0];
  const fare = flightDetails.Fares[0];
  const totalAmount = fare.FareDetails[0]?.Total_Amount || 0;


  const [showBaggage, setShowBaggage] = useState(true);
  const [showCancellation, setShowCancellation] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);

  const toggleBaggageView = () => {
    setShowBaggage((prev) => !prev);
    setShowCancellation(false);
    setShowReschedule(false);
  };

  const toggleCancellationView = () => {
    setShowCancellation((prev) => !prev);
    setShowBaggage(false);
    setShowReschedule(false);
  };

  const toggleRescheduleView = () => {
    setShowReschedule((prev) => !prev);
    setShowBaggage(false);
    setShowCancellation(false);
  };



  const [phone, setPhone] = useState()
  const [email, setEmail] = useState();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return (
    <View style={styles.container}>
      {loading && <Loader2 />}
      <View style={styles.mainView}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.flightSubView}>
            <View style={styles.flightNewSubView}>
              <View>
                <Text style={styles.timeText}>
                  {segment.Origin_City}
                </Text>

              </View>
              <View>
                <Text style={styles.timeText}>-</Text>
              </View>
              <View>
                <Text style={styles.timeText}>{segment.Destination_City}</Text>
              </View>
            </View>
            <Text style={styles.nonText}>
              {segment.Departure_DateTime} | {segment.Duration}
            </Text>
          </View>
          <View style={styles.cancelView}>
            <View style={styles.subCancelView}>
              <TouchableOpacity onPress={toggleBaggageView}>
                <Text style={[
                  styles.cancelText,
                  { borderBottomWidth: showBaggage ? 2 : 0, borderBottomColor: showBaggage ? '#EA7515' : 'transparent' }
                ]}>
                  Baggage
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleCancellationView}>
                <Text style={[
                  styles.cancelText,
                  { borderBottomWidth: showCancellation ? 2 : 0, borderBottomColor: showCancellation ? '#EA7515' : 'transparent' }
                ]}>
                  Cancellation Fee
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleRescheduleView}>
                <Text style={[
                  styles.cancelText,
                  { borderBottomWidth: showReschedule ? 2 : 0, borderBottomColor: showReschedule ? '#EA7515' : 'transparent' }
                ]}>
                  Reschedule Fee
                </Text>
              </TouchableOpacity>
            </View>

            {showBaggage && (
              <View style={styles.baggageView}>
                <View>
                  <Text style={styles.passangerText}>Passenger</Text>
                  <Text style={styles.adultText}>Adult</Text>
                </View>
                <View>
                  <Text style={styles.passangerText}>Cabin</Text>
                  <Text style={styles.adultText}>{flightDetails?.Fares[0]?.FareDetails[0]?.Free_Baggage?.Hand_Baggage}</Text>
                </View>
                <View>
                  <Text style={styles.passangerText}>Check-In</Text>
                  <Text style={styles.adultText}>
                    {flightDetails?.Fares[0]?.FareDetails[0]?.Free_Baggage?.Check_In_Baggage?.endsWith('K')
                      ? `${flightDetails?.Fares[0]?.FareDetails[0]?.Free_Baggage?.Check_In_Baggage}g`
                      : flightDetails?.Fares[0]?.FareDetails[0]?.Free_Baggage?.Check_In_Baggage || '25kg'}

                  </Text>
                </View>
              </View>
            )}

            {showCancellation && (
              <View style={styles.baggageViewOne}>
                <View>
                  <Text style={styles.passangerText}>Time Frame</Text>
                  <Text style={styles.adultText}>{flightDetails.Cancellation?.timeFrame || 'More than 2 hours'}</Text>
                </View>
                <View>
                  <Text style={styles.passangerText}>Airline Fee + Paytm Fee</Text>
                  <Text style={styles.adultText}>₹4500 + ₹250</Text>
                </View>
              </View>
            )}

            {showReschedule && (
              <View style={styles.baggageViewOne}>
                <View>
                  <Text style={styles.passangerText}>Time Frame</Text>
                  <Text style={styles.adultText}>{flightDetails.Reschedule?.timeFrame || 'More than 2 hours'}</Text>
                </View>
                <View>
                  <Text style={styles.passangerText}>Airline Fee + Paytm Fee</Text>
                  <Text style={styles.adultText}>₹4500 + ₹250</Text>
                </View>
              </View>
            )}
          </View>
          <View style={styles.clickBtn}>
            <Text style={styles.fareruleText}>More Details About Cancellation and Pricing </Text>
            <Text style={styles.fareruleTextBtn}
              onPress={() => {
                fareRule();
              }}
            >
              Click Here
            </Text>
          </View>
      
            <View style={{ marginTop: 50, }}>
            <Text style={styles.inputText}>Passenger Details* </Text>
            <TextInput
              placeholder='Enter Your Mobile'
              style={styles.mobileTextInput}
              keyboardType="phone-pad"
              maxLength={10}
              value={phone}
              onChangeText={(e) => setPhone(e)}
            />
             <TextInput
              placeholder='Enter Your Email'
              style={styles.mobileTextInput}
              value={email}
              onChangeText={(e) => setEmail(e)}
            />
            {/* <TouchableOpacity
              style={[styles.continueBtn, { marginTop: 10 }]}
              onPress={() => {
                
              }}
            >
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity> */}
          </View>
          
          
        </ScrollView>

        <View style={styles.bottomView}>
          <View>
            <Text style={styles.nonPrice}>Fare Breakup</Text>
            <Text style={styles.Price}>{`₹${fare.FareDetails[0]?.Total_Amount || 'N/A'}`}</Text>
          </View>
          <View>
            <TouchableOpacity  style={styles.continueBtn} accessibilityLabel="Continue to booking" accessible
              onPress={async() => {
                if (!phone || phone.length !== 10) {
                  showToastMessage({ message: "Please enter a valid mobile number" });
                  return;
                }else if(!emailRegex.test(email)){
                  showToastMessage({ message: "Please enter a valid email" });
                }else if (repricedValue === false) {
                  flightRepriceData();
                  try {
                    const passengerData = JSON.stringify({ email, phone }); 
                    await AsyncStorage.setItem('passengerdata', passengerData); 
                  } catch (error) {
                    console.error('Error saving data to AsyncStorage:', error);
                  }
                  navigation.navigate('seatmapbookingdetails',
                    {
                      searchKey: searchKey,
                      farePrice:fare.FareDetails[0]?.Total_Amount,
                    }
                  )
                }
                
              }}
            >
              <Text style={styles.btnText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapDispatchToProps)(CyrusFlightDetails);


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  continueBtn: {
    backgroundColor: '#EA7515',
    paddingHorizontal: 60,
    borderRadius: 5,
    paddingVertical: 12,
  },
  btnText: {
    color: "#fff",
    fontSize: 15,
    textAlign: 'center',
    fontWeight: "600",
  },
  bottomView: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 0.3,
    padding: 10,
    borderColor: "#4d4f5c",
    alignItems: "center",
  },
  mainView: {
    flex: 1,
  },
  nonPrice: {
    fontSize: 9,
  },
  Price: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  flightSubView: {
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: "#e3e3e3",

    padding: 15,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  flightNewSubView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "500",
  },
  fareruleText: {
    fontSize: 10,
    color: "#000",
    fontWeight: "500",


  },
  fareruleTextBtn: {
    fontSize: 10,
    color: "#EA7515",
    fontWeight: "500",
  },
  clickBtn: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    gap: 1,
  },
  priceText: {
    fontSize: 11,
    color: "#EA7515",
    fontWeight: "500",
  },
  nonText: {
    fontSize: 13,
    marginTop: 5,
    textAlign: "center",
    marginTop: 15,
  },
  cancelView: {
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: "#e3e3e3",
    padding: 15,
    paddingVertical: 10,
  },
  cancelText: {
    fontSize: 11,
    color: "#000",
    fontWeight: "500",
    paddingBottom: 5,
    borderBottomColor: "#EA7515",
  },
  subCancelView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  baggageView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  baggageViewOne: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  passangerText: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 5,
    textTransform: "uppercase",
  },
  adultText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#000",
    marginTop: 5,
  },
  mobileTextInput: {
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 20,
    borderRadius: 8,
    borderColor: "#bababa"
  },
  inputText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginTop: 5,
    marginLeft: 3,
  }
});
