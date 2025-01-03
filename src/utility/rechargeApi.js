import axios from "axios";
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../assests/style";
import { razorpay_key } from "../utils/api-urls";
import { api_url, base_url } from "../config/constants";


export const razorpayInialise = async (amount, customerdata) => {
    try {
        console.log(`${api_url}/order?amount=${amount}`)
        const response = await axios.get(`${api_url}order?amount=${amount}`);
        console.log(response.data)
        const orderdata = response.data?.data;

        var options = {
            key: razorpay_key,
            currency: response?.data?.data?.currency,
            amount: response?.data?.data?.amount,
            name: "Bharat Darshan",
            description: "That is financial Company",
            image: 'https://i.imgur.com/3g7nmJC.png',
            order_id: response?.data?.data?.id,
            handler: function (response) {
                console.log("response : ", response);
                // route.push('/thank-you')
                // navigate("/thank-you");
            },
            prefill: {
                name: customerdata?.name,
                email: customerdata?.email,
                contact: customerdata?.phone,
            },
            
            theme: { color: Colors.primaryTheme },
        }
        const razorPayresponse = RazorpayCheckout.open(options)
        console.log({razorPayresponse});
        return razorPayresponse

    } catch (error) {
        console.log(error)
        return error
    }
}

export const createOrder = async (amount, payee, transactionalData, transactionStatus, operatorData, operatorStatus, rechargeOrderId) => {
    const authToken1 = await AsyncStorage.getItem('token');
    const authToken = JSON.parse(authToken1)
    try {
        const response = await axios({
            method: 'post',
            url: `${api_url}/recharge/create-recharge-order`,
            headers: { 'Authorization': `Bearer ${authToken}`},
            data: !rechargeOrderId ? {
                amount: amount,
                payee: payee,
                transactionalData: transactionalData,
                transactionStatus: transactionStatus,
            } : {
                rechargeOrderId: rechargeOrderId,
                operatorStatus: operatorStatus,
                operatorData: operatorData
            },
        })
        return response
    } catch (error) {
        return error
    }
}

// fastag and calbe recharge
export const fastagOrCableRecharge = async (number, operator, circle, amount) => {
    const authToken1 = await AsyncStorage.getItem('token');
    const authToken = JSON.parse(authToken1)
    try {
        const response = await axios.post(`${api_url}/recharge/fastag-recharge`,
            {
                number: number,
                operator: operator,
                circle: circle,
                amount: amount
            },
            {
                headers: { 'Authorization': `Bearer ${authToken}` }
            }
        )
        console.log(response)
        return response
    } catch (error) {
        return error
    }
}

//  phone prepaid or dth recharge

export const phoneDTHRecharge = async (number, operator, circle, amount) => {
    const authToken1 = await AsyncStorage.getItem('token');
    const authToken = JSON.parse(authToken1)
    try {
        const response = await axios.get(`${api_url}/recharge/recharge-request?number=${number}&operator=${operator}&circle=${circle}&amount=${amount}`,
            {
                headers: { 'Authorization': `Bearer ${authToken}` }
            }
        )
        return response;
    } catch (error) {
        return error
    }
}

// gas or electricity recharge

export const electricityOrGasRecharge = async (amount, circle, operator, number) => {
    const authToken1 = await AsyncStorage.getItem('token');
    const authToken = JSON.parse(authToken1)
    try {
        const response = await axios.post(`${api_url}/recharge/electricity-gas-recharge`, {
            amount,
            circle,
            operator,
            number
        }, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        })
     return response;
    } catch (error) {
        return error;
    }
}
export const gasCylinder = async (amount, circle, operator, number) => {
    const authToken1 = await AsyncStorage.getItem('token');
    const authToken = JSON.parse(authToken1)
    try {
        const response = await axios.post(`${api_url}/recharge/gas-cylinder-recharge`, {
            amount,
            circle,
            operator,
            number
        }, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        })
     return response;
    } catch (error) {
        return error;
    }
}