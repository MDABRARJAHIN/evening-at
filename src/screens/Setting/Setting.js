import React, { useEffect,useState, } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Images from "../../constant/images";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import HeaderContent from "../../components/HeaderContent/HeaderContent";
import { CommonActions, NavigationAction } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import ActivityIndicator from "../../components/Activityindicator/Activityindicator";
import styles from "./Styles";

const Setting = (props) => {
  const __logOut = () => {
    auth().signOut();
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      })
    );
  };
  useEffect(() => {
    console.log(auth().currentUser);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={28}
          onPress={() => props.navigation.goBack()}
        ></Ionicons>
        {/* <Feather
          name="settings"
          size={24}
          onPress={() => props.navigation.navigate('Setting')}></Feather> */}
      </View>
      <HeaderContent
        content="Settings"
        customStyle={{ marginTop: 20 }}
      ></HeaderContent>

      <Image style={styles.image} source={Images.settingIcon}></Image>
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.btn} onPress={()=>props.navigation.navigate('WebView',{link:'http://ea.buildoutsolution.com/about-us-page'})}>
          <Text style={styles.btnTxt}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => props.navigation.navigate("FAQ")}
        >
          <Text style={styles.btnTxt}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={()=>props.navigation.navigate('WebView',{link:'http://ea.buildoutsolution.com/privacy-policy-page'})}>
          <Text style={styles.btnTxt}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={()=>props.navigation.navigate('WebView',{link:'http://ea.buildoutsolution.com/terms-and-condition-page'})}>
          <Text style={styles.btnTxt}>Terms & Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => props.navigation.navigate("Feedback")}
        >
          <Text style={styles.btnTxt}>Rate us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => props.navigation.navigate("ContactUs")}
        >
          <Text style={styles.btnTxt}>Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => __logOut()}>
          <Text style={[styles.btnTxt, { color: "#F44336" }]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Setting;
