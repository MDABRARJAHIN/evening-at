import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  Text,
  ImageBackground,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import images from "../../constant/images";
import TextInput from "../../components/TextInputField/TextInputField";
import Button from "../../components/Button/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLORS } from "../../constant/theme";
import styles from "./Styles";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import ActivityIndicator from "../../components/Activityindicator/Activityindicator";
import auth from "@react-native-firebase/auth";
import Validations from "../../Validations/Validation";
import Toast, { DURATION } from "react-native-easy-toast";
import SocialSignUp from "../../components/SocialSignUp/SocialSignUp";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoading, setIslaoding] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErroMsg] = useState("");
  let Toasts = useRef("");

  const Alert = (msg) => {
    setErroMsg(msg);
    setIsError(true);
  };

  const handleSignIn = () => {
    if (email == "" || Password == "") {
      // alert("All Fields are medatory!");
      Alert("All Fields are medatory!");
      return;
    } else if (
      Validations.isEmail(email) &&
      Validations.isValidPassword(Password)
    ) {
      setIslaoding(true);

      auth()
        .signInWithEmailAndPassword(email, Password)
        .then((res) => {
          console.log(res);
          setIslaoding(false);
          props.navigation.replace("BottomNavigator");
        })
        .catch((error) => {
          Alert(error.message);
          setIslaoding(false);
        });
    } else {
      if (!Validations.isValidPassword(Password))
        Alert("Please Enter min 8 characters password!");
      else Alert("Invalid Email!");
    }
  };
  const handleForGotpassword = () => {
    if (email == "") {
      Alert("Please enter your email");
      return;
    }
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Toasts.show("Reset password link is sent on given email", 2000);
      })
      .catch((error) => {
        Alert(error.message);
      });
  };
  return (
    <>
  
      {isLoading && <ActivityIndicator></ActivityIndicator>}
      <CustomAlert
        isModalVisible={isError}
        image={images.errorIcon}
        text={errorMsg}
        onHide={setIsError}
      ></CustomAlert>

      <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
        <ImageBackground
          source={images.loginImageBackground}
          style={styles.loginBG}
          imageStyle={styles.BG}
          resizeMode="stretch"
        >
          <Image
            source={images.logo}
            style={styles.logo}
            resizeMode="contain"
          ></Image>
        </ImageBackground>

        <View style={styles.InputContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#000"
            customStyle={{ borderColor: COLORS.borderColor }}
            onChangeText={(txt) => setEmail(txt)}
          ></TextInput>

          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#000"
            customStyle={{ borderColor: COLORS.borderColor }}
            onChangeText={(txt) => setPassword(txt)}
          ></TextInput>

          <TouchableOpacity
            style={styles.forgotpassword}
            onPress={() => handleForGotpassword()}
          >
            <Text>Forgot Password?</Text>
          </TouchableOpacity>

          <Button title="Sign In" onPress={() => handleSignIn()}></Button>
        </View>
        <Text style={styles.or}>or</Text>
        <SocialSignUp />
        <View style={styles.signUpOption}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("SignUp")}>
            <Text style={styles.signUpTxt}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <Toast ref={(toast) => (Toasts = toast)} />
    
    </>
  );
};
export default Login;
