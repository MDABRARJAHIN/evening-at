import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/Header/Header";
import HeaderContent from "../../components/HeaderContent/HeaderContent";
import BookingItem from "../../components/BookingItem/BookingItem";
import Video from "react-native-video";
import styles from "./Styles";
import didYouKnowImg from "../../assets/dyk.jpeg";
import moment from "moment";

const BookingsDetails = (props) => {
  const [historyEvents, setHistory] = useState([]);
  const [upComming, setUpComming] = useState([]);

  const [bookMore, setbookMore] = useState([]);
  const [forchRefresh,setForceRefresh]=useState(1)
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setForceRefresh(forchRefresh+1)
    });
  }, );
  useEffect(() => {
    console.log("allbooking ", props.allBookings);

    setUpComming(
      props.allBookings.filter((data) =>
        moment(data.eventDate).isAfter(moment(new Date()))
      )
    );

    setHistory(
      props.allBookings.filter((data) =>
        moment(data.eventDate).isBefore(moment(new Date()))
      )
    );
  }, [props.allBookings]);

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
        contentContainerStyle={{ paddingBottom:40 }}
      >
        <HeaderContent
          content="Welcome to evening at"
          customStyle={{ marginTop: 10 }}
        ></HeaderContent>
        <View style={styles.videoContainer}>
          <Video
            source={require("../../assets/intro.mp4")}
            onError={(e) => console.log("VIDEO ERROR", e)}
            style={styles.backgroundVideo}
            muted
            resizeMode={"cover"}
            repeat={true}
          />
        </View>
        <TouchableOpacity onPress={() => props.navigation.navigate("Hack")}>
          <Image
            resizeMode={"contain"}
            source={didYouKnowImg}
            style={styles.contentImage}
          ></Image>
        </TouchableOpacity>
        {upComming.length > 0 && (
          <>
            <Text style={styles.section}>Upcoming</Text>
            <FlatList
              data={upComming}
              renderItem={renderUpComing}
              keyExtractor={(item, index) => index}
            ></FlatList>
          </>
        )}
        {historyEvents.length > 0 && (
          <>
            <Text style={styles.section}>History</Text>
            <FlatList
              data={historyEvents}
              renderItem={renderUpComing}
              keyExtractor={(item, index) => index}
            ></FlatList>
          </>
        )}
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
