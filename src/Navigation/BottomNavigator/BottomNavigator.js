import React ,{useState,useEffect}from "react";
import { Text, Image, StyleSheet, Dimensions, Platform ,Keyboard} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Images from "../../constant/images";

//screens

import {
  BookingStack,
  PlacesStack,
  ReviewsStack,
  StartScreen,
  HacksStack,
} from "../StackNavigator/StackNavigator";
const { height, width } = Dimensions.get("window");

const BottomNavigator = () => {
  const Tab = createBottomTabNavigator();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    // return () => {
    //   keyboardDidHideListener.remove();
    //   keyboardDidShowListener.remove();
    // };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { height: height / 10 },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Booking"
        component={BookingStack}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={
                focused ? Images.homeActiveIcon : Images.homeInActiveIcon
              }
              style={[styles.icon,{
                height: Platform.OS == "ios" ? height / 20 : height / 20,
              width: Platform.OS == "ios" ? height / 20 : height / 20,}]}
              resizeMode="contain"
            ></Image>
          ),
        }}
      />

      <Tab.Screen
        name="Places"
        component={PlacesStack}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={
                focused ? Images.placesActiveIcon : Images.placesInActiveIcon
              }
              style={styles.icon}
              resizeMode="contain"
            ></Image>
          ),
        }}
      />
      <Tab.Screen
        name="StartScreen"
        component={StartScreen}
        // listeners={{
        //   tabPress: e => {
        //     // Prevent default action
        //     e.preventDefault();
        //   },
        // }}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? Images.homeIcon : Images.homeIcon}
              style={[styles.icon, !isKeyboardVisible&&styles.homeIcon]}
              resizeMode="contain"
            ></Image>
          ),
        }}
      />
      <Tab.Screen
        name="Review"
        component={ReviewsStack}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={
                focused ? Images.reviewActiveIcon : Images.reviewInActiveIcon
              }
              style={styles.icon}
              resizeMode="contain"
            ></Image>
          ),
        }}
      />
      <Tab.Screen
        name="Hack"
        component={HacksStack}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={
                focused ? Images.hacksActiveIcon : Images.hacksInActiveIcon
              }
              style={styles.icon}
              resizeMode="contain"
            ></Image>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomNavigator;

const styles = StyleSheet.create({
  icon: {
    height: Platform.OS == "ios" ? height / 20 : height / 15,
    width: Platform.OS == "ios" ? height / 20 : height / 15,
    marginTop: Platform.OS == "ios" ? 20 : 10,
  },
  homeIcon: {
    height: Platform.OS == "ios" ? height / 10 : height / 7,
    width: Platform.OS == "ios" ? height / 10 : height / 7,
    marginTop: Platform.OS == "ios" ? -height / 12 : -height / 12,
  },
});
