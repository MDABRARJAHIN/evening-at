import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStack } from "../Navigation/StackNavigator/StackNavigator";
import BottomNavigator from "../Navigation/BottomNavigator/BottomNavigator";
import Splash from "../../src/screens/Splash/splashScreen";
import Review from "../../src/screens/Review/Review";
import Login from "../../src/screens/Login/Login";
import SignUp from "../../src/screens/SignUp/SignUp";
import OTP from "../../src/screens/OTP/OTP";
import WebView from '../../src/screens/WebView/WebView'
import ResturantFeedback from "../screens/Bookings/ReturantFeedBack";
import CreditCard from '../screens/CreditCard/CreditCard'
const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      // initialRouteName="BottomNavigator"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={Splash}></Stack.Screen>
      <Stack.Screen name="Auth" component={AuthStack}></Stack.Screen>
      <Stack.Screen name="Login" component={Login}></Stack.Screen>
      <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
      <Stack.Screen name="OTP" component={OTP}></Stack.Screen>
      <Stack.Screen name="WebView" component={WebView}></Stack.Screen>
      <Stack.Screen name="ResturantFeedback" component={ResturantFeedback}></Stack.Screen>
      <Stack.Screen name="CreditCard" component={CreditCard}></Stack.Screen>
      <Stack.Screen
        name="BottomNavigator"
        component={BottomNavigator}
      ></Stack.Screen>
      <Stack.Screen name="Review" component={Review}></Stack.Screen>
    </Stack.Navigator>
  );w
};
export default Navigation;
