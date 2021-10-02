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
import Rating from "../../components/Rating/Rating";
import Button from "../../components/Button/Button";
import BookingItem from "../../components/BookingItem/BookingItem";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import moment from "moment";
import images from "../../constant/images";
import ActivityIndicator from "../../components/Activityindicator/Activityindicator";
import styles from "./Styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ResturantFeedback = (props) => {
  const [content, setContent] = useState("");
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErroMsg] = useState("");
  const item = props.route.params.itemForFeedback;
  const Alert = (msg) => {
    setErroMsg(msg);
    setIsError(true);
  };
  const [forchRefresh,setForceRefresh]=useState(1)
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setForceRefresh(forchRefresh+1)
    });
  }, );

  const handleFeedBack = async () => {
    // console.log("resID ", itemForFeedback.resId);
    if (count != 0 && content !== "") {
      setIsLoading(true);

      const databaseRef = database()
        .ref("Resturants")
        .child(item.resId)
        .child("Feedback");

      databaseRef
        .orderByChild("userId")
        .equalTo(await auth().currentUser.uid)
        .once("value", async (snapshot) => {
          if (snapshot.exists()) {
            Alert("You have already feedbacked to this resturant");

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
                setIsLoading(false);
                Alert("Thanks for your suggestion");
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
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        {isLoading && <ActivityIndicator></ActivityIndicator>}
        <CustomAlert
          isModalVisible={isError}
          image={images.errorIcon}
          text={errorMsg}
          onHide={() => props.navigation.goBack()}
        ></CustomAlert>
        <View style={styles.feedbackModal}>
          <Icon
            name="close"
            size={28}
            color="#000"
            style={styles.closeIcon}
            onPress={() => props.navigation.goBack()}
          ></Icon>

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
            <View style={styles.sendFeedbackBtn}>
              <Button title="Send" onPress={() => handleFeedBack()}></Button>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default ResturantFeedback;
