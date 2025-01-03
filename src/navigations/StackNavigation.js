import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import Login from '../screens/auth/Login';
import Otp from '../screens/auth/Otp';
import Home from '../screens/home/Home';
import News from '../screens/Sanchar/News/News';
import NewsDetailes from '../screens/Sanchar/News/NewsDetailes';
import Podcastmain from '../screens/Sanchar/podcast/Podcastmain';
import Playsong from '../screens/Sanchar/podcast/Playsong';
import VideoCategory from '../screens/Sanchar/Video/VideoCategory';
import VideoShow from '../screens/Sanchar/Video/VideoShow';
import Yatra from '../screens/Yatra/YatraHome/Yatra';
import YatraDetails from '../screens/Yatra/YatraHome/YatraDetails';
import Yatrabook from '../screens/Yatra/YatraHome/Yatrabook';
import PaymentScreen from '../screens/Payment/PaymentScreen';
import Registration from '../screens/auth/Registration';
import Favourite from '../screens/Sanchar/podcast/Favourite';
import TermsCondition from '../screens/TermsCondition';
import VideoPlay from '../screens/Sanchar/Video/VideoPlay';
import Shopping from '../screens/Yatra/Shopping/Shopping';
import Products from '../screens/Yatra/Shopping/Products';
import TrandingProducts from '../screens/Yatra/Shopping/TrandingProducts';
import ProductDetails from '../screens/Yatra/Shopping/ProductDetails';
import Recharge from '../screens/Recharge/Recharge';
import Contactlist from '../screens/Recharge/Contactlist';
import Rechargeplans from '../screens/Recharge/Rechargeplans';
import Proceedtopay from '../screens/Recharge/Proceedtopay';
import Connectiontype from '../screens/Recharge/operators/Connectiontype';
import Operator from '../screens/Recharge/operators/Operator';
import Region from '../screens/Recharge/operators/Region';
import Fasttag from '../screens/Travel/Fasttag/Fasttag';
import ChooseCircle from '../screens/Travel/Fasttag/ChooseCircle';
import Fasttagvehicle from '../screens/Travel/Fasttag/Fasttagvehicle';
import FasttagPayment from '../screens/Travel/Fasttag/FasttagPayment';
import PaymentSuccess from '../screens/common/PaymentSuccess';
import PaymentFailed from '../screens/common/PaymentFailed';
import Gas from '../screens/Recharge/Gas/Gas';
import Electricity from '../screens/Recharge/Electricity/Electricity';
import Electricitytype from '../screens/Recharge/Electricity/Electricitytype';
import ElectricityPayment from '../screens/Recharge/Electricity/ElectricityPayment';
import GasAmount from '../screens/Recharge/Gas/GasAmount';
import Flight1 from '../screens/Travel/Flight/Flight1';
import ElectricityPaymentProcess from '../screens/Recharge/Electricity/ElectricityPaymentProcess';
import Rechargebill from '../screens/Recharge/Rechargebill';
import Postpaid from '../screens/Recharge/Postpaid';
import Language from '../screens/common/Language';
import Share from '../screens/common/Share';
import AboutUs from '../screens/common/AboutUs';
import RateUs from '../screens/common/RateUs';
import HelpAndSupport from '../screens/common/HelpAndSupport';
import Following from '../screens/common/Following';
import FlightInfo from '../screens/Travel/Flight/FlightInfo';
import FlightReviewDetails from '../screens/Travel/Flight/FlightReviewDetails';
import DrawerScreen from './DrawerScreen';
import FlightForm from '../screens/Travel/Flight/FlightForm';
import FlightSearch from '../screens/Travel/Flight/FlightSearch';
import FlightTravelDetails from '../screens/Travel/Flight/FlightTravelDetails';
import AddPassenger from '../screens/Travel/Flight/AddPassenger';

