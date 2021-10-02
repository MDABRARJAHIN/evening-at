import React from "react";
import {} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../../screens/Splash/splashScreen";
import Login from "../..//screens/Login/Login";
import SignUp from "../../screens/SignUp/SignUp";
import OTP from "../../screens/OTP/OTP";
import Home from "../../screens/Home/Home";
import ItemDetail from "../../screens/ItemDetail/ItemDetail";
import BookNow from "../..//screens/BookNow/BookNow";
import Payment from "../../screens/Payment/Payment";
import StartEvening from "../../screens/Startevening/StartEvening";
import BookingOnMap from "../../screens/BookingOnMap/BookingOnMap";
import Questions from "../../screens/Questions/Question";
import BookingsDetail from "../../screens/Bookings/BookingsDetail";
import BookingTab from "../../screens/Bookings/BookingTab";
import Bookings from "../../screens/Bookings/Bookings";
import Review from "../../screens/Review/Review";
import TripsAndTricks from "../../screens/TipsAndTricks/TipsAndTricks";
import TripsDetail from "../../screens/TripsAndTricksDetail/TripsAndTricksDetail";
import Profile from "../../screens/Profile/Profile";
import Setting from "../../screens/Setting/Setting";
import ContactUs from "../../screens/ContactUs/ContactUs";
import Feedback from "../../screens/Feedback/Feedback";
import ResetPassword from "../../screens/ResetPassword/ResetPassword";
import FAQ from "../../screens/FAQ/FAQ";
import AllBookings from '../../screens/AllBookings/BookingsDetail'

export const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login}></Stack.Screen>
      <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
      <Stack.Screen name="OTP" component={OTP}></Stack.Screen>
    </Stack.Navigator>
  );
};
export const BookingStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Bookings" component={Bookings}></Stack.Screen>
      <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
      <Stack.Screen name="Setting" component={Setting}></Stack.Screen>
      <Stack.Screen name="ContactUs" component={ContactUs}></Stack.Screen>
      <Stack.Screen name="Feedback" component={Feedback}></Stack.Screen>
      <Stack.Screen name="StartEvening" component={StartEvening}></Stack.Screen>
      <Stack.Screen name="FAQ" component={FAQ}></Stack.Screen>
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export const PlacesStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home}></Stack.Screen>
      <Stack.Screen name="ItemDetail" component={ItemDetail}></Stack.Screen>

      <Stack.Screen name="BookNow" component={BookNow}></Stack.Screen>

      <Stack.Screen name="Payment" component={Payment}></Stack.Screen>
      <Stack.Screen name="StartEvening" component={StartEvening}></Stack.Screen>
      <Stack.Screen name="BookingOnMap" component={BookingOnMap}></Stack.Screen>

      <Stack.Screen name="Questions" component={Questions}></Stack.Screen>
      <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
      <Stack.Screen name="Setting" component={Setting}></Stack.Screen>
      <Stack.Screen name="ContactUs" component={ContactUs}></Stack.Screen>
      <Stack.Screen name="Feedback" component={Feedback}></Stack.Screen>
      <Stack.Screen name="FAQ" component={FAQ}></Stack.Screen>
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export const ReviewsStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Review" component={Review}></Stack.Screen>
      <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
      <Stack.Screen name="Setting" component={Setting}></Stack.Screen>
      <Stack.Screen name="ContactUs" component={ContactUs}></Stack.Screen>
      <Stack.Screen name="Feedback" component={Feedback}></Stack.Screen>
      <Stack.Screen name="FAQ" component={FAQ}></Stack.Screen>
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export const HacksStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="TripsAndTricks"
        component={TripsAndTricks}
      ></Stack.Screen>
      <Stack.Screen name="TripsDetail" component={TripsDetail}></Stack.Screen>

      <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
      <Stack.Screen name="Setting" component={Setting}></Stack.Screen>
      <Stack.Screen name="ContactUs" component={ContactUs}></Stack.Screen>
      <Stack.Screen name="Feedback" component={Feedback}></Stack.Screen>
      <Stack.Screen name="FAQ" component={FAQ}></Stack.Screen>
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export const StartScreen = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="AllBookings"
        component={AllBookings}
      ></Stack.Screen>
      <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
      <Stack.Screen name="Setting" component={Setting}></Stack.Screen>
      <Stack.Screen name="ContactUs" component={ContactUs}></Stack.Screen>
      <Stack.Screen name="Feedback" component={Feedback}></Stack.Screen>
      <Stack.Screen name="FAQ" component={FAQ}></Stack.Screen>
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default {
  AuthStack,
  BookingStack,
  PlacesStack,
  ReviewsStack,
  HacksStack,
  StartScreen
};
