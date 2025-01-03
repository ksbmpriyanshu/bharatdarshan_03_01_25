import RazorpayCheckout from 'react-native-razorpay';
import { postRequest } from './apiRequests';
import { api_url, app_api_url, create_razorpay_order, razorpay_key, user_wallet_payment } from '../config/constants';
import { showToastMessage } from './services';
import { Colors } from '../assests/style';

export const razorpayPayment = async ({ amount = 0, email = '', contact = '', name = '' }) => {
    try {
        const orderResponse = await postRequest({
            url: app_api_url + create_razorpay_order,
            data: {
                amount
            }
        })


        if (!orderResponse?.status) {
            showToastMessage({ message: 'Payment Failed' })
            return null
        }

        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: razorpay_key, // Your api key
            amount: orderResponse?.data?.amount,
            order_id: orderResponse?.data?.id,
            name: name,
            prefill: {
                email: email,
                contact: contact,
                name: name
            },
            theme: { color: Colors.primaryTheme }
        }

        const response = await RazorpayCheckout.open(options)
        // console.log('sdfsdf', response)
        return response
    } catch (e) {
        console.log('hii', e)
        return false
    }
}

export const razorpayPaymentOrder = async ({ amount = 0, email = '', contact = '', name = '' }) => {
    try {
        const orderResponse = await postRequest({
            url: `${api_url}user/create_razorpay_order`,
            data: {
                amount
            }
        })
        console.log("orderResponse",orderResponse)

        console.log('Order ',orderResponse)
        if (!orderResponse?.status) {
            showToastMessage({ message: 'Payment Failed' })
            return null
        }

        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: razorpay_key, // Your api key
            amount: orderResponse?.data?.amount,
            order_id: orderResponse?.data?.id,
            name: name,
            prefill: {
                email: email,
                contact: contact,
                name: name
            },
            theme: { color: Colors.primaryTheme }
        }

        const response = await RazorpayCheckout.open(options)
        // console.log('sdfsdf', response)
        return response
    } catch (e) {
        console.log('hii', e)
        return false
    }
}

export const walletPayment = async ({ amount = 0, userId, type = 'OTHER' }) => {
    try {
        const response = await postRequest({
            url: app_api_url + user_wallet_payment,
            data: {
                amount, userId, type
            }
        })

        if (!response?.status) {
            showToastMessage({ message: response?.message })
            return null
        }
        return response
    } catch (e) {
        console.log('hii', e)
        return false
    }
} 

export const razorpayPaymentHotel = async ({ amount = 0, email = '', contact = '', name = '', orderId = null }) => {
    try {
        
        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_live_urtK2OtscGryML', // Your api key
            amount: amount,
            order_id: orderId,
            name: name,
            prefill: {
                email: email,
                contact: contact,
                name: name
            },
            theme: { color: Colors.primaryTheme }
        }

        const response = await RazorpayCheckout.open(options)
        // console.log('sdfsdf', response)
        return response
    } catch (e) {
        console.log('hii', e)
        return false
    }
}