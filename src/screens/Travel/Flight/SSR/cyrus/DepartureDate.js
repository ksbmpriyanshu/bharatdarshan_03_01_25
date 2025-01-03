    import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
    import React,{useState} from 'react';
    import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
    import { Input } from "@rneui/themed";
    import { Fonts, SCREEN_WIDTH } from "../../../../../assests/style";

    const DepartureDate = ({ departureDate, setDepartureDate }) => { 
        const [dateText, setDateText] = useState('Select Date');

        const onDatePick = () => {
            DateTimePickerAndroid.open({
                value: departureDate || new Date(),  
                minimumDate: new Date(),
                onChange: (event, selectedDate) => {
                    if (event.type === 'set' && selectedDate) {
                        setDepartureDate(selectedDate);  
                        const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
                        const day = selectedDate.getDate().toString().padStart(2, '0');
                        const year = selectedDate.getFullYear();
                        const formattedDate = `${day}/${month}/${year}`;
                        setDateText(formattedDate);  
                    }
                },
                mode: 'date',
                is24Hour: true,
            });
        };

        return (
            <View style={styles.cyrusSubView}>
                <TouchableOpacity onPress={onDatePick}>
                    <Text style={styles.label}>Departure Date</Text>
                    <Input
                        inputContainerStyle={styles.dateInput}
                        containerStyle={{ height: 50, paddingHorizontal: 0, borderBottomWidth: 0 }}
                        inputStyle={{ ...Fonts._14MontserratMedium, marginLeft: 10 }}
                        value={dateText} 
                        placeholder={'Select Date'}
                        placeholderTextColor={'#BABABA'}
                        editable={false}  
                        rightIcon={
                            <Image source={require('../../../../../assests/images/calender.png')} style={{ height: SCREEN_WIDTH * 0.1, width: SCREEN_WIDTH * 0.1 }} />
                        }
                    />
                </TouchableOpacity>
            </View>
        );
    };

    export default DepartureDate;

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
        dateInput: {
            backgroundColor: "#ffffff",
            borderRadius: 7,
            marginTop: 5,
            width: "100%",
        },
    });
