import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, SafeAreaView, Text } from "react-native";

import BookingTab from "./BookingTab";
import BookingHistory from "./BookingsDetail";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import Header from "../../components/Header/Header";
import SkeletonPlaceholder from "../../components/skeletonPlaceholder/SkeletonPlaceholder";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import styles from "./Styles";
const Bookings = (props) => {
  const [isFilter, setIsFilter] = useState(false);

  const [isTab, setIsTab] = useState(false);
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
  useEffect(()=>{

  })

 

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

  const toggleModal = (val) => {
    setIsTab(val);
    setIsFilter(false);
  };

  const Filter = () => (
    <Modal isVisible={isFilter} onBackdropPress={() => setIsFilter(false)}>
      <View style={styles.modal}>
        <Icon
          name="close"
          size={24}
          color="#D3D3D3"
          style={styles.closeIcon}
          onPress={() => setIsFilter(false)}
        ></Icon>
        <TouchableOpacity
          onPress={() => toggleModal(true)}
          style={{ marginTop: 40 }}
        >
          <Text style={styles.filterOptions}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleModal(false)}>
          <Text style={styles.filterOptions}>Detail</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  return isLoadingData ? (
    <SkeletonPlaceholder></SkeletonPlaceholder>
  ) : (
    <>
      <SafeAreaView style={styles.contentContainer}>
        <Header
          icon="sort-variant"
          image={auth().currentUser.photoURL}
          iconPress={() => setIsFilter(true)}
          profileImagePress={() => props.navigation.navigate("Profile")}
        ></Header>

        <Filter></Filter>
      </SafeAreaView>
      {isTab ? (
        <BookingTab allBookings={allBookings} {...props} />
      ) : (
        <BookingHistory allBookings={allBookings} {...props} />
      )}
    </>
  );
};
export default Bookings;
