import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Header from "../../components/Header/Header";
import images from "../../constant/images";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import Button from "../../components/Button/Button";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Images from "../../constant/images";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import Toast, { DURATION } from "react-native-easy-toast";
import Geocoder from "react-native-geocoding";
import { googlemapKey } from "../../constant/googlemapKey";

import ActivityIndicator from "../../components/Activityindicator/Activityindicator";
import styles from "./Styles";
const Payment = (props) => {
  const {
    resturantDetail,
    selectedDate,
    selectedTimeSlot,
    selectedSeat,
    ratingCount,
    totalUsersForFeedback,
  } = props.route.params;

  const [locationLatLng, setLocationLatLng] = useState({
    lat: 37.78825,
    lng: -122.4324,
  });
  let Toasts = useRef("");
  const [eventKey, setEventKey] = useState("");
  const [selectedTimeslotKey, setSelectedTimeslotKey] = useState("");
  const [selectedSeatkey, setSelectedSeatKey] = useState("");
  const [isLoading, setIslaoding] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErroMsg] = useState("");
  useEffect(() => {
    console.log(parseFloat(ratingCount).toFixed(1));
    getEventKey();
    convertAddressToLatAndLng();
  }, []);

  const [forchRefresh,setForceRefresh]=useState(1)
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setForceRefresh(forchRefresh+1)
    });
  }, );

  const convertAddressToLatAndLng = () => {
    Geocoder.from(resturantDetail.resContact.address)
      .then((json) => {
        var location = json.results[0].geometry.location;
        setLocationLatLng(location);
        console.log("=>", location);
      })
      .catch((error) => console.warn("=>", error));
  };

  const Alert = (msg) => {
    setErroMsg(msg);
    setIsError(true);
  };

  const getEventKey = () => {
    database()
      .ref("Resturants")
      .child(resturantDetail.resId)
      .child("Events")
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((d) => {
            if (d.val().day == selectedDate) {
              setEventKey(d.key);
              setAvailableSeatKey(d.key);
              setAvailableTimeslotKey(d.key);
            }
            // d.val().day == selectedDate && setEventKey(d.key);
          });
        }
      });
  };

  //this method save the key of selected Time slot to change status of timeslot reserve

  const setAvailableSeatKey = (key) => {
    database()
      .ref("Resturants")
      .child(resturantDetail.resId)
      .child("Events")
      .child(key)
      .child("TimeSlots")
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((d) => {
            if (d.val().time == selectedTimeSlot) {
              setSelectedTimeslotKey(d.key);
            }
          });
        }
      });
  };
  //this method save the key of selected Time slot to change status of seat reserve
  const setAvailableTimeslotKey = (key) => {
    database()
      .ref("Resturants")
      .child(resturantDetail.resId)
      .child("Events")
      .child(key)
      .child("AvailableSeates")
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((d) => {
            if (d.val().time == selectedSeat) {
              setSelectedSeatKey(d.key);
            }
          });
        }
      });
  };

  const makePayment = () => {
    const bookingObject = {
      resImage: resturantDetail.resImage,
      resName: resturantDetail.resName,
      resId: resturantDetail.resId,
      city: resturantDetail.resCity,
      eventDate: selectedDate,
      eventTime: selectedTimeSlot,
      seats: selectedSeat,
      resPricePerHead: resturantDetail.resPricePerHead,
      ratingCount: parseFloat(ratingCount).toFixed(1),
      totalUsersForFeedback: totalUsersForFeedback,
      createdAt: new Date().toISOString(),
    };
    setIslaoding(true)
    let bookings;
    //check weather has made already bookings
    database()
      .ref("Bookings")
      .child(auth().currentUser.uid)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          bookings = Object.values(snapshot.val());

          if (
            bookings.filter(
              (data) =>
                data.resId == resturantDetail.resId &&
                data.eventDate == selectedDate &&
                data.eventTime == selectedTimeSlot
            ).length > 0
          ) {
            setIslaoding(false)
            Alert("You have already booked on same day and time slot!");
          } else {
            setIslaoding(false)
            props.navigation.navigate("CreditCard", { bookingObject });

            // database()
            //   .ref("Bookings")
            //   .child(auth().currentUser.uid)
            //   .push({
            //     resImage: resturantDetail.resImage,
            //     resName: resturantDetail.resName,
            //     resId: resturantDetail.resId,
            //     city: resturantDetail.resCity,
            //     eventDate: selectedDate,
            //     eventTime: selectedTimeSlot,
            //     seats: selectedSeat,
            //     resPricePerHead: resturantDetail.resPricePerHead,
            //     ratingCount: parseFloat(ratingCount).toFixed(1),
            //     totalUsersForFeedback: totalUsersForFeedback,
            //     createdAt: new Date().toISOString(),
            //   })
            //   .then((res) => {
            //     setIslaoding(false);
            //     Alert("Booking Successful");
            //     // Toasts.show("Reset password link is sent on given email", 2000);
            //     // props.navigation.replace("Home");
            //   })
            //   .catch((error) => {
            //     setIslaoding(false);
            //     console.log("error in booking");
            //     alert("Something Went Wrong");
            //     // Alert("Something went wrong!");
            //   });
          }

          console.log("bookings ", bookings);
        } else{
          setIslaoding(false)
          props.navigation.navigate("CreditCard", { bookingObject });
        }
       
          // database()
          //   .ref("Bookings")
          //   .child(auth().currentUser.uid)
          //   .push({
          //     resImage: resturantDetail.resImage,
          //     resName: resturantDetail.resName,
          //     resId: resturantDetail.resId,
          //     city: resturantDetail.resCity,
          //     eventDate: selectedDate,
          //     eventTime: selectedTimeSlot,
          //     seats: selectedSeat,
          //     resPricePerHead: resturantDetail.resPricePerHead,
          //     ratingCount: parseFloat(ratingCount).toFixed(1),
          //     totalUsersForFeedback: totalUsersForFeedback,
          //     createdAt: new Date().toISOString(),
          //   })
          //   .then((res) => {
          //     setIslaoding(false);
          //     Alert("Booking Successful");
          //     // Toasts.show("Reset password link is sent on given email", 2000);
          //     // props.navigation.replace("Home");
          //   })
          //   .catch((error) => {
          //     setIslaoding(false);
          //     console.log("error in booking");
          //     alert("Something Went Wrong");
          //     // Alert("Something went wrong!");
          //   });
      });

    // if (eventKey != "" && selectedTimeslotKey != "" && selectedSeatkey) {
    // setIslaoding(true);

    // database()
    //   .ref("Bookings")
    //   .child(auth().currentUser.uid)
    //   .push({
    //     resImage: resturantDetail.resImage,
    //     resName: resturantDetail.resName,
    //     resId: resturantDetail.resId,
    //     city: resturantDetail.resCity,
    //     eventDate: selectedDate,
    //     eventTime: selectedTimeSlot,
    //     seats: selectedSeat,
    //     resPricePerHead: resturantDetail.resPricePerHead,
    //     ratingCount: parseFloat(ratingCount).toFixed(1),
    //     totalUsersForFeedback: totalUsersForFeedback,
    //     createdAt: new Date().toISOString(),
    //   })
    //   .then((res) => {
    //     setIslaoding(false);
    //     Alert('Booking Successful')
    //     // Toasts.show("Reset password link is sent on given email", 2000);
    //     // props.navigation.replace("Home");
    //   })
    //   .catch((error) => {
    //     setIslaoding(false);
    //     console.log("error in booking");
    //     alert("Something Went Wrong")
    //     // Alert("Something went wrong!");
    //   });
    // } else {
    //   Alert("Something went wrong!");
    //   setIslaoding(false);
    // }
  };
  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <ActivityIndicator></ActivityIndicator>}
      <CustomAlert
        isModalVisible={isError}
        image={images.errorIcon}
        text={errorMsg}
        onHide={() => {
          setIsError(false);
        }}
      ></CustomAlert>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <Header
          image={auth().currentUser.photoURL}
          content="Bookings"
          iconPress={() => props.navigation.goBack()}
          profileImagePress={() => props.navigation.navigate("Profile")}
        ></Header>
        <View style={styles.mapviewContainer}>
          <MapView
            initialRegion={{
              latitude: locationLatLng.lat,
              longitude: locationLatLng.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={{
              latitude: locationLatLng.lat,
              longitude: locationLatLng.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={styles.mapview}
          >
            <Marker
              coordinate={{
                latitude: locationLatLng.lat,
                longitude: locationLatLng.lng,
              }}
            />
          </MapView>
        </View>
        <Text style={styles.price}>
          Deposit: ${resturantDetail.resPricePerHead}
        </Text>

        <Image source={Images.paymentCards} style={styles.cardImages}></Image>

        <TouchableOpacity
          style={styles.applePayButton}
          onPress={() => makePayment()}
        >
          <Text style={styles.applyPaytxt}>Continue with </Text>
          {/* <Image style={styles.appleIcon} source={Images.appleIcon}></Image> */}
          <Text style={styles.applyPaytxt}> Stripe</Text>
        </TouchableOpacity>
        {/* <Button
          customStyle={[styles.btn, { marginBottom: 20 }]}
          title="Continue"
          onPress={() => makePayment()}
        ></Button> */}
      </ScrollView>
      <Toast ref={(toast) => (Toasts = toast)} />
    </SafeAreaView>
  );
};
export default Payment;
