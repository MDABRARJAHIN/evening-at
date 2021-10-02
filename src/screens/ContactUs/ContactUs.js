import React, { useState, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from "react-native";
import Images from "../../constant/images";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import HeaderContent from "../../components/HeaderContent/HeaderContent";
import TextInputField from "../../components/TextInputField/TextInputField";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ActivityIndicator from "../../components/Activityindicator/Activityindicator";
import Button from "../../components/Button/Button";
import { COLORS } from "../../constant/theme";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import Validations from "../../Validations/Validation";
import Toast, { DURATION } from "react-native-easy-toast";

import styles from "./Styles";

const ContactUs = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIslaoding] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErroMsg] = useState("");
  let Toasts = useRef("");

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
  const contactUs = async () => {
    if (name == "" || email == "" || content == "") {
      Alert("All feilds are mendatory!");
      return;
    }
    if (!Validations.isEmail(email)) {
      Alert("Invalid Email!");
      return;
    }
    if (!Validations.isValidName(name)) {
      Alert("Invalid Name!");
      return;
    }
    try {
      setIslaoding(true);
      database()
        .ref("Queries")
        .child(await auth().currentUser.uid)
        .push({
          name: name,
          email: email,
          content: content,
        })
        .then((res) => {
          setIslaoding(false);
          // Toasts.show("Thanks for contacting us!", 2000);
          ToastAndroid.showWithGravityAndOffset(
            "Thanks for contacting us!",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
          props.navigation.goBack();
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
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
        {isLoading && <ActivityIndicator></ActivityIndicator>}
        <CustomAlert
          isModalVisible={isError}
          image={Images.errorIcon}
          text={errorMsg}
          onHide={setIsError}
        ></CustomAlert>
        <View style={styles.header}>
          <Ionicons
            name="arrow-back"
            size={28}
            onPress={() => props.navigation.goBack()}
          ></Ionicons>
          {/* <Feather name="settings" size={24}></Feather> */}
        </View>
        <HeaderContent
          content="Contact Us"
          customStyle={{ marginTop: 20 }}
        ></HeaderContent>

        <Image style={styles.image} source={Images.supportIcon}></Image>
        <View style={styles.contentContainer}>
          <TextInputField
            placeholder="Name"
            placeholderTextColor="#000"
            customStyle={{ borderColor: COLORS.borderColor }}
            onChangeText={(txt) => setName(txt)}
          ></TextInputField>
          <TextInputField
            placeholder="Email"
            placeholderTextColor="#000"
            customStyle={{ borderColor: COLORS.borderColor }}
            onChangeText={(txt) => setEmail(txt)}
          ></TextInputField>

          <TextInput
            placeholder="Type your Message here..."
            multiline={true}
            style={styles.textArea}
            onChangeText={(text) => setContent(text)}
          ></TextInput>

          <Button title="Send" onPress={() => contactUs()}></Button>
        </View>
      </SafeAreaView>
      <Toast ref={(toast) => (Toasts = toast)} />
    </KeyboardAwareScrollView>
  );
};
export default ContactUs;
