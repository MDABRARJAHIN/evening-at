import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  Animated,
  Easing,
} from "react-native";
import Button from "../../components/Button/Button";
import Images from "../../constant/images";
import Header from "../../components/Header/Header";
import auth from "@react-native-firebase/auth";
import CountDown from "react-native-countdown-component";
import moment from "moment";
import styles from "./Styles";
const StartEvening = (props) => {
  const [timeEscaped, setTimeEscaped] = useState(5);
  const [isTimeEnded, setTimeEnded] = useState(false);
  const [forchRefresh,setForceRefresh]=useState(1)
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setForceRefresh(forchRefresh+1)
    });
  }, );
  const [remaingTimeInSeconds, setRemainingTimeInSeconds] = useState( Math.floor((new Date(props.route.params.item.eventDate).getTime() -
  new Date().getTime()) / 1000));
  //   useEffect(() => {}, []);
  //   const timer = setInterval(() => {
  //     setTimeEscaped(timeEscaped - 1);
  //   }, 10000);
  var msDiff =
    new Date(props.route.params.item.eventDate).getTime() -
    new Date().getTime(); //Future date - current date
  var remainingTime = Math.floor(msDiff / 1000);
  setTimeout(() => {
    setTimeEnded(true);
  }, 1000);
  const [spinValue, setSpinValue] = useState(new Animated.Value(0));

  
  //   let spinValue = new Animated.Value(0);
  Animated.timing(spinValue, {
    toValue: 1/remainingTime,
    duration: remainingTime,
    easing: Easing.linear, // Easing is an additional import from react-native
    useNativeDriver: true, // To make use of native driver for performance
  }).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* {console.log(spin)} */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Header
          image={auth().currentUser.photoURL}
          iconPress={() => props.navigation.goBack()}
        ></Header>

        <Text style={styles.description}>Hi Saef, Welcome to Evening At</Text>
        <Text style={styles.time}>Start your evening</Text>
        <Animated.Image
          style={[styles.timer, { transform: [{ rotate: spin }] }]}
          source={Images.timer}
        />
        {/* <Text style={styles.escapedTime}>00:{timeEscaped}</Text>
        <Text style={styles.hours}>hours left</Text> */}

        <CountDown
          until={remaingTimeInSeconds}
          onFinish={() => console.log("finished")}
          onPress={() => console.log("hello")}
          size={20}
          style={{ marginTop: 20 }}
        />
{
  remainingTime==0||remainingTime<0&&new Date(props.route.params.item.eventDate).getDate()==new Date().getDate()&&new Date(props.route.params.item.eventDate).getFullYear()==new Date().getFullYear()&&new Date(props.route.params.item.eventDate).getMonth()==new Date().getMonth()
  &&

        <Button
          title="Start your Evening"
          customStyle={styles.btn}
          onPress={() => props.navigation.navigate("Questions")}
        ></Button>
}
      </ScrollView>
    </SafeAreaView>
  );
};
export default StartEvening;
