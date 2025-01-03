import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes } from '../../../../assests/style'
import { showNumber } from '../../../../utils/services'
import { connect } from 'react-redux'
import { navigate } from '../../../../navigations/NavigationServices'

const ReturnFlightFooter = ({ selectedFlight, selectedReturnFlight, flightListData }) => {
    const isActive = () => selectedReturnFlight != null && selectedFlight != null

    const getPrice = ()=>{
        let price = 0;
        if(selectedFlight){
            price += selectedFlight?.Fare?.BaseFare + selectedFlight?.Fare?.Tax
        }if(selectedReturnFlight){
            price += selectedReturnFlight?.Fare?.BaseFare + selectedReturnFlight?.Fare?.Tax
        }
        return price
    }

    const onContinue = () => {
        const payload = {
            TraceId: flightListData?.TraceId,
            ResultIndex1: selectedFlight?.ResultIndex,
            ResultIndex2: selectedReturnFlight?.ResultIndex,
            type: 'return'
        }
        console.log(payload)
        navigate('flightTravelDetails', payload)

    }
    return (
        <View style={{ backgroundColor: Colors.white, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Sizes.fixPadding }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ ...Fonts._11MontserratMedium }}>Fare Breakup</Text>
                <Text style={{ ...Fonts._16MontserratMedium }}>{showNumber(getPrice())}</Text>
            </View>
            <TouchableOpacity disabled={!isActive()} activeOpacity={0.8} onPress={() => onContinue()} style={{ backgroundColor: isActive() ? Colors.primaryTheme : Colors.grayA, width: '40%', paddingVertical: Sizes.fixPadding * 0.9, borderRadius: Sizes.fixPadding * 0.5 }}>
                <Text style={{ ...Fonts._14MontserratMedium, textAlign: 'center', color: Colors.white }}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = state => ({
    selectedFlight: state.flightReducer.selectedFlight,
    selectedReturnFlight: state.flightReducer.selectedReturnFlight,
    flightListData: state.flightReducer.flightListData,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ReturnFlightFooter)