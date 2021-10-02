import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";

import HeaderContent from "../../components/HeaderContent/HeaderContent";
import BookingItem from "../../components/BookingItem/BookingItem";
import Video from "react-native-video";
import styles from "./Styles";
import didYouKnowImg from "../../assets/dyk.jpeg";
import moment from "moment";
import Header from "../../components/Header/Header";
import SkeletonPlaceholder from "../../components/skeletonPlaceholder/SkeletonPlaceholder";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
const {height}=Dimensions.get('window')
const BookingsDetails = (props) => {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [allBookings, setAllBooking] = useState([]);
  const [forchRefresh,setForceRefresh]=useState(1)
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setForceRefresh(forchRefresh+1)
    });
  }, );
  useEffect(() => {
    loadBookings();
    console.log("auth ", auth().currentUser);
  }, []);
  const loadBookings = () => {
    database()
      .ref("Bookings")
      .child(auth().currentUser.uid)
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          setAllBooking(Object.values(snapshot.val()));
          setIsLoadingData(false);
        } else setIsLoadingData(false);
      });
  };

  const renderUpComing = ({ item }) => {
    return (
      <BookingItem
        image={item.resImage}
        name={item.resName}
        rating={item.ratingCount + "(" + item.totalUsersForFeedback + ")"}
        price={item.resPricePerHead}
        date={
          moment(item.eventDate).format("dddd") +
          "," +
          moment(item.eventDate).format("MMM") +
          " " +
          moment(item.eventDate).format("D")
        }
        time={item.eventTime}
        city={item.city}
      ></BookingItem>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <Header
        icon="sort-variant"
        image="https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&dpr=1&w=400"
        iconPress={() => props.navigation.goBack()}></Header> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 10 }}
      >

<Header
          icon="sort-variant"
          image={auth().currentUser.photoURL}
          iconPress={() => setIsFilter(true)}
          profileImagePress={() => props.navigation.navigate("Profile")}
        ></Header>
        <HeaderContent
          content="All Bookings"
          customStyle={{ marginTop: 10 }}
        ></HeaderContent>
            <FlatList
              data={allBookings}
              renderItem={renderUpComing}
              contentContainer={{paddingBottom:height/7}}
              keyExtractor={(item, index) => index}
            ></FlatList>
       
        {/* <Text style={styles.section}>Want to book more?</Text>
        <FlatList
          data={bookMore}
          renderItem={renderUpComing}
          keyExtractor={(item, index) => index}
        ></FlatList> */}
      </ScrollView>
    </SafeAreaView>
  );
};
export default BookingsDetails;
