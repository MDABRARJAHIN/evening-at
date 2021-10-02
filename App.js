import React from "react";
import RootStack from "./src/Navigation/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import WebView from './src/screens/WebView/WebView';
import PaymentWithCard from "./src/screens/CreditCard/CreditCard";
import DataEntryScreen from "./src/screens/DataEntryScreen/DataEntryScreen";
const App = () => {
  return (
    <NavigationContainer>
      <RootStack></RootStack>
    </NavigationContainer>
    //  <PaymentWithCard />
  );
};

export default App;