//Hotel
import HomeHotel from '../screens/Hotel/HomeHotel';
import HotelDetail from '../screens/Hotel/HotelDetail';
import HotelBookDetails from '../screens/Hotel/HotelBookDetails';
import HotelAll from '../screens/Hotel/HotelAll';
import HotelSearch from '../screens/Hotel/HotelSearch';
import HotelPayment from '../screens/Hotel/HotelPayment';
import HotelListData from '../screens/Hotel/HotelListData';
import Metro from '../screens/Recharge/Metro/Metro';
import RecentRechargeMetro from '../screens/Recharge/Metro/RecentRechargeMetro';
import Metroamount from '../screens/Recharge/Metro/Metroamount';
import FlightReview from '../screens/Travel/Flight/FlightReview';
import FlightPayment from '../screens/Travel/Flight/FlightPayment';
import Dth from '../screens/Recharge/Dth/Dth';
import DthForm from '../screens/Recharge/Dth/DthForm';
import GasOperators from '../screens/Recharge/Gas/GasOperators';
import Wallet from '../screens/Payment/Wallet';
import KycDetails from '../screens/Payment/KYC/KycDetails';
import MyFlightTickets from '../screens/Travel/Flight/MyFlightTickets';
import FlightDetails from '../screens/Travel/Flight/FlightDetails';
import MyTrips from '../screens/Travel/TripsDetails/MyTrips';
import FlightSsr from '../screens/Travel/Flight/SSR/FlightSsr';
import PostpaidInput from '../screens/Recharge/Postpaid/PostpaidInput';
import PostpaidBillInfo from '../screens/Recharge/Postpaid/PostpaidBillInfo';
import Dthrecharge from '../screens/Recharge/Dth/DthRecharge';
import Notification from '../screens/Notifications/Notification';
import AllFlights from '../screens/Travel/Flight/SSR/cyrus/AllFlights';
import CyrusFlightDetails from '../screens/Travel/Flight/SSR/cyrus/CyrusFlightDetails';
import fareRule from '../screens/Travel/Flight/SSR/cyrus/fareRule';
import CyrusFlightSearch from '../screens/Travel/Flight/SSR/cyrus/CyrusFlightSearch';
import SeatmapBookingDetails from '../screens/Travel/Flight/SSR/cyrus/SeatmapBookingDetails';
import CyrusSeatSelect from '../screens/Travel/Flight/SSR/cyrus/CyrusSeatSelect';
import CyrusSsrDetails from '../screens/Travel/Flight/SSR/cyrus/CyrusSsrDetails';
import CyrusFlightBooking from '../screens/Travel/Flight/SSR/cyrus/CyrusFlightBooking';
import Cart from '../screens/Yatra/Shopping/Cart';
import Live from '../screens/Sanchar/Live/Live';
import Pooja from '../screens/Yatra/Pooja/Pooja';
import Setting from '../screens/common/Setting';
import Privacy from '../screens/common/Privacy';
import ShoppingOrderHistory from '../screens/Yatra/Shopping/ShoppingOrderHistory';
import Refund from '../screens/common/Refund';
import PoojaDetails from '../screens/Yatra/Pooja/PoojaDetails';
import DailyDarshan from '../screens/religious/DailyDarshan';
import Consultant from '../screens/religious/consultant/Consultant';
import FlightBooking from '../screens/webview/FlightBooking';
import HotelBooking from '../screens/webview/HotelBooking';


