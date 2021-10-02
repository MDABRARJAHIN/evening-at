import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Images from "../../constant/images";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import HeaderContent from "../../components/HeaderContent/HeaderContent";
import TextInputField from "../../components/TextInputField/TextInputField";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "../../components/Button/Button";
import { COLORS } from "../../constant/theme";
import Rating from "../../components/Rating/Rating";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import ActivityIndicator from "../../components/Activityindicator/Activityindicator";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import images from "../../constant/images";
import styles from "./Styles";

const Feedback = (props) => {
  const [count, setCount] = useState(0);
  const [content, setContent] = useState("");
  const [isLoading, setIslaoding] = useState(false);
  const [forchRefresh,setForceRefresh]=useState(1)
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErroMsg] = useState("");

  const Alert = (msg) => {
    setErroMsg(msg);
    setIsError(true);
  };

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setForceRefresh(forchRefresh+1)
    });
  }, );
  const handleFeedback = async () => {
    try {
      setIslaoding(true);
      database()
        .ref("Feedback")
        .child(await auth().currentUser.uid)
        .set({
          rating: count,
          content: content,
        })
        .then((res) => {
          setIslaoding(false);

      Alert("Thanks for making suggestion!")
        })
        .catch((error) => {
          setIslaoding(false);
          console.log(error);
        });
    } catch (error) {
      alert(error);
      setIslaoding(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <ActivityIndicator></ActivityIndicator>}
      <CustomAlert
        isModalVisible={isError}
        image={images.checkIcon}
        text={errorMsg}
        onHide={() => {
          setIsError(false)
         props.navigation.goBack();
        }}
      ></CustomAlert>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={28}
          onPress={() => props.navigation.goBack()}
        ></Ionicons>
        <Feather name="settings" size={24} onPress={()=>props.navigation.navigate("Profile")}></Feather>
      </View>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <>
          <HeaderContent
            content="Feedback"
            customStyle={{ marginTop: 20 }}
          ></HeaderContent>

          <Image style={styles.image} source={Images.feedbackIcon}></Image>
          <View style={styles.contentContainer}>
            <Rating onPress={setCount} rating={count} size={40}></Rating>
            <TextInput
              placeholder="Type your Message here..."
              multiline={true}
              style={styles.textArea}
              onChangeText={(text) => setContent(text)}
            ></TextInput>

            <Button title="Send" onPress={() => handleFeedback()}></Button>
          </View>
        </>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default Feedback;
