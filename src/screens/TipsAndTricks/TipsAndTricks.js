import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../../components/Header/Header";
import HeaderContent from "../../components/HeaderContent/HeaderContent";
import Ionicons from "react-native-vector-icons/Ionicons";
import database from "@react-native-firebase/database";
import SkeletonPlaceholder from "../../components/skeletonPlaceholder/SkeletonPlaceholder";
import auth from "@react-native-firebase/auth";
import styles from "./Styles";
const TipsAndTricks = (props) => {
  const [tripsAndTricks, setTripsAndTricks] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [forchRefresh,setForceRefresh]=useState(1)
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setForceRefresh(forchRefresh+1)
    });
  }, );
  useEffect(() => {
    try {
      database()
        .ref("TripsAndTricks")
        .once("value", (snapshot) => {
          if (snapshot.exists()) {
            console.log("data ", Object.values(snapshot.val()));

            setTripsAndTricks(Object.values(snapshot.val()));
            setIsLoadingData(false);
          }
        });
    } catch (error) {
      console.log("error in fetching from trips and tricks ", error);
      setIsLoadingData(false);
    }
  }, []);
  const renderCard = ({ item }) => {
    const color =
      "rgb(" +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      ")";
    return (
      <View style={[styles.cardContainer, { backgroundColor: color }]}>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.contentTxt} numberOfLines={3}>
            {item.description}
          </Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              props.navigation.navigate("TripsDetail", {
                content: item.content,
              })
            }
          >
            <Text style={styles.btnTxt}>Read More</Text>
          </TouchableOpacity>
        </View>
        <Image source={{ uri: item.image }} style={styles.image}></Image>
      </View>
    );
  };
  return isLoadingData ? (
    <SkeletonPlaceholder></SkeletonPlaceholder>
  ) : (
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
      <HeaderContent
        content="Tips and Tricks"
        customStyle={{ marginTop: 10 }}
      ></HeaderContent>

      <View style={styles.contentContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom:180}}
          data={tripsAndTricks}
          renderItem={renderCard}
          keyExtractor={(item, index) => index}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
};
export default TipsAndTricks;