const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName='splash' screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name='splash' component={Splash} />
      <Stack.Screen name='login' component={Login} />
      <Stack.Screen name='otp' component={Otp} />
      <Stack.Screen name='registration' component={Registration} />
      <Stack.Screen name='termscondition' component={TermsCondition} />
      <Stack.Screen name='home' component={DrawerScreen} />
      <Stack.Screen name='News' component={News} />
      <Stack.Screen name='NewsDetailes' component={NewsDetailes} />
      <Stack.Screen name='Podcast' component={Podcastmain} />
      <Stack.Screen name='Live' component={Live} />
      <Stack.Screen name='playsong' component={Playsong} />
      <Stack.Screen name='favourite' component={Favourite} />
      <Stack.Screen name='Video' component={VideoCategory} />
      <Stack.Screen name='videoshow' component={VideoShow} />
      <Stack.Screen name='videoplay' component={VideoPlay} />
      <Stack.Screen name='Yatra' component={Yatra} />
      <Stack.Screen name='yatradetails' component={YatraDetails} />
      <Stack.Screen name='yatrabook' component={Yatrabook} />
      <Stack.Screen name='paymentscreen' component={PaymentScreen} />
      <Stack.Screen name='wallet' component={Wallet} />
      <Stack.Screen name='kycDetails' component={KycDetails} />
      <Stack.Screen name='Shopping' component={Shopping} />
      <Stack.Screen name='products' component={Products} />
      <Stack.Screen name='shoppingcart' component={Cart} />
      <Stack.Screen name='tranding' component={TrandingProducts} />
      <Stack.Screen name='productDetails' component={ProductDetails} />
      <Stack.Screen name='Rechargebill' component={Rechargebill} />
      <Stack.Screen name='Recharge' component={Recharge} />
      <Stack.Screen name='Postpaid' component={Postpaid} />
      <Stack.Screen name='postpaidInput' component={PostpaidInput} />
      <Stack.Screen name='postpaidBillInfo' component={PostpaidBillInfo} />
      <Stack.Screen name='contact' component={Contactlist} />
      <Stack.Screen name='rechargeplans' component={Rechargeplans} />
      <Stack.Screen name='payment' component={Proceedtopay} />
      <Stack.Screen name='connectiontype' component={Connectiontype} />
      <Stack.Screen name='operator' component={Operator} />
      <Stack.Screen name='region' component={Region} />
      <Stack.Screen name='Fasttag' component={Fasttag} />
      <Stack.Screen name='Choose Circle' component={ChooseCircle} />
      <Stack.Screen name='Fastagvechicle' component={Fasttagvehicle} />
      <Stack.Screen name='Fastagpayment' component={FasttagPayment} />
      <Stack.Screen name='Dth' component={Dth} />
      <Stack.Screen name='dthForm' component={DthForm} />
      <Stack.Screen name='dthRecharge' component={Dthrecharge} />
      <Stack.Screen name='paymentsuccess' component={PaymentSuccess} />
      <Stack.Screen name='paymentfailed' component={PaymentFailed} />
      <Stack.Screen name='gasOperators' component={GasOperators} />
      <Stack.Screen name='gas' component={Gas} />
      <Stack.Screen name='GasAmount' component={GasAmount} />
      <Stack.Screen name='Electricity' component={Electricity} />
      <Stack.Screen name='Electricitytype' component={Electricitytype} />
      <Stack.Screen name='ElectricityPayment' component={ElectricityPayment} />
      <Stack.Screen name='Flight' component={Flight1} />
      <Stack.Screen name='electricityPaymentProcess' component={ElectricityPaymentProcess} />
      <Stack.Screen name='Language' component={Language} />
      <Stack.Screen name='Share' component={Share} />
      <Stack.Screen name='About Us' component={AboutUs} />
      <Stack.Screen name='RateUs' component={RateUs} />
      <Stack.Screen name='Help And Support' component={HelpAndSupport} />
      <Stack.Screen name='Following' component={Following} />
      <Stack.Screen name='flightinfo' component={FlightInfo} />
      <Stack.Screen name='flightreviewdetails' component={FlightReviewDetails} />
      <Stack.Screen name='flightForm' component={FlightForm} />
      <Stack.Screen name='flightSearch' component={FlightSearch} options={{ animation: 'slide_from_bottom' }} />
      <Stack.Screen name='flightTravelDetails' component={FlightTravelDetails} />
      <Stack.Screen name='addPassenger' component={AddPassenger} />
      <Stack.Screen name='flightReview' component={FlightReview} />
      <Stack.Screen name='flightPayment' component={FlightPayment} />
      <Stack.Screen name='myFlightTickets' component={MyFlightTickets} />
      <Stack.Screen name='flightDetails' component={FlightDetails} />
      <Stack.Screen name='myTrips' component={MyTrips} />
      <Stack.Screen name='flightSsr' component={FlightSsr} />
      <Stack.Screen name='Metro' component={Metro} />
      <Stack.Screen name='recentRechargemetro' component={RecentRechargeMetro} />
      <Stack.Screen name='metroamount' component={Metroamount} />
      {/* Hotel */}
      <Stack.Screen name='Hotel' component={HomeHotel} />
      <Stack.Screen name='hotelDetail' component={HotelDetail} />
      <Stack.Screen name='hotelDetailsBook' component={HotelBookDetails} />
      <Stack.Screen name='homeAll' component={HotelAll} />
      <Stack.Screen name='HotelSearch' component={HotelSearch} />
      <Stack.Screen name='HotelPayment' component={HotelPayment} />
      <Stack.Screen name='HotelListData' component={HotelListData} />
      <Stack.Screen name='Notification' component={Notification}/>

      {/* Flight */}
      <Stack.Screen name='allflights' component={AllFlights} />
      <Stack.Screen name='cyrusflightdetails' component={CyrusFlightDetails} />
      <Stack.Screen name='farerule' component={fareRule} />
      <Stack.Screen name='cyrusflightsearch' component={CyrusFlightSearch} />
      <Stack.Screen name='seatmapbookingdetails' component={SeatmapBookingDetails} />
      <Stack.Screen name='selectseat' component={CyrusSeatSelect} />
      <Stack.Screen name='ssrdetails' component={CyrusSsrDetails} />
      <Stack.Screen name='cyrusflightbooking' component={CyrusFlightBooking} />



      {/* Pooja */}
      <Stack.Screen name='Pooja' component={Pooja} />
      <Stack.Screen name='poojadetails' component={PoojaDetails} />

       {/* Setting */}
       <Stack.Screen name='setting' component={Setting} />
       <Stack.Screen name='privacy' component={Privacy} />
       <Stack.Screen name='refund' component={Refund} />

        {/* shopping*/}
        <Stack.Screen name='shoppingorder' component={ShoppingOrderHistory} />

          {/* religiuos*/}
          <Stack.Screen name='dailydarshan' component={DailyDarshan} />
          <Stack.Screen name='Consultancy' component={Consultant} />

          {/* webview */}
          <Stack.Screen name='flightbooking' component={FlightBooking} />
          <Stack.Screen name='hotelbooking' component={HotelBooking} />

    </Stack.Navigator>


  )
}

export default StackNavigation