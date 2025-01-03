import { View, Text } from 'react-native'
import React from 'react'
import { Colors, Sizes, Fonts } from '../../../../assests/style'
import { connect } from 'react-redux'

const PrimaryContacts = ({ updateState, primaryContact, type = '',customerData }) => {
    console.log(primaryContact,"-----")
    return (
        <View style={{ backgroundColor: Colors.grayG, marginTop: Sizes.fixPadding, borderRadius: Sizes.fixPadding * 0.5, paddingHorizontal: Sizes.fixHorizontalPadding, paddingVertical: Sizes.fixPadding }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                <Text style={{ ...Fonts._16MontserratMedium }}>Primary Contact Details</Text>
                {type != 'review' &&  <Text onPress={() => updateState({ primaryContactEditVisible: true })} style={{ ...Fonts._14MontserratMedium, color: Colors.primaryTheme }}>Edit</Text>}
               
            </View>
            <Text style={{ ...Fonts._11MontserratLight, }}>Your ticket SMS and Email will be sent here</Text>
            <View style={{ marginTop: Sizes.fixPadding }}>
                <Text style={{ ...Fonts._14MontserratSemiBold }}>Mobile: {primaryContact?.phoneNumber }</Text>
                <Text style={{ ...Fonts._14MontserratSemiBold }} >Email: {primaryContact?.email }</Text>
                <Text style={{ ...Fonts._14MontserratSemiBold }} >City: {primaryContact?.city }</Text>
                <Text style={{ ...Fonts._14MontserratSemiBold }} >Address: {primaryContact?.address }</Text>
            </View>
        </View>
    )
}

const mapStateToProps = state => ({
    primaryContact: state.flightReducer.primaryContact,
    customerData: state.registrationReducer.customerdata
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryContacts)