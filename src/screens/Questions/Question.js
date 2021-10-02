import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import Button from "../../components/Button/Button";
import Images from "../../constant/images";
import Header from "../../components/Header/Header";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import styles from "./Styles";
let questionId = 0;
const Questions = (props) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [forchRefresh,setForceRefresh]=useState(1)
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setForceRefresh(forchRefresh+1)
    });
  }, );
  useEffect(() => {
    database()
      .ref("Questions")
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          console.log("questions ", Object.values(snapshot.val()));
          setQuestions(Object.values(snapshot.val()));
          setCurrentQuestion(Object.values(snapshot.val())[0].question);
        }
      });
    // return (questionId = 0);
  }, []);

  const nextQuestion = () => {
    questionId += 1;
    if (questionId < questions.length) {
      setCurrentQuestion(questions[questionId].question);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}> */}
      <Header
        image={auth().currentUser.photoURL}
        iconPress={() => props.navigation.goBack()}
      ></Header>

      <Text style={styles.description}>Hi Saef, Welcome to Evening At</Text>
      {/* <Text style={styles.time}>Start your evening</Text>

        <Image style={[styles.timer]} source={Images.timer} /> */}
      {/* <Text style={styles.escapedTime}>02:28:20</Text> */}

      {questions.length > 0 && (
        <View style={{ position: "absolute", bottom: 10 }}>
          <View style={styles.QuestionContainer}>
            <Text style={styles.question}>{currentQuestion}</Text>
            <View style={styles.triangleShape}></View>
          </View>
          <View style={styles.nextQuestion}>
            <Text style={styles.nextQuestionTxt}>Next Question</Text>
            <TouchableOpacity
              style={styles.nextQuestionBtn}
              onPress={() => nextQuestion()}
            >
              <Icon name="arrow-right" color="#FFF" size={34}></Icon>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};
export default Questions;
