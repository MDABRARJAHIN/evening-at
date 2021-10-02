import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import auth from "@react-native-firebase/auth";
import Images from "../../constant/images";
import styles from "./Styles";
import Geocoder from "react-native-geocoding";
import { googlemapKey } from "../../constant/googlemapKey";
import GetLocation from "react-native-get-location";
import getDirections from "react-native-google-maps-directions";
const {height}=Dimensions.get('window')
Geocoder.init(googlemapKey);
const BookingOnMap = (props) => {
  const { resturantDetail } = props.route.params;
  const [forchRefresh,setForceRefresh]=useState(1)
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setForceRefresh(forchRefresh+1)
    });
  }, );
  const [locationLatLng, setLocationLatLng] = useState({
    lat: 37.78825,
    lng: -122.4324,
  });

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  console.log(resturantDetail.resContact.address);

  useEffect(() => {
    convertAddressToLatAndLng();
    getCurrentLocation();
  }, [resturantDetail]);

  const convertAddressToLatAndLng = () => {
    Geocoder.from(resturantDetail.resContact.address)
      .then((json) => {
        var location = json.results[0].geometry.location;
        setLocationLatLng(location);
        console.log("=>", location);
      })
      .catch((error) => console.warn("=>", error));
  };

  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        setCurrentLocation(location);
        console.log(location);
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
      });
  };

  const handleGoogleDirections = () => {
    const data = {
      source: {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      },
      destination: {
        latitude: locationLatLng.lat,
        longitude: locationLatLng.lng,
      },
      params: [
        {
          key: "travelmode",
          value: "driving", // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate", // this instantly initializes navigation using the given travel mode
        },
      ],
    };

    getDirections(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        image={auth().currentUser.photoURL}
        content="Bookings"
        iconPress={() => props.navigation.goBack()}
        profileImagePress={() => props.navigation.navigate("Profile")}
      ></Header>

      {/* <View style={styles.contentContainer}> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
         contentContainerStyle={{ paddingBottom:height/7}}
        // style={{ paddingBottom: 60 }}
      >
        <Text style={styles.description}>Your evening starts today at</Text>
        <Text style={styles.time}>{resturantDetail.resDetail.startTime}</Text>
        <Text style={styles.address}>{resturantDetail.resContact.address}</Text>

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

        <Button
          customStyle={styles.btn}
          title="See on maps"
          onPress={() => handleGoogleDirections()}
        ></Button>
      </ScrollView>
      {/* </View> */}
    </SafeAreaView>
  );
};
export default BookingOnMap;
