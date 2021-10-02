import React, { useState } from "react";
import {
  SafeAreaView,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Text,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../../components/Header/Header";

import HeaderContent from "../../components/HeaderContent/HeaderContent";
import Ionicons from "react-native-vector-icons/Ionicons";
import RenderHTML from "react-native-render-html";
import auth from "@react-native-firebase/auth";
import styles from "./Styles";
const { width } = Dimensions.get("window");
const TipsAndTricksDetail = (props) => {
  const html = props.route.params.content;
  console.log(html[0])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={28}
          onPress={() => props.navigation.goBack()}
        ></Ionicons>
        <TouchableOpacity onPress={() => props.navigation.navigate("Profile")}>
          <Image
            source={{
              uri: auth().currentUser.photoURL,
            }}
            style={styles.profileImage}
          ></Image>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 80,
      
          alignItems: "center",
        }}
      >
        <View style={styles.contentContainer}>
        <Text style={styles.title}>{html[0].title}</Text>
        <Image source={{uri:html[0].image}} style={styles.contentImage}></Image>
        <Text style={styles.content}>{html[0].desc}</Text>
        </View>
        {/* <RenderHTML contentWidth={width - 60} source={{ html }} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};
export default TipsAndTricksDetail;
