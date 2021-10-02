import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  ScrollView,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

import HeaderContent from "../../components/HeaderContent/HeaderContent";
import BookingItem from "../../components/BookingItem/BookingItem";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Rating from "../../components/Rating/Rating";
import Button from "../../components/Button/Button";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import styles from "./Styles";
import { COLORS } from "../../constant/theme";
import Modal from "react-native-modal";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import moment from "moment";
import images from "../../constant/images";
import ActivityIndicator from "../../components/Activityindicator/Activityindicator";

const { height, width } = Dimensions.get("window");
const BookingsDetails = (props) => {
  const [upComming, setUpComming] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFeedbackModal, setIsFeedbackModal] = useState(false);
  const [itemForFeedback, setItemForFeedback] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErroMsg] = useState("");
  const [content, setContent] = useState("");
  const [index, setIndex] = React.useState(0);


  const [count, setCount] = useState(0);
  const [routes] = React.useState([
    { key: "Upcoming", title: "Upcoming" },
    { key: "Completed", title: "Completed" },
  ]);

  const [forchRefresh,setForceRefresh]=useState(1)
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setForceRefresh(forchRefresh+1)
    });
  }, );

  useEffect(() => {
    // console.log("allbooking ", props.allBookings);

    setUpComming(
      props.allBookings.filter((data) =>
        moment(data.eventDate).isAfter(moment(new Date()))
      )
    );

    setCompleted(
      props.allBookings.filter((data) =>
        moment(data.eventDate).isBefore(moment(new Date()))
      )
    );
  }, [props.allBookings]);

  const Alert = (msg) => {
    setErroMsg(msg);
    setIsError(true);
  };
  const handleFeedBack = async () => {
    // console.log("resID ", itemForFeedback.resId);
    if (count != 0 && content !== "") {
      setIsLoading(true);

      const databaseRef = database()
        .ref("Resturants")
        .child(itemForFeedback.resId)
        .child("Feedback");

      databaseRef
        .orderByChild("userId")
        .equalTo(await auth().currentUser.uid)
        .once("value", async (snapshot) => {
          if (snapshot.exists()) {
            Alert("You have already feedbacked to this resturant");
            setIsFeedbackModal(false);
            setIsLoading(false);
          } else {
            databaseRef
              .push({
                userId: await auth().currentUser.uid,
                content: content,
                rating: count,

                // content: "I am testing the feedback about ",
                // rating: 2,
                createdAt: new Date().toISOString(),
              })
              .then((res) => {
                setIsFeedbackModal(false);
                setIsLoading(false);
              })
              .catch((error) => {
                console.log("error  in feedback ", error);
                setIsLoading(false);
              });
          }
        });
    } else {
      if (content === "") Alert("Please make suggestion!");
      else Alert("Please give rate!");
    }
  };

  const Upcoming = () => (
    <FlatList
      data={upComming}
      contentContainerStyle={{
        alignItems: "center",
        paddingBottom:50
      }}
      renderItem={renderUpComing}
      ListEmptyComponent={() => (
        <Text style={styles.emptyMessage}> There is no upcoming event!</Text>
      )}
      keyExtractor={(item, index) => index}
    ></FlatList>
  );

  const Completed = () => (
    <FlatList
      data={completed}
      contentContainerStyle={{
        alignItems: "center",
        paddingBottom:50
      }}
      renderItem={renderCompleted}
      ListEmptyComponent={() => (
        <Text style={styles.emptyMessage}>
          {" "}
          Your any booking is not completed yet.
        </Text>
      )}
      keyExtractor={(item, index) => index}
    ></FlatList>
  );

  const renderScene = SceneMap({
    Upcoming,
    Completed,
  });

  const renderUpComing = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("StartEvening", { item })}
      >
        <BookingItem
          image={item.resImage}
          name={item.resName}
          rating={item.ratingCount + "(" + item.totalUsersForFeedback + ")"}
          price={item.resPricePerHead}
          city={item.city}
          date={
            moment(item.eventDate).format("dddd") +
            "," +
            moment(item.eventDate).format("MMM") +
            " " +
            moment(item.eventDate).format("D")
          }
          time={item.eventTime}
        ></BookingItem>
      </TouchableOpacity>
    );
  };

  const renderCompleted = ({ item }) => {
    return (
      <>
      {/* {isFeedbackModal && <Feedback />} */}
        <TouchableOpacity
          // onPress={() => {
          //   setIsFeedbackModal(true), setItemForFeedback(item);
          // }}
          onPress={()=>props.navigation.navigate('ResturantFeedback',{itemForFeedback:item})}
        >
          <BookingItem
            image={item.resImage}
            name={item.resName}
            rating={item.ratingCount + "(" + item.totalUsersForFeedback + ")"}
            price={item.resPricePerHead}
            city={item.city}
            date={
              moment(item.eventDate).format("dddd") +
              "," +
              moment(item.eventDate).format("MMM") +
              " " +
              moment(item.eventDate).format("D")
            }
            time={item.eventTime}
          ></BookingItem>
        </TouchableOpacity>
      </>
    );
  };

  const Feedback = () => {
    const item = itemForFeedback;
    return (
      <Modal isVisible={true} onBackdropPress={() => setIsFeedbackModal(false)}>
        <View style={styles.feedbackModal}>
          <Icon
            name="close"
            size={24}
            color="#D3D3D3"
            style={styles.closeIcon}
            onPress={() => setIsFeedbackModal(false)}
          ></Icon>
          <ScrollView>
            <BookingItem
              image={item.resImage}
              name={item.resName}
              rating={item.ratingCount + "(" + item.totalUsersForFeedback + ")"}
              price={item.resPricePerHead}
              city={item.city}
              date={
                moment(item.eventDate).format("dddd") +
                "," +
                moment(item.eventDate).format("MMM") +
                " " +
                moment(item.eventDate).format("D")
              }
              time={item.eventTime}
            ></BookingItem>

            <View style={styles.feedbackContainer}>
              <Rating onPress={setCount} rating={count} size={40}></Rating>
              <TextInput
                placeholder="Type your Message here..."
                multiline={true}
                style={styles.textArea}
                onChangeText={(txt) => setContent(txt)}
                value={content}
              ></TextInput>

              <Button title="Send" onPress={() => handleFeedBack()}></Button>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  return (
    <>
      <HeaderContent
        content="Your Bookings"
        customStyle={{ marginTop: 5, marginLeft: 25 }}
      />
      
      {isLoading && <ActivityIndicator></ActivityIndicator>}
      <CustomAlert
        isModalVisible={isError}
        image={images.errorIcon}
        text={errorMsg}
        onHide={setIsError}
      ></CustomAlert>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        pressOpacity={0}
        onIndexChange={setIndex}
        initialLayout={{ width: 100 }}
        renderTabBar={(props) => {
          return (
            <TabBar
              pressOpacity={0}
              TouchableOpacity={0}
              pressColor="transparent"
              {...props}
              indicatorStyle={{ backgroundColor: COLORS.primary, height: 3 }}
              style={{ backgroundColor: "transparent", elevation: 0 }}
              renderLabel={({ route, focused, color }) => (
                <Text
                  style={{
                    color: focused ? COLORS.primary : "#000",
                    margin: 8,
                    fontWeight: "bold",
                  }}
                >
                  {route.title}
                </Text>
              )}
            />
          );
        }}
      />
    </>
  );
};
export default BookingsDetails;
